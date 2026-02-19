import { Metadata } from "next";
import CostOfLivingClient from "./CostOfLivingClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

const toolName = "Cost of Living Comparison";
const toolDescription = "Compare cost of living between US cities. See how far your money goes in different locations and make informed decisions about relocation for work.";
const canonical = "https://indeedflex.com/career-hub/tools/cost-of-living";

export const metadata: Metadata = {
  title: "Cost of Living Comparison | Compare US Cities | Indeed Flex",
  description:
    "Compare cost of living between US cities. See how far your money goes in different locations and make informed decisions about relocation for work.",
  keywords: [
    "cost of living",
    "city comparison",
    "relocation calculator",
    "salary comparison",
    "living expenses",
    "housing costs",
    "cost of living index",
    "moving calculator",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Cost of Living Comparison | Compare US Cities",
    description: "Compare cost of living across US cities. Make informed relocation decisions.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of Living Comparison",
    description: "Compare cost of living across US cities.",
  },
};

const costFAQs = [
  {
    question: "How is cost of living calculated?",
    answer: "Cost of living is calculated by comparing the prices of common expenses including housing, food, transportation, utilities, and healthcare in different cities against a national baseline (usually 100)."
  },
  {
    question: "What is the most expensive city in the US?",
    answer: "New York City and San Francisco consistently rank as the most expensive US cities, with cost of living indices 85-120% above the national average, primarily due to housing costs."
  },
  {
    question: "How much do I need to earn in a new city to maintain my lifestyle?",
    answer: "Use the comparison tool to calculate equivalent salary. For example, if you earn $50,000 in Austin (COL index 93), you'd need about $72,000 in NYC (COL index 136) to maintain the same lifestyle."
  },
  {
    question: "Which US cities have the lowest cost of living?",
    answer: "Cities in the Midwest and South typically have the lowest costs. Cities like Oklahoma City, Memphis, Tulsa, and El Paso have cost of living indices 15-25% below the national average."
  }
];

export default function CostOfLivingPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={{ ratingValue: 4.7, ratingCount: 2134 }}
        featureList={["City Comparison", "Cost Breakdown", "Salary Adjustment"]}
      />
      <FAQSchema questions={costFAQs} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: toolName },
          ]}
        />
      </div>
      <CostOfLivingClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('cost-of-living', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "cost-of-living",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
