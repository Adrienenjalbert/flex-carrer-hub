import { Metadata } from "next";
import ShiftPlannerClient from "./ShiftPlannerClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";
import { AuthorByline } from "@/components/career-hub/AuthorByline";
import { getToolBySlug } from "@/lib/data/tool-registry";
import { getLastUpdated } from "@/lib/utils/date-variation";

const tool = getToolBySlug('shift-planner')!;
const canonical = "https://indeedflex.com/career-hub/tools/shift-planner";

export const metadata: Metadata = {
  title: "Shift Income Planner | Calculate Your Weekly Earnings | Indeed Flex",
  description:
    "Plan your weekly earnings based on shifts, hourly rate, and tips. See which shifts pay the most and optimize your flexible work schedule for maximum income.",
  keywords: [
    "shift planner",
    "income calculator",
    "weekly earnings",
    "tip calculator",
    "flexible work schedule",
    "hourly worker tools",
    "shift scheduling",
    "work hours calculator",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: "Shift Income Planner | Calculate Your Weekly Earnings",
    description: "Plan and optimize your weekly shifts for maximum earnings.",
    url: canonical,
    type: "website",
    siteName: "Indeed Flex Career Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Income Planner",
    description: "Plan and optimize your weekly shifts for maximum earnings.",
  },
};

const shiftFAQs = [
  {
    question: "How do I calculate my total weekly earnings with tips?",
    answer: "Enter your hourly rate, expected tip percentage, and planned shifts. The calculator totals your base pay plus estimated tips for each shift, showing your projected weekly income."
  },
  {
    question: "Which shifts typically pay the most?",
    answer: "Weekend evening shifts (Friday-Saturday dinner) typically offer the highest earnings due to increased customer volume and higher tips. Holiday shifts often pay premium rates (1.5x-2x)."
  },
  {
    question: "How many hours can I legally work in a week?",
    answer: "There's no federal limit on weekly hours for adults, but employers must pay overtime (1.5x) for hours over 40. Some states have stricter rules and rest period requirements."
  }
];

export default function ShiftPlannerPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name={tool.name}
        description={tool.description}
        url={canonical}
        applicationCategory="BusinessApplication"
        aggregateRating={tool.schema?.aggregateRating || {
          ratingValue: 4.6,
          ratingCount: 1456
        }}
        featureList={tool.inputs.map(i => i.name)}
      />
      <FAQSchema questions={shiftFAQs} />
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: tool.name },
          ]}
        />
      </div>
      <ShiftPlannerClient />
      <div className="container mx-auto px-4 py-8">
        <AuthorByline
          contentType="tool"
          lastUpdated={getLastUpdated('shift-planner', 'tool')}
          variant="block"
        />
      </div>
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub 
          variant="full" 
          currentPage={{ 
            type: "tool", 
            slug: "shift-planner",
            relatedTools: tool.relatedTools
          }} 
        />
      </div>
      <CTASection />
    </>
  );
}
