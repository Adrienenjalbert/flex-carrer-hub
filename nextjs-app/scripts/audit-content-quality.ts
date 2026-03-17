#!/usr/bin/env ts-node
/**
 * Content Quality Audit Script
 *
 * Runs the quality scorer on all article data files and outputs
 * scores alongside the existing metadata audit.
 *
 * Usage: npm run audit:quality
 */

import fs from 'fs';
import path from 'path';

// Since we can't use @ path aliases in scripts, we use relative paths
// and dynamically import the article data.

interface ArticleSection {
  heading: string;
  content: string;
}

interface ArticleLike {
  slug: string;
  title: string;
  description: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  keyTakeaways: string[];
  relatedArticles: string[];
  category?: string;
}

// ============================================
// INLINE QUALITY SCORER (standalone version)
// ============================================
// Duplicated from quality-scorer.ts for script portability
// (scripts can't reliably use Next.js path aliases)

const BANNED_PHRASES = [
  'delve into', 'delve deeper', 'delving', 'dive deep', 'deep dive into',
  'navigate the', 'navigating the', 'when it comes to', "in today's",
  'leverage your', 'leveraging', 'robust', 'comprehensive guide',
  'seamless', 'game-changing', 'game changer', "it's not just",
];

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`#]/g, '')
    .replace(/\|[^|]*\|/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function getSentences(text: string): string[] {
  return stripMarkdown(text).split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
}

function getWordCount(text: string): number {
  return stripMarkdown(text).split(/\s+/).filter(w => w.length > 0).length;
}

function getFirst100Words(text: string): string {
  return stripMarkdown(text).split(/\s+/).slice(0, 100).join(' ');
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
  const syllableCount = words.reduce((t, w) => t + countSyllables(w), 0);
  const grade = 0.39 * (words.length / sentences.length) + 11.8 * (syllableCount / words.length) - 15.59;
  return Math.max(1, Math.round(grade * 10) / 10);
}

interface QualityResult {
  slug: string;
  composite: number;
  pass: boolean;
  actionNeeded: string;
  brand: { score: number; issues: string[]; bannedPhrases: string[]; emDashCount: number; readingLevel: number };
  craft: { score: number; contextual: boolean; real: number; actionable: boolean; fresh: boolean; trustworthy: boolean };
  seo: { score: number; titleLength: number; metaDescLength: number; internalLinks: number };
  aeo: { score: number; questionH2s: number; totalH2s: number; faqCount: number; answerFirst: boolean };
  depth: { wordCount: number; namedExamples: number; faqCount: number; meetsMinimum: boolean };
}

function scoreArticle(article: ArticleLike): QualityResult {
  const fullContent = [
    article.description,
    ...article.keyTakeaways,
    ...article.sections.map(s => `${s.heading}\n${s.content}`),
    ...article.faqs.map(f => `${f.question}\n${f.answer}`),
  ].join('\n\n');

  const contentLower = fullContent.toLowerCase();

  // --- Brand ---
  const brandIssues: string[] = [];
  const foundBanned: string[] = [];
  for (const phrase of BANNED_PHRASES) {
    if (contentLower.includes(phrase.toLowerCase())) foundBanned.push(phrase);
  }
  const emDashCount = (fullContent.match(/—/g) || []).length;
  if (foundBanned.length > 0) brandIssues.push(`Banned: ${foundBanned.join(', ')}`);
  if (emDashCount > 0) brandIssues.push(`${emDashCount} em dash(es)`);

  const sentences = getSentences(fullContent);
  const sentLengths = sentences.map(s => s.split(/\s+/).length);
  const longSentences = sentLengths.filter(l => l > 25).length;
  if (longSentences > 0) brandIssues.push(`${longSentences} sentence(s) > 25 words`);

  const readingLevel = estimateReadingLevel(fullContent);
  if (readingLevel > 10) brandIssues.push(`Reading level ${readingLevel} (target: 8)`);

  let brandScore = 100 - foundBanned.length * 10 - emDashCount * 5 - longSentences * 3;
  if (readingLevel > 10) brandScore -= (readingLevel - 8) * 3;
  brandScore = Math.max(0, Math.min(100, brandScore));

  // --- CRAFT ---
  const contextPatterns = [/warehouse/i, /hospitality/i, /retail/i, /temp worker/i, /gig worker/i, /flexible/i, /hourly/i, /indeed flex/i, /by state/i, /varies/i];
  const contextual = contextPatterns.some(p => p.test(fullContent));
  let realCount = 0;
  if (/\b(bls|bureau of labor|dol|irs|osha)\b/i.test(contentLower)) realCount++;
  if (/indeed flex/i.test(contentLower)) realCount++;
  if (/\$\d+/i.test(contentLower)) realCount++;
  if (/varies by state/i.test(contentLower)) realCount++;
  if (/according to|source:|data from/i.test(contentLower)) realCount++;
  const actionable = /\b(step \d|how to|start by|apply|sign up|download)\b/i.test(contentLower);
  const currentYear = new Date().getFullYear().toString();
  const fresh = contentLower.includes(currentYear) || contentLower.includes((parseInt(currentYear) - 1).toString());
  const trustworthy = [/according to/i, /source:/i, /\(bls/i, /data from/i, /as of \d{4}/i].filter(p => p.test(contentLower)).length >= 2;
  const craftDims = [contextual, realCount >= 2, actionable, fresh, trustworthy];
  const craftScore = Math.round((craftDims.filter(Boolean).length / craftDims.length) * 100);

  // --- SEO ---
  const titleLength = article.title.length;
  const metaDescLength = article.description.length;
  const linkMatches = fullContent.match(/\[([^\]]+)\]\(\/career-hub\/[^)]+\)/g) || [];
  const internalLinks = linkMatches.length;
  let seoScore = 0;
  if (titleLength >= 50 && titleLength <= 60) seoScore += 20; else if (titleLength > 0) seoScore += 10;
  if (metaDescLength >= 145 && metaDescLength <= 155) seoScore += 20; else if (metaDescLength > 0) seoScore += 10;
  if (titleLength <= 65) seoScore += 15;
  seoScore += 15; // keyword assumed present
  if (internalLinks >= 3) seoScore += 15; else if (internalLinks >= 2) seoScore += 10;
  if (article.faqs.length > 0) seoScore += 15; else seoScore += 5;
  seoScore = Math.min(100, seoScore);

  // --- AEO ---
  const introFirst60 = stripMarkdown(article.description + '\n' + (article.sections[0]?.content || '')).split(/\s+/).slice(0, 60).join(' ');
  const answerFirst = /\$\d+|\d+%|\d+ (hour|day|week)/i.test(introFirst60) || /you (can|should|need)/i.test(introFirst60);
  const h2s = article.sections.map(s => s.heading);
  const totalH2s = h2s.length;
  const questionH2s = h2s.filter(h => h.endsWith('?') || /^(how|what|why|when|where|which|can|do|does|is|are|should)/i.test(h)).length;
  const faqCount = article.faqs.length;
  let aeoScore = 0;
  if (answerFirst) aeoScore += 25;
  if (totalH2s > 0) aeoScore += Math.min(25, (questionH2s / totalH2s) * 25);
  if (faqCount >= 5) aeoScore += 15; else if (faqCount >= 3) aeoScore += 10;
  aeoScore += 15; // entity clarity baseline
  aeoScore = Math.round(Math.min(100, aeoScore));

  // --- Depth ---
  const wordCount = getWordCount(fullContent);
  const namedPatterns = [/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, /\b(Indeed Flex|Instawork|Wonolo|ServSafe|OSHA|BLS|DOL|IRS)\b/g];
  const namedSet = new Set<string>();
  for (const p of namedPatterns) { (fullContent.match(p) || []).forEach(m => namedSet.add(m)); }
  const namedExamples = namedSet.size;
  const meetsMinimum = wordCount >= 500 && faqCount >= 3;
  const depthNorm = meetsMinimum ? 100 : Math.round((wordCount / 500) * 50);

  // --- Composite ---
  const composite = Math.round(
    brandScore * 0.25 + craftScore * 0.25 + seoScore * 0.20 + aeoScore * 0.15 + depthNorm * 0.15
  );
  const pass = composite >= 70;
  let actionNeeded = 'none';
  if (composite < 40) actionNeeded = 'research-needed';
  else if (composite < 60) actionNeeded = 'rewrite';
  else if (composite < 70) actionNeeded = 'minor-edits';

  return {
    slug: article.slug,
    composite: Math.min(100, composite),
    pass,
    actionNeeded,
    brand: { score: brandScore, issues: brandIssues, bannedPhrases: foundBanned, emDashCount, readingLevel },
    craft: { score: craftScore, contextual, real: realCount, actionable, fresh, trustworthy },
    seo: { score: seoScore, titleLength, metaDescLength, internalLinks },
    aeo: { score: aeoScore, questionH2s, totalH2s, faqCount, answerFirst },
    depth: { wordCount, namedExamples, faqCount, meetsMinimum },
  };
}

// ============================================
// DATA LOADING
// ============================================

async function loadArticles(): Promise<ArticleLike[]> {
  const articles: ArticleLike[] = [];

  // Load guides
  const guidesPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'articles', 'guides.ts');
  const guidesContent = fs.readFileSync(guidesPath, 'utf-8');

  // Load financial tips
  const financialPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'articles', 'financial-tips.ts');
  const financialContent = fs.readFileSync(financialPath, 'utf-8');

  // Load job application articles
  const jobAppPath = path.join(__dirname, '..', 'src', 'lib', 'data', 'articles', 'job-application-articles.ts');
  let jobAppContent = '';
  if (fs.existsSync(jobAppPath)) {
    jobAppContent = fs.readFileSync(jobAppPath, 'utf-8');
  }

  // Extract article objects using regex pattern matching on the TS source.
  // This is a heuristic approach since we can't execute the TS directly
  // in a script context without full Next.js compilation.
  const allContent = guidesContent + '\n' + financialContent + '\n' + jobAppContent;

  const slugPattern = /slug:\s*["']([^"']+)["']/g;
  const titlePattern = /title:\s*["']([^"']+)["']/g;

  const slugs: string[] = [];
  let match;
  while ((match = slugPattern.exec(allContent)) !== null) {
    slugs.push(match[1]);
  }

  console.log(`Found ${slugs.length} article slugs to audit\n`);

  // For the full audit, we need the actual article objects.
  // Since we can't import TS modules directly, we parse them manually.
  // For a robust solution, this script should be run via tsx or ts-node with paths configured.

  // Fallback: parse the TS files to extract article data structures
  const articleBlocks = extractArticleBlocks(allContent);
  return articleBlocks;
}

function extractArticleBlocks(content: string): ArticleLike[] {
  const articles: ArticleLike[] = [];

  // Match article object blocks by finding slug/title/sections patterns
  // Split on common article object boundary patterns
  const blockPattern = /\{\s*slug:\s*["']([^"']+)["']/g;
  const positions: number[] = [];
  let m;
  while ((m = blockPattern.exec(content)) !== null) {
    positions.push(m.index);
  }

  for (let i = 0; i < positions.length; i++) {
    const start = positions[i];
    const end = positions[i + 1] || content.length;
    const block = content.slice(start, end);

    const slug = extractField(block, 'slug');
    const title = extractField(block, 'title');
    const description = extractField(block, 'description');

    if (!slug || !title) continue;

    const sections = extractSections(block);
    const faqs = extractFaqs(block);
    const keyTakeaways = extractStringArray(block, 'keyTakeaways');
    const relatedArticles = extractStringArray(block, 'relatedArticles');

    if (sections.length === 0) continue;

    articles.push({
      slug,
      title,
      description: description || '',
      sections,
      faqs,
      keyTakeaways,
      relatedArticles,
    });
  }

  return articles;
}

function extractField(block: string, field: string): string {
  // Match both single-quoted and double-quoted string values, including template literals
  const patterns = [
    new RegExp(`${field}:\\s*["']([^"']+)["']`),
    new RegExp(`${field}:\\s*\`([^\`]+)\``),
  ];
  for (const p of patterns) {
    const m = block.match(p);
    if (m) return m[1];
  }
  return '';
}

function extractSections(block: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const sectionPattern = /\{\s*heading:\s*["'`]([^"'`]+)["'`]\s*,\s*content:\s*["'`]/g;
  let m;
  while ((m = sectionPattern.exec(block)) !== null) {
    const heading = m[1];
    // Extract content string (find the closing quote that matches)
    const contentStart = m.index + m[0].length;
    const quoteChar = block[contentStart - 1];
    let contentEnd = contentStart;
    let depth = 0;
    while (contentEnd < block.length) {
      if (block[contentEnd] === '\\') { contentEnd += 2; continue; }
      if (block[contentEnd] === quoteChar && depth === 0) break;
      contentEnd++;
    }
    const content = block.slice(contentStart, contentEnd)
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    sections.push({ heading, content });
  }
  return sections;
}

function extractFaqs(block: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const faqPattern = /question:\s*["'`]([^"'`]+)["'`]\s*,\s*answer:\s*["'`]/g;
  let m;
  while ((m = faqPattern.exec(block)) !== null) {
    const question = m[1];
    const answerStart = m.index + m[0].length;
    const quoteChar = block[answerStart - 1];
    let answerEnd = answerStart;
    while (answerEnd < block.length) {
      if (block[answerEnd] === '\\') { answerEnd += 2; continue; }
      if (block[answerEnd] === quoteChar) break;
      answerEnd++;
    }
    const answer = block.slice(answerStart, answerEnd).replace(/\\n/g, '\n').replace(/\\"/g, '"');
    faqs.push({ question, answer });
  }
  return faqs;
}

function extractStringArray(block: string, field: string): string[] {
  const pattern = new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`);
  const m = block.match(pattern);
  if (!m) return [];
  return m[1].match(/["'`]([^"'`]+)["'`]/g)?.map(s => s.replace(/["'`]/g, '')) || [];
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('Content Quality Audit\n' + '='.repeat(60) + '\n');

  const articles = await loadArticles();
  console.log(`Scoring ${articles.length} articles...\n`);

  const results = articles.map(a => scoreArticle(a));
  results.sort((a, b) => a.composite - b.composite);

  const passing = results.filter(r => r.pass);
  const failing = results.filter(r => !r.pass);

  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total articles:  ${results.length}`);
  console.log(`Passing (>=70):  ${passing.length}`);
  console.log(`Failing (<70):   ${failing.length}`);
  console.log(`Avg composite:   ${Math.round(results.reduce((s, r) => s + r.composite, 0) / results.length)}`);
  console.log();

  // Dimension averages
  const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  console.log('DIMENSION AVERAGES');
  console.log('='.repeat(60));
  console.log(`Brand:  ${avg(results.map(r => r.brand.score))}/100`);
  console.log(`CRAFT:  ${avg(results.map(r => r.craft.score))}/100`);
  console.log(`SEO:    ${avg(results.map(r => r.seo.score))}/100`);
  console.log(`AEO:    ${avg(results.map(r => r.aeo.score))}/100`);
  console.log(`Depth:  ${avg(results.map(r => r.depth.wordCount))} words avg`);
  console.log();

  // Failing articles
  if (failing.length > 0) {
    console.log('ARTICLES NEEDING ATTENTION');
    console.log('='.repeat(60));
    for (const r of failing) {
      console.log(`\n  ${r.slug} — ${r.composite}/100 [${r.actionNeeded}]`);
      console.log(`    Brand: ${r.brand.score} | CRAFT: ${r.craft.score} | SEO: ${r.seo.score} | AEO: ${r.aeo.score}`);
      console.log(`    Words: ${r.depth.wordCount} | FAQs: ${r.depth.faqCount} | Examples: ${r.depth.namedExamples}`);
      if (r.brand.issues.length > 0) {
        r.brand.issues.forEach(i => console.log(`    ! ${i}`));
      }
    }
    console.log();
  }

  // All articles ranked
  console.log('ALL ARTICLES RANKED');
  console.log('='.repeat(60));
  for (const r of results) {
    const status = r.pass ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${r.composite.toString().padStart(3)}  ${r.slug}`);
  }

  // Write report
  const reportPath = path.join(__dirname, '..', 'quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      passing: passing.length,
      failing: failing.length,
      avgComposite: Math.round(results.reduce((s, r) => s + r.composite, 0) / results.length),
    },
    articles: results,
  }, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);
}

main().catch(console.error);
