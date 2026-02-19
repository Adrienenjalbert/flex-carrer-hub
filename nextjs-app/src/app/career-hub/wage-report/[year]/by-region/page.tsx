import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, DollarSign, TrendingUp } from "lucide-react";
import { wageReport2026 } from "@/lib/data/wage-report/2026-data";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";

interface ByRegionPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: ByRegionPageProps): Promise<Metadata> {
  const { year } = await params;
  
  if (year !== "2026") {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/${year}/by-region`;
  const title = `Wage Report by Region ${year} | Regional Wage Analysis`;
  const description = `Compare wages across ${wageReport2026.regions.length}+ regions. Find the best-paying cities and understand cost-of-living adjustments for flexible work.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: ["wage report by region", "regional wages", "city wages", "cost of living wages"],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ByRegionPage({ params }: ByRegionPageProps) {
  const { year } = await params;
  
  if (year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Region" },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Region" },
  ];

  // Sort regions by median wage (descending)
  const sortedRegions = [...wageReport2026.regions].sort(
    (a, b) => b.avgMedianWage - a.avgMedianWage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Wage Report by Region {year}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Compare wages across {wageReport2026.regions.length}+ metropolitan regions. 
          Understand regional variations, cost-of-living adjustments, and find the best-paying markets.
        </p>
      </div>

      {/* Region Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sortedRegions.map((region) => (
          <Link
            key={region.citySlug || region.region}
            href={`/career-hub/wage-report/${year}/by-region/${region.citySlug || region.region.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{region.region}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Median Wage</span>
                    <span className="text-lg font-bold text-primary">
                      ${region.avgMedianWage.toFixed(2)}/hr
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Top Occupations</span>
                    <span className="text-sm font-medium">{region.topOccupations.length}</span>
                  </div>
                  {region.totalEmployment && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Employment</span>
                      <span className="text-sm font-medium">
                        {region.totalEmployment.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t flex items-center justify-between text-primary mt-2">
                    <span className="text-sm font-medium">View Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Regional Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Highest Median Wage</p>
              <p className="text-2xl font-bold">
                {sortedRegions[0]?.region || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                ${sortedRegions[0]?.avgMedianWage.toFixed(2) || "0"}/hr
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Regions Analyzed</p>
              <p className="text-2xl font-bold">{wageReport2026.regions.length}</p>
              <p className="text-sm text-muted-foreground">Metro areas</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Regions</p>
              <p className="text-2xl font-bold">{wageReport2026.regions.length}</p>
              <p className="text-sm text-muted-foreground">Regions analyzed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Explore Other Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href={`/career-hub/wage-report/${year}/by-industry`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">By Industry</h3>
                  <p className="text-sm text-muted-foreground">
                    View wages across {wageReport2026.industries.length} industries
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/career-hub/wage-report/${year}/by-occupation`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">By Occupation</h3>
                  <p className="text-sm text-muted-foreground">
                    View wages for {wageReport2026.summary.totalOccupations} specific roles
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/career-hub/wage-report/${year}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Full Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Return to the main wage report
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub currentPage={{ type: 'wage-report' }} />
      </div>
      <CTASection />
    </div>
  );
}

