import { Metadata } from "next";
import CostOfLivingClient from "./CostOfLivingClient";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Cost of Living Comparison | Compare US Cities",
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
  openGraph: {
    title: "Cost of Living Comparison | Indeed Flex",
    description: "Compare cost of living across US cities. Make informed relocation decisions.",
    type: "website",
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
        name="Indeed Flex Cost of Living Calculator"
        description="Compare cost of living between US cities. Make informed decisions about relocation with detailed expense breakdowns."
        url="https://indeedflex.com/career-hub/tools/cost-of-living"
        applicationCategory="FinanceApplication"
        featureList={[
          "50+ US cities comparison",
          "Salary equivalent calculator",
          "Housing cost breakdown",
          "Expense category analysis",
          "Interactive charts"
        ]}
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 2134
        }}
      />
      <FAQSchema questions={costFAQs} />
      <CostOfLivingClient />
    </>
  );
}
