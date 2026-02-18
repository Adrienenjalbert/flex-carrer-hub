"use client";

import { useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Calculator, DollarSign, ChevronRight, HelpCircle, Share2, 
  TrendingUp, ArrowRight, Briefcase, Check, Info, FileText,
  Clock, Calendar, Users, Building2, ExternalLink, Lightbulb,
  Sparkles, Target, PiggyBank, Shield, MapPin, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema, 
  SoftwareApplicationSchema 
} from "@/components/career-hub/seo";
import { 
  getToolBySlug, 
  calculatorRolePresets, 
  commonWhatIfScenarios,
  getRelatedTools,
} from "@/lib/data/tool-registry";
import { 
  calculateTaxes, 
  formatCurrency, 
  formatPercent,
  hourlyToSalary,
  salaryToHourly,
  FICA_2026,
  FEDERAL_STANDARD_DEDUCTION_2026,
  type FilingStatus,
  type TaxCalculationResult,
  type BracketDetail,
} from "@/lib/calculators/tax-engine";
import { getSortedStates, stateTaxData } from "@/lib/data/state-taxes";
import { getTaxDisclaimer, federalTaxSource, ficaSource, getStateSource } from "@/lib/data/tax-sources";

// Get tool definition
const tool = getToolBySlug('paycheck-calculator')!;

// Get sorted states list
const sortedStates = getSortedStates();

// =============================================================================
// DYNAMIC TAX OPTIMIZATION TIPS
// =============================================================================

interface TaxTip {
  id: string;
  icon: string;
  title: string;
  description: string;
  potentialSavings?: number;
  priority: 'high' | 'medium' | 'low';
  category: 'retirement' | 'healthcare' | 'location' | 'income' | 'deductions' | 'timing';
  actionLabel?: string;
  learnMoreUrl?: string;
}

function generateDynamicTaxTips(
  results: TaxCalculationResult,
  retirement401k: number,
  hsa: number,
  healthInsurance: number,
  filingStatus: FilingStatus,
  stateCode: string,
  stateData: typeof stateTaxData[string] | undefined
): TaxTip[] {
  const tips: TaxTip[] = [];
  const annualIncome = results.grossIncome.annual;
  const marginalRate = results.marginalFederalRate / 100;
  const stateMarginalRate = results.marginalStateRate / 100;
  const combinedMarginalRate = marginalRate + stateMarginalRate;
  
  // 1. 401(k) Contribution Opportunity
  if (retirement401k === 0 && annualIncome > 30000) {
    const suggestedContribution = annualIncome * 0.06;
    const taxSavings = suggestedContribution * combinedMarginalRate;
    tips.push({
      id: '401k-start',
      icon: '💰',
      title: 'Start a 401(k) Contribution',
      description: `Contributing just 6% of your income to a 401(k) could save you ${formatCurrency(taxSavings)} in taxes this year while building retirement savings.`,
      potentialSavings: taxSavings,
      priority: 'high',
      category: 'retirement',
      actionLabel: 'Calculate 401(k) impact',
    });
  } else if (retirement401k > 0 && retirement401k < 10) {
    const currentContribution = annualIncome * (retirement401k / 100);
    const maxContribution = 23500; // 2026 limit
    const additionalContribution = Math.min(maxContribution - currentContribution, annualIncome * 0.05);
    const additionalSavings = additionalContribution * combinedMarginalRate;
    
    if (additionalContribution > 1000) {
      tips.push({
        id: '401k-increase',
        icon: '📈',
        title: 'Increase Your 401(k) Contribution',
        description: `Bumping your contribution by 5% could save an additional ${formatCurrency(additionalSavings)} in taxes annually.`,
        potentialSavings: additionalSavings,
        priority: 'medium',
        category: 'retirement',
      });
    }
  }
  
  // 2. HSA Opportunity (if no HSA contribution and has health insurance)
  if (hsa === 0 && annualIncome > 25000) {
    const hsaMax = 4300; // 2026 individual limit
    const hsaSavings = hsaMax * combinedMarginalRate;
    tips.push({
      id: 'hsa-start',
      icon: '🏥',
      title: 'Open a Health Savings Account (HSA)',
      description: `If you have a high-deductible health plan, maxing out your HSA at ${formatCurrency(hsaMax)} could save ${formatCurrency(hsaSavings)} in taxes—triple tax advantage!`,
      potentialSavings: hsaSavings,
      priority: 'high',
      category: 'healthcare',
      actionLabel: 'Learn about HSAs',
    });
  }
  
  // 3. High-Tax State Alert
  if (stateData && !stateData.hasNoIncomeTax && stateMarginalRate > 0.05) {
    const noTaxStates = ['TX', 'FL', 'NV', 'WA', 'WY', 'SD', 'TN', 'NH', 'AK'];
    const stateTaxPaid = results.taxes.stateIncomeTax;
    tips.push({
      id: 'state-tax-high',
      icon: '🗺️',
      title: `${stateData.name} State Tax: ${formatPercent(stateMarginalRate * 100)}`,
      description: `You're paying ${formatCurrency(stateTaxPaid)}/year in state income tax. States like ${noTaxStates.slice(0, 3).join(', ')} have no state income tax.`,
      potentialSavings: stateTaxPaid,
      priority: 'low',
      category: 'location',
    });
  }
  
  // 4. No State Tax Advantage
  if (stateData?.hasNoIncomeTax) {
    tips.push({
      id: 'no-state-tax',
      icon: '🎉',
      title: `${stateData.name}: No State Income Tax!`,
      description: `You're saving thousands compared to high-tax states. California residents at your income would pay ~${formatCurrency(annualIncome * 0.04)} in state tax.`,
      priority: 'low',
      category: 'location',
    });
  }
  
  // 5. Tax Bracket Proximity Warning
  const taxableIncome = results.taxableIncome;
  const brackets = results.taxes.federalBrackets || [];
  for (const bracket of brackets) {
    if (bracket.incomeInBracket > 0 && bracket.max !== Infinity) {
      const distanceToNextBracket = bracket.max - (bracket.min + bracket.incomeInBracket);
      if (distanceToNextBracket < 5000 && distanceToNextBracket > 0) {
        const nextRate = brackets.find(b => b.min === bracket.max)?.rate || 0;
        const rateDiff = (nextRate - bracket.rate) * 100;
        tips.push({
          id: 'bracket-proximity',
          icon: '⚠️',
          title: `${formatCurrency(distanceToNextBracket)} from ${(nextRate * 100).toFixed(0)}% Bracket`,
          description: `Additional income above ${formatCurrency(bracket.max)} will be taxed at ${(nextRate * 100).toFixed(0)}% instead of ${(bracket.rate * 100).toFixed(0)}%. Consider pre-tax deductions to stay in the lower bracket.`,
          priority: 'medium',
          category: 'income',
        });
        break;
      }
    }
  }
  
  // 6. Roth vs Traditional IRA Suggestion
  if (marginalRate <= 0.12 && annualIncome < 50000) {
    tips.push({
      id: 'roth-suggestion',
      icon: '🔄',
      title: 'Consider Roth Contributions',
      description: `At your ${formatPercent(marginalRate * 100)} marginal rate, Roth contributions may be better than traditional. You pay tax now at a low rate and withdrawals are tax-free in retirement.`,
      priority: 'medium',
      category: 'retirement',
    });
  } else if (marginalRate >= 0.22) {
    tips.push({
      id: 'traditional-suggestion',
      icon: '📊',
      title: 'Maximize Pre-Tax Contributions',
      description: `At your ${formatPercent(marginalRate * 100)} marginal rate, pre-tax contributions are valuable. Every $1,000 to your 401(k) saves you ${formatCurrency(1000 * combinedMarginalRate)} in taxes.`,
      priority: 'medium',
      category: 'retirement',
    });
  }
  
  // 7. Social Security Wage Base
  if (annualIncome > FICA_2026.socialSecurityWageBase * 0.9) {
    const ssMax = FICA_2026.socialSecurityWageBase * FICA_2026.socialSecurityRate;
    const incomeAboveBase = Math.max(0, annualIncome - FICA_2026.socialSecurityWageBase);
    if (incomeAboveBase > 0) {
      tips.push({
        id: 'ss-wage-base',
        icon: '📋',
        title: 'Social Security Wage Base Reached',
        description: `You've exceeded the ${formatCurrency(FICA_2026.socialSecurityWageBase)} SS wage base. Income above this isn't subject to the 6.2% Social Security tax—saving you ${formatCurrency(incomeAboveBase * FICA_2026.socialSecurityRate)}.`,
        priority: 'low',
        category: 'income',
      });
    } else {
      tips.push({
        id: 'ss-wage-base-near',
        icon: '📈',
        title: 'Approaching SS Wage Base',
        description: `You're close to the ${formatCurrency(FICA_2026.socialSecurityWageBase)} Social Security wage base. Income above this won't be subject to the 6.2% SS tax.`,
        priority: 'low',
        category: 'income',
      });
    }
  }
  
  // 8. Filing Status Optimization
  if (filingStatus === 'married_separately') {
    tips.push({
      id: 'filing-status',
      icon: '👥',
      title: 'Review Filing Status',
      description: `Filing separately often results in higher taxes. Consider consulting a tax professional to see if filing jointly would save you money.`,
      priority: 'medium',
      category: 'deductions',
    });
  }
  
  // 9. Additional Medicare Tax Warning
  const medicareThreshold = FICA_2026.additionalMedicareThresholds[filingStatus];
  if (annualIncome > medicareThreshold * 0.9 && annualIncome <= medicareThreshold) {
    tips.push({
      id: 'medicare-surtax',
      icon: '💊',
      title: 'Additional Medicare Tax Threshold',
      description: `Income above ${formatCurrency(medicareThreshold)} is subject to an additional 0.9% Medicare tax. You're ${formatCurrency(medicareThreshold - annualIncome)} below this threshold.`,
      priority: 'low',
      category: 'income',
    });
  }
  
  // 10. Standard Deduction Reminder
  const standardDeduction = FEDERAL_STANDARD_DEDUCTION_2026[filingStatus];
  tips.push({
    id: 'standard-deduction',
    icon: '📝',
    title: `${formatCurrency(standardDeduction)} Standard Deduction Applied`,
    description: `The ${filingStatus === 'married_jointly' ? 'married filing jointly' : filingStatus.replace('_', ' ')} standard deduction reduces your taxable income automatically. Only itemize if deductions exceed this.`,
    priority: 'low',
    category: 'deductions',
  });
  
  // 11. Overtime Tax Myth Buster
  if (annualIncome < 100000) {
    tips.push({
      id: 'overtime-myth',
      icon: '⏰',
      title: 'Overtime Tax Myth',
      description: `Extra hours are taxed at your marginal rate (${formatPercent(marginalRate * 100)}), not a higher "overtime rate." You always take home more by working more—the math never works against you.`,
      priority: 'low',
      category: 'income',
    });
  }
  
  // 12. FSA Opportunity
  if (healthInsurance > 0 && annualIncome > 35000) {
    tips.push({
      id: 'fsa-opportunity',
      icon: '🩺',
      title: 'Consider a Flexible Spending Account',
      description: `If you have predictable medical or dependent care expenses, FSA contributions (up to $3,200) are tax-free and could save you ${formatCurrency(3200 * combinedMarginalRate)}.`,
      potentialSavings: 3200 * combinedMarginalRate,
      priority: 'medium',
      category: 'healthcare',
    });
  }
  
  // 13. Tax-Loss Harvesting (for higher incomes)
  if (annualIncome > 80000) {
    tips.push({
      id: 'tax-loss-harvesting',
      icon: '📉',
      title: 'Tax-Loss Harvesting',
      description: `If you have investment losses, you can offset up to $3,000 in ordinary income annually, potentially saving ${formatCurrency(3000 * combinedMarginalRate)} in taxes.`,
      potentialSavings: 3000 * combinedMarginalRate,
      priority: 'low',
      category: 'deductions',
    });
  }
  
  // 14. Charitable Giving Strategy
  if (annualIncome > 60000 && marginalRate >= 0.22) {
    tips.push({
      id: 'charitable-bunching',
      icon: '❤️',
      title: 'Charitable Contribution Strategy',
      description: `At your tax rate, $1,000 in charitable donations saves ${formatCurrency(1000 * combinedMarginalRate)} in taxes. Consider "bunching" donations in alternate years to exceed the standard deduction.`,
      priority: 'low',
      category: 'deductions',
    });
  }
  
  // 15. Paycheck Timing (end of year)
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 9) { // October or later
    tips.push({
      id: 'year-end-timing',
      icon: '📅',
      title: 'Year-End Tax Planning',
      description: `It's Q4! Consider maximizing 401(k) contributions before year-end, prepaying deductible expenses, or deferring income if possible to optimize this year's tax bill.`,
      priority: 'high',
      category: 'timing',
    });
  }
  
  // 16. EITC Eligibility Check (for lower incomes)
  const eitcLimits = {
    single: 17640,
    head_of_household: 17640,
    married_jointly: 24210,
    married_separately: 0,
  };
  if (annualIncome < eitcLimits[filingStatus] && annualIncome > 10000) {
    tips.push({
      id: 'eitc-eligibility',
      icon: '💵',
      title: 'Earned Income Tax Credit (EITC)',
      description: `You may qualify for the EITC, a refundable tax credit of up to $600 for workers without children. This credit could increase your refund significantly.`,
      potentialSavings: 600,
      priority: 'high',
      category: 'income',
    });
  }
  
  // 17. Student Loan Interest Deduction
  if (annualIncome < 90000 && filingStatus === 'single') {
    tips.push({
      id: 'student-loan-interest',
      icon: '🎓',
      title: 'Student Loan Interest Deduction',
      description: `If you're paying student loans, you can deduct up to $2,500 in interest even if you don't itemize, potentially saving ${formatCurrency(2500 * marginalRate)}.`,
      potentialSavings: 2500 * marginalRate,
      priority: 'low',
      category: 'deductions',
    });
  }
  
  // Sort by priority and potential savings
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  tips.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return (b.potentialSavings || 0) - (a.potentialSavings || 0);
  });
  
  return tips;
}

// Filing status options
const filingStatusOptions: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'married_jointly', label: 'Married Filing Jointly' },
  { value: 'married_separately', label: 'Married Filing Separately' },
  { value: 'head_of_household', label: 'Head of Household' },
];

// =============================================================================
// INNER COMPONENT
// =============================================================================

function PaycheckCalculatorInner() {
  const searchParams = useSearchParams();
  
  // Pay mode state
  const [payMode, setPayMode] = useState<'hourly' | 'salary'>('hourly');
  
  // Hourly inputs
  const [hourlyRate, setHourlyRate] = useState<number>(18);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  
  // Salary input
  const [annualSalary, setAnnualSalary] = useState<number>(37440); // $18/hr * 40hrs * 52wks
  
  // Location & Filing
  const [state, setState] = useState<string>("TX");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  
  // Deductions
  const [retirement401k, setRetirement401k] = useState<number>(0);
  const [retirement401kIsPercent, setRetirement401kIsPercent] = useState<boolean>(true);
  const [healthInsurance, setHealthInsurance] = useState<number>(0);
  const [hsa, setHsa] = useState<number>(0);
  
  // Tips
  const [includeTips, setIncludeTips] = useState<boolean>(false);
  const [tipsPerHour, setTipsPerHour] = useState<number>(0);
  
  // UI State
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure client-side rendering for dynamic elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const hourlyParam = searchParams.get('hourly');
    const salaryParam = searchParams.get('salary');
    const hoursParam = searchParams.get('hours');
    const stateParam = searchParams.get('state');
    const roleParam = searchParams.get('role');
    const retirementParam = searchParams.get('401k');
    const tipsParam = searchParams.get('tips');
    const filingParam = searchParams.get('filing');
    
    if (salaryParam) {
      setPayMode('salary');
      setAnnualSalary(parseFloat(salaryParam));
    } else if (hourlyParam) {
      setPayMode('hourly');
      setHourlyRate(parseFloat(hourlyParam));
    }
    
    if (hoursParam) setHoursPerWeek(parseFloat(hoursParam));
    if (stateParam && stateTaxData[stateParam.toUpperCase()]) setState(stateParam.toUpperCase());
    if (retirementParam) setRetirement401k(parseFloat(retirementParam));
    if (tipsParam) {
      setIncludeTips(true);
      setTipsPerHour(parseFloat(tipsParam));
    }
    if (filingParam && ['single', 'married_jointly', 'married_separately', 'head_of_household'].includes(filingParam)) {
      setFilingStatus(filingParam as FilingStatus);
    }
    
    // Apply role preset if specified
    if (roleParam) {
      const preset = calculatorRolePresets.find(r => r.roleId === roleParam);
      if (preset) {
        setPayMode('hourly');
        setHourlyRate(preset.hourlyRate);
        setHoursPerWeek(preset.hoursPerWeek);
        if (preset.hasTips && preset.avgTipsPerHour) {
          setIncludeTips(true);
          setTipsPerHour(preset.avgTipsPerHour);
        }
        setSelectedRole(roleParam);
      }
    }
  }, [searchParams]);

  // Sync hourly <-> salary when mode or values change
  useEffect(() => {
    if (payMode === 'hourly') {
      setAnnualSalary(hourlyToSalary(hourlyRate, hoursPerWeek));
    }
  }, [payMode, hourlyRate, hoursPerWeek]);

  // Calculate results using the new tax engine
  const results: TaxCalculationResult = useMemo(() => {
    try {
      if (payMode === 'hourly') {
        return calculateTaxes({
          hourlyRate,
          hoursPerWeek,
          stateCode: state,
          filingStatus,
          includeTips,
          tipsPerHour: includeTips ? tipsPerHour : 0,
          preTaxDeductions: {
            retirement401k,
            retirement401kIsPercent,
            hsa,
            healthInsurance,
          },
        });
      } else {
        return calculateTaxes({
          grossAnnualIncome: annualSalary,
          stateCode: state,
          filingStatus,
          preTaxDeductions: {
            retirement401k,
            retirement401kIsPercent,
            hsa,
            healthInsurance,
          },
        });
      }
    } catch {
      // Return a default result if calculation fails
      return calculateTaxes({
        hourlyRate: 15,
        hoursPerWeek: 40,
        stateCode: 'TX',
        filingStatus: 'single',
      });
    }
  }, [payMode, hourlyRate, hoursPerWeek, annualSalary, state, filingStatus, 
      retirement401k, retirement401kIsPercent, hsa, healthInsurance, 
      includeTips, tipsPerHour]);

  // Generate shareable URL
  const getShareableUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    
    if (payMode === 'hourly') {
      url.searchParams.set('hourly', hourlyRate.toString());
      url.searchParams.set('hours', hoursPerWeek.toString());
    } else {
      url.searchParams.set('salary', annualSalary.toString());
    }
    
    url.searchParams.set('state', state);
    url.searchParams.set('filing', filingStatus);
    if (retirement401k > 0) url.searchParams.set('401k', retirement401k.toString());
    if (includeTips && tipsPerHour > 0) url.searchParams.set('tips', tipsPerHour.toString());
    
    return url.toString();
  }, [payMode, hourlyRate, hoursPerWeek, annualSalary, state, filingStatus, retirement401k, includeTips, tipsPerHour]);

  const copyShareableUrl = async () => {
    try {
      await navigator.clipboard.writeText(getShareableUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Apply role preset
  const applyRolePreset = (roleId: string) => {
    const preset = calculatorRolePresets.find(r => r.roleId === roleId);
    if (preset) {
      setPayMode('hourly');
      setHourlyRate(preset.hourlyRate);
      setHoursPerWeek(preset.hoursPerWeek);
      if (preset.hasTips && preset.avgTipsPerHour) {
        setIncludeTips(true);
        setTipsPerHour(preset.avgTipsPerHour);
      } else {
        setIncludeTips(false);
        setTipsPerHour(0);
      }
      setSelectedRole(roleId);
    }
  };

  // Handle hourly rate input change
  const handleHourlyRateChange = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      setHourlyRate(Math.min(num, 500));
    }
  };

  // Handle salary input change
  const handleSalaryChange = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(num) && num >= 0) {
      setAnnualSalary(Math.min(num, 1000000));
      // Also update hourly equivalent
      setHourlyRate(salaryToHourly(num, hoursPerWeek));
    }
  };

  const stateData = stateTaxData[state];
  const stateSource = getStateSource(state);
  const relatedTools = getRelatedTools('paycheck-calculator');

  // Generate dynamic tax optimization tips
  const taxTips = useMemo(() => {
    return generateDynamicTaxTips(
      results,
      retirement401k,
      hsa,
      healthInsurance,
      filingStatus,
      state,
      stateData
    );
  }, [results, retirement401k, hsa, healthInsurance, filingStatus, state, stateData]);

  // What-if scenarios
  const whatIfResults = useMemo(() => {
    return commonWhatIfScenarios.slice(0, 4).map(scenario => {
      let baseAnnual = results.grossIncome.annual;
      let newAnnual = baseAnnual;
      
      if (scenario.delta.field === 'hourlyRate' && scenario.delta.operation === 'add') {
        const increase = scenario.delta.change as number;
        newAnnual = (hourlyRate + increase) * hoursPerWeek * 52;
      } else if (scenario.delta.field === 'hoursPerWeek' && scenario.delta.operation === 'add') {
        const moreHours = scenario.delta.change as number;
        newAnnual = hourlyRate * (hoursPerWeek + moreHours) * 52;
      }
      
      const annualDiff = newAnnual - baseAnnual;
      // Approximate net difference (rough estimate)
      const netDiff = annualDiff * (results.takeHomePercentage / 100);
      
      return {
        ...scenario,
        weeklyImpact: netDiff / 52,
        annualImpact: netDiff,
      };
    });
  }, [results, hourlyRate, hoursPerWeek]);

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={tool.name}
        description={tool.description}
        url="https://indeedflex.com/career-hub/tools/paycheck-calculator"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: tool.name },
        ]}
      />
      <FAQSchema questions={tool.faqTemplates.map(f => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: tool.name },
        ]}
      />
      <SoftwareApplicationSchema
        name={`Indeed Flex ${tool.name}`}
        description={tool.description}
        url="https://indeedflex.com/career-hub/tools/paycheck-calculator"
        applicationCategory={tool.schema.category}
        operatingSystem="Web"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={tool.schema.aggregateRating}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">
              Career Hub
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/tools" className="hover:text-primary">
              Tools
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-6 w-6 text-primary" />
              <Badge variant="outline">Free Tool</Badge>
              {isMounted && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  2026 Tax Year
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Calculate your take-home pay with accurate federal and state tax withholding. 
              Supports both hourly and annual salary input with all 50 states.
            </p>
          </div>

          {/* Role Quick Presets */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Quick fill for your role:
              </span>
              {calculatorRolePresets.slice(0, 8).map(preset => (
                <Button
                  key={preset.roleId}
                  variant={selectedRole === preset.roleId ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyRolePreset(preset.roleId)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Section - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pay Mode Toggle */}
              <Card>
                <CardContent className="pt-6">
                  <Tabs value={payMode} onValueChange={(v) => setPayMode(v as 'hourly' | 'salary')}>
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="hourly" className="flex items-center gap-2 text-base">
                        <Clock className="h-4 w-4" />
                        Hourly Rate
                      </TabsTrigger>
                      <TabsTrigger value="salary" className="flex items-center gap-2 text-base">
                        <Calendar className="h-4 w-4" />
                        Annual Salary
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hourly" className="space-y-4 mt-4">
                      {/* Hourly Rate - Hybrid Input */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="hourlyRate">Hourly Rate</Label>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              id="hourlyRate"
                              type="number"
                              value={hourlyRate}
                              onChange={(e) => handleHourlyRateChange(e.target.value)}
                              className="w-20 h-8 text-right font-mono font-bold"
                              step="0.25"
                              min="0"
                              max="500"
                            />
                          </div>
                        </div>
                        <Slider
                          value={[hourlyRate]}
                          onValueChange={([v]) => setHourlyRate(v)}
                          min={7.25}
                          max={100}
                          step={0.25}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$7.25</span>
                          <span>$100</span>
                        </div>
                      </div>

                      {/* Hours Per Week - Hybrid Input */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                          <div className="flex items-center gap-1">
                            <Input
                              id="hoursPerWeek"
                              type="number"
                              value={hoursPerWeek}
                              onChange={(e) => setHoursPerWeek(Math.min(80, Math.max(1, parseInt(e.target.value) || 0)))}
                              className="w-16 h-8 text-right font-mono font-bold"
                              min="1"
                              max="80"
                            />
                            <span className="text-muted-foreground text-sm">hrs</span>
                          </div>
                        </div>
                        <Slider
                          value={[hoursPerWeek]}
                          onValueChange={([v]) => setHoursPerWeek(v)}
                          min={1}
                          max={60}
                          step={1}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Part-time</span>
                          <span>40 (full-time)</span>
                          <span>60+</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="salary" className="space-y-4 mt-4">
                      {/* Annual Salary - Hybrid Input */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="annualSalary">Annual Salary</Label>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              id="annualSalary"
                              type="text"
                              value={annualSalary.toLocaleString()}
                              onChange={(e) => handleSalaryChange(e.target.value)}
                              className="w-28 h-8 text-right font-mono font-bold"
                            />
                          </div>
                        </div>
                        <Slider
                          value={[annualSalary]}
                          onValueChange={([v]) => {
                            setAnnualSalary(v);
                            setHourlyRate(salaryToHourly(v, hoursPerWeek));
                          }}
                          min={15000}
                          max={250000}
                          step={1000}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$15,000</span>
                          <span>$250,000</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Equivalent to {formatCurrency(salaryToHourly(annualSalary, 40), 2)}/hour at 40 hrs/week
                        </p>
                      </div>

                      {/* Pay Frequency Info */}
                      <div className="p-3 bg-muted/50 rounded-lg text-sm">
                        <p className="font-medium mb-1">Pay Periods</p>
                        <div className="grid grid-cols-2 gap-2 text-muted-foreground text-xs">
                          <span>Monthly: {formatCurrency(annualSalary / 12)}</span>
                          <span>Bi-weekly: {formatCurrency(annualSalary / 26)}</span>
                          <span>Weekly: {formatCurrency(annualSalary / 52)}</span>
                          <span>Semi-monthly: {formatCurrency(annualSalary / 24)}</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Location & Filing Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Location & Filing Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* State Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="state">Work State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
                        {sortedStates.map((s) => (
                          <SelectItem key={s.code} value={s.code}>
                            {s.name} {s.hasNoIncomeTax && "✓ No state tax"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {stateData?.hasNoIncomeTax && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {stateData.name} has no state income tax!
                      </p>
                    )}
                  </div>

                  {/* Filing Status */}
                  <div className="space-y-2">
                    <Label htmlFor="filingStatus" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Filing Status
                    </Label>
                    <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        {filingStatusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Deductions */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Deductions</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      {showAdvanced ? 'Hide' : 'Show'} Options
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 401(k) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="retirement">401(k) Contribution</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={retirement401k}
                          onChange={(e) => setRetirement401k(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-16 h-8 text-right font-mono"
                          min="0"
                          max={retirement401kIsPercent ? 100 : 23500}
                        />
                        <Select 
                          value={retirement401kIsPercent ? 'percent' : 'dollar'}
                          onValueChange={(v) => setRetirement401kIsPercent(v === 'percent')}
                        >
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percent">%</SelectItem>
                            <SelectItem value="dollar">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Slider
                      value={[retirement401k]}
                      onValueChange={([v]) => setRetirement401k(v)}
                      min={0}
                      max={retirement401kIsPercent ? 25 : 23500}
                      step={retirement401kIsPercent ? 1 : 500}
                    />
                    {retirement401k > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Pre-tax savings: {formatCurrency(results.deductions.retirement401k)}/year
                      </p>
                    )}
                  </div>

                  {showAdvanced && (
                    <>
                      {/* HSA */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>HSA Contribution</Label>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              type="number"
                              value={hsa}
                              onChange={(e) => setHsa(Math.min(4300, Math.max(0, parseFloat(e.target.value) || 0)))}
                              className="w-20 h-8 text-right font-mono"
                              min="0"
                              max="4300"
                            />
                            <span className="text-muted-foreground text-xs">/yr</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">2026 limit: $4,300 individual</p>
                      </div>

                      {/* Health Insurance */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Health Insurance (pre-tax)</Label>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              type="number"
                              value={healthInsurance}
                              onChange={(e) => setHealthInsurance(Math.max(0, parseFloat(e.target.value) || 0))}
                              className="w-20 h-8 text-right font-mono"
                              min="0"
                            />
                            <span className="text-muted-foreground text-xs">/yr</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Tips Section */}
                  {payMode === 'hourly' && (
                    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="tips">Include Tips</Label>
                          <p className="text-xs text-muted-foreground">For tipped workers</p>
                        </div>
                        <Switch
                          checked={includeTips}
                          onCheckedChange={setIncludeTips}
                        />
                      </div>
                      
                      {includeTips && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Average Tips/Hour</Label>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">$</span>
                              <Input
                                type="number"
                                value={tipsPerHour}
                                onChange={(e) => setTipsPerHour(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-16 h-8 text-right font-mono"
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                          <Slider
                            value={[tipsPerHour]}
                            onValueChange={([v]) => setTipsPerHour(v)}
                            min={0}
                            max={50}
                            step={1}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={copyShareableUrl}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share These Results
                  </>
                )}
              </Button>
            </div>

            {/* Results Section - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Multi-Period Take-Home Display */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Your Take-Home Pay
                  </CardTitle>
                  <CardDescription>
                    Net income after federal, state, and FICA taxes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* All Period Grid - Responsive */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-center">
                    <div className="p-3 bg-background rounded-lg shadow-sm">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Hourly</p>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.netIncome.hourly, 2)}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-lg shadow-sm">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Weekly</p>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.netIncome.weekly)}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-lg shadow-sm">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Bi-Weekly</p>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.netIncome.biWeekly)}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-lg shadow-sm">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Monthly</p>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.netIncome.monthly)}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-3 bg-primary/10 rounded-lg shadow-sm border-2 border-primary/30">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Annual</p>
                      <p className="text-lg sm:text-xl font-bold text-primary">
                        {formatCurrency(results.netIncome.annual)}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {formatPercent(results.takeHomePercentage)} take-home
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {formatPercent(results.effectiveTaxRate)} effective tax rate
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {formatPercent(results.marginalFederalRate)} marginal federal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pay Stub Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Bi-Weekly Pay Stub Preview
                  </CardTitle>
                  <CardDescription>
                    How your paycheck breaks down each pay period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-muted px-4 py-2 border-b">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Pay Period Earnings</span>
                        <span className="font-medium">Amount</span>
                      </div>
                    </div>
                    
                    {/* Gross Pay */}
                    <div className="px-4 py-2 border-b flex justify-between">
                      <span className="font-medium">Gross Pay</span>
                      <span className="font-mono font-bold">{formatCurrency(results.payStub.grossPay)}</span>
                    </div>
                    
                    {/* Deductions Header */}
                    <div className="bg-muted/50 px-4 py-1 border-b">
                      <span className="text-sm text-muted-foreground">Deductions</span>
                    </div>
                    
                    {/* Tax Line Items */}
                    <div className="px-4 py-1 border-b flex justify-between text-sm">
                      <span className="text-muted-foreground pl-2">Federal Withholding</span>
                      <span className="font-mono text-red-600">-{formatCurrency(results.payStub.federalWithholding)}</span>
                    </div>
                    {results.payStub.stateWithholding > 0 && (
                      <div className="px-4 py-1 border-b flex justify-between text-sm">
                        <span className="text-muted-foreground pl-2">State Withholding ({state})</span>
                        <span className="font-mono text-red-600">-{formatCurrency(results.payStub.stateWithholding)}</span>
                      </div>
                    )}
                    <div className="px-4 py-1 border-b flex justify-between text-sm">
                      <span className="text-muted-foreground pl-2">Social Security</span>
                      <span className="font-mono text-red-600">-{formatCurrency(results.payStub.socialSecurity)}</span>
                    </div>
                    <div className="px-4 py-1 border-b flex justify-between text-sm">
                      <span className="text-muted-foreground pl-2">Medicare</span>
                      <span className="font-mono text-red-600">-{formatCurrency(results.payStub.medicare)}</span>
                    </div>
                    
                    {results.payStub.preTaxDeductions > 0 && (
                      <div className="px-4 py-1 border-b flex justify-between text-sm">
                        <span className="text-muted-foreground pl-2">Pre-tax Deductions (401k, HSA)</span>
                        <span className="font-mono text-blue-600">-{formatCurrency(results.payStub.preTaxDeductions)}</span>
                      </div>
                    )}
                    
                    {/* Net Pay */}
                    <div className="px-4 py-3 bg-green-50 dark:bg-green-950 flex justify-between">
                      <span className="font-bold text-green-700 dark:text-green-300">Net Pay (Take-Home)</span>
                      <span className="font-mono font-bold text-green-700 dark:text-green-300 text-lg">
                        {formatCurrency(results.payStub.netPay)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Breakdown Visual */}
              <Card className="border-primary/10">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Where Your Money Goes (Annual)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-primary font-medium">Take-Home Pay</span>
                      <span className="font-medium">{formatCurrency(results.netIncome.annual)}</span>
                    </div>
                    <Progress 
                      value={results.takeHomePercentage} 
                      className="h-3 sm:h-4 [&>div]:bg-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-primary/80">Federal Tax</span>
                      <span className="font-medium">{formatCurrency(results.taxes.federalIncomeTax)}</span>
                    </div>
                    <Progress 
                      value={(results.taxes.federalIncomeTax / results.grossIncome.annual) * 100} 
                      className="h-2 [&>div]:bg-primary/60"
                    />
                  </div>

                  {results.taxes.stateIncomeTax > 0 && (
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-primary/70">State Tax ({state})</span>
                        <span className="font-medium">{formatCurrency(results.taxes.stateIncomeTax)}</span>
                      </div>
                      <Progress 
                        value={(results.taxes.stateIncomeTax / results.grossIncome.annual) * 100} 
                        className="h-2 [&>div]:bg-primary/50"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-primary/60">Social Security + Medicare</span>
                      <span className="font-medium">{formatCurrency(results.taxes.totalFica)}</span>
                    </div>
                    <Progress 
                      value={(results.taxes.totalFica / results.grossIncome.annual) * 100} 
                      className="h-2 [&>div]:bg-primary/40"
                    />
                  </div>

                  {results.deductions.totalPreTax > 0 && (
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-accent">Pre-tax Deductions</span>
                        <span className="font-medium">{formatCurrency(results.deductions.totalPreTax)}</span>
                      </div>
                      <Progress 
                        value={(results.deductions.totalPreTax / results.grossIncome.annual) * 100} 
                        className="h-2 [&>div]:bg-accent"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Comprehensive Tax Bracket Analysis */}
              {results.taxes?.federalBrackets && Array.isArray(results.taxes.federalBrackets) && (
              <Card className="overflow-hidden border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    Detailed Tax Bracket Analysis
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    See exactly how your income is taxed at each level
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Income Summary */}
                  <div className="grid grid-cols-2 gap-px bg-primary/10">
                    <div className="bg-background p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Gross Income</p>
                      <p className="text-base sm:text-xl font-bold">{formatCurrency(results.grossIncome.annual)}</p>
                    </div>
                    <div className="bg-background p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Standard Deduction</p>
                      <p className="text-base sm:text-xl font-bold text-primary">-{formatCurrency(FEDERAL_STANDARD_DEDUCTION_2026[filingStatus])}</p>
                    </div>
                    <div className="bg-background p-3 sm:p-4 text-center">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Pre-Tax Deductions</p>
                      <p className="text-base sm:text-xl font-bold text-primary">-{formatCurrency(results.deductions.totalPreTax)}</p>
                    </div>
                    <div className="bg-primary/5 p-3 sm:p-4 text-center border-b-4 border-primary">
                      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Taxable Income</p>
                      <p className="text-base sm:text-xl font-bold text-primary">{formatCurrency(results.taxableIncome)}</p>
                    </div>
                  </div>

                  {/* Federal Tax Brackets */}
                  <div className="p-3 sm:p-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                        Federal Income Tax
                      </h4>
                      <span className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.taxes.federalIncomeTax)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {results.taxes.federalBrackets
                        .filter(b => b.incomeInBracket > 0)
                        .map((bracket, idx) => (
                        <div key={idx} className="relative">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-10 sm:w-12 text-right">
                              <span className="text-xs sm:text-sm font-mono font-medium">{(bracket.rate * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex-1">
                              <div className="relative h-6 sm:h-7 bg-primary/10 rounded overflow-hidden">
                                <div 
                                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded transition-all duration-500"
                                  style={{ 
                                    width: `${Math.min(100, (bracket.incomeInBracket / results.taxableIncome) * 100)}%` 
                                  }}
                                />
                                <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] sm:text-xs">
                                  <span className="text-white font-medium drop-shadow-sm z-10">
                                    {formatCurrency(bracket.incomeInBracket)}
                                  </span>
                                  <span className="font-mono text-foreground/60">
                                    → {formatCurrency(bracket.taxFromBracket)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {bracket.max !== Infinity && (
                            <div className="ml-12 sm:ml-16 text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">
                              {formatCurrency(bracket.min)} - {formatCurrency(bracket.max)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs sm:text-sm p-2 bg-primary/5 rounded">
                      <span className="text-muted-foreground">Your marginal rate (next dollar taxed at):</span>
                      <span className="font-bold text-primary">{formatPercent(results.marginalFederalRate)}</span>
                    </div>
                  </div>

                  {/* State Tax Brackets */}
                  {results.taxes.stateIncomeTax > 0 && results.taxes.stateBrackets && results.taxes.stateBrackets.length > 0 && (
                    <div className="p-3 sm:p-4 border-b">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                          <span className="w-3 h-3 rounded-full bg-primary/70"></span>
                          {stateData?.name || state} State Income Tax
                        </h4>
                        <span className="text-base sm:text-lg font-bold text-primary">
                          {formatCurrency(results.taxes.stateIncomeTax)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {results.taxes.stateBrackets
                          .filter(b => b.incomeInBracket > 0)
                          .map((bracket, idx) => (
                          <div key={idx} className="relative">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-12 sm:w-14 text-right">
                                <span className="text-xs sm:text-sm font-mono font-medium">{(bracket.rate * 100).toFixed(2)}%</span>
                              </div>
                              <div className="flex-1">
                                <div className="relative h-6 sm:h-7 bg-primary/10 rounded overflow-hidden">
                                  <div 
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/70 to-primary/50 rounded transition-all duration-500"
                                    style={{ 
                                      width: `${Math.min(100, (bracket.incomeInBracket / results.taxableIncome) * 100)}%` 
                                    }}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] sm:text-xs">
                                    <span className="text-white font-medium drop-shadow-sm z-10">
                                      {formatCurrency(bracket.incomeInBracket)}
                                    </span>
                                    <span className="font-mono text-foreground/60">
                                      → {formatCurrency(bracket.taxFromBracket)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs sm:text-sm p-2 bg-primary/5 rounded">
                        <span className="text-muted-foreground">Your state marginal rate:</span>
                        <span className="font-bold text-primary">{formatPercent(results.marginalStateRate)}</span>
                      </div>
                    </div>
                  )}

                  {/* FICA Breakdown */}
                  <div className="p-3 sm:p-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                        <span className="w-3 h-3 rounded-full bg-primary/50"></span>
                        FICA Taxes (Social Security & Medicare)
                      </h4>
                      <span className="text-base sm:text-lg font-bold text-primary">
                        {formatCurrency(results.taxes.totalFica)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground">Social Security</p>
                            <p className="text-sm font-medium">{(FICA_2026.socialSecurityRate * 100).toFixed(1)}% of wages</p>
                          </div>
                          <p className="font-bold text-primary">
                            {formatCurrency(results.taxes.socialSecurity)}
                          </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Wage base limit: {formatCurrency(FICA_2026.socialSecurityWageBase)}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-muted-foreground">Medicare</p>
                            <p className="text-sm font-medium">{(FICA_2026.medicareRate * 100).toFixed(2)}% of all wages</p>
                          </div>
                          <p className="font-bold text-primary">
                            {formatCurrency(results.taxes.medicare)}
                          </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          No income limit
                        </p>
                      </div>
                      
                      {results.taxes.additionalMedicare > 0 && (
                        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-muted-foreground">Additional Medicare</p>
                              <p className="text-sm font-medium">{(FICA_2026.additionalMedicareRate * 100).toFixed(1)}% over {formatCurrency(FICA_2026.additionalMedicareThresholds[filingStatus])}</p>
                            </div>
                            <p className="font-bold text-primary">
                              {formatCurrency(results.taxes.additionalMedicare)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Insights Summary */}
                  <div className="p-3 sm:p-4 border-b">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      <div className="p-3 bg-primary/5 rounded-lg text-center">
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Effective Rate</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">{formatPercent(results.effectiveTaxRate)}</p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg text-center">
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Marginal Rate</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">{formatPercent(results.marginalFederalRate)}</p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg text-center">
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Annual Taxes</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">{formatCurrency(results.taxes.totalTaxes)}</p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg text-center">
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Daily Tax</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">{formatCurrency(results.taxes.totalTaxes / 365)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Tax Optimization Tips */}
                  <div className="p-3 sm:p-4">
                    {/* Summary Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        Smart Tax Optimization Tips
                      </h4>
                      <div className="flex items-center gap-2">
                        {taxTips.filter(t => t.priority === 'high').length > 0 && (
                          <Badge className="bg-accent text-white text-[10px]">
                            {taxTips.filter(t => t.priority === 'high').length} action items
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Potential Savings Summary */}
                    {(() => {
                      const totalPotentialSavings = taxTips.reduce((sum, tip) => sum + (tip.potentialSavings || 0), 0);
                      const highPriorityTips = taxTips.filter(t => t.priority === 'high');
                      const highPrioritySavings = highPriorityTips.reduce((sum, tip) => sum + (tip.potentialSavings || 0), 0);
                      
                      return totalPotentialSavings > 100 ? (
                        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-accent/20 via-accent/10 to-primary/10 border border-accent/30">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <p className="text-xs sm:text-sm text-muted-foreground">Total Potential Annual Savings</p>
                              <p className="text-2xl sm:text-3xl font-bold text-accent">
                                {formatCurrency(totalPotentialSavings)}
                                <span className="text-base font-normal text-muted-foreground ml-1">/year</span>
                              </p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-accent" />
                                <span className="text-xs sm:text-sm font-medium">
                                  {formatCurrency(totalPotentialSavings / 12)}/month extra
                                </span>
                              </div>
                              {highPrioritySavings > 0 && (
                                <p className="text-[10px] sm:text-xs text-muted-foreground">
                                  {formatCurrency(highPrioritySavings)} from high priority actions
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                    
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['retirement', 'healthcare', 'income', 'deductions', 'location'].map(cat => {
                        const count = taxTips.filter(t => t.category === cat).length;
                        if (count === 0) return null;
                        return (
                          <Badge 
                            key={cat} 
                            variant="outline" 
                            className={`text-[10px] sm:text-xs cursor-default ${
                              cat === 'retirement' ? 'border-green-500/50 text-green-700 bg-green-50 dark:bg-green-950' :
                              cat === 'healthcare' ? 'border-blue-500/50 text-blue-700 bg-blue-50 dark:bg-blue-950' :
                              cat === 'location' ? 'border-orange-500/50 text-orange-700 bg-orange-50 dark:bg-orange-950' :
                              cat === 'income' ? 'border-purple-500/50 text-purple-700 bg-purple-50 dark:bg-purple-950' :
                              'border-gray-500/50 bg-gray-50 dark:bg-gray-950'
                            }`}
                          >
                            {cat} ({count})
                          </Badge>
                        );
                      })}
                    </div>
                    
                    {/* Tips List */}
                    <div className="space-y-2 sm:space-y-3">
                      {taxTips.slice(0, showAdvanced ? taxTips.length : 4).map((tip, index) => (
                        <div 
                          key={tip.id}
                          className={`group p-3 sm:p-4 rounded-xl border transition-all hover:shadow-md ${
                            tip.priority === 'high' 
                              ? 'bg-gradient-to-r from-accent/15 to-accent/5 border-accent/40 hover:border-accent' 
                              : tip.priority === 'medium'
                              ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/25 hover:border-primary/50'
                              : 'bg-muted/30 border-border hover:border-muted-foreground/30'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl ${
                              tip.priority === 'high' ? 'bg-accent/20' :
                              tip.priority === 'medium' ? 'bg-primary/20' :
                              'bg-muted'
                            }`}>
                              {tip.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <p className="font-semibold text-sm sm:text-base leading-tight">{tip.title}</p>
                                  {tip.potentialSavings && tip.potentialSavings > 50 && (
                                    <p className="text-accent font-bold text-base sm:text-lg mt-0.5">
                                      +{formatCurrency(tip.potentialSavings)}
                                      <span className="text-xs font-normal text-muted-foreground ml-1">/year</span>
                                    </p>
                                  )}
                                </div>
                                {tip.priority === 'high' && (
                                  <Badge className="bg-accent text-white text-[9px] sm:text-[10px] flex-shrink-0">
                                    ACTION
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                                {tip.description}
                              </p>
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <Badge 
                                  variant="outline" 
                                  className={`text-[9px] sm:text-[10px] ${
                                    tip.category === 'retirement' ? 'border-green-500/50 text-green-700' :
                                    tip.category === 'healthcare' ? 'border-blue-500/50 text-blue-700' :
                                    tip.category === 'location' ? 'border-orange-500/50 text-orange-700' :
                                    tip.category === 'income' ? 'border-purple-500/50 text-purple-700' :
                                    tip.category === 'timing' ? 'border-yellow-500/50 text-yellow-700' :
                                    'border-gray-500/50'
                                  }`}
                                >
                                  {tip.category}
                                </Badge>
                                {tip.actionLabel && (
                                  <span className="text-[10px] sm:text-xs text-primary font-medium cursor-pointer hover:underline flex items-center gap-1">
                                    {tip.actionLabel}
                                    <ArrowRight className="h-3 w-3" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Show More/Less Toggle */}
                    {taxTips.length > 4 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-3 text-xs"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                      >
                        {showAdvanced ? (
                          <>Show fewer tips</>
                        ) : (
                          <>Show {taxTips.length - 4} more tips</>
                        )}
                      </Button>
                    )}
                    
                    {/* Pro Tip Footer */}
                    <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-primary">Pro Tip</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            Focus on high-priority items first. Even small changes to retirement contributions can save hundreds in taxes while building your future wealth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              )}

              {/* What-If Scenarios */}
              {payMode === 'hourly' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      What If Scenarios
                    </CardTitle>
                    <CardDescription>
                      See how changes affect your take-home pay
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {whatIfResults.map(scenario => (
                        <div 
                          key={scenario.id}
                          className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <p className="text-sm font-medium">{scenario.label}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-lg font-bold ${scenario.annualImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {scenario.annualImpact >= 0 ? '+' : ''}{formatCurrency(scenario.annualImpact)}/yr
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {scenario.weeklyImpact >= 0 ? '+' : ''}{formatCurrency(scenario.weeklyImpact)}/wk
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Methodology & Data Sources */}
          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="methodology">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Calculation Methodology & Data Sources
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How We Calculate Your Take-Home Pay</h4>
                      <ol className="list-decimal pl-4 space-y-1 text-sm">
                        <li><strong>Gross Pay:</strong> Hourly rate × Hours per week × 52 weeks (or annual salary)</li>
                        <li><strong>Pre-tax Deductions:</strong> 401(k), HSA, and health insurance subtracted from gross</li>
                        <li><strong>Federal Tax:</strong> Calculated using 2026 IRS progressive tax brackets for your filing status</li>
                        <li><strong>State Tax:</strong> Calculated using your state&apos;s 2026 progressive brackets or flat rate</li>
                        <li><strong>FICA Taxes:</strong> 6.2% Social Security (up to $184,500) + 1.45% Medicare</li>
                        <li><strong>Additional Medicare:</strong> 0.9% on income over $200,000 (single)</li>
                        <li><strong>Take-Home:</strong> Gross minus all taxes and deductions</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Official Data Sources</h4>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-background rounded border">
                          <p className="font-medium">{federalTaxSource.name}</p>
                          <p className="text-xs text-muted-foreground">{federalTaxSource.organization}</p>
                          <p className="text-xs text-muted-foreground">Verified: {federalTaxSource.lastVerified}</p>
                          <a 
                            href={federalTaxSource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                          >
                            View Source <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <div className="p-3 bg-background rounded border">
                          <p className="font-medium">{ficaSource.name}</p>
                          <p className="text-xs text-muted-foreground">{ficaSource.organization}</p>
                          <p className="text-xs text-muted-foreground">Verified: {ficaSource.lastVerified}</p>
                          <a 
                            href={ficaSource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                          >
                            View Source <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        {stateSource && (
                          <div className="p-3 bg-background rounded border sm:col-span-2">
                            <p className="font-medium">{stateData?.name} State Tax</p>
                            <p className="text-xs text-muted-foreground">{stateSource.organization}</p>
                            <p className="text-xs text-muted-foreground">Verified: {stateSource.lastVerified}</p>
                            <a 
                              href={stateSource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                            >
                              View Source <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Disclaimer */}
          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Estimate Only</AlertTitle>
            <AlertDescription className="text-sm">
              {getTaxDisclaimer()}
            </AlertDescription>
          </Alert>

          {/* State-Specific Calculators */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              State Paycheck Calculators
            </h2>
            <p className="text-muted-foreground mb-4">
              Get state-specific calculations with local tax rates and minimum wage info
            </p>
            <div className="flex flex-wrap gap-2">
              {["california", "texas", "florida", "new-york", "washington", "nevada", "arizona", "colorado", "georgia", "illinois"].map(
                (slug) => (
                  <Link key={slug} href={`/paycheck-calculator/${slug}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Badge>
                  </Link>
                )
              )}
              <Link href="/paycheck-calculator/texas">
                <Badge variant="secondary">
                  View All States →
                </Badge>
              </Link>
            </div>
          </section>

          {/* Role Calculators */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Pay Calculators by Role
            </h2>
            <p className="text-muted-foreground mb-4">
              Pre-filled with typical pay rates for your job type
            </p>
            <div className="flex flex-wrap gap-2">
              {calculatorRolePresets.slice(0, 10).map((role) => (
                <Link key={role.roleId} href={`/paycheck-calculator/${role.roleId}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {role.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(relatedTool => (
                <Link 
                  key={relatedTool.slug}
                  href={`/career-hub/tools/${relatedTool.slug}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {relatedTool.shortDescription}
                  </p>
                  <span className="text-sm text-primary mt-2 inline-flex items-center gap-1">
                    Try it <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {tool.faqTemplates.map((faq, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Learn More */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                href="/career-hub/guides/understanding-your-paycheck"
                className="p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-medium">Understanding Your Paycheck</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn what each deduction means and how taxes work
                </p>
              </Link>
              <Link 
                href="/career-hub/guides/tax-tips-hourly-workers"
                className="p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-medium">Tax Tips for Hourly Workers</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Maximize your take-home pay with these strategies
                </p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// =============================================================================
// MAIN COMPONENT WITH SUSPENSE
// =============================================================================

export default function PaycheckCalculatorClient() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-1/2"></div>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 h-96 bg-muted rounded"></div>
              <div className="lg:col-span-3 h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <PaycheckCalculatorInner />
    </Suspense>
  );
}
