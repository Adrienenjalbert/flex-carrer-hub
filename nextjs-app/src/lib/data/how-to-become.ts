// How to Become Dataset - For "How to become a [job]" SEO pages
// Targets high-volume queries like "how to become a bartender"

export interface CareerStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  cost: string;
  tips: string[];
  resources?: { name: string; url: string }[];
}

export interface HowToBecomeGuide {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  overview: string;
  timeToStart: string;
  totalCost: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  steps: CareerStep[];
  requiredQualifications: string[];
  helpfulQualifications: string[];
  certifications: {
    name: string;
    required: boolean;
    cost: string;
    time: string;
    description: string;
  }[];
  education: {
    required: string;
    helpful: string;
  };
  ageRequirements: string;
  physicalRequirements: string[];
  backgroundCheck: boolean;
  drugTest: boolean;
  commonPaths: {
    path: string;
    description: string;
    timeframe: string;
  }[];
  firstJobTips: string[];
  expectedStartingPay: string;
  faqs: { question: string; answer: string }[];
}

export const howToBecomeGuides: HowToBecomeGuide[] = [
  // ============================================
  // HOSPITALITY
  // ============================================
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'hospitality',
    overview: 'Becoming a bartender requires being 21+ (in most states), getting alcohol service certification, and gaining some industry experience. While bartending school exists, most bartenders learn on the job starting as barbacks or servers.',
    timeToStart: '2 weeks - 3 months',
    totalCost: '$50-500',
    difficulty: 'moderate',
    steps: [
      {
        step: 1,
        title: 'Meet the Age Requirement',
        description: 'You must be 21 years old to serve alcohol in most US states. Some states allow 18-20 year olds to bartend with restrictions.',
        timeframe: 'N/A',
        cost: 'Free',
        tips: [
          'Check your state\'s specific laws - some allow bartending at 18',
          'If under 21, start as a barback or host to gain experience',
          'Begin learning drink recipes now even if you can\'t serve yet'
        ]
      },
      {
        step: 2,
        title: 'Get Your Alcohol Service Certification',
        description: 'TIPS, ServSafe Alcohol, or your state\'s required certification teaches responsible alcohol service. Required or preferred by most employers.',
        timeframe: '2-4 hours',
        cost: '$20-55',
        tips: [
          'TIPS certification is the most widely recognized',
          'Some employers will pay for your certification',
          'Take it seriously - you\'re legally liable for overserving'
        ],
        resources: [
          { name: 'TIPS Training', url: 'https://www.gettips.com' },
          { name: 'ServSafe Alcohol', url: 'https://www.servsafe.com' }
        ]
      },
      {
        step: 3,
        title: 'Learn Basic Drinks and Techniques',
        description: 'Master at least 20-30 classic cocktails, pouring techniques, and bar terminology. You don\'t need bartending school but you need the knowledge.',
        timeframe: '1-4 weeks',
        cost: 'Free - $500',
        tips: [
          'Study IBA official cocktails as a foundation',
          'Practice pouring at home (use water)',
          'Watch bartending videos on YouTube',
          'Bartending school is optional but can accelerate learning'
        ],
        resources: [
          { name: 'IBA Official Cocktails', url: 'https://iba-world.com/cocktails' }
        ]
      },
      {
        step: 4,
        title: 'Gain Industry Experience',
        description: 'Most bars won\'t hire bartenders without experience. Start as a barback, server, or host to learn the industry and prove yourself.',
        timeframe: '3-12 months',
        cost: 'Free (you\'re earning)',
        tips: [
          'Barback is the most direct path - you\'re already at the bar',
          'Watch and learn from experienced bartenders',
          'Volunteer to help with bar tasks when slow',
          'Ask bartenders to teach you during off-peak hours'
        ]
      },
      {
        step: 5,
        title: 'Get Your First Bartending Job',
        description: 'Apply to bars, restaurants, and hotels. Start at lower-volume places if needed, then work up to busier, higher-paying venues.',
        timeframe: '1-4 weeks of applying',
        cost: 'Free',
        tips: [
          'Start at neighborhood bars or casual restaurants',
          'Apply to multiple places simultaneously',
          'Be honest about your experience level',
          'Consider catering companies for event bartending',
          'Night clubs often hire newer bartenders for slower shifts'
        ]
      }
    ],
    requiredQualifications: [
      '21 years old (most states)',
      'Alcohol service certification (TIPS or equivalent)',
      'Legal right to work in US'
    ],
    helpfulQualifications: [
      'Previous bar or restaurant experience',
      'Knowledge of cocktail recipes',
      'Customer service experience',
      'Food handler\'s permit'
    ],
    certifications: [
      {
        name: 'TIPS Certification',
        required: true,
        cost: '$38-55',
        time: '2-4 hours',
        description: 'Training for Intervention ProcedureS - responsible alcohol service certification'
      },
      {
        name: 'ServSafe Alcohol',
        required: false,
        cost: '$25-35',
        time: '2 hours',
        description: 'Alternative alcohol service certification from the National Restaurant Association'
      },
      {
        name: 'State-specific License',
        required: true,
        cost: '$0-50',
        time: 'Varies',
        description: 'Some states require their own alcohol server permit in addition to or instead of TIPS'
      }
    ],
    education: {
      required: 'None - no degree or diploma required',
      helpful: 'Bartending school can teach fundamentals but is not necessary'
    },
    ageRequirements: '21+ in most states. Some states allow 18+ with restrictions. Check your state\'s laws.',
    physicalRequirements: [
      'Standing for 6-10+ hours',
      'Lifting cases of bottles (30-50 lbs)',
      'Quick movement in tight spaces',
      'Manual dexterity for pouring and garnishing'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Barback → Bartender',
        description: 'Most common path. Work as a barback for 6-12 months, learn the bar, then move up.',
        timeframe: '6-12 months'
      },
      {
        path: 'Server → Bartender',
        description: 'Work as a server, express interest in bar, train on slow shifts, then transition.',
        timeframe: '6-18 months'
      },
      {
        path: 'Bartending School → Entry Bar',
        description: 'Take bartending course, then start at casual bar or event bartending.',
        timeframe: '1-3 months'
      }
    ],
    firstJobTips: [
      'Start at slower bars to build confidence',
      'Accept that you\'ll make less initially',
      'Arrive early and stay late to learn',
      'Build relationships with regulars',
      'Don\'t be afraid to look up recipes you don\'t know'
    ],
    expectedStartingPay: '$12-18/hr base + tips = $25-35/hr total',
    faqs: [
      {
        question: 'Do I need bartending school?',
        answer: 'No, most bartenders learn on the job. Bartending school can teach basics faster but isn\'t required by employers.'
      },
      {
        question: 'Can I bartend without experience?',
        answer: 'Some places will train, but most prefer experience. Start as a barback or server first, or try event bartending.'
      },
      {
        question: 'How long does it take to become a bartender?',
        answer: 'With the fast path (barback at a training bar), 3-6 months. More commonly, 6-12 months of industry experience.'
      }
    ]
  },
  {
    roleSlug: 'server',
    roleTitle: 'Server/Waiter',
    industry: 'hospitality',
    overview: 'Becoming a server is one of the most accessible jobs - many restaurants hire with no experience. You need to be personable, able to multitask, and available for evenings and weekends.',
    timeToStart: '1-2 weeks',
    totalCost: '$0-25',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Get Food Handler Certification (if required)',
        description: 'Many states require food handlers to have a basic food safety certificate. Check your state\'s requirements.',
        timeframe: '1-4 hours',
        cost: '$10-25',
        tips: [
          'Many states don\'t require this to start',
          'Employers often pay for it after hire',
          'Online courses are quick and easy'
        ]
      },
      {
        step: 2,
        title: 'Prepare Your Application Materials',
        description: 'Create a simple resume highlighting customer service experience, even from non-restaurant jobs. Prepare your availability.',
        timeframe: '1-2 hours',
        cost: 'Free',
        tips: [
          'Highlight any customer-facing experience',
          'Include your complete availability',
          'Dress nicely when dropping off applications',
          'Apply in person during non-peak hours (2-4pm)'
        ]
      },
      {
        step: 3,
        title: 'Apply to Multiple Restaurants',
        description: 'Apply to several restaurants to increase your chances. Start with casual dining if you have no experience.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Casual dining (Applebee\'s, Chili\'s) often trains newbies',
          'Local family restaurants are good first jobs',
          'Apply to 5-10 places minimum',
          'Follow up after a few days if you don\'t hear back'
        ]
      },
      {
        step: 4,
        title: 'Complete Training',
        description: 'Most restaurants provide 2-5 days of training including menu knowledge, POS system, and shadowing experienced servers.',
        timeframe: '2-5 days',
        cost: 'Free (often paid)',
        tips: [
          'Study the menu at home',
          'Take notes during training',
          'Ask questions - trainers expect them',
          'Shadow the best servers'
        ]
      }
    ],
    requiredQualifications: [
      'Legal right to work in US',
      'Food handler permit (some states)',
      'Ability to stand and walk for long periods'
    ],
    helpfulQualifications: [
      'Previous customer service experience',
      'Restaurant experience in any role',
      'Knowledge of food and beverages',
      'Multilingual abilities'
    ],
    certifications: [
      {
        name: 'Food Handler Permit',
        required: true,
        cost: '$10-25',
        time: '1-4 hours',
        description: 'Basic food safety certification required in most states'
      },
      {
        name: 'Alcohol Server Certification',
        required: false,
        cost: '$20-55',
        time: '2-4 hours',
        description: 'Required if serving alcohol; some restaurants require this'
      }
    ],
    education: {
      required: 'None',
      helpful: 'None needed - all training is on the job'
    },
    ageRequirements: '16-18+ depending on state. 18-21+ if serving alcohol.',
    physicalRequirements: [
      'Standing and walking for 4-8 hours',
      'Carrying trays up to 25 lbs',
      'Bending and reaching',
      'Moving quickly during rushes'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire → Server',
        description: 'Many restaurants hire servers with no experience and train them.',
        timeframe: '1-2 weeks'
      },
      {
        path: 'Host → Server',
        description: 'Start as host to learn the restaurant, then move to serving.',
        timeframe: '2-6 months'
      },
      {
        path: 'Busser/Food Runner → Server',
        description: 'Start in support role to prove yourself, then get promoted.',
        timeframe: '3-6 months'
      }
    ],
    firstJobTips: [
      'Memorize the menu before your first shift',
      'Start at lunch shifts (slower) before dinner',
      'Write everything down at first',
      'Develop a system for tracking tables',
      'Be patient with yourself - speed comes with time'
    ],
    expectedStartingPay: '$12-15/hr base + tips = $20-30/hr total',
    faqs: [
      {
        question: 'Can I be a server with no experience?',
        answer: 'Yes! Many restaurants hire and train beginners. Start with casual dining chains or local restaurants.'
      },
      {
        question: 'How much do servers make?',
        answer: 'With tips, most servers make $20-40/hr. Fine dining servers can earn $40-60/hr. Base pay is often $2.13-15/hr depending on state.'
      },
      {
        question: 'What should I wear to a server interview?',
        answer: 'Business casual - black pants and a nice shirt. Match the restaurant\'s style. Look neat and put-together.'
      }
    ]
  },
  {
    roleSlug: 'dishwasher',
    roleTitle: 'Dishwasher',
    industry: 'hospitality',
    overview: 'Becoming a dishwasher is the easiest entry into restaurant work. No experience is needed, and you can often start within days of applying.',
    timeToStart: 'Same day - 1 week',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Prepare for Physical Work',
        description: 'Dishwashing is physically demanding. Make sure you can handle standing for hours and working in hot, wet conditions.',
        timeframe: 'N/A',
        cost: 'Free',
        tips: [
          'Get comfortable, non-slip shoes',
          'Be ready for hot, humid environment',
          'Understand you\'ll be on your feet for hours'
        ]
      },
      {
        step: 2,
        title: 'Apply to Restaurants',
        description: 'Apply in person to local restaurants during off-peak hours (2-4pm). Bring ID and be ready to start quickly.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Apply in person for fastest results',
          'Dress clean and neat',
          'Bring your ID - some hire on the spot',
          'Be flexible with hours'
        ]
      },
      {
        step: 3,
        title: 'Complete On-the-Job Training',
        description: 'Training is typically 1-2 shifts learning the dishwashing machine, organization system, and kitchen flow.',
        timeframe: '1-2 days',
        cost: 'Free',
        tips: [
          'Ask questions about their system',
          'Learn what items the kitchen needs most urgently',
          'Pay attention to safety procedures'
        ]
      }
    ],
    requiredQualifications: [
      'Legal right to work in US',
      'Physical ability to stand and lift',
      'Willingness to work evenings/weekends'
    ],
    helpfulQualifications: [
      'Reliability and punctuality',
      'Ability to work quickly',
      'Teamwork mentality'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'None'
    },
    ageRequirements: '16+ in most states',
    physicalRequirements: [
      'Standing for 4-8 hours',
      'Working in hot, wet environment',
      'Lifting heavy pots (up to 50 lbs)',
      'Repetitive motion'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply and start within days. No experience required.',
        timeframe: '1-7 days'
      }
    ],
    firstJobTips: [
      'Be reliable - that\'s the #1 thing',
      'Work fast but don\'t sacrifice cleanliness',
      'Prioritize what the cooks need most',
      'Express interest in learning prep work',
      'Show up early and ready to work'
    ],
    expectedStartingPay: '$12-17/hr',
    faqs: [
      {
        question: 'Is dishwashing hard?',
        answer: 'It\'s physically demanding and fast-paced. The work itself is simple, but staying consistent through a rush is challenging.'
      },
      {
        question: 'Can dishwashing lead to cooking?',
        answer: 'Yes! Many chefs started as dishwashers. Show interest, help with prep when you can, and you can move up.'
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
    overview: 'Getting a warehouse job is straightforward - most facilities hire quickly and train on the job. The main requirements are physical capability and availability for shift work.',
    timeToStart: '1-7 days',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply Online or In Person',
        description: 'Major employers (Amazon, UPS, FedEx, Target DC) have continuous hiring. Apply online or at hiring events.',
        timeframe: '30 minutes - 1 day',
        cost: 'Free',
        tips: [
          'Check company career sites directly',
          'Amazon has same-day hiring process',
          'Staffing agencies can place you quickly',
          'Apply to multiple companies'
        ]
      },
      {
        step: 2,
        title: 'Complete Assessment and Interview',
        description: 'Most warehouse jobs have simple assessments (basic math, following instructions) and brief interviews or orientations.',
        timeframe: '1-2 hours',
        cost: 'Free',
        tips: [
          'Be honest about physical capabilities',
          'Express flexibility with shifts',
          'Emphasize reliability',
          'Bring ID and work authorization'
        ]
      },
      {
        step: 3,
        title: 'Pass Background Check (if required)',
        description: 'Some facilities require background checks. This typically takes 1-5 days.',
        timeframe: '1-5 days',
        cost: 'Free (employer pays)',
        tips: [
          'Be honest about your history',
          'Some companies hire with certain records',
          'Prepare to wait for results'
        ]
      },
      {
        step: 4,
        title: 'Complete Orientation and Training',
        description: 'Training covers safety, equipment use, and job-specific procedures. Usually paid training.',
        timeframe: '1-3 days',
        cost: 'Free (paid training)',
        tips: [
          'Take safety training seriously',
          'Ask about equipment certifications',
          'Learn the metrics/targets expected'
        ]
      }
    ],
    requiredQualifications: [
      'Legal right to work in US',
      'Ability to lift 50+ lbs',
      'Ability to stand/walk for 8+ hours',
      'Available for shift work'
    ],
    helpfulQualifications: [
      'Previous warehouse experience',
      'Forklift certification',
      'Reliable transportation',
      'Flexibility with overtime'
    ],
    certifications: [
      {
        name: 'Forklift Certification',
        required: false,
        cost: 'Free (employer often provides)',
        time: '1-2 days',
        description: 'Opens higher-paying positions; often trained on the job'
      }
    ],
    education: {
      required: 'None',
      helpful: 'None'
    },
    ageRequirements: '18+',
    physicalRequirements: [
      'Lifting 50+ lbs regularly',
      'Standing/walking 8-12 hours',
      'Bending, reaching, climbing',
      'Working in various temperatures'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply directly to major employers or through staffing agencies.',
        timeframe: '1-7 days'
      },
      {
        path: 'Staffing Agency',
        description: 'Temp agencies place workers quickly, often converting to permanent.',
        timeframe: '1-3 days'
      }
    ],
    firstJobTips: [
      'Invest in good shoes immediately',
      'Stay hydrated - bring a water bottle',
      'Learn proper lifting technique',
      'Ask about advancement opportunities',
      'Be on time every day - reliability matters most'
    ],
    expectedStartingPay: '$15-20/hr',
    faqs: [
      {
        question: 'How fast can I get a warehouse job?',
        answer: 'Often within a week. Amazon and staffing agencies sometimes hire same-day.'
      },
      {
        question: 'Do warehouse jobs have benefits?',
        answer: 'Major employers like Amazon, UPS, and FedEx offer health insurance, 401k, and sometimes tuition assistance.'
      }
    ]
  },
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Operator',
    industry: 'industrial',
    overview: 'Becoming a forklift operator requires OSHA certification. Many employers provide free training, or you can get certified independently. Forklift certification significantly increases your warehouse pay.',
    timeToStart: '1-2 weeks',
    totalCost: '$0-200',
    difficulty: 'moderate',
    steps: [
      {
        step: 1,
        title: 'Understand Forklift Types',
        description: 'Learn about different forklifts: sit-down counterbalance, stand-up reach trucks, order pickers, and pallet jacks.',
        timeframe: '1-2 hours',
        cost: 'Free',
        tips: [
          'Sit-down counterbalance is most common',
          'Each type requires separate certification',
          'Start with one type, add more later'
        ]
      },
      {
        step: 2,
        title: 'Get OSHA Forklift Certification',
        description: 'Complete a certified training program including classroom learning and hands-on practice. Certification is site-specific under OSHA.',
        timeframe: '1-2 days',
        cost: '$50-200 (or free through employer)',
        tips: [
          'Many warehouses provide free certification',
          'Get certified with an employer if possible',
          'Third-party certification still requires employer evaluation',
          'Certification must be renewed every 3 years'
        ]
      },
      {
        step: 3,
        title: 'Practice and Gain Experience',
        description: 'Initial certification makes you legal to operate; experience makes you employable. Practice at your current warehouse or through temp assignments.',
        timeframe: '1-3 months',
        cost: 'Free',
        tips: [
          'Volunteer for forklift tasks at current job',
          'Temp agencies can place you in operator roles',
          'Focus on safety and accuracy before speed'
        ]
      },
      {
        step: 4,
        title: 'Apply for Forklift Operator Positions',
        description: 'With certification and some experience, apply specifically for forklift operator positions rather than general warehouse.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'List equipment types you\'re certified on',
          'Mention any perfect safety records',
          'Emphasize experience hours if substantial'
        ]
      }
    ],
    requiredQualifications: [
      'OSHA forklift certification',
      'Physical ability to operate equipment safely',
      'Good spatial awareness',
      'Clean safety record'
    ],
    helpfulQualifications: [
      'Warehouse experience',
      'Multiple equipment certifications',
      'Years of forklift experience',
      'Perfect safety record'
    ],
    certifications: [
      {
        name: 'OSHA Forklift Certification',
        required: true,
        cost: '$50-200',
        time: '1-2 days',
        description: 'Required to operate forklifts. Includes classroom and hands-on training.'
      }
    ],
    education: {
      required: 'None - certification only',
      helpful: 'None'
    },
    ageRequirements: '18+',
    physicalRequirements: [
      'Good vision and spatial awareness',
      'Ability to sit for extended periods',
      'Quick reflexes',
      'Ability to turn/twist while seated'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Warehouse Associate → Forklift Training',
        description: 'Get hired at a warehouse, then get employer-provided certification.',
        timeframe: '1-6 months'
      },
      {
        path: 'Independent Certification → Operator Job',
        description: 'Get certified yourself, then apply for operator-specific positions.',
        timeframe: '2-4 weeks'
      }
    ],
    firstJobTips: [
      'Safety first - always. Speed comes with time.',
      'Do thorough pre-operation inspections',
      'Never bypass safety features',
      'Communicate with pedestrians constantly',
      'Report any equipment issues immediately'
    ],
    expectedStartingPay: '$17-22/hr',
    faqs: [
      {
        question: 'How much does forklift certification cost?',
        answer: 'Third-party courses cost $50-200. Many employers provide free training and certification.'
      },
      {
        question: 'Is forklift certification worth it?',
        answer: 'Absolutely. It typically adds $2-5/hr to warehouse pay and opens more job opportunities.'
      },
      {
        question: 'How hard is it to learn forklift?',
        answer: 'Basic operation takes 1-2 days to learn. Becoming skilled in tight spaces takes a few months of practice.'
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
    overview: 'Cashier is one of the easiest jobs to get with no experience. Most retail stores hire cashiers constantly and provide all necessary training.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Multiple Stores',
        description: 'Apply online and in person to various retail stores. Major chains are always hiring.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Apply to stores you actually shop at',
          'Grocery stores often pay better than general retail',
          'Apply in person during weekday afternoons'
        ]
      },
      {
        step: 2,
        title: 'Complete Interview',
        description: 'Cashier interviews are brief, focusing on availability, customer service attitude, and reliability.',
        timeframe: '15-30 minutes',
        cost: 'Free',
        tips: [
          'Be friendly and smile',
          'Emphasize your availability',
          'Show you can handle basic math',
          'Express interest in customer service'
        ]
      },
      {
        step: 3,
        title: 'Complete Onboarding and Training',
        description: 'Training covers the POS system, store policies, and customer service. Usually 1-3 days.',
        timeframe: '1-3 days',
        cost: 'Free (paid)',
        tips: [
          'Practice on the register during slow times',
          'Learn product codes that speed up checkout',
          'Memorize store policies on returns/exchanges'
        ]
      }
    ],
    requiredQualifications: [
      'Legal right to work in US',
      'Basic math skills',
      'Ability to stand for shift duration',
      'Weekend/evening availability'
    ],
    helpfulQualifications: [
      'Customer service experience',
      'Cash handling experience',
      'Friendly personality'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'None'
    },
    ageRequirements: '16+ (varies by store and state)',
    physicalRequirements: [
      'Standing for 4-8 hours',
      'Light lifting occasionally',
      'Repetitive motion (scanning)'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Application',
        description: 'Apply, interview, and start within 1-2 weeks.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Learn the POS system quickly',
      'Stay friendly even with difficult customers',
      'Double-count cash to avoid drawer shortages',
      'Learn high-volume product codes',
      'Be patient with yourself - speed comes'
    ],
    expectedStartingPay: '$12-16/hr',
    faqs: [
      {
        question: 'How old do you have to be to be a cashier?',
        answer: '16 in most stores, though some positions (selling alcohol/tobacco) require 18-21.'
      },
      {
        question: 'Is being a cashier easy?',
        answer: 'The work is simple to learn. The challenge is staying friendly during busy periods and handling difficult customers.'
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
    overview: 'Becoming a security guard requires getting your state\'s guard card/license. Requirements vary by state but typically involve training, background check, and an application.',
    timeToStart: '1-4 weeks',
    totalCost: '$50-300',
    difficulty: 'moderate',
    steps: [
      {
        step: 1,
        title: 'Check Your State\'s Requirements',
        description: 'Security guard licensing requirements vary significantly by state. Research your state\'s Bureau of Security requirements.',
        timeframe: '1-2 hours',
        cost: 'Free',
        tips: [
          'Requirements range from no license to extensive training',
          'Some states require specific training hours',
          'Check if armed and unarmed have different requirements'
        ]
      },
      {
        step: 2,
        title: 'Complete Required Training',
        description: 'Most states require 8-40+ hours of security training covering legal powers, report writing, and emergency response.',
        timeframe: '1-5 days',
        cost: '$50-200',
        tips: [
          'Some security companies provide free training after hire',
          'Online training available in some states',
          'Look for state-approved training providers'
        ]
      },
      {
        step: 3,
        title: 'Pass Background Check',
        description: 'Security licensing requires clean background check. Certain convictions may disqualify you.',
        timeframe: '1-4 weeks',
        cost: '$25-75',
        tips: [
          'Be honest on your application',
          'Some old convictions may not disqualify you',
          'Expunged records usually don\'t appear'
        ]
      },
      {
        step: 4,
        title: 'Apply for Guard Card/License',
        description: 'Submit your application, training certificates, and fees to your state\'s licensing bureau.',
        timeframe: '1-3 weeks',
        cost: '$25-100',
        tips: [
          'Apply online if available in your state',
          'Keep copies of all certificates',
          'License typically valid for 1-2 years'
        ]
      },
      {
        step: 5,
        title: 'Apply to Security Companies',
        description: 'With your license, apply to security companies and contract firms.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Major companies: Allied Universal, Securitas, G4S',
          'Consider in-house security at hospitals, corporations',
          'Armed positions require additional licensing and pay more'
        ]
      }
    ],
    requiredQualifications: [
      'State security guard license',
      'Pass background check',
      'Clean criminal record (requirements vary)',
      '18+ years old (21+ for armed)'
    ],
    helpfulQualifications: [
      'Military or law enforcement background',
      'CPR/First Aid certification',
      'Armed guard license (for armed positions)',
      'Previous security experience'
    ],
    certifications: [
      {
        name: 'State Security Guard License',
        required: true,
        cost: '$50-150 total',
        time: '1-4 weeks',
        description: 'Required license to work as a security guard in your state'
      },
      {
        name: 'Armed Guard License',
        required: false,
        cost: '$100-300 additional',
        time: '16-40+ additional hours',
        description: 'Required to carry firearm on duty; significantly increases pay'
      },
      {
        name: 'CPR/First Aid',
        required: false,
        cost: '$50-100',
        time: '4-8 hours',
        description: 'Valuable addition that many employers prefer'
      }
    ],
    education: {
      required: 'High school diploma or GED (usually)',
      helpful: 'Criminal justice coursework, military training'
    },
    ageRequirements: '18+ for unarmed, 21+ for armed positions',
    physicalRequirements: [
      'Standing/walking for long periods',
      'Good vision and hearing',
      'Physical fitness for emergency response',
      'Ability to run/climb if needed'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Training → License → Security Company',
        description: 'Complete training, get licensed, then apply to security firms.',
        timeframe: '2-4 weeks'
      },
      {
        path: 'Security Company Training Program',
        description: 'Some companies hire then provide paid training and licensing assistance.',
        timeframe: '2-6 weeks'
      }
    ],
    firstJobTips: [
      'Start with unarmed positions to build experience',
      'Learn your legal authority limits',
      'Write detailed, factual reports',
      'De-escalation is your most important skill',
      'Build toward corporate or specialized security'
    ],
    expectedStartingPay: '$14-18/hr (unarmed), $18-25/hr (armed)',
    faqs: [
      {
        question: 'How long does it take to become a security guard?',
        answer: 'Typically 2-4 weeks from starting training to being licensed and hired.'
      },
      {
        question: 'Can I be a security guard with a criminal record?',
        answer: 'It depends on the offense and how long ago. Minor or old offenses may not disqualify you. Felonies are usually disqualifying.'
      },
      {
        question: 'Is security guard a good job?',
        answer: 'It can be a stable career with advancement opportunities. Corporate security and specialized roles pay well ($25-40/hr).'
      }
    ]
  },

  // ============================================
  // ADDITIONAL HOSPITALITY ROLES
  // ============================================
  {
    roleSlug: 'barista',
    roleTitle: 'Barista',
    industry: 'hospitality',
    overview: 'Becoming a barista is one of the most accessible paths into hospitality. Coffee shops hire year-round, and most provide comprehensive training on espresso machines and drink preparation. The key to success is genuine enthusiasm for coffee and customer service.',
    timeToStart: '1-2 weeks',
    totalCost: '$0-50',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Learn Coffee Basics',
        description: 'Understand the difference between espresso drinks (latte, cappuccino, americano), brewing methods, and basic coffee terminology. YouTube tutorials and coffee blogs are great free resources.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Learn the difference between a latte, cappuccino, and macchiato',
          'Understand espresso vs drip coffee',
          'Practice tasting coffee to develop your palate',
          'Visit different coffee shops to observe baristas at work'
        ]
      },
      {
        step: 2,
        title: 'Get Food Handler Certification (If Required)',
        description: 'Some states and employers require a food handler\'s permit. This covers basic food safety and hygiene practices.',
        timeframe: '2-4 hours',
        cost: '$10-25',
        tips: [
          'Check if your state requires this certification',
          'Many employers will pay for this if you don\'t have it',
          'Online courses are usually available',
          'Certification is typically valid for 2-3 years'
        ],
        resources: [
          { name: 'ServSafe Food Handler', url: 'https://www.servsafe.com/ServSafe-Food-Handler' }
        ]
      },
      {
        step: 3,
        title: 'Apply to Coffee Shops',
        description: 'Apply to local coffee shops, chain cafes (Starbucks, Dunkin\', Peet\'s), and cafes inside grocery stores or bookstores. Entry-level positions welcome candidates with no experience.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Apply to multiple locations to increase chances',
          'Starbucks and large chains often have structured training programs',
          'Independent shops may value personality over experience',
          'Express genuine interest in coffee culture'
        ]
      },
      {
        step: 4,
        title: 'Complete On-the-Job Training',
        description: 'Most employers provide 1-2 weeks of paid training covering espresso machine operation, drink recipes, customer service, and cash handling.',
        timeframe: '1-2 weeks',
        cost: 'Free (paid training)',
        tips: [
          'Take notes on drink recipes',
          'Practice steaming milk until you get consistent microfoam',
          'Ask experienced baristas for tips',
          'Learn the POS system thoroughly'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16+ (varies by employer)',
      'Legal right to work in US',
      'Ability to stand for extended periods'
    ],
    helpfulQualifications: [
      'Previous customer service experience',
      'Cash handling experience',
      'Knowledge of coffee and espresso',
      'Food handler certification'
    ],
    certifications: [
      {
        name: 'Food Handler Card',
        required: false,
        cost: '$10-25',
        time: '2-4 hours',
        description: 'Basic food safety certification; some states and employers require it'
      },
      {
        name: 'Specialty Coffee Association Barista Skills',
        required: false,
        cost: '$275-400',
        time: '1-2 days',
        description: 'Professional certification for career advancement; not needed for entry level'
      }
    ],
    education: {
      required: 'None (some employers prefer high school diploma)',
      helpful: 'Customer service training, hospitality courses'
    },
    ageRequirements: '16+ for most coffee shops; 18+ for shops serving alcohol',
    physicalRequirements: [
      'Standing for 4-8 hour shifts',
      'Lifting milk jugs and supply boxes (up to 30 lbs)',
      'Manual dexterity for drink preparation',
      'Ability to work in a fast-paced environment'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire → Training',
        description: 'Apply with no experience, complete paid on-the-job training.',
        timeframe: '1-2 weeks'
      },
      {
        path: 'Chain Store Program',
        description: 'Join Starbucks or similar chain with structured training and benefits.',
        timeframe: '1-3 weeks'
      }
    ],
    firstJobTips: [
      'Memorize the most popular drinks first',
      'Speed comes with practice - focus on accuracy initially',
      'Build rapport with regular customers',
      'Learn to work the morning rush efficiently',
      'Keep your station clean and organized'
    ],
    expectedStartingPay: '$13-17/hr plus tips ($2-5/hr)',
    faqs: [
      {
        question: 'Do I need experience to become a barista?',
        answer: 'No! Most coffee shops provide comprehensive training. Enthusiasm for coffee and customer service matters more than experience.'
      },
      {
        question: 'How much do baristas make with tips?',
        answer: 'Baristas typically earn $13-17/hr base plus $2-5/hr in tips, totaling $15-22/hr. Tips vary significantly by location and shift.'
      },
      {
        question: 'Is barista a good first job?',
        answer: 'Yes! It teaches customer service, time management, and teamwork. Many people start as baristas while in school or transitioning careers.'
      }
    ]
  },
  {
    roleSlug: 'line-cook',
    roleTitle: 'Line Cook',
    industry: 'hospitality',
    overview: 'Line cooks are the backbone of restaurant kitchens, responsible for preparing menu items quickly and consistently. This role requires stamina, ability to work under pressure, and basic cooking skills. It\'s an excellent entry point into a culinary career.',
    timeToStart: '1-4 weeks',
    totalCost: '$0-150',
    difficulty: 'moderate',
    steps: [
      {
        step: 1,
        title: 'Develop Basic Cooking Skills',
        description: 'Learn fundamental knife skills, cooking techniques (sautéing, grilling, frying), and kitchen safety. Practice at home or take a basic cooking class.',
        timeframe: '1-2 weeks',
        cost: 'Free - $100',
        tips: [
          'Learn proper knife handling and basic cuts',
          'Practice cooking under time pressure',
          'Understand food safety basics',
          'Watch professional cooking videos to learn techniques'
        ]
      },
      {
        step: 2,
        title: 'Get Food Handler Certification',
        description: 'Most states require food handlers working in restaurants to have certification. This demonstrates you understand food safety and proper handling.',
        timeframe: '2-4 hours',
        cost: '$10-25',
        tips: [
          'Complete online course and exam',
          'Keep certificate on hand for job applications',
          'Some employers provide this during onboarding',
          'Certification valid 2-3 years depending on state'
        ],
        resources: [
          { name: 'ServSafe Food Handler', url: 'https://www.servsafe.com/ServSafe-Food-Handler' }
        ]
      },
      {
        step: 3,
        title: 'Apply to Restaurant Kitchens',
        description: 'Apply to restaurants in your area. Casual dining, chain restaurants, and hotels often hire line cooks with minimal experience. Start with prep cook or pantry positions if needed.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Apply to multiple restaurants',
          'Be willing to start on the lower-skill stations',
          'Highlight any home cooking experience',
          'Express willingness to learn and work hard'
        ]
      },
      {
        step: 4,
        title: 'Learn the Station',
        description: 'Once hired, you\'ll train on specific stations (grill, sauté, fry, salad). Focus on consistency, speed, and cleanliness.',
        timeframe: '2-4 weeks',
        cost: 'Free (paid training)',
        tips: [
          'Master one station before moving to the next',
          'Maintain a clean and organized station',
          'Communicate clearly with other cooks',
          'Learn the menu inside and out'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+ for most kitchen positions',
      'Food handler certification (in most states)',
      'Ability to work evenings and weekends',
      'Ability to stand for long periods in hot environment'
    ],
    helpfulQualifications: [
      'Previous kitchen experience',
      'Culinary school training',
      'Strong knife skills',
      'Knowledge of food safety principles'
    ],
    certifications: [
      {
        name: 'Food Handler Card',
        required: true,
        cost: '$10-25',
        time: '2-4 hours',
        description: 'Required in most states to work in restaurant kitchens'
      },
      {
        name: 'ServSafe Food Protection Manager',
        required: false,
        cost: '$180-200',
        time: '8 hours',
        description: 'Advanced certification for career advancement to supervisor roles'
      }
    ],
    education: {
      required: 'None required',
      helpful: 'Culinary arts degree or certificate, cooking classes'
    },
    ageRequirements: '16+ for some positions, 18+ for most kitchen work',
    physicalRequirements: [
      'Standing for 8-12 hour shifts',
      'Working in hot, fast-paced environment',
      'Lifting pots, pans, and supplies (up to 50 lbs)',
      'Manual dexterity for knife work'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Entry-Level → Line Cook',
        description: 'Start as dishwasher or prep cook, advance to line cook.',
        timeframe: '3-6 months'
      },
      {
        path: 'Direct Hire',
        description: 'Apply directly for line cook position with basic skills.',
        timeframe: '1-4 weeks'
      }
    ],
    firstJobTips: [
      'Arrive early and be ready to work on time',
      'Keep your station immaculately clean',
      'Learn to prep efficiently before service',
      'Watch and learn from experienced cooks',
      'Stay calm during the dinner rush'
    ],
    expectedStartingPay: '$15-20/hr',
    faqs: [
      {
        question: 'Do I need culinary school to become a line cook?',
        answer: 'No! Most line cooks learn on the job. Culinary school can accelerate your career but isn\'t required to start.'
      },
      {
        question: 'How hard is it to become a line cook?',
        answer: 'The job is physically demanding and fast-paced, but entry is accessible. Basic cooking skills and willingness to work hard are the main requirements.'
      },
      {
        question: 'What\'s the career path from line cook?',
        answer: 'Line Cook → Station Lead → Sous Chef → Executive Chef. Many also transition to opening their own restaurants.'
      }
    ]
  },
  {
    roleSlug: 'prep-cook',
    roleTitle: 'Prep Cook',
    industry: 'hospitality',
    overview: 'Prep cooks prepare ingredients before service, handling tasks like chopping vegetables, marinating meats, and organizing mise en place. It\'s the most accessible kitchen position and an excellent stepping stone to line cook and beyond.',
    timeToStart: '1-2 weeks',
    totalCost: '$0-25',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Learn Basic Knife Skills',
        description: 'Practice basic cuts (dice, julienne, chiffonade) at home. Speed and consistency are valued, but safety comes first.',
        timeframe: '1 week',
        cost: 'Free',
        tips: [
          'Watch YouTube tutorials on proper knife technique',
          'Practice with vegetables at home',
          'Learn to keep knives sharp',
          'Focus on safety - proper grip and cutting board use'
        ]
      },
      {
        step: 2,
        title: 'Get Food Handler Certification',
        description: 'Complete food handler training to understand safe food handling practices.',
        timeframe: '2-4 hours',
        cost: '$10-25',
        tips: [
          'Many employers require this before starting',
          'Complete online for convenience',
          'Some restaurants provide this during onboarding'
        ]
      },
      {
        step: 3,
        title: 'Apply to Restaurant Kitchens',
        description: 'Apply to restaurants, hotels, catering companies, and institutional kitchens. Prep cook positions often accept candidates with no professional experience.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Express willingness to learn and work hard',
          'Mention any home cooking experience',
          'Apply to multiple locations',
          'Be flexible with scheduling'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16+ (18+ for some venues)',
      'Food handler certification (usually)',
      'Ability to stand for long periods',
      'Ability to follow instructions precisely'
    ],
    helpfulQualifications: [
      'Basic knife skills',
      'Home cooking experience',
      'Understanding of food safety'
    ],
    certifications: [
      {
        name: 'Food Handler Card',
        required: true,
        cost: '$10-25',
        time: '2-4 hours',
        description: 'Basic food safety certification required in most states'
      }
    ],
    education: {
      required: 'None',
      helpful: 'Cooking classes, culinary interest'
    },
    ageRequirements: '16+ for most prep cook positions',
    physicalRequirements: [
      'Standing for 6-10 hour shifts',
      'Repetitive cutting and chopping motions',
      'Lifting ingredients (up to 40 lbs)',
      'Working in refrigerated areas'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Entry-Level Hire',
        description: 'Apply directly as prep cook with minimal experience.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Be consistent - every cut should look the same',
      'Work clean - mise en place is everything',
      'Communicate when you\'re running low on items',
      'Ask questions if you\'re unsure about anything',
      'Speed comes with practice - accuracy first'
    ],
    expectedStartingPay: '$14-18/hr',
    faqs: [
      {
        question: 'Is prep cook a good entry-level job?',
        answer: 'Yes! It\'s the classic entry point to professional cooking. Many executive chefs started as prep cooks.'
      },
      {
        question: 'What\'s the difference between prep cook and line cook?',
        answer: 'Prep cooks prepare ingredients before service; line cooks cook the actual dishes during service. Prep is less stressful and better for beginners.'
      }
    ]
  },
  {
    roleSlug: 'host',
    roleTitle: 'Host/Hostess',
    industry: 'hospitality',
    overview: 'Hosts are the first point of contact for restaurant guests, managing reservations, seating guests, and maintaining waitlists. It\'s an excellent entry-level position that teaches customer service and restaurant operations.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Develop Customer Service Skills',
        description: 'Practice greeting people warmly, making eye contact, and handling difficult situations diplomatically. Good communication is the core skill.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Practice professional phone manner',
          'Work on remembering names and faces',
          'Learn to stay calm under pressure',
          'Develop a genuine, warm greeting style'
        ]
      },
      {
        step: 2,
        title: 'Apply to Restaurants',
        description: 'Apply to restaurants in your area. Casual dining, family restaurants, and chain restaurants frequently hire hosts with no experience.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Dress professionally for the interview',
          'Emphasize your communication skills',
          'Be flexible with scheduling',
          'Research the restaurant beforehand'
        ]
      },
      {
        step: 3,
        title: 'Learn the Reservation System',
        description: 'Once hired, you\'ll train on the restaurant\'s reservation system (OpenTable, Resy, or paper system), floor plan, and seating procedures.',
        timeframe: '2-5 days',
        cost: 'Free (paid training)',
        tips: [
          'Learn the floor plan quickly',
          'Understand server sections and rotation',
          'Master the reservation system',
          'Learn approximate wait times'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16+ for most host positions',
      'Excellent communication skills',
      'Professional appearance and demeanor',
      'Ability to multitask'
    ],
    helpfulQualifications: [
      'Previous customer service experience',
      'Experience with reservation systems',
      'Basic computer skills',
      'Bilingual skills'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'Customer service training'
    },
    ageRequirements: '16+ for most restaurants',
    physicalRequirements: [
      'Standing for 4-8 hour shifts',
      'Walking between host stand and tables',
      'Carrying menus'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire → Training',
        description: 'Apply directly and receive on-the-job training.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Greet every guest with genuine warmth',
      'Learn regulars\' names and preferences',
      'Communicate wait times honestly',
      'Keep the host stand and entrance area clean',
      'Build good relationships with servers for smooth seating'
    ],
    expectedStartingPay: '$12-16/hr plus occasional tips',
    faqs: [
      {
        question: 'Is host a good first job?',
        answer: 'Yes! It\'s one of the most accessible restaurant positions and teaches valuable customer service and communication skills.'
      },
      {
        question: 'Do hosts make tips?',
        answer: 'Sometimes. Many restaurants tip out hosts from server tips, typically adding $10-30 per shift.'
      },
      {
        question: 'What can you do after being a host?',
        answer: 'Common paths include becoming a server (higher tips), moving to management, or transitioning to hotels and hospitality companies.'
      }
    ]
  },
  {
    roleSlug: 'food-runner',
    roleTitle: 'Food Runner',
    industry: 'hospitality',
    overview: 'Food runners deliver completed dishes from the kitchen to guests\' tables, ensuring food arrives hot and presented correctly. It\'s a fast-paced role that bridges front and back of house.',
    timeToStart: '1 week',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Understand Restaurant Operations',
        description: 'Learn how restaurants work - the relationship between kitchen, servers, and guests. Food runners are the connection between kitchen and dining room.',
        timeframe: '1-2 days',
        cost: 'Free',
        tips: [
          'Dine at restaurants and observe the flow',
          'Learn basic menu terminology',
          'Understand table numbering systems',
          'Practice carrying plates safely'
        ]
      },
      {
        step: 2,
        title: 'Apply to Restaurants',
        description: 'Apply to busy restaurants, especially upscale casual and fine dining where food running is a dedicated role.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target restaurants that specifically hire food runners',
          'Express willingness to help servers and bussers too',
          'Be available for dinner shifts',
          'Emphasize your ability to work fast and accurately'
        ]
      },
      {
        step: 3,
        title: 'Learn the Menu and Table Numbers',
        description: 'Memorize the menu, table numbers, and proper food presentation standards.',
        timeframe: '3-7 days',
        cost: 'Free (paid training)',
        tips: [
          'Study the menu at home',
          'Learn position numbers (seat 1, 2, 3)',
          'Master the floor plan',
          'Learn proper plate presentation'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16+',
      'Ability to carry multiple plates safely',
      'Good memory for table numbers',
      'Ability to work quickly during rush periods'
    ],
    helpfulQualifications: [
      'Previous restaurant experience',
      'Physical stamina',
      'Knowledge of food presentation'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'Food handler certification in some states'
    },
    ageRequirements: '16+ for most restaurants',
    physicalRequirements: [
      'Carrying heavy trays (up to 25 lbs)',
      'Walking/running for entire shift',
      'Standing in hot kitchen',
      'Moving quickly during rush'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply directly to restaurants for food runner position.',
        timeframe: '1 week'
      }
    ],
    firstJobTips: [
      'Learn which server has which tables',
      'Always check the ticket before running food',
      'Handle plates professionally - no thumbs on food',
      'Communicate with kitchen about timing',
      'Help servers when you have downtime'
    ],
    expectedStartingPay: '$12-16/hr plus tip pool ($3-8/hr)',
    faqs: [
      {
        question: 'Do food runners make good money?',
        answer: 'Yes, especially in busy restaurants. Base pay plus tip pool often totals $15-24/hr.'
      },
      {
        question: 'Is food runner a good path to server?',
        answer: 'Absolutely! Many servers started as food runners. You learn the menu, the flow, and build rapport with management.'
      }
    ]
  },
  {
    roleSlug: 'busser',
    roleTitle: 'Busser',
    industry: 'hospitality',
    overview: 'Bussers clear and reset tables, assist servers, and help maintain restaurant cleanliness. It\'s one of the most accessible restaurant positions and an excellent starting point for a hospitality career.',
    timeToStart: '1 week',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Restaurants',
        description: 'Apply to restaurants in your area. Most restaurants hire bussers with no prior experience - just show you\'re reliable and hardworking.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Apply to busy restaurants (more tip potential)',
          'Be willing to work evening and weekend shifts',
          'Emphasize your work ethic and reliability',
          'Dress presentably for interviews'
        ]
      },
      {
        step: 2,
        title: 'Learn Table Setting and Service Standards',
        description: 'Once hired, learn proper table setting, clearing procedures, and the restaurant\'s specific service standards.',
        timeframe: '2-3 days',
        cost: 'Free (paid training)',
        tips: [
          'Learn proper place setting quickly',
          'Understand what needs to be pre-bussed vs. full clear',
          'Know where everything goes in the dish pit',
          'Learn to work with specific servers'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 14-16+ depending on state/restaurant',
      'Ability to lift bus tubs (30+ lbs)',
      'Ability to work quickly and efficiently',
      'Attention to cleanliness'
    ],
    helpfulQualifications: [
      'Previous work experience of any kind',
      'Teamwork orientation',
      'Good physical stamina'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'None required'
    },
    ageRequirements: '14+ in some states, 16+ in others',
    physicalRequirements: [
      'Lifting heavy bus tubs (30-40 lbs)',
      'Walking/standing for entire shift',
      'Bending and reaching',
      'Moving quickly during rushes'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Entry',
        description: 'Apply and get hired with minimal experience.',
        timeframe: '1 week'
      }
    ],
    firstJobTips: [
      'Keep water glasses full without being asked',
      'Pre-bus plates as soon as guests are done',
      'Reset tables quickly for maximum turnover',
      'Build good relationships with your servers',
      'Always be doing something - there\'s always work'
    ],
    expectedStartingPay: '$10-14/hr plus tip pool ($3-7/hr)',
    faqs: [
      {
        question: 'Is busser a good first job?',
        answer: 'Yes! It\'s one of the easiest restaurant positions to get with no experience. Many people start here at 16 and work up.'
      },
      {
        question: 'Do bussers get tips?',
        answer: 'Yes, bussers receive a percentage of server tips, typically adding $3-7/hr on top of base pay.'
      },
      {
        question: 'What can I do after being a busser?',
        answer: 'Common paths: food runner → server, or back-of-house to prep cook → line cook.'
      }
    ]
  },
  {
    roleSlug: 'barback',
    roleTitle: 'Barback',
    industry: 'hospitality',
    overview: 'Barbacks support bartenders by stocking supplies, cleaning glassware, and keeping the bar running smoothly. It\'s the traditional stepping stone to bartending and requires stamina and attention to detail.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Learn Bar Basics',
        description: 'Understand the different types of glassware, basic spirits and mixers, and bar organization. Visit bars and observe the barback role.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Learn the types of bar glasses',
          'Understand basic liquor categories',
          'Observe how busy bars operate',
          'Learn garnish prep basics'
        ]
      },
      {
        step: 2,
        title: 'Apply to Bars and Restaurants',
        description: 'Apply to bars, restaurants with bars, hotels, and event venues. Express your interest in eventually becoming a bartender.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target busy bars with high volume',
          'Express long-term interest in bartending',
          'Be available for weekend and night shifts',
          'Show you understand the physical demands'
        ]
      },
      {
        step: 3,
        title: 'Master the Support Role',
        description: 'Learn to anticipate bartender needs - ice, glassware, garnishes - before they run out. Speed and organization are key.',
        timeframe: '1-2 weeks',
        cost: 'Free (paid training)',
        tips: [
          'Always stay one step ahead of the bartender',
          'Keep ice bins full at all times',
          'Learn garnish prep perfectly',
          'Watch and learn drink making during slower times'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+ (21+ in some states)',
      'Ability to lift kegs and cases (50+ lbs)',
      'Physical stamina for fast-paced work',
      'Attention to detail and organization'
    ],
    helpfulQualifications: [
      'Previous restaurant experience',
      'Basic knowledge of spirits and drinks',
      'Interest in bartending career',
      'Customer service experience'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'Alcohol awareness training, bar knowledge'
    },
    ageRequirements: '18+ in most states, 21+ in some',
    physicalRequirements: [
      'Lifting kegs, cases, and ice (up to 50 lbs)',
      'Standing for 6-10 hour shifts',
      'Working in crowded, loud environment',
      'Moving quickly during rush periods'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Barback → Bartender',
        description: 'Most common path. Work as barback for 6-12 months then promote.',
        timeframe: '6-12 months to bartender'
      }
    ],
    firstJobTips: [
      'Never let the ice or glassware run low',
      'Learn to change kegs quickly',
      'Watch how experienced bartenders make drinks',
      'Ask to practice making drinks during slow times',
      'Build a good relationship with your bartenders'
    ],
    expectedStartingPay: '$12-18/hr plus tip-out ($5-15/hr)',
    faqs: [
      {
        question: 'Is barback a good way to become a bartender?',
        answer: 'Yes! It\'s the traditional path. You learn the bar, prove yourself, and get promoted. Most bartenders started as barbacks.'
      },
      {
        question: 'How much do barbacks make?',
        answer: 'Barbacks earn $12-18/hr base plus tip-out from bartenders (usually 10-20% of bartender tips), totaling $17-33/hr at busy bars.'
      }
    ]
  },
  {
    roleSlug: 'banquet-server',
    roleTitle: 'Banquet Server',
    industry: 'hospitality',
    overview: 'Banquet servers work at events like weddings, corporate functions, and galas, serving food and beverages to large groups. The work is often on-call or event-based, making it flexible but requiring weekend availability.',
    timeToStart: '1-2 weeks',
    totalCost: '$0-50',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Get Alcohol Service Certification',
        description: 'Many banquet servers serve alcohol, so having TIPS or equivalent certification makes you more hireable.',
        timeframe: '2-4 hours',
        cost: '$30-55',
        tips: [
          'Complete online certification',
          'Required for most banquet positions serving alcohol',
          'Good for 2-3 years',
          'Some employers provide this'
        ],
        resources: [
          { name: 'TIPS Training', url: 'https://www.gettips.com' }
        ]
      },
      {
        step: 2,
        title: 'Apply to Event Venues and Staffing Agencies',
        description: 'Apply to hotels, event venues, catering companies, and hospitality staffing agencies. Many hire servers for specific events.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target hotels with conference centers',
          'Apply to catering companies',
          'Consider event staffing agencies',
          'Be willing to work weekends'
        ]
      },
      {
        step: 3,
        title: 'Learn Banquet Service Style',
        description: 'Banquet service differs from restaurant service - learn plated service, buffet setup, French service, and synchronized service for large groups.',
        timeframe: '1-3 events',
        cost: 'Free (paid training)',
        tips: [
          'Learn proper tray carrying technique',
          'Master synchronized plate delivery',
          'Understand event timelines',
          'Work well with large teams'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+ (21+ if serving alcohol)',
      'Professional appearance',
      'Ability to stand for 6-10 hour events',
      'Weekend and evening availability'
    ],
    helpfulQualifications: [
      'Previous server experience',
      'TIPS or alcohol certification',
      'Formal service training',
      'Black formal attire (often provided)'
    ],
    certifications: [
      {
        name: 'TIPS Alcohol Certification',
        required: false,
        cost: '$38-55',
        time: '2-4 hours',
        description: 'Strongly preferred for serving alcohol at events'
      },
      {
        name: 'Food Handler Card',
        required: false,
        cost: '$10-25',
        time: '2-4 hours',
        description: 'May be required depending on venue/state'
      }
    ],
    education: {
      required: 'None',
      helpful: 'Hospitality training, formal service experience'
    },
    ageRequirements: '18+ (21+ to serve alcohol in most states)',
    physicalRequirements: [
      'Carrying heavy trays (25+ lbs)',
      'Standing for 6-10 hour events',
      'Walking large venues',
      'Setting up tables and chairs'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire → On-Call Events',
        description: 'Get hired by hotel or venue, work events as scheduled.',
        timeframe: '1-2 weeks'
      },
      {
        path: 'Staffing Agency',
        description: 'Work with hospitality staffing agency for flexible scheduling.',
        timeframe: '1 week'
      }
    ],
    firstJobTips: [
      'Always show up in proper attire',
      'Learn the event timeline and your role',
      'Work as part of the team',
      'Be professional and invisible to guests',
      'Build relationships for future bookings'
    ],
    expectedStartingPay: '$16-25/hr plus occasional tips/gratuity',
    faqs: [
      {
        question: 'How is banquet serving different from restaurant serving?',
        answer: 'Banquet serving is event-based (weddings, conferences), often on-call, and involves serving large groups simultaneously rather than individual tables throughout a shift.'
      },
      {
        question: 'Is banquet serving good money?',
        answer: 'Yes, especially for special events. Base pay is usually $16-25/hr, and some events include automatic gratuity, bringing total to $25-40/hr.'
      }
    ]
  },

  // ============================================
  // INDUSTRIAL / WAREHOUSE ROLES
  // ============================================
  {
    roleSlug: 'picker-packer',
    roleTitle: 'Picker/Packer',
    industry: 'industrial',
    overview: 'Picker/packers work in warehouses and fulfillment centers, retrieving items from storage (picking) and packaging them for shipment (packing). It\'s one of the most accessible warehouse positions with consistent year-round demand.',
    timeToStart: '1-3 days',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Warehouses and Fulfillment Centers',
        description: 'Apply directly to Amazon, Walmart, Target, and other distribution centers. Many also hire through staffing agencies.',
        timeframe: '1-3 days',
        cost: 'Free',
        tips: [
          'Apply to multiple locations',
          'Check Amazon\'s hiring events - often same-day offers',
          'Consider staffing agencies for quick placement',
          'Be willing to work any shift'
        ]
      },
      {
        step: 2,
        title: 'Complete Onboarding and Training',
        description: 'Complete paperwork, drug test (at most facilities), and training on RF scanners, safety procedures, and picking/packing protocols.',
        timeframe: '1-2 days',
        cost: 'Free (paid training)',
        tips: [
          'Bring required ID for I-9 verification',
          'Wear comfortable closed-toe shoes',
          'Pay attention to safety training',
          'Learn the scanner system thoroughly'
        ]
      },
      {
        step: 3,
        title: 'Start Working and Build Speed',
        description: 'Begin picking and packing. Focus on accuracy first, then build speed. Meet or exceed rate expectations.',
        timeframe: 'Ongoing',
        cost: 'Free',
        tips: [
          'Accuracy is more important than speed initially',
          'Learn the warehouse layout quickly',
          'Stay organized and efficient',
          'Build up your stamina over the first few weeks'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+',
      'Ability to stand/walk for 8-12 hour shifts',
      'Ability to lift 50 lbs',
      'Basic math skills for inventory counts'
    ],
    helpfulQualifications: [
      'Previous warehouse experience',
      'RF scanner experience',
      'Good physical stamina',
      'Reliable transportation'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'High school diploma for some employers'
    },
    ageRequirements: '18+ for most warehouse positions',
    physicalRequirements: [
      'Standing/walking 8-12 hours',
      'Lifting up to 50 lbs repeatedly',
      'Bending, reaching, and climbing ladders',
      'Working in varying temperatures'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Same-Day Hire',
        description: 'Many fulfillment centers offer same-day start.',
        timeframe: '1-3 days'
      },
      {
        path: 'Staffing Agency',
        description: 'Quick placement through temp agencies.',
        timeframe: '1-7 days'
      }
    ],
    firstJobTips: [
      'Wear comfortable, supportive shoes',
      'Stay hydrated - bring a water bottle',
      'Learn the fastest routes through the warehouse',
      'Keep your pick cart organized',
      'Meet rate expectations to avoid write-ups'
    ],
    expectedStartingPay: '$16-22/hr',
    faqs: [
      {
        question: 'Is picker/packer hard work?',
        answer: 'It\'s physically demanding - you\'ll walk 10-15 miles per shift and lift repeatedly. The work itself is straightforward but requires stamina.'
      },
      {
        question: 'Can I get hired at Amazon easily?',
        answer: 'Yes, Amazon frequently holds hiring events with same-day offers. The process is quick if you pass the background check and drug test.'
      }
    ]
  },
  {
    roleSlug: 'machine-operator',
    roleTitle: 'Machine Operator',
    industry: 'industrial',
    overview: 'Machine operators run manufacturing equipment, monitor production processes, and perform quality checks. The role requires attention to detail, mechanical aptitude, and willingness to learn equipment-specific operations.',
    timeToStart: '1-4 weeks',
    totalCost: '$0',
    difficulty: 'moderate',
    steps: [
      {
        step: 1,
        title: 'Develop Basic Mechanical Skills',
        description: 'Understand basic mechanical concepts, measurement tools, and safety procedures. Manufacturing experience helps but isn\'t required.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Learn to read tape measures and calipers',
          'Understand basic machine safety',
          'Develop mechanical troubleshooting mindset',
          'Practice attention to detail'
        ]
      },
      {
        step: 2,
        title: 'Apply to Manufacturing Facilities',
        description: 'Apply to factories, production facilities, and manufacturing plants. Many hire entry-level operators and train on specific equipment.',
        timeframe: '1-3 weeks',
        cost: 'Free',
        tips: [
          'Target facilities in your area',
          'Express willingness to learn',
          'Be open to different shifts (nights often easier to get)',
          'Highlight reliability and attention to detail'
        ]
      },
      {
        step: 3,
        title: 'Complete Equipment-Specific Training',
        description: 'Learn to operate the specific machines used at your facility. Training typically takes 1-4 weeks depending on complexity.',
        timeframe: '1-4 weeks',
        cost: 'Free (paid training)',
        tips: [
          'Take detailed notes during training',
          'Ask questions when unsure',
          'Learn safety lockout/tagout procedures',
          'Understand quality specifications'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+',
      'Mechanical aptitude',
      'Attention to detail for quality control',
      'Ability to stand for full shifts'
    ],
    helpfulQualifications: [
      'Previous manufacturing experience',
      'Mechanical or technical training',
      'Math skills for measurements',
      'Computer/technology comfort'
    ],
    certifications: [
      {
        name: 'OSHA 10-Hour General Industry',
        required: false,
        cost: '$25-75',
        time: '10 hours',
        description: 'Basic safety certification that improves hireability'
      }
    ],
    education: {
      required: 'High school diploma or GED (usually)',
      helpful: 'Technical or vocational training'
    },
    ageRequirements: '18+ for most manufacturing positions',
    physicalRequirements: [
      'Standing for 8-12 hour shifts',
      'Lifting materials (up to 50 lbs)',
      'Working in varying temperatures and noise levels',
      'Repetitive motions'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Entry-Level → Trained Operator',
        description: 'Get hired as trainee and learn on the job.',
        timeframe: '1-4 weeks'
      }
    ],
    firstJobTips: [
      'Safety is always the top priority',
      'Check your work constantly for quality',
      'Report machine issues immediately',
      'Keep your work area clean',
      'Learn multiple machines to increase value'
    ],
    expectedStartingPay: '$16-22/hr',
    faqs: [
      {
        question: 'Do I need experience to become a machine operator?',
        answer: 'Not necessarily. Many facilities train entry-level operators. Mechanical aptitude and attention to detail are more important than prior experience.'
      },
      {
        question: 'Is machine operator a good career?',
        answer: 'Yes! Experienced operators can earn $20-30+/hr, and there\'s advancement potential to lead operator, technician, or supervisor roles.'
      }
    ]
  },
  {
    roleSlug: 'shipping-receiving',
    roleTitle: 'Shipping and Receiving Clerk',
    industry: 'industrial',
    overview: 'Shipping and receiving clerks manage incoming and outgoing shipments, verify deliveries, maintain inventory records, and coordinate with carriers. It\'s a role that combines physical work with administrative responsibility.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Develop Required Skills',
        description: 'Build basic computer skills, understand shipping documents, and learn inventory management concepts.',
        timeframe: '1 week',
        cost: 'Free',
        tips: [
          'Learn to use spreadsheets and databases',
          'Understand bills of lading and packing slips',
          'Practice attention to detail',
          'Develop organizational skills'
        ]
      },
      {
        step: 2,
        title: 'Apply to Warehouses and Distribution Centers',
        description: 'Apply to warehouses, distribution centers, manufacturers, and retail stores with shipping departments.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Highlight computer and organization skills',
          'Show attention to detail',
          'Be willing to work any shift',
          'Target growing e-commerce operations'
        ]
      },
      {
        step: 3,
        title: 'Learn Inventory Systems',
        description: 'Train on the company\'s warehouse management system (WMS) and shipping software.',
        timeframe: '1-2 weeks',
        cost: 'Free (paid training)',
        tips: [
          'Master the WMS quickly',
          'Learn carrier-specific requirements',
          'Understand receiving verification procedures',
          'Build relationships with drivers and carriers'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+',
      'Basic computer skills',
      'Attention to detail',
      'Ability to lift 50+ lbs'
    ],
    helpfulQualifications: [
      'Previous warehouse experience',
      'Forklift certification',
      'Inventory management experience',
      'Data entry skills'
    ],
    certifications: [
      {
        name: 'Forklift Certification',
        required: false,
        cost: '$50-150',
        time: '4-8 hours',
        description: 'Valuable add-on for unloading shipments'
      }
    ],
    education: {
      required: 'High school diploma or GED (usually)',
      helpful: 'Logistics or supply chain coursework'
    },
    ageRequirements: '18+ for most positions',
    physicalRequirements: [
      'Lifting packages (up to 50 lbs)',
      'Standing and walking for full shifts',
      'Operating pallet jacks',
      'Loading and unloading trucks'
    ],
    backgroundCheck: true,
    drugTest: true,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply directly to shipping/receiving positions.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Double-check all counts and documents',
      'Build good relationships with delivery drivers',
      'Stay organized with paperwork',
      'Report discrepancies immediately',
      'Learn the carrier pickup schedules'
    ],
    expectedStartingPay: '$15-20/hr',
    faqs: [
      {
        question: 'What does shipping and receiving do?',
        answer: 'You manage incoming deliveries (receiving), outgoing shipments (shipping), verify quantities, update inventory records, and coordinate with carriers.'
      },
      {
        question: 'Is shipping and receiving a good career?',
        answer: 'Yes! It can lead to logistics coordinator, warehouse manager, or supply chain roles. Experience in S&R is valuable across industries.'
      }
    ]
  },

  // ============================================
  // RETAIL ROLES
  // ============================================
  {
    roleSlug: 'retail-assistant',
    roleTitle: 'Retail Sales Associate',
    industry: 'retail',
    overview: 'Retail sales associates help customers, process transactions, stock merchandise, and maintain store appearance. It\'s one of the most common entry-level jobs with consistent demand, especially during holiday seasons.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Retail Stores',
        description: 'Apply to retail stores in your area. Big-box retailers, department stores, and specialty shops all hire sales associates.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Apply to multiple stores at once',
          'Target stores you\'d enjoy working at',
          'Apply online and follow up in person',
          'Be available for evenings and weekends'
        ]
      },
      {
        step: 2,
        title: 'Complete Onboarding and Training',
        description: 'Learn the POS system, store policies, product knowledge, and customer service standards.',
        timeframe: '1-5 days',
        cost: 'Free (paid training)',
        tips: [
          'Learn the POS system thoroughly',
          'Study product categories and locations',
          'Understand store policies',
          'Practice suggestive selling'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16+ (varies by store)',
      'Good communication skills',
      'Basic math skills for transactions',
      'Ability to stand for full shifts'
    ],
    helpfulQualifications: [
      'Previous retail or customer service experience',
      'Product knowledge in specialty stores',
      'Cash handling experience',
      'Bilingual skills'
    ],
    certifications: [],
    education: {
      required: 'None (high school diploma for some)',
      helpful: 'Customer service training'
    },
    ageRequirements: '16+ for most retail positions',
    physicalRequirements: [
      'Standing for 4-8 hour shifts',
      'Lifting merchandise (up to 40 lbs)',
      'Walking the sales floor',
      'Reaching and bending for stock'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply and get hired with minimal experience.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Greet every customer who enters your area',
      'Learn the products so you can make recommendations',
      'Keep your area clean and well-stocked',
      'Meet or exceed sales goals to earn hours',
      'Be flexible with scheduling'
    ],
    expectedStartingPay: '$12-17/hr',
    faqs: [
      {
        question: 'Is retail a good first job?',
        answer: 'Yes! Retail teaches customer service, sales, time management, and teamwork. These skills transfer to many other careers.'
      },
      {
        question: 'When is the best time to apply to retail?',
        answer: 'Late September/October for holiday hiring, early spring for summer positions. However, turnover means opportunities year-round.'
      }
    ]
  },
  {
    roleSlug: 'stock-clerk',
    roleTitle: 'Stock Clerk',
    industry: 'retail',
    overview: 'Stock clerks receive shipments, organize inventory, and ensure products are properly stocked on shelves. It\'s often behind-the-scenes work with more flexible hours than sales floor positions.',
    timeToStart: '1 week',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Retail Stores',
        description: 'Apply to grocery stores, big-box retailers, and specialty stores for stocking positions. Many offer early morning or overnight shifts.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target stores with large inventories',
          'Be open to overnight stocking shifts',
          'Highlight physical ability and organization',
          'Apply directly and through job boards'
        ]
      },
      {
        step: 2,
        title: 'Complete Training',
        description: 'Learn inventory systems, stocking procedures, and product organization.',
        timeframe: '1-3 days',
        cost: 'Free (paid training)',
        tips: [
          'Learn product locations quickly',
          'Understand FIFO (first in, first out) rotation',
          'Master the inventory scanner',
          'Learn proper lifting techniques'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 16-18+ depending on hours',
      'Ability to lift 50+ lbs',
      'Physical stamina',
      'Attention to detail'
    ],
    helpfulQualifications: [
      'Previous stocking or warehouse experience',
      'Organizational skills',
      'Ability to work independently'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'High school diploma for some employers'
    },
    ageRequirements: '16+ for day shifts, 18+ for overnight at many stores',
    physicalRequirements: [
      'Lifting heavy boxes (50+ lbs)',
      'Bending, reaching, and kneeling',
      'Standing/walking for full shifts',
      'Operating pallet jacks'
    ],
    backgroundCheck: false,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply for stocking positions directly.',
        timeframe: '1 week'
      }
    ],
    firstJobTips: [
      'Work efficiently but don\'t sacrifice accuracy',
      'Keep the backroom organized',
      'Rotate stock properly (FIFO)',
      'Report damaged merchandise',
      'Overnight shifts often pay more'
    ],
    expectedStartingPay: '$13-18/hr ($15-21 for overnight)',
    faqs: [
      {
        question: 'Is overnight stocking worth it?',
        answer: 'Often yes! Overnight shifts typically pay $1-3/hr more, and you avoid customer interaction if that\'s not your preference.'
      },
      {
        question: 'What\'s the difference between stock clerk and warehouse worker?',
        answer: 'Stock clerks work in retail stores stocking shelves. Warehouse workers work in distribution centers. Both involve physical work and inventory.'
      }
    ]
  },

  // ============================================
  // FACILITIES ROLES
  // ============================================
  {
    roleSlug: 'janitor',
    roleTitle: 'Janitor/Custodian',
    industry: 'facilities',
    overview: 'Janitors and custodians maintain cleanliness in offices, schools, hospitals, and other facilities. The work is straightforward, often offers flexible schedules, and provides stable employment across industries.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Facilities and Cleaning Companies',
        description: 'Apply to schools, hospitals, office buildings, cleaning companies, and facilities management firms.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target stable employers (schools, hospitals)',
          'Consider commercial cleaning companies',
          'Be open to evening/night shifts',
          'Highlight reliability and attention to detail'
        ]
      },
      {
        step: 2,
        title: 'Complete Background Check (If Required)',
        description: 'Schools and healthcare facilities typically require background checks.',
        timeframe: '3-7 days',
        cost: 'Free (employer pays)',
        tips: [
          'Be honest about any background issues',
          'Older or minor offenses often don\'t disqualify',
          'Hospitals and schools are stricter'
        ]
      },
      {
        step: 3,
        title: 'Learn Cleaning Protocols',
        description: 'Train on proper cleaning procedures, chemical handling, and facility-specific requirements.',
        timeframe: '1-5 days',
        cost: 'Free (paid training)',
        tips: [
          'Learn proper chemical dilution',
          'Understand OSHA safety requirements',
          'Master floor care equipment',
          'Learn efficient cleaning routes'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+',
      'Ability to lift cleaning supplies (up to 50 lbs)',
      'Physical stamina for active work',
      'Reliability and trustworthiness'
    ],
    helpfulQualifications: [
      'Previous cleaning experience',
      'Floor care experience (buffing, stripping)',
      'Driver\'s license (for some positions)',
      'Basic equipment maintenance skills'
    ],
    certifications: [
      {
        name: 'ISSA Cleaning Management Institute Certification',
        required: false,
        cost: '$150-300',
        time: '8-40 hours',
        description: 'Professional certification for career advancement'
      }
    ],
    education: {
      required: 'None',
      helpful: 'High school diploma for some employers'
    },
    ageRequirements: '18+ for most custodial positions',
    physicalRequirements: [
      'Standing and walking for full shifts',
      'Lifting and moving supplies',
      'Bending, reaching, and climbing',
      'Operating floor care equipment'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply directly to facilities or cleaning companies.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Be thorough - small details matter',
      'Maintain consistent cleaning schedules',
      'Report maintenance issues promptly',
      'Secure areas you clean in sensitive facilities',
      'Build toward lead custodian or supervisor'
    ],
    expectedStartingPay: '$13-18/hr',
    faqs: [
      {
        question: 'Is janitor work steady?',
        answer: 'Yes! Every facility needs cleaning. Schools, hospitals, and offices provide stable, year-round employment.'
      },
      {
        question: 'What\'s the career path for janitors?',
        answer: 'Janitor → Lead Custodian → Custodial Supervisor → Facilities Manager. Experience opens doors to building maintenance too.'
      }
    ]
  },
  {
    roleSlug: 'housekeeper',
    roleTitle: 'Housekeeper',
    industry: 'facilities',
    overview: 'Housekeepers clean and maintain guest rooms, public areas, and laundry in hotels, resorts, and healthcare facilities. It\'s a stable role with growth opportunities in the hospitality industry.',
    timeToStart: '1-2 weeks',
    totalCost: '$0',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Hotels and Facilities',
        description: 'Apply to hotels, resorts, hospitals, and senior living facilities. Many hire housekeepers with no prior experience.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Target hotels in your area',
          'Consider hospitals and care facilities',
          'Express reliability and attention to detail',
          'Be willing to work weekends'
        ]
      },
      {
        step: 2,
        title: 'Complete Training',
        description: 'Learn cleaning procedures, bed-making techniques, and quality standards specific to your employer.',
        timeframe: '1-3 days',
        cost: 'Free (paid training)',
        tips: [
          'Master bed-making to brand standards',
          'Learn efficient room cleaning order',
          'Understand timing expectations',
          'Pay attention to details guests notice'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+',
      'Attention to detail',
      'Physical ability to clean multiple rooms',
      'Reliability and punctuality'
    ],
    helpfulQualifications: [
      'Previous cleaning experience',
      'Hotel experience',
      'Customer service skills',
      'Ability to work independently'
    ],
    certifications: [],
    education: {
      required: 'None',
      helpful: 'Hospitality training'
    },
    ageRequirements: '18+ for most housekeeping positions',
    physicalRequirements: [
      'Standing, walking, bending for full shifts',
      'Lifting linens and supplies (30+ lbs)',
      'Repetitive cleaning motions',
      'Pushing heavy carts'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Direct Hire',
        description: 'Apply and get hired with on-the-job training.',
        timeframe: '1-2 weeks'
      }
    ],
    firstJobTips: [
      'Speed comes with practice - focus on thoroughness first',
      'Check under beds and in corners',
      'Report any room damage immediately',
      'Build toward inspecting or supervising',
      'Tips from guests can add significantly to income'
    ],
    expectedStartingPay: '$13-18/hr plus tips',
    faqs: [
      {
        question: 'Do housekeepers get tips?',
        answer: 'Yes, in hotels especially. Tip amounts vary but can add $20-50+ per day at nicer properties.'
      },
      {
        question: 'Is housekeeping hard work?',
        answer: 'It\'s physically demanding - you\'ll clean 10-20 rooms per shift. But it\'s straightforward work with consistent hours.'
      }
    ]
  },

  // ============================================
  // EVENTS ROLES
  // ============================================
  {
    roleSlug: 'event-staff',
    roleTitle: 'Event Staff',
    industry: 'events',
    overview: 'Event staff work at concerts, sports games, festivals, and corporate events, handling setup, guest services, and breakdown. The work is flexible and event-based, ideal for supplemental income.',
    timeToStart: '1 week',
    totalCost: '$0-50',
    difficulty: 'easy',
    steps: [
      {
        step: 1,
        title: 'Apply to Event Staffing Agencies and Venues',
        description: 'Apply to event staffing agencies, sports venues, convention centers, and concert halls.',
        timeframe: '1-2 weeks',
        cost: 'Free',
        tips: [
          'Register with multiple staffing agencies',
          'Apply directly to local venues',
          'Be available for evenings and weekends',
          'Get TIPS certification for alcohol service roles'
        ]
      },
      {
        step: 2,
        title: 'Complete Required Training',
        description: 'Complete venue-specific orientation and any required certifications (alcohol service, crowd management).',
        timeframe: '1-4 hours',
        cost: '$0-50',
        tips: [
          'Get TIPS certified for more opportunities',
          'Learn crowd management basics',
          'Understand emergency procedures',
          'Be flexible about role assignments'
        ]
      }
    ],
    requiredQualifications: [
      'Must be 18+ (21+ for alcohol roles)',
      'Good communication skills',
      'Ability to stand for long events',
      'Weekend and evening availability'
    ],
    helpfulQualifications: [
      'Previous customer service experience',
      'TIPS or alcohol certification',
      'Crowd management training',
      'Professional demeanor'
    ],
    certifications: [
      {
        name: 'TIPS Alcohol Certification',
        required: false,
        cost: '$38-55',
        time: '2-4 hours',
        description: 'Required for pouring/serving alcohol at events'
      }
    ],
    education: {
      required: 'None',
      helpful: 'Customer service training'
    },
    ageRequirements: '18+ (21+ for alcohol service)',
    physicalRequirements: [
      'Standing for 4-12 hour events',
      'Walking large venues',
      'Lifting event supplies',
      'Working in crowds and noise'
    ],
    backgroundCheck: true,
    drugTest: false,
    commonPaths: [
      {
        path: 'Staffing Agency Placement',
        description: 'Register and get assigned to events.',
        timeframe: '1 week'
      }
    ],
    firstJobTips: [
      'Be punctual - events can\'t wait',
      'Dress professionally in required uniform',
      'Stay positive and helpful to guests',
      'Volunteer for different roles to learn more',
      'Build relationships for repeat bookings'
    ],
    expectedStartingPay: '$14-22/hr depending on event type',
    faqs: [
      {
        question: 'Is event staffing steady work?',
        answer: 'It\'s variable - busy during event seasons (summer, holidays) but slower other times. Many combine it with other work.'
      },
      {
        question: 'What types of events do event staff work?',
        answer: 'Concerts, sports games, festivals, conventions, corporate events, weddings, and more. Variety is one of the perks!'
      }
    ]
  }
];

// Helper functions
export const getHowToBecomeBySlug = (slug: string) =>
  howToBecomeGuides.find(guide => guide.roleSlug === slug);

export const getHowToBecomeByIndustry = (industry: string) =>
  howToBecomeGuides.filter(guide => guide.industry === industry);

export const getEasyCareerEntries = () =>
  howToBecomeGuides.filter(guide => guide.difficulty === 'easy');

export const getQuickStartCareers = () =>
  howToBecomeGuides.filter(guide => 
    guide.timeToStart.includes('day') || 
    guide.timeToStart.includes('1 week') ||
    guide.timeToStart.includes('1-2 weeks')
  );

export const getFreeCostCareers = () =>
  howToBecomeGuides.filter(guide => guide.totalCost === '$0');

export const getAllHowToBecomeSlugs = () =>
  howToBecomeGuides.map(guide => guide.roleSlug);

