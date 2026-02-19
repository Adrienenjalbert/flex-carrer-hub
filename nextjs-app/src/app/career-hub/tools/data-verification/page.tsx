import { Metadata } from "next";
import DataVerificationClient from "./DataVerificationClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Data Verification";
const toolDescription = "Verify the data sources and methodology behind our career tools. Transparency about where our salary, cost of living, and job market data comes from.";
const canonical = "https://indeedflex.com/career-hub/tools/data-verification";

export const metadata: Metadata = {
  title: "Data Verification | Check Our Sources | Indeed Flex",
  description:
    "Verify the data sources and methodology behind our career tools. Transparency about where our salary, cost of living, and job market data comes from.",
  keywords: [
    "data sources",
    "methodology",
    "salary data",
    "verification",
    "transparency",
    "data accuracy",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Data Verification | Check Our Sources",
    description: "Verify the data sources and methodology behind our career tools.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Verification",
    description: "Verify the data sources and methodology behind our career tools.",
  },
};

export default function DataVerificationPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="UtilityApplication"
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
      <DataVerificationClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "data-verification",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
