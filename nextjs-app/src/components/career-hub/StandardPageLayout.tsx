import { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}
import PageHero from "./PageHero";
import CTASection from "./CTASection";
import { InternalLinkHub } from "./InternalLinkHub";
import { PageContext } from "./InternalLinkHub";

interface StandardPageLayoutProps {
  // Breadcrumbs
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;

  // Header - either use PageHero or custom header
  usePageHero?: boolean;
  pageHeroProps?: {
    title: string;
    description: string;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    primaryCTA?: {
      label: string;
      href: string;
      icon?: ReactNode;
    };
    secondaryCTA?: {
      label: string;
      href: string;
    };
    badge?: string;
    stats?: Array<{
      value: string;
      label: string;
      icon?: ReactNode;
    }>;
  };
  customHeader?: ReactNode;

  // Main content
  children: ReactNode;

  // InternalLinkHub
  showInternalLinkHub?: boolean;
  internalLinkHubVariant?: "full" | "sidebar";
  currentPage?: PageContext;

  // CTA Section
  showCTASection?: boolean;
  ctaSectionProps?: {
    title?: string;
    subtitle?: string;
    primaryCTA?: string;
    secondaryCTA?: string;
  };

  // Container styling
  containerClassName?: string;
  contentClassName?: string;
}

/**
 * StandardPageLayout - Reusable layout component for consistent page structure
 * 
 * Ensures all pages have:
 * - Breadcrumbs (optional, but recommended)
 * - Header (PageHero or custom)
 * - Main content
 * - InternalLinkHub (for SEO and UX)
 * - CTASection (optional)
 */
export default function StandardPageLayout({
  breadcrumbs = [],
  showBreadcrumbs = true,
  usePageHero = false,
  pageHeroProps,
  customHeader,
  children,
  showInternalLinkHub = true,
  internalLinkHubVariant = "full",
  currentPage,
  showCTASection = true,
  ctaSectionProps,
  containerClassName = "",
  contentClassName = "",
}: StandardPageLayoutProps) {
  return (
    <>
      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* Header - PageHero or Custom */}
      {usePageHero && pageHeroProps && (
        <PageHero {...pageHeroProps} />
      )}
      {!usePageHero && customHeader && customHeader}

      {/* Main Content */}
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        <div className={contentClassName}>
          {children}
        </div>
      </div>

      {/* Internal Link Hub */}
      {showInternalLinkHub && currentPage && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <InternalLinkHub 
              variant={internalLinkHubVariant} 
              currentPage={currentPage} 
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showCTASection && (
        <CTASection {...ctaSectionProps} />
      )}
    </>
  );
}

