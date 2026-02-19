import { Metadata } from "next";
import ToolsClient from "./ToolsClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Career Tools & Calculators | Indeed Flex Career Hub",
  description:
    "Free career tools and calculators for hourly workers. Calculate pay, compare jobs, estimate taxes, and plan your career with Indeed Flex tools.",
  keywords: [
    "pay calculator",
    "salary calculator",
    "tax calculator",
    "job comparison tool",
    "career tools",
    "hourly wage calculator",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/tools",
  },
  openGraph: {
    title: "Career Tools & Calculators | Indeed Flex Career Hub",
    description: "Free career tools and calculators for hourly workers. Calculate pay, compare jobs, estimate taxes, and plan your career.",
    url: "https://indeedflex.com/career-hub/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Tools & Calculators",
    description: "Free career tools and calculators for hourly workers.",
  },
};

export default function ToolsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Tools" }]} />
      </div>
      <ToolsClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "tool" }} />
      </div>
      <CTASection />
    </>
  );
}
