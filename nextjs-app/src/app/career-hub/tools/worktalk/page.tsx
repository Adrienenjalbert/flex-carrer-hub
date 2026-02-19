import { Metadata } from "next";
import WorkTalkClient from "./WorkTalkClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "WorkTalk";
const toolDescription = "Learn and practice essential English phrases for the workplace. Build confidence with flashcards for common job situations.";
const canonical = "https://indeedflex.com/career-hub/tools/worktalk";

export const metadata: Metadata = {
  title: "WorkTalk | Practice Job English Phrases | Indeed Flex",
  description:
    "Learn and practice essential English phrases for the workplace. Build confidence with flashcards for common job situations.",
  keywords: [
    "workplace English",
    "job phrases",
    "English flashcards",
    "work vocabulary",
    "ESL work",
    "professional English",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "WorkTalk | Practice Job English Phrases",
    description: "Learn and practice essential English phrases for the workplace.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkTalk",
    description: "Learn and practice essential English phrases for the workplace.",
  },
};

export default function WorkTalkPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
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
      <WorkTalkClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "worktalk",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
