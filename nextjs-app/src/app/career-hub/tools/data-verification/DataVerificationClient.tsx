"use client";

import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Database,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const dataSources = [
  {
    category: "Salary & Wage Data",
    icon: DollarSign,
    sources: [
      {
        name: "Bureau of Labor Statistics (BLS)",
        url: "https://www.bls.gov/",
        description: "Federal agency providing official employment and wage statistics",
        lastUpdated: "Quarterly",
      },
      {
        name: "Indeed Salary Data",
        url: "https://www.indeed.com/career/salaries",
        description: "Aggregated salary reports from job postings and employee submissions",
        lastUpdated: "Monthly",
      },
    ],
  },
  {
    category: "Cost of Living",
    icon: MapPin,
    sources: [
      {
        name: "MIT Living Wage Calculator",
        url: "https://livingwage.mit.edu/",
        description: "Academic research on living costs across US counties",
        lastUpdated: "Annually",
      },
      {
        name: "C2ER Cost of Living Index",
        url: "https://www.coli.org/",
        description: "Council for Community and Economic Research price comparisons",
        lastUpdated: "Quarterly",
      },
    ],
  },
  {
    category: "Tax Information",
    icon: Building,
    sources: [
      {
        name: "IRS Tax Tables",
        url: "https://www.irs.gov/",
        description: "Official federal tax brackets and deduction amounts",
        lastUpdated: "Annually",
      },
      {
        name: "State Revenue Departments",
        url: "#",
        description: "Individual state tax rates and requirements",
        lastUpdated: "Annually",
      },
    ],
  },
  {
    category: "Labor Market",
    icon: Database,
    sources: [
      {
        name: "Bureau of Labor Statistics - JOLTS",
        url: "https://www.bls.gov/jlt/",
        description: "Job openings, hires, and separations data",
        lastUpdated: "Monthly",
      },
      {
        name: "Federal Reserve Economic Data",
        url: "https://fred.stlouisfed.org/",
        description: "Economic indicators and employment trends",
        lastUpdated: "Varies",
      },
    ],
  },
];

const methodology = [
  {
    title: "Data Collection",
    description:
      "We aggregate data from multiple authoritative sources including government agencies, academic institutions, and industry reports. All sources are publicly available for verification.",
  },
  {
    title: "Regular Updates",
    description:
      "Our data is updated on a regular schedule - tax information annually, salary data quarterly, and cost of living data as new reports are published.",
  },
  {
    title: "Conservative Estimates",
    description:
      "When ranges exist, we typically present conservative estimates to avoid overstating potential earnings. Tips and bonuses are shown as averages.",
  },
  {
    title: "Local Variations",
    description:
      "All figures are national or regional averages. Actual pay and costs vary significantly by specific location, employer, and individual circumstances.",
  },
];

export default function DataVerificationClient() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Data Verification" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Data Verification & Sources
              </h1>
              <p className="text-lg text-muted-foreground">
                Transparency matters. Here&apos;s where our data comes from and how
                we ensure accuracy.
              </p>
            </div>

            {/* Trust Badge */}
            <Card className="mb-8 border-primary bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Data Transparency Commitment</h2>
                    <p className="text-muted-foreground">
                      All our calculations are based on publicly verifiable sources.
                      We cite our data so you can check our work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources */}
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold">Our Data Sources</h2>
              {dataSources.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.sources.map((source) => (
                        <div
                          key={source.name}
                          className="flex items-start justify-between p-4 bg-muted rounded-lg"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{source.name}</h3>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {source.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="whitespace-nowrap">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            {source.lastUpdated}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Methodology */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Our Methodology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {methodology.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <Card className="mb-8 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  While we strive for accuracy, all figures are estimates based on
                  available data. Individual results will vary based on location,
                  employer, experience, and market conditions. These tools are for
                  informational purposes only and should not be considered financial
                  or legal advice. Always verify important financial decisions with
                  qualified professionals.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/data-verification" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

