/**
 * Cover Letter Templates Data
 * 
 * 6 industry-specific cover letter templates for flexible/hourly work.
 * Each template includes structure, example content, and customization tips.
 * 
 * Last Updated: February 2026
 */

export interface CoverLetterTemplate {
  id: string;
  slug: string;
  name: string;
  industry: string;
  description: string;
  bestFor: string[];
  structure: {
    section: string;
    purpose: string;
    wordCount: string;
    example: string;
  }[];
  tips: string[];
  keywords: string[];
  seoKeywords: string[];
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'hospitality',
    slug: 'hospitality',
    name: 'Hospitality & Food Service',
    industry: 'hospitality',
    description: 'A warm, personable cover letter template for restaurant, bar, and hotel positions. Emphasizes customer service skills and hospitality experience.',
    bestFor: ['Servers', 'Bartenders', 'Hosts', 'Bussers', 'Barbacks', 'Hotel Staff'],
    structure: [
      {
        section: 'Opening',
        purpose: 'Express enthusiasm for hospitality and the specific role',
        wordCount: '2-3 sentences',
        example: "I'm excited to apply for the Server position at [Restaurant Name]. With 2+ years of experience in fast-paced dining environments and a passion for creating memorable guest experiences, I'm confident I can contribute to your team's success.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Showcase relevant hospitality experience with specific achievements',
        wordCount: '3-4 sentences',
        example: "In my current role at [Previous Restaurant], I consistently maintain a 4.9-star guest rating while managing sections of up to 8 tables. I've developed expertise in wine pairings and upselling, increasing average check sizes by 15%. My ability to remain calm during peak hours while delivering exceptional service has earned me recognition as Employee of the Month twice.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Connect your skills to their needs',
        wordCount: '2-3 sentences',
        example: "I bring strong knowledge of POS systems, menu memorization abilities, and genuine warmth that keeps guests coming back. I'm also TIPS certified and hold a current Food Handler's Card, ensuring compliance with all health and safety regulations.",
      },
      {
        section: 'Closing',
        purpose: 'Express interest and call to action',
        wordCount: '2-3 sentences',
        example: "I would love the opportunity to bring my hospitality skills to [Restaurant Name] and contribute to your reputation for excellence. I'm available for an interview at your convenience and can start immediately. Thank you for considering my application.",
      },
    ],
    tips: [
      'Mention specific restaurants or hospitality experience',
      'Include your availability (weekends, nights, holidays)',
      'Reference any certifications (TIPS, ServSafe, Food Handler)',
      'Show personality - hospitality is about people',
      'Keep it to one page maximum',
    ],
    keywords: ['customer service', 'guest experience', 'fast-paced', 'team player', 'upselling', 'POS systems'],
    seoKeywords: ['hospitality cover letter', 'restaurant cover letter', 'server cover letter'],
  },
  {
    id: 'warehouse',
    slug: 'warehouse',
    name: 'Warehouse & Logistics',
    industry: 'industrial',
    description: 'A direct, efficient cover letter template for warehouse and logistics positions. Emphasizes reliability, physical capability, and attention to detail.',
    bestFor: ['Warehouse Operatives', 'Forklift Operators', 'Picker/Packers', 'Shipping/Receiving', 'General Labor'],
    structure: [
      {
        section: 'Opening',
        purpose: 'State the position and your relevant qualifications',
        wordCount: '2-3 sentences',
        example: "I am writing to apply for the Warehouse Associate position at [Company Name]. With 3 years of experience in high-volume distribution centers and a proven track record of exceeding productivity targets, I am well-prepared to contribute to your operations team.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Demonstrate warehouse experience with metrics',
        wordCount: '3-4 sentences',
        example: "At [Previous Employer], I consistently picked and packed 150+ orders per shift while maintaining 99.8% accuracy. I am certified to operate sit-down and stand-up forklifts, electric pallet jacks, and RF scanners. During peak season, I trained 5 new team members on warehouse procedures and safety protocols.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Highlight physical capabilities and reliability',
        wordCount: '2-3 sentences',
        example: "I pride myself on reliability—I haven't missed a shift in over a year and consistently arrive 10 minutes early. I'm comfortable lifting 50+ lbs repeatedly and thrive in fast-paced, physically demanding environments. Safety is my priority, and I've maintained a spotless safety record throughout my career.",
      },
      {
        section: 'Closing',
        purpose: 'Express availability and eagerness',
        wordCount: '2-3 sentences',
        example: "I am available to work any shift including nights, weekends, and holidays. I would welcome the opportunity to discuss how my experience can benefit [Company Name]. Thank you for your consideration.",
      },
    ],
    tips: [
      'Include specific productivity metrics if possible',
      'Mention equipment certifications (forklift, pallet jack)',
      'Emphasize reliability and attendance',
      'State your shift availability clearly',
      'Highlight safety record and training',
    ],
    keywords: ['productivity', 'accuracy', 'forklift certified', 'RF scanner', 'safety', 'reliable', 'team player'],
    seoKeywords: ['warehouse cover letter', 'logistics cover letter', 'forklift operator cover letter'],
  },
  {
    id: 'retail',
    slug: 'retail',
    name: 'Retail & Customer Service',
    industry: 'retail',
    description: 'A customer-focused cover letter template for retail positions. Emphasizes sales skills, product knowledge, and creating positive shopping experiences.',
    bestFor: ['Sales Associates', 'Cashiers', 'Stock Associates', 'Customer Service Reps', 'Visual Merchandisers'],
    structure: [
      {
        section: 'Opening',
        purpose: 'Show enthusiasm for the brand and role',
        wordCount: '2-3 sentences',
        example: "I'm thrilled to apply for the Sales Associate position at [Store Name]. As a long-time fan of your brand and a retail professional with 2 years of experience, I'm eager to combine my passion for your products with my customer service expertise.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Showcase retail experience and sales achievements',
        wordCount: '3-4 sentences',
        example: "In my current role at [Previous Store], I consistently exceed sales goals by 20% through personalized customer interactions and product recommendations. I've developed expertise in visual merchandising, helping to create displays that increased department sales by 15%. My approach focuses on building genuine relationships with customers, resulting in a loyal clientele who specifically request my assistance.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Connect retail skills to position requirements',
        wordCount: '2-3 sentences',
        example: "I bring strong skills in POS systems, inventory management, and loss prevention. I'm adaptable and have experience working across multiple departments, from fitting rooms to stockrooms. My friendly demeanor and product knowledge help customers find exactly what they need while maximizing store revenue.",
      },
      {
        section: 'Closing',
        purpose: 'Express interest and availability',
        wordCount: '2-3 sentences',
        example: "I would love to bring my retail expertise to [Store Name] and contribute to your team's success. I'm available for interviews and can provide flexible availability including weekends and holidays. Thank you for considering my application.",
      },
    ],
    tips: [
      'Research the brand and mention specific products or values',
      'Include sales metrics and achievements',
      'Mention holiday and weekend availability',
      'Show enthusiasm for customer interaction',
      'Reference any product expertise or certifications',
    ],
    keywords: ['sales goals', 'customer experience', 'merchandising', 'inventory', 'brand knowledge', 'POS', 'team player'],
    seoKeywords: ['retail cover letter', 'sales associate cover letter', 'customer service cover letter'],
  },
  {
    id: 'facilities',
    slug: 'facilities',
    name: 'Facilities & Cleaning',
    industry: 'facilities',
    description: 'A professional cover letter template for facilities management and cleaning positions. Emphasizes attention to detail, reliability, and maintenance skills.',
    bestFor: ['Housekeepers', 'Janitors', 'Facilities Technicians', 'Cleaning Staff', 'Maintenance Workers'],
    structure: [
      {
        section: 'Opening',
        purpose: 'State your interest and relevant experience',
        wordCount: '2-3 sentences',
        example: "I am writing to apply for the Housekeeper position at [Hotel/Company Name]. With 4 years of experience maintaining cleanliness standards in hotel and commercial settings, I am confident in my ability to uphold your property's reputation for excellence.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Demonstrate facilities experience with specific details',
        wordCount: '3-4 sentences',
        example: "At [Previous Employer], I maintained responsibility for cleaning and inspecting 18 rooms per 8-hour shift while consistently exceeding quality standards. I am proficient with industrial cleaning equipment and all major cleaning chemicals and protocols. My attention to detail has earned me recognition from management, and I regularly receive positive feedback from guests for the condition of my assigned areas.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Highlight reliability and professional standards',
        wordCount: '2-3 sentences',
        example: "I take pride in my work and understand that cleanliness directly impacts guest satisfaction and safety. I'm reliable, detail-oriented, and comfortable working independently while maintaining high standards. I also have experience with laundry operations, floor care, and minor maintenance tasks.",
      },
      {
        section: 'Closing',
        purpose: 'Express availability and commitment',
        wordCount: '2-3 sentences',
        example: "I am available to work any shift and can start immediately. I would appreciate the opportunity to discuss how my experience and work ethic can benefit your team. Thank you for your time and consideration.",
      },
    ],
    tips: [
      'Emphasize attention to detail and thoroughness',
      'Mention specific cleaning protocols or equipment experience',
      'Highlight reliability and work ethic',
      'Include any safety training or certifications',
      'Reference positive feedback or recognition',
    ],
    keywords: ['attention to detail', 'reliable', 'thorough', 'cleaning protocols', 'safety standards', 'independent worker'],
    seoKeywords: ['housekeeping cover letter', 'cleaning job cover letter', 'facilities cover letter'],
  },
  {
    id: 'events',
    slug: 'events',
    name: 'Events & Entertainment',
    industry: 'events',
    description: 'An energetic, professional cover letter template for event and entertainment positions. Emphasizes adaptability, customer service, and ability to work in dynamic environments.',
    bestFor: ['Event Staff', 'Brand Ambassadors', 'Concert Security', 'Convention Staff', 'Banquet Servers'],
    structure: [
      {
        section: 'Opening',
        purpose: 'Show enthusiasm for events and dynamic work',
        wordCount: '2-3 sentences',
        example: "I'm excited to apply for the Event Staff position with [Company Name]. With a background in hospitality and experience working major events including concerts, sporting events, and conventions, I thrive in fast-paced, guest-focused environments.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Showcase event experience and adaptability',
        wordCount: '3-4 sentences',
        example: "I have worked over 50 events ranging from intimate corporate gatherings to stadium concerts with 40,000+ attendees. At [Previous Company], I served as team lead for setup and teardown crews, coordinating 8-person teams to meet tight deadlines. I'm experienced in guest services, crowd management, merchandise sales, and catering support—allowing me to fill any role needed.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Highlight flexibility and customer service',
        wordCount: '2-3 sentences',
        example: "I bring energy, professionalism, and a positive attitude to every event. I'm comfortable on my feet for 10+ hour shifts and excel at thinking quickly when unexpected situations arise. My goal is always to ensure guests have an exceptional experience while supporting seamless event operations.",
      },
      {
        section: 'Closing',
        purpose: 'Express availability for event schedules',
        wordCount: '2-3 sentences',
        example: "I'm available for events on weeknights, weekends, and holidays—whenever your clients need support. I would love to discuss how my event experience can contribute to your team. Thank you for considering my application.",
      },
    ],
    tips: [
      'Mention specific types of events you\'ve worked',
      'Emphasize flexibility with scheduling',
      'Highlight ability to handle large crowds',
      'Reference any specialized training (crowd management, first aid)',
      'Show enthusiasm and energy in your writing',
    ],
    keywords: ['event experience', 'adaptable', 'guest services', 'crowd management', 'team player', 'flexible schedule'],
    seoKeywords: ['event staff cover letter', 'entertainment cover letter', 'banquet server cover letter'],
  },
  {
    id: 'general',
    slug: 'general',
    name: 'General Purpose',
    industry: 'general',
    description: 'A versatile cover letter template that works for any hourly position. Easily customizable and suitable for multiple applications.',
    bestFor: ['Any hourly role', 'Career changers', 'Entry-level positions', 'Multiple applications'],
    structure: [
      {
        section: 'Opening',
        purpose: 'State the position and your interest',
        wordCount: '2-3 sentences',
        example: "I am writing to express my interest in the [Position Title] role at [Company Name]. With my background in [relevant experience] and commitment to delivering excellent work, I believe I would be a valuable addition to your team.",
      },
      {
        section: 'Experience Highlight',
        purpose: 'Showcase transferable experience and achievements',
        wordCount: '3-4 sentences',
        example: "In my previous role at [Previous Employer], I developed skills in [relevant skill 1] and [relevant skill 2] while consistently meeting or exceeding expectations. I am known for my reliability, positive attitude, and ability to learn quickly. My experience has taught me the importance of teamwork, communication, and taking initiative.",
      },
      {
        section: 'Skills & Value',
        purpose: 'Connect your skills to the job requirements',
        wordCount: '2-3 sentences',
        example: "I bring strong [key skill] abilities and am comfortable working in [relevant environment—fast-paced, team-oriented, customer-facing, etc.]. I'm a quick learner and take pride in delivering quality work every day. I'm confident that my skills and work ethic would be an asset to [Company Name].",
      },
      {
        section: 'Closing',
        purpose: 'Express availability and call to action',
        wordCount: '2-3 sentences',
        example: "I am available to start immediately and can work [your availability]. I would welcome the opportunity to discuss how I can contribute to your team. Thank you for considering my application.",
      },
    ],
    tips: [
      'Customize for each application—change company name and role',
      'Match keywords from the job description',
      'Keep it concise—one page maximum',
      'Proofread carefully before sending',
      'State your availability clearly',
    ],
    keywords: ['reliable', 'team player', 'quick learner', 'hard worker', 'customer service', 'attention to detail'],
    seoKeywords: ['cover letter template', 'general cover letter', 'hourly job cover letter'],
  },
];

// Helper functions
export function getCoverLetterBySlug(slug: string): CoverLetterTemplate | undefined {
  return coverLetterTemplates.find((t) => t.slug === slug);
}

export function getCoverLettersByIndustry(industry: string): CoverLetterTemplate[] {
  return coverLetterTemplates.filter((t) => t.industry === industry || t.industry === 'general');
}

export function getAllCoverLetters(): CoverLetterTemplate[] {
  return coverLetterTemplates;
}

