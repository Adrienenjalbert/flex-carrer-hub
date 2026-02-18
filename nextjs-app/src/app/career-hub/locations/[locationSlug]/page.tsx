import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign, ChevronRight, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usLocations, getLocationBySlug } from "@/lib/data/locations";
import { roles } from "@/lib/data/roles";
import { generateLocationMetadata } from "@/lib/seo/metadata";
import { BreadcrumbSchema, WebPageSchema } from "@/components/career-hub/seo";

// Generate static params for all locations
export function generateStaticParams() {
  return usLocations.map((location) => ({
    locationSlug: location.slug,
  }));
}

// Generate metadata for each location
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  return generateLocationMetadata({
    name: location.city,
    slug: location.slug,
    state: location.state,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locationSlug: string }>;
}) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  // Get roles relevant to this location's top industries
  const relevantRoles = roles.filter((role) =>
    location.topIndustries.some(
      (ind) => ind.toLowerCase().includes(role.industry.toLowerCase())
    )
  ).slice(0, 6);

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={`Flexible Jobs in ${location.city}, ${location.state}`}
        description={location.description}
        url={`https://indeedflex.com/career-hub/locations/${location.slug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Locations", url: "https://indeedflex.com/career-hub/locations" },
          { name: `${location.city}, ${location.state}` },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Locations", url: "https://indeedflex.com/career-hub/locations" },
          { name: `${location.city}, ${location.state}` },
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
            <Link href="/career-hub/locations" className="hover:text-primary">
              Locations
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{location.city}, {location.state}</span>
          </nav>

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <Badge variant="outline">{location.state}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Flexible Jobs in {location.city}, {location.state}
            </h1>
            <p className="text-xl text-muted-foreground">{location.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Average Hourly Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">
                  ${location.avgHourlyWage.min} - ${location.avgHourlyWage.max}/hr
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
                  {location.topIndustries.slice(0, 3).map((ind) => (
                    <Badge key={ind} variant="secondary" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Population</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{location.population}</p>
              </CardContent>
            </Card>
          </div>

          {/* Popular Roles */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Popular Roles in {location.city}
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

          {/* Industries */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Industries</h2>
            <div className="flex flex-wrap gap-2">
              {location.topIndustries.map((industry) => (
                <Badge key={industry} variant="outline" className="text-base py-2 px-4">
                  {industry}
                </Badge>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Find Flexible Work in {location.city}
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

