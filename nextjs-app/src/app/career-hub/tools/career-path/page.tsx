import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import CareerPathClient from "./CareerPathClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Career Path Explorer";
const toolDescription = "Explore career progression paths from entry-level to management. See salary ranges, required skills, and timelines for advancement.";
const canonical = "https://indeedflex.com/career-hub/tools/career-path";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "career-path",
  description: toolDescription,
  keywords: [
    "career path",
    "career progression",
    "job advancement",
    "salary growth",
    "career planning",
    "management career",
  ],
});

export default function CareerPathPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "career-path", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <CareerPathClient />
    </StandardPageLayout>
  );
}
