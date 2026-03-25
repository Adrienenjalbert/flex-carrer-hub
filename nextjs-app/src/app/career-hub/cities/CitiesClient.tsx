"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, DollarSign, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cities, getUniqueStates, getUniqueRegions } from "@/lib/data/cities";

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
            {filteredMajorCities.slice(0, 12).map((city) => {
              const ColIcon = city.costOfLiving.index > 100 ? TrendingUp : city.costOfLiving.index < 100 ? TrendingDown : Minus;
              return (
                <Link key={city.slug} href={`/career-hub/cities/${city.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{city.city}</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {city.stateCode}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm">
                        <DollarSign className="h-3.5 w-3.5 text-primary" />
                        <span className="font-semibold text-primary">
                          ${city.avgHourlyWage.min}–${city.avgHourlyWage.max}/hr
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ColIcon className={`h-3 w-3 ${city.costOfLiving.index > 100 ? 'text-red-500' : city.costOfLiving.index < 100 ? 'text-green-500' : ''}`} />
                          <span>COL: {city.costOfLiving.index}</span>
                        </div>
                        <span>{city.topIndustries[0]}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No major cities found in {selectedRegion}. Try selecting a different region.
          </p>
        )}
      </section>

      {/* Cities by State */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Browse Temp Jobs by State</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {states.map((state) => {
            const stateCities = cities.filter(
              (c) =>
                c.stateCode === state.code &&
                (!selectedRegion || c.region === selectedRegion)
            );
            if (stateCities.length === 0) return null;
            return (
              <div key={state.code} className="p-4 border rounded-lg hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{state.name}</h3>
                  <Badge variant="secondary" className="text-xs">{stateCities.length}</Badge>
                </div>
                <ul className="space-y-1.5">
                  {stateCities.slice(0, 5).map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/career-hub/cities/${city.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {city.city}
                      </Link>
                    </li>
                  ))}
                  {stateCities.length > 5 && (
                    <li className="text-xs text-muted-foreground/70">
                      +{stateCities.length - 5} more cities
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

