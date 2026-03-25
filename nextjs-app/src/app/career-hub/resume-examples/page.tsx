import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { 
  FileText, 
  CheckCircle, 
  Users,
  Briefcase,
  Star
} from "lucide-react";
import { resumeExamples } from "@/lib/data/resume-examples";
import ResumeExamplesClient from "./ResumeExamplesClient";
import ResumeBuilderCTA from "@/components/career-hub/cta/ResumeBuilderCTA";
import CTASection from "@/components/career-hub/CTASection";

export const metadata: Metadata = {
  title: "Resume Examples by Role | Real Content & Bullet Points | Indeed Flex",
  description: "See real resume examples for 23+ hourly jobs including bartender, warehouse worker, server, and more. Copy bullet points and customize for your own resume.",
  keywords: [
    "resume example",
    "bartender resume example",
    "warehouse resume example",
    "server resume example",
    "retail resume example",
    "resume bullet points",
  ],
};

export default function ResumeExamplesPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Resume Examples" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Real Examples</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resume Examples by Role
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            See complete resume examples for {resumeExamples.length}+ hourly jobs. 
            Each includes a summary, skills, experience bullets, and certifications you can customize.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {resumeExamples.length} Role Examples
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-green-500" />
              Real Bullet Points
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-green-500" />
              All Experience Levels
            </span>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-purple-900 mb-1">How to Use These Examples</h2>
              <p className="text-purple-800 text-sm">
                Browse examples for your target role, then <strong>adapt the content</strong> for your own experience. 
                Copy bullet point structures and replace with your own achievements. 
                Pair with a <Link href="/career-hub/templates" className="underline">resume template</Link> for the best results.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Filterable Grid */}
        <div className="mb-16">
          <ResumeExamplesClient examples={resumeExamples} />
        </div>

        {/* Resume Builder CTA */}
        <ResumeBuilderCTA className="mb-16" />

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
                Choose a professional template to format your resume
              </p>
            </Link>
            <Link
              href="/career-hub/cover-letters"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-emerald-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Cover Letters</h3>
              <p className="text-gray-600 text-sm">
                Complete your application with a matching cover letter
              </p>
            </Link>
            <Link
              href="/career-hub/guides/resume-tips"
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <Briefcase className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Resume Writing Guide</h3>
              <p className="text-gray-600 text-sm">
                Expert tips for creating a resume that gets results
              </p>
            </Link>
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated={getLastUpdated('resume-examples', 'core')} />

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
            name: "Resume Examples by Role",
            description: `Resume examples for ${resumeExamples.length}+ hourly jobs with real content and bullet points.`,
            url: "https://indeedflex.com/career-hub/resume-examples",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: resumeExamples.map((example, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${example.roleName} Resume Example`,
                url: `https://indeedflex.com/career-hub/resume-examples/${example.roleSlug}`,
              })),
            },
          }),
        }}
      />
      <CTASection variant="resume-builder" />
    </div>
  );
}

