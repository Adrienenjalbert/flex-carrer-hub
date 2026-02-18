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

// Top 50+ cities based on search volume data
export const cities: City[] = [
  // Tier 1: Highest volume cities
  {
    id: 'philadelphia',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    slug: 'philadelphia',
    country: 'US',
    region: 'Northeast',
    population: '1,576,251',
    description: 'Philadelphia is the largest city in Pennsylvania and a major hub for healthcare, education, and logistics. The city offers diverse flexible work opportunities across multiple industries.',
    topIndustries: ['Healthcare', 'Education', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 102,
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 95
    },
    highlights: ['Major healthcare employers', 'Growing logistics sector', 'Rich cultural scene', 'Affordable compared to NYC'],
    timezone: 'EST',
    metroArea: 'Philadelphia-Camden-Wilmington',
    searchVolume: 'high'
  },
  {
    id: 'charlotte',
    city: 'Charlotte',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'charlotte',
    country: 'US',
    region: 'Southeast',
    population: '879,709',
    description: 'Charlotte is North Carolina\'s largest city and a major financial center. The fast-growing metro area offers abundant opportunities in banking, logistics, and hospitality.',
    topIndustries: ['Finance', 'Logistics', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 95,
      rent: { studio: 1250, oneBed: 1450 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Major banking hub', 'Fast job growth', 'Lower cost than Northeast', 'Growing warehouse sector'],
    timezone: 'EST',
    metroArea: 'Charlotte-Concord-Gastonia',
    searchVolume: 'high'
  },
  {
    id: 'las-vegas',
    city: 'Las Vegas',
    state: 'Nevada',
    stateCode: 'NV',
    slug: 'las-vegas',
    country: 'US',
    region: 'West',
    population: '641,903',
    description: 'Las Vegas is the entertainment capital of the world with unparalleled hospitality opportunities. The city offers abundant flexible work in casinos, hotels, restaurants, and events.',
    topIndustries: ['Hospitality', 'Entertainment', 'Tourism', 'Logistics'],
    avgHourlyWage: { min: 14, max: 24 },
    costOfLiving: {
      index: 98,
      rent: { studio: 1150, oneBed: 1350 },
      groceries: 330,
      transport: 90
    },
    highlights: ['24/7 hospitality industry', 'No state income tax', 'High tip potential', 'Year-round tourism'],
    timezone: 'PST',
    metroArea: 'Las Vegas-Henderson-Paradise',
    searchVolume: 'high'
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'dallas',
    country: 'US',
    region: 'South',
    population: '1,304,379',
    description: 'Dallas is a major business hub with a diverse economy spanning finance, technology, and logistics. The city offers abundant flexible work opportunities across multiple sectors.',
    topIndustries: ['Finance', 'Logistics', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 23 },
    costOfLiving: {
      index: 93,
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Major logistics hub', 'No state income tax', 'Low cost of living', 'Strong hospitality sector'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    searchVolume: 'high'
  },
  {
    id: 'columbus',
    city: 'Columbus',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'columbus',
    country: 'US',
    region: 'Midwest',
    population: '905,748',
    description: 'Columbus is Ohio\'s capital and largest city, featuring a diverse economy with strong logistics, retail, and hospitality sectors. The city offers affordable living and steady work.',
    topIndustries: ['Logistics', 'Retail', 'Insurance', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 88,
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 310,
      transport: 75
    },
    highlights: ['Major distribution center', 'Affordable cost of living', 'Growing hospitality scene', 'Strong job market'],
    timezone: 'EST',
    metroArea: 'Columbus',
    searchVolume: 'high'
  },
  {
    id: 'phoenix',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'phoenix',
    country: 'US',
    region: 'Southwest',
    population: '1,608,139',
    description: 'Phoenix is the fifth-largest city in the US with a booming economy and year-round sunshine. The metro area offers extensive opportunities in hospitality, logistics, and healthcare.',
    topIndustries: ['Healthcare', 'Logistics', 'Tourism', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 97,
      rent: { studio: 1200, oneBed: 1400 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Fast-growing job market', 'Year-round good weather', 'Major distribution hub', 'Growing tech sector'],
    timezone: 'MST',
    metroArea: 'Phoenix-Mesa-Chandler',
    searchVolume: 'high'
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'chicago',
    country: 'US',
    region: 'Midwest',
    population: '2,746,388',
    description: 'Chicago is the third-largest US city and a major transportation hub. The city offers diverse opportunities in hospitality, logistics, and events throughout the year.',
    topIndustries: ['Logistics', 'Finance', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      index: 107,
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 350,
      transport: 105
    },
    highlights: ['Major convention city', 'Diverse job market', 'Strong union presence', 'World-class hospitality'],
    timezone: 'CST',
    metroArea: 'Chicago-Naperville-Elgin',
    searchVolume: 'high'
  },
  {
    id: 'nashville',
    city: 'Nashville',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'nashville',
    country: 'US',
    region: 'Southeast',
    population: '689,447',
    description: 'Nashville is a fast-growing city famous for its music scene and hospitality industry. The city offers excellent opportunities in food service, entertainment, and tourism.',
    topIndustries: ['Entertainment', 'Hospitality', 'Healthcare', 'Tourism'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      index: 99,
      rent: { studio: 1400, oneBed: 1650 },
      groceries: 340,
      transport: 85
    },
    highlights: ['Booming hospitality industry', 'No state income tax on wages', 'Growing tourism sector', 'Vibrant entertainment scene'],
    timezone: 'CST',
    metroArea: 'Nashville-Davidson-Murfreesboro-Franklin',
    searchVolume: 'high'
  },
  {
    id: 'austin',
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'austin',
    country: 'US',
    region: 'South',
    population: '978,908',
    description: 'Austin is a vibrant tech hub known for its live music scene, food culture, and growing job market. The city offers numerous opportunities in hospitality, logistics, and retail.',
    topIndustries: ['Technology', 'Hospitality', 'Healthcare', 'Logistics'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 103,
      rent: { studio: 1350, oneBed: 1600 },
      groceries: 350,
      transport: 100
    },
    highlights: ['Fast-growing job market', 'No state income tax', 'Thriving food and beverage scene', 'Year-round events'],
    timezone: 'CST',
    metroArea: 'Austin-Round Rock-Georgetown',
    searchVolume: 'high'
  },
  {
    id: 'cincinnati',
    city: 'Cincinnati',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'cincinnati',
    country: 'US',
    region: 'Midwest',
    population: '309,317',
    description: 'Cincinnati offers an affordable cost of living with strong manufacturing and logistics sectors. The city is home to major companies and offers steady flexible work opportunities.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 84,
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 70
    },
    highlights: ['Very affordable cost of living', 'Strong manufacturing sector', 'Major logistics employers', 'Growing food scene'],
    timezone: 'EST',
    metroArea: 'Cincinnati',
    searchVolume: 'high'
  },
  {
    id: 'atlanta',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'atlanta',
    country: 'US',
    region: 'Southeast',
    population: '498,715',
    description: 'Atlanta is a major Southeastern hub with a diverse economy spanning logistics, hospitality, and retail. The city serves as a major distribution and transportation center.',
    topIndustries: ['Logistics', 'Film & Entertainment', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 13, max: 21 },
    costOfLiving: {
      index: 101,
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 350,
      transport: 100
    },
    highlights: ['World\'s busiest airport', 'Growing film industry', 'Diverse hospitality sector', 'Major warehouse hub'],
    timezone: 'EST',
    metroArea: 'Atlanta-Sandy Springs-Alpharetta',
    searchVolume: 'high'
  },
  {
    id: 'orlando',
    city: 'Orlando',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'orlando',
    country: 'US',
    region: 'Southeast',
    population: '307,573',
    description: 'Orlando is the theme park capital of the world with unmatched hospitality opportunities. The metro offers abundant flexible work in tourism, entertainment, and food service.',
    topIndustries: ['Tourism', 'Hospitality', 'Entertainment', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 96,
      rent: { studio: 1300, oneBed: 1500 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Year-round tourism', 'Major theme parks', 'No state income tax', 'Convention center hub'],
    timezone: 'EST',
    metroArea: 'Orlando-Kissimmee-Sanford',
    searchVolume: 'high'
  },
  {
    id: 'cleveland',
    city: 'Cleveland',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'cleveland',
    country: 'US',
    region: 'Midwest',
    population: '372,624',
    description: 'Cleveland offers affordable living with strong healthcare and manufacturing sectors. The city provides steady flexible work opportunities in logistics and hospitality.',
    topIndustries: ['Healthcare', 'Manufacturing', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 82,
      rent: { studio: 850, oneBed: 1000 },
      groceries: 290,
      transport: 70
    },
    highlights: ['World-class healthcare', 'Very affordable living', 'Growing hospitality scene', 'Strong manufacturing base'],
    timezone: 'EST',
    metroArea: 'Cleveland-Elyria',
    searchVolume: 'high'
  },
  {
    id: 'reno',
    city: 'Reno',
    state: 'Nevada',
    stateCode: 'NV',
    slug: 'reno',
    country: 'US',
    region: 'West',
    population: '264,165',
    description: 'Reno is a growing logistics hub with a strong hospitality sector. The city offers no state income tax and access to both casino and warehouse work opportunities.',
    topIndustries: ['Logistics', 'Gaming', 'Tourism', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 101,
      rent: { studio: 1200, oneBed: 1400 },
      groceries: 340,
      transport: 80
    },
    highlights: ['Major distribution hub', 'No state income tax', 'Growing tech presence', 'Casino employment'],
    timezone: 'PST',
    metroArea: 'Reno-Sparks',
    searchVolume: 'high'
  },
  {
    id: 'durham',
    city: 'Durham',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'durham',
    country: 'US',
    region: 'Southeast',
    population: '283,506',
    description: 'Durham is part of the Research Triangle with a thriving economy driven by healthcare, education, and tech. The city offers diverse flexible work opportunities.',
    topIndustries: ['Healthcare', 'Education', 'Technology', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 94,
      rent: { studio: 1200, oneBed: 1400 },
      groceries: 320,
      transport: 80
    },
    highlights: ['Major healthcare employers', 'Growing food scene', 'Lower cost than Raleigh', 'Strong job growth'],
    timezone: 'EST',
    metroArea: 'Durham-Chapel Hill',
    searchVolume: 'high'
  },
  // Tier 2: Medium-high volume cities
  {
    id: 'fort-worth',
    city: 'Fort Worth',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'fort-worth',
    country: 'US',
    region: 'South',
    population: '918,915',
    description: 'Fort Worth offers affordable living within the DFW metro with strong logistics and manufacturing sectors. The city provides steady work opportunities without Dallas prices.',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 89,
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Lower cost than Dallas', 'Major logistics employers', 'No state income tax', 'Growing job market'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'raleigh',
    city: 'Raleigh',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'raleigh',
    country: 'US',
    region: 'Southeast',
    population: '467,665',
    description: 'Raleigh is North Carolina\'s capital and part of the Research Triangle. The city offers strong opportunities in healthcare, education, and hospitality.',
    topIndustries: ['Technology', 'Healthcare', 'Education', 'Government'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 98,
      rent: { studio: 1300, oneBed: 1500 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Strong job growth', 'Major healthcare employers', 'Growing tech sector', 'Quality of life'],
    timezone: 'EST',
    metroArea: 'Raleigh-Cary',
    searchVolume: 'medium'
  },
  {
    id: 'arlington-tx',
    city: 'Arlington',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'arlington-tx',
    country: 'US',
    region: 'South',
    population: '394,266',
    description: 'Arlington sits between Dallas and Fort Worth, home to major sports venues and entertainment districts. The city offers hospitality and event work opportunities.',
    topIndustries: ['Entertainment', 'Hospitality', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 90,
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Major sports venues', 'Entertainment district', 'No state income tax', 'Central DFW location'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'akron',
    city: 'Akron',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'akron',
    country: 'US',
    region: 'Midwest',
    population: '190,469',
    description: 'Akron is part of greater Cleveland with an affordable cost of living and manufacturing heritage. The city offers logistics and warehouse opportunities.',
    topIndustries: ['Manufacturing', 'Healthcare', 'Logistics', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 78,
      rent: { studio: 750, oneBed: 900 },
      groceries: 280,
      transport: 65
    },
    highlights: ['Very affordable living', 'Manufacturing jobs', 'Near Cleveland', 'Growing logistics sector'],
    timezone: 'EST',
    metroArea: 'Akron',
    nearbyMajorCity: 'Cleveland',
    searchVolume: 'medium'
  },
  {
    id: 'dayton',
    city: 'Dayton',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'dayton',
    country: 'US',
    region: 'Midwest',
    population: '137,644',
    description: 'Dayton offers extremely affordable living with a strong manufacturing and logistics base. The city provides steady work opportunities in warehousing and distribution.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Defense'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 76,
      rent: { studio: 700, oneBed: 850 },
      groceries: 270,
      transport: 60
    },
    highlights: ['Extremely affordable', 'Major logistics hub', 'Wright-Patterson AFB', 'Manufacturing jobs'],
    timezone: 'EST',
    metroArea: 'Dayton',
    searchVolume: 'medium'
  },
  {
    id: 'wilmington-de',
    city: 'Wilmington',
    state: 'Delaware',
    stateCode: 'DE',
    slug: 'wilmington-de',
    country: 'US',
    region: 'Northeast',
    population: '70,898',
    description: 'Wilmington is Delaware\'s largest city and a corporate hub. The city offers opportunities in finance, logistics, and hospitality with access to the Northeast corridor.',
    topIndustries: ['Finance', 'Healthcare', 'Logistics', 'Corporate'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 98,
      rent: { studio: 1150, oneBed: 1350 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Corporate headquarters hub', 'No sales tax', 'Near Philadelphia', 'Growing logistics'],
    timezone: 'EST',
    metroArea: 'Philadelphia-Camden-Wilmington',
    nearbyMajorCity: 'Philadelphia',
    searchVolume: 'medium'
  },
  {
    id: 'houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'houston',
    country: 'US',
    region: 'South',
    population: '2,304,580',
    description: 'Houston is America\'s fourth-largest city with a thriving economy driven by energy, healthcare, and logistics. The diverse city offers extensive flexible work opportunities.',
    topIndustries: ['Energy', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 91,
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Largest city in Texas', 'No state income tax', 'Diverse economy', 'Lower cost of living'],
    timezone: 'CST',
    metroArea: 'Houston-The Woodlands-Sugar Land',
    searchVolume: 'medium'
  },
  {
    id: 'hartford',
    city: 'Hartford',
    state: 'Connecticut',
    stateCode: 'CT',
    slug: 'hartford',
    country: 'US',
    region: 'Northeast',
    population: '121,054',
    description: 'Hartford is Connecticut\'s capital and the insurance capital of the US. The city offers opportunities in finance, healthcare, and logistics.',
    topIndustries: ['Insurance', 'Healthcare', 'Finance', 'Logistics'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 104,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Insurance industry hub', 'Major healthcare employers', 'Growing logistics sector', 'Central New England'],
    timezone: 'EST',
    metroArea: 'Hartford-East Hartford-Middletown',
    searchVolume: 'medium'
  },
  {
    id: 'new-haven',
    city: 'New Haven',
    state: 'Connecticut',
    stateCode: 'CT',
    slug: 'new-haven',
    country: 'US',
    region: 'Northeast',
    population: '134,023',
    description: 'New Haven is home to Yale University with strong healthcare and education sectors. The city offers hospitality and logistics work opportunities.',
    topIndustries: ['Healthcare', 'Education', 'Hospitality', 'Logistics'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 102,
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 340,
      transport: 85
    },
    highlights: ['Major healthcare employers', 'University employment', 'Growing food scene', 'Near NYC'],
    timezone: 'EST',
    metroArea: 'New Haven-Milford',
    searchVolume: 'medium'
  },
  {
    id: 'plano',
    city: 'Plano',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'plano',
    country: 'US',
    region: 'South',
    population: '285,494',
    description: 'Plano is a major Dallas suburb and corporate headquarters hub. The city offers opportunities in corporate services, hospitality, and retail.',
    topIndustries: ['Corporate', 'Technology', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 95,
      rent: { studio: 1250, oneBed: 1500 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Corporate headquarters', 'No state income tax', 'High quality of life', 'Strong job market'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'murfreesboro',
    city: 'Murfreesboro',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'murfreesboro',
    country: 'US',
    region: 'Southeast',
    population: '152,769',
    description: 'Murfreesboro is one of Tennessee\'s fastest-growing cities near Nashville. The city offers logistics and hospitality opportunities with lower costs than Nashville.',
    topIndustries: ['Logistics', 'Healthcare', 'Education', 'Manufacturing'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 92,
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 310,
      transport: 75
    },
    highlights: ['Near Nashville', 'Fast growing', 'No state income tax', 'Lower cost living'],
    timezone: 'CST',
    metroArea: 'Nashville-Davidson-Murfreesboro-Franklin',
    nearbyMajorCity: 'Nashville',
    searchVolume: 'medium'
  },
  {
    id: 'clarksville',
    city: 'Clarksville',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'clarksville',
    country: 'US',
    region: 'Southeast',
    population: '166,722',
    description: 'Clarksville is a fast-growing city near Fort Campbell with strong logistics and manufacturing sectors. The city offers affordable living and steady work.',
    topIndustries: ['Manufacturing', 'Logistics', 'Military', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 85,
      rent: { studio: 950, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Very affordable', 'Fort Campbell nearby', 'Fast growing', 'No state income tax'],
    timezone: 'CST',
    metroArea: 'Clarksville',
    searchVolume: 'medium'
  },
  {
    id: 'edison',
    city: 'Edison',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'edison',
    country: 'US',
    region: 'Northeast',
    population: '99,967',
    description: 'Edison is a diverse New Jersey township with strong logistics and pharmaceutical sectors. The city offers warehouse and distribution opportunities.',
    topIndustries: ['Logistics', 'Pharmaceuticals', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      index: 115,
      rent: { studio: 1450, oneBed: 1700 },
      groceries: 370,
      transport: 100
    },
    highlights: ['Major logistics hub', 'Near NYC', 'Diverse economy', 'Warehouse opportunities'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    nearbyMajorCity: 'New York',
    searchVolume: 'medium'
  },
  {
    id: 'camden',
    city: 'Camden',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'camden',
    country: 'US',
    region: 'Northeast',
    population: '71,791',
    description: 'Camden is across the river from Philadelphia with revitalized waterfront and logistics sectors. The city offers affordable living in the Philly metro.',
    topIndustries: ['Healthcare', 'Education', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 91,
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Near Philadelphia', 'Affordable living', 'Growing waterfront', 'Healthcare jobs'],
    timezone: 'EST',
    metroArea: 'Philadelphia-Camden-Wilmington',
    nearbyMajorCity: 'Philadelphia',
    searchVolume: 'medium'
  },
  {
    id: 'elizabeth',
    city: 'Elizabeth',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'elizabeth',
    country: 'US',
    region: 'Northeast',
    population: '137,298',
    description: 'Elizabeth is New Jersey\'s fourth-largest city near Newark Airport and Port Elizabeth. The city offers abundant logistics and warehouse opportunities.',
    topIndustries: ['Logistics', 'Port Operations', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      index: 112,
      rent: { studio: 1350, oneBed: 1600 },
      groceries: 360,
      transport: 100
    },
    highlights: ['Major port access', 'Near Newark Airport', 'Logistics jobs', 'Near NYC'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    nearbyMajorCity: 'New York',
    searchVolume: 'medium'
  },
  {
    id: 'staten-island',
    city: 'Staten Island',
    state: 'New York',
    stateCode: 'NY',
    slug: 'staten-island',
    country: 'US',
    region: 'Northeast',
    population: '495,747',
    description: 'Staten Island is New York City\'s most suburban borough with growing logistics and retail sectors. The borough offers NYC opportunities with lower costs.',
    topIndustries: ['Healthcare', 'Retail', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 16, max: 24 },
    costOfLiving: {
      index: 118,
      rent: { studio: 1500, oneBed: 1800 },
      groceries: 380,
      transport: 110
    },
    highlights: ['NYC wages', 'Lower than Manhattan', 'Growing logistics', 'Suburban feel'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    nearbyMajorCity: 'New York',
    searchVolume: 'medium'
  },
  {
    id: 'grand-prairie',
    city: 'Grand Prairie',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'grand-prairie',
    country: 'US',
    region: 'South',
    population: '196,100',
    description: 'Grand Prairie is centrally located in the DFW metro with entertainment venues and distribution centers. The city offers diverse work opportunities.',
    topIndustries: ['Logistics', 'Entertainment', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 88,
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Central DFW location', 'No state income tax', 'Entertainment venues', 'Warehouse jobs'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'garland',
    city: 'Garland',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'garland',
    country: 'US',
    region: 'South',
    population: '239,928',
    description: 'Garland is a Dallas suburb with a strong manufacturing and distribution base. The city offers affordable living with access to the DFW job market.',
    topIndustries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      index: 87,
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Affordable in DFW', 'No state income tax', 'Manufacturing jobs', 'Near Dallas'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'irving',
    city: 'Irving',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'irving',
    country: 'US',
    region: 'South',
    population: '256,684',
    description: 'Irving is home to DFW Airport and Las Colinas business district. The city offers hospitality and corporate opportunities near the airport.',
    topIndustries: ['Corporate', 'Hospitality', 'Logistics', 'Aviation'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 93,
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Near DFW Airport', 'Corporate hub', 'No state income tax', 'Hotel jobs'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'mesquite',
    city: 'Mesquite',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'mesquite',
    country: 'US',
    region: 'South',
    population: '150,108',
    description: 'Mesquite is an affordable Dallas suburb with a strong retail and logistics presence. The city offers steady work opportunities at lower living costs.',
    topIndustries: ['Retail', 'Logistics', 'Manufacturing', 'Healthcare'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 84,
      rent: { studio: 950, oneBed: 1150 },
      groceries: 290,
      transport: 75
    },
    highlights: ['Very affordable', 'No state income tax', 'Near Dallas', 'Retail jobs'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'frisco',
    city: 'Frisco',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'frisco',
    country: 'US',
    region: 'South',
    population: '200,490',
    description: 'Frisco is one of the fastest-growing cities in America with major sports facilities and corporate headquarters. The city offers hospitality and event work.',
    topIndustries: ['Sports', 'Corporate', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 98,
      rent: { studio: 1300, oneBed: 1550 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Fastest growing city', 'Sports venues', 'No state income tax', 'Corporate jobs'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'medium'
  },
  {
    id: 'carson-city',
    city: 'Carson City',
    state: 'Nevada',
    stateCode: 'NV',
    slug: 'carson-city',
    country: 'US',
    region: 'West',
    population: '58,639',
    description: 'Carson City is Nevada\'s capital near Lake Tahoe with government and tourism sectors. The city offers no state income tax and outdoor lifestyle.',
    topIndustries: ['Government', 'Tourism', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      index: 99,
      rent: { studio: 1150, oneBed: 1350 },
      groceries: 340,
      transport: 80
    },
    highlights: ['State capital', 'No state income tax', 'Near Lake Tahoe', 'Government jobs'],
    timezone: 'PST',
    metroArea: 'Carson City',
    nearbyMajorCity: 'Reno',
    searchVolume: 'medium'
  },
  {
    id: 'concord-nc',
    city: 'Concord',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'concord-nc',
    country: 'US',
    region: 'Southeast',
    population: '105,240',
    description: 'Concord is part of the Charlotte metro, home to Charlotte Motor Speedway and growing logistics sector. The city offers lower costs than Charlotte proper.',
    topIndustries: ['Motorsports', 'Logistics', 'Retail', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 20 },
    costOfLiving: {
      index: 90,
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Near Charlotte', 'Motorsports events', 'Growing logistics', 'Affordable'],
    timezone: 'EST',
    metroArea: 'Charlotte-Concord-Gastonia',
    nearbyMajorCity: 'Charlotte',
    searchVolume: 'medium'
  },
  {
    id: 'gastonia',
    city: 'Gastonia',
    state: 'North Carolina',
    stateCode: 'NC',
    slug: 'gastonia',
    country: 'US',
    region: 'Southeast',
    population: '80,411',
    description: 'Gastonia is west of Charlotte with manufacturing heritage and growing logistics sector. The city offers affordable living within the Charlotte metro.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 84,
      rent: { studio: 950, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Very affordable', 'Near Charlotte', 'Manufacturing jobs', 'Growing logistics'],
    timezone: 'EST',
    metroArea: 'Charlotte-Concord-Gastonia',
    nearbyMajorCity: 'Charlotte',
    searchVolume: 'medium'
  },
  {
    id: 'rock-hill',
    city: 'Rock Hill',
    state: 'South Carolina',
    stateCode: 'SC',
    slug: 'rock-hill',
    country: 'US',
    region: 'Southeast',
    population: '74,372',
    description: 'Rock Hill is just south of Charlotte in South Carolina, offering lower costs and taxes. The city provides logistics and manufacturing opportunities.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 86,
      rent: { studio: 1000, oneBed: 1200 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Lower SC taxes', 'Near Charlotte', 'Affordable living', 'Growing economy'],
    timezone: 'EST',
    metroArea: 'Charlotte-Concord-Gastonia',
    nearbyMajorCity: 'Charlotte',
    searchVolume: 'medium'
  },
  {
    id: 'athens-ga',
    city: 'Athens',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'athens-ga',
    country: 'US',
    region: 'Southeast',
    population: '127,315',
    description: 'Athens is a vibrant college town home to the University of Georgia. The city offers hospitality and event opportunities with a thriving food scene.',
    topIndustries: ['Education', 'Hospitality', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 12, max: 18 },
    costOfLiving: {
      index: 88,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 300,
      transport: 70
    },
    highlights: ['College town', 'Vibrant food scene', 'Near Atlanta', 'Event opportunities'],
    timezone: 'EST',
    metroArea: 'Athens-Clarke County',
    nearbyMajorCity: 'Atlanta',
    searchVolume: 'low'
  },
  {
    id: 'lorain',
    city: 'Lorain',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'lorain',
    country: 'US',
    region: 'Midwest',
    population: '64,028',
    description: 'Lorain is a Lake Erie port city west of Cleveland with manufacturing and logistics sectors. The city offers very affordable living.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 18 },
    costOfLiving: {
      index: 74,
      rent: { studio: 650, oneBed: 800 },
      groceries: 270,
      transport: 60
    },
    highlights: ['Extremely affordable', 'Port access', 'Near Cleveland', 'Manufacturing jobs'],
    timezone: 'EST',
    metroArea: 'Cleveland-Elyria',
    nearbyMajorCity: 'Cleveland',
    searchVolume: 'low'
  },
  {
    id: 'parma',
    city: 'Parma',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'parma',
    country: 'US',
    region: 'Midwest',
    population: '78,103',
    description: 'Parma is Cleveland\'s largest suburb with affordable living and access to Cleveland job market. The city offers retail and healthcare opportunities.',
    topIndustries: ['Healthcare', 'Retail', 'Manufacturing', 'Logistics'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 79,
      rent: { studio: 750, oneBed: 900 },
      groceries: 280,
      transport: 65
    },
    highlights: ['Affordable suburb', 'Near Cleveland', 'Healthcare jobs', 'Good transit'],
    timezone: 'EST',
    metroArea: 'Cleveland-Elyria',
    nearbyMajorCity: 'Cleveland',
    searchVolume: 'low'
  },
  {
    id: 'middletown-oh',
    city: 'Middletown',
    state: 'Ohio',
    stateCode: 'OH',
    slug: 'middletown-oh',
    country: 'US',
    region: 'Midwest',
    population: '48,861',
    description: 'Middletown is between Cincinnati and Dayton with manufacturing and logistics opportunities. The city offers extremely affordable living.',
    topIndustries: ['Manufacturing', 'Logistics', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 74,
      rent: { studio: 650, oneBed: 800 },
      groceries: 270,
      transport: 60
    },
    highlights: ['Very affordable', 'Between Cincy and Dayton', 'Manufacturing jobs', 'Growing logistics'],
    timezone: 'EST',
    metroArea: 'Cincinnati',
    nearbyMajorCity: 'Cincinnati',
    searchVolume: 'low'
  },
  {
    id: 'florence-ky',
    city: 'Florence',
    state: 'Kentucky',
    stateCode: 'KY',
    slug: 'florence-ky',
    country: 'US',
    region: 'Midwest',
    population: '33,458',
    description: 'Florence is part of the Cincinnati metro in Northern Kentucky. The city offers retail and logistics opportunities with lower Kentucky taxes.',
    topIndustries: ['Retail', 'Logistics', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 19 },
    costOfLiving: {
      index: 86,
      rent: { studio: 950, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Lower KY taxes', 'Near Cincinnati', 'Retail hub', 'Growing logistics'],
    timezone: 'EST',
    metroArea: 'Cincinnati',
    nearbyMajorCity: 'Cincinnati',
    searchVolume: 'low'
  },
  // Indeed Flex Active Markets - Additional Cities
  {
    id: 'cartersville',
    city: 'Cartersville',
    state: 'Georgia',
    stateCode: 'GA',
    slug: 'cartersville',
    country: 'US',
    region: 'Southeast',
    population: '22,600',
    description: 'Cartersville is located northwest of Atlanta with strong manufacturing and logistics sectors. Home to major employers like Anheuser-Busch and Toyo Tires, the city offers steady flexible work opportunities.',
    topIndustries: ['Manufacturing', 'Logistics', 'Distribution', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 85,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Major manufacturing hub', 'Near Atlanta metro', 'Growing logistics sector', 'Affordable living'],
    timezone: 'EST',
    metroArea: 'Atlanta-Sandy Springs-Alpharetta',
    nearbyMajorCity: 'Atlanta',
    searchVolume: 'medium'
  },
  {
    id: 'washington-dc',
    city: 'Washington',
    state: 'District of Columbia',
    stateCode: 'DC',
    slug: 'washington-dc',
    country: 'US',
    region: 'Mid-Atlantic',
    population: '689,545',
    description: 'Washington D.C. is the nation\'s capital with a unique job market driven by government, hospitality, and tourism. The city offers abundant flexible work in hotels, restaurants, events, and healthcare.',
    topIndustries: ['Government', 'Hospitality', 'Tourism', 'Healthcare'],
    avgHourlyWage: { min: 16, max: 26 },
    costOfLiving: {
      index: 148,
      rent: { studio: 1800, oneBed: 2200 },
      groceries: 380,
      transport: 130
    },
    highlights: ['High wages', 'Year-round tourism', 'Major events venue', 'Diverse hospitality sector'],
    timezone: 'EST',
    metroArea: 'Washington-Arlington-Alexandria',
    searchVolume: 'high'
  },
  {
    id: 'bentonville',
    city: 'Bentonville',
    state: 'Arkansas',
    stateCode: 'AR',
    slug: 'bentonville',
    country: 'US',
    region: 'South',
    population: '54,909',
    description: 'Bentonville is the home of Walmart headquarters and a fast-growing city in Northwest Arkansas. The area offers opportunities in retail, corporate services, logistics, and hospitality.',
    topIndustries: ['Retail', 'Corporate', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 88,
      rent: { studio: 950, oneBed: 1150 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Walmart HQ', 'Fast-growing region', 'Strong logistics', 'Corporate opportunities'],
    timezone: 'CST',
    metroArea: 'Fayetteville-Springdale-Rogers',
    searchVolume: 'medium'
  },
  {
    id: 'fort-mill',
    city: 'Fort Mill',
    state: 'South Carolina',
    stateCode: 'SC',
    slug: 'fort-mill',
    country: 'US',
    region: 'Southeast',
    population: '25,745',
    description: 'Fort Mill is a rapidly growing suburb of Charlotte with strong logistics and manufacturing presence. The city offers lower South Carolina taxes while accessing the greater Charlotte job market.',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 92,
      rent: { studio: 1100, oneBed: 1300 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Lower SC taxes', 'Near Charlotte', 'Growing logistics hub', 'Major distribution centers'],
    timezone: 'EST',
    metroArea: 'Charlotte-Concord-Gastonia',
    nearbyMajorCity: 'Charlotte',
    searchVolume: 'medium'
  },
  // ============================================
  // EXPANDED CITIES - Additional 50+ for long-tail SEO
  // ============================================
  // TEXAS - Additional markets
  {
    id: 'san-antonio',
    city: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'san-antonio',
    country: 'US',
    region: 'South',
    population: '1,434,625',
    description: 'San Antonio is Texas\'s second-largest city, known for tourism, military bases, and healthcare. The city offers strong hospitality and logistics opportunities.',
    topIndustries: ['Tourism', 'Healthcare', 'Military', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 91,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Major tourism economy', 'Low cost of living', 'Growing tech sector', 'Military base employment'],
    timezone: 'CST',
    metroArea: 'San Antonio-New Braunfels',
    searchVolume: 'high'
  },
  {
    id: 'fort-worth',
    city: 'Fort Worth',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'fort-worth',
    country: 'US',
    region: 'South',
    population: '956,709',
    description: 'Fort Worth is part of the Dallas-Fort Worth metroplex with a strong manufacturing and logistics presence.',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 93,
      rent: { studio: 1050, oneBed: 1250 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Part of DFW metroplex', 'Major distribution hub', 'Lower cost than Dallas', 'Growing job market'],
    timezone: 'CST',
    metroArea: 'Dallas-Fort Worth-Arlington',
    nearbyMajorCity: 'Dallas',
    searchVolume: 'high'
  },
  {
    id: 'el-paso',
    city: 'El Paso',
    state: 'Texas',
    stateCode: 'TX',
    slug: 'el-paso',
    country: 'US',
    region: 'South',
    population: '678,815',
    description: 'El Paso is a border city with strong logistics, manufacturing, and military presence.',
    topIndustries: ['Logistics', 'Manufacturing', 'Military', 'Healthcare'],
    avgHourlyWage: { min: 12, max: 18 },
    costOfLiving: {
      index: 84,
      rent: { studio: 700, oneBed: 850 },
      groceries: 280,
      transport: 65
    },
    highlights: ['Very low cost of living', 'Border trade economy', 'Fort Bliss employment', 'Bilingual advantage'],
    timezone: 'MST',
    searchVolume: 'medium'
  },
  // CALIFORNIA - Additional markets
  {
    id: 'san-francisco',
    city: 'San Francisco',
    state: 'California',
    stateCode: 'CA',
    slug: 'san-francisco',
    country: 'US',
    region: 'West',
    population: '873,965',
    description: 'San Francisco is a major tech and financial hub with high wages but also high cost of living.',
    topIndustries: ['Technology', 'Finance', 'Tourism', 'Healthcare'],
    avgHourlyWage: { min: 18, max: 30 },
    costOfLiving: {
      index: 180,
      rent: { studio: 2500, oneBed: 3200 },
      groceries: 450,
      transport: 130
    },
    highlights: ['Highest minimum wage in US', 'Tech industry proximity', 'Strong hospitality sector', 'Public transit'],
    timezone: 'PST',
    metroArea: 'San Francisco-Oakland-Berkeley',
    searchVolume: 'high'
  },
  {
    id: 'san-jose',
    city: 'San Jose',
    state: 'California',
    stateCode: 'CA',
    slug: 'san-jose',
    country: 'US',
    region: 'West',
    population: '1,013,240',
    description: 'San Jose is the heart of Silicon Valley with excellent wages across all industries.',
    topIndustries: ['Technology', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 17, max: 28 },
    costOfLiving: {
      index: 166,
      rent: { studio: 2200, oneBed: 2800 },
      groceries: 420,
      transport: 120
    },
    highlights: ['Silicon Valley location', 'High wages', 'Tech spillover jobs', 'Good public transit'],
    timezone: 'PST',
    metroArea: 'San Jose-Sunnyvale-Santa Clara',
    searchVolume: 'high'
  },
  {
    id: 'sacramento',
    city: 'Sacramento',
    state: 'California',
    stateCode: 'CA',
    slug: 'sacramento',
    country: 'US',
    region: 'West',
    population: '528,001',
    description: 'Sacramento is California\'s capital with government jobs and growing healthcare sector.',
    topIndustries: ['Government', 'Healthcare', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      index: 120,
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 370,
      transport: 100
    },
    highlights: ['State government jobs', 'Lower cost than Bay Area', 'Growing tech scene', 'Farm-to-fork culture'],
    timezone: 'PST',
    metroArea: 'Sacramento-Roseville-Folsom',
    searchVolume: 'medium'
  },
  {
    id: 'san-diego',
    city: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    slug: 'san-diego',
    country: 'US',
    region: 'West',
    population: '1,386,932',
    description: 'San Diego combines tourism, military, and biotech industries with great weather.',
    topIndustries: ['Tourism', 'Military', 'Biotech', 'Healthcare'],
    avgHourlyWage: { min: 16, max: 26 },
    costOfLiving: {
      index: 146,
      rent: { studio: 1900, oneBed: 2400 },
      groceries: 400,
      transport: 110
    },
    highlights: ['Strong tourism economy', 'Military base employment', 'Biotech growth', 'Year-round good weather'],
    timezone: 'PST',
    metroArea: 'San Diego-Chula Vista-Carlsbad',
    searchVolume: 'high'
  },
  {
    id: 'fresno',
    city: 'Fresno',
    state: 'California',
    stateCode: 'CA',
    slug: 'fresno',
    country: 'US',
    region: 'West',
    population: '542,107',
    description: 'Fresno is the agricultural capital of America with strong logistics and food processing.',
    topIndustries: ['Agriculture', 'Food Processing', 'Logistics', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 98,
      rent: { studio: 950, oneBed: 1150 },
      groceries: 320,
      transport: 80
    },
    highlights: ['Low cost of living for CA', 'Agricultural economy', 'Food processing jobs', 'Warehouse growth'],
    timezone: 'PST',
    metroArea: 'Fresno-Clovis',
    searchVolume: 'medium'
  },
  // FLORIDA - Additional markets
  {
    id: 'jacksonville',
    city: 'Jacksonville',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'jacksonville',
    country: 'US',
    region: 'Southeast',
    population: '949,611',
    description: 'Jacksonville is Florida\'s largest city by area with major logistics and financial services.',
    topIndustries: ['Logistics', 'Finance', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 96,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Major port city', 'No state income tax', 'Growing logistics hub', 'Affordable for Florida'],
    timezone: 'EST',
    metroArea: 'Jacksonville',
    searchVolume: 'high'
  },
  {
    id: 'tampa',
    city: 'Tampa',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'tampa',
    country: 'US',
    region: 'Southeast',
    population: '384,959',
    description: 'Tampa is a major Gulf Coast city with tourism, healthcare, and finance industries.',
    topIndustries: ['Tourism', 'Finance', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 102,
      rent: { studio: 1300, oneBed: 1600 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Growing tech sector', 'No state income tax', 'Strong tourism', 'Cruise ship economy'],
    timezone: 'EST',
    metroArea: 'Tampa-St. Petersburg-Clearwater',
    searchVolume: 'high'
  },
  {
    id: 'miami',
    city: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'miami',
    country: 'US',
    region: 'Southeast',
    population: '442,241',
    description: 'Miami is an international hub for finance, tourism, and hospitality with high tip potential.',
    topIndustries: ['Tourism', 'Finance', 'Hospitality', 'Logistics'],
    avgHourlyWage: { min: 15, max: 25 },
    costOfLiving: {
      index: 128,
      rent: { studio: 1800, oneBed: 2300 },
      groceries: 380,
      transport: 105
    },
    highlights: ['International gateway', 'High tip potential', 'Year-round tourism', 'No state income tax'],
    timezone: 'EST',
    metroArea: 'Miami-Fort Lauderdale-Pompano Beach',
    searchVolume: 'high'
  },
  {
    id: 'st-petersburg',
    city: 'St. Petersburg',
    state: 'Florida',
    stateCode: 'FL',
    slug: 'st-petersburg',
    country: 'US',
    region: 'Southeast',
    population: '258,308',
    description: 'St. Petersburg is a vibrant waterfront city with strong tourism and healthcare.',
    topIndustries: ['Tourism', 'Healthcare', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 100,
      rent: { studio: 1250, oneBed: 1500 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Beach tourism economy', 'Growing arts scene', 'No state income tax', 'Lower cost than Miami'],
    timezone: 'EST',
    metroArea: 'Tampa-St. Petersburg-Clearwater',
    nearbyMajorCity: 'Tampa',
    searchVolume: 'medium'
  },
  // NEW YORK - Additional markets
  {
    id: 'new-york',
    city: 'New York City',
    state: 'New York',
    stateCode: 'NY',
    slug: 'new-york',
    country: 'US',
    region: 'Northeast',
    population: '8,336,817',
    description: 'New York City is the nation\'s largest city with unparalleled hospitality and service opportunities.',
    topIndustries: ['Finance', 'Hospitality', 'Tourism', 'Healthcare'],
    avgHourlyWage: { min: 18, max: 30 },
    costOfLiving: {
      index: 187,
      rent: { studio: 2800, oneBed: 3500 },
      groceries: 480,
      transport: 140
    },
    highlights: ['Highest minimum wage', 'Massive hospitality sector', 'High tip potential', '24/7 economy'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    searchVolume: 'high'
  },
  {
    id: 'buffalo',
    city: 'Buffalo',
    state: 'New York',
    stateCode: 'NY',
    slug: 'buffalo',
    country: 'US',
    region: 'Northeast',
    population: '278,349',
    description: 'Buffalo is experiencing a renaissance with healthcare, manufacturing, and logistics growth.',
    topIndustries: ['Healthcare', 'Manufacturing', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 88,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 70
    },
    highlights: ['Very low cost of living', 'Growing job market', 'Healthcare hub', 'Affordable housing'],
    timezone: 'EST',
    metroArea: 'Buffalo-Cheektowaga',
    searchVolume: 'medium'
  },
  {
    id: 'rochester',
    city: 'Rochester',
    state: 'New York',
    stateCode: 'NY',
    slug: 'rochester',
    country: 'US',
    region: 'Northeast',
    population: '211,328',
    description: 'Rochester has strong healthcare, education, and manufacturing industries.',
    topIndustries: ['Healthcare', 'Education', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 90,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 310,
      transport: 75
    },
    highlights: ['Major healthcare employers', 'University economy', 'Affordable', 'Four seasons'],
    timezone: 'EST',
    metroArea: 'Rochester',
    searchVolume: 'medium'
  },
  // ILLINOIS - Additional markets
  {
    id: 'aurora',
    city: 'Aurora',
    state: 'Illinois',
    stateCode: 'IL',
    slug: 'aurora',
    country: 'US',
    region: 'Midwest',
    population: '180,542',
    description: 'Aurora is Illinois\' second-largest city with strong logistics and manufacturing.',
    topIndustries: ['Logistics', 'Manufacturing', 'Healthcare', 'Retail'],
    avgHourlyWage: { min: 15, max: 22 },
    costOfLiving: {
      index: 94,
      rent: { studio: 1050, oneBed: 1300 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Growing warehouse district', 'Lower cost than Chicago', 'Near Chicago job market', 'Diverse economy'],
    timezone: 'CST',
    metroArea: 'Chicago-Naperville-Elgin',
    nearbyMajorCity: 'Chicago',
    searchVolume: 'medium'
  },
  // PENNSYLVANIA - Additional markets
  {
    id: 'pittsburgh',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    stateCode: 'PA',
    slug: 'pittsburgh',
    country: 'US',
    region: 'Northeast',
    population: '302,971',
    description: 'Pittsburgh has transformed from steel to healthcare, education, and technology.',
    topIndustries: ['Healthcare', 'Education', 'Technology', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 93,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Major healthcare employers', 'University economy', 'Affordable', 'Growing tech scene'],
    timezone: 'EST',
    metroArea: 'Pittsburgh',
    searchVolume: 'high'
  },
  // ARIZONA - Additional markets
  {
    id: 'tucson',
    city: 'Tucson',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'tucson',
    country: 'US',
    region: 'West',
    population: '542,629',
    description: 'Tucson is Arizona\'s second-largest city with aerospace, healthcare, and education.',
    topIndustries: ['Healthcare', 'Aerospace', 'Education', 'Tourism'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 93,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 310,
      transport: 75
    },
    highlights: ['University of Arizona', 'Lower cost than Phoenix', 'Aerospace industry', 'Growing tech'],
    timezone: 'MST',
    metroArea: 'Tucson',
    searchVolume: 'medium'
  },
  {
    id: 'mesa',
    city: 'Mesa',
    state: 'Arizona',
    stateCode: 'AZ',
    slug: 'mesa',
    country: 'US',
    region: 'West',
    population: '504,258',
    description: 'Mesa is part of the Phoenix metro with strong healthcare and manufacturing.',
    topIndustries: ['Healthcare', 'Manufacturing', 'Retail', 'Logistics'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 96,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 80
    },
    highlights: ['Part of Phoenix metro', 'Growing healthcare sector', 'Lower cost than Phoenix', 'Aerospace jobs'],
    timezone: 'MST',
    metroArea: 'Phoenix-Mesa-Chandler',
    nearbyMajorCity: 'Phoenix',
    searchVolume: 'medium'
  },
  // COLORADO - Additional markets
  {
    id: 'denver',
    city: 'Denver',
    state: 'Colorado',
    stateCode: 'CO',
    slug: 'denver',
    country: 'US',
    region: 'West',
    population: '715,522',
    description: 'Denver is a thriving city with strong hospitality, logistics, and healthcare sectors.',
    topIndustries: ['Tourism', 'Logistics', 'Healthcare', 'Technology'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      index: 112,
      rent: { studio: 1500, oneBed: 1850 },
      groceries: 360,
      transport: 95
    },
    highlights: ['Strong hospitality sector', 'Growing tech scene', 'Major distribution hub', 'Outdoor lifestyle'],
    timezone: 'MST',
    metroArea: 'Denver-Aurora-Lakewood',
    searchVolume: 'high'
  },
  {
    id: 'colorado-springs',
    city: 'Colorado Springs',
    state: 'Colorado',
    stateCode: 'CO',
    slug: 'colorado-springs',
    country: 'US',
    region: 'West',
    population: '478,961',
    description: 'Colorado Springs has major military presence and growing tech sector.',
    topIndustries: ['Military', 'Tourism', 'Healthcare', 'Technology'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 101,
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Major military bases', 'Lower cost than Denver', 'Outdoor tourism', 'Growing tech'],
    timezone: 'MST',
    metroArea: 'Colorado Springs',
    searchVolume: 'medium'
  },
  // WASHINGTON - Additional markets
  {
    id: 'seattle',
    city: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    slug: 'seattle',
    country: 'US',
    region: 'West',
    population: '737,015',
    description: 'Seattle is a tech hub with high wages, major employers, and no state income tax.',
    topIndustries: ['Technology', 'Healthcare', 'Hospitality', 'Logistics'],
    avgHourlyWage: { min: 18, max: 28 },
    costOfLiving: {
      index: 156,
      rent: { studio: 1900, oneBed: 2400 },
      groceries: 400,
      transport: 115
    },
    highlights: ['No state income tax', 'Tech giant employers', 'High minimum wage', 'Strong hospitality'],
    timezone: 'PST',
    metroArea: 'Seattle-Tacoma-Bellevue',
    searchVolume: 'high'
  },
  {
    id: 'tacoma',
    city: 'Tacoma',
    state: 'Washington',
    stateCode: 'WA',
    slug: 'tacoma',
    country: 'US',
    region: 'West',
    population: '219,346',
    description: 'Tacoma offers lower costs than Seattle while being part of the metro job market.',
    topIndustries: ['Logistics', 'Healthcare', 'Manufacturing', 'Retail'],
    avgHourlyWage: { min: 16, max: 24 },
    costOfLiving: {
      index: 120,
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 360,
      transport: 95
    },
    highlights: ['Lower cost than Seattle', 'Major port', 'No state income tax', 'Good transit to Seattle'],
    timezone: 'PST',
    metroArea: 'Seattle-Tacoma-Bellevue',
    nearbyMajorCity: 'Seattle',
    searchVolume: 'medium'
  },
  // MASSACHUSETTS
  {
    id: 'boston',
    city: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    slug: 'boston',
    country: 'US',
    region: 'Northeast',
    population: '675,647',
    description: 'Boston is a major healthcare and education hub with strong hospitality demand.',
    topIndustries: ['Healthcare', 'Education', 'Finance', 'Hospitality'],
    avgHourlyWage: { min: 16, max: 26 },
    costOfLiving: {
      index: 152,
      rent: { studio: 2200, oneBed: 2800 },
      groceries: 420,
      transport: 110
    },
    highlights: ['World-class healthcare', 'University economy', 'Strong hospitality', 'Public transit'],
    timezone: 'EST',
    metroArea: 'Boston-Cambridge-Newton',
    searchVolume: 'high'
  },
  // MICHIGAN
  {
    id: 'detroit',
    city: 'Detroit',
    state: 'Michigan',
    stateCode: 'MI',
    slug: 'detroit',
    country: 'US',
    region: 'Midwest',
    population: '639,111',
    description: 'Detroit is experiencing a comeback with automotive, healthcare, and tech growth.',
    topIndustries: ['Automotive', 'Healthcare', 'Manufacturing', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 89,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Low cost of living', 'Automotive industry', 'Growing downtown', 'Casino employment'],
    timezone: 'EST',
    metroArea: 'Detroit-Warren-Dearborn',
    searchVolume: 'high'
  },
  {
    id: 'grand-rapids',
    city: 'Grand Rapids',
    state: 'Michigan',
    stateCode: 'MI',
    slug: 'grand-rapids',
    country: 'US',
    region: 'Midwest',
    population: '198,917',
    description: 'Grand Rapids is a growing city with strong manufacturing and healthcare.',
    topIndustries: ['Manufacturing', 'Healthcare', 'Hospitality', 'Retail'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 90,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 310,
      transport: 75
    },
    highlights: ['Growing economy', 'Affordable', 'Strong manufacturing', 'Craft beer tourism'],
    timezone: 'EST',
    metroArea: 'Grand Rapids-Kentwood',
    searchVolume: 'medium'
  },
  // MINNESOTA
  {
    id: 'minneapolis',
    city: 'Minneapolis',
    state: 'Minnesota',
    stateCode: 'MN',
    slug: 'minneapolis',
    country: 'US',
    region: 'Midwest',
    population: '429,954',
    description: 'Minneapolis is a major corporate and healthcare hub with strong hospitality.',
    topIndustries: ['Healthcare', 'Finance', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      index: 105,
      rent: { studio: 1200, oneBed: 1500 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Fortune 500 headquarters', 'Strong healthcare', 'Indoor hospitality demand', 'Growing tech'],
    timezone: 'CST',
    metroArea: 'Minneapolis-St. Paul-Bloomington',
    searchVolume: 'high'
  },
  // MISSOURI
  {
    id: 'st-louis',
    city: 'St. Louis',
    state: 'Missouri',
    stateCode: 'MO',
    slug: 'st-louis',
    country: 'US',
    region: 'Midwest',
    population: '301,578',
    description: 'St. Louis has major healthcare, finance, and logistics industries.',
    topIndustries: ['Healthcare', 'Finance', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 91,
      rent: { studio: 950, oneBed: 1150 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Very affordable', 'Major healthcare employers', 'Growing tech scene', 'Central location'],
    timezone: 'CST',
    metroArea: 'St. Louis',
    searchVolume: 'high'
  },
  {
    id: 'kansas-city',
    city: 'Kansas City',
    state: 'Missouri',
    stateCode: 'MO',
    slug: 'kansas-city',
    country: 'US',
    region: 'Midwest',
    population: '508,090',
    description: 'Kansas City is a logistics and healthcare hub with low cost of living.',
    topIndustries: ['Logistics', 'Healthcare', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 90,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Major logistics hub', 'Affordable', 'Growing tech sector', 'Sports tourism'],
    timezone: 'CST',
    metroArea: 'Kansas City',
    searchVolume: 'high'
  },
  // MARYLAND
  {
    id: 'baltimore',
    city: 'Baltimore',
    state: 'Maryland',
    stateCode: 'MD',
    slug: 'baltimore',
    country: 'US',
    region: 'Northeast',
    population: '585,708',
    description: 'Baltimore has major healthcare and port industries with proximity to DC.',
    topIndustries: ['Healthcare', 'Logistics', 'Education', 'Hospitality'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      index: 107,
      rent: { studio: 1300, oneBed: 1600 },
      groceries: 350,
      transport: 95
    },
    highlights: ['Johns Hopkins employment', 'Major port city', 'Near DC job market', 'Growing tech'],
    timezone: 'EST',
    metroArea: 'Baltimore-Columbia-Towson',
    nearbyMajorCity: 'Washington DC',
    searchVolume: 'high'
  },
  // LOUISIANA
  {
    id: 'new-orleans',
    city: 'New Orleans',
    state: 'Louisiana',
    stateCode: 'LA',
    slug: 'new-orleans',
    country: 'US',
    region: 'South',
    population: '383,997',
    description: 'New Orleans is a tourism and hospitality powerhouse with exceptional tip potential.',
    topIndustries: ['Tourism', 'Hospitality', 'Healthcare', 'Logistics'],
    avgHourlyWage: { min: 13, max: 22 },
    costOfLiving: {
      index: 96,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 320,
      transport: 85
    },
    highlights: ['Exceptional tip potential', 'Year-round tourism', 'Unique hospitality culture', 'Affordable'],
    timezone: 'CST',
    metroArea: 'New Orleans-Metairie',
    searchVolume: 'high'
  },
  // OREGON
  {
    id: 'portland',
    city: 'Portland',
    state: 'Oregon',
    stateCode: 'OR',
    slug: 'portland',
    country: 'US',
    region: 'West',
    population: '652,503',
    description: 'Portland has a thriving food and beverage scene with no state sales tax.',
    topIndustries: ['Hospitality', 'Technology', 'Healthcare', 'Manufacturing'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      index: 118,
      rent: { studio: 1400, oneBed: 1750 },
      groceries: 370,
      transport: 100
    },
    highlights: ['No state sales tax', 'Food scene jobs', 'Growing tech', 'Strong hospitality'],
    timezone: 'PST',
    metroArea: 'Portland-Vancouver-Hillsboro',
    searchVolume: 'high'
  },
  // WISCONSIN
  {
    id: 'milwaukee',
    city: 'Milwaukee',
    state: 'Wisconsin',
    stateCode: 'WI',
    slug: 'milwaukee',
    country: 'US',
    region: 'Midwest',
    population: '577,222',
    description: 'Milwaukee has strong manufacturing and healthcare with low cost of living.',
    topIndustries: ['Manufacturing', 'Healthcare', 'Hospitality', 'Finance'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 91,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 310,
      transport: 80
    },
    highlights: ['Very affordable', 'Manufacturing jobs', 'Growing hospitality', 'Lakefront tourism'],
    timezone: 'CST',
    metroArea: 'Milwaukee-Waukesha',
    searchVolume: 'medium'
  },
  // INDIANA
  {
    id: 'indianapolis',
    city: 'Indianapolis',
    state: 'Indiana',
    stateCode: 'IN',
    slug: 'indianapolis',
    country: 'US',
    region: 'Midwest',
    population: '887,642',
    description: 'Indianapolis is Indiana\'s capital with strong logistics, healthcare, and event tourism.',
    topIndustries: ['Logistics', 'Healthcare', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 89,
      rent: { studio: 900, oneBed: 1100 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Major events (Indy 500, conventions)', 'Growing logistics hub', 'Very affordable', 'Central location'],
    timezone: 'EST',
    metroArea: 'Indianapolis-Carmel-Anderson',
    searchVolume: 'high'
  },
  // TENNESSEE - Additional
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'Tennessee',
    stateCode: 'TN',
    slug: 'memphis',
    country: 'US',
    region: 'South',
    population: '633,104',
    description: 'Memphis is home to FedEx\'s global hub with massive logistics employment.',
    topIndustries: ['Logistics', 'Healthcare', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 86,
      rent: { studio: 850, oneBed: 1000 },
      groceries: 290,
      transport: 70
    },
    highlights: ['FedEx headquarters', 'No state income tax', 'Very affordable', 'Music tourism'],
    timezone: 'CST',
    metroArea: 'Memphis',
    searchVolume: 'high'
  },
  // KENTUCKY
  {
    id: 'louisville',
    city: 'Louisville',
    state: 'Kentucky',
    stateCode: 'KY',
    slug: 'louisville',
    country: 'US',
    region: 'South',
    population: '617,638',
    description: 'Louisville is UPS\'s global hub with strong logistics and hospitality.',
    topIndustries: ['Logistics', 'Healthcare', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 90,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 75
    },
    highlights: ['UPS Worldport hub', 'Derby tourism', 'Affordable', 'Growing bourbon tourism'],
    timezone: 'EST',
    metroArea: 'Louisville/Jefferson County',
    searchVolume: 'high'
  },
  // NEW JERSEY
  {
    id: 'newark',
    city: 'Newark',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'newark',
    country: 'US',
    region: 'Northeast',
    population: '311,549',
    description: 'Newark is part of the NYC metro with major logistics and healthcare.',
    topIndustries: ['Logistics', 'Healthcare', 'Finance', 'Hospitality'],
    avgHourlyWage: { min: 15, max: 24 },
    costOfLiving: {
      index: 115,
      rent: { studio: 1400, oneBed: 1750 },
      groceries: 370,
      transport: 100
    },
    highlights: ['NYC metro jobs', 'Major airport hub', 'Port employment', 'Lower cost than NYC'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    nearbyMajorCity: 'New York',
    searchVolume: 'medium'
  },
  {
    id: 'jersey-city',
    city: 'Jersey City',
    state: 'New Jersey',
    stateCode: 'NJ',
    slug: 'jersey-city',
    country: 'US',
    region: 'Northeast',
    population: '292,449',
    description: 'Jersey City offers NYC job access with slightly lower costs.',
    topIndustries: ['Finance', 'Healthcare', 'Hospitality', 'Logistics'],
    avgHourlyWage: { min: 16, max: 25 },
    costOfLiving: {
      index: 135,
      rent: { studio: 2000, oneBed: 2500 },
      groceries: 400,
      transport: 110
    },
    highlights: ['NYC transit access', 'Growing hospitality', 'Finance jobs', 'Lower rent than NYC'],
    timezone: 'EST',
    metroArea: 'New York-Newark-Jersey City',
    nearbyMajorCity: 'New York',
    searchVolume: 'medium'
  },
  // UTAH
  {
    id: 'salt-lake-city',
    city: 'Salt Lake City',
    state: 'Utah',
    stateCode: 'UT',
    slug: 'salt-lake-city',
    country: 'US',
    region: 'West',
    population: '199,723',
    description: 'Salt Lake City is growing rapidly with tech, logistics, and tourism.',
    topIndustries: ['Technology', 'Logistics', 'Tourism', 'Healthcare'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 102,
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 330,
      transport: 85
    },
    highlights: ['Booming tech scene', 'Ski tourism', 'Growing logistics', 'Outdoor lifestyle'],
    timezone: 'MST',
    metroArea: 'Salt Lake City',
    searchVolume: 'medium'
  },
  // HAWAII
  {
    id: 'honolulu',
    city: 'Honolulu',
    state: 'Hawaii',
    stateCode: 'HI',
    slug: 'honolulu',
    country: 'US',
    region: 'West',
    population: '350,964',
    description: 'Honolulu is a tourism paradise with exceptional hospitality opportunities.',
    topIndustries: ['Tourism', 'Hospitality', 'Military', 'Healthcare'],
    avgHourlyWage: { min: 16, max: 26 },
    costOfLiving: {
      index: 169,
      rent: { studio: 1800, oneBed: 2200 },
      groceries: 500,
      transport: 120
    },
    highlights: ['Year-round tourism', 'High hospitality wages', 'Tip potential', 'Military base employment'],
    timezone: 'HST',
    searchVolume: 'medium'
  },
  // VIRGINIA
  {
    id: 'virginia-beach',
    city: 'Virginia Beach',
    state: 'Virginia',
    stateCode: 'VA',
    slug: 'virginia-beach',
    country: 'US',
    region: 'Southeast',
    population: '459,470',
    description: 'Virginia Beach combines military employment with beach tourism.',
    topIndustries: ['Military', 'Tourism', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 101,
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Beach tourism', 'Military base employment', 'Growing tech', 'Lower cost than DC'],
    timezone: 'EST',
    metroArea: 'Virginia Beach-Norfolk-Newport News',
    searchVolume: 'medium'
  },
  {
    id: 'richmond',
    city: 'Richmond',
    state: 'Virginia',
    stateCode: 'VA',
    slug: 'richmond',
    country: 'US',
    region: 'Southeast',
    population: '226,610',
    description: 'Richmond is Virginia\'s capital with growing hospitality and healthcare.',
    topIndustries: ['Healthcare', 'Finance', 'Government', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 99,
      rent: { studio: 1150, oneBed: 1400 },
      groceries: 330,
      transport: 85
    },
    highlights: ['State capital jobs', 'Growing food scene', 'Affordable', 'University employment'],
    timezone: 'EST',
    metroArea: 'Richmond',
    searchVolume: 'medium'
  },
  // SOUTH CAROLINA - Additional
  {
    id: 'charleston',
    city: 'Charleston',
    state: 'South Carolina',
    stateCode: 'SC',
    slug: 'charleston',
    country: 'US',
    region: 'Southeast',
    population: '150,227',
    description: 'Charleston is a major tourism destination with strong hospitality demand.',
    topIndustries: ['Tourism', 'Hospitality', 'Healthcare', 'Logistics'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 107,
      rent: { studio: 1400, oneBed: 1700 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Major tourism destination', 'Growing tech scene', 'Port employment', 'Southern hospitality culture'],
    timezone: 'EST',
    metroArea: 'Charleston-North Charleston',
    searchVolume: 'medium'
  },
  // ALABAMA
  {
    id: 'birmingham',
    city: 'Birmingham',
    state: 'Alabama',
    stateCode: 'AL',
    slug: 'birmingham',
    country: 'US',
    region: 'Southeast',
    population: '200,733',
    description: 'Birmingham is Alabama\'s largest city with strong healthcare and finance sectors.',
    topIndustries: ['Healthcare', 'Finance', 'Manufacturing', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 87,
      rent: { studio: 800, oneBed: 1000 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Major healthcare employers', 'Very affordable', 'Growing food scene', 'Central location'],
    timezone: 'CST',
    metroArea: 'Birmingham-Hoover',
    searchVolume: 'medium'
  },
  // OKLAHOMA
  {
    id: 'oklahoma-city',
    city: 'Oklahoma City',
    state: 'Oklahoma',
    stateCode: 'OK',
    slug: 'oklahoma-city',
    country: 'US',
    region: 'South',
    population: '681,054',
    description: 'Oklahoma City is growing with energy, healthcare, and logistics industries.',
    topIndustries: ['Energy', 'Healthcare', 'Logistics', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 86,
      rent: { studio: 750, oneBed: 950 },
      groceries: 290,
      transport: 70
    },
    highlights: ['Very low cost of living', 'Growing job market', 'Thunder basketball tourism', 'Energy industry'],
    timezone: 'CST',
    metroArea: 'Oklahoma City',
    searchVolume: 'medium'
  },
  {
    id: 'tulsa',
    city: 'Tulsa',
    state: 'Oklahoma',
    stateCode: 'OK',
    slug: 'tulsa',
    country: 'US',
    region: 'South',
    population: '413,066',
    description: 'Tulsa has energy, aerospace, and healthcare industries with very low costs.',
    topIndustries: ['Energy', 'Aerospace', 'Healthcare', 'Hospitality'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 84,
      rent: { studio: 700, oneBed: 900 },
      groceries: 280,
      transport: 65
    },
    highlights: ['Extremely affordable', 'Growing tech scene', 'Remote worker incentives', 'Energy jobs'],
    timezone: 'CST',
    metroArea: 'Tulsa',
    searchVolume: 'medium'
  },
  // CONNECTICUT
  {
    id: 'hartford',
    city: 'Hartford',
    state: 'Connecticut',
    stateCode: 'CT',
    slug: 'hartford',
    country: 'US',
    region: 'Northeast',
    population: '121,054',
    description: 'Hartford is the insurance capital of the US with strong healthcare.',
    topIndustries: ['Insurance', 'Healthcare', 'Finance', 'Manufacturing'],
    avgHourlyWage: { min: 15, max: 23 },
    costOfLiving: {
      index: 108,
      rent: { studio: 1100, oneBed: 1350 },
      groceries: 350,
      transport: 90
    },
    highlights: ['Insurance industry hub', 'Healthcare employers', 'Near NYC/Boston', 'University employment'],
    timezone: 'EST',
    metroArea: 'Hartford-East Hartford-Middletown',
    searchVolume: 'low'
  },
  // RHODE ISLAND
  {
    id: 'providence',
    city: 'Providence',
    state: 'Rhode Island',
    stateCode: 'RI',
    slug: 'providence',
    country: 'US',
    region: 'Northeast',
    population: '190,934',
    description: 'Providence has strong healthcare, education, and hospitality sectors.',
    topIndustries: ['Healthcare', 'Education', 'Hospitality', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 105,
      rent: { studio: 1200, oneBed: 1500 },
      groceries: 340,
      transport: 90
    },
    highlights: ['Strong food scene', 'University economy', 'Near Boston jobs', 'Growing tech'],
    timezone: 'EST',
    metroArea: 'Providence-Warwick',
    searchVolume: 'low'
  },
  // NEW HAMPSHIRE
  {
    id: 'manchester-nh',
    city: 'Manchester',
    state: 'New Hampshire',
    stateCode: 'NH',
    slug: 'manchester-nh',
    country: 'US',
    region: 'Northeast',
    population: '115,644',
    description: 'Manchester is NH\'s largest city with no state income or sales tax.',
    topIndustries: ['Healthcare', 'Manufacturing', 'Retail', 'Hospitality'],
    avgHourlyWage: { min: 14, max: 22 },
    costOfLiving: {
      index: 106,
      rent: { studio: 1200, oneBed: 1450 },
      groceries: 350,
      transport: 90
    },
    highlights: ['No state income tax', 'No sales tax', 'Near Boston jobs', 'Growing tech'],
    timezone: 'EST',
    searchVolume: 'low'
  },
  // NEW MEXICO
  {
    id: 'albuquerque',
    city: 'Albuquerque',
    state: 'New Mexico',
    stateCode: 'NM',
    slug: 'albuquerque',
    country: 'US',
    region: 'West',
    population: '564,559',
    description: 'Albuquerque has aerospace, film, and healthcare industries with low costs.',
    topIndustries: ['Healthcare', 'Aerospace', 'Film', 'Tourism'],
    avgHourlyWage: { min: 13, max: 20 },
    costOfLiving: {
      index: 90,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Film industry jobs', 'Very affordable', 'Growing tech', 'Outdoor tourism'],
    timezone: 'MST',
    metroArea: 'Albuquerque',
    searchVolume: 'medium'
  },
  // IOWA
  {
    id: 'des-moines',
    city: 'Des Moines',
    state: 'Iowa',
    stateCode: 'IA',
    slug: 'des-moines',
    country: 'US',
    region: 'Midwest',
    population: '214,237',
    description: 'Des Moines is Iowa\'s capital with strong insurance and finance sectors.',
    topIndustries: ['Insurance', 'Finance', 'Healthcare', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 89,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Insurance headquarters', 'Low cost of living', 'Growing tech', 'Low unemployment'],
    timezone: 'CST',
    metroArea: 'Des Moines-West Des Moines',
    searchVolume: 'medium'
  },
  // NEBRASKA
  {
    id: 'omaha',
    city: 'Omaha',
    state: 'Nebraska',
    stateCode: 'NE',
    slug: 'omaha',
    country: 'US',
    region: 'Midwest',
    population: '486,051',
    description: 'Omaha has strong finance, healthcare, and logistics industries.',
    topIndustries: ['Finance', 'Healthcare', 'Logistics', 'Manufacturing'],
    avgHourlyWage: { min: 14, max: 21 },
    costOfLiving: {
      index: 90,
      rent: { studio: 850, oneBed: 1050 },
      groceries: 300,
      transport: 75
    },
    highlights: ['Fortune 500 headquarters', 'Low cost of living', 'Growing tech scene', 'Strong job market'],
    timezone: 'CST',
    metroArea: 'Omaha-Council Bluffs',
    searchVolume: 'medium'
  }
];

// Indeed Flex Active Market slugs for prioritization
export const activeMarketSlugs = [
  'austin', 'dallas', 'houston', // Texas
  'nashville', // Tennessee
  'atlanta', 'cartersville', // Georgia
  'cincinnati', 'cleveland', 'columbus', // Ohio
  'ontario', // California
  'chicago', // Illinois
  'washington-dc', // D.C.
  'las-vegas', 'reno', // Nevada
  'charlotte', // North Carolina
  'bentonville', // Arkansas
  'fort-mill', // South Carolina
  'orlando', // Florida
  'phoenix', // Arizona
];

export const isActiveMarket = (slug: string): boolean => 
  activeMarketSlugs.includes(slug);

// Helper functions
export const getCityBySlug = (slug: string): City | undefined => 
  cities.find(city => city.slug === slug);

export const getCitiesByState = (stateCode: string): City[] =>
  cities.filter(city => city.stateCode === stateCode);

export const getCitiesByRegion = (region: string): City[] =>
  cities.filter(city => city.region === region);

export const getHighVolumeCities = (): City[] =>
  cities.filter(city => city.searchVolume === 'high');

export const getCitiesNearMajorCity = (majorCitySlug: string): City[] =>
  cities.filter(city => city.nearbyMajorCity?.toLowerCase() === majorCitySlug.replace('-', ' '));

export const getAllCitySlugs = (): string[] =>
  cities.map(city => city.slug);

// Get unique states
export const getUniqueStates = (): { name: string; code: string }[] => {
  const states = new Map<string, string>();
  cities.forEach(city => states.set(city.stateCode, city.state));
  return Array.from(states.entries()).map(([code, name]) => ({ name, code }));
};

// Get unique regions
export const getUniqueRegions = (): string[] => {
  return Array.from(new Set(cities.map(city => city.region)));
};
