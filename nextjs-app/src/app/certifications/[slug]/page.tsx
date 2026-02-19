import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Award, Clock, DollarSign, ExternalLink, BookOpen, CheckCircle, AlertCircle, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { certifications, getCertificationBySlug, Certification } from "@/lib/data/certifications";
import { FAQSchema, WebPageSchema, BreadcrumbSchema, ArticleSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

// Generate static params for all certifications
export function generateStaticParams() {
  return certifications.map((cert) => ({
    slug: cert.slug,
  }));
}

// Generate metadata for each certification
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);

  if (!cert) {
    return { title: "Certification Not Found" };
  }

  const canonical = `https://indeedflex.com/certifications/${slug}`;
  const title = `${cert.name} Guide ${new Date().getFullYear()} | Cost, Duration & Providers`;
  const description = `Get your ${cert.name} certification. ${cert.description} Compare ${cert.providers.length} providers, costs from ${cert.providers[0]?.cost || "varies"}, and complete in ${cert.providers[0]?.duration || "1 day"}.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: [
      cert.name.toLowerCase(),
      `${cert.name.toLowerCase()} cost`,
      `${cert.name.toLowerCase()} online`,
      `how to get ${cert.name.toLowerCase()}`,
      `${cert.category} certification`,
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CertificationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertificationBySlug(slug);

  if (!cert) {
    notFound();
  }

  // Generate FAQs specific to this certification
  const faqs = [
    {
      question: `How much does ${cert.name} cost?`,
      answer: `${cert.name} costs range from ${cert.providers.map(p => p.cost).join(" to ")} depending on the provider. ${cert.providers[0]?.name} charges ${cert.providers[0]?.cost}.`,
    },
    {
      question: `How long does it take to get ${cert.name}?`,
      answer: `${cert.name} training typically takes ${cert.providers[0]?.duration}. Most providers offer online self-paced options you can complete in one sitting.`,
    },
    {
      question: `Is ${cert.name} worth it?`,
      answer: `Yes! ${cert.name} provides: ${cert.payIncrease}. The certification pays for itself quickly and opens doors to more opportunities.`,
    },
    {
      question: `How long is ${cert.name} valid?`,
      answer: `${cert.name} is valid for ${cert.validityPeriod}. ${cert.validityPeriod.includes("No expiration") ? "However, refresher training is recommended to stay current." : "You'll need to recertify before expiration to maintain your credential."}`,
    },
    {
      question: `Can I get ${cert.name} online?`,
      answer: cert.providers.some(p => p.url.includes("online") || p.description?.toLowerCase().includes("online"))
        ? `Yes, most ${cert.name} providers offer online training options. ${cert.providers.find(p => p.description?.toLowerCase().includes("online"))?.name || cert.providers[0]?.name} offers convenient online courses.`
        : `Some providers offer online components, but ${cert.name} may require hands-on evaluation. Check with your preferred provider for their specific format.`,
    },
  ];

  const getCategoryLabel = (category: Certification["category"]) => {
    switch (category) {
      case "hospitality":
        return "Hospitality";
      case "warehouse":
        return "Warehouse & Logistics";
      case "universal":
        return "Universal";
    }
  };

  // Find cheapest and fastest provider
  const sortedByCost = [...cert.providers].sort((a, b) => {
    const aCost = parseInt(a.cost.replace(/[^0-9]/g, "")) || 0;
    const bCost = parseInt(b.cost.replace(/[^0-9]/g, "")) || 0;
    return aCost - bCost;
  });

  return (
    <>
      {/* Schema Markup */}
      <WebPageSchema
        name={`${cert.name} Certification Guide`}
        description={cert.description}
        url={`https://indeedflex.com/certifications/${slug}`}
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Certifications", url: "https://indeedflex.com/certifications" },
          { name: cert.name },
        ]}
      />
      <ArticleSchema
        headline={`${cert.name} Guide ${new Date().getFullYear()}`}
        description={cert.description}
        author={{ name: "Indeed Flex Career Hub", url: "https://indeedflex.com" }}
        publisher={{ name: "Indeed Flex", logo: "https://indeedflex.com/logo.png", url: "https://indeedflex.com" }}
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
        mainEntityOfPage={`https://indeedflex.com/certifications/${slug}`}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Certifications", url: "https://indeedflex.com/certifications" },
          { name: cert.name },
        ]}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Certifications", href: "/certifications" },
            { label: cert.name },
          ]}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <Badge variant="secondary">{getCategoryLabel(cert.category)}</Badge>
              {cert.stateSpecific && (
                <Badge variant="outline">State-Specific</Badge>
              )}
              <Badge variant="default">Updated {new Date().getFullYear()}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{cert.name}</h1>
            <p className="text-xl text-muted-foreground">{cert.description}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Pay Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold text-green-600">{cert.payIncrease.split(",")[0]}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{cert.providers[0]?.duration}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Cost Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">
                  {sortedByCost[0]?.cost} - {sortedByCost[sortedByCost.length - 1]?.cost}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <BadgeCheck className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-lg">Validity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{cert.validityPeriod.split(" ")[0]}</p>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Requirements
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {cert.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Providers Comparison */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Training Providers
            </h2>
            <p className="text-muted-foreground mb-4">
              Compare {cert.providers.length} accredited providers for {cert.name}. All providers listed are recognized by employers.
            </p>
            <div className="space-y-4">
              {cert.providers.map((provider, i) => (
                <Card key={i} className={`${provider.accredited ? "border-green-500/30" : ""} hover:border-primary transition-colors`}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{provider.name}</h3>
                          {provider.accredited && (
                            <Badge variant="default" className="bg-green-500">Accredited</Badge>
                          )}
                          {i === 0 && (
                            <Badge variant="secondary">Recommended</Badge>
                          )}
                        </div>
                        {provider.description && (
                          <p className="text-muted-foreground mb-2">{provider.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            {provider.cost}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-blue-500" />
                            {provider.duration}
                          </span>
                        </div>
                      </div>
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90"
                      >
                        Get Started
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ROI Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Return on Investment
            </h2>
            <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Pay Increase</h3>
                    <p className="text-lg text-green-600 font-bold">{cert.payIncrease}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payback Period</h3>
                    <p className="text-muted-foreground">
                      {(() => {
                        const lowestCost = parseInt(sortedByCost[0]?.cost.replace(/[^0-9]/g, "") || "50");
                        const hourlyIncrease = cert.payIncrease.includes("$3") ? 3 : cert.payIncrease.includes("$5") ? 5 : cert.payIncrease.includes("$2") ? 2 : 1;
                        const hoursToPayback = Math.ceil(lowestCost / hourlyIncrease);
                        return `Approximately ${hoursToPayback} hours of work at the increased rate`;
                      })()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* State-Specific Note */}
          {cert.stateSpecific && (
            <section className="mb-8">
              <Card className="border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">State-Specific Requirements</h3>
                      <p className="text-muted-foreground">
                        {cert.name} requirements vary by state. Check your state&apos;s specific requirements before enrolling. Some states have additional regulations or approved provider lists.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Other Certifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Other Certifications</h2>
            <div className="flex flex-wrap gap-2">
              {certifications
                .filter((c) => c.slug !== cert.slug)
                .map((c) => (
                  <Link key={c.slug} href={`/certifications/${c.slug}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground py-2 px-3"
                    >
                      {c.name}
                    </Badge>
                  </Link>
                ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Ready to Get Your {cert.name}?
                </h3>
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                  Once certified, start picking up shifts that require {cert.name} on Indeed Flex and earn more per hour.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={cert.providers[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
                  >
                    Get Certified Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    href="https://www.indeedflex.com"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-secondary/90"
                  >
                    Find Shifts on Indeed Flex
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "certification", 
            slug
          }} 
        />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="guide"
          lastUpdated={getLastUpdated(slug, 'guide')}
          variant="block"
        />
      </div>
      
      <CTASection />
    </>
  );
}

