import { Metadata } from "next";
import Link from "next/link";
import { 
  Sun, 
  DollarSign, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Clock,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Star,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roles } from "@/lib/data/roles";
import { cities } from "@/lib/data/cities";
import { getSeasonBySlug } from "@/lib/data/seasonal-hiring";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { BreadcrumbSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Summer Jobs 2026 | Find Flexible Summer Work | Indeed Flex",
  description: "Find summer jobs in 2026. Hospitality, events, warehouse, and retail positions available now. Flexible schedules perfect for students. Apply today and start earning.",
  keywords: [
    "summer jobs 2026",
    "summer employment",
    "summer work for students",
    "seasonal summer jobs",
    "flexible summer jobs",
    "summer hospitality jobs",
    "summer warehouse jobs",
    "summer event jobs",
    "college summer jobs",
    "summer temp work"
  ],
  openGraph: {
    title: "Summer Jobs 2026 | Indeed Flex",
    description: "Find flexible summer work in hospitality, events, warehouse, and retail. Perfect for students and those seeking seasonal income.",
    type: "website",
  },
};

export default function SummerJobs2026Page() {
  const summerSeason = getSeasonBySlug("summer-2026");
  
  // Summer-focused roles
  const summerRoles = roles.filter(role => 
    ["hospitality", "events", "retail"].includes(role.industry)
  ).slice(0, 12);

  // Top cities for summer work
  const topCities = cities.filter(c => c.searchVolume === 'high').slice(0, 8);

  // Benefits of summer work
  const benefits = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Pick shifts that work around your summer plans, vacations, and activities."
    },
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Earn $14-25+/hr with opportunities for overtime and tips in hospitality."
    },
    {
      icon: GraduationCap,
      title: "Perfect for Students",
      description: "Build your resume and earn money before fall semester starts."
    },
    {
      icon: TrendingUp,
      title: "Career Building",
      description: "Gain experience that opens doors to permanent positions and promotions."
    },
    {
      icon: Users,
      title: "Meet New People",
      description: "Work alongside diverse teams at events, venues, and hospitality locations."
    },
    {
      icon: Star,
      title: "Premium Events",
      description: "Work concerts, festivals, and events with perks like show access."
    }
  ];

  // Quick tips for summer job seekers
  const tips = [
    "Apply in April-May for the best summer shift selection",
    "Get food handler or TIPS certification to unlock more opportunities",
    "Be flexible with shift times - mornings and evenings are in high demand",
    "Express interest in multiple roles to maximize your hours",
    "Build relationships for repeat summer work year after year",
    "Consider event staffing for concert and festival perks"
  ];

  // FAQs
  const faqs = [
    {
      question: "When should I apply for summer 2026 jobs?",
      answer: "Start applying in April-May 2026 for the best selection of summer positions. Hiring continues throughout summer as demand fluctuates, but early applicants get first pick of shifts and locations."
    },
    {
      question: "What summer jobs pay the most?",
      answer: "Bartenders ($15-25/hr + tips), event staff at premium venues ($16-22/hr), warehouse workers ($16-22/hr), and certified forklift operators ($18-25/hr) typically offer the highest summer earnings."
    },
    {
      question: "Can I work summer jobs as a student?",
      answer: "Yes! Summer is perfect for students. You can work full-time between semesters or pick flexible shifts around summer classes. Many students earn $3,000-8,000+ during summer break."
    },
    {
      question: "Do summer jobs lead to permanent positions?",
      answer: "Often yes. Many employers use summer hiring to identify reliable workers for year-round positions. Express your interest in continuing and demonstrate consistent performance."
    },
    {
      question: "What certifications help for summer jobs?",
      answer: "Food handler certification ($10-25) opens hospitality roles. TIPS alcohol certification ($38-55) unlocks bartending and event bar positions. Forklift certification ($50-150) significantly increases warehouse pay."
    }
  ];

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Summer Jobs 2026" },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Summer Jobs 2026" },
        ]}
      />
      <FAQSchema questions={faqs} />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Sun className="h-8 w-8" />
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  Now Hiring
                </Badge>
                <Badge className="bg-white text-amber-600 border-0">
                  Summer 2026
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Summer Jobs 2026
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                Find flexible summer work in hospitality, events, warehouse, and retail. 
                Perfect for students, seasonal workers, or anyone looking to earn extra income 
                this summer. Apply now and start working when you want.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">$14-25+</p>
                  <p className="text-white/80 text-sm">Per Hour</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">12+</p>
                  <p className="text-white/80 text-sm">Role Types</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-white/80 text-sm">Cities</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">Flexible</p>
                  <p className="text-white/80 text-sm">Scheduling</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-white/90" asChild>
                  <Link href="/career-hub/tools/paycheck-calculator">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Calculate Your Summer Earnings
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/career-hub/for/students">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Student Resources
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Work This Summer?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Summer Roles */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular Summer Roles</h2>
              <Link href="/career-hub/roles" className="text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summerRoles.map(role => (
                <Link
                  key={role.slug}
                  href={`/career-hub/roles/${role.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
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
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <DollarSign className="h-4 w-4" />
                          ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                        </div>
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

          {/* How-To Quick Start */}
          <section className="mb-12 bg-white rounded-xl border p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-bold">Get Started Guides</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { slug: 'server', title: 'Server', time: '1-2 weeks' },
                { slug: 'barista', title: 'Barista', time: '1-2 weeks' },
                { slug: 'event-staff', title: 'Event Staff', time: '1 week' },
                { slug: 'picker-packer', title: 'Picker/Packer', time: '1-3 days' },
              ].map(guide => (
                <Link
                  key={guide.slug}
                  href={`/how-to-become/${guide.slug}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                        How to Become a {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Start in {guide.time}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href="/how-to-become" className="text-primary hover:underline inline-flex items-center gap-1">
                Browse all career guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Tips */}
          <section className="mb-12">
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  Summer Job Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Top Cities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Cities for Summer Work</h2>
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
                        <MapPin className="h-5 w-5 text-amber-600" />
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
          <section className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Your Summer Job Search Today
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Don't wait until summer arrives. Apply now for the best selection of shifts, 
              locations, and opportunities. Your summer earnings are waiting.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-white/90" asChild>
                <Link href="/career-hub/tools/paycheck-calculator">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Calculate Summer Earnings
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/career-hub/seasonal-hiring/summer-2026">
                  Learn More About Summer Season
                </Link>
              </Button>
            </div>
          </section>

          {/* Internal Links */}
          <InternalLinkHub variant="full" currentPage={{ type: "seasonal", season: "summer" }} />
        </div>
      </div>
    </>
  );
}

