"use client";

import { useState } from "react";
import { Flame, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DailyChallengeItem {
  id: string;
  question: string;
  answer: string;
  hint?: string;
}

interface DailyChallengeProps {
  toolName: string;
  items: DailyChallengeItem[];
  streak: number;
  isActiveToday: boolean;
  onComplete: () => void;
}

export default function DailyChallenge({
  toolName,
  items,
  streak,
  isActiveToday,
  onComplete,
}: DailyChallengeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const progress = ((currentIndex + (showAnswer ? 1 : 0)) / items.length) * 100;

  if (items.length === 0) return null;

  if (isActiveToday && !isDone) {
    return (
      <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-800">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
            <Flame className="h-4 w-4" />
            <span className="font-medium">{streak}-day streak! You already practiced today.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isDone) {
    return (
      <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800">
        <CardContent className="pt-5 pb-4 text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="font-semibold text-foreground">
            Daily Challenge Complete! {score}/{items.length}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">{streak + 1}-day streak</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const item = items[currentIndex];

  const handleGotIt = () => {
    setScore((s) => s + 1);
    advance();
  };

  const handleSkip = () => {
    advance();
  };

  const advance = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setIsDone(true);
      onComplete();
    }
  };

  return (
    <Card className="mb-6 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-primary/40 text-primary">
              Today&apos;s {toolName} Challenge
            </Badge>
            {streak > 0 && (
              <span className="flex items-center gap-1 text-xs text-orange-600">
                <Flame className="h-3 w-3" /> {streak}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1}/{items.length}
          </span>
        </div>

        <Progress value={progress} className="h-1.5 mb-4" />

        <div className="min-h-[80px]">
          <p className="font-medium text-foreground mb-1">{item.question}</p>
          {item.hint && !showAnswer && (
            <p className="text-xs text-muted-foreground italic">{item.hint}</p>
          )}

          {showAnswer ? (
            <div className="mt-3">
              <div className="bg-primary/10 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-primary">{item.answer}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSkip} className="flex-1">
                  Need Practice
                </Button>
                <Button size="sm" onClick={handleGotIt} className="flex-1 bg-green-600 hover:bg-green-700">
                  Got It!
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnswer(true)}
              className="mt-3"
            >
              Show Answer <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
