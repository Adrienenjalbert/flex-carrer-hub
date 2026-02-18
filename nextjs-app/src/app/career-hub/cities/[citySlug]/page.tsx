import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building, ChevronRight, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cities, getCityBySlug } from "@/lib/data/cities";
import { roles } from "@/lib/data/roles";
import { BreadcrumbSchema, WebPageSchema } from "@/components/career-hub/seo";

// Generate static params for all cities
export function generateStaticParams() {
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

// Generate metadata for each city
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return { title: "City Not Found" };
  }

  return {
    title: `Flexible Jobs in ${city.city}, ${city.state}`,
    description: city.description || `Find flexible hourly jobs in ${city.city}, ${city.state}. Explore opportunities in ${city.topIndustries.join(", ")} with Indeed Flex.`,
    keywords: [
      `jobs in ${city.city}`,
      `${city.city} jobs`,
      `flexible work ${city.city}`,
      `hourly jobs ${city.state}`,
    ],
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Get roles relevant to this city's top industries
  const relevantRoles = roles.filter((role) =>
    city.topIndustries.some(
      (ind) => ind.toLowerCase().includes(role.industry.toLowerCase())
    )
  ).slice(0, 6);

  const population = city.population 
    ? parseInt(city.population.replace(/,/g, ''), 10) 
    : 0;

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={`Flexible Jobs in ${city.city}, ${city.state}`}
        description={city.description}
        url={`https://indeedflex.com/career-hub/cities/${city.slug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Cities", url: "https://indeedflex.com/career-hub/cities" },
          { name: `${city.city}, ${city.state}` },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Cities", url: "https://indeedflex.com/career-hub/cities" },
          { name: `${city.city}, ${city.state}` },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/career-hub" className="hover:text-primary">
              Career Hub
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/career-hub/cities" className="hover:text-primary">
              Cities
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{city.city}, {city.state}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Badge variant="outline">{city.state}</Badge>
              <Badge variant="secondary">{city.region}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Flexible Jobs in {city.city}, {city.state}
            </h1>
            <p className="text-xl text-muted-foreground">{city.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {population > 1000000 
                    ? `${(population / 1000000).toFixed(1)}M` 
                    : `${(population / 1000).toFixed(0)}K`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Building className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Top Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {city.topIndustries.slice(0, 3).map((ind) => (
                    <Badge key={ind} variant="secondary" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Region</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{city.region}</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Roles */}
          {relevantRoles.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Popular Roles in {city.city}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relevantRoles.map((role) => (
                  <Link
                    key={role.slug}
                    href={`/career-hub/roles/${role.slug}`}
                  >
                    <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{role.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-2">
                          {role.shortDescription}
                        </CardDescription>
                        <p className="text-sm font-medium text-primary">
                          ${role.avgHourlyRate.min} - ${role.avgHourlyRate.max}/hr
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Industries */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Industries</h2>
            <div className="flex flex-wrap gap-2">
              {city.topIndustries.map((industry) => (
                <Badge key={industry} variant="outline" className="text-base py-2 px-4">
                  {industry}
                </Badge>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Find Flexible Work in {city.city}
            </h2>
            <p className="text-muted-foreground mb-4">
              Browse available shifts and start earning today.
            </p>
            <Button size="lg">Browse Jobs</Button>
          </div>
        </div>
      </div>
    </>
  );
}

