"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Star,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { roles } from "@/lib/data/roles";

const faqs = [
  {
    question: "How does the Skills Analyzer work?",
    answer:
      "Rate your proficiency in key skills across categories like communication, physical abilities, technical skills, and teamwork. The tool matches your strengths to roles that fit.",
  },
  {
    question: "What roles does it recommend?",
    answer:
      "It recommends from 47 flexible work roles across hospitality, warehouse, retail, facilities, events, and healthcare based on your skill ratings.",
  },
  {
    question: "Should I rate myself honestly or optimistically?",
    answer:
      "Be honest. Accurate self-assessment leads to better role matches and helps you identify skills worth developing for higher-paying positions.",
  },
];

const skillCategories = [
  {
    id: "customer-service",
    name: "Customer Service",
    description: "Helping and interacting with customers",
    questions: [
      "I enjoy helping people solve problems",
      "I stay calm under pressure with difficult customers",
      "I can explain things clearly to others",
    ],
  },
  {
    id: "physical-work",
    name: "Physical Work",
    description: "Active, hands-on tasks",
    questions: [
      "I'm comfortable being on my feet all day",
      "I can lift and carry heavy items",
      "I work well in fast-paced environments",
    ],
  },
  {
    id: "attention-to-detail",
    name: "Attention to Detail",
    description: "Precision and accuracy",
    questions: [
      "I notice small details others might miss",
      "I follow instructions precisely",
      "I double-check my work before finishing",
    ],
  },
  {
    id: "teamwork",
    name: "Teamwork",
    description: "Working with others",
    questions: [
      "I work well as part of a team",
      "I communicate clearly with coworkers",
      "I'm flexible and adapt to different situations",
    ],
  },
];

const likertOptions = [
  { score: 1, label: "Never" },
  { score: 2, label: "Rarely" },
  { score: 3, label: "Sometimes" },
  { score: 4, label: "Often" },
  { score: 5, label: "Always" },
] as const;

const industryWeights: Record<string, Record<string, number>> = {
  "customer-service": { hospitality: 5, retail: 5, events: 4, healthcare: 3, facilities: 1, industrial: 1 },
  "physical-work": { industrial: 5, facilities: 4, events: 3, hospitality: 2, retail: 2, healthcare: 2 },
  "attention-to-detail": { industrial: 4, healthcare: 5, facilities: 4, retail: 3, hospitality: 3, events: 2 },
  "teamwork": { hospitality: 4, events: 5, retail: 3, industrial: 3, healthcare: 4, facilities: 3 },
};

const SA_STORAGE_KEY = "skills-analyzer-results";

function loadSavedResults() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(SA_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function computePositionFromAnswers(answers: Record<string, number[]>) {
  let totalAnswered = 0;
  for (const category of skillCategories) {
    const catAnswers = answers[category.id];
    if (!catAnswers) break;
    const answeredInCat = catAnswers.filter((v) => v !== undefined).length;
    totalAnswered += answeredInCat;
    if (answeredInCat < category.questions.length) break;
  }

  let remaining = totalAnswered;
  for (let catIdx = 0; catIdx < skillCategories.length; catIdx++) {
    const qCount = skillCategories[catIdx].questions.length;
    if (remaining < qCount) {
      return { category: catIdx, question: remaining };
    }
    remaining -= qCount;
  }
  return { category: skillCategories.length - 1, question: skillCategories[skillCategories.length - 1].questions.length - 1 };
}

export default function SkillsAnalyzerClient() {
  const [answers, setAnswers] = useState<Record<string, number[]>>(() => {
    const saved = loadSavedResults();
    return saved?.answers ?? {};
  });
  const [isComplete, setIsComplete] = useState(() => {
    const saved = loadSavedResults();
    return saved?.isComplete ?? false;
  });

  const initialPosition = useMemo(() => computePositionFromAnswers(answers), []);// eslint-disable-line react-hooks/exhaustive-deps
  const [currentCategory, setCurrentCategory] = useState(initialPosition.category);
  const [currentQuestion, setCurrentQuestion] = useState(initialPosition.question);

  useEffect(() => {
    if (Object.keys(answers).length > 0 || isComplete) {
      localStorage.setItem(SA_STORAGE_KEY, JSON.stringify({ answers, isComplete }));
    }
  }, [answers, isComplete]);

  const handleAnswer = (score: number) => {
    const category = skillCategories[currentCategory];
    const categoryAnswers = [...(answers[category.id] || [])];
    categoryAnswers[currentQuestion] = score;

    setAnswers({
      ...answers,
      [category.id]: categoryAnswers,
    });

    if (currentQuestion < category.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentCategory < skillCategories.length - 1) {
      setCurrentCategory(currentCategory + 1);
      setCurrentQuestion(0);
    } else {
      setIsComplete(true);
    }
  };

  const calculateResults = () => {
    const results: Record<string, number> = {};
    for (const category of skillCategories) {
      const categoryAnswers = answers[category.id] || [];
      const average =
        categoryAnswers.reduce((a, b) => a + b, 0) / categoryAnswers.length;
      results[category.id] = average;
    }
    return results;
  };

  const getTopSkills = () => {
    const results = calculateResults();
    return Object.entries(results)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([id]) => skillCategories.find((c) => c.id === id)!);
  };

  const getMatchingRoles = () => {
    const results = calculateResults();

    const scoredRoles = roles.map((role) => {
      let fitScore = 0;
      for (const category of skillCategories) {
        const userScore = results[category.id] || 0;
        const weight = industryWeights[category.id]?.[role.industry] || 1;
        fitScore += userScore * weight;
      }
      if (role.physicalDemand === "high" && (results["physical-work"] || 0) >= 4) fitScore += 10;
      if (role.physicalDemand === "low" && (results["physical-work"] || 0) <= 2) fitScore += 5;

      return { role, fitScore };
    });

    return scoredRoles
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 8)
      .map((r) => ({ ...r.role, fitScore: r.fitScore }));
  };

  const resetQuiz = () => {
    setCurrentCategory(0);
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    localStorage.removeItem(SA_STORAGE_KEY);
  };

  const totalQuestions = skillCategories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );
  const answeredQuestions = Object.values(answers).flat().length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Career Change Skills Quiz" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Career Change Skills Quiz
              </h1>
              <p className="text-lg text-muted-foreground">
                Rate your skills honestly and we&apos;ll match you to flexible
                roles that fit. Takes 2 minutes. No sign-up needed.
              </p>
            </div>

            {!isComplete ? (
              <>
                {/* Progress */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>
                        {answeredQuestions} of {totalQuestions} questions
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="mb-8">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      {skillCategories[currentCategory].name}
                    </Badge>
                    <CardTitle className="text-xl">
                      {
                        skillCategories[currentCategory].questions[
                          currentQuestion
                        ]
                      }
                    </CardTitle>
                    <CardDescription>
                      How well does this describe you?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {likertOptions.map(({ score, label }) => (
                        <Button
                          key={score}
                          variant="outline"
                          className="w-full h-12 justify-start text-left px-4"
                          onClick={() => handleAnswer(score)}
                        >
                          <span className="text-muted-foreground w-6">{score}</span>
                          <span className="font-medium">{label}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Results */}
                <Card className="mb-8 border-primary">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Your Results</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillCategories.map((category) => {
                        const categoryAnswers = answers[category.id] || [];
                        const average =
                          categoryAnswers.reduce((a, b) => a + b, 0) /
                          categoryAnswers.length;
                        const percentage = (average / 5) * 100;

                        return (
                          <div key={category.id}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">
                                {category.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {average.toFixed(1)}/5
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Skills */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Your Top Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {getTopSkills().map((skill) => (
                        <Badge key={skill.id} className="text-sm py-1 px-3">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Matching Roles */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Recommended Roles For You</CardTitle>
                    <CardDescription>
                      Based on your skills assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const matchedRoles = getMatchingRoles();
                      const topFitScore = matchedRoles[0]?.fitScore || 1;

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {matchedRoles.map((role) => {
                            const fitPercent = Math.round((role.fitScore / topFitScore) * 100);

                            return (
                              <Link
                                key={role.slug}
                                href={`/career-hub/roles/${role.slug}`}
                                className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium truncate">{role.title}</p>
                                    <Badge
                                      variant="secondary"
                                      className="shrink-0 text-xs"
                                    >
                                      {fitPercent}% fit
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                                  </p>
                                  <Progress
                                    value={fitPercent}
                                    className="h-1 mt-2"
                                  />
                                </div>
                                <ArrowRight className="h-4 w-4 text-primary ml-3 shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Career Change Plan */}
                <Card className="mb-8 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Your Career Change Plan
                    </CardTitle>
                    <CardDescription>
                      Based on your skills, here&apos;s how to get started:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Download Indeed Flex and create your profile</p>
                          <Link
                            href="https://indeedflex.com/download-app/"
                            className="text-sm text-primary hover:underline"
                          >
                            Get the app →
                          </Link>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
                          2
                        </span>
                        <div>
                          <p className="font-medium">
                            Check out the {getMatchingRoles()[0]?.title ?? "top role"} guide
                          </p>
                          <Link
                            href={`/career-hub/roles/${getMatchingRoles()[0]?.slug ?? ""}`}
                            className="text-sm text-primary hover:underline"
                          >
                            Read the guide →
                          </Link>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Get certified to unlock higher-paying roles</p>
                          <Link
                            href="/career-hub/guides/certifications"
                            className="text-sm text-primary hover:underline"
                          >
                            Explore certifications →
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Button onClick={resetQuiz} variant="outline" className="mb-8">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Quiz Again
                </Button>
              </>
            )}
            <FAQSection faqs={faqs} />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/skills-analyzer" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
