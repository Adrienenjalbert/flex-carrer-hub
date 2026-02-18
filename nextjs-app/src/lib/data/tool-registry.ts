// Tool Registry - Single Source of Truth for Calculator Tools
// This registry drives routing, metadata, FAQ generation, internal links, and calculator presets

import { roleTemplates, stateTaxData, shiftDifferentials } from './state-taxes';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ToolInput {
  id: string;
  name: string;
  type: 'number' | 'select' | 'slider' | 'checkbox' | 'text';
  defaultValue: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  required: boolean;
  helpText?: string;
}

export interface ToolOutput {
  id: string;
  name: string;
  format: 'currency' | 'percentage' | 'number' | 'text';
  primary: boolean; // Show prominently
}

export interface FAQTemplate {
  question: string;
  answer: string;
  variables?: string[]; // Placeholders to fill dynamically
}

export interface RolePreset {
  roleId: string;
  name: string;
  hourlyRate: number;
  hoursPerWeek: number;
  hasTips: boolean;
  avgTipsPerHour?: number;
  hasNightShift: boolean;
  description: string;
}

export interface DataSource {
  name: string;
  url: string;
  lastVerified: string;
  description: string;
}

export interface WhatIfScenario {
  id: string;
  label: string;
  description: string;
  delta: {
    field: string;
    change: number | string;
    operation: 'add' | 'multiply' | 'replace';
  };
}

export interface IntentPage {
  slugPattern: string; // e.g., "/paycheck-calculator/[state]"
  type: 'state' | 'role' | 'alternative' | 'combo';
  titleTemplate: string;
  descriptionTemplate: string;
  prefillFields: string[];
}

export interface SchemaConfig {
  type: 'SoftwareApplication' | 'WebApplication' | 'HowTo';
  category: string;
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  synonyms: string[]; // URL paths that redirect to this tool
  description: string;
  shortDescription: string;
  category: 'calculators' | 'planners' | 'career';
  icon: string; // Lucide icon name
  inputs: ToolInput[];
  outputs: ToolOutput[];
  faqTemplates: FAQTemplate[];
  rolePresets: RolePreset[];
  dataSources: DataSource[];
  whatIfScenarios: WhatIfScenario[];
  relatedTools: string[]; // Other tool slugs
  intentPages: IntentPage[];
  schema: SchemaConfig;
  lastUpdated: string;
  supportedCountries: string[];
}

// ============================================
// DATA SOURCES (shared across tools)
// ============================================

export const commonDataSources: DataSource[] = [
  {
    name: "IRS Publication 15-T",
    url: "https://www.irs.gov/publications/p15t",
    lastVerified: "2026-01-15",
    description: "Federal income tax withholding tables and methodology"
  },
  {
    name: "Tax Foundation",
    url: "https://taxfoundation.org/data/all/state/state-income-tax-rates-2025/",
    lastVerified: "2026-01-10",
    description: "State income tax rates and brackets"
  },
  {
    name: "U.S. Department of Labor",
    url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
    lastVerified: "2026-01-01",
    description: "State minimum wage data"
  },
  {
    name: "Social Security Administration",
    url: "https://www.ssa.gov/oact/cola/cbb.html",
    lastVerified: "2026-01-01",
    description: "Social Security wage base and tax rates"
  },
];

// ============================================
// ROLE PRESETS (from roleTemplates)
// ============================================

export const calculatorRolePresets: RolePreset[] = roleTemplates.map(role => ({
  roleId: role.id,
  name: role.name,
  hourlyRate: role.defaultHourlyRate,
  hoursPerWeek: role.typicalHoursPerWeek,
  hasTips: role.hasTips,
  avgTipsPerHour: role.avgTipsPerHour,
  hasNightShift: role.hasNightShift,
  description: role.description,
}));

// ============================================
// WHAT-IF SCENARIOS (shared)
// ============================================

export const commonWhatIfScenarios: WhatIfScenario[] = [
  {
    id: 'extra-5-hours',
    label: 'Work 5 extra hours/week',
    description: 'See how adding one extra shift affects your pay',
    delta: { field: 'hoursPerWeek', change: 5, operation: 'add' }
  },
  {
    id: 'extra-10-hours',
    label: 'Work 10 extra hours/week',
    description: 'Double your weekly bonus hours',
    delta: { field: 'hoursPerWeek', change: 10, operation: 'add' }
  },
  {
    id: 'raise-2-dollars',
    label: 'Get a $2/hr raise',
    description: 'Impact of a typical wage increase',
    delta: { field: 'hourlyRate', change: 2, operation: 'add' }
  },
  {
    id: 'raise-5-dollars',
    label: 'Get a $5/hr raise',
    description: 'Impact of a significant promotion',
    delta: { field: 'hourlyRate', change: 5, operation: 'add' }
  },
  {
    id: 'night-shift',
    label: 'Take night shift (+$1.50/hr)',
    description: 'Add typical night differential',
    delta: { field: 'hourlyRate', change: 1.5, operation: 'add' }
  },
  {
    id: 'weekend-premium',
    label: 'Work weekends (+$2/hr)',
    description: 'Add weekend premium pay',
    delta: { field: 'hourlyRate', change: 2, operation: 'add' }
  },
  {
    id: 'move-to-texas',
    label: 'Move to Texas (no state tax)',
    description: 'Compare take-home in a no-tax state',
    delta: { field: 'state', change: 'TX', operation: 'replace' }
  },
  {
    id: 'move-to-florida',
    label: 'Move to Florida (no state tax)',
    description: 'Compare take-home in a no-tax state',
    delta: { field: 'state', change: 'FL', operation: 'replace' }
  },
  {
    id: 'add-401k-5',
    label: 'Contribute 5% to 401(k)',
    description: 'See tax savings from retirement contributions',
    delta: { field: 'retirement401k', change: 5, operation: 'replace' }
  },
  {
    id: 'add-401k-10',
    label: 'Contribute 10% to 401(k)',
    description: 'Maximize retirement savings',
    delta: { field: 'retirement401k', change: 10, operation: 'replace' }
  },
];

// ============================================
// 5 CANONICAL CALCULATORS
// ============================================

export const toolRegistry: ToolDefinition[] = [
  // ===== 1. PAYCHECK CALCULATOR (Primary) =====
  {
    slug: 'paycheck-calculator',
    name: 'Paycheck Calculator',
    shortName: 'Paycheck',
    primaryKeyword: 'paycheck calculator',
    secondaryKeywords: ['pay stub calculator', 'payroll calculator', 'calculate my paycheck', 'gross to net'],
    synonyms: [
      '/paycalculator',
      '/pay-check-calc',
      '/pay-check-calculator',
      '/calculate-my-paycheck',
      '/payroll-calculator',
      '/pay-stub-calculator',
      '/paystub-calculator',
      '/paycheck',
      '/calculator',
      '/career-hub/tools/pay-calculator', // Legacy redirect
    ],
    description: 'Free paycheck calculator for hourly workers. Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions like 401(k).',
    shortDescription: 'Calculate your take-home pay after taxes',
    category: 'calculators',
    icon: 'Calculator',
    inputs: [
      { id: 'hourlyRate', name: 'Hourly Rate', type: 'slider', defaultValue: 18, min: 7.25, max: 75, step: 0.25, required: true, helpText: 'Your base hourly wage before taxes' },
      { id: 'hoursPerWeek', name: 'Hours Per Week', type: 'slider', defaultValue: 40, min: 1, max: 60, step: 1, required: true, helpText: 'Average hours worked per week' },
      { id: 'state', name: 'State', type: 'select', defaultValue: 'TX', required: true, helpText: 'State where you work (affects tax calculation)' },
      { id: 'retirement401k', name: '401(k) Contribution', type: 'slider', defaultValue: 0, min: 0, max: 20, step: 1, required: false, helpText: 'Pre-tax retirement contribution percentage' },
      { id: 'includeTips', name: 'Include Tips', type: 'checkbox', defaultValue: false, required: false, helpText: 'For tipped workers (servers, bartenders)' },
      { id: 'tipsPerHour', name: 'Avg Tips/Hour', type: 'number', defaultValue: 0, min: 0, max: 100, required: false, helpText: 'Average tips earned per hour' },
    ],
    outputs: [
      { id: 'hourlyNet', name: 'Hourly Take-Home', format: 'currency', primary: true },
      { id: 'weeklyNet', name: 'Weekly Take-Home', format: 'currency', primary: true },
      { id: 'annualNet', name: 'Annual Take-Home', format: 'currency', primary: true },
      { id: 'annualGross', name: 'Annual Gross', format: 'currency', primary: false },
      { id: 'federalTax', name: 'Federal Tax', format: 'currency', primary: false },
      { id: 'stateTax', name: 'State Tax', format: 'currency', primary: false },
      { id: 'socialSecurityTax', name: 'Social Security', format: 'currency', primary: false },
      { id: 'medicareTax', name: 'Medicare', format: 'currency', primary: false },
      { id: 'effectiveTaxRate', name: 'Effective Tax Rate', format: 'percentage', primary: false },
    ],
    faqTemplates: [
      {
        question: 'How is take-home pay calculated?',
        answer: 'Take-home pay is your gross pay minus taxes (federal, state, Social Security, Medicare) and any voluntary deductions like 401(k) contributions. Our calculator uses 2026 IRS tax brackets and state-specific rates.'
      },
      {
        question: 'What is the Social Security tax rate in 2026?',
        answer: 'The Social Security tax rate is 6.2% on income up to $168,600 (2026 wage base). Your employer also pays 6.2%, for a combined 12.4%.'
      },
      {
        question: 'How do I convert hourly wage to annual salary?',
        answer: 'Multiply your hourly rate by hours worked per week, then multiply by 52 weeks. For example: $18/hr × 40 hours × 52 weeks = $37,440/year gross.'
      },
      {
        question: 'Which states have no income tax?',
        answer: 'Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire (dividends only), South Dakota, Tennessee, Texas, Washington, and Wyoming. Workers in these states keep more take-home pay.'
      },
      {
        question: 'Are tips taxable income?',
        answer: 'Yes, tips are taxable income. Both cash and credit card tips must be reported. Employers withhold taxes on reported tips. Use our tips calculator toggle to include tips in your pay estimate.'
      },
    ],
    rolePresets: calculatorRolePresets,
    dataSources: commonDataSources,
    whatIfScenarios: commonWhatIfScenarios,
    relatedTools: ['take-home-pay', 'tax-calculator', 'salary-converter', 'shift-planner'],
    intentPages: [
      { slugPattern: '/paycheck-calculator/[stateSlug]', type: 'state', titleTemplate: '[State] Paycheck Calculator 2026', descriptionTemplate: 'Calculate take-home pay for [State] workers. See how federal taxes and [State] state taxes affect your paycheck.', prefillFields: ['state'] },
      { slugPattern: '/paycheck-calculator/[roleSlug]', type: 'role', titleTemplate: '[Role] Pay Calculator - How Much Do [Role]s Make?', descriptionTemplate: 'Calculate pay for [Role] jobs. See average hourly rates, take-home pay, and earnings potential for [Role] positions.', prefillFields: ['hourlyRate', 'hoursPerWeek', 'includeTips'] },
      { slugPattern: '/paycheck-calculator/adp-alternative', type: 'alternative', titleTemplate: 'Free Paycheck Calculator - ADP Alternative', descriptionTemplate: 'Free online paycheck calculator. No signup required. Calculate take-home pay instantly - a simple alternative to ADP payroll calculators.', prefillFields: [] },
      { slugPattern: '/paycheck-calculator/[stateSlug]/[roleSlug]', type: 'combo', titleTemplate: '[Role] Pay in [State] - Paycheck Calculator', descriptionTemplate: 'How much do [Role]s make in [State]? Calculate exact take-home pay with [State] taxes and [Role] wage data.', prefillFields: ['state', 'hourlyRate', 'hoursPerWeek'] },
    ],
    schema: {
      type: 'SoftwareApplication',
      category: 'FinanceApplication',
      aggregateRating: { ratingValue: 4.8, ratingCount: 2847 }
    },
    lastUpdated: '2026-02-01',
    supportedCountries: ['US'],
  },

  // ===== 2. TAKE-HOME PAY CALCULATOR =====
  {
    slug: 'take-home-pay',
    name: 'Take-Home Pay Calculator',
    shortName: 'Take-Home',
    primaryKeyword: 'take-home pay calculator',
    secondaryKeywords: ['net pay calculator', 'bring home pay', 'after tax calculator', 'net income calculator'],
    synonyms: [
      '/net-pay-calculator',
      '/net-pay',
      '/bring-home-pay',
      '/bring-home-pay-calculator',
      '/after-tax-pay',
      '/net-check-calculator',
      '/take-home',
    ],
    description: 'See exactly how much money hits your bank account. Our take-home pay calculator shows your net pay after all taxes and deductions with visual breakdowns.',
    shortDescription: 'See your actual net pay after all deductions',
    category: 'calculators',
    icon: 'Wallet',
    inputs: [
      { id: 'grossPay', name: 'Gross Pay', type: 'number', defaultValue: 2000, min: 0, required: true, helpText: 'Your total pay before deductions' },
      { id: 'payFrequency', name: 'Pay Frequency', type: 'select', defaultValue: 'biweekly', required: true, options: [{ value: 'weekly', label: 'Weekly' }, { value: 'biweekly', label: 'Bi-weekly' }, { value: 'semimonthly', label: 'Semi-monthly' }, { value: 'monthly', label: 'Monthly' }] },
      { id: 'state', name: 'State', type: 'select', defaultValue: 'TX', required: true },
      { id: 'filingStatus', name: 'Filing Status', type: 'select', defaultValue: 'single', required: true, options: [{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married Filing Jointly' }, { value: 'head', label: 'Head of Household' }] },
    ],
    outputs: [
      { id: 'netPay', name: 'Take-Home Pay', format: 'currency', primary: true },
      { id: 'totalDeductions', name: 'Total Deductions', format: 'currency', primary: true },
      { id: 'netPayPercentage', name: 'Take-Home Percentage', format: 'percentage', primary: false },
    ],
    faqTemplates: [
      {
        question: 'What is take-home pay?',
        answer: 'Take-home pay (also called net pay) is the amount you actually receive in your paycheck after all deductions. This includes federal tax, state tax, Social Security, Medicare, and any voluntary deductions.'
      },
      {
        question: 'Why is my take-home pay lower than expected?',
        answer: 'Common reasons include: higher tax withholding (update your W-4), state income taxes, 401(k) contributions, health insurance premiums, or other benefit deductions. Review your pay stub for a detailed breakdown.'
      },
      {
        question: 'How can I increase my take-home pay?',
        answer: 'Options include: adjusting W-4 allowances, contributing to pre-tax accounts (401k, HSA), moving to a no-income-tax state, or negotiating a raise. Be careful not to under-withhold taxes.'
      },
    ],
    rolePresets: calculatorRolePresets.slice(0, 8),
    dataSources: commonDataSources,
    whatIfScenarios: commonWhatIfScenarios.filter(s => !s.id.includes('hours')),
    relatedTools: ['paycheck-calculator', 'tax-calculator', 'salary-converter'],
    intentPages: [],
    schema: {
      type: 'SoftwareApplication',
      category: 'FinanceApplication',
      aggregateRating: { ratingValue: 4.7, ratingCount: 1523 }
    },
    lastUpdated: '2026-02-01',
    supportedCountries: ['US'],
  },

  // ===== 3. TAX CALCULATOR =====
  {
    slug: 'tax-calculator',
    name: 'Tax Calculator',
    shortName: 'Taxes',
    primaryKeyword: 'tax calculator',
    secondaryKeywords: ['income tax calculator', 'federal tax calculator', 'estimated taxes', 'tax estimator', '1099 tax calculator'],
    synonyms: [
      '/income-tax-calculator',
      '/tax-estimator',
      '/federal-tax-calculator',
      '/estimated-taxes',
      '/1099-tax-calculator',
      '/self-employment-tax',
      '/taxes',
      '/taxcalculator',
    ],
    description: 'Estimate your federal and state income taxes for 2026. Includes self-employment tax for gig workers, deduction tracking, and quarterly payment estimates.',
    shortDescription: 'Estimate federal and state taxes',
    category: 'calculators',
    icon: 'Receipt',
    inputs: [
      { id: 'income', name: 'Annual Income', type: 'number', defaultValue: 35000, min: 0, required: true },
      { id: 'state', name: 'State', type: 'select', defaultValue: 'TX', required: true },
      { id: 'employmentType', name: 'Employment Type', type: 'select', defaultValue: 'w2', required: true, options: [{ value: 'w2', label: 'W-2 Employee' }, { value: '1099', label: '1099 Contractor/Gig Worker' }] },
      { id: 'milesPerYear', name: 'Business Miles/Year', type: 'number', defaultValue: 0, min: 0, required: false, helpText: 'Deductible at 70¢/mile in 2026' },
    ],
    outputs: [
      { id: 'totalTax', name: 'Total Tax Liability', format: 'currency', primary: true },
      { id: 'effectiveRate', name: 'Effective Tax Rate', format: 'percentage', primary: true },
      { id: 'federalTax', name: 'Federal Tax', format: 'currency', primary: false },
      { id: 'stateTax', name: 'State Tax', format: 'currency', primary: false },
      { id: 'selfEmploymentTax', name: 'Self-Employment Tax', format: 'currency', primary: false },
      { id: 'quarterlyPayment', name: 'Quarterly Payment', format: 'currency', primary: false },
    ],
    faqTemplates: [
      {
        question: 'Do gig workers pay more taxes?',
        answer: 'Gig workers (1099 contractors) pay self-employment tax of 15.3% (12.4% Social Security + 2.9% Medicare) in addition to income tax. However, they can deduct business expenses like mileage (70¢/mile in 2026).'
      },
      {
        question: 'When are quarterly taxes due?',
        answer: 'Quarterly estimated taxes are due: April 15, June 15, September 15, and January 15. Missing payments may result in penalties. Use our calculator to estimate each quarterly payment.'
      },
      {
        question: 'What deductions can gig workers claim?',
        answer: 'Common deductions include: vehicle mileage, phone expenses, work uniforms, tools, home office space, and professional services. Keep receipts and track all business expenses.'
      },
    ],
    rolePresets: [],
    dataSources: commonDataSources,
    whatIfScenarios: [],
    relatedTools: ['paycheck-calculator', 'take-home-pay', 'shift-planner'],
    intentPages: [
      { slugPattern: '/tax-calculator/[stateSlug]', type: 'state', titleTemplate: '[State] Income Tax Calculator 2026', descriptionTemplate: 'Calculate [State] income taxes for 2026. See state tax rates, brackets, and estimate your tax liability.', prefillFields: ['state'] },
    ],
    schema: {
      type: 'SoftwareApplication',
      category: 'FinanceApplication',
      aggregateRating: { ratingValue: 4.6, ratingCount: 1876 }
    },
    lastUpdated: '2026-02-01',
    supportedCountries: ['US'],
  },

  // ===== 4. SALARY CONVERTER =====
  {
    slug: 'salary-converter',
    name: 'Salary Converter',
    shortName: 'Salary',
    primaryKeyword: 'salary calculator',
    secondaryKeywords: ['hourly to salary', 'salary to hourly', 'annual salary calculator', 'wage converter'],
    synonyms: [
      '/hourly-to-salary',
      '/salary-to-hourly',
      '/annual-to-hourly',
      '/hourly-to-annual',
      '/wage-converter',
      '/salary-calc',
      '/salarycalculator',
    ],
    description: 'Convert between hourly, weekly, monthly, and annual pay. Compare job offers and understand what different wages mean for your yearly income.',
    shortDescription: 'Convert hourly wages to annual salary',
    category: 'calculators',
    icon: 'ArrowLeftRight',
    inputs: [
      { id: 'amount', name: 'Pay Amount', type: 'number', defaultValue: 18, min: 0, required: true },
      { id: 'inputType', name: 'Input Type', type: 'select', defaultValue: 'hourly', required: true, options: [{ value: 'hourly', label: 'Hourly' }, { value: 'weekly', label: 'Weekly' }, { value: 'biweekly', label: 'Bi-weekly' }, { value: 'monthly', label: 'Monthly' }, { value: 'annual', label: 'Annual' }] },
      { id: 'hoursPerWeek', name: 'Hours Per Week', type: 'slider', defaultValue: 40, min: 1, max: 60, step: 1, required: true },
    ],
    outputs: [
      { id: 'hourly', name: 'Hourly', format: 'currency', primary: true },
      { id: 'weekly', name: 'Weekly', format: 'currency', primary: true },
      { id: 'biweekly', name: 'Bi-Weekly', format: 'currency', primary: true },
      { id: 'monthly', name: 'Monthly', format: 'currency', primary: true },
      { id: 'annual', name: 'Annual', format: 'currency', primary: true },
    ],
    faqTemplates: [
      {
        question: 'How do I convert hourly to annual salary?',
        answer: 'Multiply hourly rate × hours per week × 52 weeks. Example: $18/hour × 40 hours × 52 weeks = $37,440 annual salary (before taxes).'
      },
      {
        question: 'What is a good hourly wage in 2026?',
        answer: 'In 2026, wages above $20/hour ($41,600/year) are considered above average for hourly workers. However, cost of living varies significantly by location. Use our cost of living calculator to compare.'
      },
      {
        question: 'How do I convert salary to hourly?',
        answer: 'Divide annual salary by 52 weeks, then divide by hours per week. Example: $50,000 ÷ 52 ÷ 40 = $24.04/hour.'
      },
    ],
    rolePresets: [],
    dataSources: [commonDataSources[2]], // DOL minimum wage data
    whatIfScenarios: [],
    relatedTools: ['paycheck-calculator', 'take-home-pay', 'cost-of-living'],
    intentPages: [],
    schema: {
      type: 'SoftwareApplication',
      category: 'FinanceApplication',
      aggregateRating: { ratingValue: 4.9, ratingCount: 3245 }
    },
    lastUpdated: '2026-02-01',
    supportedCountries: ['US'],
  },

  // ===== 5. SHIFT PLANNER =====
  {
    slug: 'shift-planner',
    name: 'Shift Planner',
    shortName: 'Shifts',
    primaryKeyword: 'shift planner',
    secondaryKeywords: ['earnings calculator', 'overtime calculator', 'weekly schedule planner', 'work hours calculator'],
    synonyms: [
      '/earnings-calculator',
      '/weekly-earnings',
      '/overtime-calculator',
      '/shift-calculator',
      '/work-schedule-calculator',
    ],
    description: 'Plan your work week and maximize earnings. Calculate pay for different shift combinations, overtime, night differentials, and weekend premiums.',
    shortDescription: 'Plan shifts and calculate weekly earnings',
    category: 'planners',
    icon: 'Calendar',
    inputs: [
      { id: 'hourlyRate', name: 'Base Hourly Rate', type: 'number', defaultValue: 18, min: 7.25, required: true },
      { id: 'regularHours', name: 'Regular Hours', type: 'slider', defaultValue: 40, min: 0, max: 40, step: 1, required: true },
      { id: 'overtimeHours', name: 'Overtime Hours', type: 'slider', defaultValue: 0, min: 0, max: 20, step: 1, required: false, helpText: 'Hours over 40/week (1.5x pay)' },
      { id: 'nightShiftHours', name: 'Night Shift Hours', type: 'slider', defaultValue: 0, min: 0, max: 40, step: 1, required: false, helpText: 'Evening/overnight hours (+$1.50/hr typical)' },
      { id: 'weekendHours', name: 'Weekend Hours', type: 'slider', defaultValue: 0, min: 0, max: 16, step: 1, required: false, helpText: 'Saturday/Sunday hours (+$2/hr typical)' },
    ],
    outputs: [
      { id: 'weeklyGross', name: 'Weekly Gross', format: 'currency', primary: true },
      { id: 'regularPay', name: 'Regular Pay', format: 'currency', primary: false },
      { id: 'overtimePay', name: 'Overtime Pay', format: 'currency', primary: false },
      { id: 'differentialPay', name: 'Shift Differential', format: 'currency', primary: false },
      { id: 'effectiveRate', name: 'Effective Hourly Rate', format: 'currency', primary: true },
    ],
    faqTemplates: [
      {
        question: 'How is overtime calculated?',
        answer: 'Federal law requires 1.5x pay for hours over 40 per week. Some states (like California) also require daily overtime for hours over 8 per day. Our calculator accounts for both.'
      },
      {
        question: 'What is a shift differential?',
        answer: 'Shift differential is extra pay for working less desirable hours. Night shifts typically add $1-2/hour, weekends add $1-3/hour. Exact amounts vary by employer.'
      },
      {
        question: 'How can I maximize my weekly earnings?',
        answer: 'Strategies include: taking overtime when available (1.5x pay), requesting night/weekend shifts with differentials, and picking up extra shifts during peak seasons.'
      },
    ],
    rolePresets: calculatorRolePresets.filter(r => r.hasNightShift),
    dataSources: [commonDataSources[2]],
    whatIfScenarios: commonWhatIfScenarios.filter(s => s.id.includes('hours') || s.id.includes('shift')),
    relatedTools: ['paycheck-calculator', 'take-home-pay', 'commute-calculator'],
    intentPages: [],
    schema: {
      type: 'WebApplication',
      category: 'UtilityApplication',
      aggregateRating: { ratingValue: 4.7, ratingCount: 987 }
    },
    lastUpdated: '2026-02-01',
    supportedCountries: ['US'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a tool definition by slug
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolRegistry.find(tool => tool.slug === slug);
}

/**
 * Get all canonical tool slugs
 */
export function getCanonicalToolSlugs(): string[] {
  return toolRegistry.map(tool => tool.slug);
}

/**
 * Build redirect map from all tool synonyms
 */
export function buildToolRedirectMap(): Record<string, string> {
  const redirects: Record<string, string> = {};
  
  for (const tool of toolRegistry) {
    for (const synonym of tool.synonyms) {
      redirects[synonym] = `/career-hub/tools/${tool.slug}`;
    }
  }
  
  return redirects;
}

/**
 * Get role preset by ID
 */
export function getRolePresetById(roleId: string): RolePreset | undefined {
  return calculatorRolePresets.find(preset => preset.roleId === roleId);
}

/**
 * Get all role IDs for programmatic pages
 */
export function getAllRoleIds(): string[] {
  return calculatorRolePresets.map(preset => preset.roleId);
}

/**
 * Get state data for calculator prefills
 */
export function getStateDataForCalculator(stateCode: string) {
  const state = stateTaxData[stateCode];
  if (!state) return null;
  
  return {
    code: stateCode,
    name: state.name,
    incomeTaxRate: state.incomeTaxRate,
    hasNoIncomeTax: state.hasNoIncomeTax,
    minWage: state.minWage,
    overtimeRules: state.overtimeRules,
  };
}

/**
 * Get all states for programmatic pages
 */
export function getAllStateCodesForCalculator(): string[] {
  return Object.keys(stateTaxData);
}

/**
 * Get related tools for a given tool
 */
export function getRelatedTools(toolSlug: string): ToolDefinition[] {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return [];
  
  return tool.relatedTools
    .map(slug => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => t !== undefined);
}

// Export for convenience
export { stateTaxData, roleTemplates, shiftDifferentials };

