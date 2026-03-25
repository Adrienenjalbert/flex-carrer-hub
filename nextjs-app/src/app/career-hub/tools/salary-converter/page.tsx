import { Metadata } from "next";
import SalaryConverterClient from "./SalaryConverterClient";
import { getToolBySlug } from "@/lib/data/tool-registry";
import { generateToolMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('salary-converter')!;
const canonical = "https://indeedflex.com/career-hub/tools/salary-converter";

export const metadata: Metadata = generateToolMetadata({
  name: tool.name,
  slug: "salary-converter",
  description: tool.description,
  keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
});

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
            { label: "Career Hub", href: "/career-hub" },
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

