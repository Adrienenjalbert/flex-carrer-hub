"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, DollarSign, ChevronRight, HelpCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { FAQSchema, WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";

const FEDERAL_TAX_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STATE_TAX_RATES: Record<string, number> = {
  AL: 0.05, AZ: 0.025, AR: 0.055, CA: 0.0725, CO: 0.044, CT: 0.05,
  DE: 0.066, GA: 0.055, HI: 0.0725, ID: 0.058, IL: 0.0495, IN: 0.0315,
  IA: 0.06, KS: 0.057, KY: 0.045, LA: 0.0425, ME: 0.0715, MD: 0.0575,
  MA: 0.05, MI: 0.0425, MN: 0.0535, MS: 0.05, MO: 0.054, MT: 0.0675,
  NE: 0.0684, NJ: 0.0637, NM: 0.049, NY: 0.0685, NC: 0.0525, ND: 0.029,
  OH: 0.04, OK: 0.0475, OR: 0.09, PA: 0.0307, RI: 0.0599, SC: 0.07,
  UT: 0.0485, VT: 0.0675, VA: 0.0575, WV: 0.065, WI: 0.0765, DC: 0.085,
  // No income tax states
  AK: 0, FL: 0, NV: 0, NH: 0, SD: 0, TN: 0, TX: 0, WA: 0, WY: 0,
};

const STATES = Object.keys(STATE_TAX_RATES).sort();

function calculateFederalTax(annualIncome: number): number {
  let tax = 0;
  for (const bracket of FEDERAL_TAX_BRACKETS_2024) {
    if (annualIncome <= bracket.min) break;
    const taxableInBracket = Math.min(annualIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

function calculateStateTax(annualIncome: number, state: string): number {
  const rate = STATE_TAX_RATES[state] || 0;
  return annualIncome * rate;
}

const faqs = [
  {
    question: "How is take-home pay calculated?",
    answer: "Take-home pay is your gross pay minus taxes (federal, state, Social Security, Medicare) and any voluntary deductions like 401(k) contributions.",
  },
  {
    question: "What is the Social Security tax rate?",
    answer: "The Social Security tax rate is 6.2% on income up to $168,600 (2024 limit). Your employer also pays 6.2%.",
  },
  {
    question: "How do I convert hourly to annual salary?",
    answer: "Multiply your hourly rate by hours worked per week, then multiply by 52 weeks. For example: $15/hr × 40 hours × 52 weeks = $31,200/year.",
  },
];

export default function PayCalculatorClient() {
  const [hourlyRate, setHourlyRate] = useState<number>(18);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [state, setState] = useState<string>("TX");
  const [retirement401k, setRetirement401k] = useState<number>(0);

  const results = useMemo(() => {
    const weeklyGross = hourlyRate * hoursPerWeek;
    const annualGross = weeklyGross * 52;
    
    // Pre-tax deductions
    const annual401k = annualGross * (retirement401k / 100);
    const taxableIncome = annualGross - annual401k;
    
    // Taxes
    const federalTax = calculateFederalTax(taxableIncome);
    const stateTax = calculateStateTax(taxableIncome, state);
    const socialSecurityTax = Math.min(annualGross, 168600) * 0.062;
    const medicareTax = annualGross * 0.0145;
    
    const totalTaxes = federalTax + stateTax + socialSecurityTax + medicareTax;
    const annualNet = annualGross - totalTaxes - annual401k;
    const weeklyNet = annualNet / 52;
    const hourlyNet = weeklyNet / hoursPerWeek;
    
    const effectiveTaxRate = (totalTaxes / annualGross) * 100;
    
    return {
      weeklyGross,
      annualGross,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      annual401k,
      totalTaxes,
      annualNet,
      weeklyNet,
      hourlyNet,
      effectiveTaxRate,
    };
  }, [hourlyRate, hoursPerWeek, state, retirement401k]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name="Pay Calculator - Calculate Your Take-Home Pay"
        description="Free paycheck calculator for hourly workers."
        url="https://indeedflex.com/career-hub/tools/pay-calculator"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: "Pay Calculator" },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Tools", url: "https://indeedflex.com/career-hub/tools" },
          { name: "Pay Calculator" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
            <span className="text-foreground">Pay Calculator</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-6 w-6 text-primary" />
              <Badge variant="outline">Free Tool</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Pay Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your take-home pay after taxes and deductions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  Enter your hourly rate and work schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[hourlyRate]}
                      onValueChange={([v]) => setHourlyRate(v)}
                      min={7.25}
                      max={75}
                      step={0.25}
                      className="flex-1"
                    />
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[hoursPerWeek]}
                      onValueChange={([v]) => setHoursPerWeek(v)}
                      min={1}
                      max={60}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s} {STATE_TAX_RATES[s] === 0 && "(No income tax)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirement">401(k) Contribution (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[retirement401k]}
                      onValueChange={([v]) => setRetirement401k(v)}
                      min={0}
                      max={20}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      id="retirement"
                      type="number"
                      value={retirement401k}
                      onChange={(e) => setRetirement401k(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Your Take-Home Pay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Hourly</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(results.hourlyNet)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Weekly</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(results.weeklyNet)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Annual Take-Home</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(results.annualNet)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gross: {formatCurrency(results.annualGross)}
                  </p>
                </div>

                {/* Tax Breakdown */}
                <div>
                  <h3 className="font-semibold mb-3">Tax Breakdown (Annual)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Federal Income Tax</span>
                      <span className="text-red-600">-{formatCurrency(results.federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>State Income Tax ({state})</span>
                      <span className="text-red-600">-{formatCurrency(results.stateTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Security (6.2%)</span>
                      <span className="text-red-600">-{formatCurrency(results.socialSecurityTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medicare (1.45%)</span>
                      <span className="text-red-600">-{formatCurrency(results.medicareTax)}</span>
                    </div>
                    {results.annual401k > 0 && (
                      <div className="flex justify-between">
                        <span>401(k) Contribution</span>
                        <span className="text-blue-600">-{formatCurrency(results.annual401k)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold pt-2 border-t">
                      <span>Effective Tax Rate</span>
                      <span>{results.effectiveTaxRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Summary
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* State-Specific Calculators */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              State-Specific Calculators
            </h2>
            <div className="flex flex-wrap gap-2">
              {["california", "texas", "florida", "new-york", "washington", "nevada", "arizona", "colorado"].map(
                (slug) => (
                  <Link key={slug} href={`/paycheck-calculator/${slug}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </Link>
                )
              )}
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
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
        </div>
      </div>
    </>
  );
}

