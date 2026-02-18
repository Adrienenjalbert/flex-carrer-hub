/**
 * Research Templates and Data Standards
 * 
 * Defines the research process and data collection standards for creating
 * comprehensive How-To-Become guides and other content. Ensures consistency,
 * accuracy, and E-E-A-T compliance across all career content.
 * 
 * Last Updated: February 2026
 */

// ============================================
// DATA SOURCES
// ============================================

export interface ResearchSource {
  id: string;
  name: string;
  url: string;
  type: 'government' | 'industry' | 'academic' | 'primary';
  dataTypes: string[];
  updateFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  reliability: 'authoritative' | 'high' | 'medium';
  notes?: string;
}

export const researchSources: ResearchSource[] = [
  // Government Sources (Authoritative)
  {
    id: 'bls-ooh',
    name: 'Bureau of Labor Statistics - Occupational Outlook Handbook',
    url: 'https://www.bls.gov/ooh/',
    type: 'government',
    dataTypes: ['job outlook', 'median pay', 'education requirements', 'job duties', 'work environment'],
    updateFrequency: 'annual',
    reliability: 'authoritative',
    notes: 'Primary source for job outlook projections and median national wages',
  },
  {
    id: 'bls-oews',
    name: 'Bureau of Labor Statistics - Occupational Employment and Wage Statistics',
    url: 'https://www.bls.gov/oes/',
    type: 'government',
    dataTypes: ['employment levels', 'wage percentiles', 'geographic wage data', 'industry concentration'],
    updateFrequency: 'annual',
    reliability: 'authoritative',
    notes: 'Use for detailed wage breakdowns by percentile and location',
  },
  {
    id: 'onet',
    name: 'O*NET OnLine',
    url: 'https://www.onetonline.org/',
    type: 'government',
    dataTypes: ['skills', 'abilities', 'work activities', 'work context', 'job zones', 'tasks'],
    updateFrequency: 'quarterly',
    reliability: 'authoritative',
    notes: 'Best source for detailed skills, abilities, and work activities',
  },
  {
    id: 'dol-eta',
    name: 'Department of Labor - Employment and Training Administration',
    url: 'https://www.dol.gov/agencies/eta',
    type: 'government',
    dataTypes: ['apprenticeship programs', 'job training', 'certifications'],
    updateFrequency: 'monthly',
    reliability: 'authoritative',
  },
  
  // State Regulatory Sources
  {
    id: 'state-abc',
    name: 'State Alcohol Beverage Control Boards',
    url: 'https://www.nabca.org/state-control-systems',
    type: 'government',
    dataTypes: ['alcohol service age requirements', 'licensing requirements', 'certification mandates'],
    updateFrequency: 'annual',
    reliability: 'authoritative',
    notes: 'Check individual state ABC websites for specific requirements',
  },
  {
    id: 'osha',
    name: 'Occupational Safety and Health Administration',
    url: 'https://www.osha.gov/',
    type: 'government',
    dataTypes: ['safety certifications', 'workplace requirements', 'physical demands'],
    updateFrequency: 'monthly',
    reliability: 'authoritative',
    notes: 'Required for forklift certification and safety training requirements',
  },
  
  // Industry Sources
  {
    id: 'nra',
    name: 'National Restaurant Association',
    url: 'https://restaurant.org/',
    type: 'industry',
    dataTypes: ['industry trends', 'employment data', 'wage benchmarks', 'career paths'],
    updateFrequency: 'annual',
    reliability: 'high',
    notes: 'ServSafe certification provider and hospitality industry authority',
  },
  {
    id: 'ahla',
    name: 'American Hotel & Lodging Association',
    url: 'https://www.ahla.com/',
    type: 'industry',
    dataTypes: ['hotel industry employment', 'career paths', 'certifications'],
    updateFrequency: 'annual',
    reliability: 'high',
  },
  {
    id: 'iwla',
    name: 'International Warehouse Logistics Association',
    url: 'https://www.iwla.com/',
    type: 'industry',
    dataTypes: ['warehouse industry trends', 'certification requirements', 'safety standards'],
    updateFrequency: 'quarterly',
    reliability: 'high',
  },
  {
    id: 'nrf',
    name: 'National Retail Federation',
    url: 'https://nrf.com/',
    type: 'industry',
    dataTypes: ['retail employment trends', 'seasonal hiring data', 'wage benchmarks'],
    updateFrequency: 'quarterly',
    reliability: 'high',
    notes: 'Best source for seasonal retail hiring projections',
  },
  {
    id: 'issa',
    name: 'ISSA - The Worldwide Cleaning Industry Association',
    url: 'https://www.issa.com/',
    type: 'industry',
    dataTypes: ['cleaning certifications', 'industry standards', 'training programs'],
    updateFrequency: 'annual',
    reliability: 'high',
  },
  
  // Primary Research Sources
  {
    id: 'indeed-flex',
    name: 'Indeed Flex Market Data',
    url: 'https://indeedflex.com/',
    type: 'primary',
    dataTypes: ['real-time wages', 'shift availability', 'employer requirements', 'geographic demand'],
    updateFrequency: 'daily',
    reliability: 'high',
    notes: 'Proprietary data from actual job postings and worker earnings',
  },
  {
    id: 'indeed-jobs',
    name: 'Indeed Job Postings Analysis',
    url: 'https://www.indeed.com/',
    type: 'primary',
    dataTypes: ['job requirements', 'employer preferences', 'common qualifications', 'salary ranges'],
    updateFrequency: 'daily',
    reliability: 'medium',
    notes: 'Analyze 10+ active listings per role for market validation',
  },
];

// ============================================
// RESEARCH CHECKLIST PER INDUSTRY
// ============================================

export interface IndustryResearchChecklist {
  industry: string;
  requiredSources: string[];
  specificRequirements: string[];
  ageVerification: string[];
  certificationSources: string[];
  tipDataSources?: string[];
}

export const industryChecklists: IndustryResearchChecklist[] = [
  {
    industry: 'hospitality',
    requiredSources: ['bls-ooh', 'onet', 'nra', 'indeed-jobs'],
    specificRequirements: [
      'Verify alcohol service age by state (18-21 varies)',
      'Check TIPS/ServSafe certification requirements by state',
      'Verify food handler permit requirements',
      'Research tip pooling laws by state',
    ],
    ageVerification: ['state-abc'],
    certificationSources: ['nra', 'state-abc'],
    tipDataSources: ['indeed-flex', 'nra'],
  },
  {
    industry: 'industrial',
    requiredSources: ['bls-ooh', 'bls-oews', 'onet', 'osha', 'iwla'],
    specificRequirements: [
      'Verify OSHA forklift certification requirements',
      'Check specific equipment certifications (reach truck, pallet jack)',
      'Research physical demand levels (lifting requirements)',
      'Verify background check and drug testing prevalence',
    ],
    ageVerification: ['bls-ooh'],
    certificationSources: ['osha', 'iwla'],
  },
  {
    industry: 'retail',
    requiredSources: ['bls-ooh', 'onet', 'nrf', 'indeed-jobs'],
    specificRequirements: [
      'Research seasonal hiring patterns',
      'Verify age requirements for register operation',
      'Check loss prevention certification options',
      'Research commission structures where applicable',
    ],
    ageVerification: ['bls-ooh', 'state-labor'],
    certificationSources: ['nrf'],
  },
  {
    industry: 'facilities',
    requiredSources: ['bls-ooh', 'onet', 'issa', 'osha'],
    specificRequirements: [
      'Verify cleaning chemical handling certifications',
      'Check background check requirements for secure facilities',
      'Research ISSA certification paths',
      'Verify insurance/bonding requirements',
    ],
    ageVerification: ['bls-ooh'],
    certificationSources: ['issa', 'osha'],
  },
  {
    industry: 'healthcare',
    requiredSources: ['bls-ooh', 'onet', 'dol-eta'],
    specificRequirements: [
      'Verify state licensing requirements',
      'Check CNA/HHA certification paths',
      'Research background check and health screening requirements',
      'Verify CPR/First Aid certification requirements',
    ],
    ageVerification: ['state-licensing'],
    certificationSources: ['dol-eta', 'state-licensing'],
  },
  {
    industry: 'events',
    requiredSources: ['bls-ooh', 'onet', 'indeed-jobs'],
    specificRequirements: [
      'Research seasonal demand patterns',
      'Verify alcohol service requirements for event roles',
      'Check liability and insurance requirements',
      'Research security certification options',
    ],
    ageVerification: ['state-abc', 'bls-ooh'],
    certificationSources: ['state-abc'],
  },
];

// ============================================
// DATA COLLECTION TEMPLATE
// ============================================

export interface RoleResearchData {
  // Metadata
  roleSlug: string;
  researchDate: string;
  researcher: string;
  lastVerified: string;
  nextReviewDate: string;
  
  // Entry Requirements (from BLS, O*NET, state sources)
  entryRequirements: {
    minimumAge: number;
    ageNotes?: string;
    educationMinimum: 'none' | 'high-school' | 'ged' | 'some-college' | 'associate' | 'bachelor';
    educationNotes?: string;
    experienceRequired: boolean;
    experienceYears?: number;
    experienceNotes?: string;
    backgroundCheckRequired: boolean;
    backgroundCheckNotes?: string;
    drugTestRequired: boolean;
    drugTestNotes?: string;
    physicalRequirements: string[];
    legalRequirements?: string[];
  };
  
  // Certifications (from industry associations, state boards)
  certifications: {
    name: string;
    required: boolean;
    requiredIn?: string[]; // States where required
    provider: string;
    cost: { min: number; max: number };
    duration: string;
    validityPeriod?: string;
    renewalCost?: number;
    sourceUrl: string;
  }[];
  
  // Pay Data (from BLS, Indeed Flex)
  payData: {
    source: string;
    retrievedDate: string;
    national: {
      percentile10: number;
      percentile25: number;
      median: number;
      percentile75: number;
      percentile90: number;
    };
    tipPotential?: {
      low: number;
      average: number;
      high: number;
      notes: string;
    };
    startingRange: { min: number; max: number };
    experiencedRange: { min: number; max: number };
  };
  
  // Career Progression (from O*NET, BLS OOH)
  careerProgression: {
    entryRole: string;
    progressionPath: {
      title: string;
      typicalTimeframe: string;
      salaryRange: { min: number; max: number };
      requirements: string[];
    }[];
    lateralMoves: string[];
  };
  
  // Market Data (from BLS, NRF, Indeed)
  marketData: {
    blsProjectedGrowth: {
      rate: number;
      period: string;
      outlook: 'declining' | 'little-change' | 'average' | 'faster-than-average' | 'much-faster';
    };
    seasonalDemand?: {
      peakMonths: string[];
      lowMonths: string[];
      notes: string;
    };
    topMetros: string[];
    industryConcentration?: string;
  };
  
  // Practical Steps (from job postings analysis)
  practicalSteps: {
    averageTimeToHire: string;
    applicationTips: string[];
    interviewFocus: string[];
    firstWeekExpectations: string[];
    commonMistakes: string[];
  };
  
  // Source Citations
  sources: {
    sourceId: string;
    dataUsed: string[];
    accessDate: string;
    url?: string;
  }[];
}

// ============================================
// CONTENT QUALITY STANDARDS
// ============================================

export interface ContentQualityStandards {
  minimumWordCount: number;
  requiredSections: string[];
  internalLinksMinimum: number;
  externalLinksMinimum: number;
  faqsMinimum: number;
  imagesRecommended: number;
  schemaTypes: string[];
}

export const howToGuideStandards: ContentQualityStandards = {
  minimumWordCount: 1500,
  requiredSections: [
    'Overview',
    'Requirements',
    'Step-by-Step Guide',
    'Certifications',
    'Pay & Career Progression',
    'Tips for Success',
    'FAQs',
  ],
  internalLinksMinimum: 5,
  externalLinksMinimum: 2,
  faqsMinimum: 5,
  imagesRecommended: 0,
  schemaTypes: ['HowTo', 'FAQPage', 'BreadcrumbList'],
};

// ============================================
// SEO REQUIREMENTS
// ============================================

export interface SEORequirements {
  titleFormat: string;
  titleMaxLength: number;
  metaDescriptionFormat: string;
  metaDescriptionMaxLength: number;
  h1Format: string;
  requiredH2s: string[];
  canonicalUrlFormat: string;
  ogImageRequired: boolean;
}

export const howToGuideSEO: SEORequirements = {
  titleFormat: 'How to Become a [Role] in 2026 | Career Guide',
  titleMaxLength: 60,
  metaDescriptionFormat: 'Learn how to become a [role] with our step-by-step guide. Discover requirements, certifications, pay ranges ($X-$Y/hr), and career paths.',
  metaDescriptionMaxLength: 160,
  h1Format: 'How to Become a [Role]',
  requiredH2s: [
    'What Does a [Role] Do?',
    'Requirements to Become a [Role]',
    'Step-by-Step Guide',
    'Certifications & Training',
    'Pay & Salary Information',
    'Career Path & Advancement',
    'Frequently Asked Questions',
  ],
  canonicalUrlFormat: '/how-to-become/[role-slug]',
  ogImageRequired: false,
};

// ============================================
// INTERNAL LINKING MATRIX
// ============================================

export interface InternalLinkingRule {
  fromPageType: string;
  toLinkTypes: {
    type: string;
    minimum: number;
    maximum: number;
    placement: string;
  }[];
}

export const internalLinkingRules: InternalLinkingRule[] = [
  {
    fromPageType: 'how-to-become',
    toLinkTypes: [
      { type: 'related-roles', minimum: 3, maximum: 5, placement: 'sidebar and footer' },
      { type: 'interview-guide', minimum: 1, maximum: 1, placement: 'within content' },
      { type: 'paycheck-calculator', minimum: 1, maximum: 1, placement: 'pay section' },
      { type: 'top-cities', minimum: 3, maximum: 5, placement: 'footer' },
      { type: 'persona-hub', minimum: 1, maximum: 2, placement: 'sidebar' },
      { type: 'industry-page', minimum: 1, maximum: 1, placement: 'breadcrumb and sidebar' },
    ],
  },
  {
    fromPageType: 'role-page',
    toLinkTypes: [
      { type: 'how-to-become', minimum: 1, maximum: 1, placement: 'hero or overview' },
      { type: 'interview-guide', minimum: 1, maximum: 1, placement: 'resources section' },
      { type: 'city-role-combos', minimum: 5, maximum: 10, placement: 'locations section' },
      { type: 'related-roles', minimum: 3, maximum: 5, placement: 'sidebar' },
    ],
  },
  {
    fromPageType: 'city-page',
    toLinkTypes: [
      { type: 'role-city-combos', minimum: 5, maximum: 10, placement: 'roles section' },
      { type: 'nearby-cities', minimum: 3, maximum: 5, placement: 'footer' },
      { type: 'state-tax-page', minimum: 1, maximum: 1, placement: 'tax section' },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getResearchSource(id: string): ResearchSource | undefined {
  return researchSources.find(s => s.id === id);
}

export function getIndustryChecklist(industry: string): IndustryResearchChecklist | undefined {
  return industryChecklists.find(c => c.industry === industry);
}

export function getAuthoritativeSources(): ResearchSource[] {
  return researchSources.filter(s => s.reliability === 'authoritative');
}

export function getSourcesByType(type: ResearchSource['type']): ResearchSource[] {
  return researchSources.filter(s => s.type === type);
}

// Calculate next review date (6 months from creation)
export function calculateNextReviewDate(creationDate: string): string {
  const date = new Date(creationDate);
  date.setMonth(date.getMonth() + 6);
  return date.toISOString().split('T')[0];
}

// Validate research data completeness
export function validateResearchData(data: Partial<RoleResearchData>): { valid: boolean; missing: string[] } {
  const requiredFields = [
    'roleSlug',
    'researchDate',
    'entryRequirements',
    'certifications',
    'payData',
    'careerProgression',
    'sources',
  ];
  
  const missing = requiredFields.filter(field => !data[field as keyof RoleResearchData]);
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

// Format source citation for display
export function formatResearchCitation(sources: RoleResearchData['sources']): string {
  return sources
    .map(s => {
      const source = getResearchSource(s.sourceId);
      return source ? `${source.name} (accessed ${s.accessDate})` : s.sourceId;
    })
    .join('; ');
}
