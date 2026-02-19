import { Metadata } from "next";
import CocktailQuizClient from "./CocktailQuizClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

const toolName = "Cocktail Quiz";
const toolDescription = "Test your knowledge of classic cocktails. Learn ingredients, techniques, and recipes for bartending success.";
const canonical = "https://indeedflex.com/career-hub/tools/cocktail-quiz";

export const metadata: Metadata = {
  title: "Cocktail Quiz | Test Your Bartending Knowledge | Indeed Flex",
  description:
    "Test your knowledge of classic cocktails. Learn ingredients, techniques, and recipes for bartending success.",
  keywords: [
    "cocktail quiz",
    "bartending test",
    "drink recipes",
    "mixology",
    "bartender training",
    "cocktail ingredients",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Cocktail Quiz | Test Your Bartending Knowledge",
    description: "Test your knowledge of classic cocktails.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocktail Quiz",
    description: "Test your knowledge of classic cocktails.",
  },
};

export default function CocktailQuizPage() {
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
      <CocktailQuizClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "cocktail-quiz",
            relatedTools: []
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
