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

  // 6. Schedule FAQ
  faqs.push({
    question: `What kind of schedule can I expect as a ${role.title}?`,
    answer: `${role.title} schedules vary by employer and industry. Many positions offer flexible scheduling, including day, evening, night, and weekend shifts. With Indeed Flex, you choose shifts that fit your availability.`
  });

  // 7. Benefits FAQ
  faqs.push({
    question: `Do ${role.title} positions offer benefits?`,
    answer: `Benefits vary by employer. Many flexible positions offer competitive pay, flexible scheduling, and the ability to work multiple shifts. Some employers also provide health insurance, retirement plans, and paid time off for full-time positions.`
  });

  // 8. Training FAQ
  faqs.push({
    question: `Will I receive training as a ${role.title}?`,
    answer: `Yes, most employers provide on-the-job training for ${role.title} positions. Training typically covers company policies, safety procedures, and role-specific tasks. The length of training varies but is usually completed within the first few shifts.`
  });

  // 9. Physical Requirements FAQ
  faqs.push({
    question: `Are there physical requirements for ${role.title} positions?`,
    answer: `Physical requirements depend on the specific role and employer. Some positions may require standing for extended periods, lifting, or other physical tasks. Job descriptions on Indeed Flex clearly outline any physical requirements.`
  });

  // 10. Getting Started FAQ
  faqs.push({
    question: `How do I get started as a ${role.title} with Indeed Flex?`,
    answer: `Getting started is easy! Download the Indeed Flex app, complete your profile, and browse available ${role.title} shifts in your area. You can apply and accept shifts directly through the app, often starting work within days.`
  });

  // Add any existing FAQs from the role data
  if (role.faqs && role.faqs.length > 0) {
    faqs.push(...role.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    })));
  }

  return faqs;
};

// Generate city-specific FAQs
export interface CityData {
  city: string;
  state: string;
  stateCode: string;
  topIndustries: string[];
  avgHourlyWage: { min: number; max: number };
  costOfLiving: {
    index: number;
    rent: { studio: number; oneBed: number };
    groceries: number;
    transport: number;
  };
  population?: string;
}

export const generateCityFAQs = (city: CityData): GeneratedFAQ[] => {
  const faqs: GeneratedFAQ[] = [];

  // 1. Minimum Wage FAQ
  faqs.push({
    question: `What's the minimum wage in ${city.city}, ${city.state}?`,
    answer: `The minimum wage in ${city.state} varies by location and employer size. Many flexible work positions through Indeed Flex pay above minimum wage, typically ranging from $${city.avgHourlyWage.min} to $${city.avgHourlyWage.max} per hour. Check individual job postings for exact rates.`
  });

  // 2. Best Areas FAQ
  faqs.push({
    question: `What are the best areas for flexible work in ${city.city}?`,
    answer: `${city.city} offers flexible work opportunities across multiple neighborhoods. Areas with high concentrations of ${city.topIndustries.slice(0, 2).join(' and ')} jobs tend to have the most opportunities. Use the Indeed Flex app to see available shifts by neighborhood.`
  });

  // 3. Cost of Living FAQ
  const colStatus = city.costOfLiving.index > 100 ? 'higher' : city.costOfLiving.index < 100 ? 'lower' : 'similar to';
  faqs.push({
    question: `Is ${city.city} affordable for hourly workers?`,
    answer: `The cost of living in ${city.city} is ${colStatus} the national average (index: ${city.costOfLiving.index}). Average rent for a studio apartment is around $${city.costOfLiving.rent.studio}/month, and a one-bedroom is approximately $${city.costOfLiving.rent.oneBed}/month. With hourly wages typically ranging from $${city.avgHourlyWage.min} to $${city.avgHourlyWage.max}, many workers find ${city.city} affordable, especially with flexible scheduling that allows for multiple income streams.`
  });

  // 4. Job Availability FAQ
  faqs.push({
    question: `What types of flexible jobs are available in ${city.city}?`,
    answer: `${city.city} has a strong job market for flexible workers, particularly in ${city.topIndustries.join(', ')}. Indeed Flex offers shifts in hospitality, warehouse, retail, facilities, and more. New shifts are posted daily, and you can filter by location, pay rate, and schedule preferences.`
  });

  // 5. Transportation FAQ
  faqs.push({
    question: `Do I need a car to work flexible jobs in ${city.city}?`,
    answer: `Transportation needs vary by job type. Many warehouse and industrial positions may require a car, while hospitality and retail jobs in downtown areas are often accessible by public transit. The Indeed Flex app shows job locations so you can choose shifts near you or accessible by your preferred transportation method.`
  });

  // 6. Peak Hiring FAQ
  faqs.push({
    question: `When is the best time to find flexible work in ${city.city}?`,
    answer: `Flexible work opportunities are available year-round in ${city.city}, but hiring peaks during seasonal periods. ${city.topIndustries[0]} jobs often have increased demand during holidays and special events. Check the Indeed Flex app regularly for new postings, as shifts are added daily.`
  });

  return faqs;
};

// Generate city+role specific FAQs
export interface CityRoleData {
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

export const generateCityRoleFAQs = (data: CityRoleData): GeneratedFAQ[] => {
  const faqs: GeneratedFAQ[] = [];

  // 1. Salary in this city FAQ
  faqs.push({
    question: `How much do ${data.roleTitle}s make in ${data.city}?`,
    answer: `${data.roleTitle}s in ${data.city} typically earn between $${data.localSalary.min.toFixed(2)} and $${data.localSalary.max.toFixed(2)} per hour. Pay rates vary by employer, shift timing, and experience level. Check the Indeed Flex app for current rates in ${data.city}.`
  });

  // 2. Job availability FAQ
  faqs.push({
    question: `Are ${data.roleTitle} jobs available in ${data.city}?`,
    answer: `Yes, ${data.roleTitle} positions are available in ${data.city} through Indeed Flex. New shifts are posted regularly, and you can filter by location, pay rate, and schedule. Many positions are entry-level friendly.`
  });

  // 3. Requirements FAQ
  faqs.push({
    question: `What do I need to work as a ${data.roleTitle} in ${data.city}?`,
    answer: `Requirements for ${data.roleTitle} positions in ${data.city} typically include: ${data.requirements.slice(0, 3).join(', ')}. Most employers provide on-the-job training.`
  });

  // 4. Skills FAQ
  faqs.push({
    question: `What skills are needed for ${data.roleTitle} work in ${data.city}?`,
    answer: `Key skills for ${data.roleTitle}s in ${data.city} include: ${data.skills.slice(0, 4).join(', ')}. These skills can often be developed through training and experience.`
  });

  // 5. Cost of living FAQ
  const colStatus = data.costOfLivingIndex > 100 ? 'higher' : data.costOfLivingIndex < 100 ? 'lower' : 'similar to';
  faqs.push({
    question: `Can I afford to live in ${data.city} as a ${data.roleTitle}?`,
    answer: `The cost of living in ${data.city} is ${colStatus} the national average. With ${data.roleTitle} wages typically ranging from $${data.localSalary.min.toFixed(2)} to $${data.localSalary.max.toFixed(2)} per hour, many workers find ${data.city} affordable, especially with flexible scheduling that allows for multiple income streams. Average rent for a one-bedroom apartment is around $${data.rentOneBed}/month.`
  });

  // 6. Getting started FAQ
  faqs.push({
    question: `How do I start working as a ${data.roleTitle} in ${data.city}?`,
    answer: `To get started, download the Indeed Flex app and complete your profile. Browse available ${data.roleTitle} shifts in ${data.city} and apply directly through the app. Many workers start within days of applying.`
  });

  return faqs;
};
