import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  DollarSign,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Clock,
  Users,
  GraduationCap,
  Target,
  Scale,
  MessageSquare,
  BookOpen,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Badge available for future use
// import { Badge } from "@/components/ui/badge";
import { roles, getRoleBySlug, industries } from "@/lib/data/roles";
import { usLocations } from "@/lib/data/locations";
import { getDayInTheLife, getComparisonsForRole } from "@/lib/data/role-content";
import { resumeExamples } from "@/lib/data/resume-examples";
import { salaryByLocation } from "@/lib/data/salary-by-location";
import { generateComprehensiveFAQs } from "@/lib/faq-generator";
import { generateRoleMetadata } from "@/lib/seo/metadata";
import {
  FAQSchema,
  OccupationSchema,
  BreadcrumbSchema,
  JobPostingSchema,
  WebPageSchema,
} from "@/components/career-hub/seo";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import KeyFacts from "@/components/career-hub/KeyFacts";
import DayInTheLife from "@/components/career-hub/DayInTheLife";
import RoleComparisons from "@/components/career-hub/RoleComparisons";
import RelatedContent from "@/components/career-hub/RelatedContent";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import EarningsBreakdown from "@/components/career-hub/EarningsBreakdown";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import FlexerTestimonials from "@/components/career-hub/FlexerTestimonials";
import InlineCTA from "@/components/career-hub/InlineCTA";
import RolePageClient from "./RolePageClient";

// Generate static params for all roles
export function generateStaticParams() {
  return roles.map((role) => ({
    roleSlug: role.slug,
  }));
}

// Generate metadata for each role
export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}): Promise<Metadata> {
  const { roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);

  if (!role) {
    return { title: "Role Not Found" };
  }

  return generateRoleMetadata({
    title: role.title,
    slug: role.slug,
    description: role.description,
    industry: role.industry,
    salaryRange: role.avgHourlyRate,
  });
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const role = getRoleBySlug(roleSlug);

  if (!role) {
    notFound();
  }

  const industry = industries.find((i) => i.id === role.industry);
  const relatedRoles = roles
    .filter((r) => r.industry === role.industry && r.id !== role.id)
    .slice(0, 4);

  // Get Day in the Life and comparison content
  const dayInTheLife = getDayInTheLife(role.slug);
  const comparisons = getComparisonsForRole(role.slug);

  const pageUrl = `https://indeedflex.com/career-hub/roles/${role.slug}`;
  const pageDescription = `Learn how to become a ${role.title}. ${role.shortDescription}. Average pay: $${role.avgHourlyRate.min}-$${role.avgHourlyRate.max}/hr.`;

  // Generate comprehensive FAQs (10+)
  const comprehensiveFaqs = generateComprehensiveFAQs(role);
  const faqData = comprehensiveFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  // Get comparison data for salary chart
  const salaryComparisonRoles = roles
    .filter((r) => r.industry === role.industry)
    .slice(0, 6)
    .map((r) => ({
      name: r.title,
      minRate: r.avgHourlyRate.min,
      maxRate: r.avgHourlyRate.max,
      slug: r.slug,
    }));

  // Location comparison data
  const locationComparisonData = usLocations.slice(0, 5).map((l) => ({
    name: `${l.city}, ${l.stateCode}`,
    minRate: l.avgHourlyWage.min,
    maxRate: l.avgHourlyWage.max,
    slug: l.slug,
  }));

  const industryGuides: Record<string, { slug: string; title: string }[]> = {
    hospitality: [
      { slug: "hospitality-guide", title: "Breaking Into Hospitality Work" },
      { slug: "certifications", title: "Getting Certifications That Pay Off" },
    ],
    industrial: [
      { slug: "warehouse-guide", title: "Warehouse Work: What You Need to Know" },
      { slug: "certifications", title: "Getting Certifications That Pay Off" },
    ],
    retail: [
      { slug: "retail-guide", title: "Retail Jobs: Tips for Success" },
      { slug: "skill-boost", title: "Skills That Boost Your Hourly Rate" },
    ],
    facilities: [
      { slug: "facilities-guide", title: "Facilities and Cleaning Careers" },
      { slug: "certifications", title: "Getting Certifications That Pay Off" },
    ],
    events: [
      { slug: "event-staffing-guide", title: "Event Staffing: Concerts, Sports & More" },
      { slug: "first-flex-job", title: "Finding Flexible Work" },
    ],
    healthcare: [
      { slug: "certifications", title: "Getting Certifications That Pay Off" },
      { slug: "career-paths", title: "Career Paths for Hourly Workers" },
    ],
  };

  const industryTools: Record<string, { slug: string; title: string }[]> = {
    hospitality: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "cocktail-quiz", title: "Cocktail Quiz" },
    ],
    industrial: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "safety-first", title: "Safety First Quiz" },
    ],
    retail: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "shift-planner", title: "Shift Planner" },
    ],
    facilities: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "shift-planner", title: "Shift Planner" },
    ],
    events: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "shift-planner", title: "Shift Planner" },
    ],
    healthcare: [
      { slug: "pay-calculator", title: "Pay Calculator" },
      { slug: "career-path", title: "Career Path Explorer" },
    ],
  };

  const roleGuides = industryGuides[role.industry] || industryGuides.hospitality;
  const roleTools = industryTools[role.industry] || industryTools.hospitality;

  return (
    <>
      {/* Schema Markup */}
      <JobPostingSchema
        title={role.title}
        description={role.description}
        employmentType={["TEMPORARY", "PART_TIME", "CONTRACTOR"]}
        hiringOrganization={{
          name: "Indeed Flex",
          url: "https://indeedflex.com",
        }}
        baseSalary={{
          currency: "USD",
          minValue: role.avgHourlyRate.min,
          maxValue: role.avgHourlyRate.max,
          unitText: "HOUR",
        }}
        skills={role.skills}
        qualifications={role.requirements}
        responsibilities={role.responsibilities}
        industry={role.industry}
        directApply={true}
      />

      <OccupationSchema
        name={role.title}
        description={role.description}
        estimatedSalary={{
          currency: "USD",
          minValue: role.avgHourlyRate.min,
          maxValue: role.avgHourlyRate.max,
          unitText: "HOUR",
        }}
        occupationLocation={{ type: "Country", name: "United States" }}
        skills={role.skills}
        responsibilities={role.responsibilities}
        qualifications={role.requirements}
      />

      <FAQSchema questions={faqData} />

      <WebPageSchema
        name={`${role.title} Career Guide`}
        description={pageDescription}
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          {
            name: industry?.name || role.industry,
            url: `https://indeedflex.com/career-hub/industries/${role.industry}`,
          },
          { name: role.title },
        ]}
      />

      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          {
            name: industry?.name || role.industry,
            url: `https://indeedflex.com/career-hub/industries/${role.industry}`,
          },
          { name: role.title },
        ]}
      />

      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Industries", href: "/career-hub/industries" },
            {
              label: industry?.name || role.industry,
              href: `/career-hub/industries/${role.industry}`,
            },
            { label: role.title },
          ]}
        />
      </div>

      {/* Hero Section - Improved with more stats */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium capitalize">
                {role.industry}
              </span>
              <span className="bg-primary-foreground/10 text-primary-foreground/80 px-3 py-1 rounded-full text-sm">
                Temp & Flexible
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {role.title} Career Guide
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-3xl">
              {role.description} Temporary and part-time {role.title.toLowerCase()} shifts 
              pay ${role.avgHourlyRate.min}&ndash;${role.avgHourlyRate.max}/hr with flexible scheduling through Indeed Flex.
            </p>

            <div className="mb-8">
              <a
                href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors shadow-lg"
              >
                Find {role.title} Shifts
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                  <DollarSign className="h-4 w-4" />
                  Hourly Pay
                </div>
                <div className="text-2xl font-bold">
                  ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}
                </div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                  <Clock className="h-4 w-4" />
                  Schedule
                </div>
                <div className="text-2xl font-bold">Flexible</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                  <GraduationCap className="h-4 w-4" />
                  Experience
                </div>
                <div className="text-2xl font-bold">Entry-Level</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
                  <Target className="h-4 w-4" />
                  Growth
                </div>
                <div className="text-2xl font-bold">
                  {role.careerPath.length} Levels
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Attribution - E-E-A-T */}
      <div className="container mx-auto px-4 max-w-4xl mt-4">
        <AuthorByline contentType="role" variant="inline" />
      </div>

      {/* Key Facts - GEO Optimized */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <KeyFacts
            title={`Key Facts: ${role.title}`}
            facts={[
              {
                label: "Hourly Rate",
                value: `$${role.avgHourlyRate.min}-$${role.avgHourlyRate.max} per hour`,
              },
              {
                label: "Industry",
                value:
                  industry?.name ||
                  role.industry.charAt(0).toUpperCase() + role.industry.slice(1),
              },
              {
                label: "Experience",
                value:
                  role.requirements.find((r) =>
                    r.toLowerCase().includes("experience")
                  ) || "Entry-level positions available",
              },
              { label: "Key Skills", value: role.skills.slice(0, 3).join(", ") },
            ]}
            summary={
              <>
                Indeed Flex offers {role.title.toLowerCase()} positions paying $
                {role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr with
                flexible scheduling. {role.shortDescription}.{" "}
                <a
                  href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Apply through the Indeed Flex app
                </a>{" "}
                and start working within 48 hours. Use our{" "}
                <Link
                  href={`/paycheck-calculator/${role.slug}`}
                  className="text-primary hover:underline"
                >
                  Paycheck Calculator
                </Link>{" "}
                to estimate your take-home pay.
              </>
            }
          />
        </div>
      </section>

      {/* Main Content Grid - Core Information First */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Do */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    What You&apos;ll Do as a {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {role.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Skills Required */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills You&apos;ll Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These skills will help you succeed as a {role.title}. Don&apos;t
                    worry if you don&apos;t have all of them—many can be learned on
                    the job.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {role.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Career Path */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Career Growth Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Starting as a {role.title} can lead to exciting career
                    opportunities. Here&apos;s a typical progression:
                  </p>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
                    {role.careerPath.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 mb-6 last:mb-0 relative"
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
                            index === 0
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground border-2 border-background"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="font-semibold text-lg">{step.role}</div>
                          <div className="text-sm text-muted-foreground">
                            {step.years}
                          </div>
                        </div>
                        {index < role.careerPath.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    Explore your career progression with our{" "}
                    <Link
                      href="/career-hub/tools/career-path"
                      className="text-primary hover:underline font-medium"
                    >
                      Career Path Explorer
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <Card className="bg-primary text-primary-foreground sticky top-4">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">
                    Start Earning Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-primary-foreground/70">
                      Average Pay
                    </div>
                    <div className="text-xl font-bold">
                      ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70">
                      Industry
                    </div>
                    <div className="text-lg font-medium capitalize">
                      {role.industry}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70">
                      Career Growth
                    </div>
                    <div className="text-lg font-medium">
                      {role.careerPath.length} advancement levels
                    </div>
                  </div>
                  <p className="text-sm text-primary-foreground/80 pt-2">
                    Find {role.title.toLowerCase()} shifts near you. Choose your
                    schedule and start working within 48 hours.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      <DollarSign className="h-4 w-4" />
                      Get the App - It&apos;s Free
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Related Roles */}
              {relatedRoles.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Related Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {relatedRoles.map((related) => (
                        <li key={related.id}>
                          <Link
                            href={`/career-hub/roles/${related.slug}`}
                            className="flex items-center justify-between hover:text-primary transition-colors group"
                          >
                            <span className="group-hover:underline">
                              {related.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ${related.avgHourlyRate.min}-$
                              {related.avgHourlyRate.max}/hr
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Client Components */}
      <RolePageClient
        role={{
          title: role.title,
          slug: role.slug,
          industry: role.industry,
          avgHourlyRate: role.avgHourlyRate,
          avgTips: role.avgTips,
          skills: role.skills,
          requirements: role.requirements,
        }}
        salaryComparisonRoles={salaryComparisonRoles}
        locationComparisonData={locationComparisonData}
      />

      {/* Earnings Breakdown - Money Math */}
      <div className="container mx-auto px-4 max-w-4xl">
        <EarningsBreakdown
          roleTitle={role.title}
          hourlyRate={role.avgHourlyRate}
          tipRange={role.avgTips}
          industry={role.industry}
        />
      </div>

      {/* Day in the Life */}
      {dayInTheLife && (
        <DayInTheLife content={dayInTheLife} roleTitle={role.title} />
      )}

      {/* Role Comparisons */}
      {comparisons.length > 0 && (
        <section id="role-comparisons">
          <RoleComparisons comparisons={comparisons} currentRoleSlug={role.slug} />
        </section>
      )}

      {/* FAQ Section - Now with 10+ FAQs */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQSection
            faqs={comprehensiveFaqs}
            title={`Frequently Asked Questions About ${role.title} Jobs`}
            suppressSchema
          />
        </div>
      </section>

      {/* Progressive Engagement CTA */}
      <div className="container mx-auto px-4 max-w-4xl">
        <InlineCTA
          title={`Ready to start as a ${role.title}?`}
          subtitle="Browse available shifts and book your first one today"
          href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
          variant="app"
        />
      </div>

      {/* Explore More Section - Internal Linking for SEO */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Explore More About {role.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Interview Questions Link */}
            <Link href={`/interview-questions/${role.slug}`} className="block">
              <Card className="hover:border-primary/50 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Interview Questions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Practice common {role.title} interview questions and example
                    answers
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* How to Become Link */}
            <Link href={`/how-to-become/${role.slug}`} className="block">
              <Card className="hover:border-primary/50 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">How to Become</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guide to starting your {role.title} career
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Compare Roles Link */}
            {comparisons.length > 0 && (
              <Link href="#role-comparisons" className="block">
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Scale className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">Compare Roles</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      See how {role.title} compares to similar roles
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Resume Example Link */}
            {resumeExamples.some((e) => e.roleSlug === role.slug) && (
              <Link href={`/career-hub/resume-examples/${role.slug}`} className="block">
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{role.title} Resume Example</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      See a complete {role.title.toLowerCase()} resume with skills, summary, and experience bullets
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Salary by City Link */}
            {salaryByLocation.some((s) => s.roleSlug === role.slug) && (
              <Link href={`/career-hub/salary/${role.slug}`} className="block">
                <Card className="hover:border-primary/50 transition-colors h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">Salary by City</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Compare {role.title.toLowerCase()} pay across major US cities and metro areas
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Build Your Resume Link */}
            <a
              href="https://indeedflex.com/resume-builder/ai-resume-generator/build-your-resume/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:border-primary/50 transition-colors h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Build Your Resume</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Create a professional {role.title} resume with the free
                    Indeed Flex Resume Builder
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-Linking Section */}
      <RelatedContent
        currentRole={role.title}
        roles={relatedRoles.map((r) => ({
          title: r.title,
          slug: r.slug,
          pay: `$${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr`,
        }))}
        locations={usLocations.slice(0, 5).map((l) => ({
          name: `${l.city}, ${l.stateCode}`,
          slug: l.slug,
        }))}
        tools={roleTools.map((t) => ({
          title: t.title,
          slug: t.slug,
          description: `${t.title} for ${role.title} workers`,
        }))}
        guides={roleGuides.map((g) => ({
          title: g.title,
          slug: g.slug,
          readTime: "5 min",
        }))}
        variant="full"
      />

      {/* Internal Link Hub for SEO */}
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub
          variant="footer"
          currentPage={{ type: "role", role: role.slug, industry: role.industry }}
        />
      </div>

      {/* Data Source Citations for E-E-A-T */}
      <div className="container mx-auto px-4 max-w-4xl">
        <DataSourceCitation pageType="role" />
      </div>

      <FlexerTestimonials industry={role.industry} />

      <CTASection
        title={`Ready to Start as a ${role.title}?`}
        subtitle="Download Indeed Flex and find your first shift today. Most workers book their first shift within 48 hours."
      />
    </>
  );
}
