import { Metadata } from "next";
import ShiftPlannerClient from "./ShiftPlannerClient";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/career-hub/seo";

export const metadata: Metadata = {
  title: "Shift Income Planner | Calculate Your Weekly Earnings",
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
  openGraph: {
    title: "Shift Income Planner | Indeed Flex",
    description: "Plan and optimize your weekly shifts for maximum earnings.",
    type: "website",
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
        name="Indeed Flex Shift Income Planner"
        description="Plan your weekly earnings based on shifts, hourly rate, and tips. Optimize your flexible work schedule for maximum income."
        url="https://indeedflex.com/career-hub/tools/shift-planner"
        applicationCategory="BusinessApplication"
        featureList={[
          "Weekly shift planning",
          "Tip income estimation",
          "Overtime calculation",
          "Multiple job support",
          "Income goal tracking"
        ]}
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 1456
        }}
      />
      <FAQSchema questions={shiftFAQs} />
      <ShiftPlannerClient />
    </>
  );
}
