import { Metadata } from "next";
import RolesClient from "./RolesClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Flexible Work Roles | Indeed Flex Career Hub",
  description: "Explore flexible hourly work roles across hospitality, warehouse, retail, events, and more. Find the right job for your skills.",
  keywords: [
    "flexible jobs",
    "hourly work roles",
    "temp jobs",
    "warehouse jobs",
    "hospitality jobs",
    "retail jobs",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/roles",
  },
  openGraph: {
    title: "Flexible Work Roles | Indeed Flex Career Hub",
    description: "Explore flexible hourly work roles across hospitality, warehouse, retail, events, and more.",
    url: "https://indeedflex.com/career-hub/roles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexible Work Roles",
    description: "Explore flexible hourly work roles across multiple industries.",
  },
};

export default function RolesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Roles" }]} />
      </div>
      <RolesClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "role" }} />
      </div>
      <CTASection />
    </>
  );
}

