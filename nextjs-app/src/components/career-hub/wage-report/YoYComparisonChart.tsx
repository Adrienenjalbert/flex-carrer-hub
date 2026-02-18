"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface YoYComparisonChartProps {
  currentYear: number;
  priorYear: number;
  currentMedian: number;
  priorMedian: number;
  title?: string;
  className?: string;
}

export function YoYComparisonChart({
  currentYear,
  priorYear,
  currentMedian,
  priorMedian,
  title = "Year-over-Year Comparison",
  className,
}: YoYComparisonChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        year: priorYear.toString(),
        median: priorMedian,
        label: `${priorYear} Median`,
      },
      {
        year: currentYear.toString(),
        median: currentMedian,
        label: `${currentYear} Median`,
      },
    ];
  }, [currentYear, priorYear, currentMedian, priorMedian]);

  const percentChange = ((currentMedian - priorMedian) / priorMedian) * 100;
  const isPositive = percentChange > 0;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-semibold mb-1">{data.label}</p>
          <p className="text-primary font-medium">${data.median.toFixed(2)}/hr</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-success" />
          ) : (
            <TrendingDown className="h-5 w-5 text-destructive" />
          )}
          {title}
        </CardTitle>
        <div className="flex items-center gap-4 mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Change</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Absolute Change</p>
            <p className="text-lg font-semibold">
              {isPositive ? '+' : ''}${Math.abs(currentMedian - priorMedian).toFixed(2)}/hr
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="median" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}



