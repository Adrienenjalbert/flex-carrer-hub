import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageSquare, ChevronRight, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { interviewGuides, getInterviewGuideBySlug } from "@/lib/data/interview-questions";
import { getRoleBySlug } from "@/lib/data/roles";
import { FAQSchema, ArticleSchema, BreadcrumbSchema } from "@/components/career-hub/seo";

// Generate static params for all interview guides
export function generateStaticParams() {
  return interviewGuides.map((guide) => ({
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
  const guide = getInterviewGuideBySlug(roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const roleTitle = role?.title || guide.roleTitle;

  return {
    title: `${roleTitle} Interview Questions & Answers`,
    description: `Prepare for your ${roleTitle} interview with ${guide.questions.length}+ common questions and expert answers. Tips to ace your interview.`,
    keywords: [
      `${roleTitle} interview questions`,
      `${roleTitle} interview`,
      `${roleTitle} interview tips`,
      `${roleTitle} job interview`,
    ],
    alternates: {
      canonical: `https://indeedflex.com/interview-questions/${roleSlug}`,
    },
  };
}

export default async function InterviewQuestionsPage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const guide = getInterviewGuideBySlug(roleSlug);
  const role = getRoleBySlug(roleSlug);

  if (!guide) {
    notFound();
  }

  const roleTitle = role?.title || guide.roleTitle;

  return (
    <>
      {/* Schema Markup */}
      <ArticleSchema
        headline={`${roleTitle} Interview Questions & Answers`}
        description={`Complete guide to ${roleTitle} interview questions with expert answers.`}
        datePublished={new Date().toISOString().split("T")[0]}
        author={{ name: "Indeed Flex Career Team" }}
        publisher={{
          name: "Indeed Flex",
          url: "https://indeedflex.com",
          logo: "https://indeedflex.com/logo.png",
        }}
        mainEntityOfPage={`https://indeedflex.com/interview-questions/${roleSlug}`}
        articleSection="Career Guides"
        keywords={[
          `${roleTitle} interview`,
          "interview questions",
          "job interview",
        ]}
      />
      <FAQSchema
        questions={guide.questions.slice(0, 10).map((q) => ({
          question: q.question,
          answer: q.sampleAnswer,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Interview Prep", url: "https://indeedflex.com/career-hub/guides" },
          { name: `${roleTitle} Questions` },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">
              Career Hub
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/guides" className="hover:text-primary">
              Guides
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{roleTitle} Interview</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <Badge variant="outline">Interview Prep</Badge>
              <Badge variant="secondary">
                {guide.questions.length} Questions
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {roleTitle} Interview Questions & Answers
            </h1>
            <p className="text-xl text-muted-foreground">
              Prepare for your {roleTitle} interview with these common questions
              and expert answers.
            </p>
          </div>

          {/* Quick Tips */}
          {guide.proTips && guide.proTips.length > 0 && (
            <Card className="mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.proTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Questions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Common {roleTitle} Interview Questions
            </h2>
            <div className="space-y-6">
              {guide.questions.map((q, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {i + 1}
                      </span>
                      {q.type && (
                        <Badge variant="outline" className="text-xs">
                          {q.type}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{q.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary mb-2">
                        Sample Answer:
                      </p>
                      <p className="text-muted-foreground">{q.sampleAnswer}</p>
                    </div>
                    {q.tips && q.tips.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Pro Tip:</p>
                        <p className="text-sm text-muted-foreground">{q.tips[0]}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {role && (
                <Link href={`/career-hub/roles/${role.slug}`}>
                  <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <p className="font-semibold">{roleTitle} Career Guide</p>
                      <p className="text-sm text-muted-foreground">
                        Learn about salary, requirements, and career path
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )}
              <Link href={`/how-to-become/${roleSlug}`}>
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <p className="font-semibold">How to Become a {roleTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guide to starting your career
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Ready for Your {roleTitle} Interview?
            </h2>
            <p className="text-muted-foreground mb-4">
              Find {roleTitle} opportunities with Indeed Flex.
            </p>
            <Button size="lg">Find Jobs</Button>
          </div>
        </div>
      </div>
    </>
  );
}

