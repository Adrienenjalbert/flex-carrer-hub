export interface Cocktail {
  id: string;
  name: string;
  baseSpirit: 'vodka' | 'gin' | 'rum' | 'tequila' | 'whiskey' | 'brandy' | 'champagne' | 'non-alcoholic';
  ingredients: { name: string; amount: string }[];
  glass: string;
  garnish: string;
  technique: 'shaken' | 'stirred' | 'built' | 'blended';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pronunciation?: string;
  tips?: string;
}

export const cocktails: Cocktail[] = [
  // VODKA COCKTAILS
  {
    id: 'vodka-martini',
    name: 'Vodka Martini',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2.5 oz' },
      { name: 'Dry vermouth', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Olive or lemon twist',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'VOD-kuh mar-TEE-nee',
    tips: 'Stir with ice for 30 seconds, strain into chilled glass'
  },
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Citrus vodka', amount: '1.5 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Cranberry juice', amount: '0.75 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Lime wheel or orange twist',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'koz-moh-POL-ih-tan',
    tips: 'Flame an orange peel over the drink for presentation. Use quality cranberry (not cocktail blend).'
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Copper mug',
    garnish: 'Lime wedge and mint sprig',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'MOSS-koh MYOOL',
    tips: 'Serve in a copper mug if available — it keeps the drink colder. Use fresh ginger beer, not ginger ale.'
  },
  {
    id: 'white-russian',
    name: 'White Russian',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Coffee liqueur', amount: '1 oz' },
      { name: 'Heavy cream', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'wite RUSH-un',
    tips: 'Layer cream on top by pouring over the back of a spoon. Stir lightly for a marbled effect.'
  },
  {
    id: 'bloody-mary',
    name: 'Bloody Mary',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '1.5 oz' },
      { name: 'Tomato juice', amount: '3 oz' },
      { name: 'Lemon juice', amount: '0.5 oz' },
      { name: 'Worcestershire sauce', amount: '2 dashes' },
      { name: 'Hot sauce', amount: 'To taste' },
      { name: 'Salt & pepper', amount: 'To taste' }
    ],
    glass: 'Highball glass',
    garnish: 'Celery stalk, olive, lemon wedge',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'BLUH-dee MAIR-ee',
    tips: 'Make the mix ahead so flavours meld. Rim half the glass with celery salt for balanced sips.'
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Coffee liqueur', amount: '0.5 oz' },
      { name: 'Fresh espresso', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.25 oz' }
    ],
    glass: 'Martini glass',
    garnish: '3 coffee beans',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'eh-SPRES-oh mar-TEE-nee',
    tips: 'Shake hard to create the signature foam'
  },
  {
    id: 'screwdriver',
    name: 'Screwdriver',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '2 oz' },
      { name: 'Orange juice', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'SKROO-dry-ver',
    tips: 'Use fresh-squeezed OJ when possible — the difference is night and day.'
  },
  {
    id: 'sex-on-the-beach',
    name: 'Sex on the Beach',
    baseSpirit: 'vodka',
    ingredients: [
      { name: 'Vodka', amount: '1.5 oz' },
      { name: 'Peach schnapps', amount: '0.5 oz' },
      { name: 'Orange juice', amount: '2 oz' },
      { name: 'Cranberry juice', amount: '2 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice and cherry',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'seks on the beech',
    tips: 'Pour juices first, then spirits to mix naturally. Serve extra cold for the best taste.'
  },

  // GIN COCKTAILS
  {
    id: 'gin-tonic',
    name: 'Gin & Tonic',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Tonic water', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'jin TAHN-ik',
    tips: 'Pour tonic slowly down the side to preserve carbonation. Use quality tonic — it\'s half the drink.'
  },
  {
    id: 'negroni',
    name: 'Negroni',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '1 oz' },
      { name: 'Campari', amount: '1 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'neh-GROH-nee',
    tips: 'Stir for 20-25 seconds. A big ice cube keeps it cold without over-diluting.'
  },
  {
    id: 'tom-collins',
    name: 'Tom Collins',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Fresh lemon juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Club soda', amount: 'Top' }
    ],
    glass: 'Collins glass',
    garnish: 'Lemon wheel and cherry',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'tom KAHL-inz',
    tips: 'Shake everything except soda, then strain and top. Never shake the soda or you lose the fizz.'
  },
  {
    id: 'french-75',
    name: 'French 75',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '1.5 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Champagne', amount: 'Top' }
    ],
    glass: 'Champagne flute',
    garnish: 'Lemon twist',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'french SEV-en-tee-five',
    tips: 'Shake gin, lemon, and syrup first, then strain and top with champagne. Never shake the champagne.'
  },
  {
    id: 'gimlet',
    name: 'Gimlet',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2.5 oz' },
      { name: 'Fresh lime juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'GIM-let',
    tips: 'Use fresh lime juice — Rose\'s lime cordial gives a completely different (and sweeter) cocktail.'
  },
  {
    id: 'martini',
    name: 'Classic Martini',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2.5 oz' },
      { name: 'Dry vermouth', amount: '0.5 oz' }
    ],
    glass: 'Martini glass',
    garnish: 'Olive or lemon twist',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'mar-TEE-nee',
    tips: 'Always stir, never shake - keeps it silky smooth'
  },
  {
    id: 'aviation',
    name: 'Aviation',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Maraschino liqueur', amount: '0.5 oz' },
      { name: 'Crème de violette', amount: '0.25 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Brandied cherry',
    technique: 'shaken',
    difficulty: 'advanced',
    pronunciation: 'ay-vee-AY-shun',
    tips: 'Go light on crème de violette — a quarter ounce is plenty or it tastes like perfume.'
  },
  {
    id: 'last-word',
    name: 'Last Word',
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '0.75 oz' },
      { name: 'Green Chartreuse', amount: '0.75 oz' },
      { name: 'Maraschino liqueur', amount: '0.75 oz' },
      { name: 'Fresh lime juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'advanced',
    pronunciation: 'last WERD',
    tips: 'Equal parts make this easy to remember. Shake hard — Chartreuse is dense and needs proper dilution.'
  },
  {
    id: 'bees-knees',
    name: "Bee's Knees",
    baseSpirit: 'gin',
    ingredients: [
      { name: 'Gin', amount: '2 oz' },
      { name: 'Honey syrup', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lemon twist',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'beez NEEZ',
    tips: 'Make honey syrup as 1:1 honey and warm water — straight honey won\'t mix. Use a floral gin.'
  },

  // RUM COCKTAILS
  {
    id: 'mojito',
    name: 'Mojito',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.75 oz' },
      { name: 'Fresh mint leaves', amount: '6-8 leaves' },
      { name: 'Club soda', amount: 'Top' }
    ],
    glass: 'Highball glass',
    garnish: 'Mint sprig and lime wheel',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'moh-HEE-toh',
    tips: 'Gently muddle mint - bruise, don\'t shred'
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'DAK-uh-ree',
    tips: 'This is a shaken cocktail, not a frozen slushie. Taste and adjust the sweet-sour balance.'
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Coconut cream', amount: '2 oz' },
      { name: 'Pineapple juice', amount: '2 oz' },
      { name: 'Ice', amount: '1 cup' }
    ],
    glass: 'Hurricane glass',
    garnish: 'Pineapple wedge and cherry',
    technique: 'blended',
    difficulty: 'beginner',
    pronunciation: 'PEEN-ya koh-LAH-da',
    tips: 'Chill coconut cream before blending for a thicker texture. Fresh pineapple juice elevates it.'
  },
  {
    id: 'dark-n-stormy',
    name: 'Dark \'n\' Stormy',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Dark rum', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'dark and STOR-mee',
    tips: 'Float the dark rum on top of the ginger beer for a layered look.'
  },
  {
    id: 'mai-tai',
    name: 'Mai Tai',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '1 oz' },
      { name: 'Dark rum', amount: '1 oz' },
      { name: 'Orange curaçao', amount: '0.5 oz' },
      { name: 'Orgeat syrup', amount: '0.5 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Mint sprig and lime shell',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'MY-tie',
    tips: 'Use orgeat sparingly — it\'s sweet and a little goes a long way. Float dark rum on top.'
  },
  {
    id: 'cuba-libre',
    name: 'Cuba Libre',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'White rum', amount: '2 oz' },
      { name: 'Cola', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'KOO-ba LEE-bray',
    tips: 'Squeeze the lime into the glass, then drop it in. It\'s not a rum and coke without the lime.'
  },
  {
    id: 'hurricane',
    name: 'Hurricane',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Light rum', amount: '2 oz' },
      { name: 'Dark rum', amount: '2 oz' },
      { name: 'Passion fruit juice', amount: '2 oz' },
      { name: 'Orange juice', amount: '1 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '1 oz' },
      { name: 'Grenadine', amount: '1 tbsp' }
    ],
    glass: 'Hurricane glass',
    garnish: 'Orange slice and cherry',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'HER-ih-kayn',
    tips: 'Pre-batch the juices for speed during service. The drink should be strong, sweet, and citrusy.'
  },
  {
    id: 'caipirinha',
    name: 'Caipirinha',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Cachaça', amount: '2 oz' },
      { name: 'Lime', amount: '1 whole, cut into wedges' },
      { name: 'Sugar', amount: '2 tsp' }
    ],
    glass: 'Rocks glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'ky-pee-REEN-yah',
    tips: 'Muddle lime wedges with sugar directly in the glass. Use raw cane sugar for authenticity.'
  },
  {
    id: 'jungle-bird',
    name: 'Jungle Bird',
    baseSpirit: 'rum',
    ingredients: [
      { name: 'Dark rum', amount: '1.5 oz' },
      { name: 'Campari', amount: '0.75 oz' },
      { name: 'Pineapple juice', amount: '1.5 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' }
    ],
    glass: 'Rocks glass',
    garnish: 'Pineapple wedge',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'JUNG-ul BERD',
    tips: 'Don\'t skip the Campari — its bitterness balances the sweet pineapple. Use Jamaican rum for depth.'
  },

  // TEQUILA COCKTAILS
  {
    id: 'margarita',
    name: 'Margarita',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Agave syrup', amount: '0.5 oz' }
    ],
    glass: 'Margarita glass or rocks',
    garnish: 'Lime wheel and salt rim',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'mar-gah-REE-ta',
    tips: 'Shake hard with plenty of ice. Salt only half the rim so guests can choose.'
  },
  {
    id: 'paloma',
    name: 'Paloma',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Grapefruit soda', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' },
      { name: 'Pinch of salt', amount: 'To taste' }
    ],
    glass: 'Highball glass',
    garnish: 'Grapefruit wedge and salt rim',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'pah-LOH-mah',
    tips: 'Squeeze fresh grapefruit if possible — it\'s far better than bottled. Squirt or Jarritos works in a pinch.'
  },
  {
    id: 'tequila-sunrise',
    name: 'Tequila Sunrise',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Orange juice', amount: '4 oz' },
      { name: 'Grenadine', amount: '0.5 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange slice and cherry',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'teh-KEE-luh SUN-rise',
    tips: 'Pour grenadine last - it sinks for the sunrise effect'
  },
  {
    id: 'mexican-mule',
    name: 'Mexican Mule',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila', amount: '2 oz' },
      { name: 'Ginger beer', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '0.5 oz' }
    ],
    glass: 'Copper mug',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'MEK-sih-kan MYOOL',
    tips: 'Add a few slices of jalapeño for a spicy twist that pairs well with tequila.'
  },
  {
    id: 'tommy-margarita',
    name: "Tommy's Margarita",
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Agave nectar', amount: '0.5 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Lime wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'TAH-mee mar-gah-REE-tuh',
    tips: 'No triple sec - simpler and more tequila-forward'
  },
  {
    id: 'ranch-water',
    name: 'Ranch Water',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Tequila blanco', amount: '2 oz' },
      { name: 'Topo Chico', amount: '4 oz' },
      { name: 'Fresh lime juice', amount: '1 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Lime wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'ranch WAH-ter',
    tips: 'Build in the bottle of Topo Chico for a casual serve. Keep everything ice-cold.'
  },
  {
    id: 'naked-and-famous',
    name: 'Naked and Famous',
    baseSpirit: 'tequila',
    ingredients: [
      { name: 'Mezcal', amount: '0.75 oz' },
      { name: 'Yellow Chartreuse', amount: '0.75 oz' },
      { name: 'Aperol', amount: '0.75 oz' },
      { name: 'Fresh lime juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'None',
    technique: 'shaken',
    difficulty: 'advanced',
    pronunciation: 'NAY-kid and FAY-mus',
    tips: 'Equal parts make it easy to batch. The smoky mezcal is essential — don\'t sub tequila.'
  },

  // WHISKEY COCKTAILS
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon or rye whiskey', amount: '2 oz' },
      { name: 'Sugar cube', amount: '1' },
      { name: 'Angostura bitters', amount: '2-3 dashes' },
      { name: 'Water', amount: 'Splash' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel and cherry',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'old FASH-und',
    tips: 'Muddle sugar with bitters, add whiskey, then ice'
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Rye whiskey', amount: '2 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' },
      { name: 'Angostura bitters', amount: '2 dashes' }
    ],
    glass: 'Coupe or martini glass',
    garnish: 'Brandied cherry',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'man-HAT-un',
    tips: 'Stir, don\'t shake — shaking makes it cloudy. Use good sweet vermouth and keep it refrigerated.'
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '2 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Egg white', amount: '0.5 oz (optional)' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Cherry and orange slice',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'WIS-kee SOWR',
    tips: 'Dry shake first (no ice) if using egg white for foam'
  },
  {
    id: 'irish-coffee',
    name: 'Irish Coffee',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Irish whiskey', amount: '1.5 oz' },
      { name: 'Hot coffee', amount: '4 oz' },
      { name: 'Brown sugar', amount: '1 tsp' },
      { name: 'Fresh cream', amount: 'Float' }
    ],
    glass: 'Irish coffee glass',
    garnish: 'None',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'EYE-rish KAW-fee',
    tips: 'Float cream over the back of a spoon'
  },
  {
    id: 'mint-julep',
    name: 'Mint Julep',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '2.5 oz' },
      { name: 'Fresh mint leaves', amount: '8-10 leaves' },
      { name: 'Simple syrup', amount: '0.5 oz' },
      { name: 'Crushed ice', amount: 'Plenty' }
    ],
    glass: 'Julep cup',
    garnish: 'Mint bouquet',
    technique: 'built',
    difficulty: 'intermediate',
    pronunciation: 'mint JOO-lep',
    tips: 'Pack crushed ice high above the rim and slap the mint to release oils before garnishing.'
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Rye whiskey', amount: '2 oz' },
      { name: 'Absinthe', amount: 'Rinse' },
      { name: 'Sugar cube', amount: '1' },
      { name: 'Peychaud\'s bitters', amount: '3 dashes' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Lemon peel (expressed, not dropped)',
    technique: 'stirred',
    difficulty: 'advanced',
    pronunciation: 'SAZ-uh-rak',
    tips: 'Chill the serving glass with ice while you build. The absinthe rinse should be a thin coat, not a pour.'
  },
  {
    id: 'boulevardier',
    name: 'Boulevardier',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '1.5 oz' },
      { name: 'Sweet vermouth', amount: '1 oz' },
      { name: 'Campari', amount: '1 oz' }
    ],
    glass: 'Old fashioned glass',
    garnish: 'Orange peel',
    technique: 'stirred',
    difficulty: 'beginner',
    pronunciation: 'BOO-luh-var-dee-ay',
    tips: 'Essentially a Negroni with bourbon — stir longer since whiskey is heavier than gin.'
  },
  {
    id: 'penicillin',
    name: 'Penicillin',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Blended Scotch', amount: '2 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' },
      { name: 'Honey-ginger syrup', amount: '0.75 oz' },
      { name: 'Islay Scotch', amount: '0.25 oz float' }
    ],
    glass: 'Rocks glass',
    garnish: 'Candied ginger',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'pen-ih-SIL-in',
    tips: 'Float the smoky Islay Scotch on top — don\'t stir it in. Make honey-ginger syrup by simmering equal parts honey, water, and fresh ginger.'
  },
  {
    id: 'paper-plane',
    name: 'Paper Plane',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '0.75 oz' },
      { name: 'Amaro Nonino', amount: '0.75 oz' },
      { name: 'Aperol', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'None',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'PAY-per playn',
    tips: 'Equal parts everything — easy to scale for batching. Amaro Nonino is key; Averna won\'t give the same result.'
  },
  {
    id: 'gold-rush',
    name: 'Gold Rush',
    baseSpirit: 'whiskey',
    ingredients: [
      { name: 'Bourbon', amount: '2 oz' },
      { name: 'Honey syrup', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Rocks glass',
    garnish: 'Lemon wheel',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'gold RUSH',
    tips: 'A whiskey sour with honey instead of sugar. Make honey syrup as 1:1 honey and hot water.'
  },

  // BRANDY COCKTAILS
  {
    id: 'sidecar',
    name: 'Sidecar',
    baseSpirit: 'brandy',
    ingredients: [
      { name: 'Cognac', amount: '2 oz' },
      { name: 'Triple sec', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '0.75 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Sugar rim and lemon twist',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'SIDE-kar',
    tips: 'Sugar-rim only half the glass so it\'s not too sweet. Shake vigorously for proper chill.'
  },
  {
    id: 'brandy-alexander',
    name: 'Brandy Alexander',
    baseSpirit: 'brandy',
    ingredients: [
      { name: 'Cognac', amount: '1.5 oz' },
      { name: 'Crème de cacao (dark)', amount: '1 oz' },
      { name: 'Heavy cream', amount: '1 oz' }
    ],
    glass: 'Coupe glass',
    garnish: 'Nutmeg',
    technique: 'shaken',
    difficulty: 'beginner',
    pronunciation: 'BRAN-dee al-eg-ZAN-der',
    tips: 'Shake hard with ice for a frothy, creamy texture. Freshly grated nutmeg is a must.'
  },
  {
    id: 'amaretto-sour',
    name: 'Amaretto Sour',
    baseSpirit: 'brandy',
    ingredients: [
      { name: 'Amaretto', amount: '1.5 oz' },
      { name: 'Bourbon', amount: '0.75 oz' },
      { name: 'Fresh lemon juice', amount: '1 oz' },
      { name: 'Simple syrup', amount: '0.25 oz' },
      { name: 'Egg white', amount: '1' }
    ],
    glass: 'Rocks glass',
    garnish: 'Cherry and lemon wheel',
    technique: 'shaken',
    difficulty: 'intermediate',
    pronunciation: 'am-ah-RET-oh SOWR',
    tips: 'The bourbon adds backbone — don\'t skip it. Dry shake first (no ice) for a thick, frothy head.'
  },

  // CHAMPAGNE COCKTAILS
  {
    id: 'mimosa',
    name: 'Mimosa',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Champagne', amount: '3 oz' },
      { name: 'Orange juice', amount: '3 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'Orange slice',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'mih-MOH-suh',
    tips: 'Use fresh-squeezed OJ and pour champagne slowly. Keep everything well chilled — no ice needed.'
  },
  {
    id: 'bellini',
    name: 'Bellini',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Prosecco', amount: '4 oz' },
      { name: 'White peach purée', amount: '2 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'beh-LEE-nee',
    tips: 'Use ripe white peaches for the purée. Strain out any pulp for a silky pour.'
  },
  {
    id: 'kir-royale',
    name: 'Kir Royale',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Champagne', amount: '5 oz' },
      { name: 'Crème de cassis', amount: '0.5 oz' }
    ],
    glass: 'Champagne flute',
    garnish: 'None',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'keer roy-AHL',
    tips: 'Add crème de cassis first, then pour champagne slowly to preserve bubbles.'
  },
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    baseSpirit: 'champagne',
    ingredients: [
      { name: 'Aperol', amount: '3 oz' },
      { name: 'Prosecco', amount: '3 oz' },
      { name: 'Soda water', amount: '1 oz' }
    ],
    glass: 'Wine glass',
    garnish: 'Orange slice',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'ah-peh-ROHL SPRITZ',
    tips: 'Build over plenty of ice in a large wine glass. Add Prosecco first, then Aperol, then soda.'
  },

  // NON-ALCOHOLIC COCKTAILS
  {
    id: 'shirley-temple',
    name: 'Shirley Temple',
    baseSpirit: 'non-alcoholic',
    ingredients: [
      { name: 'Ginger ale', amount: '6 oz' },
      { name: 'Grenadine', amount: '1 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Cherry and orange slice',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'SHUR-lee TEM-pul',
    tips: 'Use real grenadine (pomegranate-based) — not the neon-red stuff. Add grenadine last for a layered look.'
  },
  {
    id: 'arnold-palmer',
    name: 'Arnold Palmer',
    baseSpirit: 'non-alcoholic',
    ingredients: [
      { name: 'Iced tea', amount: '6 oz' },
      { name: 'Lemonade', amount: '6 oz' }
    ],
    glass: 'Tall glass',
    garnish: 'Lemon wedge',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'AR-nuld PAH-mer',
    tips: 'Brew strong tea and let it cool completely. A 1:1 ratio is classic but adjust to taste.'
  },
  {
    id: 'virgin-mojito',
    name: 'Virgin Mojito',
    baseSpirit: 'non-alcoholic',
    ingredients: [
      { name: 'Fresh lime juice', amount: '1 oz' },
      { name: 'Fresh mint leaves', amount: '8 leaves' },
      { name: 'Simple syrup', amount: '1 oz' },
      { name: 'Soda water', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Mint sprig and lime wheel',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'VER-jin moh-HEE-toh',
    tips: 'Gently muddle mint with lime and syrup — don\'t shred the leaves. Top with soda and stir gently.'
  },
  {
    id: 'na-espresso-tonic',
    name: 'NA Espresso Tonic',
    baseSpirit: 'non-alcoholic',
    ingredients: [
      { name: 'Espresso', amount: '2 oz' },
      { name: 'Tonic water', amount: '4 oz' }
    ],
    glass: 'Highball glass',
    garnish: 'Orange twist',
    technique: 'built',
    difficulty: 'beginner',
    pronunciation: 'eh-SPRES-oh TAHN-ik',
    tips: 'Pour espresso slowly over ice-cold tonic for a dramatic layered effect. Let it settle before serving.'
  }
];

export const spiritColors: Record<string, string> = {
  vodka: 'bg-slate-100 text-slate-700 border-slate-200',
  gin: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rum: 'bg-amber-50 text-amber-700 border-amber-200',
  tequila: 'bg-lime-50 text-lime-700 border-lime-200',
  whiskey: 'bg-orange-50 text-orange-700 border-orange-200',
  brandy: 'bg-rose-50 text-rose-700 border-rose-200',
  champagne: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'non-alcoholic': 'bg-sky-50 text-sky-700 border-sky-200'
};

export const spiritIcons: Record<string, string> = {
  vodka: '🍸',
  gin: '🌿',
  rum: '🏝️',
  tequila: '🌵',
  whiskey: '🥃',
  brandy: '🍷',
  champagne: '🥂',
  'non-alcoholic': '🧃'
};

export const techniqueDescriptions: Record<string, string> = {
  shaken: 'Combine ingredients with ice in a shaker, shake vigorously for 10-15 seconds, strain into glass',
  stirred: 'Combine ingredients with ice in a mixing glass, stir for 30 seconds, strain into glass',
  built: 'Build directly in the serving glass over ice',
  blended: 'Combine ingredients with ice in a blender until smooth'
};

export const glassDescriptions: Record<string, string> = {
  'Martini glass': 'V-shaped stemmed glass, typically 4-6 oz',
  'Old fashioned glass': 'Short tumbler, also called rocks glass, 6-10 oz',
  'Highball glass': 'Tall straight glass, 8-12 oz',
  'Collins glass': 'Tall narrow glass, 10-14 oz',
  'Coupe glass': 'Shallow bowl-shaped stemmed glass, 5-7 oz',
  'Champagne flute': 'Tall narrow stemmed glass, 6-8 oz',
  'Hurricane glass': 'Tall curved glass resembling hurricane lamp, 15-20 oz',
  'Copper mug': 'Traditional copper vessel for Moscow Mule, 12-16 oz',
  'Margarita glass': 'Wide shallow bowl on stem, 12-16 oz',
  'Julep cup': 'Silver or pewter cup, 10-12 oz',
  'Irish coffee glass': 'Footed glass mug with handle, 8-10 oz',
  'Wine glass': 'Standard stemmed glass, 12-16 oz',
  'Rocks glass': 'Short tumbler, also called old fashioned glass, 6-10 oz',
  'Tall glass': 'Versatile tall glass, 12-16 oz'
};
