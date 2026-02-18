import { Metadata } from "next";
import TakeHomePayClient from "./TakeHomePayClient";
import { getToolBySlug } from "@/lib/data/tool-registry";

const tool = getToolBySlug('take-home-pay')!;

export const metadata: Metadata = {
  title: `${tool.name} - See Your Actual Net Pay 2026`,
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/tools/take-home-pay",
  },
  openGraph: {
    title: `${tool.name} - Indeed Flex`,
    description: tool.shortDescription,
    url: "https://indeedflex.com/career-hub/tools/take-home-pay",
    type: "website",
  },
};

export default function TakeHomePayPage() {
  return <TakeHomePayClient />;
}

