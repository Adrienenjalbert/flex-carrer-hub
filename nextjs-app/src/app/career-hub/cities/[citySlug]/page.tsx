import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Building, Users, DollarSign, Home, ShoppingCart, Calculator, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cities, getCityBySlug, getHighValueCitySlugs } from "@/lib/data/cities";
import { roles, industries } from "@/lib/data/roles";
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from "@/components/career-hub/seo";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import NeighborhoodGuide from "@/components/career-hub/NeighborhoodGuide";
import { getEmployersByCity, getCityStats } from "@/lib/data/local-employers";
import { generateCityFAQs } from "@/lib/faq-generator";
import FAQSection from "@/components/career-hub/FAQSection";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { generateCityMetadata } from "@/lib/seo/metadata";

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

  return generateCityMetadata({
    name: city.city,
    slug: city.slug,
    state: city.state,
  });
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

  const isHighValue = getHighValueCitySlugs().has(citySlug);

  // Get all roles grouped by industry
  const rolesByIndustry = industries.reduce((acc, industry) => {
    acc[industry.id] = roles.filter((role) => role.industry === industry.id);
    return acc;
  }, {} as Record<string, typeof roles>);

  // Get local employers
  const cityEmployers = getEmployersByCity(citySlug);
  const _cityStats = getCityStats(citySlug);

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

  // Comparison data for nearby cities
  const nearbyCities = cities
    .filter((c) => c.slug !== city.slug && c.region === city.region)
    .slice(0, 4);

  // Budget calculations
  const avgHourly = (city.avgHourlyWage.min + city.avgHourlyWage.max) / 2;
  const monthlyGross = Math.round(avgHourly * 40 * 4.33);
  const estimatedTax = Math.round(monthlyGross * 0.22);
  const monthlyNet = monthlyGross - estimatedTax;
  const totalEssentials = city.costOfLiving.rent.oneBed + city.costOfLiving.groceries + city.costOfLiving.transport;
  const disposable = monthlyNet - totalEssentials;
  const colDiff = Math.abs(city.costOfLiving.index - 100);
  const colDirection = city.costOfLiving.index > 100 ? 'above' : city.costOfLiving.index < 100 ? 'below' : 'at';

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
            { label: "Career Hub", href: "/career-hub" },
            { label: "Cities", href: "/career-hub/cities" },
            { label: `${city.city}, ${city.state}` },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <Badge variant="outline">{city.state}</Badge>
              <Badge variant="secondary">{city.region}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Temp &amp; Flexible Jobs in {city.city}, {city.state}
            </h1>
            {/* Answer-first paragraph for AEO */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              Temporary and flexible workers in {city.city} earn ${city.avgHourlyWage.min}&ndash;${city.avgHourlyWage.max}/hr across {city.topIndustries.slice(0, 3).join(', ')} &mdash; with 
              a cost of living {colDiff}% {colDirection} the national average (BLS, 2024). 
              {city.costOfLiving.index < 100 
                ? ` Your dollar stretches further here than in most major metros.`
                : city.costOfLiving.index > 110 
                  ? ` Higher wages help offset the above-average cost of living.`
                  : ` Living costs are close to the national average.`
              }
            </p>
            <p className="text-muted-foreground">{city.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">
                  ${city.avgHourlyWage.min}&ndash;${city.avgHourlyWage.max}
                </p>
                <p className="text-sm text-muted-foreground">Avg Hourly Pay</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{city.costOfLiving.index}</p>
                <p className="text-sm text-muted-foreground">Cost Index</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">
                  {population > 1000000 
                    ? `${(population / 1000000).toFixed(1)}M` 
                    : `${(population / 1000).toFixed(0)}K`}
                </p>
                <p className="text-sm text-muted-foreground">Population</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Building className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{city.topIndustries.length}</p>
                <p className="text-sm text-muted-foreground">Key Industries</p>
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

          {/* Why Work Here */}
          {city.highlights.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Why Work in {city.city}?</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {city.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Salary Comparison Table */}
          {nearbyCities.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{city.city} vs Nearby Cities</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-3 font-semibold">City</th>
                          <th className="text-right p-3 font-semibold">Avg Wage</th>
                          <th className="text-right p-3 font-semibold">Cost Index</th>
                          <th className="text-right p-3 font-semibold">1-Bed Rent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-primary/5">
                          <td className="p-3 font-semibold text-primary">{city.city}, {city.stateCode}</td>
                          <td className="text-right p-3 font-semibold">${city.avgHourlyWage.min}&ndash;${city.avgHourlyWage.max}/hr</td>
                          <td className="text-right p-3">{city.costOfLiving.index}</td>
                          <td className="text-right p-3">${city.costOfLiving.rent.oneBed.toLocaleString()}</td>
                        </tr>
                        {nearbyCities.map((nc) => (
                          <tr key={nc.slug} className="border-b hover:bg-muted/30">
                            <td className="p-3">
                              <Link href={`/career-hub/cities/${nc.slug}`} className="hover:text-primary transition-colors">
                                {nc.city}, {nc.stateCode}
                              </Link>
                            </td>
                            <td className="text-right p-3">${nc.avgHourlyWage.min}&ndash;${nc.avgHourlyWage.max}/hr</td>
                            <td className="text-right p-3">{nc.costOfLiving.index}</td>
                            <td className="text-right p-3">${nc.costOfLiving.rent.oneBed.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground p-3 border-t">
                    Source: BLS OEWS 2024, local housing data. Cost index 100 = national average.
                  </p>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Monthly Budget Snapshot */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Monthly Budget Snapshot</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  If you earn the average hourly wage (${avgHourly.toFixed(2)}/hr) working 40 hours/week in {city.city}:
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly gross income</span>
                    <span className="font-semibold">${monthlyGross.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Est. taxes (~22%)</span>
                    <span className="text-red-600">-${estimatedTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1-bedroom rent</span>
                    <span>-${city.costOfLiving.rent.oneBed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Groceries + transport</span>
                    <span>-${(city.costOfLiving.groceries + city.costOfLiving.transport).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="font-medium">Remaining for savings &amp; lifestyle</span>
                    <span className={`font-bold text-lg ${disposable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${disposable.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/career-hub/tools/paycheck-calculator">
                      <Calculator className="mr-2 h-4 w-4" />
                      Customize Your Budget
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/career-hub/tools/cost-of-living">
                      <Home className="mr-2 h-4 w-4" />
                      Compare Cost of Living
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Temp & Flexible Jobs by Industry */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Temp &amp; Flexible Jobs in {city.city}</h2>
            <Tabs defaultValue={industries[0]?.id || "hospitality"} className="w-full">
              <TabsList className="!h-auto flex flex-wrap gap-2 bg-transparent p-0 mb-6">
                {industries.map((industry) => {
                  const industryRoles = rolesByIndustry[industry.id] || [];
                  if (industryRoles.length === 0) return null;
                  return (
                    <TabsTrigger 
                      key={industry.id} 
                      value={industry.id}
                      className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-colors"
                    >
                      {industry.name} ({industryRoles.length})
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {industries.map((industry) => {
                const industryRoles = rolesByIndustry[industry.id] || [];
                if (industryRoles.length === 0) return null;
                const INITIAL = 6;
                const visibleRoles = industryRoles.slice(0, INITIAL);
                const hiddenRoles = industryRoles.slice(INITIAL);
                
                const renderRoleCard = (role: typeof roles[0]) => {
                  const localSalary = getLocalSalary(role.avgHourlyRate.min, role.avgHourlyRate.max);
                  return (
                    <Link
                      key={role.slug}
                      href={isHighValue ? `/career-hub/cities/${citySlug}/${role.slug}` : `/career-hub/roles/${role.slug}`}
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
                };

                return (
                  <TabsContent key={industry.id} value={industry.id}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visibleRoles.map(renderRoleCard)}
                    </div>
                    {hiddenRoles.length > 0 && (
                      <details className="mt-4 group">
                        <summary className="flex items-center justify-center cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 list-none [&::-webkit-details-marker]:hidden">
                          <span className="group-open:hidden">Show all {industryRoles.length} roles ↓</span>
                          <span className="hidden group-open:inline">Show fewer ↑</span>
                        </summary>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {hiddenRoles.map(renderRoleCard)}
                        </div>
                      </details>
                    )}
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
              <FAQSection faqs={cityFAQs} suppressSchema />
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

