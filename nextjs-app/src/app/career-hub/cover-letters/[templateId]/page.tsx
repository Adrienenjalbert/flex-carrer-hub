import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Copy
} from "lucide-react";
import { coverLetterTemplates, getCoverLetterBySlug, type CoverLetterTemplate } from "@/lib/data/cover-letter-templates";
import { resumeExamples } from "@/lib/data/resume-examples";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateStaticParams() {
  return coverLetterTemplates.map((template) => ({
    templateId: template.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = getCoverLetterBySlug(templateId);
  
  if (!template) {
    return { title: "Template Not Found" };
  }

  return {
    title: `${template.name} Cover Letter Template | Free Example | Indeed Flex`,
    description: `Free ${template.name.toLowerCase()} cover letter template with example content. ${template.description}`,
    keywords: template.seoKeywords,
  };
}

export default async function CoverLetterPage({ params }: PageProps) {
  const { templateId } = await params;
  const template = getCoverLetterBySlug(templateId);

  if (!template) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Cover Letters", href: "/career-hub/cover-letters" },
    { label: template.name },
  ];

  // Find related resume examples
  const relatedExamples = resumeExamples.filter((example) =>
    template.bestFor.some((role) =>
      example.roleName.toLowerCase().includes(role.toLowerCase().replace(/s$/, "")) ||
      role.toLowerCase().includes(example.roleName.toLowerCase())
    )
  ).slice(0, 4);

  // Get other templates
  const otherTemplates = coverLetterTemplates.filter((t) => t.id !== template.id).slice(0, 3);

  const industryColors: Record<string, string> = {
    hospitality: "from-orange-500 to-orange-600",
    industrial: "from-blue-500 to-blue-600",
    retail: "from-green-500 to-green-600",
    facilities: "from-purple-500 to-purple-600",
    events: "from-pink-500 to-pink-600",
    general: "from-gray-500 to-gray-600",
  };

  const colorClass = industryColors[template.industry] || industryColors.general;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <Link
          href="/career-hub/cover-letters"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Cover Letters
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className={`bg-gradient-to-br ${colorClass} rounded-2xl p-8 text-white mb-8`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3 capitalize">
                    {template.industry} Industry
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{template.name}</h1>
                  <p className="text-white/90 text-lg max-w-2xl">{template.description}</p>
                </div>
                <FileText className="h-12 w-12 flex-shrink-0" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {template.bestFor.map((role) => (
                  <span key={role} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Cover Letter Structure */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cover Letter Structure</h2>
              <p className="text-gray-600 mb-6">
                Follow this structure for a professional, effective cover letter. 
                Each section includes example content you can customize.
              </p>

              <div className="space-y-8">
                {template.structure.map((section, index) => (
                  <div key={section.section} className="border-l-4 border-gray-200 pl-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{section.section}</h3>
                      <span className="text-sm text-gray-500">({section.wordCount})</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{section.purpose}</p>
                    
                    <div className="bg-slate-50 rounded-lg p-4 relative group">
                      <p className="text-gray-700 italic text-sm leading-relaxed">
                        &ldquo;{section.example}&rdquo;
                      </p>
                      <button 
                        className="absolute top-2 right-2 p-2 bg-white rounded shadow opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Tips */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-amber-600" />
                Tips for {template.industry.charAt(0).toUpperCase() + template.industry.slice(1)} Cover Letters
              </h2>
              
              <ul className="space-y-3">
                {template.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords to Include */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keywords to Include</h2>
              <p className="text-gray-600 mb-4">
                Use these industry-relevant keywords throughout your cover letter to demonstrate 
                you understand the role and industry.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {template.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete Example */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Example</h2>
              
              <div className="bg-slate-50 rounded-lg p-6 font-serif text-gray-800 leading-relaxed space-y-4">
                <p>Dear Hiring Manager,</p>
                
                {template.structure.map((section) => (
                  <p key={section.section}>{section.example}</p>
                ))}
                
                <p className="pt-4">
                  Sincerely,<br />
                  [Your Name]<br />
                  [Phone Number]<br />
                  [Email Address]
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Remember to replace the bracketed text with your own information
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Resumes */}
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
              <h3 className="font-bold text-gray-900 mb-4">Other Cover Letters</h3>
              <ul className="space-y-3">
                {otherTemplates.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/career-hub/cover-letters/${t.slug}`}
                      className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                    >
                      <span>{t.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/career-hub/cover-letters"
                className="block text-center text-blue-600 hover:underline mt-4 text-sm"
              >
                View All Cover Letters
              </Link>
            </div>

            {/* Resume Templates CTA */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Need a Resume Too?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete your application with a professional resume that matches.
              </p>
              <Link
                href="/career-hub/templates"
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Resume Templates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated="2026-02-01" />

        <div className="mt-8">
          <InternalLinkHub variant="full" />
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Write a ${template.name} Cover Letter`,
            description: template.description,
            step: template.structure.map((section, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: section.section,
              text: section.purpose,
            })),
          }),
        }}
      />
    </div>
  );
}

