import type { HowToBecomeGuide } from './types';

export const industrialGuides: HowToBecomeGuide[] = [
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
];

