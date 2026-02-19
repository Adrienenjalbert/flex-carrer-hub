import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DollarSign, MapPin, TrendingUp, ArrowUp, ArrowDown, Minus, Award, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { salaryByLocation } from "@/lib/data/salary-by-location";
import { getRoleBySlug } from "@/lib/data/roles";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import {
  WebPageSchema,
  BreadcrumbSchema,
} from "@/components/career-hub/seo";
import { getLastUpdated } from "@/lib/utils/date-variation";

export function generateStaticParams() {
  return salaryByLocation.map((data) => ({
    roleSlug: data.roleSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}): Promise<Metadata> {
  const { roleSlug } = await params;
  const salaryData = salaryByLocation.find((s) => s.roleSlug === roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!salaryData || !role) {
    return { title: "Salary Data Not Found" };
  }

  const title = `${role.title} Salary by City | Compare Pay Across Locations`;
  const description = `Compare ${role.title} salaries across major US cities. See hourly pay, tips, cost of living adjustments, and purchasing power. National average: $${salaryData.nationalAverage.hourly.min}-$${salaryData.nationalAverage.hourly.max}/hr.`;
  const canonical = `https://indeedflex.com/career-hub/salary/${roleSlug}`;

  return {
    title: `${title} | Indeed Flex Career Hub`,
    description,
    keywords: [
      `${role.title.toLowerCase()} salary by city`,
      `${role.title.toLowerCase()} pay by location`,
      `${role.title.toLowerCase()} hourly rate`,
      `compare ${role.title.toLowerCase()} salaries`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function getDemandBadgeVariant(level: string) {
  switch (level) {
    case "very-high":
      return "default";
    case "high":
      return "secondary";
    case "medium":
      return "outline";
    default:
      return "outline";
  }
}

function getDemandLabel(level: string) {
  switch (level) {
    case "very-high":
      return "Very High";
    case "high":
      return "High";
    case "medium":
      return "Moderate";
    default:
      return "Low";
  }
}

function getJobsAvailableLabel(level: string) {
  switch (level) {
    case "many":
      return "Many Jobs";
    case "moderate":
      return "Moderate";
    default:
      return "Limited";
  }
}

export default async function SalaryByCityPage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const salaryData = salaryByLocation.find((s) => s.roleSlug === roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!salaryData || !role) {
    notFound();
  }

  // Sort cities by purchasing power (best value first)
  const sortedCities = [...salaryData.cityData].sort(
    (a, b) => b.adjustedPurchasingPower - a.adjustedPurchasingPower
  );

  return (
    <>
      <WebPageSchema
        name={`${role.title} Salary by City`}
        description={`Compare ${role.title} salaries across major US cities`}
        url={`https://indeedflex.com/career-hub/salary/${roleSlug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Salary by City", url: "https://indeedflex.com/career-hub/salary" },
          { name: role.title },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Salary by City", url: "https://indeedflex.com/career-hub/salary" },
          { name: role.title },
        ]}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Salary by City", href: "/career-hub/salary" },
            { label: role.title },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {role.title} Salary by City
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Compare {role.title} pay across major US cities. See how location affects your earning potential.
            </p>
            
            {/* National Average Card */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>National Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                    <p className="text-2xl font-bold">
                      ${salaryData.nationalAverage.hourly.min}-${salaryData.nationalAverage.hourly.max}/hr
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Median: ${salaryData.nationalAverage.hourly.median}/hr
                    </p>
                  </div>
                  {salaryData.tipsIncluded && salaryData.avgTipsPerHour && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">With Tips</p>
                      <p className="text-2xl font-bold">
                        ${(salaryData.nationalAverage.hourly.min + salaryData.avgTipsPerHour).toFixed(0)}-${(salaryData.nationalAverage.hourly.max + salaryData.avgTipsPerHour).toFixed(0)}/hr
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Avg tips: ${salaryData.avgTipsPerHour}/hr
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Annual Equivalent</p>
                    <p className="text-2xl font-bold">
                      ${(salaryData.nationalAverage.annual.min / 1000).toFixed(0)}K-${(salaryData.nationalAverage.annual.max / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on 40hr/week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* City Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Salary Comparison by City</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">City</th>
                    <th className="text-right p-3 font-semibold">Hourly Pay</th>
                    {salaryData.tipsIncluded && (
                      <th className="text-right p-3 font-semibold">With Tips</th>
                    )}
                    <th className="text-right p-3 font-semibold">COL Index</th>
                    <th className="text-right p-3 font-semibold">Purchasing Power</th>
                    <th className="text-center p-3 font-semibold">Demand</th>
                    <th className="text-center p-3 font-semibold">Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCities.map((city) => {
                    const purchasingPowerDiff = city.adjustedPurchasingPower - 100;
                    const PurchasingIcon = purchasingPowerDiff > 5 ? ArrowUp : purchasingPowerDiff < -5 ? ArrowDown : Minus;
                    const purchasingColor = purchasingPowerDiff > 5 ? "text-green-600" : purchasingPowerDiff < -5 ? "text-red-600" : "text-muted-foreground";
                    
                    return (
                      <tr key={city.citySlug} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="p-3">
                          <Link
                            href={`/career-hub/cities/${city.citySlug}/${roleSlug}`}
                            className="font-semibold hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {city.cityName}, {city.state}
                          </Link>
                        </td>
                        <td className="text-right p-3 font-medium">
                          ${city.hourly.min}-${city.hourly.max}/hr
                          <p className="text-xs text-muted-foreground">Med: ${city.hourly.median}</p>
                        </td>
                        {salaryData.tipsIncluded && city.withTips && (
                          <td className="text-right p-3 font-medium">
                            ${city.withTips.min}-${city.withTips.max}/hr
                            <p className="text-xs text-muted-foreground">Med: ${city.withTips.median}</p>
                          </td>
                        )}
                        <td className="text-right p-3">
                          <Badge variant="outline">
                            {city.costOfLivingIndex} (Nat: 100)
                          </Badge>
                        </td>
                        <td className="text-right p-3">
                          <div className="flex items-center justify-end gap-1">
                            <PurchasingIcon className={`h-4 w-4 ${purchasingColor}`} />
                            <span className={`font-semibold ${purchasingColor}`}>
                              {city.adjustedPurchasingPower}
                            </span>
                            <span className="text-xs text-muted-foreground">/100</span>
                          </div>
                          {purchasingPowerDiff !== 0 && (
                            <p className="text-xs text-muted-foreground">
                              {purchasingPowerDiff > 0 ? "+" : ""}{purchasingPowerDiff.toFixed(0)}% vs avg
                            </p>
                          )}
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={getDemandBadgeVariant(city.demandLevel)}>
                            {getDemandLabel(city.demandLevel)}
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant="outline">
                            {getJobsAvailableLabel(city.jobsAvailable)}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {salaryData.tipsIncluded && (
              <p className="text-sm text-muted-foreground mt-4">
                * Tips are estimates based on industry averages. Actual tips vary by venue, shift, and performance.
              </p>
            )}
          </section>

          {/* Top Cities by Value */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Value Cities</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {sortedCities.slice(0, 3).map((city) => (
                <Card key={city.citySlug}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {city.cityName}, {city.state}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Hourly Pay</span>
                        <span className="font-semibold">
                          ${city.hourly.min}-${city.hourly.max}/hr
                        </span>
                      </div>
                      {salaryData.tipsIncluded && city.withTips && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">With Tips</span>
                          <span className="font-semibold">
                            ${city.withTips.min}-${city.withTips.max}/hr
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Purchasing Power</span>
                        <Badge variant={city.adjustedPurchasingPower > 110 ? "default" : "secondary"}>
                          {city.adjustedPurchasingPower}/100
                        </Badge>
                      </div>
                      {city.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {city.notes}
                        </p>
                      )}
                      <Button asChild variant="outline" size="sm" className="w-full mt-3">
                        <Link href={`/career-hub/cities/${city.citySlug}/${roleSlug}`}>
                          View {city.cityName} Jobs
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Explore More About {role.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/career-hub/roles/${roleSlug}`}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Full Role Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/career-hub/is-it-a-good-job/${roleSlug}`}>
                    <Award className="mr-2 h-4 w-4" />
                    Is It a Good Job?
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/how-to-become/${roleSlug}`}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    How to Become
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/interview-questions/${roleSlug}`}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Interview Questions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Author Byline */}
          <AuthorByline
            contentType="guide"
            lastUpdated={getLastUpdated(roleSlug, 'new')}
            variant="block"
          />
          
          <div className="mt-4">
            <DataSourceCitation
              pageType="role"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub
          variant="full"
          currentPage={{ type: "salary-by-city", role: roleSlug }}
        />
      </div>
      <CTASection />
    </>
  );
}

