#!/usr/bin/env ts-node
/**
 * Page Audit Script
 * 
 * Checks all pages for:
 * - Metadata presence (title, description, OpenGraph, Twitter, canonical)
 * - Breadcrumbs presence
 * - H1 presence
 * - Structured data presence
 * - InternalLinkHub presence
 * - Word count
 * - Internal links count
 */

import fs from 'fs';
import path from 'path';

interface AuditResult {
  path: string;
  hasMetadata: boolean;
  hasTitle: boolean;
  hasDescription: boolean;
  hasOpenGraph: boolean;
  hasTwitter: boolean;
  hasCanonical: boolean;
  hasBreadcrumbs: boolean;
  hasH1: boolean;
  hasStructuredData: boolean;
  hasInternalLinkHub: boolean;
  wordCount: number;
  internalLinksCount: number;
  issues: string[];
}

const BASE_DIR = path.join(__dirname, '..', 'src', 'app');

async function auditPage(filePath: string): Promise<AuditResult> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues: string[] = [];
  
  // Check metadata
  const hasMetadata = /export\s+(const\s+metadata|async\s+function\s+generateMetadata)/.test(content);
  const hasTitle = /title:\s*["']/.test(content) || /title\s*=\s*["']/.test(content);
  const hasDescription = /description:\s*["']/.test(content) || /description\s*=\s*["']/.test(content);
  const hasOpenGraph = /openGraph:\s*\{/.test(content);
  const hasTwitter = /twitter:\s*\{/.test(content);
  const hasCanonical = /canonical/.test(content);
  
  // Check breadcrumbs
  const hasBreadcrumbs = /<Breadcrumbs|BreadcrumbSchema/.test(content);
  
  // Check H1
  const hasH1 = /<h1|PageHero.*title/.test(content);
  
  // Check structured data
  const hasStructuredData = /@type|Schema|application\/ld\+json/.test(content);
  
  // Check InternalLinkHub
  const hasInternalLinkHub = /<InternalLinkHub|InternalLinkHub/.test(content);
  
  // Count words (rough estimate from text content)
  const textContent = content
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/<[^>]+>/g, ' ') // Remove HTML/JSX tags
    .replace(/['"`]/g, ' ') // Remove quotes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 2).length;
  
  // Count internal links
  const internalLinks = content.match(/href=["']\/career-hub/g) || [];
  const internalLinksCount = internalLinks.length;
  
  // Identify issues
  if (!hasMetadata) issues.push('Missing metadata export');
  if (!hasTitle) issues.push('Missing title');
  if (!hasDescription) issues.push('Missing description');
  if (!hasOpenGraph) issues.push('Missing OpenGraph tags');
  if (!hasTwitter) issues.push('Missing Twitter Card tags');
  if (!hasCanonical) issues.push('Missing canonical URL');
  if (!hasBreadcrumbs && !filePath.includes('page.tsx') && !filePath.includes('layout.tsx')) {
    issues.push('Missing breadcrumbs');
  }
  if (!hasH1) issues.push('Missing H1 heading');
  if (!hasStructuredData) issues.push('Missing structured data');
  if (!hasInternalLinkHub) issues.push('Missing InternalLinkHub');
  
  // Word count warnings
  if (filePath.includes('page.tsx') && !filePath.includes('[') && wordCount < 200) {
    issues.push(`Low word count: ${wordCount} (minimum 200 for index pages)`);
  }
  if (filePath.includes('[') && wordCount < 300) {
    issues.push(`Low word count: ${wordCount} (minimum 300 for detail pages)`);
  }
  
  return {
    path: filePath.replace(BASE_DIR, ''),
    hasMetadata,
    hasTitle,
    hasDescription,
    hasOpenGraph,
    hasTwitter,
    hasCanonical,
    hasBreadcrumbs,
    hasH1,
    hasStructuredData,
    hasInternalLinkHub,
    wordCount,
    internalLinksCount,
    issues,
  };
}

function findPageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

async function main() {
  console.log('🔍 Starting page audit...\n');
  
  // Find all page.tsx files
  const pageFiles = findPageFiles(BASE_DIR);
  
  console.log(`Found ${pageFiles.length} pages to audit\n`);
  
  const results: AuditResult[] = [];
  for (const file of pageFiles) {
    try {
      const result = await auditPage(file);
      results.push(result);
    } catch (error) {
      console.error(`Error auditing ${file}:`, error);
    }
  }
  
  // Generate report
  const pagesWithIssues = results.filter(r => r.issues.length > 0);
  const pagesWithoutIssues = results.filter(r => r.issues.length === 0);
  
  console.log('='.repeat(80));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total pages: ${results.length}`);
  console.log(`Pages with issues: ${pagesWithIssues.length}`);
  console.log(`Pages without issues: ${pagesWithoutIssues.length}`);
  console.log(`\nAverage word count: ${Math.round(results.reduce((sum, r) => sum + r.wordCount, 0) / results.length)}`);
  console.log(`Average internal links: ${Math.round(results.reduce((sum, r) => sum + r.internalLinksCount, 0) / results.length)}`);
  
  // Issue breakdown
  const issueCounts: Record<string, number> = {};
  pagesWithIssues.forEach(page => {
    page.issues.forEach(issue => {
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    });
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('ISSUE BREAKDOWN');
  console.log('='.repeat(80));
  Object.entries(issueCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([issue, count]) => {
      console.log(`${issue}: ${count} pages`);
    });
  
  // Pages with most issues
  console.log('\n' + '='.repeat(80));
  console.log('PAGES WITH MOST ISSUES (Top 20)');
  console.log('='.repeat(80));
  pagesWithIssues
    .sort((a, b) => b.issues.length - a.issues.length)
    .slice(0, 20)
    .forEach(page => {
      console.log(`\n${page.path}`);
      console.log(`  Issues: ${page.issues.length}`);
      console.log(`  Word count: ${page.wordCount}`);
      console.log(`  Internal links: ${page.internalLinksCount}`);
      page.issues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    });
  
  // Write detailed report to file
  const reportPath = path.join(__dirname, '..', 'audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  // Exit with error code if there are issues
  if (pagesWithIssues.length > 0) {
    process.exit(1);
  }
}

main().catch(console.error);

