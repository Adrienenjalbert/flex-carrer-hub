/**
 * EarningsBreakdown Component
 * 
 * Shows detailed "Money Math" for a role - helps users understand
 * realistic earnings at different hours/week with tips and taxes.
 */
"use client";

import { useState } from "react";
import { Calculator, DollarSign, Clock, TrendingUp, Minus, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface EarningsBreakdownProps {
  roleTitle: string;
  hourlyRate: { min: number; max: number };
  tipRange?: { min: number; max: number };
  industry: string;
  stateCode?: string;
}

// Simplified tax estimation (federal only for illustration)
function estimateTaxes(annualIncome: number): number {
  // Rough federal tax brackets for single filer 2026
  if (annualIncome <= 11600) return annualIncome * 0.10;
  if (annualIncome <= 47150) return 1160 + (annualIncome - 11600) * 0.12;
  if (annualIncome <= 100525) return 5426 + (annualIncome - 47150) * 0.22;
  return 17168 + (annualIncome - 100525) * 0.24;
}

export default function EarningsBreakdown({
  roleTitle,
  hourlyRate,
  tipRange,
  industry,
  stateCode = "TX",
}: EarningsBreakdownProps) {
  const [selectedHours, setSelectedHours] = useState<15 | 25 | 40>(25);

  const avgRate = (hourlyRate.min + hourlyRate.max) / 2;
  const avgTips = tipRange ? (tipRange.min + tipRange.max) / 2 : 0;

  const scenarios = [
    { label: "Part-Time", hours: 15, description: "Perfect for side income" },
    { label: "Moderate", hours: 25, description: "Good balance" },
    { label: "Full-Time", hours: 40, description: "Maximum earnings" },
  ] as const;

  const calculateEarnings = (hours: number) => {
    const weeklyBase = avgRate * hours;
    const weeklyTips = avgTips * hours;
    const weeklyTotal = weeklyBase + weeklyTips;
    const monthlyTotal = weeklyTotal * 4.33;
    const annualTotal = weeklyTotal * 52;
    const estimatedAnnualTax = estimateTaxes(annualTotal);
    const netAnnual = annualTotal - estimatedAnnualTax;
    const effectiveTaxRate = (estimatedAnnualTax / annualTotal) * 100;

    return {
      weeklyBase,
      weeklyTips,
      weeklyTotal,
      monthlyTotal,
      annualTotal,
      estimatedAnnualTax,
      netAnnual,
      effectiveTaxRate,
      netWeekly: netAnnual / 52,
    };
  };

  const currentScenario = scenarios.find((s) => s.hours === selectedHours)!;
  const earnings = calculateEarnings(selectedHours);

  return (
    <section className="py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {roleTitle} Earnings Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            See what you could realistically earn as a {roleTitle.toLowerCase()} at 
            different hours per week. Includes estimated taxes and tips where applicable.
          </p>
        </CardHeader>
        <CardContent>
          {/* Hours Selector */}
          <Tabs
            value={String(selectedHours)}
            onValueChange={(v) => setSelectedHours(Number(v) as 15 | 25 | 40)}
            className="mb-6"
          >
            <TabsList className="grid grid-cols-3 w-full">
              {scenarios.map((s) => (
                <TabsTrigger key={s.hours} value={String(s.hours)}>
                  {s.label} ({s.hours}hrs)
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Breakdown */}
            <div className="space-y-4">
              <h4 className="font-medium">Weekly Breakdown</h4>
              
              {/* Base Pay */}
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>Base Pay ({selectedHours} hrs × ${avgRate.toFixed(2)})</span>
                </div>
                <span className="font-medium">${earnings.weeklyBase.toFixed(2)}</span>
              </div>

              {/* Tips (if applicable) */}
              {tipRange && tipRange.max > 0 && (
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Est. Tips (${avgTips.toFixed(2)}/hr avg)</span>
                  </div>
                  <span className="font-medium text-blue-600">
                    +${earnings.weeklyTips.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Weekly Total */}
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">Weekly Gross</span>
                </div>
                <span className="font-bold text-lg text-primary">
                  ${earnings.weeklyTotal.toFixed(2)}
                </span>
              </div>

              {/* Estimated Tax */}
              <div className="flex items-center justify-between p-3 rounded-lg text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Minus className="w-4 h-4" />
                  <span>Est. Federal Tax (~{earnings.effectiveTaxRate.toFixed(1)}%)</span>
                </div>
                <span>-${(earnings.estimatedAnnualTax / 52).toFixed(2)}</span>
              </div>

              {/* Net Weekly */}
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <span className="font-medium">Est. Weekly Take-Home</span>
                <span className="font-bold text-lg text-green-600">
                  ${earnings.netWeekly.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Right: Summary Cards */}
            <div className="space-y-4">
              <h4 className="font-medium">Projected Earnings</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Monthly (Gross)</p>
                  <p className="text-xl font-bold">${earnings.monthlyTotal.toFixed(0)}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Annual (Gross)</p>
                  <p className="text-xl font-bold">${earnings.annualTotal.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Est. Annual Take-Home</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${Math.round(earnings.netAnnual).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Context */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">
                      {currentScenario.description}
                    </p>
                    <p>
                      Working {selectedHours} hours/week as a {roleTitle.toLowerCase()} 
                      could earn you approximately ${Math.round(earnings.netAnnual).toLocaleString()}/year 
                      after federal taxes. State taxes may vary.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-2">
                <Link
                  href="/career-hub/tools/pay-calculator"
                  className="flex-1 text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
                >
                  Detailed Calculator →
                </Link>
                <Link
                  href="/career-hub/tools/tax-calculator"
                  className="flex-1 text-center py-2 px-4 border rounded-lg text-sm font-medium hover:bg-secondary"
                >
                  Tax Calculator →
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-6 pt-4 border-t">
            * Earnings estimates based on average {roleTitle.toLowerCase()} pay in the US. 
            Actual earnings vary by location, employer, and experience. Tax estimates are 
            simplified federal calculations only—state and local taxes not included. 
            {tipRange && tipRange.max > 0 && " Tip amounts vary significantly by venue and shift."}
            {" "}
            <Link href="/career-hub/tools/pay-calculator" className="text-primary hover:underline">
              Use our detailed calculator
            </Link>{" "}
            for personalized estimates.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

