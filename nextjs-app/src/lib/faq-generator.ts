// Generate comprehensive FAQs for any role
export interface GeneratedFAQ {
  question: string;
  answer: string;
}

interface RoleData {
  title: string;
  industry: string;
  avgHourlyRate: { min: number; max: number };
  skills: string[];
  requirements: string[];
  responsibilities: string[];
  careerPath: { role: string; years: string }[];
  faqs: { question: string; answer: string }[];
}

export const generateComprehensiveFAQs = (role: RoleData): GeneratedFAQ[] => {
  const faqs: GeneratedFAQ[] = [];
  
  // 1. Salary FAQ
  faqs.push({
    question: `How much do ${role.title}s make per hour?`,
    answer: `${role.title}s typically earn between $${role.avgHourlyRate.min} and $${role.avgHourlyRate.max} per hour. Your actual pay depends on experience, location, shift timing, and the specific employer. With Indeed Flex, you can see the exact pay rate before accepting any shift.`
  });

  // 2. Experience FAQ
  faqs.push({
    question: `Do I need experience to become a ${role.title}?`,
    answer: `Many ${role.title} positions are entry-level friendly. While some experience is helpful, Indeed Flex offers opportunities for beginners. Key requirements include: ${role.requirements.slice(0, 2).join(', ')}. Most employers provide on-the-job training.`
  });

  // 3. Skills FAQ
  faqs.push({
    question: `What skills do I need to work as a ${role.title}?`,
    answer: `Essential skills for ${role.title}s include: ${role.skills.join(', ')}. You don't need to master all these skills immediately—many can be developed on the job.`
  });

  // 4. Typical Day FAQ
  faqs.push({
    question: `What does a typical day look like for a ${role.title}?`,
    answer: `As a ${role.title}, your daily tasks typically include: ${role.responsibilities.slice(0, 3).join('; ')}. Shifts vary by employer but generally range from 4-10 hours.`
  });

  // 5. Career Growth FAQ
  faqs.push({
    question: `What career advancement opportunities exist for ${role.title}s?`,
    answer: `The career path for ${role.title}s is promising. You can progress from ${role.careerPath.map(c => c.role).join(' → ')}. Many people advance to supervisory and management roles within ${role.careerPath[role.careerPath.length - 1]?.years || '5+ years'}.`
  });

  // 6. Flexible Work FAQ
  faqs.push({
    question: `Can I work as a ${role.title} with a flexible schedule?`,
    answer: `Yes! Indeed Flex specializes in flexible ${role.title} work. You can choose shifts that fit your schedule—whether you prefer mornings, evenings, weekends, or specific days. There's no minimum hours requirement.`
  });

  // 7. Getting Started FAQ
  faqs.push({
    question: `How do I get started as a ${role.title} with Indeed Flex?`,
    answer: `Getting started is easy: 1) Download the Indeed Flex app, 2) Create your profile and verify your identity, 3) Browse available ${role.title} shifts in your area, 4) Accept shifts that work for you, 5) Show up and get paid weekly. Most workers book their first shift within 48 hours of signing up.`
  });

  // 8. Pay Frequency FAQ
  faqs.push({
    question: `How often do ${role.title}s get paid through Indeed Flex?`,
    answer: `Indeed Flex workers are paid weekly via direct deposit. Some shifts may offer same-day or next-day pay options. You'll always know exactly how much you'll earn before accepting any shift.`
  });

  // 9. Industry-specific FAQ
  faqs.push({
    question: `What types of businesses hire ${role.title}s?`,
    answer: `${role.title}s work across the ${role.industry} industry. Common employers include ${getIndustryEmployers(role.industry)}. Indeed Flex partners with many top employers in your area.`
  });

  // 10. Physical Requirements FAQ
  faqs.push({
    question: `What are the physical requirements for ${role.title} work?`,
    answer: `${role.title} positions typically require: ${getPhysicalRequirements(role)}. Specific requirements vary by employer and are listed in each shift description.`
  });

  // 11. Certifications FAQ
  faqs.push({
    question: `Do I need any certifications to work as a ${role.title}?`,
    answer: `${getCertificationAnswer(role)}. Indeed Flex clearly lists any required certifications for each shift, and some employers help workers obtain necessary certifications.`
  });

  // 12. Multiple Shifts FAQ
  faqs.push({
    question: `Can I work multiple ${role.title} shifts per week?`,
    answer: `Absolutely! You control how much you work. Some workers pick up 1-2 shifts per week for extra income, while others work full-time hours. Indeed Flex lets you build the schedule that works for you.`
  });

  // Add any existing role-specific FAQs
  role.faqs.forEach(faq => {
    // Avoid duplicates by checking if similar question exists
    if (!faqs.some(f => f.question.toLowerCase().includes(faq.question.toLowerCase().slice(0, 20)))) {
      faqs.push(faq);
    }
  });

  return faqs.slice(0, 15); // Return up to 15 FAQs
};

// City+Role specific FAQ generator
export interface CityRoleFAQData {
  city: string;
  stateCode: string;
  roleTitle: string;
  localSalary: { min: number; max: number };
  topIndustries: string[];
  costOfLivingIndex: number;
  rentOneBed: number;
  requirements: string[];
  skills: string[];
  industry: string;
  metroArea?: string;
}

export const generateCityRoleFAQs = (data: CityRoleFAQData): GeneratedFAQ[] => {
  const avgHourly = (data.localSalary.min + data.localSalary.max) / 2;
  const hoursForRent = Math.ceil((data.rentOneBed / avgHourly) / 4);
  
  return [
    {
      question: `How much do ${data.roleTitle}s make in ${data.city}, ${data.stateCode}?`,
      answer: `${data.roleTitle}s in ${data.city} typically earn between $${data.localSalary.min.toFixed(2)} and $${data.localSalary.max.toFixed(2)} per hour. Pay varies based on experience, employer, and shift timing. With Indeed Flex, you can see exact pay rates before accepting shifts.`
    },
    {
      question: `What are the requirements to work as a ${data.roleTitle} in ${data.city}?`,
      answer: `Requirements for ${data.roleTitle} positions in ${data.city} include: ${data.requirements.slice(0, 3).join(', ')}. Most employers provide on-the-job training for entry-level candidates.`
    },
    {
      question: `Are there ${data.roleTitle} jobs available in ${data.city} right now?`,
      answer: `Yes! ${data.city} has an active market for ${data.roleTitle} positions, especially in the ${data.topIndustries.slice(0, 2).join(' and ')} sectors. Download the Indeed Flex app to browse available shifts in your area.`
    },
    {
      question: `What skills do I need to become a ${data.roleTitle} in ${data.city}?`,
      answer: `Key skills for ${data.roleTitle}s in ${data.city} include: ${data.skills.slice(0, 4).join(', ')}. The ${data.industry} industry in ${data.city} particularly values these competencies.`
    },
    {
      question: `Is ${data.city} a good place to work as a ${data.roleTitle}?`,
      answer: `${data.city} offers ${data.costOfLivingIndex < 100 ? 'below-average' : data.costOfLivingIndex > 105 ? 'above-average' : 'average'} cost of living with strong demand for ${data.roleTitle}s. The city's ${data.topIndustries[0]} and ${data.topIndustries[1]} sectors provide consistent opportunities.`
    },
    {
      question: `What shifts are available for ${data.roleTitle}s in ${data.city}?`,
      answer: `${data.roleTitle} shifts in ${data.city} are available across morning, afternoon, evening, and overnight schedules. ${data.industry === 'hospitality' ? 'Weekend and evening shifts often offer higher pay.' : data.industry === 'industrial' ? 'Warehouse shifts are available 24/7, with night shifts often paying premiums.' : 'Shift availability varies by employer and season.'}`
    },
    {
      question: `How do I get started as a ${data.roleTitle} in ${data.city}?`,
      answer: `Getting started is easy: 1) Download the Indeed Flex app, 2) Complete your profile and any required training, 3) Browse ${data.roleTitle} shifts in ${data.city}, 4) Accept shifts that fit your schedule and start earning. Many workers complete their first shift within a week of signing up.`
    },
    {
      question: `What is the cost of living like in ${data.city} for ${data.roleTitle}s?`,
      answer: `${data.city}'s cost of living index is ${data.costOfLivingIndex} (100 = national average). Average rent for a one-bedroom is $${data.rentOneBed}/month. At the average ${data.roleTitle} wage, you'd need to work approximately ${hoursForRent} hours per week to cover rent.`
    },
    {
      question: `Can I work as a ${data.roleTitle} while studying in ${data.city}?`,
      answer: `Absolutely! Many ${data.roleTitle}s in ${data.city} work flexible schedules around their studies. Indeed Flex lets you pick shifts that work for you, with no minimum hours required. This makes it ideal for students at ${data.metroArea ? `colleges in the ${data.metroArea} area` : `${data.city} area schools`}.`
    },
    {
      question: `What are the busiest times for ${data.roleTitle} work in ${data.city}?`,
      answer: `${data.industry === 'hospitality' ? `Peak times include weekends, holidays, and special events. ${data.city}'s tourism season creates additional opportunities.` : data.industry === 'industrial' ? `Warehouse demand peaks during holiday seasons (October-December) and major sales events. ${data.city}'s logistics sector stays busy year-round.` : `Demand varies by season and employer needs. Check the Indeed Flex app for real-time availability in ${data.city}.`}`
    }
  ];
};

// Helper functions
function getIndustryEmployers(industry: string): string {
  const employers: Record<string, string> = {
    hospitality: 'restaurants, hotels, catering companies, event venues, bars, and cafes',
    industrial: 'warehouses, distribution centers, manufacturing facilities, and logistics companies',
    retail: 'department stores, grocery stores, specialty retailers, and e-commerce fulfillment centers',
    facilities: 'office buildings, hospitals, schools, shopping centers, and corporate campuses'
  };
  return employers[industry] || 'various businesses in the industry';
}

function getPhysicalRequirements(role: RoleData): string {
  const reqs: string[] = [];
  
  if (role.requirements.some(r => r.toLowerCase().includes('stand'))) {
    reqs.push('standing for extended periods');
  }
  if (role.requirements.some(r => r.toLowerCase().includes('lift'))) {
    reqs.push('lifting up to 50 lbs');
  }
  if (role.requirements.some(r => r.toLowerCase().includes('walk'))) {
    reqs.push('walking throughout the shift');
  }
  
  if (reqs.length === 0) {
    return 'ability to perform job duties safely. Most roles involve some standing and light physical activity';
  }
  
  return reqs.join(', ');
}

function getCertificationAnswer(role: RoleData): string {
  const certReqs = role.requirements.filter(r => 
    r.toLowerCase().includes('certification') || 
    r.toLowerCase().includes('license') ||
    r.toLowerCase().includes('tips') ||
    r.toLowerCase().includes('food handler')
  );
  
  if (certReqs.length > 0) {
    return `Some ${role.title} positions require: ${certReqs.join('; ')}`;
  }
  
  return `Most entry-level ${role.title} positions don't require specific certifications, though having relevant certifications can increase your earning potential`;
}

