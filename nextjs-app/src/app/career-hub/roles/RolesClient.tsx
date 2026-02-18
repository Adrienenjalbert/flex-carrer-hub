"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Briefcase, Star, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roles, industries } from "@/lib/data/roles";
import FilterBar, { FilterConfig } from "@/components/career-hub/FilterBar";
import SectionHeader from "@/components/career-hub/SectionHeader";
import ContentGrid from "@/components/career-hub/ContentGrid";
import EmptyState from "@/components/career-hub/EmptyState";
import PageHero from "@/components/career-hub/PageHero";

export default function RolesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedPayRange, setSelectedPayRange] = useState<string>("");
  const [entryLevelOnly, setEntryLevelOnly] = useState(false);

  const filteredRoles = useMemo(() => {
    let result = roles;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (role) =>
          role.title.toLowerCase().includes(query) ||
          role.description.toLowerCase().includes(query) ||
          role.industry.toLowerCase().includes(query)
      );
    }

    // Industry filter
    if (selectedIndustry) {
      result = result.filter((role) => role.industry === selectedIndustry);
    }

    // Pay range filter
    if (selectedPayRange) {
      const [min, max] = selectedPayRange.split("-").map(Number);
      result = result.filter(
        (role) => role.avgHourlyRate.min >= min && role.avgHourlyRate.max <= max
      );
    }

    // Entry level filter
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
      placeholder: "Search roles by name, industry, or skills...",
      onSearch: setSearchQuery,
    },
    filters: [
      {
        id: "industry",
        label: "Industry",
        options: industries.map((ind) => ({
          id: ind.id,
          label: ind.name,
          value: ind.name,
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

  return (
    <>
      <PageHero
        title="Flexible Work Roles"
        description={`Find the perfect flexible role matching your skills and interests. ${roles.length} roles across ${industries.length} industries.`}
        searchPlaceholder="Search roles by name, industry, or skills..."
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
          {/* Popular Roles Section */}
          {!searchQuery && !selectedIndustry && !selectedPayRange && !entryLevelOnly && (
            <section className="mb-12">
              <SectionHeader
                title="Popular Roles"
                description="Most searched and in-demand flexible work roles"
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
              />
              <ContentGrid columns={3} gap="md">
                {popularRoles.slice(0, 6).map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                              Popular
                            </Badge>
                            {role.entryLevel && (
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
                      <CardContent>
                        <CardDescription className="mb-3">
                          {role.shortDescription || role.description.slice(0, 100)}...
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">
                            ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {role.industry}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </ContentGrid>
            </section>
          )}

          {/* Entry-Level Roles Section */}
          {!searchQuery && !selectedIndustry && !selectedPayRange && !entryLevelOnly && (
            <section className="mb-12">
              <SectionHeader
                title="Entry-Level Roles"
                description="No experience required - perfect for getting started"
                icon={<Star className="h-6 w-6 text-primary" />}
              />
              <ContentGrid columns={3} gap="md">
                {entryLevelRoles.slice(0, 6).map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 text-xs">
                            Entry-Level
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {role.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">
                          {role.shortDescription || role.description.slice(0, 100)}...
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">
                            ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {role.industry}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
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
          ) : searchQuery || selectedIndustry || selectedPayRange || entryLevelOnly ? (
            <section>
              <SectionHeader
                title={`${filteredRoles.length} Role${filteredRoles.length !== 1 ? "s" : ""} Found`}
              />
              <ContentGrid columns={3} gap="md">
                {filteredRoles.map((role) => (
                  <Link key={role.slug} href={`/career-hub/roles/${role.slug}`}>
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex gap-1">
                            {role.entryLevel && (
                              <Badge variant="outline" className="text-xs">
                                Entry-Level
                              </Badge>
                            )}
                            {(role.searchVolume === "very-high" || role.searchVolume === "high") && (
                              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {role.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">
                          {role.shortDescription || role.description.slice(0, 100)}...
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary">
                            ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {role.industry}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </ContentGrid>
            </section>
          ) : (
            <>
              {industries.map((industry) => {
                const industryRoles = rolesByIndustry[industry.name] || [];
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
                          <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                  <Briefcase className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex gap-1">
                                  {role.entryLevel && (
                                    <Badge variant="outline" className="text-xs">
                                      Entry-Level
                                    </Badge>
                                  )}
                                  {(role.searchVolume === "very-high" || role.searchVolume === "high") && (
                                    <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {role.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="mb-3">
                                {role.shortDescription || role.description.slice(0, 100)}...
                              </CardDescription>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-primary">
                                  ${role.avgHourlyRate.min}-${role.avgHourlyRate.max}/hr
                                </span>
                                {role.avgTips && (
                                  <Badge variant="outline" className="text-xs">
                                    + Tips
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
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

