import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
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

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "pay-calculator",
  description: toolDescription,
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
});

const toolFAQs = [
  {
    question: "How do I calculate my hourly take-home pay?",
    answer: "Enter your hourly wage, hours worked per week, and your tax filing status. The calculator will automatically estimate federal and state taxes, showing your net pay per hour, week, month, and year."
  },
  {
    question: "Is this pay calculator accurate for all US states?",
    answer: "Yes, our calculator uses the federal and state tax tables configured for supported US states, including no-income-tax states like Texas, Florida, and Washington."
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
        featureList={[]}
      />
      <FAQSchema questions={toolFAQs} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
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
