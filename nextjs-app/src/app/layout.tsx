import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Optimized font loading with display:swap to prevent FOIT
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Indeed Flex Career Hub - Flexible Jobs, Tools & Career Guides",
    template: "%s | Indeed Flex",
  },
  description:
    "Find flexible work opportunities, career guides, pay calculators, and tools for hourly workers. Explore roles in hospitality, warehouse, retail, and more across the US.",
  keywords: [
    "flexible jobs",
    "temp work",
    "hourly work",
    "gig economy",
    "Indeed Flex",
    "warehouse jobs",
    "hospitality jobs",
    "retail jobs",
    "part time jobs",
    "shift work",
  ],
  metadataBase: new URL("https://indeedflex.com"),
  applicationName: "Indeed Flex Career Hub",
  authors: [{ name: "Indeed Flex", url: "https://indeedflex.com" }],
  creator: "Indeed Flex",
  publisher: "Indeed Flex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Indeed Flex Career Hub",
    title: "Indeed Flex Career Hub - Flexible Jobs, Tools & Career Guides",
    description:
      "Find flexible work opportunities, career guides, and tools for hourly workers across the US.",
    url: "https://indeedflex.com",
    images: [
      {
        url: "https://indeedflex.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indeed Flex Career Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@indeedflex",
    creator: "@indeedflex",
    title: "Indeed Flex Career Hub",
    description:
      "Find flexible work opportunities, career guides, and tools for hourly workers.",
    images: ["https://indeedflex.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Employment",
  verification: {
    // Add your verification codes here
    // google: "google-site-verification-code",
    // yandex: "yandex-verification-code",
  },
  alternates: {
    canonical: "https://indeedflex.com",
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    language: "English",
  },
};

// Organization Schema for site-wide E-E-A-T
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://indeedflex.com/#organization",
  name: "Indeed Flex",
  alternateName: "Indeed Flex Career Hub",
  url: "https://indeedflex.com",
  logo: {
    "@type": "ImageObject",
    url: "https://indeedflex.com/logo.png",
    width: 512,
    height: 512,
  },
  description:
    "Indeed Flex connects workers with flexible shift work in hospitality, warehouse, retail, and facilities management across the United States.",
  foundingDate: "2019",
  sameAs: [
    "https://twitter.com/indeedflex",
    "https://www.linkedin.com/company/indeed-flex/",
    "https://www.facebook.com/indeedflex",
    "https://www.instagram.com/indeedflex/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-833-433-5393",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
};

// WebSite Schema with SearchAction for sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://indeedflex.com/#website",
  url: "https://indeedflex.com",
  name: "Indeed Flex Career Hub",
  description:
    "Career resources, tools, and guides for flexible and hourly workers in the US.",
  publisher: {
    "@id": "https://indeedflex.com/#organization",
  },
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://indeedflex.com/career-hub?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  ],
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://indeedflex.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Site-wide structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
