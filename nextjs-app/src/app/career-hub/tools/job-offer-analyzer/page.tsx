import { Metadata } from "next";
import JobOfferAnalyzerClient from "./JobOfferAnalyzerClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Job Offer Analyzer";
const toolDescription = "Compare job offers side by side. Analyze total compensation including hourly rate, benefits, commute costs, and growth potential.";
const canonical = "https://indeedflex.com/career-hub/tools/job-offer-analyzer";

export const metadata: Metadata = {
  title: "Job Offer Analyzer | Compare Job Offers | Indeed Flex",
  description:
    "Compare job offers side by side. Analyze total compensation including hourly rate, benefits, commute costs, and growth potential.",
  keywords: [
    "job offer comparison",
    "salary comparison",
    "job analyzer",
    "compensation calculator",
    "job decision",
    "offer evaluation",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Job Offer Analyzer | Compare Job Offers",
    description: "Compare job offers side by side. Analyze total compensation.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Offer Analyzer",
    description: "Compare job offers side by side.",
  },
};

export default function JobOfferAnalyzerPage() {
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
      <JobOfferAnalyzerClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "job-offer-analyzer",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
