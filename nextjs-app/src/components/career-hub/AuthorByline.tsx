/**
 * AuthorByline Component
 * 
 * Displays author/editor attribution for E-E-A-T compliance.
 * Shows organizational author info and last update date.
 */
import Link from "next/link";
import { Calendar, Users, CheckCircle } from "lucide-react";

interface AuthorBylineProps {
  /** The type of content for attribution context */
  contentType: "guide" | "tool" | "role" | "city" | "calculator";
  /** Last updated date (ISO string or formatted) */
  lastUpdated?: string;
  /** Whether to show "Reviewed by" line */
  showReview?: boolean;
  /** Variant - inline (compact) or block */
  variant?: "inline" | "block";
  className?: string;
}

const contentTypeAuthors: Record<string, { team: string; reviewer: string }> = {
  guide: {
    team: "Career Content Team",
    reviewer: "Indeed Flex Editorial Board",
  },
  tool: {
    team: "Data Research Team",
    reviewer: "Indeed Flex Compliance Review",
  },
  role: {
    team: "Career Content Team",
    reviewer: "HR Specialists",
  },
  city: {
    team: "Local Market Research Team",
    reviewer: "Indeed Flex Editorial Board",
  },
  calculator: {
    team: "Data Research Team",
    reviewer: "Compliance & Legal Review",
  },
};

export function AuthorByline({
  contentType,
  lastUpdated,
  showReview = true,
  variant = "inline",
  className = "",
}: AuthorBylineProps) {
  const author = contentTypeAuthors[contentType] || contentTypeAuthors.guide;
  const formattedDate = lastUpdated || new Date().toISOString().split("T")[0];

  if (variant === "inline") {
    return (
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground ${className}`}
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>By</span>
          <span
            itemProp="author"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <Link
              href="/career-hub/about"
              className="hover:text-primary hover:underline"
              itemProp="name"
            >
              {author.team}
            </Link>
          </span>
        </div>

        {showReview && (
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-600" />
            <span>Reviewed by {author.reviewer}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <time itemProp="dateModified" dateTime={formattedDate}>
            Updated {formattedDate}
          </time>
        </div>
      </div>
    );
  }

  // Block variant - more prominent
  return (
    <div
      className={`p-4 border rounded-lg bg-secondary/30 ${className}`}
      itemScope
      itemType="https://schema.org/Article"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <Link
                  href="/career-hub/about"
                  className="hover:text-primary hover:underline"
                  itemProp="name"
                >
                  Indeed Flex {author.team}
                </Link>
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              <time itemProp="dateModified" dateTime={formattedDate}>
                Last updated: {formattedDate}
              </time>
            </p>
          </div>
        </div>

        {showReview && (
          <div className="sm:ml-auto flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-muted-foreground">
              Reviewed by {author.reviewer}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ArticleMetadata - Schema.org markup for articles
 * Can be rendered server-side for SEO
 */
interface ArticleMetadataProps {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  url: string;
}

export function ArticleMetadata({
  title,
  description,
  datePublished,
  dateModified,
  authorName = "Indeed Flex Career Hub",
  publisherName = "Indeed Flex",
  url,
}: ArticleMetadataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://indeedflex.com/career-hub/about",
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: "https://indeedflex.com",
      logo: {
        "@type": "ImageObject",
        url: "https://indeedflex.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

