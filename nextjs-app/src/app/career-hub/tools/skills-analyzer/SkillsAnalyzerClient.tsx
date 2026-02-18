"use client";

import { useState } from "react";
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
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { roles } from "@/lib/data/roles";

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

export default function SkillsAnalyzerClient() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (score: number) => {
    const category = skillCategories[currentCategory];
    const categoryAnswers = answers[category.id] || [];
    categoryAnswers[currentQuestion] = score;

    setAnswers({
      ...answers,
      [category.id]: categoryAnswers,
    });

    // Move to next question or category
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
    const topSkills = getTopSkills();
    // Simple matching logic - in real app would be more sophisticated
    if (topSkills.some((s) => s.id === "customer-service")) {
      return roles.filter(
        (r) => r.industry === "hospitality" || r.industry === "retail"
      );
    }
    if (topSkills.some((s) => s.id === "physical-work")) {
      return roles.filter((r) => r.industry === "industrial");
    }
    return roles.slice(0, 6);
  };

  const resetQuiz = () => {
    setCurrentCategory(0);
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
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
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Skills Analyzer" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Skills Analyzer
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover which flexible jobs match your skills and experience.
                Answer a few questions to get personalized recommendations.
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
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <Button
                          key={score}
                          variant="outline"
                          className="h-16 text-lg"
                          onClick={() => handleAnswer(score)}
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>Not at all</span>
                      <span>Very much</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getMatchingRoles()
                        .slice(0, 6)
                        .map((role) => (
                          <Link
                            key={role.slug}
                            href={`/career-hub/roles/${role.slug}`}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            <div>
                              <p className="font-medium">{role.title}</p>
                              <p className="text-sm text-muted-foreground">
                                ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={resetQuiz} variant="outline" className="mb-8">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Quiz Again
                </Button>
              </>
            )}
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

