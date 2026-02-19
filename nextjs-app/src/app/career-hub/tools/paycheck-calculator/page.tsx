import { Metadata } from "next";
import PaycheckCalculatorClient from "./PaycheckCalculatorClient";
import { getToolBySlug } from "@/lib/data/tool-registry";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('paycheck-calculator')!;
const canonical = "https://indeedflex.com/career-hub/tools/paycheck-calculator";

export const metadata: Metadata = {
  title: `${tool.name} - Free Take-Home Pay Calculator 2026 | Indeed Flex`,
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
  alternates: {
    canonical,
  },
  openGraph: {
    title: `${tool.name} - Free Take-Home Pay Calculator 2026`,
    description: tool.shortDescription,
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tool.name} - Free Take-Home Pay Calculator`,
    description: tool.shortDescription,
  },
};

export default function PaycheckCalculatorPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={tool.name}
        description={tool.description}
        url={canonical}
        applicationCategory="FinanceApplication"
        aggregateRating={tool.schema?.aggregateRating}
        featureList={tool.inputs.map(i => i.name)}
      />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: tool.name },
          ]}
        />
      </div>
      <PaycheckCalculatorClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('paycheck-calculator', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "paycheck-calculator",
            relatedTools: tool.relatedTools
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}

