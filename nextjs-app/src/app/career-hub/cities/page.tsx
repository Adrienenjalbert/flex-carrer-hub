import { Metadata } from "next";
import { cities } from "@/lib/data/cities";
import { getUniqueStates, getUniqueRegions } from "@/lib/data/cities";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CitiesClient from "./CitiesClient";

export const metadata: Metadata = {
  title: "Jobs by City | Indeed Flex Career Hub",
  description: "Find flexible hourly jobs in cities across the United States. Explore opportunities in your city with Indeed Flex.",
  keywords: [
    "jobs by city",
    "local jobs",
    "hourly work near me",
    "city jobs",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/cities",
  },
  openGraph: {
    title: "Jobs by City | Indeed Flex Career Hub",
    description: "Find flexible hourly jobs in cities across the United States. Explore opportunities in your city.",
    url: "https://indeedflex.com/career-hub/cities",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs by City",
    description: "Find flexible hourly jobs in cities across the United States.",
  },
};

export default function CitiesPage() {
  const states = getUniqueStates();
  const regions = getUniqueRegions();

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Cities" }]} />
      </div>
      <PageHero
        title="Jobs by City"
        description={`Explore flexible work opportunities in ${cities.length}+ cities across the United States. Find jobs in your area with Indeed Flex.`}
        stats={[
          { value: `${cities.length}+`, label: "Cities" },
          { value: states.length.toString(), label: "States" },
          { value: regions.length.toString(), label: "Regions" },
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

