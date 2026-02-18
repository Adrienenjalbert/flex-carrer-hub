import { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Rocket,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Star,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roles, industries } from "@/lib/data/roles";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { FAQSchema, WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";

export const metadata: Metadata = {
  title: "Entry Level Jobs - No Experience Required | Indeed Flex",
  description: "Find entry-level jobs that require no prior experience. Start your career with flexible positions in hospitality, warehouse, retail, and more. Apply today and work tomorrow.",
  keywords: [
    "entry level jobs",
    "no experience required",
    "jobs no experience",
    "first job",
    "beginner jobs",
    "starting jobs",
    "jobs for beginners",
  ],
};

// Filter roles that are entry-level friendly
function getEntryLevelRoles() {
  return roles.filter((role) => {
    // Check if any requirement mentions "no experience" or lacks experience requirement
    const hasLowExperienceReq = role.requirements.every(
      (req) =>
        !req.toLowerCase().includes("year") ||
        req.toLowerCase().includes("no experience") ||
        req.toLowerCase().includes("entry")
    );
    // Prioritize roles with "entry-level" flag or lower pay ranges (typically entry)
    return hasLowExperienceReq || role.avgHourlyRate.min <= 16;
  });
}

export default function EntryLevelPage() {
  const entryLevelRoles = getEntryLevelRoles();
  const rolesByIndustry = industries.map((industry) => ({
    industry,
    roles: entryLevelRoles.filter((r) => r.industry === industry.id),
  })).filter((group) => group.roles.length > 0);

  // Tips for getting your first job
  const tips = [
    {
      title: "Complete Your Profile",
      description: "Add a photo, bio, and list all relevant skills—even soft skills count!",
      icon: Target,
    },
    {
      title: "Start with Flexible Roles",
      description: "Positions like barback, food runner, and warehouse helper are perfect first jobs.",
      icon: Rocket,
    },
    {
      title: "Be Available",
      description: "Enable notifications and respond quickly to shift offers for better opportunities.",
      icon: Zap,
    },
    {
      title: "Build Your Rating",
      description: "Show up on time, work hard, and earn great ratings to unlock better shifts.",
      icon: Star,
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "What jobs can I get with no experience?",
      answer: `Entry-level positions like ${entryLevelRoles.slice(0, 5).map((r) => r.title.toLowerCase()).join(", ")} are available to workers with no prior experience. Many employers provide on-the-job training.`,
    },
    {
      question: "How do I start working with no experience?",
      answer: "Download the Indeed Flex app, create your profile, and browse available shifts. Many positions require no experience—just a willingness to learn and show up on time.",
    },
    {
      question: "How much do entry-level jobs pay?",
      answer: "Entry-level positions typically pay $12-18 per hour depending on the role and location. Some positions like barback or server include tips that can significantly increase earnings.",
    },
    {
      question: "Can entry-level jobs lead to a career?",
      answer: "Absolutely! Many managers and supervisors started in entry-level roles. Build experience, get certifications, and use Indeed Flex to advance your career.",
    },
    {
      question: "Do I need certifications for entry-level jobs?",
      answer: "Most entry-level positions don't require certifications. However, getting food handler or TIPS certification can open up more opportunities and higher-paying roles.",
    },
  ];

  const pageUrl = "https://indeedflex.com/career-hub/experience/entry-level";

  return (
    <>
      <WebPageSchema
        name="Entry Level Jobs - No Experience Required"
        description="Find entry-level jobs that require no prior experience. Start your career with flexible positions."
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Experience Level", url: "https://indeedflex.com/career-hub/experience" },
          { name: "Entry Level" },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Entry Level Jobs" },
        ]}
      />

      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Entry Level Jobs" },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10 text-primary" />
              <Badge variant="secondary" className="text-lg py-1">
                {entryLevelRoles.length}+ Beginner-Friendly Positions
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Entry Level Jobs — No Experience Required
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Start your career journey today. Find flexible positions that welcome
              beginners and provide on-the-job training. No resume needed.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a
                  href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Working Today
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/career-hub/guides/first-flex-job">
                  Read: Getting Your First Job
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits of Entry Level */}
        <section className="mb-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Start with Entry-Level Flex Work?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">No Experience Needed</h3>
              <p className="text-sm text-muted-foreground">
                Most positions welcome beginners with training provided
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Same Day Pay</h3>
              <p className="text-sm text-muted-foreground">
                Access up to 50% of your earnings the same day
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Build Experience</h3>
              <p className="text-sm text-muted-foreground">
                Develop skills that lead to higher-paying positions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Flexible Schedule</h3>
              <p className="text-sm text-muted-foreground">
                Work when you want, around school or other commitments
              </p>
            </div>
          </div>
        </section>

        {/* Roles by Industry */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Entry-Level Positions by Industry
          </h2>

          <div className="grid gap-6">
            {rolesByIndustry.map(({ industry, roles: industryRoles }) => (
              <Card key={industry.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${industry.color}`} />
                    {industry.name}
                    <Badge variant="outline" className="ml-2">
                      {industryRoles.length} positions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industryRoles.slice(0, 6).map((role) => (
                      <Link
                        key={role.slug}
                        href={`/career-hub/roles/${role.slug}`}
                        className="group"
                      >
                        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {role.title}
                            </h3>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {role.shortDescription}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips for Success */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Tips for Landing Your First Job
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Path Example */}
        <section className="mb-12 bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Your Career Path Starts Here
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-4 bg-background rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Start</p>
              <p className="font-bold">Barback / Food Runner</p>
              <p className="text-sm">$12-15/hr</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="flex-1 p-4 bg-background rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">6-12 Months</p>
              <p className="font-bold">Server / Bartender</p>
              <p className="text-sm">$15-25/hr + tips</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="flex-1 p-4 bg-background rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">2-3 Years</p>
              <p className="font-bold">Shift Lead</p>
              <p className="text-sm">$18-28/hr</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="flex-1 p-4 bg-primary/10 rounded-lg text-center border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-1">5+ Years</p>
              <p className="font-bold text-primary">Manager</p>
              <p className="text-sm">$45-60K/year</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Helpful Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/career-hub/guides/first-flex-job">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Getting Your First Flex Job</h3>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guide to landing your first shift
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/career-hub/guides/first-shift">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Your First Shift</h3>
                  <p className="text-sm text-muted-foreground">
                    What to expect and how to succeed
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/career-hub/tools/pay-calculator">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Pay Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    See how much you could earn
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <DataSourceCitation pageType="role" />
      </div>

      <CTASection />
    </>
  );
}

