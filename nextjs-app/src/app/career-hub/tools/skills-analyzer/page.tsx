import { Metadata } from "next";
import SkillsAnalyzerClient from "./SkillsAnalyzerClient";

export const metadata: Metadata = {
  title: "Skills Analyzer | Discover Your Strengths",
  description:
    "Analyze your skills and discover which flexible jobs match your abilities. Get personalized career recommendations based on your experience.",
  keywords: [
    "skills analyzer",
    "career assessment",
    "job matching",
    "skills test",
    "career quiz",
    "job recommendations",
  ],
};

export default function SkillsAnalyzerPage() {
  return <SkillsAnalyzerClient />;
}

