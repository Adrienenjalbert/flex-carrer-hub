import { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usLocations } from "@/lib/data/locations";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Flexible Jobs by Location | Indeed Flex Career Hub",
  description: "Find flexible hourly jobs near you. Explore opportunities in major cities across the United States with Indeed Flex.",
  keywords: [
    "flexible jobs near me",
    "hourly work by location",
    "temp jobs in my area",
    "gig work by city",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/locations",
  },
  openGraph: {
    title: "Flexible Jobs by Location | Indeed Flex Career Hub",
    description: "Find flexible hourly jobs near you. Explore opportunities in major cities across the United States.",
    url: "https://indeedflex.com/career-hub/locations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexible Jobs by Location",
    description: "Find flexible hourly jobs near you.",
  },
};

export default function LocationsPage() {
  // Group locations by state
  const locationsByState = usLocations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {} as Record<string, typeof usLocations>);

  const states = Object.keys(locationsByState).sort();

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Locations" }]} />
      </div>
      <PageHero
        title="Flexible Jobs by Location"
        description={`Find hourly work opportunities in ${usLocations.length} major cities across the United States where Indeed Flex is actively operating.`}
        stats={[
          { value: usLocations.length.toString(), label: "Active Markets" },
          { value: states.length.toString(), label: "States" },
          { value: "19", label: "Metro Areas" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">

        <div className="grid gap-8">
          {states.map((state) => (
            <section key={state}>
              <h2 className="text-2xl font-semibold mb-4">{state}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationsByState[state].map((location) => (
                  <Link
                    key={location.slug}
                    href={`/career-hub/locations/${location.slug}`}
                  >
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">
                            {location.city}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Explore flexible work in {location.city},{" "}
                          {location.state}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "location" }} />
      </div>
      <CTASection />
    </>
  );
}

