/**
 * Tax Data Sources Documentation
 * 
 * This module provides comprehensive source documentation for all tax-related data
 * used in the paycheck calculator and related tools. Each data point includes:
 * - Official source name and URL
 * - Last verification date
 * - Update frequency
 * - Notes on methodology
 * 
 * This supports E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * by providing transparent data sourcing.
 */

export interface DataSource {
  name: string;
  organization: string;
  url: string;
  lastVerified: string;
  updateFrequency: 'annual' | 'quarterly' | 'monthly' | 'as-needed';
  dataTypes: string[];
  notes?: string;
}

export interface FICAData {
  taxYear: number;
  socialSecurityRate: number;
  socialSecurityWageBase: number;
  medicareRate: number;
  additionalMedicareRate: number;
  additionalMedicareThreshold: Record<string, number>;
  source: DataSource;
}

export interface FederalBracketData {
  taxYear: number;
  brackets: Record<string, Array<{ min: number; max: number; rate: number }>>;
  standardDeduction: Record<string, number>;
  source: DataSource;
}

// =============================================================================
// FEDERAL TAX SOURCES
// =============================================================================

export const federalTaxSource: DataSource = {
  name: 'IRS Publication 15-T',
  organization: 'Internal Revenue Service',
  url: 'https://www.irs.gov/publications/p15t',
  lastVerified: '2026-01-15',
  updateFrequency: 'annual',
  dataTypes: ['Federal income tax brackets', 'Withholding tables', 'Tax rates by filing status'],
  notes: 'Publication 15-T provides employer withholding tables. Actual tax liability may differ slightly from withholding estimates.',
};

export const ficaSource: DataSource = {
  name: 'IRS Publication 15 (Circular E)',
  organization: 'Internal Revenue Service',
  url: 'https://www.irs.gov/publications/p15',
  lastVerified: '2026-01-15',
  updateFrequency: 'annual',
  dataTypes: ['Social Security tax rate', 'Medicare tax rate', 'FICA wage base', 'Additional Medicare tax'],
  notes: 'The Employer\'s Tax Guide contains official FICA rates and thresholds.',
};

export const irsMainSource: DataSource = {
  name: 'IRS Tax Rates and Brackets',
  organization: 'Internal Revenue Service',
  url: 'https://www.irs.gov/filing/federal-income-tax-rates-and-brackets',
  lastVerified: '2026-01-15',
  updateFrequency: 'annual',
  dataTypes: ['Federal tax brackets', 'Marginal rates', 'Filing status thresholds'],
};

// =============================================================================
// FICA DATA (2026)
// =============================================================================

export const ficaData2026: FICAData = {
  taxYear: 2026,
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184500,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: {
    single: 200000,
    married_jointly: 250000,
    married_separately: 125000,
    head_of_household: 200000,
  },
  source: ficaSource,
};

// =============================================================================
// STATE TAX SOURCES
// =============================================================================

export const stateTaxSources: Record<string, DataSource> = {
  AL: {
    name: 'Individual Income Tax',
    organization: 'Alabama Department of Revenue',
    url: 'https://revenue.alabama.gov/individual-corporate/taxes-administered-by-individual-corporate-income-tax/individual-income-tax/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['State income tax rates', 'Tax brackets', 'Standard deductions'],
  },
  AK: {
    name: 'Tax Division',
    organization: 'Alaska Department of Revenue',
    url: 'https://tax.alaska.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Alaska has no state income tax.',
  },
  AZ: {
    name: 'Individual Income Tax',
    organization: 'Arizona Department of Revenue',
    url: 'https://azdor.gov/individual-income-tax-information',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate', 'Standard deductions'],
    notes: 'Arizona uses a flat tax rate of 2.5%.',
  },
  AR: {
    name: 'Individual Income Tax',
    organization: 'Arkansas Department of Finance and Administration',
    url: 'https://www.dfa.arkansas.gov/income-tax/individual-income-tax/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  CA: {
    name: 'Personal Income Tax Rates',
    organization: 'California Franchise Tax Board',
    url: 'https://www.ftb.ca.gov/file/personal/tax-rates.html',
    lastVerified: '2026-01-20',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates by filing status', 'Standard deduction'],
    notes: 'California has 9 tax brackets with rates from 1% to 12.3%. Mental Health Services Tax adds 1% on income over $1M.',
  },
  CO: {
    name: 'Individual Income Tax',
    organization: 'Colorado Department of Revenue',
    url: 'https://tax.colorado.gov/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Colorado uses a flat tax rate of 4.4%.',
  },
  CT: {
    name: 'Income Tax',
    organization: 'Connecticut Department of Revenue Services',
    url: 'https://portal.ct.gov/DRS/Individuals/Individual-Tax-Types/Income-Tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  DE: {
    name: 'Personal Income Tax',
    organization: 'Delaware Division of Revenue',
    url: 'https://revenue.delaware.gov/personal-income-tax/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates', 'Standard deduction'],
  },
  FL: {
    name: 'Taxes',
    organization: 'Florida Department of Revenue',
    url: 'https://floridarevenue.com/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Florida has no state income tax.',
  },
  GA: {
    name: 'Income Tax',
    organization: 'Georgia Department of Revenue',
    url: 'https://dor.georgia.gov/taxes/individual-taxes/income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Georgia transitioned to a flat tax of 5.49% in 2024.',
  },
  HI: {
    name: 'Individual Income Tax',
    organization: 'Hawaii Department of Taxation',
    url: 'https://tax.hawaii.gov/geninfo/a2_b2_5indiv_income/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
    notes: 'Hawaii has 12 tax brackets - the most of any state.',
  },
  ID: {
    name: 'Individual Income Tax',
    organization: 'Idaho State Tax Commission',
    url: 'https://tax.idaho.gov/i-1042.cfm',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Idaho uses a flat tax rate of 5.8%.',
  },
  IL: {
    name: 'Individual Income Tax',
    organization: 'Illinois Department of Revenue',
    url: 'https://www2.illinois.gov/rev/individuals/Pages/default.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Illinois uses a flat tax rate of 4.95%.',
  },
  IN: {
    name: 'Individual Income Tax',
    organization: 'Indiana Department of Revenue',
    url: 'https://www.in.gov/dor/individual-income-taxes/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Indiana uses a flat tax rate of 3.05%.',
  },
  IA: {
    name: 'Individual Income Tax',
    organization: 'Iowa Department of Revenue',
    url: 'https://tax.iowa.gov/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  KS: {
    name: 'Personal Income Tax',
    organization: 'Kansas Department of Revenue',
    url: 'https://www.ksrevenue.gov/perincm.html',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates', 'Standard deduction'],
  },
  KY: {
    name: 'Individual Income Tax',
    organization: 'Kentucky Department of Revenue',
    url: 'https://revenue.ky.gov/Individual/Pages/Individual-Income-Tax.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Kentucky uses a flat tax rate of 4.0%.',
  },
  LA: {
    name: 'Individual Income Tax',
    organization: 'Louisiana Department of Revenue',
    url: 'https://revenue.louisiana.gov/IndividualIncomeTax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  ME: {
    name: 'Individual Income Tax',
    organization: 'Maine Revenue Services',
    url: 'https://www.maine.gov/revenue/taxes/income-estate-tax/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  MD: {
    name: 'Income Tax',
    organization: 'Comptroller of Maryland',
    url: 'https://www.marylandtaxes.gov/individual/income/tax-info/tax-rates.php',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates', 'County taxes'],
    notes: 'Maryland has state income tax plus local county income taxes.',
  },
  MA: {
    name: 'Personal Income Tax',
    organization: 'Massachusetts Department of Revenue',
    url: 'https://www.mass.gov/info-details/massachusetts-personal-income-tax-rates',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax rates'],
    notes: 'Massachusetts has a 5% flat rate plus 4% surtax on income over $1 million.',
  },
  MI: {
    name: 'Individual Income Tax',
    organization: 'Michigan Department of Treasury',
    url: 'https://www.michigan.gov/taxes/iit',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Michigan uses a flat tax rate of 4.05%.',
  },
  MN: {
    name: 'Individual Income Tax',
    organization: 'Minnesota Department of Revenue',
    url: 'https://www.revenue.state.mn.us/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  MS: {
    name: 'Individual Income Tax',
    organization: 'Mississippi Department of Revenue',
    url: 'https://www.dor.ms.gov/individual/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Mississippi moved to a flat tax of 5.0%.',
  },
  MO: {
    name: 'Individual Income Tax',
    organization: 'Missouri Department of Revenue',
    url: 'https://dor.mo.gov/personal/individual/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  MT: {
    name: 'Individual Income Tax',
    organization: 'Montana Department of Revenue',
    url: 'https://mtrevenue.gov/taxes/individual-income-tax/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  NE: {
    name: 'Individual Income Tax',
    organization: 'Nebraska Department of Revenue',
    url: 'https://revenue.nebraska.gov/individuals',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  NV: {
    name: 'Tax Information',
    organization: 'Nevada Department of Taxation',
    url: 'https://tax.nv.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Nevada has no state income tax.',
  },
  NH: {
    name: 'Tax Information',
    organization: 'New Hampshire Department of Revenue Administration',
    url: 'https://www.revenue.nh.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'New Hampshire phased out its Interest and Dividends Tax. No tax on wages.',
  },
  NJ: {
    name: 'Income Tax',
    organization: 'New Jersey Division of Taxation',
    url: 'https://www.state.nj.us/treasury/taxation/njit.shtml',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  NM: {
    name: 'Personal Income Tax',
    organization: 'New Mexico Taxation and Revenue Department',
    url: 'https://www.tax.newmexico.gov/individuals/personal-income-tax/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  NY: {
    name: 'Personal Income Tax',
    organization: 'New York State Department of Taxation and Finance',
    url: 'https://www.tax.ny.gov/pit/file/personal_income_tax.htm',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
    notes: 'New York has 9 tax brackets. NYC residents also pay city income tax.',
  },
  NC: {
    name: 'Individual Income Tax',
    organization: 'North Carolina Department of Revenue',
    url: 'https://www.ncdor.gov/taxes-forms/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'North Carolina uses a flat tax rate of 4.75%.',
  },
  ND: {
    name: 'Individual Income Tax',
    organization: 'North Dakota Tax Department',
    url: 'https://www.tax.nd.gov/individual',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  OH: {
    name: 'Individual Income Tax',
    organization: 'Ohio Department of Taxation',
    url: 'https://tax.ohio.gov/individual',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
    notes: 'Ohio has a 0% bracket on income under $26,050.',
  },
  OK: {
    name: 'Income Tax',
    organization: 'Oklahoma Tax Commission',
    url: 'https://oklahoma.gov/tax/individuals/income-tax.html',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  OR: {
    name: 'Personal Income Tax',
    organization: 'Oregon Department of Revenue',
    url: 'https://www.oregon.gov/dor/programs/individuals/pages/pit.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
    notes: 'Oregon has no sales tax but has one of the highest income tax rates.',
  },
  PA: {
    name: 'Personal Income Tax',
    organization: 'Pennsylvania Department of Revenue',
    url: 'https://www.revenue.pa.gov/TaxTypes/PIT/Pages/default.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Pennsylvania uses a flat tax rate of 3.07%.',
  },
  RI: {
    name: 'Personal Income Tax',
    organization: 'Rhode Island Division of Taxation',
    url: 'https://tax.ri.gov/tax-sections/personal-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  SC: {
    name: 'Individual Income Tax',
    organization: 'South Carolina Department of Revenue',
    url: 'https://dor.sc.gov/tax/individual-income',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  SD: {
    name: 'Tax Information',
    organization: 'South Dakota Department of Revenue',
    url: 'https://dor.sd.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'South Dakota has no state income tax.',
  },
  TN: {
    name: 'Taxes',
    organization: 'Tennessee Department of Revenue',
    url: 'https://www.tn.gov/revenue/taxes.html',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Tennessee eliminated its Hall Tax on interest and dividends. No tax on wages.',
  },
  TX: {
    name: 'Taxes',
    organization: 'Texas Comptroller of Public Accounts',
    url: 'https://comptroller.texas.gov/taxes/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Texas has no state income tax.',
  },
  UT: {
    name: 'Individual Income Tax',
    organization: 'Utah State Tax Commission',
    url: 'https://incometax.utah.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Flat tax rate'],
    notes: 'Utah uses a flat tax rate of 4.65%.',
  },
  VT: {
    name: 'Personal Income Tax',
    organization: 'Vermont Department of Taxes',
    url: 'https://tax.vermont.gov/individuals',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  VA: {
    name: 'Individual Income Tax',
    organization: 'Virginia Department of Taxation',
    url: 'https://www.tax.virginia.gov/individual-income-tax',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  WA: {
    name: 'Tax Information',
    organization: 'Washington Department of Revenue',
    url: 'https://dor.wa.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Washington has no state income tax (has capital gains tax on high earners).',
  },
  WV: {
    name: 'Personal Income Tax',
    organization: 'West Virginia State Tax Department',
    url: 'https://tax.wv.gov/Individuals/PersonalIncomeTax/Pages/PersonalIncomeTax.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  WI: {
    name: 'Individual Income Tax',
    organization: 'Wisconsin Department of Revenue',
    url: 'https://www.revenue.wi.gov/Pages/FAQS/ise-indincm.aspx',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
  WY: {
    name: 'Tax Information',
    organization: 'Wyoming Department of Revenue',
    url: 'https://revenue.wyo.gov/',
    lastVerified: '2026-01-15',
    updateFrequency: 'as-needed',
    dataTypes: ['No state income tax confirmation'],
    notes: 'Wyoming has no state income tax.',
  },
  DC: {
    name: 'Individual Income Tax',
    organization: 'DC Office of Tax and Revenue',
    url: 'https://otr.cfo.dc.gov/page/individual-income-and-franchise-taxes',
    lastVerified: '2026-01-15',
    updateFrequency: 'annual',
    dataTypes: ['Tax brackets', 'Rates'],
  },
};

// =============================================================================
// MINIMUM WAGE SOURCES
// =============================================================================

export const minimumWageSource: DataSource = {
  name: 'State Minimum Wage Laws',
  organization: 'U.S. Department of Labor',
  url: 'https://www.dol.gov/agencies/whd/minimum-wage/state',
  lastVerified: '2026-01-15',
  updateFrequency: 'as-needed',
  dataTypes: ['State minimum wage rates', 'Effective dates', 'Tipped minimum wage'],
  notes: 'Federal minimum wage is $7.25/hour. Many states have higher rates.',
};

// =============================================================================
// UNEMPLOYMENT SOURCES
// =============================================================================

export const unemploymentSource: DataSource = {
  name: 'Unemployment Insurance Data',
  organization: 'U.S. Department of Labor - Office of Unemployment Insurance',
  url: 'https://oui.doleta.gov/unemploy/',
  lastVerified: '2026-01-15',
  updateFrequency: 'quarterly',
  dataTypes: ['Maximum weekly benefits', 'Benefit duration', 'Eligibility requirements'],
};

// =============================================================================
// THIRD-PARTY DATA SOURCES
// =============================================================================

export const taxFoundationSource: DataSource = {
  name: 'State Individual Income Tax Rates and Brackets',
  organization: 'Tax Foundation',
  url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates-2025/',
  lastVerified: '2026-01-10',
  updateFrequency: 'annual',
  dataTypes: ['State income tax rates', 'Bracket comparisons', 'Trend analysis'],
  notes: 'Non-partisan tax policy research organization. Used for cross-reference and validation.',
};

// =============================================================================
// AGGREGATE DATA SOURCES EXPORT
// =============================================================================

export const allDataSources = {
  federal: {
    publication15T: federalTaxSource,
    publication15: ficaSource,
    irs: irsMainSource,
  },
  states: stateTaxSources,
  labor: {
    minimumWage: minimumWageSource,
    unemployment: unemploymentSource,
  },
  thirdParty: {
    taxFoundation: taxFoundationSource,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get source information for a specific state
 */
export function getStateSource(stateCode: string): DataSource | null {
  return stateTaxSources[stateCode] ?? null;
}

/**
 * Get all sources as a flat array
 */
export function getAllSourcesFlat(): DataSource[] {
  return [
    federalTaxSource,
    ficaSource,
    irsMainSource,
    minimumWageSource,
    unemploymentSource,
    taxFoundationSource,
    ...Object.values(stateTaxSources),
  ];
}

/**
 * Check if any sources need verification (older than 90 days)
 */
export function getOutdatedSources(daysThreshold: number = 90): DataSource[] {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - daysThreshold);
  
  return getAllSourcesFlat().filter(source => {
    const verifiedDate = new Date(source.lastVerified);
    return verifiedDate < threshold;
  });
}

/**
 * Format sources for citation display
 */
export function formatSourceCitation(source: DataSource): string {
  return `${source.name}. ${source.organization}. Verified ${source.lastVerified}. ${source.url}`;
}

/**
 * Get formatted disclaimer text
 */
export function getTaxDisclaimer(): string {
  return `This calculator provides estimates for informational purposes only. Tax rates and rules change frequently. The calculations are based on 2026 tax year data from official government sources including IRS Publications 15 and 15-T, and individual state tax authorities. Actual tax liability may vary based on individual circumstances, additional income, deductions, credits, and local taxes. For accurate tax advice, please consult a qualified tax professional or use IRS resources directly.`;
}

