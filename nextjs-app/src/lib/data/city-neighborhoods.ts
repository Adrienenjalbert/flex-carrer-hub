/**
 * City Neighborhood Data
 * 
 * Provides hyperlocal employment information for major metro areas.
 * Helps job seekers understand which neighborhoods have the most opportunities
 * for their desired role type.
 * 
 * Data Sources:
 * - Local transit authority maps
 * - Chamber of Commerce business registries
 * - Indeed Flex job posting density data
 * 
 * Last Updated: February 2026
 */

export interface NeighborhoodArea {
  name: string;
  type: 'business-district' | 'industrial-zone' | 'entertainment' | 'hospitality' | 'healthcare' | 'mixed';
  primaryIndustries: string[];
  popularRoles: string[];
  avgPayMultiplier: number; // 1.0 = city average, 1.1 = 10% above
  transitScore: 'excellent' | 'good' | 'fair' | 'limited';
  transitDetails: string;
  parkingNotes?: string;
  peakHours: string;
  tipsForWorkers: string[];
}

export interface CityNeighborhoodData {
  citySlug: string;
  neighborhoods: NeighborhoodArea[];
  commuteTips: string[];
  bestAreasForRoles: {
    roleSlug: string;
    neighborhoods: string[];
    whyBest: string;
  }[];
  lastUpdated: string;
}

export const cityNeighborhoodData: CityNeighborhoodData[] = [
  {
    citySlug: 'las-vegas',
    neighborhoods: [
      {
        name: 'The Strip (Las Vegas Boulevard)',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'events'],
        popularRoles: ['bartender', 'server', 'barback', 'housekeeper', 'banquet-server'],
        avgPayMultiplier: 1.15,
        transitScore: 'excellent',
        transitDetails: 'RTC Deuce bus runs 24/7 along entire Strip. $8 day pass covers unlimited rides.',
        parkingNotes: 'Most resorts charge $15-20/day for employee parking. Some offer validated or free parking for shifts.',
        peakHours: 'Varies by venue - day shifts 6am-2pm, swing 2pm-10pm, grave 10pm-6am',
        tipsForWorkers: [
          'Apply to multiple properties - MGM, Caesars, and Wynn all hire through the same portals',
          'Tip potential highest at pool parties (summer) and nightclubs',
          'Bilingual skills (Spanish, Mandarin) command premium pay',
        ],
      },
      {
        name: 'Downtown/Fremont Street',
        type: 'entertainment',
        primaryIndustries: ['hospitality', 'events'],
        popularRoles: ['bartender', 'server', 'event-staff'],
        avgPayMultiplier: 1.05,
        transitScore: 'good',
        transitDetails: 'Downtown Loop (free), multiple RTC bus routes converge here.',
        peakHours: 'Evening focus - most hospitality jobs 4pm-4am',
        tipsForWorkers: [
          'More casual atmosphere than Strip - good for building experience',
          'Fremont East has craft cocktail bars with experienced bartender demand',
        ],
      },
      {
        name: 'North Las Vegas Industrial Area',
        type: 'industrial-zone',
        primaryIndustries: ['industrial'],
        popularRoles: ['warehouse-operative', 'forklift-driver', 'picker-packer'],
        avgPayMultiplier: 1.0,
        transitScore: 'limited',
        transitDetails: 'RTC routes 113, 115 serve area but frequency is low. Car strongly recommended.',
        parkingNotes: 'Free parking at all warehouses.',
        peakHours: 'Day shift 6am-2pm, Night shift 6pm-2am most common',
        tipsForWorkers: [
          'Many warehouses offer shift differentials ($1-2/hr extra) for nights and weekends',
          'Amazon and UPS facilities have consistent year-round openings',
          'Peak season (Sept-Dec) has 2-3x normal hiring',
        ],
      },
      {
        name: 'Convention Center District',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'events'],
        popularRoles: ['banquet-server', 'event-staff', 'bartender', 'server'],
        avgPayMultiplier: 1.10,
        transitScore: 'excellent',
        transitDetails: 'Monorail station at Convention Center. Multiple bus routes.',
        peakHours: 'Varies by convention schedule - check lasvegasconvention.com for upcoming shows',
        tipsForWorkers: [
          'CES (January), SEMA (November), and NAB (April) are massive hiring events',
          'Register with multiple staffing agencies to maximize convention gig opportunities',
        ],
      },
    ],
    commuteTips: [
      'RTC buses are reliable on the Strip but sparse in suburbs. Plan accordingly.',
      'Rideshare (Uber/Lyft) pickup zones exist at all major casinos - useful for late-night shifts.',
      'Summer temperatures exceed 110°F - outdoor waiting areas at bus stops can be brutal.',
      'Consider carpooling apps like Waze Carpool for North Las Vegas warehouse commutes.',
    ],
    bestAreasForRoles: [
      {
        roleSlug: 'bartender',
        neighborhoods: ['The Strip', 'Fremont East', 'Summerlin bars'],
        whyBest: 'Highest tip volume and most positions. Strip nightclubs can yield $300-500/night on weekends.',
      },
      {
        roleSlug: 'warehouse-operative',
        neighborhoods: ['North Las Vegas', 'Henderson'],
        whyBest: 'Amazon, UPS, and FedEx have major distribution centers with consistent shifts.',
      },
      {
        roleSlug: 'housekeeper',
        neighborhoods: ['The Strip', 'Convention Center area'],
        whyBest: 'Major resorts offer union wages ($18-22/hr) and benefits for housekeeping.',
      },
    ],
    lastUpdated: '2026-02-01',
  },
  {
    citySlug: 'orlando',
    neighborhoods: [
      {
        name: 'Walt Disney World Area',
        type: 'hospitality',
        primaryIndustries: ['hospitality'],
        popularRoles: ['server', 'bartender', 'housekeeper', 'food-service-worker'],
        avgPayMultiplier: 1.05,
        transitScore: 'good',
        transitDetails: 'Lynx buses serve Disney property. Disney provides internal transportation between parks and resorts.',
        parkingNotes: 'Free cast member parking at designated lots with shuttles to work locations.',
        peakHours: 'Park hours plus 1 hour on either side. Restaurants peak 11am-2pm and 5pm-9pm.',
        tipsForWorkers: [
          'Disney offers housing programs for seasonal cast members',
          'After 90 days, cast members get park admission perks',
          'Epcot food & wine festival (Sept-Nov) has massive temporary hiring',
        ],
      },
      {
        name: 'Universal Orlando Area',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'events'],
        popularRoles: ['server', 'bartender', 'event-staff', 'food-service-worker'],
        avgPayMultiplier: 1.03,
        transitScore: 'good',
        transitDetails: 'I-Ride Trolley and Lynx buses. Free team member parking.',
        peakHours: 'Park hours (9am-9pm typically) plus CityWalk evening shift (5pm-2am)',
        tipsForWorkers: [
          'Halloween Horror Nights (Sept-Oct) is the biggest hiring event',
          'CityWalk restaurants and bars operate late and have strong tip potential',
        ],
      },
      {
        name: 'International Drive (I-Drive)',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'retail'],
        popularRoles: ['server', 'retail-assistant', 'bartender', 'housekeeper'],
        avgPayMultiplier: 0.95,
        transitScore: 'excellent',
        transitDetails: 'I-Ride Trolley runs entire length of I-Drive. $2/ride or $5 day pass.',
        peakHours: 'Tourist hours - 10am-10pm most active',
        tipsForWorkers: [
          'Wide variety of restaurants and hotels means more opportunities',
          'Premium Outlets have consistent retail openings',
        ],
      },
      {
        name: 'Orlando Industrial Parks',
        type: 'industrial-zone',
        primaryIndustries: ['industrial'],
        popularRoles: ['warehouse-operative', 'forklift-driver'],
        avgPayMultiplier: 1.0,
        transitScore: 'limited',
        transitDetails: 'Car required for most warehouse locations in Apopka and south Orange County.',
        peakHours: 'Standard warehouse shifts - day (6am-2pm), night (6pm-2am)',
        tipsForWorkers: [
          'Amazon, Chewy, and major retailers have fulfillment centers in the area',
          'Holiday peak season starts September',
        ],
      },
    ],
    commuteTips: [
      'I-4 traffic is notoriously bad - leave early or consider off-peak shifts.',
      'SunRail commuter train is useful if your job is near a station.',
      'Tourist area parking is easier early morning before parks open.',
      'Many theme park workers carpool - check internal team member groups.',
    ],
    bestAreasForRoles: [
      {
        roleSlug: 'bartender',
        neighborhoods: ['CityWalk', 'Disney Springs', 'I-Drive restaurants'],
        whyBest: 'Tourist spending creates excellent tip potential. Disney Springs has upscale dining with higher checks.',
      },
      {
        roleSlug: 'server',
        neighborhoods: ['Walt Disney World', 'Universal Orlando', 'I-Drive'],
        whyBest: 'Consistent tourist traffic year-round. Multiple dining options means more positions.',
      },
    ],
    lastUpdated: '2026-02-01',
  },
  {
    citySlug: 'atlanta',
    neighborhoods: [
      {
        name: 'Downtown/Centennial Park Area',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'events'],
        popularRoles: ['server', 'bartender', 'event-staff', 'housekeeper'],
        avgPayMultiplier: 1.10,
        transitScore: 'excellent',
        transitDetails: 'MARTA Peachtree Center and Five Points stations. Multiple bus routes.',
        peakHours: 'Convention and event driven. Check Georgia World Congress Center schedule.',
        tipsForWorkers: [
          'Mercedes-Benz Stadium events drive massive demand',
          'State Farm Arena has 40+ events annually',
          'Hotel demand peaks during major conventions',
        ],
      },
      {
        name: 'Buckhead',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'retail'],
        popularRoles: ['bartender', 'server', 'retail-assistant'],
        avgPayMultiplier: 1.15,
        transitScore: 'good',
        transitDetails: 'MARTA Buckhead and Lenox stations. Parking can be expensive.',
        peakHours: 'Dinner and nightlife focused - 5pm-2am busiest',
        tipsForWorkers: [
          'Upscale dining and nightlife means higher check averages and better tips',
          'Lenox Square and Phipps Plaza have premium retail positions',
        ],
      },
      {
        name: 'Hartsfield-Jackson Airport Corridor',
        type: 'industrial-zone',
        primaryIndustries: ['industrial'],
        popularRoles: ['warehouse-operative', 'forklift-driver', 'picker-packer'],
        avgPayMultiplier: 1.0,
        transitScore: 'excellent',
        transitDetails: 'MARTA Airport line direct access. Many warehouses have shuttle services.',
        peakHours: 'Logistics runs 24/7. All shifts available.',
        tipsForWorkers: [
          'Amazon, UPS, and FedEx have massive operations here',
          "Atlanta is a major logistics hub - consistent year-round demand",
          'Night shift differentials typically $1-2/hr extra',
        ],
      },
      {
        name: 'Midtown',
        type: 'mixed',
        primaryIndustries: ['hospitality', 'healthcare'],
        popularRoles: ['server', 'bartender', 'housekeeper'],
        avgPayMultiplier: 1.08,
        transitScore: 'excellent',
        transitDetails: 'MARTA Midtown and Arts Center stations. Very walkable.',
        peakHours: 'Mix of lunch (11am-2pm) and dinner (5pm-10pm) crowds',
        tipsForWorkers: [
          'Piedmont Park events create seasonal spikes',
          'Multiple hotels near convention area',
        ],
      },
    ],
    commuteTips: [
      'MARTA rail is reliable and avoids I-285 traffic. $2.50/ride or $95 monthly pass.',
      'Peach Pass lanes can save time on I-85 if driving is necessary.',
      'Atlanta traffic is worst 7-9am and 4-7pm. Consider off-peak shifts.',
    ],
    bestAreasForRoles: [
      {
        roleSlug: 'bartender',
        neighborhoods: ['Buckhead', 'Midtown', 'Virginia-Highland'],
        whyBest: 'Affluent areas with strong nightlife culture. Weekend nights particularly lucrative.',
      },
      {
        roleSlug: 'warehouse-operative',
        neighborhoods: ['Airport Corridor', 'South Fulton', 'College Park'],
        whyBest: "Atlanta is the Southeast's logistics capital. Amazon alone has 8+ facilities in metro area.",
      },
    ],
    lastUpdated: '2026-02-01',
  },
  {
    citySlug: 'philadelphia',
    neighborhoods: [
      {
        name: 'Center City',
        type: 'hospitality',
        primaryIndustries: ['hospitality', 'retail'],
        popularRoles: ['server', 'bartender', 'retail-assistant', 'housekeeper'],
        avgPayMultiplier: 1.12,
        transitScore: 'excellent',
        transitDetails: 'SEPTA subway (BSL, MFL), regional rail, and many bus routes converge here.',
        peakHours: 'Lunch (11am-2pm), dinner (5pm-10pm), weekend brunch',
        tipsForWorkers: [
          'Rittenhouse Square area has upscale dining with strong tips',
          'Reading Terminal Market has food service positions',
        ],
      },
      {
        name: 'University City',
        type: 'mixed',
        primaryIndustries: ['hospitality', 'healthcare'],
        popularRoles: ['server', 'food-service-worker', 'housekeeper'],
        avgPayMultiplier: 1.0,
        transitScore: 'excellent',
        transitDetails: 'SEPTA trolleys and MFL. Very walkable.',
        peakHours: 'Academic calendar driven - busiest Sept-May',
        tipsForWorkers: [
          'Penn and Drexel campuses have food service and facilities roles',
          'Hospital system roles available at Penn Medicine',
        ],
      },
      {
        name: 'Northeast Industrial Areas',
        type: 'industrial-zone',
        primaryIndustries: ['industrial'],
        popularRoles: ['warehouse-operative', 'forklift-driver'],
        avgPayMultiplier: 1.0,
        transitScore: 'fair',
        transitDetails: 'SEPTA Route 1 and 14 serve parts of the area. Car helpful.',
        peakHours: 'Standard warehouse shifts',
        tipsForWorkers: [
          'Major distribution centers for retailers and logistics companies',
        ],
      },
    ],
    commuteTips: [
      'SEPTA Key card ($2.50/ride) makes transfers easy between all transit modes.',
      'Regional rail is best for Bucks County and suburban warehouse locations.',
      'Bike share (Indego) is practical for Center City commutes.',
    ],
    bestAreasForRoles: [
      {
        roleSlug: 'bartender',
        neighborhoods: ['Center City', 'Fishtown', 'Rittenhouse'],
        whyBest: 'Vibrant bar scene with craft cocktail focus. Fishtown has been booming.',
      },
      {
        roleSlug: 'warehouse-operative',
        neighborhoods: ['Northeast Philadelphia', 'Bucks County'],
        whyBest: 'Multiple Amazon and major retailer facilities with consistent hiring.',
      },
    ],
    lastUpdated: '2026-02-01',
  },
];

// Helper functions
export function getCityNeighborhoods(citySlug: string): CityNeighborhoodData | undefined {
  return cityNeighborhoodData.find((c) => c.citySlug === citySlug);
}

export function getNeighborhoodsForRole(
  citySlug: string,
  roleSlug: string
): NeighborhoodArea[] {
  const cityData = getCityNeighborhoods(citySlug);
  if (!cityData) return [];
  return cityData.neighborhoods.filter((n) => n.popularRoles.includes(roleSlug));
}

export function getBestNeighborhoodsForRole(
  citySlug: string,
  roleSlug: string
): { neighborhoods: string[]; whyBest: string } | undefined {
  const cityData = getCityNeighborhoods(citySlug);
  if (!cityData) return undefined;
  return cityData.bestAreasForRoles.find((r) => r.roleSlug === roleSlug);
}

export function getCommuteTips(citySlug: string): string[] {
  const cityData = getCityNeighborhoods(citySlug);
  return cityData?.commuteTips || [];
}

export function getCitiesWithNeighborhoodData(): string[] {
  return cityNeighborhoodData.map((c) => c.citySlug);
}

