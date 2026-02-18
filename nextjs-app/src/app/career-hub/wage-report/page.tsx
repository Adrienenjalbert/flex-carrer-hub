import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Briefcase, MapPin, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { wageReport2026 } from "@/lib/data/wage-report/2026-data";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { WageExplorer } from "@/components/career-hub/wage-report";

export const metadata: Metadata = {
  title: "2026 Flex Work Wage Report | Annual Hourly Wage Analysis",
  description: "Comprehensive 2026 wage report covering hourly pay across 49 occupations, 6 industries, and 20+ regions. Data-driven insights from BLS and Indeed Flex market data.",
  keywords: ["wage report", "hourly wages", "flex work", "gig economy wages", "BLS data", "salary report 2026"],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/wage-report",
  },
  openGraph: {
    title: "2026 Flex Work Wage Report",
    description: "Comprehensive analysis of hourly wages across flexible work occupations",
    type: "article",
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Wage Report", href: "/career-hub/wage-report" },
];

const breadcrumbSchemaItems = [
  { name: "Home", url: "/" },
  { name: "Career Hub", url: "/career-hub" },
  { name: "Wage Report", url: "/career-hub/wage-report" },
];

export default function WageReportHubPage() {
  const { summary } = wageReport2026;

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-xl p-10 md:p-12 mb-10 shadow-sm border border-primary/10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                Updated for 2026
              </Badge>
              <span className="text-sm text-muted-foreground">Annual Report</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              2026 Flex Work Wage Report
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
              Comprehensive analysis of hourly wages across flexible work occupations, industries, and regions.
              Data-driven insights from BLS OEWS, Indeed Flex market data, and industry sources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-base px-8 py-6 shadow-md">
                <Link href="/career-hub/wage-report/2026">
                  View Full Report <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border-2">
                <Link href="/career-hub/wage-report/2026/methodology">
                  View Methodology <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Avg. Wage Growth</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">{summary.avgWageGrowth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Briefcase className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Occupations</p>
                  <p className="text-2xl md:text-3xl font-bold">{summary.totalOccupations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Data Points</p>
                  <p className="text-2xl md:text-3xl font-bold">{summary.totalDataPoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Regions</p>
                  <p className="text-2xl md:text-3xl font-bold">20+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Top Growing Occupation */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                Fastest Growing Occupation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{summary.topGrowingOccupation.title}</h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-4">
                    Wages grew <span className="text-primary font-bold text-xl">{summary.topGrowingOccupation.growth}%</span> year-over-year
                  </p>
                  <Button asChild variant="outline" className="w-full md:w-auto">
                    <Link href={`/career-hub/wage-report/2026/by-occupation/${summary.topGrowingOccupation.slug}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{summary.topGrowingIndustry.name}</h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-4">
                    Industry wages grew <span className="text-primary font-bold text-xl">{summary.topGrowingIndustry.growth}%</span> year-over-year
                  </p>
                  <Button asChild variant="outline" className="w-full md:w-auto">
                    <Link href={`/career-hub/wage-report/2026/by-industry/${summary.topGrowingIndustry.slug}`}>
                      View Industry Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wage Explorer */}
          <WageExplorer />

          {/* Quick Links */}
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Explore the Report</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Navigate to specific sections of the wage report</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/career-hub/wage-report/2026/by-industry">
                  <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2 text-base">By Industry</h3>
                          <p className="text-sm text-muted-foreground">Deep dives into 6 major industries</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/by-occupation">
                  <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2 text-base">By Occupation</h3>
                          <p className="text-sm text-muted-foreground">Detailed wage profiles for 49 roles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/by-region">
                  <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2 text-base">By Region</h3>
                          <p className="text-sm text-muted-foreground">Regional wage variations and COL adjustments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/career-hub/wage-report/2026/trends">
                  <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2 text-base">Trends & Analysis</h3>
                          <p className="text-sm text-muted-foreground">Minimum wage impact, inflation, seasonal patterns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-1">
          <InternalLinkHub currentPage={{ type: 'programmatic', slug: 'wage-report' }} />
        </aside>
      </div>
    </div>
  );
}

