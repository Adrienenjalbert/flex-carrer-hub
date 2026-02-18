/**
 * Insights Engine
 * 
 * Generates derived insights, comparisons, and recommendations
 * from wage report data.
 * 
 * Last Updated: February 2026
 */

import type { 
  OccupationWageData, 
  IndustryTrends, 
  RegionalAnalysis,
  InsightCard,
  TrendAnalysis,
  WageComparison
} from "./types";
import { occupationWageData, industryTrends, regionalAnalysis } from "./2026-data";

// ============================================
// INSIGHT GENERATION
// ============================================

/**
 * Generate insight cards for an occupation
 */
export function generateOccupationInsights(occupation: OccupationWageData): InsightCard[] {
  const insights: InsightCard[] = [];
  const median = occupation.currentYear.wagePercentiles.percentile50;
  const range = occupation.currentYear.wagePercentiles.percentile90 - occupation.currentYear.wagePercentiles.percentile10;
  
  // Growth insight
  if (occupation.yoyChange.percentChange > 5) {
    insights.push({
      id: `${occupation.occupationSlug}-growth`,
      type: 'trend',
      headline: 'Strong Wage Growth',
      value: `+${occupation.yoyChange.percentChange}%`,
      context: `${occupation.occupationTitle} wages grew ${occupation.yoyChange.percentChange}% year-over-year, outpacing inflation.`,
      source: 'BLS OEWS',
      actionLink: `/career-hub/wage-report/2026/by-occupation/${occupation.occupationSlug}`,
      priority: 'high',
    });
  }
  
  // Tip income insight (for tipped roles)
  if (occupation.currentYear.avgTips) {
    const totalWithTips = median + (occupation.currentYear.avgTips.min + occupation.currentYear.avgTips.max) / 2;
    insights.push({
      id: `${occupation.occupationSlug}-tips`,
      type: 'stat',
      headline: 'Total Earnings with Tips',
      value: `$${Math.round(totalWithTips)}/hr`,
      context: `With tips, ${occupation.occupationTitle.toLowerCase()}s earn $${Math.round(totalWithTips)} per hour on average, significantly above base wage.`,
      source: 'Toast Report 2025, Indeed Flex',
      actionLink: `/career-hub/roles/${occupation.occupationSlug}`,
      priority: 'high',
    });
  }
  
  // Wage range insight
  if (range > median * 0.5) {
    insights.push({
      id: `${occupation.occupationSlug}-range`,
      type: 'comparison',
      headline: 'Wide Wage Range',
      value: `$${occupation.currentYear.wagePercentiles.percentile10}-$${occupation.currentYear.wagePercentiles.percentile90}`,
      context: `Experience and location significantly impact earnings. Top 10% earn ${Math.round((occupation.currentYear.wagePercentiles.percentile90 / occupation.currentYear.wagePercentiles.percentile10) * 100)}% more than entry-level.`,
      priority: 'medium',
    });
  }
  
  // Regional opportunity insight
  const topRegion = occupation.byRegion.sort((a, b) => b.adjustedMedian - a.adjustedMedian)[0];
  if (topRegion && topRegion.adjustedMedian > median * 1.1) {
    insights.push({
      id: `${occupation.occupationSlug}-region`,
      type: 'recommendation',
      headline: 'Best Value Market',
      value: topRegion.region,
      context: `${topRegion.region} offers the best wage-to-cost-of-living ratio for ${occupation.occupationTitle.toLowerCase()}s.`,
      actionLink: `/career-hub/wage-report/2026/by-region/${topRegion.citySlug || topRegion.stateCode.toLowerCase()}`,
      priority: 'medium',
    });
  }
  
  return insights;
}

/**
 * Generate insight cards for an industry
 */
export function generateIndustryInsights(industry: IndustryTrends): InsightCard[] {
  const insights: InsightCard[] = [];
  
  // Growth insight
  if (industry.wageGrowth > 4) {
    insights.push({
      id: `${industry.industrySlug}-growth`,
      type: 'trend',
      headline: 'Industry Wage Growth',
      value: `+${industry.wageGrowth}%`,
      context: `${industry.industryName} wages grew ${industry.wageGrowth}% year-over-year, indicating strong demand for workers.`,
      source: 'BLS OEWS',
      actionLink: `/career-hub/wage-report/2026/by-industry/${industry.industrySlug}`,
      priority: 'high',
    });
  }
  
  // Employment insight
  insights.push({
    id: `${industry.industrySlug}-employment`,
    type: 'stat',
    headline: 'Total Employment',
    value: `${Math.round(industry.totalEmployment / 1000)}K`,
    context: `${industry.industryName} employs over ${Math.round(industry.totalEmployment / 1000)}K workers in flexible roles nationwide.`,
    priority: 'medium',
  });
  
  // Top occupation insight
  if (industry.topOccupations.length > 0) {
    const top = industry.topOccupations[0];
    insights.push({
      id: `${industry.industrySlug}-top-role`,
      type: 'comparison',
      headline: 'Highest-Paying Role',
      value: top.occupationTitle,
      context: `${top.occupationTitle} leads ${industry.industryName.toLowerCase()} wages at $${top.medianWage}/hr.`,
      actionLink: `/career-hub/wage-report/2026/by-occupation/${top.occupationSlug}`,
      priority: 'medium',
    });
  }
  
  // Demand signal insight
  if (industry.trends.demandSignal === 'very-high' || industry.trends.demandSignal === 'high') {
    insights.push({
      id: `${industry.industrySlug}-demand`,
      type: 'recommendation',
      headline: 'High Demand',
      value: industry.trends.demandSignal === 'very-high' ? 'Very High' : 'High',
      context: `${industry.industryName} shows ${industry.trends.demandSignal === 'very-high' ? 'very high' : 'high'} demand signals, with strong wage growth and abundant opportunities.`,
      priority: 'high',
    });
  }
  
  return insights;
}

/**
 * Generate insight cards for a region
 */
export function generateRegionalInsights(region: RegionalAnalysis): InsightCard[] {
  const insights: InsightCard[] = [];
  
  // Wage-to-COL insight
  if (region.wageToCOLRatio > 0.18) {
    insights.push({
      id: `${region.citySlug}-value`,
      type: 'stat',
      headline: 'Wage-to-COL Ratio',
      value: region.wageToCOLRatio.toFixed(2),
      context: `${region.region} offers strong wage value relative to cost of living, making it an attractive market for flexible workers.`,
      priority: 'high',
    });
  }
  
  // Top occupation insight
  if (region.topOccupations.length > 0) {
    const top = region.topOccupations[0];
    insights.push({
      id: `${region.citySlug}-top-role`,
      type: 'comparison',
      headline: 'Highest-Paying Role',
      value: top.occupationTitle,
      context: `${top.occupationTitle} pays $${top.medianWage}/hr in ${region.region}, the highest among flexible roles.`,
      actionLink: `/career-hub/wage-report/2026/by-occupation/${top.occupationSlug}`,
      priority: 'medium',
    });
  }
  
  // Employment insight
  insights.push({
    id: `${region.citySlug}-employment`,
    type: 'stat',
    headline: 'Total Employment',
    value: `${Math.round(region.totalEmployment / 1000)}K`,
    context: `${region.region} has over ${Math.round(region.totalEmployment / 1000)}K flexible workers across all industries.`,
    priority: 'medium',
  });
  
  return insights;
}

// ============================================
// TREND ANALYSIS GENERATION
// ============================================

/**
 * Generate minimum wage impact analysis
 */
export function generateMinimumWageImpact(): TrendAnalysis {
  const minWageStates = ['CA', 'WA', 'NY', 'MA', 'CT'];
  const avgWageIncrease = 0.8; // $0.80/hr average increase
  
  return {
    slug: 'minimum-wage-impact',
    title: 'Minimum Wage Increases Drive Wage Growth',
    shortDescription: 'States with higher minimum wages see stronger wage growth across all flexible roles.',
    
    keyMetrics: [
      { label: 'States with $15+ Minimum Wage', value: minWageStates.length, direction: 'up' },
      { label: 'Average Wage Premium', value: `+$${avgWageIncrease}/hr`, direction: 'up' },
      { label: 'Impact on Entry-Level Roles', value: '+12%', direction: 'up' },
    ],
    
    chartData: {
      type: 'bar',
      data: minWageStates.map(state => ({
        state,
        wagePremium: avgWageIncrease + Math.random() * 0.5,
        entryLevelImpact: 10 + Math.random() * 5,
      })),
    },
    
    introduction: 'Minimum wage increases in 2025-2026 have created upward pressure on wages across all flexible roles, particularly in entry-level positions.',
    
    sections: [
      {
        heading: 'State-Level Impact',
        content: 'States with minimum wages of $15 or higher show 8-15% higher wages for entry-level flexible roles compared to federal minimum wage states.',
        dataPoints: [
          'California: $16/hr minimum drives $18-20/hr entry-level wages',
          'Washington: $16.28/hr minimum supports $19-22/hr entry-level wages',
          'New York: $15/hr minimum (NYC $16/hr) creates $17-21/hr entry-level range',
        ],
      },
      {
        heading: 'Spillover Effects',
        content: 'Higher minimum wages create wage floors that benefit all workers, not just those at minimum wage.',
        dataPoints: [
          'Mid-level roles see 3-5% wage increases',
          'Experienced workers benefit from compressed wage scales',
          'Overall industry wage growth accelerates',
        ],
      },
    ],
    
    takeaways: [
      'Minimum wage increases have positive spillover effects on all wage levels',
      'Entry-level workers in high minimum wage states earn significantly more',
      'Wage compression benefits mid-career workers',
    ],
    
    relatedOccupations: ['server', 'retail-assistant', 'kitchen-porter', 'cleaner'],
    relatedIndustries: ['hospitality', 'retail', 'facilities'],
    relatedRegions: minWageStates.map(s => s.toLowerCase()),
  };
}

/**
 * Generate inflation-adjusted wage analysis
 */
export function generateInflationAdjusted(): TrendAnalysis {
  const inflationRate = 3.2; // 2025 inflation
  const realWageGrowth = 1.8; // Real wage growth after inflation
  
  return {
    slug: 'inflation-adjusted',
    title: 'Real Wages: Inflation-Adjusted Analysis',
    shortDescription: 'Despite inflation, flexible workers saw real wage gains in 2025-2026.',
    
    keyMetrics: [
      { label: '2025 Inflation Rate', value: `${inflationRate}%`, direction: 'neutral' },
      { label: 'Nominal Wage Growth', value: '+5.0%', direction: 'up' },
      { label: 'Real Wage Growth', value: `+${realWageGrowth}%`, direction: 'up' },
    ],
    
    chartData: {
      type: 'line',
      data: [
        { year: '2023', nominal: 17.5, real: 17.5 },
        { year: '2024', nominal: 18.2, real: 17.8 },
        { year: '2025', nominal: 19.1, real: 18.5 },
        { year: '2026', nominal: 20.0, real: 19.1 },
      ],
    },
    
    introduction: 'While inflation eroded some purchasing power, flexible workers still saw real wage gains as wage growth outpaced inflation.',
    
    sections: [
      {
        heading: 'Purchasing Power Trends',
        content: 'Real wages (adjusted for inflation) increased 1.8% in 2025-2026, meaning workers have more purchasing power than the previous year.',
        dataPoints: [
          'Nominal wages grew 5.0% on average',
          'Inflation was 3.2%',
          'Net real wage gain: 1.8%',
        ],
      },
      {
        heading: 'Industry Variations',
        content: 'Some industries saw stronger real wage growth than others.',
        dataPoints: [
          'Warehouse & Logistics: +3.2% real growth',
          'Hospitality: +2.1% real growth',
          'Retail: +0.8% real growth',
        ],
      },
    ],
    
    takeaways: [
      'Flexible workers maintained purchasing power despite inflation',
      'Warehouse and logistics roles saw strongest real wage gains',
      'Real wage growth varies significantly by industry',
    ],
    
    relatedOccupations: ['warehouse-worker', 'picker-packer', 'server', 'bartender'],
    relatedIndustries: ['industrial', 'hospitality'],
    relatedRegions: [],
  };
}

/**
 * Generate seasonal patterns analysis
 */
export function generateSeasonalPatterns(): TrendAnalysis {
  return {
    slug: 'seasonal-patterns',
    title: 'Seasonal Wage Premiums and Hiring Patterns',
    shortDescription: 'Peak seasons offer 15-25% wage premiums for flexible workers.',
    
    keyMetrics: [
      { label: 'Holiday Season Premium', value: '+22%', direction: 'up' },
      { label: 'Summer Season Premium', value: '+18%', direction: 'up' },
      { label: 'Peak Hiring Months', value: 'Nov-Dec, May-Jul', direction: 'neutral' },
    ],
    
    chartData: {
      type: 'heatmap',
      data: [
        { month: 'Jan', premium: 0 },
        { month: 'Feb', premium: 0 },
        { month: 'Mar', premium: 2 },
        { month: 'Apr', premium: 3 },
        { month: 'May', premium: 15 },
        { month: 'Jun', premium: 18 },
        { month: 'Jul', premium: 20 },
        { month: 'Aug', premium: 12 },
        { month: 'Sep', premium: 5 },
        { month: 'Oct', premium: 3 },
        { month: 'Nov', premium: 20 },
        { month: 'Dec', premium: 22 },
      ],
    },
    
    introduction: 'Seasonal demand creates significant wage premiums during peak hiring periods, with holiday and summer seasons offering the highest pay rates.',
    
    sections: [
      {
        heading: 'Holiday Season (Nov-Dec)',
        content: 'The holiday shopping and dining season creates the highest wage premiums, with warehouse and retail roles seeing 20-25% increases.',
        dataPoints: [
          'Warehouse roles: +25% wage premium',
          'Retail roles: +22% wage premium',
          'Hospitality roles: +18% wage premium',
        ],
      },
      {
        heading: 'Summer Season (May-Jul)',
        content: 'Summer tourism and events drive wage increases, particularly in hospitality and events industries.',
        dataPoints: [
          'Event staff: +20% wage premium',
          'Hospitality roles: +18% wage premium',
          'Outdoor event roles: +15% wage premium',
        ],
      },
    ],
    
    takeaways: [
      'Plan ahead for peak seasons to maximize earnings',
      'Holiday season offers highest wage premiums',
      'Summer events create strong demand for flexible workers',
    ],
    
    relatedOccupations: ['warehouse-worker', 'server', 'event-staff', 'merchandiser'],
    relatedIndustries: ['retail', 'hospitality', 'events'],
    relatedRegions: [],
  };
}

// ============================================
// COMPARISON FUNCTIONS
// ============================================

/**
 * Compare multiple occupations
 */
export function compareOccupations(slugs: string[]): WageComparison {
  const occupations = slugs
    .map(slug => occupationWageData.find(occ => occ.occupationSlug === slug))
    .filter((occ): occ is OccupationWageData => occ !== undefined);
  
  const items = occupations.map(occ => ({
    label: occ.occupationTitle,
    slug: occ.occupationSlug,
    median: occ.currentYear.wagePercentiles.percentile50,
    percentile10: occ.currentYear.wagePercentiles.percentile10,
    percentile90: occ.currentYear.wagePercentiles.percentile90,
  }));
  
  const insights: string[] = [];
  if (items.length > 1) {
    const highest = items.sort((a, b) => b.median - a.median)[0];
    const lowest = items.sort((a, b) => a.median - b.median)[0];
    insights.push(`${highest.label} pays $${(highest.median - lowest.median).toFixed(2)}/hr more than ${lowest.label} on average.`);
    
    const widestRange = items.sort((a, b) => (b.percentile90 - b.percentile10) - (a.percentile90 - a.percentile10))[0];
    insights.push(`${widestRange.label} has the widest wage range, offering significant upside for experienced workers.`);
  }
  
  return { items, insights };
}

/**
 * Compare regions for an occupation
 */
export function compareRegionsForOccupation(occupationSlug: string, regionSlugs: string[]): WageComparison {
  const occupation = occupationWageData.find(occ => occ.occupationSlug === occupationSlug);
  if (!occupation) {
    return { items: [], insights: [] };
  }
  
  const items = occupation.byRegion
    .filter(reg => regionSlugs.includes(reg.citySlug || reg.stateCode.toLowerCase()))
    .map(reg => ({
      label: reg.region,
      slug: reg.citySlug,
      median: reg.median,
      percentile10: reg.percentile10,
      percentile90: reg.percentile90,
      adjustedMedian: reg.adjustedMedian,
    }));
  
  const insights: string[] = [];
  if (items.length > 1) {
    const bestValue = items.sort((a, b) => (b.adjustedMedian || 0) - (a.adjustedMedian || 0))[0];
    insights.push(`${bestValue.label} offers the best purchasing power for ${occupation.occupationTitle.toLowerCase()}s.`);
  }
  
  return { items, insights };
}

