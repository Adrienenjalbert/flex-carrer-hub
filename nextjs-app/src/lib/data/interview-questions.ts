// Interview Questions Dataset - For programmatic SEO pages
// Targets high-volume queries like "bartender interview questions"

export interface InterviewQuestion {
  question: string;
  type: 'behavioral' | 'situational' | 'technical' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  sampleAnswer: string;
  tips: string[];
  whatTheyreReallyAsking?: string;
}

export interface RoleInterviewGuide {
  roleSlug: string;
  roleTitle: string;
  industry: string;
  overview: string;
  whatToWear: string;
  whatToBring: string[];
  interviewDuration: string;
  interviewFormat: string;
  questions: InterviewQuestion[];
  redFlags: string[];
  questionsToAsk: string[];
  commonMistakes: string[];
  proTips: string[];
}

export const interviewGuides: RoleInterviewGuide[] = [
  // ============================================
  // HOSPITALITY
  // ============================================
  {
    roleSlug: 'bartender',
    roleTitle: 'Bartender',
    industry: 'hospitality',
    overview: 'Bartender interviews typically include questions about drink knowledge, customer service scenarios, and your ability to handle difficult situations. Many interviews include a practical component where you may be asked to make drinks.',
    whatToWear: 'Business casual - dark jeans or slacks with a nice shirt. Avoid overly casual clothes. Some upscale bars expect more formal attire.',
    whatToBring: ['Government ID', 'TIPS/alcohol certification', 'Resume', 'References from previous bar jobs'],
    interviewDuration: '20-45 minutes',
    interviewFormat: 'Usually one-on-one with bar manager. May include a practical test making drinks.',
    questions: [
      {
        question: 'Tell me about your bartending experience.',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I\'ve been bartending for 2 years at a high-volume sports bar. I typically handled 150-200 customers per shift, managed a full bar during game nights, and consistently received positive customer feedback. I\'m certified in TIPS and knowledgeable in classic and modern cocktails.',
        tips: ['Mention volume of customers served', 'Highlight any specialty cocktail experience', 'Reference certifications'],
        whatTheyreReallyAsking: 'Can you handle our pace and volume?'
      },
      {
        question: 'How would you handle a customer who\'s had too much to drink?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I would stop serving them alcohol immediately but offer water or food. I\'d speak to them privately and respectfully, explain that I care about their safety, and offer to call a cab or rideshare. If they became confrontational, I\'d involve security or management.',
        tips: ['Show you understand legal liability', 'Demonstrate empathy', 'Mention involving management if needed'],
        whatTheyreReallyAsking: 'Do you understand responsible service and liability?'
      },
      {
        question: 'What\'s your favorite cocktail to make and why?',
        type: 'technical',
        difficulty: 'easy',
        sampleAnswer: 'I love making an Old Fashioned because it showcases fundamental bartending skills - proper muddling, the right balance of sweet and bitter, and presentation. It\'s also a great conversation starter with customers who appreciate classic cocktails.',
        tips: ['Choose a cocktail you can actually make well', 'Explain the technique involved', 'Show passion for the craft']
      },
      {
        question: 'How do you handle multiple customers waiting at the bar?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I acknowledge each customer with eye contact and a nod so they know I see them. I serve in order of arrival while batch-processing similar orders. I might say "I\'ll be right with you" to waiting customers. During rushes, I focus on speed without sacrificing quality.',
        tips: ['Emphasize organization and awareness', 'Show you can multitask', 'Mention keeping customers informed']
      },
      {
        question: 'Describe a time you dealt with a difficult customer.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'A customer once insisted their drink was made wrong when I knew it was correct. Instead of arguing, I apologized for the misunderstanding and offered to remake it to their preference. They appreciated the gesture and became a regular who specifically requested me.',
        tips: ['Never say the customer was wrong', 'Focus on resolution', 'Show emotional intelligence']
      },
      {
        question: 'What would you do if you caught a coworker stealing?',
        type: 'situational',
        difficulty: 'hard',
        sampleAnswer: 'I would report it to management immediately. Stealing affects everyone - the business, our tips, and team trust. I wouldn\'t confront the coworker directly but would provide management with specific details of what I observed.',
        tips: ['Show honesty and integrity', 'Don\'t say you\'d ignore it', 'Mention proper channels']
      },
      {
        question: 'How do you upsell without being pushy?',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'I make recommendations based on what the customer already ordered. If someone orders vodka, I might suggest our house-infused options. I describe drinks enthusiastically without pressuring. "Have you tried our signature martini? It\'s really popular" works better than pushing expensive options.',
        tips: ['Show you understand suggestive selling', 'Emphasize customer experience', 'Give specific examples']
      },
      {
        question: 'Make me an Old Fashioned.',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: '[This is a practical test] Muddle sugar cube with 2-3 dashes Angostura bitters and a splash of water. Add 2oz bourbon, stir with ice for 30 seconds. Strain into rocks glass over large ice cube. Express orange peel over drink and garnish.',
        tips: ['Practice classic cocktails before interview', 'Narrate what you\'re doing', 'Ask about their house style']
      }
    ],
    redFlags: [
      'Saying you don\'t care about responsible service',
      'Admitting to overserving in the past',
      'Not knowing basic cocktail recipes',
      'Speaking negatively about previous employers',
      'Unable to handle criticism'
    ],
    questionsToAsk: [
      'What\'s your busiest night and typical volume?',
      'What POS system do you use?',
      'How is the tip pool structured?',
      'What\'s your cocktail menu like - classic or creative?',
      'What does training look like for new bartenders?'
    ],
    commonMistakes: [
      'Not knowing basic drink recipes',
      'Dressing too casually',
      'Not bringing certifications',
      'Focusing only on money, not customer experience',
      'Not asking about the bar\'s style and clientele'
    ],
    proTips: [
      'Visit the bar before your interview to understand their vibe',
      'Practice making classic cocktails at home',
      'Have your TIPS certification ready - it\'s often required',
      'Know the difference between well drinks, call drinks, and top-shelf',
      'Be prepared for a working interview or trial shift'
    ]
  },
  {
    roleSlug: 'server',
    roleTitle: 'Server/Waiter',
    industry: 'hospitality',
    overview: 'Server interviews focus on customer service abilities, multitasking skills, and how you handle pressure. You may be asked about menu knowledge and upselling techniques.',
    whatToWear: 'Business casual - black pants and a nice shirt is safe. Match the restaurant\'s style if you know it.',
    whatToBring: ['Government ID', 'Food handler permit', 'Resume', 'References'],
    interviewDuration: '15-30 minutes',
    interviewFormat: 'Usually one-on-one with manager. May include a brief tour of the restaurant.',
    questions: [
      {
        question: 'Why do you want to be a server?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I enjoy working with people and thrive in fast-paced environments. Serving lets me provide great experiences while earning based on my effort. I love the team atmosphere in restaurants and the satisfaction of seeing happy customers.',
        tips: ['Show genuine enthusiasm', 'Mention enjoying customer interaction', 'Don\'t just talk about money']
      },
      {
        question: 'How would you handle a customer complaint about their food?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d apologize sincerely and listen to their concern without interrupting. Then I\'d offer solutions - remaking the dish, suggesting an alternative, or removing it from the bill. I\'d alert the manager and kitchen, and check back to ensure they\'re satisfied.',
        tips: ['Start with apology', 'Offer specific solutions', 'Mention follow-up']
      },
      {
        question: 'Tell me about a time you went above and beyond for a customer.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'A family was celebrating their daughter\'s birthday and mentioned she loved chocolate. I coordinated with the kitchen to create a special dessert presentation with candles and had the staff sing. The family was thrilled and left a glowing review.',
        tips: ['Use specific examples', 'Show initiative', 'Mention positive outcomes']
      },
      {
        question: 'How do you handle a rush when you\'re in the weeds?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I stay calm and prioritize - greet new tables quickly, put in orders immediately, and batch tasks efficiently. I communicate with the kitchen about timing and ask teammates for help if needed. I keep a mental checklist and never let stress show to customers.',
        tips: ['Show you stay calm under pressure', 'Mention teamwork', 'Demonstrate organization']
      },
      {
        question: 'A customer says their steak is overcooked. What do you do?',
        type: 'situational',
        difficulty: 'easy',
        sampleAnswer: 'I\'d apologize and offer to have it recooked to their preferred temperature right away. I wouldn\'t argue or make excuses. I\'d inform the kitchen, ensure the new steak comes out quickly, and check back to make sure it\'s perfect.',
        tips: ['Never argue with the customer', 'Act quickly', 'Follow up']
      },
      {
        question: 'How do you upsell without being annoying?',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'I make genuine recommendations based on the customer\'s order. "Our truffle fries pair perfectly with that burger" or "Can I start you with our famous spinach dip?" I read the table - some want suggestions, others don\'t. I never push, just inform.',
        tips: ['Give specific examples', 'Show you read customer cues', 'Emphasize genuine recommendations']
      },
      {
        question: 'What would you do if you noticed a coworker not doing their sidework?',
        type: 'situational',
        difficulty: 'hard',
        sampleAnswer: 'I\'d first offer to help if they seemed overwhelmed. If it\'s a pattern, I might mention it casually. If it continued affecting the team, I\'d speak with a manager privately. I wouldn\'t let it fester but also wouldn\'t make it confrontational.',
        tips: ['Show teamwork first', 'Don\'t immediately jump to reporting', 'Demonstrate maturity']
      }
    ],
    redFlags: [
      'Complaining about difficult customers from past jobs',
      'Showing no knowledge of food or restaurants',
      'Being late to the interview',
      'Appearing disheveled or not dressed appropriately',
      'Not making eye contact'
    ],
    questionsToAsk: [
      'What\'s your average table turn time?',
      'How many tables do servers typically handle?',
      'What\'s the tip-out structure?',
      'What does a typical shift look like?',
      'What POS system do you use?'
    ],
    commonMistakes: [
      'Not knowing anything about the restaurant',
      'Only talking about tips and money',
      'Being unable to describe handling difficult situations',
      'Not asking any questions',
      'Appearing unenthusiastic'
    ],
    proTips: [
      'Eat at the restaurant before interviewing if possible',
      'Research their menu online',
      'Bring your food handler permit if you have one',
      'Be prepared to start with a training shift',
      'Mention flexibility with scheduling'
    ]
  },
  {
    roleSlug: 'dishwasher',
    roleTitle: 'Dishwasher',
    industry: 'hospitality',
    overview: 'Dishwasher interviews are usually brief and focus on reliability, physical capability, and willingness to work hard. This is often the easiest restaurant job to get.',
    whatToWear: 'Clean, casual clothes. Nothing fancy required, but be presentable.',
    whatToBring: ['Government ID', 'Resume if you have one', 'References (optional)'],
    interviewDuration: '10-20 minutes',
    interviewFormat: 'Brief conversation with kitchen manager or chef.',
    questions: [
      {
        question: 'Are you comfortable standing for long periods and working in a hot environment?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'Yes, I\'m physically fit and comfortable working on my feet. I understand kitchens get hot and busy, and I\'m ready for that. I stay hydrated and take care of myself so I can work efficiently throughout the shift.',
        tips: ['Be honest about physical capabilities', 'Show you understand the environment']
      },
      {
        question: 'Can you work evenings and weekends?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'Yes, I have full availability for evenings and weekends. I understand those are the busiest times and when I\'m needed most. I\'m reliable and will show up for every scheduled shift.',
        tips: ['Be honest about availability', 'Emphasize reliability']
      },
      {
        question: 'Have you worked in a kitchen before?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I haven\'t worked in a professional kitchen, but I\'m a quick learner and hard worker. I keep my home kitchen very clean and organized. I\'m eager to learn proper techniques and standards.',
        tips: ['Honesty is fine for entry-level', 'Show willingness to learn', 'Mention any related skills']
      },
      {
        question: 'How do you handle working under pressure?',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'I stay focused and work methodically. During rushes, I prioritize what the kitchen needs most - usually glasses and plates. I don\'t let stress affect my work quality. I just put my head down and get through it.',
        tips: ['Show you stay calm', 'Mention prioritization', 'Be honest about handling pressure']
      },
      {
        question: 'Why do you want this job?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I need steady work and I\'m not afraid of hard work. I\'ve heard this is a good place to work and there are opportunities to learn more about the kitchen. I\'m reliable and I\'ll show up every day ready to work hard.',
        tips: ['Be genuine', 'Mention reliability', 'Show interest in the restaurant']
      }
    ],
    redFlags: [
      'Admitting you have attendance issues',
      'Saying you can\'t handle physical work',
      'Appearing disinterested',
      'Being very late to interview',
      'Having very limited availability'
    ],
    questionsToAsk: [
      'What shifts are available?',
      'Is there opportunity to move to the line eventually?',
      'How many dishwashers work per shift?',
      'What\'s the typical shift length?'
    ],
    commonMistakes: [
      'Appearing unenthusiastic',
      'Not being honest about availability',
      'Underestimating the physical demands',
      'Not showing up on time'
    ],
    proTips: [
      'Reliability is the #1 thing they look for',
      'Many chefs started as dishwashers - mention interest in learning',
      'Show up early to the interview',
      'Be ready to start immediately if offered'
    ]
  },
  {
    roleSlug: 'host-hostess',
    roleTitle: 'Host/Hostess',
    industry: 'hospitality',
    overview: 'Host interviews focus on communication skills, professional appearance, and organizational abilities. You\'re the first impression guests have of the restaurant.',
    whatToWear: 'Business casual or slightly dressy. Dress like you\'re going to a nice dinner.',
    whatToBring: ['Government ID', 'Resume', 'References'],
    interviewDuration: '15-25 minutes',
    interviewFormat: 'Conversation with front-of-house manager.',
    questions: [
      {
        question: 'How would you greet guests arriving at the restaurant?',
        type: 'technical',
        difficulty: 'easy',
        sampleAnswer: 'I\'d make immediate eye contact, smile warmly, and say something like "Good evening, welcome to [Restaurant]! Do you have a reservation tonight?" I\'d make them feel welcomed and valued from the first moment.',
        tips: ['Demonstrate your greeting', 'Show warmth and professionalism', 'Make eye contact during interview']
      },
      {
        question: 'How do you handle a long wait when guests are frustrated?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d empathize with their frustration and give honest time estimates. I\'d offer them the bar area if available and keep them updated every 10-15 minutes. A sincere apology and regular communication go a long way in keeping people calm.',
        tips: ['Show empathy', 'Mention regular updates', 'Offer alternatives when possible']
      },
      {
        question: 'A guest without a reservation wants a table during a busy night. What do you do?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d check for any available tables or upcoming cancellations. If there\'s a wait, I\'d be honest about timing and offer the bar as an option. I\'d take their number and call when a table opens. I\'d never promise something I can\'t deliver.',
        tips: ['Show problem-solving', 'Be honest', 'Offer alternatives']
      },
      {
        question: 'How do you stay organized managing the seating chart?',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'I constantly update the floor chart, noting which tables are about to turn. I balance seating between server sections fairly. I keep a list of waiting guests with accurate quotes. Communication with servers about their status helps me seat efficiently.',
        tips: ['Demonstrate organizational skills', 'Mention communication with team', 'Show attention to detail']
      },
      {
        question: 'Tell me about a time you had to deal with a difficult person.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'A customer was upset about a long wait and raised their voice. I stayed calm, apologized sincerely, and offered a complimentary drink while they waited. By the time they were seated, they had calmed down and thanked me for handling it well.',
        tips: ['Stay positive about the situation', 'Show de-escalation skills', 'Focus on the resolution']
      }
    ],
    redFlags: [
      'Poor communication skills',
      'Appearing shy or not making eye contact',
      'Unable to handle confrontation professionally',
      'Disheveled appearance',
      'Seeming disorganized'
    ],
    questionsToAsk: [
      'What reservation system do you use?',
      'What\'s your typical wait time on busy nights?',
      'Do hosts get a tip share?',
      'What does training look like?'
    ],
    commonMistakes: [
      'Not smiling during the interview',
      'Being too quiet or reserved',
      'Not demonstrating personality',
      'Dressing too casually'
    ],
    proTips: [
      'Practice your greeting before the interview',
      'Your appearance and demeanor ARE the interview',
      'Research the restaurant\'s style and vibe',
      'Be prepared to show your personality'
    ]
  },

  // ============================================
  // WAREHOUSE & INDUSTRIAL
  // ============================================
  {
    roleSlug: 'warehouse-operative',
    roleTitle: 'Warehouse Associate',
    industry: 'industrial',
    overview: 'Warehouse interviews are usually straightforward, focusing on reliability, physical capability, and safety awareness. Many are group interviews or quick one-on-ones.',
    whatToWear: 'Clean, casual work clothes. Closed-toe shoes required.',
    whatToBring: ['Government ID', 'Steel-toe boots (for tour)', 'Any forklift certifications'],
    interviewDuration: '15-30 minutes',
    interviewFormat: 'Brief interview, possibly including facility tour.',
    questions: [
      {
        question: 'Are you able to lift 50 pounds repeatedly?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'Yes, I\'m physically fit and comfortable with heavy lifting. I use proper lifting technique - bending at the knees and keeping my back straight. I\'ve done physical work before and maintain my fitness.',
        tips: ['Be honest about capabilities', 'Mention proper technique', 'Show safety awareness']
      },
      {
        question: 'Can you work different shifts including nights and weekends?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'Yes, I have open availability and can work any shift. I understand warehouses run 24/7 and I\'m flexible. I\'m especially interested in [night shift/day shift] if available.',
        tips: ['Be honest about preferences but show flexibility', 'Mention you understand shift work']
      },
      {
        question: 'What does safety mean to you in a warehouse?',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'Safety means following all procedures, even when rushed. It means proper lifting, watching for forklifts, keeping aisles clear, and speaking up if I see hazards. I\'d rather slow down than risk injury to myself or coworkers.',
        tips: ['Show you take safety seriously', 'Give specific examples', 'Mention speaking up about hazards']
      },
      {
        question: 'Tell me about a time you worked as part of a team.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'At my previous job, we had a large shipment come in with a tight deadline. I coordinated with teammates to divide the work efficiently. We communicated constantly and helped each other when someone fell behind. We finished ahead of schedule.',
        tips: ['Emphasize teamwork', 'Show you can communicate', 'Mention achieving goals together']
      },
      {
        question: 'How do you stay productive during repetitive tasks?',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'I focus on improving my efficiency and accuracy each day. I set small personal goals and challenge myself to beat my previous numbers safely. I stay focused on quality and find satisfaction in doing the job well.',
        tips: ['Show self-motivation', 'Mention maintaining quality', 'Demonstrate work ethic']
      },
      {
        question: 'Do you have any forklift experience or certification?',
        type: 'technical',
        difficulty: 'easy',
        sampleAnswer: '[If yes] Yes, I\'m certified and have X years of experience operating sit-down forklifts and pallet jacks. [If no] I don\'t have certification yet, but I\'m very interested in getting trained. I\'m a quick learner.',
        tips: ['Be honest', 'If no certification, express interest in training']
      }
    ],
    redFlags: [
      'Concerns about physical requirements',
      'Very limited availability',
      'History of attendance issues',
      'Dismissive attitude toward safety',
      'Unable to work with others'
    ],
    questionsToAsk: [
      'What shifts are available?',
      'Is there opportunity for overtime?',
      'Do you provide forklift training?',
      'What does the typical day look like?',
      'What are opportunities for advancement?'
    ],
    commonMistakes: [
      'Underselling physical capabilities',
      'Not asking about the position',
      'Being vague about availability',
      'Not mentioning reliability'
    ],
    proTips: [
      'Wear closed-toe shoes to the interview',
      'Emphasize reliability and attendance',
      'Mention any relevant experience, even if informal',
      'Express interest in forklift certification',
      'Be prepared to start quickly - warehouses hire fast'
    ]
  },
  {
    roleSlug: 'forklift-driver',
    roleTitle: 'Forklift Operator',
    industry: 'industrial',
    overview: 'Forklift operator interviews focus heavily on safety, experience, and certification. You may be asked to demonstrate your skills.',
    whatToWear: 'Work clothes, steel-toe boots.',
    whatToBring: ['Government ID', 'Forklift certification', 'Resume with equipment experience'],
    interviewDuration: '20-40 minutes (may include practical test)',
    interviewFormat: 'Interview plus possible equipment demonstration.',
    questions: [
      {
        question: 'What types of forklifts are you certified to operate?',
        type: 'technical',
        difficulty: 'easy',
        sampleAnswer: 'I\'m certified on sit-down counterbalance forklifts and stand-up reach trucks. I also have experience with electric pallet jacks. I completed my initial certification 3 years ago and have kept it current.',
        tips: ['List specific equipment', 'Mention certification currency', 'Be honest about what you know']
      },
      {
        question: 'Describe your pre-operation safety check routine.',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'Before starting, I check fluid levels, tire condition, forks for damage, controls operation, horn and lights, and brakes. I also check the load backrest and overhead guard. If anything fails, I tag the unit and report it immediately.',
        tips: ['Be thorough', 'Show you take inspections seriously', 'Mention reporting issues']
      },
      {
        question: 'How do you handle operating near pedestrians?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I slow down, use the horn at intersections and blind corners, make eye contact before proceeding, and give pedestrians the right of way. I never assume they see or hear me. In busy areas, I stop and wait for clear paths.',
        tips: ['Pedestrian safety is critical', 'Show defensive operation', 'Mention specific techniques']
      },
      {
        question: 'Tell me about a close call or near-miss you\'ve experienced.',
        type: 'behavioral',
        difficulty: 'hard',
        sampleAnswer: 'Early in my career, I nearly hit a coworker who stepped out from behind racking. I stopped in time, but it taught me to always use my horn at every intersection, even if I don\'t see anyone. I reported it so we could improve our traffic patterns.',
        tips: ['Be honest - everyone has close calls', 'Focus on the lesson learned', 'Show improved behavior']
      },
      {
        question: 'How do you ensure load stability?',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'I check load weight against my forklift\'s capacity, ensure loads are centered on forks, tilt back slightly when traveling, keep loads low to the ground, and never exceed safe stacking heights. I won\'t move an unsafe load - I\'ll get help to restack it.',
        tips: ['Demonstrate technical knowledge', 'Show you won\'t take shortcuts', 'Mention capacity awareness']
      }
    ],
    redFlags: [
      'Expired or invalid certification',
      'Downplaying safety procedures',
      'History of accidents',
      'Unable to describe proper techniques',
      'Rushing through safety answers'
    ],
    questionsToAsk: [
      'What equipment will I be operating?',
      'What\'s the typical daily workload?',
      'How often is equipment maintained?',
      'Are there opportunities for additional certifications?',
      'What\'s the safety record of this facility?'
    ],
    commonMistakes: [
      'Not bringing certification documents',
      'Being vague about equipment experience',
      'Rushing through safety questions',
      'Forgetting pre-operation checks'
    ],
    proTips: [
      'Bring your certification - don\'t just say you have it',
      'Be prepared for a driving test',
      'Know the capacity of forklifts you\'ve operated',
      'Safety answers should be detailed and specific',
      'Mention any perfect safety records'
    ]
  },

  // ============================================
  // RETAIL
  // ============================================
  {
    roleSlug: 'cashier',
    roleTitle: 'Cashier',
    industry: 'retail',
    overview: 'Cashier interviews focus on customer service, basic math, and reliability. These are typically short and straightforward.',
    whatToWear: 'Business casual - nice jeans or khakis with a clean shirt.',
    whatToBring: ['Government ID', 'Resume (optional)', 'Availability schedule'],
    interviewDuration: '10-20 minutes',
    interviewFormat: 'One-on-one with store manager or HR.',
    questions: [
      {
        question: 'Why do you want to work here?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I shop here regularly and always appreciate the friendly service. I enjoy interacting with people and want a job where I can help customers have a positive experience. This store has a great reputation as an employer.',
        tips: ['Show knowledge of the store', 'Express genuine interest', 'Mention customer service']
      },
      {
        question: 'How would you handle a long line of customers?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d stay calm and work efficiently while maintaining accuracy. I\'d acknowledge waiting customers with eye contact and a smile. If possible, I\'d call for backup cashiers. I\'d apologize for the wait and thank customers for their patience.',
        tips: ['Show you stay calm under pressure', 'Mention efficiency and accuracy', 'Talk about customer acknowledgment']
      },
      {
        question: 'A customer\'s card is declined. How do you handle it?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d discretely tell them the card didn\'t go through and ask if they\'d like to try another payment method. I\'d keep my voice low to avoid embarrassing them. I\'d be patient and not make assumptions about why it was declined.',
        tips: ['Emphasize discretion', 'Show empathy', 'Mention alternative solutions']
      },
      {
        question: 'Tell me about a time you provided excellent customer service.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'A customer was looking for a specific item we didn\'t have in stock. Instead of just saying no, I checked our other locations, found it, and arranged for them to pick it up. They were so grateful they wrote a positive review.',
        tips: ['Give specific examples', 'Show you go above and beyond', 'Mention positive outcomes']
      },
      {
        question: 'How would you handle a customer who\'s angry about a return policy?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d listen to their concern, empathize with their frustration, and explain the policy clearly. If I couldn\'t help within policy, I\'d get a manager involved. I\'d stay calm and not take it personally.',
        tips: ['Show you stay calm', 'Mention escalation to management', 'Emphasize empathy']
      }
    ],
    redFlags: [
      'Negative attitude about customer service',
      'Concerns about math or cash handling',
      'Very limited availability',
      'Speaking negatively about customers',
      'Appearing uninterested'
    ],
    questionsToAsk: [
      'What are the typical shifts for this position?',
      'Is there opportunity for advancement?',
      'What employee discount is offered?',
      'What does training look like?'
    ],
    commonMistakes: [
      'Not knowing anything about the store',
      'Appearing disinterested',
      'Not smiling or making eye contact',
      'Focusing only on the discount'
    ],
    proTips: [
      'Visit the store before the interview',
      'Know their basic products/services',
      'Be ready to discuss your availability',
      'Smile and be friendly - that\'s the job!',
      'Mention reliability and punctuality'
    ]
  },
  {
    roleSlug: 'sales-associate',
    roleTitle: 'Sales Associate',
    industry: 'retail',
    overview: 'Sales associate interviews assess your ability to help customers, knowledge of products, and sales potential. Customer service is key.',
    whatToWear: 'Business casual matching the store\'s style.',
    whatToBring: ['Government ID', 'Resume', 'References'],
    interviewDuration: '15-30 minutes',
    interviewFormat: 'One-on-one with manager, possibly with role-play scenarios.',
    questions: [
      {
        question: 'Sell me this [product].',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'First, I\'d ask what you\'re looking for and what\'s important to you. Then I\'d explain how this product meets those needs, highlighting key features and benefits. I\'d share what other customers love about it and offer to answer any questions.',
        tips: ['Ask questions first to understand needs', 'Focus on benefits not just features', 'Be enthusiastic but not pushy']
      },
      {
        question: 'How do you approach a customer who\'s just browsing?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d greet them warmly and let them know I\'m available if they need help. Something like "Welcome! Let me know if you have any questions." I\'d give them space but stay aware so I can help when they\'re ready.',
        tips: ['Show you read customer cues', 'Don\'t be too aggressive', 'Mention staying available']
      },
      {
        question: 'A customer wants something we don\'t carry. What do you do?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d apologize we don\'t have it and suggest similar alternatives we do carry. I\'d check if another location has it or if we can order it. I\'d try to help them find a solution rather than just saying no.',
        tips: ['Show problem-solving', 'Mention alternatives', 'Don\'t just say "we don\'t have it"']
      },
      {
        question: 'Tell me about a time you exceeded a sales goal.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'During the holidays, I focused on building relationships with each customer rather than rushing through transactions. I asked questions, made personalized recommendations, and followed up on their needs. I exceeded my goal by 20% that month.',
        tips: ['Use specific numbers if possible', 'Explain your approach', 'Show customer focus']
      },
      {
        question: 'How do you stay motivated during slow periods?',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'I use slow times to learn products better, organize displays, and prepare for busy periods. I might practice my product knowledge or tidy the store. I stay ready so when customers come in, I\'m at my best.',
        tips: ['Show self-motivation', 'Mention productive activities', 'Don\'t say "I get bored"']
      }
    ],
    redFlags: [
      'Pushy or aggressive sales approach',
      'No interest in the products',
      'Inability to handle rejection',
      'Negative attitude about sales',
      'Poor communication skills'
    ],
    questionsToAsk: [
      'What\'s your top-selling product?',
      'How does commission/bonus structure work?',
      'What sales training do you provide?',
      'What do your top performers do differently?'
    ],
    commonMistakes: [
      'Not knowing the store\'s products',
      'Being too aggressive in role-play',
      'Not asking questions before selling',
      'Focusing only on features, not benefits'
    ],
    proTips: [
      'Research the store\'s products beforehand',
      'Practice the "sell me this pen" question',
      'Dress in the store\'s style',
      'Ask about what makes top performers successful',
      'Show genuine enthusiasm for the products'
    ]
  },

  // ============================================
  // FACILITIES
  // ============================================
  {
    roleSlug: 'security-guard',
    roleTitle: 'Security Guard',
    industry: 'facilities',
    overview: 'Security interviews assess your ability to handle conflicts, observe carefully, and maintain professionalism. Background checks are standard.',
    whatToWear: 'Business casual or professional attire.',
    whatToBring: ['Government ID', 'Security guard license', 'Resume', 'Any certifications'],
    interviewDuration: '20-40 minutes',
    interviewFormat: 'One-on-one with security manager, may include scenario questions.',
    questions: [
      {
        question: 'How would you handle someone refusing to leave the property?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I\'d approach calmly and professionally, explain they need to leave, and give them the opportunity to comply. I\'d document the incident and call for backup or police if they refuse or become aggressive. I wouldn\'t physically engage unless absolutely necessary for safety.',
        tips: ['Show de-escalation first', 'Mention documentation', 'Know when to call for help']
      },
      {
        question: 'What would you do if you suspected an employee of theft?',
        type: 'situational',
        difficulty: 'hard',
        sampleAnswer: 'I\'d observe and document what I witnessed without confronting them directly. I\'d report my observations to my supervisor and loss prevention with specific details - times, actions, what I saw. I wouldn\'t accuse anyone or take action alone.',
        tips: ['Emphasize observation and documentation', 'Don\'t confront directly', 'Follow chain of command']
      },
      {
        question: 'Describe your observation skills.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'I pay attention to details others miss - body language, people who seem out of place, changes in the environment. I continuously scan my surroundings and note patterns. I document observations in detailed logs. I trust my instincts when something seems off.',
        tips: ['Give specific examples', 'Mention documentation', 'Show situational awareness']
      },
      {
        question: 'How do you stay alert during long, quiet shifts?',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'I do regular patrols rather than staying stationary, which keeps me moving and alert. I stay hydrated, take short breaks when appropriate, and maintain focus by treating every shift like something could happen. Complacency is dangerous in security.',
        tips: ['Show you understand the challenge', 'Mention staying active', 'Emphasize consistent alertness']
      },
      {
        question: 'Have you ever had to write an incident report? Describe your process.',
        type: 'technical',
        difficulty: 'medium',
        sampleAnswer: 'Yes, I document who, what, when, where, and how. I include specific times, descriptions of people involved, what actions were taken, and the outcome. I\'m factual and objective, avoiding opinions. I complete reports immediately while details are fresh.',
        tips: ['Show you understand documentation', 'Be specific', 'Mention timeliness']
      }
    ],
    redFlags: [
      'Aggressive tendencies',
      'Unable to stay calm in scenarios',
      'No awareness of legal limits',
      'History of violence or confrontation',
      'Poor attention to detail'
    ],
    questionsToAsk: [
      'What type of site would I be assigned to?',
      'What equipment/technology is used?',
      'What are the escalation procedures?',
      'Is additional training provided?',
      'What\'s the typical patrol schedule?'
    ],
    commonMistakes: [
      'Suggesting physical confrontation first',
      'Not understanding your legal authority',
      'Appearing hot-headed or aggressive',
      'Not mentioning de-escalation'
    ],
    proTips: [
      'Emphasize de-escalation and observation',
      'Bring your guard card/license',
      'Mention any relevant certifications (CPR, first aid)',
      'Stay calm when answering scenario questions',
      'Ask about the specific site you\'d work'
    ]
  },
  {
    roleSlug: 'janitor',
    roleTitle: 'Janitor/Custodian',
    industry: 'facilities',
    overview: 'Janitor interviews are typically brief, focusing on reliability, work ethic, and physical capability.',
    whatToWear: 'Clean, casual clothes.',
    whatToBring: ['Government ID', 'Resume (optional)', 'References'],
    interviewDuration: '10-20 minutes',
    interviewFormat: 'Brief conversation with facilities manager.',
    questions: [
      {
        question: 'Why are you interested in janitorial work?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'I take pride in making spaces clean and welcoming. It\'s honest work with consistent hours, and I enjoy seeing the immediate results of my effort. I\'m reliable and don\'t mind working independently.',
        tips: ['Show genuine interest', 'Mention reliability', 'Don\'t apologize for the work']
      },
      {
        question: 'Can you work evenings/nights?',
        type: 'general',
        difficulty: 'easy',
        sampleAnswer: 'Yes, I understand cleaning is often done when buildings are empty. I\'m comfortable with evening and overnight shifts. I\'m [a night owl / flexible with my schedule].',
        tips: ['Be honest about preferences', 'Show flexibility']
      },
      {
        question: 'How do you prioritize when you have multiple areas to clean?',
        type: 'situational',
        difficulty: 'medium',
        sampleAnswer: 'I start with high-traffic areas and restrooms since those need the most attention. I follow any established cleaning schedule. I work systematically through the building so nothing gets missed. If there\'s a special request, I adjust priorities.',
        tips: ['Show organization', 'Mention systematic approach', 'Be flexible']
      },
      {
        question: 'Tell me about a time you went above and beyond at work.',
        type: 'behavioral',
        difficulty: 'medium',
        sampleAnswer: 'The building was hosting an important event, so I came in early to do extra deep cleaning and made sure everything was perfect. The manager thanked me personally and the event went well. I take pride in my work.',
        tips: ['Show initiative', 'Give specific example', 'Demonstrate pride in work']
      }
    ],
    redFlags: [
      'Concerns about physical work',
      'Unreliable attendance history',
      'Negative attitude about the work',
      'Very limited availability'
    ],
    questionsToAsk: [
      'What areas would I be responsible for?',
      'What shifts are available?',
      'Are supplies and equipment provided?',
      'Is there opportunity for advancement?'
    ],
    commonMistakes: [
      'Appearing ashamed of the work',
      'Being vague about availability',
      'Not showing reliability',
      'Underestimating the physical demands'
    ],
    proTips: [
      'Reliability is the #1 quality employers want',
      'Show pride in keeping spaces clean',
      'Be honest about your availability',
      'Mention any relevant experience, even household cleaning'
    ]
  }
];

// Helper functions
export const getInterviewGuideBySlug = (slug: string) =>
  interviewGuides.find(guide => guide.roleSlug === slug);

export const getInterviewGuidesByIndustry = (industry: string) =>
  interviewGuides.filter(guide => guide.industry === industry);

export const getAllInterviewGuideSlugs = () =>
  interviewGuides.map(guide => guide.roleSlug);

export const getQuestionsOfType = (guide: RoleInterviewGuide, type: InterviewQuestion['type']) =>
  guide.questions.filter(q => q.type === type);

export const getEasyQuestions = (guide: RoleInterviewGuide) =>
  guide.questions.filter(q => q.difficulty === 'easy');

export const getHardQuestions = (guide: RoleInterviewGuide) =>
  guide.questions.filter(q => q.difficulty === 'hard');

