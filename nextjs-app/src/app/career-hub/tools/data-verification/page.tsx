import { Metadata } from "next";
import DataVerificationClient from "./DataVerificationClient";

export const metadata: Metadata = {
  title: "Data Verification | Check Our Sources",
  description:
    "Verify the data sources and methodology behind our career tools. Transparency about where our salary, cost of living, and job market data comes from.",
  keywords: [
    "data sources",
    "methodology",
    "salary data",
    "verification",
    "transparency",
    "data accuracy",
  ],
};

export default function DataVerificationPage() {
  return <DataVerificationClient />;
}

