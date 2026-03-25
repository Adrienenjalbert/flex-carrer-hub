"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen, Dices, Zap, Trophy, Check, X,
  RotateCcw, Shuffle, GraduationCap, Clock,
} from "lucide-react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { cocktails, type Cocktail } from "@/lib/data/cocktails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Mode = "learn" | "flashcard" | "quiz" | "speed";
type SpiritFilter = "all" | Cocktail["baseSpirit"];

const MASTERED_KEY = "cocktail-quiz-mastered";

const spiritIcons: Record<Cocktail["baseSpirit"], string> = {
  vodka: "🍸", gin: "🌿", rum: "🥥", tequila: "🌵",
  whiskey: "🥃", brandy: "🍷", champagne: "🍾",
};

const faqs = [
  {
    question: "What does the Cocktail Quiz test?",
    answer:
      "It tests your knowledge of classic cocktail recipes, including base spirits, ingredients, glassware, and preparation methods. Useful for bartender job prep.",
  },
  {
    question: "Do I need this knowledge for bartending jobs?",
    answer:
      "Yes. Most bars expect you to know at least 20 classic cocktails. This quiz covers the essentials that come up in bartender interviews.",
  },
  {
    question: "How can I improve my score?",
    answer:
      "Use Learn mode to study, then Flashcards to test recall, Quiz for structured practice, and Speed Round for pressure training. Get TIPS certified for a stronger application.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function loadMastered(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem(MASTERED_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

interface QuizQuestion {
  cocktail: Cocktail;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function CocktailQuizClient() {
  const [mode, setMode] = useState<Mode>("learn");
  const [spiritFilter, setSpiritFilter] = useState<SpiritFilter>("all");
  const [masteredCocktails, setMasteredCocktails] = useState<Set<string>>(() => loadMastered());

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardDeck, setFlashcardDeck] = useState<Cocktail[]>([]);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // Speed round state
  const [speedRoundActive, setSpeedRoundActive] = useState(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedCurrent, setSpeedCurrent] = useState<Cocktail | null>(null);
  const [speedAnswered, setSpeedAnswered] = useState(false);

  const filteredCocktails = useMemo(
    () =>
      spiritFilter === "all"
        ? cocktails
        : cocktails.filter((c) => c.baseSpirit === spiritFilter),
    [spiritFilter]
  );

  useEffect(() => {
    localStorage.setItem(MASTERED_KEY, JSON.stringify(Array.from(masteredCocktails)));
  }, [masteredCocktails]);

  useEffect(() => {
    if (mode === "flashcard") {
      setFlashcardDeck(shuffleArray(filteredCocktails));
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [mode, filteredCocktails]);

  useEffect(() => {
    if (mode === "quiz") {
      const questions: QuizQuestion[] = shuffleArray(filteredCocktails)
        .slice(0, 10)
        .map((cocktail) => {
          const questionType = Math.random() > 0.5 ? "ingredients" : "glass";
          if (questionType === "ingredients") {
            const correctIngredients = cocktail.ingredients.map((i) => i.name).join(", ");
            const wrongOptions = shuffleArray(
              filteredCocktails.filter((c) => c.id !== cocktail.id)
            )
              .slice(0, 3)
              .map((c) => c.ingredients.map((i) => i.name).join(", "));
            return {
              cocktail,
              question: `What are the main ingredients in a ${cocktail.name}?`,
              options: shuffleArray([correctIngredients, ...wrongOptions]),
              correctAnswer: correctIngredients,
            };
          } else {
            const wrongGlasses = shuffleArray(
              Array.from(new Set(cocktails.map((c) => c.glass).filter((g) => g !== cocktail.glass)))
            ).slice(0, 3);
            return {
              cocktail,
              question: `What glass is a ${cocktail.name} traditionally served in?`,
              options: shuffleArray([cocktail.glass, ...wrongGlasses]),
              correctAnswer: cocktail.glass,
            };
          }
        });
      setQuizQuestions(questions);
      setQuizIndex(0);
      setQuizScore(0);
      setSelectedAnswer(null);
      setQuizComplete(false);
    }
  }, [mode, filteredCocktails]);

  useEffect(() => {
    if (speedRoundActive && speedTimeLeft > 0) {
      const timer = setInterval(() => setSpeedTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (speedTimeLeft === 0) {
      setSpeedRoundActive(false);
    }
  }, [speedRoundActive, speedTimeLeft]);

  const startSpeedRound = () => {
    setSpeedRoundActive(true);
    setSpeedTimeLeft(60);
    setSpeedScore(0);
    setSpeedCurrent(shuffleArray(filteredCocktails)[0]);
    setSpeedAnswered(false);
  };

  const handleSpeedAnswer = useCallback(
    (correct: boolean) => {
      if (speedAnswered) return;
      setSpeedAnswered(true);
      if (correct && speedCurrent) {
        setSpeedScore((prev) => prev + 1);
        setMasteredCocktails((prev) => { const n = new Set(prev); n.add(speedCurrent.id); return n; });
      }
      setTimeout(() => {
        const remaining = filteredCocktails.filter((c) => c.id !== speedCurrent?.id);
        if (remaining.length > 0) {
          setSpeedCurrent(shuffleArray(remaining)[0]);
          setSpeedAnswered(false);
        } else {
          setSpeedRoundActive(false);
        }
      }, 500);
    },
    [speedAnswered, speedCurrent, filteredCocktails]
  );

  const handleQuizAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect =
      quizQuestions[quizIndex].options[index] === quizQuestions[quizIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      setMasteredCocktails((prev) => { const n = new Set(prev); n.add(quizQuestions[quizIndex].cocktail.id); return n; });
    }
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const toggleMastered = (cocktailId: string) => {
    setMasteredCocktails((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cocktailId)) newSet.delete(cocktailId);
      else newSet.add(cocktailId);
      return newSet;
    });
  };

  const spirits: SpiritFilter[] = [
    "all", "vodka", "gin", "rum", "tequila", "whiskey", "brandy", "champagne",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Cocktail Quiz" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🍸</span>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">CocktailQuiz</h1>
                  <p className="text-lg text-primary font-medium">Bartending Skills Trainer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Master {cocktails.length}+ classic cocktails through interactive learning. Perfect
                for barbacks looking to become bartenders.
              </p>

              <div className="flex gap-4 mt-4 bg-muted/50 rounded-lg p-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{masteredCocktails.size}</p>
                  <p className="text-xs text-muted-foreground">Mastered</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">{cocktails.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">
                    {Math.round((masteredCocktails.size / cocktails.length) * 100)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
            </div>

            {/* Mode Tabs */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="learn">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Learn
                </TabsTrigger>
                <TabsTrigger value="flashcard">
                  <Dices className="h-4 w-4 mr-1.5" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="quiz">
                  <GraduationCap className="h-4 w-4 mr-1.5" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger value="speed">
                  <Zap className="h-4 w-4 mr-1.5" />
                  Speed
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Spirit Filter */}
            <div className="mb-6">
              <Select value={spiritFilter} onValueChange={(v) => setSpiritFilter(v as SpiritFilter)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {spirits.map((spirit) => (
                    <SelectItem key={spirit} value={spirit}>
                      {spirit === "all"
                        ? "🍹 All Spirits"
                        : `${spiritIcons[spirit]} ${spirit.charAt(0).toUpperCase() + spirit.slice(1)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* LEARN MODE */}
            {mode === "learn" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCocktails.map((cocktail) => (
                  <Card key={cocktail.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {spiritIcons[cocktail.baseSpirit]} {cocktail.name}
                        </CardTitle>
                        <button
                          onClick={() => toggleMastered(cocktail.id)}
                          className={cn(
                            "p-1.5 rounded-full transition-colors",
                            masteredCocktails.has(cocktail.id)
                              ? "text-green-600"
                              : "text-muted-foreground hover:text-green-600"
                          )}
                        >
                          {masteredCocktails.has(cocktail.id) ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {cocktail.pronunciation && (
                        <p className="text-xs text-muted-foreground italic">
                          {cocktail.pronunciation}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="outline">{cocktail.baseSpirit}</Badge>
                        <Badge variant="secondary">{cocktail.technique}</Badge>
                        <Badge
                          variant={
                            cocktail.difficulty === "beginner"
                              ? "default"
                              : cocktail.difficulty === "intermediate"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {cocktail.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-medium text-foreground">Ingredients:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {cocktail.ingredients.map((ing, i) => (
                            <li key={i}>
                              {ing.amount} {ing.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm mt-2">
                        <span className="text-muted-foreground">Glass: </span>
                        <span className="font-medium">{cocktail.glass}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Garnish: </span>
                        <span className="font-medium">{cocktail.garnish}</span>
                      </p>
                      {cocktail.tips && (
                        <p className="text-xs text-muted-foreground bg-muted rounded p-2 mt-2 italic">
                          💡 {cocktail.tips}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                      setFlashcardDeck(shuffleArray(filteredCocktails));
                      setFlashcardIndex(0);
                      setIsFlipped(false);
                    }}
                  >
                    <Shuffle className="h-4 w-4 mr-1" />
                    Shuffle
                  </Button>
                </div>

                <div
                  className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
                  onClick={() => setIsFlipped(!isFlipped)}
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
                      <span className="text-5xl mb-4">
                        {spiritIcons[flashcardDeck[flashcardIndex].baseSpirit]}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {flashcardDeck[flashcardIndex].name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Tap to reveal ingredients</p>
                    </div>

                    {/* Back */}
                    <div
                      className={cn(
                        "absolute inset-0 backface-hidden bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/20 p-6 flex flex-col items-center justify-center text-center shadow-md rotate-y-180",
                        !isFlipped && "invisible"
                      )}
                    >
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {flashcardDeck[flashcardIndex].name}
                      </h3>
                      <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                        {flashcardDeck[flashcardIndex].ingredients.map((ing, i) => (
                          <li key={i}>
                            {ing.amount} {ing.name}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground">
                        Glass: {flashcardDeck[flashcardIndex].glass}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Technique: {flashcardDeck[flashcardIndex].technique}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Garnish: {flashcardDeck[flashcardIndex].garnish}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setFlashcardIndex((prev) => Math.max(0, prev - 1));
                      setIsFlipped(false);
                    }}
                    disabled={flashcardIndex === 0}
                  >
                    ←
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFlashcardIndex((prev) =>
                          Math.min(flashcardDeck.length - 1, prev + 1)
                        );
                        setIsFlipped(false);
                      }}
                    >
                      Still Learning
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        toggleMastered(flashcardDeck[flashcardIndex].id);
                        setFlashcardIndex((prev) =>
                          Math.min(flashcardDeck.length - 1, prev + 1)
                        );
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
                      setFlashcardIndex((prev) =>
                        Math.min(flashcardDeck.length - 1, prev + 1)
                      );
                      setIsFlipped(false);
                    }}
                    disabled={flashcardIndex === flashcardDeck.length - 1}
                  >
                    →
                  </Button>
                </div>
              </div>
            )}

            {/* QUIZ MODE */}
            {mode === "quiz" && (
              <div className="max-w-lg mx-auto">
                {quizComplete ? (
                  <Card className="text-center">
                    <CardHeader>
                      <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
                      <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-5xl font-bold mb-2">
                        {quizScore}/{quizQuestions.length}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {quizScore >= 8
                          ? "🎉 Excellent! You're ready to tend bar!"
                          : quizScore >= 5
                          ? "👍 Good job! Keep practicing!"
                          : "📚 Keep studying, you'll get there!"}
                      </p>
                      <Button onClick={() => setMode("quiz")}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                ) : quizQuestions.length > 0 ? (
                  <>
                    <Card className="mb-4">
                      <CardContent className="pt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>
                            Question {quizIndex + 1} of {quizQuestions.length}
                          </span>
                          <Badge variant="secondary">Score: {quizScore}</Badge>
                        </div>
                        <Progress
                          value={((quizIndex + 1) / quizQuestions.length) * 100}
                          className="h-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {quizQuestions[quizIndex].question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {quizQuestions[quizIndex].options.map((option, i) => {
                            let btnClass = "w-full justify-start text-left p-4 h-auto";
                            if (selectedAnswer !== null) {
                              if (option === quizQuestions[quizIndex].correctAnswer) {
                                btnClass +=
                                  " bg-green-100 dark:bg-green-950 border-green-500";
                              } else if (i === selectedAnswer) {
                                btnClass += " bg-red-100 dark:bg-red-950 border-red-500";
                              }
                            }
                            return (
                              <Button
                                key={i}
                                variant="outline"
                                className={btnClass}
                                onClick={() => handleQuizAnswer(i)}
                                disabled={selectedAnswer !== null}
                              >
                                {option}
                              </Button>
                            );
                          })}
                        </div>

                        {selectedAnswer !== null && (
                          <div className="mt-4">
                            <Button onClick={nextQuizQuestion} className="w-full">
                              {quizIndex < quizQuestions.length - 1
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

            {/* SPEED ROUND */}
            {mode === "speed" && (
              <div className="max-w-lg mx-auto">
                {!speedRoundActive ? (
                  <Card className="text-center">
                    <CardHeader>
                      <Zap className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                      <CardTitle>Speed Round</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        You have 60 seconds to identify as many cocktails as possible. Can you name
                        the main base spirit and key ingredients?
                      </p>
                      {speedScore > 0 && (
                        <p className="text-sm text-muted-foreground mb-4">
                          Last score: {speedScore}
                        </p>
                      )}
                      <Button onClick={startSpeedRound} size="lg">
                        <Clock className="h-4 w-4 mr-2" />
                        Start Speed Round
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold font-mono">{speedTimeLeft}s</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        Score: {speedScore}
                      </Badge>
                    </div>
                    <Progress value={(speedTimeLeft / 60) * 100} className="h-2 mb-6" />

                    {speedCurrent && (
                      <Card>
                        <CardHeader className="text-center">
                          <CardTitle className="text-2xl">{speedCurrent.name}</CardTitle>
                          <p className="text-muted-foreground">
                            Do you know this cocktail&apos;s ingredients?
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3 justify-center mb-4">
                            <Button
                              variant="outline"
                              size="lg"
                              onClick={() => handleSpeedAnswer(false)}
                              disabled={speedAnswered}
                            >
                              Skip
                            </Button>
                            <Button
                              size="lg"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleSpeedAnswer(true)}
                              disabled={speedAnswered}
                            >
                              I Know It!
                            </Button>
                          </div>

                          {speedAnswered && (
                            <div className="bg-muted rounded-lg p-4 text-sm">
                              <p className="font-medium mb-1">Answer:</p>
                              <ul className="list-disc list-inside text-muted-foreground">
                                {speedCurrent.ingredients.map((ing, i) => (
                                  <li key={i}>
                                    {ing.amount} {ing.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Career Path Connection */}
            <Card className="mt-8 mb-8 bg-gradient-to-r from-primary/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Building Your Bartending Career?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Mastering cocktails is just one step. Explore the full career path from
                      barback to bar manager.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/career-hub/tools/career-path">View Career Path →</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FAQSection faqs={faqs} />
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/cocktail-quiz" />
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
