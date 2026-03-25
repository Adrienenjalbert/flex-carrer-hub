import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import BenefitsCheckerClient from "./BenefitsCheckerClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Benefits Eligibility Checker";
const toolDescription = "Check your eligibility for benefits as a flexible worker. See what healthcare, unemployment, and assistance programs you may qualify for.";
const canonical = "https://indeedflex.com/career-hub/tools/benefits-checker";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "benefits-checker",
  description: toolDescription,
  keywords: [
    "benefits eligibility",
    "healthcare eligibility",
    "gig worker benefits",
    "ACA eligibility",
    "worker benefits",
    "assistance programs",
  ],
});

export default function BenefitsCheckerPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "benefits-checker", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <BenefitsCheckerClient />
    </StandardPageLayout>
  );
}
