import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Briefcase,
  Building2,
  ShoppingBag,
  Sparkles,
  Calendar,
  Star
} from "lucide-react";
import { coverLetterTemplates, type CoverLetterTemplate } from "@/lib/data/cover-letter-templates";

export const metadata: Metadata = {
  title: "Cover Letter Templates by Industry | Free Downloads | Indeed Flex",
  description: "Free cover letter templates for hospitality, warehouse, retail, and more. Industry-specific examples with real content. Stand out in your job application.",
  keywords: [
    "cover letter template",
    "free cover letter",
    "hospitality cover letter",
    "warehouse cover letter",
    "retail cover letter",
    "job application letter",
  ],
};

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  hospitality: Sparkles,
  industrial: Building2,
  retail: ShoppingBag,
  facilities: Building2,
  events: Calendar,
  general: FileText,
};

const industryColors: Record<string, string> = {
  hospitality: "from-orange-500 to-orange-600",
  industrial: "from-blue-500 to-blue-600",
  retail: "from-green-500 to-green-600",
  facilities: "from-purple-500 to-purple-600",
  events: "from-pink-500 to-pink-600",
  general: "from-gray-500 to-gray-600",
};

function CoverLetterCard({ template }: { template: CoverLetterTemplate }) {
  const Icon = industryIcons[template.industry] || FileText;
  const colorClass = industryColors[template.industry] || industryColors.general;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
      {/* Header */}
      <div className={`bg-gradient-to-br ${colorClass} p-6 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <Icon className="h-8 w-8" />
          <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium capitalize">
            {template.industry}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{template.description}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Best For */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Best For:</p>
          <div className="flex flex-wrap gap-1">
            {template.bestFor.slice(0, 3).map((role) => (
              <span key={role} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {role}
              </span>
            ))}
            {template.bestFor.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                +{template.bestFor.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Structure Preview */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Sections:</p>
          <div className="flex gap-1">
            {template.structure.map((section, i) => (
              <span 
                key={section.section} 
                className="flex-1 h-2 bg-gray-200 rounded-full first:rounded-l-full last:rounded-r-full"
                title={section.section}
              ></span>
            ))}
          </div>
        </div>

        {/* Tips Preview */}
        <ul className="space-y-2 mb-6">
          {template.tips.slice(0, 2).map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{tip}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/career-hub/cover-letters/${template.slug}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium group-hover:bg-emerald-600"
        >
          View Template <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function CoverLettersPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Cover Letters" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-4">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">Industry-Specific Templates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cover Letter Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Professional cover letters designed for your industry. 
            Each template includes structure guidance, example content, and expert tips.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {coverLetterTemplates.length} Templates
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-green-500" />
              Real Examples
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-green-500" />
              Industry-Specific
            </span>
          </div>
        </div>

        {/* When to Use Info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <FileText className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-semibold text-emerald-900 mb-1">Do I Need a Cover Letter?</h2>
              <p className="text-emerald-800 text-sm">
                <strong>For Indeed Flex shifts:</strong> No cover letter needed! Your profile and ratings speak for you.
                <br />
                <strong>For direct-hire positions:</strong> A cover letter can help you stand out. 
                Use our templates to create a professional introduction that gets noticed.
              </p>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Cover Letter Templates</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverLetterTemplates.map((template) => (
              <CoverLetterCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Cover Letter Writing Tips */}
        <div className="bg-white rounded-xl border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cover Letter Writing Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-green-600 mb-3">Do:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Address it to a specific person when possible</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Mention the specific position and company name</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Include specific achievements with numbers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Show enthusiasm for the role and company</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep it to one page (3-4 paragraphs)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-600 mb-3">Don&apos;t:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs flex-shrink-0 mt-0.5">✕</span>
                  <span>Simply repeat your resume content</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs flex-shrink-0 mt-0.5">✕</span>
                  <span>Use a generic &quot;To Whom It May Concern&quot;</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs flex-shrink-0 mt-0.5">✕</span>
                  <span>Focus only on what you want from the job</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs flex-shrink-0 mt-0.5">✕</span>
                  <span>Send the same letter to every employer</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs flex-shrink-0 mt-0.5">✕</span>
                  <span>Include salary requirements unless asked</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-hub/templates"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Templates</h3>
              <p className="text-gray-600 text-sm">
                Match your cover letter with a professional resume template
              </p>
            </Link>
            <Link
              href="/career-hub/resume-examples"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Examples</h3>
              <p className="text-gray-600 text-sm">
                See completed resumes for 23+ roles with real content
              </p>
            </Link>
            <Link
              href="/career-hub/guides/interview-skills"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <Briefcase className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Interview Skills</h3>
              <p className="text-gray-600 text-sm">
                Prepare for your interview after your application gets noticed
              </p>
            </Link>
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
            "@type": "CollectionPage",
            name: "Cover Letter Templates",
            description: "Free industry-specific cover letter templates for hourly and flexible workers.",
            url: "https://indeedflex.com/career-hub/cover-letters",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: coverLetterTemplates.map((template, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: template.name,
                url: `https://indeedflex.com/career-hub/cover-letters/${template.slug}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}

