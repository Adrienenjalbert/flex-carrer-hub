import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import TaxCalculatorClient from "./TaxCalculatorClient";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getToolBySlug } from "@/lib/data/tool-registry";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('tax-calculator')!;
const canonical = "https://indeedflex.com/career-hub/tools/tax-calculator";

export const metadata: Metadata = generateToolMetadata({
  name: tool.name,
  slug: "tax-calculator",
  description: tool.description,
  keywords: [
    "1099 tax calculator",
    "quarterly estimated tax",
    "self employment tax calculator",
    "gig worker taxes",
    "self-employment tax",
    "quarterly taxes",
    "freelance taxes",
    "state income tax",
    "tax withholding",
  ],
});

const taxFAQs = [
  {
    question: "How much should I set aside for taxes as a 1099 worker?",
    answer: "As a 1099 worker, you should typically set aside 25-30% of your income for taxes. This covers both income tax and the 15.3% self-employment tax (Social Security and Medicare)."
  },
  {
    question: "What is the self-employment tax rate?",
    answer: "The self-employment tax rate is 15.3%, which includes 12.4% for Social Security and 2.9% for Medicare. You can deduct half of this on your income taxes."
  },
  {
    question: "When are quarterly taxes due for gig workers?",
    answer: "Quarterly estimated taxes are due: April 15 (Q1), June 15 (Q2), September 15 (Q3), and January 15 (Q4). Missing these deadlines may result in penalties."
  },
  {
    question: "Can I deduct mileage as a gig worker?",
    answer: "Yes. The IRS standard mileage rate changes annually, so you should use the current rate for the tax year you are filing. Track all work-related miles to maximize your deduction."
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
        aggregateRating={tool.schema?.aggregateRating}
        featureList={tool.inputs.map(i => i.name)}
      />
      <FAQSchema questions={taxFAQs} />
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
