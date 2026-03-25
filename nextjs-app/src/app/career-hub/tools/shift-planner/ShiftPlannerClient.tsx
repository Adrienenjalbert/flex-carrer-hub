"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Sun, Moon, Sparkles, Calendar, DollarSign, X, Briefcase, GraduationCap, Baby } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";
import FAQSection from "@/components/career-hub/FAQSection";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "shift-planner-inputs";
const CALENDAR_KEY = "shift-planner-calendar";

function loadSavedInputs() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function loadCalendarState(): Record<string, BlockType> {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(CALENDAR_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

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

type Industry = keyof typeof TIP_PATTERNS;
type ShiftTime = "day" | "evening" | "night";
type ShiftDay = "weekday" | "weekend";
type BlockType = "work" | "school" | "childcare" | "personal";
type PlannerMode = "calculator" | "calendar";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const TIME_SLOTS = [
  { id: "morning", label: "Morning", sublabel: "6am–12pm", icon: Sun },
  { id: "afternoon", label: "Afternoon", sublabel: "12pm–6pm", icon: Clock },
  { id: "evening", label: "Evening", sublabel: "6pm–10pm", icon: Moon },
  { id: "night", label: "Night", sublabel: "10pm–6am", icon: Moon },
] as const;

const BLOCK_TYPES: { type: BlockType; label: string; icon: typeof Briefcase; color: string; bgColor: string }[] = [
  { type: "work", label: "Work Shift", icon: Briefcase, color: "text-blue-700 dark:text-blue-300", bgColor: "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700" },
  { type: "school", label: "School/Class", icon: GraduationCap, color: "text-purple-700 dark:text-purple-300", bgColor: "bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700" },
  { type: "childcare", label: "Childcare", icon: Baby, color: "text-pink-700 dark:text-pink-300", bgColor: "bg-pink-100 dark:bg-pink-900/40 border-pink-300 dark:border-pink-700" },
  { type: "personal", label: "Personal", icon: Clock, color: "text-amber-700 dark:text-amber-300", bgColor: "bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700" },
];

function getMultiplier(industry: Industry, shiftDay: ShiftDay, shiftTime: ShiftTime): number {
  const patterns = TIP_PATTERNS[industry];
  let key: string;
  if (industry === "hospitality") {
    const timeMap: Record<ShiftTime, string> = { day: "Lunch", evening: "Dinner", night: "Night" };
    key = `${shiftDay}${timeMap[shiftTime]}`;
  } else {
    const timeMap: Record<ShiftTime, string> = { day: "Day", evening: "Evening", night: "Night" };
    key = `${shiftDay}${timeMap[shiftTime]}`;
  }
  const value = (patterns as Record<string, number | string>)[key];
  return typeof value === "number" ? value : 1.0;
}

const faqs = [
  {
    question: "How does the weekly planner work?",
    answer:
      "Tap any time block to mark it as a work shift, school, childcare, or personal time. The planner shows you how many hours you can work around your fixed commitments and estimates your weekly earnings.",
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
  const saved = useMemo(() => loadSavedInputs(), []);
  const [mode, setMode] = useState<PlannerMode>("calendar");
  const [hourlyRate, setHourlyRate] = useState<string>(saved?.hourlyRate ?? "15");
  const [hoursPerShift, setHoursPerShift] = useState<number[]>([saved?.hoursPerShift ?? 6]);
  const [shiftsPerWeek, setShiftsPerWeek] = useState<number[]>([saved?.shiftsPerWeek ?? 4]);
  const [expectedTips, setExpectedTips] = useState<string>(saved?.expectedTips ?? "50");
  const [industry, setIndustry] = useState<Industry>(saved?.industry ?? "hospitality");
  const [shiftTime, setShiftTime] = useState<ShiftTime>(saved?.shiftTime ?? "day");
  const [shiftDay, setShiftDay] = useState<ShiftDay>(saved?.shiftDay ?? "weekday");

  const [calendarBlocks, setCalendarBlocks] = useState<Record<string, BlockType>>(() => loadCalendarState());
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>("work");

  useEffect(() => {
    if (industry !== "hospitality") setExpectedTips("0");
  }, [industry]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      hourlyRate, hoursPerShift: hoursPerShift[0], shiftsPerWeek: shiftsPerWeek[0],
      expectedTips, industry, shiftTime, shiftDay,
    }));
  }, [hourlyRate, hoursPerShift, shiftsPerWeek, expectedTips, industry, shiftTime, shiftDay]);

  useEffect(() => {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(calendarBlocks));
  }, [calendarBlocks]);

  const toggleBlock = useCallback((day: string, slot: string) => {
    const key = `${day}-${slot}`;
    setCalendarBlocks(prev => {
      const next = { ...prev };
      if (next[key] === selectedBlockType) {
        delete next[key];
      } else {
        next[key] = selectedBlockType;
      }
      return next;
    });
  }, [selectedBlockType]);

  const clearCalendar = useCallback(() => {
    setCalendarBlocks({});
  }, []);

  const calendarStats = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const tips = industry === "hospitality" ? (parseFloat(expectedTips) || 0) : 0;
    let workBlocks = 0;
    let busyBlocks = 0;
    const totalBlocks = DAYS.length * TIME_SLOTS.length;

    const entries = Object.entries(calendarBlocks);
    for (const [, type] of entries) {
      if (type === "work") workBlocks++;
      else busyBlocks++;
    }

    const hoursPerBlock = 4;
    const workHours = workBlocks * hoursPerBlock;
    const availableBlocks = totalBlocks - busyBlocks - workBlocks;
    const maxAvailableHours = availableBlocks * hoursPerBlock;

    const weeklyEarnings = workHours * rate;
    const estimatedTips = industry === "hospitality" ? (workBlocks * tips) : 0;
    const weeklyTotal = weeklyEarnings + estimatedTips;

    return { workBlocks, busyBlocks, availableBlocks, workHours, maxAvailableHours, weeklyEarnings, estimatedTips, weeklyTotal };
  }, [calendarBlocks, hourlyRate, expectedTips, industry]);

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = hoursPerShift[0];
    const shifts = shiftsPerWeek[0];
    const tips = parseFloat(expectedTips) || 0;
    const multiplier = getMultiplier(industry, shiftDay, shiftTime);
    const weeklyBase = rate * hours * shifts;
    let weeklyTips = 0;
    let shiftPremium = 0;
    if (industry === "hospitality") {
      weeklyTips = tips * shifts * multiplier;
    } else if (multiplier > 1.0) {
      shiftPremium = weeklyBase * (multiplier - 1.0);
    }
    const weeklyTotal = weeklyBase + weeklyTips + shiftPremium;
    return {
      weeklyBase, weeklyTips, shiftPremium, weeklyTotal,
      monthlyTotal: weeklyTotal * 4.33, yearlyTotal: weeklyTotal * 52,
      hoursPerWeek: hours * shifts,
      effectiveHourlyRate: weeklyTotal / (hours * shifts) || 0,
      multiplier,
    };
  }, [hourlyRate, hoursPerShift, shiftsPerWeek, expectedTips, industry, shiftTime, shiftDay]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Shift Planner" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Shift Planner
              </h1>
              <p className="text-lg text-muted-foreground">
                Plan your ideal week and see how flexible shifts fit around your life.
              </p>
            </div>

            {/* Mode Tabs */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as PlannerMode)} className="mb-6">
              <TabsList className="grid grid-cols-2 w-full max-w-sm">
                <TabsTrigger value="calendar">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Build Your Week
                </TabsTrigger>
                <TabsTrigger value="calculator">
                  <DollarSign className="h-4 w-4 mr-1.5" />
                  Earnings Calculator
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* ==================== CALENDAR MODE ==================== */}
            {mode === "calendar" && (
              <>
                {/* Rate & Industry */}
                <Card className="mb-4">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex flex-wrap gap-4 items-end">
                      <div className="flex-1 min-w-[120px]">
                        <Label htmlFor="cal-rate" className="text-xs">Hourly Rate ($)</Label>
                        <Input id="cal-rate" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1 h-9" />
                      </div>
                      <div>
                        <Label className="text-xs block mb-1">Industry</Label>
                        <ToggleGroup type="single" value={industry} onValueChange={(v) => v && setIndustry(v as Industry)} className="justify-start">
                          <ToggleGroupItem value="hospitality" className="text-xs h-9 px-3">Hospitality</ToggleGroupItem>
                          <ToggleGroupItem value="industrial" className="text-xs h-9 px-3">Warehouse</ToggleGroupItem>
                          <ToggleGroupItem value="retail" className="text-xs h-9 px-3">Retail</ToggleGroupItem>
                        </ToggleGroup>
                      </div>
                      {industry === "hospitality" && (
                        <div className="min-w-[100px]">
                          <Label htmlFor="cal-tips" className="text-xs">Tips/Shift ($)</Label>
                          <Input id="cal-tips" type="number" value={expectedTips} onChange={(e) => setExpectedTips(e.target.value)} className="mt-1 h-9" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Block Type Selector */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm text-muted-foreground self-center mr-1">Tap to place:</span>
                  {BLOCK_TYPES.map((bt) => (
                    <button
                      key={bt.type}
                      onClick={() => setSelectedBlockType(bt.type)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                        selectedBlockType === bt.type
                          ? cn(bt.bgColor, bt.color, "ring-2 ring-offset-1 ring-primary/40")
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                      aria-label={`Select ${bt.label} block type`}
                      aria-pressed={selectedBlockType === bt.type}
                    >
                      <bt.icon className="h-3.5 w-3.5" />
                      {bt.label}
                    </button>
                  ))}
                  <Button variant="ghost" size="sm" onClick={clearCalendar} className="text-xs text-muted-foreground ml-auto" aria-label="Clear all blocks">
                    <X className="h-3 w-3 mr-1" />Clear
                  </Button>
                </div>

                {/* Weekly Calendar Grid */}
                <Card className="mb-6 overflow-x-auto">
                  <CardContent className="pt-4 pb-4 px-2 sm:px-4">
                    <div className="min-w-[500px]">
                      {/* Header row */}
                      <div className="grid grid-cols-8 gap-1 mb-1">
                        <div className="text-xs text-muted-foreground p-1" />
                        {DAYS.map((day, i) => (
                          <div key={day} className={cn(
                            "text-center text-xs font-medium p-1 rounded",
                            i >= 5 ? "text-primary" : "text-foreground"
                          )}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Time slot rows */}
                      {TIME_SLOTS.map((slot) => (
                        <div key={slot.id} className="grid grid-cols-8 gap-1 mb-1">
                          <div className="flex flex-col justify-center pr-1">
                            <span className="text-[10px] font-medium text-foreground leading-tight">{slot.label}</span>
                            <span className="text-[9px] text-muted-foreground leading-tight">{slot.sublabel}</span>
                          </div>
                          {DAYS.map((day) => {
                            const key = `${day}-${slot.id}`;
                            const blockType = calendarBlocks[key];
                            const blockConfig = blockType ? BLOCK_TYPES.find(b => b.type === blockType) : null;

                            return (
                              <button
                                key={key}
                                onClick={() => toggleBlock(day, slot.id)}
                                className={cn(
                                  "h-14 sm:h-16 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-0.5",
                                  blockConfig
                                    ? cn(blockConfig.bgColor, blockConfig.color)
                                    : "bg-muted/30 border-border hover:bg-primary/5 hover:border-primary/30"
                                )}
                                aria-label={`${day} ${slot.label}: ${blockConfig ? blockConfig.label : "Available"}`}
                              >
                                {blockConfig ? (
                                  <>
                                    <blockConfig.icon className="h-4 w-4" />
                                    <span className="text-[9px] font-medium leading-tight">{blockConfig.label.split(" ")[0]}</span>
                                  </>
                                ) : (
                                  <span className="text-[9px] text-muted-foreground">+</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <Card>
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-2xl font-bold text-primary">{calendarStats.workHours}</p>
                      <p className="text-xs text-muted-foreground">Work hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-2xl font-bold text-foreground">{calendarStats.maxAvailableHours}</p>
                      <p className="text-xs text-muted-foreground">Hours available</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-2xl font-bold">${calendarStats.weeklyTotal.toFixed(0)}</p>
                      <p className="text-xs opacity-80">Est. weekly</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-2xl font-bold text-foreground">${(calendarStats.weeklyTotal * 4.33).toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Est. monthly</p>
                    </CardContent>
                  </Card>
                </div>

                {calendarStats.workBlocks > 0 && calendarStats.busyBlocks > 0 && (
                  <Card className="mb-6 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                    <CardContent className="pt-4 pb-3">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        You have <strong>{calendarStats.busyBlocks} committed blocks</strong> (school, childcare, personal) and
                        scheduled <strong>{calendarStats.workBlocks} work shifts</strong> ({calendarStats.workHours} hours) around them.
                        You still have <strong>{calendarStats.availableBlocks} open blocks</strong> ({calendarStats.maxAvailableHours} hours) for more shifts or rest.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* ==================== CALCULATOR MODE ==================== */}
            {mode === "calculator" && (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalcIcon className="h-5 w-5 text-primary" />
                      Calculate Your Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Select Your Industry</Label>
                      <ToggleGroup type="single" value={industry} onValueChange={(v) => v && setIndustry(v as Industry)} className="justify-start">
                        <ToggleGroupItem value="hospitality">Hospitality</ToggleGroupItem>
                        <ToggleGroupItem value="industrial">Warehouse</ToggleGroupItem>
                        <ToggleGroupItem value="retail">Retail</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div>
                      <Label className="mb-2 block">Shift Time</Label>
                      <ToggleGroup type="single" value={shiftTime} onValueChange={(v) => v && setShiftTime(v as ShiftTime)} className="justify-start">
                        <ToggleGroupItem value="day"><Sun className="h-4 w-4 mr-1" />Day</ToggleGroupItem>
                        <ToggleGroupItem value="evening"><Clock className="h-4 w-4 mr-1" />Evening</ToggleGroupItem>
                        <ToggleGroupItem value="night"><Moon className="h-4 w-4 mr-1" />Night</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div>
                      <Label className="mb-2 block">Shift Days</Label>
                      <ToggleGroup type="single" value={shiftDay} onValueChange={(v) => v && setShiftDay(v as ShiftDay)} className="justify-start">
                        <ToggleGroupItem value="weekday">Weekday</ToggleGroupItem>
                        <ToggleGroupItem value="weekend">Weekend</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input id="hourlyRate" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label>Hours Per Shift: {hoursPerShift[0]}</Label>
                      <Slider value={hoursPerShift} onValueChange={setHoursPerShift} max={12} min={3} step={0.5} className="mt-2" />
                    </div>
                    <div>
                      <Label>Shifts Per Week: {shiftsPerWeek[0]}</Label>
                      <Slider value={shiftsPerWeek} onValueChange={setShiftsPerWeek} max={7} min={1} step={1} className="mt-2" />
                    </div>
                    {industry === "hospitality" && (
                      <div>
                        <Label htmlFor="tips">Expected Tips Per Shift ($)</Label>
                        <Input id="tips" type="number" value={expectedTips} onChange={(e) => setExpectedTips(e.target.value)} className="mt-1" />
                        {calculations.multiplier !== 1.0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            x{calculations.multiplier} tip multiplier for {shiftDay} {shiftTime} shifts
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardHeader><CardTitle>Weekly Breakdown</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Weekly (${hourlyRate || "0"}/hr x {hoursPerShift[0]}h x {shiftsPerWeek[0]} shifts)</span>
                        <span className="font-medium">${calculations.weeklyBase.toFixed(2)}</span>
                      </div>
                      {industry === "hospitality" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tips{calculations.multiplier !== 1.0 && ` (x${calculations.multiplier})`}</span>
                          <span className="font-medium">${calculations.weeklyTips.toFixed(2)}</span>
                        </div>
                      )}
                      {industry !== "hospitality" && calculations.shiftPremium > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shift Premium (x{calculations.multiplier.toFixed(2)})</span>
                          <span className="font-medium text-green-600">+${calculations.shiftPremium.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-semibold">Weekly Total</span>
                        <span className="font-bold text-lg">${calculations.weeklyTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <p className="text-sm opacity-80">Weekly Earnings</p>
                      <p className="text-3xl font-bold">${calculations.weeklyTotal.toFixed(0)}</p>
                      <p className="text-sm opacity-80 mt-1">{calculations.hoursPerWeek} hours/week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Monthly</p>
                      <p className="text-3xl font-bold text-foreground">${calculations.monthlyTotal.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground mt-1">Effective: ${calculations.effectiveHourlyRate.toFixed(2)}/hr</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Yearly</p>
                      <p className="text-3xl font-bold text-foreground">${calculations.yearlyTotal.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground mt-1">52 weeks</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      {industry === "hospitality" ? "Maximize Your Tips" : industry === "industrial" ? "Shift Premium Insights" : "Best Shifts for Retail"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{TIP_PATTERNS[industry].description}</p>
                    {industry === "hospitality" && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm"><Moon className="h-4 w-4 text-primary" /><span>Weekend nights: +80% tips</span></div>
                        <div className="flex items-center gap-2 text-sm"><Sun className="h-4 w-4 text-yellow-500" /><span>Weekend lunch: +10% tips</span></div>
                        <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>Weekday lunch: -30% tips</span></div>
                      </div>
                    )}
                    {industry === "industrial" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm"><Moon className="h-4 w-4 text-primary" /><span>Night shift: +15% premium</span></div>
                        <div className="flex items-center gap-2 text-sm"><Sun className="h-4 w-4 text-yellow-500" /><span>Weekend night: +25% premium</span></div>
                        <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>Weekend day: +10% premium</span></div>
                      </div>
                    )}
                    {industry === "retail" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm"><Sun className="h-4 w-4 text-yellow-500" /><span>Weekend day: +20% busier</span></div>
                        <div className="flex items-center gap-2 text-sm"><Moon className="h-4 w-4 text-primary" /><span>Weekend evening: +10% busier</span></div>
                        <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span>Weekday day: -10% slower</span></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            <FAQSection faqs={faqs} suppressSchema />
            <ToolDisclaimer type="planning" lastUpdated="2024-12-17" />
          </div>

          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/shift-planner" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

function CalcIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" />
      <path d="M12 14h.01" /><path d="M8 14h.01" />
      <path d="M12 18h.01" /><path d="M8 18h.01" />
    </svg>
  );
}
