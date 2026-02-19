import { Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  ChevronRight, 
  Clock, 
  DollarSign,
  Star,
  Filter,
  UtensilsCrossed,
  Warehouse,
  ShoppingBag,
  Building2,
  Heart,
  Calendar,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { howToBecomeGuides, HowToBecomeGuide } from "@/lib/data/how-to-become";
import { getRoleBySlug, industries } from "@/lib/data/roles";
import { BreadcrumbSchema } from "@/components/career-hub/seo";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "How to Become Career Guides | Step-by-Step Job Training Guides",
  description: "Explore our complete library of career guides. Learn how to become a bartender, warehouse worker, retail associate, and more with step-by-step instructions, requirements, and salary information.",
  keywords: [
    "how to become",
    "career guides",
    "job training",
    "entry level jobs",
    "career paths",
    "job requirements",
    "get started in",
    "career change",
  ],
  alternates: {
    canonical: "https://indeedflex.com/how-to-become",
  },
  openGraph: {
    title: "How to Become Career Guides | Indeed Flex",
    description: "Step-by-step guides to starting your career in hospitality, warehouse, retail, and more.",
    url: "https://indeedflex.com/how-to-become",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Become Career Guides",
    description: "Step-by-step guides to starting your career in hospitality, warehouse, retail, and more.",
  },
};

// Industry icons mapping
const industryIcons: Record<string, React.ReactNode> = {
  hospitality: <UtensilsCrossed className="h-5 w-5" />,
  industrial: <Warehouse className="h-5 w-5" />,
  retail: <ShoppingBag className="h-5 w-5" />,
  facilities: <Building2 className="h-5 w-5" />,
  healthcare: <Heart className="h-5 w-5" />,
  events: <Calendar className="h-5 w-5" />,
};

// Industry colors
const industryColors: Record<string, string> = {
  hospitality: "bg-amber-500",
  industrial: "bg-blue-600",
  retail: "bg-emerald-500",
  facilities: "bg-purple-500",
  healthcare: "bg-red-500",
  events: "bg-pink-500",
};

const industryBgColors: Record<string, string> = {
  hospitality: "bg-amber-50 border-amber-200",
  industrial: "bg-blue-50 border-blue-200",
  retail: "bg-emerald-50 border-emerald-200",
  facilities: "bg-purple-50 border-purple-200",
  healthcare: "bg-red-50 border-red-200",
  events: "bg-pink-50 border-pink-200",
};

// Difficulty badge colors
const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  challenging: "bg-red-100 text-red-800",
};

// Group guides by industry
function groupGuidesByIndustry(guides: HowToBecomeGuide[]): Record<string, HowToBecomeGuide[]> {
  return guides.reduce((acc, guide) => {
    const industry = guide.industry || "other";
    if (!acc[industry]) {
      acc[industry] = [];
    }
    acc[industry].push(guide);
    return acc;
  }, {} as Record<string, HowToBecomeGuide[]>);
}

// Get industry display name
function getIndustryName(industryId: string): string {
  const industry = industries.find(i => i.id === industryId);
  return industry?.name || industryId.charAt(0).toUpperCase() + industryId.slice(1);
}

export default function HowToBecomeIndexPage() {
  const groupedGuides = groupGuidesByIndustry(howToBecomeGuides);
  const industryOrder = ['hospitality', 'industrial', 'retail', 'facilities', 'healthcare', 'events'];
  
  // Sort industries by order, putting any unlisted ones at the end
  const sortedIndustries = Object.keys(groupedGuides).sort((a, b) => {
    const indexA = industryOrder.indexOf(a);
    const indexB = industryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Calculate stats
  const totalGuides = howToBecomeGuides.length;
  const easyGuides = howToBecomeGuides.filter(g => g.difficulty === 'easy').length;
  const avgPayMin = Math.round(
    howToBecomeGuides.reduce((sum, g) => {
      const role = getRoleBySlug(g.roleSlug);
      return sum + (role?.avgHourlyRate.min || 14);
    }, 0) / totalGuides
  );
  const avgPayMax = Math.round(
    howToBecomeGuides.reduce((sum, g) => {
      const role = getRoleBySlug(g.roleSlug);
      return sum + (role?.avgHourlyRate.max || 20);
    }, 0) / totalGuides
  );

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "How to Become Guides" },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "How to Become Guides" },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm font-medium">{totalGuides} Career Guides</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                How to Become Career Guides
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Step-by-step guides to starting your career in hospitality, warehouse, retail, and more. 
                Learn requirements, get certified, and find your first job.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{totalGuides}</p>
                  <p className="text-white/80 text-sm">Career Guides</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{easyGuides}</p>
                  <p className="text-white/80 text-sm">No Experience Needed</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">${avgPayMin}-${avgPayMax}</p>
                  <p className="text-white/80 text-sm">Avg Hourly Pay</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-2xl font-bold">{sortedIndustries.length}</p>
                  <p className="text-white/80 text-sm">Industries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Browse by Industry</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortedIndustries.map(industryId => (
                <a
                  key={industryId}
                  href={`#${industryId}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${industryBgColors[industryId] || 'bg-gray-50 border-gray-200'} hover:shadow-md transition-shadow`}
                >
                  {industryIcons[industryId]}
                  <span className="font-medium">{getIndustryName(industryId)}</span>
                  <Badge variant="secondary" className="ml-1">
                    {groupedGuides[industryId].length}
                  </Badge>
                </a>
              ))}
            </div>
          </div>

          {/* Featured Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Most Popular Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howToBecomeGuides.slice(0, 6).map(guide => {
                const role = getRoleBySlug(guide.roleSlug);
                return (
                  <Link
                    key={guide.roleSlug}
                    href={`/how-to-become/${guide.roleSlug}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="outline" 
                            className={industryBgColors[guide.industry] || ''}
                          >
                            {getIndustryName(guide.industry)}
                          </Badge>
                          {guide.difficulty && (
                            <Badge className={difficultyColors[guide.difficulty]}>
                              {guide.difficulty}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          How to Become a {guide.roleTitle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {guide.overview?.slice(0, 120)}...
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          {guide.timeToStart && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {guide.timeToStart}
                            </span>
                          )}
                          {role && (
                            <span className="flex items-center gap-1 font-medium text-primary">
                              <DollarSign className="h-4 w-4" />
                              ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Guides by Industry */}
          {sortedIndustries.map(industryId => (
            <section key={industryId} id={industryId} className="mb-12 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${industryColors[industryId] || 'bg-gray-500'} text-white`}>
                  {industryIcons[industryId]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{getIndustryName(industryId)}</h2>
                  <p className="text-muted-foreground">
                    {groupedGuides[industryId].length} career guides
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedGuides[industryId].map(guide => {
                  const role = getRoleBySlug(guide.roleSlug);
                  return (
                    <Link
                      key={guide.roleSlug}
                      href={`/how-to-become/${guide.roleSlug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {guide.roleTitle}
                            </h3>
                            {guide.difficulty && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${difficultyColors[guide.difficulty]}`}
                              >
                                {guide.difficulty}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            {guide.timeToStart && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>Time to start: {guide.timeToStart}</span>
                              </div>
                            )}
                            {role && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr</span>
                              </div>
                            )}
                            {guide.totalCost && (
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>Cost: {guide.totalCost}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-4 border-t flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {guide.steps.length} steps
                            </span>
                            <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read Guide <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Link to industry page */}
              <div className="mt-4 text-center">
                <Link
                  href={`/career-hub/industries/${industryId}`}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Explore all {getIndustryName(industryId)} roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your New Career?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Pick a guide, learn the requirements, and start earning. 
              Many flexible positions require no prior experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/career-hub/tools/paycheck-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <DollarSign className="h-5 w-5" />
                Calculate Your Pay
              </Link>
              <Link
                href="/career-hub/for/students"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <GraduationCap className="h-5 w-5" />
                Guides for Students
              </Link>
            </div>
          </section>

          {/* Internal Links */}
          <InternalLinkHub variant="full" currentPage={{ type: "how-to-become" }} />
        </div>
      </div>
      <CTASection />
    </>
  );
}
