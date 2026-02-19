import { Metadata } from "next";
import CommuteCalculatorClient from "./CommuteCalculatorClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Commute Cost Calculator";
const toolDescription = "Calculate the real cost of your commute including gas, car wear, parking, and time. See how commute affects your effective hourly rate.";
const canonical = "https://indeedflex.com/career-hub/tools/commute-calculator";

export const metadata: Metadata = {
  title: "Commute Cost Calculator | True Cost of Your Commute | Indeed Flex",
  description:
    "Calculate the real cost of your commute including gas, car wear, parking, and time. See how commute affects your effective hourly rate.",
  keywords: [
    "commute calculator",
    "commute cost",
    "gas calculator",
    "travel expenses",
    "mileage calculator",
    "work commute",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Commute Cost Calculator | True Cost of Your Commute",
    description: "Calculate the real cost of your commute including gas, car wear, parking, and time.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commute Cost Calculator",
    description: "Calculate the real cost of your commute.",
  },
};

export default function CommuteCalculatorPage() {
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
      <CommuteCalculatorClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "commute-calculator",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
