"use client";

import { useState, useMemo, useEffect } from "react";
import { useEngagement } from "@/hooks/useEngagement";
import DailyChallenge from "@/components/career-hub/tools/DailyChallenge";
import {
  Shield, CheckCircle2, XCircle,
  RotateCcw, BookOpen, GraduationCap, HardHat,
} from "lucide-react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import {
  safetyScenarios, ppeItems,
  categoryLabels, industryLabels,
  type SafetyScenario, type PPEItem,
} from "@/lib/data/safety-scenarios";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Mode = "learn" | "quiz" | "ppe";
type IndustryFilter = SafetyScenario["industry"] | "all";
type CategoryFilterType = SafetyScenario["category"] | "all";

const COMPLETED_KEY = "safetyfirst-completed";

const faqs = [
  {
    question: "What does the Safety First quiz cover?",
    answer:
      "It tests workplace safety knowledge for warehouse, hospitality, and general roles. Topics include hazard identification, PPE requirements, and emergency procedures.",
  },
  {
    question: "Do I need safety training for warehouse jobs?",
    answer:
      "Most warehouse employers require basic safety awareness. OSHA 10 certification is a plus. This quiz helps you prepare for on-the-job safety expectations.",
  },
  {
    question: "Is this a replacement for OSHA training?",
    answer:
      "No. This is a practice tool to test your knowledge. For official certification, complete the OSHA 10-Hour or 30-Hour training course.",
  },
];

function loadCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem(COMPLETED_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SafetyFirstClient() {
  const [mode, setMode] = useState<Mode>("learn");
  const [industryFilter, setIndustryFilter] = useState<IndustryFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterType>("all");
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(() => loadCompleted());

  // Quiz state
  const [quizScenarios, setQuizScenarios] = useState<SafetyScenario[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const { getStreak, getDailyChallenge, recordActivity, isActiveToday } = useEngagement();

  const dailyChallengeItems = useMemo(() => {
    return getDailyChallenge(safetyScenarios, 5).map(s => ({
      id: s.id,
      question: s.scenario,
      answer: s.options.find(o => o.correct)?.text || "",
      hint: s.question,
    }));
  }, [getDailyChallenge]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(completedScenarios)));
  }, [completedScenarios]);

  const filteredScenarios = useMemo(() => {
    let scenarios = safetyScenarios;
    if (industryFilter !== "all") scenarios = scenarios.filter((s) => s.industry === industryFilter);
    if (categoryFilter !== "all") scenarios = scenarios.filter((s) => s.category === categoryFilter);
    return scenarios;
  }, [industryFilter, categoryFilter]);

  const filteredPPE = useMemo(() => {
    if (industryFilter === "all") return ppeItems;
    return ppeItems.filter((p) => p.industries.includes(industryFilter as PPEItem["industries"][number]));
  }, [industryFilter]);

  useEffect(() => {
    if (mode === "quiz") {
      setQuizScenarios(shuffleArray(filteredScenarios));
      setQuizIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizScore(0);
      setQuizComplete(false);
    }
  }, [mode, filteredScenarios]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const scenario = quizScenarios[quizIndex];
    const correctOption = scenario.options.find((o) => o.correct);
    if (answer === correctOption?.text) {
      setQuizScore((prev) => prev + 1);
      setCompletedScenarios((prev) => { const n = new Set(prev); n.add(scenario.id); return n; });
    }
  };

  const nextQuestion = () => {
    if (quizIndex < quizScenarios.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const industryKeys = Object.keys(industryLabels) as SafetyScenario["industry"][];
  const categoryKeys = Object.keys(categoryLabels) as SafetyScenario["category"][];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Safety First" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🛡️</span>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Safety First</h1>
                  <p className="text-lg text-primary font-medium">
                    Workplace Safety Training / Seguridad Laboral
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Practice workplace safety scenarios and learn PPE requirements. Essential knowledge
                for warehouse, hospitality, and industrial jobs.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Practica escenarios de seguridad laboral y aprende los requisitos de EPP.
              </p>

              <div className="flex gap-4 mt-4 bg-muted/50 rounded-lg p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{completedScenarios.size}</p>
                  <p className="text-xs text-muted-foreground">Completed / Completados</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{safetyScenarios.length}</p>
                  <p className="text-xs text-muted-foreground">Scenarios / Escenarios</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{ppeItems.length}</p>
                  <p className="text-xs text-muted-foreground">PPE / EPP</p>
                </div>
              </div>
            </div>

            <DailyChallenge
              toolName="Safety"
              items={dailyChallengeItems}
              streak={getStreak()}
              isActiveToday={isActiveToday}
              onComplete={() => recordActivity("safety-first")}
            />

            {/* Mode Tabs */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="quiz">
                  <GraduationCap className="h-4 w-4 mr-1.5" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger value="ppe">
                  <HardHat className="h-4 w-4 mr-1.5" />
                  PPE
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filters (shared by Learn & Quiz) */}
            {mode !== "ppe" && (
              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIndustryFilter("all")}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      industryFilter === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    )}
                  >
                    All Industries
                  </button>
                  {industryKeys.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustryFilter(ind)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        industryFilter === ind
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      )}
                    >
                      {industryLabels[ind].icon} {industryLabels[ind].en}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                      categoryFilter === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    )}
                  >
                    All Categories
                  </button>
                  {categoryKeys.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                        categoryFilter === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      )}
                    >
                      {categoryLabels[cat].icon} {categoryLabels[cat].en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PPE industry filter */}
            {mode === "ppe" && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setIndustryFilter("all")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    industryFilter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  )}
                >
                  All Industries
                </button>
                {industryKeys.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustryFilter(ind)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      industryFilter === ind
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    )}
                  >
                    {industryLabels[ind].icon} {industryLabels[ind].en}
                  </button>
                ))}
              </div>
            )}

            {/* LEARN MODE */}
            {mode === "learn" && (
              <div className="space-y-4">
                {filteredScenarios.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <p className="text-muted-foreground">
                      No scenarios match your filters. Try selecting a different industry or category.
                    </p>
                  </div>
                ) : (
                  filteredScenarios.map((scenario) => {
                    const correctOption = scenario.options.find((o) => o.correct);
                    return (
                      <Card key={scenario.id} className={cn(
                        completedScenarios.has(scenario.id) && "border-green-200 bg-green-50/30 dark:bg-green-950/10"
                      )}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline">
                              {industryLabels[scenario.industry]?.icon}{" "}
                              {industryLabels[scenario.industry]?.en}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={cn("text-white text-[10px]", categoryLabels[scenario.category]?.color)}
                            >
                              {categoryLabels[scenario.category]?.icon}{" "}
                              {categoryLabels[scenario.category]?.en}
                            </Badge>
                            {completedScenarios.has(scenario.id) && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <CardTitle className="text-base mt-2">{scenario.scenario}</CardTitle>
                          <p className="text-xs text-muted-foreground italic">
                            {scenario.scenarioSpanish}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium text-foreground mb-1">
                            {scenario.question}
                          </p>
                          <p className="text-xs text-muted-foreground italic mb-3">
                            {scenario.questionSpanish}
                          </p>
                          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                              ✓ {correctOption?.text}
                            </p>
                            <p className="text-xs text-green-700/80 dark:text-green-400/80 italic mt-0.5">
                              {correctOption?.textSpanish}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {correctOption?.explanation}
                            </p>
                            <p className="text-xs text-muted-foreground italic mt-0.5">
                              {correctOption?.explanationSpanish}
                            </p>
                          </div>
                          {scenario.oshaReference && (
                            <p className="text-[10px] text-muted-foreground mt-2">
                              📋 OSHA: {scenario.oshaReference}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            )}

            {/* QUIZ MODE */}
            {mode === "quiz" && (
              <div className="max-w-lg mx-auto">
                {quizComplete ? (
                  <Card className="text-center">
                    <CardHeader>
                      <Shield className="h-16 w-16 mx-auto text-primary mb-2" />
                      <CardTitle className="text-2xl">
                        Training Complete! / ¡Entrenamiento Completo!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-5xl font-bold mb-2">
                        {quizScore}/{quizScenarios.length}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {((quizScore / quizScenarios.length) * 100).toFixed(0)}% Correct
                      </p>
                      <Button onClick={() => setMode("quiz")}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Practice Again / Practicar de nuevo
                      </Button>
                    </CardContent>
                  </Card>
                ) : quizScenarios.length > 0 ? (
                  <>
                    <Card className="mb-4">
                      <CardContent className="pt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>
                            Scenario {quizIndex + 1} of {quizScenarios.length}
                          </span>
                          <Badge variant="secondary">Score: {quizScore}</Badge>
                        </div>
                        <Progress
                          value={((quizIndex + 1) / quizScenarios.length) * 100}
                          className="h-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <Badge variant="outline">
                            {industryLabels[quizScenarios[quizIndex].industry]?.icon}{" "}
                            {industryLabels[quizScenarios[quizIndex].industry]?.en}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-white text-[10px]",
                              categoryLabels[quizScenarios[quizIndex].category]?.color
                            )}
                          >
                            {categoryLabels[quizScenarios[quizIndex].category]?.en}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {quizScenarios[quizIndex].scenario}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground italic">
                          {quizScenarios[quizIndex].scenarioSpanish}
                        </p>
                        <CardDescription className="mt-2 font-medium text-foreground">
                          {quizScenarios[quizIndex].question}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground italic">
                          {quizScenarios[quizIndex].questionSpanish}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {quizScenarios[quizIndex].options.map((option, i) => {
                            let btnClass = "w-full justify-start text-left p-4 h-auto";
                            if (showResult) {
                              if (option.correct) {
                                btnClass +=
                                  " bg-green-100 dark:bg-green-950 border-green-500";
                              } else if (option.text === selectedAnswer) {
                                btnClass += " bg-red-100 dark:bg-red-950 border-red-500";
                              }
                            }
                            return (
                              <Button
                                key={i}
                                variant="outline"
                                className={btnClass}
                                onClick={() => handleAnswer(option.text)}
                                disabled={showResult}
                              >
                                <span className="flex flex-col items-start gap-0.5">
                                  <span className="flex items-center gap-2">
                                    {showResult && option.correct && (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                        <span className="sr-only">Correct</span>
                                      </>
                                    )}
                                    {showResult &&
                                      option.text === selectedAnswer &&
                                      !option.correct && (
                                        <>
                                          <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                          <span className="sr-only">Incorrect</span>
                                        </>
                                      )}
                                    {option.text}
                                  </span>
                                  <span className="text-xs text-muted-foreground italic">
                                    {option.textSpanish}
                                  </span>
                                </span>
                              </Button>
                            );
                          })}
                        </div>

                        {showResult && (
                          <div className="mt-4">
                            <div className="bg-muted p-4 rounded-lg mb-3">
                              <p className="text-sm">
                                <strong>Why:</strong>{" "}
                                {quizScenarios[quizIndex].options.find((o) => o.correct)?.explanation}
                              </p>
                              <p className="text-xs text-muted-foreground italic mt-1">
                                {quizScenarios[quizIndex].options.find((o) => o.correct)?.explanationSpanish}
                              </p>
                              {quizScenarios[quizIndex].oshaReference && (
                                <p className="text-[10px] text-muted-foreground mt-2">
                                  📋 OSHA: {quizScenarios[quizIndex].oshaReference}
                                </p>
                              )}
                            </div>
                            <Button onClick={nextQuestion} className="w-full">
                              {quizIndex < quizScenarios.length - 1
                                ? "Next Scenario / Siguiente"
                                : "See Results / Ver Resultados"}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <p className="text-muted-foreground">
                      No scenarios match your filters. Try selecting a different industry or
                      category.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* PPE MODE */}
            {mode === "ppe" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPPE.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{item.nameSpanish}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground mb-1">{item.description}</p>
                      <p className="text-xs text-muted-foreground italic mb-3">
                        {item.descriptionSpanish}
                      </p>

                      <div className="mb-2">
                        <p className="text-xs font-medium text-foreground mb-1">
                          Protects Against / Protege contra:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.hazards.map((hazard, i) => (
                            <Badge key={i} variant="outline" className="text-[10px]">
                              {hazard}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">
                          Industries / Industrias:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.industries.map((ind) => (
                            <Badge key={ind} variant="secondary" className="text-[10px]">
                              {industryLabels[ind]?.icon} {industryLabels[ind]?.en}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/safety-first" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
