import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Briefcase, MapPin, DollarSign } from "lucide-react";
import { getIndustryBySlug, occupationWageData } from "@/lib/data/wage-report/2026-data";
import { generateIndustryInsights } from "@/lib/data/wage-report/insights-engine";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InsightCard, WageDistributionChart } from "@/components/career-hub/wage-report";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";

interface IndustryPageProps {
  params: Promise<{ year: string; industrySlug: string }>;
}

export async function generateStaticParams() {
  return [
    { year: "2026", industrySlug: "hospitality" },
    { year: "2026", industrySlug: "industrial" },
    { year: "2026", industrySlug: "retail" },
    { year: "2026", industrySlug: "facilities" },
    { year: "2026", industrySlug: "healthcare" },
    { year: "2026", industrySlug: "events" },
  ];
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  
  if (!industry) {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/2026/by-industry/${industrySlug}`;
  const title = `${industry.industryName} Wages 2026 | Industry Wage Report`;
  const description = `${industry.industryName} wage analysis: ${industry.avgMedianWage}/hr median, ${industry.wageGrowth}% growth. ${industry.totalEmployment.toLocaleString()} workers.`;
  
  return {
    title,
    description,
    keywords: [`${industry.industryName} wages`, "industry wage report", "hourly wages", "flex work"],
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

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { year, industrySlug } = await params;
  const industry = getIndustryBySlug(industrySlug);
  
  if (!industry || year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "By Industry", href: `/career-hub/wage-report/${year}/by-industry` },
    { label: industry.industryName, href: `/career-hub/wage-report/${year}/by-industry/${industrySlug}` },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "By Industry", url: `/career-hub/wage-report/${year}/by-industry` },
    { name: industry.industryName, url: `/career-hub/wage-report/${year}/by-industry/${industrySlug}` },
  ];

  const industryOccupations = occupationWageData.filter(occ => occ.industrySlug === industrySlug);
  const insights = generateIndustryInsights(industry);

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-8">
        <Link href={`/career-hub/wage-report/${year}/by-industry`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to All Industries
        </Link>
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {industry.industryName} Wage Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            Comprehensive wage data and trends for {industry.industryName.toLowerCase()} flexible work roles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 lg:space-y-10">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Median Wage</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">${industry.avgMedianWage}/hr</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-success/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Wage Growth</p>
                <p className="text-2xl md:text-3xl font-bold text-success">+{industry.wageGrowth}%</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 md:p-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">Total Employment</p>
                <p className="text-2xl md:text-3xl font-bold">{Math.round(industry.totalEmployment / 1000)}K</p>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Key Insights</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Data-driven insights for {industry.industryName.toLowerCase()}</p>
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
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-6 w-6 text-primary" />
                Top Occupations
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Highest-paying roles in {industry.industryName.toLowerCase()}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industry.topOccupations.map((occ, index) => (
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
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl md:text-3xl font-bold text-primary">${occ.medianWage}/hr</p>
                            </div>
                            <Badge variant={occ.growth > 5 ? "default" : "secondary"} className="text-sm px-3 py-1">
                              {occ.growth > 0 ? "+" : ""}{occ.growth}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Regions */}
          {industry.topRegions.length > 0 && (
            <Card className="shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Top Regions
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Highest-paying markets for {industry.industryName.toLowerCase()} workers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industry.topRegions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border-2 hover:border-primary/30 transition-colors">
                      <div>
                        <p className="font-semibold text-base">{region.region}</p>
                        <p className="text-sm text-muted-foreground">{region.stateCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">${region.avgWage}/hr</p>
                        <p className="text-xs text-muted-foreground">
                          {region.employment.toLocaleString()} workers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Industry Insights */}
          {industry.insights.length > 0 && (
            <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Industry Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {industry.insights.map((insight, index) => (
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
          <InternalLinkHub currentPage={{ type: 'industry', industry: industrySlug }} />
        </aside>
      </div>
      <CTASection />
    </div>
  );
}

