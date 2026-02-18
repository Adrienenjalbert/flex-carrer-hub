import { Metadata } from "next";
import BenefitsCheckerClient from "./BenefitsCheckerClient";

export const metadata: Metadata = {
  title: "Benefits Eligibility Checker | See What You Qualify For",
  description:
    "Check your eligibility for benefits as a flexible worker. See what healthcare, unemployment, and assistance programs you may qualify for.",
  keywords: [
    "benefits eligibility",
    "healthcare eligibility",
    "gig worker benefits",
    "ACA eligibility",
    "worker benefits",
    "assistance programs",
  ],
};

export default function BenefitsCheckerPage() {
  return <BenefitsCheckerClient />;
}

