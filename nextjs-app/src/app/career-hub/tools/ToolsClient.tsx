"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Calculator, 
  DollarSign, 
  Repeat, 
  Wallet, 
  Receipt, 
  Target, 
  Scale, 
  Clock, 
  Wrench, 
  Globe, 
  Car, 
  Baby, 
  Shield, 
  AlertCircle, 
  Award, 
  Coffee, 
  UtensilsCrossed, 
  MessageCircle, 
  HardHat,
  Star,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FilterBar, { FilterConfig } from "@/components/career-hub/FilterBar";
import SectionHeader from "@/components/career-hub/SectionHeader";
import ContentGrid from "@/components/career-hub/ContentGrid";
import EmptyState from "@/components/career-hub/EmptyState";
import PageHero from "@/components/career-hub/PageHero";

interface Tool {
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "pay-salary" | "planning-career" | "life-benefits" | "fun-interactive";
  popular?: boolean;
  complexity?: "simple" | "intermediate" | "advanced";
}

const allTools: Tool[] = [
  // Pay & Salary
  {
    name: "Paycheck Calculator",
    slug: "paycheck-calculator",
    description: "Calculate your weekly and monthly take-home pay after taxes",
    icon: Calculator,
    category: "pay-salary",
    popular: true,
    complexity: "simple",
  },
  {
    name: "Salary Converter",
    slug: "salary-converter",
    description: "Convert between hourly, weekly, monthly, and annual pay",
    icon: Repeat,
    category: "pay-salary",
    complexity: "simple",
  },
  {
    name: "Take-Home Pay",
    slug: "take-home-pay",
    description: "Estimate your net pay after deductions and taxes",
    icon: Wallet,
    category: "pay-salary",
    complexity: "simple",
  },
  {
    name: "Tax Calculator",
    slug: "tax-calculator",
    description: "Estimate your federal and state tax obligations",
    icon: Receipt,
    category: "pay-salary",
    popular: true,
    complexity: "intermediate",
  },
  // Planning & Career
  {
    name: "Career Path Explorer",
    slug: "career-path",
    description: "Visualize your career progression from entry-level to management",
    icon: Target,
    category: "planning-career",
    popular: true,
    complexity: "intermediate",
  },
  {
    name: "Job Offer Analyzer",
    slug: "job-offer-analyzer",
    description: "Compare job offers to find the best opportunity",
    icon: Scale,
    category: "planning-career",
    complexity: "intermediate",
  },
  {
    name: "Shift Planner",
    slug: "shift-planner",
    description: "Plan your work schedule and maximize earnings",
    icon: Clock,
    category: "planning-career",
    popular: true,
    complexity: "simple",
  },
  {
    name: "Skills Analyzer",
    slug: "skills-analyzer",
    description: "Assess your skills and identify areas for growth",
    icon: Wrench,
    category: "planning-career",
    complexity: "intermediate",
  },
  {
    name: "Data Verification",
    slug: "data-verification",
    description: "Verify and validate your work history and credentials",
    icon: DollarSign,
    category: "planning-career",
    complexity: "simple",
  },
  // Life & Benefits
  {
    name: "Cost of Living",
    slug: "cost-of-living",
    description: "Compare living costs across cities",
    icon: Globe,
    category: "life-benefits",
    popular: true,
    complexity: "simple",
  },
  {
    name: "Commute Calculator",
    slug: "commute-calculator",
    description: "Calculate the true cost of commuting to work",
    icon: Car,
    category: "life-benefits",
    complexity: "simple",
  },
  {
    name: "Childcare Calculator",
    slug: "childcare-calculator",
    description: "Estimate childcare costs in your area",
    icon: Baby,
    category: "life-benefits",
    complexity: "simple",
  },
  {
    name: "Benefits Checker",
    slug: "benefits-checker",
    description: "Check what benefits you may be eligible for",
    icon: Shield,
    category: "life-benefits",
    complexity: "intermediate",
  },
  {
    name: "Unemployment Calculator",
    slug: "unemployment-calculator",
    description: "Estimate unemployment benefits by state",
    icon: AlertCircle,
    category: "life-benefits",
    complexity: "intermediate",
  },
  {
    name: "Certification ROI",
    slug: "certification-roi",
    description: "Calculate return on investment for certifications",
    icon: Award,
    category: "life-benefits",
    complexity: "advanced",
  },
  // Fun & Interactive
  {
    name: "Cocktail Quiz",
    slug: "cocktail-quiz",
    description: "Test your bartending knowledge with interactive quizzes",
    icon: Coffee,
    category: "fun-interactive",
    complexity: "simple",
  },
  {
    name: "Menu Master",
    slug: "menu-master",
    description: "Master menu knowledge for restaurant and hospitality roles",
    icon: UtensilsCrossed,
    category: "fun-interactive",
    complexity: "intermediate",
  },
  {
    name: "WorkTalk",
    slug: "worktalk",
    description: "Practice workplace English and communication skills",
    icon: MessageCircle,
    category: "fun-interactive",
    complexity: "intermediate",
  },
  {
    name: "Safety First",
    slug: "safety-first",
    description: "Learn workplace safety protocols and best practices",
    icon: HardHat,
    category: "fun-interactive",
    complexity: "simple",
  },
];

const categoryLabels: Record<string, string> = {
  "pay-salary": "Pay & Salary",
  "planning-career": "Planning & Career",
  "life-benefits": "Life & Benefits",
  "fun-interactive": "Fun & Interactive",
};

const complexityLabels: Record<string, string> = {
  "simple": "Simple",
  "intermediate": "Intermediate",
  "advanced": "Advanced",
};

export default function ToolsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const filteredTools = useMemo(() => {
    let result = allTools;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          categoryLabels[tool.category].toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    // Complexity filter
    if (selectedComplexity) {
      result = result.filter((tool) => tool.complexity === selectedComplexity);
    }

    // Sort
    if (sortBy === "popular") {
      result = result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === "name") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "category") {
      result = result.sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedComplexity, sortBy]);

  const popularTools = allTools.filter((t) => t.popular);
  const categories = Array.from(new Set(allTools.map((t) => t.category)));

  const filterConfig: FilterConfig = {
    search: {
      placeholder: "Search tools by name or use case...",
      onSearch: setSearchQuery,
    },
    filters: [
      {
        id: "category",
        label: "Category",
        options: [
          { id: "all", label: "All Categories", value: "" },
          ...categories.map((cat) => ({
            id: cat,
            label: categoryLabels[cat],
            value: cat,
          })),
        ],
        value: selectedCategory,
        onChange: setSelectedCategory,
      },
      {
        id: "complexity",
        label: "Complexity",
        options: [
          { id: "all", label: "All Levels", value: "" },
          { id: "simple", label: "Simple", value: "simple" },
          { id: "intermediate", label: "Intermediate", value: "intermediate" },
          { id: "advanced", label: "Advanced", value: "advanced" },
        ],
        value: selectedComplexity,
        onChange: setSelectedComplexity,
      },
    ],
    sort: {
      options: [
        { id: "default", label: "Default", value: "" },
        { id: "popular", label: "Most Popular", value: "popular" },
        { id: "name", label: "Name (A-Z)", value: "name" },
        { id: "category", label: "Category", value: "category" },
      ],
      value: sortBy,
      onChange: setSortBy,
    },
    activeFilters: [
      ...(selectedCategory ? [{ id: "category", label: "Category", value: categoryLabels[selectedCategory], onRemove: () => setSelectedCategory("") }] : []),
      ...(selectedComplexity ? [{ id: "complexity", label: "Complexity", value: complexityLabels[selectedComplexity], onRemove: () => setSelectedComplexity("") }] : []),
    ],
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedComplexity("");
    setSortBy("");
  };

  const groupedTools = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredTools]);

  return (
    <>
      <PageHero
        title="Career Tools & Calculators"
        description={`Free tools to help you calculate pay, compare jobs, and plan your career. ${allTools.length} tools available.`}
        searchPlaceholder="What do you want to calculate?"
        onSearch={setSearchQuery}
        stats={[
          { value: allTools.length.toString(), label: "Free Tools" },
          { value: categories.length.toString(), label: "Categories" },
          { value: popularTools.length.toString(), label: "Popular Tools" },
        ]}
      />

      <FilterBar config={filterConfig} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Popular Tools Section */}
          {!searchQuery && !selectedCategory && !selectedComplexity && (
            <section className="mb-12">
              <SectionHeader
                title="Popular Tools"
                description="Most used tools by Indeed Flex workers"
                icon={<Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />}
              />
              <ContentGrid columns={4} gap="md">
                {popularTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`}>
                      <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              Popular
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tool.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </ContentGrid>
            </section>
          )}

          {/* Filtered Results or Category Sections */}
          {filteredTools.length === 0 ? (
            <EmptyState
              title="No tools found"
              description="Try adjusting your filters or search query to find what you're looking for."
              onClearFilters={clearAllFilters}
            />
          ) : searchQuery || selectedCategory || selectedComplexity ? (
            <section>
              <SectionHeader
                title={`${filteredTools.length} Tool${filteredTools.length !== 1 ? "s" : ""} Found`}
              />
              <ContentGrid columns={4} gap="md">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`}>
                      <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex gap-1">
                              {tool.popular && (
                                <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                  Popular
                                </Badge>
                              )}
                              {tool.complexity && (
                                <Badge variant="outline" className="text-xs">
                                  {complexityLabels[tool.complexity]}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tool.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{tool.description}</CardDescription>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {categoryLabels[tool.category]}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </ContentGrid>
            </section>
          ) : (
            <>
              {categories.map((category) => {
                const categoryTools = allTools.filter((t) => t.category === category);
                return (
                  <section key={category} className="mb-12">
                    <SectionHeader
                      title={categoryLabels[category]}
                      badge={categoryTools.length}
                    />
                    <ContentGrid columns={4} gap="md">
                      {categoryTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`}>
                            <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                              <CardHeader className="pb-2">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Icon className="h-6 w-6 text-primary" />
                                  </div>
                                  <div className="flex gap-1">
                                    {tool.popular && (
                                      <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                        Popular
                                      </Badge>
                                    )}
                                    {tool.complexity && (
                                      <Badge variant="outline" className="text-xs">
                                        {complexityLabels[tool.complexity]}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                  {tool.name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription>{tool.description}</CardDescription>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
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

