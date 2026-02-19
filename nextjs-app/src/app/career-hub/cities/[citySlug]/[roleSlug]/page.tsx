import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DollarSign,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle,
  Building2,
  GraduationCap,
  Users,
  ArrowRight,
  Calculator,
  Target,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cities, getCityBySlug } from "@/lib/data/cities";
import { roles, getRoleBySlug, industries } from "@/lib/data/roles";
import { generateCityRoleFAQs } from "@/lib/faq-generator";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import LocalEmployerSection from "@/components/career-hub/LocalEmployerSection";
import NeighborhoodGuide from "@/components/career-hub/NeighborhoodGuide";
import DataSourceCitation from "@/components/career-hub/DataSourceCitation";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import {
  JobPostingSchema,
  OccupationSchema,
  FAQSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
  WebPageSchema,
} from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import CityRolePageClient from "./CityRolePageClient";

const BASE_URL = "https://indeedflex.com";

// Helper to calculate local salary based on city cost of living
function getLocalSalary(
  role: { avgHourlyRate: { min: number; max: number } },
  city: { costOfLiving: { index: number } }
) {
  const costAdjustment = city.costOfLiving.index / 100;
  const min =
    Math.round(role.avgHourlyRate.min * costAdjustment * 100) / 100;
  const max =
    Math.round(role.avgHourlyRate.max * costAdjustment * 100) / 100;
  return { min: Math.max(min, role.avgHourlyRate.min), max };
}

// Get nearby cities for internal linking
function getNearbyCities(
  currentCity: { slug: string; region: string },
  limit: number = 5
) {
  return cities
    .filter((c) => c.slug !== currentCity.slug && c.region === currentCity.region)
    .slice(0, limit);
}

// Get related roles in same industry
function getRelatedRoles(
  currentRole: { slug: string; industry: string },
  limit: number = 5
) {
  return roles
    .filter((r) => r.slug !== currentRole.slug && r.industry === currentRole.industry)
    .slice(0, limit);
}

// Generate static params for all city-role combinations
export function generateStaticParams() {
  const params: { citySlug: string; roleSlug: string }[] = [];
  cities.forEach((city) => {
    roles.forEach((role) => {
      params.push({
        citySlug: city.slug,
        roleSlug: role.slug,
      });
    });
  });
  return params;
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; roleSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, roleSlug } = await params;
  const city = getCityBySlug(citySlug);
  const role = getRoleBySlug(roleSlug);

  if (!city || !role) {
    return { title: "Page Not Found" };
  }

  const localSalary = getLocalSalary(role, city);
  const canonical = `https://indeedflex.com/career-hub/cities/${citySlug}/${roleSlug}`;
  const title = `${role.title} Jobs in ${city.city}, ${city.stateCode} | $${localSalary.min.toFixed(0)}-$${localSalary.max.toFixed(0)}/hr`;
  const description = `Find ${role.title} jobs in ${city.city}, ${city.stateCode}. Earn $${localSalary.min.toFixed(2)}-$${localSalary.max.toFixed(2)}/hr with flexible scheduling. ${role.shortDescription}. Apply today with Indeed Flex.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: [
      `${role.title} jobs ${city.city}`,
      `${role.title} ${city.stateCode}`,
      `temp ${role.title} ${city.city}`,
      `flexible ${role.title} work`,
      `${city.city} ${role.industry} jobs`,
      `part time ${role.title}`,
      `${role.title} pay ${city.city}`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityRolePage({
  params,
}: {
  params: Promise<{ citySlug: string; roleSlug: string }>;
}) {
  const { citySlug, roleSlug } = await params;
  const city = getCityBySlug(citySlug);
  const role = getRoleBySlug(roleSlug);

  if (!city || !role) {
    notFound();
  }

  const localSalary = getLocalSalary(role, city);
  const nearbyCities = getNearbyCities(city);
  const relatedRoles = getRelatedRoles(role);
  const industryInfo = industries.find((i) => i.id === role.industry);

  // Generate city+role specific FAQs
  const faqs = generateCityRoleFAQs({
    city: city.city,
    stateCode: city.stateCode,
    roleTitle: role.title,
    localSalary,
    topIndustries: city.topIndustries,
    costOfLivingIndex: city.costOfLiving.index,
    rentOneBed: city.costOfLiving.rent.oneBed,
    requirements: role.requirements,
    skills: role.skills,
    industry: role.industry,
    metroArea: city.metroArea,
  });

  // SEO data
  const pageTitle = `${role.title} Jobs in ${city.city}, ${city.stateCode} | $${localSalary.min.toFixed(0)}-$${localSalary.max.toFixed(0)}/hr`;
  const pageDescription = `Find ${role.title} jobs in ${city.city}, ${city.stateCode}. Earn $${localSalary.min.toFixed(2)}-$${localSalary.max.toFixed(2)}/hr with flexible scheduling. ${role.shortDescription}. Apply today with Indeed Flex.`;
  const canonicalUrl = `${BASE_URL}/career-hub/cities/${city.slug}/${role.slug}`;

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Career Hub", url: `${BASE_URL}/career-hub` },
    { name: "Cities", url: `${BASE_URL}/career-hub/cities` },
    { name: city.city, url: `${BASE_URL}/career-hub/cities/${city.slug}` },
    { name: role.title },
  ];

  // Calculate estimated earnings
  const weeklyEarnings = {
    partTime: Math.round(((localSalary.min + localSalary.max) / 2) * 20),
    fullTime: Math.round(((localSalary.min + localSalary.max) / 2) * 40),
  };

  return (
    <>
      {/* Schema Markup */}
      <JobPostingSchema
        title={`${role.title} - ${city.city}, ${city.stateCode}`}
        description={`${role.description} Now hiring in ${city.city}, ${city.stateCode}. Flexible scheduling available.`}
        employmentType={["TEMPORARY", "PART_TIME", "FULL_TIME"]}
        hiringOrganization={{
          name: "Indeed Flex",
          url: "https://indeedflex.com",
          logo: "https://indeedflex.com/logo.png",
        }}
        jobLocation={{
          city: city.city,
          state: city.state,
          stateCode: city.stateCode,
          country: "US",
        }}
        baseSalary={{
          currency: "USD",
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR",
        }}
        skills={role.skills}
        qualifications={role.requirements}
        responsibilities={role.responsibilities}
        industry={industryInfo?.name}
        occupationalCategory={role.title}
      />

      <OccupationSchema
        name={role.title}
        description={role.description}
        estimatedSalary={{
          currency: "USD",
          minValue: localSalary.min,
          maxValue: localSalary.max,
          unitText: "HOUR",
        }}
        occupationLocation={{
          type: "City",
          name: `${city.city}, ${city.stateCode}`,
        }}
        skills={role.skills}
        responsibilities={role.responsibilities}
        qualifications={role.requirements}
      />

      <FAQSchema questions={faqs} />

      <BreadcrumbSchema items={breadcrumbItems} />

      <LocalBusinessSchema
        name={`Indeed Flex - ${city.city}`}
        description={`Find flexible ${role.title} jobs in ${city.city}. Temporary and part-time positions available.`}
        address={{
          addressLocality: city.city,
          addressRegion: city.stateCode,
          addressCountry: "US",
        }}
        url={canonicalUrl}
        priceRange="$$"
      />

      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        breadcrumb={breadcrumbItems}
      />

      {/* Page Content */}
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Cities", href: "/career-hub/cities" },
            { label: city.city, href: `/career-hub/cities/${city.slug}` },
            { label: role.title },
          ]}
        />

        {/* Author Attribution - E-E-A-T */}
        <AuthorByline contentType="city" variant="inline" className="mt-4" />

        {/* Hero Section */}
        <section className="mt-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  {industryInfo?.name}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city.city}, {city.stateCode}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {role.title} Jobs in {city.city}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {role.shortDescription}. Find flexible {role.title.toLowerCase()}{" "}
                positions in {city.city}, {city.stateCode} with competitive pay
                and scheduling that fits your life.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">
                      ${localSalary.min.toFixed(0)}-${localSalary.max.toFixed(0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Per Hour</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">${weeklyEarnings.fullTime}</p>
                    <p className="text-sm text-muted-foreground">Weekly (40hrs)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Building2 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">{city.costOfLiving.index}</p>
                    <p className="text-sm text-muted-foreground">Cost Index</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                    <p className="text-2xl font-bold">{city.timezone}</p>
                    <p className="text-sm text-muted-foreground">Time Zone</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a
                    href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Find {role.title} Shifts
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/career-hub/tools/pay-calculator">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Earnings
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="lg:w-96">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Top Industries in {city.city}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {city.topIndustries.map((ind) => (
                        <Badge key={ind} variant="secondary">
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Cost of Living</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Index (100 = avg)</span>
                        <span className="font-medium">{city.costOfLiving.index}</span>
                      </div>
                      <Progress value={city.costOfLiving.index} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Monthly Costs</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>1-Bed Rent</span>
                        <span>${city.costOfLiving.rent.oneBed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Groceries</span>
                        <span>${city.costOfLiving.groceries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport</span>
                        <span>${city.costOfLiving.transport}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <Link
                      href={`/career-hub/cities/${city.slug}`}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      More about {city.city}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About the Role */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                About {role.title} Jobs in {city.city}
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <p className="text-muted-foreground">
                    In {city.city}, {role.title.toLowerCase()}s are in demand across
                    the {city.topIndustries.slice(0, 2).join(" and ")} sectors. The
                    city&apos;s {city.highlights[0]?.toLowerCase()} creates consistent
                    opportunities for flexible workers.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Key Responsibilities
              </h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {role.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Skills & Requirements */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Skills & Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Local Employers Section - Unique content for SEO */}
            <LocalEmployerSection
              citySlug={city.slug}
              cityName={city.city}
              roleSlug={role.slug}
              roleTitle={role.title}
            />

            {/* Neighborhood Guide - Hyperlocal content */}
            <NeighborhoodGuide
              citySlug={city.slug}
              cityName={city.city}
              roleSlug={role.slug}
              roleTitle={role.title}
            />

            {/* Embedded Pay Calculator (Client Component) */}
            <CityRolePageClient
              roleTitle={role.title}
              localSalary={localSalary}
              cityName={city.city}
              tipsRange={
                role.industry === "hospitality"
                  ? { min: 2, max: 10 }
                  : undefined
              }
              careerPath={role.careerPath}
            />

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">
                FAQs: {role.title} Jobs in {city.city}
              </h2>
              <FAQSection faqs={faqs} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Start Earning Today</h3>
                <p className="text-sm opacity-90 mb-4">
                  Join thousands of {role.title.toLowerCase()}s in {city.city}{" "}
                  earning on their own schedule
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a
                    href="https://indeedflex.onelink.me/4jvh/x7l4jms3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started Free
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Related Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Related Roles in {city.city}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {relatedRoles.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/career-hub/cities/${city.slug}/${r.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{r.title}</span>
                      <span className="text-sm text-muted-foreground">
                        ${r.avgHourlyRate.min}-${r.avgHourlyRate.max}/hr
                      </span>
                    </Link>
                  ))}
                  <Link
                    href={`/career-hub/cities/${city.slug}`}
                    className="block text-sm text-primary hover:underline mt-3"
                  >
                    View all roles in {city.city} →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Cities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {role.title} in Nearby Cities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {nearbyCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/career-hub/cities/${c.slug}/${role.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">
                        {c.city}, {c.stateCode}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    href="/career-hub/cities"
                    className="block text-sm text-primary hover:underline mt-3"
                  >
                    Browse all cities →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tools Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Helpful Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/career-hub/tools/pay-calculator"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>Pay Calculator</span>
                </Link>
                <Link
                  href="/career-hub/tools/cost-of-living"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Cost of Living Comparison</span>
                </Link>
                <Link
                  href="/career-hub/tools/shift-planner"
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Shift Planner</span>
                </Link>
                <Link
                  href={`/career-hub/roles/${role.slug}`}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{role.title} Career Guide</span>
                </Link>
              </CardContent>
            </Card>

            {/* City Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Work in {city.city}?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {city.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Internal Links Section */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Explore More Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Other Roles in City */}
            <div>
              <h3 className="font-semibold mb-3">More Jobs in {city.city}</h3>
              <ul className="space-y-2">
                {roles.slice(0, 6).map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/career-hub/cities/${city.slug}/${r.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {r.title} in {city.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Same Role in Other Cities */}
            <div>
              <h3 className="font-semibold mb-3">{role.title} in Other Cities</h3>
              <ul className="space-y-2">
                {cities
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/career-hub/cities/${c.slug}/${role.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {role.title} in {c.city}, {c.stateCode}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Related Resources */}
            <div>
              <h3 className="font-semibold mb-3">Related Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/career-hub/industries/${role.industry}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {industryInfo?.name} Industry Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/career-hub/roles/${role.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Complete {role.title} Career Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-hub/guides"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Getting Started Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career-hub/financial-tips"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Financial Tips for Flex Workers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Source Citations for E-E-A-T */}
        <DataSourceCitation pageType="city" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "city", 
            city: citySlug,
            role: roleSlug,
            industry: role.industry
          }} 
        />
      </div>

      <CTASection />
    </>
  );
}

