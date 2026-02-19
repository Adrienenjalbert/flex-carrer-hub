"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, DollarSign, MapPin, Lightbulb } from "lucide-react";
import Link from "next/link";
import type { InsightCard as InsightCardType } from "@/lib/data/wage-report/types";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  insight: InsightCardType;
  className?: string;
}

const iconMap = {
  stat: DollarSign,
  trend: TrendingUp,
  comparison: MapPin,
  recommendation: Lightbulb,
};

export function InsightCard({ insight, className }: InsightCardProps) {
  const Icon = iconMap[insight.type] || Lightbulb;
  
  const priorityColors = {
    high: "bg-primary/10 border-primary/20 text-primary",
    medium: "bg-secondary border-border",
    low: "bg-muted border-border",
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", priorityColors[insight.priority], className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-background/50">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {insight.type}
              </Badge>
              {insight.priority === 'high' && (
                <Badge variant="default" className="text-xs bg-primary">
                  Important
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-base mb-1">{insight.headline}</h3>
            <p className="text-2xl font-bold mb-2">{insight.value}</p>
            <p className="text-sm text-muted-foreground mb-3">{insight.context}</p>
            {insight.source && (
              <p className="text-xs text-muted-foreground mb-2">
                Source: {insight.source}
              </p>
            )}
            {insight.actionLink && (
              <Link 
                href={insight.actionLink}
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




