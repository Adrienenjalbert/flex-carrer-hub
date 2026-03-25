import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import CommuteCalculatorClient from "./CommuteCalculatorClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Commute Cost Calculator";
const toolDescription = "Calculate the real cost of your commute including gas, car wear, parking, and time. See how commute affects your effective hourly rate.";
const canonical = "https://indeedflex.com/career-hub/tools/commute-calculator";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "commute-calculator",
  description: toolDescription,
  keywords: [
    "commute calculator",
    "commute cost",
    "gas calculator",
    "travel expenses",
    "mileage calculator",
    "work commute",
  ],
});

export default function CommuteCalculatorPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "commute-calculator", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <CommuteCalculatorClient />
    </StandardPageLayout>
  );
}
