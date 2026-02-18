"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Wallet, DollarSign, ChevronRight, HelpCircle, PieChart, ArrowRight, Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FAQSchema, 
  WebPageSchema, 
  BreadcrumbSchema, 
  SoftwareApplicationSchema 
} from "@/components/career-hub/seo";
import { 
  getToolBySlug, 
  commonDataSources,
  stateTaxData,
  getRelatedTools,
} from "@/lib/data/tool-registry";

const tool = getToolBySlug('take-home-pay')!;

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

const sortedStates = Object.entries(stateTaxData)
  .map(([code, data]) => ({ code, name: data.name, hasNoIncomeTax: data.hasNoIncomeTax }))
  .sort((a, b) => a.name.localeCompare(b.name));

const formatCurrency = (value: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const payFrequencies = [
  { value: "weekly", label: "Weekly", divisor: 52 },
  { value: "biweekly", label: "Bi-weekly", divisor: 26 },
  { value: "semimonthly", label: "Semi-monthly", divisor: 24 },
  { value: "monthly", label: "Monthly", divisor: 12 },
];

export default function TakeHomePayClient() {
  const [grossPay, setGrossPay] = useState<number>(2000);
  const [payFrequency, setPayFrequency] = useState<string>("biweekly");
  const [state, setState] = useState<string>("TX");
  const [filingStatus, setFilingStatus] = useState<string>("single");

  const results = useMemo(() => {
    const frequency = payFrequencies.find(f => f.value === payFrequency) || payFrequencies[1];
    const annualGross = grossPay * frequency.divisor;
    
    // Taxes
    const federalTax = calculateFederalTax(annualGross);
    const stateTax = calculateStateTax(annualGross, state);
    const socialSecurityTax = Math.min(annualGross, 168600) * 0.062;
    const medicareTax = annualGross * 0.0145;
    
    const totalTaxes = federalTax + stateTax + socialSecurityTax + medicareTax;
    const annualNet = annualGross - totalTaxes;
    const periodNet = annualNet / frequency.divisor;
    
    const effectiveTaxRate = annualGross > 0 ? (totalTaxes / annualGross) * 100 : 0;
    const takeHomePercentage = annualGross > 0 ? (annualNet / annualGross) * 100 : 0;
    
    // Per-period breakdown
    const periodFederal = federalTax / frequency.divisor;
    const periodState = stateTax / frequency.divisor;
    const periodFica = (socialSecurityTax + medicareTax) / frequency.divisor;
    
    return {
      annualGross,
      annualNet,
      periodNet,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      fica: socialSecurityTax + medicareTax,
      totalTaxes,
      effectiveTaxRate,
      takeHomePercentage,
      periodFederal,
      periodState,
      periodFica,
      periodDeductions: grossPay - periodNet,
    };
  }, [grossPay, payFrequency, state]);

  const stateData = stateTaxData[state];
  const relatedTools = getRelatedTools('take-home-pay');
  const frequencyLabel = payFrequencies.find(f => f.value === payFrequency)?.label || "Bi-weekly";

  // Chart data for visual breakdown
  const chartData = [
    { label: "Take-Home", value: results.periodNet, color: "bg-green-500", percentage: results.takeHomePercentage },
    { label: "Federal Tax", value: results.periodFederal, color: "bg-red-400", percentage: (results.federalTax / results.annualGross) * 100 },
    { label: "State Tax", value: results.periodState, color: "bg-orange-400", percentage: (results.stateTax / results.annualGross) * 100 },
    { label: "FICA", value: results.periodFica, color: "bg-yellow-500", percentage: (results.fica / results.annualGross) * 100 },
  ].filter(d => d.value > 0);

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={tool.name}
        description={tool.description}
        url="https://indeedflex.com/career-hub/tools/take-home-pay"
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
        url="https://indeedflex.com/career-hub/tools/take-home-pay"
        applicationCategory={tool.schema.category}
        operatingSystem="Web"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={tool.schema.aggregateRating}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
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
              <Wallet className="h-6 w-6 text-primary" />
              <Badge variant="outline">Free Tool</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Updated Feb 2026
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {tool.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Paycheck</CardTitle>
                <CardDescription>
                  Enter your gross pay to see your take-home
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gross Pay */}
                <div className="space-y-2">
                  <Label htmlFor="grossPay">Gross Pay (Before Taxes)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="grossPay"
                      type="number"
                      value={grossPay}
                      onChange={(e) => setGrossPay(Number(e.target.value))}
                      className="pl-8 text-lg font-mono"
                    />
                  </div>
                </div>

                {/* Pay Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="frequency">Pay Frequency</Label>
                  <Select value={payFrequency} onValueChange={setPayFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {payFrequencies.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label} ({f.divisor}x/year)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State Selection */}
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedStates.map((s) => (
                        <SelectItem key={s.code} value={s.code}>
                          {s.name} {s.hasNoIncomeTax && "✓ No tax"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {stateData?.hasNoIncomeTax && (
                    <p className="text-xs text-green-600">
                      {stateData.name} has no state income tax!
                    </p>
                  )}
                </div>

                {/* Filing Status */}
                <div className="space-y-2">
                  <Label htmlFor="filing">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={setFilingStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married Filing Jointly</SelectItem>
                      <SelectItem value="head">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Main Result */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-green-700 uppercase tracking-wide">
                      Your {frequencyLabel} Take-Home Pay
                    </p>
                    <p className="text-5xl font-bold text-green-700 mt-2">
                      {formatCurrency(results.periodNet)}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      from {formatCurrency(grossPay)} gross
                    </p>
                    <div className="flex justify-center gap-3 mt-4">
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {results.takeHomePercentage.toFixed(0)}% take-home
                      </Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {formatCurrency(results.periodDeductions)} deducted
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Where Your Paycheck Goes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chartData.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={item.label === "Take-Home" ? "font-semibold text-green-700" : ""}>
                          {item.label}
                        </span>
                        <span className="font-medium">{formatCurrency(item.value)}</span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className={`h-3 [&>div]:${item.color}`}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.percentage.toFixed(1)}% of gross
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Annual Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Annual Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Annual Gross</p>
                      <p className="text-xl font-bold">{formatCurrency(results.annualGross)}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600">Annual Take-Home</p>
                      <p className="text-xl font-bold text-green-700">{formatCurrency(results.annualNet)}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-xs text-red-600">Total Taxes</p>
                      <p className="text-xl font-bold text-red-600">{formatCurrency(results.totalTaxes)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Effective Tax Rate</p>
                      <p className="text-xl font-bold">{results.effectiveTaxRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <Alert className="mt-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Estimate Only</AlertTitle>
            <AlertDescription>
              This calculator provides estimates based on 2026 federal tax brackets and state rates.
              Actual take-home pay depends on your W-4, pre-tax deductions, and other factors.
            </AlertDescription>
          </Alert>

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

          {/* Related Tools */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </>
  );
}

