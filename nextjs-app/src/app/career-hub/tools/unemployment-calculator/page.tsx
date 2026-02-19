import { Metadata } from "next";
import UnemploymentCalculatorClient from "./UnemploymentCalculatorClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Unemployment Benefits Calculator";
const toolDescription = "Calculate your potential unemployment benefits by state. See weekly benefit amounts, duration, and eligibility requirements.";
const canonical = "https://indeedflex.com/career-hub/tools/unemployment-calculator";

export const metadata: Metadata = {
  title: "Unemployment Benefits Calculator | Estimate Your Benefits | Indeed Flex",
  description:
    "Calculate your potential unemployment benefits by state. See weekly benefit amounts, duration, and eligibility requirements.",
  keywords: [
    "unemployment calculator",
    "unemployment benefits",
    "weekly benefit amount",
    "unemployment insurance",
    "UI benefits",
    "state unemployment",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Unemployment Benefits Calculator | Estimate Your Benefits",
    description: "Calculate your potential unemployment benefits by state.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unemployment Benefits Calculator",
    description: "Calculate your potential unemployment benefits by state.",
  },
};

export default function UnemploymentCalculatorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
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
      <UnemploymentCalculatorClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "unemployment-calculator",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
