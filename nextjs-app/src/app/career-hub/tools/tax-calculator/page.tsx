import { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getToolBySlug } from "@/lib/data/tool-registry";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('tax-calculator')!;
const canonical = "https://indeedflex.com/career-hub/tools/tax-calculator";

export const metadata: Metadata = {
  title: "Tax Calculator for Gig Workers | 1099 & W-2 Calculator | Indeed Flex",
  description:
    "Calculate your taxes as a gig worker or 1099 contractor. Estimate federal, state, and self-employment taxes with deductions for mileage and expenses.",
  keywords: [
    "tax calculator",
    "1099 taxes",
    "self-employment tax",
    "gig worker taxes",
    "quarterly taxes",
    "freelance taxes",
    "state income tax",
    "tax withholding",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Tax Calculator for Gig Workers | 1099 & W-2 Calculator",
    description: "Free tax calculator for 1099 contractors and gig workers. Estimate federal, state, and self-employment taxes.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Calculator for Gig Workers",
    description: "Free tax calculator for 1099 contractors and gig workers.",
  },
};

const taxFAQs = [
  {
    question: "How much should I set aside for taxes as a 1099 worker?",
    answer: "As a 1099 worker, you should typically set aside 25-30% of your income for taxes. This covers both income tax and the 15.3% self-employment tax (Social Security and Medicare)."
  },
  {
    question: "What is the self-employment tax rate for 2024?",
    answer: "The self-employment tax rate for 2024 is 15.3%, which includes 12.4% for Social Security and 2.9% for Medicare. You can deduct half of this on your income taxes."
  },
  {
    question: "When are quarterly taxes due for gig workers?",
    answer: "Quarterly estimated taxes are due: April 15 (Q1), June 15 (Q2), September 15 (Q3), and January 15 (Q4). Missing these deadlines may result in penalties."
  },
  {
    question: "Can I deduct mileage as a gig worker?",
    answer: "Yes! For 2024, the IRS standard mileage rate is 67 cents per mile for business use. Track all work-related miles to maximize your deduction."
  }
];

export default function TaxCalculatorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={tool.name}
        description={tool.description}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={tool.schema?.aggregateRating || {
          ratingValue: 4.7,
          ratingCount: 1923
        }}
        featureList={tool.inputs.map(i => i.name)}
      />
      <FAQSchema questions={taxFAQs} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: tool.name },
          ]}
        />
      </div>
      <TaxCalculatorClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('tax-calculator', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "tax-calculator",
            relatedTools: tool.relatedTools
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
