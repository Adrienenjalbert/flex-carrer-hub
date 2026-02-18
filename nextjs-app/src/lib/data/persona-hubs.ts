/**
 * Persona Hubs Data
 * 
 * User-centric content hubs that aggregate relevant guides, tools, and resources
 * by persona type. These pages serve as taxonomy pages linking related content.
 * 
 * Last Updated: February 2026
 */

export interface PersonaHub {
  slug: string;
  title: string;
  headline: string;
  description: string;
  metaDescription: string;
  heroImage?: string;
  
  // Content aggregation
  relatedGuides: string[];
  recommendedTools: string[];
  suggestedRoles: string[];
  resumeTemplates: string[];
  coverLetterTemplates: string[];
  
  // Persona-specific content
  painPoints: string[];
  solutions: string[];
  quickTips: string[];
  
  // FAQs for SEO
  faqs: { question: string; answer: string }[];
  
  // SEO
  seoKeywords: string[];
  targetSearchIntent: string[];
}

export const personaHubs: PersonaHub[] = [
  {
    slug: 'students',
    title: 'Flexible Jobs for Students',
    headline: 'Balance School and Work with Flexible Shifts',
    description: 'Find flexible work that fits around your class schedule. No experience required for many roles. Build skills, earn money, and start your career while studying.',
    metaDescription: 'Find flexible student jobs that work around your class schedule. Entry-level positions, no experience required. Start earning today with Indeed Flex.',
    
    relatedGuides: [
      'first-flex-job',
      'student-jobs-fall',
      'resume-tips',
      'interview-skills',
      'first-shift',
      'worker-profile',
      'more-shifts',
    ],
    recommendedTools: [
      'pay-calculator',
      'shift-planner',
      'tax-calculator',
      'commute-calculator',
    ],
    suggestedRoles: [
      'picker-packer',
      'host',
      'retail-assistant',
      'food-runner',
      'dishwasher',
      'barback',
      'event-staff',
      'brand-ambassador',
    ],
    resumeTemplates: ['entry-level', 'simple', 'modern'],
    coverLetterTemplates: ['general', 'retail', 'hospitality'],
    
    painPoints: [
      'Class schedules that change every semester',
      'No work experience to put on resume',
      'Need income but can\'t commit to fixed hours',
      'Don\'t know how to start job searching',
      'Worried about balancing work and grades',
    ],
    solutions: [
      'Pick shifts around your class schedule - work when you want',
      'Entry-level roles require no experience - just show up ready to work',
      'No minimum hours - work 5 hours or 40, your choice',
      'Apply through the Indeed Flex app in minutes',
      'One shift at a time means you control your workload',
    ],
    quickTips: [
      'Block your class times in the app so you only see shifts that fit',
      'Start with weekend shifts to build ratings without class conflicts',
      'Use the Shift Planner to set earnings goals around tuition deadlines',
      'Ask about on-campus or near-campus opportunities',
      'Build your resume with real work experience before graduation',
    ],
    
    faqs: [
      {
        question: 'Can I work flexible jobs with no experience?',
        answer: 'Yes! Many Indeed Flex roles require no prior experience. Roles like picker/packer, dishwasher, food runner, and event staff are designed for first-time workers. You\'ll receive training and can start building your work history immediately.',
      },
      {
        question: 'How do I fit work around my class schedule?',
        answer: 'Indeed Flex lets you pick individual shifts that work for you. Set your availability in the app around your classes, and only see shifts that don\'t conflict. You can work weekends, evenings, or between classes - whatever fits your schedule.',
      },
      {
        question: 'How much can students earn with flexible work?',
        answer: 'Entry-level flexible roles typically pay $14-20/hour depending on the role and location. Many students earn $200-500/week working part-time around classes. Use our Pay Calculator to estimate earnings based on your expected hours.',
      },
      {
        question: 'Do flexible jobs count as real work experience?',
        answer: 'Absolutely! Flexible work builds real, transferable skills like customer service, reliability, teamwork, and time management. These experiences belong on your resume and demonstrate to future employers that you can balance responsibilities.',
      },
      {
        question: 'What documents do I need to work?',
        answer: 'You\'ll need valid ID (driver\'s license, passport, or state ID) and documents proving work authorization (Social Security card, birth certificate, or work permit). See our I-9 guide for the complete list of acceptable documents.',
      },
      {
        question: 'Can I work during summer and winter breaks?',
        answer: 'Yes! In fact, breaks are great times to pick up extra shifts. Holiday seasons and summer bring increased demand for warehouse, retail, and hospitality workers. Many students earn significant money during peak seasons.',
      },
    ],
    
    seoKeywords: [
      'student jobs',
      'flexible jobs for students',
      'part-time student work',
      'jobs around class schedule',
      'no experience jobs',
      'first job for students',
      'college student jobs',
      'work study alternatives',
    ],
    targetSearchIntent: [
      'part time jobs for college students',
      'jobs for students with no experience',
      'flexible work around class schedule',
      'how to get first job as student',
      'jobs that work with school schedule',
    ],
  },
  
  {
    slug: 'career-changers',
    title: 'Flexible Work for Career Changers',
    headline: 'Explore New Industries with Flexible Shifts',
    description: 'Thinking about a career change? Test new industries without long-term commitment. Build skills in hospitality, warehouse, retail, or events while you figure out your next move.',
    metaDescription: 'Explore new career paths with flexible shifts. Try hospitality, warehouse, or retail roles without commitment. Build transferable skills with Indeed Flex.',
    
    relatedGuides: [
      'career-paths',
      'skill-boost',
      'certifications',
      'temp-to-perm-guide',
      'networking',
      'hospitality-guide',
      'warehouse-guide',
      'retail-guide',
    ],
    recommendedTools: [
      'career-path',
      'skills-analyzer',
      'certification-roi',
      'job-offer-analyzer',
      'pay-calculator',
    ],
    suggestedRoles: [
      'warehouse-operative',
      'server',
      'retail-assistant',
      'shipping-receiving',
      'banquet-server',
      'forklift-driver',
    ],
    resumeTemplates: ['professional', 'modern', 'ats-friendly'],
    coverLetterTemplates: ['general', 'warehouse', 'hospitality'],
    
    painPoints: [
      'Burned out in current career but unsure what\'s next',
      'Worried about starting over at entry-level',
      'Need income while exploring new paths',
      'Don\'t know which industry suits me',
      'Concerned about gaps on resume',
    ],
    solutions: [
      'Try different industries through short-term shifts - no commitment',
      'Your existing skills transfer - customer service, organization, problem-solving',
      'Earn full-time income while testing new career directions',
      'Work in hospitality, warehouse, retail, or events to see what fits',
      'Fill gaps with consistent work while you pivot',
    ],
    quickTips: [
      'Use the Skills Analyzer to identify your transferable skills',
      'Take the Career Path Explorer to see progression options in new industries',
      'Start with roles adjacent to your interests to test the waters',
      'Ask supervisors about permanent opportunities if you like the work',
      'Get certifications (forklift, ServSafe) to open more doors',
    ],
    
    faqs: [
      {
        question: 'Can I use flexible work to explore new careers?',
        answer: 'Absolutely! Flexible work is perfect for career exploration. You can try shifts in hospitality, warehouse, retail, or events without committing long-term. This lets you experience different work environments and discover what you enjoy before making a full career pivot.',
      },
      {
        question: 'Will my previous experience count for anything?',
        answer: 'Yes! Many skills transfer across industries. Customer service, communication, problem-solving, organization, and reliability are valuable everywhere. Higher-skilled roles may also be available based on your background. Use our Skills Analyzer to identify your transferable skills.',
      },
      {
        question: 'Can flexible work lead to permanent positions?',
        answer: 'Many businesses use Indeed Flex to find permanent hires. If you perform well and express interest, you may receive offers to join full-time. We also have a temp-to-perm guide with strategies for transitioning from flexible to permanent roles.',
      },
      {
        question: 'How do I explain flexible work on my resume?',
        answer: 'List your flexible work experience just like any other job. Focus on skills developed, responsibilities held, and achievements earned. Employers value reliability, adaptability, and willingness to work - all demonstrated through flexible work.',
      },
      {
        question: 'What industries can I try through flexible work?',
        answer: 'Indeed Flex offers shifts in hospitality (restaurants, bars, hotels), industrial (warehouses, distribution centers), retail (stores, merchandising), and facilities (cleaning, maintenance). Each offers different work styles and career paths to explore.',
      },
      {
        question: 'Can I work flexible shifts while job searching?',
        answer: 'Yes! Many career changers use flexible work for income while actively job searching. You control your schedule, so you can take days off for interviews. Plus, the experience and references you build can help your job search.',
      },
    ],
    
    seoKeywords: [
      'career change jobs',
      'switching careers',
      'career transition',
      'try new industry',
      'career exploration',
      'mid-career change',
      'career pivot jobs',
      'transferable skills jobs',
    ],
    targetSearchIntent: [
      'jobs for career changers',
      'how to switch careers',
      'try new career without commitment',
      'best jobs for career transition',
      'work while changing careers',
    ],
  },
  
  {
    slug: 'gig-workers',
    title: 'Resources for Gig & Flexible Workers',
    headline: 'Maximize Your Earnings as a Flexible Worker',
    description: 'Already working gigs? Expand your opportunities with Indeed Flex. Access W-2 shifts with benefits, calculate taxes, plan earnings, and grow your flexible work income.',
    metaDescription: 'Resources for gig workers: W-2 shifts with benefits, tax calculators, earnings planners, and tips to maximize your flexible work income with Indeed Flex.',
    
    relatedGuides: [
      'more-shifts',
      'skill-boost',
      'certifications',
      'multiple-gigs',
      'complete-guide',
      'shift-rating-tips',
    ],
    recommendedTools: [
      'pay-calculator',
      'tax-calculator',
      'shift-planner',
      'benefits-checker',
      'commute-calculator',
      'unemployment-calculator',
    ],
    suggestedRoles: [
      'bartender',
      'forklift-driver',
      'server',
      'warehouse-operative',
      'delivery-driver',
      'event-staff',
    ],
    resumeTemplates: ['modern', 'professional', 'ats-friendly'],
    coverLetterTemplates: ['hospitality', 'warehouse', 'events'],
    
    painPoints: [
      '1099 work means no benefits and tax headaches',
      'Income is unpredictable month to month',
      'Hard to plan finances with variable earnings',
      'Burnt out juggling multiple platforms',
      'Want more stability without losing flexibility',
    ],
    solutions: [
      'Indeed Flex offers W-2 employment with benefits - taxes handled for you',
      'Same Day Pay lets you access earnings when you need them',
      'Shift Income Planner helps you hit weekly/monthly goals',
      'One app, multiple industries - consolidate your gig life',
      'Work as much or as little as you want, with employment protections',
    ],
    quickTips: [
      'Get certified (forklift, TIPS) to access higher-paying shifts',
      'Build Talent Pool relationships for consistent, repeat work',
      'Use Same Day Pay strategically to manage cash flow',
      'Track your mileage and expenses if also doing 1099 work',
      'Aim for 5-star ratings to unlock premium shift access',
    ],
    
    faqs: [
      {
        question: 'How is Indeed Flex different from other gig platforms?',
        answer: 'Indeed Flex provides W-2 employment, meaning your taxes are withheld automatically and you\'re eligible for benefits. Unlike 1099 gig work, you don\'t have to pay self-employment tax or file quarterly. Plus, you get access to medical, dental, and vision benefits.',
      },
      {
        question: 'Can I do Indeed Flex alongside other gig work?',
        answer: 'Yes! Many workers combine Indeed Flex shifts with other gig work like rideshare or delivery. Flex offers W-2 income that balances 1099 work and provides benefits. Just be mindful of tax implications when mixing income types.',
      },
      {
        question: 'How does Same Day Pay work?',
        answer: 'After completing a shift, you can access up to 50% of your earnings within 1 hour through the Indeed Flex app. The remaining balance is paid on your regular pay schedule. This helps manage cash flow without high-fee payday loans.',
      },
      {
        question: 'What benefits are available to flexible workers?',
        answer: 'Indeed Flex offers access to medical, dental, and vision insurance through Essential StaffCARE. Eligibility depends on hours worked. Use our Benefits Checker tool to see what you may qualify for based on your expected hours.',
      },
      {
        question: 'How much can I realistically earn with flexible work?',
        answer: 'Earnings vary by role, location, and hours. Warehouse roles typically pay $16-22/hour, hospitality $14-25/hour (plus tips for tipped roles), and specialized roles like forklift operators can earn $18-25/hour. Use our Pay Calculator for personalized estimates.',
      },
      {
        question: 'How do taxes work with W-2 flexible work?',
        answer: 'As a W-2 employee, Indeed Flex withholds federal and state taxes from each paycheck. You\'ll receive a W-2 at tax time - no quarterly estimated payments required. Our Tax Calculator can help you understand your take-home pay.',
      },
    ],
    
    seoKeywords: [
      'gig worker resources',
      'flexible work benefits',
      'W-2 gig work',
      'gig economy jobs',
      'maximize gig earnings',
      'gig worker taxes',
      'same day pay jobs',
      'flexible work with benefits',
    ],
    targetSearchIntent: [
      'gig jobs with benefits',
      'W-2 gig work',
      'how to make more money gig work',
      'gig worker tax calculator',
      'same day pay flexible jobs',
    ],
  },
  
  {
    slug: 'parents',
    title: 'Flexible Jobs for Working Parents',
    headline: 'Work Around Your Family Schedule',
    description: 'Need work that fits around school drop-offs, childcare, and family life? Find shifts that work with your schedule, calculate if working is worth it, and maintain income without sacrificing family time.',
    metaDescription: 'Flexible jobs for parents that work around school schedules and childcare. Calculate earnings vs childcare costs, find family-friendly shifts with Indeed Flex.',
    
    relatedGuides: [
      'first-flex-job',
      'more-shifts',
      'complete-guide',
      'multiple-gigs',
      'temp-to-perm-guide',
    ],
    recommendedTools: [
      'childcare-calculator',
      'pay-calculator',
      'shift-planner',
      'commute-calculator',
      'benefits-checker',
      'tax-calculator',
    ],
    suggestedRoles: [
      'picker-packer',
      'housekeeper',
      'retail-assistant',
      'cashier',
      'warehouse-operative',
      'janitor',
    ],
    resumeTemplates: ['entry-level', 'professional', 'simple'],
    coverLetterTemplates: ['general', 'facilities', 'retail'],
    
    painPoints: [
      'Childcare costs eat up most of paycheck',
      'Traditional jobs don\'t fit school schedules',
      'Career gaps from time with kids',
      'Need flexibility for sick days and emergencies',
      'Returning to work after time away is hard',
    ],
    solutions: [
      'Use Childcare Calculator to find your true break-even point',
      'Pick shifts during school hours or after bedtime',
      'Flexible work fills resume gaps without long-term commitment',
      'No penalties for skipping shifts - family comes first',
      'Start slow and build up as your situation allows',
    ],
    quickTips: [
      'Look for morning shifts (6AM-2PM) that end before school pickup',
      'Evening/night warehouse shifts work while partner watches kids',
      'School-hour cleaning jobs are perfect for parents',
      'Ask about same-day cancellation policies for emergencies',
      'Start with 2-3 shifts per week to test your capacity',
    ],
    
    faqs: [
      {
        question: 'Is working worth it after childcare costs?',
        answer: 'It depends on your situation. Use our Childcare Break-Even Calculator to compare your potential earnings against childcare costs, including tax credits you may qualify for. For many parents, flexible work with strategic scheduling (school hours, evenings) makes working worthwhile.',
      },
      {
        question: 'What if my child gets sick and I can\'t make a shift?',
        answer: 'Indeed Flex understands that life happens. While you should avoid last-minute cancellations when possible, occasional emergencies won\'t end your access to shifts. Communication is key - contact support if you have an emergency.',
      },
      {
        question: 'What shifts work best for parents?',
        answer: 'Popular parent-friendly shifts include: morning warehouse shifts (6AM-2PM) before school pickup, school-hour cleaning jobs (9AM-2PM), evening retail shifts after partner is home, and weekend shifts when family can watch kids. Filter by time in the app to find what works.',
      },
      {
        question: 'How do I explain a career gap from parenting?',
        answer: 'Parenting is real work! On your resume, you can note "Family Caregiver" for the gap period. Focus on transferable skills gained (organization, multi-tasking, problem-solving). Flexible work experience also helps demonstrate you\'re ready to work.',
      },
      {
        question: 'Can I get health insurance through flexible work?',
        answer: 'Indeed Flex offers access to medical, dental, and vision insurance through Essential StaffCARE based on hours worked. Use our Benefits Checker to see eligibility. This can be valuable for families who need coverage outside of a partner\'s plan.',
      },
      {
        question: 'How do I re-enter the workforce after being home with kids?',
        answer: 'Flexible work is ideal for workforce re-entry. Start with a few shifts per week to rebuild confidence and routine. Choose entry-level roles initially, then work up as you gain ratings and references. Our re-entry guide has detailed strategies.',
      },
    ],
    
    seoKeywords: [
      'jobs for parents',
      'flexible work for moms',
      'work around school schedule',
      'part time parent jobs',
      'work life balance jobs',
      'return to work after kids',
      'school hour jobs',
      'family friendly jobs',
    ],
    targetSearchIntent: [
      'jobs that work around school schedule',
      'is working worth it after childcare',
      'flexible jobs for stay at home moms',
      'part time jobs for parents',
      'how to return to work after kids',
    ],
  },
  
  {
    slug: 'retirees',
    title: 'Flexible Work for Retirees & Seniors',
    headline: 'Stay Active and Earn Extra Income',
    description: 'Looking for meaningful work in retirement? Find flexible shifts that keep you active, supplement your income, and let you work on your own terms without impacting benefits.',
    metaDescription: 'Flexible jobs for retirees and seniors. Supplement retirement income, stay active, work when you want. Part-time opportunities with Indeed Flex.',
    
    relatedGuides: [
      'first-flex-job',
      'complete-guide',
      'first-shift',
      'retail-guide',
      'facilities-guide',
    ],
    recommendedTools: [
      'pay-calculator',
      'tax-calculator',
      'benefits-checker',
      'shift-planner',
    ],
    suggestedRoles: [
      'retail-assistant',
      'host',
      'cashier',
      'housekeeper',
      'event-staff',
    ],
    resumeTemplates: ['professional', 'simple', 'ats-friendly'],
    coverLetterTemplates: ['general', 'retail', 'facilities'],
    
    painPoints: [
      'Bored in retirement, want something to do',
      'Fixed income not covering expenses',
      'Worried about impacting Social Security',
      'Physical limitations from age',
      'Feeling disconnected from community',
    ],
    solutions: [
      'Work as much or as little as you want - stay engaged',
      'Supplement retirement with flexible earnings',
      'Work within Social Security earnings limits with shift planning',
      'Choose roles matching your physical capabilities',
      'Connect with diverse people and stay social',
    ],
    quickTips: [
      'Track earnings carefully if collecting Social Security before full retirement age',
      'Start with lighter roles (host, cashier, retail) before physical jobs',
      'Morning shifts often work well with retiree schedules',
      'Your experience and reliability are highly valued by employers',
      'Use flexible work for purpose without full-time commitment',
    ],
    
    faqs: [
      {
        question: 'Will working affect my Social Security benefits?',
        answer: 'It depends on your age and earnings. Before full retirement age (currently 66-67), earnings above ~$22,320/year (2026) may reduce benefits temporarily. After full retirement age, there\'s no earnings limit. Use our Pay Calculator to estimate earnings and plan accordingly.',
      },
      {
        question: 'What jobs are good for seniors with physical limitations?',
        answer: 'Many flexible roles are suitable for those with physical limitations. Host/hostess, cashier, and retail greeter roles involve mostly standing with minimal lifting. Consider your comfort level and look for roles that match your capabilities.',
      },
      {
        question: 'Do I need to be tech-savvy to use Indeed Flex?',
        answer: 'The Indeed Flex app is designed to be user-friendly. If you can use a smartphone to text or check email, you can use the app. The process is straightforward: browse shifts, tap to apply, and clock in/out. Support is available if you need help.',
      },
      {
        question: 'How is working in retirement different from my career?',
        answer: 'Flexible work offers freedom your career may not have. You choose your hours, skip weeks if you want, and work in different environments. There\'s no office politics or long-term stress - just show up, do good work, and go home.',
      },
      {
        question: 'What are the benefits of working in retirement?',
        answer: 'Beyond extra income, working in retirement provides structure, social connection, mental stimulation, and physical activity. Many retirees find that part-time work improves their overall well-being and sense of purpose.',
      },
    ],
    
    seoKeywords: [
      'jobs for retirees',
      'senior part time jobs',
      'retirement jobs',
      'work in retirement',
      'jobs for 60 year olds',
      'flexible work for seniors',
      'part time jobs for seniors',
      'supplemental income retirement',
    ],
    targetSearchIntent: [
      'best jobs for retirees',
      'part time work after retirement',
      'jobs that dont affect social security',
      'flexible jobs for seniors',
      'how much can I work on social security',
    ],
  },
];

// Helper functions
export function getPersonaHub(slug: string): PersonaHub | undefined {
  return personaHubs.find((p) => p.slug === slug);
}

export function getAllPersonaHubs(): PersonaHub[] {
  return personaHubs;
}

export function getPersonaSlugs(): string[] {
  return personaHubs.map((p) => p.slug);
}

