import { LucideIcon } from "lucide-react";

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  readTime: string;
  description: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  relatedArticles: string[];
  lastReviewed?: string;
  dateModified?: string;
  primaryKeyword?: string;
  searchIntent?: 'informational' | 'how-to' | 'comparison' | 'transactional';
  sources?: { name: string; url: string; tier: 1 | 2 | 3 | 4; lastAccessed: string }[];
  targetPersonas?: string[];
}

export interface GuideCategory {
  category: string;
  slug: string;
  icon: LucideIcon;
  articles: { title: string; slug: string; readTime: string }[];
}
