import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Shield,
  Award,
  CheckCircle,
  BookOpen,
  Database,
  RefreshCw,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { WebPageSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { getAllDataSources, dataUpdateSchedule } from "@/lib/data/data-sources";

const canonical = "https://indeedflex.com/career-hub/about";
const title = "About Our Career Hub | Indeed Flex";
const description = "Learn about the Indeed Flex Career Hub editorial team, our data sources, methodology, and commitment to providing accurate, helpful career information.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Indeed Flex", "career hub", "about us", "editorial team", "data sources"],
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

export default function AboutPage() {
  const dataSources = getAllDataSources();

  // Editorial team members (organizational representation for E-E-A-T)
  const editorialPrinciples = [
    {
      title: "Accuracy",
      description: "All wage and job market data is sourced from official government statistics and verified industry reports.",
      icon: CheckCircle,
    },
    {
      title: "Transparency",
      description: "We cite our sources and display when data was last updated so you can verify our information.",
      icon: Shield,
    },
    {
      title: "Relevance",
      description: "Content is written for real flexible workers based on actual experiences and industry knowledge.",
      icon: Users,
    },
    {
      title: "Freshness",
      description: "We review and update content quarterly to ensure accuracy as wages and markets change.",
      icon: RefreshCw,
    },
  ];

  return (
    <>
      <WebPageSchema
        name="About Our Career Hub"
        description="Learn about the Indeed Flex Career Hub editorial team and our commitment to accuracy."
        url="https://indeedflex.com/career-hub/about"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "About" },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "About" },
        ]}
      />

      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "About" },
          ]}
        />

        {/* Hero Section */}
        <section className="mt-8 mb-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About the Indeed Flex Career Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Our mission is to provide accurate, helpful career information to flexible
            workers across the United States. Every piece of content is researched,
            verified, and regularly updated.
          </p>
        </section>

        {/* Editorial Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Our Editorial Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {editorialPrinciples.map((principle, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{principle.title}</h3>
                      <p className="text-muted-foreground">{principle.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Editorial Team */}
        <section className="mb-12 bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Our Editorial Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div
              itemScope
              itemType="https://schema.org/Organization"
              className="text-center p-4 bg-background rounded-lg"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold" itemProp="name">
                Career Content Team
              </h3>
              <p className="text-sm text-muted-foreground mt-2" itemProp="description">
                Writers with backgrounds in HR, recruiting, and the staffing industry
                who understand the flexible work landscape.
              </p>
            </div>
            <div
              itemScope
              itemType="https://schema.org/Organization"
              className="text-center p-4 bg-background rounded-lg"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold" itemProp="name">
                Data Research Team
              </h3>
              <p className="text-sm text-muted-foreground mt-2" itemProp="description">
                Analysts who compile and verify wage data from government sources,
                industry reports, and Indeed Flex hiring trends.
              </p>
            </div>
            <div
              itemScope
              itemType="https://schema.org/Organization"
              className="text-center p-4 bg-background rounded-lg"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold" itemProp="name">
                Compliance Review
              </h3>
              <p className="text-sm text-muted-foreground mt-2" itemProp="description">
                Legal and compliance specialists ensure all information meets
                employment law standards and regulatory requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-6 h-6" />
            Our Data Sources
          </h2>
          <p className="text-muted-foreground mb-6">
            We believe in transparency. Here are the primary sources we use to compile
            wage, employment, and cost-of-living data:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {dataSources.slice(0, 8).map((source) => (
              <Card key={source.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{source.shortName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {source.description}
                      </p>
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex-shrink-0"
                      >
                        Visit →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Updates: {source.updateFrequency}</span>
                    <span>Reliability: {source.reliability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Update Schedule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <RefreshCw className="w-6 h-6" />
            Data Update Schedule
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-semibold">Data Category</th>
                      <th className="text-left py-2 font-semibold">Last Updated</th>
                      <th className="text-left py-2 font-semibold">Next Update</th>
                      <th className="text-left py-2 font-semibold">Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUpdateSchedule.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-3 font-medium">{item.category}</td>
                        <td className="py-3">{item.lastUpdated}</td>
                        <td className="py-3">{item.nextUpdate}</td>
                        <td className="py-3 text-muted-foreground">
                          {item.sources.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="mb-12 bg-primary/5 rounded-lg p-8 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Questions or Feedback?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you find inaccurate information or have suggestions for improving
            our Career Hub, we&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="mailto:careerhub@indeedflex.com">
                Contact the Editorial Team
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/career-hub">
                Explore Career Hub
              </Link>
            </Button>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="text-sm text-muted-foreground border-t pt-8">
          <h3 className="font-semibold text-foreground mb-2">Disclaimer</h3>
          <p className="mb-4">
            The information provided on the Indeed Flex Career Hub is for general
            informational purposes only. While we strive to keep information accurate
            and up-to-date, we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability, or
            availability of the information.
          </p>
          <p>
            Actual wages, job requirements, and employment conditions may vary based on
            location, employer, experience level, and other factors. For the most current
            pay rates and job availability in your area, please check the Indeed Flex app.
          </p>
        </section>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub currentPage={{ type: "about" }} />
      </div>
      <CTASection />
    </>
  );
}

