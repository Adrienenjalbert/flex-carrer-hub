import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  MapPin,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { seasons, getSeasonBySlug, getUpcomingEvents } from "@/lib/data/seasonal-hiring";
import { roles, industries } from "@/lib/data/roles";
import { cities } from "@/lib/data/cities";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { BreadcrumbSchema, FAQSchema } from "@/components/career-hub/seo";

interface PageProps {
  params: Promise<{ seasonSlug: string }>;
}

export async function generateStaticParams() {
  return seasons.map((season) => ({
    seasonSlug: season.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seasonSlug } = await params;
  const season = getSeasonBySlug(seasonSlug);
  
  if (!season) {
    return { title: "Season Not Found" };
  }

  return {
    title: `${season.name} Jobs & Hiring Guide | Indeed Flex`,
    description: `${season.shortDescription} Learn when to apply, what jobs are available, and how to maximize your earnings during ${season.name.toLowerCase()}.`,
    keywords: season.searchKeywords,
    openGraph: {
      title: `${season.name} Jobs | Indeed Flex`,
      description: season.shortDescription,
      type: "article",
    },
  };
}

export default async function SeasonPage({ params }: PageProps) {
  const { seasonSlug } = await params;
  const season = getSeasonBySlug(seasonSlug);

  if (!season) {
    notFound();
  }

  const Icon = season.icon;

  // Get roles for this season's industries
  const relevantRoles = roles.filter(role => 
    season.industries.includes(role.industry)
  ).slice(0, 9);

  // Get top cities
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 6);

  // Get industry details
  const relevantIndustries = industries.filter(ind => 
    season.industries.includes(ind.id)
  );

  // Get related events
  const relatedEvents = getUpcomingEvents(3);

  // Generate FAQs
  const faqs = [
    {
      question: `When should I apply for ${season.name.toLowerCase()} jobs?`,
      answer: season.hiringTimeline,
    },
    {
      question: `How much more can I earn during ${season.name.toLowerCase()}?`,
      answer: `${season.name} positions typically pay ${season.avgPayIncrease} more than regular rates. Demand level is ${season.demandLevel}, meaning employers often offer premium rates and overtime.`,
    },
    {
      question: `What jobs are available during ${season.name.toLowerCase()}?`,
      answer: `The main industries hiring during this season are: ${season.industries.join(', ')}. Roles include ${relevantRoles.slice(0, 5).map(r => r.title).join(', ')}, and more.`,
    },
    {
      question: `Do seasonal jobs lead to permanent positions?`,
      answer: `Yes! Many employers use seasonal hiring to find permanent staff. Demonstrating reliability, good performance, and expressing interest in staying can lead to full-time offers.`,
    },
  ];

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Seasonal Hiring", href: "/career-hub/seasonal-hiring" },
    { label: season.name },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Seasonal Hiring", url: "https://indeedflex.com/career-hub/seasonal-hiring" },
          { name: season.name },
        ]}
      />
      <FAQSchema questions={faqs} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon className="h-8 w-8" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {season.demandLevel === 'very-high' ? 'Very High Demand' : 
                   season.demandLevel === 'high' ? 'High Demand' : 'Moderate Demand'}
                </Badge>
                <Badge className="bg-accent/80 text-white border-0">
                  {season.avgPayIncrease} Pay
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {season.name} Jobs
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                {season.description}
              </p>
              
              {/* Key Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <Calendar className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Peak Months</p>
                  <p className="font-semibold">{season.months.join(', ')}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <TrendingUp className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Pay Increase</p>
                  <p className="font-semibold">{season.avgPayIncrease}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Briefcase className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Industries</p>
                  <p className="font-semibold">{season.industries.length} Hiring</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Clock className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Demand</p>
                  <p className="font-semibold capitalize">{season.demandLevel.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Timeline */}
          <section className="mb-12">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  When to Apply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{season.hiringTimeline}</p>
              </CardContent>
            </Card>
          </section>

          {/* Tips for Success */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tips for {season.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {season.tips.map((tip, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p>{tip}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Industries Hiring */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Industries Hiring</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relevantIndustries.map(industry => (
                <Link
                  key={industry.id}
                  href={`/career-hub/industries/${industry.id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 ${industry.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                        <Building2 className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {industry.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        High demand during {season.months[0]}-{season.months[season.months.length - 1]}
                      </p>
                      <span className="text-primary text-sm flex items-center gap-1 mt-3">
                        Explore roles <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Available Roles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular {season.name} Roles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relevantRoles.map(role => (
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
                        <Badge variant="outline" className="text-xs">
                          {role.industry}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {role.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                        </span>
                        {role.avgTips && (
                          <span className="text-muted-foreground">
                            + tips
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link href="/career-hub/roles">
                  View All Roles <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Top Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Cities for {season.name} Jobs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCities.map(city => (
                <Link
                  key={city.slug}
                  href={`/career-hub/cities/${city.slug}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {city.city}, {city.stateCode}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            ${city.avgHourlyWage.min}-${city.avgHourlyWage.max}/hr avg
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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

          {/* Related Events */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Hiring Events</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedEvents.map(event => {
                const EventIcon = event.icon;
                return (
                  <Link
                    key={event.slug}
                    href={`/career-hub/seasonal-hiring/events/${event.slug}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <EventIcon className="h-5 w-5 text-primary" />
                          <Badge variant="secondary">{event.date}</Badge>
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                          {event.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't wait until the last minute. Apply now for {season.name.toLowerCase()} positions 
              and secure your spot at the best employers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/career-hub/tools/paycheck-calculator">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Calculate Your Pay
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-to-become">
                  Browse Career Guides
                </Link>
              </Button>
            </div>
          </section>

          {/* Internal Links */}
          <InternalLinkHub variant="full" />
        </div>
      </div>
    </>
  );
}

