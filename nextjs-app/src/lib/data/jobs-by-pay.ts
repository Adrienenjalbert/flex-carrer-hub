// Jobs by Pay Bracket - For programmatic SEO pages
// Targets high-volume queries like "jobs that pay $20 an hour"
// Last updated: January 2026
//
// Data verified against:
// - Bureau of Labor Statistics (BLS) OEWS 2025
// - Industry wage surveys 2025-2026
// - Indeed Flex market data

export interface PayBracket {
  id: string;
  slug: string;
  hourlyMin: number;
  hourlyMax: number;
  label: string;
  annualEquivalent: string;
  description: string;
  searchKeywords: string[];
}

export interface JobByPay {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  payRange: { min: number; max: number };
  tipsRange?: { min: number; max: number };
  totalPotential: { min: number; max: number };
  requiresDegree: boolean;
  requiresCertification: boolean;
  certifications?: string[];
  entryLevel: boolean;
  experienceRequired: string;
  demandLevel: 'very-high' | 'high' | 'medium';
  flexibility: 'high' | 'medium' | 'low';
  physicalDemand: 'high' | 'medium' | 'low';
  topCities: string[];
  whyThisPay: string;
  pathToHigherPay: string;
}

// Pay brackets for programmatic pages
export const payBrackets: PayBracket[] = [
  {
    id: 'under-15',
    slug: 'under-15-per-hour',
    hourlyMin: 0,
    hourlyMax: 15,
    label: 'Under $15/hour',
    annualEquivalent: 'Under $31,200/year',
    description: 'Entry-level positions ideal for first-time workers, students, and those building experience.',
    searchKeywords: ['jobs under $15 an hour', 'minimum wage jobs', 'entry level jobs', 'first job']
  },
  {
    id: '15-17',
    slug: '15-to-17-per-hour',
    hourlyMin: 15,
    hourlyMax: 17,
    label: '$15-17/hour',
    annualEquivalent: '$31,200-$35,360/year',
    description: 'Solid entry-level pay above minimum wage in most states. Good for building skills.',
    searchKeywords: ['jobs that pay $15 an hour', '$15 an hour jobs', '$16 an hour jobs', '$17 an hour jobs']
  },
  {
    id: '17-20',
    slug: '17-to-20-per-hour',
    hourlyMin: 17,
    hourlyMax: 20,
    label: '$17-20/hour',
    annualEquivalent: '$35,360-$41,600/year',
    description: 'Above-average hourly pay for skilled entry-level and experienced workers.',
    searchKeywords: ['jobs that pay $18 an hour', 'jobs that pay $19 an hour', '$20 an hour jobs near me']
  },
  {
    id: '20-25',
    slug: '20-to-25-per-hour',
    hourlyMin: 20,
    hourlyMax: 25,
    label: '$20-25/hour',
    annualEquivalent: '$41,600-$52,000/year',
    description: 'Strong hourly wages typically requiring experience, certifications, or specialized skills.',
    searchKeywords: ['jobs that pay $20 an hour', 'jobs that pay $25 an hour', '$22 an hour jobs', '$24 an hour jobs']
  },
  {
    id: '25-30',
    slug: '25-to-30-per-hour',
    hourlyMin: 25,
    hourlyMax: 30,
    label: '$25-30/hour',
    annualEquivalent: '$52,000-$62,400/year',
    description: 'Excellent hourly pay for experienced workers and specialized roles.',
    searchKeywords: ['jobs that pay $25 an hour', 'jobs that pay $30 an hour', '$28 an hour jobs', 'high paying hourly jobs']
  },
  {
    id: '30-plus',
    slug: '30-plus-per-hour',
    hourlyMin: 30,
    hourlyMax: 100,
    label: '$30+/hour',
    annualEquivalent: '$62,400+/year',
    description: 'Premium hourly rates for highly skilled, experienced, or specialized positions.',
    searchKeywords: ['jobs that pay $30 an hour', 'high paying jobs no degree', 'best paying hourly jobs', '$35 an hour jobs']
  },
  // Annual salary searches
  {
    id: '30k-year',
    slug: '30000-per-year',
    hourlyMin: 14.5,
    hourlyMax: 15.5,
    label: '$30,000/year',
    annualEquivalent: '~$14.50/hour',
    description: 'Entry-level annual salary, common for first full-time positions.',
    searchKeywords: ['jobs that pay 30k a year', '$30000 a year jobs', '30000 salary jobs']
  },
  {
    id: '40k-year',
    slug: '40000-per-year',
    hourlyMin: 19,
    hourlyMax: 20,
    label: '$40,000/year',
    annualEquivalent: '~$19.25/hour',
    description: 'Solid annual salary achievable without a college degree.',
    searchKeywords: ['jobs that pay 40k a year', '$40000 a year jobs', '40000 salary jobs no degree']
  },
  {
    id: '50k-year',
    slug: '50000-per-year',
    hourlyMin: 24,
    hourlyMax: 25,
    label: '$50,000/year',
    annualEquivalent: '~$24/hour',
    description: 'Above-average annual salary, often achievable with experience or certifications.',
    searchKeywords: ['jobs that pay 50k a year', '$50000 a year jobs', '50k salary no degree', 'jobs that pay 50000']
  },
  {
    id: '60k-year',
    slug: '60000-per-year',
    hourlyMin: 28,
    hourlyMax: 30,
    label: '$60,000/year',
    annualEquivalent: '~$29/hour',
    description: 'Strong annual salary for experienced professionals and supervisory roles.',
    searchKeywords: ['jobs that pay 60k a year', '$60000 a year jobs', '60k salary jobs no degree']
  },
  // No degree specific
  {
    id: 'no-degree-40k',
    slug: '40000-no-degree',
    hourlyMin: 19,
    hourlyMax: 25,
    label: '$40k+ No Degree',
    annualEquivalent: '$40,000+/year',
    description: 'High-paying careers achievable without a college degree.',
    searchKeywords: ['40k jobs no degree', 'high paying jobs without degree', 'jobs that pay 40k no college']
  },
  {
    id: 'no-degree-50k',
    slug: '50000-no-degree',
    hourlyMin: 24,
    hourlyMax: 35,
    label: '$50k+ No Degree',
    annualEquivalent: '$50,000+/year',
    description: 'Excellent careers requiring skills and experience, not degrees.',
    searchKeywords: ['50k jobs no degree', 'jobs that pay 50k without degree', 'high paying no college']
  }
];

// Jobs mapped to pay brackets
export const jobsByPay: JobByPay[] = [
  // Hospitality - Tips make these lucrative
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'hospitality',
    payRange: { min: 15, max: 25 },
    tipsRange: { min: 10, max: 30 },
    totalPotential: { min: 25, max: 55 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['TIPS Certification', 'State Alcohol License'],
    entryLevel: false,
    experienceRequired: '6+ months bar experience or bartending school',
    demandLevel: 'very-high',
    flexibility: 'high',
    physicalDemand: 'medium',
    topCities: ['Las Vegas', 'Miami', 'New York', 'Los Angeles', 'Chicago'],
    whyThisPay: 'Tips significantly boost hourly earnings, especially in busy bars and upscale venues.',
    pathToHigherPay: 'Work at high-end cocktail bars, hotels, or become a head bartender or bar manager.'
  },
  {
    roleSlug: 'server',
    roleTitle: 'Server',
    industry: 'hospitality',
    payRange: { min: 12, max: 20 },
    tipsRange: { min: 10, max: 30 },
    totalPotential: { min: 22, max: 50 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required, training provided',
    demandLevel: 'very-high',
    flexibility: 'high',
    physicalDemand: 'medium',
    topCities: ['New York', 'Los Angeles', 'San Francisco', 'Miami', 'Las Vegas'],
    whyThisPay: 'Tips can double or triple base pay. Fine dining servers earn the most.',
    pathToHigherPay: 'Move to fine dining, become head server, or transition to restaurant management.'
  },
  {
    roleSlug: 'barista',
    roleTitle: 'Barista',
    industry: 'hospitality',
    payRange: { min: 13, max: 19 },
    tipsRange: { min: 2, max: 5 },
    totalPotential: { min: 15, max: 24 },
    requiresDegree: false,
    requiresCertification: false,
    certifications: ['SCA Certification (optional)'],
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'high',
    physicalDemand: 'low',
    topCities: ['Seattle', 'Portland', 'San Francisco', 'Austin', 'Denver'],
    whyThisPay: 'Starting role with tips and potential for rapid advancement.',
    pathToHigherPay: 'Get SCA certified, become shift supervisor, then store manager ($45-55k).'
  },
  {
    roleSlug: 'line-cook',
    roleTitle: 'Line Cook',
    industry: 'hospitality',
    payRange: { min: 15, max: 22 },
    totalPotential: { min: 15, max: 22 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['Food Handler Permit'],
    entryLevel: false,
    experienceRequired: '6+ months kitchen experience',
    demandLevel: 'very-high',
    flexibility: 'low',
    physicalDemand: 'high',
    topCities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Las Vegas'],
    whyThisPay: 'Skilled position with high demand. Fine dining pays more.',
    pathToHigherPay: 'Progress to sous chef ($50-70k) then head chef ($60-100k+).'
  },
  {
    roleSlug: 'catering-staff',
    roleTitle: 'Catering Staff',
    industry: 'hospitality',
    payRange: { min: 15, max: 25 },
    tipsRange: { min: 0, max: 5 },
    totalPotential: { min: 15, max: 30 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'high',
    flexibility: 'high',
    physicalDemand: 'high',
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Washington DC', 'Dallas'],
    whyThisPay: 'Event-based work often pays premium rates, especially for upscale events.',
    pathToHigherPay: 'Become catering captain ($22-32/hr) or catering manager ($50-70k).'
  },
  {
    roleSlug: 'banquet-server',
    roleTitle: 'Banquet Server',
    industry: 'hospitality',
    payRange: { min: 16, max: 26 },
    tipsRange: { min: 2, max: 8 },
    totalPotential: { min: 18, max: 34 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['Food Handler Permit', 'TIPS (for alcohol)'],
    entryLevel: true,
    experienceRequired: 'None required, but restaurant experience helps',
    demandLevel: 'high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['Las Vegas', 'Orlando', 'Chicago', 'New York', 'Los Angeles'],
    whyThisPay: 'Service charges at events often distributed to staff. Hotels pay well.',
    pathToHigherPay: 'Become banquet captain, then banquet manager ($50-65k).'
  },
  
  // Industrial & Warehouse
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Operator',
    industry: 'industrial',
    payRange: { min: 17, max: 25 },
    totalPotential: { min: 17, max: 25 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['Forklift Certification (OSHA)'],
    entryLevel: false,
    experienceRequired: 'Certification required, often employer-provided',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'medium',
    topCities: ['Dallas', 'Atlanta', 'Chicago', 'Los Angeles', 'Phoenix'],
    whyThisPay: 'Certification commands premium pay over general warehouse work.',
    pathToHigherPay: 'Specialize in reach trucks, become warehouse supervisor ($50-65k).'
  },
  {
    roleSlug: 'package-handler',
    roleTitle: 'Package Handler',
    industry: 'industrial',
    payRange: { min: 16, max: 23 },
    totalPotential: { min: 16, max: 23 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['Louisville', 'Memphis', 'Dallas', 'Atlanta', 'Chicago'],
    whyThisPay: 'Major carriers (UPS, FedEx, Amazon) offer good starting pay plus benefits.',
    pathToHigherPay: 'Move to driver positions ($25-40/hr) or operations management.'
  },
  {
    roleSlug: 'warehouse-operative',
    roleTitle: 'Warehouse Associate',
    industry: 'industrial',
    payRange: { min: 15, max: 22 },
    totalPotential: { min: 15, max: 22 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['Dallas', 'Chicago', 'Atlanta', 'Phoenix', 'Columbus'],
    whyThisPay: 'Entry-level but pays above minimum wage. Night shifts pay more.',
    pathToHigherPay: 'Get forklift certified (+$2-5/hr) or move to supervision.'
  },
  {
    roleSlug: 'order-selector',
    roleTitle: 'Order Selector',
    industry: 'industrial',
    payRange: { min: 17, max: 25 },
    totalPotential: { min: 17, max: 25 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'high',
    flexibility: 'low',
    physicalDemand: 'high',
    topCities: ['Dallas', 'Atlanta', 'Chicago', 'Phoenix', 'Houston'],
    whyThisPay: 'Physical demands and productivity requirements justify higher pay.',
    pathToHigherPay: 'Become lead selector, then warehouse supervisor ($50-65k).'
  },
  {
    roleSlug: 'delivery-driver',
    roleTitle: 'Delivery Driver',
    industry: 'industrial',
    payRange: { min: 16, max: 24 },
    totalPotential: { min: 16, max: 24 },
    requiresDegree: false,
    requiresCertification: false,
    certifications: ['CDL (for larger vehicles)'],
    entryLevel: true,
    experienceRequired: 'Valid license, clean driving record',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'medium',
    topCities: ['All major cities'],
    whyThisPay: 'High demand for last-mile delivery. Amazon, UPS, FedEx are top payers.',
    pathToHigherPay: 'Get CDL for truck driving ($50-80k) or move to logistics coordination.'
  },
  {
    roleSlug: 'machine-operator',
    roleTitle: 'Machine Operator',
    industry: 'industrial',
    payRange: { min: 16, max: 26 },
    totalPotential: { min: 16, max: 26 },
    requiresDegree: false,
    requiresCertification: false,
    certifications: ['CNC certification (for advanced roles)'],
    entryLevel: false,
    experienceRequired: 'Some manufacturing experience preferred',
    demandLevel: 'high',
    flexibility: 'low',
    physicalDemand: 'medium',
    topCities: ['Detroit', 'Cleveland', 'Houston', 'Dallas', 'Phoenix'],
    whyThisPay: 'Technical skills and equipment operation command higher wages.',
    pathToHigherPay: 'Learn CNC programming, become setup technician or supervisor.'
  },
  {
    roleSlug: 'material-handler',
    roleTitle: 'Material Handler',
    industry: 'industrial',
    payRange: { min: 16, max: 24 },
    totalPotential: { min: 16, max: 24 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['Forklift Certification'],
    entryLevel: true,
    experienceRequired: 'Forklift certification required',
    demandLevel: 'high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['Dallas', 'Houston', 'Chicago', 'Atlanta', 'Phoenix'],
    whyThisPay: 'Forklift skills and physical demands justify above-average pay.',
    pathToHigherPay: 'Move to inventory management or warehouse supervision.'
  },

  // Retail
  {
    roleSlug: 'cashier',
    roleTitle: 'Cashier',
    industry: 'retail',
    payRange: { min: 12, max: 17 },
    totalPotential: { min: 12, max: 17 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'low',
    topCities: ['All cities'],
    whyThisPay: 'Entry-level position. Costco, Target, Whole Foods pay higher.',
    pathToHigherPay: 'Become head cashier, customer service lead, then management.'
  },
  {
    roleSlug: 'sales-associate',
    roleTitle: 'Sales Associate',
    industry: 'retail',
    payRange: { min: 13, max: 20 },
    totalPotential: { min: 13, max: 25 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'low',
    topCities: ['All cities'],
    whyThisPay: 'Base pay plus commission potential at some stores.',
    pathToHigherPay: 'Move to high-commission sales (electronics, furniture) or management.'
  },
  {
    roleSlug: 'stock-associate',
    roleTitle: 'Stock Associate',
    industry: 'retail',
    payRange: { min: 13, max: 19 },
    totalPotential: { min: 13, max: 19 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['All cities'],
    whyThisPay: 'Physical work with early morning hours often pays more.',
    pathToHigherPay: 'Move to inventory specialist, then store management.'
  },
  {
    roleSlug: 'personal-shopper',
    roleTitle: 'Personal Shopper',
    industry: 'retail',
    payRange: { min: 14, max: 21 },
    tipsRange: { min: 0, max: 5 },
    totalPotential: { min: 14, max: 26 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'high',
    physicalDemand: 'medium',
    topCities: ['All cities'],
    whyThisPay: 'Growing e-commerce demand. Tips possible on delivery orders.',
    pathToHigherPay: 'Become e-commerce supervisor or store management.'
  },

  // Facilities
  {
    roleSlug: 'security-guard',
    roleTitle: 'Security Guard',
    industry: 'facilities',
    payRange: { min: 14, max: 24 },
    totalPotential: { min: 14, max: 24 },
    requiresDegree: false,
    requiresCertification: true,
    certifications: ['State Security License', 'Armed Guard License (optional)'],
    entryLevel: true,
    experienceRequired: 'Security license required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'medium',
    topCities: ['All major cities'],
    whyThisPay: 'Licensing requirements and responsibility justify pay. Armed guards earn more.',
    pathToHigherPay: 'Get armed guard license (+$3-5/hr), move to corporate security.'
  },
  {
    roleSlug: 'janitor',
    roleTitle: 'Janitor/Custodian',
    industry: 'facilities',
    payRange: { min: 13, max: 20 },
    totalPotential: { min: 13, max: 20 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'medium',
    topCities: ['All cities'],
    whyThisPay: 'Essential service with consistent demand. Hospital/corporate pay more.',
    pathToHigherPay: 'Move to facilities supervision or specialized cleaning.'
  },
  {
    roleSlug: 'maintenance-worker',
    roleTitle: 'Maintenance Worker',
    industry: 'facilities',
    payRange: { min: 16, max: 26 },
    totalPotential: { min: 16, max: 26 },
    requiresDegree: false,
    requiresCertification: false,
    certifications: ['EPA 608 (HVAC)', 'Electrical certifications'],
    entryLevel: false,
    experienceRequired: 'Basic repair skills required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['All cities'],
    whyThisPay: 'Technical skills in plumbing, electrical, HVAC command premium pay.',
    pathToHigherPay: 'Get HVAC/electrical certifications, become facilities manager.'
  },
  {
    roleSlug: 'housekeeper',
    roleTitle: 'Housekeeper',
    industry: 'facilities',
    payRange: { min: 14, max: 19 },
    tipsRange: { min: 1, max: 5 },
    totalPotential: { min: 15, max: 24 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'very-high',
    flexibility: 'medium',
    physicalDemand: 'high',
    topCities: ['Las Vegas', 'Orlando', 'Miami', 'New York', 'Los Angeles'],
    whyThisPay: 'Hotel guests often tip. Luxury hotels pay more base rate.',
    pathToHigherPay: 'Become housekeeping supervisor, then executive housekeeper.'
  },

  // Events
  {
    roleSlug: 'brand-ambassador',
    roleTitle: 'Brand Ambassador',
    industry: 'events',
    payRange: { min: 16, max: 30 },
    totalPotential: { min: 16, max: 30 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required, outgoing personality key',
    demandLevel: 'high',
    flexibility: 'high',
    physicalDemand: 'low',
    topCities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
    whyThisPay: 'Brands pay premium for engaging representation. Alcohol/tech brands pay most.',
    pathToHigherPay: 'Become team lead, then field marketing management.'
  },
  {
    roleSlug: 'valet',
    roleTitle: 'Valet',
    industry: 'events',
    payRange: { min: 12, max: 18 },
    tipsRange: { min: 5, max: 15 },
    totalPotential: { min: 17, max: 33 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'Clean driving record, manual transmission preferred',
    demandLevel: 'high',
    flexibility: 'medium',
    physicalDemand: 'medium',
    topCities: ['Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Dallas'],
    whyThisPay: 'Tips are substantial, especially at upscale venues and events.',
    pathToHigherPay: 'Work at luxury hotels/restaurants, become valet supervisor.'
  },
  {
    roleSlug: 'event-setup-crew',
    roleTitle: 'Event Setup Crew',
    industry: 'events',
    payRange: { min: 15, max: 22 },
    totalPotential: { min: 15, max: 22 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'high',
    flexibility: 'high',
    physicalDemand: 'high',
    topCities: ['Las Vegas', 'Orlando', 'New York', 'Los Angeles', 'Chicago'],
    whyThisPay: 'Physical work and event-based scheduling commands higher rates.',
    pathToHigherPay: 'Become event coordinator ($45-60k) or operations management.'
  },
  {
    roleSlug: 'concert-staff',
    roleTitle: 'Concert/Venue Staff',
    industry: 'events',
    payRange: { min: 14, max: 22 },
    totalPotential: { min: 14, max: 22 },
    requiresDegree: false,
    requiresCertification: false,
    entryLevel: true,
    experienceRequired: 'None required',
    demandLevel: 'high',
    flexibility: 'high',
    physicalDemand: 'medium',
    topCities: ['Los Angeles', 'New York', 'Nashville', 'Austin', 'Chicago'],
    whyThisPay: 'Event-based work with premium weekend/evening rates.',
    pathToHigherPay: 'Become venue supervisor or event management.'
  }
];

// Helper functions
export const getPayBracketBySlug = (slug: string) =>
  payBrackets.find(bracket => bracket.slug === slug);

export const getJobsInPayRange = (minPay: number, maxPay: number) =>
  jobsByPay.filter(job => 
    job.totalPotential.min <= maxPay && job.totalPotential.max >= minPay
  );

export const getJobsByPayBracket = (bracketId: string) => {
  const bracket = payBrackets.find(b => b.id === bracketId);
  if (!bracket) return [];
  return jobsByPay.filter(job => 
    job.totalPotential.min <= bracket.hourlyMax && 
    job.totalPotential.max >= bracket.hourlyMin
  ).sort((a, b) => b.totalPotential.max - a.totalPotential.max);
};

export const getHighestPayingJobs = (limit: number = 10) =>
  [...jobsByPay]
    .sort((a, b) => b.totalPotential.max - a.totalPotential.max)
    .slice(0, limit);

export const getEntryLevelJobsByPay = () =>
  jobsByPay
    .filter(job => job.entryLevel)
    .sort((a, b) => b.totalPotential.max - a.totalPotential.max);

export const getJobsNoDegreeRequired = () =>
  jobsByPay.filter(job => !job.requiresDegree);

export const getJobsByIndustry = (industry: string) =>
  jobsByPay.filter(job => job.industry === industry);

export const getHighDemandJobs = () =>
  jobsByPay.filter(job => job.demandLevel === 'very-high');

export const getAllPayBracketSlugs = () =>
  payBrackets.map(bracket => bracket.slug);

