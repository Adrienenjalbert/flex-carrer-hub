"use client";

import {
  EmbeddedPayCalculator,
  SkillsAssessment,
  SalaryComparison,
  EarningsGoalCalculator,
} from "@/components/career-hub/interactive";

interface RoleData {
  title: string;
  slug: string;
  industry: string;
  avgHourlyRate: { min: number; max: number };
  avgTips?: { min: number; max: number };
  skills: string[];
  requirements: string[];
}

interface ComparisonItem {
  name: string;
  minRate: number;
  maxRate: number;
  slug?: string;
}

interface RolePageClientProps {
  role: RoleData;
  salaryComparisonRoles: ComparisonItem[];
  locationComparisonData: ComparisonItem[];
}

export default function RolePageClient({
  role,
  salaryComparisonRoles,
  locationComparisonData,
}: RolePageClientProps) {
  return (
    <>
      {/* Skills Assessment - Standalone Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Are You Ready to Be a {role.title}?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Check off the skills you already have to see how prepared you are
            </p>
            <SkillsAssessment
              roleTitle={role.title}
              skills={role.skills}
              requirements={role.requirements}
            />
          </div>
        </div>
      </section>

      {/* Pay Calculator Section */}
      <section id="calculator" className="py-12 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Calculate Your {role.title} Earnings
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Use these tools to estimate your potential earnings as a {role.title}{" "}
            with Indeed Flex
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EmbeddedPayCalculator
              roleTitle={role.title}
              minRate={role.avgHourlyRate.min}
              maxRate={role.avgHourlyRate.max}
              tipsRange={role.avgTips}
            />
            <EarningsGoalCalculator
              roleTitle={role.title}
              minRate={role.avgHourlyRate.min}
              maxRate={role.avgHourlyRate.max}
              tipsRange={role.avgTips}
            />
          </div>
        </div>
      </section>

      {/* Salary Comparison Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Compare {role.title} Pay
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            See how {role.title} pay compares across roles and locations
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalaryComparison
              title={`${
                role.industry.charAt(0).toUpperCase() + role.industry.slice(1)
              } Role Salaries`}
              currentItem={role.title}
              items={salaryComparisonRoles}
              type="role"
            />
            <SalaryComparison
              title="Pay by Location"
              currentItem=""
              items={locationComparisonData}
              type="location"
            />
          </div>
        </div>
      </section>
    </>
  );
}

