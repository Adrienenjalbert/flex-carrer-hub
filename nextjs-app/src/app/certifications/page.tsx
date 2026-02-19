import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Award, Clock, DollarSign, BookOpen, ArrowRight, BadgeCheck, Utensils, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { certifications, getHospitalityCertifications, getWarehouseCertifications, getUniversalCertifications } from "@/lib/data/certifications";
import { WebPageSchema, FAQSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Career Certifications for Flex Workers 2026 | Boost Your Hourly Rate",
  description:
    "Get certified and earn more. Compare food handler, forklift, OSHA, and alcohol service certifications. Find the best ROI certifications for hospitality and warehouse workers.",
  keywords: [
    "food handler certification",
    "forklift certification",
    "TIPS certification",
    "OSHA 10",
    "gig worker certifications",
    "hourly worker certifications",
  ],
  alternates: {
    canonical: "https://indeedflex.com/certifications",
  },
  openGraph: {
    title: "Career Certifications for Flex Workers 2026 | Boost Your Hourly Rate",
    description: "Get certified and earn more. Compare food handler, forklift, OSHA, and alcohol service certifications.",
    url: "https://indeedflex.com/certifications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Certifications for Flex Workers 2026",
    description: "Get certified and earn more. Compare certifications that boost your hourly rate.",
  },
};

export default function CertificationsPage() {
  const hospitalityCerts = getHospitalityCertifications();
  const warehouseCerts = getWarehouseCertifications();
  const universalCerts = getUniversalCertifications();

  const faqs = [
    {
      question: "What certifications can increase my hourly pay?",
      answer: "The best ROI certifications include Forklift Operator ($3-5/hr increase), TIPS Alcohol ($5-10/hr by unlocking bartending), and Food Manager (opens $45K+ supervisor roles). OSHA 10 also provides $1-2/hr more with significantly better job access.",
    },
    {
      question: "How long does it take to get certified?",
      answer: "Most certifications can be completed in 2-10 hours. Food Handler takes 2-4 hours, TIPS Alcohol 3-4 hours, and OSHA 10 takes 10 hours spread over multiple sessions. Forklift certification requires 4-8 hours including hands-on training.",
    },
    {
      question: "Are online certifications valid?",
      answer: "Yes, most online certifications from accredited providers like ServSafe, TIPS, and OSHA Education Center are fully valid and employer-accepted. Some certifications like Forklift require hands-on evaluation in addition to online training.",
    },
    {
      question: "Do Indeed Flex employers require certifications?",
      answer: "Many shifts on Indeed Flex require specific certifications. Having certifications unlocks more shift opportunities and typically higher-paying positions. Food Handler is required for most food service roles, while Forklift is required for many warehouse positions.",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hospitality":
        return <Utensils className="h-5 w-5" />;
      case "warehouse":
        return <Package className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <>
      <WebPageSchema
        name="Career Certifications for Flex Workers"
        description="Compare certifications that boost your hourly rate in hospitality and warehouse roles."
        url="https://indeedflex.com/certifications"
        breadcrumb={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Certifications" },
        ]}
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Certifications" },
        ]}
      />

      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Certifications" },
          ]}
        />
      </div>
      <PageHero
        title="Career Certifications for Flex Workers"
        description="Boost your hourly rate and unlock more shift opportunities with industry-recognized certifications. Most can be completed in a single day."
        badge={`Updated ${new Date().getFullYear()}`}
        stats={[
          { value: certifications.length.toString(), label: "Certifications" },
          { value: "+$5-10/hr", label: "Best ROI" },
          { value: "2 hours", label: "Fastest" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{certifications.length}</p>
                <p className="text-sm text-muted-foreground">Available guides</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Best ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-500">+$5-10/hr</p>
                <p className="text-sm text-muted-foreground">TIPS Alcohol</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Fastest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2 hours</p>
                <p className="text-sm text-muted-foreground">Food Handler</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <BadgeCheck className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-lg">Most Versatile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">OSHA 10</p>
                <p className="text-sm text-muted-foreground">Never expires</p>
              </CardContent>
            </Card>
          </div>

          {/* Hospitality Certifications */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Hospitality Certifications</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Essential certifications for food service, bartending, and restaurant roles.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {hospitalityCerts.map((cert) => (
                <Link key={cert.slug} href={`/certifications/${cert.slug}`}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {getCategoryIcon(cert.category)}
                        {cert.stateSpecific && (
                          <Badge variant="outline" className="text-xs">State-specific</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">{cert.payIncrease.split(',')[0]}</span>
                        <span className="text-muted-foreground">{cert.validityPeriod.split(' ')[0]} validity</span>
                      </div>
                      <div className="flex items-center justify-end mt-2 text-primary">
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Warehouse Certifications */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Warehouse Certifications</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              OSHA-required and recommended certifications for warehouse and logistics roles.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {warehouseCerts.map((cert) => (
                <Link key={cert.slug} href={`/certifications/${cert.slug}`}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {getCategoryIcon(cert.category)}
                        {cert.stateSpecific && (
                          <Badge variant="outline" className="text-xs">State-specific</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">{cert.payIncrease.split(',')[0]}</span>
                        <span className="text-muted-foreground">{cert.validityPeriod.split(' ')[0]} validity</span>
                      </div>
                      <div className="flex items-center justify-end mt-2 text-primary">
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Universal Certifications */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Universal Certifications</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Certifications valuable across all industries and roles.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {universalCerts.map((cert) => (
                <Link key={cert.slug} href={`/certifications/${cert.slug}`}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {getCategoryIcon(cert.category)}
                        {cert.stateSpecific && (
                          <Badge variant="outline" className="text-xs">State-specific</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 font-medium">{cert.payIncrease.split(',')[0]}</span>
                        <span className="text-muted-foreground">{cert.validityPeriod.split(' ')[0]} validity</span>
                      </div>
                      <div className="flex items-center justify-end mt-2 text-primary">
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
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

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Start Earning More?</h3>
                <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                  Get certified and unlock higher-paying shifts on Indeed Flex. Many certifications can be completed today and used on your next shift.
                </p>
                <Link 
                  href="https://www.indeedflex.com" 
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90"
                >
                  Find Shifts on Indeed Flex
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "certification" }} />
      </div>
      <CTASection />
    </>
  );
}

