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
          "/*?*", // Block URL parameters (avoid duplicate content)
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
      // Block AI training crawlers (optional - remove if you want to be in AI training data)
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap/core.xml`,
      `${baseUrl}/sitemap/roles.xml`,
      `${baseUrl}/sitemap/cities.xml`,
      `${baseUrl}/sitemap/city-roles.xml`,
      `${baseUrl}/sitemap/tools.xml`,
      `${baseUrl}/sitemap/guides.xml`,
      `${baseUrl}/sitemap/states.xml`,
      `${baseUrl}/sitemap/job-application.xml`,
      `${baseUrl}/sitemap/personas.xml`,
    ],
    host: baseUrl,
  };
}
