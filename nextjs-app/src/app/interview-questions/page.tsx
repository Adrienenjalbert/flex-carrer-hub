import { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, ArrowRight, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { interviewGuides } from "@/lib/data/interview-questions";

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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Career Hub", href: "/career-hub" },
          { label: "Interview Questions" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4" />
            <span>{interviewGuides.length} Interview Guides</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Interview Questions by Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with real interview questions and expert answers tailored to
            your target role. Get confident and land the job.
          </p>
        </div>

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
    </>
  );
}

