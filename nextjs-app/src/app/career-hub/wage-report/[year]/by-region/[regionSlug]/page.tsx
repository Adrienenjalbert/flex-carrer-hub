import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { getRegionBySlug, occupationWageData } from "@/lib/data/wage-report/2026-data";
import { generateRegionalInsights } from "@/lib/data/wage-report/insights-engine";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InsightCard, RegionalHeatmap } from "@/components/career-hub/wage-report";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";

interface RegionPageProps {
  params: Promise<{ year: string; regionSlug: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  
  if (!region) {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/2026/by-region/${regionSlug}`;
  const title = `${region.region} Wages 2026 | Regional Wage Report`;
  const description = `${region.region} wage analysis: $${region.avgMedianWage}/hr median, ${region.topOccupations.length}+ roles. Cost-of-living adjusted wages and regional insights.`;
  
  return {
    title,
    description,
    keywords: [`${region.region} wages`, "regional wage report", "hourly wages", "cost of living"],
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

export default async function RegionPage({ params }: RegionPageProps) {
  const { year, regionSlug } = await params;
  const region = getRegionBySlug(regionSlug);
  
  if (!region || year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Region", href: `/career-hub/wage-report/${year}/by-region` },
    { label: region.region, href: `/career-hub/wage-report/${year}/by-region/${regionSlug}` },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Region", url: `/career-hub/wage-report/${year}/by-region` },
    { name: region.region, url: `/career-hub/wage-report/${year}/by-region/${regionSlug}` },
  ];

  const insights = generateRegionalInsights(region);
  const regionOccupations = occupationWageData.filter(occ => 
    occ.byRegion.some(r => r.citySlug === region.citySlug || r.stateCode === region.stateCode)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <Link href={`/career-hub/wage-report/${year}/by-region`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Regions
        </Link>
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {region.region} Wage Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            Comprehensive wage data and cost-of-living analysis for flexible work roles in {region.region}, {region.stateCode}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Avg. Median Wage</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">${region.avgMedianWage}/hr</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Total Employment</p>
                <p className="text-2xl md:text-3xl font-bold">{Math.round(region.totalEmployment / 1000)}K</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Cost of Living</p>
                <p className="text-2xl md:text-3xl font-bold">{region.costOfLivingIndex}</p>
                <p className="text-xs text-muted-foreground mt-1">100 = national avg</p>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Key Insights</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Regional wage insights for {region.region}</p>
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

          {/* Top Occupations */}
          {region.topOccupations.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Top Occupations
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Highest-paying flexible roles in {region.region}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {region.topOccupations.map((occ, index) => (
                    <Link key={occ.occupationSlug} href={`/career-hub/wage-report/${year}/by-occupation/${occ.occupationSlug}`}>
                      <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30">
                        <CardContent className="p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg md:text-xl mb-1">{occ.occupationTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                {occ.employment.toLocaleString()} workers
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl md:text-3xl font-bold text-primary">${occ.medianWage}/hr</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Industries */}
          {region.topIndustries.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Top Industries
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Leading industries by wage in {region.region}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {region.topIndustries.map((ind, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/30 transition-colors">
                      <div>
                        <p className="font-semibold text-base">{ind.industryName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">${ind.avgWage}/hr</p>
                        <p className="text-xs text-muted-foreground">
                          {ind.employment.toLocaleString()} workers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regional Insights */}
          {region.insights.length > 0 && (
            <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Regional Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {region.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3 text-base">
                      <span className="text-primary mt-1.5 font-bold">•</span>
                      <span className="text-gray-700 leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
                {region.wageToCOLRatio > 0.18 && (
                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm font-semibold text-success mb-1">Great Value Market</p>
                    <p className="text-sm text-muted-foreground">
                      {region.region} offers strong wage-to-cost-of-living value, making it an attractive market for flexible workers.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="lg:col-span-1">
          <InternalLinkHub currentPage={{ type: 'city', city: region.citySlug || regionSlug }} />
        </aside>
      </div>
      <CTASection />
    </div>
  );
}

