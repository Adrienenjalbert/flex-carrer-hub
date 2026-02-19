import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Layout,
  Palette,
  Type,
  ArrowLeft
} from "lucide-react";
import { resumeTemplates, getTemplateBySlug, type ResumeTemplate } from "@/lib/data/resume-templates";
import { resumeExamples } from "@/lib/data/resume-examples";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateStaticParams() {
  return resumeTemplates.map((template) => ({
    templateId: template.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplateBySlug(templateId);
  
  if (!template) {
    return { title: "Template Not Found" };
  }

  const canonical = `https://indeedflex.com/career-hub/templates/${templateId}`;
  const title = `${template.name} Resume Template | Free Download`;
  const description = `Download the free ${template.name} resume template. ${template.description} Perfect for ${template.bestFor.slice(0, 3).join(", ")}.`;

  return {
    title: `${title} | Indeed Flex`,
    description,
    keywords: template.seoKeywords,
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

export default async function TemplatePage({ params }: PageProps) {
  const { templateId } = await params;
  const template = getTemplateBySlug(templateId);

  if (!template) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Templates", href: "/career-hub/templates" },
    { label: template.name },
  ];

  // Find related resume examples
  const relatedExamples = resumeExamples.filter((example) =>
    template.bestFor.some((role) =>
      example.roleName.toLowerCase().includes(role.toLowerCase()) ||
      role.toLowerCase().includes(example.roleName.toLowerCase())
    )
  ).slice(0, 4);

  // Get other templates for comparison
  const otherTemplates = resumeTemplates.filter((t) => t.id !== template.id).slice(0, 3);

  const styleColors: Record<string, string> = {
    modern: "from-blue-500 to-blue-600",
    professional: "from-slate-600 to-slate-700",
    minimal: "from-gray-500 to-gray-600",
    creative: "from-purple-500 to-purple-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <Link
          href="/career-hub/templates"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Templates
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Template Header */}
            <div className={`bg-gradient-to-br ${styleColors[template.style]} rounded-2xl p-8 text-white mb-8`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3">
                    {template.layout === "two-column" ? "Two-Column Layout" : "Single-Column Layout"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{template.name}</h1>
                  <p className="text-white/90 text-lg max-w-2xl">{template.description}</p>
                </div>
                <FileText className="h-12 w-12 flex-shrink-0" />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                  <Zap className="h-4 w-4" />
                  ATS: {template.atsScore === "high" ? "High Compatibility" : "Medium Compatibility"}
                </span>
                <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                  <Layout className="h-4 w-4" />
                  {template.layout === "two-column" ? "2-Column" : "1-Column"}
                </span>
                <span className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg">
                  <Palette className="h-4 w-4" />
                  {template.style.charAt(0).toUpperCase() + template.style.slice(1)} Style
                </span>
              </div>
            </div>

            {/* Template Sections */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Template Sections</h2>
              <p className="text-gray-600 mb-6">
                This template includes the following sections. Required sections are essential for 
                a complete resume; optional sections can be added based on your experience.
              </p>
              
              <div className="space-y-4">
                {template.sections.map((section, index) => (
                  <div
                    key={section.name}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{section.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          section.required 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {section.required ? "Required" : "Optional"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{section.tips}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Best For */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {template.bestFor.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Typography & Colors */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Design Specifications</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Type className="h-5 w-5 text-blue-600" />
                    Typography
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Headings:</strong> {template.typography.headingFont}</li>
                    <li><strong>Body Text:</strong> {template.typography.bodyFont}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-600" />
                    Color Scheme
                  </h3>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div 
                        className="w-10 h-10 rounded-lg border mb-1"
                        style={{ backgroundColor: template.colorScheme.primary }}
                      ></div>
                      <span className="text-xs text-gray-500">Primary</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-10 h-10 rounded-lg border mb-1"
                        style={{ backgroundColor: template.colorScheme.secondary }}
                      ></div>
                      <span className="text-xs text-gray-500">Secondary</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-10 h-10 rounded-lg border mb-1"
                        style={{ backgroundColor: template.colorScheme.accent }}
                      ></div>
                      <span className="text-xs text-gray-500">Accent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use This Template */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Template</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Review the Structure</h3>
                    <p className="text-gray-600 text-sm">
                      Familiarize yourself with the sections above. Note which are required vs optional.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Check Resume Examples</h3>
                    <p className="text-gray-600 text-sm">
                      Browse our role-specific examples for content ideas, bullet points, and achievement formats.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Customize for the Job</h3>
                    <p className="text-gray-600 text-sm">
                      Tailor your resume for each application. Match keywords from the job description.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add a Cover Letter</h3>
                    <p className="text-gray-600 text-sm">
                      Complete your application with a matching cover letter from our templates.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Examples */}
            {relatedExamples.length > 0 && (
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Related Resume Examples</h3>
                <ul className="space-y-3">
                  {relatedExamples.map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/career-hub/resume-examples/${example.roleSlug}`}
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                      >
                        <span>{example.roleName}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/career-hub/resume-examples"
                  className="block text-center text-blue-600 hover:underline mt-4 text-sm"
                >
                  View All Examples
                </Link>
              </div>
            )}

            {/* Other Templates */}
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Other Templates</h3>
              <ul className="space-y-3">
                {otherTemplates.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/career-hub/templates/${t.slug}`}
                      className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                    >
                      <span>{t.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/templates"
                className="block text-center text-blue-600 hover:underline mt-4 text-sm"
              >
                View All Templates
              </Link>
            </div>

            {/* Cover Letters CTA */}
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Complete Your Application</h3>
              <p className="text-gray-600 text-sm mb-4">
                Pair your resume with a professional cover letter for the best results.
              </p>
              <Link
                href="/career-hub/cover-letters"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                View Cover Letters <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated={getLastUpdated(templateId, 'core')} />

        <div className="mt-8">
          <InternalLinkHub variant="full" currentPage={{ type: "application" }} />
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Use the ${template.name} Resume Template`,
            description: template.description,
            step: [
              {
                "@type": "HowToStep",
                name: "Review the Structure",
                text: "Familiarize yourself with the template sections and requirements.",
              },
              {
                "@type": "HowToStep",
                name: "Check Resume Examples",
                text: "Browse role-specific examples for content ideas and bullet points.",
              },
              {
                "@type": "HowToStep",
                name: "Customize for the Job",
                text: "Tailor your resume for each application by matching job description keywords.",
              },
              {
                "@type": "HowToStep",
                name: "Add a Cover Letter",
                text: "Complete your application with a matching cover letter.",
              },
            ],
          }),
        }}
      />
      <CTASection />
    </div>
  );
}

