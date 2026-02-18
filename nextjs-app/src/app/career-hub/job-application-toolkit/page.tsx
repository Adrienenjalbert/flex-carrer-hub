import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Briefcase, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  BookOpen,
  Wrench,
  MessageSquare
} from "lucide-react";
import { resumeTemplates } from "@/lib/data/resume-templates";
import { coverLetterTemplates } from "@/lib/data/cover-letter-templates";
import { resumeExamples } from "@/lib/data/resume-examples";

export const metadata: Metadata = {
  title: "Job Application Toolkit | Resume Templates, Cover Letters & More | Indeed Flex Career Hub",
  description: "Free resume templates, cover letter examples, and job application guides for hourly and flexible workers. ATS-friendly templates for hospitality, warehouse, and retail jobs.",
  keywords: [
    "resume template",
    "cover letter template",
    "job application help",
    "free resume builder",
    "ATS resume",
    "hourly worker resume",
    "hospitality resume",
    "warehouse resume",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/job-application-toolkit",
  },
  openGraph: {
    title: "Job Application Toolkit | Indeed Flex Career Hub",
    description: "Free resume templates, cover letter examples, and job application guides for hourly and flexible workers.",
    type: "website",
  },
};

export default function JobApplicationToolkitPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">Complete Job Application Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Job Application Toolkit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Everything you need to land your next job: professional resume templates, 
            industry-specific cover letters, and real examples for hourly and flexible workers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {resumeTemplates.length} Resume Templates
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {coverLetterTemplates.length} Cover Letter Templates
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {resumeExamples.length} Role-Specific Examples
            </span>
          </div>
        </div>

        {/* Main Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Resume Templates */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
              <FileText className="h-10 w-10 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Resume Templates</h2>
              <p className="text-blue-100">
                Professional, ATS-friendly templates designed for hourly workers
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {resumeTemplates.slice(0, 4).map((template) => (
                  <li key={template.id} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{template.name}</span>
                  </li>
                ))}
                {resumeTemplates.length > 4 && (
                  <li className="text-gray-500 text-sm pl-6">
                    + {resumeTemplates.length - 4} more templates
                  </li>
                )}
              </ul>
              <Link
                href="/career-hub/templates"
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View All Templates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Cover Letters */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
              <Briefcase className="h-10 w-10 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Cover Letters</h2>
              <p className="text-emerald-100">
                Industry-specific templates with real examples and tips
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {coverLetterTemplates.slice(0, 4).map((template) => (
                  <li key={template.id} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{template.name}</span>
                  </li>
                ))}
                {coverLetterTemplates.length > 4 && (
                  <li className="text-gray-500 text-sm pl-6">
                    + {coverLetterTemplates.length - 4} more templates
                  </li>
                )}
              </ul>
              <Link
                href="/career-hub/cover-letters"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                View Cover Letters <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Resume Examples */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
              <Users className="h-10 w-10 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Resume Examples</h2>
              <p className="text-purple-100">
                Real examples for {resumeExamples.length}+ roles with proven content
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {resumeExamples.slice(0, 4).map((example) => (
                  <li key={example.id} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{example.roleName}</span>
                  </li>
                ))}
                {resumeExamples.length > 4 && (
                  <li className="text-gray-500 text-sm pl-6">
                    + {resumeExamples.length - 4} more examples
                  </li>
                )}
              </ul>
              <Link
                href="/career-hub/resume-examples"
                className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View Examples <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Start: Build Your Application in 3 Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Template</h3>
              <p className="text-gray-600 text-sm">
                Pick a resume template that matches your industry and experience level
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Use Real Examples</h3>
              <p className="text-gray-600 text-sm">
                Reference our role-specific examples for content ideas and bullet points
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add a Cover Letter</h3>
              <p className="text-gray-600 text-sm">
                Customize an industry cover letter to complete your application
              </p>
            </div>
          </div>
        </div>

        {/* Resume Examples by Industry */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Examples by Industry</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hospitality */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Hospitality
              </h3>
              <ul className="space-y-2">
                {resumeExamples
                  .filter((e) => e.industry === "hospitality")
                  .slice(0, 5)
                  .map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/career-hub/resume-examples/${example.roleSlug}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {example.roleName} Resume
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Industrial */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Warehouse & Logistics
              </h3>
              <ul className="space-y-2">
                {resumeExamples
                  .filter((e) => e.industry === "industrial")
                  .slice(0, 5)
                  .map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/career-hub/resume-examples/${example.roleSlug}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {example.roleName} Resume
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Retail */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Retail
              </h3>
              <ul className="space-y-2">
                {resumeExamples
                  .filter((e) => e.industry === "retail")
                  .slice(0, 5)
                  .map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/career-hub/resume-examples/${example.roleSlug}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {example.roleName} Resume
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Facilities & Events
              </h3>
              <ul className="space-y-2">
                {resumeExamples
                  .filter((e) => e.industry === "facilities" || e.industry === "events")
                  .slice(0, 5)
                  .map((example) => (
                    <li key={example.id}>
                      <Link
                        href={`/career-hub/resume-examples/${example.roleSlug}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {example.roleName} Resume
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Job Application Guides - Focused on Resume & Interview Content */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Application Guides</h2>
          <p className="text-gray-600 mb-8">In-depth articles covering resumes, interviews, and job platforms for hourly workers</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* For Students & Freshers */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">For Students & Freshers</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/career-hub/guides/fresher-resume-guide" className="text-blue-600 hover:underline text-sm block">
                    Resume for Freshers 2026: Complete Guide
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/student-resume-template" className="text-blue-600 hover:underline text-sm block">
                    Student Resume Template
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/zero-experience-jobs" className="text-blue-600 hover:underline text-sm block">
                    How to Get Hired With Zero Experience
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/transferable-skills-guide" className="text-blue-600 hover:underline text-sm block">
                    Transferable Skills for Your First Resume
                  </Link>
                </li>
              </ul>
            </div>

            {/* Compare Your Options */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Compare Your Options</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/career-hub/guides/best-resume-builders-2026" className="text-blue-600 hover:underline text-sm block">
                    Best Free Resume Builders 2026
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/best-job-boards-2026" className="text-blue-600 hover:underline text-sm block">
                    Best Job Boards by Industry
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/indeed-flex-vs-staffing-agencies" className="text-blue-600 hover:underline text-sm block">
                    Indeed Flex vs Staffing Agencies
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/chronological-vs-functional" className="text-blue-600 hover:underline text-sm block">
                    Chronological vs Functional Resume
                  </Link>
                </li>
              </ul>
            </div>

            {/* Interview Prep */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Interview Prep</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/career-hub/guides/warehouse-interview-questions" className="text-blue-600 hover:underline text-sm block">
                    Warehouse Interview Questions 2026
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/hospitality-interview-questions" className="text-blue-600 hover:underline text-sm block">
                    Hospitality Interview Questions
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/ats-resume-tips" className="text-blue-600 hover:underline text-sm block">
                    ATS Resume Tips: Beat the Bots
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/temp-to-permanent-guide" className="text-blue-600 hover:underline text-sm block">
                    Turn Temp Jobs Into Permanent
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resume Formats & Tools */}
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Resume Formats & Tools</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/career-hub/guides/reverse-chronological-resume" className="text-blue-600 hover:underline text-sm block">
                    Reverse Chronological Resume Guide
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/canva-resume-builder-ats" className="text-blue-600 hover:underline text-sm block">
                    Canva Resume Builder: ATS Guide
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/zety-alternative" className="text-blue-600 hover:underline text-sm block">
                    Zety Alternatives: Free Options
                  </Link>
                </li>
                <li>
                  <Link href="/career-hub/guides/resume-genius-alternative" className="text-blue-600 hover:underline text-sm block">
                    Resume Genius Alternatives
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/career-hub/guides"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all career guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Prepare Further Section */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prepare Further for Your Job Search</h2>
          <p className="text-gray-600 mb-8">Once you have your application materials ready, use these tools to prepare for interviews and plan your career growth.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-hub/tools/skills-analyzer"
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group-hover:border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Wrench className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                        Skills Analyzer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Assess your skills and identify areas for growth
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/career-hub/tools/career-path"
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group-hover:border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Target className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                        Career Path Explorer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Visualize your career progression from entry-level to management
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/interview-questions"
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group-hover:border-primary/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                        Interview Questions
                      </h3>
                      <p className="text-sm text-gray-600">
                        Practice common interview questions by role
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Are these resume templates really free?
              </h3>
              <p className="text-gray-600">
                Yes! All our resume templates, cover letter examples, and guides are completely free. 
                We&apos;re part of Indeed Flex and want to help workers succeed in their job search.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What makes these templates ATS-friendly?
              </h3>
              <p className="text-gray-600">
                Our templates use simple formatting, standard section headers, and avoid graphics that 
                confuse Applicant Tracking Systems. This ensures your resume gets read by recruiters.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do I need a cover letter for hourly jobs?
              </h3>
              <p className="text-gray-600">
                While not always required, a cover letter can help you stand out. For Indeed Flex shifts, 
                your profile and ratings matter more. For direct-hire positions, a cover letter is recommended.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I customize these templates?
              </h3>
              <p className="text-gray-600">
                Start with a template that fits your experience level, then use our role-specific examples 
                for content inspiration. Replace the placeholder text with your own information and achievements.
              </p>
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
            "@type": "CollectionPage",
            name: "Job Application Toolkit",
            description: "Free resume templates, cover letter examples, and job application guides for hourly and flexible workers.",
            url: "https://indeedflex.com/career-hub/job-application-toolkit",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Resume Templates",
                  url: "https://indeedflex.com/career-hub/templates",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Cover Letter Templates",
                  url: "https://indeedflex.com/career-hub/cover-letters",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Resume Examples",
                  url: "https://indeedflex.com/career-hub/resume-examples",
                },
              ],
            },
          }),
        }}
      />
    </div>
  );
}

