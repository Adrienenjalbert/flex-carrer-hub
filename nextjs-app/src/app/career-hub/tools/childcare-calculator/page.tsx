import { Metadata } from "next";
import ChildcareCalculatorClient from "./ChildcareCalculatorClient";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Is Working Worth It? Calculator";
const toolDescription = "Calculate if working makes financial sense after childcare costs. Compare your hourly income against daycare expenses, commute costs, and tax credits to find your break-even point.";
const canonical = "https://indeedflex.com/career-hub/tools/childcare-calculator";

export const metadata: Metadata = {
  title: "Is Working Worth It? Childcare vs Income Calculator | Indeed Flex",
  description:
    "Calculate if working makes financial sense after childcare costs. Compare your hourly income against daycare expenses, commute costs, and tax credits to find your break-even point.",
  keywords: [
    "is it worth working after childcare",
    "childcare vs income",
    "break even childcare",
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
    title: "Is Working Worth It? Childcare vs Income Calculator",
    description: "Calculate if working makes financial sense after childcare costs. Compare your hourly income against daycare expenses, commute costs, and tax credits to find your break-even point.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Working Worth It? Childcare vs Income Calculator",
    description: "Calculate if working makes financial sense after childcare costs. Compare your hourly income against daycare expenses, commute costs, and tax credits to find your break-even point.",
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
