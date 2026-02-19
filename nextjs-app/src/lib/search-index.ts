/**
 * Search Index - Static search index for QuickSearch component
 * Builds a searchable index from roles, cities, tools, guides, and certifications
 */

import { roles } from './data/roles';
import { cities } from './data/cities';
import { toolRegistry } from './data/tool-registry';
import { allGuideArticles } from './data/articles/guides';
import { certifications } from './data/certifications';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'role' | 'city' | 'tool' | 'guide' | 'certification';
  keywords?: string[];
}

/**
 * Build the search index from all data sources
 */
export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Add roles
  roles.forEach((role) => {
    results.push({
      id: `role-${role.slug}`,
      title: role.title,
      description: role.shortDescription || role.description || '',
      url: `/career-hub/roles/${role.slug}`,
      type: 'role',
      keywords: [
        role.title,
        role.industry,
        ...(role.skills || []),
        ...(role.requirements || []),
      ],
    });
  });

  // Add cities
  cities.forEach((city) => {
    results.push({
      id: `city-${city.slug}`,
      title: `${city.city}, ${city.state}`,
      description: city.description || `Jobs in ${city.city}, ${city.state}`,
      url: `/career-hub/cities/${city.slug}`,
      type: 'city',
      keywords: [
        city.city,
        city.state,
        city.stateCode,
        city.region,
        ...(city.topIndustries || []),
      ],
    });
  });

  // Add tools
  toolRegistry.forEach((tool) => {
    results.push({
      id: `tool-${tool.slug}`,
      title: tool.name,
      description: tool.description || '',
      url: `/career-hub/tools/${tool.slug}`,
      type: 'tool',
      keywords: [
        tool.name,
        tool.category,
        tool.primaryKeyword,
        ...tool.secondaryKeywords,
        ...tool.synonyms,
      ],
    });
  });

  // Add guides
  Object.values(allGuideArticles).forEach((article) => {
    results.push({
      id: `guide-${article.slug}`,
      title: article.title,
      description: article.description || '',
      url: `/career-hub/guides/${article.slug}`,
      type: 'guide',
      keywords: [
        article.title,
        article.category,
        ...(article.keyTakeaways || []),
      ],
    });
  });

  // Add certifications
  certifications.forEach((cert) => {
    results.push({
      id: `cert-${cert.slug}`,
      title: cert.name,
      description: cert.description || '',
      url: `/certifications/${cert.slug}`,
      type: 'certification',
      keywords: [
        cert.name,
        cert.category,
        ...cert.providers.map(p => p.name),
      ],
    });
  });

  return results;
}

/**
 * Get popular search terms with direct links
 */
export const popularSearches = [
  { term: 'Pay Calculator', url: '/career-hub/tools/paycheck-calculator' },
  { term: 'Resume Templates', url: '/career-hub/templates' },
  { term: 'Interview Questions', url: '/interview-questions' },
  { term: 'How to Become', url: '/how-to-become' },
];

