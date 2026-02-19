import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Briefcase, DollarSign } from "lucide-react";
import { wageReport2026 } from "@/lib/data/wage-report/2026-data";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";

interface ByIndustryPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: ByIndustryPageProps): Promise<Metadata> {
  const { year } = await params;
  
  if (year !== "2026") {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/${year}/by-industry`;
  const title = `Wage Report by Industry ${year} | Industry Wage Analysis`;
  const description = `Compare wages across ${wageReport2026.industries.length} industries. Find the highest-paying industries and fastest-growing sectors in flexible work.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: ["wage report by industry", "industry wages", "hourly wages by sector", "flex work industries"],
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

export default async function ByIndustryPage({ params }: ByIndustryPageProps) {
  const { year } = await params;
  
  if (year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Industry" },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Industry" },
  ];

  // Sort industries by wage growth (descending)
  const sortedIndustries = [...wageReport2026.industries].sort(
    (a, b) => b.wageGrowth - a.wageGrowth
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Wage Report by Industry {year}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Compare wages across {wageReport2026.industries.length} major industries in flexible work. 
          See which industries offer the highest wages and fastest growth.
        </p>
      </div>

      {/* Industry Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sortedIndustries.map((industry) => (
          <Link
            key={industry.industrySlug}
            href={`/career-hub/wage-report/${year}/by-industry/${industry.industrySlug}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <Badge variant={industry.wageGrowth > 5 ? "default" : "secondary"}>
                    {industry.wageGrowth > 0 ? "+" : ""}{industry.wageGrowth.toFixed(1)}% growth
                  </Badge>
                </div>
                <CardTitle className="text-xl">{industry.industryName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Median Wage</span>
                    <span className="text-lg font-bold text-primary">
                      ${industry.avgMedianWage.toFixed(2)}/hr
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Employment</span>
                    <span className="text-sm font-medium">
                      {industry.totalEmployment.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Top Occupations</span>
                    <span className="text-sm font-medium">{industry.topOccupations.length}</span>
                  </div>
                  <div className="pt-2 border-t flex items-center justify-between text-primary">
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
            Industry Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Highest Median Wage</p>
              <p className="text-2xl font-bold">
                {sortedIndustries[0]?.industryName || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                ${sortedIndustries[0]?.avgMedianWage.toFixed(2) || "0"}/hr
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fastest Growth</p>
              <p className="text-2xl font-bold">
                {sortedIndustries.sort((a, b) => b.wageGrowth - a.wageGrowth)[0]?.industryName || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                +{sortedIndustries.sort((a, b) => b.wageGrowth - a.wageGrowth)[0]?.wageGrowth.toFixed(1) || "0"}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Industries</p>
              <p className="text-2xl font-bold">{wageReport2026.industries.length}</p>
              <p className="text-sm text-muted-foreground">Industries analyzed</p>
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
            <Link href={`/career-hub/wage-report/${year}/by-region`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">By Region</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare wages across {wageReport2026.regions.length}+ regions
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

