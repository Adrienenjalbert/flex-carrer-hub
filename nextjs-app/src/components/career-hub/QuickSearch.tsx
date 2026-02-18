"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results or filter pages
      // For now, we'll implement a simple search that redirects to tools/guides/roles
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes("tool") || lowerQuery.includes("calculator")) {
        router.push("/career-hub/tools");
      } else if (lowerQuery.includes("guide") || lowerQuery.includes("how to")) {
        router.push("/career-hub/guides");
      } else if (lowerQuery.includes("job") || lowerQuery.includes("role")) {
        router.push("/career-hub/roles");
      } else {
        router.push(`/career-hub?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tools, guides, jobs, or topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 h-14 text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {["Pay Calculator", "Resume Templates", "Interview Questions", "I-9 Forms"].map((term) => (
          <Link
            key={term}
            href={`/career-hub?search=${encodeURIComponent(term)}`}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {term}
          </Link>
        ))}
      </div>
    </form>
  );
}

