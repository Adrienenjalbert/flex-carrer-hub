"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { RegionalWageData } from "@/lib/data/wage-report/types";
import { cn } from "@/lib/utils";

interface RegionalHeatmapProps {
  regions: RegionalWageData[];
  title?: string;
  showAdjusted?: boolean;
  className?: string;
}

export function RegionalHeatmap({
  regions,
  title = "Regional Wage Variations",
  showAdjusted = false,
  className,
}: RegionalHeatmapProps) {
  const sortedRegions = [...regions].sort((a, b) => 
    (showAdjusted ? (b.adjustedMedian || 0) : b.median) - 
    (showAdjusted ? (a.adjustedMedian || 0) : a.median)
  );
  
  const maxValue = Math.max(...sortedRegions.map(r => showAdjusted ? (r.adjustedMedian || 0) : r.median));
  const minValue = Math.min(...sortedRegions.map(r => showAdjusted ? (r.adjustedMedian || 0) : r.median));
  const range = maxValue - minValue;

  const getIntensity = (value: number) => {
    const normalized = (value - minValue) / range;
    return Math.max(0.1, normalized);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {showAdjusted ? "Cost-of-living adjusted wages" : "Nominal wages by region"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortedRegions.map((region, index) => {
            const value = showAdjusted ? (region.adjustedMedian || region.median) : region.median;
            const intensity = getIntensity(value);
            
            return (
              <div
                key={`${region.stateCode}-${index}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{region.region}</p>
                    <span className="text-xs text-muted-foreground">{region.stateCode}</span>
                  </div>
                  {region.metroArea && (
                    <p className="text-xs text-muted-foreground">{region.metroArea}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-6 rounded bg-muted relative overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded transition-all",
                        intensity > 0.7 ? "bg-primary" :
                        intensity > 0.4 ? "bg-primary/70" :
                        "bg-primary/40"
                      )}
                      style={{ width: `${intensity * 100}%` }}
                    />
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-semibold">${value.toFixed(2)}/hr</p>
                    {showAdjusted && region.costOfLivingIndex !== 100 && (
                      <p className="text-xs text-muted-foreground">
                        COL: {region.costOfLivingIndex}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {showAdjusted && (
          <p className="text-xs text-muted-foreground mt-4">
            Adjusted wages account for local cost of living (100 = national average)
          </p>
        )}
      </CardContent>
    </Card>
  );
}




