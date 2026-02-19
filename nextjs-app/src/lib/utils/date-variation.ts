/**
 * Date Variation Utility
 * 
 * Generates varied, realistic dates for pages to avoid mass-generation signals.
 * Uses deterministic hashing to ensure consistent dates per page while creating
 * natural variation across the site.
 * 
 * Strategy:
 * - Core content (roles, cities) has older dates (6-12 months ago)
 * - New content (career evaluations, salary pages) has recent dates (1-3 months ago)
 * - Updates are spread across the last 6 months
 * - Dates are deterministic per slug to avoid regeneration issues
 */

/**
 * Simple hash function to convert string to number
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate a date within a range based on content type and slug
 */
export interface DateVariationOptions {
  /** Content type affects date range */
  contentType?: 'core' | 'new' | 'update' | 'guide' | 'tool';
  /** Base date (defaults to now) */
  baseDate?: Date;
  /** Minimum days ago */
  minDaysAgo?: number;
  /** Maximum days ago */
  maxDaysAgo?: number;
}

/**
 * Generate a varied date for a page based on its slug and content type
 */
export function generatePageDate(
  slug: string,
  options: DateVariationOptions = {}
): string {
  const {
    contentType = 'update',
    baseDate = new Date(),
    minDaysAgo,
    maxDaysAgo,
  } = options;

  // Define date ranges by content type (days ago)
  const dateRanges: Record<string, { min: number; max: number }> = {
    core: { min: 180, max: 365 },      // Core content: 6-12 months old
    new: { min: 7, max: 90 },           // New content: 1 week - 3 months
    update: { min: 14, max: 180 },     // Updates: 2 weeks - 6 months
    guide: { min: 30, max: 120 },      // Guides: 1-4 months
    tool: { min: 45, max: 150 },       // Tools: 1.5-5 months
  };

  const range = dateRanges[contentType] || dateRanges.update;
  const min = minDaysAgo ?? range.min;
  const max = maxDaysAgo ?? range.max;

  // Use hash of slug to generate consistent but varied offset
  const hash = hashString(slug);
  const daysAgo = min + (hash % (max - min + 1));

  // Generate date
  const date = new Date(baseDate);
  date.setDate(date.getDate() - daysAgo);

  // Format as YYYY-MM-DD
  return date.toISOString().split('T')[0];
}

/**
 * Generate both published and modified dates
 * Modified date is typically 0-60 days after published date
 */
export function generatePageDates(
  slug: string,
  options: DateVariationOptions = {}
): { published: string; modified: string } {
  const published = generatePageDate(slug, options);
  
  // Modified date is 0-60 days after published (deterministic)
  const hash = hashString(slug + '_modified');
  const daysAfter = hash % 61;
  
  const modifiedDate = new Date(published);
  modifiedDate.setDate(modifiedDate.getDate() + daysAfter);
  
  return {
    published,
    modified: modifiedDate.toISOString().split('T')[0],
  };
}

/**
 * Get last updated date for AuthorByline
 * Uses modified date from generatePageDates
 */
export function getLastUpdated(slug: string, contentType: DateVariationOptions['contentType'] = 'update'): string {
  const { modified } = generatePageDates(slug, { contentType });
  return modified;
}

/**
 * Get dates for Article schema (publishedTime, modifiedTime)
 */
export function getArticleDates(
  slug: string,
  contentType: DateVariationOptions['contentType'] = 'update'
): { publishedTime: string; modifiedTime: string } {
  const { published, modified } = generatePageDates(slug, { contentType });
  return {
    publishedTime: `${published}T00:00:00Z`,
    modifiedTime: `${modified}T00:00:00Z`,
  };
}

