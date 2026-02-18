import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Users,
  Briefcase,
  Building2,
  ShoppingBag,
  Sparkles,
  Star
} from "lucide-react";
import { resumeExamples, type ResumeExample } from "@/lib/data/resume-examples";

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

const industryConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string }> = {
  hospitality: { icon: Sparkles, color: "text-orange-600", bgColor: "bg-orange-50" },
  industrial: { icon: Building2, color: "text-blue-600", bgColor: "bg-blue-50" },
  retail: { icon: ShoppingBag, color: "text-green-600", bgColor: "bg-green-50" },
  facilities: { icon: Building2, color: "text-purple-600", bgColor: "bg-purple-50" },
  events: { icon: Users, color: "text-pink-600", bgColor: "bg-pink-50" },
};

function ResumeExampleCard({ example }: { example: ResumeExample }) {
  const config = industryConfig[example.industry] || industryConfig.hospitality;
  const Icon = config.icon;

  return (
    <Link
      href={`/career-hub/resume-examples/${example.roleSlug}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${config.bgColor} ${config.color}`}>
          {example.yearsExperience} years
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {example.roleName} Resume
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {example.summary.slice(0, 120)}...
      </p>

      {/* Skills Preview */}
      <div className="flex flex-wrap gap-1 mb-4">
        {example.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
            {skill}
          </span>
        ))}
        {example.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
            +{example.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 capitalize">{example.industry}</span>
        <span className="text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          View Example <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function ResumeExamplesPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Resume Examples" },
  ];

  // Group examples by industry
  const hospitalityExamples = resumeExamples.filter((e) => e.industry === "hospitality");
  const industrialExamples = resumeExamples.filter((e) => e.industry === "industrial");
  const retailExamples = resumeExamples.filter((e) => e.industry === "retail");
  const facilitiesExamples = resumeExamples.filter((e) => e.industry === "facilities");
  const eventsExamples = resumeExamples.filter((e) => e.industry === "events");

  // Entry-level examples
  const entryLevelExamples = resumeExamples.filter((e) => e.yearsExperience === "0-1");

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
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-12">
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

        {/* Entry-Level Section */}
        {entryLevelExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-emerald-100 rounded-lg">
                <Star className="h-6 w-6 text-emerald-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Entry-Level / No Experience</h2>
                <p className="text-gray-600 text-sm">Perfect for first-time job seekers</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entryLevelExamples.slice(0, 6).map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Hospitality Section */}
        {hospitalityExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-orange-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hospitality & Food Service</h2>
                <p className="text-gray-600 text-sm">Restaurants, bars, hotels, and catering</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalityExamples.map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Warehouse / Industrial Section */}
        {industrialExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Warehouse & Logistics</h2>
                <p className="text-gray-600 text-sm">Distribution centers, shipping, and manufacturing</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industrialExamples.map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Retail Section */}
        {retailExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-green-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Retail & Customer Service</h2>
                <p className="text-gray-600 text-sm">Stores, sales, and customer-facing roles</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {retailExamples.map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Facilities Section */}
        {facilitiesExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Facilities & Cleaning</h2>
                <p className="text-gray-600 text-sm">Housekeeping, janitorial, and maintenance</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilitiesExamples.map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {eventsExamples.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-pink-100 rounded-lg">
                <Users className="h-6 w-6 text-pink-600" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Events & Entertainment</h2>
                <p className="text-gray-600 text-sm">Concerts, conventions, and special events</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsExamples.map((example) => (
                <ResumeExampleCard key={example.id} example={example} />
              ))}
            </div>
          </div>
        )}

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
    </div>
  );
}

