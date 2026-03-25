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

  // 2. Temp vs full-time FAQ
  faqs.push({
    question: `What's the difference between temp and full-time ${role.title} work?`,
    answer: `Temp ${role.title} positions offer flexible scheduling — you choose when and where you work, often through apps like Indeed Flex. Full-time roles provide stable hours but less flexibility. Many temp ${role.title}s earn comparable hourly rates ($${role.avgHourlyRate.min}-$${role.avgHourlyRate.max}/hr) and top performers often get offered permanent positions.`
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

  // 5. Hours per week FAQ
  faqs.push({
    question: `How many hours per week can I work as a ${role.title}?`,
    answer: `With temp ${role.title} work through Indeed Flex, you control your hours. Most workers pick up 15-40 hours per week depending on their availability. Shifts typically run 4-10 hours. You can work as little or as much as you want — there's no minimum commitment.`
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

  // 10. Side job compatibility FAQ
  faqs.push({
    question: `Can I work as a ${role.title} while studying or at a second job?`,
    answer: `Absolutely. Temp ${role.title} work is popular with students, parents, and people with other commitments. With Indeed Flex, you browse available shifts and only accept ones that fit your schedule — no fixed hours or minimum shifts required. Many workers combine ${role.title.toLowerCase()} shifts with other work or school.`
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
  metroArea?: string;
}

export const generateCityFAQs = (city: CityData): GeneratedFAQ[] => {
  const faqs: GeneratedFAQ[] = [];

  const colStatus = city.costOfLiving.index > 100 ? 'higher than' : city.costOfLiving.index < 100 ? 'lower than' : 'at';
  const colDiff = Math.abs(city.costOfLiving.index - 100);
  const avgWage = (city.avgHourlyWage.min + city.avgHourlyWage.max) / 2;
  const monthlyGross = Math.round(avgWage * 40 * 4.33);
  const monthlyNet = Math.round(monthlyGross * 0.78);
  const rentPercent = Math.round((city.costOfLiving.rent.oneBed / monthlyNet) * 100);

  faqs.push({
    question: `How much do flexible workers earn in ${city.city}?`,
    answer: `Flexible workers in ${city.city}, ${city.state} typically earn $${city.avgHourlyWage.min}–$${city.avgHourlyWage.max} per hour depending on the role and industry. At 40 hours per week, that's roughly $${monthlyGross.toLocaleString()} gross per month ($${monthlyNet.toLocaleString()} after estimated taxes). Top-paying industries include ${city.topIndustries.slice(0, 2).join(' and ')}.`
  });

  faqs.push({
    question: `Can I afford to live in ${city.city} on an hourly wage?`,
    answer: `${city.city}'s cost of living is ${colDiff}% ${colStatus} the national average (index: ${city.costOfLiving.index}). A one-bedroom apartment averages $${city.costOfLiving.rent.oneBed}/month, which is about ${rentPercent}% of a full-time flexible worker's take-home pay. Monthly groceries run about $${city.costOfLiving.groceries} and transport about $${city.costOfLiving.transport}. ${rentPercent <= 30 ? 'Housing is within the recommended 30% threshold.' : 'Consider a studio ($' + city.costOfLiving.rent.studio + '/mo) or a roommate to keep costs manageable.'}`
  });

  faqs.push({
    question: `What industries hire the most flexible workers in ${city.city}?`,
    answer: `${city.city}'s strongest industries for flexible work are ${city.topIndustries.join(', ')}. ${city.topIndustries[0]} leads hiring with year-round demand, while ${city.topIndustries[1] || city.topIndustries[0]} offers seasonal surges. Indeed Flex posts new shifts daily across all these sectors.`
  });

  faqs.push({
    question: `What are the best neighborhoods for shift work in ${city.city}?`,
    answer: `The best neighborhoods depend on your industry. Areas with high concentrations of ${city.topIndustries[0].toLowerCase()} jobs (typically downtown and commercial districts) offer the most shifts. Warehouse and logistics roles are often concentrated near ${city.metroArea ? `the ${city.metroArea} metro area` : 'industrial districts and highway corridors'}. The Indeed Flex app shows exact shift locations so you can filter by commute time.`
  });

  faqs.push({
    question: `Do I need transportation to work in ${city.city}?`,
    answer: `It depends on the role. Average monthly transport costs in ${city.city} are about $${city.costOfLiving.transport}. Hospitality and retail jobs in central ${city.city} are often accessible by public transit, while warehouse positions near ${city.metroArea || city.city + ' suburbs'} may require a car. The Indeed Flex app shows shift locations upfront so you can plan your commute before accepting.`
  });

  faqs.push({
    question: `When is the best time to find work in ${city.city}?`,
    answer: `Flexible work is available year-round in ${city.city}, but demand spikes during seasonal peaks. ${city.topIndustries.includes('Hospitality') || city.topIndustries.includes('Tourism') ? 'Tourism and hospitality surge in summer and around holidays.' : city.topIndustries.includes('Logistics') || city.topIndustries.includes('Retail') ? 'Warehouse and retail hiring peaks from October through January for the holiday season.' : 'Hiring is steady with modest seasonal variation.'} Download the Indeed Flex app to get notified when new shifts drop.`
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

  const avgHourly = (data.localSalary.min + data.localSalary.max) / 2;
  const monthlyGross = Math.round(avgHourly * 40 * 4.33);
  const monthlyNet = Math.round(monthlyGross * 0.78);
  const rentPercent = Math.round((data.rentOneBed / monthlyNet) * 100);
  const colDiff = Math.abs(data.costOfLivingIndex - 100);
  const colDirection = data.costOfLivingIndex > 100 ? 'above' : data.costOfLivingIndex < 100 ? 'below' : 'at';

  faqs.push({
    question: `How much do ${data.roleTitle}s make in ${data.city}, ${data.stateCode}?`,
    answer: `${data.roleTitle}s in ${data.city} earn $${data.localSalary.min.toFixed(2)}–$${data.localSalary.max.toFixed(2)} per hour, adjusted for ${data.city}'s cost of living (index: ${data.costOfLivingIndex}). At 40 hours per week, that's roughly $${monthlyGross.toLocaleString()}/month gross or $${monthlyNet.toLocaleString()} after estimated taxes. Rates vary by employer, shift timing, and experience.`
  });

  faqs.push({
    question: `Can I afford a one-bedroom in ${data.city} on a ${data.roleTitle} salary?`,
    answer: `A one-bedroom apartment in ${data.city} averages $${data.rentOneBed.toLocaleString()}/month, which is about ${rentPercent}% of a full-time ${data.roleTitle}'s take-home pay ($${monthlyNet.toLocaleString()}/month). ${rentPercent <= 30 ? 'That\'s within the recommended 30% housing-to-income ratio — ' + data.city + ' is manageable on this salary.' : rentPercent <= 40 ? 'That exceeds the recommended 30% threshold. Consider a studio apartment or roommate to improve your budget.' : 'Housing costs are steep relative to this salary. Many workers share apartments or commute from nearby suburbs.'}`
  });

  faqs.push({
    question: `Are ${data.roleTitle} jobs available in ${data.city}?`,
    answer: `Yes — ${data.roleTitle} positions are actively hiring in ${data.city} through Indeed Flex. ${data.city} is part of the ${data.metroArea || data.city + ' metro'} area with strong demand in ${data.topIndustries.slice(0, 2).join(' and ')}. New shifts are posted daily and many are entry-level friendly.`
  });

  faqs.push({
    question: `What do I need to work as a ${data.roleTitle} in ${data.city}?`,
    answer: `Most ${data.roleTitle} positions in ${data.city} require: ${data.requirements.slice(0, 3).join('; ')}. Key skills employers look for include ${data.skills.slice(0, 3).join(', ')}. Most employers provide on-the-job training, so prior experience isn't always required.`
  });

  faqs.push({
    question: `Is ${data.city} a good city for ${data.roleTitle} work?`,
    answer: `${data.city}'s cost of living is ${colDiff}% ${colDirection} average, and ${data.roleTitle} pay reflects that adjustment. The ${data.topIndustries[0]} and ${data.topIndustries[1] || data.topIndustries[0]} sectors drive consistent demand for ${data.roleTitle}s. ${data.costOfLivingIndex < 100 ? 'Lower living costs mean your paycheck goes further here.' : 'Higher wages offset the above-average costs.'} Download Indeed Flex to browse current shifts.`
  });

  faqs.push({
    question: `How quickly can I start as a ${data.roleTitle} in ${data.city}?`,
    answer: `Most workers start within 1-3 days of applying through the Indeed Flex app. Download the app, complete your profile, and browse available ${data.roleTitle} shifts in ${data.city}. You can accept shifts directly and start earning immediately.`
  });

  return faqs;
};
