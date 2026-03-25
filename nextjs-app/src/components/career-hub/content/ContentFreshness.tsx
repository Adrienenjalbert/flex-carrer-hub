import { Calendar, RefreshCcw } from "lucide-react";

interface ContentFreshnessProps {
  lastUpdated: string; // ISO date string
  nextReview?: string; // ISO date string
  source?: string;
  variant?: 'inline' | 'badge' | 'footer';
}

export const ContentFreshness = ({ 
  lastUpdated, 
  nextReview, 
  source,
  variant = 'inline' 
}: ContentFreshnessProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (variant === 'badge') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
        <RefreshCcw className="h-3 w-3" />
        Updated {formatDate(lastUpdated)}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="text-xs text-muted-foreground border-t pt-4 mt-8 space-y-1">
        <p className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Last updated: {formatDate(lastUpdated)}
        </p>
        {source && (
          <p>Data source: {source}</p>
        )}
        {nextReview && (
          <p>Next review: {formatDate(nextReview)}</p>
        )}
      </div>
    );
  }

  // Default inline variant
  return (
    <p className="text-sm text-muted-foreground flex items-center gap-1">
      <Calendar className="h-4 w-4" />
      Last updated {formatDate(lastUpdated)}
      {source && <span className="ml-2">• Source: {source}</span>}
    </p>
  );
};

// Schema.org JSON-LD for dateModified
export const DateModifiedSchema = ({ dateModified }: { dateModified: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "dateModified": dateModified
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Current date constant for consistency
export const CONTENT_LAST_UPDATED = "2026-01-18";
export const DATA_SOURCES = {
  salary: "Bureau of Labor Statistics (BLS) 2025-2026",
  tips: "Industry surveys and Indeed Flex worker data",
  costOfLiving: "Council for Community and Economic Research (C2ER)",
  growth: "BLS Occupational Outlook Handbook"
};

export default ContentFreshness;

