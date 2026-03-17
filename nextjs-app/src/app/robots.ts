import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://indeedflex.com";

  return {
    rules: [
      // General crawler rules
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/private/",
          "/admin/",
        ],
      },
      // Google (primary target)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      // Slow down aggressive SEO crawlers to save bandwidth
      {
        userAgent: "AhrefsBot",
        crawlDelay: 10,
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "MJ12bot",
        crawlDelay: 10,
        disallow: ["/api/", "/_next/"],
      },
      // AI search engine crawlers (AEO: maximize citation probability)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap/core.xml`,
      `${baseUrl}/sitemap/roles.xml`,
      `${baseUrl}/sitemap/cities.xml`,
      `${baseUrl}/sitemap/city-roles.xml`,
      `${baseUrl}/sitemap/tools.xml`,
      `${baseUrl}/sitemap/guides.xml`,
      `${baseUrl}/sitemap/articles.xml`,
      `${baseUrl}/sitemap/states.xml`,
      `${baseUrl}/sitemap/job-application.xml`,
      `${baseUrl}/sitemap/personas.xml`,
      `${baseUrl}/sitemap/seasonal.xml`,
      `${baseUrl}/sitemap/wage-report.xml`,
      `${baseUrl}/sitemap/career-evaluations.xml`,
      `${baseUrl}/sitemap/salary-by-city.xml`,
    ],
    host: baseUrl,
  };
}
