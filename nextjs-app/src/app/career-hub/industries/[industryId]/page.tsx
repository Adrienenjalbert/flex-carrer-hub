import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import RoleCard from "@/components/career-hub/RoleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roles } from "@/lib/data/roles";
import {
  UtensilsCrossed,
  Warehouse,
  ShoppingBag,
  Building2,
  DollarSign,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

const industries = {
  hospitality: {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Restaurants, bars, hotels, and event venues offering flexible shifts in serving, bartending, kitchen work, and more.",
    icon: UtensilsCrossed,
    highlights: [
      "Tips can significantly increase earnings",
      "Flexible shift options available",
      "Rapid skill development opportunities",
      "Strong career advancement paths",
    ],
    certifications: [
      "Food Handler's Card",
      "TABC/Alcohol Server Certificate",
      "ServSafe Food Protection Manager",
    ],
  },
  industrial: {
    id: "industrial",
    name: "Industrial & Warehouse",
    description:
      "Distribution centers, fulfillment facilities, and manufacturing with roles in picking, packing, forklift operation, and more.",
    icon: Warehouse,
    highlights: [
      "Consistent hourly pay without tip variance",
      "Overtime opportunities during peak seasons",
      "Physical activity keeps you moving",
      "Clear advancement to supervisory roles",
    ],
    certifications: [
      "Forklift Certification (OSHA)",
      "OSHA 10/30 Hour Safety",
      "Hazmat Handling",
    ],
  },
  retail: {
    id: "retail",
    name: "Retail",
    description:
      "Stores, shopping centers, and merchandise operations with roles in sales, stocking, customer service, and visual merchandising.",
    icon: ShoppingBag,
    highlights: [
      "Employee discounts at many retailers",
      "Holiday seasons offer extra hours",
      "Customer service skills transfer widely",
      "Advancement to management possible",
    ],
    certifications: [
      "Customer Service Excellence",
      "Loss Prevention Training",
      "Visual Merchandising",
    ],
  },
  facilities: {
    id: "facilities",
    name: "Facilities Management",
    description:
      "Commercial and hospitality cleaning, housekeeping, and maintenance with flexible scheduling options.",
    icon: Building2,
    highlights: [
      "Independent work environment",
      "Consistent demand for services",
      "Early morning or night shift options",
      "Skill-based pay increases",
    ],
    certifications: [
      "ISSA Cleaning Management",
      "Green Cleaning Certification",
      "Building Maintenance Basics",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(industries).map((industryId) => ({ industryId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industryId: string }>;
}): Promise<Metadata> {
  const { industryId } = await params;
  const industry = industries[industryId as keyof typeof industries];

  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${industry.name} Jobs | Indeed Flex Career Hub`,
    description: industry.description,
    keywords: [
      `${industry.name.toLowerCase()} jobs`,
      "flexible work",
      "hourly jobs",
      "indeed flex",
      "temp work",
    ],
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const industry = industries[industryId as keyof typeof industries];

  if (!industry) {
    notFound();
  }

  const industryRoles = roles.filter((r) => r.industry === industryId);
  const Icon = industry.icon;

  // Calculate industry stats
  const avgMinRate = Math.round(
    industryRoles.reduce((sum, r) => sum + r.avgHourlyRate.min, 0) / industryRoles.length
  );
  const avgMaxRate = Math.round(
    industryRoles.reduce((sum, r) => sum + r.avgHourlyRate.max, 0) / industryRoles.length
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: industry.name },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Icon className="h-8 w-8 text-accent" />
              </div>
              <Badge variant="secondary">{industryRoles.length} Roles</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {industry.name} Jobs
            </h1>
            <p className="text-xl text-primary-foreground/90">
              {industry.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">
                  ${avgMinRate}-${avgMaxRate}
                </p>
                <p className="text-sm text-muted-foreground">Avg Hourly Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{industryRoles.length}</p>
                <p className="text-sm text-muted-foreground">Available Roles</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">Flexible</p>
                <p className="text-sm text-muted-foreground">Scheduling</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">
                  {industry.certifications.length}
                </p>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Work in {industry.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.highlights.map((highlight, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p>{highlight}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Available Roles in {industry.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industryRoles.map((role) => (
              <RoleCard key={role.slug} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Recommended Certifications
            </h2>
            <div className="space-y-4">
              {industry.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-medium">{cert}</span>
                      </div>
                      <Link
                        href="/career-hub/tools/certification-roi"
                        className="text-primary text-sm hover:underline"
                      >
                        Calculate ROI →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

