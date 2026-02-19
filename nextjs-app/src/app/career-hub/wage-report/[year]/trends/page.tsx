import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Briefcase, MapPin, Calendar, AlertCircle } from "lucide-react";
import { wageReport2026 } from "@/lib/data/wage-report/2026-data";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";

interface TrendsPageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: TrendsPageProps): Promise<Metadata> {
  const { year } = await params;
  
  if (year !== "2026") {
    return {};
  }

  const canonical = `https://indeedflex.com/career-hub/wage-report/${year}/trends`;
  const title = `Wage Trends & Analysis ${year} | Minimum Wage Impact & Inflation`;
  const description = `Comprehensive analysis of wage trends, minimum wage impact, inflation effects, and seasonal patterns in flexible work. Data-driven insights for ${year}.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: ["wage trends", "minimum wage impact", "inflation wages", "wage growth trends", "flex work trends"],
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

export default async function TrendsPage({ params }: TrendsPageProps) {
  const { year } = await params;
  
  if (year !== "2026") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wage Report", href: "/career-hub/wage-report" },
    { label: year, href: `/career-hub/wage-report/${year}` },
    { label: "Trends & Analysis" },
  ];
  
  const breadcrumbSchemaItems = [
    { name: "Home", url: "/" },
    { name: "Career Hub", url: "/career-hub" },
    { name: "Wage Report", url: "/career-hub/wage-report" },
    { name: year, url: `/career-hub/wage-report/${year}` },
    { name: "Trends & Analysis" },
  ];

  // Calculate trends from data
  const avgGrowth = wageReport2026.summary.avgWageGrowth;
  const topGrowing = wageReport2026.summary.topGrowingOccupation;
  const topIndustry = wageReport2026.summary.topGrowingIndustry;
  
  // Find occupations with highest and lowest growth
  const sortedByGrowth = [...wageReport2026.occupations].sort(
    (a, b) => b.yoyChange.percentChange - a.yoyChange.percentChange
  );
  const fastestGrowing = sortedByGrowth[0];
  const slowestGrowing = sortedByGrowth[sortedByGrowth.length - 1];

  // Find highest and lowest paying
  const sortedByWage = [...wageReport2026.occupations].sort(
    (a, b) => b.currentYear.wagePercentiles.percentile50 - a.currentYear.wagePercentiles.percentile50
  );
  const highestPaying = sortedByWage[0];
  const lowestPaying = sortedByWage[sortedByWage.length - 1];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Wage Trends & Analysis {year}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Deep dive into wage trends, minimum wage impact, inflation effects, and seasonal patterns 
          across flexible work. Understand what's driving wage growth and what to expect.
        </p>
      </div>

      {/* Key Trends Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Avg. Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{avgGrowth}%</p>
            <p className="text-sm text-muted-foreground">Year-over-year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Briefcase className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Fastest Growing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{topGrowing.title}</p>
            <p className="text-sm text-muted-foreground">+{topGrowing.growth}% growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Highest Paying</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{highestPaying.occupationTitle}</p>
            <p className="text-sm text-muted-foreground">
              ${highestPaying.currentYear.wagePercentiles.percentile50.toFixed(2)}/hr
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <MapPin className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-lg">Top Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{topIndustry.name}</p>
            <p className="text-sm text-muted-foreground">+{topIndustry.growth}% growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Minimum Wage Impact */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            Minimum Wage Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-base leading-relaxed mb-4">
              Minimum wage increases across multiple states in 2025-2026 have created upward pressure 
              on entry-level wages throughout flexible work. States with recent minimum wage hikes 
              (California, New York, Washington, Massachusetts) show stronger wage growth at the 
              lower percentiles, with ripple effects extending to mid-tier roles.
            </p>
            <p className="text-base leading-relaxed mb-4">
              The federal minimum wage remains at $7.25/hour, but most flexible work roles now 
              command significantly higher rates due to market competition and state-level increases. 
              Entry-level positions that previously paid near minimum wage now typically start at 
              $12-15/hour in most markets.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium mb-2">Key Insight:</p>
              <p className="text-sm text-muted-foreground">
                Minimum wage increases have compressed wage distributions, reducing the gap between 
                entry-level and experienced workers. This benefits new workers but may slow wage growth 
                for mid-career professionals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inflation Effects */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Inflation & Real Wage Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-base leading-relaxed mb-4">
              With inflation averaging 3-4% in 2025-2026, nominal wage growth of {avgGrowth}% 
              translates to real wage growth of approximately {(avgGrowth - 3.5).toFixed(1)}% after 
              adjusting for inflation. This represents modest but positive real wage gains for 
              flexible workers.
            </p>
            <p className="text-base leading-relaxed mb-4">
              Industries with the strongest wage growth ({topIndustry.name} at +{topIndustry.growth}%) 
              are outpacing inflation significantly, providing real purchasing power increases. 
              However, some sectors with slower growth may see real wages stagnate or decline slightly.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800 mb-1">Above Inflation</p>
                <p className="text-sm text-green-700">
                  {wageReport2026.industries.filter(i => i.wageGrowth > 4).length} industries 
                  showing real wage growth above inflation
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800 mb-1">At Inflation</p>
                <p className="text-sm text-yellow-700">
                  {wageReport2026.industries.filter(i => i.wageGrowth >= 3 && i.wageGrowth <= 4).length} industries 
                  keeping pace with inflation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Patterns */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Seasonal Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-base leading-relaxed mb-4">
              Flexible work shows distinct seasonal wage patterns, with peak demand and premium pay 
              during holiday seasons (November-December) and summer months (June-August). Hospitality 
              roles see the most dramatic seasonal variation, with bartenders and servers earning 
              20-30% more during peak periods.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="font-semibold mb-2">Peak Season (Holidays)</p>
                <p className="text-sm text-muted-foreground">
                  November-December: +15-30% wage premiums for hospitality and retail roles
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Summer Peak</p>
                <p className="text-sm text-muted-foreground">
                  June-August: Increased demand for events, hospitality, and outdoor roles
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Off-Peak</p>
                <p className="text-sm text-muted-foreground">
                  January-March: Lower demand, but warehouse and facilities roles remain stable
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Leaders */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Fastest Growing Occupations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedByGrowth.slice(0, 5).map((occ, idx) => (
              <div key={occ.occupationSlug} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </Badge>
                  <div>
                    <p className="font-semibold">{occ.occupationTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      ${occ.currentYear.wagePercentiles.percentile50.toFixed(2)}/hr median
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    +{occ.yoyChange.percentChange.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">YoY growth</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Explore Other Sections</CardTitle>
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

