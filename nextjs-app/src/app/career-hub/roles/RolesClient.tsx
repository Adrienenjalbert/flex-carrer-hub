"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Briefcase, TrendingUp, DollarSign, MessageSquare, BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roles, industries } from "@/lib/data/roles";
import { howToBecomeGuides } from "@/lib/data/how-to-become";
import { interviewGuides } from "@/lib/data/interview-questions";
import { resumeExamples } from "@/lib/data/resume-examples";
import FilterBar, { FilterConfig } from "@/components/career-hub/navigation/FilterBar";
import SectionHeader from "@/components/career-hub/layout/SectionHeader";
import ContentGrid from "@/components/career-hub/content/ContentGrid";
import EmptyState from "@/components/career-hub/content/EmptyState";
import PageHero from "@/components/career-hub/layout/PageHero";

const howToBecomeSlugs = new Set(howToBecomeGuides.map((g) => g.roleSlug));
const interviewSlugs = new Set(interviewGuides.map((g) => g.roleSlug));
const resumeSlugs = new Set(resumeExamples.map((e) => e.roleSlug));

export default function RolesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedPayRange, setSelectedPayRange] = useState<string>("");
  const [entryLevelOnly, setEntryLevelOnly] = useState(false);

  const filteredRoles = useMemo(() => {
    let result = roles;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (role) =>
          role.title.toLowerCase().includes(query) ||
          role.description.toLowerCase().includes(query) ||
          role.industry.toLowerCase().includes(query)
      );
    }

    if (selectedIndustry) {
      result = result.filter((role) => role.industry === selectedIndustry);
    }

    if (selectedPayRange) {
      const [min, max] = selectedPayRange.split("-").map(Number);
      result = result.filter(
        (role) => role.avgHourlyRate.min >= min && role.avgHourlyRate.max <= max
      );
    }

    if (entryLevelOnly) {
      result = result.filter((role) => role.entryLevel === true);
    }

    return result;
  }, [searchQuery, selectedIndustry, selectedPayRange, entryLevelOnly]);

  const popularRoles = roles.filter((r) => r.searchVolume === "very-high" || r.searchVolume === "high");
  const entryLevelRoles = roles.filter((r) => r.entryLevel === true);
  const highPayingRoles = roles
    .filter((r) => r.avgHourlyRate.max >= 20)
    .sort((a, b) => b.avgHourlyRate.max - a.avgHourlyRate.max)
    .slice(0, 6);

  const filterConfig: FilterConfig = {
    search: {
      placeholder: "Search temp jobs by role, industry, or skills...",
      onSearch: setSearchQuery,
    },
    filters: [
      {
        id: "industry",
        label: "Industry",
        options: industries.map((ind) => ({
          id: ind.id,
          label: ind.name,
          value: ind.id,
        })),
        value: selectedIndustry,
        onChange: setSelectedIndustry,
      },
      {
        id: "pay",
        label: "Pay Range",
        options: [
          { id: "12-15", label: "$12-$15/hr", value: "12-15" },
          { id: "15-18", label: "$15-$18/hr", value: "15-18" },
          { id: "18-22", label: "$18-$22/hr", value: "18-22" },
          { id: "22+", label: "$22+/hr", value: "22-30" },
        ],
        value: selectedPayRange,
        onChange: setSelectedPayRange,
      },
    ],
    activeFilters: [
      ...(selectedIndustry ? [{ id: "industry", label: "Industry", value: selectedIndustry, onRemove: () => setSelectedIndustry("") }] : []),
      ...(selectedPayRange ? [{ id: "pay", label: "Pay Range", value: selectedPayRange, onRemove: () => setSelectedPayRange("") }] : []),
      ...(entryLevelOnly ? [{ id: "entry", label: "Entry Level", value: "Yes", onRemove: () => setEntryLevelOnly(false) }] : []),
    ],
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("");
    setSelectedPayRange("");
    setEntryLevelOnly(false);
  };

  const rolesByIndustry = useMemo(() => {
    const groups: Record<string, typeof roles> = {};
    filteredRoles.forEach((role) => {
      if (!groups[role.industry]) {
        groups[role.industry] = [];
      }
      groups[role.industry].push(role);
    });
    return groups;
  }, [filteredRoles]);

  const isUnfiltered = !searchQuery && !selectedIndustry && !selectedPayRange && !entryLevelOnly;

  const renderRoleCard = (role: typeof roles[0], badge?: { label: string; className: string }) => (
    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div className="flex gap-1">
            {badge && (
              <Badge variant="secondary" className={`text-xs ${badge.className}`}>
                {badge.label}
              </Badge>
            )}
            {role.entryLevel && !badge?.label.includes("Entry") && (
              <Badge variant="outline" className="text-xs">
                Entry-Level
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {role.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="mb-3 flex-1">
          {role.shortDescription || role.description.slice(0, 100)}...
        </CardDescription>
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-primary">
            ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
          </span>
          {role.avgTips ? (
            <Badge variant="outline" className="text-xs">+ Tips</Badge>
          ) : (
            <Badge variant="outline" className="text-xs capitalize">{role.industry}</Badge>
          )}
        </div>
        {/* Spoke page cross-links */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs border-t pt-2">
          {interviewSlugs.has(role.slug) && (
            <Link
              href={`/interview-questions/${role.slug}`}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="h-3 w-3" />
              Interview Prep
            </Link>
          )}
          {howToBecomeSlugs.has(role.slug) && (
            <Link
              href={`/how-to-become/${role.slug}`}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <BookOpen className="h-3 w-3" />
              How to Start
            </Link>
          )}
          {resumeSlugs.has(role.slug) && (
            <Link
              href={`/career-hub/resume-examples/${role.slug}`}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="h-3 w-3" />
              Resume
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <PageHero
        title="Temp & Flexible Work Roles"
        description={`Browse ${roles.length} temporary, part-time, and flexible job roles across ${industries.length} industries. Compare hourly pay, skills needed, and career growth paths.`}
        searchPlaceholder="Search temp jobs by role, industry, or skills..."
        onSearch={setSearchQuery}
        stats={[
          { value: roles.length.toString(), label: "Total Roles" },
          { value: industries.length.toString(), label: "Industries" },
          { value: entryLevelRoles.length.toString(), label: "Entry-Level" },
        ]}
      />

      <FilterBar config={filterConfig} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Popular Roles */}
          {isUnfiltered && (
            <section className="mb-12">
              <SectionHeader
                title="Popular Temp Roles"
                description="Most searched and in-demand temporary work roles"
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
              />
              <ContentGrid columns={3} gap="md">
                {popularRoles.slice(0, 6).map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    {renderRoleCard(role, { label: "Popular", className: "bg-accent/10 text-accent" })}
                  </Link>
                ))}
              </ContentGrid>
            </section>
          )}

          {/* Highest Paying Roles */}
          {isUnfiltered && highPayingRoles.length > 0 && (
            <section className="mb-12">
              <SectionHeader
                title="Highest Paying Roles"
                description="Top-earning flexible positions — $20+/hr and above"
                icon={<DollarSign className="h-6 w-6 text-primary" />}
              />
              <ContentGrid columns={3} gap="md">
                {highPayingRoles.map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    {renderRoleCard(role, { label: "High Pay", className: "bg-green-500/10 text-green-600" })}
                  </Link>
                ))}
              </ContentGrid>
            </section>
          )}

          {/* Filtered Results or Industry Sections */}
          {filteredRoles.length === 0 ? (
            <EmptyState
              title="No roles found"
              description="Try adjusting your filters or search query to find what you're looking for."
              onClearFilters={clearAllFilters}
            />
          ) : !isUnfiltered ? (
            <section>
              <SectionHeader
                title={`${filteredRoles.length} Role${filteredRoles.length !== 1 ? "s" : ""} Found`}
              />
              <ContentGrid columns={3} gap="md">
                {filteredRoles.map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    {renderRoleCard(role)}
                  </Link>
                ))}
              </ContentGrid>
            </section>
          ) : (
            <>
              {industries.map((industry) => {
                const industryRoles = rolesByIndustry[industry.id] || [];
                if (industryRoles.length === 0) return null;

                return (
                  <section key={industry.id} className="mb-12">
                    <SectionHeader
                      title={industry.name}
                      badge={industryRoles.length}
                    />
                    <ContentGrid columns={3} gap="md">
                      {industryRoles.map((role) => (
                        <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                          {renderRoleCard(role)}
                        </Link>
                      ))}
                    </ContentGrid>
                  </section>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
