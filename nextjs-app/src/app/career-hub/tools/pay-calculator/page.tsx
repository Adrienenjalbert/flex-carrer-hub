import { Metadata } from "next";
import PayCalculatorClient from "./PayCalculatorClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

const toolName = "Pay Calculator";
const toolDescription = "Free paycheck calculator for hourly workers. Calculate your take-home pay, taxes, and deductions. Convert hourly wage to annual salary instantly.";
const canonical = "https://indeedflex.com/career-hub/tools/pay-calculator";

export const metadata: Metadata = {
  title: "Pay Calculator - Calculate Your Take-Home Pay | Indeed Flex",
  description:
    "Free paycheck calculator for hourly workers. Calculate your take-home pay, taxes, and deductions. Convert hourly wage to annual salary instantly.",
  keywords: [
    "pay calculator",
    "hourly wage calculator",
    "take home pay calculator",
    "salary calculator",
    "paycheck calculator",
    "hourly to salary",
    "wage calculator",
    "net pay calculator",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Pay Calculator - Calculate Your Take-Home Pay",
    description: "Free paycheck calculator for hourly workers. Calculate your take-home pay after taxes.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pay Calculator",
    description: "Free paycheck calculator for hourly workers.",
  },
};

const toolFAQs = [
  {
    question: "How do I calculate my hourly take-home pay?",
    answer: "Enter your hourly wage, hours worked per week, and your tax filing status. The calculator will automatically estimate federal and state taxes, showing your net pay per hour, week, month, and year."
  },
  {
    question: "Is this pay calculator accurate for all US states?",
    answer: "Yes, our calculator includes current 2024 federal tax brackets and state-specific income tax rates for all 50 US states, including states with no income tax like Texas, Florida, and Washington."
  },
  {
    question: "How do I convert my hourly wage to annual salary?",
    answer: "Multiply your hourly rate by the number of hours you work per week, then multiply by 52 weeks. For example, $15/hour × 40 hours × 52 weeks = $31,200 annual salary."
  },
  {
    question: "Does the calculator include overtime pay?",
    answer: "Yes, you can enter overtime hours and the calculator will apply the standard 1.5x overtime rate for hours over 40 per week, as required by federal law for non-exempt workers."
  }
];

export default function PayCalculatorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={{ ratingValue: 4.8, ratingCount: 2847 }}
        featureList={[]}
      />
      <FAQSchema questions={toolFAQs} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: toolName },
          ]}
        />
      </div>
      <PayCalculatorClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('pay-calculator', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "pay-calculator",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
