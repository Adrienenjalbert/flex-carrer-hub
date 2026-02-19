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
  Building2,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { seasonalEvents, getEventBySlug, getUpcomingSeasons } from "@/lib/data/seasonal-hiring";
import { roles, industries } from "@/lib/data/roles";
import { cities, getCityBySlug } from "@/lib/data/cities";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { BreadcrumbSchema, FAQSchema } from "@/components/career-hub/seo";

interface PageProps {
  params: Promise<{ eventSlug: string }>;
}

export async function generateStaticParams() {
  return seasonalEvents.map((event) => ({
    eventSlug: event.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventSlug } = await params;
  const event = getEventBySlug(eventSlug);
  
  if (!event) {
    return { title: "Event Not Found" };
  }

  const canonical = `https://indeedflex.com/career-hub/seasonal-hiring/events/${eventSlug}`;
  const title = `${event.name} Jobs & Hiring | Indeed Flex`;
  const description = `${event.shortDescription} Get hired for ${event.name}. Learn when to apply and what jobs pay the best.`;

  return {
    title,
    description,
    keywords: event.searchKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${event.name} Jobs & Hiring`,
      description,
      url: canonical,
      type: "article",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} Jobs & Hiring`,
      description,
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { eventSlug } = await params;
  const event = getEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  const Icon = event.icon;

  // Get roles for this event's industries
  const relevantRoles = roles.filter(role => 
    event.industries.includes(role.industry)
  ).slice(0, 9);

  // Get cities - prioritize event-specific cities, then top cities
  const eventCities = event.cities 
    ? event.cities.map(slug => getCityBySlug(slug)).filter(Boolean)
    : [];
  const topCities = eventCities.length > 0 
    ? eventCities 
    : cities.filter(c => c.searchVolume === 'high').slice(0, 6);

  // Get industry details
  const relevantIndustries = industries.filter(ind => 
    event.industries.includes(ind.id)
  );

  // Get related seasons
  const relatedSeasons = getUpcomingSeasons(3);

  // Generate FAQs
  const faqs = [
    {
      question: `When should I apply for ${event.name} jobs?`,
      answer: event.hiringTimeline,
    },
    {
      question: `How much more can I earn during ${event.name}?`,
      answer: `${event.name} positions typically pay ${event.avgPayIncrease} more than regular rates due to high demand and premium staffing needs.`,
    },
    {
      question: `What jobs are available for ${event.name}?`,
      answer: `Primary industries hiring are: ${event.industries.join(', ')}. Positions include ${relevantRoles.slice(0, 4).map(r => r.title).join(', ')}, and more.`,
    },
    {
      question: `Can seasonal event work lead to more opportunities?`,
      answer: `Yes! Performing well at major events builds your reputation and opens doors to more premium event assignments. Many workers are invited back year after year.`,
    },
  ];

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Seasonal Hiring", href: "/career-hub/seasonal-hiring" },
    { label: "Events", href: "/career-hub/seasonal-hiring" },
    { label: event.name },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Seasonal Hiring", url: "https://indeedflex.com/career-hub/seasonal-hiring" },
          { name: event.name },
        ]}
      />
      <FAQSchema questions={faqs} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon className="h-8 w-8" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  {event.date}
                </Badge>
                <Badge className="bg-primary text-white border-0">
                  {event.avgPayIncrease} Pay
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {event.name} Jobs
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                {event.description}
              </p>
              
              {/* Key Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <Calendar className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Event Date</p>
                  <p className="font-semibold">{event.date}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <TrendingUp className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Pay Premium</p>
                  <p className="font-semibold">{event.avgPayIncrease}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Briefcase className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Industries</p>
                  <p className="font-semibold">{event.industries.length} Hiring</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Star className="h-5 w-5 mb-2 opacity-80" />
                  <p className="text-sm opacity-80">Type</p>
                  <p className="font-semibold">Major Event</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Timeline */}
          <section className="mb-12">
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Application Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{event.hiringTimeline}</p>
              </CardContent>
            </Card>
          </section>

          {/* Tips for Success */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tips for {event.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {event.tips.map((tip, index) => (
                <Card key={index} className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <p>{tip}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Industries Hiring */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Industries Hiring for {event.name}</h2>
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
                        High demand for {event.name}
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
            <h2 className="text-2xl font-bold mb-6">In-Demand Roles</h2>
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
          </section>

          {/* Location-Specific or Top Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {event.cities ? `${event.name} Location` : 'Top Hiring Cities'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCities.map(city => city && (
                <Link
                  key={city.slug}
                  href={`/career-hub/cities/${city.slug}`}
                  className="group"
                >
                  <Card className={`hover:shadow-md transition-shadow ${event.cities ? 'border-accent' : ''}`}>
                    <CardContent className="pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className={`h-5 w-5 ${event.cities ? 'text-accent' : 'text-primary'}`} />
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

          {/* Related Seasons */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Seasons</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedSeasons.map(season => {
                const SeasonIcon = season.icon;
                return (
                  <Link
                    key={season.slug}
                    href={`/career-hub/seasonal-hiring/${season.slug}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <SeasonIcon className="h-5 w-5 text-primary" />
                          <Badge variant="secondary">{season.months.join(' - ')}</Badge>
                        </div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                          {season.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {season.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Don't Miss {event.name}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Apply early to secure the best shifts. {event.name} positions fill quickly 
              and pay {event.avgPayIncrease} more than regular rates.
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
          <InternalLinkHub variant="full" currentPage={{ type: "seasonal" }} />
        </div>
      </div>
      <CTASection />
    </>
  );
}

