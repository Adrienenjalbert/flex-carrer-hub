import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ChevronRight, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { howToBecomeGuides, getHowToBecomeBySlug } from "@/lib/data/how-to-become";
import { getRoleBySlug } from "@/lib/data/roles";
import { HowToSchema, FAQSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CTASection from "@/components/career-hub/CTASection";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

// Generate static params for all how-to-become guides
export function generateStaticParams() {
  return howToBecomeGuides.map((guide) => ({
    roleSlug: guide.roleSlug,
  }));
}

// Generate metadata for each guide
export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}): Promise<Metadata> {
  const { roleSlug } = await params;
  const guide = getHowToBecomeBySlug(roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const roleTitle = role?.title || guide.roleSlug.replace(/-/g, " ");

  const canonical = `https://indeedflex.com/how-to-become/${roleSlug}`;
  const title = `How to Become a ${roleTitle} - Complete Guide`;
  const description = `Learn how to become a ${roleTitle}. Step-by-step guide covering requirements, skills, certifications, and career path. ${guide.timeToStart || "Start your journey today."}`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: [
      `how to become a ${roleTitle}`,
      `${roleTitle} career`,
      `${roleTitle} requirements`,
      `${roleTitle} skills`,
      `${roleTitle} certification`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HowToBecomePage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const guide = getHowToBecomeBySlug(roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!guide) {
    notFound();
  }

  const roleTitle = role?.title || guide.roleTitle;

  // Generate FAQs
  const faqs = [
    {
      question: `How long does it take to become a ${roleTitle}?`,
      answer: guide.timeToStart || `The time varies depending on your background and the specific requirements, but most people can start working as a ${roleTitle} within a few weeks to months.`,
    },
    {
      question: `What qualifications do I need to become a ${roleTitle}?`,
      answer: role?.requirements?.join(". ") || `Requirements vary by employer, but typically include being at least 18 years old and having a strong work ethic.`,
    },
    {
      question: `How much does a ${roleTitle} make?`,
      answer: role 
        ? `${roleTitle}s typically earn $${role.avgHourlyRate.min} - $${role.avgHourlyRate.max} per hour${role.avgTips ? `, plus tips averaging $${role.avgTips.min}-$${role.avgTips.max}/hr` : ""}.`
        : `Earnings vary by location and experience. Use our salary calculator for estimates.`,
    },
  ];

  return (
    <>
      {/* Schema Markup */}
      <HowToSchema
        name={`How to Become a ${roleTitle}`}
        description={`Complete guide to becoming a ${roleTitle}, including requirements, skills, and career path.`}
        totalTime={guide.timeToStart}
        steps={guide.steps.map((step, i) => ({
          name: `Step ${i + 1}: ${step.title}`,
          text: step.description,
        }))}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "How to Become", url: "https://indeedflex.com/career-hub/guides" },
          { name: roleTitle },
        ]}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "How to Become", href: "/how-to-become" },
            { label: roleTitle },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <Badge variant="outline">Career Guide</Badge>
              {guide.timeToStart && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {guide.timeToStart}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">
              How to Become a {roleTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {guide.overview || `A complete guide to starting your career as a ${roleTitle}.`}
            </p>
          </div>

          {/* Salary Overview */}
          {role && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {roleTitle} Salary Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="text-2xl font-bold text-primary">
                      ${role.avgHourlyRate.min} - ${role.avgHourlyRate.max}/hr
                    </p>
                  </div>
                  {role.avgTips && (
                    <div>
                      <p className="text-sm text-muted-foreground">+ Tips</p>
                      <p className="text-2xl font-bold">
                        ${role.avgTips.min} - ${role.avgTips.max}/hr
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Steps to Become a {roleTitle}
            </h2>
            <div className="space-y-6">
              {guide.steps.map((step, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {i + 1}
                      </span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Tips:</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Requirements */}
          {role && role.requirements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {role.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i}>
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
          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Ready to Start Your {roleTitle} Career?
            </h2>
            <p className="text-muted-foreground mb-4">
              Find flexible {roleTitle} opportunities with Indeed Flex.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">Find Jobs</Button>
              {role && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/career-hub/roles/${role.slug}`}>
                    Learn More About This Role
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="guide"
          lastUpdated={getLastUpdated(roleSlug, 'guide')}
          variant="block"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "how-to-become", 
            role: roleSlug
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}

