import { Metadata } from "next";
import SalaryConverterClient from "./SalaryConverterClient";
import { getToolBySlug } from "@/lib/data/tool-registry";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('salary-converter')!;
const canonical = "https://indeedflex.com/career-hub/tools/salary-converter";

export const metadata: Metadata = {
  title: `${tool.name} - Hourly to Salary Calculator 2026 | Indeed Flex`,
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
  alternates: {
    canonical,
  },
  openGraph: {
    title: `${tool.name} - Hourly to Salary Calculator 2026`,
    description: tool.shortDescription,
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tool.name} - Hourly to Salary Calculator`,
    description: tool.shortDescription,
  },
};

export default function SalaryConverterPage() {
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
      <SalaryConverterClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('salary-converter', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "salary-converter",
            relatedTools: tool.relatedTools
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}

