import { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Tax Calculator for Gig Workers | 1099 & W-2 Calculator",
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
  openGraph: {
    title: "Tax Calculator for Gig Workers | Indeed Flex",
    description: "Free tax calculator for 1099 contractors and gig workers. Estimate federal, state, and self-employment taxes.",
    type: "website",
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
        name="Indeed Flex Tax Calculator"
        description="Free tax calculator for 1099 contractors and gig workers. Estimate federal, state, and self-employment taxes with deduction tracking."
        url="https://indeedflex.com/career-hub/tools/tax-calculator"
        applicationCategory="FinanceApplication"
        featureList={[
          "1099 and W-2 tax calculation",
          "Self-employment tax estimates",
          "All 50 US states supported",
          "Mileage deduction calculator",
          "Quarterly payment schedule"
        ]}
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 1923
        }}
      />
      <FAQSchema questions={taxFAQs} />
      <TaxCalculatorClient />
    </>
  );
}
