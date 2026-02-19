"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cities, getUniqueStates, getUniqueRegions, type City } from "@/lib/data/cities";

export default function CitiesClient() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regions = getUniqueRegions();
  const states = getUniqueStates();

  // Get major cities (population over 500k or top cities per state)
  const majorCities = cities.filter((city) => {
    if (!city.population) return false;
    const pop = parseInt(city.population.replace(/,/g, ""), 10);
    return pop > 500000;
  });

  // Filter cities by selected region
  const filteredMajorCities = selectedRegion
    ? majorCities.filter((city) => city.region === selectedRegion)
    : majorCities;

  // Get count of cities per region
  const getRegionCount = (region: string) => {
    return cities.filter((c) => c.region === region).length;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Region Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant={selectedRegion === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedRegion(null)}
          >
            All Regions ({cities.length})
          </Badge>
          {regions.map((region) => {
            const count = getRegionCount(region);
            return (
              <Badge
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedRegion(region)}
              >
                {region} ({count})
              </Badge>
            );
          })}
        </div>
        {selectedRegion && (
          <p className="text-sm text-muted-foreground">
            Showing {filteredMajorCities.length} cities in {selectedRegion}
          </p>
        )}
      </div>

      {/* Major Cities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {selectedRegion ? `Major Cities in ${selectedRegion}` : "Major Cities"}
        </h2>
        {filteredMajorCities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMajorCities.slice(0, 12).map((city) => (
              <Link key={city.slug} href={`/career-hub/cities/${city.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
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
                        Pop:{" "}
                        {(
                          parseInt(city.population.replace(/,/g, ""), 10) /
                          1000000
                        ).toFixed(1)}
                        M
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No major cities found in {selectedRegion}. Try selecting a different region.
          </p>
        )}
      </section>

      {/* Cities by State */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse by State</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {states.map((state) => {
            const stateCities = cities.filter(
              (c) =>
                c.stateCode === state.code &&
                (!selectedRegion || c.region === selectedRegion)
            );
            if (stateCities.length === 0) return null;
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
  );
}

