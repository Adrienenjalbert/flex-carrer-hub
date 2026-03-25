"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  ShoppingBag,
  Sparkles,
  Star,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import type { ResumeExample } from "@/lib/data/resume-examples";

const industryConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string; label: string }> = {
  all: { icon: LayoutGrid, color: "text-gray-700", bgColor: "bg-gray-100", label: "All Roles" },
  "entry-level": { icon: Star, color: "text-emerald-600", bgColor: "bg-emerald-50", label: "Entry-Level" },
  hospitality: { icon: Sparkles, color: "text-orange-600", bgColor: "bg-orange-50", label: "Hospitality" },
  industrial: { icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50", label: "Warehouse" },
  retail: { icon: ShoppingBag, color: "text-green-600", bgColor: "bg-green-50", label: "Retail" },
  facilities: { icon: Building2, color: "text-purple-600", bgColor: "bg-purple-50", label: "Facilities" },
  events: { icon: Users, color: "text-pink-600", bgColor: "bg-pink-50", label: "Events" },
};

function ResumeExampleCard({ example }: { example: ResumeExample }) {
  const config = industryConfig[example.industry] || industryConfig.hospitality;
  const Icon = config.icon;

  return (
    <Link
      href={`/career-hub/resume-examples/${example.roleSlug}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
          {example.yearsExperience} years
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {example.roleName} Resume
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {example.summary.slice(0, 120)}...
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {example.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
            {skill}
          </span>
        ))}
        {example.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
            +{example.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 capitalize">{example.industry}</span>
        <span className="text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          View Example <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

interface ResumeExamplesClientProps {
  examples: ResumeExample[];
}

export default function ResumeExamplesClient({ examples }: ResumeExamplesClientProps) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = Object.entries(industryConfig);

  const filteredExamples = activeTab === "all"
    ? examples
    : activeTab === "entry-level"
      ? examples.filter((e) => e.yearsExperience === "0-1")
      : examples.filter((e) => e.industry === activeTab);

  return (
    <>
      {/* Tab Bar */}
      <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-sm border-b mb-8 -mx-4 px-4">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {tabs.map(([key, config]) => {
            const Icon = config.icon;
            const isActive = activeTab === key;
            const count = key === "all"
              ? examples.length
              : key === "entry-level"
                ? examples.filter((e) => e.yearsExperience === "0-1").length
                : examples.filter((e) => e.industry === key).length;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? `${config.bgColor} ${config.color} ring-1 ring-current/20`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {config.label}
                <span className={`text-xs ${isActive ? "opacity-80" : "text-gray-400"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map((example) => (
          <ResumeExampleCard key={example.id} example={example} />
        ))}
      </div>

      {filteredExamples.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No resume examples found for this category.
        </div>
      )}
    </>
  );
}
