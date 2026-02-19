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

interface ByOccupationPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: ByOccupationPageProps): Promise<Metadata> {
  const { year } = await params;
  
  if (year !== "2026") {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/${year}/by-occupation`;
  const title = `Wage Report by Occupation ${year} | Role-Specific Wage Analysis`;
  const description = `Detailed wage data for ${wageReport2026.summary.totalOccupations} occupations. Compare hourly rates, percentiles, and growth across all flexible work roles.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: ["wage report by occupation", "occupation wages", "role-specific wages", "hourly wages by job"],
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

export default async function ByOccupationPage({ params }: ByOccupationPageProps) {
  const { year } = await params;
  
  if (year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Occupation" },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Occupation" },
  ];

  // Sort occupations by median wage (descending)
  const sortedOccupations = [...wageReport2026.occupations].sort(
    (a, b) => b.currentYear.wagePercentiles.percentile50 - a.currentYear.wagePercentiles.percentile50
  );

  // Group by industry for better organization
  const occupationsByIndustry = sortedOccupations.reduce((acc, occ) => {
    if (!acc[occ.industrySlug]) {
      acc[occ.industrySlug] = [];
    }
    acc[occ.industrySlug].push(occ);
    return acc;
  }, {} as Record<string, typeof sortedOccupations>);

  const industryNames: Record<string, string> = {
    hospitality: "Hospitality",
    industrial: "Industrial & Warehouse",
    retail: "Retail",
    facilities: "Facilities Management",
    healthcare: "Healthcare",
    events: "Events",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Wage Report by Occupation {year}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Detailed wage analysis for {wageReport2026.summary.totalOccupations} occupations across flexible work. 
          Compare median wages, percentiles, and year-over-year growth.
        </p>
      </div>

      {/* Occupations by Industry */}
      <div className="space-y-10 mb-12">
        {Object.entries(occupationsByIndustry).map(([industrySlug, occupations]) => (
          <section key={industrySlug}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {industryNames[industrySlug] || industrySlug}
              </h2>
              <Badge variant="secondary">{occupations.length} roles</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {occupations.map((occupation) => (
                <Link
                  key={occupation.occupationSlug}
                  href={`/career-hub/wage-report/${year}/by-occupation/${occupation.occupationSlug}`}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-l-2 border-l-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <Badge 
                          variant={occupation.yoyChange.percentChange > 5 ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {occupation.yoyChange.percentChange > 0 ? "+" : ""}
                          {occupation.yoyChange.percentChange.toFixed(1)}%
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{occupation.occupationTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Median</span>
                          <span className="text-lg font-bold text-primary">
                            ${occupation.currentYear.wagePercentiles.percentile50.toFixed(2)}/hr
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Range</span>
                          <span className="font-medium">
                            ${occupation.currentYear.wagePercentiles.percentile10.toFixed(2)} - 
                            ${occupation.currentYear.wagePercentiles.percentile90.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Employment</span>
                          <span className="font-medium">
                            {occupation.currentYear.employment.toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-2 border-t flex items-center justify-between text-primary mt-2">
                          <span className="text-sm font-medium">View Details</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Top Occupations Summary */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Top Occupations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Highest Median Wage</p>
              <p className="text-xl font-bold">
                {sortedOccupations[0]?.occupationTitle || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                ${sortedOccupations[0]?.currentYear.wagePercentiles.percentile50.toFixed(2) || "0"}/hr
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fastest Growth</p>
              <p className="text-xl font-bold">
                {[...wageReport2026.occupations].sort((a, b) => b.yoyChange.percentChange - a.yoyChange.percentChange)[0]?.occupationTitle || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                +{[...wageReport2026.occupations].sort((a, b) => b.yoyChange.percentChange - a.yoyChange.percentChange)[0]?.yoyChange.percentChange.toFixed(1) || "0"}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Occupations</p>
              <p className="text-2xl font-bold">{wageReport2026.summary.totalOccupations}</p>
              <p className="text-sm text-muted-foreground">Roles analyzed</p>
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

