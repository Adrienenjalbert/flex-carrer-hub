/**
 * Wage Report Data Types
 * 
 * Core TypeScript interfaces for the Annual Wage Report.
 * Defines data structures for occupations, industries, regions, and insights.
 * 
 * Last Updated: February 2026
 */

// ============================================
// CORE DATA STRUCTURES
// ============================================

/**
 * BLS-style percentile wage data for an occupation
 */
export interface WagePercentiles {
  percentile10: number;  // 10th percentile (entry-level)
  percentile25: number;  // 25th percentile
  percentile50: number;  // Median (50th percentile)
  percentile75: number;  // 75th percentile
  percentile90: number;  // 90th percentile (experienced)
}

/**
 * Year-over-year comparison data
 */
export interface YoYComparison {
  year: number;
  median: number;
  employment: number;
  percentChange: number;      // Percentage change in median wage
  employmentChange: number;   // Change in employment count
  inflationAdjusted?: number; // Real wage (adjusted for inflation)
}

/**
 * Occupation wage data with historical comparison
 */
export interface OccupationWageData {
  occupationId: string;
  occupationSlug: string;
  occupationTitle: string;
  blsCode?: string;          // SOC code for credibility
  
  // Current year (2026) data
  currentYear: {
    wagePercentiles: WagePercentiles;
    employment: number;
    avgTips?: { min: number; max: number }; // For tipped roles
  };
  
  // Prior year (2025) for comparison
  priorYear?: {
    wagePercentiles: WagePercentiles;
    employment: number;
  };
  
  // Year-over-year changes
  yoyChange: {
    medianChange: number;        // Absolute dollar change
    percentChange: number;       // Percentage change
    employmentChange: number;   // Employment count change
    employmentPercentChange: number;
  };
  
  // Regional variations
  byRegion: RegionalWageData[];
  
  // Industry context
  industry: string;
  industrySlug: string;
  
  // Pre-computed insights
  insights: string[];
}

/**
 * Regional wage data with cost-of-living adjustments
 */
export interface RegionalWageData {
  region: string;
  stateCode: string;
  citySlug?: string;
  metroArea?: string;
  
  // Wage data
  median: number;
  percentile10: number;
  percentile90: number;
  
  // Cost of living adjustments
  costOfLivingIndex: number;    // 100 = national average
  adjustedMedian: number;        // COL-adjusted median wage
  purchasingPower: number;       // Relative purchasing power vs national avg
  
  // Employment data
  employment: number;
  employmentShare: number;       // Percentage of total occupation employment
}

/**
 * Industry-level trends and analysis
 */
export interface IndustryTrends {
  industryId: string;
  industryName: string;
  industrySlug: string;
  
  // Overall industry metrics
  totalEmployment: number;
  avgMedianWage: number;
  wageGrowth: number;            // YoY percentage
  
  // Top occupations in this industry
  topOccupations: {
    occupationSlug: string;
    occupationTitle: string;
    medianWage: number;
    employment: number;
    growth: number;
  }[];
  
  // Regional hotspots
  topRegions: {
    region: string;
    stateCode: string;
    avgWage: number;
    employment: number;
  }[];
  
  // Trends
  trends: {
    wageVelocity: number;         // Rate of wage growth
    demandSignal: 'very-high' | 'high' | 'medium' | 'low';
    seasonalPattern?: string;     // Peak hiring seasons
  };
  
  // Insights
  insights: string[];
}

/**
 * Pre-computed insight card for display
 */
export interface InsightCard {
  id: string;
  type: 'stat' | 'trend' | 'comparison' | 'recommendation';
  headline: string;
  value: string | number;
  context: string;               // Explanation of the insight
  source?: string;               // Data source citation
  actionLink?: string;           // Link to related content
  priority: 'high' | 'medium' | 'low';
}

/**
 * Trend analysis article data
 */
export interface TrendAnalysis {
  slug: string;
  title: string;
  shortDescription: string;
  
  // Key metrics
  keyMetrics: {
    label: string;
    value: string | number;
    change?: string;
    direction?: 'up' | 'down' | 'neutral';
  }[];
  
  // Data visualization data
  chartData: {
    type: 'line' | 'bar' | 'area' | 'heatmap';
    data: Record<string, unknown>[];
    config?: Record<string, unknown>;
  };
  
  // Content
  introduction: string;
  sections: {
    heading: string;
    content: string;
    dataPoints: string[];
  }[];
  
  // Takeaways
  takeaways: string[];
  
  // Related content
  relatedOccupations: string[];
  relatedIndustries: string[];
  relatedRegions: string[];
}

/**
 * Complete wage report data structure
 */
export interface WageReportData {
  year: number;
  publishDate: string;
  lastUpdated: string;
  
  // Summary statistics
  summary: {
    avgWageGrowth: number;           // Overall YoY percentage
    topGrowingOccupation: {
      slug: string;
      title: string;
      growth: number;
    };
    topGrowingIndustry: {
      slug: string;
      name: string;
      growth: number;
    };
    totalOccupations: number;
    totalDataPoints: number;
    totalEmployment: number;
  };
  
  // Core data arrays
  occupations: OccupationWageData[];
  industries: IndustryTrends[];
  regions: RegionalAnalysis[];
  trends: TrendAnalysis[];
  
  // Methodology and sources
  methodology: {
    dataSources: string[];           // Source IDs from data-sources.ts
    sampleSize: number;
    confidenceLevel: string;
    limitations: string[];
    updateSchedule: string;
  };
}

/**
 * Regional analysis combining multiple occupations
 */
export interface RegionalAnalysis {
  region: string;
  stateCode: string;
  citySlug?: string;
  metroArea?: string;
  
  // Overall regional metrics
  avgMedianWage: number;
  totalEmployment: number;
  costOfLivingIndex: number;
  
  // Top occupations
  topOccupations: {
    occupationSlug: string;
    occupationTitle: string;
    medianWage: number;
    employment: number;
  }[];
  
  // Top industries
  topIndustries: {
    industrySlug: string;
    industryName: string;
    avgWage: number;
    employment: number;
  }[];
  
  // Wage vs COL analysis
  wageToCOLRatio: number;          // Higher = better value
  purchasingPowerRank: number;     // Ranking among all regions
  
  // Insights
  insights: string[];
}

// ============================================
// HELPER TYPES
// ============================================

/**
 * Filter options for wage explorer
 */
export interface WageExplorerFilters {
  industry?: string;
  occupation?: string;
  region?: string;
  stateCode?: string;
  percentile?: '10th' | '25th' | '50th' | '75th' | '90th';
  includeTips?: boolean;
  adjustForCOL?: boolean;
}

/**
 * Comparison result for wage explorer
 */
export interface WageComparison {
  items: {
    label: string;
    slug?: string;
    median: number;
    percentile10: number;
    percentile90: number;
    adjustedMedian?: number;
  }[];
  insights: string[];
}



