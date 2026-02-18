"use client";

import { useState, useMemo } from "react";
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
  Wine,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { cocktails } from "@/lib/data/cocktails";

// Generate quiz questions from cocktails data
const cocktailQuestions = cocktails.slice(0, 20).map((cocktail) => ({
  question: `What is the base spirit in a ${cocktail.name}?`,
  options: [cocktail.baseSpirit, "vodka", "whiskey", "rum"].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - 0.5),
  correctAnswer: cocktail.baseSpirit,
  category: cocktail.baseSpirit,
  explanation: `The ${cocktail.name} is made with ${cocktail.baseSpirit}. Key ingredients include: ${cocktail.ingredients.map(i => i.name).join(", ")}.`,
}));

export default function CocktailQuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = useMemo(() => {
    // Shuffle and take 10 questions
    return [...cocktailQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }, []);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsComplete(false);
  };

  const getGrade = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { grade: "A", message: "Expert Bartender!", color: "text-green-600" };
    if (percentage >= 80) return { grade: "B", message: "Skilled Mixologist", color: "text-blue-600" };
    if (percentage >= 70) return { grade: "C", message: "Solid Foundation", color: "text-yellow-600" };
    if (percentage >= 60) return { grade: "D", message: "Keep Practicing", color: "text-orange-600" };
    return { grade: "F", message: "More Study Needed", color: "text-red-600" };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Cocktail Quiz" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Cocktail Quiz
              </h1>
              <p className="text-lg text-muted-foreground">
                Test your bartending knowledge with our cocktail quiz. Learn
                classic recipes and techniques.
              </p>
            </div>

            {!isComplete ? (
              <>
                {/* Progress */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                      <span>Score: {score}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardContent>
                </Card>

                {/* Question */}
                {question && (
                  <Card className="mb-8">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2">
                        {question.category}
                      </Badge>
                      <CardTitle className="text-xl">
                        {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {question.options.map((option, index) => {
                          let buttonClass = "w-full justify-start text-left p-4 h-auto";
                          
                          if (showResult) {
                            if (option === question.correctAnswer) {
                              buttonClass += " bg-green-100 dark:bg-green-950 border-green-500";
                            } else if (option === selectedAnswer) {
                              buttonClass += " bg-red-100 dark:bg-red-950 border-red-500";
                            }
                          }

                          return (
                            <Button
                              key={index}
                              variant="outline"
                              className={buttonClass}
                              onClick={() => handleAnswer(option)}
                              disabled={showResult}
                            >
                              <span className="flex items-center gap-2">
                                {showResult && option === question.correctAnswer && (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                )}
                                {showResult && option === selectedAnswer && option !== question.correctAnswer && (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                )}
                                {option}
                              </span>
                            </Button>
                          );
                        })}
                      </div>

                      {showResult && (
                        <div className="mt-6">
                          <div className="bg-muted p-4 rounded-lg mb-4">
                            <p className="text-sm">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                          <Button onClick={nextQuestion} className="w-full">
                            {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              /* Results */
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
                  <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <p className="text-6xl font-bold mb-2">
                      {score}/{questions.length}
                    </p>
                    <p className={`text-xl font-semibold ${getGrade().color}`}>
                      {getGrade().grade} - {getGrade().message}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {((score / questions.length) * 100).toFixed(0)}% Correct
                    </p>
                  </div>

                  <Button onClick={resetQuiz} className="mt-4">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Bartending Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Learn the classic cocktails first - they form the foundation</li>
                  <li>• Understand the base spirits and their flavor profiles</li>
                  <li>• Practice proportions - most classics follow patterns</li>
                  <li>• Speed comes with repetition and muscle memory</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/cocktail-quiz" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

