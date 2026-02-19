import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roles, industries } from "@/lib/data/roles";
import { payBrackets, getPayBracketBySlug, getJobsByPayBracket, getJobsInPayRange, type JobByPay } from "@/lib/data/jobs-by-pay";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { FAQSchema, WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { Award, MapPin, Zap } from "lucide-react";

// Map existing slug format to jobs-by-pay bracket IDs
const slugToBracketId: Record<string, string> = {
  "15-under": "under-15",
  "15-18": "15-17",
  "18-22": "17-20",
  "22-25": "20-25",
  "25-plus": "30-plus",
};

// Legacy pay ranges for backward compatibility
const payRanges = [
  { slug: "15-under", label: "$15/hr & Under", min: 0, max: 15, description: "Entry-level and flexible starting positions" },
  { slug: "15-18", label: "$15-$18/hr", min: 15, max: 18, description: "Solid starting wages for most industries" },
  { slug: "18-22", label: "$18-$22/hr", min: 18, max: 22, description: "Above average for skilled positions" },
  { slug: "22-25", label: "$22-$25/hr", min: 22, max: 25, description: "Premium wages for experienced workers" },
  { slug: "25-plus", label: "$25+/hr", min: 25, max: 100, description: "Top-tier positions with specialized skills" },
];

function getPayRange(slug: string) {
  return payRanges.find((r) => r.slug === slug);
}

function getRolesInRange(min: number, max: number) {
  return roles.filter((role) => {
    const avgRate = (role.avgHourlyRate.min + role.avgHourlyRate.max) / 2;
    return avgRate >= min && avgRate <= max;
  });
}

export function generateStaticParams() {
  return payRanges.map((range) => ({ range: range.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ range: string }>;
}): Promise<Metadata> {
  const { range } = await params;
  const payRange = getPayRange(range);

  if (!payRange) {
    return { title: "Pay Range Not Found" };
  }

  return {
    title: `Jobs Paying ${payRange.label} | Indeed Flex`,
    description: `Find flexible jobs paying ${payRange.label}. ${payRange.description}. Browse positions across hospitality, warehouse, retail, and more.`,
    keywords: [
      `jobs paying ${payRange.label}`,
      `${payRange.label} per hour jobs`,
      `hourly jobs ${payRange.label}`,
      "flexible work",
      "part time jobs",
    ],
  };
}

export default async function PayRangePage({
  params,
}: {
  params: Promise<{ range: string }>;
}) {
  const { range } = await params;
  const payRange = getPayRange(range);

  if (!payRange) {
    notFound();
  }

  // Get jobs from jobs-by-pay dataset
  const bracketId = slugToBracketId[range];
  const jobsByPayData = bracketId ? getJobsByPayBracket(bracketId) : getJobsInPayRange(payRange.min, payRange.max);
  
  // Also get roles for roles not in jobs-by-pay
  const rolesInRange = getRolesInRange(payRange.min, payRange.max);
  const roleSlugsInJobsByPay = new Set(jobsByPayData.map((j) => j.roleSlug));
  const additionalRoles = rolesInRange.filter((r) => !roleSlugsInJobsByPay.has(r.slug));

  // Group jobs by industry
  const jobsByIndustry = industries.map((industry) => {
    const industryJobs = jobsByPayData.filter((j) => j.industry === industry.id);
    const industryRoles = additionalRoles.filter((r) => r.industry === industry.id);
    return {
      industry,
      jobs: industryJobs,
      roles: industryRoles,
    };
  }).filter((group) => group.jobs.length > 0 || group.roles.length > 0);

  // Generate FAQs
  const sampleJobs = jobsByPayData.slice(0, 5).map((j) => j.roleTitle.toLowerCase());
  const sampleRoles = additionalRoles.slice(0, 3).map((r) => r.title.toLowerCase());
  const allSampleJobs = [...sampleJobs, ...sampleRoles].slice(0, 5);
  
  const faqs = [
    {
      question: `What jobs pay ${payRange.label}?`,
      answer: `Jobs paying ${payRange.label} include ${allSampleJobs.join(", ")}, and more. These positions are available across hospitality, warehouse, retail, and facilities management industries.`,
    },
    {
      question: `How can I find jobs paying ${payRange.label} near me?`,
      answer: `Download the Indeed Flex app to find ${payRange.label} jobs in your area. Filter by pay rate and choose shifts that fit your schedule.`,
    },
    {
      question: `Do ${payRange.label} jobs require experience?`,
      answer: `Many jobs in this pay range are entry-level or require minimal experience. Some higher-paying positions may prefer certifications or prior experience in the industry.`,
    },
    {
      question: `Can I get tips on top of ${payRange.label}?`,
      answer: `Hospitality positions like bartender, server, and barback often receive tips in addition to their base hourly rate, which can significantly increase total earnings.`,
    },
  ];

  const pageUrl = `https://indeedflex.com/career-hub/pay-range/${range}`;

  return (
    <>
      <WebPageSchema
        name={`Jobs Paying ${payRange.label}`}
        description={payRange.description}
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Jobs by Pay", url: "https://indeedflex.com/career-hub/pay-range" },
          { name: payRange.label },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Jobs by Pay" },
          { name: payRange.label },
        ]}
      />

      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Jobs by Pay", href: "/career-hub/pay-range/18-22" },
            { label: payRange.label },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-4">
                {jobsByPayData.length + additionalRoles.length} Positions Available
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Jobs Paying {payRange.label}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {payRange.description}. Find flexible positions across{" "}
                {jobsByIndustry.length} industries with schedules that fit your life.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a
                    href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Find {payRange.label} Jobs
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/career-hub/tools/pay-calculator">
                    Calculate Your Earnings
                  </Link>
                </Button>
              </div>
            </div>

            {/* Pay Range Navigation */}
            <Card className="w-full lg:w-80">
              <CardHeader>
                <CardTitle className="text-lg">Browse by Pay Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {payRanges.map((pr) => (
                  <Link
                    key={pr.slug}
                    href={`/career-hub/pay-range/${pr.slug}`}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      pr.slug === range
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <span className="font-medium">{pr.label}</span>
                    <span className="text-sm opacity-80">
                      {getRolesInRange(pr.min, pr.max).length} roles
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Jobs by Industry */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            {payRange.label} Jobs by Industry
          </h2>

          <div className="grid gap-6">
            {jobsByIndustry.map(({ industry, jobs, roles: industryRoles }) => (
              <Card key={industry.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${industry.color}`} />
                    {industry.name}
                    <Badge variant="outline" className="ml-auto">
                      {jobs.length + industryRoles.length} positions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Jobs from jobs-by-pay dataset (rich data) */}
                    {jobs.map((job) => {
                      const role = roles.find((r) => r.slug === job.roleSlug);
                      return (
                        <Link
                          key={job.roleSlug}
                          href={`/career-hub/roles/${job.roleSlug}`}
                          className="group"
                        >
                          <div className="p-4 border rounded-lg hover:border-primary transition-colors h-full flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {job.roleTitle}
                              </h3>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="font-medium">
                                  ${job.payRange.min}-${job.payRange.max}/hr
                                </span>
                                {job.tipsRange && (
                                  <Badge variant="secondary" className="text-xs">
                                    +${job.tipsRange.min}-${job.tipsRange.max} tips
                                  </Badge>
                                )}
                              </div>
                              {job.totalPotential && (
                                <p className="text-xs text-muted-foreground">
                                  Total: ${job.totalPotential.min}-${job.totalPotential.max}/hr
                                </p>
                              )}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {job.entryLevel && (
                                  <Badge variant="outline" className="text-xs">
                                    Entry Level
                                  </Badge>
                                )}
                                {job.requiresCertification && job.certifications && job.certifications.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    <Award className="w-3 h-3 mr-1" />
                                    Cert Required
                                  </Badge>
                                )}
                                <Badge
                                  variant={
                                    job.demandLevel === "very-high"
                                      ? "default"
                                      : job.demandLevel === "high"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {job.demandLevel === "very-high"
                                    ? "High Demand"
                                    : job.demandLevel === "high"
                                    ? "Good Demand"
                                    : "Moderate Demand"}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {job.flexibility === "high" ? "Very Flexible" : job.flexibility === "medium" ? "Flexible" : "Fixed"}
                                </Badge>
                              </div>
                              {job.topCities && job.topCities.length > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                  <MapPin className="w-3 h-3" />
                                  <span>Top cities: {job.topCities.slice(0, 3).join(", ")}</span>
                                </div>
                              )}
                              {job.whyThisPay && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                  {job.whyThisPay}
                                </p>
                              )}
                            </div>
                            {job.pathToHigherPay && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <TrendingUp className="w-3 h-3" />
                                  <span className="line-clamp-1">{job.pathToHigherPay}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                    {/* Additional roles not in jobs-by-pay */}
                    {industryRoles.map((role) => (
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
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
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

        {/* Benefits Section */}
        <section className="mb-12 bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Benefits of {payRange.label} Jobs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Choose shifts that work for your lifestyle
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Same Day Pay</h3>
                <p className="text-sm text-muted-foreground">
                  Access up to 50% of your earnings the same day
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Career Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Build experience and advance to higher-paying roles
                </p>
              </div>
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

        {/* Related Pay Ranges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Explore Other Pay Ranges
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {payRanges
              .filter((pr) => pr.slug !== range)
              .map((pr) => (
                <Link
                  key={pr.slug}
                  href={`/career-hub/pay-range/${pr.slug}`}
                  className="block p-4 border rounded-lg hover:border-primary transition-colors text-center"
                >
                  <p className="font-bold text-lg mb-1">{pr.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {getRolesInRange(pr.min, pr.max).length} roles
                  </p>
                </Link>
              ))}
          </div>
        </section>

        <DataSourceCitation pageType="role" />
        
        <div className="mt-8">
          <AuthorByline
            contentType="guide"
            lastUpdated={getLastUpdated(range, 'update')}
            variant="block"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub
          variant="full"
          currentPage={{ type: "pay-range" }}
        />
      </div>
      <CTASection />
    </>
  );
}

