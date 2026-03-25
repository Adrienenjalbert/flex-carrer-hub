import type { HowToBecomeGuide } from './types';

export const otherGuides: HowToBecomeGuide[] = [
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

