import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import DataVerificationClient from "./DataVerificationClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Data Verification";
const toolDescription = "Verify the data sources and methodology behind our career tools. Transparency about where our salary, cost of living, and job market data comes from.";
const canonical = "https://indeedflex.com/career-hub/tools/data-verification";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "data-verification",
  description: toolDescription,
  keywords: [
    "data sources",
    "methodology",
    "salary data",
    "verification",
    "transparency",
    "data accuracy",
  ],
});

export default function DataVerificationPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "data-verification", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="UtilityApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <DataVerificationClient />
    </StandardPageLayout>
  );
}
