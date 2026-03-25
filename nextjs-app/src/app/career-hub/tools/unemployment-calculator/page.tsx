import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import UnemploymentCalculatorClient from "./UnemploymentCalculatorClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Unemployment Benefits Calculator";
const toolDescription = "Calculate your potential unemployment benefits by state. See weekly benefit amounts, duration, and eligibility requirements.";
const canonical = "https://indeedflex.com/career-hub/tools/unemployment-calculator";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "unemployment-calculator",
  description: toolDescription,
  keywords: [
    "unemployment calculator",
    "unemployment benefits",
    "weekly benefit amount",
    "unemployment insurance",
    "UI benefits",
    "state unemployment",
  ],
});

export default function UnemploymentCalculatorPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "unemployment-calculator", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <UnemploymentCalculatorClient />
    </StandardPageLayout>
  );
}
