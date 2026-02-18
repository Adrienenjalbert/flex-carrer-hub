import { Metadata } from "next";
import CertificationROIClient from "./CertificationROIClient";

export const metadata: Metadata = {
  title: "Certification ROI Calculator | Is It Worth It?",
  description:
    "Calculate the return on investment for professional certifications. See how long it takes to recoup costs through higher pay.",
  keywords: [
    "certification ROI",
    "certification calculator",
    "training investment",
    "career certification",
    "certification payback",
    "professional development",
  ],
};

export default function CertificationROIPage() {
  return <CertificationROIClient />;
}

