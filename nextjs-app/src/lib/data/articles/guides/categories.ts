import { BookOpen, TrendingUp, Users, Award, Star, Calendar, FileCheck } from "lucide-react";
import { GuideCategory } from "./types";

export const guideCategories: GuideCategory[] = [
  {
    category: "Getting Started",
    slug: "getting-started",
    icon: BookOpen,
    articles: [
      { title: "Finding Flexible Work: Your Options Explained", slug: "first-flex-job", readTime: "8 min" },
      { title: "Indeed Flex: Everything You Need to Know", slug: "complete-guide", readTime: "8 min" },
      { title: "What to Expect on Your First Shift", slug: "first-shift", readTime: "4 min" },
      { title: "Building Your Worker Profile", slug: "worker-profile", readTime: "6 min" },
      { title: "W-2 vs 1099 for Temp Workers", slug: "w2-vs-1099-temp-workers", readTime: "10 min" },
      { title: "Your Rights as a Temp Worker", slug: "worker-rights-temp", readTime: "12 min" },
    ]
  },
  {
    category: "Career Growth",
    slug: "career-growth",
    icon: TrendingUp,
    articles: [
      { title: "From Entry-Level to Management: Career Paths", slug: "career-paths", readTime: "12 min" },
      { title: "Skills That Boost Your Hourly Rate: 2026 Certification Guide", slug: "skill-boost", readTime: "7 min" },
      { title: "Getting Certifications That Pay Off", slug: "certifications", readTime: "8 min" },
      { title: "How to Get More (and Better) Shifts", slug: "more-shifts", readTime: "6 min" },
      { title: "From Temp to Permanent: Making the Transition", slug: "temp-to-perm-guide", readTime: "9 min" },
    ]
  },
  {
    category: "Industry Guides",
    slug: "industry-guides",
    icon: Users,
    articles: [
      { title: "Breaking Into Hospitality Work", slug: "hospitality-guide", readTime: "9 min" },
      { title: "Warehouse Work: What You Need to Know", slug: "warehouse-guide", readTime: "8 min" },
      { title: "Retail Jobs: Tips for Success", slug: "retail-guide", readTime: "7 min" },
      { title: "Facilities & Cleaning Careers", slug: "facilities-guide", readTime: "6 min" },
      { title: "Warehouse Resume Guide", slug: "warehouse-resume-guide", readTime: "9 min" },
      { title: "Hospitality Resume Tips", slug: "hospitality-resume-tips", readTime: "8 min" },
    ]
  },
  {
    category: "Professional Development",
    slug: "professional-development",
    icon: Award,
    articles: [
      { title: "Building Your Professional Network", slug: "networking", readTime: "6 min" },
      { title: "Resume Tips for Hourly and Gig Workers: Stand Out in 2026", slug: "resume-tips", readTime: "5 min" },
      { title: "Interview Skills for Flex Work", slug: "interview-skills", readTime: "10 min" },
      { title: "Balancing Multiple Gigs", slug: "multiple-gigs", readTime: "8 min" },
      { title: "First Job Resume Template (No Experience)", slug: "first-job-resume-template", readTime: "8 min" },
    ]
  },
  {
    category: "Workplace Success",
    slug: "workplace-success",
    icon: Star,
    articles: [
      { title: "Your First 90 Days: Proving Yourself at Work", slug: "workplace-success", readTime: "8 min" },
      { title: "How to Get 5-Star Ratings on Every Shift", slug: "shift-rating-tips", readTime: "7 min" },
    ]
  },
  {
    category: "Seasonal & Event Hiring",
    slug: "seasonal-hiring",
    icon: Calendar,
    articles: [
      { title: "Holiday Warehouse Jobs 2026: Your Hiring Guide", slug: "holiday-warehouse-guide", readTime: "10 min" },
      { title: "How to Get Hired for Black Friday 2026", slug: "black-friday-hiring", readTime: "8 min" },
      { title: "Summer Hospitality Jobs: Peak Season Guide", slug: "summer-hospitality-guide", readTime: "8 min" },
      { title: "Part-Time Jobs for Students Fall 2026", slug: "student-jobs-fall", readTime: "7 min" },
      { title: "Event Staffing: Concerts, Sports & More", slug: "event-staffing-guide", readTime: "9 min" },
      { title: "Tax Season Jobs: 1099 Work Opportunities", slug: "tax-season-jobs", readTime: "6 min" },
    ]
  },
  {
    category: "Employment Eligibility",
    slug: "employment-eligibility",
    icon: FileCheck,
    articles: [
      { title: "Form I-9 Explained: A Guide for Workers", slug: "i9-complete-guide", readTime: "12 min" },
      { title: "Acceptable I-9 Documents: Lists A, B, C Explained", slug: "i9-documents-list", readTime: "8 min" },
      { title: "Working in America: First Job Guide", slug: "first-job-america-guide", readTime: "15 min" },
      { title: "Work Permit vs EAD: Work Authorization Types", slug: "work-authorization-types", readTime: "10 min" },
      { title: "Can I Work Without a Social Security Number?", slug: "work-without-ssn", readTime: "8 min" },
      { title: "E-Verify Explained: What Workers Need to Know", slug: "e-verify-explained", readTime: "7 min" },
    ]
  },
];
