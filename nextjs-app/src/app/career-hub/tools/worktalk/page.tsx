import { Metadata } from "next";
import { generateToolMetadata } from "@/lib/seo/metadata";
import WorkTalkClient from "./WorkTalkClient";
import { SoftwareApplicationSchema } from "@/components/career-hub/seo";
import StandardPageLayout from "@/components/career-hub/layout/StandardPageLayout";

const toolName = "WorkTalk";
const toolDescription = "Learn and practice essential English phrases for the workplace. Build confidence with flashcards for common job situations.";
const canonical = "https://indeedflex.com/career-hub/tools/worktalk";

export const metadata: Metadata = generateToolMetadata({
  name: toolName,
  slug: "worktalk",
  description: toolDescription,
  keywords: [
    "workplace English",
    "job phrases",
    "English flashcards",
    "work vocabulary",
    "ESL work",
    "professional English",
  ],
});

export default function WorkTalkPage() {
  return (
    <StandardPageLayout
      showBreadcrumbs={false}
      currentPage={{ type: "tool", slug: "worktalk", relatedTools: [] }}
    >
      <SoftwareApplicationSchema
        name={toolName}
        description={toolDescription}
        url={canonical}
        applicationCategory="EducationalApplication"
        aggregateRating={undefined}
        featureList={[]}
      />
      <WorkTalkClient />
    </StandardPageLayout>
  );
}
