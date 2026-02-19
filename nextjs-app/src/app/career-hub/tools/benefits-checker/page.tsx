import { Metadata } from "next";
import BenefitsCheckerClient from "./BenefitsCheckerClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Benefits Eligibility Checker";
const toolDescription = "Check your eligibility for benefits as a flexible worker. See what healthcare, unemployment, and assistance programs you may qualify for.";
const canonical = "https://indeedflex.com/career-hub/tools/benefits-checker";

export const metadata: Metadata = {
  title: "Benefits Eligibility Checker | See What You Qualify For | Indeed Flex",
  description:
    "Check your eligibility for benefits as a flexible worker. See what healthcare, unemployment, and assistance programs you may qualify for.",
  keywords: [
    "benefits eligibility",
    "healthcare eligibility",
    "gig worker benefits",
    "ACA eligibility",
    "worker benefits",
    "assistance programs",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Benefits Eligibility Checker | See What You Qualify For",
    description: "Check your eligibility for benefits as a flexible worker.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefits Eligibility Checker",
    description: "Check your eligibility for benefits as a flexible worker.",
  },
};

export default function BenefitsCheckerPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: toolName },
          ]}
        />
      </div>
      <BenefitsCheckerClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "benefits-checker",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
