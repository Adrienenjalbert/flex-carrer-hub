"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, TrendingUp } from "lucide-react";
import { occupationWageData, industryTrends } from "@/lib/data/wage-report/2026-data";
import { compareOccupations } from "@/lib/data/wage-report/insights-engine";
import { WageDistributionChart } from "./WageDistributionChart";
import type { WageExplorerFilters } from "@/lib/data/wage-report/types";

export function WageExplorer() {
  const [filters, setFilters] = useState<WageExplorerFilters>({});
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>([]);

  const availableIndustries = useMemo(() => {
    return industryTrends.map(ind => ({
      value: ind.industrySlug,
      label: ind.industryName,
    }));
  }, []);

  const availableOccupations = useMemo(() => {
    return occupationWageData
      .filter(occ => !filters.industry || occ.industrySlug === filters.industry)
      .map(occ => ({
        value: occ.occupationSlug,
        label: occ.occupationTitle,
        median: occ.currentYear.wagePercentiles.percentile50,
      }))
      .sort((a, b) => b.median - a.median);
  }, [filters.industry]);

  const comparison = useMemo(() => {
    if (selectedOccupations.length === 0) return null;
    return compareOccupations(selectedOccupations);
  }, [selectedOccupations]);

  const handleAddOccupation = (slug: string) => {
    if (selectedOccupations.length < 3 && !selectedOccupations.includes(slug)) {
      setSelectedOccupations([...selectedOccupations, slug]);
    }
  };

  const handleRemoveOccupation = (slug: string) => {
    setSelectedOccupations(selectedOccupations.filter(s => s !== slug));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Wage Explorer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare wages across occupations, industries, and regions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Filter by Industry</label>
            <Select
              value={filters.industry || ""}
              onValueChange={(value) => setFilters({ ...filters, industry: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Industries</SelectItem>
                {availableIndustries.map(ind => (
                  <SelectItem key={ind.value} value={ind.value}>
                    {ind.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Add Occupation to Compare</label>
            <Select
              value=""
              onValueChange={handleAddOccupation}
              disabled={selectedOccupations.length >= 3}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedOccupations.length >= 3 ? "Max 3 occupations" : "Select occupation"} />
              </SelectTrigger>
              <SelectContent>
                {availableOccupations.map(occ => (
                  <SelectItem 
                    key={occ.value} 
                    value={occ.value}
                    disabled={selectedOccupations.includes(occ.value)}
                  >
                    {occ.label} (${occ.median}/hr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected Occupations */}
        {selectedOccupations.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block">Selected for Comparison</label>
            <div className="flex flex-wrap gap-2">
              {selectedOccupations.map(slug => {
                const occ = occupationWageData.find(o => o.occupationSlug === slug);
                if (!occ) return null;
                return (
                  <div
                    key={slug}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20"
                  >
                    <span className="text-sm font-medium">{occ.occupationTitle}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => handleRemoveOccupation(slug)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {comparison && comparison.items.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Comparison Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparison.items.map((item, index) => {
                const occ = occupationWageData.find(o => o.occupationSlug === item.slug);
                if (!occ) return null;
                return (
                  <WageDistributionChart
                    key={item.slug}
                    percentiles={occ.currentYear.wagePercentiles}
                    title={item.label}
                    showTips={occ.currentYear.avgTips}
                    className="h-full"
                  />
                );
              })}
            </div>

            {comparison.insights.length > 0 && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2">Key Insights</h4>
                <ul className="space-y-1 text-sm">
                  {comparison.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedOccupations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Select up to 3 occupations to compare wages</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



