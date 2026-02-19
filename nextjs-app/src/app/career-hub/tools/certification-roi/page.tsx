import { Metadata } from "next";
import CertificationROIClient from "./CertificationROIClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Certification ROI Calculator";
const toolDescription = "Calculate the return on investment for professional certifications. See how long it takes to recoup costs through higher pay.";
const canonical = "https://indeedflex.com/career-hub/tools/certification-roi";

export const metadata: Metadata = {
  title: "Certification ROI Calculator | Is It Worth It? | Indeed Flex",
  description:
    "Calculate the return on investment for professional certifications. See how long it takes to recoup costs through higher pay.",
  keywords: [
    "certification ROI",
    "certification calculator",
    "training investment",
    "career certification",
    "certification payback",
    "professional development",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Certification ROI Calculator | Is It Worth It?",
    description: "Calculate the return on investment for professional certifications.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Certification ROI Calculator",
    description: "Calculate the return on investment for professional certifications.",
  },
};

export default function CertificationROIPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: toolName },
          ]}
        />
      </div>
      <CertificationROIClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "certification-roi",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
