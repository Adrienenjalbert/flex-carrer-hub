import { Metadata } from "next";
import ChildcareCalculatorClient from "./ChildcareCalculatorClient";

export const metadata: Metadata = {
  title: "Childcare Cost Calculator | Plan Your Work Schedule",
  description:
    "Calculate childcare costs vs. work income. See if working makes financial sense after childcare expenses in your city.",
  keywords: [
    "childcare calculator",
    "daycare costs",
    "working parent",
    "childcare expenses",
    "work income calculator",
    "daycare vs work",
  ],
};

export default function ChildcareCalculatorPage() {
  return <ChildcareCalculatorClient />;
}

