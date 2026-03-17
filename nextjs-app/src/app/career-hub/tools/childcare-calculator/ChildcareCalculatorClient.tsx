"use client";

import { useState, useMemo } from "react";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DollarSign,
  Baby,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Calendar,
  ArrowRight,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const faqs = [
  {
    question: "What is the average cost of childcare?",
    answer:
      "Childcare costs vary widely by location and type. Daycare centers average $800-2,500/month, while in-home care can range from $1,500-4,000+/month. Costs are typically higher in major cities.",
  },
  {
    question: "Are there tax benefits for childcare?",
    answer:
      "Yes! The Child and Dependent Care Tax Credit can save you up to $3,000 for one child or $6,000 for two or more. Additionally, many employers offer Dependent Care FSAs with pre-tax contributions up to $5,000/year.",
  },
  {
    question: "Is flexible work good for parents?",
    answer:
      "Flexible work can be ideal for parents. You can work shifts around school schedules, share care with a partner, or reduce childcare costs by working non-traditional hours.",
  },
  {
    question: "How do I find affordable childcare?",
    answer:
      "Look into Head Start programs, state childcare assistance programs, cooperative childcare, family daycare homes, or sharing a nanny with another family. Some employers also offer childcare subsidies.",
  },
];

// Average monthly childcare costs by city type
const childcareCosts = {
  "high-cost": { name: "High-Cost City (NYC, SF, LA)", infant: 2200, toddler: 1800, preschool: 1400 },
  "medium-cost": { name: "Medium-Cost City", infant: 1500, toddler: 1200, preschool: 1000 },
  "low-cost": { name: "Low-Cost Area", infant: 900, toddler: 750, preschool: 600 },
};

export default function ChildcareCalculatorClient() {
  const [hourlyRate, setHourlyRate] = useState<string>("18");
  const [hoursPerWeek, setHoursPerWeek] = useState<number[]>([30]);
  const [cityType, setCityType] = useState<keyof typeof childcareCosts>("medium-cost");
  const [childAge, setChildAge] = useState<string>("toddler");
  const [numberOfChildren, setNumberOfChildren] = useState<number[]>([1]);

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = hoursPerWeek[0];
    const children = numberOfChildren[0];
    const costs = childcareCosts[cityType];
    const monthlyChildcare = costs[childAge as keyof typeof costs] as number * children;

    const weeklyIncome = rate * hours;
    const monthlyIncome = weeklyIncome * 4.33;
    const monthlyNetIncome = monthlyIncome - monthlyChildcare;
    const effectiveHourlyRate = monthlyNetIncome / (hours * 4.33);
    const childcarePercentage = (monthlyChildcare / monthlyIncome) * 100;

    return {
      weeklyIncome,
      monthlyIncome,
      monthlyChildcare,
      monthlyNetIncome,
      effectiveHourlyRate,
      childcarePercentage,
      isWorthIt: monthlyNetIncome > 0,
    };
  }, [hourlyRate, hoursPerWeek, cityType, childAge, numberOfChildren]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Childcare Calculator" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Is Working Worth It?
              </h1>
              <p className="text-lg text-muted-foreground">
                Find out if your income covers childcare costs. Enter your
                hourly rate, schedule, and childcare situation to see your real
                take-home pay.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="h-5 w-5 text-primary" />
                  Your Situation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="rate">Hourly Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Hours Per Week: {hoursPerWeek[0]}</Label>
                  <Slider
                    value={hoursPerWeek}
                    onValueChange={setHoursPerWeek}
                    max={50}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>City Cost Level</Label>
                  <Select
                    value={cityType}
                    onValueChange={(v) => setCityType(v as keyof typeof childcareCosts)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(childcareCosts).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Child Age</Label>
                  <Select value={childAge} onValueChange={setChildAge}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infant">Infant (0-1 year)</SelectItem>
                      <SelectItem value="toddler">Toddler (1-3 years)</SelectItem>
                      <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Number of Children: {numberOfChildren[0]}</Label>
                  <Slider
                    value={numberOfChildren}
                    onValueChange={setNumberOfChildren}
                    max={4}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card
                className={
                  calculations.isWorthIt
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-red-500 bg-red-50 dark:bg-red-950/20"
                }
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    {calculations.isWorthIt ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      Net Monthly Income
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    ${calculations.monthlyNetIncome.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    After childcare costs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Effective Hourly Rate
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.effectiveHourlyRate.toFixed(2)}/hr
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    What you actually earn after childcare
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Verdict */}
            {calculations.monthlyNetIncome > 500 && (
              <Card className="mb-8 border-green-500 bg-green-50 dark:bg-green-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                        Yes, working is worth it
                      </h2>
                      <p className="text-green-800 dark:text-green-300">
                        You&apos;re keeping <strong>${calculations.monthlyNetIncome.toFixed(0)}/month</strong> after
                        childcare — that&apos;s ${(calculations.monthlyNetIncome * 12).toFixed(0)}/year toward
                        savings, bills, and your family&apos;s future. Plus you&apos;re building work experience and
                        career momentum that pays off long-term.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {calculations.monthlyNetIncome >= 0 && calculations.monthlyNetIncome <= 500 && (
              <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">
                        Marginal — consider these options
                      </h2>
                      <p className="text-amber-800 dark:text-amber-300 mb-3">
                        At ${calculations.monthlyNetIncome.toFixed(0)}/month net, you&apos;re close to
                        break-even. Here&apos;s how to tip the balance in your favor:
                      </p>
                      <ul className="space-y-2 text-amber-800 dark:text-amber-300">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Target higher-paying shifts ($2-5/hr more can add $300-600/month)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Reduce childcare days by working when a partner or family member can watch your kids</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Claim tax credits below — they can add $200-500/month to your effective income</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {calculations.monthlyNetIncome < 0 && (
              <Card className="mb-8 border-red-500 bg-red-50 dark:bg-red-950/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
                        Not yet — but here&apos;s how to make it work
                      </h2>
                      <p className="text-red-800 dark:text-red-300 mb-3">
                        Right now you&apos;d lose ${Math.abs(calculations.monthlyNetIncome).toFixed(0)}/month.
                        But that doesn&apos;t mean working is off the table:
                      </p>
                      <ul className="space-y-2 text-red-800 dark:text-red-300">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>School-hour shifts (9AM-3PM) eliminate childcare costs entirely</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Work opposite schedules with your partner — one works days, one works evenings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Apply for childcare assistance programs — many states cover 50-100% of costs for qualifying families</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 flex-shrink-0 mt-1" />
                          <span>Start with fewer hours to keep childcare costs low while building toward higher-paying roles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Monthly Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-950/30 rounded-lg">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Monthly Income
                    </span>
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      +${calculations.monthlyIncome.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-950/30 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Baby className="h-4 w-4 text-red-600" />
                      Childcare Costs
                    </span>
                    <span className="font-semibold text-red-700 dark:text-red-400">
                      -${calculations.monthlyChildcare.toFixed(0)}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-semibold">Net Take-Home</span>
                    <span className="font-bold text-lg">
                      ${calculations.monthlyNetIncome.toFixed(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Ways to Reduce Childcare Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Work opposite shifts with a partner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Use family care when available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Look into state childcare assistance programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Consider nanny-sharing with another family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Use pre-tax Dependent Care FSA ($5,000/year)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tax Credits */}
            <Card className="mb-8 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Tax Credits You May Qualify For
                </CardTitle>
                <CardDescription>
                  These credits can add $200-500/month to your effective income
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Child and Dependent Care Tax Credit
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Covers a percentage of childcare expenses you pay so you can work or look for work.
                        </p>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        Up to $3,000/child
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Maximum $6,000 for two or more children. Credit percentage ranges from 20-35% based on your income.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Dependent Care FSA
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Set aside pre-tax dollars for childcare through your employer.
                        </p>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        $5,000 pre-tax
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Saves you $1,000-1,500/year in taxes depending on your tax bracket. Ask your employer if they offer this benefit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Scheduling Tips */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Smart Scheduling Tips for Parents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Morning warehouse shifts (6AM-2PM)</span>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Work while kids are at daycare, pick up early and save on afternoon care costs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">School-hour shifts (9AM-3PM)</span>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Work while kids are in school — zero childcare needed.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Evening/weekend shifts</span>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Work when your partner watches the kids — no childcare costs at all.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href="/career-hub/tools/shift-planner"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    Plan your ideal shift schedule
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="calculator"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/childcare-calculator" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

