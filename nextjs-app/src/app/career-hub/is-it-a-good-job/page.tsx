import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle, HelpCircle, TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { careerEvaluations } from "@/lib/data/career-evaluations";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Is It a Good Job? Career Evaluations | Indeed Flex Career Hub",
  description: "Honest career evaluations: Is bartending a good job? Is warehouse work worth it? Get real pros, cons, and verdicts for flexible work roles.",
  keywords: [
    "is bartending a good job",
    "is warehouse work worth it",
    "career evaluation",
    "job pros and cons",
    "flexible work reviews",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/is-it-a-good-job",
  },
  openGraph: {
    title: "Is It a Good Job? Career Evaluations",
    description: "Honest career evaluations with pros, cons, and real talk for flexible work roles.",
    url: "https://indeedflex.com/career-hub/is-it-a-good-job",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is It a Good Job? Career Evaluations",
    description: "Honest career evaluations with pros, cons, and real talk.",
  },
};

const verdictConfig = {
  excellent: { icon: CheckCircle, color: "text-green-600", label: "Excellent" },
  good: { icon: CheckCircle, color: "text-blue-600", label: "Good" },
  depends: { icon: AlertCircle, color: "text-yellow-600", label: "Depends" },
  challenging: { icon: XCircle, color: "text-orange-600", label: "Challenging" },
};

export default function IsItAGoodJobListingPage() {
  return (
    <>
      <WebPageSchema
        name="Is It a Good Job? Career Evaluations"
        description="Honest career evaluations for flexible work roles"
        url="https://indeedflex.com/career-hub/is-it-a-good-job"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Is It a Good Job?" },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Is It a Good Job?" },
        ]}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Is It a Good Job?" },
          ]}
        />
      </div>

      <PageHero
        title="Is It a Good Job? Honest Career Evaluations"
        description="Get real pros, cons, and verdicts for flexible work roles. We break down pay potential, work-life balance, growth opportunities, and more."
        stats={[
          { value: careerEvaluations.length.toString(), label: "Roles Evaluated" },
          { value: "8", label: "Evaluation Criteria" },
          { value: "100%", label: "Honest Reviews" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerEvaluations.map((evaluation) => {
              const verdictInfo = verdictConfig[evaluation.verdict];
              const VerdictIcon = verdictInfo.icon;

              return (
                <Link
                  key={evaluation.roleSlug}
                  href={`/career-hub/is-it-a-good-job/${evaluation.roleSlug}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-xl">
                          Is {evaluation.roleTitle} a Good Job?
                        </CardTitle>
                        <VerdictIcon className={`h-6 w-6 ${verdictInfo.color} flex-shrink-0`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{verdictInfo.label}</Badge>
                        <Badge variant="secondary">
                          Score: {evaluation.overallScore}/10
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-2">
                        {evaluation.verdictSummary}
                      </CardDescription>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>Pay: {evaluation.scores.payPotential}/10</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Flexibility: {evaluation.scores.flexibility}/10</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>Growth: {evaluation.scores.growthOpportunity}/10</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                          {evaluation.pros.length} pros • {evaluation.cons.length} cons
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub
          variant="full"
          currentPage={{ type: "generic" }}
        />
      </div>
      <CTASection />
    </>
  );
}

