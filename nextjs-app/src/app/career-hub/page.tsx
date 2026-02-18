import { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/career-hub/HeroSection";
import IndustryCard from "@/components/career-hub/IndustryCard";
import ToolCard from "@/components/career-hub/ToolCard";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import GuidesCategorySection from "@/components/career-hub/GuidesCategorySection";
import FinancialTipsSection from "@/components/career-hub/FinancialTipsSection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import PrimaryActions from "@/components/career-hub/PrimaryActions";
import QuickSearch from "@/components/career-hub/QuickSearch";
import SectionHeader from "@/components/career-hub/SectionHeader";
import ContentGrid from "@/components/career-hub/ContentGrid";
import { usLocations } from "@/lib/data/locations";
import { roles } from "@/lib/data/roles";
import { guideArticles } from "@/lib/data/articles/guides";
import { 
  MapPin, 
  BadgeCheck, 
  ChevronRight, 
  GraduationCap, 
  RefreshCw, 
  Clock, 
  Users, 
  Briefcase,
  FileText,
  UserCheck,
  ArrowRight,
  BookOpen,
  Calculator,
  Target,
  TrendingUp,
  Wallet,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Career Hub | Indeed Flex - Jobs, Salary Guides & Career Tools",
  description:
    "Find flexible hourly jobs in hospitality, warehouse, retail & more. Free pay calculators, salary guides, resume templates and career resources for workers across the US.",
  keywords: [
    "flexible work",
    "temp jobs",
    "indeed flex",
    "career resources",
    "hourly jobs",
    "gig work",
    "warehouse jobs",
    "hospitality jobs",
    "pay calculator",
    "salary guide",
    "resume template",
  ],
  openGraph: {
    title: "Career Hub | Indeed Flex - Jobs, Salary Guides & Career Tools",
    description: "Free pay calculators, salary guides, resume templates and career resources for hourly workers across the US.",
    url: "https://indeedflex.com/career-hub",
    type: "website",
    images: [
      {
        url: "https://indeedflex.com/og-career-hub.png",
        width: 1200,
        height: 630,
        alt: "Indeed Flex Career Hub - Jobs & Career Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Hub | Indeed Flex",
    description: "Free pay calculators, salary guides, and career resources for hourly workers.",
  },
  alternates: {
    canonical: "https://indeedflex.com/career-hub",
  },
};

// Indeed Flex active markets (from official website)
const ACTIVE_MARKET_CITIES = [
  "Austin",
  "Dallas",
  "Houston", // Texas
  "Nashville", // Tennessee
  "Atlanta",
  "Cartersville", // Georgia
  "Cincinnati",
  "Cleveland",
  "Columbus", // Ohio
  "Ontario", // California
  "Chicago", // Illinois
  "Washington", // DC
  "Las Vegas",
  "Reno", // Nevada
  "Charlotte", // North Carolina
  "Bentonville", // Arkansas
  "Fort Mill", // South Carolina
  "Orlando", // Florida
  "Phoenix", // Arizona
];

const industries = [
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Bartending, serving, kitchen work, and more in restaurants, bars, and hotels.",
    roleCount: roles.filter((r) => r.industry === "hospitality").length,
    icon: "UtensilsCrossed" as const,
  },
  {
    id: "industrial",
    name: "Industrial & Warehouse",
    description:
      "Picking, packing, forklift operation, and delivery across distribution centers.",
    roleCount: roles.filter((r) => r.industry === "industrial").length,
    icon: "Warehouse" as const,
  },
  {
    id: "retail",
    name: "Retail",
    description:
      "Customer service, merchandising, and sales in stores and shopping centers.",
    roleCount: roles.filter((r) => r.industry === "retail").length,
    icon: "ShoppingBag" as const,
  },
  {
    id: "facilities",
    name: "Facilities Management",
    description:
      "Cleaning, housekeeping, and maintenance in commercial and hospitality venues.",
    roleCount: roles.filter((r) => r.industry === "facilities").length,
    icon: "Building2" as const,
  },
];

const tools = [
  {
    title: "Paycheck Calculator",
    description:
      "Calculate your weekly and monthly take-home pay after taxes for any US state.",
    icon: Calculator,
    href: "/career-hub/tools/paycheck-calculator",
    featured: true,
    popular: true,
  },
  {
    title: "Shift Planner",
    description:
      "Plan your earnings based on shifts per week, hourly rate, and expected tips.",
    icon: Clock,
    href: "/career-hub/tools/shift-planner",
    popular: true,
  },
  {
    title: "Career Path Explorer",
    description:
      "Visualize your career progression from entry-level to management roles.",
    icon: Target,
    href: "/career-hub/tools/career-path",
  },
  {
    title: "Cost of Living",
    description:
      "Compare expenses between cities to find where your money goes furthest.",
    icon: MapPin,
    href: "/career-hub/tools/cost-of-living",
  },
  {
    title: "Tax Calculator",
    description:
      "Estimate your federal and state tax obligations based on your income.",
    icon: Wallet,
    href: "/career-hub/tools/tax-calculator",
    popular: true,
  },
  {
    title: "Skills Analyzer",
    description:
      "Assess your skills and identify areas for growth and certification.",
    icon: TrendingUp,
    href: "/career-hub/tools/skills-analyzer",
  },
];

// Get popular guides (most viewed/important)
const popularGuides = [
  { slug: "first-flex-job", title: "How to Get Your First Flexible Job", readTime: "5 min", description: "A step-by-step guide to landing your first flexible job with Indeed Flex" },
  { slug: "i9-complete-guide", title: "Form I-9 Explained: Complete Guide", readTime: "12 min", description: "Everything you need to know about Form I-9 and work authorization" },
  { slug: "career-paths", title: "From Entry-Level to Management", readTime: "12 min", description: "Visualize your career progression and plan your growth path" },
  { slug: "certifications", title: "Getting Certifications That Pay Off", readTime: "8 min", description: "Discover which certifications boost your hourly rate the most" },
].map(g => ({
  ...g,
  ...guideArticles[g.slug],
  description: g.description || guideArticles[g.slug]?.description || "Read this guide to learn more",
}));

const homeFAQs = [
  {
    question: "What is Indeed Flex?",
    answer:
      "Indeed Flex is a flexible staffing platform that connects workers with temporary and flexible shifts in hospitality, warehouse, retail, and facilities management. You choose when and where you work.",
  },
  {
    question: "How do I get started with flexible work?",
    answer:
      "Download the Indeed Flex app (https://indeedflex.onelink.me/4jvh/x7l4jms3), create a profile, verify your identity, and browse available shifts in your area. You can start picking up shifts as soon as you're approved.",
  },
  {
    question: "What types of jobs are available?",
    answer:
      "Indeed Flex offers roles across four main industries: hospitality (bartending, serving, kitchen work), industrial (warehouse, delivery), retail (sales, merchandising), and facilities management (cleaning, housekeeping).",
  },
  {
    question: "How much can I earn with flexible work?",
    answer:
      "Earnings vary by role and location. Hourly rates typically range from $12-25/hour, with many roles offering tips that can significantly increase total earnings. Use our Pay Calculator to estimate your potential income.",
  },
  {
    question: "Do I need experience to get started?",
    answer:
      "Many entry-level roles require no prior experience. Employers provide on-the-job training. Having relevant experience or certifications can help you access higher-paying shifts.",
  },
];

// Get active Indeed Flex markets from locations
const activeMarkets = usLocations.filter((loc) =>
  ACTIVE_MARKET_CITIES.includes(loc.city)
);

// Persona categories for targeted audiences
const personaCategories = [
  { 
    id: "students", 
    name: "Students", 
    slug: "students", 
    icon: GraduationCap,
    tagline: "Flexible schedules for busy students",
    description: "Balance classes with work. Find shifts that fit around your schedule.", 
    color: "bg-blue-500",
    stats: "Part-time & weekend shifts"
  },
  { 
    id: "career-changers", 
    name: "Career Changers", 
    slug: "career-changers", 
    icon: RefreshCw,
    tagline: "Start fresh in a new industry",
    description: "Explore new fields, gain experience, and build transferable skills.", 
    color: "bg-purple-500",
    stats: "Entry-level opportunities"
  },
  { 
    id: "gig-workers", 
    name: "Gig Workers", 
    slug: "gig-workers", 
    icon: Clock,
    tagline: "Maximize your earning potential",
    description: "Pick up extra shifts and diversify your income streams.", 
    color: "bg-green-500",
    stats: "Same-week pay available"
  },
  { 
    id: "parents", 
    name: "Parents", 
    slug: "parents", 
    icon: Users,
    tagline: "Work around family schedules",
    description: "Find flexible shifts that fit your childcare and family needs.", 
    color: "bg-orange-500",
    stats: "Daytime & school-hour shifts"
  },
];

// Job Application Toolkit highlights
const jobApplicationHighlights = [
  { title: "Resume Templates", count: 6, description: "ATS-friendly formats", href: "/career-hub/templates", icon: FileText },
  { title: "Cover Letters", count: 6, description: "Industry-specific", href: "/career-hub/cover-letters", icon: Briefcase },
  { title: "Resume Examples", count: 23, description: "Role-specific content", href: "/career-hub/resume-examples", icon: UserCheck },
];

// CollectionPage structured data for rich search results
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://indeedflex.com/career-hub/#webpage",
  name: "Indeed Flex Career Hub",
  description:
    "Find flexible hourly jobs in hospitality, warehouse, retail & more. Free pay calculators, salary guides, resume templates and career resources for workers across the US.",
  url: "https://indeedflex.com/career-hub",
  isPartOf: { "@id": "https://indeedflex.com/#website" },
  about: {
    "@type": "Thing",
    name: "Flexible Work Career Resources",
  },
  publisher: { "@id": "https://indeedflex.com/#organization" },
  inLanguage: "en-US",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Explore Jobs", url: "https://indeedflex.com/career-hub/roles" },
      { "@type": "ListItem", position: 2, name: "Career Tools", url: "https://indeedflex.com/career-hub/tools" },
      { "@type": "ListItem", position: 3, name: "Career Guides", url: "https://indeedflex.com/career-hub/guides" },
      { "@type": "ListItem", position: 4, name: "Application Toolkit", url: "https://indeedflex.com/career-hub/job-application-toolkit" },
      { "@type": "ListItem", position: 5, name: "Financial Resources", url: "https://indeedflex.com/career-hub/financial-tips" },
    ],
  },
};

export default function CareerHubHome() {
  return (
    <>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <HeroSection />

      {/* Quick Search Section */}
      <section className="py-8 bg-secondary border-b border-border/50">
        <div className="container mx-auto px-4">
          <QuickSearch />
        </div>
      </section>

      {/* Primary Actions */}
      <PrimaryActions />

      {/* Persona Section - Resources For You */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Resources For You"
              description="Tailored guides and resources based on your situation. Find the help you need."
              icon={<Users className="h-6 w-6" />}
            />
            <ContentGrid columns={4} gap="md">
              {personaCategories.map((persona) => {
                const Icon = persona.icon;
                return (
                  <Link
                    key={persona.id}
                    href={`/career-hub/for/${persona.slug}`}
                    className="group bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`${persona.color} p-4 text-white`}>
                      <Icon className="h-8 w-8 mb-2" />
                      <h3 className="font-bold text-lg">{persona.name}</h3>
                      <p className="text-white/80 text-sm">{persona.tagline}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground text-sm mb-3">{persona.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary">{persona.stats}</span>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ContentGrid>
          </div>
        </div>
      </section>

      {/* Job Application Toolkit Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Left side - CTA */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Free Resources</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Job Application Toolkit
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Everything you need to land your next job: resume templates, 
                  cover letters, and real examples for hourly workers.
                </p>
                <Link
                  href="/career-hub/job-application-toolkit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Right side - Resource cards */}
              <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
                {jobApplicationHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group bg-card rounded-xl p-6 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{item.count}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover flexible work opportunities across multiple industries.
              Find the right fit for your skills and schedule.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <IndustryCard key={industry.id} {...industry} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Popular Guides"
              description="Start here with our most helpful career resources"
              action={{ label: "View all guides", href: "/career-hub/guides" }}
              icon={<BookOpen className="h-6 w-6" />}
            />
            <ContentGrid columns={4} gap="md">
              {popularGuides.map((guide) => (
                <Link key={guide.slug} href={`/career-hub/guides/${guide.slug}`}>
                  <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                    <CardHeader className="pb-2">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-2">
                        {guide.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.readTime} read</span>
                        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </ContentGrid>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Free Career Tools"
              description="Use our interactive tools to plan your career, calculate earnings, and compare cities"
              action={{ label: "View all 19 tools", href: "/career-hub/tools" }}
              icon={<Calculator className="h-6 w-6" />}
            />
            <ContentGrid columns={3} gap="md">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.title} href={tool.href}>
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </ContentGrid>
          </div>
        </div>
      </section>

      {/* Career Guides Section */}
      <GuidesCategorySection />

      {/* Financial Tips Section */}
      <FinancialTipsSection />

      {/* Active Markets Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Indeed Flex Active Markets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find flexible work opportunities in these cities where Indeed Flex
              is currently operating.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {activeMarkets.slice(0, 8).map((location) => (
              <Link
                key={location.id}
                href={`/career-hub/locations/${location.slug}`}
                className="group bg-card rounded-xl p-4 border border-border/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                      {location.city}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {location.stateCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <BadgeCheck className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    Active Market
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {activeMarkets.length > 8 && (
            <div className="text-center mt-8">
              <Link
                href="/career-hub/locations"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View all {activeMarkets.length} active markets
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQSection faqs={homeFAQs} />
        </div>
      </section>

      {/* Internal Link Hub for SEO */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <InternalLinkHub variant="full" currentPage={{ type: "guide" }} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
