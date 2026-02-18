import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import MarkdownContent from "@/components/career-hub/MarkdownContent";
import TableOfContents from "@/components/career-hub/TableOfContents";
import { generateTOCFromSections } from "@/lib/utils/toc";
import { allGuideArticles, allGuideCategories } from "@/lib/data/articles/guides";
import { FAQSchema, ArticleSchema, BreadcrumbSchema } from "@/components/career-hub/seo";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

// Generate static params for all guide articles
export function generateStaticParams() {
  return Object.keys(allGuideArticles).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each guide
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = allGuideArticles[slug];

  if (!article) {
    return { title: "Guide Not Found" };
  }

  return {
    title: `${article.title} | Indeed Flex Career Hub`,
    description: article.description,
    keywords: [
      article.title.toLowerCase(),
      "indeed flex",
      "career guide",
      article.category.toLowerCase(),
      "flexible work",
      "temp jobs",
    ],
    alternates: {
      canonical: `https://indeedflex.com/career-hub/guides/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: "2024-01-15",
      modifiedTime: new Date().toISOString(),
      section: article.category,
    },
  };
}

export default async function GuidesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = allGuideArticles[slug];

  if (!article) {
    notFound();
  }

  // Find related articles
  const relatedArticleData = article.relatedArticles
    .map((relSlug) => allGuideArticles[relSlug])
    .filter(Boolean)
    .slice(0, 3);

  // Find category icon
  const category = allGuideCategories.find((c) => c.slug === article.categorySlug);
  const CategoryIcon = category?.icon;

  // Generate TOC items
  const tocItems = generateTOCFromSections(article.sections);

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
        mainEntityOfPage={`https://indeedflex.com/career-hub/guides/${article.slug}`}
        articleSection={article.category}
      />
      {article.faqs.length > 0 && <FAQSchema questions={article.faqs} />}
      <BreadcrumbSchema
        items={[
          { name: "Career Hub", url: "https://indeedflex.com/career-hub" },
          { name: "Career Guides", url: "https://indeedflex.com/career-hub/guides" },
          { name: article.title },
        ]}
      />

      <article>
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Career Guides", href: "/career-hub/guides" },
              {
                label: article.category,
                href: `/career-hub/guides#${article.categorySlug}`,
              },
              { label: article.title },
            ]}
          />
        </div>

        {/* Hero */}
        <header className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/career-hub/guides"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Guides
              </Link>

              <div className="flex items-center gap-3 mb-4">
                {CategoryIcon && (
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <CategoryIcon className="h-5 w-5 text-accent" />
                  </div>
                )}
                <span className="text-primary-foreground/80">
                  {article.category}
                </span>
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
              <h2 className="font-semibold text-foreground mb-4">
                Key Takeaways
              </h2>
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

        {/* Article Content with Sticky TOC */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sticky Table of Contents - Desktop */}
                {tocItems.length >= 3 && (
                  <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                    <TableOfContents items={tocItems} sticky />
                  </aside>
                )}

                {/* Mobile TOC */}
                {tocItems.length >= 3 && (
                  <div className="lg:hidden mb-6">
                    <TableOfContents items={tocItems} />
                  </div>
                )}

                {/* Main Content */}
                <div className="flex-1 max-w-3xl">
                  {article.sections.map((section, index) => (
                    <div
                      key={index}
                      id={`section-${index}`}
                      className="mb-10 scroll-mt-24"
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        {section.heading}
                      </h2>
                      <MarkdownContent content={section.content} />
                    </div>
                  ))}
                </div>
              </div>
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

        {/* Related Articles */}
        {relatedArticleData.length > 0 && (
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Related Guides
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticleData.map((related) => (
                    <Card
                      key={related.slug}
                      className="group hover:border-primary/30 transition-colors"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          <Link href={`/career-hub/guides/${related.slug}`}>
                            {related.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {related.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {related.readTime} read
                          </span>
                          <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection
        title="Put Your Knowledge Into Action"
        subtitle="Download Indeed Flex and start applying what you've learned."
      />
    </>
  );
}

