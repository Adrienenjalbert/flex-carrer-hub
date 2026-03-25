import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import CocktailQuizClient from "./CocktailQuizClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Cocktail Quiz";
const toolDescription = "Test your knowledge of classic cocktails. Learn ingredients, techniques, and recipes for bartending success.";
const canonical = "https://indeedflex.com/career-hub/tools/cocktail-quiz";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "cocktail-quiz",
  description: toolDescription,
  keywords: [
    "cocktail quiz",
    "bartending test",
    "drink recipes",
    "mixology",
    "bartender training",
    "cocktail ingredients",
  ],
});

export default function CocktailQuizPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "cocktail-quiz", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <CocktailQuizClient />
    </StandardPageLayout>
  );
}
