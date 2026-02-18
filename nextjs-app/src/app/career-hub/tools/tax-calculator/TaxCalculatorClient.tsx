"use client";

import { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  PiggyBank,
  DollarSign,
  Calculator,
  Calendar,
  AlertCircle,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { stateTaxData, getSortedStates, getNoIncomeTaxStates } from "@/lib/data/state-taxes";

const SELF_EMPLOYMENT_TAX_RATE = 0.153;
const MILEAGE_RATE = 0.70; // 2026 IRS rate

const faqs = [
  {
    question: "Do I need to pay quarterly estimated taxes?",
    answer:
      "If you expect to owe $1,000 or more in taxes for the year as a 1099 contractor, the IRS requires quarterly estimated tax payments. Missing these can result in penalties.",
  },
  {
    question: "What's the self-employment tax rate?",
    answer:
      "Self-employment tax is 15.3% of net self-employment income (12.4% for Social Security + 2.9% for Medicare). You can deduct half of this amount on your tax return.",
  },
  {
    question: "What deductions can gig workers claim?",
    answer:
      "Common deductions include vehicle mileage (70¢/mile in 2026), phone expenses, work uniforms, tools and equipment, home office space, and professional services like tax preparation.",
  },
  {
    question: "What's the difference between W-2 and 1099 taxes?",
    answer:
      "W-2 employees have taxes withheld automatically and split FICA taxes with their employer. 1099 contractors must pay the full 15.3% self-employment tax and make quarterly estimated payments.",
  },
];

export default function TaxCalculatorClient() {
  const [income, setIncome] = useState<string>("35000");
  const [state, setState] = useState<string>("TX");
  const [milesPerYear, setMilesPerYear] = useState<string>("5000");
  const [includeMileage, setIncludeMileage] = useState(true);

  const sortedStates = useMemo(() => getSortedStates(), []);
  const noTaxStates = useMemo(() => getNoIncomeTaxStates(), []);

  const calculations = useMemo(() => {
    const grossIncome = parseFloat(income) || 0;
    const miles = parseFloat(milesPerYear) || 0;

    // Calculate deductions
    const mileageDeduction = includeMileage ? miles * MILEAGE_RATE : 0;
    const totalDeductions = mileageDeduction;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);

    // Self-employment tax (15.3% on 92.35% of net earnings)
    const netSelfEmployment = taxableIncome * 0.9235;
    const selfEmploymentTax = netSelfEmployment * SELF_EMPLOYMENT_TAX_RATE;

    // Federal income tax (simplified brackets for 2026)
    let federalTax = 0;
    const adjustedIncome = taxableIncome - selfEmploymentTax * 0.5; // Deduct half of SE tax

    if (adjustedIncome <= 11600) {
      federalTax = adjustedIncome * 0.1;
    } else if (adjustedIncome <= 47150) {
      federalTax = 1160 + (adjustedIncome - 11600) * 0.12;
    } else if (adjustedIncome <= 100525) {
      federalTax = 5426 + (adjustedIncome - 47150) * 0.22;
    } else {
      federalTax = 17168.5 + (adjustedIncome - 100525) * 0.24;
    }

    // State tax
    const stateData = stateTaxData[state];
    let stateTax = 0;
    if (stateData && !stateData.hasNoIncomeTax) {
      stateTax = adjustedIncome * (stateData.incomeTaxRate || 0.05);
    }

    const totalTax = selfEmploymentTax + federalTax + stateTax;
    const takeHome = grossIncome - totalTax;
    const effectiveRate = (totalTax / grossIncome) * 100;
    const quarterlyPayment = totalTax / 4;

    return {
      grossIncome,
      mileageDeduction,
      taxableIncome,
      selfEmploymentTax,
      federalTax,
      stateTax,
      totalTax,
      takeHome,
      effectiveRate,
      quarterlyPayment,
    };
  }, [income, state, milesPerYear, includeMileage]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Tax Calculator" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Tax Calculator for Gig Workers
              </h1>
              <p className="text-lg text-muted-foreground">
                Estimate your taxes as a 1099 contractor or gig worker. See
                federal, state, and self-employment taxes.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculate Your Taxes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="income">Annual 1099 Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="mt-1"
                  />
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
                          {s.name} {noTaxStates.includes(s.code) && "(No income tax)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="miles">Work Miles Per Year</Label>
                  <Input
                    id="miles"
                    type="number"
                    value={milesPerYear}
                    onChange={(e) => setMilesPerYear(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mileage"
                    checked={includeMileage}
                    onCheckedChange={(checked) =>
                      setIncludeMileage(checked === true)
                    }
                  />
                  <Label htmlFor="mileage">
                    Include mileage deduction (70¢/mile)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <p className="text-sm opacity-80">Estimated Take-Home</p>
                  <p className="text-3xl font-bold">
                    ${calculations.takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm opacity-80 mt-1">
                    {calculations.effectiveRate.toFixed(1)}% effective tax rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">
                      Quarterly Payment
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.quarterlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due every 3 months
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tax Breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tax Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Self-Employment Tax (15.3%)</span>
                    <span className="font-semibold">
                      ${calculations.selfEmploymentTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Federal Income Tax</span>
                    <span className="font-semibold">
                      ${calculations.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>State Tax ({state})</span>
                    <span className="font-semibold">
                      ${calculations.stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {calculations.mileageDeduction > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-950/30 rounded-lg text-green-700 dark:text-green-400">
                      <span>Mileage Deduction</span>
                      <span className="font-semibold">
                        -${calculations.mileageDeduction.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-semibold">Total Tax</span>
                    <span className="font-bold text-lg">
                      ${calculations.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
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
            <RelatedToolsSidebar currentPath="/career-hub/tools/tax-calculator" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

