import { Metadata } from "next";
import MenuMasterClient from "./MenuMasterClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Menu Master";
const toolDescription = "Master culinary terminology with flashcards. Learn cooking terms, techniques, and menu vocabulary for restaurant work.";
const canonical = "https://indeedflex.com/career-hub/tools/menu-master";

export const metadata: Metadata = {
  title: "Menu Master | Learn Culinary Terms | Indeed Flex",
  description:
    "Master culinary terminology with flashcards. Learn cooking terms, techniques, and menu vocabulary for restaurant work.",
  keywords: [
    "culinary terms",
    "menu vocabulary",
    "restaurant training",
    "cooking terms",
    "food terminology",
    "server training",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Menu Master | Learn Culinary Terms",
    description: "Master culinary terminology with flashcards.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu Master",
    description: "Master culinary terminology with flashcards.",
  },
};

export default function MenuMasterPage() {
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
      <MenuMasterClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "menu-master",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
