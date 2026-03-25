export interface FlexerTestimonial {
  name: string;
  industry: string;
  quote: string;
  source: string;
}

export interface PlatformStat {
  value: string;
  label: string;
  source: string;
}

export const flexerTestimonials: FlexerTestimonial[] = [
  {
    name: "Katie",
    industry: "Hospitality",
    quote: "It took one day for me to be able to find work! I've had a great experience. That's why I've stayed with Indeed Flex for three years.",
    source: "https://indeedflex.com/meet-the-community/"
  },
  {
    name: "Sasha",
    industry: "Hospitality",
    quote: "Having lost my job, I sought something flexible to allow me to pursue my university studies and second career while earning money at the same time. As much as you want to work, you can do.",
    source: "https://indeedflex.com/meet-the-community/"
  },
  {
    name: "Charlie",
    industry: "Hospitality",
    quote: "What brought me to Indeed Flex was the flexibility to work in different places as it gives you the opportunity and freedom to be creative as a chef.",
    source: "https://indeedflex.com/meet-the-community/"
  },
  {
    name: "Lina",
    industry: "Hospitality",
    quote: "Indeed Flex gives me the opportunity to feel financially stable. I was amazed at the control of how many hours I wanted to do, where I wanted to work; the location, the client, and the type of shift.",
    source: "https://indeedflex.com/"
  },
  {
    name: "Dwayne",
    industry: "Hospitality",
    quote: "The pay is amazing, and you meet new people every single day. The job is never the same.",
    source: "https://indeedflex.com/"
  },
  {
    name: "Gigih",
    industry: "Facilities",
    quote: "I love the variety of being able to try different jobs. It's really easy to register and I can find a lot of shifts very quickly.",
    source: "https://indeedflex.com/"
  }
];

export const platformStats: PlatformStat[] = [
  {
    value: "165,000+",
    label: "Flexers on the platform",
    source: "https://indeedflex.com/why-indeed-flex/"
  },
  {
    value: "Same Day Pay",
    label: "Up to 50% of wages within 1 hour",
    source: "https://indeedflex.com/benefits-pay/same-day-pay/"
  },
  {
    value: "$75",
    label: "Refer-a-Friend bonus",
    source: "https://indeedflex.com/benefits-pay/refer-a-friend/"
  },
  {
    value: "Medical Benefits",
    label: "Health, dental, vision available",
    source: "https://indeedflex.com/benefits-pay/"
  }
];

export function getTestimonialsByIndustry(industry: string): FlexerTestimonial[] {
  const industryMap: Record<string, string[]> = {
    hospitality: ["Hospitality"],
    industrial: ["Hospitality", "Facilities"],
    retail: ["Hospitality", "Facilities"],
    facilities: ["Facilities", "Hospitality"],
    events: ["Hospitality"],
    healthcare: ["Hospitality", "Facilities"],
  };

  const relevantIndustries = industryMap[industry] || ["Hospitality"];
  return flexerTestimonials.filter(t => relevantIndustries.includes(t.industry));
}
