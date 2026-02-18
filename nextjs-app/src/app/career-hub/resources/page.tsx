import { Metadata } from "next";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { ExternalResourcesSection } from "@/components/career-hub/ExternalResourcesSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ExternalLink,
  Building2,
  FileText,
  Heart,
  Award,
  DollarSign,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resources for Flexible Workers | Indeed Flex Career Hub",
  description:
    "Curated resources for flexible workers including government programs, training, certifications, healthcare, and financial assistance.",
  keywords: [
    "gig worker resources",
    "freelance resources",
    "worker assistance",
    "training programs",
    "certification resources",
    "healthcare resources",
  ],
};

const resourceCategories = [
  {
    id: "government",
    name: "Government Resources",
    icon: Building2,
    description: "Official programs and assistance for workers",
  },
  {
    id: "certifications",
    name: "Certifications & Training",
    icon: Award,
    description: "Boost your skills and earning potential",
  },
  {
    id: "healthcare",
    name: "Healthcare Options",
    icon: Heart,
    description: "Health insurance and medical resources",
  },
  {
    id: "financial",
    name: "Financial Resources",
    icon: DollarSign,
    description: "Banking, taxes, and money management",
  },
  {
    id: "rights",
    name: "Worker Rights",
    icon: Shield,
    description: "Know your rights and protections",
  },
  {
    id: "learning",
    name: "Free Learning",
    icon: FileText,
    description: "Free courses and skill development",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Career Hub", href: "/career-hub" }, { label: "Resources" }]}
        />
      </div>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Resources for Flexible Workers
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Curated links to official resources, training programs, and
              assistance programs to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resourceCategories.map((category) => (
              <a key={category.id} href={`#${category.id}`}>
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer hover:border-primary/30">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Sections */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div id="government">
              <ExternalResourcesSection
                category="government"
                title="Government Resources"
                description="Official government programs and assistance for workers"
                showIndeedFlex={false}
                limit={8}
              />
            </div>

            <div id="certifications">
              <ExternalResourcesSection
                category="certifications"
                title="Certifications & Training"
                description="Get certified to access higher-paying positions"
                showIndeedFlex={false}
                limit={8}
              />
            </div>

            <div id="healthcare">
              <ExternalResourcesSection
                category="healthcare"
                title="Healthcare Options"
                description="Health insurance and medical resources for workers"
                showIndeedFlex={false}
                limit={8}
              />
            </div>

            <div id="financial">
              <ExternalResourcesSection
                category="financial"
                title="Financial Resources"
                description="Banking, taxes, and money management tools"
                showIndeedFlex={false}
                limit={8}
              />
            </div>

            <div id="rights">
              <ExternalResourcesSection
                category="rights"
                title="Worker Rights"
                description="Know your rights and workplace protections"
                showIndeedFlex={false}
                limit={8}
              />
            </div>

            <div id="learning">
              <ExternalResourcesSection
                category="learning"
                title="Free Learning Resources"
                description="Free courses and skill development platforms"
                showIndeedFlex={false}
                limit={8}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-muted p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                These external resources are provided for informational purposes.
                Indeed Flex does not endorse or guarantee the accuracy of
                third-party content. Always verify information directly with
                official sources before making important decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

