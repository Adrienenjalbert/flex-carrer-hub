import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building, Users, DollarSign, Home, ShoppingCart, Car, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cities, getCityBySlug } from "@/lib/data/cities";
import { roles, industries } from "@/lib/data/roles";
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from "@/components/career-hub/seo";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import NeighborhoodGuide from "@/components/career-hub/NeighborhoodGuide";
import { getEmployersByCity, getCityStats, type LocalEmployer } from "@/lib/data/local-employers";
import { generateCityFAQs } from "@/lib/faq-generator";
import FAQSection from "@/components/career-hub/FAQSection";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import { getLastUpdated } from "@/lib/utils/date-variation";

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

  const description = city.description || `Find flexible hourly jobs in ${city.city}, ${city.state}. Explore opportunities in ${city.topIndustries.join(", ")} with Indeed Flex.`;
  const canonical = `https://indeedflex.com/career-hub/cities/${city.slug}`;

  return {
    title: `Flexible Jobs in ${city.city}, ${city.state} | Indeed Flex Career Hub`,
    description,
    keywords: [
      `jobs in ${city.city}`,
      `${city.city} jobs`,
      `flexible work ${city.city}`,
      `hourly jobs ${city.state}`,
      `${city.city} ${city.state} jobs`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Flexible Jobs in ${city.city}, ${city.state}`,
      description,
      url: canonical,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Flexible Jobs in ${city.city}, ${city.state}`,
      description,
    },
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

  // Get all roles grouped by industry
  const rolesByIndustry = industries.reduce((acc, industry) => {
    acc[industry.id] = roles.filter((role) => role.industry === industry.id);
    return acc;
  }, {} as Record<string, typeof roles>);

  // Get local employers
  const cityEmployers = getEmployersByCity(citySlug);
  const cityStats = getCityStats(citySlug);

  // Generate city FAQs
  const cityFAQs = generateCityFAQs(city);

  // Calculate local salary adjustment
  const getLocalSalary = (baseMin: number, baseMax: number) => {
    const adjustment = city.costOfLiving.index / 100;
    return {
      min: Math.round(baseMin * adjustment * 100) / 100,
      max: Math.round(baseMax * adjustment * 100) / 100,
    };
  };

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
      {cityFAQs.length > 0 && (
        <FAQSchema
          questions={cityFAQs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))}
        />
      )}

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Cities", href: "/career-hub/cities" },
            { label: `${city.city}, ${city.state}` },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

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

          {/* Cost of Living Breakdown */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cost of Living in {city.city}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Housing Costs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Studio Apartment</span>
                      <span className="font-semibold">${city.costOfLiving.rent.studio.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">1 Bedroom</span>
                      <span className="font-semibold">${city.costOfLiving.rent.oneBed.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Monthly Expenses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Groceries</span>
                      <span className="font-semibold">${city.costOfLiving.groceries}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transport</span>
                      <span className="font-semibold">${city.costOfLiving.transport}/mo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Cost of Living Index</span>
                <Badge variant={city.costOfLiving.index > 100 ? "destructive" : city.costOfLiving.index < 100 ? "default" : "secondary"}>
                  {city.costOfLiving.index} (National Avg: 100)
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {city.costOfLiving.index > 100 
                  ? `${city.costOfLiving.index - 100}% above national average`
                  : city.costOfLiving.index < 100
                  ? `${100 - city.costOfLiving.index}% below national average`
                  : "Equal to national average"}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/career-hub/tools/paycheck-calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Your Take-Home Pay
                </Link>
              </Button>
            </div>
          </section>

          {/* All Roles by Industry */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">All Jobs in {city.city}</h2>
            <Tabs defaultValue={industries[0]?.id || "hospitality"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
                {industries.map((industry) => {
                  const industryRoles = rolesByIndustry[industry.id] || [];
                  if (industryRoles.length === 0) return null;
                  return (
                    <TabsTrigger key={industry.id} value={industry.id}>
                      {industry.name} ({industryRoles.length})
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {industries.map((industry) => {
                const industryRoles = rolesByIndustry[industry.id] || [];
                if (industryRoles.length === 0) return null;
                return (
                  <TabsContent key={industry.id} value={industry.id}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {industryRoles.map((role) => {
                        const localSalary = getLocalSalary(role.avgHourlyRate.min, role.avgHourlyRate.max);
                        return (
                          <Link
                            key={role.slug}
                            href={`/career-hub/cities/${citySlug}/${role.slug}`}
                          >
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{role.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription className="mb-2 line-clamp-2">
                                  {role.shortDescription}
                                </CardDescription>
                                <div className="flex items-center justify-between mt-3">
                                  <p className="text-sm font-medium text-primary">
                                    ${localSalary.min} - ${localSalary.max}/hr
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    {industry.name}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </section>

          {/* Neighborhood Guide */}
          <section className="mb-8">
            <NeighborhoodGuide
              citySlug={citySlug}
              cityName={city.city}
            />
          </section>

          {/* Local Employers Overview */}
          {cityEmployers.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Major Employers in {city.city}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {cityEmployers.slice(0, 6).map((employer) => (
                  <Card key={employer.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{employer.employerName}</CardTitle>
                      <CardDescription>{employer.facilityType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Pay Range</span>
                          <span className="font-semibold">
                            ${employer.payRange.min} - ${employer.payRange.max}/hr
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Typical Hires</span>
                          <span>
                            {employer.typicalHires.ongoing} ongoing, {employer.typicalHires.seasonal} seasonal
                          </span>
                        </div>
                        {employer.roles.length > 0 && (
                          <div>
                            <span className="text-muted-foreground text-xs">Roles: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {employer.roles.slice(0, 3).map((roleSlug) => {
                                const role = roles.find((r) => r.slug === roleSlug);
                                return role ? (
                                  <Link
                                    key={roleSlug}
                                    href={`/career-hub/cities/${citySlug}/${roleSlug}`}
                                    className="text-xs"
                                  >
                                    <Badge variant="secondary" className="text-xs">
                                      {role.title}
                                    </Badge>
                                  </Link>
                                ) : null;
                              })}
                              {employer.roles.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{employer.roles.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {cityEmployers.length > 6 && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  And {cityEmployers.length - 6} more employers in {city.city}
                </p>
              )}
            </section>
          )}

          {/* City FAQs */}
          {cityFAQs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <FAQSection faqs={cityFAQs} />
            </section>
          )}

          {/* Author Byline & Data Source */}
          <div className="mb-8">
            <AuthorByline
              contentType="city"
              lastUpdated={getLastUpdated(citySlug, 'core')}
              variant="block"
            />
            <div className="mt-4">
              <DataSourceCitation
                pageType="city"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "city", 
            city: citySlug
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}

