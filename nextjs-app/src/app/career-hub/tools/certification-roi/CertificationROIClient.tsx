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
import {
  Award,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { certifications } from "@/lib/data/certifications";

const faqs = [
  {
    question: "What certifications have the best ROI?",
    answer:
      "Forklift certification and food handler permits typically have excellent ROI - low cost with immediate pay bumps. TABC/alcohol certifications are also quick wins for hospitality workers.",
  },
  {
    question: "How quickly should I see a pay increase?",
    answer:
      "Many certifications lead to immediate eligibility for higher-paying shifts. Forklift operators often see $2-5/hr increases. Food safety certifications open doors to supervisory roles.",
  },
  {
    question: "Are online certifications worth it?",
    answer:
      "For many roles, yes. Food handler permits, OSHA 10, and alcohol serving certifications are commonly accepted as online courses. Verify employer acceptance before enrolling.",
  },
];

export default function CertificationROIClient() {
  const [selectedCert, setSelectedCert] = useState<string>(
    certifications[0]?.slug || ""
  );
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("30");
  const [currentRate, setCurrentRate] = useState<string>("15");

  const calculations = useMemo(() => {
    const cert = certifications.find((c) => c.slug === selectedCert);
    if (!cert) return null;

    const hours = parseFloat(hoursPerWeek) || 0;
    const rate = parseFloat(currentRate) || 0;

    // Estimate cost from first provider
    const costString = cert.providers[0]?.cost || "$0";
    const cost = parseFloat(costString.replace(/[^0-9.]/g, "")) || 0;

    // Estimated pay increase
    const payIncrease = cert.category === "warehouse" ? 3 : 2; // $2-3/hr typical
    const weeklyIncrease = payIncrease * hours;
    const monthlyIncrease = weeklyIncrease * 4.33;
    const yearlyIncrease = weeklyIncrease * 52;

    // Payback period
    const weeksToPayback = cost / weeklyIncrease;
    const monthsToPayback = weeksToPayback / 4.33;

    // 5-year ROI
    const fiveYearReturn = yearlyIncrease * 5 - cost;
    const roiPercentage = (fiveYearReturn / cost) * 100;

    return {
      cert,
      cost,
      payIncrease,
      weeklyIncrease,
      monthlyIncrease,
      yearlyIncrease,
      weeksToPayback,
      monthsToPayback,
      fiveYearReturn,
      roiPercentage,
    };
  }, [selectedCert, hoursPerWeek, currentRate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Certification ROI" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Certification ROI Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate the return on investment for professional
                certifications. See if the cost is worth it.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculate Your ROI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Certification</Label>
                  <Select value={selectedCert} onValueChange={setSelectedCert}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {certifications.map((cert) => (
                        <SelectItem key={cert.slug} value={cert.slug}>
                          {cert.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rate">Current Hourly Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="hours">Hours Per Week</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {calculations && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <p className="text-sm opacity-80">Payback Period</p>
                      <p className="text-3xl font-bold">
                        {calculations.monthsToPayback < 1
                          ? `${Math.ceil(calculations.weeksToPayback)} weeks`
                          : `${calculations.monthsToPayback.toFixed(1)} months`}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Expected Pay Increase
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        +${calculations.payIncrease}/hr
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        5-Year Return
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        +${calculations.fiveYearReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Certification Details */}
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle>{calculations.cert.name}</CardTitle>
                    </div>
                    <CardDescription>
                      {calculations.cert.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Certification Cost</span>
                        <span className="font-semibold">
                          ${calculations.cost}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Weekly Pay Increase</span>
                        <span className="font-semibold text-green-600">
                          +${calculations.weeklyIncrease.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span>Yearly Pay Increase</span>
                        <span className="font-semibold text-green-600">
                          +${calculations.yearlyIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                        <span className="font-medium">5-Year ROI</span>
                        <span className="font-bold text-lg text-primary">
                          {calculations.roiPercentage.toFixed(0)}%
                        </span>
                      </div>
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
            <RelatedToolsSidebar currentPath="/career-hub/tools/certification-roi" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

