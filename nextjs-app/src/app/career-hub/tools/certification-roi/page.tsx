import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import CertificationROIClient from "./CertificationROIClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Certification ROI Calculator";
const toolDescription = "Calculate the return on investment for professional certifications. See how long it takes to recoup costs through higher pay.";
const canonical = "https://indeedflex.com/career-hub/tools/certification-roi";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "certification-roi",
  description: toolDescription,
  keywords: [
    "certification ROI",
    "certification calculator",
    "training investment",
    "career certification",
    "certification payback",
    "professional development",
  ],
});

export default function CertificationROIPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "certification-roi", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <CertificationROIClient />
    </StandardPageLayout>
  );
}
