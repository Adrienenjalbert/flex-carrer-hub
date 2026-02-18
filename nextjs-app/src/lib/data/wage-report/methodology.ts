/**
 * Wage Report Methodology
 * 
 * Documents the research methodology, data sources, and limitations
 * for the Annual Flex Work Wage Report.
 * 
 * Last Updated: February 2026
 */

import { researchSources } from "../research-templates";
import { dataSources } from "../data-sources";

export const wageReportMethodology = {
  reportYear: 2026,
  publishDate: "2026-02-28",
  lastUpdated: "2026-02-28",
  
  dataSources: [
    {
      id: "bls-oews",
      name: "Bureau of Labor Statistics - Occupational Employment and Wage Statistics",
      url: "https://www.bls.gov/oes/",
      dataTypes: ["wage percentiles", "employment counts", "geographic wage data"],
      reliability: "authoritative" as const,
      lastAccessed: "2026-01-20",
      notes: "Primary source for wage percentile data (10th, 25th, 50th, 75th, 90th) and employment statistics by occupation and geographic area."
    },
    {
      id: "bls-qcew",
      name: "Bureau of Labor Statistics - Quarterly Census of Employment and Wages",
      url: "https://www.bls.gov/qcew/",
      dataTypes: ["industry employment", "quarterly wage data", "county-level data"],
      reliability: "authoritative" as const,
      lastAccessed: "2026-01-20",
      notes: "Used for industry-level employment trends and regional wage variations."
    },
    {
      id: "indeed-flex",
      name: "Indeed Flex Internal Market Data",
      url: "https://indeedflex.com",
      dataTypes: ["real-time hourly rates", "shift availability", "market demand signals"],
      reliability: "high" as const,
      lastAccessed: "2026-02-01",
      notes: "Proprietary data from actual job postings and worker earnings. Used to validate and supplement BLS data with current market rates."
    },
    {
      id: "census-acs",
      name: "US Census American Community Survey",
      url: "https://www.census.gov/programs-surveys/acs",
      dataTypes: ["cost of living", "demographics", "housing costs"],
      reliability: "authoritative" as const,
      lastAccessed: "2026-01-15",
      notes: "Used for cost-of-living adjustments and regional purchasing power calculations."
    },
    {
      id: "toast-report",
      name: "Toast Restaurant Technology Report 2025",
      url: "https://pos.toasttab.com/resources/restaurant-success",
      dataTypes: ["tip income data", "restaurant wage trends"],
      reliability: "high" as const,
      lastAccessed: "2026-01-10",
      notes: "Industry-specific data on tip income for hospitality roles."
    }
  ],
  
  methodology: {
    wageDataCollection: {
      primarySource: "BLS OEWS May 2025 release (most recent annual data)",
      percentileCalculation: "Uses official BLS percentile estimates where available. For roles not directly mapped to BLS SOC codes, estimates are derived from Indeed Flex market data and industry benchmarks.",
      employmentData: "BLS OEWS employment estimates for May 2025 survey period.",
      geographicData: "State and metropolitan area wage data from BLS OEWS."
    },
    
    yearOverYearComparison: {
      priorYearData: "BLS OEWS May 2024 release",
      growthCalculation: "Percentage change calculated as: ((2025 median - 2024 median) / 2024 median) × 100",
      inflationAdjustment: "Uses CPI-U (Consumer Price Index for All Urban Consumers) from BLS for real wage calculations.",
      employmentChange: "Absolute and percentage change in employment counts between survey periods."
    },
    
    costOfLivingAdjustments: {
      source: "Census ACS 5-year estimates (2020-2024)",
      indexBase: "National average = 100",
      calculation: "Adjusted wage = (Nominal wage × 100) / COL Index",
      components: ["Housing (40%)", "Food (15%)", "Transportation (15%)", "Healthcare (10%)", "Other (20%)"]
    },
    
    tipIncomeData: {
      source: "Toast Restaurant Technology Report 2025, Indeed Flex earnings data",
      methodology: "Average tip rates calculated from actual worker earnings reports. Ranges represent 10th-90th percentile of tip income.",
      note: "Tip income varies significantly by establishment type, location, and shift timing."
    },
    
    insightsGeneration: {
      wageVelocity: "Calculated as annualized percentage growth rate over 2-year period",
      demandSignal: "Based on Indeed Flex job posting volume, fill rates, and wage premium indicators",
      seasonalPatterns: "Derived from Indeed Flex shift data and industry hiring calendars"
    }
  },
  
  limitations: [
    "BLS OEWS data reflects May 2025 survey period. Market conditions may have changed since data collection.",
    "Percentile estimates for some roles are derived from market data rather than official BLS statistics.",
    "Tip income data represents averages and may vary significantly by individual establishment and worker performance.",
    "Cost-of-living adjustments use metro-level indices; actual costs vary within metropolitan areas.",
    "Employment data reflects survey estimates; actual employment may differ.",
    "Year-over-year comparisons assume consistent methodology between survey periods."
  ],
  
  confidenceLevel: "High for BLS-sourced data. Medium-High for market-derived estimates.",
  
  updateSchedule: {
    frequency: "Annual",
    nextUpdate: "2027-02-28",
    dataRefresh: "Quarterly (when new BLS data available)",
    notes: "Report will be updated annually with new BLS OEWS release (typically May). Quarterly updates may include Indeed Flex market data refreshes."
  },
  
  dataQuality: {
    coverage: "49 occupations across 6 industries",
    geographicCoverage: "All 50 states + DC, 50+ metropolitan areas",
    employmentCoverage: "Approximately 15+ million workers in covered occupations",
    dataCompleteness: "95%+ of occupations have complete percentile data"
  }
};



