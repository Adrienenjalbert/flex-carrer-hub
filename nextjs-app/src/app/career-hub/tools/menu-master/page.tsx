import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import MenuMasterClient from "./MenuMasterClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "Menu Master";
const toolDescription = "Master culinary terminology with flashcards. Learn cooking terms, techniques, and menu vocabulary for restaurant work.";
const canonical = "https://indeedflex.com/career-hub/tools/menu-master";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "menu-master",
  description: toolDescription,
  keywords: [
    "culinary terms",
    "menu vocabulary",
    "restaurant training",
    "cooking terms",
    "food terminology",
    "server training",
  ],
});

export default function MenuMasterPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "menu-master", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <MenuMasterClient />
    </StandardPageLayout>
  );
}
