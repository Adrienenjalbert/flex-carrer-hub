import { Metadata } from "next";
import UnemploymentCalculatorClient from "./UnemploymentCalculatorClient";

export const metadata: Metadata = {
  title: "Unemployment Benefits Calculator | Estimate Your Benefits",
  description:
    "Calculate your potential unemployment benefits by state. See weekly benefit amounts, duration, and eligibility requirements.",
  keywords: [
    "unemployment calculator",
    "unemployment benefits",
    "weekly benefit amount",
    "unemployment insurance",
    "UI benefits",
    "state unemployment",
  ],
};

export default function UnemploymentCalculatorPage() {
  return <UnemploymentCalculatorClient />;
}

