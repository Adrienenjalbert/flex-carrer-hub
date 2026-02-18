/**
 * Data Source Registry
 * 
 * Central registry of all data sources used throughout the site.
 * Enables proper citation and E-E-A-T compliance.
 * 
 * Last Updated: February 2026
 */

export interface DataSource {
  id: string;
  name: string;
  shortName: string;
  url?: string;
  description: string;
  updateFrequency: 'quarterly' | 'annual' | 'monthly' | 'real-time';
  lastAccessed: string;
  reliability: 'high' | 'medium';
}

export const dataSources: Record<string, DataSource> = {
  'bls-oews': {
    id: 'bls-oews',
    name: 'Bureau of Labor Statistics Occupational Employment and Wage Statistics',
    shortName: 'BLS OEWS',
    url: 'https://www.bls.gov/oes/',
    description: 'Official federal statistics on employment and wages by occupation and geographic area.',
    updateFrequency: 'annual',
    lastAccessed: '2026-01-20',
    reliability: 'high',
  },
  'bls-ooh': {
    id: 'bls-ooh',
    name: 'Bureau of Labor Statistics Occupational Outlook Handbook',
    shortName: 'BLS OOH',
    url: 'https://www.bls.gov/ooh/',
    description: 'Career information including job outlook, education requirements, and median pay.',
    updateFrequency: 'annual',
    lastAccessed: '2026-01-15',
    reliability: 'high',
  },
  'bls-qcew': {
    id: 'bls-qcew',
    name: 'Bureau of Labor Statistics Quarterly Census of Employment and Wages',
    shortName: 'BLS QCEW',
    url: 'https://www.bls.gov/qcew/',
    description: 'Employment and wage data at state and county level by industry.',
    updateFrequency: 'quarterly',
    lastAccessed: '2026-01-20',
    reliability: 'high',
  },
  'indeed-flex': {
    id: 'indeed-flex',
    name: 'Indeed Flex Internal Market Data',
    shortName: 'Indeed Flex',
    url: 'https://indeedflex.com',
    description: 'Aggregated and anonymized data from Indeed Flex job postings and worker earnings.',
    updateFrequency: 'real-time',
    lastAccessed: '2026-02-01',
    reliability: 'high',
  },
  'toast-report': {
    id: 'toast-report',
    name: 'Toast Restaurant Technology Report',
    shortName: 'Toast 2025 Report',
    url: 'https://pos.toasttab.com/resources/restaurant-success',
    description: 'Annual industry report on restaurant wages, tips, and employment trends.',
    updateFrequency: 'annual',
    lastAccessed: '2026-01-10',
    reliability: 'medium',
  },
  'nra-data': {
    id: 'nra-data',
    name: 'National Restaurant Association Industry Data',
    shortName: 'NRA',
    url: 'https://restaurant.org/research-and-media/research/',
    description: 'Restaurant industry employment statistics and wage data.',
    updateFrequency: 'annual',
    lastAccessed: '2026-01-12',
    reliability: 'high',
  },
  'mwpvl': {
    id: 'mwpvl',
    name: 'MWPVL International Warehouse Database',
    shortName: 'MWPVL',
    url: 'https://www.mwpvl.com',
    description: 'Comprehensive database of distribution center and warehouse locations.',
    updateFrequency: 'monthly',
    lastAccessed: '2026-01-20',
    reliability: 'high',
  },
  'state-labor': {
    id: 'state-labor',
    name: 'State Labor Department Data',
    shortName: 'State Labor Dept',
    url: undefined,
    description: 'Official state-level employment and wage data from respective labor departments.',
    updateFrequency: 'quarterly',
    lastAccessed: '2026-01-15',
    reliability: 'high',
  },
  'census-acs': {
    id: 'census-acs',
    name: 'US Census American Community Survey',
    shortName: 'Census ACS',
    url: 'https://www.census.gov/programs-surveys/acs',
    description: 'Demographic, economic, and housing data for communities.',
    updateFrequency: 'annual',
    lastAccessed: '2026-01-05',
    reliability: 'high',
  },
};

export interface DataLastUpdated {
  category: string;
  lastUpdated: string;
  nextUpdate: string;
  sources: string[];
}

export const dataUpdateSchedule: DataLastUpdated[] = [
  {
    category: 'Wage Data',
    lastUpdated: '2026-01-20',
    nextUpdate: '2026-04-20',
    sources: ['bls-oews', 'indeed-flex'],
  },
  {
    category: 'Cost of Living',
    lastUpdated: '2026-01-15',
    nextUpdate: '2027-01-15',
    sources: ['census-acs', 'bls-qcew'],
  },
  {
    category: 'Tax Rates',
    lastUpdated: '2026-01-01',
    nextUpdate: '2027-01-01',
    sources: ['state-labor'],
  },
  {
    category: 'Employer Data',
    lastUpdated: '2026-01-20',
    nextUpdate: '2026-03-20',
    sources: ['mwpvl', 'indeed-flex'],
  },
  {
    category: 'Tip Data',
    lastUpdated: '2026-01-10',
    nextUpdate: '2027-01-10',
    sources: ['toast-report', 'nra-data', 'indeed-flex'],
  },
];

// Helper functions
export function getDataSource(id: string): DataSource | undefined {
  return dataSources[id];
}

export function formatSourceCitation(sourceIds: string[]): string {
  return sourceIds
    .map((id) => dataSources[id]?.shortName || id)
    .join(', ');
}

export function getLastUpdatedForCategory(category: string): DataLastUpdated | undefined {
  return dataUpdateSchedule.find((d) => d.category === category);
}

export function getAllDataSources(): DataSource[] {
  return Object.values(dataSources);
}

// For display in footer/citations
export function getSourcesForPage(pageType: 'role' | 'city' | 'calculator' | 'guide'): DataSource[] {
  const sourceMap: Record<string, string[]> = {
    role: ['bls-oews', 'bls-ooh', 'indeed-flex', 'toast-report'],
    city: ['bls-qcew', 'census-acs', 'indeed-flex', 'mwpvl'],
    calculator: ['bls-oews', 'state-labor', 'census-acs'],
    guide: ['bls-ooh', 'indeed-flex', 'nra-data'],
  };
  
  return (sourceMap[pageType] || [])
    .map((id) => dataSources[id])
    .filter(Boolean) as DataSource[];
}

