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
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  User,
  MapPin,
  Calendar
} from "lucide-react";
import { resumeExamples, getResumeExampleByRole, type ResumeExample } from "@/lib/data/resume-examples";
import { resumeTemplates } from "@/lib/data/resume-templates";
import { coverLetterTemplates } from "@/lib/data/cover-letter-templates";

interface PageProps {
  params: Promise<{ roleSlug: string }>;
}

export async function generateStaticParams() {
  return resumeExamples.map((example) => ({
    roleSlug: example.roleSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { roleSlug } = await params;
  const example = getResumeExampleByRole(roleSlug);
  
  if (!example) {
    return { title: "Example Not Found" };
  }

  return {
    title: `${example.roleName} Resume Example | Free Template | Indeed Flex`,
    description: `See a complete ${example.roleName.toLowerCase()} resume example with summary, skills, and experience bullet points. Copy and customize for your own resume.`,
    keywords: example.seoKeywords,
  };
}

export default async function ResumeExamplePage({ params }: PageProps) {
  const { roleSlug } = await params;
  const example = getResumeExampleByRole(roleSlug);

  if (!example) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Job Application Toolkit", href: "/career-hub/job-application-toolkit" },
    { label: "Resume Examples", href: "/career-hub/resume-examples" },
    { label: example.roleName },
  ];

  // Get related examples from same industry
  const relatedExamples = resumeExamples
    .filter((e) => e.industry === example.industry && e.id !== example.id)
    .slice(0, 4);

  // Get relevant templates
  const relevantTemplates = resumeTemplates.filter((t) =>
    t.bestFor.some((role) =>
      role.toLowerCase().includes(example.roleName.toLowerCase()) ||
      example.roleName.toLowerCase().includes(role.toLowerCase().replace(/s$/, ""))
    )
  ).slice(0, 3);

  // Get relevant cover letters
  const relevantCoverLetters = coverLetterTemplates.filter(
    (cl) => cl.industry === example.industry || cl.industry === "general"
  ).slice(0, 2);

  const industryColors: Record<string, string> = {
    hospitality: "from-orange-500 to-orange-600",
    industrial: "from-blue-500 to-blue-600",
    retail: "from-green-500 to-green-600",
    facilities: "from-purple-500 to-purple-600",
    events: "from-pink-500 to-pink-600",
  };

  const colorClass = industryColors[example.industry] || industryColors.hospitality;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <Link
          href="/career-hub/resume-examples"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Examples
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className={`bg-gradient-to-br ${colorClass} rounded-2xl p-8 text-white mb-8`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3">
                    {example.yearsExperience} years experience
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{example.roleName} Resume Example</h1>
                  <p className="text-white/90 text-lg max-w-2xl">
                    A complete resume example with summary, skills, and experience you can customize for your own {example.roleName.toLowerCase()} resume.
                  </p>
                </div>
                <FileText className="h-12 w-12 flex-shrink-0" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
                  {example.industry}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {example.experience.length} work experience{example.experience.length > 1 ? "s" : ""}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {example.skills.length} skills
                </span>
              </div>
            </div>

            {/* Resume Content */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
              {/* Resume Header */}
              <div className="bg-gray-50 border-b p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">[Your Name]</h2>
                    <p className="text-gray-600">{example.roleName}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> [City, State] • [phone] • [email]
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Summary */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Professional Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{example.summary}</p>
                </section>

                {/* Objective (if exists) */}
                {example.objective && (
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                      Objective
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{example.objective}</p>
                  </section>
                )}

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {example.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    {example.experience.map((exp, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div className="mb-2">
                          <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <MapPin className="h-3 w-3" /> {exp.location}
                            <span className="mx-1">•</span>
                            <Calendar className="h-3 w-3" /> {exp.dates}
                          </p>
                        </div>
                        <ul className="space-y-2">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start gap-2 text-gray-700 text-sm">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education (if exists) */}
                {example.education && example.education.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                      <GraduationCap className="h-5 w-5 text-green-600" />
                      Education
                    </h3>
                    <div className="space-y-3">
                      {example.education.map((edu, index) => (
                        <div key={index}>
                          <p className="font-medium text-gray-900">{edu.degree}</p>
                          <p className="text-gray-600 text-sm">{edu.school} • {edu.year}</p>
                          {edu.details && <p className="text-gray-500 text-sm">{edu.details}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications (if exists) */}
                {example.certifications && example.certifications.length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b pb-2">
                      <Award className="h-5 w-5 text-amber-600" />
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {example.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Additional Sections */}
                {example.additionalSections && example.additionalSections.map((section, index) => (
                  <section key={index}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-amber-600" />
                Tips for Your {example.roleName} Resume
              </h2>
              
              <ul className="space-y-3">
                {example.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-xl border p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keywords for Your {example.roleName} Resume</h2>
              <p className="text-gray-600 mb-4">
                Include these industry keywords to help your resume pass ATS screening and catch recruiters&apos; attention.
              </p>
              <div className="flex flex-wrap gap-2">
                {example.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Templates CTA */}
            {relevantTemplates.length > 0 && (
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Recommended Templates</h3>
                <ul className="space-y-3">
                  {relevantTemplates.map((template) => (
                    <li key={template.id}>
                      <Link
                        href={`/career-hub/templates/${template.slug}`}
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                      >
                        <span>{template.name}</span>
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
            )}

            {/* Cover Letter CTA */}
            {relevantCoverLetters.length > 0 && (
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Cover Letters for {example.industry}</h3>
                <ul className="space-y-3">
                  {relevantCoverLetters.map((cl) => (
                    <li key={cl.id}>
                      <Link
                        href={`/career-hub/cover-letters/${cl.slug}`}
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                      >
                        <span>{cl.name}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Examples */}
            {relatedExamples.length > 0 && (
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Similar Role Examples</h3>
                <ul className="space-y-3">
                  {relatedExamples.map((re) => (
                    <li key={re.id}>
                      <Link
                        href={`/career-hub/resume-examples/${re.roleSlug}`}
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                      >
                        <span>{re.roleName}</span>
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

            {/* Role Page CTA */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Learn More About This Role</h3>
              <p className="text-gray-600 text-sm mb-4">
                Explore salary data, career paths, and job opportunities for {example.roleName}s.
              </p>
              <Link
                href={`/career-hub/roles/${example.roleSlug}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View {example.roleName} Career Guide <ArrowRight className="h-4 w-4" />
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
            "@type": "Article",
            headline: `${example.roleName} Resume Example`,
            description: `Complete ${example.roleName.toLowerCase()} resume example with summary, skills, and experience bullets.`,
            author: {
              "@type": "Organization",
              name: "Indeed Flex Career Team",
            },
            datePublished: "2026-02-01",
            dateModified: "2026-02-01",
          }),
        }}
      />
    </div>
  );
}

