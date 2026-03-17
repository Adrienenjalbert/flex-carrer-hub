/**
 * Content Engine Type Definitions
 *
 * Shared interfaces used across the content engine pipeline:
 * quality scoring, research orchestration, content planning,
 * performance tracking, and decay detection.
 *
 * Quality scoring uses 6 deep dimensions:
 * Usefulness, Brand Tone, Data Accuracy, SEO Value, AEO Readiness, UX Quality
 */

// ============================================
// QUALITY SCORING — 6 Deep Dimensions
// ============================================

export interface UsefulnessScore {
  score: number;
  answerCompleteness: number;
  specificityPerSection: number[];
  avgSpecificity: number;
  actionabilityCount: number;
  redundantSections: string[];
  questionAnswerAlignment: number;
  personaMatch: string[];
  issues: string[];
}

export interface BrandToneScore {
  score: number;
  youLanguageRatio: number;
  aiSlopPatterns: string[];
  voiceWarmth: number;
  empowermentRatio: number;
  readingLevel: number;
  sentenceVariety: number;
  bannedPhrases: string[];
  emDashCount: number;
  issues: string[];
}

export interface DataAccuracyScore {
  score: number;
  citationDensity: number;
  totalClaims: number;
  citedClaims: number;
  uncitedClaims: string[];
  sourceFreshness: number;
  staleReferences: string[];
  brokenLinks: string[];
  issues: string[];
}

export interface SeoValueScore {
  score: number;
  titleLength: number;
  titleOk: boolean;
  metaDescLength: number;
  metaOk: boolean;
  keywordInTitle: boolean;
  keywordInH2Ratio: number;
  searchIntentMatch: boolean;
  internalLinkCount: number;
  internalLinkQuality: number;
  schemaCompleteness: number;
  freshnessSignal: boolean;
  issues: string[];
}

export interface AeoScore {
  score: number;
  answerFirst: boolean;
  questionH2s: number;
  totalH2s: number;
  directAnswers: number;
  faqCount: number;
  entityClarity: boolean;
  issues: string[];
}

export interface UxQualityScore {
  score: number;
  scannability: number;
  tableQuality: number;
  sectionBalance: number;
  ctaPresent: boolean;
  linkDistribution: number;
  paragraphLengthOk: boolean;
  issues: string[];
}

export interface QualityScore {
  slug: string;
  timestamp: string;
  usefulness: UsefulnessScore;
  brandTone: BrandToneScore;
  dataAccuracy: DataAccuracyScore;
  seoValue: SeoValueScore;
  aeo: AeoScore;
  uxQuality: UxQualityScore;
  composite: number;
  pass: boolean;
  actionNeeded: 'none' | 'minor-edits' | 'rewrite' | 'research-needed';
}

/** @deprecated Use UsefulnessScore, BrandToneScore, etc. instead */
export type BrandScore = BrandToneScore;
/** @deprecated Use SeoValueScore instead */
export type SeoScore = SeoValueScore;
/** @deprecated Use UxQualityScore instead */
export type DepthScore = UxQualityScore;
/** @deprecated Use BrandToneScore + DataAccuracyScore instead */
export interface CraftScore {
  contextual: boolean;
  real: number;
  actionable: boolean;
  fresh: boolean;
  trustworthy: boolean;
  score: number;
}

// ============================================
// ARTICLE METADATA (for quality scoring)
// ============================================

export interface ArticleSource {
  name: string;
  url: string;
  tier: 1 | 2 | 3 | 4;
  lastAccessed: string;
}

// ============================================
// RESEARCH & DISCOVERY
// ============================================

export interface OpportunityBrief {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchVolume: number;
  competition: number;
  cpc: number;
  topQuestions: string[];
  serpGaps: string[];
  existingCoverage: string[];
  personaMatch: string[];
  suggestedAngle: string;
  contentType: 'quick-answer' | 'standard' | 'deep-dive' | 'comparison';
  priority: 'high' | 'medium' | 'low';
  demandSignals: DemandSignal[];
}

export interface DemandSignal {
  source: 'semrush' | 'perplexity' | 'firecrawl' | 'search-console' | 'manual';
  signal: string;
  value: string;
  date: string;
}

export interface ResearchDossier {
  topic: string;
  contentType: 'financial' | 'pay-rights' | 'career-how-to' | 'comparison';
  facts: ResearchFact[];
  citations: Citation[];
  dataPoints: DataPoint[];
  caveats: string[];
  stateVariance: StateVariance[];
  competitorInsights: CompetitorInsight[];
  researchDate: string;
  researcher: string;
}

export interface ResearchFact {
  claim: string;
  source: string;
  sourceUrl: string;
  sourceDate: string;
  tier: 1 | 2 | 3 | 4;
  verified: boolean;
}

export interface Citation {
  text: string;
  sourceId: string;
  url: string;
  accessDate: string;
}

export interface DataPoint {
  label: string;
  value: string | number;
  unit?: string;
  source: string;
  context?: string;
}

export interface StateVariance {
  state: string;
  variation: string;
  source: string;
}

export interface CompetitorInsight {
  url: string;
  title: string;
  h2s: string[];
  wordCount: number;
  gaps: string[];
}

// ============================================
// CONTENT PLANNING
// ============================================

export interface ContentPlan {
  targetKeyword: string;
  secondaryKeywords: string[];
  persona: string;
  searchIntent: 'informational' | 'transactional' | 'navigational';
  contentType: 'quick-answer' | 'standard' | 'deep-dive' | 'comparison';
  lengthTarget: { min: number; max: number };
  h1: string;
  h2s: string[];
  suggestedH3s: Record<string, string[]>;
  aeoAngle: {
    leadAnswer: string;
    questionHeaders: string[];
    faqQuestions: string[];
  };
  schemaTypes: string[];
  internalLinkTargets: string[];
  relatedArticleCandidates: string[];
  toneNotes: string;
}

// ============================================
// PERFORMANCE TRACKING
// ============================================

export interface ContentPerformance {
  slug: string;
  lastChecked: string;
  organic: {
    clicks30d: number;
    impressions30d: number;
    ctr: number;
    avgPosition: number;
    trend: 'growing' | 'stable' | 'decaying';
  };
  quality: QualityScore;
  freshness: {
    lastReviewed: string;
    sourcesAge: number;
    freshnessScore: number;
  };
  healthScore: number;
  actionNeeded: 'none' | 'refresh-data' | 'rewrite' | 'new-research' | 'retire';
}

export interface DecaySignal {
  slug: string;
  signalType: 'traffic-drop' | 'position-drop' | 'stale-data' | 'low-quality' | 'new-competitor';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  detectedAt: string;
  suggestedAction: string;
}

export interface ContentQueueItem {
  slug?: string;
  topic?: string;
  action: 'new' | 'refresh' | 'rewrite' | 'optimize' | 'verify' | 'retire';
  priority: 'critical' | 'high' | 'medium' | 'low';
  reason: string;
  source: 'decay-detector' | 'scout' | 'manual' | 'scheduled';
  createdAt: string;
  assignedAgent?: string;
  status: 'queued' | 'in-progress' | 'completed' | 'failed';
}

// ============================================
// STRATEGY LEARNINGS
// ============================================

export interface StrategyLearning {
  id: string;
  pattern: string;
  evidence: string;
  confidence: 'low' | 'medium' | 'high';
  applicableTo: string[];
  discoveredAt: string;
  lastValidated: string;
}

export interface ContentStructurePerformance {
  structure: 'listicle' | 'deep-dive' | 'comparison' | 'how-to' | 'faq-heavy';
  avgTraffic30d: number;
  avgPosition: number;
  avgCtr: number;
  sampleSize: number;
}

// ============================================
// VERIFICATION
// ============================================

export interface VerificationReport {
  slug: string;
  checkedAt: string;
  staleData: StaleDataItem[];
  brokenSources: string[];
  changedFacts: ChangedFact[];
  overallConfidence: 'high' | 'medium' | 'low';
  actionNeeded: boolean;
}

export interface StaleDataItem {
  dataPoint: string;
  currentValue: string;
  sourceLastAccessed: string;
  ageInDays: number;
  needsUpdate: boolean;
}

export interface ChangedFact {
  claim: string;
  oldValue: string;
  newValue: string;
  source: string;
  verifiedAt: string;
}
