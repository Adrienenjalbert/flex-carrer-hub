import { Metadata } from "next";
import Link from "next/link";
import {
  UtensilsCrossed,
  Warehouse,
  ShoppingBag,
  Building2,
  ArrowRight,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { roles } from "@/lib/data/roles";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Jobs by Industry | Indeed Flex Career Hub",
  description:
    "Explore flexible work opportunities by industry. Find jobs in hospitality, warehouse, retail, and facilities management with Indeed Flex.",
  keywords: [
    "jobs by industry",
    "hospitality jobs",
    "warehouse jobs",
    "retail jobs",
    "facilities management jobs",
    "flexible work industries",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/industries",
  },
  openGraph: {
    title: "Jobs by Industry | Indeed Flex Career Hub",
    description: "Explore flexible work opportunities by industry. Find jobs in hospitality, warehouse, retail, and facilities management.",
    url: "https://indeedflex.com/career-hub/industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs by Industry",
    description: "Explore flexible work opportunities by industry.",
  },
};

const industries = [
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Restaurants, bars, hotels, and event venues offering flexible shifts in serving, bartending, kitchen work, and more.",
    icon: UtensilsCrossed,
    color: "bg-orange-50 text-orange-600",
    highlights: [
      "Tips can significantly increase earnings",
      "Flexible shift options available",
      "Strong career advancement paths",
    ],
  },
  {
    id: "industrial",
    name: "Industrial & Warehouse",
    description:
      "Distribution centers, fulfillment facilities, and manufacturing with roles in picking, packing, forklift operation, and more.",
    icon: Warehouse,
    color: "bg-blue-50 text-blue-600",
    highlights: [
      "Consistent hourly pay without tip variance",
      "Overtime opportunities during peak seasons",
      "Clear advancement to supervisory roles",
    ],
  },
  {
    id: "retail",
    name: "Retail",
    description:
      "Stores, shopping centers, and merchandise operations with roles in sales, stocking, customer service, and visual merchandising.",
    icon: ShoppingBag,
    color: "bg-purple-50 text-purple-600",
    highlights: [
      "Employee discounts at many retailers",
      "Holiday seasons offer extra hours",
      "Customer service skills transfer widely",
    ],
  },
  {
    id: "facilities",
    name: "Facilities Management",
    description:
      "Office buildings, campuses, and commercial properties with roles in cleaning, maintenance, security, and groundskeeping.",
    icon: Building2,
    color: "bg-green-50 text-green-600",
    highlights: [
      "Consistent, predictable schedules",
      "Often include benefits packages",
      "Growing demand in commercial real estate",
    ],
  },
];

export default function IndustriesPage() {
  const totalRoles = roles.length;
  const industriesWithCounts = industries.map(industry => {
    const industryRoles = roles.filter(
      (r) => r.industry.toLowerCase() === industry.id.toLowerCase() ||
             r.industry.toLowerCase().includes(industry.id.toLowerCase())
    );
    return { ...industry, roleCount: industryRoles.length };
  });

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Industries" },
          ]}
        />
      </div>
      <PageHero
        title="Explore Jobs by Industry"
        description="Discover flexible work opportunities across the top industries. Find the sector that matches your skills and interests."
        stats={[
          { value: industries.length.toString(), label: "Industries" },
          { value: totalRoles.toString(), label: "Total Roles" },
          { value: "4", label: "Major Sectors" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">

        {/* Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const industryRoles = roles.filter(
              (r) => r.industry.toLowerCase() === industry.id.toLowerCase() ||
                     r.industry.toLowerCase().includes(industry.id.toLowerCase())
            );

            return (
              <Link
                key={industry.id}
                href={`/career-hub/industries/${industry.id}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 group-hover:border-accent/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${industry.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl mt-3">
                      {industry.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {industry.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{industryRoles.length} roles available</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industry.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "industry" }} />
      </div>
      <CTASection />
    </>
  );
}

