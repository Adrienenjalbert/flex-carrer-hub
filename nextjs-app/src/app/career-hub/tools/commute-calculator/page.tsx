import { Metadata } from "next";
import CommuteCalculatorClient from "./CommuteCalculatorClient";

export const metadata: Metadata = {
  title: "Commute Cost Calculator | True Cost of Your Commute",
  description:
    "Calculate the real cost of your commute including gas, car wear, parking, and time. See how commute affects your effective hourly rate.",
  keywords: [
    "commute calculator",
    "commute cost",
    "gas calculator",
    "travel expenses",
    "mileage calculator",
    "work commute",
  ],
};

export default function CommuteCalculatorPage() {
  return <CommuteCalculatorClient />;
}

