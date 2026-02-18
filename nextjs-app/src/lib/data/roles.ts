// Consolidated roles dataset - combines all roles for programmatic SEO
// Last updated: January 2026
// 
// Pay Data Sources:
// - Bureau of Labor Statistics (BLS) Occupational Employment and Wage Statistics (OEWS) 2025
// - BLS Occupational Outlook Handbook 2025-2026
// - Indeed Flex internal market data
// - Industry-specific salary surveys
//
// Tip data verified against:
// - Toast Restaurant Technology Report 2025
// - National Restaurant Association wage data
// - Indeed Flex worker earnings reports

export interface Role {
  id: string;
  title: string;
  slug: string;
  industry: 'hospitality' | 'industrial' | 'retail' | 'facilities' | 'healthcare' | 'events';
  description: string;
  shortDescription: string;
  avgHourlyRate: { min: number; max: number };
  avgTips?: { min: number; max: number };
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  certifications?: string[];
  careerPath: { role: string; years: string; salary?: string }[];
  faqs: { question: string; answer: string }[];
  searchVolume?: 'very-high' | 'high' | 'medium';
  entryLevel?: boolean;
  physicalDemand?: 'low' | 'medium' | 'high';
  scheduleFlex?: 'high' | 'medium' | 'low';
}

export const industries = [
  { id: 'hospitality', name: 'Hospitality', icon: 'UtensilsCrossed', color: 'bg-amber-500' },
  { id: 'industrial', name: 'Industrial & Warehouse', icon: 'Warehouse', color: 'bg-blue-600' },
  { id: 'retail', name: 'Retail', icon: 'ShoppingBag', color: 'bg-emerald-500' },
  { id: 'facilities', name: 'Facilities Management', icon: 'Building2', color: 'bg-purple-500' },
  { id: 'healthcare', name: 'Healthcare Support', icon: 'Heart', color: 'bg-red-500' },
  { id: 'events', name: 'Events & Entertainment', icon: 'Calendar', color: 'bg-pink-500' },
] as const;

export type IndustryId = typeof industries[number]['id'];

export const roles: Role[] = [
  // Hospitality
  {
    id: 'barback',
    title: 'Barback',
    slug: 'barback',
    industry: 'hospitality',
    description: 'Barbacks are essential support staff in bars and restaurants, assisting bartenders by stocking supplies, cleaning glasses, and ensuring the bar runs smoothly during busy service periods.',
    shortDescription: 'Support bartenders and keep the bar running smoothly',
    avgHourlyRate: { min: 12, max: 18 },
    skills: ['Speed & efficiency', 'Physical stamina', 'Attention to detail', 'Team communication', 'Organization'],
    responsibilities: [
      'Restock bar supplies including glassware, ice, and garnishes',
      'Clean and sanitize bar equipment and glassware',
      'Assist bartenders during rush periods',
      'Maintain cleanliness of bar area',
      'Receive and store deliveries'
    ],
    requirements: [
      'Must be 18+ (21+ in some states)',
      'Ability to lift 30+ lbs',
      'Comfortable standing for long periods',
      'Weekend and evening availability'
    ],
    careerPath: [
      { role: 'Barback', years: '0-1 years' },
      { role: 'Bartender', years: '1-3 years' },
      { role: 'Head Bartender', years: '3-5 years' },
      { role: 'Bar Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'Do I need experience to become a barback?', answer: 'No prior experience is required. Most bars provide on-the-job training for barbacks.' },
      { question: 'Do barbacks receive tips?', answer: 'Yes, barbacks typically receive tip-outs from bartenders, usually 10-20% of bartender tips.' },
      { question: 'What are typical barback hours?', answer: 'Barbacks usually work evening and weekend shifts, typically 6-10 hours per shift.' }
    ]
  },
  {
    id: 'barista',
    title: 'Barista',
    slug: 'barista',
    industry: 'hospitality',
    description: 'Baristas are skilled coffee professionals who prepare and serve espresso-based drinks, brewed coffee, and other beverages while providing excellent customer service in cafes and coffee shops.',
    shortDescription: 'Craft specialty coffee drinks and serve customers',
    avgHourlyRate: { min: 13, max: 19 },
    skills: ['Coffee brewing techniques', 'Latte art', 'Customer service', 'Multitasking', 'Cash handling'],
    responsibilities: [
      'Prepare espresso drinks, brewed coffee, and specialty beverages',
      'Greet customers and take orders',
      'Operate espresso machines and other equipment',
      'Maintain cleanliness standards',
      'Manage cash register and process payments'
    ],
    requirements: [
      'Strong customer service skills',
      'Ability to work in fast-paced environment',
      'Basic math skills for cash handling',
      'Food handler certification (in some locations)'
    ],
    careerPath: [
      { role: 'Barista', years: '0-2 years' },
      { role: 'Shift Supervisor', years: '2-3 years' },
      { role: 'Assistant Manager', years: '3-5 years' },
      { role: 'Store Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'How long does it take to learn barista skills?', answer: 'Basic barista skills can be learned in 2-4 weeks. Mastering latte art and advanced techniques takes 3-6 months.' },
      { question: 'Do baristas get tips?', answer: 'Yes, baristas typically receive tips, which can add $2-5 per hour to their base pay.' },
      { question: 'What certifications help baristas?', answer: 'SCA (Specialty Coffee Association) certifications can boost your career and earning potential.' }
    ]
  },
  {
    id: 'bartender',
    title: 'Bartender',
    slug: 'bartender',
    industry: 'hospitality',
    description: 'Bartenders mix and serve alcoholic and non-alcoholic beverages, create cocktails, engage with customers, and manage the bar area in restaurants, bars, hotels, and event venues.',
    shortDescription: 'Mix drinks, serve customers, and manage bar operations',
    avgHourlyRate: { min: 15, max: 25 },
    skills: ['Mixology', 'Customer service', 'Memory & recall', 'Cash handling', 'Speed & multitasking'],
    responsibilities: [
      'Mix and serve cocktails, beer, wine, and other beverages',
      'Check IDs and ensure responsible alcohol service',
      'Build rapport with customers and provide recommendations',
      'Maintain accurate tabs and process payments',
      'Keep bar area clean and stocked'
    ],
    requirements: [
      'Must be 21+ years old',
      'TIPS or ServSafe Alcohol certification',
      'Knowledge of drink recipes and techniques',
      'Excellent customer service skills'
    ],
    careerPath: [
      { role: 'Bartender', years: '0-3 years' },
      { role: 'Head Bartender', years: '3-5 years' },
      { role: 'Bar Manager', years: '5-7 years' },
      { role: 'Beverage Director', years: '7+ years' }
    ],
    faqs: [
      { question: 'How much do bartenders make with tips?', answer: 'With tips, bartenders can earn $25-50+ per hour in busy establishments. Total annual income often reaches $40,000-70,000.' },
      { question: 'Do I need bartending school?', answer: 'While not required, bartending courses can help you learn faster and may be preferred by some employers.' },
      { question: 'What is TIPS certification?', answer: 'TIPS (Training for Intervention ProcedureS) is a responsible alcohol service certification required or preferred in most states.' }
    ]
  },
  {
    id: 'server',
    title: 'Server',
    slug: 'server',
    industry: 'hospitality',
    description: 'Servers (waiters/waitresses) take orders, serve food and beverages, and ensure guests have an excellent dining experience in restaurants, hotels, and catering events.',
    shortDescription: 'Serve guests and deliver exceptional dining experiences',
    avgHourlyRate: { min: 12, max: 20 },
    avgTips: { min: 10, max: 30 },
    skills: ['Customer service', 'Memory & attention', 'Communication', 'Time management', 'Teamwork'],
    responsibilities: [
      'Greet guests and present menus',
      'Take accurate food and beverage orders',
      'Serve food and drinks promptly',
      'Handle payments and process transactions',
      'Address customer concerns professionally'
    ],
    requirements: [
      'Excellent communication skills',
      'Ability to stand and walk for extended periods',
      'Weekend and evening availability',
      'Food handler certification (varies by location)'
    ],
    careerPath: [
      { role: 'Server', years: '0-2 years', salary: '$20-40/hr with tips' },
      { role: 'Head Server', years: '2-4 years', salary: '$30-50/hr with tips' },
      { role: 'Restaurant Supervisor', years: '4-6 years', salary: '$45-60k/yr' },
      { role: 'Restaurant Manager', years: '6+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'How much do servers make in tips?', answer: 'Tips typically add $10-30 per hour depending on the restaurant type and location. Fine dining servers often earn more.' },
      { question: 'What should I wear as a server?', answer: 'Most restaurants provide dress code guidelines. Common requirements include black pants, non-slip shoes, and a collared shirt.' },
      { question: 'Is experience required?', answer: 'Many restaurants hire entry-level servers and provide training. Prior customer service experience is helpful.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'chef-de-partie',
    title: 'Chef de Partie',
    slug: 'chef-de-partie',
    industry: 'hospitality',
    description: 'A Chef de Partie (Station Chef or Line Cook) manages a specific section of the kitchen, preparing dishes according to recipes and maintaining high culinary standards.',
    shortDescription: 'Lead a kitchen station and prepare quality dishes',
    avgHourlyRate: { min: 17, max: 26 },
    skills: ['Culinary expertise', 'Station management', 'Time management', 'Food safety', 'Leadership'],
    responsibilities: [
      'Manage and operate assigned kitchen station',
      'Prepare dishes according to specifications',
      'Train and supervise commis chefs',
      'Maintain cleanliness and organization',
      'Ensure food safety standards'
    ],
    requirements: [
      'Culinary training or equivalent experience',
      '2+ years kitchen experience',
      'Food handler certification',
      'Strong knowledge of cooking techniques'
    ],
    careerPath: [
      { role: 'Commis Chef', years: '0-2 years' },
      { role: 'Chef de Partie', years: '2-4 years' },
      { role: 'Sous Chef', years: '4-7 years' },
      { role: 'Head Chef', years: '7+ years' }
    ],
    faqs: [
      { question: 'What kitchen stations can a Chef de Partie manage?', answer: 'Common stations include sauté, grill, pastry, garde manger (cold dishes), and fish.' },
      { question: 'Is culinary school necessary?', answer: 'While helpful, many chefs advance through experience. Culinary training can accelerate career growth.' },
      { question: 'What hours do Chefs de Partie work?', answer: 'Expect long hours, including evenings, weekends, and holidays. 10-12 hour shifts are common.' }
    ]
  },
  {
    id: 'commis-chef',
    title: 'Commis Chef',
    slug: 'commis-chef',
    industry: 'hospitality',
    description: 'A Commis Chef is an entry-level kitchen position where you learn fundamental cooking skills, assist senior chefs, and perform basic food preparation tasks.',
    shortDescription: 'Learn culinary skills while assisting experienced chefs',
    avgHourlyRate: { min: 14, max: 19 },
    skills: ['Basic cooking', 'Knife skills', 'Food prep', 'Following recipes', 'Kitchen safety'],
    responsibilities: [
      'Prepare ingredients (chopping, measuring, etc.)',
      'Assist senior chefs with cooking tasks',
      'Maintain clean and organized workstation',
      'Receive and store food deliveries',
      'Follow food safety protocols'
    ],
    requirements: [
      'Passion for cooking',
      'Basic knife skills (trainable)',
      'Physical stamina',
      'Food handler certification preferred'
    ],
    careerPath: [
      { role: 'Commis Chef', years: '0-2 years' },
      { role: 'Chef de Partie', years: '2-4 years' },
      { role: 'Sous Chef', years: '4-7 years' },
      { role: 'Head Chef', years: '7+ years' }
    ],
    faqs: [
      { question: 'Is this a good entry-level culinary job?', answer: 'Yes! Commis Chef is the traditional starting point for a professional culinary career.' },
      { question: 'What will I learn as a Commis Chef?', answer: 'You\'ll learn knife skills, cooking techniques, food safety, kitchen organization, and how professional kitchens operate.' },
      { question: 'Do I need cooking experience?', answer: 'Not always. Many restaurants train passionate beginners. Home cooking experience is helpful.' }
    ]
  },
  {
    id: 'kitchen-porter',
    title: 'Kitchen Porter',
    slug: 'kitchen-porter',
    industry: 'hospitality',
    description: 'Kitchen Porters keep commercial kitchens running smoothly by washing dishes, cleaning equipment, maintaining kitchen hygiene, and assisting with basic food prep tasks.',
    shortDescription: 'Maintain kitchen cleanliness and support the team',
    avgHourlyRate: { min: 12, max: 16 },
    skills: ['Cleaning efficiency', 'Physical stamina', 'Time management', 'Attention to detail', 'Teamwork'],
    responsibilities: [
      'Wash and sanitize dishes, pots, and utensils',
      'Deep clean kitchen equipment and surfaces',
      'Dispose of waste and manage recycling',
      'Assist with basic food preparation',
      'Receive and organize deliveries'
    ],
    requirements: [
      'Physical fitness and stamina',
      'Ability to work in hot, fast-paced environment',
      'Attention to hygiene standards',
      'Flexible schedule availability'
    ],
    careerPath: [
      { role: 'Kitchen Porter', years: '0-1 years' },
      { role: 'Commis Chef', years: '1-3 years' },
      { role: 'Chef de Partie', years: '3-5 years' },
      { role: 'Sous Chef', years: '5+ years' }
    ],
    faqs: [
      { question: 'Can Kitchen Porter lead to a chef career?', answer: 'Absolutely! Many successful chefs started as kitchen porters and learned by observing and assisting.' },
      { question: 'What are the physical demands?', answer: 'Expect standing for long periods, lifting heavy pots, and working in hot/humid conditions.' },
      { question: 'Is this role available as flexible work?', answer: 'Yes, kitchen porter is one of the most in-demand flexible hospitality roles.' }
    ]
  },
  // Industrial
  {
    id: 'delivery-driver',
    title: 'Delivery Driver',
    slug: 'delivery-driver',
    industry: 'industrial',
    description: 'Delivery Drivers transport goods and packages to customers, businesses, or distribution centers, ensuring timely and safe delivery while providing excellent customer service.',
    shortDescription: 'Deliver packages and goods to customers on time',
    avgHourlyRate: { min: 16, max: 24 },
    skills: ['Safe driving', 'Navigation', 'Time management', 'Customer service', 'Physical fitness'],
    responsibilities: [
      'Load and unload packages safely',
      'Follow delivery routes efficiently',
      'Obtain signatures and delivery confirmations',
      'Maintain delivery vehicle',
      'Communicate with dispatch and customers'
    ],
    requirements: [
      'Valid driver\'s license',
      'Clean driving record',
      'Ability to lift 50+ lbs',
      'Smartphone for navigation and tracking'
    ],
    careerPath: [
      { role: 'Delivery Driver', years: '0-2 years' },
      { role: 'Route Driver', years: '2-4 years' },
      { role: 'Delivery Supervisor', years: '4-6 years' },
      { role: 'Logistics Coordinator', years: '6+ years' }
    ],
    faqs: [
      { question: 'Do I need a CDL to be a delivery driver?', answer: 'Most local delivery jobs require only a standard driver\'s license. CDL is needed for larger commercial vehicles.' },
      { question: 'Are there delivery driving shifts available?', answer: 'Yes, delivery driving is available in various shifts including morning, afternoon, evening, and weekend options.' },
      { question: 'How many deliveries per day?', answer: 'Drivers typically complete 80-150+ stops per day depending on the type of delivery and route.' }
    ]
  },
  {
    id: 'picker-packer',
    title: 'Picker Packer',
    slug: 'picker-packer',
    industry: 'industrial',
    description: 'Picker Packers work in warehouses and fulfillment centers, selecting items from inventory and packaging them for shipment to customers.',
    shortDescription: 'Pick and pack orders in warehouse environments',
    avgHourlyRate: { min: 15, max: 21 },
    skills: ['Attention to detail', 'Speed & efficiency', 'Physical stamina', 'Organization', 'Technology use'],
    responsibilities: [
      'Locate and retrieve items from warehouse shelves',
      'Verify item accuracy and quality',
      'Pack items securely for shipping',
      'Use handheld scanners and warehouse systems',
      'Meet daily productivity targets'
    ],
    requirements: [
      'Ability to stand and walk for long shifts',
      'Lift up to 50 lbs regularly',
      'Basic reading and math skills',
      'Comfortable with technology'
    ],
    careerPath: [
      { role: 'Picker Packer', years: '0-1 years' },
      { role: 'Lead Picker', years: '1-2 years' },
      { role: 'Warehouse Associate II', years: '2-4 years' },
      { role: 'Warehouse Supervisor', years: '4+ years' }
    ],
    faqs: [
      { question: 'What is the pace like?', answer: 'Picker packer roles are fast-paced with productivity targets. Most workers adapt within the first few weeks.' },
      { question: 'What shifts are available?', answer: 'Warehouses typically offer day, night, and weekend shifts. Peak seasons have the most availability.' },
      { question: 'Do I need warehouse experience?', answer: 'No prior experience required. Training is provided for scanners, systems, and processes.' }
    ]
  },
  {
    id: 'warehouse-operative',
    title: 'Warehouse Operative',
    slug: 'warehouse-operative',
    industry: 'industrial',
    description: 'Warehouse Operatives perform various tasks in distribution centers including receiving shipments, organizing inventory, operating equipment, and preparing orders for dispatch.',
    shortDescription: 'Handle inventory and operations in warehouse settings',
    avgHourlyRate: { min: 15, max: 22 },
    skills: ['Physical fitness', 'Organization', 'Attention to detail', 'Teamwork', 'Equipment operation'],
    responsibilities: [
      'Receive, check, and store incoming goods',
      'Move inventory using pallet jacks and forklifts',
      'Maintain accurate inventory records',
      'Prepare orders for shipping',
      'Follow health and safety procedures'
    ],
    requirements: [
      'Physical ability to lift heavy items',
      'Basic literacy and numeracy',
      'Safety awareness',
      'Forklift certification (for some roles)'
    ],
    careerPath: [
      { role: 'Warehouse Operative', years: '0-2 years' },
      { role: 'Senior Warehouse Operative', years: '2-4 years' },
      { role: 'Team Leader', years: '4-6 years' },
      { role: 'Warehouse Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What equipment will I use?', answer: 'Common equipment includes pallet jacks, forklifts, hand scanners, and conveyor systems.' },
      { question: 'Is training provided?', answer: 'Yes, most warehouses provide comprehensive training on safety, equipment, and procedures.' },
      { question: 'What are typical warehouse temperatures?', answer: 'Standard warehouses are ambient temperature. Some facilities (food storage) are refrigerated or frozen.' }
    ]
  },
  {
    id: 'forklift-driver',
    title: 'Forklift Driver',
    slug: 'forklift-driver',
    industry: 'industrial',
    description: 'Forklift Drivers operate powered industrial trucks to move, stack, and retrieve materials in warehouses, distribution centers, and manufacturing facilities.',
    shortDescription: 'Operate forklifts to move warehouse inventory',
    avgHourlyRate: { min: 17, max: 25 },
    skills: ['Forklift operation', 'Safety awareness', 'Spatial awareness', 'Attention to detail', 'Communication'],
    responsibilities: [
      'Operate forklift to move pallets and materials',
      'Load and unload trucks safely',
      'Stack and organize inventory',
      'Perform daily equipment safety checks',
      'Maintain accurate movement records'
    ],
    requirements: [
      'Valid forklift certification',
      'Clean safety record',
      'Good spatial awareness',
      'Previous warehouse experience preferred'
    ],
    careerPath: [
      { role: 'Forklift Driver', years: '0-2 years' },
      { role: 'Senior Forklift Operator', years: '2-4 years' },
      { role: 'Shipping/Receiving Lead', years: '4-6 years' },
      { role: 'Warehouse Supervisor', years: '6+ years' }
    ],
    faqs: [
      { question: 'How do I get forklift certified?', answer: 'Forklift certification can be obtained through employers or certified training providers. Training typically takes 1-2 days.' },
      { question: 'Do certified forklift drivers earn more?', answer: 'Yes, forklift certification typically adds $2-5 per hour to base warehouse wages.' },
      { question: 'What types of forklifts are there?', answer: 'Common types include sit-down counterbalance, stand-up reach trucks, order pickers, and pallet jacks.' }
    ]
  },
  {
    id: 'food-production-operative',
    title: 'Food Production Operative',
    slug: 'food-production-operative',
    industry: 'industrial',
    description: 'Food Production Operatives work in food manufacturing facilities, operating machinery, packaging products, and ensuring food safety standards are met.',
    shortDescription: 'Work in food manufacturing and production lines',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Attention to detail', 'Food safety', 'Machine operation', 'Quality control', 'Teamwork'],
    responsibilities: [
      'Operate food production machinery',
      'Monitor product quality on production lines',
      'Package and label food products',
      'Maintain hygiene and cleanliness standards',
      'Follow food safety regulations'
    ],
    requirements: [
      'Food safety awareness',
      'Ability to stand for extended periods',
      'Attention to detail and quality',
      'Flexible schedule availability'
    ],
    careerPath: [
      { role: 'Food Production Operative', years: '0-2 years' },
      { role: 'Line Leader', years: '2-4 years' },
      { role: 'Production Supervisor', years: '4-6 years' },
      { role: 'Production Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What training is provided?', answer: 'Training covers food safety, HACCP principles, equipment operation, and quality standards.' },
      { question: 'What are working conditions like?', answer: 'Food production facilities are temperature-controlled and follow strict hygiene protocols. Hairnets and protective clothing required.' },
      { question: 'Are there opportunities for advancement?', answer: 'Yes, food production offers clear advancement paths to supervisory and management roles.' }
    ]
  },
  // Retail
  {
    id: 'retail-assistant',
    title: 'Retail Assistant',
    slug: 'retail-assistant',
    industry: 'retail',
    description: 'Retail Assistants help customers find products, process sales transactions, maintain store displays, and ensure a positive shopping experience.',
    shortDescription: 'Assist customers and manage store operations',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Customer service', 'Communication', 'Sales', 'Cash handling', 'Product knowledge'],
    responsibilities: [
      'Greet and assist customers',
      'Process sales and returns',
      'Stock shelves and organize displays',
      'Maintain store cleanliness',
      'Answer customer questions about products'
    ],
    requirements: [
      'Strong customer service skills',
      'Basic math abilities',
      'Flexible schedule including weekends',
      'Retail or customer service experience preferred'
    ],
    careerPath: [
      { role: 'Retail Assistant', years: '0-1 years' },
      { role: 'Senior Sales Associate', years: '1-3 years' },
      { role: 'Department Supervisor', years: '3-5 years' },
      { role: 'Store Manager', years: '5+ years' }
    ],
    faqs: [
      { question: 'What stores hire retail assistants?', answer: 'All types—department stores, grocery stores, fashion retailers, electronics stores, and specialty shops.' },
      { question: 'Do retail assistants work holidays?', answer: 'Retail is busiest during holidays, so availability during peak seasons is often required.' },
      { question: 'Can this lead to management?', answer: 'Yes, many store managers started as retail assistants and advanced through consistent performance.' }
    ]
  },
  {
    id: 'merchandiser',
    title: 'Merchandiser',
    slug: 'merchandiser',
    industry: 'retail',
    description: 'Merchandisers set up product displays, arrange inventory, implement promotional materials, and ensure products are presented attractively in retail environments.',
    shortDescription: 'Create attractive product displays and arrangements',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Visual merchandising', 'Attention to detail', 'Creativity', 'Physical stamina', 'Organization'],
    responsibilities: [
      'Set up and maintain product displays',
      'Implement planograms and promotional setups',
      'Rotate stock and check expiration dates',
      'Place signage and pricing materials',
      'Report on inventory and display status'
    ],
    requirements: [
      'Eye for visual presentation',
      'Physical ability to lift and move products',
      'Attention to detail',
      'Own transportation (for some roles)'
    ],
    careerPath: [
      { role: 'Merchandiser', years: '0-2 years' },
      { role: 'Senior Merchandiser', years: '2-4 years' },
      { role: 'Merchandising Manager', years: '4-6 years' },
      { role: 'Visual Merchandising Director', years: '6+ years' }
    ],
    faqs: [
      { question: 'What is a planogram?', answer: 'A planogram is a diagram showing where products should be placed on shelves and displays to maximize sales.' },
      { question: 'Do I need transportation?', answer: 'Many merchandiser roles require traveling between store locations, so reliable transportation is often necessary.' },
      { question: 'Is merchandising a good flexible job?', answer: 'Yes, merchandisers often have flexible schedules and work independently at various locations.' }
    ]
  },
  // Facilities Management
  {
    id: 'cleaner',
    title: 'Cleaner',
    slug: 'cleaner',
    industry: 'facilities',
    description: 'Cleaners maintain cleanliness and hygiene in commercial buildings, offices, retail spaces, and other facilities, ensuring safe and pleasant environments.',
    shortDescription: 'Maintain cleanliness in commercial spaces',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Attention to detail', 'Time management', 'Physical stamina', 'Reliability', 'Safety awareness'],
    responsibilities: [
      'Clean and sanitize offices, restrooms, and common areas',
      'Vacuum, mop, and polish floors',
      'Empty trash and recycling bins',
      'Restock supplies (soap, paper towels, etc.)',
      'Report maintenance issues'
    ],
    requirements: [
      'Physical ability to clean for extended periods',
      'Reliability and punctuality',
      'Attention to detail',
      'Flexible scheduling'
    ],
    careerPath: [
      { role: 'Cleaner', years: '0-2 years' },
      { role: 'Senior Cleaner', years: '2-4 years' },
      { role: 'Cleaning Supervisor', years: '4-6 years' },
      { role: 'Facilities Manager', years: '6+ years' }
    ],
    faqs: [
      { question: 'What shifts are available?', answer: 'Cleaning roles often have early morning, evening, or overnight shifts when buildings are less occupied.' },
      { question: 'Do I need my own cleaning supplies?', answer: 'Most employers provide all cleaning supplies, equipment, and protective gear.' },
      { question: 'Is cleaning a stable career?', answer: 'Yes, cleaning services are always in demand, making it a reliable source of work.' }
    ]
  },
  {
    id: 'housekeeper',
    title: 'Housekeeper',
    slug: 'housekeeper',
    industry: 'facilities',
    description: 'Housekeepers clean and maintain guest rooms and public areas in hotels, resorts, and hospitality venues, ensuring guests have comfortable stays.',
    shortDescription: 'Clean and prepare rooms in hotels and hospitality venues',
    avgHourlyRate: { min: 14, max: 19 },
    skills: ['Attention to detail', 'Time management', 'Physical stamina', 'Guest service', 'Organization'],
    responsibilities: [
      'Clean and prepare guest rooms to brand standards',
      'Change linens and make beds',
      'Replenish amenities and supplies',
      'Report maintenance issues and lost items',
      'Maintain cleanliness of public areas'
    ],
    requirements: [
      'Physical stamina for active work',
      'Attention to detail',
      'Time management skills',
      'Weekend and holiday availability'
    ],
    careerPath: [
      { role: 'Room Attendant', years: '0-2 years' },
      { role: 'Senior Housekeeper', years: '2-4 years' },
      { role: 'Housekeeping Supervisor', years: '4-6 years' },
      { role: 'Executive Housekeeper', years: '6+ years' }
    ],
    faqs: [
      { question: 'How many rooms do housekeepers clean?', answer: 'Hotel housekeepers typically clean 12-16 rooms per shift, depending on the property and room type.' },
      { question: 'Do housekeepers receive tips?', answer: 'Yes, hotel guests often leave tips for housekeepers. Amounts vary but typically range from $1-5 per night.' },
      { question: 'What are typical housekeeping hours?', answer: 'Most hotel housekeeping shifts run from 8am-4pm, though schedules vary by property.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  // NEW HOSPITALITY ROLES
  {
    id: 'dishwasher',
    title: 'Dishwasher',
    slug: 'dishwasher',
    industry: 'hospitality',
    description: 'Dishwashers are essential team members in restaurants, hotels, and catering operations. They maintain clean dishes, utensils, and kitchen equipment while supporting the kitchen team during service.',
    shortDescription: 'Clean dishes and support kitchen operations',
    avgHourlyRate: { min: 12, max: 17 },
    skills: ['Speed & efficiency', 'Physical stamina', 'Attention to detail', 'Time management', 'Teamwork'],
    responsibilities: [
      'Wash and sanitize all dishes, glassware, and utensils',
      'Operate commercial dishwashing machines',
      'Maintain cleanliness of dish area and kitchen',
      'Sort and store clean dishes properly',
      'Assist with basic food prep when needed'
    ],
    requirements: [
      'No experience required - will train',
      'Ability to stand for long periods',
      'Comfortable working in wet, hot environment',
      'Flexible schedule including evenings/weekends'
    ],
    careerPath: [
      { role: 'Dishwasher', years: '0-1 years', salary: '$12-17/hr' },
      { role: 'Prep Cook', years: '1-2 years', salary: '$14-18/hr' },
      { role: 'Line Cook', years: '2-4 years', salary: '$16-22/hr' },
      { role: 'Sous Chef', years: '4+ years', salary: '$45-60k/yr' }
    ],
    faqs: [
      { question: 'Do I need experience to be a dishwasher?', answer: 'No! Dishwasher is one of the most accessible entry-level jobs. Most restaurants will train you on the job.' },
      { question: 'Is dishwashing a good first job?', answer: 'Yes, it\'s an excellent entry point into the restaurant industry. Many chefs started as dishwashers.' },
      { question: 'What are typical dishwasher hours?', answer: 'Usually 4-8 hour shifts during lunch and dinner rushes. Evening and weekend availability is typically required.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'host-hostess',
    title: 'Host / Hostess',
    slug: 'host-hostess',
    industry: 'hospitality',
    description: 'Hosts and hostesses are the first point of contact for restaurant guests. They manage reservations, greet customers, coordinate seating, and ensure smooth front-of-house operations.',
    shortDescription: 'Greet guests and manage restaurant seating',
    avgHourlyRate: { min: 12, max: 18 },
    avgTips: { min: 0, max: 3 },
    skills: ['Customer service', 'Communication', 'Organization', 'Multitasking', 'Problem solving'],
    responsibilities: [
      'Greet and welcome guests warmly',
      'Manage reservation system and waitlist',
      'Escort guests to tables and present menus',
      'Coordinate with servers on table availability',
      'Answer phone calls and take reservations'
    ],
    requirements: [
      'Excellent communication skills',
      'Professional appearance and demeanor',
      'Basic computer skills for reservation systems',
      'Evening and weekend availability'
    ],
    careerPath: [
      { role: 'Host/Hostess', years: '0-1 years', salary: '$12-18/hr' },
      { role: 'Lead Host', years: '1-2 years', salary: '$15-20/hr' },
      { role: 'Server', years: '1-3 years', salary: '$20-40/hr with tips' },
      { role: 'Front of House Manager', years: '3+ years', salary: '$45-60k/yr' }
    ],
    faqs: [
      { question: 'Do hosts get tips?', answer: 'Some restaurants include hosts in tip pools, adding $0-3/hr. High-end restaurants may offer better tip-outs.' },
      { question: 'Is host a good first restaurant job?', answer: 'Absolutely! It\'s lower physical demand than serving and teaches you restaurant operations.' },
      { question: 'What should I wear as a host?', answer: 'Most restaurants require business casual or provide uniforms. Black attire is common.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'low',
    scheduleFlex: 'medium'
  },
  {
    id: 'food-runner',
    title: 'Food Runner',
    slug: 'food-runner',
    industry: 'hospitality',
    description: 'Food Runners deliver dishes from the kitchen to guests\' tables, ensuring food arrives hot and presented correctly. They support servers and help maintain efficient restaurant service.',
    shortDescription: 'Deliver food from kitchen to tables',
    avgHourlyRate: { min: 12, max: 17 },
    avgTips: { min: 3, max: 8 },
    skills: ['Speed & efficiency', 'Memory', 'Physical stamina', 'Teamwork', 'Attention to detail'],
    responsibilities: [
      'Deliver food orders to correct tables promptly',
      'Verify order accuracy before delivery',
      'Communicate with kitchen about timing',
      'Clear empty plates and reset tables',
      'Assist servers during busy periods'
    ],
    requirements: [
      'Ability to carry heavy trays (up to 30 lbs)',
      'Good memory for table numbers',
      'Fast-paced work capability',
      'Food handler permit (in some states)'
    ],
    careerPath: [
      { role: 'Food Runner', years: '0-1 years', salary: '$15-25/hr with tips' },
      { role: 'Server', years: '1-2 years', salary: '$20-40/hr with tips' },
      { role: 'Head Server', years: '2-4 years', salary: '$30-50/hr with tips' },
      { role: 'Restaurant Manager', years: '4+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'Do food runners make good money?', answer: 'With tip-outs, food runners can earn $15-25/hr. It\'s often better paid than hosting.' },
      { question: 'Is food runner harder than server?', answer: 'Food running is more physical but has less customer interaction. Many prefer starting here before serving.' },
      { question: 'How do I become a food runner?', answer: 'Apply directly to restaurants. No experience needed, but restaurant experience helps.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'busser',
    title: 'Busser',
    slug: 'busser',
    industry: 'hospitality',
    description: 'Bussers clear and reset tables, assist servers, and help maintain restaurant cleanliness. They play a crucial role in keeping service flowing smoothly during busy periods.',
    shortDescription: 'Clear tables and support restaurant service',
    avgHourlyRate: { min: 11, max: 16 },
    avgTips: { min: 2, max: 6 },
    skills: ['Speed & efficiency', 'Physical stamina', 'Teamwork', 'Attention to detail', 'Time management'],
    responsibilities: [
      'Clear dishes and reset tables quickly',
      'Refill water glasses and bread baskets',
      'Assist servers with guest needs',
      'Maintain cleanliness of dining area',
      'Stock service stations with supplies'
    ],
    requirements: [
      'Physical ability to lift and carry heavy items',
      'Fast-paced work environment capability',
      'Teamwork orientation',
      'Flexible schedule'
    ],
    careerPath: [
      { role: 'Busser', years: '0-1 years', salary: '$13-22/hr with tips' },
      { role: 'Food Runner', years: '1-2 years', salary: '$15-25/hr with tips' },
      { role: 'Server', years: '2-3 years', salary: '$20-40/hr with tips' },
      { role: 'Restaurant Manager', years: '4+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'Do bussers get tips?', answer: 'Yes! Bussers typically receive 10-20% of servers\' tips, adding $2-6/hr on average.' },
      { question: 'Is busser a good entry-level job?', answer: 'Yes, it\'s one of the best ways to break into restaurant work and learn the business.' },
      { question: 'What\'s the difference between busser and food runner?', answer: 'Bussers focus on clearing/resetting tables. Food runners deliver food from kitchen to guests.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'line-cook',
    title: 'Line Cook',
    slug: 'line-cook',
    industry: 'hospitality',
    description: 'Line Cooks prepare food items according to recipes, operate cooking equipment, and maintain kitchen stations. They work on the front lines of restaurant kitchens during service.',
    shortDescription: 'Prepare dishes on the cooking line',
    avgHourlyRate: { min: 15, max: 22 },
    skills: ['Cooking techniques', 'Speed under pressure', 'Food safety', 'Station management', 'Teamwork'],
    responsibilities: [
      'Prepare dishes according to recipes and standards',
      'Manage assigned cooking station (grill, sauté, etc.)',
      'Maintain food quality and presentation',
      'Follow food safety and sanitation guidelines',
      'Prep ingredients before service'
    ],
    requirements: [
      'Basic cooking knowledge',
      '6+ months kitchen experience preferred',
      'Food handler certification',
      'Ability to work in high-heat environment'
    ],
    certifications: ['Food Handler Permit', 'ServSafe'],
    careerPath: [
      { role: 'Prep Cook', years: '0-1 years', salary: '$14-18/hr' },
      { role: 'Line Cook', years: '1-3 years', salary: '$15-22/hr' },
      { role: 'Chef de Partie', years: '3-5 years', salary: '$18-26/hr' },
      { role: 'Sous Chef', years: '5+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'How much do line cooks make?', answer: 'Line cooks earn $15-22/hr on average, with higher wages in fine dining and major cities.' },
      { question: 'Do I need culinary school to be a line cook?', answer: 'No, most line cooks learn on the job. Experience matters more than formal training.' },
      { question: 'What stations do line cooks work?', answer: 'Common stations include grill, sauté, fry, salad/cold, and expo (plating).' }
    ],
    searchVolume: 'very-high',
    entryLevel: false,
    physicalDemand: 'high',
    scheduleFlex: 'low'
  },
  {
    id: 'prep-cook',
    title: 'Prep Cook',
    slug: 'prep-cook',
    industry: 'hospitality',
    description: 'Prep Cooks prepare ingredients before service, handling tasks like chopping vegetables, making sauces, and portioning proteins. They ensure the kitchen is ready for the cooking team.',
    shortDescription: 'Prepare ingredients for kitchen service',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Knife skills', 'Food safety', 'Organization', 'Time management', 'Following recipes'],
    responsibilities: [
      'Chop, slice, and dice vegetables and proteins',
      'Measure and portion ingredients',
      'Prepare sauces, dressings, and marinades',
      'Label and store prepared items properly',
      'Maintain clean and organized prep area'
    ],
    requirements: [
      'Basic knife skills (will train)',
      'Understanding of food safety',
      'Ability to follow recipes',
      'Physical stamina for standing'
    ],
    certifications: ['Food Handler Permit'],
    careerPath: [
      { role: 'Prep Cook', years: '0-2 years', salary: '$13-18/hr' },
      { role: 'Line Cook', years: '2-4 years', salary: '$15-22/hr' },
      { role: 'Chef de Partie', years: '4-6 years', salary: '$18-26/hr' },
      { role: 'Sous Chef', years: '6+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'Is prep cook a good first kitchen job?', answer: 'Yes! Prep cook is the ideal entry point to learn kitchen fundamentals before moving to the line.' },
      { question: 'What hours do prep cooks work?', answer: 'Prep cooks often work morning shifts (6am-2pm) to prepare for lunch and dinner service.' },
      { question: 'Do prep cooks need experience?', answer: 'Many restaurants hire beginners and train them. Home cooking experience is helpful.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'catering-staff',
    title: 'Catering Staff',
    slug: 'catering-staff',
    industry: 'hospitality',
    description: 'Catering Staff work at events, weddings, corporate functions, and parties. They set up venues, serve food and drinks, and ensure guests have excellent experiences.',
    shortDescription: 'Serve food and drinks at catered events',
    avgHourlyRate: { min: 15, max: 25 },
    avgTips: { min: 0, max: 5 },
    skills: ['Customer service', 'Physical stamina', 'Teamwork', 'Flexibility', 'Professional appearance'],
    responsibilities: [
      'Set up event venues (tables, chairs, linens)',
      'Serve food and beverages to guests',
      'Maintain buffet stations and refill items',
      'Clear plates and manage waste',
      'Break down and clean up after events'
    ],
    requirements: [
      'Professional appearance',
      'Ability to work varied hours (weekends, evenings)',
      'Physical ability to stand for long periods',
      'Reliable transportation to event locations'
    ],
    certifications: ['Food Handler Permit', 'TIPS Certification'],
    careerPath: [
      { role: 'Catering Staff', years: '0-2 years', salary: '$15-25/hr' },
      { role: 'Lead Server', years: '2-3 years', salary: '$18-28/hr' },
      { role: 'Catering Captain', years: '3-5 years', salary: '$22-32/hr' },
      { role: 'Catering Manager', years: '5+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'Is catering good for flexible work?', answer: 'Yes! Catering offers excellent flexibility - you choose which events to work based on your schedule.' },
      { question: 'Do catering staff get tips?', answer: 'Sometimes. Private events may include tips, while corporate events often don\'t. Wages are typically higher to compensate.' },
      { question: 'What should I wear for catering?', answer: 'Usually all black attire (black pants, black dress shirt). Companies provide specific uniforms for some events.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'high'
  },
  {
    id: 'banquet-server',
    title: 'Banquet Server',
    slug: 'banquet-server',
    industry: 'hospitality',
    description: 'Banquet Servers work at hotels, convention centers, and event venues serving large groups at weddings, conferences, and galas. They provide professional food and beverage service for events.',
    shortDescription: 'Serve guests at large events and banquets',
    avgHourlyRate: { min: 16, max: 26 },
    avgTips: { min: 2, max: 8 },
    skills: ['Professional service', 'Teamwork', 'Physical stamina', 'Time management', 'Attention to detail'],
    responsibilities: [
      'Set up banquet rooms according to event specifications',
      'Serve plated meals to large groups efficiently',
      'Pour beverages and manage bar service',
      'Clear courses in coordination with kitchen timing',
      'Respond to guest requests professionally'
    ],
    requirements: [
      'Professional demeanor and appearance',
      'Physical ability to carry heavy trays',
      'Flexible schedule (evenings, weekends)',
      'Food handler certification'
    ],
    certifications: ['Food Handler Permit', 'TIPS Certification'],
    careerPath: [
      { role: 'Banquet Server', years: '0-2 years', salary: '$18-34/hr with tips' },
      { role: 'Banquet Captain', years: '2-4 years', salary: '$22-35/hr' },
      { role: 'Banquet Manager', years: '4-6 years', salary: '$50-65k/yr' },
      { role: 'Director of Catering', years: '6+ years', salary: '$70-100k/yr' }
    ],
    faqs: [
      { question: 'How much do banquet servers make?', answer: 'With tips and service charges, banquet servers often earn $18-34/hr, especially at upscale venues.' },
      { question: 'Is banquet serving hard?', answer: 'It\'s physically demanding and fast-paced, but many find it rewarding with good pay and event variety.' },
      { question: 'Do I need experience?', answer: 'Some venues hire beginners for entry-level positions. Restaurant experience is helpful but not always required.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  // NEW INDUSTRIAL ROLES
  {
    id: 'package-handler',
    title: 'Package Handler',
    slug: 'package-handler',
    industry: 'industrial',
    description: 'Package Handlers load and unload packages at shipping facilities, sort items by destination, and ensure packages move efficiently through the shipping process.',
    shortDescription: 'Load, unload, and sort packages at shipping facilities',
    avgHourlyRate: { min: 16, max: 23 },
    skills: ['Physical fitness', 'Speed & efficiency', 'Attention to detail', 'Teamwork', 'Safety awareness'],
    responsibilities: [
      'Load and unload packages from trucks and conveyor belts',
      'Sort packages by destination, size, or priority',
      'Scan packages and update tracking systems',
      'Meet productivity targets safely',
      'Report damaged packages'
    ],
    requirements: [
      'Ability to lift 50-75 lbs repeatedly',
      'Physical stamina for fast-paced work',
      'Ability to work various shifts (including overnight)',
      'No experience required'
    ],
    careerPath: [
      { role: 'Package Handler', years: '0-1 years', salary: '$16-23/hr' },
      { role: 'Senior Handler', years: '1-2 years', salary: '$18-25/hr' },
      { role: 'Sort Supervisor', years: '2-4 years', salary: '$22-30/hr' },
      { role: 'Operations Manager', years: '4+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'Is package handling a good job?', answer: 'It offers good pay, consistent hours, and clear advancement paths. The work is physical but many find it rewarding.' },
      { question: 'What shifts are available?', answer: 'Most facilities offer day, evening, overnight, and weekend shifts. Peak season (holidays) has the most availability.' },
      { question: 'Do package handlers get benefits?', answer: 'Major carriers like UPS, FedEx, and Amazon offer benefits including health insurance, 401k, and tuition assistance.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'order-selector',
    title: 'Order Selector',
    slug: 'order-selector',
    industry: 'industrial',
    description: 'Order Selectors work in distribution centers pulling products from shelves to fill customer orders, often using equipment like pallet jacks and voice-picking systems.',
    shortDescription: 'Pull and organize orders in distribution centers',
    avgHourlyRate: { min: 17, max: 25 },
    skills: ['Physical fitness', 'Attention to accuracy', 'Speed & efficiency', 'Equipment operation', 'Organization'],
    responsibilities: [
      'Pull products from shelves to fill orders',
      'Operate pallet jacks and order pickers',
      'Verify order accuracy before shipping',
      'Build pallets efficiently and safely',
      'Use voice-pick or RF scanning systems'
    ],
    requirements: [
      'Ability to lift 50+ lbs repeatedly',
      'Comfortable in refrigerated environments (for some)',
      'Basic math and reading skills',
      'Experience with pallet jacks preferred'
    ],
    careerPath: [
      { role: 'Order Selector', years: '0-2 years', salary: '$17-25/hr' },
      { role: 'Lead Selector', years: '2-3 years', salary: '$20-28/hr' },
      { role: 'Warehouse Supervisor', years: '3-5 years', salary: '$50-65k/yr' },
      { role: 'Operations Manager', years: '5+ years', salary: '$65-90k/yr' }
    ],
    faqs: [
      { question: 'What is order selecting?', answer: 'Order selectors "pick" items from warehouse shelves to fill customer orders, often for grocery stores or retailers.' },
      { question: 'Is order selecting hard?', answer: 'It\'s physically demanding with productivity targets, but pays well. Most people adapt within 2-3 weeks.' },
      { question: 'Do order selectors work in cold?', answer: 'Grocery distribution centers often have refrigerated and frozen areas. Companies provide cold-weather gear.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'low'
  },
  {
    id: 'inventory-clerk',
    title: 'Inventory Clerk',
    slug: 'inventory-clerk',
    industry: 'industrial',
    description: 'Inventory Clerks track and manage stock levels, perform cycle counts, update inventory systems, and ensure accurate records for warehouses and retail operations.',
    shortDescription: 'Track and manage warehouse inventory',
    avgHourlyRate: { min: 15, max: 22 },
    skills: ['Attention to detail', 'Organization', 'Data entry', 'Math skills', 'Problem solving'],
    responsibilities: [
      'Conduct regular inventory counts',
      'Update inventory management systems',
      'Investigate and resolve discrepancies',
      'Process incoming and outgoing shipments',
      'Generate inventory reports'
    ],
    requirements: [
      'Strong attention to detail',
      'Basic computer skills',
      'Ability to lift moderate weights',
      'High school diploma or equivalent'
    ],
    careerPath: [
      { role: 'Inventory Clerk', years: '0-2 years', salary: '$15-22/hr' },
      { role: 'Inventory Specialist', years: '2-4 years', salary: '$18-26/hr' },
      { role: 'Inventory Supervisor', years: '4-6 years', salary: '$50-65k/yr' },
      { role: 'Inventory Manager', years: '6+ years', salary: '$60-80k/yr' }
    ],
    faqs: [
      { question: 'What does an inventory clerk do?', answer: 'Inventory clerks count products, update stock records, and ensure what\'s in the computer matches what\'s on shelves.' },
      { question: 'Is inventory clerk a good job?', answer: 'Yes! It\'s less physically demanding than picking/packing and offers clear paths to management.' },
      { question: 'What skills do inventory clerks need?', answer: 'Strong attention to detail, basic math, and computer skills. Experience with inventory software is a plus.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'material-handler',
    title: 'Material Handler',
    slug: 'material-handler',
    industry: 'industrial',
    description: 'Material Handlers move raw materials, supplies, and finished goods within manufacturing plants, warehouses, and distribution centers using various equipment.',
    shortDescription: 'Move materials in manufacturing and warehouse settings',
    avgHourlyRate: { min: 16, max: 24 },
    skills: ['Equipment operation', 'Physical fitness', 'Safety awareness', 'Teamwork', 'Organization'],
    responsibilities: [
      'Move materials between work areas using equipment',
      'Operate forklifts, pallet jacks, and hand trucks',
      'Load and unload trucks and containers',
      'Maintain accurate inventory records',
      'Keep work areas clean and organized'
    ],
    requirements: [
      'Physical ability to lift 50+ lbs',
      'Forklift certification (or willingness to obtain)',
      'Basic math and reading skills',
      'Safety-conscious mindset'
    ],
    certifications: ['Forklift Certification', 'OSHA Safety Training'],
    careerPath: [
      { role: 'Material Handler', years: '0-2 years', salary: '$16-24/hr' },
      { role: 'Lead Material Handler', years: '2-4 years', salary: '$19-27/hr' },
      { role: 'Warehouse Supervisor', years: '4-6 years', salary: '$50-65k/yr' },
      { role: 'Operations Manager', years: '6+ years', salary: '$65-90k/yr' }
    ],
    faqs: [
      { question: 'What\'s the difference between material handler and warehouse worker?', answer: 'Material handler is often a more specific role focused on moving materials, while warehouse worker is a broader term.' },
      { question: 'Do I need forklift certification?', answer: 'Many positions require it, but employers often provide free training and certification.' },
      { question: 'Is material handling a good career?', answer: 'Yes! It offers good pay, clear advancement, and transferable skills across many industries.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'assembler',
    title: 'Assembler',
    slug: 'assembler',
    industry: 'industrial',
    description: 'Assemblers put together components to create finished products in manufacturing environments, following detailed instructions and using hand tools or machinery.',
    shortDescription: 'Assemble products in manufacturing settings',
    avgHourlyRate: { min: 14, max: 22 },
    skills: ['Manual dexterity', 'Attention to detail', 'Following instructions', 'Quality control', 'Teamwork'],
    responsibilities: [
      'Assemble components according to specifications',
      'Read and follow work instructions and blueprints',
      'Use hand tools and assembly equipment',
      'Inspect finished products for quality',
      'Meet production targets'
    ],
    requirements: [
      'Good hand-eye coordination',
      'Ability to follow detailed instructions',
      'High school diploma or equivalent',
      'Standing for extended periods'
    ],
    careerPath: [
      { role: 'Assembler', years: '0-2 years', salary: '$14-22/hr' },
      { role: 'Senior Assembler', years: '2-4 years', salary: '$17-25/hr' },
      { role: 'Team Lead', years: '4-6 years', salary: '$20-28/hr' },
      { role: 'Production Supervisor', years: '6+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'What do assemblers make?', answer: 'Assemblers build everything from electronics to furniture to automotive parts, depending on the facility.' },
      { question: 'Is assembly work hard?', answer: 'It requires attention to detail and repetitive motion, but is less physically demanding than warehouse work.' },
      { question: 'Do I need manufacturing experience?', answer: 'No, many companies train entry-level assemblers. Mechanical aptitude helps.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'low'
  },
  {
    id: 'machine-operator',
    title: 'Machine Operator',
    slug: 'machine-operator',
    industry: 'industrial',
    description: 'Machine Operators set up, run, and monitor manufacturing equipment to produce parts and products. They ensure machines run efficiently and products meet quality standards.',
    shortDescription: 'Operate manufacturing machinery and equipment',
    avgHourlyRate: { min: 16, max: 26 },
    skills: ['Machine operation', 'Technical aptitude', 'Quality control', 'Problem solving', 'Safety awareness'],
    responsibilities: [
      'Set up machines according to specifications',
      'Operate and monitor production equipment',
      'Perform quality checks on products',
      'Troubleshoot minor machine issues',
      'Document production data'
    ],
    requirements: [
      'Mechanical aptitude',
      'High school diploma or equivalent',
      'Ability to read technical documents',
      'Previous manufacturing experience preferred'
    ],
    certifications: ['OSHA Safety', 'CNC certification (for some roles)'],
    careerPath: [
      { role: 'Machine Operator', years: '0-2 years', salary: '$16-26/hr' },
      { role: 'Senior Operator', years: '2-4 years', salary: '$20-30/hr' },
      { role: 'Setup Technician', years: '4-6 years', salary: '$25-35/hr' },
      { role: 'Production Supervisor', years: '6+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'What machines do operators run?', answer: 'Common machines include CNC mills, lathes, presses, injection molders, and packaging equipment.' },
      { question: 'Do I need technical training?', answer: 'Many companies train on the job. Technical school or community college programs can accelerate your career.' },
      { question: 'Is machine operator a good career?', answer: 'Yes! It pays well and skilled operators are in high demand across many industries.' }
    ],
    searchVolume: 'very-high',
    entryLevel: false,
    physicalDemand: 'medium',
    scheduleFlex: 'low'
  },
  // NEW RETAIL ROLES
  {
    id: 'cashier',
    title: 'Cashier',
    slug: 'cashier',
    industry: 'retail',
    description: 'Cashiers process customer purchases, handle payments, and provide customer service at checkout in retail stores, grocery stores, and other establishments.',
    shortDescription: 'Process transactions and serve customers at checkout',
    avgHourlyRate: { min: 12, max: 17 },
    skills: ['Customer service', 'Cash handling', 'Basic math', 'Communication', 'Speed & accuracy'],
    responsibilities: [
      'Scan items and process transactions accurately',
      'Handle cash, credit cards, and other payments',
      'Bag items and assist with carry-out',
      'Answer customer questions about products',
      'Maintain clean checkout area'
    ],
    requirements: [
      'Basic math skills',
      'Customer service orientation',
      'Ability to stand for long periods',
      'Flexible schedule including weekends'
    ],
    careerPath: [
      { role: 'Cashier', years: '0-1 years', salary: '$12-17/hr' },
      { role: 'Head Cashier', years: '1-2 years', salary: '$14-19/hr' },
      { role: 'Customer Service Lead', years: '2-3 years', salary: '$16-21/hr' },
      { role: 'Front End Supervisor', years: '3+ years', salary: '$40-55k/yr' }
    ],
    faqs: [
      { question: 'Is cashier a good first job?', answer: 'Absolutely! Cashier teaches valuable skills like customer service, math, and handling responsibility.' },
      { question: 'How much do cashiers make?', answer: 'Cashiers earn $12-17/hr on average. Grocery stores and wholesale clubs often pay more.' },
      { question: 'Do cashiers work weekends?', answer: 'Usually yes, since weekends are the busiest times. However, many stores offer flexible scheduling.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'low',
    scheduleFlex: 'medium'
  },
  {
    id: 'stock-associate',
    title: 'Stock Associate',
    slug: 'stock-associate',
    industry: 'retail',
    description: 'Stock Associates receive merchandise, organize stockrooms, and ensure sales floors are fully stocked and organized. They often work early mornings before stores open.',
    shortDescription: 'Stock shelves and manage store inventory',
    avgHourlyRate: { min: 13, max: 19 },
    skills: ['Organization', 'Physical fitness', 'Attention to detail', 'Time management', 'Teamwork'],
    responsibilities: [
      'Unload delivery trucks and process shipments',
      'Stock shelves and displays with merchandise',
      'Organize backroom and storage areas',
      'Rotate stock and check expiration dates',
      'Build promotional displays'
    ],
    requirements: [
      'Ability to lift 40-50 lbs',
      'Physical stamina for standing/walking',
      'Flexible schedule (early mornings common)',
      'Attention to detail'
    ],
    careerPath: [
      { role: 'Stock Associate', years: '0-1 years', salary: '$13-19/hr' },
      { role: 'Inventory Specialist', years: '1-3 years', salary: '$15-21/hr' },
      { role: 'Stock Supervisor', years: '3-5 years', salary: '$18-25/hr' },
      { role: 'Store Manager', years: '5+ years', salary: '$45-70k/yr' }
    ],
    faqs: [
      { question: 'What hours do stock associates work?', answer: 'Often early mornings (4-8am) before stores open, or overnight shifts. Daytime positions exist too.' },
      { question: 'Is stocking a good job?', answer: 'Yes! It\'s less customer-facing than sales and often leads to management positions.' },
      { question: 'Do I need retail experience?', answer: 'No experience required for most positions. Willingness to work hard matters most.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'sales-associate',
    title: 'Sales Associate',
    slug: 'sales-associate',
    industry: 'retail',
    description: 'Sales Associates help customers find products, provide product knowledge, process sales, and create positive shopping experiences in retail stores.',
    shortDescription: 'Help customers and drive retail sales',
    avgHourlyRate: { min: 13, max: 20 },
    skills: ['Customer service', 'Communication', 'Product knowledge', 'Sales skills', 'Problem solving'],
    responsibilities: [
      'Greet customers and assess their needs',
      'Provide product information and recommendations',
      'Process sales transactions',
      'Maintain store appearance and displays',
      'Meet sales goals and targets'
    ],
    requirements: [
      'Strong communication skills',
      'Sales-oriented mindset',
      'Flexible schedule including weekends',
      'Product knowledge (trained on the job)'
    ],
    careerPath: [
      { role: 'Sales Associate', years: '0-1 years', salary: '$13-20/hr' },
      { role: 'Senior Sales Associate', years: '1-3 years', salary: '$15-22/hr' },
      { role: 'Department Lead', years: '3-5 years', salary: '$18-26/hr' },
      { role: 'Store Manager', years: '5+ years', salary: '$50-80k/yr' }
    ],
    faqs: [
      { question: 'Do sales associates make commission?', answer: 'Some stores offer commission or bonuses on top of hourly pay, especially for electronics, furniture, and jewelry.' },
      { question: 'How do I become a good sales associate?', answer: 'Focus on product knowledge, listen to customer needs, and be genuinely helpful rather than pushy.' },
      { question: 'What retail stores pay the best?', answer: 'Apple, Costco, REI, and specialty retailers often pay above average.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'low',
    scheduleFlex: 'medium'
  },
  {
    id: 'grocery-stocker',
    title: 'Grocery Stocker',
    slug: 'grocery-stocker',
    industry: 'retail',
    description: 'Grocery Stockers keep store shelves filled with products, rotate stock for freshness, and ensure aisles are clean and organized in supermarkets and grocery stores.',
    shortDescription: 'Stock shelves in grocery and supermarket stores',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Physical fitness', 'Organization', 'Attention to detail', 'Time management', 'Teamwork'],
    responsibilities: [
      'Stock shelves with products quickly and accurately',
      'Rotate stock using FIFO (first in, first out)',
      'Check and remove expired products',
      'Build displays and end caps',
      'Assist customers with product locations'
    ],
    requirements: [
      'Ability to lift 50 lbs repeatedly',
      'Physical stamina',
      'Flexible schedule (early mornings/overnights common)',
      'Attention to detail for dates and organization'
    ],
    careerPath: [
      { role: 'Grocery Stocker', years: '0-1 years', salary: '$14-20/hr' },
      { role: 'Department Clerk', years: '1-2 years', salary: '$16-22/hr' },
      { role: 'Department Manager', years: '2-4 years', salary: '$45-60k/yr' },
      { role: 'Store Manager', years: '4+ years', salary: '$60-100k/yr' }
    ],
    faqs: [
      { question: 'What hours do grocery stockers work?', answer: 'Often overnight (10pm-6am) or early morning (4am-12pm). Day shifts are available but less common.' },
      { question: 'Which grocery stores pay the best?', answer: 'Costco, Trader Joe\'s, and Whole Foods consistently rank highest for grocery retail pay.' },
      { question: 'Is overnight stocking worth it?', answer: 'Overnight often pays $1-2 more per hour and has less customer interaction. Many prefer it.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'personal-shopper',
    title: 'Personal Shopper',
    slug: 'personal-shopper',
    industry: 'retail',
    description: 'Personal Shoppers pick and prepare grocery and retail orders for customers who shop online. They select products, bag orders, and prepare them for pickup or delivery.',
    shortDescription: 'Shop and prepare online orders for customers',
    avgHourlyRate: { min: 14, max: 21 },
    avgTips: { min: 0, max: 5 },
    skills: ['Speed & efficiency', 'Attention to detail', 'Customer service', 'Organization', 'Problem solving'],
    responsibilities: [
      'Pick items from shelves to fill customer orders',
      'Select quality produce and fresh items',
      'Make appropriate substitutions when items unavailable',
      'Bag and organize orders for pickup/delivery',
      'Communicate with customers about substitutions'
    ],
    requirements: [
      'Smartphone proficiency',
      'Fast-paced work capability',
      'Product knowledge or quick learner',
      'Flexible schedule'
    ],
    careerPath: [
      { role: 'Personal Shopper', years: '0-1 years', salary: '$14-21/hr' },
      { role: 'Lead Shopper', years: '1-2 years', salary: '$16-23/hr' },
      { role: 'E-commerce Supervisor', years: '2-4 years', salary: '$45-55k/yr' },
      { role: 'E-commerce Manager', years: '4+ years', salary: '$55-75k/yr' }
    ],
    faqs: [
      { question: 'Is personal shopping a good job?', answer: 'Yes! It\'s active, has growth potential, and is in high demand as online grocery grows.' },
      { question: 'Do personal shoppers get tips?', answer: 'For delivery, yes. For in-store pickup orders, tips are less common but sometimes offered.' },
      { question: 'How fast do personal shoppers need to be?', answer: 'Most stores expect 40-60+ items per hour. Speed improves quickly with experience.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'high'
  },
  // NEW FACILITIES ROLES
  {
    id: 'janitor',
    title: 'Janitor',
    slug: 'janitor',
    industry: 'facilities',
    description: 'Janitors clean and maintain buildings including offices, schools, hospitals, and retail spaces. They ensure facilities are safe, sanitary, and presentable.',
    shortDescription: 'Clean and maintain commercial buildings',
    avgHourlyRate: { min: 13, max: 20 },
    skills: ['Attention to detail', 'Physical stamina', 'Time management', 'Reliability', 'Safety awareness'],
    responsibilities: [
      'Clean and sanitize restrooms',
      'Vacuum, sweep, and mop floors',
      'Empty trash and recycling',
      'Clean windows and surfaces',
      'Restock supplies'
    ],
    requirements: [
      'Physical ability to clean for extended periods',
      'Reliability and punctuality',
      'Flexible schedule (evenings/nights common)',
      'Background check (for some facilities)'
    ],
    careerPath: [
      { role: 'Janitor', years: '0-2 years', salary: '$13-20/hr' },
      { role: 'Lead Janitor', years: '2-4 years', salary: '$16-23/hr' },
      { role: 'Facilities Supervisor', years: '4-6 years', salary: '$45-60k/yr' },
      { role: 'Facilities Manager', years: '6+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'What\'s the difference between janitor and custodian?', answer: 'They\'re similar. Custodian often implies more responsibility for a building, while janitor focuses on cleaning.' },
      { question: 'What hours do janitors work?', answer: 'Often evenings (5pm-midnight) or overnight when buildings are empty. Day shifts exist in hospitals and schools.' },
      { question: 'Is janitorial work stable?', answer: 'Yes! Cleaning jobs are always in demand and offer steady, reliable work.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'security-guard',
    title: 'Security Guard',
    slug: 'security-guard',
    industry: 'facilities',
    description: 'Security Guards protect people and property by monitoring premises, controlling access, responding to incidents, and deterring criminal activity.',
    shortDescription: 'Protect people and property from threats',
    avgHourlyRate: { min: 14, max: 24 },
    skills: ['Observation', 'Communication', 'Physical fitness', 'Problem solving', 'Report writing'],
    responsibilities: [
      'Monitor premises via patrols and surveillance',
      'Control access to buildings and areas',
      'Respond to alarms and emergencies',
      'Write detailed incident reports',
      'Assist visitors and employees'
    ],
    requirements: [
      'Security guard license (state-specific)',
      'Background check and drug screening',
      'High school diploma or equivalent',
      'Physical ability to stand/walk for hours'
    ],
    certifications: ['State Security Guard License', 'CPR/First Aid', 'Armed Guard License (optional)'],
    careerPath: [
      { role: 'Security Guard', years: '0-2 years', salary: '$14-24/hr' },
      { role: 'Senior Guard', years: '2-4 years', salary: '$18-28/hr' },
      { role: 'Security Supervisor', years: '4-6 years', salary: '$50-70k/yr' },
      { role: 'Security Manager', years: '6+ years', salary: '$60-90k/yr' }
    ],
    faqs: [
      { question: 'How do I become a security guard?', answer: 'Get your state security guard license (requires training), pass a background check, and apply to security companies.' },
      { question: 'Do security guards make good money?', answer: 'Pay ranges $14-24/hr. Armed guards, corporate security, and specialized roles pay more.' },
      { question: 'Is security guard work dangerous?', answer: 'Most security work is observational. High-risk sites pay more but are a small percentage of jobs.' }
    ],
    searchVolume: 'very-high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'maintenance-worker',
    title: 'Maintenance Worker',
    slug: 'maintenance-worker',
    industry: 'facilities',
    description: 'Maintenance Workers perform general repairs and upkeep in buildings, including plumbing fixes, electrical work, painting, and equipment maintenance.',
    shortDescription: 'Perform repairs and building maintenance',
    avgHourlyRate: { min: 16, max: 26 },
    skills: ['Mechanical aptitude', 'Problem solving', 'Physical fitness', 'Time management', 'Safety awareness'],
    responsibilities: [
      'Perform general building repairs',
      'Fix plumbing issues (leaks, clogs)',
      'Handle minor electrical repairs',
      'Paint and patch walls',
      'Maintain HVAC systems'
    ],
    requirements: [
      'Basic knowledge of plumbing, electrical, HVAC',
      'Own hand tools (often)',
      'Physical ability for varied tasks',
      'Reliability and problem-solving skills'
    ],
    certifications: ['EPA 608 (HVAC)', 'OSHA Safety'],
    careerPath: [
      { role: 'Maintenance Worker', years: '0-2 years', salary: '$16-26/hr' },
      { role: 'Maintenance Technician', years: '2-4 years', salary: '$20-30/hr' },
      { role: 'Chief Engineer', years: '4-6 years', salary: '$55-75k/yr' },
      { role: 'Facilities Director', years: '6+ years', salary: '$70-100k/yr' }
    ],
    faqs: [
      { question: 'Do I need certifications?', answer: 'Not always for entry-level, but certifications (HVAC, electrical) significantly increase pay and opportunities.' },
      { question: 'What\'s the difference between maintenance and handyman?', answer: 'Maintenance workers typically work for one employer/building. Handymen often work independently on various jobs.' },
      { question: 'Is maintenance a good career?', answer: 'Yes! Skilled maintenance workers are always in demand and can earn $50-80k+ with experience.' }
    ],
    searchVolume: 'very-high',
    entryLevel: false,
    physicalDemand: 'high',
    scheduleFlex: 'medium'
  },
  {
    id: 'laundry-attendant',
    title: 'Laundry Attendant',
    slug: 'laundry-attendant',
    industry: 'facilities',
    description: 'Laundry Attendants process linens and garments in hotels, hospitals, and commercial laundry facilities, operating washing machines, dryers, and pressing equipment.',
    shortDescription: 'Process laundry in commercial facilities',
    avgHourlyRate: { min: 12, max: 17 },
    skills: ['Attention to detail', 'Physical stamina', 'Time management', 'Organization', 'Equipment operation'],
    responsibilities: [
      'Sort laundry by type, color, and fabric',
      'Operate commercial washers and dryers',
      'Fold, press, and organize clean linens',
      'Inspect items for stains and damage',
      'Maintain laundry equipment'
    ],
    requirements: [
      'Ability to lift and carry laundry bags',
      'Standing for extended periods',
      'Attention to detail',
      'Flexible scheduling'
    ],
    careerPath: [
      { role: 'Laundry Attendant', years: '0-2 years', salary: '$12-17/hr' },
      { role: 'Lead Attendant', years: '2-3 years', salary: '$14-19/hr' },
      { role: 'Laundry Supervisor', years: '3-5 years', salary: '$40-50k/yr' },
      { role: 'Laundry Manager', years: '5+ years', salary: '$45-60k/yr' }
    ],
    faqs: [
      { question: 'Where do laundry attendants work?', answer: 'Hotels, hospitals, nursing homes, commercial laundry services, and dry cleaners.' },
      { question: 'Is laundry work hard?', answer: 'It\'s physical and warm environment, but straightforward work with consistent hours.' },
      { question: 'Do I need experience?', answer: 'No experience required. Training is provided on equipment and procedures.' }
    ],
    searchVolume: 'medium',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  // EVENTS & ENTERTAINMENT ROLES
  {
    id: 'event-setup-crew',
    title: 'Event Setup Crew',
    slug: 'event-setup-crew',
    industry: 'events',
    description: 'Event Setup Crew members prepare venues for events by setting up tables, chairs, staging, decorations, and equipment. They also break down after events conclude.',
    shortDescription: 'Set up and break down event venues',
    avgHourlyRate: { min: 15, max: 22 },
    skills: ['Physical fitness', 'Teamwork', 'Time management', 'Attention to detail', 'Flexibility'],
    responsibilities: [
      'Set up tables, chairs, and linens',
      'Assemble staging and backdrops',
      'Arrange decorations per event specifications',
      'Set up audio/visual equipment',
      'Break down and pack equipment post-event'
    ],
    requirements: [
      'Ability to lift 50+ lbs',
      'Physical stamina',
      'Flexible schedule (weekends, evenings)',
      'Reliable transportation to venue locations'
    ],
    careerPath: [
      { role: 'Event Setup Crew', years: '0-1 years', salary: '$15-22/hr' },
      { role: 'Lead Setup', years: '1-2 years', salary: '$18-25/hr' },
      { role: 'Event Coordinator', years: '2-4 years', salary: '$45-60k/yr' },
      { role: 'Event Manager', years: '4+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'Is event setup good flexible work?', answer: 'Excellent! Events are typically weekends/evenings, and you can choose which ones to work.' },
      { question: 'What events need setup crews?', answer: 'Weddings, corporate events, concerts, trade shows, festivals, and conferences.' },
      { question: 'How physical is event setup?', answer: 'Very physical - lots of lifting, carrying, and fast-paced work. Good fitness is important.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'high',
    scheduleFlex: 'high'
  },
  {
    id: 'concert-staff',
    title: 'Concert Staff',
    slug: 'concert-staff',
    industry: 'events',
    description: 'Concert Staff work at music venues and festivals, managing crowds, checking tickets, ensuring safety, and helping attendees have great experiences.',
    shortDescription: 'Support operations at concerts and music events',
    avgHourlyRate: { min: 14, max: 22 },
    skills: ['Customer service', 'Crowd management', 'Communication', 'Physical stamina', 'Problem solving'],
    responsibilities: [
      'Scan tickets and manage entry',
      'Direct attendees to seats/areas',
      'Monitor crowd behavior and safety',
      'Respond to guest questions and issues',
      'Assist with venue security'
    ],
    requirements: [
      'Excellent communication skills',
      'Ability to stand for long periods',
      'Evening and weekend availability',
      'Background check'
    ],
    careerPath: [
      { role: 'Concert Staff', years: '0-1 years', salary: '$14-22/hr' },
      { role: 'Crew Lead', years: '1-2 years', salary: '$18-25/hr' },
      { role: 'Event Supervisor', years: '2-4 years', salary: '$45-55k/yr' },
      { role: 'Venue Manager', years: '4+ years', salary: '$55-80k/yr' }
    ],
    faqs: [
      { question: 'Do concert staff get to watch shows?', answer: 'Sometimes! Depending on your position, you may see parts of shows while working.' },
      { question: 'Is concert work fun?', answer: 'Many find it exciting - you\'re part of live events and meet interesting people.' },
      { question: 'How do I get hired for concerts?', answer: 'Apply to staffing agencies that work with venues, or directly to concert halls and arenas.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'high'
  },
  {
    id: 'brand-ambassador',
    title: 'Brand Ambassador',
    slug: 'brand-ambassador',
    industry: 'events',
    description: 'Brand Ambassadors represent companies at events, stores, and public spaces, promoting products, engaging with customers, and creating brand awareness.',
    shortDescription: 'Represent brands and promote products at events',
    avgHourlyRate: { min: 16, max: 30 },
    skills: ['Communication', 'Sales skills', 'Enthusiasm', 'Product knowledge', 'Professional appearance'],
    responsibilities: [
      'Represent brand positively at events',
      'Engage customers and explain products',
      'Distribute samples and promotional materials',
      'Set up and manage promotional displays',
      'Collect customer data and feedback'
    ],
    requirements: [
      'Outgoing personality',
      'Professional appearance',
      'Reliable transportation',
      'Weekend/event availability'
    ],
    careerPath: [
      { role: 'Brand Ambassador', years: '0-2 years', salary: '$16-30/hr' },
      { role: 'Team Lead', years: '2-3 years', salary: '$22-35/hr' },
      { role: 'Field Marketing Manager', years: '3-5 years', salary: '$50-70k/yr' },
      { role: 'Marketing Manager', years: '5+ years', salary: '$65-100k/yr' }
    ],
    faqs: [
      { question: 'Is brand ambassador a real job?', answer: 'Absolutely! Major brands hire thousands of ambassadors for events, stores, and promotions.' },
      { question: 'How much do brand ambassadors make?', answer: '$16-30/hr depending on the brand and event type. Alcohol and tech brands often pay most.' },
      { question: 'Do I need experience?', answer: 'Not always. Personality and appearance matter most. Sales or promotion experience helps.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'low',
    scheduleFlex: 'high'
  },
  {
    id: 'valet',
    title: 'Valet',
    slug: 'valet',
    industry: 'events',
    description: 'Valets park and retrieve vehicles for customers at hotels, restaurants, events, and venues, providing convenient and professional parking service.',
    shortDescription: 'Park and retrieve vehicles for customers',
    avgHourlyRate: { min: 12, max: 18 },
    avgTips: { min: 5, max: 15 },
    skills: ['Driving proficiency', 'Customer service', 'Speed & efficiency', 'Organization', 'Professionalism'],
    responsibilities: [
      'Greet customers and receive vehicles',
      'Park vehicles safely and efficiently',
      'Retrieve vehicles promptly when requested',
      'Keep organized track of keys and locations',
      'Handle customer concerns professionally'
    ],
    requirements: [
      'Valid driver\'s license with clean record',
      'Ability to drive manual transmission (often required)',
      'Professional appearance and demeanor',
      'Physical ability to run/walk frequently'
    ],
    careerPath: [
      { role: 'Valet', years: '0-2 years', salary: '$17-33/hr with tips' },
      { role: 'Lead Valet', years: '2-3 years', salary: '$20-38/hr with tips' },
      { role: 'Valet Supervisor', years: '3-5 years', salary: '$45-55k/yr' },
      { role: 'Parking Operations Manager', years: '5+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'How much do valets make in tips?', answer: 'Tips add $5-15+/hr depending on the venue. High-end hotels and restaurants tip best.' },
      { question: 'Do I need to drive stick shift?', answer: 'Many valet companies require manual transmission skills. It\'s worth learning.' },
      { question: 'Is valet a good job?', answer: 'Great for earning tips and active work. Many enjoy driving nice cars and meeting people.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'parking-attendant',
    title: 'Parking Attendant',
    slug: 'parking-attendant',
    industry: 'events',
    description: 'Parking Attendants manage parking operations at venues, events, and parking facilities, directing traffic, collecting payments, and ensuring orderly parking.',
    shortDescription: 'Manage parking at venues and events',
    avgHourlyRate: { min: 13, max: 20 },
    avgTips: { min: 0, max: 5 },
    skills: ['Customer service', 'Communication', 'Traffic management', 'Cash handling', 'Patience'],
    responsibilities: [
      'Direct vehicles to parking spaces',
      'Collect parking fees',
      'Issue parking tickets/passes',
      'Monitor for unauthorized parking',
      'Manage traffic flow during events'
    ],
    requirements: [
      'Valid driver\'s license',
      'Ability to work outdoors in weather',
      'Standing for extended periods',
      'Evening/weekend availability for events'
    ],
    careerPath: [
      { role: 'Parking Attendant', years: '0-2 years', salary: '$13-20/hr' },
      { role: 'Lead Attendant', years: '2-3 years', salary: '$16-22/hr' },
      { role: 'Parking Supervisor', years: '3-5 years', salary: '$40-50k/yr' },
      { role: 'Parking Manager', years: '5+ years', salary: '$50-65k/yr' }
    ],
    faqs: [
      { question: 'Do parking attendants get tips?', answer: 'At valet operations, yes. At event/lot parking, tips are less common but sometimes given.' },
      { question: 'Is parking attendant hard?', answer: 'It requires patience and outdoor work, but is generally straightforward.' },
      { question: 'What\'s the difference between parking attendant and valet?', answer: 'Valets park customers\' cars themselves. Parking attendants direct customers to park their own cars.' }
    ],
    searchVolume: 'medium',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  // HEALTHCARE SUPPORT ROLES
  {
    id: 'dietary-aide',
    title: 'Dietary Aide',
    slug: 'dietary-aide',
    industry: 'healthcare',
    description: 'Dietary Aides work in hospitals, nursing homes, and care facilities, preparing and serving meals to patients while following dietary requirements and food safety standards.',
    shortDescription: 'Prepare and serve meals in healthcare facilities',
    avgHourlyRate: { min: 13, max: 18 },
    skills: ['Food safety', 'Attention to detail', 'Compassion', 'Time management', 'Teamwork'],
    responsibilities: [
      'Prepare and portion meals according to dietary needs',
      'Deliver meals to patients/residents',
      'Follow special diet requirements',
      'Collect and wash dishes',
      'Maintain food safety and sanitation'
    ],
    requirements: [
      'Food handler certification',
      'Compassion and patience',
      'Physical stamina',
      'Background check'
    ],
    certifications: ['Food Handler Permit', 'ServSafe'],
    careerPath: [
      { role: 'Dietary Aide', years: '0-2 years', salary: '$13-18/hr' },
      { role: 'Cook', years: '2-3 years', salary: '$15-20/hr' },
      { role: 'Dietary Supervisor', years: '3-5 years', salary: '$40-50k/yr' },
      { role: 'Food Service Director', years: '5+ years', salary: '$50-70k/yr' }
    ],
    faqs: [
      { question: 'Is dietary aide a good healthcare entry job?', answer: 'Yes! It\'s a rewarding way to help patients while learning about healthcare settings.' },
      { question: 'Do I need experience?', answer: 'No, though food service experience helps. Facilities train on specific dietary requirements.' },
      { question: 'What\'s rewarding about dietary aide work?', answer: 'Helping patients who can\'t feed themselves and seeing the positive impact of proper nutrition.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'patient-transporter',
    title: 'Patient Transporter',
    slug: 'patient-transporter',
    industry: 'healthcare',
    description: 'Patient Transporters safely move patients between hospital departments for tests, procedures, and transfers using wheelchairs, stretchers, and beds.',
    shortDescription: 'Transport patients throughout healthcare facilities',
    avgHourlyRate: { min: 14, max: 20 },
    skills: ['Compassion', 'Physical fitness', 'Communication', 'Safety awareness', 'Patience'],
    responsibilities: [
      'Transport patients safely via wheelchair or stretcher',
      'Verify patient identity before transport',
      'Communicate with nursing and department staff',
      'Monitor patient comfort during transport',
      'Follow infection control procedures'
    ],
    requirements: [
      'Physical ability to push wheelchairs and stretchers',
      'Compassion and patient care orientation',
      'Background check',
      'BLS/CPR certification (often required)'
    ],
    certifications: ['BLS/CPR', 'Patient Handling'],
    careerPath: [
      { role: 'Patient Transporter', years: '0-2 years', salary: '$14-20/hr' },
      { role: 'Lead Transporter', years: '2-3 years', salary: '$17-23/hr' },
      { role: 'CNA/Patient Care Tech', years: '2-4 years', salary: '$16-24/hr' },
      { role: 'Healthcare Administration', years: '4+ years', salary: '$45-65k/yr' }
    ],
    faqs: [
      { question: 'Is patient transporter good for nursing school?', answer: 'Excellent! You gain hospital experience and patient interaction while studying.' },
      { question: 'How physical is patient transport?', answer: 'Moderately physical - pushing wheelchairs/stretchers and walking throughout hospitals.' },
      { question: 'Do transporters interact with patients?', answer: 'Yes, often you\'re a friendly face during stressful hospital visits. Good communication matters.' }
    ],
    searchVolume: 'high',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  },
  {
    id: 'environmental-services',
    title: 'Environmental Services (Hospital Cleaner)',
    slug: 'environmental-services',
    industry: 'healthcare',
    description: 'Environmental Services workers clean and sanitize patient rooms, operating rooms, and public areas in hospitals to prevent infection and maintain safe environments.',
    shortDescription: 'Clean and sanitize hospital environments',
    avgHourlyRate: { min: 14, max: 21 },
    skills: ['Attention to detail', 'Infection control', 'Physical stamina', 'Reliability', 'Safety awareness'],
    responsibilities: [
      'Clean and disinfect patient rooms',
      'Sanitize high-touch surfaces',
      'Follow hospital infection control protocols',
      'Handle medical waste properly',
      'Restock supplies in patient areas'
    ],
    requirements: [
      'Physical ability to clean for hours',
      'Understanding of infection control',
      'Background check',
      'Reliable and detail-oriented'
    ],
    careerPath: [
      { role: 'EVS Worker', years: '0-2 years', salary: '$14-21/hr' },
      { role: 'EVS Lead', years: '2-3 years', salary: '$17-24/hr' },
      { role: 'EVS Supervisor', years: '3-5 years', salary: '$45-55k/yr' },
      { role: 'EVS Manager', years: '5+ years', salary: '$55-75k/yr' }
    ],
    faqs: [
      { question: 'Is hospital cleaning different from regular cleaning?', answer: 'Yes, it requires stricter infection control protocols and handling of medical waste.' },
      { question: 'Do hospital cleaners earn more?', answer: 'Often yes - healthcare EVS typically pays more than commercial cleaning due to specialized requirements.' },
      { question: 'Is it dangerous?', answer: 'With proper training and PPE, it\'s safe. Hospitals have strict protocols to protect staff.' }
    ],
    searchVolume: 'medium',
    entryLevel: true,
    physicalDemand: 'medium',
    scheduleFlex: 'medium'
  }
];

// Helper functions
export const getRolesByIndustry = (industry: string) => 
  roles.filter(role => role.industry === industry);

export const getRoleBySlug = (slug: string) => 
  roles.find(role => role.slug === slug);

// Legacy alias for backward compatibility
export const getWaitingStaffRole = () => getRoleBySlug('server');

// New helper functions
export const getHighSearchVolumeRoles = () =>
  roles.filter(role => role.searchVolume === 'very-high' || role.searchVolume === 'high');

export const getEntryLevelRoles = () =>
  roles.filter(role => role.entryLevel === true);

export const getRolesByPhysicalDemand = (demand: 'low' | 'medium' | 'high') =>
  roles.filter(role => role.physicalDemand === demand);

export const getAllRoleSlugs = () =>
  roles.map(role => role.slug);

export const getRolesWithTips = () =>
  roles.filter(role => role.avgTips && role.avgTips.max > 0);
