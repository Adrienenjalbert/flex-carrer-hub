import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import SkillsAnalyzerClient from "./SkillsAnalyzerClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Career Change Skills Quiz";
const toolDescription = "Free career change quiz for hourly workers. Rate your skills across 4 categories and get matched to 47 flexible roles in hospitality, warehouse, retail, and more.";
const canonical = "https://indeedflex.com/career-hub/tools/skills-analyzer";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "skills-analyzer",
  description: toolDescription,
  keywords: [
    "career change quiz",
    "skills assessment",
    "what job should I do",
    "career quiz",
    "job skills test",
    "transferable skills assessment",
    "career aptitude test",
  ],
});

export default function SkillsAnalyzerPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "skills-analyzer", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <SkillsAnalyzerClient />
    </StandardPageLayout>
  );
}
