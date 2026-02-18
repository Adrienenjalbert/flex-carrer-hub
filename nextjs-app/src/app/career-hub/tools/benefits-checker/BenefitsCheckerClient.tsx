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
import { Checkbox } from "@/components/ui/checkbox";
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
  Heart,
  DollarSign,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Info,
  Users,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const faqs = [
  {
    question: "Do gig workers get health insurance?",
    answer:
      "Gig workers can get health insurance through the ACA marketplace (Healthcare.gov). Subsidies are available based on income. You may qualify for Medicaid if your income is low enough.",
  },
  {
    question: "Can I get unemployment as a flexible worker?",
    answer:
      "Traditional 1099 contractors typically don't qualify for unemployment. However, W-2 workers at staffing agencies usually do. Some states have expanded coverage - check with your state's unemployment office.",
  },
  {
    question: "What is the ACA income limit for subsidies?",
    answer:
      "For 2026, you may qualify for ACA subsidies if your income is between 100% and 400% of the federal poverty level (roughly $14,580-$58,320 for an individual). Premium tax credits can significantly reduce costs.",
  },
  {
    question: "Are there benefits specifically for gig workers?",
    answer:
      "Some platforms offer benefits packages. Indeed Flex, for example, provides access to certain benefits. Additionally, freelancer unions and associations sometimes offer group rates on insurance.",
  },
];

// 2026 FPL estimates
const federalPovertyLevel = {
  1: 15060,
  2: 20440,
  3: 25820,
  4: 31200,
  5: 36580,
};

export default function BenefitsCheckerClient() {
  const [annualIncome, setAnnualIncome] = useState<string>("30000");
  const [householdSize, setHouseholdSize] = useState<string>("1");
  const [state, setState] = useState<string>("TX");
  const [isW2, setIsW2] = useState(true);
  const [hasEmployerCoverage, setHasEmployerCoverage] = useState(false);

  const eligibility = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const size = parseInt(householdSize) || 1;
    const fpl = federalPovertyLevel[size as keyof typeof federalPovertyLevel] || 15060;
    const fplPercentage = (income / fpl) * 100;

    const results = {
      fplPercentage,
      medicaid: fplPercentage <= 138, // Most expansion states
      acaSubsidy: fplPercentage >= 100 && fplPercentage <= 400,
      snap: fplPercentage <= 130,
      unemployment: isW2,
      programs: [] as { name: string; eligible: boolean; link: string; description: string }[],
    };

    results.programs = [
      {
        name: "Medicaid",
        eligible: results.medicaid,
        link: "https://www.medicaid.gov/",
        description: "Free or low-cost health coverage",
      },
      {
        name: "ACA Marketplace Subsidies",
        eligible: results.acaSubsidy && !hasEmployerCoverage,
        link: "https://www.healthcare.gov/",
        description: "Premium tax credits for health insurance",
      },
      {
        name: "SNAP (Food Stamps)",
        eligible: results.snap,
        link: "https://www.fns.usda.gov/snap/recipient/eligibility",
        description: "Monthly food assistance benefits",
      },
      {
        name: "Unemployment Insurance",
        eligible: results.unemployment,
        link: "https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/find-unemployment-benefits.aspx",
        description: "Benefits if you lose your job",
      },
      {
        name: "Earned Income Tax Credit",
        eligible: fplPercentage <= 200,
        link: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
        description: "Refundable tax credit for workers",
      },
    ];

    return results;
  }, [annualIncome, householdSize, isW2, hasEmployerCoverage]);

  const eligibleCount = eligibility.programs.filter((p) => p.eligible).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Benefits Checker" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Benefits Eligibility Checker
              </h1>
              <p className="text-lg text-muted-foreground">
                See what benefits and assistance programs you may qualify for
                based on your situation.
              </p>
            </div>

            {/* Input Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="income">Annual Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Household Size</Label>
                  <Select value={householdSize} onValueChange={setHouseholdSize}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size} {size === 1 ? "person" : "people"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="w2"
                      checked={isW2}
                      onCheckedChange={(checked) => setIsW2(checked === true)}
                    />
                    <Label htmlFor="w2">I work as a W-2 employee (not 1099)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="employer"
                      checked={hasEmployerCoverage}
                      onCheckedChange={(checked) =>
                        setHasEmployerCoverage(checked === true)
                      }
                    />
                    <Label htmlFor="employer">
                      I have access to employer health insurance
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <Card
              className={`mb-8 ${
                eligibleCount > 0
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : ""
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      You may qualify for {eligibleCount} programs
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based on {eligibility.fplPercentage.toFixed(0)}% of Federal
                      Poverty Level
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Programs List */}
            <div className="space-y-4 mb-8">
              {eligibility.programs.map((program) => (
                <Card
                  key={program.name}
                  className={
                    program.eligible
                      ? "border-green-500"
                      : "border-border opacity-60"
                  }
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {program.eligible ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-semibold">{program.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {program.description}
                          </p>
                        </div>
                      </div>
                      {program.eligible && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={program.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Learn More
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="calculator"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/benefits-checker" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

