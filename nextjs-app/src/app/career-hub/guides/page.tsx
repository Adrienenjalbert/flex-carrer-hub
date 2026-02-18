import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, GraduationCap, Briefcase, Shield, Heart, FileText, Lightbulb, Calculator, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allGuideCategories, guideArticles } from "@/lib/data/articles/guides";
import PageHero from "@/components/career-hub/PageHero";
import SectionHeader from "@/components/career-hub/SectionHeader";
import ContentGrid from "@/components/career-hub/ContentGrid";

export const metadata: Metadata = {
  title: "Career Guides",
  description: "Expert career guides for hourly workers. Learn how to advance your career, prepare for interviews, and maximize your earning potential.",
  keywords: [
    "career guides",
    "job advice",
    "interview tips",
    "career advancement",
    "work skills",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/guides",
  },
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "getting-started": GraduationCap,
  "career-growth": Briefcase,
  "workplace": Shield,
  "wellbeing": Heart,
};

// Popular/Featured guides
const featuredGuides = [
  { slug: "first-flex-job", title: "How to Get Your First Flexible Job", readTime: "5 min" },
  { slug: "i9-complete-guide", title: "Form I-9 Explained: Complete Guide", readTime: "12 min" },
  { slug: "career-paths", title: "From Entry-Level to Management", readTime: "12 min" },
].map(g => ({
  ...g,
  ...guideArticles[g.slug],
  description: guideArticles[g.slug]?.description || "Read this guide to learn more",
}));

export default function GuidesPage() {
  const totalGuides = allGuideCategories.reduce((sum, cat) => sum + cat.articles.length, 0);

  return (
    <>
      <PageHero
        title="Career Guides"
        description={`Expert advice to help you succeed in your flexible work career. ${totalGuides}+ comprehensive guides available.`}
        searchPlaceholder="Search guides by topic or keyword..."
        stats={[
          { value: totalGuides.toString(), label: "Total Guides" },
          { value: allGuideCategories.length.toString(), label: "Categories" },
          { value: featuredGuides.length.toString(), label: "Featured Guides" },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Featured Guides Section */}
          <section className="mb-12">
            <SectionHeader
              title="Start Here"
              description="Most popular guides to get you started"
              icon={<Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />}
            />
            <ContentGrid columns={3} gap="md">
              {featuredGuides.map((guide) => (
                <Link key={guide.slug} href={`/career-hub/guides/${guide.slug}`}>
                  <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3">
                        {guide.description}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.readTime} read</span>
                        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {guide.keyTakeaways.length} key points
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </ContentGrid>
          </section>

          {/* Category Navigation - Sticky */}
          <div className="sticky top-[57px] z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 py-4 mb-8 -mx-4 px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {allGuideCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="scroll-smooth"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category.category}
                  </Badge>
                </a>
              ))}
            </div>
          </div>

          {/* Guides by Category */}
          <div className="grid gap-12">
            {allGuideCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.slug] || BookOpen;
              const categoryGuides = category.articles.map(art => ({
                ...art,
                ...guideArticles[art.slug],
                description: guideArticles[art.slug]?.description || "Read this guide to learn more",
              }));
              
              return (
                <section key={category.slug} id={category.slug} className="scroll-mt-24">
                  <SectionHeader
                    title={category.category}
                    description={`${category.articles.length} guides to help you ${category.slug === "getting-started" ? "get started" : category.slug === "career-growth" ? "grow your career" : category.slug === "workplace" ? "navigate the workplace" : "maintain wellbeing"}`}
                    badge={category.articles.length}
                    icon={<CategoryIcon className="h-6 w-6" />}
                  />
                  <ContentGrid columns={2} gap="md">
                    {categoryGuides.map((guide) => (
                      <Link key={guide.slug} href={`/career-hub/guides/${guide.slug}`}>
                        <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group hover:border-primary/30">
                          <CardHeader className="pb-2">
                            <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {guide.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-3">
                              {guide.description}
                            </CardDescription>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{guide.readTime} read</span>
                              {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {guide.keyTakeaways.length} takeaways
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </ContentGrid>
                </section>
              );
            })}
          </div>

        {/* Cross-Pillar Links */}
        <section className="mt-16 py-12 bg-secondary rounded-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Explore More Resources</h2>
            <p className="text-muted-foreground text-center mb-8">
              Continue your career journey with these related resources
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/career-hub/job-application-toolkit"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      Application Toolkit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Resume templates, cover letters, and job application guides
                    </CardDescription>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      Explore Toolkit <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/financial-tips"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      Financial Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Budgeting, saving, and money management for flexible workers
                    </CardDescription>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      Read Tips <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link
                href="/career-hub/tools"
                className="group"
              >
                <Card className="h-full hover:shadow-soft transition-shadow cursor-pointer group-hover:border-primary/30">
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      Career Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      19 free calculators and planners to help you succeed
                    </CardDescription>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      View Tools <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

