// Career Evaluations Dataset - For "Is X a good job?" SEO pages
// Targets high-volume queries like "is bartending a good job", "warehouse work pros and cons"

export interface CareerEvaluation {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  verdict: 'excellent' | 'good' | 'depends' | 'challenging';
  verdictSummary: string;
  overallScore: number; // 1-10
  scores: {
    payPotential: number; // 1-10
    workLifeBalance: number; // 1-10
    jobSecurity: number; // 1-10
    growthOpportunity: number; // 1-10
    flexibility: number; // 1-10
    physicalDemand: number; // 1-10 (lower = easier)
    stressLevel: number; // 1-10 (lower = less stress)
    entryBarrier: number; // 1-10 (lower = easier to start)
  };
  pros: string[];
  cons: string[];
  bestFor: string[];
  worstFor: string[];
  alternativeRoles: { role: string; slug: string; reason: string }[];
  realTalk: string;
  incomeRange: {
    starting: string;
    average: string;
    top: string;
  };
  typicalSchedule: string;
  careerLongevity: string;
  satisfactionFactors: string[];
  burnoutRisk: 'low' | 'medium' | 'high';
  commonQuestions: { question: string; answer: string }[];
}

export const careerEvaluations: CareerEvaluation[] = [
  // ============================================
  // HOSPITALITY
  // ============================================
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'hospitality',
    verdict: 'good',
    verdictSummary: 'Bartending is a good job for social people who want flexible schedules and high earning potential through tips. However, late nights and physical demands make it challenging long-term.',
    overallScore: 7.5,
    scores: {
      payPotential: 9,
      workLifeBalance: 5,
      jobSecurity: 6,
      growthOpportunity: 7,
      flexibility: 8,
      physicalDemand: 6,
      stressLevel: 4,
      entryBarrier: 6
    },
    pros: [
      'Excellent tip income - $25-50+/hour at busy venues',
      'High flexibility to choose shifts',
      'Social, fun work environment',
      'Creative outlet through cocktail making',
      'Cash in hand every night',
      'Clear career path to management',
      'No degree required',
      'Transferable skills work anywhere'
    ],
    cons: [
      'Late nights impact personal life',
      'Standing for 8-10 hours is physically taxing',
      'Dealing with intoxicated customers',
      'Inconsistent income (slow nights exist)',
      'Limited benefits in many positions',
      'Smoke-filled environments at some bars',
      'Weekend and holiday work expected',
      'Industry can be demanding on relationships'
    ],
    bestFor: [
      'Night owls who love late hours',
      'Social butterflies who energize from people',
      'Those who want high cash earnings',
      'People with thick skin for difficult customers',
      'Anyone seeking schedule flexibility',
      'Creatives interested in mixology',
      'Students needing part-time work'
    ],
    worstFor: [
      'People who need consistent 9-5 schedules',
      'Those who don\'t enjoy alcohol culture',
      'Introverts who find constant social interaction draining',
      'People with physical limitations (standing, lifting)',
      'Those seeking comprehensive benefits',
      'Anyone uncomfortable with late nights'
    ],
    alternativeRoles: [
      { role: 'Barista', slug: 'barista', reason: 'Similar skills, daytime hours, less alcohol' },
      { role: 'Server', slug: 'server', reason: 'Good tips without bartending certification' },
      { role: 'Event Bartender', slug: 'catering-staff', reason: 'Higher rates, more variety, weekends only' }
    ],
    realTalk: 'Bartending can be incredibly lucrative - I know bartenders making $60-80k working 4 nights a week at the right spots. But the lifestyle catches up with you. Late nights, alcohol culture, and physical demands make many people burn out after 5-10 years. It\'s an excellent job for your 20s or as a side gig, but plan your exit strategy.',
    incomeRange: {
      starting: '$12-18/hr + tips ($25-35/hr total)',
      average: '$15-25/hr + tips ($35-50/hr total)',
      top: '$20-30/hr + tips ($50-80/hr total)'
    },
    typicalSchedule: 'Evenings and nights, typically 6pm-2am. Busiest on weekends. Most bartenders work 3-5 shifts per week.',
    careerLongevity: 'Many bartend for 5-15 years. Career transitions often lead to bar management, beverage directing, or opening own bars.',
    satisfactionFactors: [
      'Immediate gratification from tips',
      'Creative expression through cocktails',
      'Building regular customer relationships',
      'Being the center of social atmosphere'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'Can you make a living bartending?',
        answer: 'Yes, many bartenders earn $40,000-$70,000+ annually at busy venues. Income varies significantly by location and establishment type.'
      },
      {
        question: 'Is bartending a good career long-term?',
        answer: 'It can be, especially if you move into management or ownership. However, the late nights and physical demands lead many to transition to related careers by their 40s.'
      },
      {
        question: 'Do bartenders actually enjoy their job?',
        answer: 'Most do! Surveys show bartenders have higher job satisfaction than average. The social aspect and good money make up for the challenging hours.'
      }
    ]
  },
  {
    roleSlug: 'server',
    roleTitle: 'Server/Waiter',
    industry: 'hospitality',
    verdict: 'good',
    verdictSummary: 'Serving is a solid job with good tip income and flexibility. It\'s one of the best entry-level jobs available, though it can be physically and emotionally demanding.',
    overallScore: 7,
    scores: {
      payPotential: 8,
      workLifeBalance: 5,
      jobSecurity: 7,
      growthOpportunity: 7,
      flexibility: 8,
      physicalDemand: 6,
      stressLevel: 4,
      entryBarrier: 9
    },
    pros: [
      'Strong tip income - $20-40/hr common',
      'Easy to get hired with no experience',
      'Flexible scheduling',
      'Work available everywhere',
      'Learn valuable people skills',
      'Fast cash every shift',
      'Social, active work environment',
      'Clear path to management'
    ],
    cons: [
      'Dealing with difficult customers regularly',
      'Income varies with business levels',
      'Physical exhaustion from walking/carrying',
      'Evening and weekend work required',
      'Limited benefits typically',
      'Can be demeaning when customers are rude',
      'Tip-dependent income is inconsistent'
    ],
    bestFor: [
      'Students needing flexible work',
      'People-persons who enjoy interaction',
      'Those building work experience',
      'People who want cash quickly',
      'Career changers exploring hospitality',
      'Parents needing non-traditional hours'
    ],
    worstFor: [
      'Those who take customer complaints personally',
      'People needing consistent income',
      'Anyone with mobility issues',
      'Introverts who find small talk exhausting',
      'Those who can\'t work evenings/weekends'
    ],
    alternativeRoles: [
      { role: 'Host/Hostess', slug: 'host-hostess', reason: 'Less physical, front-of-house experience' },
      { role: 'Bartender', slug: 'bartender', reason: 'Higher tips, more stationary' },
      { role: 'Catering Staff', slug: 'catering-staff', reason: 'Higher per-event rates, choose your events' }
    ],
    realTalk: 'Serving is one of the best part-time or transitional jobs out there. The money is good, the skills are valuable, and you can work almost anywhere. But it\'s physically brutal and emotionally draining dealing with entitled customers. Great for a few years, but have a plan for what\'s next.',
    incomeRange: {
      starting: '$15-25/hr with tips (casual dining)',
      average: '$20-35/hr with tips',
      top: '$40-60/hr with tips (fine dining)'
    },
    typicalSchedule: 'Varies widely. Lunch shifts (10am-3pm), dinner shifts (4pm-10pm), or doubles. Most servers work 4-6 shifts per week.',
    careerLongevity: 'Average tenure is 3-7 years. Many move to management, bartending, or leave hospitality entirely.',
    satisfactionFactors: [
      'Good shifts can be very lucrative',
      'Making genuine connections with regulars',
      'Fast-paced environment keeps work interesting',
      'Team camaraderie with coworkers'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'How much do servers actually make?',
        answer: 'It varies hugely by restaurant. Casual dining: $25-35k/year. Mid-range: $35-50k/year. Fine dining: $50-80k+ possible.'
      },
      {
        question: 'Is serving a respectable job?',
        answer: 'Absolutely. Serving requires multitasking, memory, interpersonal skills, and grace under pressure. It\'s demanding work that deserves respect.'
      }
    ]
  },
  {
    roleSlug: 'dishwasher',
    roleTitle: 'Dishwasher',
    industry: 'hospitality',
    verdict: 'depends',
    verdictSummary: 'Dishwashing is a good entry-level job for building work experience and potentially moving up in kitchens. The work itself is tough, but it\'s accessible and can lead to culinary careers.',
    overallScore: 5.5,
    scores: {
      payPotential: 4,
      workLifeBalance: 5,
      jobSecurity: 6,
      growthOpportunity: 6,
      flexibility: 6,
      physicalDemand: 3,
      stressLevel: 5,
      entryBarrier: 10
    },
    pros: [
      'Extremely easy to get hired',
      'No experience required',
      'Foot in the door for kitchen careers',
      'Consistent hours available',
      'Learn kitchen operations',
      'Team environment',
      'Can move to prep/line cook',
      'Always in demand'
    ],
    cons: [
      'Low pay compared to other roles',
      'Physically demanding and hot work',
      'Repetitive tasks',
      'Wet and uncomfortable conditions',
      'Limited respect from some colleagues',
      'Evening and weekend work',
      'Can feel thankless'
    ],
    bestFor: [
      'First-time job seekers',
      'Those interested in culinary careers',
      'People who prefer physical to customer-facing work',
      'Anyone needing immediate employment',
      'Those who like working independently'
    ],
    worstFor: [
      'Those seeking career-level pay',
      'People who can\'t handle heat and humidity',
      'Anyone with skin sensitivity to water/chemicals',
      'Those wanting customer interaction'
    ],
    alternativeRoles: [
      { role: 'Prep Cook', slug: 'prep-cook', reason: 'Better pay, more skill development' },
      { role: 'Kitchen Porter', slug: 'kitchen-porter', reason: 'Similar entry-level, more varied tasks' },
      { role: 'Food Runner', slug: 'food-runner', reason: 'Tips, more interaction, similar accessibility' }
    ],
    realTalk: 'Dishwashing isn\'t glamorous, but it\'s honest work and many successful chefs started here. If you show up reliably and work hard, you can move up to prep cook within months. Just don\'t stay in the dish pit forever - use it as a stepping stone.',
    incomeRange: {
      starting: '$12-14/hr',
      average: '$14-17/hr',
      top: '$17-19/hr (high-end restaurants)'
    },
    typicalSchedule: 'Usually evening shifts covering dinner service. 4-8 hour shifts, 20-40 hours per week.',
    careerLongevity: 'Most dishwashers move up or on within 6-18 months. Some make careers as dish leads at volume restaurants.',
    satisfactionFactors: [
      'Seeing immediate results of your work',
      'Team appreciation during busy rushes',
      'Freedom from customer demands',
      'Kitchen camaraderie'
    ],
    burnoutRisk: 'high',
    commonQuestions: [
      {
        question: 'Is dishwashing a dead-end job?',
        answer: 'Only if you stay there. Many chefs started as dishwashers. Show initiative and you can move to prep cook, then line cook within a year.'
      },
      {
        question: 'How hard is dishwashing really?',
        answer: 'It\'s physically demanding - hot, wet, fast-paced. Your feet will hurt and you\'ll be tired. But it\'s straightforward work anyone can learn.'
      }
    ]
  },
  {
    roleSlug: 'barista',
    roleTitle: 'Barista',
    industry: 'hospitality',
    verdict: 'good',
    verdictSummary: 'Barista is a great entry-level job with daytime hours, tips, and a pleasant work environment. It\'s especially good for students and coffee enthusiasts.',
    overallScore: 7,
    scores: {
      payPotential: 6,
      workLifeBalance: 7,
      jobSecurity: 7,
      growthOpportunity: 6,
      flexibility: 7,
      physicalDemand: 7,
      stressLevel: 6,
      entryBarrier: 9
    },
    pros: [
      'Daytime hours (mostly)',
      'Tips add to hourly pay',
      'Pleasant work environment',
      'Learn valuable craft skills',
      'Customer connections',
      'Major chains offer benefits',
      'Free coffee/drinks',
      'Creative outlet with latte art'
    ],
    cons: [
      'Early morning shifts (5-6am starts)',
      'Lower pay than bartending',
      'Repetitive drink orders',
      'Caffeine-addicted demanding customers',
      'Hot drink burns and steam risks',
      'Standing for full shift',
      'Rush periods are intense'
    ],
    bestFor: [
      'Morning people',
      'Coffee enthusiasts',
      'Students wanting daytime work',
      'Those building customer service skills',
      'People who want a pleasant environment',
      'Anyone seeking chain store benefits (Starbucks)'
    ],
    worstFor: [
      'Night owls who hate mornings',
      'Those wanting high earning potential',
      'People who don\'t enjoy coffee culture',
      'Anyone with caffeine sensitivity'
    ],
    alternativeRoles: [
      { role: 'Bartender', slug: 'bartender', reason: 'Higher tips, similar skills, but night hours' },
      { role: 'Cashier', slug: 'cashier', reason: 'Similar pay and customer service, less skill required' },
      { role: 'Host/Hostess', slug: 'host-hostess', reason: 'Similar accessibility, restaurant experience' }
    ],
    realTalk: 'Barista is one of the better entry-level jobs out there. The hours are reasonable, the environment is pleasant, and you learn a real skill. Just know that the career ceiling is limited unless you move into management or specialty coffee.',
    incomeRange: {
      starting: '$13-16/hr + tips ($15-20/hr total)',
      average: '$14-18/hr + tips ($17-23/hr total)',
      top: '$18-22/hr + tips ($22-28/hr total)'
    },
    typicalSchedule: 'Mostly morning/day shifts. Typical 4-8 hour shifts. Coffee shops are usually less demanding than restaurants.',
    careerLongevity: 'Average barista stays 1-3 years. Paths lead to shift supervisor, store manager, or specialty coffee careers.',
    satisfactionFactors: [
      'Crafting the perfect drink',
      'Regular customer relationships',
      'Pleasant atmosphere compared to other food service',
      'Coffee perks and knowledge'
    ],
    burnoutRisk: 'low',
    commonQuestions: [
      {
        question: 'Is being a barista stressful?',
        answer: 'Rush periods can be intense, but overall it\'s less stressful than restaurants. Morning rushes are fast but predictable.'
      },
      {
        question: 'Can you make a career as a barista?',
        answer: 'Long-term, you\'d need to move into management, specialty coffee, or coffee business ownership. As just a barista, growth is limited.'
      }
    ]
  },

  // ============================================
  // WAREHOUSE & INDUSTRIAL
  // ============================================
  {
    roleSlug: 'warehouse-operative',
    roleTitle: 'Warehouse Associate',
    industry: 'industrial',
    verdict: 'good',
    verdictSummary: 'Warehouse work offers solid pay, clear advancement, and doesn\'t require customer interaction. It\'s physically demanding but provides stable employment with benefits.',
    overallScore: 6.5,
    scores: {
      payPotential: 6,
      workLifeBalance: 6,
      jobSecurity: 8,
      growthOpportunity: 7,
      flexibility: 5,
      physicalDemand: 3,
      stressLevel: 5,
      entryBarrier: 9
    },
    pros: [
      'Consistent hours and schedules',
      'Benefits at major employers',
      'Clear advancement path',
      'No customer interaction',
      'Physical activity built into work',
      'Team environment',
      'Always in demand',
      'Overtime often available'
    ],
    cons: [
      'Physically exhausting',
      'Productivity targets can be stressful',
      'Repetitive work',
      'Some facilities are too hot or cold',
      'Early/late shifts disrupt sleep',
      'Limited creative fulfillment',
      'Body wear over time'
    ],
    bestFor: [
      'People who prefer physical work',
      'Those who dislike customer service',
      'People seeking steady employment with benefits',
      'Those who like routine and predictability',
      'People building toward forklift certification'
    ],
    worstFor: [
      'Those with physical limitations',
      'People who need creative stimulation',
      'Anyone unable to work nights/weekends',
      'Those who don\'t like repetitive tasks'
    ],
    alternativeRoles: [
      { role: 'Forklift Driver', slug: 'forklift-driver', reason: 'Better pay, certification adds value' },
      { role: 'Inventory Clerk', slug: 'inventory-clerk', reason: 'Less physical, more analytical' },
      { role: 'Shipping Clerk', slug: 'shipping-receiving-clerk', reason: 'More variety, documentation focus' }
    ],
    realTalk: 'Warehouse work is honest, steady employment. The pay is decent, the benefits are good at major companies, and there\'s always work. But your body will feel it - knees, back, feet. Get good shoes, lift properly, and have a plan to move into supervision or skilled positions before your body gives out.',
    incomeRange: {
      starting: '$15-17/hr',
      average: '$17-20/hr',
      top: '$20-25/hr (with premium shifts or skills)'
    },
    typicalSchedule: 'Shift work - day, evening, or overnight. Usually 8-10 hour shifts, 4-5 days per week. Overtime common during peak seasons.',
    careerLongevity: 'Many warehouse workers stay 5-15+ years, especially those who advance to supervision or specialized roles.',
    satisfactionFactors: [
      'Physical activity and staying active',
      'Clear productivity goals',
      'Team camaraderie',
      'Stable, predictable work'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'Is warehouse work bad for your body?',
        answer: 'It can be if you don\'t lift properly and take care of yourself. Good shoes, proper technique, and staying fit outside work help. Many do it for decades without major issues.'
      },
      {
        question: 'Do warehouse jobs have benefits?',
        answer: 'Major employers (Amazon, UPS, FedEx, Walmart DCs) offer health insurance, 401k, and sometimes stock options or tuition assistance.'
      }
    ]
  },
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Operator',
    industry: 'industrial',
    verdict: 'good',
    verdictSummary: 'Forklift operation is one of the best warehouse jobs - better pay, less physical strain, and a skill that\'s always in demand. Worth getting certified.',
    overallScore: 7.5,
    scores: {
      payPotential: 7,
      workLifeBalance: 6,
      jobSecurity: 8,
      growthOpportunity: 7,
      flexibility: 5,
      physicalDemand: 6,
      stressLevel: 5,
      entryBarrier: 6
    },
    pros: [
      'Higher pay than general warehouse work',
      'Less physically demanding than picking/packing',
      'Certification is valuable and transferable',
      'Steady demand across industries',
      'Skilled position with responsibility',
      'Often leads to supervisory roles',
      'Indoor work in most facilities'
    ],
    cons: [
      'Safety responsibility is serious',
      'Still requires shift work',
      'Can be repetitive',
      'Certification investment required',
      'Some environments are cold/hot',
      'Limited variety in day-to-day tasks'
    ],
    bestFor: [
      'Those seeking skilled warehouse work',
      'People who enjoy equipment operation',
      'Those wanting better warehouse pay',
      'Safety-conscious workers',
      'People planning warehouse careers'
    ],
    worstFor: [
      'Those uncomfortable with equipment responsibility',
      'People who can\'t pass safety requirements',
      'Anyone who doesn\'t want shift work'
    ],
    alternativeRoles: [
      { role: 'Warehouse Supervisor', slug: 'warehouse-operative', reason: 'Management track from forklift experience' },
      { role: 'Shipping/Receiving', slug: 'shipping-receiving-clerk', reason: 'Less equipment focus, more paperwork' },
      { role: 'Delivery Driver', slug: 'delivery-driver', reason: 'More variety, independence, similar pay' }
    ],
    realTalk: 'If you\'re going to work in warehouses, get forklift certified. It\'s an easy way to add $2-5/hour to your pay and the skill follows you anywhere. The work is safer on your body than humping boxes, and it opens doors to supervisory positions.',
    incomeRange: {
      starting: '$17-19/hr',
      average: '$19-23/hr',
      top: '$23-28/hr (specialty equipment or lead roles)'
    },
    typicalSchedule: 'Same as general warehouse - shift work with possible overtime. Certified operators often get first pick of shifts.',
    careerLongevity: 'Forklift operators can work 20+ years. Skills stay relevant and experience becomes more valuable.',
    satisfactionFactors: [
      'Operating equipment is engaging',
      'Respected position in warehouse',
      'Better pay for skills',
      'Less physical exhaustion'
    ],
    burnoutRisk: 'low',
    commonQuestions: [
      {
        question: 'How do I get forklift certified?',
        answer: 'Many employers provide free training. Or take a 1-2 day course for $50-150. OSHA certification is standard.'
      },
      {
        question: 'Is forklift driving easy?',
        answer: 'Basic operation is straightforward. Mastering tight spaces, load handling, and efficiency takes practice. Most people learn within a few weeks.'
      }
    ]
  },
  {
    roleSlug: 'delivery-driver',
    roleTitle: 'Delivery Driver',
    industry: 'industrial',
    verdict: 'good',
    verdictSummary: 'Delivery driving offers independence, decent pay, and high demand. It\'s good for people who hate being stuck in one place but requires dealing with traffic and tight schedules.',
    overallScore: 7,
    scores: {
      payPotential: 7,
      workLifeBalance: 5,
      jobSecurity: 8,
      growthOpportunity: 6,
      flexibility: 6,
      physicalDemand: 5,
      stressLevel: 4,
      entryBarrier: 8
    },
    pros: [
      'Independence - work alone most of the day',
      'Always moving, not stuck in one place',
      'High demand for drivers',
      'Good pay at major carriers',
      'Can lead to CDL truck driving',
      'Physical activity without grueling labor',
      'See different areas and neighborhoods'
    ],
    cons: [
      'Traffic stress daily',
      'Tight delivery windows cause pressure',
      'Physical from loading/unloading',
      'Weather impacts you directly',
      'Vehicle wear if using personal car',
      'Can be isolating',
      'Long hours during peak seasons'
    ],
    bestFor: [
      'People who like working independently',
      'Those who enjoy driving',
      'Workers who hate office/retail environments',
      'People who want physical activity without warehouse intensity'
    ],
    worstFor: [
      'Those who stress in traffic',
      'People without reliable transportation',
      'Anyone with poor driving record',
      'Those who need social interaction'
    ],
    alternativeRoles: [
      { role: 'Warehouse Associate', slug: 'warehouse-operative', reason: 'Steady environment, no driving stress' },
      { role: 'Personal Shopper', slug: 'personal-shopper', reason: 'Similar independence with less driving' },
      { role: 'CDL Truck Driver', slug: 'delivery-driver', reason: 'Higher pay, longer routes' }
    ],
    realTalk: 'Delivery driving is great if you value independence and can handle the stress of tight schedules. The major carriers (UPS, FedEx, Amazon) pay well with benefits. Just know that peak season (holidays) is brutal - 60+ hour weeks are common.',
    incomeRange: {
      starting: '$16-18/hr',
      average: '$18-22/hr',
      top: '$24-28/hr (UPS/FedEx after tenure)'
    },
    typicalSchedule: 'Usually day shifts, starting early (6-7am). 8-12 hour days depending on route. 5-6 days during peak.',
    careerLongevity: 'Many drivers work 10-20+ years. Can transition to route supervisor or truck driving.',
    satisfactionFactors: [
      'Independence and autonomy',
      'Variety in daily routes',
      'Customer appreciation',
      'Physical activity'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'Which delivery company pays best?',
        answer: 'UPS and FedEx pay most for drivers ($24-28/hr top rate). Amazon and smaller companies pay less but may be easier to start.'
      },
      {
        question: 'Is delivery driving hard on your body?',
        answer: 'It\'s moderate - lots of in/out of vehicle and carrying packages. Less demanding than warehouse work but more than office jobs.'
      }
    ]
  },

  // ============================================
  // RETAIL
  // ============================================
  {
    roleSlug: 'cashier',
    roleTitle: 'Cashier',
    industry: 'retail',
    verdict: 'depends',
    verdictSummary: 'Cashiering is a good first job for building experience, but pay is low and advancement is limited. Best as a stepping stone or part-time work.',
    overallScore: 5.5,
    scores: {
      payPotential: 4,
      workLifeBalance: 6,
      jobSecurity: 6,
      growthOpportunity: 5,
      flexibility: 6,
      physicalDemand: 7,
      stressLevel: 5,
      entryBarrier: 10
    },
    pros: [
      'Very easy to get hired',
      'Builds fundamental work skills',
      'Daytime and weekend hours available',
      'Employee discounts',
      'Good for social people',
      'Can lead to management',
      'Some stores (Costco, Trader Joe\'s) pay well'
    ],
    cons: [
      'Generally low pay',
      'Dealing with difficult customers',
      'Standing in one place for hours',
      'Repetitive work',
      'Holiday work required',
      'Limited intellectual stimulation',
      'Being blamed for things you can\'t control'
    ],
    bestFor: [
      'First-time job seekers',
      'Students needing part-time work',
      'Those building customer service experience',
      'People who enjoy brief interactions',
      'Entry point to retail management'
    ],
    worstFor: [
      'Those seeking living wages',
      'People who don\'t handle difficult customers well',
      'Those wanting mentally stimulating work',
      'Anyone who dislikes standing in one spot'
    ],
    alternativeRoles: [
      { role: 'Sales Associate', slug: 'sales-associate', reason: 'More variety, commission potential' },
      { role: 'Personal Shopper', slug: 'personal-shopper', reason: 'More movement, tips possible' },
      { role: 'Stock Associate', slug: 'stock-associate', reason: 'Less customer interaction' }
    ],
    realTalk: 'Cashiering is fine for your first job or a part-time gig, but don\'t stay long unless you\'re at a great company. The pay is usually minimum or near-minimum wage, and the work can be soul-crushing. Use it to build experience, then move up or out.',
    incomeRange: {
      starting: '$12-14/hr',
      average: '$13-16/hr',
      top: '$17-21/hr (Costco, warehouse clubs)'
    },
    typicalSchedule: 'Varies - morning, afternoon, evening, weekend shifts. Usually 4-8 hours. Part-time is common.',
    careerLongevity: 'Most cashiers stay 6 months to 2 years before moving to other roles or leaving retail.',
    satisfactionFactors: [
      'Quick customer interactions',
      'Immediate completion of transactions',
      'Employee discount perks',
      'Predictable work'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'Is being a cashier hard?',
        answer: 'The work itself is easy to learn. The hard part is dealing with difficult customers and staying engaged during slow periods.'
      },
      {
        question: 'Can you make a career as a cashier?',
        answer: 'Not really as just a cashier. But cashier → supervisor → assistant manager → store manager is a viable path.'
      }
    ]
  },
  {
    roleSlug: 'sales-associate',
    roleTitle: 'Sales Associate',
    industry: 'retail',
    verdict: 'depends',
    verdictSummary: 'Sales associate roles vary dramatically by store. High-end or commission environments can pay well, while basic retail pays minimum wage. Choose your employer carefully.',
    overallScore: 6,
    scores: {
      payPotential: 6,
      workLifeBalance: 6,
      jobSecurity: 6,
      growthOpportunity: 6,
      flexibility: 6,
      physicalDemand: 7,
      stressLevel: 5,
      entryBarrier: 9
    },
    pros: [
      'Commission potential at some stores',
      'Product discounts',
      'Learn sales skills',
      'Path to management',
      'More variety than cashier',
      'Build product knowledge',
      'Some high-end stores pay well'
    ],
    cons: [
      'Sales pressure at some stores',
      'Weekend and holiday work',
      'Standing for full shifts',
      'Dealing with difficult customers',
      'Inconsistent income if commission-based',
      'Often low base pay'
    ],
    bestFor: [
      'People who enjoy helping customers',
      'Those interested in products they\'d sell',
      'Workers seeking commission opportunities',
      'Anyone building retail management experience'
    ],
    worstFor: [
      'Introverts who dislike approaching strangers',
      'Those who hate sales pressure',
      'People needing predictable income'
    ],
    alternativeRoles: [
      { role: 'Stock Associate', slug: 'stock-associate', reason: 'Less customer pressure' },
      { role: 'Merchandiser', slug: 'merchandiser', reason: 'More independence, visual focus' },
      { role: 'Brand Ambassador', slug: 'brand-ambassador', reason: 'Higher event pay, more variety' }
    ],
    realTalk: 'The quality of a sales associate job depends entirely on where you work. Apple Store? Great pay and culture. Random mall store? Minimum wage and pressure. If you go into sales, pick a product you care about and a company that treats employees well.',
    incomeRange: {
      starting: '$13-16/hr',
      average: '$15-20/hr (or $14 + commission)',
      top: '$20-30/hr (electronics, luxury goods with commission)'
    },
    typicalSchedule: 'Varies - retail hours mean days, evenings, weekends. Full and part-time available.',
    careerLongevity: 'Average tenure 1-3 years. Path to management extends career length.',
    satisfactionFactors: [
      'Helping customers find what they need',
      'Commission rewards (where applicable)',
      'Product enthusiasm',
      'Team environment'
    ],
    burnoutRisk: 'medium',
    commonQuestions: [
      {
        question: 'Do sales associates make commission?',
        answer: 'Some do (electronics, furniture, jewelry, cars), but many retail stores are hourly only. Ask during the interview.'
      },
      {
        question: 'What stores pay sales associates the best?',
        answer: 'Apple, Costco, REI, Container Store, and specialty electronics stores typically pay above average.'
      }
    ]
  },

  // ============================================
  // FACILITIES
  // ============================================
  {
    roleSlug: 'security-guard',
    roleTitle: 'Security Guard',
    industry: 'facilities',
    verdict: 'good',
    verdictSummary: 'Security work offers steady employment, opportunities at all hours, and can lead to well-paying specialized positions. It suits people who prefer observation over physical labor.',
    overallScore: 6.5,
    scores: {
      payPotential: 6,
      workLifeBalance: 6,
      jobSecurity: 8,
      growthOpportunity: 7,
      flexibility: 7,
      physicalDemand: 7,
      stressLevel: 6,
      entryBarrier: 6
    },
    pros: [
      'Steady, consistent work',
      'Variety of shifts available',
      'Armed guards earn significantly more',
      'Corporate security pays well',
      'Less physical than many jobs',
      'Clear advancement path',
      'Growing industry'
    ],
    cons: [
      'Can be boring during quiet shifts',
      'Potential for dangerous situations',
      'Night and weekend work common',
      'Standing/walking for long periods',
      'Dealing with confrontational people',
      'Low pay at basic posts',
      'Licensing requirements'
    ],
    bestFor: [
      'Those who prefer observation to physical labor',
      'People comfortable with authority',
      'Veterans and those with military/police background',
      'Night owls who don\'t mind overnight shifts',
      'Those seeking to enter law enforcement'
    ],
    worstFor: [
      'People who can\'t handle confrontation',
      'Those who get bored easily',
      'Anyone uncomfortable with potential danger',
      'People with disqualifying criminal history'
    ],
    alternativeRoles: [
      { role: 'Warehouse Associate', slug: 'warehouse-operative', reason: 'More active, no confrontation' },
      { role: 'Parking Attendant', slug: 'parking-attendant', reason: 'Similar observation, less risk' },
      { role: 'Janitor/Custodian', slug: 'janitor', reason: 'Similar hours, no confrontation' }
    ],
    realTalk: 'Entry-level security pays modestly ($14-18/hr), but the ceiling is high. Armed security, corporate security, and executive protection can pay $25-40+/hr. Get your guard card, build experience, then specialize.',
    incomeRange: {
      starting: '$14-17/hr (unarmed)',
      average: '$17-22/hr',
      top: '$25-40/hr (armed, corporate, specialized)'
    },
    typicalSchedule: 'All shifts available - day, evening, overnight. Often 8-12 hour shifts. Many posts are 24/7 coverage.',
    careerLongevity: 'Long career potential. Many work 15-25+ years, especially in corporate or government security.',
    satisfactionFactors: [
      'Sense of responsibility and purpose',
      'Quiet shifts allow reading/studying',
      'Appreciation when incidents are prevented',
      'Variety of environments'
    ],
    burnoutRisk: 'low',
    commonQuestions: [
      {
        question: 'Is security guard a good career?',
        answer: 'It can be, especially if you advance to corporate security, armed positions, or management. Entry-level is a stepping stone.'
      },
      {
        question: 'Is security guard work dangerous?',
        answer: 'Most security work is observation and deterrence. Some sites have more risk. Choose positions matching your comfort level.'
      }
    ]
  },
  {
    roleSlug: 'janitor',
    roleTitle: 'Janitor/Custodian',
    industry: 'facilities',
    verdict: 'depends',
    verdictSummary: 'Janitorial work offers stable employment and independence, but pay is modest and the work can feel underappreciated. It\'s solid work for those who prefer working alone.',
    overallScore: 5.5,
    scores: {
      payPotential: 4,
      workLifeBalance: 6,
      jobSecurity: 8,
      growthOpportunity: 5,
      flexibility: 6,
      physicalDemand: 5,
      stressLevel: 7,
      entryBarrier: 9
    },
    pros: [
      'Work independently most of the time',
      'Always in demand',
      'No customer service required',
      'Flexible shift options',
      'Straightforward work',
      'Can lead to facilities management',
      'Union positions available with good benefits'
    ],
    cons: [
      'Generally low pay',
      'Physically demanding',
      'Often night/early morning hours',
      'Work can feel thankless',
      'Social stigma in some circles',
      'Exposure to chemicals and waste'
    ],
    bestFor: [
      'People who prefer working alone',
      'Those who take pride in cleanliness',
      'Night owls comfortable with late shifts',
      'Workers who want low-stress, straightforward jobs',
      'Those avoiding customer interaction'
    ],
    worstFor: [
      'Those seeking recognition',
      'People uncomfortable with cleaning tasks',
      'Anyone with chemical sensitivities',
      'Those needing daytime schedules'
    ],
    alternativeRoles: [
      { role: 'Housekeeper', slug: 'housekeeper', reason: 'Hotel setting, tips possible' },
      { role: 'Maintenance Worker', slug: 'maintenance-worker', reason: 'Higher pay, more variety' },
      { role: 'Security Guard', slug: 'security-guard', reason: 'Similar hours, different duties' }
    ],
    realTalk: 'Janitorial work is honest and always available. The pay isn\'t great, but union custodian positions at schools and hospitals can pay $18-25/hr with excellent benefits. The work itself is fine - it\'s straightforward and you see results.',
    incomeRange: {
      starting: '$13-15/hr',
      average: '$15-18/hr',
      top: '$18-25/hr (union, specialized, hospital)'
    },
    typicalSchedule: 'Often evening or overnight when buildings are empty. School custodians work more regular hours. Usually 8 hour shifts.',
    careerLongevity: 'Many janitors work 15-30+ years. Stable career with advancement to lead custodian or facilities management.',
    satisfactionFactors: [
      'Immediate visible results',
      'Independence during shifts',
      'Low-pressure environment',
      'Appreciation from building occupants'
    ],
    burnoutRisk: 'low',
    commonQuestions: [
      {
        question: 'Is being a janitor a good job?',
        answer: 'It\'s stable, always available work with decent hours. Pay varies widely - aim for union positions at schools, hospitals, or government buildings.'
      },
      {
        question: 'Is janitorial work hard?',
        answer: 'Moderately physical - lots of walking, bending, and lifting. Not as demanding as warehouse work but more than office jobs.'
      }
    ]
  }
];

// Helper functions
export const getCareerEvaluationBySlug = (slug: string) =>
  careerEvaluations.find(evaluation => evaluation.roleSlug === slug);

export const getCareerEvaluationsByIndustry = (industry: string) =>
  careerEvaluations.filter(evaluation => evaluation.industry === industry);

export const getCareerEvaluationsByVerdict = (verdict: CareerEvaluation['verdict']) =>
  careerEvaluations.filter(evaluation => evaluation.verdict === verdict);

export const getHighestRatedCareers = (limit: number = 10) =>
  [...careerEvaluations]
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, limit);

export const getCareersWithHighPayPotential = () =>
  careerEvaluations.filter(evaluation => evaluation.scores.payPotential >= 7);

export const getCareersWithHighFlexibility = () =>
  careerEvaluations.filter(evaluation => evaluation.scores.flexibility >= 7);

export const getCareersWithLowEntryBarrier = () =>
  careerEvaluations.filter(evaluation => evaluation.scores.entryBarrier >= 8);

export const getAllCareerEvaluationSlugs = () =>
  careerEvaluations.map(evaluation => evaluation.roleSlug);

