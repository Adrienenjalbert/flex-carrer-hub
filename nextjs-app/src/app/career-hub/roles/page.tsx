import { Metadata } from "next";
import dynamic from "next/dynamic";

const RolesClient = dynamic(() => import("./RolesClient"), {
  ssr: false,
});

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
};

export default function RolesPage() {
  return <RolesClient />;
}

