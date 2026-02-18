import { Metadata } from "next";
import RolesClient from "./RolesClient";

export const metadata: Metadata = {
  title: "Flexible Work Roles",
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
};

export default function RolesPage() {
  return <RolesClient />;
}

