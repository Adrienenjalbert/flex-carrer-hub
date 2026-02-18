import { Metadata } from "next";
import PayCalculatorClient from "./PayCalculatorClient";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Pay Calculator - Calculate Your Take-Home Pay",
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
  openGraph: {
    title: "Pay Calculator - Calculate Your Take-Home Pay | Indeed Flex",
    description: "Free paycheck calculator for hourly workers. Calculate your take-home pay after taxes.",
    type: "website",
    url: "https://indeedflex.com/career-hub/tools/pay-calculator",
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
        name="Indeed Flex Pay Calculator"
        description="Free paycheck calculator for hourly workers. Calculate your take-home pay, taxes, and deductions. Convert hourly wage to annual salary."
        url="https://indeedflex.com/career-hub/tools/pay-calculator"
        applicationCategory="FinanceApplication"
        featureList={[
          "Federal and state tax calculation",
          "Hourly to salary conversion",
          "Overtime pay calculation",
          "All 50 US states supported",
          "Real-time net pay updates"
        ]}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 2847
        }}
      />
      <FAQSchema questions={toolFAQs} />
      <PayCalculatorClient />
    </>
  );
}
