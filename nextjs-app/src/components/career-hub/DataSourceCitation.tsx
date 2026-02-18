/**
 * DataSourceCitation Component
 * 
 * Displays data source citations and last-updated information for E-E-A-T compliance.
 * Shows users where the data comes from and when it was last verified.
 */
import { Info, ExternalLink, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DataSource,
  getSourcesForPage,
  getLastUpdatedForCategory,
  dataSources,
} from "@/lib/data/data-sources";

interface DataSourceCitationProps {
  pageType: "role" | "city" | "calculator" | "guide";
  additionalSources?: string[];
  showInline?: boolean;
  className?: string;
}

interface InlineCitationProps {
  sourceId: string;
  referenceNumber: number;
}

// Inline citation superscript for use within text
export function InlineCitation({ sourceId, referenceNumber }: InlineCitationProps) {
  const source = dataSources[sourceId];
  if (!source) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <sup className="text-primary cursor-help text-xs">
            [{referenceNumber}]
          </sup>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-xs">
            {source.shortName} ({source.lastAccessed})
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Stat with citation
interface StatWithCitationProps {
  label: string;
  value: string | number;
  sourceId: string;
  referenceNumber?: number;
  className?: string;
}

export function StatWithCitation({
  label,
  value,
  sourceId,
  referenceNumber = 1,
  className = "",
}: StatWithCitationProps) {
  const source = dataSources[sourceId];

  return (
    <div className={className}>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {source && (
          <InlineCitation sourceId={sourceId} referenceNumber={referenceNumber} />
        )}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// Footer citation section
export default function DataSourceCitation({
  pageType,
  additionalSources = [],
  showInline = false,
  className = "",
}: DataSourceCitationProps) {
  const sources = getSourcesForPage(pageType);
  const allSourceIds = [
    ...sources.map((s) => s.id),
    ...additionalSources,
  ];

  const uniqueSources = Array.from(
    new Set(allSourceIds)
  ).map((id) => dataSources[id]).filter(Boolean) as DataSource[];

  // Get relevant last updated info
  const categoryMap: Record<string, string> = {
    role: "Wage Data",
    city: "Cost of Living",
    calculator: "Tax Rates",
    guide: "Wage Data",
  };
  const lastUpdated = getLastUpdatedForCategory(categoryMap[pageType]);

  if (uniqueSources.length === 0) return null;

  if (showInline) {
    return (
      <div className={`flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
        <ShieldCheck className="w-3 h-3" />
        <span>
          Data from {uniqueSources.map((s) => s.shortName).join(", ")}
          {lastUpdated && ` • Updated ${lastUpdated.lastUpdated}`}
        </span>
      </div>
    );
  }

  return (
    <section
      id="sources"
      className={`py-6 border-t mt-8 ${className}`}
      aria-labelledby="sources-heading"
    >
      <h3 id="sources-heading" className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        Data Sources & Methodology
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Sources List */}
        <div>
          <p className="text-xs text-muted-foreground mb-3">
            The information on this page is compiled from the following sources:
          </p>
          <ol className="space-y-2 text-sm">
            {uniqueSources.map((source, idx) => (
              <li key={source.id} className="flex items-start gap-2">
                <span className="text-primary font-medium">[{idx + 1}]</span>
                <div>
                  <span className="font-medium">{source.shortName}</span>
                  <span className="text-muted-foreground">
                    {" "}— {source.description}
                  </span>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline ml-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-xs">Visit</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Update Info */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data Freshness
          </h4>
          {lastUpdated && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{lastUpdated.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{lastUpdated.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Update</span>
                <span>{lastUpdated.nextUpdate}</span>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            We strive to keep all data accurate and up-to-date. Pay rates may vary
            based on location, experience, and employer.
          </p>
        </div>
      </div>

      {/* Editorial Note */}
      <div className="mt-4 p-3 bg-primary/5 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Editorial Standards</p>
          <p>
            All salary and job market data is reviewed by the Indeed Flex Career Hub
            editorial team. We cross-reference multiple sources to ensure accuracy.
            For the most current pay rates in your area, we recommend checking the
            Indeed Flex app for real-time shift availability and compensation.
          </p>
        </div>
      </div>
    </section>
  );
}

