import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Briefcase, MapPin, FileText, BarChart3 } from "lucide-react";
import { wageReport2026 } from "@/lib/data/wage-report/2026-data";
import { generateOccupationInsights, generateIndustryInsights } from "@/lib/data/wage-report/insights-engine";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InsightCard } from "@/components/career-hub/wage-report";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

interface YearPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: YearPageProps): Promise<Metadata> {
  const { year } = await params;
  const reportYear = parseInt(year);
  
  if (reportYear !== 2026) {
    return {};
  }

  return {
    title: `2026 Flex Work Wage Report | Comprehensive Hourly Wage Analysis`,
    description: `Complete 2026 wage report with data on ${wageReport2026.summary.totalOccupations} occupations, ${wageReport2026.industries.length} industries, and regional analysis. Average wage growth: ${wageReport2026.summary.avgWageGrowth}%.`,
    keywords: ["wage report 2026", "hourly wages", "flex work", "BLS data", "salary report"],
    alternates: {
      canonical: `https://indeedflex.com/career-hub/wage-report/${year}`,
    },
  };
}

export default async function YearReportPage({ params }: YearPageProps) {
  const { year } = await params;
  const reportYear = parseInt(year);
  
  if (reportYear !== 2026) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
  ];

  // Get top insights
  const topOccupation = wageReport2026.occupations
    .sort((a, b) => b.yoyChange.percentChange - a.yoyChange.percentChange)[0];
  const topIndustry = wageReport2026.industries
    .sort((a, b) => b.wageGrowth - a.wageGrowth)[0];
  
  const occupationInsights = generateOccupationInsights(topOccupation);
  const industryInsights = generateIndustryInsights(topIndustry);

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Executive Summary */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          2026 Flex Work Wage Report
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
          Comprehensive analysis of hourly wages across {wageReport2026.summary.totalOccupations} flexible work occupations, 
          {wageReport2026.industries.length} industries, and {wageReport2026.regions.length}+ regions. 
          Data sourced from BLS OEWS, Indeed Flex market data, and industry sources.
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Wage Growth</p>
                  <p className="text-2xl font-bold">{wageReport2026.summary.avgWageGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Employment</p>
                  <p className="text-2xl font-bold">
                    {Math.round(wageReport2026.summary.totalEmployment / 1000)}K
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Data Points</p>
                  <p className="text-2xl font-bold">
                    {wageReport2026.summary.totalDataPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Regions Analyzed</p>
                  <p className="text-2xl font-bold">{wageReport2026.regions.length}+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          {/* Executive Summary */}
          <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-base md:text-lg leading-relaxed mb-4">
                The 2026 Flex Work Wage Report provides comprehensive analysis of hourly wages across {wageReport2026.summary.totalOccupations} flexible work occupations, 
                covering {wageReport2026.industries.length} major industries and {wageReport2026.regions.length}+ metropolitan regions. This year's report reveals 
                strong wage growth across most sectors, with an average increase of <strong>{wageReport2026.summary.avgWageGrowth}%</strong> year-over-year.
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                Key findings include significant wage growth in {wageReport2026.summary.topGrowingIndustry.name.toLowerCase()} ({wageReport2026.summary.topGrowingIndustry.growth}% increase) 
                and {wageReport2026.summary.topGrowingOccupation.title.toLowerCase()} roles ({wageReport2026.summary.topGrowingOccupation.growth}% increase). 
                The report combines authoritative data from the Bureau of Labor Statistics (BLS) with real-time market insights from Indeed Flex to provide 
                the most accurate and up-to-date wage information available.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                This report is designed to help job seekers make informed decisions about their career paths, understand regional wage variations, 
                and identify opportunities for growth in the flexible work economy.
              </p>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Key Insights</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Data-driven insights from the 2026 wage analysis</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                {occupationInsights.slice(0, 2).map(insight => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {industryInsights.slice(0, 2).map(insight => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Growing Occupation */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                Fastest Growing Occupation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                {wageReport2026.summary.topGrowingOccupation.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                Wages grew <span className="text-primary font-bold text-xl">
                  {wageReport2026.summary.topGrowingOccupation.growth}%
                </span> year-over-year, outpacing inflation and reflecting strong demand for skilled workers in this role.
              </p>
              <Button asChild variant="outline" className="w-full md:w-auto">
                <Link href={`/career-hub/wage-report/2026/by-occupation/${wageReport2026.summary.topGrowingOccupation.slug}`}>
                  View Full Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Growing Industry */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-accent">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-6 w-6 text-primary" />
                Fastest Growing Industry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                {wageReport2026.summary.topGrowingIndustry.name}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                Industry wages grew <span className="text-primary font-bold text-xl">
                  {wageReport2026.summary.topGrowingIndustry.growth}%
                </span> year-over-year, driven by increased demand and competitive hiring practices.
              </p>
              <Button asChild variant="outline" className="w-full md:w-auto">
                <Link href={`/career-hub/wage-report/2026/by-industry/${wageReport2026.summary.topGrowingIndustry.slug}`}>
                  View Industry Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* How to Use This Report */}
          <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">How to Use This Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-base">
                <div>
                  <h4 className="font-semibold mb-2">For Job Seekers</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Use this report to research competitive wages for your target role, understand regional variations, 
                    and identify markets with the best wage-to-cost-of-living ratios. Compare occupations to find roles 
                    that match your skills and earning goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">For Career Changers</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Explore wage growth trends to identify industries and occupations with strong upward momentum. 
                    Use regional analysis to find markets where your skills are in high demand and command premium wages.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">For Current Workers</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Compare your current wage to industry percentiles to understand your market position. 
                    Review year-over-year growth to see if your role is keeping pace with market trends.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Explore the Report</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Navigate to specific sections for detailed analysis</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/career-hub/wage-report/2026/by-industry">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        By Industry
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Deep dives into {wageReport2026.industries.length} major industries
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/by-occupation">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        By Occupation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed wage profiles for {wageReport2026.summary.totalOccupations} roles
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/by-region">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        By Region
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Regional wage variations and COL adjustments
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/methodology">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Methodology
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Data sources, research methods, and limitations
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-1">
          <InternalLinkHub currentPage={{ type: 'programmatic', slug: 'wage-report-2026' }} />
        </aside>
      </div>
    </div>
  );
}

