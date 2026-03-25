/**
 * Scores Career Hub guide articles across Brand, CRAFT, SEO, AEO, and Depth dimensions.
 * Run: npx tsx scripts/score-guides.ts
 */

import { guideArticles } from "../src/lib/data/articles/guides";

const BANNED_PHRASES = [
  "delve",
  "navigate the",
  "leveraging",
  "robust",
  "comprehensive guide",
  "seamless",
  "game-changing",
  "when it comes to",
  "in today's",
];
// "It's not X, it's Y" - specific cliché pattern
const BANNED_PATTERN_ITS_NOT = /It's not [^,]+, it's /i;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function countSentencesOver25Words(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.filter((s) => s.trim().split(/\s+/).length > 25).length;
}

function scoreBrand(article: { title: string; description: string; sections: { heading: string; content: string }[]; faqs: { question: string; answer: string }[] }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  const fullText = [
    article.title,
    article.description,
    ...article.sections.map((s) => s.heading + " " + s.content),
    ...article.faqs.flatMap((f) => f.question + " " + f.answer),
  ].join(" ");

  // Banned phrases
  for (const phrase of BANNED_PHRASES) {
    const regex = new RegExp(phrase, "gi");
    const matches = fullText.match(regex);
    if (matches) {
      issues.push(`Banned: "${phrase}" (${matches.length}x)`);
      score -= Math.min(15, matches.length * 5);
    }
  }
  // "Complete guide" (similar to comprehensive guide)
  if (/\bcomplete guide\b/i.test(fullText)) {
    issues.push('Banned: "complete guide"');
    score -= 5;
  }
  // "It's not X, it's Y" cliché
  if (BANNED_PATTERN_ITS_NOT.test(fullText)) {
    issues.push('Banned: "It\'s not X, it\'s Y"');
    score -= 10;
  }

  // Em dashes
  const emDashCount = (fullText.match(/—/g) || []).length;
  if (emDashCount > 0) {
    issues.push(`Em dashes: ${emDashCount}`);
    score -= Math.min(10, emDashCount * 2);
  }

  // Long sentences
  const longSentences = countSentencesOver25Words(fullText);
  if (longSentences > 5) {
    issues.push(`Sentences >25 words: ${longSentences}`);
    score -= Math.min(15, (longSentences - 5) * 2);
  }

  return { score: Math.max(0, score), issues };
}

function scoreCRAFT(article: { sections: { content: string }[]; faqs: { answer: string }[] }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  const fullContent = article.sections.map((s) => s.content).join(" ") + article.faqs.map((f) => f.answer).join(" ");

  // Contextual: roles, cities, states
  const hasRoles = /\b(picker|packer|bartender|server|forklift|warehouse|hospitality|retail)\b/i.test(fullContent);
  const hasLocations = /\b(Austin|Dallas|Houston|Chicago|Atlanta|Las Vegas|Phoenix|California|Texas|Florida|Nevada)\b/i.test(fullContent);
  if (hasRoles || hasLocations) score += 20;
  else issues.push("No specific roles/cities/states");

  // Real: sourced stats, dollar amounts, citations
  const citationCount = (fullContent.match(/\[.*?\]\(https?:\/\/[^)]+\)/g) || []).length;
  const dollarAmounts = (fullContent.match(/\$[\d,]+/g) || []).length;
  const blsMentions = (fullContent.match(/BLS|Bureau of Labor Statistics/gi) || []).length;
  const statCount = citationCount + Math.min(5, dollarAmounts) + blsMentions;
  if (statCount >= 2) score += 25;
  else issues.push(`Low sourced data (citations: ${citationCount}, $ amounts: ${dollarAmounts})`);

  // Actionable
  const hasActionSteps = /\b(step|1\.|2\.|3\.|first|then|next|apply|download|get started)\b/i.test(fullContent);
  if (hasActionSteps) score += 20;
  else issues.push("No clear action steps");

  // Fresh: 2025 or 2026
  const hasFreshData = /202[56]/.test(fullContent);
  if (hasFreshData) score += 20;
  else issues.push("No 2025/2026 data");

  // Trustworthy: inline citations
  const hasInlineCitations = /\[.*?\]\(https?:\/\/[^)]+\)/.test(fullContent) || /BLS|ASA|USCIS|IRS/i.test(fullContent);
  if (hasInlineCitations) score += 15;
  else issues.push("No inline citations");

  return { score: Math.min(100, score), issues };
}

function scoreSEO(article: { title: string; description: string; sections: { content: string }[]; relatedArticles: string[] }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  // Title length (50-60 ideal)
  const titleLen = article.title.length;
  if (titleLen >= 50 && titleLen <= 60) score += 30;
  else if (titleLen >= 40 && titleLen <= 70) score += 20;
  else issues.push(`Title: ${titleLen} chars (target 50-60)`);

  // Description (145-155 ideal)
  const descLen = article.description.length;
  if (descLen >= 145 && descLen <= 155) score += 30;
  else if (descLen >= 120 && descLen <= 160) score += 20;
  else issues.push(`Description: ${descLen} chars (target 145-155)`);

  // Internal links
  const content = article.sections.map((s) => s.content).join(" ");
  const internalLinks = (content.match(/\/career-hub\/[^)\s"]+/g) || []).length;
  const relatedCount = article.relatedArticles?.length || 0;
  const totalInternal = internalLinks + relatedCount;
  if (totalInternal >= 2) score += 25;
  else issues.push(`Internal links: ${totalInternal} (target >=2)`);

  // FAQ count
  const faqCount = 0; // Will add from article
  score += Math.min(15, faqCount * 3);

  return { score: Math.min(100, score), issues };
}

function scoreAEO(article: { description: string; sections: { heading: string; content?: string }[]; faqs: { question: string }[] }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  // Answer-first intro
  const firstSection = article.sections[0]?.content || "";
  const answerFirst = firstSection.length < 200 && (firstSection.includes("?") || firstSection.match(/^(Here|Yes|No|You can)/i));
  if (answerFirst || article.description.length > 80) score += 25;
  else issues.push("No answer-first intro");

  // Question-format H2s
  const h2s = article.sections.map((s) => s.heading);
  const questionH2s = h2s.filter((h) => h.includes("?") || /^(What|How|Why|When|Where|Can|Do|Should)/i.test(h));
  const h2Ratio = h2s.length > 0 ? questionH2s.length / h2s.length : 0;
  if (h2Ratio >= 0.3) score += 40;
  else if (h2Ratio > 0) score += 25;
  else issues.push(`Few question H2s (${questionH2s.length}/${h2s.length})`);

  // FAQ count (3-5 target)
  const faqCount = article.faqs.length;
  if (faqCount >= 3 && faqCount <= 5) score += 35;
  else if (faqCount >= 2) score += 25;
  else if (faqCount >= 1) score += 15;
  else issues.push(`FAQ count: ${faqCount} (target 3-5)`);

  return { score: Math.min(100, score), issues };
}

function scoreDepth(article: { sections: { content: string }[]; faqs: { question: string; answer: string }[] }): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;

  const fullContent = article.sections.map((s) => s.content).join(" ") + article.faqs.map((f) => f.question + " " + f.answer).join(" ");
  const wordCount = countWords(fullContent);

  // Word count (target ~1500+ for guides)
  if (wordCount >= 2000) score += 40;
  else if (wordCount >= 1500) score += 35;
  else if (wordCount >= 1000) score += 25;
  else if (wordCount >= 500) score += 15;
  else issues.push(`Low word count: ~${wordCount}`);

  // Named examples (companies, tools, certifications)
  const namedExamples = (
    fullContent.match(
      /\b(Indeed Flex|Amazon|UPS|FedEx|Target|Walmart|ServSafe|TIPS|BLS|H&R Block|Jackson Hewitt|CareerOneStop|Kelly|Manpower|Randstad)\b/gi
    ) || []
  ).length;
  if (namedExamples >= 5) score += 30;
  else if (namedExamples >= 2) score += 20;
  else issues.push(`Few named examples: ${namedExamples}`);

  // FAQ count
  const faqCount = article.faqs.length;
  if (faqCount >= 5) score += 30;
  else if (faqCount >= 3) score += 25;
  else if (faqCount >= 1) score += 15;

  return { score: Math.min(100, score), issues };
}

function countInternalLinks(article: { sections: { content: string }[] }): number {
  const content = article.sections.map((s) => s.content).join(" ");
  return (content.match(/\/career-hub\/[^)\s"]+/g) || []).length;
}

function main() {
  const results: Array<{
    slug: string;
    title: string;
    composite: number;
    brand: number;
    craft: number;
    seo: number;
    aeo: number;
    depth: number;
    keyIssues: string[];
  }> = [];

  for (const [slug, article] of Object.entries(guideArticles)) {
    const brandResult = scoreBrand(article);
    const craftResult = scoreCRAFT(article);
    const seoResult = scoreSEO(article);
    const aeoResult = scoreAEO(article);
    const depthResult = scoreDepth(article);

    // Refine SEO with actual FAQ count
    let seoScore = seoResult.score;
    const descLen = article.description.length;
    const titleLen = article.title.length;
    const internalLinks = countInternalLinks(article) + (article.relatedArticles?.length || 0);
    const faqCount = article.faqs.length;

    // Recalculate SEO more accurately
    seoScore = 0;
    if (titleLen >= 50 && titleLen <= 60) seoScore += 25;
    else if (titleLen >= 40 && titleLen <= 70) seoScore += 20;
    if (descLen >= 145 && descLen <= 155) seoScore += 25;
    else if (descLen >= 120 && descLen <= 160) seoScore += 20;
    if (internalLinks >= 2) seoScore += 25;
    else seoScore += Math.max(0, internalLinks * 10);
    seoScore += Math.min(25, faqCount * 5);

    const composite =
      brandResult.score * 0.25 +
      craftResult.score * 0.25 +
      Math.min(100, seoScore) * 0.2 +
      aeoResult.score * 0.15 +
      depthResult.score * 0.15;

    const allIssues = [
      ...brandResult.issues,
      ...craftResult.issues,
      ...seoResult.issues,
      ...aeoResult.issues,
      ...depthResult.issues,
    ].slice(0, 5);

    results.push({
      slug,
      title: article.title,
      composite: Math.round(composite * 10) / 10,
      brand: brandResult.score,
      craft: craftResult.score,
      seo: Math.min(100, Math.round(seoScore)),
      aeo: aeoResult.score,
      depth: depthResult.score,
      keyIssues: allIssues,
    });
  }

  results.sort((a, b) => a.composite - b.composite);

  console.log("\n| Slug | Title | Composite | Brand | CRAFT | SEO | AEO | Depth | Key Issues |");
  console.log("|------|-------|-----------|-------|-------|-----|-----|-------|------------|");

  for (const r of results) {
    const titleShort = r.title.length > 50 ? r.title.slice(0, 47) + "..." : r.title;
    const issuesStr = r.keyIssues.join("; ").slice(0, 100) || "-";
    console.log(
      `| ${r.slug} | ${titleShort} | ${r.composite} | ${r.brand} | ${r.craft} | ${r.seo} | ${r.aeo} | ${r.depth} | ${issuesStr} |`
    );
  }

  console.log("\n--- Summary: 31 articles scored. Sorted by composite (lowest first). ---");
}

main();
