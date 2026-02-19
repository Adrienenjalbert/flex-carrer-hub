import { Metadata } from "next";
import ChildcareCalculatorClient from "./ChildcareCalculatorClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Childcare Cost Calculator";
const toolDescription = "Calculate childcare costs vs. work income. See if working makes financial sense after childcare expenses in your city.";
const canonical = "https://indeedflex.com/career-hub/tools/childcare-calculator";

export const metadata: Metadata = {
  title: "Childcare Cost Calculator | Plan Your Work Schedule | Indeed Flex",
  description:
    "Calculate childcare costs vs. work income. See if working makes financial sense after childcare expenses in your city.",
  keywords: [
    "childcare calculator",
    "daycare costs",
    "working parent",
    "childcare expenses",
    "work income calculator",
    "daycare vs work",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Childcare Cost Calculator | Plan Your Work Schedule",
    description: "Calculate childcare costs vs. work income.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Childcare Cost Calculator",
    description: "Calculate childcare costs vs. work income.",
  },
};

export default function ChildcareCalculatorPage() {
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
      <ChildcareCalculatorClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "childcare-calculator",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
