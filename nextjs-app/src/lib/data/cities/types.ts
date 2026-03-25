/**
 * City data for /career-hub/cities/ pages.
 * Extended metro-level detail with SEO fields (region, searchVolume, CoL index).
 * For simpler location data used by /career-hub/locations/, see Location in locations.ts.
 */
export interface City {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  slug: string;
  country: 'US';
  region: string;
  population: string;
  description: string;
  topIndustries: string[];
  avgHourlyWage: { min: number; max: number };
  costOfLiving: {
    index: number; // 100 = national average
    rent: { studio: number; oneBed: number };
    groceries: number;
    transport: number;
  };
  highlights: string[];
  timezone: string;
  metroArea?: string;
  nearbyMajorCity?: string;
  searchVolume: 'high' | 'medium' | 'low';
}
