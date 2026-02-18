import { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cities, getUniqueStates, getUniqueRegions } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Jobs by City",
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
};

export default function CitiesPage() {
  const states = getUniqueStates();
  const regions = getUniqueRegions();

  // Get major cities (population over 500k or top cities per state)
  const majorCities = cities.filter(city => {
    if (!city.population) return false;
    const pop = parseInt(city.population.replace(/,/g, ''), 10);
    return pop > 500000;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Jobs by City</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore flexible work opportunities in {cities.length}+ cities.
        </p>

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map((region) => (
            <Badge key={region} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {region}
            </Badge>
          ))}
        </div>

        {/* Major Cities */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Major Cities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {majorCities.slice(0, 12).map((city) => (
              <Link key={city.slug} href={`/career-hub/cities/${city.slug}`}>
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{city.city}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {city.city}, {city.state}
                    </CardDescription>
                    {city.population && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Pop: {(parseInt(city.population.replace(/,/g, ''), 10) / 1000000).toFixed(1)}M
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Cities by State */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Browse by State</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {states.map((state) => {
              const stateCities = cities.filter(c => c.stateCode === state.code);
              return (
                <div key={state.code} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{state.name}</h3>
                  <ul className="text-sm space-y-1">
                    {stateCities.slice(0, 5).map((city) => (
                      <li key={city.slug}>
                        <Link 
                          href={`/career-hub/cities/${city.slug}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {city.city}
                        </Link>
                      </li>
                    ))}
                    {stateCities.length > 5 && (
                      <li className="text-muted-foreground">
                        +{stateCities.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

