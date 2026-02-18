"use client";
// Tools Index Client Component - v2
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Wallet,
  Receipt,
  ArrowLeftRight,
  Calendar,
  Search,
  MapPin,
  TrendingUp,
  Shield,
  GraduationCap,
  Baby,
  Briefcase,
  Languages,
  Brain,
  Wine,
  CheckCircle,
  Star,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PageHero from "@/components/career-hub/PageHero";

// All available tools with their metadata
const allTools = [
  // === Financial Calculators ===
  {
    slug: "paycheck-calculator",
    name: "Paycheck Calculator",
    description: "Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions.",
    category: "Financial Calculators",
    icon: "Calculator",
    popular: true,
  },
  {
    slug: "take-home-pay",
    name: "Take-Home Pay Calculator",
    description: "See exactly how much money hits your bank account after all taxes and deductions.",
    category: "Financial Calculators",
    icon: "Wallet",
    popular: true,
  },
  {
    slug: "tax-calculator",
    name: "Tax Calculator",
    description: "Estimate your federal and state income taxes. Includes self-employment tax for gig workers.",
    category: "Financial Calculators",
    icon: "Receipt",
    popular: true,
  },
  {
    slug: "salary-converter",
    name: "Salary Converter",
    description: "Convert between hourly, weekly, monthly, and annual pay. Compare job offers easily.",
    category: "Financial Calculators",
    icon: "ArrowLeftRight",
    popular: true,
  },
  {
    slug: "unemployment-calculator",
    name: "Unemployment Calculator",
    description: "Estimate your unemployment benefits by state. Understand eligibility and payment amounts.",
    category: "Financial Calculators",
    icon: "Calculator",
    popular: false,
  },
  {
    slug: "cost-of-living",
    name: "Cost of Living Calculator",
    description: "Compare cost of living between cities. See how far your paycheck goes in different locations.",
    category: "Financial Calculators",
    icon: "MapPin",
    popular: false,
  },
  {
    slug: "childcare-calculator",
    name: "Childcare Cost Calculator",
    description: "Calculate childcare costs and see how they affect your take-home pay. Find affordable options.",
    category: "Financial Calculators",
    icon: "Baby",
    popular: false,
  },
  // === Career Planning ===
  {
    slug: "shift-planner",
    name: "Shift Planner",
    description: "Plan your work week and maximize earnings. Calculate overtime, night differentials, and weekend premiums.",
    category: "Career Planning",
    icon: "Calendar",
    popular: true,
  },
  {
    slug: "career-path",
    name: "Career Path Explorer",
    description: "Discover career progression paths from entry-level to advanced roles in your industry.",
    category: "Career Planning",
    icon: "TrendingUp",
    popular: false,
  },
  {
    slug: "job-offer-analyzer",
    name: "Job Offer Analyzer",
    description: "Compare job offers side by side. Evaluate pay, benefits, commute, and growth potential.",
    category: "Career Planning",
    icon: "Briefcase",
    popular: false,
  },
  {
    slug: "skills-analyzer",
    name: "Skills Analyzer",
    description: "Identify your transferable skills and find matching job opportunities in flexible work.",
    category: "Career Planning",
    icon: "Brain",
    popular: false,
  },
  {
    slug: "commute-calculator",
    name: "Commute Calculator",
    description: "Calculate commute costs and time for different job locations. Factor in gas, transit, and wear.",
    category: "Career Planning",
    icon: "MapPin",
    popular: false,
  },
  // === Certification & Benefits ===
  {
    slug: "certification-roi",
    name: "Certification ROI Calculator",
    description: "Calculate the return on investment for professional certifications and training programs.",
    category: "Certification & Benefits",
    icon: "GraduationCap",
    popular: false,
  },
  {
    slug: "benefits-checker",
    name: "Benefits Eligibility Checker",
    description: "Check your eligibility for workplace benefits, government programs, and tax credits.",
    category: "Certification & Benefits",
    icon: "CheckCircle",
    popular: false,
  },
  // === Industry-Specific ===
  {
    slug: "worktalk",
    name: "WorkTalk",
    description: "Workplace English phrases for ESL workers with audio pronunciation guides.",
    category: "Industry Tools",
    icon: "Languages",
    popular: false,
  },
  {
    slug: "cocktail-quiz",
    name: "Cocktail Quiz",
    description: "Test your bartending knowledge with an interactive cocktail recipe quiz.",
    category: "Industry Tools",
    icon: "Wine",
    popular: false,
  },
  {
    slug: "menu-master",
    name: "Menu Master",
    description: "Learn restaurant menu terminology and improve your food service knowledge.",
    category: "Industry Tools",
    icon: "Star",
    popular: false,
  },
  {
    slug: "safety-first",
    name: "Safety First",
    description: "Workplace safety training quiz covering OSHA standards and best practices.",
    category: "Industry Tools",
    icon: "Shield",
    popular: false,
  },
  {
    slug: "data-verification",
    name: "Data Verification Tool",
    description: "Verify and validate your employment documents and work eligibility information.",
    category: "Industry Tools",
    icon: "CheckCircle",
    popular: false,
  },
  {
    slug: "pay-calculator",
    name: "Pay Calculator",
    description: "Quick hourly pay calculator with tax estimates for common flexible work roles.",
    category: "Financial Calculators",
    icon: "Calculator",
    popular: false,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-6 w-6" />,
  Wallet: <Wallet className="h-6 w-6" />,
  Receipt: <Receipt className="h-6 w-6" />,
  ArrowLeftRight: <ArrowLeftRight className="h-6 w-6" />,
  Calendar: <Calendar className="h-6 w-6" />,
  MapPin: <MapPin className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Baby: <Baby className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Languages: <Languages className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  Wine: <Wine className="h-6 w-6" />,
  CheckCircle: <CheckCircle className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
};

const categories = [
  "All",
  "Financial Calculators",
  "Career Planning",
  "Certification & Benefits",
  "Industry Tools",
];

export default function ToolsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    let result = allTools;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const popularTools = allTools.filter((t) => t.popular);

  const toolsByCategory = useMemo(() => {
    const groups: Record<string, typeof allTools> = {};
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
        description={`Free interactive tools to help you plan your career, calculate pay, and make informed decisions. ${allTools.length} tools available.`}
        searchPlaceholder="Search tools by name or category..."
        onSearch={setSearchQuery}
        stats={[
          { value: allTools.length.toString(), label: "Total Tools" },
          { value: categories.length.toString(), label: "Categories" },
          { value: popularTools.length.toString(), label: "Most Popular" },
        ]}
      />

      {/* Filter Bar */}
      <div className="bg-card border-b border-border/50 sticky top-[57px] z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1 opacity-70">
                      ({allTools.filter((t) => t.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Popular Tools Section */}
          {!searchQuery && selectedCategory === "All" && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Popular Tools</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularTools.map((tool) => (
                  <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group hover:border-primary/30 hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <span className="text-primary">
                              {iconMap[tool.icon] || <Wrench className="h-6 w-6" />}
                            </span>
                          </div>
                          <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                            Popular
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {tool.description}
                        </CardDescription>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Filtered Results or Category Sections */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-primary hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            Object.entries(toolsByCategory).map(([category, tools]) => (
              <section key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{category}</h2>
                  <Badge variant="outline">{tools.length} tools</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <Link key={tool.slug} href={`/career-hub/tools/${tool.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all cursor-pointer group hover:border-primary/30 hover:-translate-y-1">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                              <span className="text-primary">
                                {iconMap[tool.icon] || <Wrench className="h-6 w-6" />}
                              </span>
                            </div>
                            {tool.popular && (
                              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {tool.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm leading-relaxed">
                            {tool.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </>
  );
}

