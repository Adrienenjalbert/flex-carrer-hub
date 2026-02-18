"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowRight, Calculator } from "lucide-react";
import { EmbeddedPayCalculator } from "@/components/career-hub/interactive";

interface CareerStep {
  role: string;
  years: string;
  salary?: string;
}

interface CityRolePageClientProps {
  roleTitle: string;
  localSalary: { min: number; max: number };
  cityName: string;
  tipsRange?: { min: number; max: number };
  careerPath: CareerStep[];
}

export default function CityRolePageClient({
  roleTitle,
  localSalary,
  cityName,
  tipsRange,
  careerPath,
}: CityRolePageClientProps) {
  return (
    <>
      {/* Embedded Pay Calculator */}
      <section id="calculator">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Earnings Calculator for {cityName}
        </h2>
        <EmbeddedPayCalculator
          roleTitle={roleTitle}
          minRate={localSalary.min}
          maxRate={localSalary.max}
          location={cityName}
          tipsRange={tipsRange}
        />
      </section>

      {/* Career Path */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Career Path from {roleTitle}
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              {careerPath.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="font-medium">{step.role}</p>
                    <p className="text-xs opacity-80">{step.years}</p>
                  </div>
                  {index < careerPath.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

