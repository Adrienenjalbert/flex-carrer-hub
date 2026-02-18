/**
 * Unified Tax Calculation Engine
 * 
 * A comprehensive tax calculation module that handles federal, state, and FICA taxes
 * with support for multiple filing statuses and pay periods.
 * 
 * Data Sources:
 * - Federal: IRS Publication 15-T (2026)
 * - State: Individual state DOR websites
 * - FICA: IRS Publication 15 (2026)
 * 
 * Last Updated: February 2026
 */

import {
  stateTaxData,
  calculateStateTax as calculateStateTaxFromData,
  calculateProgressiveTax,
  getMarginalRate,
  type FilingStatus,
  type TaxBracket,
} from '@/lib/data/state-taxes';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type PayFrequency = 
  | 'hourly'
  | 'weekly' 
  | 'bi-weekly' 
  | 'semi-monthly' 
  | 'monthly' 
  | 'annual';

export interface TaxCalculationInput {
  // Income - provide either grossAnnualIncome OR hourlyRate + hoursPerWeek
  grossAnnualIncome?: number;
  hourlyRate?: number;
  hoursPerWeek?: number;
  weeksPerYear?: number; // defaults to 52
  
  // Location & Filing
  stateCode: string;
  filingStatus: FilingStatus;
  
  // Pre-tax deductions
  preTaxDeductions?: {
    retirement401k?: number;      // Annual $ amount or percentage
    retirement401kIsPercent?: boolean;
    hsa?: number;                 // Annual HSA contribution
    healthInsurance?: number;     // Annual premium (pre-tax portion)
    fsa?: number;                 // Flexible spending account
    traditionalIra?: number;      // Traditional IRA contribution
    other?: number;               // Other pre-tax deductions
  };
  
  // Post-tax deductions (don't affect tax calculation, just net pay)
  postTaxDeductions?: {
    rothIra?: number;
    childSupport?: number;
    studentLoan?: number;
    other?: number;
  };
  
  // Tips (for tipped workers)
  includeTips?: boolean;
  tipsPerHour?: number;
  
  // Allowances (for withholding calculation)
  federalAllowances?: number;
  stateAllowances?: number;
  
  // Additional withholding
  additionalFederalWithholding?: number;
  additionalStateWithholding?: number;
}

export interface PeriodBreakdown {
  hourly: number;
  daily: number;
  weekly: number;
  biWeekly: number;
  semiMonthly: number;
  monthly: number;
  annual: number;
}

export interface BracketDetail {
  rate: number;
  min: number;
  max: number;
  incomeInBracket: number;
  taxFromBracket: number;
  cumulativeTax: number;
}

export interface TaxBreakdown {
  federalIncomeTax: number;
  stateIncomeTax: number;
  localIncomeTax: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  totalFica: number;
  totalTaxes: number;
  
  // Detailed bracket breakdowns
  federalBrackets: BracketDetail[];
  stateBrackets: BracketDetail[];
}

export interface DeductionBreakdown {
  retirement401k: number;
  hsa: number;
  healthInsurance: number;
  fsa: number;
  traditionalIra: number;
  otherPreTax: number;
  totalPreTax: number;
  
  rothIra: number;
  childSupport: number;
  studentLoan: number;
  otherPostTax: number;
  totalPostTax: number;
}

export interface TaxCalculationResult {
  // Input summary
  input: {
    payMode: 'hourly' | 'salary';
    hourlyRate: number | null;
    hoursPerWeek: number | null;
    annualSalary: number;
    stateCode: string;
    stateName: string;
    filingStatus: FilingStatus;
  };
  
  // Gross income
  grossIncome: PeriodBreakdown;
  
  // Deductions
  deductions: DeductionBreakdown;
  
  // Taxable income
  taxableIncome: number;
  
  // Tax breakdown
  taxes: TaxBreakdown;
  taxesByPeriod: PeriodBreakdown;
  
  // Net income (after all deductions)
  netIncome: PeriodBreakdown;
  
  // Key metrics
  effectiveTaxRate: number;       // Total taxes / Gross income
  marginalFederalRate: number;    // Federal marginal bracket
  marginalStateRate: number;      // State marginal bracket
  takeHomePercentage: number;     // Net / Gross as percentage
  
  // Pay stub summary (for display)
  payStub: {
    grossPay: number;
    federalWithholding: number;
    stateWithholding: number;
    socialSecurity: number;
    medicare: number;
    preTaxDeductions: number;
    postTaxDeductions: number;
    netPay: number;
    period: 'biWeekly'; // Standard pay stub is bi-weekly
  };
  
  // Data source info
  sources: {
    federal: { name: string; url: string; lastVerified: string };
    state: { name: string; url: string; lastVerified: string };
    fica: { name: string; url: string; lastVerified: string };
  };
}

// =============================================================================
// CONSTANTS - 2026 Tax Year
// =============================================================================

// FICA Rates (2026)
export const FICA_2026 = {
  socialSecurityRate: 0.062,           // 6.2%
  socialSecurityWageBase: 184500,      // 2026 SS wage base
  medicareRate: 0.0145,                // 1.45%
  additionalMedicareThreshold: 200000, // Single threshold
  additionalMedicareRate: 0.009,       // 0.9% additional
  
  // Thresholds by filing status for Additional Medicare
  additionalMedicareThresholds: {
    single: 200000,
    married_jointly: 250000,
    married_separately: 125000,
    head_of_household: 200000,
  },
};

// Federal Tax Brackets 2026 by Filing Status
export const FEDERAL_BRACKETS_2026: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 12150, rate: 0.10 },
    { min: 12150, max: 49400, rate: 0.12 },
    { min: 49400, max: 105400, rate: 0.22 },
    { min: 105400, max: 201200, rate: 0.24 },
    { min: 201200, max: 255600, rate: 0.32 },
    { min: 255600, max: 639200, rate: 0.35 },
    { min: 639200, max: Infinity, rate: 0.37 },
  ],
  married_jointly: [
    { min: 0, max: 24300, rate: 0.10 },
    { min: 24300, max: 98800, rate: 0.12 },
    { min: 98800, max: 210800, rate: 0.22 },
    { min: 210800, max: 402400, rate: 0.24 },
    { min: 402400, max: 511200, rate: 0.32 },
    { min: 511200, max: 767200, rate: 0.35 },
    { min: 767200, max: Infinity, rate: 0.37 },
  ],
  married_separately: [
    { min: 0, max: 12150, rate: 0.10 },
    { min: 12150, max: 49400, rate: 0.12 },
    { min: 49400, max: 105400, rate: 0.22 },
    { min: 105400, max: 201200, rate: 0.24 },
    { min: 201200, max: 255600, rate: 0.32 },
    { min: 255600, max: 383600, rate: 0.35 },
    { min: 383600, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 17300, rate: 0.10 },
    { min: 17300, max: 66050, rate: 0.12 },
    { min: 66050, max: 105400, rate: 0.22 },
    { min: 105400, max: 201200, rate: 0.24 },
    { min: 201200, max: 255600, rate: 0.32 },
    { min: 255600, max: 639200, rate: 0.35 },
    { min: 639200, max: Infinity, rate: 0.37 },
  ],
};

// Federal Standard Deduction 2026
export const FEDERAL_STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 15000,
  married_jointly: 30000,
  married_separately: 15000,
  head_of_household: 22500,
};

// =============================================================================
// MAIN CALCULATION FUNCTION
// =============================================================================

export function calculateTaxes(input: TaxCalculationInput): TaxCalculationResult {
  // Determine annual gross income
  let annualGross: number;
  let payMode: 'hourly' | 'salary';
  let hourlyRate: number | null = null;
  let hoursPerWeek: number | null = null;
  
  if (input.grossAnnualIncome !== undefined) {
    annualGross = input.grossAnnualIncome;
    payMode = 'salary';
  } else if (input.hourlyRate !== undefined && input.hoursPerWeek !== undefined) {
    const weeks = input.weeksPerYear ?? 52;
    hourlyRate = input.hourlyRate;
    hoursPerWeek = input.hoursPerWeek;
    
    // Add tips if applicable
    const effectiveHourlyRate = input.includeTips && input.tipsPerHour 
      ? hourlyRate + input.tipsPerHour 
      : hourlyRate;
    
    annualGross = effectiveHourlyRate * hoursPerWeek * weeks;
    payMode = 'hourly';
  } else {
    throw new Error('Must provide either grossAnnualIncome or hourlyRate + hoursPerWeek');
  }
  
  // Calculate gross income for all periods
  const grossIncome = calculatePeriodBreakdown(annualGross, hoursPerWeek ?? 40);
  
  // Calculate pre-tax deductions
  const deductions = calculateDeductions(annualGross, input.preTaxDeductions, input.postTaxDeductions);
  
  // Taxable income = Gross - Pre-tax deductions - Standard deduction (simplified)
  const federalStandardDeduction = FEDERAL_STANDARD_DEDUCTION_2026[input.filingStatus];
  const taxableIncome = Math.max(0, annualGross - deductions.totalPreTax - federalStandardDeduction);
  
  // Calculate taxes
  const taxes = calculateTaxBreakdown(
    annualGross,
    taxableIncome,
    input.stateCode,
    input.filingStatus
  );
  
  // Calculate net income
  const annualNet = annualGross - taxes.totalTaxes - deductions.totalPreTax - deductions.totalPostTax;
  const netIncome = calculatePeriodBreakdown(annualNet, hoursPerWeek ?? 40);
  
  // Calculate rates
  const effectiveTaxRate = annualGross > 0 ? (taxes.totalTaxes / annualGross) * 100 : 0;
  const takeHomePercentage = annualGross > 0 ? (annualNet / annualGross) * 100 : 0;
  
  // Get marginal rates
  const marginalFederalRate = getFederalMarginalRate(taxableIncome, input.filingStatus);
  const marginalStateRate = getMarginalRate(taxableIncome, input.stateCode, input.filingStatus);
  
  // State info
  const stateInfo = stateTaxData[input.stateCode];
  
  // Build pay stub (bi-weekly)
  const biWeeklyGross = grossIncome.biWeekly;
  const payStub = {
    grossPay: biWeeklyGross,
    federalWithholding: taxes.federalIncomeTax / 26,
    stateWithholding: taxes.stateIncomeTax / 26,
    socialSecurity: taxes.socialSecurity / 26,
    medicare: (taxes.medicare + taxes.additionalMedicare) / 26,
    preTaxDeductions: deductions.totalPreTax / 26,
    postTaxDeductions: deductions.totalPostTax / 26,
    netPay: netIncome.biWeekly,
    period: 'biWeekly' as const,
  };
  
  return {
    input: {
      payMode,
      hourlyRate,
      hoursPerWeek,
      annualSalary: annualGross,
      stateCode: input.stateCode,
      stateName: stateInfo?.name ?? input.stateCode,
      filingStatus: input.filingStatus,
    },
    grossIncome,
    deductions,
    taxableIncome,
    taxes,
    taxesByPeriod: calculatePeriodBreakdown(taxes.totalTaxes, hoursPerWeek ?? 40),
    netIncome,
    effectiveTaxRate,
    marginalFederalRate: marginalFederalRate * 100,
    marginalStateRate: marginalStateRate * 100,
    takeHomePercentage,
    payStub,
    sources: {
      federal: {
        name: 'IRS Publication 15-T (2026)',
        url: 'https://www.irs.gov/publications/p15t',
        lastVerified: '2026-01-15',
      },
      state: stateInfo?.source ?? {
        name: 'State Department of Revenue',
        url: '#',
        lastVerified: '2026-01-15',
      },
      fica: {
        name: 'IRS Publication 15 (2026)',
        url: 'https://www.irs.gov/publications/p15',
        lastVerified: '2026-01-15',
      },
    },
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate all period breakdowns from an annual amount
 */
function calculatePeriodBreakdown(annual: number, hoursPerWeek: number): PeriodBreakdown {
  const weekly = annual / 52;
  return {
    annual,
    monthly: annual / 12,
    semiMonthly: annual / 24,
    biWeekly: annual / 26,
    weekly,
    daily: weekly / 5, // Assume 5-day work week
    hourly: hoursPerWeek > 0 ? weekly / hoursPerWeek : 0,
  };
}

/**
 * Calculate pre-tax and post-tax deductions
 */
function calculateDeductions(
  grossIncome: number,
  preTax?: TaxCalculationInput['preTaxDeductions'],
  postTax?: TaxCalculationInput['postTaxDeductions']
): DeductionBreakdown {
  // Pre-tax deductions
  let retirement401k = 0;
  if (preTax?.retirement401k) {
    retirement401k = preTax.retirement401kIsPercent 
      ? grossIncome * (preTax.retirement401k / 100)
      : preTax.retirement401k;
    // Cap at IRS limit ($23,500 for 2026)
    retirement401k = Math.min(retirement401k, 23500);
  }
  
  const hsa = Math.min(preTax?.hsa ?? 0, 4300); // 2026 individual limit
  const healthInsurance = preTax?.healthInsurance ?? 0;
  const fsa = Math.min(preTax?.fsa ?? 0, 3200); // 2026 limit
  const traditionalIra = Math.min(preTax?.traditionalIra ?? 0, 7000); // 2026 limit
  const otherPreTax = preTax?.other ?? 0;
  
  const totalPreTax = retirement401k + hsa + healthInsurance + fsa + traditionalIra + otherPreTax;
  
  // Post-tax deductions
  const rothIra = Math.min(postTax?.rothIra ?? 0, 7000);
  const childSupport = postTax?.childSupport ?? 0;
  const studentLoan = postTax?.studentLoan ?? 0;
  const otherPostTax = postTax?.other ?? 0;
  
  const totalPostTax = rothIra + childSupport + studentLoan + otherPostTax;
  
  return {
    retirement401k,
    hsa,
    healthInsurance,
    fsa,
    traditionalIra,
    otherPreTax,
    totalPreTax,
    rothIra,
    childSupport,
    studentLoan,
    otherPostTax,
    totalPostTax,
  };
}

/**
 * Calculate complete tax breakdown
 */
function calculateTaxBreakdown(
  grossIncome: number,
  taxableIncome: number,
  stateCode: string,
  filingStatus: FilingStatus
): TaxBreakdown {
  // Federal income tax with bracket details
  const federalBracketsData = FEDERAL_BRACKETS_2026[filingStatus];
  const federalResult = calculateTaxWithBrackets(taxableIncome, federalBracketsData);
  const federalIncomeTax = federalResult.total;
  
  // State income tax with bracket details
  const stateInfo = stateTaxData[stateCode];
  let stateIncomeTax = 0;
  let stateBracketDetails: BracketDetail[] = [];
  
  if (stateInfo && !stateInfo.hasNoIncomeTax) {
    if (stateInfo.brackets && stateInfo.brackets[filingStatus]) {
      // Progressive brackets
      const stateBrackets = stateInfo.brackets[filingStatus];
      const stateResult = calculateTaxWithBrackets(taxableIncome, stateBrackets);
      stateIncomeTax = stateResult.total;
      stateBracketDetails = stateResult.details;
    } else if (stateInfo.isFlatTax && stateInfo.incomeTaxRate > 0) {
      // Flat rate state
      stateIncomeTax = taxableIncome * stateInfo.incomeTaxRate;
      stateBracketDetails = [{
        rate: stateInfo.incomeTaxRate,
        min: 0,
        max: Infinity,
        incomeInBracket: taxableIncome,
        taxFromBracket: stateIncomeTax,
        cumulativeTax: stateIncomeTax,
      }];
    }
  }
  
  // Local tax (simplified - only some cities have this)
  const localIncomeTax = 0; // Would need city-level data
  
  // Social Security
  const socialSecurity = Math.min(grossIncome, FICA_2026.socialSecurityWageBase) * FICA_2026.socialSecurityRate;
  
  // Medicare
  const medicare = grossIncome * FICA_2026.medicareRate;
  
  // Additional Medicare (0.9% on income over threshold)
  const medicareThreshold = FICA_2026.additionalMedicareThresholds[filingStatus];
  const additionalMedicare = grossIncome > medicareThreshold 
    ? (grossIncome - medicareThreshold) * FICA_2026.additionalMedicareRate 
    : 0;
  
  const totalFica = socialSecurity + medicare + additionalMedicare;
  const totalTaxes = federalIncomeTax + stateIncomeTax + localIncomeTax + totalFica;
  
  return {
    federalIncomeTax,
    stateIncomeTax,
    localIncomeTax,
    socialSecurity,
    medicare,
    additionalMedicare,
    totalFica,
    totalTaxes,
    federalBrackets: federalResult.details,
    stateBrackets: stateBracketDetails,
  };
}

/**
 * Get federal marginal tax rate
 */
function getFederalMarginalRate(taxableIncome: number, filingStatus: FilingStatus): number {
  const brackets = FEDERAL_BRACKETS_2026[filingStatus];
  
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.max) {
      return bracket.rate;
    }
  }
  
  return brackets[brackets.length - 1].rate;
}

// =============================================================================
// BRACKET DETAIL CALCULATION
// =============================================================================

/**
 * Calculate tax with detailed bracket breakdown
 */
export function calculateTaxWithBrackets(
  income: number, 
  brackets: TaxBracket[]
): { total: number; details: BracketDetail[] } {
  const details: BracketDetail[] = [];
  let remainingIncome = income;
  let cumulativeTax = 0;
  
  for (const bracket of brackets) {
    if (remainingIncome <= 0) {
      // No more income to tax, but show remaining brackets with 0
      details.push({
        rate: bracket.rate,
        min: bracket.min,
        max: bracket.max,
        incomeInBracket: 0,
        taxFromBracket: 0,
        cumulativeTax,
      });
      continue;
    }
    
    const bracketSize = bracket.max === Infinity 
      ? remainingIncome 
      : Math.min(bracket.max - bracket.min, remainingIncome);
    
    const incomeInBracket = Math.min(bracketSize, remainingIncome);
    const taxFromBracket = incomeInBracket * bracket.rate;
    cumulativeTax += taxFromBracket;
    
    details.push({
      rate: bracket.rate,
      min: bracket.min,
      max: bracket.max,
      incomeInBracket,
      taxFromBracket,
      cumulativeTax,
    });
    
    remainingIncome -= incomeInBracket;
  }
  
  return { total: cumulativeTax, details };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Convert salary to hourly rate
 */
export function salaryToHourly(annualSalary: number, hoursPerWeek: number = 40, weeksPerYear: number = 52): number {
  return annualSalary / (hoursPerWeek * weeksPerYear);
}

/**
 * Convert hourly rate to annual salary
 */
export function hourlyToSalary(hourlyRate: number, hoursPerWeek: number = 40, weeksPerYear: number = 52): number {
  return hourlyRate * hoursPerWeek * weeksPerYear;
}

/**
 * Convert between different pay frequencies
 */
export function convertPayFrequency(
  amount: number, 
  fromFrequency: PayFrequency, 
  toFrequency: PayFrequency
): number {
  // Convert to annual first
  const toAnnual: Record<PayFrequency, number> = {
    hourly: 2080,      // 40 hrs/week * 52 weeks
    weekly: 52,
    'bi-weekly': 26,
    'semi-monthly': 24,
    monthly: 12,
    annual: 1,
  };
  
  const annual = amount * toAnnual[fromFrequency];
  return annual / toAnnual[toFrequency];
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Quick estimate for simple use cases
 */
export function quickEstimate(
  hourlyRate: number,
  hoursPerWeek: number = 40,
  stateCode: string = 'TX'
): { 
  annual: { gross: number; net: number };
  monthly: { gross: number; net: number };
  weekly: { gross: number; net: number };
  effectiveTaxRate: number;
} {
  const result = calculateTaxes({
    hourlyRate,
    hoursPerWeek,
    stateCode,
    filingStatus: 'single',
  });
  
  return {
    annual: { gross: result.grossIncome.annual, net: result.netIncome.annual },
    monthly: { gross: result.grossIncome.monthly, net: result.netIncome.monthly },
    weekly: { gross: result.grossIncome.weekly, net: result.netIncome.weekly },
    effectiveTaxRate: result.effectiveTaxRate,
  };
}

// Re-export types from state-taxes for convenience
export type { FilingStatus, TaxBracket } from '@/lib/data/state-taxes';

