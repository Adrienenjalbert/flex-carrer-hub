/**
 * Deep Quality Scorer — 6-Dimension Content Evaluation
 *
 * Replaces the shallow surface-check scorer with deep analysis across:
 * 1. Usefulness (0.25) — does the content answer the reader's question with specific value?
 * 2. Brand Tone (0.15) — does it sound like Indeed Flex, not generic AI?
 * 3. Data Accuracy (0.20) — are claims sourced and current?
 * 4. SEO Value (0.15) — does it target the right keywords and intent?
 * 5. AEO Readiness (0.10) — is it structured for AI citation?
 * 6. UX Quality (0.15) — is it scannable, well-structured, properly linked?
 *
 * Pure TypeScript — no API calls, runs locally on article data objects.
 */

import type { Article, ArticleSection } from '@/lib/data/articles/guides';
import type { FinancialArticle } from '@/lib/data/articles/financial-tips';
import type {
  QualityScore,
  UsefulnessScore,
  BrandToneScore,
  DataAccuracyScore,
  SeoValueScore,
  AeoScore,
  UxQualityScore,
} from './types';

// ============================================
// CONSTANTS
// ============================================

const DIMENSION_WEIGHTS = {
  usefulness: 0.25,
  brandTone: 0.15,
  dataAccuracy: 0.20,
  seoValue: 0.15,
  aeo: 0.10,
  uxQuality: 0.15,
};

const PASS_THRESHOLD = 80;

const BANNED_PHRASES = [
  'delve into', 'delve deeper', 'delving', 'dive deep', 'deep dive into',
  'navigate the', 'navigating the', 'when it comes to', "in today's",
  'leverage your', 'leveraging', 'robust', 'comprehensive guide',
  'seamless', 'game-changing', 'game changer', "it's not just",
];

const AI_SLOP_PATTERNS = [
  /in this section,?\s+we('ll| will)/gi,
  /let's (explore|dive|look|examine|discuss)/gi,
  /it's important to (note|remember|understand)/gi,
  /you should consider/gi,
  /make sure to/gi,
  /without further ado/gi,
  /in (conclusion|summary),?\s/gi,
  /as (we all know|mentioned (earlier|above))/gi,
  /whether you're a .+ or a .+/gi,
];

const FEAR_PATTERNS = [
  /don't miss out/gi, /you'll be left behind/gi, /before it's too late/gi,
  /act now/gi, /limited time/gi, /don't wait/gi,
];

const FILLER_WORDS = ['very', 'really', 'truly', 'actually', 'basically', 'essentially', 'literally'];

const CITY_NAMES = [
  'new york', 'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia',
  'san antonio', 'san diego', 'dallas', 'austin', 'jacksonville', 'san francisco',
  'columbus', 'charlotte', 'indianapolis', 'seattle', 'denver', 'nashville',
  'oklahoma city', 'portland', 'las vegas', 'memphis', 'louisville', 'baltimore',
  'milwaukee', 'albuquerque', 'tucson', 'fresno', 'sacramento', 'atlanta', 'miami',
  'raleigh', 'omaha', 'cleveland', 'tampa', 'minneapolis', 'pittsburgh', 'cincinnati',
  'st. louis', 'orlando', 'detroit',
];

const EMPLOYER_NAMES = [
  'amazon', 'walmart', 'target', 'costco', 'fedex', 'ups', 'usps',
  'marriott', 'hilton', 'hyatt', 'mcdonald', 'starbucks', 'chipotle',
  'home depot', "lowe's", 'kroger', 'publix', 'h-e-b', 'best buy',
  'indeed flex', 'instawork', 'wonolo', 'shiftgig', 'snagajob',
];

const PERSONA_PAIN_POINTS: Record<string, string[]> = {
  'students': ['class schedule', 'school', 'study', 'part-time', 'campus', 'tuition', 'student'],
  'career-changers': ['career change', 'transition', 'switching', 'new field', 'transferable'],
  'gig-workers': ['gig', 'flexible', 'shift', 'hourly', 'side hustle', 'multiple jobs'],
  'parents': ['childcare', 'school hours', 'family', 'work-life', 'parent', 'kids'],
  'retirees': ['retire', 'supplemental income', 'part-time', 'semi-retired', 'senior'],
};

// ============================================
// TEXT UTILITIES
// ============================================

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`#]/g, '')
    .replace(/\|[^|]*\|/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function getSentences(text: string): string[] {
  const clean = stripMarkdown(text);
  return clean
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);
}

function getWordCount(text: string): number {
  return stripMarkdown(text).split(/\s+/).filter(w => w.length > 0).length;
}

function getParagraphs(text: string): string[] {
  return text.split(/\n{2,}/).filter(p => p.trim().length > 0);
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 2) return 1;
  let count = 0;
  let prevVowel = false;
  for (const char of w) {
    const isVowel = 'aeiouy'.includes(char);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  if (w.endsWith('e') && count > 1) count--;
  return Math.max(1, count);
}

function estimateReadingLevel(text: string): number {
  const clean = stripMarkdown(text);
  const sentences = getSentences(clean);
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);
  const grade = 0.39 * (words.length / sentences.length) + 11.8 * (syllableCount / words.length) - 15.59;
  return Math.max(1, Math.round(grade * 10) / 10);
}

// ============================================
// CONTENT EXTRACTION
// ============================================

interface NormalizedArticle {
  slug: string;
  title: string;
  description: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  keyTakeaways: string[];
  relatedArticles: string[];
  fullContent: string;
  category?: string;
  primaryKeyword?: string;
  searchIntent?: string;
  sources?: { name: string; url: string; tier: 1 | 2 | 3 | 4; lastAccessed: string }[];
  targetPersonas?: string[];
  lastReviewed?: string;
}

function normalizeArticle(article: Article | FinancialArticle): NormalizedArticle {
  const fullContent = [
    article.description,
    ...article.keyTakeaways,
    ...article.sections.map(s => `${s.heading}\n${s.content}`),
    ...article.faqs.map(f => `${f.question}\n${f.answer}`),
  ].join('\n\n');

  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    sections: article.sections,
    faqs: article.faqs,
    keyTakeaways: article.keyTakeaways,
    relatedArticles: article.relatedArticles,
    fullContent,
    category: 'category' in article ? article.category : undefined,
    primaryKeyword: article.primaryKeyword,
    searchIntent: article.searchIntent,
    sources: article.sources,
    targetPersonas: article.targetPersonas,
    lastReviewed: article.lastReviewed,
  };
}

// ============================================
// 1. USEFULNESS SCORING (weight: 0.25)
// ============================================

function scoreUsefulness(article: NormalizedArticle): UsefulnessScore {
  const issues: string[] = [];

  // Answer completeness: first section must contain a bold statement, number, or direct answer
  const firstContent = article.sections[0]?.content || '';
  const first100Words = stripMarkdown(firstContent).split(/\s+/).slice(0, 100).join(' ');
  const hasBoldAnswer = /\*\*[^*]+\*\*/.test(firstContent.slice(0, 500));
  const hasNumber = /\$\d+|\d+%|\d+ (hour|day|week|month|year)/i.test(first100Words);
  const hasDirectAnswer = /\b(the (answer|short answer)|you (can|should|need|will))\b/i.test(first100Words);
  const answerCompleteness = (hasBoldAnswer ? 40 : 0) + (hasNumber ? 30 : 0) + (hasDirectAnswer ? 30 : 0);
  if (answerCompleteness < 40) {
    issues.push('First section lacks a direct answer (no bold statement, number, or clear response)');
  }

  // Specificity per section: count concrete data points
  const specificityPerSection = article.sections.map(s => {
    const content = s.content.toLowerCase();
    let specificity = 0;
    if (/\$\d+/.test(content)) specificity++;
    if (/\d+%/.test(content)) specificity++;
    for (const city of CITY_NAMES) {
      if (content.includes(city)) { specificity++; break; }
    }
    for (const emp of EMPLOYER_NAMES) {
      if (content.includes(emp)) { specificity++; break; }
    }
    if (/\d{4}/.test(content)) specificity++;
    if (/\| .+ \|/.test(s.content)) specificity++; // tables
    return specificity;
  });
  const avgSpecificity = specificityPerSection.length > 0
    ? specificityPerSection.reduce((a, b) => a + b, 0) / specificityPerSection.length
    : 0;
  const lowSpecSections = specificityPerSection.filter(s => s < 2);
  if (lowSpecSections.length > 0) {
    issues.push(`${lowSpecSections.length}/${article.sections.length} sections have < 2 concrete data points`);
  }

  // Actionability: sections with imperatives, links, or step lists
  let actionabilityCount = 0;
  for (const s of article.sections) {
    const content = s.content;
    const hasLink = /\[[^\]]+\]\([^)]+\)/.test(content);
    const hasImperative = /\b(step \d|1\.|start by|apply|sign up|download|create|check|call|visit|try|use our)\b/i.test(content);
    const hasSteps = /\n\d+\.|^\d+\./m.test(content);
    if (hasLink || hasImperative || hasSteps) actionabilityCount++;
  }
  if (actionabilityCount < article.sections.length * 0.5) {
    issues.push(`Only ${actionabilityCount}/${article.sections.length} sections have actionable elements`);
  }

  // Redundancy detection: simple keyword overlap between sections
  const redundantSections: string[] = [];
  for (let i = 0; i < article.sections.length; i++) {
    for (let j = i + 1; j < article.sections.length; j++) {
      const wordsAArr = stripMarkdown(article.sections[i].content).toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const wordsBSet = new Set(stripMarkdown(article.sections[j].content).toLowerCase().split(/\s+/).filter(w => w.length > 4));
      const intersection = wordsAArr.filter(w => wordsBSet.has(w));
      const overlap = wordsAArr.length > 0 ? intersection.length / wordsAArr.length : 0;
      if (overlap > 0.5) {
        redundantSections.push(`"${article.sections[i].heading}" and "${article.sections[j].heading}" share >50% vocabulary`);
      }
    }
  }

  // Question-answer alignment: do question H2s get answered?
  const questionH2s = article.sections.filter(s =>
    s.heading.endsWith('?') || /^(how|what|why|when|where|which|can|do|does|is|are|should)/i.test(s.heading)
  );
  const answeredQuestions = questionH2s.filter(s => {
    const keywords = s.heading.toLowerCase().replace(/[?]/g, '').split(/\s+/).filter(w => w.length > 3);
    const content = s.content.toLowerCase();
    return keywords.filter(k => content.includes(k)).length >= keywords.length * 0.5;
  });
  const questionAnswerAlignment = questionH2s.length > 0
    ? (answeredQuestions.length / questionH2s.length) * 100
    : 100;

  // Persona match
  const personaMatch: string[] = [];
  const contentLower = article.fullContent.toLowerCase();
  if (article.targetPersonas) {
    personaMatch.push(...article.targetPersonas);
  } else {
    for (const [persona, painPoints] of Object.entries(PERSONA_PAIN_POINTS)) {
      if (painPoints.some(p => contentLower.includes(p))) {
        personaMatch.push(persona);
      }
    }
  }
  if (personaMatch.length === 0) {
    issues.push('Content does not clearly address any defined persona pain points');
  }

  // Composite usefulness score
  let score = 0;
  score += Math.min(25, answerCompleteness * 0.25);
  score += Math.min(25, avgSpecificity * 12.5);
  score += Math.min(20, (actionabilityCount / Math.max(1, article.sections.length)) * 20);
  score += Math.min(15, questionAnswerAlignment * 0.15);
  score += personaMatch.length > 0 ? 15 : 0;
  score -= redundantSections.length * 5;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    answerCompleteness,
    specificityPerSection,
    avgSpecificity: Math.round(avgSpecificity * 10) / 10,
    actionabilityCount,
    redundantSections,
    questionAnswerAlignment: Math.round(questionAnswerAlignment),
    personaMatch,
    issues,
  };
}

// ============================================
// 2. BRAND TONE SCORING (weight: 0.15)
// ============================================

function scoreBrandTone(article: NormalizedArticle): BrandToneScore {
  const issues: string[] = [];
  const content = article.fullContent;
  const contentLower = content.toLowerCase();

  // Banned phrases
  const foundBanned: string[] = [];
  for (const phrase of BANNED_PHRASES) {
    if (contentLower.includes(phrase.toLowerCase())) {
      foundBanned.push(phrase);
    }
  }

  // Em dashes
  const emDashMatches = content.match(/—/g);
  const emDashCount = emDashMatches ? emDashMatches.length : 0;

  if (foundBanned.length > 0) issues.push(`Banned phrases: ${foundBanned.join(', ')}`);
  if (emDashCount > 0) issues.push(`${emDashCount} em dash(es) found`);

  // "You" language ratio
  const youMatches = contentLower.match(/\b(you|your|you're|you'll|you've)\b/g) || [];
  const weMatches = contentLower.match(/\b(we|our|we're|we'll|one should|one must)\b/g) || [];
  const total = youMatches.length + weMatches.length;
  const youLanguageRatio = total > 0 ? youMatches.length / total : 0;
  if (youLanguageRatio < 0.7) {
    issues.push(`"You" language ratio ${Math.round(youLanguageRatio * 100)}% (target >= 70%)`);
  }

  // AI slop detection
  const aiSlopPatterns: string[] = [];
  for (const pattern of AI_SLOP_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      aiSlopPatterns.push(...matches.map(m => m.trim()));
    }
  }
  if (aiSlopPatterns.length > 0) {
    issues.push(`AI slop patterns found: ${aiSlopPatterns.slice(0, 3).join('; ')}`);
  }

  // Voice warmth: contractions, questions, direct address
  const contractionCount = (content.match(/\b(don't|won't|can't|shouldn't|wouldn't|isn't|aren't|you're|you'll|we're|it's|that's|here's|there's)\b/gi) || []).length;
  const questionCount = (content.match(/\?/g) || []).length;
  const sentences = getSentences(content);
  const warmthRatio = sentences.length > 0 ? (contractionCount + questionCount) / sentences.length : 0;
  const voiceWarmth = Math.min(100, warmthRatio * 200);

  // Empowerment vs fear
  let fearCount = 0;
  for (const pattern of FEAR_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) fearCount += matches.length;
  }
  const empowermentPatterns = /here's how|you can|steps to|your (path|plan|strategy)|build your|grow your|earn more/gi;
  const empowermentCount = (content.match(empowermentPatterns) || []).length;
  const empowermentRatio = (empowermentCount + fearCount) > 0
    ? empowermentCount / (empowermentCount + fearCount)
    : 1;
  if (fearCount > 2) {
    issues.push(`${fearCount} fear-based phrases detected`);
  }

  // Reading level
  const readingLevel = estimateReadingLevel(content);
  if (readingLevel > 8) {
    issues.push(`Reading level ${readingLevel} exceeds Grade 8 target`);
  }

  // Sentence variety: standard deviation of sentence lengths
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  let sentenceVariety = 0;
  if (sentenceLengths.length > 2) {
    const mean = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / sentenceLengths.length;
    sentenceVariety = Math.sqrt(variance);
    if (sentenceVariety < 3) {
      issues.push(`Low sentence variety (stddev ${sentenceVariety.toFixed(1)}). Sentences are too uniform in length`);
    }
  }

  // Filler word density
  const words = contentLower.split(/\s+/);
  const fillerCount = words.filter(w => FILLER_WORDS.includes(w)).length;
  const fillerDensity = words.length > 0 ? fillerCount / words.length : 0;
  if (fillerDensity > 0.02) {
    issues.push(`High filler word density (${(fillerDensity * 100).toFixed(1)}%)`);
  }

  // Score
  let score = 100;
  score -= foundBanned.length * 10;
  score -= emDashCount * 5;
  score -= aiSlopPatterns.length * 8;
  if (youLanguageRatio < 0.7) score -= (0.7 - youLanguageRatio) * 50;
  if (voiceWarmth < 30) score -= 10;
  if (empowermentRatio < 0.8) score -= 10;
  if (readingLevel > 8) score -= (readingLevel - 8) * 5;
  if (sentenceVariety < 3 && sentenceLengths.length > 2) score -= 10;
  if (fillerDensity > 0.02) score -= 5;
  score -= fearCount * 3;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    youLanguageRatio: Math.round(youLanguageRatio * 100) / 100,
    aiSlopPatterns,
    voiceWarmth: Math.round(voiceWarmth),
    empowermentRatio: Math.round(empowermentRatio * 100) / 100,
    readingLevel,
    sentenceVariety: Math.round(sentenceVariety * 10) / 10,
    bannedPhrases: foundBanned,
    emDashCount,
    issues,
  };
}

// ============================================
// 3. DATA ACCURACY SCORING (weight: 0.20)
// ============================================

function scoreDataAccuracy(article: NormalizedArticle): DataAccuracyScore {
  const issues: string[] = [];
  const content = article.fullContent;

  // Find all claims: sentences with dollar amounts, percentages, or statistics
  const sentences = getSentences(content);
  const claimSentences = sentences.filter(s =>
    /\$\d+|\d+%|\d+\.\d+|\b\d{1,3}(,\d{3})+\b/.test(s)
  );
  const totalClaims = claimSentences.length;

  // Check citation density: claim sentence must have a source reference
  const citationPattern = /\((bls|dol|irs|shrm|indeed|osha|o\*net|forbes|bureau|department|linkedin|firsthr|jobseeker|careerscape|nace|ashby|resume genius|fast company|jobscan|indeed flex)[^)]*\)/i;
  const inlineCitation = /(bls|dol|irs|shrm|osha|o\*net|forbes|bureau|linkedin|according to|source:|data from|reported by|per the|survey|report)/i;

  const uncitedClaims: string[] = [];
  let citedClaims = 0;

  for (const claim of claimSentences) {
    if (citationPattern.test(claim) || inlineCitation.test(claim)) {
      citedClaims++;
    } else {
      const trimmed = claim.length > 80 ? claim.slice(0, 80) + '...' : claim;
      uncitedClaims.push(trimmed);
    }
  }

  const citationDensity = totalClaims > 0 ? citedClaims / totalClaims : 1;
  if (uncitedClaims.length > 0) {
    issues.push(`${uncitedClaims.length} claim(s) lack source citations`);
  }

  // Source freshness: check for year references
  const currentYear = new Date().getFullYear();
  const yearPattern = /\b(20\d{2})\b/g;
  const years: number[] = [];
  let match;
  while ((match = yearPattern.exec(content)) !== null) {
    years.push(parseInt(match[1]));
  }

  const staleReferences: string[] = [];
  const recentYears = years.filter(y => y >= currentYear - 1);
  const oldYears = years.filter(y => y < currentYear - 2);
  if (oldYears.length > 0) {
    const uniqueOld = Array.from(new Set(oldYears)).sort();
    staleReferences.push(`References from ${uniqueOld.join(', ')} may be outdated`);
    issues.push(`${oldYears.length} reference(s) older than 2 years: ${uniqueOld.join(', ')}`);
  }

  const sourceFreshness = years.length > 0
    ? Math.min(100, (recentYears.length / years.length) * 100)
    : 50;

  // Broken internal links: check markdown links to /career-hub/
  const linkPattern = /\[([^\]]+)\]\((\/career-hub\/[^)]+)\)/g;
  const brokenLinks: string[] = [];
  let linkMatch;
  while ((linkMatch = linkPattern.exec(content)) !== null) {
    const href = linkMatch[2];
    if (href.includes('undefined') || href.includes('null')) {
      brokenLinks.push(href);
    }
  }
  if (brokenLinks.length > 0) {
    issues.push(`${brokenLinks.length} potentially broken internal link(s)`);
  }

  // Score
  let score = 0;
  score += Math.min(40, citationDensity * 40);
  score += Math.min(30, sourceFreshness * 0.3);
  score += brokenLinks.length === 0 ? 15 : Math.max(0, 15 - brokenLinks.length * 5);
  score += totalClaims > 0 ? 15 : 5; // articles with data points get more credit

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    citationDensity: Math.round(citationDensity * 100) / 100,
    totalClaims,
    citedClaims,
    uncitedClaims: uncitedClaims.slice(0, 10),
    sourceFreshness: Math.round(sourceFreshness),
    staleReferences,
    brokenLinks,
    issues,
  };
}

// ============================================
// 4. SEO VALUE SCORING (weight: 0.15)
// ============================================

function scoreSeoValue(article: NormalizedArticle): SeoValueScore {
  const issues: string[] = [];
  const keyword = article.primaryKeyword || '';

  // Title checks
  const titleLength = article.title.length;
  const titleOk = titleLength >= 50 && titleLength <= 60;
  if (!titleOk) {
    issues.push(`Title length ${titleLength} (target 50-60 chars)`);
  }

  // Meta description
  const metaDescLength = article.description.length;
  const metaOk = metaDescLength >= 145 && metaDescLength <= 155;
  if (!metaOk) {
    issues.push(`Meta description length ${metaDescLength} (target 145-155 chars)`);
  }

  // Keyword in title
  const keywordInTitle = keyword
    ? article.title.toLowerCase().includes(keyword.toLowerCase())
    : true;

  // Keyword in H2s
  const h2s = article.sections.map(s => s.heading.toLowerCase());
  const keywordH2Count = keyword
    ? h2s.filter(h => h.includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().split(/\s+/).some(kw => kw.length > 3 && h.includes(kw))
      ).length
    : h2s.length;
  const keywordInH2Ratio = h2s.length > 0 ? keywordH2Count / h2s.length : 1;

  // Search intent match
  const inferredIntent = inferSearchIntent(article);
  const searchIntentMatch = article.searchIntent
    ? article.searchIntent === inferredIntent
    : true;

  // Internal links
  const linkPattern = /\[([^\]]+)\]\(\/career-hub\/[^)]+\)/g;
  const allLinks = article.fullContent.match(linkPattern) || [];
  const internalLinkCount = allLinks.length;

  // Internal link quality: are they spread across sections?
  const sectionLinkCounts = article.sections.map(s =>
    (s.content.match(/\[[^\]]+\]\(\/career-hub\/[^)]+\)/g) || []).length
  );
  const sectionsWithLinks = sectionLinkCounts.filter(c => c > 0).length;
  const internalLinkQuality = article.sections.length > 0
    ? Math.min(100, (sectionsWithLinks / article.sections.length) * 100)
    : 0;

  // Schema completeness
  let schemaCompleteness = 0;
  if (article.faqs.length >= 3) schemaCompleteness += 30;
  else if (article.faqs.length >= 1) schemaCompleteness += 15;
  schemaCompleteness += 30; // Article schema assumed
  schemaCompleteness += 20; // BreadcrumbList assumed
  if (article.sections.some(s => /step|how to/i.test(s.heading))) schemaCompleteness += 20;

  // Freshness signal
  const currentYear = new Date().getFullYear().toString();
  const freshnessSignal = article.fullContent.includes(currentYear) ||
    article.fullContent.includes((parseInt(currentYear) - 1).toString());

  if (!freshnessSignal) issues.push('No current year reference for freshness signal');
  if (internalLinkCount < 2) issues.push(`Only ${internalLinkCount} internal link(s) (target >= 3)`);

  // Score
  let score = 0;
  if (titleOk) score += 15; else if (titleLength > 0) score += 8;
  if (metaOk) score += 15; else if (metaDescLength > 0) score += 8;
  if (keywordInTitle) score += 10;
  score += Math.min(15, keywordInH2Ratio * 15);
  if (searchIntentMatch) score += 10;
  if (internalLinkCount >= 3) score += 10; else if (internalLinkCount >= 2) score += 7;
  score += Math.min(10, internalLinkQuality * 0.1);
  score += Math.min(10, schemaCompleteness * 0.1);
  if (freshnessSignal) score += 5;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    titleLength,
    titleOk,
    metaDescLength,
    metaOk,
    keywordInTitle,
    keywordInH2Ratio: Math.round(keywordInH2Ratio * 100) / 100,
    searchIntentMatch,
    internalLinkCount,
    internalLinkQuality: Math.round(internalLinkQuality),
    schemaCompleteness: Math.min(100, schemaCompleteness),
    freshnessSignal,
    issues,
  };
}

function inferSearchIntent(article: NormalizedArticle): string {
  const title = article.title.toLowerCase();
  const headings = article.sections.map(s => s.heading.toLowerCase()).join(' ');

  if (/vs\.?|versus|comparison|compare|alternative/i.test(title)) return 'comparison';
  if (/how to|how do|step|guide|tips|template/i.test(title)) return 'how-to';
  if (/download|sign up|apply|buy|get started/i.test(title + headings)) return 'transactional';
  return 'informational';
}

// ============================================
// 5. AEO SCORING (weight: 0.10)
// ============================================

function scoreAeo(article: NormalizedArticle): AeoScore {
  const issues: string[] = [];

  // Answer-first: intro provides a direct answer in bold within first 60 words
  const introSection = article.description + '\n' + (article.sections[0]?.content || '');
  const introFirst60Words = stripMarkdown(introSection).split(/\s+/).slice(0, 60).join(' ');
  const answerFirst = (
    /\$\d+|\d+%|\d+ (hour|day|week|month|year)/i.test(introFirst60Words)
    || /\b(the (answer|short answer)|you (can|should|need|will))\b/i.test(introFirst60Words)
  );
  if (!answerFirst) issues.push('No answer-first formatting in intro (no data point or direct answer in first 60 words)');

  // Question-format H2s
  const h2s = article.sections.map(s => s.heading);
  const totalH2s = h2s.length;
  const questionH2s = h2s.filter(h =>
    h.endsWith('?') || /^(how|what|why|when|where|which|can|do|does|is|are|should)/i.test(h)
  ).length;
  if (totalH2s > 0 && questionH2s / totalH2s < 0.5) {
    issues.push(`Only ${questionH2s}/${totalH2s} H2s use question format (target >= 50%)`);
  }

  // Direct answers per section
  const directAnswers = article.sections.filter(s => {
    const firstSentences = getSentences(s.content).slice(0, 2);
    const firstWords = firstSentences.join(' ').split(/\s+/).length;
    return firstWords > 5 && firstWords <= 60;
  }).length;

  const faqCount = article.faqs.length;
  if (faqCount < 3) issues.push(`Only ${faqCount} FAQ(s) (target 3-5)`);

  // Entity clarity
  const first100 = stripMarkdown(article.fullContent).split(/\s+/).slice(0, 100).join(' ');
  const entityClarity = /\b(worker|job|career|shift|hourly|temp|gig|warehouse|hospitality|retail|resume|interview)\b/i.test(first100);

  let score = 0;
  if (answerFirst) score += 25;
  if (totalH2s > 0) score += Math.min(25, (questionH2s / totalH2s) * 25);
  if (totalH2s > 0) score += Math.min(20, (directAnswers / totalH2s) * 20);
  if (faqCount >= 5) score += 15; else if (faqCount >= 3) score += 10; else if (faqCount >= 1) score += 5;
  if (entityClarity) score += 15;

  return {
    score: Math.round(Math.min(100, score)),
    answerFirst,
    questionH2s,
    totalH2s,
    directAnswers,
    faqCount,
    entityClarity,
    issues,
  };
}

// ============================================
// 6. UX QUALITY SCORING (weight: 0.15)
// ============================================

function scoreUxQuality(article: NormalizedArticle): UxQualityScore {
  const issues: string[] = [];
  const content = article.fullContent;

  // Scannability: ratio of formatted content
  const totalLines = content.split('\n').filter(l => l.trim().length > 0);
  const formattedLines = totalLines.filter(l =>
    /^\s*[-*]\s/.test(l) ||       // bullet points
    /^\s*\d+\.\s/.test(l) ||      // numbered lists
    /\*\*[^*]+\*\*/.test(l) ||    // bold text
    /^\|/.test(l) ||               // table rows
    /^#{1,4}\s/.test(l)            // headers
  );
  const scannability = totalLines.length > 0
    ? (formattedLines.length / totalLines.length) * 100
    : 0;
  if (scannability < 40) {
    issues.push(`Scannability ${Math.round(scannability)}% (target >= 40% formatted content)`);
  }

  // Table quality: tables with headers and >= 3 data rows
  const tablePattern = /\|[^|]+\|/g;
  const tableRows = content.match(tablePattern) || [];
  const headerSeparators = (content.match(/\|[-:]+\|/g) || []).length;
  const tableQuality = headerSeparators > 0 && tableRows.length > headerSeparators * 4 ? 100 : // >= 3 data rows per table
    headerSeparators > 0 ? 60 : tableRows.length > 0 ? 30 : 0;

  // Section balance: word count variance
  const sectionWordCounts = article.sections.map(s => getWordCount(s.content));
  let sectionBalance = 100;
  if (sectionWordCounts.length > 1) {
    const maxWords = Math.max(...sectionWordCounts);
    const minWords = Math.min(...sectionWordCounts);
    if (minWords > 0 && maxWords / minWords > 3) {
      sectionBalance = Math.max(0, 100 - ((maxWords / minWords - 3) * 20));
      issues.push(`Section imbalance: longest section is ${Math.round(maxWords / minWords)}x the shortest`);
    }
  }

  // CTA presence
  const ctaPresent = /\[([^\]]+)\]\((https?:\/\/|\/career-hub\/tools\/)[^)]+\)/i.test(content) ||
    /download|sign up|get started|apply now|try our/i.test(content);
  if (!ctaPresent) issues.push('No clear CTA (link to tool, download, or action)');

  // Internal link distribution
  const sectionLinkCounts = article.sections.map(s =>
    (s.content.match(/\[[^\]]+\]\(\/career-hub\/[^)]+\)/g) || []).length
  );
  const sectionsWithLinks = sectionLinkCounts.filter(c => c > 0).length;
  const linkDistribution = article.sections.length > 0
    ? (sectionsWithLinks / article.sections.length) * 100
    : 0;
  if (linkDistribution < 30) {
    issues.push(`Links concentrated: only ${sectionsWithLinks}/${article.sections.length} sections have internal links`);
  }

  // Paragraph length check
  const paragraphs = getParagraphs(content);
  const longParagraphs = paragraphs.filter(
    p => p.split('\n').filter(l => l.trim() && !l.trim().startsWith('|') && !l.trim().startsWith('-')).length > 4
  );
  const paragraphLengthOk = longParagraphs.length === 0;
  if (!paragraphLengthOk) {
    issues.push(`${longParagraphs.length} paragraph(s) exceed 4 lines`);
  }

  let score = 0;
  score += Math.min(25, scannability * 0.625); // 25 pts at 40%+
  score += Math.min(20, tableQuality * 0.2);
  score += Math.min(15, sectionBalance * 0.15);
  score += ctaPresent ? 15 : 0;
  score += Math.min(15, linkDistribution * 0.15);
  score += paragraphLengthOk ? 10 : 0;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    scannability: Math.round(scannability),
    tableQuality,
    sectionBalance: Math.round(sectionBalance),
    ctaPresent,
    linkDistribution: Math.round(linkDistribution),
    paragraphLengthOk,
    issues,
  };
}

// ============================================
// COMPOSITE SCORING
// ============================================

function computeComposite(
  usefulness: UsefulnessScore,
  brandTone: BrandToneScore,
  dataAccuracy: DataAccuracyScore,
  seoValue: SeoValueScore,
  aeo: AeoScore,
  uxQuality: UxQualityScore,
): { composite: number; pass: boolean; actionNeeded: QualityScore['actionNeeded'] } {
  const composite = Math.round(
    usefulness.score * DIMENSION_WEIGHTS.usefulness
    + brandTone.score * DIMENSION_WEIGHTS.brandTone
    + dataAccuracy.score * DIMENSION_WEIGHTS.dataAccuracy
    + seoValue.score * DIMENSION_WEIGHTS.seoValue
    + aeo.score * DIMENSION_WEIGHTS.aeo
    + uxQuality.score * DIMENSION_WEIGHTS.uxQuality
  );

  let actionNeeded: QualityScore['actionNeeded'] = 'none';
  if (composite < 40) actionNeeded = 'research-needed';
  else if (composite < 60) actionNeeded = 'rewrite';
  else if (composite < PASS_THRESHOLD) actionNeeded = 'minor-edits';

  return {
    composite: Math.min(100, composite),
    pass: composite >= PASS_THRESHOLD,
    actionNeeded,
  };
}

// ============================================
// PUBLIC API
// ============================================

export interface ScoreOptions {
  primaryKeyword?: string;
  contentType?: string;
}

export function scoreArticle(
  article: Article | FinancialArticle,
  options: ScoreOptions = {},
): QualityScore {
  const normalized = normalizeArticle(article);
  if (options.primaryKeyword) normalized.primaryKeyword = options.primaryKeyword;

  const usefulness = scoreUsefulness(normalized);
  const brandTone = scoreBrandTone(normalized);
  const dataAccuracy = scoreDataAccuracy(normalized);
  const seoValue = scoreSeoValue(normalized);
  const aeo = scoreAeo(normalized);
  const uxQuality = scoreUxQuality(normalized);
  const { composite, pass, actionNeeded } = computeComposite(
    usefulness, brandTone, dataAccuracy, seoValue, aeo, uxQuality,
  );

  return {
    slug: normalized.slug,
    timestamp: new Date().toISOString(),
    usefulness,
    brandTone,
    dataAccuracy,
    seoValue,
    aeo,
    uxQuality,
    composite,
    pass,
    actionNeeded,
  };
}

export function scoreAllArticles(
  articles: (Article | FinancialArticle)[],
  options: ScoreOptions = {},
): QualityScore[] {
  return articles
    .map(a => scoreArticle(a, options))
    .sort((a, b) => a.composite - b.composite);
}

export function formatScoreSummary(score: QualityScore): string {
  const status = score.pass ? 'PASS' : 'FAIL';
  const lines = [
    `[${status}] ${score.slug} — Composite: ${score.composite}/100`,
    `  Usefulness: ${score.usefulness.score} | Brand Tone: ${score.brandTone.score} | Data Accuracy: ${score.dataAccuracy.score}`,
    `  SEO Value: ${score.seoValue.score} | AEO: ${score.aeo.score} | UX Quality: ${score.uxQuality.score}`,
  ];

  const allIssues = [
    ...score.usefulness.issues,
    ...score.brandTone.issues,
    ...score.dataAccuracy.issues,
    ...score.seoValue.issues,
    ...score.aeo.issues,
    ...score.uxQuality.issues,
  ];

  if (allIssues.length > 0) {
    lines.push(`  Issues (${allIssues.length}):`);
    for (const issue of allIssues.slice(0, 10)) {
      lines.push(`    - ${issue}`);
    }
    if (allIssues.length > 10) lines.push(`    ... and ${allIssues.length - 10} more`);
  }

  if (score.actionNeeded !== 'none') {
    lines.push(`  Action needed: ${score.actionNeeded}`);
  }

  return lines.join('\n');
}

export function getArticlesNeedingAttention(
  scores: QualityScore[],
): QualityScore[] {
  return scores
    .filter(s => !s.pass)
    .sort((a, b) => a.composite - b.composite);
}
