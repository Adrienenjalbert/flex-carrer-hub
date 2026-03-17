import { Metadata } from "next";
import SkillsAnalyzerClient from "./SkillsAnalyzerClient";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Career Change Skills Quiz";
const toolDescription = "Free career change quiz for hourly workers. Rate your skills across 4 categories and get matched to 47 flexible roles in hospitality, warehouse, retail, and more.";
const canonical = "https://indeedflex.com/career-hub/tools/skills-analyzer";

export const metadata: Metadata = {
  title: "Career Change Skills Quiz: Find Your Best Flexible Job | Indeed Flex",
  description:
    "Free career change quiz for hourly workers. Rate your skills across 4 categories and get matched to 47 flexible roles in hospitality, warehouse, retail, and more.",
  keywords: [
    "career change quiz",
    "skills assessment",
    "what job should I do",
    "career quiz",
    "job skills test",
    "transferable skills assessment",
    "career aptitude test",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Career Change Skills Quiz: Find Your Best Flexible Job",
    description: "Free career change quiz for hourly workers. Rate your skills across 4 categories and get matched to 47 flexible roles.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Change Skills Quiz",
    description: "Free career change quiz for hourly workers. Rate your skills and get matched to flexible roles.",
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
