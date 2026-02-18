"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";
import RelatedToolsSidebar from "@/components/career-hub/RelatedToolsSidebar";

const careerPaths = {
  hospitality: {
    name: "Hospitality",
    levels: [
      {
        title: "Entry Level",
        roles: ["Server", "Bartender", "Host", "Busser"],
        salary: "$12-18/hr",
        timeline: "0-1 year",
        skills: ["Customer service", "Food safety", "POS systems"],
      },
      {
        title: "Experienced",
        roles: ["Lead Server", "Bar Lead", "Shift Supervisor"],
        salary: "$16-24/hr",
        timeline: "1-3 years",
        skills: ["Team coordination", "Conflict resolution", "Inventory"],
      },
      {
        title: "Management",
        roles: ["Assistant Manager", "Bar Manager", "Floor Manager"],
        salary: "$45-65K/yr",
        timeline: "3-5 years",
        skills: ["Staff scheduling", "P&L basics", "Training"],
      },
      {
        title: "Senior Management",
        roles: ["General Manager", "Operations Director"],
        salary: "$65-100K/yr",
        timeline: "5+ years",
        skills: ["Full P&L", "Multi-unit operations", "Strategic planning"],
      },
    ],
  },
  warehouse: {
    name: "Warehouse",
    levels: [
      {
        title: "Entry Level",
        roles: ["Picker", "Packer", "Loader"],
        salary: "$15-19/hr",
        timeline: "0-1 year",
        skills: ["Attention to detail", "Physical stamina", "Time management"],
      },
      {
        title: "Specialized",
        roles: ["Forklift Operator", "Inventory Clerk", "Receiving"],
        salary: "$18-25/hr",
        timeline: "1-2 years",
        skills: ["Equipment operation", "WMS systems", "Safety protocols"],
      },
      {
        title: "Lead/Supervisor",
        roles: ["Team Lead", "Shift Supervisor", "Quality Lead"],
        salary: "$22-30/hr",
        timeline: "2-4 years",
        skills: ["Team leadership", "Process improvement", "Reporting"],
      },
      {
        title: "Management",
        roles: ["Warehouse Manager", "Operations Manager"],
        salary: "$55-85K/yr",
        timeline: "4+ years",
        skills: ["Logistics planning", "Budget management", "Staff development"],
      },
    ],
  },
  retail: {
    name: "Retail",
    levels: [
      {
        title: "Entry Level",
        roles: ["Sales Associate", "Cashier", "Stock Associate"],
        salary: "$12-16/hr",
        timeline: "0-1 year",
        skills: ["Customer service", "Product knowledge", "Cash handling"],
      },
      {
        title: "Senior Associate",
        roles: ["Key Holder", "Department Lead", "Visual Merchandiser"],
        salary: "$15-20/hr",
        timeline: "1-2 years",
        skills: ["Opening/closing", "Merchandising", "Training"],
      },
      {
        title: "Supervisor",
        roles: ["Assistant Manager", "Department Manager"],
        salary: "$40-55K/yr",
        timeline: "2-4 years",
        skills: ["Scheduling", "Performance management", "Loss prevention"],
      },
      {
        title: "Management",
        roles: ["Store Manager", "District Manager"],
        salary: "$55-90K/yr",
        timeline: "4+ years",
        skills: ["P&L management", "Multi-store operations", "Recruiting"],
      },
    ],
  },
};

export default function CareerPathClient() {
  const [selectedIndustry, setSelectedIndustry] =
    useState<keyof typeof careerPaths>("hospitality");
  const [expandedLevel, setExpandedLevel] = useState<number | null>(0);

  const currentPath = careerPaths[selectedIndustry];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Career Path Explorer" },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Career Path Explorer
              </h1>
              <p className="text-lg text-muted-foreground">
                Visualize your career progression from entry-level to
                management. See what it takes to advance.
              </p>
            </div>

            {/* Industry Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Choose Your Industry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ToggleGroup
                  type="single"
                  value={selectedIndustry}
                  onValueChange={(value) =>
                    value && setSelectedIndustry(value as keyof typeof careerPaths)
                  }
                  className="justify-start flex-wrap"
                >
                  <ToggleGroupItem value="hospitality">
                    Hospitality
                  </ToggleGroupItem>
                  <ToggleGroupItem value="warehouse">Warehouse</ToggleGroupItem>
                  <ToggleGroupItem value="retail">Retail</ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>

            {/* Career Path Visualization */}
            <div className="space-y-4 mb-8">
              {currentPath.levels.map((level, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all ${
                    expandedLevel === index ? "border-primary" : ""
                  }`}
                  onClick={() =>
                    setExpandedLevel(expandedLevel === index ? null : index)
                  }
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? "bg-blue-100 text-blue-600"
                              : index === currentPath.levels.length - 1
                              ? "bg-green-100 text-green-600"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {level.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {level.timeline}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="font-medium">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {level.salary}
                        </Badge>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedLevel === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  {expandedLevel === index && (
                    <CardContent className="pt-4 border-t">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Common Roles
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {level.roles.map((role) => (
                              <Badge key={role} variant="secondary">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Key Skills Needed
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {level.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="bg-primary/5"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Tips Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tips for Faster Advancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Get relevant certifications to stand out and qualify for
                      higher-paying roles faster
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Take on extra responsibilities and volunteer for
                      leadership opportunities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Build relationships with managers and express your career
                      goals
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <RelatedToolsSidebar currentPath="/career-hub/tools/career-path" />
          </aside>
        </div>
      </div>

      <CTASection />
    </div>
  );
}

