import { Metadata } from "next";
import SafetyFirstClient from "./SafetyFirstClient";

export const metadata: Metadata = {
  title: "Safety First | Workplace Safety Training",
  description:
    "Learn essential workplace safety procedures. Practice scenarios for warehouse, hospitality, and retail environments.",
  keywords: [
    "workplace safety",
    "safety training",
    "OSHA",
    "warehouse safety",
    "food safety",
    "safety quiz",
  ],
};

export default function SafetyFirstPage() {
  return <SafetyFirstClient />;
}

