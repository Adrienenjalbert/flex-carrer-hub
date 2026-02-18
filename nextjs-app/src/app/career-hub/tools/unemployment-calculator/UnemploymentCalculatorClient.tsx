"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Info,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { stateUnemploymentData } from "@/lib/data/unemployment-benefits";

// Convert stateUnemploymentData to array format
const unemploymentBenefits = Object.entries(stateUnemploymentData).map(([code, data]) => ({
  stateCode: code,
  stateName: data.name,
  maxWeeklyBenefit: data.maxWeeklyBenefit,
  minWeeklyBenefit: data.minWeeklyBenefit,
  maxWeeks: data.maxWeeks,
  applicationUrl: `https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/find-unemployment-benefits.aspx?location=${code}`,
}));

const faqs = [
  {
    question: "How is my weekly benefit amount calculated?",
    answer:
      "Most states calculate your weekly benefit as a percentage (typically 50-60%) of your average weekly wage during your base period, up to the state's maximum amount.",
  },
  {
    question: "What is the base period?",
    answer:
      "The base period is usually the first four of the last five completed calendar quarters before you file your claim. Your earnings during this time determine your benefit amount.",
  },
  {
    question: "How long can I receive unemployment benefits?",
    answer:
      "Most states provide 26 weeks of regular unemployment benefits, though some states offer fewer weeks. Extended benefits may be available during high unemployment periods.",
  },
  {
    question: "Can gig workers get unemployment?",
    answer:
      "It depends on your work classification. W-2 employees typically qualify, while 1099 contractors traditionally don't. Some states have expanded coverage - check with your state's unemployment office.",
  },
];

export default function UnemploymentCalculatorClient() {
  const [state, setState] = useState<string>("TX");
  const [weeklyWage, setWeeklyWage] = useState<string>("800");

  const calculations = useMemo(() => {
    const stateData = unemploymentBenefits.find((s) => s.stateCode === state);
    const wage = parseFloat(weeklyWage) || 0;

    if (!stateData) return null;

    // Calculate estimated benefit (typically 50-60% of weekly wage)
    const estimatedBenefit = Math.min(
      wage * 0.5,
      stateData.maxWeeklyBenefit
    );
    const totalBenefits = estimatedBenefit * stateData.maxWeeks;

    return {
      stateData,
      estimatedBenefit,
      totalBenefits,
      replacementRate: (estimatedBenefit / wage) * 100,
    };
  }, [state, weeklyWage]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Unemployment Calculator" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Unemployment Benefits Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Estimate your potential unemployment benefits based on your
                state and previous earnings.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Calculate Your Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>State</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {unemploymentBenefits.map((s) => (
                        <SelectItem key={s.stateCode} value={s.stateCode}>
                          {s.stateName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="wage">Previous Weekly Wage ($)</Label>
                  <Input
                    id="wage"
                    type="number"
                    value={weeklyWage}
                    onChange={(e) => setWeeklyWage(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your average weekly earnings before losing your job
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {calculations && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <p className="text-sm opacity-80">Estimated Weekly Benefit</p>
                      <p className="text-3xl font-bold">
                        ${calculations.estimatedBenefit.toFixed(0)}
                      </p>
                      <p className="text-sm opacity-80 mt-1">
                        {calculations.replacementRate.toFixed(0)}% of your wage
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Max Duration</span>
                      </div>
                      <p className="text-3xl font-bold text-foreground">
                        {calculations.stateData.maxWeeks} weeks
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Total Potential Benefits
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        ${calculations.totalBenefits.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* State Info */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>{calculations.stateData.stateName} Unemployment Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Maximum Weekly Benefit</span>
                        <span className="font-semibold">
                          ${calculations.stateData.maxWeeklyBenefit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Minimum Weekly Benefit</span>
                        <span className="font-semibold">
                          ${calculations.stateData.minWeeklyBenefit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Benefit Duration</span>
                        <span className="font-semibold">
                          Up to {calculations.stateData.maxWeeks} weeks
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={calculations.stateData.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Apply for Benefits in {calculations.stateData.stateName}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="calculator"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/unemployment-calculator" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

