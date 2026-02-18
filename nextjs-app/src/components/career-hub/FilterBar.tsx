"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
              {config.filters?.map((filter) => (
                <div key={filter.id} className="flex items-center gap-2">
                  <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {filter.label}:
                  </label>
                  <Select value={filter.value || ""} onValueChange={filter.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={`All ${filter.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All {filter.label}</SelectItem>
                      {filter.options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {config.sort && (
                <div className="flex items-center gap-2 ml-auto">
                  <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    Sort:
                  </label>
                  <Select value={config.sort.value || ""} onValueChange={config.sort.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      {config.sort.options.map((option) => (
                        <SelectItem key={option.id} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

