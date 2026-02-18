import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import HiringCalendar from "@/components/career-hub/HiringCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { seasons } from "@/lib/data/seasonal-hiring";

// Alias for backward compatibility
const seasonalHiringPeriods = seasons.map((s) => ({
  id: s.slug,
  name: s.name,
  industry: s.industries[0] || "general",
  peakMonths: s.peakMonths,
}));
import {
  Calendar,
  TrendingUp,
  DollarSign,
  MapPin,
  ArrowRight,
  Snowflake,
  Sun,
  Leaf,
  Flower2,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Seasonal Hiring Guide 2026 | When Companies Hire Most",
  description:
    "Discover peak hiring seasons for warehouse, hospitality, and retail jobs. Learn when major employers hire the most workers and how to get seasonal positions.",
  keywords: [
    "seasonal hiring",
    "holiday jobs",
    "peak hiring",
    "warehouse jobs 2026",
    "seasonal employment",
    "temp jobs",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/seasonal-hiring",
  },
};

const seasonIcons = {
  winter: Snowflake,
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
};

export default function SeasonalHiringPage() {
  const currentMonth = new Date().getMonth();

  // Group hiring periods by season
  const seasonalData = {
    winter: seasonalHiringPeriods.filter((p) =>
      p.peakMonths.some((m) => [11, 0, 1].includes(m))
    ),
    spring: seasonalHiringPeriods.filter((p) =>
      p.peakMonths.some((m) => [2, 3, 4].includes(m))
    ),
    summer: seasonalHiringPeriods.filter((p) =>
      p.peakMonths.some((m) => [5, 6, 7].includes(m))
    ),
    fall: seasonalHiringPeriods.filter((p) =>
      p.peakMonths.some((m) => [8, 9, 10].includes(m))
    ),
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Seasonal Hiring" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6" />
              <Badge variant="secondary">2026 Hiring Calendar</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Seasonal Hiring Guide
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Know when companies hire the most workers. Plan ahead to land the
              best seasonal positions.
            </p>
          </div>
        </div>
      </section>

      {/* Hiring Calendar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Hiring Calendar</h2>
          <HiringCalendar />
        </div>
      </section>

      {/* Seasonal Breakdown */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Hiring by Season</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {(Object.entries(seasonalData) as [keyof typeof seasonIcons, typeof seasonalHiringPeriods][]).map(
              ([season, periods]) => {
                const Icon = seasonIcons[season];
                const isCurrentSeason = 
                  (season === "winter" && [11, 0, 1].includes(currentMonth)) ||
                  (season === "spring" && [2, 3, 4].includes(currentMonth)) ||
                  (season === "summer" && [5, 6, 7].includes(currentMonth)) ||
                  (season === "fall" && [8, 9, 10].includes(currentMonth));

                return (
                  <Card
                    key={season}
                    className={isCurrentSeason ? "border-primary border-2" : ""}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 capitalize">
                          <Icon className="h-5 w-5 text-primary" />
                          {season}
                        </CardTitle>
                        {isCurrentSeason && (
                          <Badge>Current Season</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {periods.slice(0, 4).map((period) => (
                          <li
                            key={period.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>{period.name}</span>
                            <Badge variant="outline">{period.industry}</Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Tips for Landing Seasonal Jobs
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Apply Early</h3>
                      <p className="text-sm text-muted-foreground">
                        Major employers start hiring 4-8 weeks before peak
                        seasons. Apply as soon as positions open for the best
                        selection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Premium Pay</h3>
                      <p className="text-sm text-muted-foreground">
                        Peak seasons often come with premium pay rates. Night
                        shifts, weekends, and holidays can pay 15-50% more.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Flexible Locations</h3>
                      <p className="text-sm text-muted-foreground">
                        Be open to working at different locations. Distribution
                        centers and seasonal venues often need workers willing
                        to travel.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore More Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/career-hub/roles"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Browse All Roles
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Explore flexible work opportunities across industries
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/tools/paycheck-calculator"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Pay Calculator
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Calculate your potential earnings for seasonal work
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/locations"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                          Active Markets
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Find seasonal jobs in Indeed Flex active markets
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/career-hub/guides/holiday-warehouse-guide"
                className="group"
              >
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          Holiday Warehouse Jobs Guide
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Complete guide to peak season warehouse work
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/guides/summer-hospitality-guide"
                className="group"
              >
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          Summer Hospitality Guide
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Make the most of summer hospitality jobs
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

