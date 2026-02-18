/**
 * Resume Examples Data
 * 
 * 23 role-specific resume examples with real content and formatting guidance.
 * Each example includes complete sections, tips, and keywords for that role.
 * 
 * Last Updated: February 2026
 */

export interface ResumeExample {
  id: string;
  roleSlug: string;
  roleName: string;
  industry: string;
  yearsExperience: '0-1' | '1-3' | '3-5' | '5+';
  summary: string;
  objective?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    dates: string;
    bullets: string[];
  }[];
  education?: {
    degree: string;
    school: string;
    year: string;
    details?: string;
  }[];
  certifications?: string[];
  additionalSections?: {
    title: string;
    items: string[];
  }[];
  tips: string[];
  keywords: string[];
  seoKeywords: string[];
}

export const resumeExamples: ResumeExample[] = [
  // HOSPITALITY
  {
    id: 'bartender',
    roleSlug: 'bartender',
    roleName: 'Bartender',
    industry: 'hospitality',
    yearsExperience: '1-3',
    summary: 'Energetic and customer-focused bartender with 2+ years of experience in high-volume bars and restaurants. Skilled in craft cocktails, beer and wine service, and creating memorable guest experiences. Known for efficiency during peak hours and building rapport with regular customers.',
    skills: [
      'Craft cocktail preparation',
      'Wine and beer knowledge',
      'POS systems (Toast, Square, Aloha)',
      'Cash handling & closing procedures',
      'Customer service excellence',
      'Inventory management',
      'Upselling techniques',
      'Bar equipment maintenance',
    ],
    experience: [
      {
        title: 'Bartender',
        company: 'The Copper Lounge',
        location: 'Austin, TX',
        dates: 'March 2024 - Present',
        bullets: [
          'Serve 150+ guests per shift in a high-energy cocktail bar, maintaining average ticket times under 3 minutes',
          'Developed 5 signature cocktails now featured on the seasonal menu, increasing cocktail sales by 20%',
          'Train new bartenders on cocktail recipes, POS operations, and customer service standards',
          'Maintain 4.8-star average rating on guest feedback surveys',
          'Handle cash and credit transactions totaling $5,000+ per shift with zero discrepancies',
        ],
      },
      {
        title: 'Barback / Server',
        company: 'Lakeside Bistro',
        location: 'Austin, TX',
        dates: 'June 2022 - February 2024',
        bullets: [
          'Supported bartenders during peak hours by restocking, cleaning, and preparing garnishes',
          'Transitioned to serving role within 6 months based on performance',
          'Learned drink preparation and cocktail recipes in preparation for bartending role',
          'Maintained cleanliness and organization of bar area in compliance with health codes',
        ],
      },
    ],
    certifications: [
      'TIPS Certified (Current)',
      'Texas Food Handler\'s License',
      'CPR/First Aid Certified',
    ],
    tips: [
      'Lead with your best cocktail achievements or signature drinks',
      'Quantify your experience (guests served, transaction totals, ratings)',
      'Highlight certifications prominently—they\'re often required',
      'Mention POS systems you know by name',
      'Show personality—bartending is about connecting with people',
    ],
    keywords: ['bartender', 'mixology', 'cocktails', 'customer service', 'high-volume', 'TIPS certified'],
    seoKeywords: ['bartender resume example', 'bartender resume', 'cocktail bartender resume'],
  },
  {
    id: 'server',
    roleSlug: 'server',
    roleName: 'Server / Waiter',
    industry: 'hospitality',
    yearsExperience: '1-3',
    summary: 'Personable and efficient server with 3 years of experience in fine dining and casual restaurant environments. Proven ability to manage high-volume sections while delivering attentive, personalized service. Skilled in menu knowledge, wine pairings, and creating exceptional guest experiences.',
    skills: [
      'Table management (6-8 table sections)',
      'Menu and wine knowledge',
      'POS systems (Toast, Micros, Aloha)',
      'Upselling and suggestive selling',
      'Allergy and dietary accommodation',
      'Cash handling',
      'Team collaboration',
      'Conflict resolution',
    ],
    experience: [
      {
        title: 'Server',
        company: 'Bella\'s Italian Kitchen',
        location: 'Nashville, TN',
        dates: 'May 2023 - Present',
        bullets: [
          'Manage 6-table section generating average sales of $1,200 per shift',
          'Maintain 98% positive feedback rating with emphasis on personalized service',
          'Develop expertise in Italian wine pairings, increasing wine sales by 25%',
          'Train 4 new servers on menu knowledge, table service, and restaurant procedures',
          'Handle guest complaints professionally, converting negative experiences into positive ones',
        ],
      },
      {
        title: 'Server',
        company: 'Downtown Grill',
        location: 'Nashville, TN',
        dates: 'January 2022 - April 2023',
        bullets: [
          'Served up to 100 guests per shift in a high-volume casual dining environment',
          'Learned all menu items and specials within first week of employment',
          'Collaborated with kitchen staff to ensure timely and accurate order delivery',
          'Consistently exceeded sales targets through suggestive selling techniques',
        ],
      },
    ],
    certifications: [
      'Tennessee ABC Server Permit',
      'ServSafe Food Handler Certification',
    ],
    tips: [
      'Include specific section sizes and guest counts',
      'Mention any specialized knowledge (wine, dietary restrictions)',
      'Highlight sales achievements and upselling success',
      'Reference your customer feedback ratings if strong',
      'Show progression if you\'ve moved up from busser/host',
    ],
    keywords: ['server', 'fine dining', 'customer service', 'wine knowledge', 'upselling', 'POS systems'],
    seoKeywords: ['server resume example', 'waiter resume', 'restaurant server resume'],
  },
  {
    id: 'line-cook',
    roleSlug: 'line-cook',
    roleName: 'Line Cook',
    industry: 'hospitality',
    yearsExperience: '1-3',
    summary: 'Dedicated line cook with 2+ years of experience in high-volume kitchens. Proficient in multiple stations including grill, sauté, and prep. Committed to food safety, quality standards, and maintaining efficiency during peak service periods.',
    skills: [
      'Grill, sauté, and fry station expertise',
      'Food prep and knife skills',
      'Food safety (ServSafe certified)',
      'Inventory and portion control',
      'Kitchen equipment operation',
      'Plating and presentation',
      'High-volume production',
      'Team coordination',
    ],
    experience: [
      {
        title: 'Line Cook',
        company: 'The Grill House',
        location: 'Dallas, TX',
        dates: 'August 2023 - Present',
        bullets: [
          'Execute 80+ covers per shift on grill station during peak dinner service',
          'Maintain consistent food quality and presentation across all dishes',
          'Cross-trained on all kitchen stations to provide coverage as needed',
          'Reduced food waste by 15% through improved portion control and prep practices',
          'Ensure compliance with all health department regulations and ServSafe standards',
        ],
      },
      {
        title: 'Prep Cook',
        company: 'Casa Mexican Grill',
        location: 'Dallas, TX',
        dates: 'March 2022 - July 2023',
        bullets: [
          'Prepared ingredients for 200+ daily covers including sauces, vegetables, and proteins',
          'Maintained organized walk-in cooler and dry storage areas',
          'Learned line cook responsibilities and promoted within 8 months',
          'Followed all recipe specifications and food safety guidelines',
        ],
      },
    ],
    certifications: [
      'ServSafe Food Handler Certification',
      'Texas Food Handler\'s Card',
    ],
    tips: [
      'List specific stations you\'re proficient in',
      'Include cover counts and volume metrics',
      'Mention cuisine types or specialty dishes',
      'Highlight food safety certifications',
      'Show career progression (prep to line to lead)',
    ],
    keywords: ['line cook', 'grill station', 'sauté', 'food prep', 'ServSafe', 'high-volume kitchen'],
    seoKeywords: ['line cook resume example', 'cook resume', 'kitchen resume'],
  },

  // WAREHOUSE / INDUSTRIAL
  {
    id: 'warehouse-operative',
    roleSlug: 'warehouse-operative',
    roleName: 'Warehouse Associate',
    industry: 'industrial',
    yearsExperience: '1-3',
    summary: 'Reliable warehouse associate with 2+ years of experience in high-volume distribution centers. Consistently exceeds productivity targets while maintaining 99%+ accuracy. Experienced with RF scanners, WMS systems, and forklift operation.',
    skills: [
      'RF scanner operation',
      'Warehouse Management Systems (WMS)',
      'Order picking and packing',
      'Inventory management',
      'Forklift certified (sit-down, reach)',
      'Pallet jack operation',
      'Quality control',
      'Safety compliance (OSHA)',
    ],
    experience: [
      {
        title: 'Warehouse Associate',
        company: 'Amazon Fulfillment Center',
        location: 'Houston, TX',
        dates: 'June 2023 - Present',
        bullets: [
          'Pick and pack 180+ units per hour, exceeding productivity targets by 15%',
          'Maintain 99.8% accuracy rate across 10,000+ orders processed',
          'Train new associates on picking procedures, scanner operation, and safety protocols',
          'Assist with inventory counts and discrepancy resolution',
          'Received "Peak Performer" recognition during 2025 holiday season',
        ],
      },
      {
        title: 'General Warehouse Worker',
        company: 'Regional Distribution Co.',
        location: 'Houston, TX',
        dates: 'January 2022 - May 2023',
        bullets: [
          'Loaded and unloaded trucks, processing 50+ pallets per shift',
          'Organized inventory in designated locations following FIFO methodology',
          'Operated electric pallet jacks and hand trucks safely',
          'Maintained clean and organized work areas per safety standards',
        ],
      },
    ],
    certifications: [
      'OSHA Forklift Certified',
      'Hazardous Materials Handling',
      'First Aid/CPR',
    ],
    tips: [
      'Include specific productivity metrics (units per hour, accuracy %)',
      'List all equipment certifications prominently',
      'Mention WMS or technology systems you know',
      'Highlight perfect or near-perfect attendance',
      'Reference any safety awards or recognition',
    ],
    keywords: ['warehouse', 'picking', 'packing', 'forklift', 'WMS', 'RF scanner', 'productivity'],
    seoKeywords: ['warehouse associate resume', 'warehouse worker resume example', 'picker packer resume'],
  },
  {
    id: 'forklift-driver',
    roleSlug: 'forklift-driver',
    roleName: 'Forklift Operator',
    industry: 'industrial',
    yearsExperience: '3-5',
    summary: 'Experienced forklift operator with 4+ years operating various lift equipment in warehouse and manufacturing environments. Perfect safety record with expertise in inventory movement, loading/unloading, and equipment maintenance.',
    skills: [
      'Sit-down forklift (Class I)',
      'Stand-up reach truck (Class II)',
      'Order picker operation',
      'Electric pallet jack',
      'Loading and unloading trailers',
      'Inventory management',
      'Equipment pre-trip inspections',
      'OSHA safety compliance',
    ],
    experience: [
      {
        title: 'Forklift Operator',
        company: 'Consolidated Logistics',
        location: 'Phoenix, AZ',
        dates: 'February 2022 - Present',
        bullets: [
          'Operate sit-down and stand-up forklifts to move 100+ pallets per shift safely',
          'Load and unload 15+ trailers daily using dock levelers and pallet jacks',
          'Maintain 100% safety record with zero incidents over 3+ years',
          'Perform daily equipment inspections and report maintenance needs promptly',
          'Train 8 new operators on safe forklift operation and warehouse procedures',
        ],
      },
      {
        title: 'Forklift Operator / Warehouse Associate',
        company: 'ABC Manufacturing',
        location: 'Phoenix, AZ',
        dates: 'March 2020 - January 2022',
        bullets: [
          'Operated reach truck in narrow-aisle racking system with 99.9% accuracy',
          'Supported production lines by delivering materials as needed',
          'Participated in annual inventory counts and cycle counting',
          'Received forklift certification and safety training within 30 days of hire',
        ],
      },
    ],
    certifications: [
      'OSHA Forklift Certification (Current)',
      'Certified on: Sit-down, Stand-up, Reach Truck, Order Picker',
      'Hazmat Awareness Training',
    ],
    tips: [
      'List all forklift types you\'re certified on',
      'Emphasize your safety record prominently',
      'Include pallet counts and productivity metrics',
      'Mention any training responsibilities',
      'Reference specific equipment brands if applicable',
    ],
    keywords: ['forklift operator', 'reach truck', 'pallet jack', 'OSHA certified', 'warehouse', 'safety record'],
    seoKeywords: ['forklift operator resume', 'forklift driver resume example', 'lift truck operator resume'],
  },

  // RETAIL
  {
    id: 'retail-assistant',
    roleSlug: 'retail-assistant',
    roleName: 'Retail Sales Associate',
    industry: 'retail',
    yearsExperience: '1-3',
    summary: 'Customer-focused retail sales associate with 2+ years of experience in clothing and department store environments. Consistently exceeds sales goals through personalized service and product expertise. Skilled in visual merchandising, inventory management, and creating positive shopping experiences.',
    skills: [
      'Customer service excellence',
      'Sales and upselling',
      'POS systems and cash handling',
      'Visual merchandising',
      'Inventory management',
      'Product knowledge',
      'Loss prevention awareness',
      'Team collaboration',
    ],
    experience: [
      {
        title: 'Sales Associate',
        company: 'Nordstrom',
        location: 'Las Vegas, NV',
        dates: 'September 2023 - Present',
        bullets: [
          'Exceed monthly sales goals by average of 25% through personalized styling recommendations',
          'Maintain extensive product knowledge across multiple departments and brands',
          'Build client book of 50+ regular customers who request my assistance',
          'Create visually appealing displays that increased department traffic by 15%',
          'Process transactions accurately and handle returns per company policy',
        ],
      },
      {
        title: 'Sales Associate',
        company: 'Target',
        location: 'Las Vegas, NV',
        dates: 'June 2022 - August 2023',
        bullets: [
          'Assisted 50+ customers daily with product selection and store navigation',
          'Maintained assigned sections per visual merchandising standards',
          'Processed shipments and replenished stock to maintain full displays',
          'Operated cash register and handled closing procedures',
        ],
      },
    ],
    tips: [
      'Highlight sales achievements with specific percentages',
      'Mention brand names and store types for credibility',
      'Include customer service metrics if available',
      'Reference any employee recognition awards',
      'Show progression and increased responsibility',
    ],
    keywords: ['retail', 'sales', 'customer service', 'merchandising', 'POS', 'inventory'],
    seoKeywords: ['retail sales associate resume', 'sales associate resume example', 'retail resume'],
  },
  {
    id: 'cashier',
    roleSlug: 'cashier',
    roleName: 'Cashier',
    industry: 'retail',
    yearsExperience: '0-1',
    summary: 'Friendly and efficient cashier with 1 year of experience in grocery and retail environments. Skilled in processing transactions quickly and accurately while providing excellent customer service. Reliable team member with flexible availability.',
    skills: [
      'Cash register operation',
      'Cash handling and counting',
      'Credit/debit transactions',
      'Customer service',
      'Bagging and product handling',
      'Price checks and discounts',
      'Basic math skills',
      'Line management',
    ],
    experience: [
      {
        title: 'Cashier',
        company: 'Kroger',
        location: 'Cincinnati, OH',
        dates: 'March 2025 - Present',
        bullets: [
          'Process 150+ transactions per shift with 100% accuracy',
          'Handle cash, credit, debit, and EBT payments following all procedures',
          'Provide friendly service that earns positive customer feedback',
          'Bag groceries efficiently and assist with carry-out service',
          'Maintain clean and organized checkout area',
        ],
      },
    ],
    education: [
      {
        degree: 'High School Diploma',
        school: 'Cincinnati High School',
        year: '2024',
      },
    ],
    tips: [
      'Emphasize accuracy and transaction counts',
      'Highlight customer service skills',
      'Mention your availability (evenings, weekends)',
      'Include any cash handling training',
      'Show reliability and punctuality',
    ],
    keywords: ['cashier', 'cash handling', 'customer service', 'transactions', 'retail', 'register'],
    seoKeywords: ['cashier resume example', 'grocery store resume', 'retail cashier resume'],
  },

  // FACILITIES
  {
    id: 'housekeeper',
    roleSlug: 'housekeeper',
    roleName: 'Housekeeper',
    industry: 'facilities',
    yearsExperience: '1-3',
    summary: 'Detail-oriented housekeeper with 3+ years of experience in hotel and commercial cleaning environments. Known for thoroughness, efficiency, and maintaining the highest standards of cleanliness. Consistently receives excellent guest feedback and supervisor recognition.',
    skills: [
      'Guest room cleaning and inspection',
      'Deep cleaning procedures',
      'Chemical handling and safety',
      'Laundry and linen service',
      'Bed making and turndown service',
      'Time management',
      'Attention to detail',
      'Physical stamina',
    ],
    experience: [
      {
        title: 'Room Attendant',
        company: 'Marriott Downtown',
        location: 'Atlanta, GA',
        dates: 'April 2023 - Present',
        bullets: [
          'Clean and inspect 16-18 guest rooms per 8-hour shift while exceeding quality standards',
          'Follow brand standards for room setup, amenity placement, and presentation',
          'Respond to guest requests for extra linens, toiletries, and supplies promptly',
          'Report maintenance issues and lost-and-found items per hotel procedures',
          'Receive consistently positive feedback on room cleanliness and attention to detail',
        ],
      },
      {
        title: 'Housekeeper',
        company: 'CleanPro Commercial Services',
        location: 'Atlanta, GA',
        dates: 'June 2021 - March 2023',
        bullets: [
          'Cleaned office buildings, medical facilities, and retail spaces',
          'Followed cleaning checklists and quality control procedures',
          'Handled floor care including mopping, vacuuming, and buffing',
          'Maintained cleaning equipment and restocked supply closets',
        ],
      },
    ],
    certifications: [
      'OSHA Bloodborne Pathogens Training',
      'Chemical Handling Safety Certificate',
    ],
    tips: [
      'Include room counts and cleaning metrics',
      'Mention specific hotel brands for credibility',
      'Highlight attention to detail and quality',
      'Reference any guest feedback or recognition',
      'List specialized cleaning experience (deep clean, turnover)',
    ],
    keywords: ['housekeeper', 'room attendant', 'hotel', 'cleaning', 'attention to detail', 'guest service'],
    seoKeywords: ['housekeeper resume example', 'hotel housekeeper resume', 'room attendant resume'],
  },
  {
    id: 'janitor',
    roleSlug: 'janitor',
    roleName: 'Janitor / Custodian',
    industry: 'facilities',
    yearsExperience: '1-3',
    summary: 'Reliable custodian with 2+ years of experience maintaining commercial and educational facilities. Skilled in floor care, restroom sanitation, and general maintenance. Committed to safety and creating clean, welcoming environments.',
    skills: [
      'Floor care (mopping, waxing, buffing)',
      'Restroom sanitation',
      'Trash removal and recycling',
      'Window and glass cleaning',
      'Light maintenance repairs',
      'Equipment operation',
      'Chemical safety',
      'Independent work',
    ],
    experience: [
      {
        title: 'Custodian',
        company: 'Columbus City Schools',
        location: 'Columbus, OH',
        dates: 'August 2023 - Present',
        bullets: [
          'Maintain cleanliness of 50,000 sq. ft. elementary school building',
          'Perform daily cleaning of classrooms, restrooms, and common areas',
          'Strip, wax, and buff floors during summer deep cleaning',
          'Set up and break down for school events and assemblies',
          'Complete minor repairs including light bulb replacement and fixture adjustments',
        ],
      },
      {
        title: 'Janitor',
        company: 'Office Building Services Inc.',
        location: 'Columbus, OH',
        dates: 'March 2022 - July 2023',
        bullets: [
          'Cleaned 5-story office building during evening shift',
          'Emptied trash, vacuumed, and sanitized common areas',
          'Maintained cleaning supply inventory and equipment',
          'Followed security procedures and building access protocols',
        ],
      },
    ],
    certifications: [
      'OSHA General Safety Training',
      'Floor Care Equipment Certification',
    ],
    tips: [
      'Include square footage or building size for context',
      'Mention types of facilities cleaned',
      'Highlight equipment you can operate',
      'Reference any maintenance or repair skills',
      'Emphasize reliability and work ethic',
    ],
    keywords: ['janitor', 'custodian', 'cleaning', 'floor care', 'maintenance', 'sanitation'],
    seoKeywords: ['janitor resume example', 'custodian resume', 'cleaning resume'],
  },

  // ADDITIONAL HOSPITALITY ROLES
  {
    id: 'host',
    roleSlug: 'host',
    roleName: 'Host / Hostess',
    industry: 'hospitality',
    yearsExperience: '0-1',
    summary: 'Friendly and organized host with 1+ year of experience in busy restaurant environments. Skilled in reservation management, guest seating, and creating positive first impressions. Excellent communication skills and ability to multitask during peak hours.',
    skills: [
      'Reservation systems (OpenTable, Resy)',
      'Guest greeting and seating',
      'Wait time management',
      'Phone etiquette',
      'Table management',
      'Customer service',
      'Multitasking',
      'Conflict resolution',
    ],
    experience: [
      {
        title: 'Host',
        company: 'The Capital Grille',
        location: 'Washington, DC',
        dates: 'June 2025 - Present',
        bullets: [
          'Greet and seat 200+ guests per shift in upscale dining environment',
          'Manage reservations using OpenTable, including special requests and VIP notes',
          'Communicate wait times accurately and manage guest expectations',
          'Coordinate with servers and managers to optimize table turnover',
          'Handle phone inquiries and take to-go orders as needed',
        ],
      },
    ],
    education: [
      {
        degree: 'High School Diploma',
        school: 'Lincoln High School',
        year: '2025',
      },
    ],
    tips: [
      'Highlight reservation system experience',
      'Mention guest volumes you\'ve handled',
      'Emphasize communication and organization skills',
      'Include any upscale or fine dining experience',
      'Show ability to work under pressure',
    ],
    keywords: ['host', 'hostess', 'reservations', 'guest service', 'OpenTable', 'restaurant'],
    seoKeywords: ['host resume example', 'hostess resume', 'restaurant host resume'],
  },
  {
    id: 'barback',
    roleSlug: 'barback',
    roleName: 'Barback',
    industry: 'hospitality',
    yearsExperience: '0-1',
    summary: 'Hardworking barback with experience supporting high-volume bars during peak service. Strong attention to detail, physical stamina, and eagerness to learn bartending skills. Team player committed to helping bartenders succeed.',
    skills: [
      'Bar restocking and setup',
      'Glassware washing and polishing',
      'Ice and garnish preparation',
      'Keg changing',
      'Bar cleaning and organization',
      'Physical stamina',
      'Speed and efficiency',
      'Teamwork',
    ],
    experience: [
      {
        title: 'Barback',
        company: 'Sixth Street Bar',
        location: 'Austin, TX',
        dates: 'January 2025 - Present',
        bullets: [
          'Support 4 bartenders during Friday and Saturday peak shifts serving 500+ guests',
          'Restock beer, liquor, glassware, and supplies continuously throughout shift',
          'Prepare garnishes, refill ice wells, and change kegs as needed',
          'Clear empty glasses and maintain clean bar top and service areas',
          'Learning cocktail recipes and techniques with goal of promotion to bartender',
        ],
      },
    ],
    tips: [
      'Show your eagerness to learn bartending',
      'Mention the volume and pace you can handle',
      'Highlight physical capabilities',
      'Include any drink knowledge you\'re developing',
      'Emphasize reliability and work ethic',
    ],
    keywords: ['barback', 'bar support', 'restocking', 'bartender assistant', 'hospitality'],
    seoKeywords: ['barback resume example', 'bar back resume', 'bartender assistant resume'],
  },
  {
    id: 'dishwasher',
    roleSlug: 'dishwasher',
    roleName: 'Dishwasher',
    industry: 'hospitality',
    yearsExperience: '0-1',
    summary: 'Reliable dishwasher with experience maintaining kitchen cleanliness and supporting food service operations. Quick, efficient, and committed to sanitation standards. Strong work ethic and willingness to assist wherever needed.',
    skills: [
      'Commercial dishwasher operation',
      'Manual dish washing',
      'Kitchen sanitation',
      'Pot and pan scrubbing',
      'Floor and station cleaning',
      'Food safety awareness',
      'Physical stamina',
      'Time management',
    ],
    experience: [
      {
        title: 'Dishwasher',
        company: 'Italian Gardens Restaurant',
        location: 'Charlotte, NC',
        dates: 'September 2025 - Present',
        bullets: [
          'Operate high-temperature commercial dishwasher processing 500+ items per shift',
          'Hand wash pots, pans, and delicate items to kitchen standards',
          'Maintain cleanliness of dish pit and surrounding work areas',
          'Support kitchen team by restocking clean dishes and utensils',
          'Empty trash and assist with kitchen closing procedures',
        ],
      },
    ],
    tips: [
      'Emphasize speed and efficiency',
      'Mention commercial equipment experience',
      'Highlight reliability and punctuality',
      'Show willingness to help beyond dish duties',
      'Include any kitchen interest or aspirations',
    ],
    keywords: ['dishwasher', 'kitchen', 'sanitation', 'restaurant', 'cleaning', 'food service'],
    seoKeywords: ['dishwasher resume example', 'kitchen dishwasher resume', 'restaurant dishwasher resume'],
  },

  // ADDITIONAL WAREHOUSE ROLES
  {
    id: 'picker-packer',
    roleSlug: 'picker-packer',
    roleName: 'Picker/Packer',
    industry: 'industrial',
    yearsExperience: '0-1',
    summary: 'Efficient picker/packer with experience in e-commerce fulfillment centers. Consistently meets productivity targets while maintaining accuracy. Quick learner with strong attention to detail and ability to thrive in fast-paced environments.',
    skills: [
      'Order picking (RF scanner)',
      'Packing and labeling',
      'Quality inspection',
      'Inventory counts',
      'Standing/walking 8+ hours',
      'Lifting up to 50 lbs',
      'Attention to detail',
      'Speed and accuracy',
    ],
    experience: [
      {
        title: 'Picker/Packer',
        company: 'Amazon Fulfillment Center',
        location: 'Chicago, IL',
        dates: 'November 2025 - Present',
        bullets: [
          'Pick and pack 160+ units per hour using RF scanner and handheld device',
          'Maintain 99.5% accuracy rate across all processed orders',
          'Select appropriate packaging materials based on item size and fragility',
          'Identify and report damaged or mislabeled products',
          'Meet daily productivity goals while following safety guidelines',
        ],
      },
    ],
    tips: [
      'Include specific UPH (units per hour) metrics',
      'Highlight accuracy percentages',
      'Mention types of products handled',
      'Reference any technology or systems used',
      'Show physical capabilities and stamina',
    ],
    keywords: ['picker', 'packer', 'fulfillment', 'warehouse', 'RF scanner', 'accuracy'],
    seoKeywords: ['picker packer resume', 'warehouse picker resume example', 'fulfillment center resume'],
  },
  {
    id: 'shipping-receiving',
    roleSlug: 'shipping-receiving',
    roleName: 'Shipping & Receiving Clerk',
    industry: 'industrial',
    yearsExperience: '1-3',
    summary: 'Detail-oriented shipping and receiving clerk with 2+ years of experience managing inbound and outbound logistics. Skilled in documentation, inventory verification, and carrier coordination. Strong organizational skills and commitment to accuracy.',
    skills: [
      'Shipping documentation',
      'Receiving and inspection',
      'Inventory verification',
      'Carrier coordination',
      'Bill of lading processing',
      'Forklift operation',
      'WMS systems',
      'Data entry',
    ],
    experience: [
      {
        title: 'Shipping & Receiving Clerk',
        company: 'Industrial Supply Co.',
        location: 'Columbus, OH',
        dates: 'March 2024 - Present',
        bullets: [
          'Process 50+ inbound and outbound shipments daily with 100% documentation accuracy',
          'Verify received goods against purchase orders and report discrepancies',
          'Coordinate with UPS, FedEx, and freight carriers for pickup scheduling',
          'Generate shipping labels and prepare bills of lading',
          'Maintain organized shipping and receiving areas per safety standards',
        ],
      },
      {
        title: 'Warehouse Associate',
        company: 'General Distribution Inc.',
        location: 'Columbus, OH',
        dates: 'June 2022 - February 2024',
        bullets: [
          'Assisted with receiving and put-away of incoming inventory',
          'Picked and staged orders for shipment',
          'Operated pallet jack and forklift under supervision',
          'Participated in cycle counts and inventory audits',
        ],
      },
    ],
    certifications: [
      'OSHA Forklift Certification',
      'Hazardous Materials Shipping',
    ],
    tips: [
      'Highlight volume of shipments handled',
      'Mention carrier relationships and systems',
      'Include documentation and accuracy metrics',
      'Reference any compliance certifications',
      'Show organizational and computer skills',
    ],
    keywords: ['shipping', 'receiving', 'logistics', 'documentation', 'inventory', 'carriers'],
    seoKeywords: ['shipping receiving resume', 'shipping clerk resume example', 'receiving clerk resume'],
  },

  // EVENTS
  {
    id: 'event-staff',
    roleSlug: 'event-staff',
    roleName: 'Event Staff',
    industry: 'events',
    yearsExperience: '0-1',
    summary: 'Energetic event staff member with experience supporting concerts, sporting events, and conventions. Adaptable, customer-focused, and comfortable in fast-paced, dynamic environments. Strong interpersonal skills and professional appearance.',
    skills: [
      'Guest services',
      'Crowd management',
      'Event setup/teardown',
      'Ticket scanning',
      'Merchandise sales',
      'Food and beverage service',
      'Wayfinding assistance',
      'Team coordination',
    ],
    experience: [
      {
        title: 'Event Staff',
        company: 'Live Nation Events',
        location: 'Dallas, TX',
        dates: 'May 2025 - Present',
        bullets: [
          'Work 20+ concerts and events at major venues serving 5,000-50,000 attendees',
          'Assist guests with seating, directions, and general inquiries',
          'Scan tickets and manage venue entry points during peak arrival times',
          'Set up and tear down event equipment, signage, and barriers',
          'Maintain assigned area cleanliness and report safety concerns',
        ],
      },
    ],
    tips: [
      'List specific types and sizes of events worked',
      'Highlight guest interaction experience',
      'Mention flexibility with scheduling',
      'Include any crowd management training',
      'Show energy and enthusiasm in your language',
    ],
    keywords: ['event staff', 'concerts', 'sporting events', 'guest services', 'crowd management'],
    seoKeywords: ['event staff resume example', 'event worker resume', 'concert staff resume'],
  },
  {
    id: 'banquet-server',
    roleSlug: 'banquet-server',
    roleName: 'Banquet Server',
    industry: 'events',
    yearsExperience: '1-3',
    summary: 'Professional banquet server with 2+ years of experience in hotel and event venue settings. Skilled in formal service, plated and buffet styles, and working large-scale events. Detail-oriented with strong stamina and presentation skills.',
    skills: [
      'Formal table service',
      'Plated meal service',
      'Buffet setup and management',
      'Wine and beverage service',
      'Event setup/teardown',
      'Team coordination',
      'Time management',
      'Professional appearance',
    ],
    experience: [
      {
        title: 'Banquet Server',
        company: 'Grand Hyatt Hotel',
        location: 'San Antonio, TX',
        dates: 'April 2024 - Present',
        bullets: [
          'Serve plated dinners and manage buffet stations for events of 50-500 guests',
          'Execute formal service protocols for corporate galas and wedding receptions',
          'Set up banquet rooms including tables, linens, place settings, and décor',
          'Coordinate with kitchen and event managers to ensure seamless service',
          'Clear and reset between courses while maintaining unobtrusive service',
        ],
      },
      {
        title: 'Server',
        company: 'Olive Garden',
        location: 'San Antonio, TX',
        dates: 'August 2022 - March 2024',
        bullets: [
          'Provided table service in casual dining environment',
          'Developed strong multi-table management and guest service skills',
          'Handled private party reservations for groups up to 30',
        ],
      },
    ],
    certifications: [
      'TABC Certification',
      'Food Handler\'s License',
    ],
    tips: [
      'Mention event sizes and types (weddings, corporate, galas)',
      'Highlight formal service experience',
      'Include hotel or venue names for credibility',
      'Reference teamwork and coordination skills',
      'Show professional presentation',
    ],
    keywords: ['banquet server', 'catering', 'events', 'formal service', 'hotel', 'weddings'],
    seoKeywords: ['banquet server resume example', 'catering resume', 'event server resume'],
  },

  // SPECIALIZED ROLES
  {
    id: 'delivery-driver',
    roleSlug: 'delivery-driver',
    roleName: 'Delivery Driver',
    industry: 'industrial',
    yearsExperience: '1-3',
    summary: 'Dependable delivery driver with 3+ years of experience and clean driving record. Skilled in route optimization, customer service, and cargo handling. Committed to on-time deliveries and safe driving practices.',
    skills: [
      'Clean driving record',
      'Route planning and GPS navigation',
      'Customer service',
      'Cargo loading and securing',
      'Vehicle inspection',
      'Time management',
      'DOT compliance',
      'Heavy lifting (50+ lbs)',
    ],
    experience: [
      {
        title: 'Delivery Driver',
        company: 'FedEx Ground',
        location: 'Denver, CO',
        dates: 'January 2023 - Present',
        bullets: [
          'Complete 120+ stops per day with 99% on-time delivery rate',
          'Operate delivery van safely in all weather conditions',
          'Load and organize packages for efficient route execution',
          'Provide excellent customer service including signature collection and package placement',
          'Maintain clean driving record with zero accidents or violations',
        ],
      },
      {
        title: 'Restaurant Delivery Driver',
        company: 'Local Restaurant Group',
        location: 'Denver, CO',
        dates: 'June 2021 - December 2022',
        bullets: [
          'Delivered food orders within 30-mile radius of restaurant',
          'Maintained food safety standards during transport',
          'Processed cash and credit card transactions',
          'Assisted with restaurant prep and cleaning between deliveries',
        ],
      },
    ],
    certifications: [
      'Valid Colorado Driver\'s License (Class D)',
      'DOT Medical Card (Current)',
    ],
    tips: [
      'Emphasize clean driving record prominently',
      'Include stop counts and delivery metrics',
      'Mention types of vehicles you\'ve operated',
      'Highlight customer service skills',
      'Reference any certifications (DOT, CDL)',
    ],
    keywords: ['delivery driver', 'driving record', 'route planning', 'customer service', 'cargo'],
    seoKeywords: ['delivery driver resume example', 'driver resume', 'delivery job resume'],
  },
  {
    id: 'food-runner',
    roleSlug: 'food-runner',
    roleName: 'Food Runner',
    industry: 'hospitality',
    yearsExperience: '0-1',
    summary: 'Efficient food runner with experience in high-volume restaurants. Skilled in accurate order delivery, table maintenance, and supporting the server team. Quick on feet with strong attention to detail and guest service focus.',
    skills: [
      'Food delivery accuracy',
      'Table number memorization',
      'Dish identification',
      'Plate presentation',
      'Server support',
      'Multi-tasking',
      'Speed and efficiency',
      'Team communication',
    ],
    experience: [
      {
        title: 'Food Runner',
        company: 'The Cheesecake Factory',
        location: 'Las Vegas, NV',
        dates: 'August 2025 - Present',
        bullets: [
          'Deliver food to tables accurately and promptly, serving 200+ guests per shift',
          'Memorize table numbers and positions to ensure correct delivery',
          'Check plates for proper presentation and completeness before delivery',
          'Communicate with kitchen on timing and special requests',
          'Assist servers with beverage refills, pre-bussing, and side work',
        ],
      },
    ],
    tips: [
      'Highlight speed and accuracy',
      'Mention restaurant types and volume',
      'Show teamwork and communication skills',
      'Include any food knowledge developed',
      'Express interest in advancing to server role',
    ],
    keywords: ['food runner', 'restaurant', 'table service', 'food delivery', 'hospitality'],
    seoKeywords: ['food runner resume example', 'restaurant food runner resume', 'runner resume'],
  },
  {
    id: 'general-labor',
    roleSlug: 'general-labor',
    roleName: 'General Laborer',
    industry: 'industrial',
    yearsExperience: '0-1',
    summary: 'Hardworking general laborer with experience in construction, warehouse, and event environments. Physically capable, reliable, and willing to take on any task. Quick learner with strong work ethic and safety awareness.',
    skills: [
      'Physical labor and lifting (75+ lbs)',
      'Hand and power tool operation',
      'Site cleanup and organization',
      'Material handling',
      'Following instructions',
      'Safety compliance',
      'Outdoor work in all conditions',
      'Teamwork',
    ],
    experience: [
      {
        title: 'General Laborer',
        company: 'Various Temp Agencies',
        location: 'Phoenix, AZ',
        dates: 'March 2025 - Present',
        bullets: [
          'Complete construction site cleanup, demolition, and material moving',
          'Load and unload trucks, moving heavy materials safely',
          'Assist skilled tradespeople with tasks as directed',
          'Maintain clean and organized work areas per safety requirements',
          'Available for immediate deployment with flexible scheduling',
        ],
      },
    ],
    tips: [
      'Emphasize physical capabilities and stamina',
      'Highlight reliability and availability',
      'Mention any tools or equipment you can use',
      'Show safety awareness and training',
      'Express willingness to learn and work hard',
    ],
    keywords: ['general labor', 'construction', 'warehouse', 'physical work', 'reliable', 'hard worker'],
    seoKeywords: ['general laborer resume example', 'labor resume', 'construction worker resume'],
  },
  {
    id: 'brand-ambassador',
    roleSlug: 'brand-ambassador',
    roleName: 'Brand Ambassador',
    industry: 'retail',
    yearsExperience: '0-1',
    summary: 'Outgoing brand ambassador with experience representing brands at events, retail locations, and promotional activations. Strong communication skills, professional appearance, and ability to engage customers and drive brand awareness.',
    skills: [
      'Product demonstration',
      'Customer engagement',
      'Sales and sampling',
      'Event representation',
      'Social media content',
      'Data collection',
      'Public speaking',
      'Professional appearance',
    ],
    experience: [
      {
        title: 'Brand Ambassador',
        company: 'Promotional Marketing Agency',
        location: 'Miami, FL',
        dates: 'June 2025 - Present',
        bullets: [
          'Represent beverage and consumer goods brands at retail stores and events',
          'Engage 100+ customers per activation, explaining product benefits and features',
          'Set up and manage promotional displays and sampling stations',
          'Collect customer feedback and contact information for marketing team',
          'Create social media content showcasing brand activations (with approval)',
        ],
      },
    ],
    tips: [
      'Highlight customer engagement metrics',
      'Mention specific brands you\'ve represented',
      'Include any social media or content creation skills',
      'Show outgoing personality in your writing',
      'Reference professional appearance and presentation',
    ],
    keywords: ['brand ambassador', 'promotions', 'marketing', 'customer engagement', 'events', 'sampling'],
    seoKeywords: ['brand ambassador resume example', 'promotional model resume', 'product demo resume'],
  },
];

// Helper functions
export function getResumeExampleByRole(roleSlug: string): ResumeExample | undefined {
  return resumeExamples.find((e) => e.roleSlug === roleSlug);
}

export function getResumeExamplesByIndustry(industry: string): ResumeExample[] {
  return resumeExamples.filter((e) => e.industry === industry);
}

export function getResumeExamplesByExperience(level: ResumeExample['yearsExperience']): ResumeExample[] {
  return resumeExamples.filter((e) => e.yearsExperience === level);
}

export function getAllResumeExamples(): ResumeExample[] {
  return resumeExamples;
}

export function getEntryLevelExamples(): ResumeExample[] {
  return resumeExamples.filter((e) => e.yearsExperience === '0-1');
}

