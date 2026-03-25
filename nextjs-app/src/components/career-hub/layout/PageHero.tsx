"use client";

import { ReactNode } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface PageHeroProps {
  title: string;
  description: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  primaryCTA?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  badge?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon?: ReactNode;
  }>;
  className?: string;
}

export default function PageHero({
  title,
  description,
  searchPlaceholder = "Search...",
  onSearch,
  primaryCTA,
  secondaryCTA,
  badge,
  stats,
  className = "",
}: PageHeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    if (onSearch && query) {
      onSearch(query);
    }
  };

  return (
    <section className={`py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              {badge}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          {onSearch && (
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    name="search"
                    type="search"
                    placeholder={searchPlaceholder}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="px-6">
                  Search
                </Button>
              </div>
            </form>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {primaryCTA && (
                <Button size="lg" asChild className="font-semibold">
                  <Link href={primaryCTA.href}>
                    {primaryCTA.icon && <span className="mr-2">{primaryCTA.icon}</span>}
                    {primaryCTA.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                </Button>
              )}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-6 bg-card rounded-xl border border-border/50"
                >
                  {stat.icon && <div className="text-primary mb-2">{stat.icon}</div>}
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

