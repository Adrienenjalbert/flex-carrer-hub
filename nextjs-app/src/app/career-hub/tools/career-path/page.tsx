import { Metadata } from "next";
import CareerPathClient from "./CareerPathClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Career Path Explorer";
const toolDescription = "Explore career progression paths from entry-level to management. See salary ranges, required skills, and timelines for advancement.";
const canonical = "https://indeedflex.com/career-hub/tools/career-path";

export const metadata: Metadata = {
  title: "Career Path Explorer | Visualize Your Growth | Indeed Flex",
  description:
    "Explore career progression paths from entry-level to management. See salary ranges, required skills, and timelines for advancement.",
  keywords: [
    "career path",
    "career progression",
    "job advancement",
    "salary growth",
    "career planning",
    "management career",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Career Path Explorer | Visualize Your Growth",
    description: "Explore career progression paths from entry-level to management.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Path Explorer",
    description: "Explore career progression paths from entry-level to management.",
  },
};

export default function CareerPathPage() {
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
      <CareerPathClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "career-path",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
