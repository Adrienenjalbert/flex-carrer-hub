import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import SafetyFirstClient from "./SafetyFirstClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Safety First";
const toolDescription = "Learn essential workplace safety procedures. Practice scenarios for warehouse, hospitality, and retail environments.";
const canonical = "https://indeedflex.com/career-hub/tools/safety-first";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "safety-first",
  description: toolDescription,
  keywords: [
    "workplace safety",
    "safety training",
    "OSHA",
    "warehouse safety",
    "food safety",
    "safety quiz",
  ],
});

export default function SafetyFirstPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "safety-first", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
        featureList={[]}
      />
      <SafetyFirstClient />
    </StandardPageLayout>
  );
}
