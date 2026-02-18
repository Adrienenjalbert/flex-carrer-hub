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
import {
  DollarSign,
  Baby,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
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
                Childcare Cost Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate if working makes financial sense after childcare
                costs. See your true take-home pay.
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

