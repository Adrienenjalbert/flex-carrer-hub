import { Metadata } from "next";
import RolesClient from "./RolesClient";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import { InternalLinkHub } from "@/components/career-hub/InternalLinkHub";

export const metadata: Metadata = {
  title: "Temp & Flexible Job Roles | Indeed Flex Career Hub",
  description: "Browse 40+ temporary, part-time, and flexible job roles across hospitality, warehouse, retail, and more. Compare hourly pay ($12-$30/hr), skills needed, and career paths.",
  keywords: [
    "temp jobs",
    "temporary jobs",
    "flexible jobs",
    "part time jobs",
    "hourly work roles",
    "warehouse jobs",
    "hospitality jobs",
    "retail jobs",
    "seasonal jobs",
  ],
  alternates: {
    canonical: "https://indeedflex.com/career-hub/roles",
  },
  openGraph: {
    title: "Temp & Flexible Job Roles | Indeed Flex Career Hub",
    description: "Browse 40+ temporary, part-time, and flexible job roles. Compare hourly pay, skills, and career paths.",
    url: "https://indeedflex.com/career-hub/roles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temp & Flexible Job Roles",
    description: "Browse temporary and flexible job roles across hospitality, warehouse, retail, and more.",
  },
};

export default function RolesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Career Hub", href: "/career-hub" },
            { label: "Roles" },
          ]}
        />
      </div>
      <RolesClient />
      <div className="container mx-auto px-4 py-12">
        <InternalLinkHub variant="full" currentPage={{ type: "role" }} />
      </div>
      <CTASection />
    </>
  );
}

