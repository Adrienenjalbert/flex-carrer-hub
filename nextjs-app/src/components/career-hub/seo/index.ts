// SEO Components Export
export {
  JobPostingSchema,
  OccupationSchema,
  FAQSchema,
  ArticleSchema,
  HowToSchema,
  LocalBusinessSchema,
  BreadcrumbSchema,
  AggregateRatingSchema,
  WebPageSchema,
  SoftwareApplicationSchema,
  CreativeWorkSchema,
  CollectionPageSchema,
  ItemListSchema,
  EmployerAggregateRatingSchema,
} from "./EnhancedSchema";

// Re-export metadata helpers from lib
export {
  generateSEOMetadata,
  calculateReadingTime,
  generateKeywords,
} from "@/lib/seo/metadata";
