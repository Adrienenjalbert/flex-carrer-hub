import { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usLocations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Flexible Jobs by Location",
  description: "Find flexible hourly jobs near you. Explore opportunities in major cities across the United States with Indeed Flex.",
  keywords: [
    "flexible jobs near me",
    "hourly work by location",
    "temp jobs in my area",
    "gig work by city",
  ],
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Flexible Jobs by Location</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find hourly work opportunities in major cities across the United
          States.
        </p>

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
  );
}

