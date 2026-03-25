import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import JobOfferAnalyzerClient from "./JobOfferAnalyzerClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Job Offer Analyzer";
const toolDescription = "Compare job offers side by side. Analyze total compensation including hourly rate, benefits, commute costs, and growth potential.";
const canonical = "https://indeedflex.com/career-hub/tools/job-offer-analyzer";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "job-offer-analyzer",
  description: toolDescription,
  keywords: [
    "job offer comparison",
    "salary comparison",
    "job analyzer",
    "compensation calculator",
    "job decision",
    "offer evaluation",
  ],
});

export default function JobOfferAnalyzerPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "job-offer-analyzer", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <JobOfferAnalyzerClient />
    </StandardPageLayout>
  );
}
