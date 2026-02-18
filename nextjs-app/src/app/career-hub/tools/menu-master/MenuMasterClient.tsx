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
  ChefHat,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  Volume2,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import { culinaryTerms } from "@/lib/data/culinary-terms";

const categories = [
  { id: "cooking-methods", name: "Cooking Methods" },
  { id: "cuts", name: "Cuts & Prep" },
  { id: "sauces", name: "Sauces" },
  { id: "french-terms", name: "French Terms" },
];

export default function MenuMasterClient() {
  const [selectedCategory, setSelectedCategory] = useState("cooking-methods");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const terms = culinaryTerms.filter((t) => t.category === selectedCategory);
  const term = terms[currentIndex];

  const nextCard = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev < terms.length - 1 ? prev + 1 : 0));
  };

  const prevCard = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : terms.length - 1));
  };

  const resetCategory = () => {
    setCurrentIndex(0);
    setShowDefinition(false);
  };

  const speakTerm = (text: string) => {
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
            { label: "Menu Master" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Menu Master
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn essential culinary terms and menu vocabulary. Perfect for
                servers, kitchen staff, and hospitality workers.
              </p>
            </div>

            {/* Category Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
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
                      setShowDefinition(false);
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
            {term && (
              <Card className="mb-8 min-h-[350px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {currentIndex + 1} of {terms.length}
                    </Badge>
                    {term.difficulty && (
                      <Badge
                        variant={
                          term.difficulty === "beginner"
                            ? "default"
                            : term.difficulty === "intermediate"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {term.difficulty}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="mb-6">
                    <h2 className="text-4xl font-bold text-primary mb-2">
                      {term.term}
                    </h2>
                    {term.pronunciation && (
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-muted-foreground italic">
                          /{term.pronunciation}/
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => speakTerm(term.term)}
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {!showDefinition ? (
                    <Button
                      onClick={() => setShowDefinition(true)}
                      size="lg"
                      variant="outline"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Show Definition
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-primary/10 rounded-lg p-6">
                        <p className="text-lg">{term.definition}</p>
                      </div>
                      {term.definitionSpanish && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Spanish:</strong> {term.definitionSpanish}
                        </p>
                      )}
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
                <CardTitle>Learning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Try to recall the definition before flipping the card</li>
                  <li>• Say the term out loud to practice pronunciation</li>
                  <li>• Use terms in context when describing dishes</li>
                  <li>• Review regularly - spaced repetition helps retention</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/menu-master" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

