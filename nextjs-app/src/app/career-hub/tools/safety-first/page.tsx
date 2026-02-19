import { Metadata } from "next";
import SafetyFirstClient from "./SafetyFirstClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Safety First";
const toolDescription = "Learn essential workplace safety procedures. Practice scenarios for warehouse, hospitality, and retail environments.";
const canonical = "https://indeedflex.com/career-hub/tools/safety-first";

export const metadata: Metadata = {
  title: "Safety First | Workplace Safety Training | Indeed Flex",
  description:
    "Learn essential workplace safety procedures. Practice scenarios for warehouse, hospitality, and retail environments.",
  keywords: [
    "workplace safety",
    "safety training",
    "OSHA",
    "warehouse safety",
    "food safety",
    "safety quiz",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Safety First | Workplace Safety Training",
    description: "Learn essential workplace safety procedures. Practice scenarios for warehouse, hospitality, and retail environments.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety First | Workplace Safety Training",
    description: "Learn essential workplace safety procedures.",
  },
};

export default function SafetyFirstPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
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
      <SafetyFirstClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "safety-first",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
