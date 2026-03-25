"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DollarSign,
  Calculator,
  Shield,
  Heart,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import {
  getSortedStates,
  getNoIncomeTaxStates,
  calculateFederalTax,
  calculateStateTax,
} from "@/lib/data/state-taxes";

const FICA_EMPLOYEE_RATE = 0.0765;
const SE_TAX_RATE = 0.153;
const SE_TAXABLE_PORTION = 0.9235;

const faqs = [
  {
    question: "What's the difference between 1099 and W-2?",
    answer:
      "A W-2 worker is a traditional employee — your employer withholds taxes, pays half your Social Security and Medicare (FICA), and typically offers benefits like health insurance and workers' comp. A 1099 worker is an independent contractor who pays all their own taxes, including the full 15.3% self-employment tax, and receives no employer-provided benefits.",
  },
  {
    question: "Why do 1099 contractors pay more in taxes?",
    answer:
      "As a W-2 employee, your employer pays half of your FICA taxes (7.65%). As a 1099 contractor, you pay the full 15.3% self-employment tax yourself — that's both the employee AND employer portions. This means at the same hourly rate, a 1099 contractor takes home significantly less money.",
  },
  {
    question: "Can I switch from 1099 to W-2 work?",
    answer:
      "Yes. Indeed Flex offers W-2 shifts in warehousing, hospitality, and other industries. You get the flexibility of choosing your own schedule while keeping the tax and benefits advantages of W-2 employment — including lower taxes, workers' comp coverage, and unemployment insurance eligibility.",
  },
  {
    question: "Does W-2 always mean I earn less per hour?",
    answer:
      "No — in fact, the opposite is usually true when you look at effective take-home pay. Even if a 1099 gig advertises a higher hourly rate, after paying the full self-employment tax (15.3%) and covering your own benefits, your real take-home as a W-2 employee is often higher at the same or even lower posted rate.",
  },
];

const w2Benefits = [
  { icon: Heart, label: "Health, dental & vision eligibility" },
  { icon: Shield, label: "Workers' compensation coverage" },
  { icon: Shield, label: "Unemployment insurance eligibility" },
  { icon: FileText, label: "No quarterly estimated tax filings" },
  { icon: CheckCircle2, label: "Employer handles payroll taxes" },
];

function fmt(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function W2vs1099Client() {
  const [hourlyRate, setHourlyRate] = useState<string>("18");
  const [hoursPerWeek, setHoursPerWeek] = useState(35);
  const [state, setState] = useState<string>("TX");

  const sortedStates = useMemo(() => getSortedStates(), []);
  const noTaxStates = useMemo(() => getNoIncomeTaxStates(), []);

  const results = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const annualGross = rate * hoursPerWeek * 52;

    // --- W-2 path ---
    const w2Fica = annualGross * FICA_EMPLOYEE_RATE;
    const w2Federal = calculateFederalTax(annualGross);
    const w2State = calculateStateTax(annualGross, state);
    const w2TotalTax = w2Fica + w2Federal + w2State;
    const w2TakeHome = annualGross - w2TotalTax;
    const w2EffectiveRate = annualGross > 0 ? (w2TotalTax / annualGross) * 100 : 0;

    // --- 1099 path ---
    const seBase = annualGross * SE_TAXABLE_PORTION;
    const seTax = seBase * SE_TAX_RATE;
    const seDeductionHalf = seTax * 0.5;
    const adjustedGrossFor1099 = annualGross - seDeductionHalf;
    const c1099Federal = calculateFederalTax(adjustedGrossFor1099);
    const c1099State = calculateStateTax(adjustedGrossFor1099, state);
    const c1099TotalTax = seTax + c1099Federal + c1099State;
    const c1099TakeHome = annualGross - c1099TotalTax;
    const c1099EffectiveRate = annualGross > 0 ? (c1099TotalTax / annualGross) * 100 : 0;

    // --- Advantage ---
    const advantage = w2TakeHome - c1099TakeHome;
    const monthlyAdvantage = advantage / 12;
    const hourlyAdvantage = hoursPerWeek > 0 ? advantage / (hoursPerWeek * 52) : 0;

    return {
      annualGross,
      w2: { fica: w2Fica, federal: w2Federal, state: w2State, totalTax: w2TotalTax, takeHome: w2TakeHome, effectiveRate: w2EffectiveRate },
      c1099: { seTax, federal: c1099Federal, state: c1099State, totalTax: c1099TotalTax, takeHome: c1099TakeHome, effectiveRate: c1099EffectiveRate },
      advantage,
      monthlyAdvantage,
      hourlyAdvantage,
    };
  }, [hourlyRate, hoursPerWeek, state]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "1099 vs W-2 Calculator" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                1099 vs W-2 Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Compare your take-home pay as a 1099 contractor versus a W-2
                employee. See the real difference in taxes, benefits, and total
                compensation at the same hourly rate.
              </p>
            </div>

            {/* Input Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min={1}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>
                    Hours Per Week: <span className="font-bold">{hoursPerWeek}</span>
                  </Label>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={([v]) => setHoursPerWeek(v)}
                    min={10}
                    max={60}
                    step={1}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10 hrs</span>
                    <span>60 hrs</span>
                  </div>
                </div>

                <div>
                  <Label>State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedStates.map((s) => (
                        <SelectItem key={s.code} value={s.code}>
                          {s.name}{" "}
                          {noTaxStates.includes(s.code) && "(No income tax)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* W-2 Advantage Banner */}
            {results.advantage > 0 && (
              <div className="mb-8 p-6 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-center">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  You keep ${fmt(results.advantage)} more per year as W-2
                </p>
                <p className="text-green-600 dark:text-green-400 mt-1">
                  That&apos;s ${fmt(results.monthlyAdvantage)}/month or $
                  {results.hourlyAdvantage.toFixed(2)}/hour more in your pocket
                </p>
              </div>
            )}

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* W-2 Column */}
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="bg-green-50 dark:bg-green-950/30 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <DollarSign className="h-5 w-5" />
                    As W-2 Employee
                  </CardTitle>
                  <CardDescription>Employer handles half your payroll taxes</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <Row label="Gross Pay" value={results.annualGross} />
                  <Row label="FICA (7.65%)" value={-results.w2.fica} negative />
                  <Row label="Federal Tax" value={-results.w2.federal} negative />
                  <Row label={`State Tax (${state})`} value={-results.w2.state} negative />
                  <hr />
                  <Row label="Total Taxes" value={results.w2.totalTax} bold negative />
                  <div className="p-3 bg-green-100 dark:bg-green-950/40 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-700 dark:text-green-300">Take-Home Pay</span>
                      <span className="text-xl font-bold text-green-700 dark:text-green-300">
                        ${fmt(results.w2.takeHome)}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Effective tax rate: {results.w2.effectiveRate.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 1099 Column */}
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader className="bg-orange-50 dark:bg-orange-950/30 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <FileText className="h-5 w-5" />
                    As 1099 Contractor
                  </CardTitle>
                  <CardDescription>You pay all payroll taxes yourself</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <Row label="Gross Pay" value={results.annualGross} />
                  <Row label="SE Tax (15.3%)" value={-results.c1099.seTax} negative />
                  <Row label="Federal Tax" value={-results.c1099.federal} negative />
                  <Row label={`State Tax (${state})`} value={-results.c1099.state} negative />
                  <hr />
                  <Row label="Total Taxes" value={results.c1099.totalTax} bold negative />
                  <div className="p-3 bg-orange-100 dark:bg-orange-950/40 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-orange-700 dark:text-orange-300">Take-Home Pay</span>
                      <span className="text-xl font-bold text-orange-700 dark:text-orange-300">
                        ${fmt(results.c1099.takeHome)}
                      </span>
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Effective tax rate: {results.c1099.effectiveRate.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly & Hourly Breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Monthly &amp; Hourly Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-2 font-medium text-muted-foreground">Period</th>
                        <th className="pb-2 font-medium text-green-600 dark:text-green-400">W-2 Take-Home</th>
                        <th className="pb-2 font-medium text-orange-600 dark:text-orange-400">1099 Take-Home</th>
                        <th className="pb-2 font-medium text-muted-foreground">W-2 Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3 font-medium">Annual</td>
                        <td className="py-3">${fmt(results.w2.takeHome)}</td>
                        <td className="py-3">${fmt(results.c1099.takeHome)}</td>
                        <td className="py-3 text-green-600 dark:text-green-400 font-semibold">
                          +${fmt(results.advantage)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Monthly</td>
                        <td className="py-3">${fmt(results.w2.takeHome / 12)}</td>
                        <td className="py-3">${fmt(results.c1099.takeHome / 12)}</td>
                        <td className="py-3 text-green-600 dark:text-green-400 font-semibold">
                          +${fmt(results.monthlyAdvantage)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Per Hour</td>
                        <td className="py-3">
                          ${(results.w2.takeHome / (hoursPerWeek * 52)).toFixed(2)}
                        </td>
                        <td className="py-3">
                          ${(results.c1099.takeHome / (hoursPerWeek * 52)).toFixed(2)}
                        </td>
                        <td className="py-3 text-green-600 dark:text-green-400 font-semibold">
                          +${results.hourlyAdvantage.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* What About Benefits? */}
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  What About Benefits?
                </CardTitle>
                <CardDescription>
                  W-2 employees get protections and perks that 1099 contractors have
                  to pay for out of pocket — or go without entirely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {w2Benefits.map((b) => (
                    <div
                      key={b.label}
                      className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg"
                    >
                      <b.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{b.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="text-lg font-semibold mb-2">
                Keep more of what you earn
              </h3>
              <p className="text-muted-foreground mb-4">
                Indeed Flex offers W-2 shifts in warehousing, hospitality, and
                more. You pick your schedule — and keep the tax and benefits
                advantages of W-2 employment.
              </p>
              <Link
                href="https://indeedflex.com/get-the-app"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get the Indeed Flex App
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="calculator"
              lastUpdated="2026-03-17"
              sources={[
                "IRS Publication 15 (FICA rates)",
                "IRS Publication 15-T (Federal brackets)",
                "Tax Foundation (State rates)",
              ]}
            />
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/w2-vs-1099" />
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  negative,
}: {
  label: string;
  value: number;
  bold?: boolean;
  negative?: boolean;
}) {
  const display = negative && value > 0 ? `-$${fmt(Math.abs(value))}` : `$${fmt(value)}`;
  return (
    <div className="flex justify-between items-center">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={bold ? "font-bold" : "font-medium"}>{display}</span>
    </div>
  );
}
