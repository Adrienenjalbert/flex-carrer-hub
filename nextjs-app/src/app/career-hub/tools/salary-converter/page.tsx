import { Metadata } from "next";
import SalaryConverterClient from "./SalaryConverterClient";
import { getToolBySlug } from "@/lib/data/tool-registry";

const tool = getToolBySlug('salary-converter')!;

export const metadata: Metadata = {
  title: `${tool.name} - Hourly to Salary Calculator 2026`,
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/tools/salary-converter",
  },
  openGraph: {
    title: `${tool.name} - Indeed Flex`,
    description: tool.shortDescription,
    url: "https://indeedflex.com/career-hub/tools/salary-converter",
    type: "website",
  },
};

export default function SalaryConverterPage() {
  return <SalaryConverterClient />;
}

