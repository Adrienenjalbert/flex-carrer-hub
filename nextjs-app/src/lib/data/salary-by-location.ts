// Salary by Role and Location - For programmatic SEO pages
// Targets high-volume queries like "bartender salary Austin" or "warehouse worker pay Dallas"

export interface RoleSalaryData {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  nationalAverage: {
    hourly: { min: number; max: number; median: number };
    annual: { min: number; max: number; median: number };
  };
  tipsIncluded: boolean;
  avgTipsPerHour?: number;
  cityData: {
    citySlug: string;
    cityName: string;
    state: string;
    hourly: { min: number; max: number; median: number };
    withTips?: { min: number; max: number; median: number };
    costOfLivingIndex: number;
    adjustedPurchasingPower: number; // 100 = national average
    demandLevel: 'very-high' | 'high' | 'medium' | 'low';
    jobsAvailable: 'many' | 'moderate' | 'few';
    notes?: string;
  }[];
}

// Cost of living adjustments make wages comparable across cities
export const salaryByLocation: RoleSalaryData[] = [
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'hospitality',
    nationalAverage: {
      hourly: { min: 15, max: 25, median: 18 },
      annual: { min: 31200, max: 52000, median: 37440 }
    },
    tipsIncluded: true,
    avgTipsPerHour: 15,
    cityData: [
      {
        citySlug: 'austin',
        cityName: 'Austin',
        state: 'TX',
        hourly: { min: 15, max: 25, median: 18 },
        withTips: { min: 28, max: 50, median: 35 },
        costOfLivingIndex: 103,
        adjustedPurchasingPower: 102,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: '6th Street and Rainey Street bar districts offer high tips'
      },
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 14, max: 24, median: 17 },
        withTips: { min: 26, max: 48, median: 33 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 106,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Uptown and Deep Ellum have the best tipping bars'
      },
      {
        citySlug: 'houston',
        cityName: 'Houston',
        state: 'TX',
        hourly: { min: 14, max: 24, median: 17 },
        withTips: { min: 25, max: 45, median: 32 },
        costOfLivingIndex: 91,
        adjustedPurchasingPower: 105,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'No state income tax maximizes take-home pay'
      },
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 16, max: 28, median: 20 },
        withTips: { min: 35, max: 70, median: 45 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 138,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Casino and resort bars offer exceptional tips. No state income tax.'
      },
      {
        citySlug: 'nashville',
        cityName: 'Nashville',
        state: 'TN',
        hourly: { min: 14, max: 24, median: 17 },
        withTips: { min: 28, max: 55, median: 38 },
        costOfLivingIndex: 99,
        adjustedPurchasingPower: 115,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Broadway and Midtown bars are extremely lucrative. No state income tax on wages.'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 14, max: 23, median: 16 },
        withTips: { min: 25, max: 45, median: 32 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 95,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Buckhead and Midtown have upscale bars with better tips'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 15, max: 26, median: 18 },
        withTips: { min: 28, max: 55, median: 38 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 106,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'River North and Lincoln Park bars offer high tips'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 14, max: 22, median: 16 },
        withTips: { min: 24, max: 42, median: 30 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 93,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Scottsdale bars pay significantly more than metro Phoenix'
      },
      {
        citySlug: 'orlando',
        cityName: 'Orlando',
        state: 'FL',
        hourly: { min: 13, max: 22, median: 16 },
        withTips: { min: 25, max: 48, median: 33 },
        costOfLivingIndex: 96,
        adjustedPurchasingPower: 103,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Theme park resorts and downtown bars offer steady work. No state income tax.'
      },
      {
        citySlug: 'columbus',
        cityName: 'Columbus',
        state: 'OH',
        hourly: { min: 13, max: 21, median: 15 },
        withTips: { min: 23, max: 40, median: 28 },
        costOfLivingIndex: 88,
        adjustedPurchasingPower: 96,
        demandLevel: 'high',
        jobsAvailable: 'moderate',
        notes: 'Short North and German Village have the best bar scenes'
      },
      {
        citySlug: 'charlotte',
        cityName: 'Charlotte',
        state: 'NC',
        hourly: { min: 14, max: 23, median: 16 },
        withTips: { min: 25, max: 45, median: 32 },
        costOfLivingIndex: 95,
        adjustedPurchasingPower: 101,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'South End and Uptown bars offer good opportunities'
      },
      {
        citySlug: 'cincinnati',
        cityName: 'Cincinnati',
        state: 'OH',
        hourly: { min: 13, max: 20, median: 15 },
        withTips: { min: 22, max: 38, median: 27 },
        costOfLivingIndex: 84,
        adjustedPurchasingPower: 96,
        demandLevel: 'medium',
        jobsAvailable: 'moderate',
        notes: 'OTR (Over-the-Rhine) district has revitalized bar scene'
      },
      {
        citySlug: 'cleveland',
        cityName: 'Cleveland',
        state: 'OH',
        hourly: { min: 12, max: 19, median: 14 },
        withTips: { min: 20, max: 35, median: 25 },
        costOfLivingIndex: 82,
        adjustedPurchasingPower: 91,
        demandLevel: 'medium',
        jobsAvailable: 'moderate',
        notes: 'Downtown and Ohio City have growing bar scenes'
      }
    ]
  },
  {
    roleSlug: 'warehouse-operative',
    roleTitle: 'Warehouse Associate',
    industry: 'industrial',
    nationalAverage: {
      hourly: { min: 15, max: 22, median: 17 },
      annual: { min: 31200, max: 45760, median: 35360 }
    },
    tipsIncluded: false,
    cityData: [
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 16, max: 23, median: 18 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 116,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Major logistics hub. Amazon, FedEx, UPS all have large presence.'
      },
      {
        citySlug: 'houston',
        cityName: 'Houston',
        state: 'TX',
        hourly: { min: 16, max: 23, median: 18 },
        costOfLivingIndex: 91,
        adjustedPurchasingPower: 118,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Port of Houston drives massive warehouse demand. No state income tax.'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 15, max: 22, median: 17 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 101,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Southeast distribution hub. Constant demand for warehouse workers.'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 16, max: 24, median: 19 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 106,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Central US logistics hub. Higher pay but also higher taxes.'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 15, max: 22, median: 17 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 105,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Growing warehouse sector with multiple new facilities'
      },
      {
        citySlug: 'columbus',
        cityName: 'Columbus',
        state: 'OH',
        hourly: { min: 15, max: 21, median: 17 },
        costOfLivingIndex: 88,
        adjustedPurchasingPower: 116,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Major Amazon and distribution center hub. Great cost of living.'
      },
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 16, max: 23, median: 18 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 110,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Growing logistics sector. No state income tax.'
      },
      {
        citySlug: 'nashville',
        cityName: 'Nashville',
        state: 'TN',
        hourly: { min: 15, max: 22, median: 17 },
        costOfLivingIndex: 99,
        adjustedPurchasingPower: 103,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Amazon and other major employers. No state income tax.'
      },
      {
        citySlug: 'charlotte',
        cityName: 'Charlotte',
        state: 'NC',
        hourly: { min: 15, max: 21, median: 17 },
        costOfLivingIndex: 95,
        adjustedPurchasingPower: 107,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Growing distribution center presence in metro area'
      },
      {
        citySlug: 'austin',
        cityName: 'Austin',
        state: 'TX',
        hourly: { min: 16, max: 22, median: 18 },
        costOfLivingIndex: 103,
        adjustedPurchasingPower: 105,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Tech company fulfillment centers and general logistics'
      },
      {
        citySlug: 'cincinnati',
        cityName: 'Cincinnati',
        state: 'OH',
        hourly: { min: 15, max: 21, median: 17 },
        costOfLivingIndex: 84,
        adjustedPurchasingPower: 121,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Major logistics hub with excellent cost of living'
      },
      {
        citySlug: 'reno',
        cityName: 'Reno',
        state: 'NV',
        hourly: { min: 17, max: 24, median: 19 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 113,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Tesla, Amazon, and others have massive facilities. No state income tax.'
      },
      {
        citySlug: 'orlando',
        cityName: 'Orlando',
        state: 'FL',
        hourly: { min: 15, max: 21, median: 17 },
        costOfLivingIndex: 96,
        adjustedPurchasingPower: 106,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Theme park supply chain and general logistics. No state income tax.'
      },
      {
        citySlug: 'cleveland',
        cityName: 'Cleveland',
        state: 'OH',
        hourly: { min: 14, max: 20, median: 16 },
        costOfLivingIndex: 82,
        adjustedPurchasingPower: 117,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Lower pay but excellent cost of living makes up for it'
      }
    ]
  },
  {
    roleSlug: 'server',
    roleTitle: 'Server',
    industry: 'hospitality',
    nationalAverage: {
      hourly: { min: 12, max: 20, median: 14 },
      annual: { min: 25000, max: 50000, median: 35000 }
    },
    tipsIncluded: true,
    avgTipsPerHour: 12,
    cityData: [
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 12, max: 20, median: 14 },
        withTips: { min: 28, max: 55, median: 38 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 116,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Casino restaurants and high-end dining offer exceptional tips'
      },
      {
        citySlug: 'nashville',
        cityName: 'Nashville',
        state: 'TN',
        hourly: { min: 11, max: 18, median: 13 },
        withTips: { min: 25, max: 48, median: 32 },
        costOfLivingIndex: 99,
        adjustedPurchasingPower: 97,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Tourist areas and Broadway have high tip potential'
      },
      {
        citySlug: 'orlando',
        cityName: 'Orlando',
        state: 'FL',
        hourly: { min: 11, max: 18, median: 13 },
        withTips: { min: 24, max: 45, median: 30 },
        costOfLivingIndex: 96,
        adjustedPurchasingPower: 94,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Theme park restaurants and tourist areas have steady traffic'
      },
      {
        citySlug: 'austin',
        cityName: 'Austin',
        state: 'TX',
        hourly: { min: 12, max: 20, median: 14 },
        withTips: { min: 25, max: 45, median: 32 },
        costOfLivingIndex: 103,
        adjustedPurchasingPower: 93,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Food scene is excellent with good tipping culture'
      },
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 11, max: 18, median: 13 },
        withTips: { min: 23, max: 42, median: 30 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 97,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Upscale restaurants in Uptown pay well'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 11, max: 18, median: 13 },
        withTips: { min: 22, max: 40, median: 28 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 83,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Buckhead fine dining and Midtown restaurants have best tips'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 12, max: 20, median: 14 },
        withTips: { min: 25, max: 50, median: 35 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 98,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Fine dining and tourist areas pay well despite higher taxes'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 11, max: 17, median: 13 },
        withTips: { min: 21, max: 38, median: 27 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 84,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Scottsdale restaurants pay significantly more than metro average'
      }
    ]
  },
  {
    roleSlug: 'cashier',
    roleTitle: 'Cashier',
    industry: 'retail',
    nationalAverage: {
      hourly: { min: 12, max: 17, median: 14 },
      annual: { min: 24960, max: 35360, median: 29120 }
    },
    tipsIncluded: false,
    cityData: [
      {
        citySlug: 'columbus',
        cityName: 'Columbus',
        state: 'OH',
        hourly: { min: 12, max: 17, median: 14 },
        costOfLivingIndex: 88,
        adjustedPurchasingPower: 114,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Lower cost of living means pay goes further'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 14, max: 18, median: 15 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 103,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Arizona minimum wage is higher than federal'
      },
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 12, max: 17, median: 14 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 107,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'No state income tax helps take-home pay'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 12, max: 16, median: 13 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 90,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Consistent demand across metro area'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 15, max: 19, median: 16 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 102,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Higher minimum wage than most states'
      },
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 13, max: 18, median: 15 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 107,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Casino retail often pays more. No state income tax.'
      },
      {
        citySlug: 'orlando',
        cityName: 'Orlando',
        state: 'FL',
        hourly: { min: 13, max: 17, median: 14 },
        costOfLivingIndex: 96,
        adjustedPurchasingPower: 101,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Theme park retail and outlet malls. No state income tax.'
      }
    ]
  },
  {
    roleSlug: 'security-guard',
    roleTitle: 'Security Guard',
    industry: 'facilities',
    nationalAverage: {
      hourly: { min: 14, max: 24, median: 17 },
      annual: { min: 29120, max: 49920, median: 35360 }
    },
    tipsIncluded: false,
    cityData: [
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 16, max: 28, median: 20 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 122,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Casino security pays premium. No state income tax.'
      },
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 14, max: 24, median: 17 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 110,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Corporate security in growing market'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 14, max: 23, median: 17 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 101,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Hartsfield-Jackson airport security is major employer'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 15, max: 26, median: 19 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 107,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Corporate security in downtown pays well'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 14, max: 22, median: 16 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 99,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Growing market with new facilities'
      },
      {
        citySlug: 'houston',
        cityName: 'Houston',
        state: 'TX',
        hourly: { min: 14, max: 24, median: 17 },
        costOfLivingIndex: 91,
        adjustedPurchasingPower: 112,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Energy sector security pays premium. No state income tax.'
      }
    ]
  },
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Operator',
    industry: 'industrial',
    nationalAverage: {
      hourly: { min: 17, max: 25, median: 20 },
      annual: { min: 35360, max: 52000, median: 41600 }
    },
    tipsIncluded: false,
    cityData: [
      {
        citySlug: 'reno',
        cityName: 'Reno',
        state: 'NV',
        hourly: { min: 19, max: 27, median: 22 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 130,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Tesla and Amazon facilities pay premium. No state income tax.'
      },
      {
        citySlug: 'dallas',
        cityName: 'Dallas',
        state: 'TX',
        hourly: { min: 18, max: 25, median: 20 },
        costOfLivingIndex: 93,
        adjustedPurchasingPower: 129,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Major logistics hub with constant demand'
      },
      {
        citySlug: 'columbus',
        cityName: 'Columbus',
        state: 'OH',
        hourly: { min: 17, max: 24, median: 19 },
        costOfLivingIndex: 88,
        adjustedPurchasingPower: 129,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Distribution center hub with excellent cost of living'
      },
      {
        citySlug: 'chicago',
        cityName: 'Chicago',
        state: 'IL',
        hourly: { min: 19, max: 27, median: 22 },
        costOfLivingIndex: 107,
        adjustedPurchasingPower: 123,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Midwest logistics hub pays premium rates'
      },
      {
        citySlug: 'atlanta',
        cityName: 'Atlanta',
        state: 'GA',
        hourly: { min: 17, max: 24, median: 19 },
        costOfLivingIndex: 101,
        adjustedPurchasingPower: 113,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Southeast distribution hub'
      },
      {
        citySlug: 'phoenix',
        cityName: 'Phoenix',
        state: 'AZ',
        hourly: { min: 17, max: 24, median: 19 },
        costOfLivingIndex: 97,
        adjustedPurchasingPower: 117,
        demandLevel: 'very-high',
        jobsAvailable: 'many',
        notes: 'Growing logistics sector'
      },
      {
        citySlug: 'las-vegas',
        cityName: 'Las Vegas',
        state: 'NV',
        hourly: { min: 18, max: 26, median: 21 },
        costOfLivingIndex: 98,
        adjustedPurchasingPower: 128,
        demandLevel: 'high',
        jobsAvailable: 'many',
        notes: 'Growing warehouse sector. No state income tax.'
      }
    ]
  }
];

// Helper functions
export const getSalaryDataByRole = (roleSlug: string) =>
  salaryByLocation.find(data => data.roleSlug === roleSlug);

export const getSalaryForRoleInCity = (roleSlug: string, citySlug: string) => {
  const roleData = getSalaryDataByRole(roleSlug);
  if (!roleData) return null;
  return roleData.cityData.find(city => city.citySlug === citySlug);
};

export const getCitiesForRole = (roleSlug: string) => {
  const roleData = getSalaryDataByRole(roleSlug);
  if (!roleData) return [];
  return roleData.cityData;
};

export const getHighestPayingCitiesForRole = (roleSlug: string, limit: number = 5) => {
  const roleData = getSalaryDataByRole(roleSlug);
  if (!roleData) return [];
  return [...roleData.cityData]
    .sort((a, b) => b.hourly.median - a.hourly.median)
    .slice(0, limit);
};

export const getBestValueCitiesForRole = (roleSlug: string, limit: number = 5) => {
  const roleData = getSalaryDataByRole(roleSlug);
  if (!roleData) return [];
  return [...roleData.cityData]
    .sort((a, b) => b.adjustedPurchasingPower - a.adjustedPurchasingPower)
    .slice(0, limit);
};

export const getHighDemandCitiesForRole = (roleSlug: string) => {
  const roleData = getSalaryDataByRole(roleSlug);
  if (!roleData) return [];
  return roleData.cityData.filter(city => city.demandLevel === 'very-high');
};

export const getAllRoleSlugsWithSalaryData = () =>
  salaryByLocation.map(data => data.roleSlug);

export const getAllCitySlugsWithSalaryData = () => {
  const cities = new Set<string>();
  salaryByLocation.forEach(role => {
    role.cityData.forEach(city => cities.add(city.citySlug));
  });
  return Array.from(cities);
};

// Generate all possible role-city combinations for sitemap
export const getAllRoleCityCombinations = () => {
  const combinations: { roleSlug: string; citySlug: string }[] = [];
  salaryByLocation.forEach(role => {
    role.cityData.forEach(city => {
      combinations.push({
        roleSlug: role.roleSlug,
        citySlug: city.citySlug
      });
    });
  });
  return combinations;
};

