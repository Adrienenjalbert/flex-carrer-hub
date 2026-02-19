import { Metadata } from "next";
import SkillsAnalyzerClient from "./SkillsAnalyzerClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Skills Analyzer";
const toolDescription = "Analyze your skills and discover which flexible jobs match your abilities. Get personalized career recommendations based on your experience.";
const canonical = "https://indeedflex.com/career-hub/tools/skills-analyzer";

export const metadata: Metadata = {
  title: "Skills Analyzer | Discover Your Strengths | Indeed Flex",
  description:
    "Analyze your skills and discover which flexible jobs match your abilities. Get personalized career recommendations based on your experience.",
  keywords: [
    "skills analyzer",
    "career assessment",
    "job matching",
    "skills test",
    "career quiz",
    "job recommendations",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Skills Analyzer | Discover Your Strengths",
    description: "Analyze your skills and discover which flexible jobs match your abilities.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills Analyzer",
    description: "Analyze your skills and discover which flexible jobs match your abilities.",
  },
};

export default function SkillsAnalyzerPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: toolName },
          ]}
        />
      </div>
      <SkillsAnalyzerClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "skills-analyzer",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
