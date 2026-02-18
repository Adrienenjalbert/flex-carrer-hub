import { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Career Tools & Calculators | Indeed Flex Career Hub",
  description:
    "Free career tools and calculators for hourly workers. Calculate pay, compare jobs, estimate taxes, and plan your career with Indeed Flex tools.",
  keywords: [
    "pay calculator",
    "salary calculator",
    "tax calculator",
    "job comparison tool",
    "career tools",
    "hourly wage calculator",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/tools",
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
