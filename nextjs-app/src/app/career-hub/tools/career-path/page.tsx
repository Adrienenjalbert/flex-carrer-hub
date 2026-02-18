import { Metadata } from "next";
import CareerPathClient from "./CareerPathClient";

export const metadata: Metadata = {
  title: "Career Path Explorer | Visualize Your Growth",
  description:
    "Explore career progression paths from entry-level to management. See salary ranges, required skills, and timelines for advancement.",
  keywords: [
    "career path",
    "career progression",
    "job advancement",
    "salary growth",
    "career planning",
    "management career",
  ],
};

export default function CareerPathPage() {
  return <CareerPathClient />;
}

