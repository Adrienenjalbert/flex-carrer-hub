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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MessageSquare,
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { getAllPhrases } from "@/lib/data/job-english-phrases";

// Get all phrases
const jobEnglishPhrases = getAllPhrases();

const categories = [
  { id: "greetings", name: "Greetings" },
  { id: "requests", name: "Requests" },
  { id: "problems", name: "Problems" },
  { id: "teamwork", name: "Teamwork" },
];

export default function WorkTalkClient() {
  const [selectedCategory, setSelectedCategory] = useState("greetings");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const categoryPhrases = jobEnglishPhrases.filter(
    (p) => p.category === selectedCategory
  );
  const currentPhrase = categoryPhrases[currentIndex];

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) =>
      prev < categoryPhrases.length - 1 ? prev + 1 : 0
    );
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : categoryPhrases.length - 1
    );
  };

  const resetCategory = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const speakPhrase = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "WorkTalk" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                WorkTalk: Job English Phrases
              </h1>
              <p className="text-lg text-muted-foreground">
                Practice essential English phrases for workplace situations.
                Build your confidence with flashcards.
              </p>
            </div>

            {/* Category Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Choose a Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup
                  type="single"
                  value={selectedCategory}
                  onValueChange={(value) => {
                    if (value) {
                      setSelectedCategory(value);
                      setCurrentIndex(0);
                      setShowAnswer(false);
                    }
                  }}
                  className="justify-start flex-wrap"
                >
                  {categories.map((cat) => (
                    <ToggleGroupItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
            </Card>

            {/* Flashcard */}
            {currentPhrase && (
              <Card className="mb-8 min-h-[300px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {currentIndex + 1} of {categoryPhrases.length}
                    </Badge>
                    <Badge>{currentPhrase.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center py-8">
                  {!showAnswer ? (
                    <div className="space-y-6">
                      <p className="text-lg text-muted-foreground mb-4">
                        {currentPhrase.context}
                      </p>
                      <p className="text-xl font-semibold">
                        How do you say it in English?
                      </p>
                      <p className="text-lg text-primary">
                        &ldquo;{currentPhrase.spanish}&rdquo;
                      </p>
                      <Button
                        onClick={() => setShowAnswer(true)}
                        size="lg"
                        className="mt-4"
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Show Answer
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-primary/10 rounded-lg p-6">
                        <p className="text-2xl font-bold text-primary mb-2">
                          &ldquo;{currentPhrase.english}&rdquo;
                        </p>
                        {currentPhrase.phonetic && (
                          <p className="text-sm text-muted-foreground italic">
                            /{currentPhrase.phonetic}/
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => speakPhrase(currentPhrase.english)}
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Hear Pronunciation
                      </Button>
                      <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                        <strong>Context:</strong> {currentPhrase.context}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="outline" onClick={prevCard}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button variant="outline" onClick={resetCategory}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
              <Button onClick={nextCard}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Tips */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Practice phrases out loud, not just reading</li>
                  <li>• Use the pronunciation button to hear correct sounds</li>
                  <li>• Try using these phrases in real situations</li>
                  <li>• Review cards multiple times for better retention</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/worktalk" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

