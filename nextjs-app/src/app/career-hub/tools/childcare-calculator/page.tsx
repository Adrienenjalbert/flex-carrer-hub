import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import ChildcareCalculatorClient from "./ChildcareCalculatorClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Is Working Worth It? Calculator";
const toolDescription = "Calculate if working makes financial sense after childcare costs. Compare your hourly income against daycare expenses, commute costs, and tax credits to find your break-even point.";
const canonical = "https://indeedflex.com/career-hub/tools/childcare-calculator";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "childcare-calculator",
  description: toolDescription,
  keywords: [
    "is it worth working after childcare",
    "childcare vs income",
    "break even childcare",
    "childcare calculator",
    "daycare costs",
    "working parent",
    "childcare expenses",
    "work income calculator",
    "daycare vs work",
  ],
});

export default function ChildcareCalculatorPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "childcare-calculator", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <ChildcareCalculatorClient />
    </StandardPageLayout>
  );
}
