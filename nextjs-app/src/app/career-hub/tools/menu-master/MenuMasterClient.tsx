"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useEngagement } from "@/hooks/useEngagement";
import DailyChallenge from "@/components/career-hub/tools/DailyChallenge";
import {
  BookOpen, Dices, ShieldCheck, Check, X,
  RotateCcw, Volume2, VolumeX, ChefHat, Utensils,
} from "lucide-react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import {
  culinaryTerms, knifeCuts, foodSafetyQuestions,
  categoryLabels, difficultyLabels, safetyCategoryLabels,
  type CulinaryTerm, type FoodSafetyQuestion,
} from "@/lib/data/culinary-terms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Mode = "learn" | "flashcard" | "cuts" | "safety";
type CategoryFilter = CulinaryTerm["category"] | "all";
type DifficultyFilter = CulinaryTerm["difficulty"] | "all";

const PROGRESS_KEY = "menumaster-progress";

interface MenuMasterProgress {
  masteredTerms: string[];
  masteredCuts: string[];
  safetyScore: number;
  safetyAttempts: number;
}

const faqs = [
  {
    question: "What culinary terms does Menu Master cover?",
    answer:
      "It covers essential kitchen terms including cooking techniques, equipment names, menu descriptions, knife cuts, and food safety knowledge you'll need in hospitality jobs.",
  },
  {
    question: "Do I need to know these terms for restaurant work?",
    answer:
      "Yes. Knowing terms like 'mise en place,' '86'd,' and 'al dente' shows employers you're prepared and helps you communicate with kitchen staff.",
  },
  {
    question: "Is Menu Master available in Spanish?",
    answer:
      "Many terms include Spanish translations and phonetic guides, making it useful for bilingual workers in restaurant environments.",
  },
];

function loadProgress(): MenuMasterProgress {
  if (typeof window === "undefined") {
    return { masteredTerms: [], masteredCuts: [], safetyScore: 0, safetyAttempts: 0 };
  }
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return { masteredTerms: [], masteredCuts: [], safetyScore: 0, safetyAttempts: 0 };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MenuMasterClient() {
  const [mode, setMode] = useState<Mode>("learn");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [progress, setProgress] = useState<MenuMasterProgress>(() => loadProgress());

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardDeck, setFlashcardDeck] = useState<CulinaryTerm[]>([]);

  // Safety quiz state
  const [safetyIndex, setSafetyIndex] = useState(0);
  const [safetySelected, setSafetySelected] = useState<string | null>(null);
  const [safetyShowResult, setSafetyShowResult] = useState(false);
  const [safetyScore, setSafetyScore] = useState(0);
  const [safetyComplete, setSafetyComplete] = useState(false);
  const [safetyQuestions, setSafetyQuestions] = useState<FoodSafetyQuestion[]>([]);

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({ defaultRate: 0.85 });
  const { getStreak, getDailyChallenge, recordActivity, isActiveToday } = useEngagement();

  const dailyChallengeItems = useMemo(() => {
    return getDailyChallenge(culinaryTerms, 5).map(t => ({
      id: t.id,
      question: `What does "${t.term}" mean?`,
      answer: t.definition,
      hint: t.termSpanish || undefined,
    }));
  }, [getDailyChallenge]);

  const masteredTermsSet = useMemo(() => new Set(progress.masteredTerms), [progress.masteredTerms]);
  const masteredCutsSet = useMemo(() => new Set(progress.masteredCuts), [progress.masteredCuts]);

  const totalItems = culinaryTerms.length + knifeCuts.length + foodSafetyQuestions.length;
  const masteredCount = progress.masteredTerms.length + progress.masteredCuts.length;
  const overallProgress = Math.round(
    ((masteredCount + (progress.safetyAttempts > 0 ? Math.min(progress.safetyScore, foodSafetyQuestions.length) : 0)) / totalItems) * 100
  );

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const filteredTerms = useMemo(() => {
    let terms = culinaryTerms;
    if (categoryFilter !== "all") terms = terms.filter((t) => t.category === categoryFilter);
    if (difficultyFilter !== "all") terms = terms.filter((t) => t.difficulty === difficultyFilter);
    return terms;
  }, [categoryFilter, difficultyFilter]);

  useEffect(() => {
    if (mode === "flashcard") {
      setFlashcardDeck(shuffleArray(filteredTerms));
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [mode, filteredTerms]);

  useEffect(() => {
    if (mode === "safety") {
      setSafetyQuestions(shuffleArray(foodSafetyQuestions));
      setSafetyIndex(0);
      setSafetySelected(null);
      setSafetyShowResult(false);
      setSafetyScore(0);
      setSafetyComplete(false);
    }
  }, [mode]);

  const toggleTermMastered = useCallback((termId: string) => {
    setProgress((prev) => {
      const set = new Set(prev.masteredTerms);
      if (set.has(termId)) set.delete(termId);
      else set.add(termId);
      return { ...prev, masteredTerms: Array.from(set) };
    });
  }, []);

  const toggleCutMastered = useCallback((cutId: string) => {
    setProgress((prev) => {
      const set = new Set(prev.masteredCuts);
      if (set.has(cutId)) set.delete(cutId);
      else set.add(cutId);
      return { ...prev, masteredCuts: Array.from(set) };
    });
  }, []);

  const handleSafetyAnswer = (answer: string) => {
    if (safetyShowResult) return;
    setSafetySelected(answer);
    setSafetyShowResult(true);
    if (answer === safetyQuestions[safetyIndex].correctAnswer) {
      setSafetyScore((prev) => prev + 1);
    }
  };

  const nextSafetyQuestion = () => {
    if (safetyIndex < safetyQuestions.length - 1) {
      setSafetyIndex((prev) => prev + 1);
      setSafetySelected(null);
      setSafetyShowResult(false);
    } else {
      setSafetyComplete(true);
      setProgress((prev) => ({
        ...prev,
        safetyScore: Math.max(prev.safetyScore, safetyScore),
        safetyAttempts: prev.safetyAttempts + 1,
      }));
    }
  };

  const resetProgress = () => {
    const empty: MenuMasterProgress = { masteredTerms: [], masteredCuts: [], safetyScore: 0, safetyAttempts: 0 };
    setProgress(empty);
  };

  const categories = Object.keys(categoryLabels) as CulinaryTerm["category"][];
  const difficulties = Object.keys(difficultyLabels) as CulinaryTerm["difficulty"][];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Menu Master" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">👨‍🍳</span>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Menu Master</h1>
                  <p className="text-lg text-primary font-medium">
                    Kitchen & Restaurant Vocabulary
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Learn essential culinary terms, knife cuts, and food safety. Perfect for servers,
                kitchen staff, and hospitality workers.
              </p>

              <div className="flex items-center gap-4 mt-4 bg-muted/50 rounded-lg p-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Overall Progress / Progreso</span>
                    <span className="font-medium text-foreground">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <Button variant="ghost" size="sm" onClick={resetProgress}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            <DailyChallenge
              toolName="Menu Master"
              items={dailyChallengeItems}
              streak={getStreak()}
              isActiveToday={isActiveToday}
              onComplete={() => recordActivity("menu-master")}
            />

            {/* Mode Tabs */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-6">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="flashcard">
                  <Dices className="h-4 w-4 mr-1.5" />
                  Flashcard
                </TabsTrigger>
                <TabsTrigger value="cuts">
                  <Utensils className="h-4 w-4 mr-1.5" />
                  Cuts
                </TabsTrigger>
                <TabsTrigger value="safety">
                  <ShieldCheck className="h-4 w-4 mr-1.5" />
                  Safety
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* LEARN MODE */}
            {mode === "learn" && (
              <>
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      categoryFilter === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    )}
                  >
                    All / Todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        categoryFilter === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      )}
                    >
                      {categoryLabels[cat]?.en || cat} / {categoryLabels[cat]?.es || cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(difficultyFilter === diff ? "all" : diff)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                        difficultyFilter === diff
                          ? "bg-primary text-primary-foreground"
                          : diff === "beginner"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : diff === "intermediate"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      )}
                    >
                      {difficultyLabels[diff]?.en || diff}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTerms.map((term) => (
                    <Card key={term.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{term.term}</CardTitle>
                          <button
                            onClick={() => toggleTermMastered(term.id)}
                            aria-label={masteredTermsSet.has(term.id) ? "Unmark as mastered" : "Mark as mastered"}
                            className={cn(
                              "p-1.5 rounded-full transition-colors",
                              masteredTermsSet.has(term.id)
                                ? "text-green-600"
                                : "text-muted-foreground hover:text-green-600"
                            )}
                          >
                            {masteredTermsSet.has(term.id) ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <X className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {term.termSpanish && (
                          <p className="text-sm text-muted-foreground">{term.termSpanish}</p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                            /{term.pronunciation}/
                          </span>
                          {isSupported && (
                            <button
                              onClick={() => {
                                stop();
                                speak(term.term, "en-US");
                              }}
                              aria-label="Play pronunciation"
                              className="p-1 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                            >
                              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-foreground">{term.definition}</p>
                        {term.definitionSpanish && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {term.definitionSpanish}
                          </p>
                        )}
                        <div className="flex gap-1.5 mt-3">
                          <Badge variant="outline" className="text-[10px]">
                            {categoryLabels[term.category]?.en || term.category}
                          </Badge>
                          <Badge
                            variant={
                              term.difficulty === "beginner"
                                ? "default"
                                : term.difficulty === "intermediate"
                                ? "secondary"
                                : "destructive"
                            }
                            className="text-[10px]"
                          >
                            {term.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* FLASHCARD MODE */}
            {mode === "flashcard" && flashcardDeck.length > 0 && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Card {flashcardIndex + 1} of {flashcardDeck.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFlashcardDeck(shuffleArray(filteredTerms));
                      setFlashcardIndex(0);
                      setIsFlipped(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Shuffle
                  </Button>
                </div>

                <button
                  type="button"
                  className="relative w-full aspect-[3/4] cursor-pointer perspective-1000 bg-transparent border-none p-0 text-left block"
                  onClick={() => setIsFlipped(!isFlipped)}
                  aria-label="Flip card"
                  aria-expanded={isFlipped}
                >
                  <div
                    className={cn(
                      "absolute inset-0 transition-transform duration-500 transform-style-preserve-3d",
                      isFlipped && "rotate-y-180"
                    )}
                  >
                    {/* Front */}
                    <div
                      className={cn(
                        "absolute inset-0 backface-hidden bg-card rounded-2xl border-2 border-border p-6 flex flex-col items-center justify-center text-center shadow-md",
                        isFlipped && "invisible"
                      )}
                    >
                      <ChefHat className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        {flashcardDeck[flashcardIndex].term}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono mb-4">
                        /{flashcardDeck[flashcardIndex].pronunciation}/
                      </p>
                      {flashcardDeck[flashcardIndex].termSpanish && (
                        <p className="text-muted-foreground">
                          {flashcardDeck[flashcardIndex].termSpanish}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-6">Tap to reveal definition</p>
                    </div>

                    {/* Back */}
                    <div
                      className={cn(
                        "absolute inset-0 backface-hidden bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/20 p-6 flex flex-col items-center justify-center text-center shadow-md rotate-y-180",
                        !isFlipped && "invisible"
                      )}
                    >
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {flashcardDeck[flashcardIndex].term}
                      </h3>
                      <p className="text-foreground mb-3">
                        {flashcardDeck[flashcardIndex].definition}
                      </p>
                      {flashcardDeck[flashcardIndex].definitionSpanish && (
                        <p className="text-sm text-muted-foreground italic">
                          {flashcardDeck[flashcardIndex].definitionSpanish}
                        </p>
                      )}
                    </div>
                  </div>
                </button>

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFlashcardIndex((prev) => Math.max(0, prev - 1));
                      setIsFlipped(false);
                    }}
                    disabled={flashcardIndex === 0}
                    aria-label="Previous card"
                  >
                    ←
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFlashcardIndex((prev) => Math.min(flashcardDeck.length - 1, prev + 1));
                        setIsFlipped(false);
                      }}
                    >
                      Still Learning
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        toggleTermMastered(flashcardDeck[flashcardIndex].id);
                        setFlashcardIndex((prev) => Math.min(flashcardDeck.length - 1, prev + 1));
                        setIsFlipped(false);
                      }}
                    >
                      Got It!
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFlashcardIndex((prev) => Math.min(flashcardDeck.length - 1, prev + 1));
                      setIsFlipped(false);
                    }}
                    disabled={flashcardIndex === flashcardDeck.length - 1}
                    aria-label="Next card"
                  >
                    →
                  </Button>
                </div>
              </div>
            )}

            {/* CUTS MODE */}
            {mode === "cuts" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {knifeCuts.map((cut) => (
                  <Card key={cut.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          🔪 {cut.name}
                        </CardTitle>
                          <button
                            onClick={() => toggleCutMastered(cut.id)}
                            aria-label={masteredCutsSet.has(cut.id) ? "Unmark as mastered" : "Mark as mastered"}
                            className={cn(
                              "p-1.5 rounded-full transition-colors",
                              masteredCutsSet.has(cut.id)
                                ? "text-green-600"
                                : "text-muted-foreground hover:text-green-600"
                            )}
                          >
                          {masteredCutsSet.has(cut.id) ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {cut.nameSpanish && (
                        <p className="text-sm text-muted-foreground">{cut.nameSpanish}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                          /{cut.pronunciation}/
                        </span>
                        {isSupported && (
                          <button
                            onClick={() => {
                              stop();
                              speak(cut.name, "en-US");
                            }}
                            aria-label="Play pronunciation"
                            className="p-1 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-foreground mb-1">{cut.description}</p>
                      {cut.descriptionSpanish && (
                        <p className="text-xs text-muted-foreground italic mb-2">
                          {cut.descriptionSpanish}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Size:</span> {cut.size}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cut.usedFor.map((use) => (
                          <Badge key={use} variant="outline" className="text-[10px]">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* SAFETY QUIZ MODE */}
            {mode === "safety" && (
              <div className="max-w-lg mx-auto">
                {safetyComplete ? (
                  <Card className="text-center">
                    <CardHeader>
                      <ShieldCheck className="h-16 w-16 mx-auto text-green-600 mb-2" />
                      <CardTitle className="text-2xl">
                        Food Safety Quiz Complete!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-5xl font-bold mb-2">
                        {safetyScore}/{safetyQuestions.length}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {safetyScore >= safetyQuestions.length * 0.8
                          ? "🎉 Excellent! You know your food safety!"
                          : safetyScore >= safetyQuestions.length * 0.5
                          ? "👍 Good foundation! Keep studying."
                          : "📚 Review food safety guidelines and try again."}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Best score: {progress.safetyScore}/{foodSafetyQuestions.length} &bull;
                        Attempts: {progress.safetyAttempts}
                      </p>
                      <Button onClick={() => setMode("safety")}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ) : safetyQuestions.length > 0 ? (
                  <>
                    <Card className="mb-4">
                      <CardContent className="pt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>
                            Question {safetyIndex + 1} of {safetyQuestions.length}
                          </span>
                          <Badge variant="secondary">Score: {safetyScore}</Badge>
                        </div>
                        <Progress
                          value={((safetyIndex + 1) / safetyQuestions.length) * 100}
                          className="h-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Badge variant="outline" className="w-fit mb-2">
                          {safetyCategoryLabels[safetyQuestions[safetyIndex].category]?.en ||
                            safetyQuestions[safetyIndex].category}
                        </Badge>
                        <CardTitle className="text-lg">
                          {safetyQuestions[safetyIndex].question}
                        </CardTitle>
                        {safetyQuestions[safetyIndex].questionSpanish && (
                          <p className="text-sm text-muted-foreground italic">
                            {safetyQuestions[safetyIndex].questionSpanish}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {safetyQuestions[safetyIndex].options.map((option, i) => {
                            let btnClass = "w-full justify-start text-left p-4 h-auto";
                            if (safetyShowResult) {
                              if (option === safetyQuestions[safetyIndex].correctAnswer) {
                                btnClass +=
                                  " bg-green-100 dark:bg-green-950 border-green-500";
                              } else if (option === safetySelected) {
                                btnClass += " bg-red-100 dark:bg-red-950 border-red-500";
                              }
                            }
                            return (
                              <Button
                                key={i}
                                variant="outline"
                                className={btnClass}
                                onClick={() => handleSafetyAnswer(option)}
                                disabled={safetyShowResult}
                              >
                                <span className="flex flex-col items-start gap-0.5">
                                  <span>{option}</span>
                                  {safetyQuestions[safetyIndex].optionsSpanish?.[i] && (
                                    <span className="text-xs text-muted-foreground italic">
                                      {safetyQuestions[safetyIndex].optionsSpanish![i]}
                                    </span>
                                  )}
                                </span>
                              </Button>
                            );
                          })}
                        </div>

                        {safetyShowResult && (
                          <div className="mt-4">
                            <div className="bg-muted p-4 rounded-lg mb-3">
                              <p className="text-sm">
                                <strong>Explanation:</strong>{" "}
                                {safetyQuestions[safetyIndex].explanation}
                              </p>
                              {safetyQuestions[safetyIndex].explanationSpanish && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {safetyQuestions[safetyIndex].explanationSpanish}
                                </p>
                              )}
                            </div>
                            <Button onClick={nextSafetyQuestion} className="w-full">
                              {safetyIndex < safetyQuestions.length - 1
                                ? "Next Question"
                                : "See Results"}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                ) : null}
              </div>
            )}

            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/menu-master" />
          </aside>
        </div>
      </div>

      <CTASection />

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
