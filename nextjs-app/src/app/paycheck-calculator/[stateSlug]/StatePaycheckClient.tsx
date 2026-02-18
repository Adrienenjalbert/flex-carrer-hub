"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Calculator, DollarSign, ChevronRight, HelpCircle, Share2, 
  TrendingUp, ArrowRight, Check, Info, MapPin, Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema, 
  SoftwareApplicationSchema 
} from "@/components/career-hub/seo";
import { 
  calculatorRolePresets, 
  commonWhatIfScenarios,
  commonDataSources,
  stateTaxData,
  getRelatedTools,
} from "@/lib/data/tool-registry";

// Tax calculation functions
const FEDERAL_TAX_BRACKETS_2026 = [
  { min: 0, max: 12150, rate: 0.10 },
  { min: 12150, max: 49400, rate: 0.12 },
  { min: 49400, max: 105400, rate: 0.22 },
  { min: 105400, max: 201200, rate: 0.24 },
  { min: 201200, max: 255600, rate: 0.32 },
  { min: 255600, max: 639200, rate: 0.35 },
  { min: 639200, max: Infinity, rate: 0.37 },
];

function calculateFederalTax(annualIncome: number): number {
  let tax = 0;
  let remainingIncome = annualIncome;
  
  for (const bracket of FEDERAL_TAX_BRACKETS_2026) {
    if (remainingIncome <= 0) break;
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  
  return tax;
}

function calculateStateTax(annualIncome: number, stateCode: string): number {
  const stateData = stateTaxData[stateCode];
  if (!stateData || stateData.hasNoIncomeTax) return 0;
  return annualIncome * stateData.incomeTaxRate;
}

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const formatCurrencyDetailed = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

interface StatePaycheckInnerProps {
  stateCode: string;
  stateName: string;
}

function StatePaycheckInner({ stateCode, stateName }: StatePaycheckInnerProps) {
  const searchParams = useSearchParams();
  const stateData = stateTaxData[stateCode];
  
  // State with URL param defaults
  const [hourlyRate, setHourlyRate] = useState<number>(stateData?.minWage || 15);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [retirement401k, setRetirement401k] = useState<number>(0);
  const [includeTips, setIncludeTips] = useState<boolean>(false);
  const [tipsPerHour, setTipsPerHour] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Initialize from URL params on mount
  useEffect(() => {
    const hourlyParam = searchParams.get('hourly');
    const hoursParam = searchParams.get('hours');
    const roleParam = searchParams.get('role');
    const retirementParam = searchParams.get('401k');
    const tipsParam = searchParams.get('tips');
    
    if (hourlyParam) setHourlyRate(parseFloat(hourlyParam));
    if (hoursParam) setHoursPerWeek(parseFloat(hoursParam));
    if (retirementParam) setRetirement401k(parseFloat(retirementParam));
    if (tipsParam) {
      setIncludeTips(true);
      setTipsPerHour(parseFloat(tipsParam));
    }
    
    // Apply role preset if specified
    if (roleParam) {
      const preset = calculatorRolePresets.find(r => r.roleId === roleParam);
      if (preset) {
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

  // Calculate results
  const results = useMemo(() => {
    const totalHourlyRate = includeTips ? hourlyRate + tipsPerHour : hourlyRate;
    const weeklyGross = totalHourlyRate * hoursPerWeek;
    const annualGross = weeklyGross * 52;
    
    // Pre-tax deductions
    const annual401k = annualGross * (retirement401k / 100);
    const taxableIncome = annualGross - annual401k;
    
    // Taxes
    const federalTax = calculateFederalTax(taxableIncome);
    const stateTax = calculateStateTax(taxableIncome, stateCode);
    const socialSecurityTax = Math.min(annualGross, 168600) * 0.062;
    const medicareTax = annualGross * 0.0145;
    
    const totalTaxes = federalTax + stateTax + socialSecurityTax + medicareTax;
    const annualNet = annualGross - totalTaxes - annual401k;
    const weeklyNet = annualNet / 52;
    const hourlyNet = hoursPerWeek > 0 ? weeklyNet / hoursPerWeek : 0;
    const monthlyNet = annualNet / 12;
    
    const effectiveTaxRate = annualGross > 0 ? (totalTaxes / annualGross) * 100 : 0;
    const takeHomePercentage = annualGross > 0 ? (annualNet / annualGross) * 100 : 0;
    
    return {
      weeklyGross,
      annualGross,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      fica: socialSecurityTax + medicareTax,
      annual401k,
      totalTaxes,
      annualNet,
      weeklyNet,
      hourlyNet,
      monthlyNet,
      effectiveTaxRate,
      takeHomePercentage,
    };
  }, [hourlyRate, hoursPerWeek, stateCode, retirement401k, includeTips, tipsPerHour]);

  // Calculate "what-if" scenario impacts
  const whatIfResults = useMemo(() => {
    const relevantScenarios = commonWhatIfScenarios.filter(s => 
      !s.id.includes('move-to') || 
      (s.id.includes('move-to') && s.delta.change !== stateCode)
    ).slice(0, 4);
    
    return relevantScenarios.map(scenario => {
      let newHourly = hourlyRate;
      let newHours = hoursPerWeek;
      let newState = stateCode;
      let new401k = retirement401k;
      
      if (scenario.delta.field === 'hourlyRate') {
        if (scenario.delta.operation === 'add') {
          newHourly = hourlyRate + (scenario.delta.change as number);
        }
      } else if (scenario.delta.field === 'hoursPerWeek') {
        if (scenario.delta.operation === 'add') {
          newHours = hoursPerWeek + (scenario.delta.change as number);
        }
      } else if (scenario.delta.field === 'state') {
        newState = scenario.delta.change as string;
      } else if (scenario.delta.field === 'retirement401k') {
        new401k = scenario.delta.change as number;
      }
      
      const newWeeklyGross = newHourly * newHours;
      const newAnnualGross = newWeeklyGross * 52;
      const newAnnual401k = newAnnualGross * (new401k / 100);
      const newTaxable = newAnnualGross - newAnnual401k;
      const newFederal = calculateFederalTax(newTaxable);
      const newStateTax = calculateStateTax(newTaxable, newState);
      const newSS = Math.min(newAnnualGross, 168600) * 0.062;
      const newMedicare = newAnnualGross * 0.0145;
      const newTotalTaxes = newFederal + newStateTax + newSS + newMedicare;
      const newAnnualNet = newAnnualGross - newTotalTaxes - newAnnual401k;
      
      const weeklyDiff = (newAnnualNet - results.annualNet) / 52;
      const annualDiff = newAnnualNet - results.annualNet;
      
      return {
        ...scenario,
        weeklyImpact: weeklyDiff,
        annualImpact: annualDiff,
      };
    });
  }, [hourlyRate, hoursPerWeek, stateCode, retirement401k, results.annualNet]);

  // Generate shareable URL
  const getShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.href);
    url.searchParams.set('hourly', hourlyRate.toString());
    url.searchParams.set('hours', hoursPerWeek.toString());
    if (retirement401k > 0) url.searchParams.set('401k', retirement401k.toString());
    if (includeTips && tipsPerHour > 0) url.searchParams.set('tips', tipsPerHour.toString());
    return url.toString();
  };

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

  const relatedTools = getRelatedTools('paycheck-calculator');
  
  // Generate state-specific FAQs
  const stateFaqs = [
    {
      question: `What is the income tax rate in ${stateName}?`,
      answer: stateData?.hasNoIncomeTax 
        ? `${stateName} has no state income tax! This means you keep more of your paycheck compared to states that do tax income.`
        : `${stateName} has a state income tax rate of approximately ${((stateData?.incomeTaxRate || 0) * 100).toFixed(2)}%. The exact amount depends on your income level and filing status.`
    },
    {
      question: `What is the minimum wage in ${stateName}?`,
      answer: `The current minimum wage in ${stateName} is $${stateData?.minWage.toFixed(2)} per hour (2026). Some cities may have higher local minimum wages.`
    },
    {
      question: `How do I calculate my take-home pay in ${stateName}?`,
      answer: `Use this ${stateName} paycheck calculator! Enter your hourly rate and hours worked to see your estimated take-home pay after federal taxes${stateData?.hasNoIncomeTax ? '' : `, ${stateName} state taxes`}, Social Security, and Medicare.`
    },
    {
      question: `Does ${stateName} have overtime rules?`,
      answer: stateData?.overtimeRules === 'daily'
        ? `${stateName} requires overtime pay (1.5x) for hours over 8 in a day AND hours over 40 in a week, which is stricter than federal law.`
        : `${stateName} follows federal overtime rules: 1.5x pay for hours over 40 per week.`
    },
  ];

  // Get neighboring states for comparison
  const allStates = Object.entries(stateTaxData);
  const noTaxStates = allStates.filter(([, data]) => data.hasNoIncomeTax).slice(0, 5);

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={`${stateName} Paycheck Calculator 2026`}
        description={`Calculate your take-home pay in ${stateName}. Free paycheck calculator with ${stateName} tax rates, minimum wage info, and deduction estimates.`}
        url={`https://indeedflex.com/paycheck-calculator/${stateCode.toLowerCase()}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: `${stateName} Calculator` },
        ]}
      />
      <FAQSchema questions={stateFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: `${stateName} Calculator` },
        ]}
      />
      <SoftwareApplicationSchema
        name={`${stateName} Paycheck Calculator`}
        description={`Free ${stateName} paycheck calculator for hourly workers`}
        url={`https://indeedflex.com/paycheck-calculator/${stateCode.toLowerCase()}`}
        applicationCategory="FinanceApplication"
        operatingSystem="Web"
        offers={{ price: 0, priceCurrency: "USD" }}
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
            <Link href="/career-hub/tools/paycheck-calculator" className="hover:text-primary">
              Paycheck Calculator
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{stateName}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-6 w-6 text-primary" />
              <Badge variant="outline">{stateCode}</Badge>
              {stateData?.hasNoIncomeTax && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  No State Income Tax
                </Badge>
              )}
              <Badge variant="secondary">
                Updated Feb 2026
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{stateName} Paycheck Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Calculate your take-home pay in {stateName}. 
              {stateData?.hasNoIncomeTax 
                ? ` Great news - ${stateName} has no state income tax!`
                : ` See how ${stateName} state taxes affect your paycheck.`}
            </p>
          </div>

          {/* State Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">State Tax Rate</p>
              <p className="text-2xl font-bold text-primary">
                {stateData?.hasNoIncomeTax ? '0%' : `${((stateData?.incomeTaxRate || 0) * 100).toFixed(1)}%`}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Minimum Wage</p>
              <p className="text-2xl font-bold">${stateData?.minWage.toFixed(2)}/hr</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Max Unemployment</p>
              <p className="text-2xl font-bold">${stateData?.unemploymentMaxWeekly}/wk</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase">Overtime Rules</p>
              <p className="text-2xl font-bold capitalize">{stateData?.overtimeRules}</p>
            </Card>
          </div>

          {/* Role Quick Presets */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Quick fill for your role:
              </span>
              {calculatorRolePresets.slice(0, 6).map(preset => (
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
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your {stateName} Pay Details</CardTitle>
                  <CardDescription>
                    Enter your hourly rate and work schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hourly Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="hourlyRate">Hourly Rate</Label>
                      <span className="font-mono font-bold text-primary">${hourlyRate.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[hourlyRate]}
                      onValueChange={([v]) => setHourlyRate(v)}
                      min={stateData?.minWage || 7.25}
                      max={75}
                      step={0.25}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${stateData?.minWage.toFixed(2)} ({stateName} min)</span>
                      <span>$75</span>
                    </div>
                  </div>

                  {/* Hours Per Week */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                      <span className="font-mono font-bold">{hoursPerWeek} hrs</span>
                    </div>
                    <Slider
                      value={[hoursPerWeek]}
                      onValueChange={([v]) => setHoursPerWeek(v)}
                      min={1}
                      max={60}
                      step={1}
                    />
                  </div>

                  {/* 401(k) */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="retirement">401(k) Contribution</Label>
                      <span className="font-mono font-bold">{retirement401k}%</span>
                    </div>
                    <Slider
                      value={[retirement401k]}
                      onValueChange={([v]) => setRetirement401k(v)}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>

                  {/* Tips Section */}
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
                        <div className="flex justify-between">
                          <Label>Average Tips/Hour</Label>
                          <span className="font-mono">${tipsPerHour}</span>
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
                </CardContent>
              </Card>
            </div>

            {/* Results Section - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Primary Results Card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Your {stateName} Take-Home Pay
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Big Numbers */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Hourly</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrencyDetailed(results.hourlyNet)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Weekly</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.weeklyNet)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg shadow-sm">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.monthlyNet)}
                      </p>
                    </div>
                  </div>

                  {/* Annual Summary */}
                  <div className="p-6 bg-background rounded-lg shadow-sm text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Annual Take-Home in {stateName}</p>
                    <p className="text-4xl font-bold mt-1">
                      {formatCurrency(results.annualNet)}
                    </p>
                    <div className="flex justify-center gap-4 mt-3">
                      <Badge variant="outline">
                        {results.takeHomePercentage.toFixed(0)}% take-home
                      </Badge>
                      <Badge variant="secondary">
                        {results.effectiveTaxRate.toFixed(1)}% effective tax
                      </Badge>
                    </div>
                  </div>

                  {/* Visual Tax Breakdown */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Tax Breakdown in {stateName}</h3>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-700">Take-Home Pay</span>
                        <span className="font-medium">{formatCurrency(results.annualNet)}</span>
                      </div>
                      <Progress 
                        value={results.takeHomePercentage} 
                        className="h-3 [&>div]:bg-green-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-600">Federal Tax</span>
                        <span className="font-medium">{formatCurrency(results.federalTax)}</span>
                      </div>
                      <Progress 
                        value={(results.federalTax / results.annualGross) * 100} 
                        className="h-2 [&>div]:bg-red-400"
                      />
                    </div>

                    {results.stateTax > 0 ? (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-orange-600">{stateName} State Tax</span>
                          <span className="font-medium">{formatCurrency(results.stateTax)}</span>
                        </div>
                        <Progress 
                          value={(results.stateTax / results.annualGross) * 100} 
                          className="h-2 [&>div]:bg-orange-400"
                        />
                      </div>
                    ) : (
                      <div className="p-2 bg-green-50 rounded text-green-700 text-sm">
                        ✓ No {stateName} state income tax - you keep more!
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-yellow-600">Social Security + Medicare</span>
                        <span className="font-medium">{formatCurrency(results.fica)}</span>
                      </div>
                      <Progress 
                        value={(results.fica / results.annualGross) * 100} 
                        className="h-2 [&>div]:bg-yellow-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What-If Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    What If Scenarios
                  </CardTitle>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compare with No-Tax States */}
          {!stateData?.hasNoIncomeTax && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">
                Compare: Move to a No-Tax State?
              </h2>
              <p className="text-muted-foreground mb-4">
                Working in a state with no income tax could save you {formatCurrency(results.stateTax)}/year
              </p>
              <div className="flex flex-wrap gap-2">
                {noTaxStates.map(([code, data]) => (
                  <Link key={code} href={`/paycheck-calculator/${code.toLowerCase()}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-green-100 hover:text-green-700 hover:border-green-300"
                    >
                      {data.name} (0% tax)
                    </Badge>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Methodology */}
          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="methodology">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    How We Calculate {stateName} Take-Home Pay
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <ol className="list-decimal pl-4 space-y-2 text-sm">
                      <li><strong>Gross Pay:</strong> Hourly rate × Hours per week × 52 weeks</li>
                      <li><strong>Federal Tax:</strong> Calculated using 2026 IRS marginal brackets</li>
                      <li><strong>{stateName} State Tax:</strong> {stateData?.hasNoIncomeTax ? 'None (no state income tax)' : `${((stateData?.incomeTaxRate || 0) * 100).toFixed(2)}% of taxable income`}</li>
                      <li><strong>FICA:</strong> 6.2% Social Security + 1.45% Medicare</li>
                    </ol>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs font-medium mb-2">Data Sources:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        {commonDataSources.map(source => (
                          <li key={source.name}>
                            • {source.name} (verified {source.lastVerified})
                          </li>
                        ))}
                      </ul>
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
            <AlertDescription>
              This {stateName} calculator provides estimates based on 2026 tax rates. 
              Actual take-home pay may vary. Local taxes may apply in some {stateName} cities.
            </AlertDescription>
          </Alert>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {stateName} Paycheck FAQs
            </h2>
            <div className="space-y-4">
              {stateFaqs.map((faq, i) => (
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

          {/* Other State Calculators */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Calculators for Other States
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stateTaxData)
                .filter(([code]) => code !== stateCode)
                .slice(0, 15)
                .map(([code, data]) => (
                  <Link key={code} href={`/paycheck-calculator/${code.toLowerCase()}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {data.name}
                    </Badge>
                  </Link>
                ))}
              <Link href="/career-hub/tools/paycheck-calculator">
                <Badge variant="secondary">
                  All States →
                </Badge>
              </Link>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(tool => (
                <Link 
                  key={tool.slug}
                  href={`/career-hub/tools/${tool.slug}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors group"
                >
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tool.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface StatePaycheckClientProps {
  stateCode: string;
  stateName: string;
}

export default function StatePaycheckClient({ stateCode, stateName }: StatePaycheckClientProps) {
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
      <StatePaycheckInner stateCode={stateCode} stateName={stateName} />
    </Suspense>
  );
}

