// State-specific tax content for programmatic SEO pages
// Each state has unique tips, neighboring state comparisons, and gig worker advice

export interface StatePageContent {
  slug: string;
  abbreviation: string;
  title: string;
  metaDescription: string;
  neighboringStates: string[];
  gigWorkerTips: string[];
  localTaxNotes?: string;
  taxAgencyUrl: string;
  taxAgencyName: string;
  filingDeadline: string;
  specialRules?: string[];
  bestFor: string[];
  faqs: { question: string; answer: string }[];
}

export const statePageContent: Record<string, StatePageContent> = {
  AL: {
    slug: 'alabama',
    abbreviation: 'AL',
    title: 'Alabama Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Alabama. Free 2026 paycheck calculator with state tax rates, gig worker tips, and W-2 vs 1099 comparison.',
    neighboringStates: ['FL', 'GA', 'MS', 'TN'],
    gigWorkerTips: [
      'Alabama has a flat 5% income tax rate, making tax planning straightforward',
      'No local income taxes in Alabama',
      'Self-employment income is taxed at the same rate as regular income'
    ],
    taxAgencyUrl: 'https://revenue.alabama.gov/',
    taxAgencyName: 'Alabama Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low-moderate tax burden', 'Simple flat tax rate'],
    faqs: [
      { question: 'What is Alabama\'s state income tax rate?', answer: 'Alabama has a graduated income tax with a top rate of 5% for income over $3,000 (single filers).' },
      { question: 'Does Alabama tax gig worker income?', answer: 'Yes, all self-employment and 1099 income is subject to Alabama state income tax.' }
    ]
  },
  AK: {
    slug: 'alaska',
    abbreviation: 'AK',
    title: 'Alaska Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Alaska. No state income tax! Free 2026 paycheck calculator with federal tax estimates for hourly workers.',
    neighboringStates: ['WA'],
    gigWorkerTips: [
      'Alaska has NO state income tax - you keep more of your earnings!',
      'You may also qualify for the Permanent Fund Dividend (PFD)',
      'Only need to worry about federal taxes and self-employment tax'
    ],
    taxAgencyUrl: 'https://tax.alaska.gov/',
    taxAgencyName: 'Alaska Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax', 'Permanent Fund Dividend available'],
    bestFor: ['Maximum take-home pay', 'Gig workers', 'High earners'],
    faqs: [
      { question: 'Does Alaska have state income tax?', answer: 'No! Alaska is one of 9 states with no state income tax.' },
      { question: 'What is the Alaska Permanent Fund Dividend?', answer: 'The PFD is an annual payment to Alaska residents from oil revenues, typically $1,000-$2,000 per person.' }
    ]
  },
  AZ: {
    slug: 'arizona',
    abbreviation: 'AZ',
    title: 'Arizona Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Arizona. Free 2026 paycheck calculator with 2.5% flat tax rate, gig worker tips, and W-2 vs 1099 comparison.',
    neighboringStates: ['CA', 'NV', 'UT', 'CO', 'NM'],
    gigWorkerTips: [
      'Arizona has a flat 2.5% income tax rate - one of the lowest in the nation',
      'No local income taxes anywhere in Arizona',
      'Great state for gig workers due to low tax burden'
    ],
    taxAgencyUrl: 'https://azdor.gov/',
    taxAgencyName: 'Arizona Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low taxes', 'Gig workers', 'Relocating from high-tax states'],
    faqs: [
      { question: 'What is Arizona\'s income tax rate?', answer: 'Arizona has a flat 2.5% income tax rate for all income levels as of 2023.' },
      { question: 'How does Arizona compare to California for taxes?', answer: 'Arizona\'s 2.5% rate is much lower than California\'s top rate of 13.3%, saving you thousands annually.' }
    ]
  },
  AR: {
    slug: 'arkansas',
    abbreviation: 'AR',
    title: 'Arkansas Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Arkansas. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['MO', 'TN', 'MS', 'LA', 'TX', 'OK'],
    gigWorkerTips: [
      'Arkansas top tax rate is 4.4% for income over $24,300',
      'No local income taxes in most areas',
      'Lower cost of living offsets moderate tax rates'
    ],
    taxAgencyUrl: 'https://www.dfa.arkansas.gov/',
    taxAgencyName: 'Arkansas Department of Finance and Administration',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Moderate taxes'],
    faqs: [
      { question: 'What is Arkansas\'s income tax rate?', answer: 'Arkansas has graduated rates from 0% to 4.4%, with the top rate applying to income over $24,300.' },
      { question: 'Is Arkansas good for gig workers?', answer: 'Arkansas offers moderate taxes and a very low cost of living, making it attractive for gig workers.' }
    ]
  },
  CA: {
    slug: 'california',
    abbreviation: 'CA',
    title: 'California Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in California. Free 2026 paycheck calculator with state tax rates up to 13.3%, daily overtime rules, and gig worker tips.',
    neighboringStates: ['OR', 'NV', 'AZ'],
    gigWorkerTips: [
      'California has the highest state income tax rate at 13.3% for top earners',
      'Daily overtime: You get 1.5x after 8 hours in a single day (not just 40/week)',
      'AB5 law affects gig worker classification - know your status',
      'Consider tracking all deductions carefully to offset high taxes'
    ],
    localTaxNotes: 'San Francisco and some other cities have additional local taxes',
    taxAgencyUrl: 'https://www.ftb.ca.gov/',
    taxAgencyName: 'California Franchise Tax Board',
    filingDeadline: 'April 15',
    specialRules: ['Daily overtime after 8 hours', 'AB5 gig worker classification', 'Highest state income tax'],
    bestFor: ['High minimum wage', 'Strong worker protections'],
    faqs: [
      { question: 'What is California\'s income tax rate?', answer: 'California has 9 tax brackets ranging from 1% to 13.3%. Most hourly workers fall in the 4-9.3% range.' },
      { question: 'Does California have daily overtime?', answer: 'Yes! California requires 1.5x pay for hours worked over 8 in a single day, and 2x after 12 hours.' },
      { question: 'How does AB5 affect gig workers?', answer: 'AB5 makes it harder for companies to classify workers as independent contractors. Many gig workers must be treated as employees.' }
    ]
  },
  CO: {
    slug: 'colorado',
    abbreviation: 'CO',
    title: 'Colorado Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Colorado. Free 2026 paycheck calculator with 4.4% flat tax rate and gig worker tips.',
    neighboringStates: ['WY', 'NE', 'KS', 'OK', 'NM', 'UT'],
    gigWorkerTips: [
      'Colorado has a flat 4.4% income tax rate',
      'Denver has additional local taxes (occupational privilege tax)',
      'High minimum wage at $14.81/hour'
    ],
    localTaxNotes: 'Denver charges an Occupational Privilege Tax of $5.75/month for employees and employers',
    taxAgencyUrl: 'https://tax.colorado.gov/',
    taxAgencyName: 'Colorado Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Moderate flat tax', 'High minimum wage', 'Growing job market'],
    faqs: [
      { question: 'What is Colorado\'s income tax rate?', answer: 'Colorado has a flat 4.4% income tax rate for all income levels.' },
      { question: 'Does Denver have local income tax?', answer: 'Yes, Denver charges an Occupational Privilege Tax of $5.75/month.' }
    ]
  },
  CT: {
    slug: 'connecticut',
    abbreviation: 'CT',
    title: 'Connecticut Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Connecticut. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['NY', 'MA', 'RI'],
    gigWorkerTips: [
      'Connecticut has graduated tax rates from 3% to 6.99%',
      'High cost of living but also high wages',
      'No local income taxes'
    ],
    taxAgencyUrl: 'https://portal.ct.gov/DRS',
    taxAgencyName: 'Connecticut Department of Revenue Services',
    filingDeadline: 'April 15',
    bestFor: ['Proximity to NYC', 'High wages'],
    faqs: [
      { question: 'What is Connecticut\'s income tax rate?', answer: 'Connecticut has graduated rates from 3% to 6.99%, with most hourly workers in the 5% range.' },
      { question: 'Is Connecticut expensive for workers?', answer: 'Connecticut has high costs but also high wages, especially near NYC and Hartford.' }
    ]
  },
  DE: {
    slug: 'delaware',
    abbreviation: 'DE',
    title: 'Delaware Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Delaware. Free 2026 paycheck calculator with state tax rates and no sales tax benefit.',
    neighboringStates: ['PA', 'NJ', 'MD'],
    gigWorkerTips: [
      'Delaware has graduated tax rates up to 6.6%',
      'No sales tax in Delaware - your money goes further',
      'Wilmington has a 1.25% local wage tax'
    ],
    localTaxNotes: 'Wilmington charges a 1.25% local wage tax',
    taxAgencyUrl: 'https://revenue.delaware.gov/',
    taxAgencyName: 'Delaware Division of Revenue',
    filingDeadline: 'April 30',
    specialRules: ['No sales tax', 'April 30 state filing deadline'],
    bestFor: ['No sales tax', 'Proximity to Philadelphia'],
    faqs: [
      { question: 'What is Delaware\'s income tax rate?', answer: 'Delaware has graduated rates from 2.2% to 6.6% on income over $60,000.' },
      { question: 'Does Delaware have sales tax?', answer: 'No! Delaware is one of 5 states with no sales tax.' }
    ]
  },
  FL: {
    slug: 'florida',
    abbreviation: 'FL',
    title: 'Florida Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Florida. No state income tax! Free 2026 paycheck calculator with federal tax estimates for hourly and gig workers.',
    neighboringStates: ['GA', 'AL'],
    gigWorkerTips: [
      'Florida has NO state income tax - keep more of your earnings!',
      'Only federal taxes apply to your income',
      'Great state for gig workers and high earners',
      'Growing job market in hospitality, logistics, and tech'
    ],
    taxAgencyUrl: 'https://floridarevenue.com/',
    taxAgencyName: 'Florida Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax'],
    bestFor: ['Maximum take-home pay', 'Gig workers', 'Hospitality workers', 'Retirees'],
    faqs: [
      { question: 'Does Florida have state income tax?', answer: 'No! Florida is one of 9 states with no state income tax.' },
      { question: 'Why do people move to Florida for taxes?', answer: 'No income tax means you keep 100% of your state tax burden, which can be thousands of dollars annually for high earners.' },
      { question: 'What taxes do I pay in Florida?', answer: 'You only pay federal income tax and FICA (Social Security/Medicare). No state income tax.' }
    ]
  },
  GA: {
    slug: 'georgia',
    abbreviation: 'GA',
    title: 'Georgia Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Georgia. Free 2026 paycheck calculator with 5.49% flat tax rate and gig worker tips.',
    neighboringStates: ['FL', 'AL', 'TN', 'NC', 'SC'],
    gigWorkerTips: [
      'Georgia has a flat 5.49% income tax rate (reduced from 5.75%)',
      'Atlanta area has strong job market for hospitality and logistics',
      'No local income taxes'
    ],
    taxAgencyUrl: 'https://dor.georgia.gov/',
    taxAgencyName: 'Georgia Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Growing job market', 'Moderate taxes', 'Southeast hub'],
    faqs: [
      { question: 'What is Georgia\'s income tax rate?', answer: 'Georgia has a flat 5.49% income tax rate for all income levels.' },
      { question: 'Is Atlanta good for gig workers?', answer: 'Yes, Atlanta has a large hospitality, events, and logistics market with many flexible work opportunities.' }
    ]
  },
  HI: {
    slug: 'hawaii',
    abbreviation: 'HI',
    title: 'Hawaii Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Hawaii. Free 2026 paycheck calculator with state tax rates and high cost of living considerations.',
    neighboringStates: [],
    gigWorkerTips: [
      'Hawaii has progressive tax rates up to 11% - one of the highest',
      'Very high cost of living requires higher wages to maintain lifestyle',
      'Tourism-dependent economy means seasonal fluctuations'
    ],
    taxAgencyUrl: 'https://tax.hawaii.gov/',
    taxAgencyName: 'Hawaii Department of Taxation',
    filingDeadline: 'April 20',
    specialRules: ['April 20 state filing deadline', 'High tax rates'],
    bestFor: ['Tourism industry', 'Island lifestyle'],
    faqs: [
      { question: 'What is Hawaii\'s income tax rate?', answer: 'Hawaii has 12 tax brackets ranging from 1.4% to 11%, with most workers in the 6-8% range.' },
      { question: 'Is Hawaii expensive to live in?', answer: 'Yes, Hawaii has the highest cost of living in the US. Higher wages are needed to maintain the same lifestyle.' }
    ]
  },
  ID: {
    slug: 'idaho',
    abbreviation: 'ID',
    title: 'Idaho Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Idaho. Free 2026 paycheck calculator with 5.8% flat tax rate and gig worker tips.',
    neighboringStates: ['WA', 'OR', 'NV', 'UT', 'WY', 'MT'],
    gigWorkerTips: [
      'Idaho has a flat 5.8% income tax rate',
      'Low cost of living compared to neighboring states',
      'Growing tech sector in Boise area'
    ],
    taxAgencyUrl: 'https://tax.idaho.gov/',
    taxAgencyName: 'Idaho State Tax Commission',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Outdoor lifestyle', 'Growing tech sector'],
    faqs: [
      { question: 'What is Idaho\'s income tax rate?', answer: 'Idaho has a flat 5.8% income tax rate for all income levels.' },
      { question: 'How does Idaho compare to Washington for taxes?', answer: 'Idaho has a 5.8% income tax while Washington has none, but Idaho has lower property taxes and cost of living.' }
    ]
  },
  IL: {
    slug: 'illinois',
    abbreviation: 'IL',
    title: 'Illinois Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Illinois. Free 2026 paycheck calculator with 4.95% flat tax rate and Chicago-area tips.',
    neighboringStates: ['WI', 'IA', 'MO', 'KY', 'IN'],
    gigWorkerTips: [
      'Illinois has a flat 4.95% income tax rate',
      'Chicago has a strong gig economy for hospitality and events',
      'No local income taxes (property taxes are high though)'
    ],
    taxAgencyUrl: 'https://tax.illinois.gov/',
    taxAgencyName: 'Illinois Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Chicago job market', 'Flat tax simplicity'],
    faqs: [
      { question: 'What is Illinois\' income tax rate?', answer: 'Illinois has a flat 4.95% income tax rate for all income levels.' },
      { question: 'Does Chicago have a city income tax?', answer: 'No, Chicago does not have a city income tax, but property taxes are among the highest in the nation.' }
    ]
  },
  IN: {
    slug: 'indiana',
    abbreviation: 'IN',
    title: 'Indiana Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Indiana. Free 2026 paycheck calculator with 3.05% flat tax rate - one of the lowest.',
    neighboringStates: ['MI', 'OH', 'KY', 'IL'],
    gigWorkerTips: [
      'Indiana has a flat 3.05% state tax rate - one of the lowest',
      'Some counties have additional local income taxes (0.5-3%)',
      'Low cost of living statewide'
    ],
    localTaxNotes: 'Indiana counties charge local income tax ranging from 0.5% to 3%',
    taxAgencyUrl: 'https://www.in.gov/dor/',
    taxAgencyName: 'Indiana Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Very low state tax', 'Low cost of living', 'Logistics hub'],
    faqs: [
      { question: 'What is Indiana\'s income tax rate?', answer: 'Indiana has a flat 3.05% state income tax, plus county taxes ranging from 0.5% to 3%.' },
      { question: 'Why is Indiana good for workers?', answer: 'Indiana has one of the lowest state income tax rates and a very low cost of living.' }
    ]
  },
  IA: {
    slug: 'iowa',
    abbreviation: 'IA',
    title: 'Iowa Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Iowa. Free 2026 paycheck calculator with 4.4% flat tax rate and gig worker tips.',
    neighboringStates: ['MN', 'SD', 'NE', 'MO', 'IL', 'WI'],
    gigWorkerTips: [
      'Iowa has a flat 4.4% income tax rate (reduced recently)',
      'Some cities have local option taxes',
      'Strong agricultural and manufacturing sectors'
    ],
    taxAgencyUrl: 'https://tax.iowa.gov/',
    taxAgencyName: 'Iowa Department of Revenue',
    filingDeadline: 'April 30',
    specialRules: ['April 30 state filing deadline'],
    bestFor: ['Low cost of living', 'Moderate taxes'],
    faqs: [
      { question: 'What is Iowa\'s income tax rate?', answer: 'Iowa has a flat 4.4% income tax rate for all income levels.' },
      { question: 'Does Iowa have local income taxes?', answer: 'Some Iowa cities have local option taxes, typically around 1%.' }
    ]
  },
  KS: {
    slug: 'kansas',
    abbreviation: 'KS',
    title: 'Kansas Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Kansas. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['NE', 'MO', 'OK', 'CO'],
    gigWorkerTips: [
      'Kansas has graduated tax rates from 3.1% to 5.7%',
      'Kansas City metro area straddles Missouri border',
      'Low cost of living overall'
    ],
    taxAgencyUrl: 'https://www.ksrevenue.gov/',
    taxAgencyName: 'Kansas Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Kansas City metro access'],
    faqs: [
      { question: 'What is Kansas\'s income tax rate?', answer: 'Kansas has graduated rates of 3.1%, 5.25%, and 5.7% based on income levels.' },
      { question: 'Which is better for taxes - Kansas or Missouri?', answer: 'Kansas has slightly higher rates but Missouri has higher effective rates in some situations. Compare your specific situation.' }
    ]
  },
  KY: {
    slug: 'kentucky',
    abbreviation: 'KY',
    title: 'Kentucky Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Kentucky. Free 2026 paycheck calculator with 4% flat tax rate and Louisville/Lexington area tips.',
    neighboringStates: ['IN', 'OH', 'WV', 'VA', 'TN', 'MO', 'IL'],
    gigWorkerTips: [
      'Kentucky has a flat 4% income tax rate',
      'Louisville and some cities have local occupational taxes (1-2.5%)',
      'Lower cost of living than neighboring states'
    ],
    localTaxNotes: 'Louisville charges a 2.2% occupational tax; other cities have varying rates',
    taxAgencyUrl: 'https://revenue.ky.gov/',
    taxAgencyName: 'Kentucky Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low flat tax', 'Low cost of living'],
    faqs: [
      { question: 'What is Kentucky\'s income tax rate?', answer: 'Kentucky has a flat 4% income tax rate for all income levels.' },
      { question: 'Does Louisville have local income tax?', answer: 'Yes, Louisville charges a 2.2% occupational tax on wages.' }
    ]
  },
  LA: {
    slug: 'louisiana',
    abbreviation: 'LA',
    title: 'Louisiana Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Louisiana. Free 2026 paycheck calculator with state tax rates and New Orleans area tips.',
    neighboringStates: ['TX', 'AR', 'MS'],
    gigWorkerTips: [
      'Louisiana has graduated tax rates from 1.85% to 4.25%',
      'Strong hospitality industry in New Orleans',
      'No local income taxes'
    ],
    taxAgencyUrl: 'https://revenue.louisiana.gov/',
    taxAgencyName: 'Louisiana Department of Revenue',
    filingDeadline: 'May 15',
    specialRules: ['May 15 state filing deadline'],
    bestFor: ['Hospitality workers', 'Low-moderate taxes'],
    faqs: [
      { question: 'What is Louisiana\'s income tax rate?', answer: 'Louisiana has graduated rates of 1.85%, 3.5%, and 4.25% based on income levels.' },
      { question: 'Is New Orleans good for gig workers?', answer: 'Yes, New Orleans has a thriving hospitality, events, and tourism industry with many flexible work opportunities.' }
    ]
  },
  ME: {
    slug: 'maine',
    abbreviation: 'ME',
    title: 'Maine Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Maine. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['NH'],
    gigWorkerTips: [
      'Maine has graduated tax rates from 5.8% to 7.15%',
      'Higher than average tax rates',
      'Strong seasonal tourism economy'
    ],
    taxAgencyUrl: 'https://www.maine.gov/revenue/',
    taxAgencyName: 'Maine Revenue Services',
    filingDeadline: 'April 15',
    bestFor: ['Tourism industry', 'Quality of life'],
    faqs: [
      { question: 'What is Maine\'s income tax rate?', answer: 'Maine has graduated rates of 5.8%, 6.75%, and 7.15% based on income levels.' },
      { question: 'How does Maine compare to New Hampshire?', answer: 'New Hampshire has no income tax, making it significantly cheaper for workers. Many work in NH and live in ME or vice versa.' }
    ]
  },
  MD: {
    slug: 'maryland',
    abbreviation: 'MD',
    title: 'Maryland Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Maryland. Free 2026 paycheck calculator with state and local tax rates for DC metro area workers.',
    neighboringStates: ['PA', 'DE', 'WV', 'VA', 'DC'],
    gigWorkerTips: [
      'Maryland has graduated state tax rates from 2% to 5.75%',
      'All counties and Baltimore City have additional local income taxes (2.25-3.2%)',
      'Strong job market in DC metro area'
    ],
    localTaxNotes: 'All Maryland counties charge local income tax ranging from 2.25% to 3.2%',
    taxAgencyUrl: 'https://www.marylandtaxes.gov/',
    taxAgencyName: 'Comptroller of Maryland',
    filingDeadline: 'April 15',
    bestFor: ['DC metro access', 'Federal government contractors'],
    faqs: [
      { question: 'What is Maryland\'s income tax rate?', answer: 'Maryland state tax ranges from 2% to 5.75%, plus county taxes of 2.25% to 3.2% for a total of 4.25% to 8.95%.' },
      { question: 'Does Maryland have local income tax?', answer: 'Yes, all Maryland counties and Baltimore City charge local income tax. Montgomery County is 3.2%, the highest.' }
    ]
  },
  MA: {
    slug: 'massachusetts',
    abbreviation: 'MA',
    title: 'Massachusetts Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Massachusetts. Free 2026 paycheck calculator with flat 9% tax rate (including millionaire\'s tax) and Boston area tips.',
    neighboringStates: ['NH', 'VT', 'NY', 'CT', 'RI'],
    gigWorkerTips: [
      'Massachusetts has a flat 5% tax rate, plus 4% surtax on income over $1M',
      'No local income taxes',
      'Strong tech, healthcare, and education job markets'
    ],
    taxAgencyUrl: 'https://www.mass.gov/orgs/massachusetts-department-of-revenue',
    taxAgencyName: 'Massachusetts Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['4% millionaire\'s surtax on income over $1M'],
    bestFor: ['Tech workers', 'Healthcare industry', 'Higher education'],
    faqs: [
      { question: 'What is Massachusetts\'s income tax rate?', answer: 'Massachusetts has a flat 5% income tax rate for most workers. Income over $1 million is taxed an additional 4%.' },
      { question: 'Is Boston expensive for workers?', answer: 'Yes, Boston has high costs, but wages are also high especially in tech, healthcare, and finance.' }
    ]
  },
  MI: {
    slug: 'michigan',
    abbreviation: 'MI',
    title: 'Michigan Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Michigan. Free 2026 paycheck calculator with 4.05% flat tax rate and Detroit area tips.',
    neighboringStates: ['WI', 'IN', 'OH'],
    gigWorkerTips: [
      'Michigan has a flat 4.05% income tax rate',
      'Detroit and some cities have local income taxes (0.5-2.4%)',
      'Strong manufacturing and logistics sectors'
    ],
    localTaxNotes: 'Detroit charges a 2.4% local income tax; other cities have lower rates',
    taxAgencyUrl: 'https://www.michigan.gov/treasury',
    taxAgencyName: 'Michigan Department of Treasury',
    filingDeadline: 'April 15',
    bestFor: ['Manufacturing jobs', 'Moderate taxes', 'Great Lakes access'],
    faqs: [
      { question: 'What is Michigan\'s income tax rate?', answer: 'Michigan has a flat 4.05% state income tax rate for all income levels.' },
      { question: 'Does Detroit have local income tax?', answer: 'Yes, Detroit charges 2.4% for residents and 1.2% for non-residents who work there.' }
    ]
  },
  MN: {
    slug: 'minnesota',
    abbreviation: 'MN',
    title: 'Minnesota Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Minnesota. Free 2026 paycheck calculator with state tax rates and Minneapolis/St. Paul area tips.',
    neighboringStates: ['WI', 'IA', 'SD', 'ND'],
    gigWorkerTips: [
      'Minnesota has graduated tax rates from 5.35% to 9.85%',
      'Higher tax burden but strong worker protections',
      'No local income taxes'
    ],
    taxAgencyUrl: 'https://www.revenue.state.mn.us/',
    taxAgencyName: 'Minnesota Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Strong worker protections', 'Quality of life', 'Healthcare industry'],
    faqs: [
      { question: 'What is Minnesota\'s income tax rate?', answer: 'Minnesota has graduated rates from 5.35% to 9.85%, with most hourly workers in the 5.35-6.8% range.' },
      { question: 'Is Minnesota expensive for workers?', answer: 'Minnesota has higher taxes but also strong worker protections, high minimum wage, and excellent quality of life.' }
    ]
  },
  MS: {
    slug: 'mississippi',
    abbreviation: 'MS',
    title: 'Mississippi Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Mississippi. Free 2026 paycheck calculator with 5% flat tax rate and very low cost of living.',
    neighboringStates: ['TN', 'AL', 'LA', 'AR'],
    gigWorkerTips: [
      'Mississippi has a flat 5% income tax rate on income over $10,000',
      'First $10,000 is tax-free',
      'Very low cost of living statewide'
    ],
    taxAgencyUrl: 'https://www.dor.ms.gov/',
    taxAgencyName: 'Mississippi Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Very low cost of living', 'Tax-free first $10K'],
    faqs: [
      { question: 'What is Mississippi\'s income tax rate?', answer: 'Mississippi has a flat 5% tax rate on income over $10,000. The first $10,000 is tax-free.' },
      { question: 'Is Mississippi cheap to live in?', answer: 'Yes, Mississippi has one of the lowest costs of living in the US, making your paycheck go further.' }
    ]
  },
  MO: {
    slug: 'missouri',
    abbreviation: 'MO',
    title: 'Missouri Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Missouri. Free 2026 paycheck calculator with state tax rates and Kansas City/St. Louis area tips.',
    neighboringStates: ['IA', 'NE', 'KS', 'OK', 'AR', 'TN', 'KY', 'IL'],
    gigWorkerTips: [
      'Missouri has graduated tax rates from 2% to 4.8%',
      'Kansas City and St. Louis have local earnings taxes (1%)',
      'Central location makes it good for logistics jobs'
    ],
    localTaxNotes: 'Kansas City and St. Louis both charge 1% local earnings taxes',
    taxAgencyUrl: 'https://dor.mo.gov/',
    taxAgencyName: 'Missouri Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Central location', 'Moderate taxes', 'Low cost of living'],
    faqs: [
      { question: 'What is Missouri\'s income tax rate?', answer: 'Missouri has graduated rates from 2% to 4.8% based on income levels.' },
      { question: 'Does St. Louis have local income tax?', answer: 'Yes, St. Louis city charges a 1% earnings tax on all wages.' }
    ]
  },
  MT: {
    slug: 'montana',
    abbreviation: 'MT',
    title: 'Montana Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Montana. Free 2026 paycheck calculator with 5.9% flat tax rate and no sales tax.',
    neighboringStates: ['ND', 'SD', 'WY', 'ID'],
    gigWorkerTips: [
      'Montana has a flat 5.9% income tax rate',
      'No sales tax in Montana',
      'Growing tech and tourism sectors'
    ],
    taxAgencyUrl: 'https://mtrevenue.gov/',
    taxAgencyName: 'Montana Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No sales tax'],
    bestFor: ['No sales tax', 'Outdoor lifestyle', 'Growing tech sector'],
    faqs: [
      { question: 'What is Montana\'s income tax rate?', answer: 'Montana has a flat 5.9% income tax rate for all income levels.' },
      { question: 'Does Montana have sales tax?', answer: 'No! Montana is one of 5 states with no sales tax.' }
    ]
  },
  NE: {
    slug: 'nebraska',
    abbreviation: 'NE',
    title: 'Nebraska Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Nebraska. Free 2026 paycheck calculator with state tax rates and Omaha/Lincoln area tips.',
    neighboringStates: ['SD', 'IA', 'MO', 'KS', 'CO', 'WY'],
    gigWorkerTips: [
      'Nebraska has graduated tax rates from 2.46% to 5.84%',
      'Low cost of living especially outside Omaha',
      'Strong agricultural and logistics sectors'
    ],
    taxAgencyUrl: 'https://revenue.nebraska.gov/',
    taxAgencyName: 'Nebraska Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Logistics hub'],
    faqs: [
      { question: 'What is Nebraska\'s income tax rate?', answer: 'Nebraska has graduated rates from 2.46% to 5.84% based on income levels.' },
      { question: 'Is Omaha good for gig workers?', answer: 'Yes, Omaha has a growing logistics and warehousing sector with many flexible work opportunities.' }
    ]
  },
  NV: {
    slug: 'nevada',
    abbreviation: 'NV',
    title: 'Nevada Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Nevada. No state income tax! Free 2026 paycheck calculator with federal estimates for Las Vegas and Reno workers.',
    neighboringStates: ['CA', 'OR', 'ID', 'UT', 'AZ'],
    gigWorkerTips: [
      'Nevada has NO state income tax - keep more of your earnings!',
      'Las Vegas has a massive hospitality and entertainment industry',
      'Many people relocate from California to save on taxes'
    ],
    taxAgencyUrl: 'https://tax.nv.gov/',
    taxAgencyName: 'Nevada Department of Taxation',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax'],
    bestFor: ['Maximum take-home pay', 'Hospitality workers', 'Entertainment industry'],
    faqs: [
      { question: 'Does Nevada have state income tax?', answer: 'No! Nevada is one of 9 states with no state income tax.' },
      { question: 'Why do people move from California to Nevada?', answer: 'No income tax saves thousands annually. Someone earning $80K saves about $4,500/year compared to California.' },
      { question: 'Is Las Vegas good for gig workers?', answer: 'Yes, Las Vegas has a huge hospitality, events, and entertainment industry with many flexible work opportunities.' }
    ]
  },
  NH: {
    slug: 'new-hampshire',
    abbreviation: 'NH',
    title: 'New Hampshire Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in New Hampshire. No state income tax on wages! Free 2026 paycheck calculator for Boston-area workers.',
    neighboringStates: ['ME', 'VT', 'MA'],
    gigWorkerTips: [
      'New Hampshire has NO tax on wages and salary',
      'Interest and dividends were taxed but that ended in 2024',
      'Many work in Massachusetts but live in NH to avoid income tax'
    ],
    taxAgencyUrl: 'https://www.revenue.nh.gov/',
    taxAgencyName: 'New Hampshire Department of Revenue Administration',
    filingDeadline: 'April 15',
    specialRules: ['No tax on wages or salary', 'No interest/dividends tax as of 2024'],
    bestFor: ['Maximum take-home pay', 'Boston commuters', 'No income tax'],
    faqs: [
      { question: 'Does New Hampshire have income tax?', answer: 'No! New Hampshire does not tax wages or salary. The interest/dividends tax was eliminated in 2024.' },
      { question: 'Can I work in Massachusetts and live in NH?', answer: 'Yes, but Massachusetts taxes your income regardless of where you live. NH residents working in NH pay no state income tax.' }
    ]
  },
  NJ: {
    slug: 'new-jersey',
    abbreviation: 'NJ',
    title: 'New Jersey Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in New Jersey. Free 2026 paycheck calculator with state tax rates and NYC metro area tips.',
    neighboringStates: ['NY', 'PA', 'DE'],
    gigWorkerTips: [
      'New Jersey has graduated tax rates from 1.4% to 10.75%',
      'No local income taxes',
      'Many work in NYC but live in NJ'
    ],
    taxAgencyUrl: 'https://www.state.nj.us/treasury/taxation/',
    taxAgencyName: 'New Jersey Division of Taxation',
    filingDeadline: 'April 15',
    bestFor: ['NYC access', 'No local taxes'],
    faqs: [
      { question: 'What is New Jersey\'s income tax rate?', answer: 'New Jersey has graduated rates from 1.4% to 10.75%, with most hourly workers in the 1.75-6.37% range.' },
      { question: 'Is it better to live in NJ or NY?', answer: 'NJ has no local income taxes while NYC charges about 3-4%. For many, NJ is more affordable despite commute costs.' }
    ]
  },
  NM: {
    slug: 'new-mexico',
    abbreviation: 'NM',
    title: 'New Mexico Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in New Mexico. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['CO', 'AZ', 'TX', 'OK'],
    gigWorkerTips: [
      'New Mexico has graduated tax rates from 1.7% to 5.9%',
      'Low cost of living overall',
      'Growing tech sector in Albuquerque and Santa Fe'
    ],
    taxAgencyUrl: 'https://www.tax.newmexico.gov/',
    taxAgencyName: 'New Mexico Taxation and Revenue Department',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Growing tech sector'],
    faqs: [
      { question: 'What is New Mexico\'s income tax rate?', answer: 'New Mexico has graduated rates from 1.7% to 5.9% based on income levels.' },
      { question: 'Is New Mexico cheap to live in?', answer: 'Yes, New Mexico has a relatively low cost of living, especially compared to neighboring Arizona and Colorado.' }
    ]
  },
  NY: {
    slug: 'new-york',
    abbreviation: 'NY',
    title: 'New York Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in New York. Free 2026 paycheck calculator with state rates, NYC local taxes, and gig worker tips.',
    neighboringStates: ['NJ', 'PA', 'CT', 'MA', 'VT'],
    gigWorkerTips: [
      'New York State has graduated rates from 4% to 10.9%',
      'NYC adds 3.08% to 3.88% local income tax',
      'Yonkers charges 16.75% of state tax as local tax',
      'Massive job market but high taxes'
    ],
    localTaxNotes: 'NYC residents pay 3.08% to 3.88% additional local income tax; Yonkers residents pay 16.75% of their state tax',
    taxAgencyUrl: 'https://www.tax.ny.gov/',
    taxAgencyName: 'New York State Department of Taxation and Finance',
    filingDeadline: 'April 15',
    specialRules: ['NYC local income tax', 'Yonkers surcharge'],
    bestFor: ['Huge job market', 'Entertainment industry', 'Finance/tech'],
    faqs: [
      { question: 'What is New York\'s income tax rate?', answer: 'NYS has rates from 4% to 10.9%. NYC adds 3.08-3.88% for a combined rate up to 14.78%.' },
      { question: 'How much is NYC local income tax?', answer: 'NYC residents pay 3.08% to 3.88% additional local income tax on top of NYS taxes.' },
      { question: 'Is it better to live outside NYC?', answer: 'Living outside NYC can save you 3-4% in local taxes, but consider commute costs and time.' }
    ]
  },
  NC: {
    slug: 'north-carolina',
    abbreviation: 'NC',
    title: 'North Carolina Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in North Carolina. Free 2026 paycheck calculator with 4.75% flat tax rate and Charlotte/Raleigh area tips.',
    neighboringStates: ['VA', 'TN', 'GA', 'SC'],
    gigWorkerTips: [
      'North Carolina has a flat 4.75% income tax rate',
      'No local income taxes',
      'Growing tech sector in Research Triangle'
    ],
    taxAgencyUrl: 'https://www.ncdor.gov/',
    taxAgencyName: 'North Carolina Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low flat tax', 'Growing tech sector', 'Banking industry'],
    faqs: [
      { question: 'What is North Carolina\'s income tax rate?', answer: 'North Carolina has a flat 4.75% income tax rate for all income levels.' },
      { question: 'Is the Research Triangle good for gig workers?', answer: 'The Raleigh-Durham area has a growing tech and healthcare sector with increasing flexible work opportunities.' }
    ]
  },
  ND: {
    slug: 'north-dakota',
    abbreviation: 'ND',
    title: 'North Dakota Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in North Dakota. Free 2026 paycheck calculator with very low 1.95% flat tax rate.',
    neighboringStates: ['MN', 'SD', 'MT'],
    gigWorkerTips: [
      'North Dakota has a flat 1.95% income tax rate - one of the lowest',
      'Strong energy sector (oil)',
      'Very low cost of living'
    ],
    taxAgencyUrl: 'https://www.tax.nd.gov/',
    taxAgencyName: 'North Dakota Office of State Tax Commissioner',
    filingDeadline: 'April 15',
    bestFor: ['Very low taxes', 'Energy sector', 'Low cost of living'],
    faqs: [
      { question: 'What is North Dakota\'s income tax rate?', answer: 'North Dakota has a flat 1.95% income tax rate - one of the lowest in the nation.' },
      { question: 'Is North Dakota good for workers?', answer: 'Very low taxes and cost of living, but limited job market outside energy and agriculture.' }
    ]
  },
  OH: {
    slug: 'ohio',
    abbreviation: 'OH',
    title: 'Ohio Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Ohio. Free 2026 paycheck calculator with state and local tax rates for Cleveland, Columbus, and Cincinnati.',
    neighboringStates: ['MI', 'IN', 'KY', 'WV', 'PA'],
    gigWorkerTips: [
      'Ohio has graduated state tax rates up to 4%',
      'Many cities have local income taxes (1-2.5%)',
      'Strong manufacturing and logistics sectors'
    ],
    localTaxNotes: 'Most Ohio cities have local income taxes, typically 1-2.5%. Columbus is 2.5%, Cleveland is 2.5%, Cincinnati is 1.8%',
    taxAgencyUrl: 'https://tax.ohio.gov/',
    taxAgencyName: 'Ohio Department of Taxation',
    filingDeadline: 'April 15',
    bestFor: ['Manufacturing jobs', 'Moderate state taxes', 'Multiple major cities'],
    faqs: [
      { question: 'What is Ohio\'s income tax rate?', answer: 'Ohio state tax ranges from 0% (under $26,050) to 4% (over $115,300), plus local taxes of 1-2.5%.' },
      { question: 'Do Ohio cities have income tax?', answer: 'Yes, most Ohio cities have local income taxes. Columbus and Cleveland are 2.5%, Cincinnati is 1.8%.' }
    ]
  },
  OK: {
    slug: 'oklahoma',
    abbreviation: 'OK',
    title: 'Oklahoma Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Oklahoma. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['KS', 'MO', 'AR', 'TX', 'NM', 'CO'],
    gigWorkerTips: [
      'Oklahoma has graduated tax rates from 0.25% to 4.75%',
      'Very low cost of living',
      'Growing energy and logistics sectors'
    ],
    taxAgencyUrl: 'https://oklahoma.gov/tax.html',
    taxAgencyName: 'Oklahoma Tax Commission',
    filingDeadline: 'April 15',
    bestFor: ['Low cost of living', 'Energy sector', 'Moderate taxes'],
    faqs: [
      { question: 'What is Oklahoma\'s income tax rate?', answer: 'Oklahoma has graduated rates from 0.25% to 4.75% based on income levels.' },
      { question: 'Is Oklahoma cheap to live in?', answer: 'Yes, Oklahoma has one of the lowest costs of living in the US, especially for housing.' }
    ]
  },
  OR: {
    slug: 'oregon',
    abbreviation: 'OR',
    title: 'Oregon Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Oregon. Free 2026 paycheck calculator with high state tax rates but no sales tax.',
    neighboringStates: ['WA', 'ID', 'NV', 'CA'],
    gigWorkerTips: [
      'Oregon has graduated tax rates from 4.75% to 9.9%',
      'No sales tax in Oregon',
      'Portland metro has transit tax (0.01%)',
      'Higher income tax but no sales tax'
    ],
    localTaxNotes: 'Portland metro area has a 0.01% transit payroll tax',
    taxAgencyUrl: 'https://www.oregon.gov/dor/',
    taxAgencyName: 'Oregon Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No sales tax'],
    bestFor: ['No sales tax', 'Tech industry', 'Outdoor lifestyle'],
    faqs: [
      { question: 'What is Oregon\'s income tax rate?', answer: 'Oregon has graduated rates from 4.75% to 9.9%, with most workers in the 6.75-9% range.' },
      { question: 'Does Oregon have sales tax?', answer: 'No! Oregon is one of 5 states with no sales tax, which offsets the higher income tax somewhat.' }
    ]
  },
  PA: {
    slug: 'pennsylvania',
    abbreviation: 'PA',
    title: 'Pennsylvania Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Pennsylvania. Free 2026 paycheck calculator with flat 3.07% state rate and Philadelphia local taxes.',
    neighboringStates: ['NY', 'NJ', 'DE', 'MD', 'WV', 'OH'],
    gigWorkerTips: [
      'Pennsylvania has a flat 3.07% state income tax - one of the lowest',
      'Philadelphia charges 3.75% local wage tax for residents',
      'Other PA cities also have local taxes (1-3%)'
    ],
    localTaxNotes: 'Philadelphia charges 3.75% for residents, 3.44% for non-residents. Pittsburgh charges about 3%. Most PA municipalities have 1-3% local taxes',
    taxAgencyUrl: 'https://www.revenue.pa.gov/',
    taxAgencyName: 'Pennsylvania Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Low flat state tax', 'Multiple major cities'],
    faqs: [
      { question: 'What is Pennsylvania\'s income tax rate?', answer: 'Pennsylvania has a flat 3.07% state income tax rate, plus local taxes of 1-3.75% depending on location.' },
      { question: 'Does Philadelphia have local income tax?', answer: 'Yes, Philadelphia charges 3.75% for residents and 3.44% for non-residents working in the city.' }
    ]
  },
  RI: {
    slug: 'rhode-island',
    abbreviation: 'RI',
    title: 'Rhode Island Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Rhode Island. Free 2026 paycheck calculator with state tax rates and Providence area tips.',
    neighboringStates: ['MA', 'CT'],
    gigWorkerTips: [
      'Rhode Island has graduated tax rates from 3.75% to 5.99%',
      'No local income taxes',
      'Providence has a growing hospitality sector'
    ],
    taxAgencyUrl: 'https://tax.ri.gov/',
    taxAgencyName: 'Rhode Island Division of Taxation',
    filingDeadline: 'April 15',
    bestFor: ['No local taxes', 'Small state convenience'],
    faqs: [
      { question: 'What is Rhode Island\'s income tax rate?', answer: 'Rhode Island has graduated rates of 3.75%, 4.75%, and 5.99% based on income levels.' },
      { question: 'How does Rhode Island compare to Massachusetts?', answer: 'Rhode Island has lower tax rates than Massachusetts (5.99% vs 9% top rate) and lower cost of living.' }
    ]
  },
  SC: {
    slug: 'south-carolina',
    abbreviation: 'SC',
    title: 'South Carolina Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in South Carolina. Free 2026 paycheck calculator with state tax rates and Charleston/Greenville area tips.',
    neighboringStates: ['NC', 'GA'],
    gigWorkerTips: [
      'South Carolina has graduated tax rates from 0% to 6.4%',
      'No local income taxes',
      'Growing manufacturing and tourism sectors'
    ],
    taxAgencyUrl: 'https://dor.sc.gov/',
    taxAgencyName: 'South Carolina Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Tourism industry', 'Manufacturing jobs', 'Coastal lifestyle'],
    faqs: [
      { question: 'What is South Carolina\'s income tax rate?', answer: 'South Carolina has graduated rates from 0% to 6.4%, with most workers in the 3-6% range.' },
      { question: 'Is Charleston good for gig workers?', answer: 'Yes, Charleston has a growing hospitality, tourism, and events industry with many flexible work opportunities.' }
    ]
  },
  SD: {
    slug: 'south-dakota',
    abbreviation: 'SD',
    title: 'South Dakota Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in South Dakota. No state income tax! Free 2026 paycheck calculator with federal tax estimates.',
    neighboringStates: ['ND', 'MN', 'IA', 'NE', 'WY', 'MT'],
    gigWorkerTips: [
      'South Dakota has NO state income tax - keep more of your earnings!',
      'Very low cost of living',
      'Growing financial services sector in Sioux Falls'
    ],
    taxAgencyUrl: 'https://dor.sd.gov/',
    taxAgencyName: 'South Dakota Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax'],
    bestFor: ['Maximum take-home pay', 'Low cost of living'],
    faqs: [
      { question: 'Does South Dakota have state income tax?', answer: 'No! South Dakota is one of 9 states with no state income tax.' },
      { question: 'Why do people move to South Dakota?', answer: 'No income tax combined with very low cost of living makes South Dakota attractive for workers and retirees.' }
    ]
  },
  TN: {
    slug: 'tennessee',
    abbreviation: 'TN',
    title: 'Tennessee Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Tennessee. No state income tax! Free 2026 paycheck calculator for Nashville and Memphis workers.',
    neighboringStates: ['KY', 'VA', 'NC', 'GA', 'AL', 'MS', 'AR', 'MO'],
    gigWorkerTips: [
      'Tennessee has NO state income tax on wages - keep more of your earnings!',
      'Nashville has a booming hospitality and entertainment industry',
      'Memphis is a major logistics hub'
    ],
    taxAgencyUrl: 'https://www.tn.gov/revenue.html',
    taxAgencyName: 'Tennessee Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax on wages'],
    bestFor: ['Maximum take-home pay', 'Music/entertainment industry', 'Logistics jobs'],
    faqs: [
      { question: 'Does Tennessee have state income tax?', answer: 'No! Tennessee does not tax wages or salary. The Hall Tax on interest/dividends was eliminated in 2021.' },
      { question: 'Is Nashville good for gig workers?', answer: 'Yes, Nashville has a massive hospitality, events, and entertainment industry with many flexible work opportunities.' }
    ]
  },
  TX: {
    slug: 'texas',
    abbreviation: 'TX',
    title: 'Texas Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Texas. No state income tax! Free 2026 paycheck calculator for Houston, Dallas, Austin, and San Antonio workers.',
    neighboringStates: ['OK', 'AR', 'LA', 'NM'],
    gigWorkerTips: [
      'Texas has NO state income tax - keep more of your earnings!',
      'Huge job market across multiple major cities',
      'Growing tech sector in Austin, logistics in Houston/Dallas',
      'Many California businesses and workers relocating to Texas'
    ],
    taxAgencyUrl: 'https://comptroller.texas.gov/',
    taxAgencyName: 'Texas Comptroller of Public Accounts',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax'],
    bestFor: ['Maximum take-home pay', 'Huge job market', 'Tech industry', 'Logistics/warehousing'],
    faqs: [
      { question: 'Does Texas have state income tax?', answer: 'No! Texas is one of 9 states with no state income tax.' },
      { question: 'Why are people moving to Texas?', answer: 'No income tax, lower cost of living than coastal states, and massive job market across tech, energy, logistics, and healthcare.' },
      { question: 'Which Texas city is best for gig workers?', answer: 'All major Texas cities have strong gig economies. Austin for tech, Houston for energy/logistics, Dallas for corporate/events.' }
    ]
  },
  UT: {
    slug: 'utah',
    abbreviation: 'UT',
    title: 'Utah Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Utah. Free 2026 paycheck calculator with 4.65% flat tax rate and Salt Lake City area tips.',
    neighboringStates: ['ID', 'WY', 'CO', 'AZ', 'NV'],
    gigWorkerTips: [
      'Utah has a flat 4.65% income tax rate',
      'No local income taxes',
      'Growing tech sector (Silicon Slopes)'
    ],
    taxAgencyUrl: 'https://tax.utah.gov/',
    taxAgencyName: 'Utah State Tax Commission',
    filingDeadline: 'April 15',
    bestFor: ['Moderate flat tax', 'Growing tech sector', 'Outdoor lifestyle'],
    faqs: [
      { question: 'What is Utah\'s income tax rate?', answer: 'Utah has a flat 4.65% income tax rate for all income levels.' },
      { question: 'Is Salt Lake City good for tech workers?', answer: 'Yes, the "Silicon Slopes" area has a booming tech industry with many companies and startups.' }
    ]
  },
  VT: {
    slug: 'vermont',
    abbreviation: 'VT',
    title: 'Vermont Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Vermont. Free 2026 paycheck calculator with state tax rates and gig worker tips.',
    neighboringStates: ['NH', 'MA', 'NY'],
    gigWorkerTips: [
      'Vermont has graduated tax rates from 3.35% to 8.75%',
      'Higher taxes but strong worker protections',
      'Seasonal tourism economy'
    ],
    taxAgencyUrl: 'https://tax.vermont.gov/',
    taxAgencyName: 'Vermont Department of Taxes',
    filingDeadline: 'April 15',
    bestFor: ['Quality of life', 'Strong worker protections'],
    faqs: [
      { question: 'What is Vermont\'s income tax rate?', answer: 'Vermont has graduated rates from 3.35% to 8.75% based on income levels.' },
      { question: 'Is Vermont expensive?', answer: 'Vermont has higher taxes and costs, but also strong communities, worker protections, and quality of life.' }
    ]
  },
  VA: {
    slug: 'virginia',
    abbreviation: 'VA',
    title: 'Virginia Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Virginia. Free 2026 paycheck calculator with state tax rates and DC metro area tips.',
    neighboringStates: ['MD', 'DC', 'WV', 'KY', 'TN', 'NC'],
    gigWorkerTips: [
      'Virginia has graduated tax rates from 2% to 5.75%',
      'No local income taxes',
      'Strong job market in DC metro area (Northern Virginia)'
    ],
    taxAgencyUrl: 'https://www.tax.virginia.gov/',
    taxAgencyName: 'Virginia Department of Taxation',
    filingDeadline: 'May 1',
    specialRules: ['May 1 state filing deadline'],
    bestFor: ['DC metro access', 'Federal contractors', 'No local taxes'],
    faqs: [
      { question: 'What is Virginia\'s income tax rate?', answer: 'Virginia has graduated rates of 2%, 3%, 5%, and 5.75% for income over $17,000.' },
      { question: 'Does Virginia have local income tax?', answer: 'No, Virginia does not have local income taxes, unlike neighboring Maryland.' }
    ]
  },
  WA: {
    slug: 'washington',
    abbreviation: 'WA',
    title: 'Washington Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Washington State. No income tax! Free 2026 paycheck calculator for Seattle and statewide workers.',
    neighboringStates: ['OR', 'ID'],
    gigWorkerTips: [
      'Washington has NO state income tax - keep more of your earnings!',
      'Highest minimum wage in the nation at $16.66',
      'Seattle has additional minimum wage rules ($20.76)',
      'Strong tech industry but high cost of living in Seattle area'
    ],
    taxAgencyUrl: 'https://dor.wa.gov/',
    taxAgencyName: 'Washington State Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax', 'Highest minimum wage'],
    bestFor: ['Maximum take-home pay', 'Tech industry', 'Highest minimum wage'],
    faqs: [
      { question: 'Does Washington have state income tax?', answer: 'No! Washington is one of 9 states with no state income tax.' },
      { question: 'What is Washington\'s minimum wage?', answer: 'Washington has the highest state minimum wage at $16.66/hour. Seattle\'s is even higher at $20.76.' },
      { question: 'Is Seattle worth the high cost of living?', answer: 'With no income tax and high wages, many workers come out ahead despite high costs.' }
    ]
  },
  WV: {
    slug: 'west-virginia',
    abbreviation: 'WV',
    title: 'West Virginia Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in West Virginia. Free 2026 paycheck calculator with state tax rates and very low cost of living.',
    neighboringStates: ['PA', 'MD', 'VA', 'KY', 'OH'],
    gigWorkerTips: [
      'West Virginia has graduated tax rates from 3% to 5.12%',
      'Very low cost of living statewide',
      'No local income taxes'
    ],
    taxAgencyUrl: 'https://tax.wv.gov/',
    taxAgencyName: 'West Virginia State Tax Department',
    filingDeadline: 'April 15',
    bestFor: ['Very low cost of living', 'Moderate taxes'],
    faqs: [
      { question: 'What is West Virginia\'s income tax rate?', answer: 'West Virginia has graduated rates from 3% to 5.12% based on income levels.' },
      { question: 'Is West Virginia cheap to live in?', answer: 'Yes, West Virginia has one of the lowest costs of living in the US.' }
    ]
  },
  WI: {
    slug: 'wisconsin',
    abbreviation: 'WI',
    title: 'Wisconsin Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Wisconsin. Free 2026 paycheck calculator with state tax rates and Milwaukee/Madison area tips.',
    neighboringStates: ['MN', 'IA', 'IL', 'MI'],
    gigWorkerTips: [
      'Wisconsin has graduated tax rates from 3.5% to 7.65%',
      'No local income taxes',
      'Strong manufacturing and healthcare sectors'
    ],
    taxAgencyUrl: 'https://www.revenue.wi.gov/',
    taxAgencyName: 'Wisconsin Department of Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Manufacturing jobs', 'Healthcare industry', 'No local taxes'],
    faqs: [
      { question: 'What is Wisconsin\'s income tax rate?', answer: 'Wisconsin has graduated rates from 3.5% to 7.65% based on income levels.' },
      { question: 'Does Wisconsin have local income tax?', answer: 'No, Wisconsin does not have local income taxes.' }
    ]
  },
  WY: {
    slug: 'wyoming',
    abbreviation: 'WY',
    title: 'Wyoming Paycheck Calculator 2026 - No State Income Tax',
    metaDescription: 'Calculate your take-home pay in Wyoming. No state income tax! Free 2026 paycheck calculator with federal tax estimates.',
    neighboringStates: ['MT', 'SD', 'NE', 'CO', 'UT', 'ID'],
    gigWorkerTips: [
      'Wyoming has NO state income tax - keep more of your earnings!',
      'Very low cost of living and no corporate income tax',
      'Strong energy sector (coal, oil, gas)'
    ],
    taxAgencyUrl: 'https://revenue.wyo.gov/',
    taxAgencyName: 'Wyoming Department of Revenue',
    filingDeadline: 'April 15',
    specialRules: ['No state income tax', 'No corporate income tax'],
    bestFor: ['Maximum take-home pay', 'Energy sector', 'Low taxes overall'],
    faqs: [
      { question: 'Does Wyoming have state income tax?', answer: 'No! Wyoming is one of 9 states with no state income tax.' },
      { question: 'What makes Wyoming tax-friendly?', answer: 'No income tax, no corporate tax, and low property taxes make Wyoming one of the most tax-friendly states.' }
    ]
  },
  DC: {
    slug: 'washington-dc',
    abbreviation: 'DC',
    title: 'Washington DC Paycheck & Tax Calculator 2026',
    metaDescription: 'Calculate your take-home pay in Washington DC. Free 2026 paycheck calculator with DC tax rates and federal worker tips.',
    neighboringStates: ['MD', 'VA'],
    gigWorkerTips: [
      'DC has graduated tax rates from 4% to 10.75%',
      'Highest minimum wage in the nation at $17.50',
      'Strong federal government and contractor job market'
    ],
    taxAgencyUrl: 'https://otr.cfo.dc.gov/',
    taxAgencyName: 'DC Office of Tax and Revenue',
    filingDeadline: 'April 15',
    bestFor: ['Federal government jobs', 'Highest minimum wage', 'Political/nonprofit sector'],
    faqs: [
      { question: 'What is DC\'s income tax rate?', answer: 'DC has graduated rates from 4% to 10.75%, with most workers in the 6-8.5% range.' },
      { question: 'What is DC\'s minimum wage?', answer: 'DC has the highest minimum wage in the nation at $17.50/hour.' }
    ]
  }
};

// Helper functions
export function getStatePageContent(stateCode: string): StatePageContent | undefined {
  return statePageContent[stateCode];
}

export function getStateBySlug(slug: string): StatePageContent | undefined {
  return Object.values(statePageContent).find(state => state.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return Object.values(statePageContent).map(state => state.slug);
}

export function getAllStateAbbreviations(): string[] {
  return Object.keys(statePageContent);
}




