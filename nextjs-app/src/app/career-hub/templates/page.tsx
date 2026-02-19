import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import PageHero from "@/components/career-hub/PageHero";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Layout,
  Zap,
  Star,
  Users
} from "lucide-react";
import { resumeTemplates, type ResumeTemplate } from "@/lib/data/resume-templates";

export const metadata: Metadata = {
  title: "Free Resume Templates for Hourly Workers | ATS-Friendly | Indeed Flex",
  description: "Download free resume templates designed for hospitality, warehouse, and retail workers. ATS-friendly formats that get you noticed. Modern, professional, and entry-level options.",
  keywords: [
    "resume template",
    "free resume",
    "ATS resume template",
    "hourly worker resume",
    "hospitality resume template",
    "warehouse resume template",
    "entry-level resume",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/templates",
  },
  openGraph: {
    title: "Free Resume Templates for Hourly Workers | ATS-Friendly | Indeed Flex",
    description: "Download free resume templates designed for hospitality, warehouse, and retail workers. ATS-friendly formats that get you noticed.",
    url: "https://indeedflex.com/career-hub/templates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Templates for Hourly Workers",
    description: "Download free resume templates designed for hourly and flexible workers.",
  },
};

function TemplateCard({ template }: { template: ResumeTemplate }) {
  const styleColors = {
    modern: "from-blue-500 to-blue-600",
    professional: "from-slate-600 to-slate-700",
    minimal: "from-gray-500 to-gray-600",
    creative: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
      {/* Preview Header */}
      <div className={`bg-gradient-to-br ${styleColors[template.style]} p-6 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <FileText className="h-8 w-8" />
          <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
            {template.layout === "two-column" ? "2-Column" : "1-Column"}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{template.description}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* ATS Score */}
        <div className="flex items-center gap-2 mb-4">
          <Zap className={`h-4 w-4 ${template.atsScore === "high" ? "text-green-500" : "text-yellow-500"}`} />
          <span className="text-sm text-gray-600">
            ATS Compatibility: <span className="font-medium capitalize">{template.atsScore}</span>
          </span>
        </div>

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
                +{template.bestFor.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {template.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/career-hub/templates/${template.slug}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium group-hover:bg-blue-600"
        >
          View Template <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Resume Templates" },
  ];

  // Group templates by style
  const highAtsTemplates = resumeTemplates.filter((t) => t.atsScore === "high");

  const highAtsCount = resumeTemplates.filter((t) => t.atsScore === "high").length;

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <PageHero
        title="Resume Templates"
        description="Professional, ATS-friendly resume templates designed specifically for hourly and flexible workers. Choose your style and start building."
        badge="Free Templates"
        stats={[
          { value: resumeTemplates.length.toString(), label: "Templates" },
          { value: highAtsCount.toString(), label: "High ATS Score" },
          { value: "100%", label: "Free" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">

        {/* ATS Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-blue-900 mb-1">What is ATS Compatibility?</h2>
              <p className="text-blue-800 text-sm">
                Applicant Tracking Systems (ATS) are software that scans resumes before human reviewers see them. 
                Our templates use simple formatting, standard headers, and avoid graphics that confuse these systems. 
                This ensures your resume actually gets read by recruiters.
              </p>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Templates</h2>
            <span className="text-sm text-gray-500">
              {highAtsTemplates.length} of {resumeTemplates.length} with high ATS compatibility
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Template Selection Guide */}
        <div className="bg-white rounded-xl border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Which Template Should You Choose?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                First-Time Job Seekers
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose the <strong>Entry-Level</strong> template. It emphasizes skills and education over 
                work history, perfect when you don&apos;t have much experience yet.
              </p>
              <Link href="/career-hub/templates/entry-level" className="text-blue-600 hover:underline text-sm">
                View Entry-Level Template →
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Layout className="h-5 w-5 text-emerald-600" />
                Experienced Workers
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose <strong>Modern Professional</strong> or <strong>Classic Professional</strong>. 
                These put your work history front and center with space for achievements.
              </p>
              <Link href="/career-hub/templates/professional" className="text-blue-600 hover:underline text-sm">
                View Professional Template →
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Applying to Large Companies
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose the <strong>ATS-Optimized</strong> template. Maximum compatibility with 
                automated screening systems used by big employers.
              </p>
              <Link href="/career-hub/templates/ats-friendly" className="text-blue-600 hover:underline text-sm">
                View ATS-Optimized Template →
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-600" />
                Customer-Facing Roles
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Choose the <strong>Creative Visual</strong> template for bartending, events, or 
                brand ambassador roles where personality matters.
              </p>
              <Link href="/career-hub/templates/creative" className="text-blue-600 hover:underline text-sm">
                View Creative Template →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-hub/resume-examples"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Examples</h3>
              <p className="text-gray-600 text-sm">
                See completed resumes for 23+ roles with real content and bullet points
              </p>
            </Link>
            <Link
              href="/career-hub/cover-letters"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cover Letter Templates</h3>
              <p className="text-gray-600 text-sm">
                Industry-specific cover letters to complete your application
              </p>
            </Link>
            <Link
              href="/career-hub/guides/resume-tips"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Writing Tips</h3>
              <p className="text-gray-600 text-sm">
                Expert advice on crafting a resume that gets results
              </p>
            </Link>
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated={getLastUpdated('templates', 'core')} />

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
            "@type": "CollectionPage",
            name: "Resume Templates",
            description: "Free ATS-friendly resume templates for hourly and flexible workers.",
            url: "https://indeedflex.com/career-hub/templates",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: resumeTemplates.map((template, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: template.name,
                url: `https://indeedflex.com/career-hub/templates/${template.slug}`,
              })),
            },
          }),
        }}
      />
      <CTASection />
    </>
  );
}

