import { FileText } from "lucide-react";
import { Article, GuideCategory } from "./types";
import { jobApplicationArticles } from "../job-application-articles";
import { guideArticles } from "./articles";
import { guideCategories } from "./categories";

export type { ArticleSection, Article, GuideCategory } from "./types";
export { guideArticles } from "./articles";
export { guideCategories } from "./categories";

export const allGuideArticles: Record<string, Article> = {
  ...guideArticles,
  ...jobApplicationArticles,
};

export const jobApplicationCategory: GuideCategory = {
  category: "Job Application & Resume",
  slug: "job-application",
  icon: FileText,
  articles: [
    { title: "Resume for Freshers 2026: Step-by-Step Guide", slug: "fresher-resume-guide", readTime: "15 min" },
    { title: "Student Resume Template", slug: "student-resume-template", readTime: "12 min" },
    { title: "How to Get Hired With Zero Experience", slug: "zero-experience-jobs", readTime: "10 min" },
    { title: "Transferable Skills for Your First Resume", slug: "transferable-skills-guide", readTime: "12 min" },
    { title: "Best Free Resume Builders 2026", slug: "best-resume-builders-2026", readTime: "18 min" },
    { title: "Best Job Boards by Industry 2026", slug: "best-job-boards-2026", readTime: "16 min" },
    { title: "Indeed Flex vs Staffing Agencies", slug: "indeed-flex-vs-staffing-agencies", readTime: "14 min" },
    { title: "Warehouse Interview Questions 2026", slug: "warehouse-interview-questions", readTime: "18 min" },
    { title: "Hospitality Interview Questions 2026", slug: "hospitality-interview-questions", readTime: "18 min" },
    { title: "Temp to Permanent Guide", slug: "temp-to-permanent-guide", readTime: "12 min" },
    { title: "ATS Resume Tips: Beat the Bots", slug: "ats-resume-tips", readTime: "12 min" },
    { title: "Reverse Chronological Resume Guide", slug: "reverse-chronological-resume", readTime: "10 min" },
    { title: "Chronological vs Functional Resume", slug: "chronological-vs-functional", readTime: "10 min" },
    { title: "Canva Resume Builder ATS Guide", slug: "canva-resume-builder-ats", readTime: "10 min" },
    { title: "Zety Alternatives: Free Options", slug: "zety-alternative", readTime: "10 min" },
    { title: "Resume Genius Alternatives", slug: "resume-genius-alternative", readTime: "10 min" },
    { title: "Indeed Flex vs Instawork", slug: "indeed-flex-vs-instawork", readTime: "10 min" },
    { title: "Indeed Flex vs Wonolo", slug: "indeed-flex-vs-wonolo", readTime: "9 min" },
  ]
};

export const allGuideCategories: GuideCategory[] = [
  ...guideCategories,
  jobApplicationCategory,
];
