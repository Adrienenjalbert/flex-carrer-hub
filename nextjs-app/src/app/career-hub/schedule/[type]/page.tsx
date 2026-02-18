import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Sun,
  Moon,
  Calendar,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Star,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roles, industries } from "@/lib/data/roles";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { FAQSchema, WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";

// Define schedule types
const scheduleTypes = [
  {
    slug: "weekend-only",
    label: "Weekend Only Jobs",
    shortLabel: "Weekends",
    icon: "Calendar",
    description: "Flexible positions available on Saturdays and Sundays",
    industries: ["hospitality", "events", "retail"],
    benefits: ["Keep weekdays free", "Higher weekend rates", "Perfect for students"],
  },
  {
    slug: "evening-shifts",
    label: "Evening Shift Jobs",
    shortLabel: "Evenings",
    icon: "Moon",
    description: "Work in the evening hours, typically 4pm-midnight",
    industries: ["hospitality", "industrial"],
    benefits: ["Free daytime hours", "Night differentials", "Less traffic commute"],
  },
  {
    slug: "morning-shifts",
    label: "Morning Shift Jobs",
    shortLabel: "Mornings",
    icon: "Sun",
    description: "Early start positions, typically 6am-2pm",
    industries: ["industrial", "healthcare", "facilities"],
    benefits: ["Afternoons free", "Consistent schedule", "Beat the rush hour"],
  },
  {
    slug: "overnight",
    label: "Overnight Jobs",
    shortLabel: "Overnight",
    icon: "Moon",
    description: "Night shift positions, typically 10pm-6am",
    industries: ["industrial", "healthcare"],
    benefits: ["Night shift premium", "Quieter work environment", "Daytime flexibility"],
  },
  {
    slug: "flexible",
    label: "Flexible Schedule Jobs",
    shortLabel: "Flexible",
    icon: "Clock",
    description: "Choose your own hours and work when you want",
    industries: ["hospitality", "retail", "industrial", "events"],
    benefits: ["Complete control", "Multiple shifts available", "Work-life balance"],
  },
];

function getScheduleType(slug: string) {
  return scheduleTypes.find((s) => s.slug === slug);
}

function getRolesForSchedule(industryIds: string[]) {
  return roles.filter((role) => industryIds.includes(role.industry));
}

export function generateStaticParams() {
  return scheduleTypes.map((s) => ({ type: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const scheduleType = getScheduleType(type);

  if (!scheduleType) {
    return { title: "Schedule Type Not Found" };
  }

  return {
    title: `${scheduleType.label} | Indeed Flex`,
    description: `Find ${scheduleType.label.toLowerCase()}. ${scheduleType.description}. Choose shifts that fit your life with Indeed Flex.`,
    keywords: [
      scheduleType.label.toLowerCase(),
      `${scheduleType.shortLabel.toLowerCase()} jobs`,
      "flexible schedule jobs",
      "part time work",
      "choose your hours",
    ],
  };
}

export default async function ScheduleTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const scheduleType = getScheduleType(type);

  if (!scheduleType) {
    notFound();
  }

  const rolesForSchedule = getRolesForSchedule(scheduleType.industries);
  const rolesByIndustry = industries
    .filter((ind) => scheduleType.industries.includes(ind.id))
    .map((industry) => ({
      industry,
      roles: rolesForSchedule.filter((r) => r.industry === industry.id),
    }))
    .filter((group) => group.roles.length > 0);

  // Generate FAQs
  const faqs = [
    {
      question: `What ${scheduleType.label.toLowerCase()} are available?`,
      answer: `${scheduleType.label} include positions in ${scheduleType.industries.map((i) => i.replace("-", " ")).join(", ")} industries. Common roles include ${rolesForSchedule.slice(0, 5).map((r) => r.title.toLowerCase()).join(", ")}, and more.`,
    },
    {
      question: `How do I find ${scheduleType.label.toLowerCase()} near me?`,
      answer: `Download the Indeed Flex app to browse ${scheduleType.label.toLowerCase()} in your area. Filter by schedule preference and book shifts that match your availability.`,
    },
    {
      question: `Do ${scheduleType.label.toLowerCase()} pay more?`,
      answer: scheduleType.slug === "overnight" || scheduleType.slug === "evening-shifts"
        ? "Yes! Many evening and overnight positions offer shift differentials of $1-3 per hour more than daytime shifts."
        : "Pay varies by role and employer. Weekend and evening shifts sometimes offer premium rates due to higher demand.",
    },
    {
      question: `Can I work ${scheduleType.shortLabel.toLowerCase()} as a second job?`,
      answer: `Absolutely! Many Indeed Flex workers use ${scheduleType.label.toLowerCase()} to supplement their primary income. You control when and how often you work.`,
    },
  ];

  const pageUrl = `https://indeedflex.com/career-hub/schedule/${type}`;

  const IconComponent = scheduleType.icon === "Sun" ? Sun : 
                        scheduleType.icon === "Moon" ? Moon : 
                        scheduleType.icon === "Calendar" ? Calendar : Clock;

  return (
    <>
      <WebPageSchema
        name={scheduleType.label}
        description={scheduleType.description}
        url={pageUrl}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Jobs by Schedule", url: "https://indeedflex.com/career-hub/schedule/flexible" },
          { name: scheduleType.label },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Jobs by Schedule" },
          { name: scheduleType.label },
        ]}
      />

      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Jobs by Schedule", href: "/career-hub/schedule/flexible" },
            { label: scheduleType.label },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <IconComponent className="w-8 h-8 text-primary" />
                <Badge variant="secondary">
                  {rolesForSchedule.length} Positions
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {scheduleType.label}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {scheduleType.description}. Find shifts that fit your lifestyle
                and earn on your own terms.
              </p>

              {/* Benefits Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {scheduleType.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a
                    href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Find {scheduleType.shortLabel} Shifts
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/career-hub/tools/shift-planner">
                    Plan Your Schedule
                  </Link>
                </Button>
              </div>
            </div>

            {/* Schedule Type Navigation */}
            <Card className="w-full lg:w-80">
              <CardHeader>
                <CardTitle className="text-lg">Browse by Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {scheduleTypes.map((st) => {
                  const Icon = st.icon === "Sun" ? Sun : 
                               st.icon === "Moon" ? Moon : 
                               st.icon === "Calendar" ? Calendar : Clock;
                  return (
                    <Link
                      key={st.slug}
                      href={`/career-hub/schedule/${st.slug}`}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        st.slug === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{st.shortLabel}</span>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Roles by Industry */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            {scheduleType.shortLabel} Positions by Industry
          </h2>

          <div className="grid gap-6">
            {rolesByIndustry.map(({ industry, roles: industryRoles }) => (
              <Card key={industry.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${industry.color}`} />
                    {industry.name}
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
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose This Schedule */}
        <section className="mb-12 bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Why Choose {scheduleType.shortLabel} Work?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {scheduleType.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{benefit}</h3>
                  <p className="text-sm text-muted-foreground">
                    {scheduleType.shortLabel} shifts give you the flexibility to
                    balance work with your other commitments.
                  </p>
                </div>
              </div>
            ))}
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

        <DataSourceCitation pageType="role" />
      </div>

      <CTASection />
    </>
  );
}

