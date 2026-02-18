// Comprehensive state tax data for 2026
// 
// IMPORTANT DISCLAIMER:
// This data is for educational and estimation purposes only.
// Tax rates and minimum wages change frequently. Always verify with official sources.
//
// Data Sources:
// - State Income Tax Rates: Tax Foundation (https://taxfoundation.org/data/all/state/state-income-tax-rates-2025/)
// - State Tax Brackets: Individual State Department of Revenue websites
// - Minimum Wage Data: US Department of Labor (https://www.dol.gov/agencies/whd/minimum-wage/state)
// - Federal Tax Brackets: IRS Publication 15-T (https://www.irs.gov/publications/p15t)
// - FICA Rates: IRS Publication 15 (https://www.irs.gov/publications/p15)
// - Unemployment Benefits: Department of Labor OUI (https://oui.doleta.gov/unemploy/)
//
// Last data verification: February 2026
// Note: Progressive brackets are for Single filers. Married Filing Jointly brackets typically double.

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type FilingStatus = 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface StateTaxInfo {
  name: string;
  abbreviation: string;
  // Simplified effective rate (kept for backwards compatibility)
  incomeTaxRate: number;
  hasNoIncomeTax: boolean;
  // Progressive brackets by filing status (null for flat-tax or no-tax states)
  brackets: {
    single: TaxBracket[] | null;
    married_jointly: TaxBracket[] | null;
    married_separately: TaxBracket[] | null;
    head_of_household: TaxBracket[] | null;
  } | null;
  // Is this a flat-tax state (single rate applies to all income)?
  isFlatTax: boolean;
  // State-specific rules
  overtimeRules: 'federal' | 'daily' | 'both';
  minWage: number;
  // Unemployment benefits
  unemploymentMaxWeekly: number;
  unemploymentMaxWeeks: number;
  // Standard deduction amounts by filing status
  standardDeduction: {
    single: number;
    married_jointly: number;
    married_separately: number;
    head_of_household: number;
  } | null;
  // Data source info
  source: {
    name: string;
    url: string;
    lastVerified: string;
  };
}

// =============================================================================
// PROGRESSIVE TAX BRACKETS BY STATE (2026 Tax Year - Single Filer)
// =============================================================================

// Alabama - Progressive (3 brackets)
const AL_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 500, rate: 0.02 },
  { min: 500, max: 3000, rate: 0.04 },
  { min: 3000, max: Infinity, rate: 0.05 },
];
const AL_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 6000, rate: 0.04 },
  { min: 6000, max: Infinity, rate: 0.05 },
];

// Arizona - Flat tax (2.5%)
// No brackets needed - flat rate

// Arkansas - Progressive (3 brackets as of 2026)
const AR_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 5100, rate: 0.02 },
  { min: 5100, max: 10300, rate: 0.04 },
  { min: 10300, max: Infinity, rate: 0.044 },
];

// California - Progressive (9 brackets)
const CA_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 10412, rate: 0.01 },
  { min: 10412, max: 24684, rate: 0.02 },
  { min: 24684, max: 38959, rate: 0.04 },
  { min: 38959, max: 54081, rate: 0.06 },
  { min: 54081, max: 68350, rate: 0.08 },
  { min: 68350, max: 349137, rate: 0.093 },
  { min: 349137, max: 418961, rate: 0.103 },
  { min: 418961, max: 698271, rate: 0.113 },
  { min: 698271, max: Infinity, rate: 0.123 },
];
const CA_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 20824, rate: 0.01 },
  { min: 20824, max: 49368, rate: 0.02 },
  { min: 49368, max: 77918, rate: 0.04 },
  { min: 77918, max: 108162, rate: 0.06 },
  { min: 108162, max: 136700, rate: 0.08 },
  { min: 136700, max: 698274, rate: 0.093 },
  { min: 698274, max: 837922, rate: 0.103 },
  { min: 837922, max: 1396542, rate: 0.113 },
  { min: 1396542, max: Infinity, rate: 0.123 },
];
const CA_BRACKETS_HOH: TaxBracket[] = [
  { min: 0, max: 20839, rate: 0.01 },
  { min: 20839, max: 49371, rate: 0.02 },
  { min: 49371, max: 63644, rate: 0.04 },
  { min: 63644, max: 78765, rate: 0.06 },
  { min: 78765, max: 93037, rate: 0.08 },
  { min: 93037, max: 474824, rate: 0.093 },
  { min: 474824, max: 569790, rate: 0.103 },
  { min: 569790, max: 949649, rate: 0.113 },
  { min: 949649, max: Infinity, rate: 0.123 },
];

// Colorado - Flat tax (4.4%)
// No brackets needed

// Connecticut - Progressive (7 brackets)
const CT_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 10000, rate: 0.02 },
  { min: 10000, max: 50000, rate: 0.045 },
  { min: 50000, max: 100000, rate: 0.055 },
  { min: 100000, max: 200000, rate: 0.06 },
  { min: 200000, max: 250000, rate: 0.065 },
  { min: 250000, max: 500000, rate: 0.069 },
  { min: 500000, max: Infinity, rate: 0.0699 },
];
const CT_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 20000, rate: 0.02 },
  { min: 20000, max: 100000, rate: 0.045 },
  { min: 100000, max: 200000, rate: 0.055 },
  { min: 200000, max: 400000, rate: 0.06 },
  { min: 400000, max: 500000, rate: 0.065 },
  { min: 500000, max: 1000000, rate: 0.069 },
  { min: 1000000, max: Infinity, rate: 0.0699 },
];

// Delaware - Progressive (7 brackets)
const DE_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 2000, rate: 0.0 },
  { min: 2000, max: 5000, rate: 0.022 },
  { min: 5000, max: 10000, rate: 0.039 },
  { min: 10000, max: 20000, rate: 0.048 },
  { min: 20000, max: 25000, rate: 0.052 },
  { min: 25000, max: 60000, rate: 0.0555 },
  { min: 60000, max: Infinity, rate: 0.066 },
];

// Georgia - Flat tax (5.49% in 2026, moving to flat)
// Transitioning to flat tax

// Hawaii - Progressive (12 brackets - highest in nation)
const HI_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 2400, rate: 0.014 },
  { min: 2400, max: 4800, rate: 0.032 },
  { min: 4800, max: 9600, rate: 0.055 },
  { min: 9600, max: 14400, rate: 0.064 },
  { min: 14400, max: 19200, rate: 0.068 },
  { min: 19200, max: 24000, rate: 0.072 },
  { min: 24000, max: 36000, rate: 0.076 },
  { min: 36000, max: 48000, rate: 0.079 },
  { min: 48000, max: 150000, rate: 0.0825 },
  { min: 150000, max: 175000, rate: 0.09 },
  { min: 175000, max: 200000, rate: 0.10 },
  { min: 200000, max: Infinity, rate: 0.11 },
];
const HI_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 4800, rate: 0.014 },
  { min: 4800, max: 9600, rate: 0.032 },
  { min: 9600, max: 19200, rate: 0.055 },
  { min: 19200, max: 28800, rate: 0.064 },
  { min: 28800, max: 38400, rate: 0.068 },
  { min: 38400, max: 48000, rate: 0.072 },
  { min: 48000, max: 72000, rate: 0.076 },
  { min: 72000, max: 96000, rate: 0.079 },
  { min: 96000, max: 300000, rate: 0.0825 },
  { min: 300000, max: 350000, rate: 0.09 },
  { min: 350000, max: 400000, rate: 0.10 },
  { min: 400000, max: Infinity, rate: 0.11 },
];

// Idaho - Flat tax (5.8%)
// Converted to flat tax

// Illinois - Flat tax (4.95%)
// Flat rate

// Indiana - Flat tax (3.05%)
// Flat rate

// Iowa - Progressive (4 brackets, transitioning to flat)
const IA_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 6210, rate: 0.044 },
  { min: 6210, max: 31050, rate: 0.0482 },
  { min: 31050, max: 62100, rate: 0.057 },
  { min: 62100, max: Infinity, rate: 0.06 },
];

// Kansas - Progressive (3 brackets)
const KS_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 15000, rate: 0.031 },
  { min: 15000, max: 30000, rate: 0.0525 },
  { min: 30000, max: Infinity, rate: 0.057 },
];
const KS_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 30000, rate: 0.031 },
  { min: 30000, max: 60000, rate: 0.0525 },
  { min: 60000, max: Infinity, rate: 0.057 },
];

// Kentucky - Flat tax (4.0%)
// Flat rate

// Louisiana - Progressive (3 brackets)
const LA_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 12500, rate: 0.0185 },
  { min: 12500, max: 50000, rate: 0.035 },
  { min: 50000, max: Infinity, rate: 0.0425 },
];
const LA_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 25000, rate: 0.0185 },
  { min: 25000, max: 100000, rate: 0.035 },
  { min: 100000, max: Infinity, rate: 0.0425 },
];

// Maine - Progressive (3 brackets)
const ME_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 26050, rate: 0.058 },
  { min: 26050, max: 61600, rate: 0.0675 },
  { min: 61600, max: Infinity, rate: 0.0715 },
];
const ME_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 52100, rate: 0.058 },
  { min: 52100, max: 123250, rate: 0.0675 },
  { min: 123250, max: Infinity, rate: 0.0715 },
];

// Maryland - Progressive (8 brackets)
const MD_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 100000, rate: 0.0475 },
  { min: 100000, max: 125000, rate: 0.05 },
  { min: 125000, max: 150000, rate: 0.0525 },
  { min: 150000, max: 250000, rate: 0.055 },
  { min: 250000, max: Infinity, rate: 0.0575 },
];
const MD_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.02 },
  { min: 1000, max: 2000, rate: 0.03 },
  { min: 2000, max: 3000, rate: 0.04 },
  { min: 3000, max: 150000, rate: 0.0475 },
  { min: 150000, max: 175000, rate: 0.05 },
  { min: 175000, max: 225000, rate: 0.0525 },
  { min: 225000, max: 300000, rate: 0.055 },
  { min: 300000, max: Infinity, rate: 0.0575 },
];

// Massachusetts - Flat tax (9.0% includes 4% millionaire's surtax on income over $1M)
const MA_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 1000000, rate: 0.05 },
  { min: 1000000, max: Infinity, rate: 0.09 },
];

// Michigan - Flat tax (4.05%)
// Flat rate

// Minnesota - Progressive (4 brackets)
const MN_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 31690, rate: 0.0535 },
  { min: 31690, max: 104090, rate: 0.068 },
  { min: 104090, max: 193240, rate: 0.0785 },
  { min: 193240, max: Infinity, rate: 0.0985 },
];
const MN_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 46330, rate: 0.0535 },
  { min: 46330, max: 184040, rate: 0.068 },
  { min: 184040, max: 321450, rate: 0.0785 },
  { min: 321450, max: Infinity, rate: 0.0985 },
];

// Mississippi - Flat tax (5.0% as of 2026)
// Transitioning to flat

// Missouri - Progressive (10 brackets, top rate 4.8%)
const MO_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 1207, rate: 0.0 },
  { min: 1207, max: 2414, rate: 0.02 },
  { min: 2414, max: 3621, rate: 0.025 },
  { min: 3621, max: 4828, rate: 0.03 },
  { min: 4828, max: 6035, rate: 0.035 },
  { min: 6035, max: 7242, rate: 0.04 },
  { min: 7242, max: 8449, rate: 0.045 },
  { min: 8449, max: Infinity, rate: 0.048 },
];

// Montana - Progressive (7 brackets)
const MT_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 3600, rate: 0.01 },
  { min: 3600, max: 6500, rate: 0.02 },
  { min: 6500, max: 11100, rate: 0.03 },
  { min: 11100, max: 15000, rate: 0.04 },
  { min: 15000, max: 19400, rate: 0.05 },
  { min: 19400, max: 22100, rate: 0.06 },
  { min: 22100, max: Infinity, rate: 0.059 },
];

// Nebraska - Progressive (4 brackets)
const NE_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 3700, rate: 0.0246 },
  { min: 3700, max: 22170, rate: 0.0351 },
  { min: 22170, max: 35730, rate: 0.0501 },
  { min: 35730, max: Infinity, rate: 0.0584 },
];
const NE_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 7390, rate: 0.0246 },
  { min: 7390, max: 44350, rate: 0.0351 },
  { min: 44350, max: 71460, rate: 0.0501 },
  { min: 71460, max: Infinity, rate: 0.0584 },
];

// New Jersey - Progressive (7 brackets)
const NJ_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 20000, rate: 0.014 },
  { min: 20000, max: 35000, rate: 0.0175 },
  { min: 35000, max: 40000, rate: 0.035 },
  { min: 40000, max: 75000, rate: 0.05525 },
  { min: 75000, max: 500000, rate: 0.0637 },
  { min: 500000, max: 1000000, rate: 0.0897 },
  { min: 1000000, max: Infinity, rate: 0.1075 },
];
const NJ_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 20000, rate: 0.014 },
  { min: 20000, max: 50000, rate: 0.0175 },
  { min: 50000, max: 70000, rate: 0.0245 },
  { min: 70000, max: 80000, rate: 0.035 },
  { min: 80000, max: 150000, rate: 0.05525 },
  { min: 150000, max: 500000, rate: 0.0637 },
  { min: 500000, max: 1000000, rate: 0.0897 },
  { min: 1000000, max: Infinity, rate: 0.1075 },
];

// New Mexico - Progressive (5 brackets)
const NM_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 5500, rate: 0.017 },
  { min: 5500, max: 11000, rate: 0.032 },
  { min: 11000, max: 16000, rate: 0.047 },
  { min: 16000, max: 210000, rate: 0.049 },
  { min: 210000, max: Infinity, rate: 0.059 },
];
const NM_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 8000, rate: 0.017 },
  { min: 8000, max: 16000, rate: 0.032 },
  { min: 16000, max: 24000, rate: 0.047 },
  { min: 24000, max: 315000, rate: 0.049 },
  { min: 315000, max: Infinity, rate: 0.059 },
];

// New York - Progressive (9 brackets)
const NY_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 8500, rate: 0.04 },
  { min: 8500, max: 11700, rate: 0.045 },
  { min: 11700, max: 13900, rate: 0.0525 },
  { min: 13900, max: 80650, rate: 0.055 },
  { min: 80650, max: 215400, rate: 0.06 },
  { min: 215400, max: 1077550, rate: 0.0685 },
  { min: 1077550, max: 5000000, rate: 0.0965 },
  { min: 5000000, max: 25000000, rate: 0.103 },
  { min: 25000000, max: Infinity, rate: 0.109 },
];
const NY_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 17150, rate: 0.04 },
  { min: 17150, max: 23600, rate: 0.045 },
  { min: 23600, max: 27900, rate: 0.0525 },
  { min: 27900, max: 161550, rate: 0.055 },
  { min: 161550, max: 323200, rate: 0.06 },
  { min: 323200, max: 2155350, rate: 0.0685 },
  { min: 2155350, max: 5000000, rate: 0.0965 },
  { min: 5000000, max: 25000000, rate: 0.103 },
  { min: 25000000, max: Infinity, rate: 0.109 },
];

// North Carolina - Flat tax (4.75%)
// Flat rate

// North Dakota - Flat tax (1.95% top rate, effectively flat)
const ND_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 44725, rate: 0.011 },
  { min: 44725, max: 225975, rate: 0.0204 },
  { min: 225975, max: Infinity, rate: 0.025 },
];

// Ohio - Progressive (5 brackets, 0% bracket at bottom)
const OH_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 26050, rate: 0.0 },
  { min: 26050, max: 100000, rate: 0.02765 },
  { min: 100000, max: Infinity, rate: 0.035 },
];

// Oklahoma - Progressive (6 brackets)
const OK_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 1000, rate: 0.0025 },
  { min: 1000, max: 2500, rate: 0.0075 },
  { min: 2500, max: 3750, rate: 0.0175 },
  { min: 3750, max: 4900, rate: 0.0275 },
  { min: 4900, max: 7200, rate: 0.0375 },
  { min: 7200, max: Infinity, rate: 0.0475 },
];
const OK_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 2000, rate: 0.0025 },
  { min: 2000, max: 5000, rate: 0.0075 },
  { min: 5000, max: 7500, rate: 0.0175 },
  { min: 7500, max: 9800, rate: 0.0275 },
  { min: 9800, max: 12200, rate: 0.0375 },
  { min: 12200, max: Infinity, rate: 0.0475 },
];

// Oregon - Progressive (4 brackets)
const OR_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 4300, rate: 0.0475 },
  { min: 4300, max: 10750, rate: 0.0675 },
  { min: 10750, max: 125000, rate: 0.0875 },
  { min: 125000, max: Infinity, rate: 0.099 },
];
const OR_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 8600, rate: 0.0475 },
  { min: 8600, max: 21500, rate: 0.0675 },
  { min: 21500, max: 250000, rate: 0.0875 },
  { min: 250000, max: Infinity, rate: 0.099 },
];

// Pennsylvania - Flat tax (3.07%)
// Flat rate

// Rhode Island - Progressive (3 brackets)
const RI_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 73450, rate: 0.0375 },
  { min: 73450, max: 166950, rate: 0.0475 },
  { min: 166950, max: Infinity, rate: 0.0599 },
];

// South Carolina - Progressive (7 brackets)
const SC_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 3460, rate: 0.0 },
  { min: 3460, max: 17330, rate: 0.03 },
  { min: 17330, max: Infinity, rate: 0.064 },
];

// Utah - Flat tax (4.65%)
// Flat rate

// Vermont - Progressive (4 brackets)
const VT_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 45400, rate: 0.0335 },
  { min: 45400, max: 110050, rate: 0.066 },
  { min: 110050, max: 229550, rate: 0.076 },
  { min: 229550, max: Infinity, rate: 0.0875 },
];
const VT_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 75850, rate: 0.0335 },
  { min: 75850, max: 183400, rate: 0.066 },
  { min: 183400, max: 279450, rate: 0.076 },
  { min: 279450, max: Infinity, rate: 0.0875 },
];

// Virginia - Progressive (4 brackets)
const VA_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 3000, rate: 0.02 },
  { min: 3000, max: 5000, rate: 0.03 },
  { min: 5000, max: 17000, rate: 0.05 },
  { min: 17000, max: Infinity, rate: 0.0575 },
];

// West Virginia - Progressive (5 brackets)
const WV_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 10000, rate: 0.0236 },
  { min: 10000, max: 25000, rate: 0.0315 },
  { min: 25000, max: 40000, rate: 0.0354 },
  { min: 40000, max: 60000, rate: 0.0472 },
  { min: 60000, max: Infinity, rate: 0.0512 },
];

// Wisconsin - Progressive (4 brackets)
const WI_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 14320, rate: 0.035 },
  { min: 14320, max: 28640, rate: 0.044 },
  { min: 28640, max: 315310, rate: 0.053 },
  { min: 315310, max: Infinity, rate: 0.0765 },
];
const WI_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 19090, rate: 0.035 },
  { min: 19090, max: 38190, rate: 0.044 },
  { min: 38190, max: 420420, rate: 0.053 },
  { min: 420420, max: Infinity, rate: 0.0765 },
];

// D.C. - Progressive (6 brackets)
const DC_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 10000, rate: 0.04 },
  { min: 10000, max: 40000, rate: 0.06 },
  { min: 40000, max: 60000, rate: 0.065 },
  { min: 60000, max: 250000, rate: 0.085 },
  { min: 250000, max: 500000, rate: 0.0925 },
  { min: 500000, max: 1000000, rate: 0.0975 },
  { min: 1000000, max: Infinity, rate: 0.1075 },
];
const DC_BRACKETS_MFJ: TaxBracket[] = DC_BRACKETS_SINGLE; // DC uses same brackets

// =============================================================================
// MAIN STATE TAX DATA EXPORT
// =============================================================================

export const stateTaxData: Record<string, StateTaxInfo> = {
  AL: {
    name: "Alabama",
    abbreviation: "AL",
    incomeTaxRate: 0.05,
    hasNoIncomeTax: false,
    brackets: {
      single: AL_BRACKETS_SINGLE,
      married_jointly: AL_BRACKETS_MFJ,
      married_separately: AL_BRACKETS_SINGLE,
      head_of_household: AL_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 275,
    unemploymentMaxWeeks: 14,
    standardDeduction: { single: 3000, married_jointly: 8500, married_separately: 4250, head_of_household: 4700 },
    source: { name: "Alabama DOR", url: "https://revenue.alabama.gov/individual-corporate/taxes-administered-by-individual-corporate-income-tax/individual-income-tax/", lastVerified: "2026-01-15" },
  },
  AK: {
    name: "Alaska",
    abbreviation: "AK",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 11.73,
    unemploymentMaxWeekly: 370,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Alaska DOR", url: "https://tax.alaska.gov/", lastVerified: "2026-01-15" },
  },
  AZ: {
    name: "Arizona",
    abbreviation: "AZ",
    incomeTaxRate: 0.025,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 14.35,
    unemploymentMaxWeekly: 320,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "Arizona ADOR", url: "https://azdor.gov/individual-income-tax-information", lastVerified: "2026-01-15" },
  },
  AR: {
    name: "Arkansas",
    abbreviation: "AR",
    incomeTaxRate: 0.044,
    hasNoIncomeTax: false,
    brackets: {
      single: AR_BRACKETS_SINGLE,
      married_jointly: AR_BRACKETS_SINGLE,
      married_separately: AR_BRACKETS_SINGLE,
      head_of_household: AR_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 11.00,
    unemploymentMaxWeekly: 451,
    unemploymentMaxWeeks: 16,
    standardDeduction: { single: 2340, married_jointly: 4680, married_separately: 2340, head_of_household: 2340 },
    source: { name: "Arkansas DFA", url: "https://www.dfa.arkansas.gov/income-tax/individual-income-tax/", lastVerified: "2026-01-15" },
  },
  CA: {
    name: "California",
    abbreviation: "CA",
    incomeTaxRate: 0.093,
    hasNoIncomeTax: false,
    brackets: {
      single: CA_BRACKETS_SINGLE,
      married_jointly: CA_BRACKETS_MFJ,
      married_separately: CA_BRACKETS_SINGLE,
      head_of_household: CA_BRACKETS_HOH,
    },
    isFlatTax: false,
    overtimeRules: 'daily',
    minWage: 16.50,
    unemploymentMaxWeekly: 450,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 5540, married_jointly: 11080, married_separately: 5540, head_of_household: 11080 },
    source: { name: "California FTB", url: "https://www.ftb.ca.gov/file/personal/tax-rates.html", lastVerified: "2026-01-20" },
  },
  CO: {
    name: "Colorado",
    abbreviation: "CO",
    incomeTaxRate: 0.044,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 14.81,
    unemploymentMaxWeekly: 823,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "Colorado DOR", url: "https://tax.colorado.gov/individual-income-tax", lastVerified: "2026-01-15" },
  },
  CT: {
    name: "Connecticut",
    abbreviation: "CT",
    incomeTaxRate: 0.05,
    hasNoIncomeTax: false,
    brackets: {
      single: CT_BRACKETS_SINGLE,
      married_jointly: CT_BRACKETS_MFJ,
      married_separately: CT_BRACKETS_SINGLE,
      head_of_household: CT_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 16.35,
    unemploymentMaxWeekly: 759,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // CT uses personal exemptions instead
    source: { name: "Connecticut DRS", url: "https://portal.ct.gov/DRS/Individuals/Individual-Tax-Types/Income-Tax", lastVerified: "2026-01-15" },
  },
  DE: {
    name: "Delaware",
    abbreviation: "DE",
    incomeTaxRate: 0.066,
    hasNoIncomeTax: false,
    brackets: {
      single: DE_BRACKETS_SINGLE,
      married_jointly: DE_BRACKETS_SINGLE,
      married_separately: DE_BRACKETS_SINGLE,
      head_of_household: DE_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 15.00,
    unemploymentMaxWeekly: 400,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 3250, married_jointly: 6500, married_separately: 3250, head_of_household: 3250 },
    source: { name: "Delaware DOR", url: "https://revenue.delaware.gov/personal-income-tax/", lastVerified: "2026-01-15" },
  },
  FL: {
    name: "Florida",
    abbreviation: "FL",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 13.00,
    unemploymentMaxWeekly: 275,
    unemploymentMaxWeeks: 12,
    standardDeduction: null,
    source: { name: "Florida DOR", url: "https://floridarevenue.com/", lastVerified: "2026-01-15" },
  },
  GA: {
    name: "Georgia",
    abbreviation: "GA",
    incomeTaxRate: 0.0549,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true, // Georgia transitioned to flat tax in 2024
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 365,
    unemploymentMaxWeeks: 14,
    standardDeduction: { single: 12000, married_jointly: 24000, married_separately: 12000, head_of_household: 18000 },
    source: { name: "Georgia DOR", url: "https://dor.georgia.gov/taxes/individual-taxes/income-tax", lastVerified: "2026-01-15" },
  },
  HI: {
    name: "Hawaii",
    abbreviation: "HI",
    incomeTaxRate: 0.0825,
    hasNoIncomeTax: false,
    brackets: {
      single: HI_BRACKETS_SINGLE,
      married_jointly: HI_BRACKETS_MFJ,
      married_separately: HI_BRACKETS_SINGLE,
      head_of_household: HI_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 14.00,
    unemploymentMaxWeekly: 823,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 2200, married_jointly: 4400, married_separately: 2200, head_of_household: 3212 },
    source: { name: "Hawaii DOTAX", url: "https://tax.hawaii.gov/geninfo/a2_b2_5indiv_income/", lastVerified: "2026-01-15" },
  },
  ID: {
    name: "Idaho",
    abbreviation: "ID",
    incomeTaxRate: 0.058,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true, // Idaho converted to flat tax
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 532,
    unemploymentMaxWeeks: 20,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "Idaho Tax Commission", url: "https://tax.idaho.gov/i-1042.cfm", lastVerified: "2026-01-15" },
  },
  IL: {
    name: "Illinois",
    abbreviation: "IL",
    incomeTaxRate: 0.0495,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 14.00,
    unemploymentMaxWeekly: 707,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // IL uses personal exemptions
    source: { name: "Illinois DOR", url: "https://www2.illinois.gov/rev/individuals/Pages/default.aspx", lastVerified: "2026-01-15" },
  },
  IN: {
    name: "Indiana",
    abbreviation: "IN",
    incomeTaxRate: 0.0305,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 390,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Indiana DOR", url: "https://www.in.gov/dor/individual-income-taxes/", lastVerified: "2026-01-15" },
  },
  IA: {
    name: "Iowa",
    abbreviation: "IA",
    incomeTaxRate: 0.044,
    hasNoIncomeTax: false,
    brackets: {
      single: IA_BRACKETS_SINGLE,
      married_jointly: IA_BRACKETS_SINGLE,
      married_separately: IA_BRACKETS_SINGLE,
      head_of_household: IA_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 591,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 2210, married_jointly: 5450, married_separately: 2210, head_of_household: 5450 },
    source: { name: "Iowa DOR", url: "https://tax.iowa.gov/individual-income-tax", lastVerified: "2026-01-15" },
  },
  KS: {
    name: "Kansas",
    abbreviation: "KS",
    incomeTaxRate: 0.057,
    hasNoIncomeTax: false,
    brackets: {
      single: KS_BRACKETS_SINGLE,
      married_jointly: KS_BRACKETS_MFJ,
      married_separately: KS_BRACKETS_SINGLE,
      head_of_household: KS_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 560,
    unemploymentMaxWeeks: 16,
    standardDeduction: { single: 3500, married_jointly: 8000, married_separately: 4000, head_of_household: 6000 },
    source: { name: "Kansas DOR", url: "https://www.ksrevenue.gov/perincm.html", lastVerified: "2026-01-15" },
  },
  KY: {
    name: "Kentucky",
    abbreviation: "KY",
    incomeTaxRate: 0.04,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 569,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 3160, married_jointly: 6320, married_separately: 3160, head_of_household: 3160 },
    source: { name: "Kentucky DOR", url: "https://revenue.ky.gov/Individual/Pages/Individual-Income-Tax.aspx", lastVerified: "2026-01-15" },
  },
  LA: {
    name: "Louisiana",
    abbreviation: "LA",
    incomeTaxRate: 0.0425,
    hasNoIncomeTax: false,
    brackets: {
      single: LA_BRACKETS_SINGLE,
      married_jointly: LA_BRACKETS_MFJ,
      married_separately: LA_BRACKETS_SINGLE,
      head_of_household: LA_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 275,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // LA uses federal deduction
    source: { name: "Louisiana DOR", url: "https://revenue.louisiana.gov/IndividualIncomeTax", lastVerified: "2026-01-15" },
  },
  ME: {
    name: "Maine",
    abbreviation: "ME",
    incomeTaxRate: 0.0715,
    hasNoIncomeTax: false,
    brackets: {
      single: ME_BRACKETS_SINGLE,
      married_jointly: ME_BRACKETS_MFJ,
      married_separately: ME_BRACKETS_SINGLE,
      head_of_household: ME_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 14.65,
    unemploymentMaxWeekly: 589,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "Maine Revenue", url: "https://www.maine.gov/revenue/taxes/income-estate-tax/individual-income-tax", lastVerified: "2026-01-15" },
  },
  MD: {
    name: "Maryland",
    abbreviation: "MD",
    incomeTaxRate: 0.0575,
    hasNoIncomeTax: false,
    brackets: {
      single: MD_BRACKETS_SINGLE,
      married_jointly: MD_BRACKETS_MFJ,
      married_separately: MD_BRACKETS_SINGLE,
      head_of_household: MD_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 15.00,
    unemploymentMaxWeekly: 430,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 2550, married_jointly: 5150, married_separately: 2550, head_of_household: 2550 },
    source: { name: "Maryland Comptroller", url: "https://www.marylandtaxes.gov/individual/income/tax-info/tax-rates.php", lastVerified: "2026-01-15" },
  },
  MA: {
    name: "Massachusetts",
    abbreviation: "MA",
    incomeTaxRate: 0.09,
    hasNoIncomeTax: false,
    brackets: {
      single: MA_BRACKETS_SINGLE,
      married_jointly: MA_BRACKETS_SINGLE,
      married_separately: MA_BRACKETS_SINGLE,
      head_of_household: MA_BRACKETS_SINGLE,
    },
    isFlatTax: false, // Has 4% surtax on income over $1M
    overtimeRules: 'federal',
    minWage: 15.00,
    unemploymentMaxWeekly: 1033,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // MA uses personal exemptions
    source: { name: "Massachusetts DOR", url: "https://www.mass.gov/info-details/massachusetts-personal-income-tax-rates", lastVerified: "2026-01-15" },
  },
  MI: {
    name: "Michigan",
    abbreviation: "MI",
    incomeTaxRate: 0.0405,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 10.56,
    unemploymentMaxWeekly: 362,
    unemploymentMaxWeeks: 20,
    standardDeduction: null, // MI uses personal exemptions
    source: { name: "Michigan Treasury", url: "https://www.michigan.gov/taxes/iit", lastVerified: "2026-01-15" },
  },
  MN: {
    name: "Minnesota",
    abbreviation: "MN",
    incomeTaxRate: 0.0685,
    hasNoIncomeTax: false,
    brackets: {
      single: MN_BRACKETS_SINGLE,
      married_jointly: MN_BRACKETS_MFJ,
      married_separately: MN_BRACKETS_SINGLE,
      head_of_household: MN_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 10.85,
    unemploymentMaxWeekly: 857,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14575, married_jointly: 29150, married_separately: 14575, head_of_household: 21850 },
    source: { name: "Minnesota DOR", url: "https://www.revenue.state.mn.us/individual-income-tax", lastVerified: "2026-01-15" },
  },
  MS: {
    name: "Mississippi",
    abbreviation: "MS",
    incomeTaxRate: 0.05,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true, // MS moved to flat tax
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 235,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 2300, married_jointly: 4600, married_separately: 2300, head_of_household: 3400 },
    source: { name: "Mississippi DOR", url: "https://www.dor.ms.gov/individual/individual-income-tax", lastVerified: "2026-01-15" },
  },
  MO: {
    name: "Missouri",
    abbreviation: "MO",
    incomeTaxRate: 0.048,
    hasNoIncomeTax: false,
    brackets: {
      single: MO_BRACKETS_SINGLE,
      married_jointly: MO_BRACKETS_SINGLE,
      married_separately: MO_BRACKETS_SINGLE,
      head_of_household: MO_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 13.75,
    unemploymentMaxWeekly: 320,
    unemploymentMaxWeeks: 20,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "Missouri DOR", url: "https://dor.mo.gov/personal/individual/", lastVerified: "2026-01-15" },
  },
  MT: {
    name: "Montana",
    abbreviation: "MT",
    incomeTaxRate: 0.059,
    hasNoIncomeTax: false,
    brackets: {
      single: MT_BRACKETS_SINGLE,
      married_jointly: MT_BRACKETS_SINGLE,
      married_separately: MT_BRACKETS_SINGLE,
      head_of_household: MT_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 10.55,
    unemploymentMaxWeekly: 604,
    unemploymentMaxWeeks: 28,
    standardDeduction: { single: 5540, married_jointly: 11080, married_separately: 5540, head_of_household: 5540 },
    source: { name: "Montana DOR", url: "https://mtrevenue.gov/taxes/individual-income-tax/", lastVerified: "2026-01-15" },
  },
  NE: {
    name: "Nebraska",
    abbreviation: "NE",
    incomeTaxRate: 0.0584,
    hasNoIncomeTax: false,
    brackets: {
      single: NE_BRACKETS_SINGLE,
      married_jointly: NE_BRACKETS_MFJ,
      married_separately: NE_BRACKETS_SINGLE,
      head_of_household: NE_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 13.50,
    unemploymentMaxWeekly: 552,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 8100, married_jointly: 16200, married_separately: 8100, head_of_household: 11800 },
    source: { name: "Nebraska DOR", url: "https://revenue.nebraska.gov/individuals", lastVerified: "2026-01-15" },
  },
  NV: {
    name: "Nevada",
    abbreviation: "NV",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 12.00,
    unemploymentMaxWeekly: 517,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Nevada Tax", url: "https://tax.nv.gov/", lastVerified: "2026-01-15" },
  },
  NH: {
    name: "New Hampshire",
    abbreviation: "NH",
    incomeTaxRate: 0,
    hasNoIncomeTax: true, // NH phased out interest/dividends tax
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 427,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "New Hampshire DRA", url: "https://www.revenue.nh.gov/", lastVerified: "2026-01-15" },
  },
  NJ: {
    name: "New Jersey",
    abbreviation: "NJ",
    incomeTaxRate: 0.0637,
    hasNoIncomeTax: false,
    brackets: {
      single: NJ_BRACKETS_SINGLE,
      married_jointly: NJ_BRACKETS_MFJ,
      married_separately: NJ_BRACKETS_SINGLE,
      head_of_household: NJ_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 15.49,
    unemploymentMaxWeekly: 854,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // NJ doesn't have standard deduction
    source: { name: "New Jersey Treasury", url: "https://www.state.nj.us/treasury/taxation/njit.shtml", lastVerified: "2026-01-15" },
  },
  NM: {
    name: "New Mexico",
    abbreviation: "NM",
    incomeTaxRate: 0.049,
    hasNoIncomeTax: false,
    brackets: {
      single: NM_BRACKETS_SINGLE,
      married_jointly: NM_BRACKETS_MFJ,
      married_separately: NM_BRACKETS_SINGLE,
      head_of_household: NM_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 12.00,
    unemploymentMaxWeekly: 531,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "New Mexico TRD", url: "https://www.tax.newmexico.gov/individuals/personal-income-tax/", lastVerified: "2026-01-15" },
  },
  NY: {
    name: "New York",
    abbreviation: "NY",
    incomeTaxRate: 0.0685,
    hasNoIncomeTax: false,
    brackets: {
      single: NY_BRACKETS_SINGLE,
      married_jointly: NY_BRACKETS_MFJ,
      married_separately: NY_BRACKETS_SINGLE,
      head_of_household: NY_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 16.50,
    unemploymentMaxWeekly: 504,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 8000, married_jointly: 16050, married_separately: 8000, head_of_household: 11200 },
    source: { name: "New York DTF", url: "https://www.tax.ny.gov/pit/file/personal_income_tax.htm", lastVerified: "2026-01-15" },
  },
  NC: {
    name: "North Carolina",
    abbreviation: "NC",
    incomeTaxRate: 0.0475,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 350,
    unemploymentMaxWeeks: 12,
    standardDeduction: { single: 12750, married_jointly: 25500, married_separately: 12750, head_of_household: 19125 },
    source: { name: "North Carolina DOR", url: "https://www.ncdor.gov/taxes-forms/individual-income-tax", lastVerified: "2026-01-15" },
  },
  ND: {
    name: "North Dakota",
    abbreviation: "ND",
    incomeTaxRate: 0.0195,
    hasNoIncomeTax: false,
    brackets: {
      single: ND_BRACKETS_SINGLE,
      married_jointly: ND_BRACKETS_SINGLE,
      married_separately: ND_BRACKETS_SINGLE,
      head_of_household: ND_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 673,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "North Dakota Tax", url: "https://www.tax.nd.gov/individual", lastVerified: "2026-01-15" },
  },
  OH: {
    name: "Ohio",
    abbreviation: "OH",
    incomeTaxRate: 0.04,
    hasNoIncomeTax: false,
    brackets: {
      single: OH_BRACKETS_SINGLE,
      married_jointly: OH_BRACKETS_SINGLE,
      married_separately: OH_BRACKETS_SINGLE,
      head_of_household: OH_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 10.70,
    unemploymentMaxWeekly: 561,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // Ohio uses exemptions
    source: { name: "Ohio Tax", url: "https://tax.ohio.gov/individual", lastVerified: "2026-01-15" },
  },
  OK: {
    name: "Oklahoma",
    abbreviation: "OK",
    incomeTaxRate: 0.0475,
    hasNoIncomeTax: false,
    brackets: {
      single: OK_BRACKETS_SINGLE,
      married_jointly: OK_BRACKETS_MFJ,
      married_separately: OK_BRACKETS_SINGLE,
      head_of_household: OK_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 539,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 6350, married_jointly: 12700, married_separately: 6350, head_of_household: 9350 },
    source: { name: "Oklahoma Tax Commission", url: "https://oklahoma.gov/tax/individuals/income-tax.html", lastVerified: "2026-01-15" },
  },
  OR: {
    name: "Oregon",
    abbreviation: "OR",
    incomeTaxRate: 0.09,
    hasNoIncomeTax: false,
    brackets: {
      single: OR_BRACKETS_SINGLE,
      married_jointly: OR_BRACKETS_MFJ,
      married_separately: OR_BRACKETS_SINGLE,
      head_of_household: OR_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 15.45,
    unemploymentMaxWeekly: 733,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 2745, married_jointly: 5495, married_separately: 2745, head_of_household: 4420 },
    source: { name: "Oregon DOR", url: "https://www.oregon.gov/dor/programs/individuals/pages/pit.aspx", lastVerified: "2026-01-15" },
  },
  PA: {
    name: "Pennsylvania",
    abbreviation: "PA",
    incomeTaxRate: 0.0307,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 594,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Pennsylvania DOR", url: "https://www.revenue.pa.gov/TaxTypes/PIT/Pages/default.aspx", lastVerified: "2026-01-15" },
  },
  RI: {
    name: "Rhode Island",
    abbreviation: "RI",
    incomeTaxRate: 0.0599,
    hasNoIncomeTax: false,
    brackets: {
      single: RI_BRACKETS_SINGLE,
      married_jointly: RI_BRACKETS_SINGLE,
      married_separately: RI_BRACKETS_SINGLE,
      head_of_household: RI_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 15.00,
    unemploymentMaxWeekly: 867,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 10550, married_jointly: 21150, married_separately: 10550, head_of_household: 15850 },
    source: { name: "Rhode Island Tax", url: "https://tax.ri.gov/tax-sections/personal-income-tax", lastVerified: "2026-01-15" },
  },
  SC: {
    name: "South Carolina",
    abbreviation: "SC",
    incomeTaxRate: 0.064,
    hasNoIncomeTax: false,
    brackets: {
      single: SC_BRACKETS_SINGLE,
      married_jointly: SC_BRACKETS_SINGLE,
      married_separately: SC_BRACKETS_SINGLE,
      head_of_household: SC_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 326,
    unemploymentMaxWeeks: 20,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "South Carolina DOR", url: "https://dor.sc.gov/tax/individual-income", lastVerified: "2026-01-15" },
  },
  SD: {
    name: "South Dakota",
    abbreviation: "SD",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 11.50,
    unemploymentMaxWeekly: 487,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "South Dakota DOR", url: "https://dor.sd.gov/", lastVerified: "2026-01-15" },
  },
  TN: {
    name: "Tennessee",
    abbreviation: "TN",
    incomeTaxRate: 0,
    hasNoIncomeTax: true, // TN eliminated Hall Tax
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 275,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Tennessee DOR", url: "https://www.tn.gov/revenue/taxes.html", lastVerified: "2026-01-15" },
  },
  TX: {
    name: "Texas",
    abbreviation: "TX",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 563,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Texas Comptroller", url: "https://comptroller.texas.gov/taxes/", lastVerified: "2026-01-15" },
  },
  UT: {
    name: "Utah",
    abbreviation: "UT",
    incomeTaxRate: 0.0465,
    hasNoIncomeTax: false,
    brackets: null,
    isFlatTax: true,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 668,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // Utah uses taxpayer tax credit instead
    source: { name: "Utah State Tax", url: "https://incometax.utah.gov/", lastVerified: "2026-01-15" },
  },
  VT: {
    name: "Vermont",
    abbreviation: "VT",
    incomeTaxRate: 0.066,
    hasNoIncomeTax: false,
    brackets: {
      single: VT_BRACKETS_SINGLE,
      married_jointly: VT_BRACKETS_MFJ,
      married_separately: VT_BRACKETS_SINGLE,
      head_of_household: VT_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 14.01,
    unemploymentMaxWeekly: 589,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 7100, married_jointly: 14200, married_separately: 7100, head_of_household: 10650 },
    source: { name: "Vermont Tax", url: "https://tax.vermont.gov/individuals", lastVerified: "2026-01-15" },
  },
  VA: {
    name: "Virginia",
    abbreviation: "VA",
    incomeTaxRate: 0.0575,
    hasNoIncomeTax: false,
    brackets: {
      single: VA_BRACKETS_SINGLE,
      married_jointly: VA_BRACKETS_SINGLE,
      married_separately: VA_BRACKETS_SINGLE,
      head_of_household: VA_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 12.41,
    unemploymentMaxWeekly: 378,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 8000, married_jointly: 16000, married_separately: 8000, head_of_household: 8000 },
    source: { name: "Virginia Tax", url: "https://www.tax.virginia.gov/individual-income-tax", lastVerified: "2026-01-15" },
  },
  WA: {
    name: "Washington",
    abbreviation: "WA",
    incomeTaxRate: 0,
    hasNoIncomeTax: true, // WA has no income tax (capital gains tax is separate)
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 16.66,
    unemploymentMaxWeekly: 999,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Washington DOR", url: "https://dor.wa.gov/", lastVerified: "2026-01-15" },
  },
  WV: {
    name: "West Virginia",
    abbreviation: "WV",
    incomeTaxRate: 0.055,
    hasNoIncomeTax: false,
    brackets: {
      single: WV_BRACKETS_SINGLE,
      married_jointly: WV_BRACKETS_SINGLE,
      married_separately: WV_BRACKETS_SINGLE,
      head_of_household: WV_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 8.75,
    unemploymentMaxWeekly: 424,
    unemploymentMaxWeeks: 26,
    standardDeduction: null, // WV uses federal AGI
    source: { name: "West Virginia Tax", url: "https://tax.wv.gov/Individuals/PersonalIncomeTax/Pages/PersonalIncomeTax.aspx", lastVerified: "2026-01-15" },
  },
  WI: {
    name: "Wisconsin",
    abbreviation: "WI",
    incomeTaxRate: 0.053,
    hasNoIncomeTax: false,
    brackets: {
      single: WI_BRACKETS_SINGLE,
      married_jointly: WI_BRACKETS_MFJ,
      married_separately: WI_BRACKETS_SINGLE,
      head_of_household: WI_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 370,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 13230, married_jointly: 24470, married_separately: 11400, head_of_household: 17750 },
    source: { name: "Wisconsin DOR", url: "https://www.revenue.wi.gov/Pages/FAQS/ise-indincm.aspx", lastVerified: "2026-01-15" },
  },
  WY: {
    name: "Wyoming",
    abbreviation: "WY",
    incomeTaxRate: 0,
    hasNoIncomeTax: true,
    brackets: null,
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 7.25,
    unemploymentMaxWeekly: 560,
    unemploymentMaxWeeks: 26,
    standardDeduction: null,
    source: { name: "Wyoming DOR", url: "https://revenue.wyo.gov/", lastVerified: "2026-01-15" },
  },
  DC: {
    name: "Washington D.C.",
    abbreviation: "DC",
    incomeTaxRate: 0.085,
    hasNoIncomeTax: false,
    brackets: {
      single: DC_BRACKETS_SINGLE,
      married_jointly: DC_BRACKETS_MFJ,
      married_separately: DC_BRACKETS_SINGLE,
      head_of_household: DC_BRACKETS_SINGLE,
    },
    isFlatTax: false,
    overtimeRules: 'federal',
    minWage: 17.50,
    unemploymentMaxWeekly: 444,
    unemploymentMaxWeeks: 26,
    standardDeduction: { single: 14600, married_jointly: 29200, married_separately: 14600, head_of_household: 21900 },
    source: { name: "DC OTR", url: "https://otr.cfo.dc.gov/page/individual-income-and-franchise-taxes", lastVerified: "2026-01-15" },
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate state tax using progressive brackets
 */
export function calculateStateTax(
  taxableIncome: number,
  stateCode: string,
  filingStatus: FilingStatus = 'single'
): number {
  const stateData = stateTaxData[stateCode];
  if (!stateData || stateData.hasNoIncomeTax) return 0;
  
  // If flat tax state, use the flat rate
  if (stateData.isFlatTax || !stateData.brackets) {
    return taxableIncome * stateData.incomeTaxRate;
  }
  
  // Get brackets for filing status
  const brackets = stateData.brackets[filingStatus] || stateData.brackets.single;
  if (!brackets) {
    return taxableIncome * stateData.incomeTaxRate;
  }
  
  // Calculate progressive tax
  return calculateProgressiveTax(taxableIncome, brackets);
}

/**
 * Calculate tax using progressive brackets
 */
export function calculateProgressiveTax(income: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let remainingIncome = income;
  
  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  
  return tax;
}

/**
 * Get marginal tax rate for a given income
 */
export function getMarginalRate(
  income: number,
  stateCode: string,
  filingStatus: FilingStatus = 'single'
): number {
  const stateData = stateTaxData[stateCode];
  if (!stateData || stateData.hasNoIncomeTax) return 0;
  
  if (stateData.isFlatTax || !stateData.brackets) {
    return stateData.incomeTaxRate;
  }
  
  const brackets = stateData.brackets[filingStatus] || stateData.brackets.single;
  if (!brackets) return stateData.incomeTaxRate;
  
  // Find the bracket the income falls into
  for (const bracket of brackets) {
    if (income <= bracket.max) {
      return bracket.rate;
    }
  }
  
  // Return top rate
  return brackets[brackets.length - 1].rate;
}

// =============================================================================
// ROLE TEMPLATES & OTHER EXPORTS (unchanged from original)
// =============================================================================

export interface RoleTemplate {
  id: string;
  name: string;
  category: 'industrial' | 'hospitality' | 'retail' | 'facilities';
  defaultHourlyRate: number;
  minRate: number;
  maxRate: number;
  typicalHoursPerWeek: number;
  hasTips: boolean;
  avgTipsPerHour?: number;
  hasNightShift: boolean;
  hasWeekendPremium: boolean;
  description: string;
}

export const roleTemplates: RoleTemplate[] = [
  // Industrial
  { id: 'warehouse-worker', name: 'Warehouse Worker', category: 'industrial', defaultHourlyRate: 17, minRate: 14, maxRate: 22, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Picking, packing, and shipping orders' },
  { id: 'forklift-operator', name: 'Forklift Operator', category: 'industrial', defaultHourlyRate: 19, minRate: 16, maxRate: 25, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Operating forklifts and material handling equipment' },
  { id: 'machine-operator', name: 'Machine Operator', category: 'industrial', defaultHourlyRate: 18, minRate: 15, maxRate: 24, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Operating production machinery' },
  { id: 'assembler', name: 'Assembler', category: 'industrial', defaultHourlyRate: 16, minRate: 14, maxRate: 21, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Assembly line production work' },
  { id: 'loader', name: 'Loader / Crew', category: 'industrial', defaultHourlyRate: 16, minRate: 14, maxRate: 20, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Loading and unloading freight' },
  
  // Hospitality
  { id: 'server', name: 'Server / Waitstaff', category: 'hospitality', defaultHourlyRate: 7, minRate: 2.13, maxRate: 15, typicalHoursPerWeek: 30, hasTips: true, avgTipsPerHour: 15, hasNightShift: false, hasWeekendPremium: true, description: 'Restaurant table service' },
  { id: 'bartender', name: 'Bartender', category: 'hospitality', defaultHourlyRate: 8, minRate: 2.13, maxRate: 15, typicalHoursPerWeek: 30, hasTips: true, avgTipsPerHour: 20, hasNightShift: true, hasWeekendPremium: true, description: 'Mixing drinks and bar service' },
  { id: 'banquet-server', name: 'Banquet Server', category: 'hospitality', defaultHourlyRate: 15, minRate: 12, maxRate: 20, typicalHoursPerWeek: 25, hasTips: true, avgTipsPerHour: 5, hasNightShift: false, hasWeekendPremium: true, description: 'Event and banquet food service' },
  { id: 'prep-cook', name: 'Prep Cook', category: 'hospitality', defaultHourlyRate: 15, minRate: 12, maxRate: 19, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: false, hasWeekendPremium: true, description: 'Food preparation and kitchen support' },
  { id: 'dishwasher', name: 'Dishwasher', category: 'hospitality', defaultHourlyRate: 14, minRate: 11, maxRate: 17, typicalHoursPerWeek: 30, hasTips: false, hasNightShift: false, hasWeekendPremium: true, description: 'Kitchen cleaning and dishwashing' },
  { id: 'event-staff', name: 'Event Staff', category: 'hospitality', defaultHourlyRate: 16, minRate: 13, maxRate: 22, typicalHoursPerWeek: 20, hasTips: true, avgTipsPerHour: 3, hasNightShift: true, hasWeekendPremium: true, description: 'Event setup, service, and breakdown' },
  
  // Retail
  { id: 'retail-associate', name: 'Retail Associate', category: 'retail', defaultHourlyRate: 15, minRate: 12, maxRate: 18, typicalHoursPerWeek: 30, hasTips: false, hasNightShift: false, hasWeekendPremium: false, description: 'Customer service and sales floor' },
  { id: 'cashier', name: 'Cashier', category: 'retail', defaultHourlyRate: 14, minRate: 11, maxRate: 17, typicalHoursPerWeek: 28, hasTips: false, hasNightShift: false, hasWeekendPremium: false, description: 'Point of sale and checkout' },
  { id: 'stock-clerk', name: 'Stock Clerk', category: 'retail', defaultHourlyRate: 15, minRate: 12, maxRate: 18, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: false, description: 'Inventory and stocking shelves' },
  
  // Facilities
  { id: 'cleaner', name: 'Cleaner', category: 'facilities', defaultHourlyRate: 14, minRate: 11, maxRate: 18, typicalHoursPerWeek: 35, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Commercial cleaning services' },
  { id: 'custodian', name: 'Custodian', category: 'facilities', defaultHourlyRate: 15, minRate: 12, maxRate: 19, typicalHoursPerWeek: 40, hasTips: false, hasNightShift: true, hasWeekendPremium: true, description: 'Building maintenance and cleaning' },
];

// Shift differentials
export interface ShiftDifferential {
  id: string;
  name: string;
  description: string;
  premiumType: 'flat' | 'percentage';
  premiumAmount: number;
}

export const shiftDifferentials: ShiftDifferential[] = [
  { id: 'night', name: 'Night Shift', description: 'Evening/overnight shifts (typically 6pm-6am)', premiumType: 'flat', premiumAmount: 1.50 },
  { id: 'weekend', name: 'Weekend Premium', description: 'Saturday and Sunday shifts', premiumType: 'flat', premiumAmount: 2.00 },
  { id: 'holiday', name: 'Holiday Pay', description: 'Work on federal holidays', premiumType: 'percentage', premiumAmount: 50 },
];

// 2026 Federal tax brackets (Single filer) - exported for backwards compatibility
export const federalTaxBrackets2026 = [
  { min: 0, max: 12150, rate: 0.10 },
  { min: 12150, max: 49400, rate: 0.12 },
  { min: 49400, max: 105400, rate: 0.22 },
  { min: 105400, max: 201200, rate: 0.24 },
  { min: 201200, max: 255600, rate: 0.32 },
  { min: 255600, max: 639200, rate: 0.35 },
  { min: 639200, max: Infinity, rate: 0.37 },
];

// Calculate federal tax using progressive brackets
export function calculateFederalTax(taxableIncome: number): number {
  return calculateProgressiveTax(taxableIncome, federalTaxBrackets2026);
}

// Quarterly tax deadlines for 2026
export const quarterlyDeadlines2026 = [
  { quarter: 'Q1', period: 'Jan 1 - Mar 31', dueDate: 'April 15, 2026', isPast: false },
  { quarter: 'Q2', period: 'Apr 1 - May 31', dueDate: 'June 16, 2026', isPast: false },
  { quarter: 'Q3', period: 'Jun 1 - Aug 31', dueDate: 'September 15, 2026', isPast: false },
  { quarter: 'Q4', period: 'Sep 1 - Dec 31', dueDate: 'January 15, 2027', isPast: false },
];

// Common deductions for gig workers
export interface Deduction {
  id: string;
  label: string;
  description: string;
  category: 'vehicle' | 'equipment' | 'business' | 'home';
  calculationType: 'per-mile' | 'annual' | 'monthly' | 'percentage';
  defaultValue: number;
  unit?: string;
}

export const commonDeductions: Deduction[] = [
  { id: 'mileage', label: 'Vehicle Mileage', description: '70¢ per mile (2026 IRS rate)', category: 'vehicle', calculationType: 'per-mile', defaultValue: 0.70, unit: 'miles' },
  { id: 'parking', label: 'Parking & Tolls', description: 'Work-related parking and toll fees', category: 'vehicle', calculationType: 'annual', defaultValue: 500 },
  { id: 'phone', label: 'Phone Bill (work %)', description: 'Business portion of cell phone', category: 'equipment', calculationType: 'monthly', defaultValue: 50 },
  { id: 'uniform', label: 'Work Uniforms', description: 'Required work clothing and safety gear', category: 'equipment', calculationType: 'annual', defaultValue: 250 },
  { id: 'tools', label: 'Tools & Equipment', description: 'Work-related tools and supplies', category: 'equipment', calculationType: 'annual', defaultValue: 200 },
  { id: 'computer', label: 'Computer/Tech', description: 'Work-related devices and software', category: 'equipment', calculationType: 'annual', defaultValue: 300 },
  { id: 'meals', label: 'Business Meals', description: '50% of work-related meals deductible', category: 'business', calculationType: 'annual', defaultValue: 400 },
  { id: 'professional', label: 'Professional Services', description: 'Tax prep, legal, accounting', category: 'business', calculationType: 'annual', defaultValue: 300 },
  { id: 'insurance', label: 'Health Insurance', description: 'Self-employed health insurance deduction', category: 'business', calculationType: 'annual', defaultValue: 0 },
  { id: 'homeoffice', label: 'Home Office', description: 'Simplified method: $5/sq ft up to 300 sq ft', category: 'home', calculationType: 'annual', defaultValue: 750 },
];

// Get sorted states list
export function getSortedStates(): Array<{ code: string; name: string; hasNoIncomeTax: boolean }> {
  return Object.entries(stateTaxData)
    .map(([code, data]) => ({ code, name: data.name, hasNoIncomeTax: data.hasNoIncomeTax }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Get states with no income tax
export function getNoIncomeTaxStates(): string[] {
  return Object.entries(stateTaxData)
    .filter(([, data]) => data.hasNoIncomeTax)
    .map(([code]) => code);
}

// Get states with progressive brackets
export function getProgressiveTaxStates(): string[] {
  return Object.entries(stateTaxData)
    .filter(([, data]) => data.brackets !== null && !data.isFlatTax)
    .map(([code]) => code);
}

// Get flat tax states
export function getFlatTaxStates(): string[] {
  return Object.entries(stateTaxData)
    .filter(([, data]) => data.isFlatTax)
    .map(([code]) => code);
}
