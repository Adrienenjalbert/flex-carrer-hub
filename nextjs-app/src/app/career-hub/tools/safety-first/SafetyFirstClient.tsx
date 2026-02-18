"use client";

import { useState } from "react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HardHat,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { safetyScenarios } from "@/lib/data/safety-scenarios";

const industries = [
  { id: "warehouse", name: "Warehouse", icon: HardHat },
  { id: "hospitality", name: "Hospitality", icon: UtensilsCrossed },
  { id: "retail", name: "Retail", icon: ShoppingBag },
];

export default function SafetyFirstClient() {
  const [selectedIndustry, setSelectedIndustry] = useState("warehouse");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const scenarios = safetyScenarios.filter(
    (s) => s.industry === selectedIndustry
  );
  const scenario = scenarios[currentIndex];
  const progress = ((currentIndex + 1) / scenarios.length) * 100;

  const getCorrectAnswer = () => {
    const correctOption = scenario.options.find((opt) => opt.correct);
    return correctOption?.text || "";
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === getCorrectAnswer()) {
      setScore(score + 1);
    }
  };

  const nextScenario = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsComplete(false);
  };

  const changeIndustry = (industry: string) => {
    setSelectedIndustry(industry);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Safety First" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Safety First Training
              </h1>
              <p className="text-lg text-muted-foreground">
                Practice workplace safety scenarios. Learn what to do in
                emergency situations.
              </p>
            </div>

            {/* Industry Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Choose Your Industry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup
                  type="single"
                  value={selectedIndustry}
                  onValueChange={(value) => value && changeIndustry(value)}
                  className="justify-start flex-wrap"
                >
                  {industries.map((ind) => (
                    <ToggleGroupItem key={ind.id} value={ind.id}>
                      <ind.icon className="h-4 w-4 mr-2" />
                      {ind.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>

            {!isComplete && scenario ? (
              <>
                {/* Progress */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Scenario {currentIndex + 1} of {scenarios.length}</span>
                      <span>Score: {score}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardContent>
                </Card>

                {/* Scenario */}
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <Badge variant="outline">{scenario.industry}</Badge>
                    </div>
                    <CardTitle className="text-xl">
                      {scenario.scenario}
                    </CardTitle>
                    <CardDescription>
                      {scenario.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scenario.options.map((option, index) => {
                        let buttonClass = "w-full justify-start text-left p-4 h-auto";
                        const correctAnswer = getCorrectAnswer();
                        
                        if (showResult) {
                          if (option.text === correctAnswer) {
                            buttonClass += " bg-green-100 dark:bg-green-950 border-green-500";
                          } else if (option.text === selectedAnswer) {
                            buttonClass += " bg-red-100 dark:bg-red-950 border-red-500";
                          }
                        }

                        return (
                          <Button
                            key={index}
                            variant="outline"
                            className={buttonClass}
                            onClick={() => handleAnswer(option.text)}
                            disabled={showResult}
                          >
                            <span className="flex items-center gap-2">
                              {showResult && option.correct && (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              )}
                              {showResult && option.text === selectedAnswer && !option.correct && (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              {option.text}
                            </span>
                          </Button>
                        );
                      })}
                    </div>

                    {showResult && (
                      <div className="mt-6">
                        <div className="bg-muted p-4 rounded-lg mb-4">
                          <p className="text-sm">
                            <strong>Why:</strong> {scenario.options.find(o => o.correct)?.explanation || ""}
                          </p>
                        </div>
                        <Button onClick={nextScenario} className="w-full">
                          {currentIndex < scenarios.length - 1 ? "Next Scenario" : "See Results"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : isComplete ? (
              /* Results */
              <Card className="mb-8">
                <CardHeader className="text-center">
                  <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
                  <CardTitle className="text-2xl">Training Complete!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <p className="text-6xl font-bold mb-2">
                      {score}/{scenarios.length}
                    </p>
                    <p className="text-muted-foreground">
                      {((score / scenarios.length) * 100).toFixed(0)}% Correct
                    </p>
                  </div>

                  <Button onClick={resetQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Practice Again
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {/* Safety Tips */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>General Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Always report hazards to your supervisor immediately</li>
                  <li>• Know the location of emergency exits and first aid kits</li>
                  <li>• Wear appropriate PPE for your work environment</li>
                  <li>• Never take shortcuts that compromise safety</li>
                  <li>• Ask questions if you are unsure about a procedure</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/safety-first" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

