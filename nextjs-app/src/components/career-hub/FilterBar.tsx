"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterConfig {
  search?: {
    placeholder: string;
    onSearch: (query: string) => void;
  };
  filters?: Array<{
    id: string;
    label: string;
    options: FilterOption[];
    value?: string;
    onChange: (value: string) => void;
  }>;
  sort?: {
    options: FilterOption[];
    value?: string;
    onChange: (value: string) => void;
  };
  activeFilters?: Array<{
    id: string;
    label: string;
    value: string;
    onRemove: () => void;
  }>;
}

interface FilterBarProps {
  config: FilterConfig;
  className?: string;
}

export default function FilterBar({ config, className = "" }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (config.search && searchQuery) {
      config.search.onSearch(searchQuery);
    }
  };

  const clearAllFilters = () => {
    config.filters?.forEach((filter) => {
      if (filter.value) {
        filter.onChange("");
      }
    });
    if (config.sort?.value) {
      config.sort.onChange("");
    }
    setSearchQuery("");
  };

  const hasActiveFilters = config.activeFilters && config.activeFilters.length > 0;

  return (
    <div className={`bg-card border-b border-border/50 sticky top-[57px] z-40 ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          {config.search && (
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={config.search.placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          )}

          {/* Filters and Sort */}
          {(config.filters || config.sort) && (
            <div className="flex flex-wrap items-center gap-4">
              {config.filters?.map((filter) => {
                // Filter out options with empty values
                const validOptions = filter.options.filter(
                  (opt) => opt.value !== "" && opt.value !== "__all__"
                );
                return (
                  <div key={filter.id} className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {filter.label}:
                    </label>
                    <select
                      value={filter.value || ""}
                      onChange={(e) => filter.onChange(e.target.value)}
                      className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">All {filter.label}</option>
                      {validOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}

              {config.sort && (
                <div className="flex items-center gap-2 ml-auto">
                  <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    Sort:
                  </label>
                  <select
                    value={config.sort.value || ""}
                    onChange={(e) => config.sort!.onChange(e.target.value)}
                    className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Default</option>
                    {config.sort.options
                      .filter(
                        (opt) => opt.value !== "" && opt.value !== "__all__"
                      )
                      .map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {config.activeFilters?.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1"
                >
                  {filter.label}: {filter.value}
                  <button
                    onClick={filter.onRemove}
                    className="ml-1 hover:text-destructive"
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-auto py-1"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
