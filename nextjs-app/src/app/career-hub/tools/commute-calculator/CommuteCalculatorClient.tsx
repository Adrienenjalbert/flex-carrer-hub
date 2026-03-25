"use client";

import { useState, useMemo, useEffect } from "react";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, DollarSign } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const STORAGE_KEY = "commute-calculator-inputs";

function loadSavedInputs() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

const faqs = [
  {
    question: "What costs are included in commuting?",
    answer:
      "Commute costs include gas, vehicle wear and tear (IRS estimates ~70¢/mile), parking, tolls, and the value of your time. For public transit, include fares and any connecting costs.",
  },
  {
    question: "How does commute affect my true hourly rate?",
    answer:
      "Commute time and costs effectively reduce your hourly rate. A $20/hr job with a 1-hour commute each way and $10/day in costs might only be worth $15/hr when you factor in unpaid travel time.",
  },
  {
    question: "Is it worth taking a job with a longer commute?",
    answer:
      "Calculate your effective hourly rate after commute costs. Sometimes a slightly lower-paying job closer to home can result in higher take-home pay and better work-life balance.",
  },
  {
    question: "How can I reduce commute costs?",
    answer:
      "Consider carpooling, public transit, working shifts that avoid rush hour (faster commute), grouping shifts together, or finding jobs closer to home. Flexible work often allows choosing nearby shifts.",
  },
];

// Average costs
const GAS_PRICE_PER_GALLON = 3.50;
const AVG_MPG = 28;

export default function CommuteCalculatorClient() {
  const saved = useMemo(() => loadSavedInputs(), []);
  const [hourlyRate, setHourlyRate] = useState<string>(saved?.hourlyRate ?? "18");
  const [commuteDistance, setCommuteDistance] = useState<number[]>([saved?.commuteDistance ?? 15]);
  const [commuteTime, setCommuteTime] = useState<number[]>([saved?.commuteTime ?? 25]);
  const [parkingCost, setParkingCost] = useState<string>(saved?.parkingCost ?? "0");
  const [shiftsPerWeek, setShiftsPerWeek] = useState<number[]>([saved?.shiftsPerWeek ?? 4]);
  const [hoursPerShift, setHoursPerShift] = useState<number[]>([saved?.hoursPerShift ?? 6]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hourlyRate,
        commuteDistance: commuteDistance[0],
        commuteTime: commuteTime[0],
        parkingCost,
        shiftsPerWeek: shiftsPerWeek[0],
        hoursPerShift: hoursPerShift[0],
      })
    );
  }, [hourlyRate, commuteDistance, commuteTime, parkingCost, shiftsPerWeek, hoursPerShift]);

  const calculations = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const distance = commuteDistance[0]; // one-way miles
    const time = commuteTime[0]; // one-way minutes
    const parking = parseFloat(parkingCost) || 0;
    const shifts = shiftsPerWeek[0];
    const shiftHours = hoursPerShift[0];

    // Daily costs
    const dailyMiles = distance * 2; // round trip
    const dailyGasCost = (dailyMiles / AVG_MPG) * GAS_PRICE_PER_GALLON;
    const dailyWearCost = dailyMiles * 0.30; // Vehicle wear (excluding gas)
    const dailyTotalCost = dailyGasCost + dailyWearCost + parking;

    // Weekly
    const weeklyCommuteCost = dailyTotalCost * shifts;
    const weeklyCommuteTime = (time * 2 * shifts) / 60; // hours
    const weeklyEarnings = rate * shiftHours * shifts;
    const weeklyNetEarnings = weeklyEarnings - weeklyCommuteCost;

    // Effective rate
    const totalWeeklyHours = shiftHours * shifts + weeklyCommuteTime;
    const effectiveHourlyRate = weeklyNetEarnings / totalWeeklyHours;
    const hourlyRateLoss = rate - effectiveHourlyRate;

    // Monthly/Yearly
    const monthlyCommuteCost = weeklyCommuteCost * 4.33;
    const yearlyCommuteCost = weeklyCommuteCost * 52;

    return {
      dailyTotalCost,
      weeklyCommuteCost,
      weeklyCommuteTime,
      weeklyEarnings,
      weeklyNetEarnings,
      effectiveHourlyRate,
      hourlyRateLoss,
      monthlyCommuteCost,
      yearlyCommuteCost,
    };
  }, [hourlyRate, commuteDistance, commuteTime, parkingCost, shiftsPerWeek, hoursPerShift]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Commute Calculator" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Commute Cost Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate the true cost of your commute and see how it affects
                your effective hourly rate.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Your Commute
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="rate">Hourly Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>One-Way Distance: {commuteDistance[0]} miles</Label>
                  <Slider
                    value={commuteDistance}
                    onValueChange={setCommuteDistance}
                    max={50}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>One-Way Time: {commuteTime[0]} minutes</Label>
                  <Slider
                    value={commuteTime}
                    onValueChange={setCommuteTime}
                    max={90}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="parking">Daily Parking Cost ($)</Label>
                  <Input
                    id="parking"
                    type="number"
                    value={parkingCost}
                    onChange={(e) => setParkingCost(e.target.value)}
                    className="mt-1"
                  />
                </div>

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

                <div>
                  <Label>Hours Per Shift: {hoursPerShift[0]}</Label>
                  <Slider
                    value={hoursPerShift}
                    onValueChange={setHoursPerShift}
                    max={12}
                    min={3}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-primary">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Effective Hourly Rate
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ${calculations.effectiveHourlyRate.toFixed(2)}/hr
                  </p>
                  <p className="text-sm text-red-500 mt-1">
                    -${calculations.hourlyRateLoss.toFixed(2)} from stated rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Weekly Commute Cost
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.weeklyCommuteCost.toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {calculations.weeklyCommuteTime.toFixed(1)} hours of travel
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    Yearly Commute Cost
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    ${calculations.yearlyCommuteCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Including gas & wear
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Cost Breakdown */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Weekly Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-950/30 rounded-lg">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Gross Weekly Earnings
                    </span>
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      ${calculations.weeklyEarnings.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-100 dark:bg-red-950/30 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-red-600" />
                      Commute Costs
                    </span>
                    <span className="font-semibold text-red-700 dark:text-red-400">
                      -${calculations.weeklyCommuteCost.toFixed(0)}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                    <span className="font-semibold">Net Weekly Income</span>
                    <span className="font-bold text-lg">
                      ${calculations.weeklyNetEarnings.toFixed(0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <FAQSection faqs={faqs} />

            <ToolDisclaimer
              type="calculator"
              lastUpdated="2024-12-17"
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/commute-calculator" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

