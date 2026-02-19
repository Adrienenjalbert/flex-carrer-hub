import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import MarkdownContent from "@/components/career-hub/MarkdownContent";
import FAQSection from "@/components/career-hub/FAQSection";
import { financialArticles } from "@/lib/data/articles/financial-tips";
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getArticleDates, getLastUpdated } from "@/lib/utils/date-variation";
import { Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Generate static params for all financial articles
export function generateStaticParams() {
  return Object.keys(financialArticles).map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = financialArticles[slug];

  if (!article) {
    return { title: "Article Not Found" };
  }

  const canonical = `https://indeedflex.com/career-hub/financial-tips/${slug}`;
  const { publishedTime, modifiedTime } = getArticleDates(slug, 'guide');

  return {
    title: `${article.title} | Indeed Flex Career Hub`,
    description: article.description,
    keywords: [
      article.title.toLowerCase(),
      "financial tips",
      "gig workers",
      "money management",
      "flexible work",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: "article",
      publishedTime,
      modifiedTime,
      section: "Financial Tips",
      siteName: "Indeed Flex Career Hub",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function FinancialTipsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = financialArticles[slug];

  if (!article) {
    notFound();
  }

  const Icon = article.icon;

  return (
    <>
      {/* Schema Markup */}
      <ArticleSchema
        headline={article.title}
        description={article.description}
        author={{ name: "Indeed Flex Career Hub", url: "https://indeedflex.com" }}
        publisher={{
          name: "Indeed Flex",
          logo: "https://indeedflex.com/logo.png",
          url: "https://indeedflex.com",
        }}
        datePublished="2024-01-15T00:00:00Z"
        dateModified={new Date().toISOString()}
        mainEntityOfPage={`https://indeedflex.com/career-hub/financial-tips/${article.slug}`}
        articleSection="Financial Tips"
      />
      {article.faqs.length > 0 && <FAQSchema questions={article.faqs} />}
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Financial Tips", url: "https://indeedflex.com/career-hub/financial-tips" },
          { name: article.title },
        ]}
      />

      <article>
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Career Hub", href: "/career-hub" },
              { label: "Financial Tips", href: "/career-hub/financial-tips" },
              { label: article.title },
            ]}
          />
        </div>

        {/* Hero */}
        <header className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/career-hub/financial-tips"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Financial Tips
              </Link>

              <div className="flex items-center gap-3 mb-4">
                {Icon && (
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                )}
                <span className="text-primary-foreground/80">Financial Tips</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {article.title}
              </h1>

              <p className="text-xl text-primary-foreground/90 mb-6">
                {article.description}
              </p>

              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Key Takeaways */}
        <section className="py-8 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-semibold text-foreground mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {article.sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {section.heading}
                  </h2>
                  <MarkdownContent content={section.content} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        {article.faqs.length > 0 && (
          <section className="py-12 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {article.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-card border border-border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <MarkdownContent content={faq.answer} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}
      </article>

      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="guide"
          lastUpdated={getLastUpdated(slug, 'guide')}
          variant="block"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "financial",
            slug,
            relatedArticles: article.relatedArticles
          }} 
        />
      </div>

      <CTASection
        title="Take Control of Your Finances"
        subtitle="Find flexible work that fits your life and financial goals."
      />
    </>
  );
}

