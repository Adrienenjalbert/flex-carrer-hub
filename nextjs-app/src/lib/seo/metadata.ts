import { Metadata } from "next";

/**
 * SEO Metadata helpers for Next.js App Router
 * Replaces react-helmet-async with Next.js generateMetadata pattern
 */

export interface SEOMetaConfig {
  // Required
  title: string;
  description: string;
  canonical: string;

  // Open Graph
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  ogImageAlt?: string;

  // Article specific
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];

  // Twitter
  twitterCard?: "summary" | "summary_large_image" | "app";

  // Additional
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string[];

  // Geo
  geoRegion?: string;
  geoPlacename?: string;

  // Language
  lang?: string;
  alternateLanguages?: Array<{ lang: string; href: string }>;
}

export function generateSEOMetadata(config: SEOMetaConfig): Metadata {
  const {
    title,
    description,
    canonical,
    ogType = "website",
    ogImage = "https://indeedflex.com/og-image.png",
    ogImageAlt = title,
    publishedTime,
    modifiedTime,
    author = "Indeed Flex",
    section,
    tags = [],
    twitterCard = "summary_large_image",
    noindex = false,
    nofollow = false,
    keywords = [],
    alternateLanguages = [],
  } = config;

  const fullTitle = title.includes("Indeed Flex")
    ? title
    : `${title} | Indeed Flex`;
  const siteName = "Indeed Flex Career Hub";

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: author }],
    creator: "Indeed Flex",
    publisher: "Indeed Flex",

    // Open Graph
    openGraph: {
      type: ogType as "website" | "article" | "profile",
      siteName,
      title: fullTitle,
      description,
      url: canonical,
      locale: "en_US",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogImageAlt,
            },
          ]
        : undefined,
      ...(ogType === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author],
        section,
        tags,
      }),
    },

    // Twitter
    twitter: {
      card: twitterCard,
      site: "@indeedflex",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },

    // Alternates
    alternates: {
      canonical,
      languages:
        alternateLanguages.length > 0
          ? Object.fromEntries(alternateLanguages.map((a) => [a.lang, a.href]))
          : undefined,
    },
  };

  return metadata;
}

/**
 * Helper function to calculate reading time
 */
export const calculateReadingTime = (
  text: string,
  wordsPerMinute = 200
): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Helper function to generate keywords from content
 */
export const generateKeywords = (
  primary: string[],
  location?: string,
  role?: string,
  industry?: string
): string[] => {
  const keywords = [...primary];

  if (location) {
    keywords.push(
      `jobs in ${location}`,
      `${location} jobs`,
      `work in ${location}`,
      `flexible work ${location}`
    );
  }

  if (role) {
    keywords.push(
      `${role} jobs`,
      `${role} salary`,
      `become a ${role}`,
      `${role} career`
    );
  }

  if (industry) {
    keywords.push(
      `${industry} jobs`,
      `${industry} careers`,
      `work in ${industry}`
    );
  }

  return Array.from(new Set(keywords)); // Remove duplicates
};

/**
 * Generate role page metadata
 */
export function generateRoleMetadata(
  role: {
    title: string;
    slug: string;
    description: string;
    industry: string;
    salaryRange: { min: number; max: number };
  },
  baseUrl = "https://indeedflex.com"
): Metadata {
  return generateSEOMetadata({
    title: `${role.title} Jobs - Salary, Requirements & Career Guide`,
    description: `Learn about ${role.title} jobs: $${role.salaryRange.min}-$${role.salaryRange.max}/hr salary, requirements, and career path. Find flexible ${role.title} work near you.`,
    canonical: `${baseUrl}/career-hub/roles/${role.slug}`,
    ogType: "article",
    keywords: generateKeywords(
      [
        `${role.title} jobs`,
        `${role.title} salary`,
        `${role.title} requirements`,
        "flexible work",
        "hourly jobs",
      ],
      undefined,
      role.title,
      role.industry
    ),
  });
}

/**
 * Generate location page metadata
 */
export function generateLocationMetadata(
  location: { name: string; slug: string; state: string },
  baseUrl = "https://indeedflex.com"
): Metadata {
  return generateSEOMetadata({
    title: `Flexible Jobs in ${location.name}, ${location.state}`,
    description: `Find flexible hourly jobs in ${location.name}, ${location.state}. Explore warehouse, hospitality, retail and more opportunities with Indeed Flex.`,
    canonical: `${baseUrl}/career-hub/locations/${location.slug}`,
    ogType: "website",
    keywords: generateKeywords(
      ["flexible jobs", "hourly work", "temp jobs", "gig economy"],
      `${location.name}, ${location.state}`
    ),
    geoPlacename: `${location.name}, ${location.state}`,
    geoRegion: `US-${location.state}`,
  });
}

/**
 * Generate state tax calculator page metadata
 */
export function generateStateTaxMetadata(
  state: { name: string; slug: string; abbreviation: string },
  baseUrl = "https://indeedflex.com"
): Metadata {
  return generateSEOMetadata({
    title: `${state.name} Paycheck Calculator - Take-Home Pay & Tax Breakdown`,
    description: `Calculate your ${state.name} take-home pay. Free ${state.abbreviation} paycheck calculator with ${new Date().getFullYear()} tax rates, deductions, and hourly-to-salary conversion.`,
    canonical: `${baseUrl}/paycheck-calculator/${state.slug}`,
    ogType: "article",
    keywords: [
      `${state.name} paycheck calculator`,
      `${state.abbreviation} take home pay`,
      `${state.name} income tax`,
      `${state.name} salary calculator`,
      `${state.abbreviation} tax calculator`,
      "hourly wage calculator",
      "tax withholding",
    ],
    geoRegion: `US-${state.abbreviation}`,
    geoPlacename: state.name,
  });
}

