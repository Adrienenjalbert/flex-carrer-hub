import { Metadata } from "next";
import JobOfferAnalyzerClient from "./JobOfferAnalyzerClient";

export const metadata: Metadata = {
  title: "Job Offer Analyzer | Compare Job Offers",
  description:
    "Compare job offers side by side. Analyze total compensation including hourly rate, benefits, commute costs, and growth potential.",
  keywords: [
    "job offer comparison",
    "salary comparison",
    "job analyzer",
    "compensation calculator",
    "job decision",
    "offer evaluation",
  ],
};

export default function JobOfferAnalyzerPage() {
  return <JobOfferAnalyzerClient />;
}

