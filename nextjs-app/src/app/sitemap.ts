import { MetadataRoute } from "next";
import { roles } from "@/lib/data/roles";
import { usLocations } from "@/lib/data/locations";
import { cities } from "@/lib/data/cities";
import { getAllStateSlugs } from "@/lib/data/state-tax-content";
import { howToBecomeGuides } from "@/lib/data/how-to-become";
import { interviewGuides } from "@/lib/data/interview-questions";
import { stateUnemploymentData } from "@/lib/data/unemployment-benefits";
import { certifications } from "@/lib/data/certifications";
import { getCitiesWithEmployerData } from "@/lib/data/local-employers";
import { getCitiesWithNeighborhoodData } from "@/lib/data/city-neighborhoods";
import { resumeTemplates } from "@/lib/data/resume-templates";
import { coverLetterTemplates } from "@/lib/data/cover-letter-templates";
import { resumeExamples } from "@/lib/data/resume-examples";
import { personaHubs } from "@/lib/data/persona-hubs";
import { calculatorRolePresets, getCanonicalToolSlugs } from "@/lib/data/tool-registry";
import { seasons, seasonalEvents } from "@/lib/data/seasonal-hiring";
import { occupationWageData, industryTrends, regionalAnalysis } from "@/lib/data/wage-report/2026-data";

const BASE_URL = "https://indeedflex.com";

// Sitemap index structure for better crawlability
// Next.js 14+ supports generateSitemaps for index approach
export async function generateSitemaps() {
  return [
    { id: "core" },
    { id: "roles" },
    { id: "cities" },
    { id: "city-roles" },
    { id: "tools" },
    { id: "guides" },
    { id: "states" },
    { id: "job-application" },
    { id: "personas" },
    { id: "seasonal" },
    { id: "wage-report" },
  ];
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  const now = new Date();

  switch (id) {
    case "core":
      return generateCoreSitemap(now);
    case "roles":
      return generateRolesSitemap(now);
    case "cities":
      return generateCitiesSitemap(now);
    case "city-roles":
      return generateCityRolesSitemap(now);
    case "tools":
      return generateToolsSitemap(now);
    case "guides":
      return generateGuidesSitemap(now);
    case "states":
      return generateStatesSitemap(now);
    case "job-application":
      return generateJobApplicationSitemap(now);
    case "personas":
      return generatePersonasSitemap(now);
    case "seasonal":
      return generateSeasonalSitemap(now);
    case "wage-report":
      return generateWageReportSitemap(now);
    default:
      return [];
  }
}

// Core pages sitemap
function generateCoreSitemap(now: Date): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/career-hub`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/career-hub/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career-hub/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/roles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/cities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/financial-tips`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career-hub/seasonal-hiring`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/career-hub/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-to-become`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/interview-questions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/industries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career-hub/wage-report`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

// Role pages sitemap
function generateRolesSitemap(now: Date): MetadataRoute.Sitemap {
  return roles.map((role) => ({
    url: `${BASE_URL}/career-hub/roles/${role.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}

// City pages sitemap
function generateCitiesSitemap(now: Date): MetadataRoute.Sitemap {
  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/career-hub/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const locationPages = usLocations.map((location) => ({
    url: `${BASE_URL}/career-hub/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...cityPages, ...locationPages];
}

// City + Role combination pages sitemap
function generateCityRolesSitemap(now: Date): MetadataRoute.Sitemap {
  // Only include cities with enriched local data
  const citiesWithData = new Set([
    ...getCitiesWithEmployerData(),
    ...getCitiesWithNeighborhoodData(),
  ]);

  // High-value cities with search volume or local data
  const highValueCities = cities.filter(
    (c) => c.searchVolume === "high" || citiesWithData.has(c.slug)
  );

  return highValueCities.flatMap((city) =>
    roles.map((role) => ({
      url: `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );
}

// Tools pages sitemap
function generateToolsSitemap(now: Date): MetadataRoute.Sitemap {
  // Canonical calculator tools (from tool registry)
  const canonicalTools = getCanonicalToolSlugs();
  
  // Additional tools
  const otherTools = [
    "cost-of-living",
    "benefits-checker",
    "unemployment-calculator",
    "commute-calculator",
    "worktalk",
    "safety-first",
    "career-path",
    "interview-prep",
    "cocktail-quiz",
    "menu-master",
    "side-hustle",
    "certification-finder",
    "job-search-checklist",
    "resume-builder",
    "childcare-calculator",
    "certification-roi",
    "job-offer-analyzer",
    "skills-analyzer",
    "data-verification",
  ];

  // Role intent pages for paycheck calculator
  const roleIntentPages = calculatorRolePresets.map((role) => ({
    url: `${BASE_URL}/paycheck-calculator/${role.roleId}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Alternative comparison pages
  const alternativePages = [
    "adp-alternative",
  ].map((alt) => ({
    url: `${BASE_URL}/paycheck-calculator/${alt}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${BASE_URL}/career-hub/tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Canonical calculator tools (highest priority)
    ...canonicalTools.map((tool) => ({
      url: `${BASE_URL}/career-hub/tools/${tool}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Other tools
    ...otherTools.map((tool) => ({
      url: `${BASE_URL}/career-hub/tools/${tool}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Role intent pages
    ...roleIntentPages,
    // Alternative pages
    ...alternativePages,
  ];
}

// Guide pages sitemap
function generateGuidesSitemap(now: Date): MetadataRoute.Sitemap {
  const howToPages = howToBecomeGuides.map((guide) => ({
    url: `${BASE_URL}/how-to-become/${guide.roleSlug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const interviewPages = interviewGuides.map((guide) => ({
    url: `${BASE_URL}/interview-questions/${guide.roleSlug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const certPages = [
    {
      url: `${BASE_URL}/certifications`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...certifications.map((cert) => ({
      url: `${BASE_URL}/certifications/${cert.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [...howToPages, ...interviewPages, ...certPages];
}

// State tax/unemployment pages sitemap
function generateStatesSitemap(now: Date): MetadataRoute.Sitemap {
  const taxPages = getAllStateSlugs().map((slug) => ({
    url: `${BASE_URL}/paycheck-calculator/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const unemploymentPages = [
    {
      url: `${BASE_URL}/unemployment-benefits`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...Object.keys(stateUnemploymentData).map((code) => ({
      url: `${BASE_URL}/unemployment-benefits/${code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];

  return [...taxPages, ...unemploymentPages];
}

// Job application toolkit sitemap
function generateJobApplicationSitemap(now: Date): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/career-hub/job-application-toolkit`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/templates`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career-hub/cover-letters`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career-hub/resume-examples`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...resumeTemplates.map((template) => ({
      url: `${BASE_URL}/career-hub/templates/${template.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...coverLetterTemplates.map((template) => ({
      url: `${BASE_URL}/career-hub/cover-letters/${template.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...resumeExamples.map((example) => ({
      url: `${BASE_URL}/career-hub/resume-examples/${example.roleSlug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

// Persona hub pages sitemap
function generatePersonasSitemap(now: Date): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/career-hub/for`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...personaHubs.map((hub) => ({
      url: `${BASE_URL}/career-hub/for/${hub.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Experience level pages
    {
      url: `${BASE_URL}/career-hub/experience/entry-level`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Pay range pages
    {
      url: `${BASE_URL}/career-hub/pay-range/15-20`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career-hub/pay-range/20-25`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career-hub/pay-range/25-plus`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    // Schedule type pages
    {
      url: `${BASE_URL}/career-hub/schedule/weekend`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career-hub/schedule/night-shift`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/career-hub/schedule/flexible`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];
}

// Seasonal hiring pages sitemap
function generateSeasonalSitemap(now: Date): MetadataRoute.Sitemap {
  // Season pages
  const seasonPages = seasons.map((season) => ({
    url: `${BASE_URL}/career-hub/seasonal-hiring/${season.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Event pages
  const eventPages = seasonalEvents.map((event) => ({
    url: `${BASE_URL}/career-hub/seasonal-hiring/events/${event.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // High-intent landing pages
  const landingPages = [
    {
      url: `${BASE_URL}/career-hub/summer-jobs-2026`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/holiday-jobs-2026`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...landingPages, ...seasonPages, ...eventPages];
}

// Wage report pages sitemap
function generateWageReportSitemap(now: Date): MetadataRoute.Sitemap {
  // Hub and main pages
  const corePages = [
    {
      url: `${BASE_URL}/career-hub/wage-report`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/wage-report/2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/career-hub/wage-report/2026/methodology`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
  ];

  // Industry pages
  const industryPages = industryTrends.map((industry) => ({
    url: `${BASE_URL}/career-hub/wage-report/2026/by-industry/${industry.industrySlug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Occupation pages
  const occupationPages = occupationWageData.map((occ) => ({
    url: `${BASE_URL}/career-hub/wage-report/2026/by-occupation/${occ.occupationSlug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Regional pages (top regions only)
  const regionalPages = regionalAnalysis
    .filter(reg => reg.citySlug)
    .slice(0, 20)
    .map((region) => ({
      url: `${BASE_URL}/career-hub/wage-report/2026/by-region/${region.citySlug || region.stateCode.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...corePages, ...industryPages, ...occupationPages, ...regionalPages];
}
