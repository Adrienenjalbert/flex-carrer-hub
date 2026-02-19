import { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { interviewGuides } from "@/lib/data/interview-questions";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Interview Questions by Role | Indeed Flex Career Hub",
  description:
    "Prepare for your next job interview with role-specific questions and expert answers. Free interview prep guides for hospitality, warehouse, retail, and more.",
  keywords: [
    "interview questions",
    "job interview prep",
    "interview tips",
    "common interview questions",
    "hospitality interview",
    "warehouse interview",
    "retail interview",
  ],
  alternates: {
    canonical: "https://indeedflex.com/interview-questions",
  },
  openGraph: {
    title: "Interview Questions by Role | Indeed Flex Career Hub",
    description: "Prepare for your next job interview with role-specific questions and expert answers.",
    url: "https://indeedflex.com/interview-questions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Questions by Role",
    description: "Prepare for your next job interview with role-specific questions and expert answers.",
  },
};

export default function InterviewQuestionsPage() {
  // Group guides by industry
  const guidesByIndustry = interviewGuides.reduce(
    (acc, guide) => {
      const industry = guide.industry || "other";
      if (!acc[industry]) acc[industry] = [];
      acc[industry].push(guide);
      return acc;
    },
    {} as Record<string, typeof interviewGuides>
  );

  const industryLabels: Record<string, string> = {
    hospitality: "Hospitality",
    industrial: "Industrial & Warehouse",
    retail: "Retail",
    facilities: "Facilities Management",
    other: "Other",
  };

  const sortedIndustries = Object.keys(guidesByIndustry).sort((a, b) => {
    const order = ["hospitality", "industrial", "retail", "facilities", "other"];
    return order.indexOf(a) - order.indexOf(b);
  });

  const totalQuestions = interviewGuides.reduce((sum, guide) => sum + guide.questions.length, 0);

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Interview Questions" },
          ]}
        />
      </div>
      <PageHero
        title="Interview Questions by Role"
        description="Practice with real interview questions and expert answers tailored to your target role. Get confident and land the job."
        stats={[
          { value: interviewGuides.length.toString(), label: "Interview Guides" },
          { value: totalQuestions.toString(), label: "Total Questions" },
          { value: sortedIndustries.length.toString(), label: "Industries" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">

        {/* Guides by Industry */}
        <div className="space-y-10">
          {sortedIndustries.map((industry) => {
            const guides = guidesByIndustry[industry];
            return (
              <section key={industry}>
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {industryLabels[industry] || industry}
                  </h2>
                  <Badge variant="secondary">{guides.length} roles</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {guides.map((guide) => (
                    <Link
                      key={guide.roleSlug}
                      href={`/interview-questions/${guide.roleSlug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-md transition-all duration-300 border-border/50 group-hover:border-accent/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg group-hover:text-accent transition-colors">
                              {guide.roleTitle}
                            </CardTitle>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3.5 w-3.5" />
                              {guide.questions.length} questions
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "interview" }} />
      </div>
      <CTASection />
    </>
  );
}

