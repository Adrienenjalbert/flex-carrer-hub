import { Metadata } from "next";
import { cities } from "@/lib/data/cities";
import { getUniqueStates, getUniqueRegions } from "@/lib/data/cities";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CitiesClient from "./CitiesClient";

export const metadata: Metadata = {
  title: "Temp & Flexible Jobs by City | Indeed Flex Career Hub",
  description: "Find temporary, part-time, and flexible jobs in 100+ US cities. Compare hourly wages, cost of living, and top industries. Browse temp jobs near you with Indeed Flex.",
  keywords: [
    "temp jobs near me",
    "temporary jobs by city",
    "flexible jobs near me",
    "part time jobs by city",
    "hourly work near me",
    "seasonal jobs",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/cities",
  },
  openGraph: {
    title: "Temp & Flexible Jobs by City | Indeed Flex",
    description: "Find temporary and flexible jobs in 100+ US cities. Compare wages, cost of living, and top industries.",
    url: "https://indeedflex.com/career-hub/cities",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temp & Flexible Jobs by City",
    description: "Find temporary and flexible jobs in 100+ US cities. Compare wages and cost of living.",
  },
};

export default function CitiesPage() {
  const states = getUniqueStates();
  const _regions = getUniqueRegions();

  const wageRange = cities.reduce(
    (acc, c) => ({ min: Math.min(acc.min, c.avgHourlyWage.min), max: Math.max(acc.max, c.avgHourlyWage.max) }),
    { min: 99, max: 0 }
  );

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Cities" },
          ]}
        />
      </div>
      <PageHero
        title="Jobs by City"
        description={`Browse temp, part-time, and flexible jobs in ${cities.length}+ cities across ${states.length} states — paying $${wageRange.min}–$${wageRange.max}/hr. Compare local wages, cost of living, and top hiring industries.`}
        stats={[
          { value: `${cities.length}+`, label: "Cities" },
          { value: states.length.toString(), label: "States" },
          { value: `$${wageRange.min}–$${wageRange.max}`, label: "Hourly Range" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <CitiesClient />
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "city" }} />
      </div>
      <CTASection />
    </>
  );
}

