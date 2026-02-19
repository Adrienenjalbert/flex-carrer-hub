import { Metadata } from "next";
import Link from "next/link";
import { 
  Snowflake, 
  DollarSign, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Clock,
  Package,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Star,
  ShoppingBag,
  Warehouse,
  Gift
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/data/roles";
import { cities } from "@/lib/data/cities";
import { getSeasonBySlug, getEventBySlug } from "@/lib/data/seasonal-hiring";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { BreadcrumbSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Holiday Jobs 2026 | Seasonal Christmas & Peak Season Work | Indeed Flex",
  description: "Find holiday jobs for 2026. Warehouse, retail, and hospitality positions for Black Friday, Christmas, and peak season. Premium pay rates available. Apply early for best selection.",
  keywords: [
    "holiday jobs 2026",
    "christmas jobs 2026",
    "seasonal holiday work",
    "black friday jobs",
    "peak season warehouse jobs",
    "holiday retail jobs",
    "christmas temp work",
    "holiday warehouse hiring",
    "seasonal employment 2026",
    "winter seasonal jobs"
  ],
  openGraph: {
    title: "Holiday Jobs 2026 | Indeed Flex",
    description: "Find premium-paying holiday work in warehouse, retail, and hospitality. Black Friday, Christmas, and peak season positions available.",
    type: "website",
  },
};

export default function HolidayJobs2026Page() {
  const holidaySeason = getSeasonBySlug("holiday-2026");
  const blackFriday = getEventBySlug("black-friday-2026");
  
  // Holiday-focused roles
  const holidayRoles = roles.filter(role => 
    ["industrial", "retail", "hospitality"].includes(role.industry)
  ).slice(0, 12);

  // Top cities for holiday work
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 8);

  // Key dates for 2026 holiday season
  const keyDates = [
    { date: "October 1", event: "Holiday hiring begins", description: "Major retailers and warehouses start posting positions" },
    { date: "November 27", event: "Black Friday", description: "Highest pay premiums, overtime available" },
    { date: "November 30", event: "Cyber Monday", description: "Peak fulfillment center demand" },
    { date: "December 1-23", event: "Peak Season", description: "Maximum hours and overtime opportunities" },
    { date: "December 31", event: "New Year's Eve", description: "Premium hospitality shifts, highest tip night" },
  ];

  // Benefits of holiday work
  const benefits = [
    {
      icon: DollarSign,
      title: "Premium Pay Rates",
      description: "Earn 15-40% more than regular rates. Holiday and overtime pay add up fast."
    },
    {
      icon: Clock,
      title: "Overtime Available",
      description: "Many employers offer 50-60+ hour weeks during peak season."
    },
    {
      icon: Package,
      title: "High Demand",
      description: "Warehouses, retail, and hospitality desperately need reliable workers."
    },
    {
      icon: TrendingUp,
      title: "Path to Permanent",
      description: "Many seasonal workers are offered permanent positions in January."
    },
    {
      icon: Gift,
      title: "Employee Discounts",
      description: "Many retailers offer staff discounts - perfect for holiday shopping."
    },
    {
      icon: Star,
      title: "Flexible Shifts",
      description: "Choose morning, evening, or overnight shifts that work for you."
    }
  ];

  // Quick tips
  const tips = [
    "Apply by early October for the best shift selection and positions",
    "Get forklift certified for $3-5/hr higher warehouse pay",
    "Be willing to work Thanksgiving weekend for premium pay",
    "Night shifts often pay $1-3/hr more than day shifts",
    "Express interest in permanent positions early",
    "Maintain perfect attendance - reliability is highly valued"
  ];

  // FAQs
  const faqs = [
    {
      question: "When should I apply for holiday 2026 jobs?",
      answer: "Start applying in August-September 2026 for the best selection. Major employers begin posting 8-10 weeks before peak season. Top positions fill by early October."
    },
    {
      question: "How much can I earn during the holiday season?",
      answer: "Holiday workers typically earn 15-25% more than regular rates. Warehouse workers can earn $18-28/hr, retail $14-20/hr, and hospitality $15-25+/hr with tips. Overtime can significantly boost total earnings."
    },
    {
      question: "Do I have to work on holidays?",
      answer: "Availability for Thanksgiving weekend and Christmas week is typically expected, but shifts are not mandatory. Premium pay (1.5x-2x) makes holiday shifts very lucrative."
    },
    {
      question: "Will I get hired permanently after the holiday season?",
      answer: "Many employers use seasonal hiring to find permanent staff. Demonstrate reliability, good performance, and express interest in staying. Conversion rates are often 20-40%."
    },
    {
      question: "What's the best holiday job for maximum earnings?",
      answer: "Warehouse work offers the most overtime and consistent high pay ($18-28/hr). Bartending on New Year's Eve is the single highest-earning night (often $300-500+). Forklift operators earn the most in warehouses."
    }
  ];

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Holiday Jobs 2026" },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Holiday Jobs 2026" },
        ]}
      />
      <FAQSchema questions={faqs} />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Snowflake className="h-8 w-8" />
                </div>
                <Badge className="bg-red-500 text-white border-0">
                  High Demand
                </Badge>
                <Badge className="bg-white text-blue-600 border-0">
                  +15-40% Pay
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Holiday Jobs 2026
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                The biggest hiring season of the year is coming. Earn premium pay 
                in warehouse, retail, and hospitality roles. Black Friday, Cyber Monday, 
                and peak season positions are filling now.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">+15-40%</p>
                  <p className="text-white/80 text-sm">Pay Premium</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">500K+</p>
                  <p className="text-white/80 text-sm">Jobs Nationwide</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">OT</p>
                  <p className="text-white/80 text-sm">Overtime Available</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">Oct-Dec</p>
                  <p className="text-white/80 text-sm">Peak Season</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" asChild>
                  <Link href="/career-hub/tools/paycheck-calculator">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Calculate Holiday Earnings
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/career-hub/seasonal-hiring/events/black-friday-2026">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Black Friday Jobs
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Dates Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">2026 Holiday Hiring Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
              <div className="space-y-4">
                {keyDates.map((item, index) => (
                  <Card key={index} className="md:ml-10 border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <Badge variant="secondary" className="w-fit">{item.date}</Badge>
                        <h3 className="font-semibold">{item.event}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Work the Holiday Season?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Industry Breakdown */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Holiday Industries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/career-hub/industries/industrial" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-t-blue-600">
                  <CardContent className="pt-6">
                    <Warehouse className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      Warehouse & Logistics
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Amazon, Target, Walmart fulfillment centers need 200,000+ seasonal workers.
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <DollarSign className="h-4 w-4" />
                      $16-25/hr + OT
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/career-hub/industries/retail" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-t-emerald-500">
                  <CardContent className="pt-6">
                    <ShoppingBag className="h-10 w-10 text-emerald-500 mb-4" />
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      Retail
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Stores need extra staff for Black Friday, holiday shopping, and returns season.
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 font-medium">
                      <DollarSign className="h-4 w-4" />
                      $14-20/hr + discounts
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/career-hub/industries/hospitality" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-t-amber-500">
                  <CardContent className="pt-6">
                    <Gift className="h-10 w-10 text-amber-500 mb-4" />
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      Hospitality
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Holiday parties, corporate events, and New Year's Eve drive premium demand.
                    </p>
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <DollarSign className="h-4 w-4" />
                      $15-25/hr + tips
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Popular Roles */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">In-Demand Holiday Roles</h2>
              <Link href="/career-hub/roles" className="text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {holidayRoles.map(role => (
                <Link
                  key={role.slug}
                  href={`/career-hub/roles/${role.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {role.title}
                        </h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {role.industry}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {role.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                        </span>
                        {role.avgTips && (
                          <span className="text-muted-foreground">+ tips</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mb-12">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Holiday Job Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Top Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Cities for Holiday Work</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topCities.map(city => (
                <Link
                  key={city.slug}
                  href={`/career-hub/cities/${city.slug}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {city.city}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get Ready for the Holiday Rush
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              The holiday season is the biggest earning opportunity of the year. 
              Apply early, work hard, and maximize your income. Start today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" asChild>
                <Link href="/career-hub/tools/paycheck-calculator">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Calculate Holiday Earnings
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/career-hub/seasonal-hiring/holiday-2026">
                  View Full Holiday Season Guide
                </Link>
              </Button>
            </div>
          </section>

          {/* Internal Links */}
          <InternalLinkHub variant="full" currentPage={{ type: "seasonal", season: "holiday" }} />
        </div>
      </div>
    </>
  );
}

