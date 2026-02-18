import { Metadata } from "next";
import PaycheckCalculatorClient from "./PaycheckCalculatorClient";
import { getToolBySlug } from "@/lib/data/tool-registry";

const tool = getToolBySlug('paycheck-calculator')!;

export const metadata: Metadata = {
  title: `${tool.name} - Free Take-Home Pay Calculator 2026`,
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/tools/paycheck-calculator",
  },
  openGraph: {
    title: `${tool.name} - Indeed Flex`,
    description: tool.shortDescription,
    url: "https://indeedflex.com/career-hub/tools/paycheck-calculator",
    type: "website",
  },
};

export default function PaycheckCalculatorPage() {
  return <PaycheckCalculatorClient />;
}

