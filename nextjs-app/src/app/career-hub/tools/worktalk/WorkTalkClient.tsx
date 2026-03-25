"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, Volume2, Star, Filter, X, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import PhraseCard from "@/components/career-hub/tools/PhraseCard";
import FlashcardMode from "@/components/career-hub/tools/FlashcardMode";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { industries, categoryInfo, type JobPhrase, type IndustryVocabulary } from "@/lib/data/job-english-phrases";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ViewMode = "browse" | "practice" | "favorites";
type CategoryFilter = JobPhrase["category"] | "all";

const FAVORITES_KEY = "worktalk-favorites";

const faqs = [
  {
    question: "What is WorkTalk?",
    answer:
      "WorkTalk teaches essential workplace English phrases for non-native speakers. Each phrase includes the English text, Spanish translation, phonetic pronunciation, and context for when to use it.",
  },
  {
    question: "What workplace situations does it cover?",
    answer:
      "It covers common scenarios like greeting customers, asking for help, reporting problems, and communicating with supervisors across restaurant, warehouse, and retail settings.",
  },
  {
    question: "Can I practice pronunciation?",
    answer:
      "Yes. Use the audio buttons to hear correct pronunciation in English and Spanish. Each phrase also includes a phonetic guide.",
  },
];

function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
}

export default function WorkTalkClient() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryVocabulary | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());
  const [speakingPhraseId, setSpeakingPhraseId] = useState<string | null>(null);

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({ defaultRate: 0.8 });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const currentPhrases = useMemo(() => {
    if (!selectedIndustry) return [];
    return selectedIndustry.phrases;
  }, [selectedIndustry]);

  const filteredPhrases = useMemo(() => {
    let phrases = currentPhrases;

    if (categoryFilter !== "all") {
      phrases = phrases.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      phrases = phrases.filter(
        (p) =>
          p.english.toLowerCase().includes(query) ||
          p.spanish.toLowerCase().includes(query) ||
          p.context.toLowerCase().includes(query)
      );
    }

    if (viewMode === "favorites") {
      phrases = phrases.filter((p) => favorites.has(p.id));
    }

    return phrases;
  }, [currentPhrases, categoryFilter, searchQuery, viewMode, favorites]);

  const groupedPhrases = useMemo(() => {
    if (categoryFilter !== "all") return null;

    const groups: Record<string, JobPhrase[]> = {};
    filteredPhrases.forEach((phrase) => {
      if (!groups[phrase.category]) {
        groups[phrase.category] = [];
      }
      groups[phrase.category].push(phrase);
    });
    return groups;
  }, [filteredPhrases, categoryFilter]);

  const availableCategories = useMemo(() => {
    if (!selectedIndustry) return [];
    const cats = new Set(selectedIndustry.phrases.map((p) => p.category));
    return Array.from(cats);
  }, [selectedIndustry]);

  const handlePlayEnglish = useCallback(
    (phrase: JobPhrase) => {
      if (isSpeaking && speakingPhraseId === phrase.id) {
        stop();
        setSpeakingPhraseId(null);
      } else {
        stop();
        speak(phrase.english, "en-US");
        setSpeakingPhraseId(phrase.id);
      }
    },
    [isSpeaking, speakingPhraseId, speak, stop]
  );

  const handlePlaySpanish = useCallback(
    (phrase: JobPhrase) => {
      stop();
      speak(phrase.spanish, "es-ES");
      setSpeakingPhraseId(phrase.id);
    },
    [speak, stop]
  );

  const handleToggleFavorite = useCallback((phraseId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(phraseId)) {
        next.delete(phraseId);
      } else {
        next.add(phraseId);
      }
      return next;
    });
  }, []);

  const handleBackToIndustries = useCallback(() => {
    setSelectedIndustry(null);
    setViewMode("browse");
    setCategoryFilter("all");
    setSearchQuery("");
  }, []);

  const breadcrumbItems = selectedIndustry
    ? [
        { label: "Career Hub", href: "/career-hub" },
        { label: "Tools", href: "/career-hub/tools" },
        { label: "WorkTalk", href: "/career-hub/tools/worktalk" },
        { label: selectedIndustry.name },
      ]
    : [
        { label: "Career Hub", href: "/career-hub" },
        { label: "Tools", href: "/career-hub/tools" },
        { label: "WorkTalk" },
      ];

  if (viewMode === "practice" && selectedIndustry) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-8 max-w-lg mx-auto">
            <FlashcardMode
              phrases={filteredPhrases.length > 0 ? filteredPhrases : currentPhrases}
              onPlayEnglish={(text) => speak(text, "en-US")}
              onPlaySpanish={(text) => speak(text, "es-ES")}
              isSpeaking={isSpeaking}
              onExit={() => setViewMode("browse")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🗣️</span>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">WorkTalk</h1>
                  <p className="text-lg text-primary font-medium">
                    Job English for Spanish Speakers
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Aprende inglés laboral esencial con pronunciación de audio
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Learn essential workplace English with audio pronunciation &bull; 100% Free &bull; No signup required
              </p>
            </div>

            {!isSupported && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Audio playback is not supported in your browser. Try Chrome or Safari.
                </p>
              </div>
            )}

            {!selectedIndustry ? (
              /* Industry Selection */
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Choose Your Industry / Elige tu industria
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Select the type of work to learn relevant vocabulary
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {industries.map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry)}
                      className="bg-card rounded-xl border border-border p-6 text-left hover:shadow-md hover:border-primary/30 transition-all group"
                    >
                      <span className="text-3xl mb-3 block">{industry.icon}</span>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {industry.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{industry.nameSpanish}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {industry.phrases.length} phrases / frases
                      </p>
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 bg-muted/50 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {industries.reduce((acc, i) => acc + i.phrases.length, 0)}+
                    </p>
                    <p className="text-xs text-muted-foreground">Phrases / Frases</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{industries.length}</p>
                    <p className="text-xs text-muted-foreground">Industries / Industrias</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">🔊</p>
                    <p className="text-xs text-muted-foreground">Audio / Audio</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Phrase Browser */
              <div>
                {/* Back button and industry header */}
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="sm" onClick={handleBackToIndustries}>
                    ← Back / Atrás
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedIndustry.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{selectedIndustry.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedIndustry.nameSpanish}</p>
                    </div>
                  </div>
                </div>

                {/* Mode Tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="mb-6">
                  <TabsList>
                    <TabsTrigger value="browse">
                      <Filter className="h-4 w-4 mr-2" />
                      Browse
                    </TabsTrigger>
                    <TabsTrigger value="practice">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Practice
                    </TabsTrigger>
                    <TabsTrigger value="favorites">
                      <Star className="h-4 w-4 mr-2" />
                      Favorites
                      {favorites.size > 0 && (
                        <span className="ml-1.5 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                          {favorites.size}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Search and Filters */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search / Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2">
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
                    {availableCategories.map((cat) => {
                      const info = categoryInfo[cat];
                      return (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                            categoryFilter === cat
                              ? "bg-primary text-primary-foreground"
                              : cn("border", info.color, "hover:opacity-80")
                          )}
                        >
                          {info.icon} {info.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  {filteredPhrases.length} phrase{filteredPhrases.length !== 1 ? "s" : ""} / frases
                </p>

                {/* Phrases Grid */}
                {filteredPhrases.length === 0 ? (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <p className="text-muted-foreground mb-1">
                      {viewMode === "favorites"
                        ? "No favorites yet. Tap the star on phrases you want to save."
                        : "No phrases found. Try a different search or filter."}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {viewMode === "favorites"
                        ? "Aún no hay favoritos. Toca la estrella en las frases que quieras guardar."
                        : "No se encontraron frases. Prueba otra búsqueda o filtro."}
                    </p>
                  </div>
                ) : groupedPhrases ? (
                  <div className="space-y-8">
                    {Object.entries(groupedPhrases).map(([category, phrases]) => {
                      const info = categoryInfo[category as JobPhrase["category"]];
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-foreground">
                              {info.icon} {info.name} / {info.nameSpanish}
                            </h3>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {phrases.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {phrases.map((phrase) => (
                              <PhraseCard
                                key={phrase.id}
                                phrase={phrase}
                                onPlayEnglish={() => handlePlayEnglish(phrase)}
                                onPlaySpanish={() => handlePlaySpanish(phrase)}
                                isSpeaking={isSpeaking && speakingPhraseId === phrase.id}
                                isFavorite={favorites.has(phrase.id)}
                                onToggleFavorite={() => handleToggleFavorite(phrase.id)}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPhrases.map((phrase) => (
                      <PhraseCard
                        key={phrase.id}
                        phrase={phrase}
                        onPlayEnglish={() => handlePlayEnglish(phrase)}
                        onPlaySpanish={() => handlePlaySpanish(phrase)}
                        isSpeaking={isSpeaking && speakingPhraseId === phrase.id}
                        isFavorite={favorites.has(phrase.id)}
                        onToggleFavorite={() => handleToggleFavorite(phrase.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/worktalk" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
