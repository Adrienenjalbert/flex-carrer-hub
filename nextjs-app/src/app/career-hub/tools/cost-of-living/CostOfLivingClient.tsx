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
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Car,
  ShoppingCart,
  Zap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MapPin,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import FAQSection from "@/components/career-hub/FAQSection";
import { usLocations } from "@/lib/data/locations";

const faqs = [
  {
    question: "How is cost of living calculated?",
    answer:
      "Cost of living index compares prices of housing, groceries, utilities, transportation, and healthcare against a national baseline of 100. A score of 110 means 10% more expensive than average.",
  },
  {
    question: "What impacts cost of living the most?",
    answer:
      "Housing is typically the largest factor (30-50% of expenses). Cities like San Francisco and New York have housing costs 2-3x the national average, while cities in the Midwest often have below-average housing costs.",
  },
  {
    question: "Should I only consider salary when relocating?",
    answer:
      "No! Consider the full picture: cost of living, taxes, commute costs, quality of life, job market, and career growth opportunities. A lower salary in a cheaper city might leave you with more disposable income.",
  },
  {
    question: "How do taxes affect my take-home pay?",
    answer:
      "State income tax can range from 0% (Texas, Florida, Nevada) to over 13% (California). This significantly affects take-home pay. Use our Tax Calculator for detailed estimates.",
  },
];

// Major cities with cost of living indices
const cityData = [
  { name: "New York, NY", index: 187, housing: 280, groceries: 110, utilities: 115 },
  { name: "San Francisco, CA", index: 179, housing: 295, groceries: 112, utilities: 105 },
  { name: "Los Angeles, CA", index: 166, housing: 245, groceries: 108, utilities: 102 },
  { name: "Boston, MA", index: 152, housing: 210, groceries: 105, utilities: 118 },
  { name: "Seattle, WA", index: 149, housing: 195, groceries: 108, utilities: 92 },
  { name: "Denver, CO", index: 128, housing: 155, groceries: 102, utilities: 95 },
  { name: "Chicago, IL", index: 107, housing: 115, groceries: 101, utilities: 98 },
  { name: "Austin, TX", index: 103, housing: 120, groceries: 96, utilities: 100 },
  { name: "Dallas, TX", index: 102, housing: 105, groceries: 95, utilities: 102 },
  { name: "Phoenix, AZ", index: 100, housing: 105, groceries: 98, utilities: 102 },
  { name: "Atlanta, GA", index: 98, housing: 95, groceries: 98, utilities: 98 },
  { name: "Houston, TX", index: 96, housing: 90, groceries: 94, utilities: 105 },
  { name: "Nashville, TN", index: 95, housing: 100, groceries: 93, utilities: 92 },
  { name: "Charlotte, NC", index: 94, housing: 92, groceries: 96, utilities: 95 },
  { name: "Columbus, OH", index: 90, housing: 82, groceries: 95, utilities: 92 },
  { name: "Las Vegas, NV", index: 98, housing: 102, groceries: 100, utilities: 95 },
  { name: "Orlando, FL", index: 96, housing: 95, groceries: 102, utilities: 100 },
  { name: "Cleveland, OH", index: 86, housing: 68, groceries: 95, utilities: 98 },
];

export default function CostOfLivingClient() {
  const [currentCity, setCurrentCity] = useState<string>("New York, NY");
  const [targetCity, setTargetCity] = useState<string>("Austin, TX");
  const [currentSalary, setCurrentSalary] = useState<string>("50000");

  const calculations = useMemo(() => {
    const current = cityData.find((c) => c.name === currentCity);
    const target = cityData.find((c) => c.name === targetCity);
    const salary = parseFloat(currentSalary) || 0;

    if (!current || !target) {
      return null;
    }

    const indexDiff = ((target.index - current.index) / current.index) * 100;
    const equivalentSalary = salary * (target.index / current.index);
    const savings = salary - equivalentSalary;

    return {
      current,
      target,
      indexDiff,
      equivalentSalary,
      savings,
      housingDiff: ((target.housing - current.housing) / current.housing) * 100,
      groceriesDiff:
        ((target.groceries - current.groceries) / current.groceries) * 100,
    };
  }, [currentCity, targetCity, currentSalary]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Cost of Living Comparison" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Cost of Living Comparison
              </h1>
              <p className="text-lg text-muted-foreground">
                Compare living costs between cities to see how far your money
                goes in different locations.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Compare Cities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Current City</Label>
                    <Select value={currentCity} onValueChange={setCurrentCity}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cityData.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Target City</Label>
                    <Select value={targetCity} onValueChange={setTargetCity}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cityData.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="salary">Current Annual Salary ($)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {calculations && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Card
                    className={
                      calculations.indexDiff < 0
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-red-500 bg-red-50 dark:bg-red-950/20"
                    }
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        {calculations.indexDiff < 0 ? (
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-red-600" />
                        )}
                        <span className="text-sm font-medium">
                          Cost of Living Difference
                        </span>
                      </div>
                      <p className="text-3xl font-bold">
                        {calculations.indexDiff > 0 ? "+" : ""}
                        {calculations.indexDiff.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {calculations.target.name} vs {calculations.current.name}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">
                          Equivalent Salary Needed
                        </span>
                      </div>
                      <p className="text-3xl font-bold">
                        ${calculations.equivalentSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        To maintain same lifestyle in {calculations.target.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Category Breakdown */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                    <CardDescription>
                      How specific costs compare between cities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-primary" />
                          <span>Housing</span>
                        </div>
                        <Badge
                          variant={
                            calculations.housingDiff < 0 ? "default" : "destructive"
                          }
                        >
                          {calculations.housingDiff > 0 ? "+" : ""}
                          {calculations.housingDiff.toFixed(1)}%
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-5 w-5 text-primary" />
                          <span>Groceries</span>
                        </div>
                        <Badge
                          variant={
                            calculations.groceriesDiff < 0
                              ? "default"
                              : "destructive"
                          }
                        >
                          {calculations.groceriesDiff > 0 ? "+" : ""}
                          {calculations.groceriesDiff.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="comparison"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/cost-of-living" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

