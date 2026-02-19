"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { DollarSign, TrendingUp } from "lucide-react";
import type { WagePercentiles } from "@/lib/data/wage-report/types";

interface WageDistributionChartProps {
  percentiles: WagePercentiles;
  title?: string;
  showTips?: { min: number; max: number };
  className?: string;
}

export function WageDistributionChart({
  percentiles,
  title = "Wage Distribution",
  showTips,
  className,
}: WageDistributionChartProps) {
  const chartData = useMemo(() => {
    const data = [
      {
        percentile: "10th",
        label: "Entry Level",
        value: percentiles.percentile10,
        color: "hsl(var(--muted))",
      },
      {
        percentile: "25th",
        label: "Lower Quartile",
        value: percentiles.percentile25,
        color: "hsl(var(--secondary))",
      },
      {
        percentile: "50th",
        label: "Median",
        value: percentiles.percentile50,
        color: "hsl(var(--primary))",
      },
      {
        percentile: "75th",
        label: "Upper Quartile",
        value: percentiles.percentile75,
        color: "hsl(var(--primary))",
      },
      {
        percentile: "90th",
        label: "Experienced",
        value: percentiles.percentile90,
        color: "hsl(var(--accent))",
      },
    ];
    
    if (showTips) {
      data.push({
        percentile: "With Tips",
        label: "Median + Tips",
        value: percentiles.percentile50 + (showTips.min + showTips.max) / 2,
        color: "hsl(var(--success))",
      });
    }
    
    return data;
  }, [percentiles, showTips]);

  const maxValue = Math.max(...chartData.map(d => d.value)) * 1.1;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-semibold mb-1">{data.label}</p>
          <p className="text-primary font-medium">${data.value.toFixed(2)}/hr</p>
          {data.percentile === "With Tips" && (
            <p className="text-xs text-muted-foreground mt-1">
              Base wage + average tips
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Wage distribution across experience levels
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                domain={[0, maxValue]}
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="category" 
                dataKey="label" 
                width={80}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                x={percentiles.percentile50} 
                stroke="hsl(var(--primary))" 
                strokeDasharray="3 3"
                label={{ value: "Median", position: "top" }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">10th Percentile: </span>
            <span className="font-medium">${percentiles.percentile10}/hr</span>
          </div>
          <div>
            <span className="text-muted-foreground">Median: </span>
            <span className="font-medium text-primary">${percentiles.percentile50}/hr</span>
          </div>
          <div>
            <span className="text-muted-foreground">90th Percentile: </span>
            <span className="font-medium">${percentiles.percentile90}/hr</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




