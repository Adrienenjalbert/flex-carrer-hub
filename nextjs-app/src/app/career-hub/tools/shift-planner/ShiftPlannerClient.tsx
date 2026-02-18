"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Calendar,
  Target,
  Zap,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import FAQSection from "@/components/career-hub/FAQSection";
import { roles } from "@/lib/data/roles";

// Tip patterns by day and shift type
const TIP_PATTERNS = {
  hospitality: {
    weekdayLunch: 0.7,
    weekdayDinner: 1.0,
    weekdayNight: 1.2,
    weekendLunch: 1.1,
    weekendDinner: 1.5,
    weekendNight: 1.8,
    description:
      "Best tips: Friday/Saturday nights. Dinner rush outperforms lunch.",
  },
  industrial: {
    weekdayDay: 1.0,
    weekdayNight: 1.15,
    weekendDay: 1.1,
    weekendNight: 1.25,
    description: "Night and weekend shifts often have 10-25% premium pay.",
  },
  retail: {
    weekdayDay: 0.9,
    weekdayEvening: 1.0,
    weekendDay: 1.2,
    weekendEvening: 1.1,
    description: "Weekend day shifts often busiest. Holiday seasons pay most.",
  },
};

const faqs = [
  {
    question: "How accurate is the tip estimate?",
    answer:
      "Our tip estimates are based on industry averages and patterns. Actual tips vary by location, establishment type, and personal performance. Use this as a planning guide, not a guarantee.",
  },
  {
    question: "What are premium shifts?",
    answer:
      "Premium shifts typically include nights, weekends, and holidays. These often pay 10-25% more than standard day shifts due to higher demand and lower worker availability.",
  },
  {
    question: "How can I maximize my earnings?",
    answer:
      "Focus on weekend evening shifts in hospitality, night shifts in warehouse/industrial, and weekend day shifts in retail. Build a good reputation to get first pick of premium shifts.",
  },
  {
    question: "Should I take more short shifts or fewer long shifts?",
    answer:
      "Generally, fewer longer shifts are more efficient due to travel time. However, mixing in some short high-tip shifts (like Friday dinner) can boost overall earnings.",
  },
];

export default function ShiftPlannerClient() {
  const [hourlyRate, setHourlyRate] = useState<string>("15");
  const [hoursPerShift, setHoursPerShift] = useState<number[]>([6]);
  const [shiftsPerWeek, setShiftsPerWeek] = useState<number[]>([4]);
  const [expectedTips, setExpectedTips] = useState<string>("50");
  const [industry, setIndustry] = useState<string>("hospitality");

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = hoursPerShift[0];
    const shifts = shiftsPerWeek[0];
    const tips = parseFloat(expectedTips) || 0;

    const weeklyBase = rate * hours * shifts;
    const weeklyTips = tips * shifts;
    const weeklyTotal = weeklyBase + weeklyTips;
    const monthlyTotal = weeklyTotal * 4.33;
    const yearlyTotal = weeklyTotal * 52;

    return {
      weeklyBase,
      weeklyTips,
      weeklyTotal,
      monthlyTotal,
      yearlyTotal,
      hoursPerWeek: hours * shifts,
      effectiveHourlyRate: weeklyTotal / (hours * shifts) || 0,
    };
  }, [hourlyRate, hoursPerShift, shiftsPerWeek, expectedTips]);

  const tipRoles = roles.filter((r) => r.industry === "hospitality");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Shift Income Planner" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Shift Income Planner
              </h1>
              <p className="text-lg text-muted-foreground">
                Plan your weekly earnings based on shifts, hourly rate, and
                tips. See how different schedules affect your income.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Calculate Your Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Selection */}
                <div>
                  <Label className="mb-2 block">Select Your Industry</Label>
                  <ToggleGroup
                    type="single"
                    value={industry}
                    onValueChange={(value) => value && setIndustry(value)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="hospitality">
                      Hospitality
                    </ToggleGroupItem>
                    <ToggleGroupItem value="industrial">
                      Warehouse
                    </ToggleGroupItem>
                    <ToggleGroupItem value="retail">Retail</ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Hourly Rate */}
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Hours Per Shift */}
                <div>
                  <Label>Hours Per Shift: {hoursPerShift[0]}</Label>
                  <Slider
                    value={hoursPerShift}
                    onValueChange={setHoursPerShift}
                    max={12}
                    min={3}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                {/* Shifts Per Week */}
                <div>
                  <Label>Shifts Per Week: {shiftsPerWeek[0]}</Label>
                  <Slider
                    value={shiftsPerWeek}
                    onValueChange={setShiftsPerWeek}
                    max={7}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                {/* Expected Tips */}
                {industry === "hospitality" && (
                  <div>
                    <Label htmlFor="tips">Expected Tips Per Shift ($)</Label>
                    <Input
                      id="tips"
                      type="number"
                      value={expectedTips}
                      onChange={(e) => setExpectedTips(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <p className="text-sm opacity-80">Weekly Earnings</p>
                  <p className="text-3xl font-bold">
                    ${calculations.weeklyTotal.toFixed(0)}
                  </p>
                  <p className="text-sm opacity-80 mt-1">
                    {calculations.hoursPerWeek} hours/week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Monthly</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.monthlyTotal.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Effective: ${calculations.effectiveHourlyRate.toFixed(2)}/hr
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Yearly</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.yearlyTotal.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    52 weeks
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tip Insights */}
            {industry === "hospitality" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Maximize Your Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {TIP_PATTERNS.hospitality.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Moon className="h-4 w-4 text-primary" />
                      <span>Weekend nights: +80% tips</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span>Weekend lunch: +10% tips</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Weekday lunch: -30% tips</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="planning"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/shift-planner" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

function Calculator({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

