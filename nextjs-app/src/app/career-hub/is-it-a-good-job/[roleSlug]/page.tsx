import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Target,
  Scale,
  Zap,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCareerEvaluationBySlug, careerEvaluations } from "@/lib/data/career-evaluations";
import { getRoleBySlug } from "@/lib/data/roles";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import FAQSection from "@/components/career-hub/FAQSection";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import {
  WebPageSchema,
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/career-hub/seo";
import { getLastUpdated } from "@/lib/utils/date-variation";

export function generateStaticParams() {
  return careerEvaluations.map((evaluation) => ({
    roleSlug: evaluation.roleSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}): Promise<Metadata> {
  const { roleSlug } = await params;
  const evaluation = getCareerEvaluationBySlug(roleSlug);

  if (!evaluation) {
    return { title: "Career Evaluation Not Found" };
  }

  const title = `Is ${evaluation.roleTitle} a Good Job? ${evaluation.verdictSummary}`;
  const canonical = `https://indeedflex.com/career-hub/is-it-a-good-job/${roleSlug}`;

  return {
    title: `${title} | Indeed Flex Career Hub`,
    description: evaluation.verdictSummary,
    keywords: [
      `is ${evaluation.roleTitle.toLowerCase()} a good job`,
      `${evaluation.roleTitle.toLowerCase()} pros and cons`,
      `${evaluation.roleTitle.toLowerCase()} career review`,
      `should I become a ${evaluation.roleTitle.toLowerCase()}`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: evaluation.verdictSummary,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: evaluation.verdictSummary,
    },
  };
}

const scoreLabels: Record<keyof typeof careerEvaluations[0]["scores"], string> = {
  payPotential: "Pay Potential",
  workLifeBalance: "Work-Life Balance",
  jobSecurity: "Job Security",
  growthOpportunity: "Growth Opportunity",
  flexibility: "Flexibility",
  physicalDemand: "Physical Demand",
  stressLevel: "Stress Level",
  entryBarrier: "Entry Barrier",
};

const verdictConfig = {
  excellent: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200", label: "Excellent Choice" },
  good: { icon: CheckCircle, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200", label: "Good Option" },
  depends: { icon: AlertCircle, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200", label: "Depends on You" },
  challenging: { icon: XCircle, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200", label: "Challenging" },
};

export default async function CareerEvaluationPage({
  params,
}: {
  params: Promise<{ roleSlug: string }>;
}) {
  const { roleSlug } = await params;
  const evaluation = getCareerEvaluationBySlug(roleSlug);

  if (!evaluation) {
    notFound();
  }

  const role = getRoleBySlug(roleSlug);
  const verdictInfo = verdictConfig[evaluation.verdict];
  const VerdictIcon = verdictInfo.icon;

  const faqs = evaluation.commonQuestions.map((q) => ({
    question: q.question,
    answer: q.answer,
  }));

  return (
    <>
      <WebPageSchema
        name={`Is ${evaluation.roleTitle} a Good Job?`}
        description={evaluation.verdictSummary}
        url={`https://indeedflex.com/career-hub/is-it-a-good-job/${roleSlug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Is It a Good Job?", url: "https://indeedflex.com/career-hub/is-it-a-good-job" },
          { name: evaluation.roleTitle },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Is It a Good Job?", url: "https://indeedflex.com/career-hub/is-it-a-good-job" },
          { name: evaluation.roleTitle },
        ]}
      />
      {faqs.length > 0 && <FAQSchema questions={faqs} />}

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Is It a Good Job?", href: "/career-hub/is-it-a-good-job" },
            { label: evaluation.roleTitle },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Verdict Card */}
          <Card className={`mb-8 ${verdictInfo.bgColor} ${verdictInfo.borderColor} border-2`}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <VerdictIcon className={`h-8 w-8 ${verdictInfo.color}`} />
                <div>
                  <CardTitle className="text-3xl">
                    Is {evaluation.roleTitle} a Good Job?
                  </CardTitle>
                  <p className="text-lg font-semibold mt-1">{verdictInfo.label}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-4xl font-bold">{evaluation.overallScore}</div>
                  <div className="text-sm text-muted-foreground">/ 10</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{evaluation.verdictSummary}</p>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Detailed Score Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(evaluation.scores).map(([key, value]) => {
                const label = scoreLabels[key as keyof typeof scoreLabels];
                const isNegative = key === "physicalDemand" || key === "stressLevel" || key === "entryBarrier";
                const displayValue = isNegative ? 10 - value : value;
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm font-semibold">{displayValue}/10</span>
                    </div>
                    <Progress value={displayValue * 10} className="h-2" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <CardTitle>Pros</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                  <CardTitle>Cons</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Best For / Worst For */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Best For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.bestFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Worst For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {evaluation.worstFor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Real Talk */}
          <Card className="mb-8 bg-secondary/50">
            <CardHeader>
              <CardTitle>Real Talk</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{evaluation.realTalk}</p>
            </CardContent>
          </Card>

          {/* Income Range */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle>Income Range</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Starting</p>
                  <p className="font-semibold">{evaluation.incomeRange.starting}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average</p>
                  <p className="font-semibold">{evaluation.incomeRange.average}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Top Earners</p>
                  <p className="font-semibold">{evaluation.incomeRange.top}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Longevity */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle>Typical Schedule</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{evaluation.typicalSchedule}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Career Longevity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{evaluation.careerLongevity}</p>
                <Badge
                  variant={
                    evaluation.burnoutRisk === "low"
                      ? "default"
                      : evaluation.burnoutRisk === "medium"
                      ? "secondary"
                      : "destructive"
                  }
                  className="mt-2"
                >
                  Burnout Risk: {evaluation.burnoutRisk}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Alternative Roles */}
          {evaluation.alternativeRoles.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Alternative Roles to Consider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evaluation.alternativeRoles.map((alt, idx) => (
                    <Link
                      key={idx}
                      href={`/career-hub/is-it-a-good-job/${alt.slug}`}
                      className="flex items-start justify-between p-3 border rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{alt.role}</p>
                        <p className="text-sm text-muted-foreground">{alt.reason}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
              <FAQSection faqs={faqs} />
            </section>
          )}

          {/* Related Links */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Explore More About {evaluation.roleTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {role && (
                  <>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/career-hub/roles/${roleSlug}`}>
                        <Target className="mr-2 h-4 w-4" />
                        Full Role Guide
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/how-to-become/${roleSlug}`}>
                        <Zap className="mr-2 h-4 w-4" />
                        How to Become
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/interview-questions/${roleSlug}`}>
                        <Users className="mr-2 h-4 w-4" />
                        Interview Questions
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/career-hub/salary/${roleSlug}`}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Salary by City
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Author Byline */}
          <AuthorByline
            contentType="guide"
            lastUpdated={getLastUpdated(roleSlug, 'new')}
            variant="block"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub
          variant="full"
          currentPage={{ type: "career-evaluation", role: roleSlug }}
        />
      </div>
      <CTASection />
    </>
  );
}

