"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, Briefcase, MapPin, Calculator, BookOpen, Award, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { buildSearchIndex, popularSearches, type SearchResult } from "@/lib/search-index";

const typeIcons = {
  role: Briefcase,
  city: MapPin,
  tool: Calculator,
  guide: BookOpen,
  certification: Award,
};

const typeLabels = {
  role: "Job",
  city: "City",
  tool: "Tool",
  guide: "Guide",
  certification: "Certification",
};

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build search index and Fuse instance
  const fuse = useMemo(() => {
    const index = buildSearchIndex();
    return new Fuse(index, {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "description", weight: 0.3 },
        { name: "keywords", weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, []);

  // Search as user types
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 8).map((result) => result.item));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      router.push(results[0].url);
      setQuery("");
      setIsOpen(false);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search tools, guides, jobs, cities, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0) setIsOpen(true);
            }}
            className="pl-12 pr-12 h-14 text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result) => {
            const Icon = typeIcons[result.type];
            const label = typeLabels[result.type];
            return (
              <Link
                key={result.id}
                href={result.url}
                onClick={() => handleResultClick(result.url)}
                className="flex items-start gap-3 p-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0"
              >
                <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{result.title}</p>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {label}
                    </span>
                  </div>
                  {result.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {result.description}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      )}

      {/* Popular Searches */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popularSearches.map((item) => (
          <Link
            key={item.term}
            href={item.url}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {item.term}
          </Link>
        ))}
      </div>
    </div>
  );
}
