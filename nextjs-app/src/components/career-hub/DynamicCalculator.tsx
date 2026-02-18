"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for calculators
function CalculatorLoading() {
  return (
    <div className="bg-card rounded-xl border p-6 space-y-4">
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="pt-4 border-t">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

// Dynamic imports for heavy calculator components
// These won't be included in the initial bundle

export const DynamicPayCalculator = dynamic(
  () => import("@/components/career-hub/interactive/EmbeddedPayCalculator"),
  {
    loading: () => <CalculatorLoading />,
    ssr: false, // Disable SSR for interactive calculators
  }
);

export const DynamicEarningsGoalCalculator = dynamic(
  () => import("@/components/career-hub/interactive/EarningsGoalCalculator"),
  {
    loading: () => <CalculatorLoading />,
    ssr: false,
  }
);

export const DynamicSkillsAssessment = dynamic(
  () => import("@/components/career-hub/interactive/SkillsAssessment"),
  {
    loading: () => <CalculatorLoading />,
    ssr: false,
  }
);

export const DynamicSalaryComparison = dynamic(
  () => import("@/components/career-hub/interactive/SalaryComparison"),
  {
    loading: () => <CalculatorLoading />,
    ssr: false,
  }
);

export const DynamicEarningsBreakdown = dynamic(
  () => import("@/components/career-hub/EarningsBreakdown"),
  {
    loading: () => <CalculatorLoading />,
    ssr: false,
  }
);

// Export all dynamic components
const DynamicCalculators = {
  PayCalculator: DynamicPayCalculator,
  EarningsGoalCalculator: DynamicEarningsGoalCalculator,
  SkillsAssessment: DynamicSkillsAssessment,
  SalaryComparison: DynamicSalaryComparison,
  EarningsBreakdown: DynamicEarningsBreakdown,
};

export default DynamicCalculators;

