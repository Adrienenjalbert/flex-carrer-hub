import { Metadata } from "next";
import dynamic from "next/dynamic";

const ToolsClient = dynamic(() => import("./ToolsClient"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Career Tools & Calculators",
  description: "Free career tools and calculators for hourly workers. Calculate pay, compare jobs, estimate taxes, and plan your career with Indeed Flex tools.",
  keywords: [
    "pay calculator",
    "salary calculator",
    "tax calculator",
    "job comparison tool",
    "career tools",
    "hourly wage calculator",
  ],
};

export default function ToolsPage() {
  return <ToolsClient />;
}

