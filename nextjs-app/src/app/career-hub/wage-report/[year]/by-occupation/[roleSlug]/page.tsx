import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { getOccupationBySlug } from "@/lib/data/wage-report/2026-data";
import { generateOccupationInsights } from "@/lib/data/wage-report/insights-engine";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InsightCard, WageDistributionChart, YoYComparisonChart, RegionalHeatmap } from "@/components/career-hub/wage-report";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

interface OccupationPageProps {
  params: Promise<{ year: string; roleSlug: string }>;
}

export async function generateMetadata({ params }: OccupationPageProps): Promise<Metadata> {
  const { roleSlug } = await params;
  const occupation = getOccupationBySlug(roleSlug);
  
  if (!occupation) {
    return {};
  }

  const median = occupation.currentYear.wagePercentiles.percentile50;
  return {
    title: `${occupation.occupationTitle} Wages 2026 | Hourly Pay Report`,
    description: `${occupation.occupationTitle} wage data: $${median}/hr median, ${occupation.yoyChange.percentChange}% growth. Percentiles, regional variations, and tips included.`,
    keywords: [`${occupation.occupationTitle} wage`, "hourly pay", "salary", "wage report"],
    alternates: {
      canonical: `https://indeedflex.com/career-hub/wage-report/2026/by-occupation/${roleSlug}`,
    },
  };
}

export default async function OccupationPage({ params }: OccupationPageProps) {
  const { year, roleSlug } = await params;
  const occupation = getOccupationBySlug(roleSlug);
  
  if (!occupation || year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Occupation", href: `/career-hub/wage-report/${year}/by-occupation` },
    { label: occupation.occupationTitle, href: `/career-hub/wage-report/${year}/by-occupation/${roleSlug}` },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Occupation", url: `/career-hub/wage-report/${year}/by-occupation` },
    { name: occupation.occupationTitle, url: `/career-hub/wage-report/${year}/by-occupation/${roleSlug}` },
  ];

  const insights = generateOccupationInsights(occupation);

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <Link href={`/career-hub/wage-report/${year}/by-occupation`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Occupations
        </Link>
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {occupation.occupationTitle} Wage Profile
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            Comprehensive wage data, percentiles, and regional analysis for {occupation.occupationTitle.toLowerCase()}s.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Median Wage</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">${occupation.currentYear.wagePercentiles.percentile50}/hr</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-success/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Wage Growth</p>
                <p className="text-2xl md:text-3xl font-bold text-success">
                  +{occupation.yoyChange.percentChange}%
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Employment</p>
                <p className="text-2xl md:text-3xl font-bold">
                  {Math.round(occupation.currentYear.employment / 1000)}K
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Wage Range</p>
                <p className="text-base md:text-lg font-bold">
                  ${occupation.currentYear.wagePercentiles.percentile10}-${occupation.currentYear.wagePercentiles.percentile90}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wage Distribution Chart */}
          <WageDistributionChart
            percentiles={occupation.currentYear.wagePercentiles}
            title={`${occupation.occupationTitle} Wage Distribution`}
            showTips={occupation.currentYear.avgTips}
          />

          {/* YoY Comparison */}
          {occupation.priorYear && (
            <YoYComparisonChart
              currentYear={2026}
              priorYear={2025}
              currentMedian={occupation.currentYear.wagePercentiles.percentile50}
              priorMedian={occupation.priorYear.wagePercentiles.percentile50}
              title="Year-over-Year Wage Growth"
            />
          )}

          {/* Insights */}
          {insights.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Key Insights</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Data-driven insights and recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {insights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regional Variations */}
          {occupation.byRegion.length > 0 && (
            <RegionalHeatmap
              regions={occupation.byRegion}
              title="Regional Wage Variations"
              showAdjusted={false}
            />
          )}

          {/* Occupation Insights */}
          {occupation.insights.length > 0 && (
            <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Analysis & Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {occupation.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3 text-base">
                      <span className="text-primary mt-1.5 font-bold">•</span>
                      <span className="text-gray-700 leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="lg:col-span-1">
          <InternalLinkHub currentPage={{ type: 'role', role: roleSlug }} />
        </aside>
      </div>
    </div>
  );
}

