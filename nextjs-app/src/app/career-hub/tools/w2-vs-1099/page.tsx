import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import W2vs1099Client from "./W2vs1099Client";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "1099 vs W-2 Calculator";
const toolDescription = "Compare your take-home pay as a 1099 contractor versus a W-2 employee. See the real difference in taxes, benefits, and total compensation.";
const canonical = "https://indeedflex.com/career-hub/tools/w2-vs-1099";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "w2-vs-1099",
  description: toolDescription,
  keywords: [
    "1099 vs W-2 calculator",
    "1099 vs W-2 comparison",
    "self employment tax calculator",
    "W-2 vs 1099 take home pay",
    "contractor vs employee pay",
  ],
});

export default function W2vs1099Page() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "w2-vs-1099", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <W2vs1099Client />
    </StandardPageLayout>
  );
}
