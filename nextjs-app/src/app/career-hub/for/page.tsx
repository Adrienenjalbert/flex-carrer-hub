import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";
import { 
  Users,
  GraduationCap,
  ArrowRightLeft,
  Briefcase,
  Heart,
  Clock,
  ArrowRight
} from "lucide-react";
import { personaHubs } from "@/lib/data/persona-hubs";

export const metadata: Metadata = {
  title: "Resources by Life Situation | Students, Parents, Career Changers | Indeed Flex",
  description: "Find flexible work resources tailored to your situation. Whether you're a student, parent, career changer, or gig worker, we have guides, tools, and advice for you.",
  keywords: [
    "student jobs",
    "jobs for parents",
    "career change jobs",
    "gig worker resources",
    "flexible work by situation",
  ],
};

const personaIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  students: GraduationCap,
  "career-changers": ArrowRightLeft,
  "gig-workers": Briefcase,
  parents: Heart,
  retirees: Clock,
};

const personaColors: Record<string, { gradient: string; icon: string }> = {
  students: { gradient: "from-blue-500 to-indigo-600", icon: "text-blue-600" },
  "career-changers": { gradient: "from-emerald-500 to-teal-600", icon: "text-emerald-600" },
  "gig-workers": { gradient: "from-purple-500 to-violet-600", icon: "text-purple-600" },
  parents: { gradient: "from-orange-500 to-amber-600", icon: "text-orange-600" },
  retirees: { gradient: "from-rose-500 to-pink-600", icon: "text-rose-600" },
};

export default function ForIndexPage() {
  const breadcrumbs = [
    { label: "Career Hub", href: "/career-hub" },
    { label: "Resources by Situation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Personalized Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Resources for Your Situation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re a student balancing classes, a parent managing family life, 
            or exploring a career change, we have tailored guides, tools, and advice for you.
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {personaHubs.map((persona) => {
            const Icon = personaIcons[persona.slug] || Users;
            const colors = personaColors[persona.slug] || personaColors.students;

            return (
              <Link
                key={persona.slug}
                href={`/career-hub/for/${persona.slug}`}
                className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
                  <Icon className="h-10 w-10 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{persona.title}</h2>
                  <p className="text-white/80">{persona.headline}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {persona.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {persona.relatedGuides.length} guides
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {persona.recommendedTools.length} tools
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {persona.suggestedRoles.length} roles
                    </span>
                  </div>

                  <span className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    Explore Resources <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* What's Inside */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You&apos;ll Find in Each Hub
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Curated Guides</h3>
              <p className="text-gray-600 text-sm">Articles hand-picked for your situation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Relevant Tools</h3>
              <p className="text-gray-600 text-sm">Calculators and planners you&apos;ll actually use</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Role Suggestions</h3>
              <p className="text-gray-600 text-sm">Jobs that match your availability and goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Specific FAQs</h3>
              <p className="text-gray-600 text-sm">Answers to questions people like you ask</p>
            </div>
          </div>
        </div>

        <AuthorByline contentType="guide" lastUpdated={getLastUpdated('for', 'core')} />

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
            name: "Resources by Life Situation",
            description: "Find flexible work resources tailored to your situation.",
            url: "https://indeedflex.com/career-hub/for",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: personaHubs.map((hub, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: hub.title,
                url: `https://indeedflex.com/career-hub/for/${hub.slug}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}

