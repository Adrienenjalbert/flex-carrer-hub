import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { 
  CheckCircle, 
  ArrowRight,
  Users,
  Briefcase,
  FileText,
  Calculator,
  BookOpen,
  Lightbulb,
  Target,
  HelpCircle
} from "lucide-react";
import { personaHubs, getPersonaHub, getAllPersonaHubs, type PersonaHub } from "@/lib/data/persona-hubs";
import { guideCategories } from "@/lib/data/articles/guides";
import { resumeTemplates } from "@/lib/data/resume-templates";

interface PageProps {
  params: Promise<{ personaSlug: string }>;
}

export async function generateStaticParams() {
  return personaHubs.map((hub) => ({
    personaSlug: hub.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { personaSlug } = await params;
  const hub = getPersonaHub(personaSlug);
  
  if (!hub) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${hub.title} | Indeed Flex Career Hub`,
    description: hub.metaDescription,
    keywords: hub.seoKeywords,
    alternates: {
      canonical: `https://indeedflex.com/career-hub/for/${personaSlug}`,
    },
    openGraph: {
      title: hub.title,
      description: hub.metaDescription,
      type: "website",
    },
  };
}

// Find guide details by slug
function findGuideBySlug(slug: string): { title: string; slug: string; readTime: string; category: string } | null {
  for (const category of guideCategories) {
    const article = category.articles.find((a) => a.slug === slug);
    if (article) {
      return { ...article, category: category.category };
    }
  }
  return null;
}

export default async function PersonaPage({ params }: PageProps) {
  const { personaSlug } = await params;
  const hub = getPersonaHub(personaSlug);

  if (!hub) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: hub.title },
  ];

  // Get related guides
  const relatedGuides = hub.relatedGuides
    .map((slug) => findGuideBySlug(slug))
    .filter((g): g is NonNullable<typeof g> => g !== null);

  // Get relevant templates
  const relevantTemplates = hub.resumeTemplates
    .map((slug) => resumeTemplates.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  // Get other personas
  const otherPersonas = getAllPersonaHubs().filter((p) => p.slug !== hub.slug);

  // Icon colors by persona
  const personaColors: Record<string, { gradient: string; accent: string; light: string }> = {
    students: { gradient: "from-blue-500 to-indigo-600", accent: "text-blue-600", light: "bg-blue-50" },
    "career-changers": { gradient: "from-emerald-500 to-teal-600", accent: "text-emerald-600", light: "bg-emerald-50" },
    "gig-workers": { gradient: "from-purple-500 to-violet-600", accent: "text-purple-600", light: "bg-purple-50" },
    parents: { gradient: "from-orange-500 to-amber-600", accent: "text-orange-600", light: "bg-orange-50" },
    retirees: { gradient: "from-rose-500 to-pink-600", accent: "text-rose-600", light: "bg-rose-50" },
  };

  const colors = personaColors[hub.slug] || personaColors.students;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-8 md:p-12 text-white mb-12`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Resources for You</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{hub.headline}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">{hub.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/career-hub/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Calculator className="h-5 w-5" />
                Explore Tools
              </Link>
              <Link
                href="/career-hub/guides"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Read Guides
              </Link>
            </div>
          </div>
        </div>

        {/* Pain Points & Solutions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Pain Points */}
          <div className="bg-white rounded-xl border p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className={`h-6 w-6 ${colors.accent}`} />
              Common Challenges
            </h2>
            <ul className="space-y-4">
              {hub.painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className={`${colors.light} rounded-xl border p-8`}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className={`h-6 w-6 ${colors.accent}`} />
              How Indeed Flex Helps
            </h2>
            <ul className="space-y-4">
              {hub.solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <CheckCircle className={`h-5 w-5 ${colors.accent} mt-0.5 flex-shrink-0`} />
                  <span className="text-gray-700">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-amber-600" />
            Quick Tips
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hub.quickTips.map((tip, index) => (
              <div key={tip} className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hub.recommendedTools.map((tool) => (
              <Link
                key={tool}
                href={`/career-hub/tools/${tool}`}
                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow group"
              >
                <Calculator className={`h-6 w-6 ${colors.accent} mb-2`} />
                <h3 className="font-medium text-gray-900 capitalize group-hover:text-blue-600 transition-colors">
                  {tool.replace(/-/g, " ")}
                </h3>
                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  Try it <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Guides for You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/career-hub/guides/${guide.slug}`}
                  className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow group"
                >
                  <span className="text-xs text-gray-500 mb-2 block">{guide.category}</span>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h3>
                  <span className="text-sm text-gray-500">{guide.readTime} read</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/career-hub/guides"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                View All Guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Resume Resources */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Resources</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Templates */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className={`h-5 w-5 ${colors.accent}`} />
                Recommended Templates
              </h3>
              <ul className="space-y-3">
                {relevantTemplates.map((template) => (
                  <li key={template.id}>
                    <Link
                      href={`/career-hub/templates/${template.slug}`}
                      className="flex items-center justify-between bg-white p-3 rounded-lg hover:shadow transition-shadow"
                    >
                      <span className="text-gray-700">{template.name}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cover Letters */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className={`h-5 w-5 ${colors.accent}`} />
                Cover Letter Templates
              </h3>
              <ul className="space-y-3">
                {hub.coverLetterTemplates.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/career-hub/cover-letters/${slug}`}
                      className="flex items-center justify-between bg-white p-3 rounded-lg hover:shadow transition-shadow"
                    >
                      <span className="text-gray-700 capitalize">{slug.replace(/-/g, " ")} Cover Letter</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Suggested Roles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Roles to Explore</h2>
          <div className="flex flex-wrap gap-3">
            {hub.suggestedRoles.map((role) => (
              <Link
                key={role}
                href={`/career-hub/roles/${role}`}
                className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors capitalize"
              >
                {role.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {hub.faqs.map((faq) => (
              <div key={faq.question} className="border-b pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Personas */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources for Others</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherPersonas.map((persona) => (
              <Link
                key={persona.slug}
                href={`/career-hub/for/${persona.slug}`}
                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900 mb-1">{persona.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{persona.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated={getLastUpdated(personaSlug, 'core')} />

        <div className="mt-8">
          <InternalLinkHub variant="full" currentPage={{ type: "persona", personaSlug }} />
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: hub.title,
            description: hub.metaDescription,
            url: `https://indeedflex.com/career-hub/for/${hub.slug}`,
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: hub.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}

