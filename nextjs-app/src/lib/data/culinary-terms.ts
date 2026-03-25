export interface CulinaryTerm {
  id: string;
  term: string;
  termSpanish?: string;
  pronunciation: string;
  definition: string;
  definitionSpanish?: string;
  category: 'technique' | 'cut' | 'term' | 'temperature' | 'cuisine';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface FoodSafetyQuestion {
  id: string;
  question: string;
  questionSpanish?: string;
  correctAnswer: string;
  options: string[];
  optionsSpanish?: string[];
  explanation: string;
  explanationSpanish?: string;
  category: 'temperature' | 'storage' | 'contamination' | 'hygiene';
}

export interface KnifeCut {
  id: string;
  name: string;
  nameSpanish?: string;
  pronunciation: string;
  description: string;
  descriptionSpanish?: string;
  size: string;
  usedFor: string[];
}

export const culinaryTerms: CulinaryTerm[] = [
  // Techniques - Beginner
  {
    id: 'saute',
    term: 'Sauté',
    termSpanish: 'Saltear',
    pronunciation: 'soh-TAY',
    definition: 'To cook food quickly in a small amount of fat over high heat while stirring',
    definitionSpanish: 'Cocinar rápidamente en poca grasa a fuego alto mientras se revuelve',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'blanch',
    term: 'Blanch',
    termSpanish: 'Blanquear',
    pronunciation: 'BLANCH',
    definition: 'To briefly cook in boiling water, then plunge into ice water to stop cooking',
    definitionSpanish: 'Cocinar brevemente en agua hirviendo, luego sumergir en agua helada',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'deglaze',
    term: 'Deglaze',
    termSpanish: 'Desglasar',
    pronunciation: 'dee-GLAYZ',
    definition: 'To add liquid to a hot pan to loosen browned bits from the bottom',
    definitionSpanish: 'Añadir líquido a una sartén caliente para soltar los trozos dorados del fondo',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'fold',
    term: 'Fold',
    termSpanish: 'Incorporar',
    pronunciation: 'FOLD',
    definition: 'To gently combine a light mixture into a heavier one without deflating',
    definitionSpanish: 'Combinar suavemente una mezcla ligera con una más pesada sin desinflar',
    category: 'technique',
    difficulty: 'beginner'
  },
  {
    id: 'simmer',
    term: 'Simmer',
    termSpanish: 'Hervir a fuego lento',
    pronunciation: 'SIM-er',
    definition: 'To cook in liquid just below boiling point with small bubbles',
    definitionSpanish: 'Cocinar en líquido justo por debajo del punto de ebullición con pequeñas burbujas',
    category: 'technique',
    difficulty: 'beginner'
  },
  // Techniques - Intermediate
  {
    id: 'braise',
    term: 'Braise',
    termSpanish: 'Estofar',
    pronunciation: 'BRAYZ',
    definition: 'To brown meat then cook slowly in a covered pot with liquid',
    definitionSpanish: 'Dorar la carne y luego cocinar lentamente en una olla tapada con líquido',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'poach',
    term: 'Poach',
    termSpanish: 'Escalfar',
    pronunciation: 'POCH',
    definition: 'To cook gently in liquid at 160-180°F, below simmering',
    definitionSpanish: 'Cocinar suavemente en líquido a 71-82°C, por debajo de hervir',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'reduce',
    term: 'Reduce',
    termSpanish: 'Reducir',
    pronunciation: 'ree-DOOS',
    definition: 'To boil a liquid to decrease volume and concentrate flavor',
    definitionSpanish: 'Hervir un líquido para disminuir el volumen y concentrar el sabor',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'temper',
    term: 'Temper',
    termSpanish: 'Temperar',
    pronunciation: 'TEM-per',
    definition: 'To slowly bring up temperature of cold ingredient to prevent curdling',
    definitionSpanish: 'Elevar lentamente la temperatura de un ingrediente frío para evitar que se corte',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'baste',
    term: 'Baste',
    termSpanish: 'Rociar',
    pronunciation: 'BAYST',
    definition: 'To spoon or brush liquid over food during cooking to keep it moist',
    definitionSpanish: 'Verter o cepillar líquido sobre la comida durante la cocción para mantenerla húmeda',
    category: 'technique',
    difficulty: 'intermediate'
  },
  // Techniques - Advanced
  {
    id: 'flambe',
    term: 'Flambé',
    termSpanish: 'Flamear',
    pronunciation: 'flahm-BAY',
    definition: 'To ignite alcohol in a dish for flavor and presentation',
    definitionSpanish: 'Encender el alcohol en un plato para sabor y presentación',
    category: 'technique',
    difficulty: 'advanced'
  },
  {
    id: 'confit',
    term: 'Confit',
    termSpanish: 'Confitar',
    pronunciation: 'con-FEE',
    definition: 'To cook slowly in fat at low temperature, often for preservation',
    definitionSpanish: 'Cocinar lentamente en grasa a baja temperatura, a menudo para conservar',
    category: 'technique',
    difficulty: 'advanced'
  },
  {
    id: 'sous-vide',
    term: 'Sous Vide',
    termSpanish: 'Sous Vide',
    pronunciation: 'soo-VEED',
    definition: 'To cook vacuum-sealed food in precisely controlled water bath',
    definitionSpanish: 'Cocinar alimentos al vacío en un baño de agua controlado con precisión',
    category: 'technique',
    difficulty: 'advanced'
  },
  // Terms - Beginner
  {
    id: 'mise-en-place',
    term: 'Mise en Place',
    termSpanish: 'Mise en Place',
    pronunciation: 'MEEZ-ahn-plahs',
    definition: '"Everything in its place" - prepping and organizing all ingredients before cooking',
    definitionSpanish: '"Todo en su lugar" - preparar y organizar todos los ingredientes antes de cocinar',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'al-dente',
    term: 'Al Dente',
    termSpanish: 'Al Dente',
    pronunciation: 'al-DEN-tay',
    definition: 'Pasta or vegetables cooked to be firm to the bite, not soft',
    definitionSpanish: 'Pasta o vegetales cocidos para que estén firmes al morderlos, no blandos',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'au-jus',
    term: 'Au Jus',
    termSpanish: 'Con su jugo',
    pronunciation: 'oh-ZHOO',
    definition: 'Served with its own cooking juices',
    definitionSpanish: 'Servido con sus propios jugos de cocción',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'garnish',
    term: 'Garnish',
    termSpanish: 'Guarnición',
    pronunciation: 'GAR-nish',
    definition: 'Decorative or flavor-enhancing addition to a finished dish',
    definitionSpanish: 'Adición decorativa o que mejora el sabor de un plato terminado',
    category: 'term',
    difficulty: 'beginner'
  },
  // Terms - Intermediate
  {
    id: 'roux',
    term: 'Roux',
    termSpanish: 'Roux',
    pronunciation: 'ROO',
    definition: 'Equal parts fat and flour cooked together as sauce thickener',
    definitionSpanish: 'Partes iguales de grasa y harina cocidas juntas como espesante de salsas',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'bouquet-garni',
    term: 'Bouquet Garni',
    termSpanish: 'Ramillete de hierbas',
    pronunciation: 'boo-KAY gar-NEE',
    definition: 'Bundle of herbs tied together for flavoring stocks and stews',
    definitionSpanish: 'Manojo de hierbas atadas para dar sabor a caldos y guisos',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'bain-marie',
    term: 'Bain-Marie',
    termSpanish: 'Baño María',
    pronunciation: 'ban-mah-REE',
    definition: 'Water bath for gentle, even cooking or keeping food warm',
    definitionSpanish: 'Baño de agua para cocción suave y uniforme o mantener la comida caliente',
    category: 'technique',
    difficulty: 'intermediate'
  },
  {
    id: 'mother-sauce',
    term: 'Mother Sauce',
    termSpanish: 'Salsa Madre',
    pronunciation: 'MUH-ther SAWS',
    definition: 'One of five base sauces from which other sauces derive (béchamel, velouté, espagnole, hollandaise, tomato)',
    definitionSpanish: 'Una de las cinco salsas base de las cuales derivan otras salsas',
    category: 'term',
    difficulty: 'intermediate'
  },
  // Terms - Advanced
  {
    id: 'demi-glace',
    term: 'Demi-Glace',
    termSpanish: 'Demi-Glace',
    pronunciation: 'DEM-ee-glahs',
    definition: 'Rich brown sauce made by reducing espagnole sauce with brown stock',
    definitionSpanish: 'Salsa marrón rica hecha reduciendo salsa española con caldo oscuro',
    category: 'term',
    difficulty: 'advanced'
  },
  {
    id: 'emulsify',
    term: 'Emulsify',
    termSpanish: 'Emulsionar',
    pronunciation: 'ee-MUL-sih-fy',
    definition: 'To combine two liquids that normally don\'t mix (oil and water)',
    definitionSpanish: 'Combinar dos líquidos que normalmente no se mezclan (aceite y agua)',
    category: 'term',
    difficulty: 'advanced'
  },
  // Cuisine Terms
  {
    id: 'umami',
    term: 'Umami',
    termSpanish: 'Umami',
    pronunciation: 'oo-MAH-mee',
    definition: 'The fifth taste - savory, meaty flavor found in aged cheeses, mushrooms, soy sauce',
    definitionSpanish: 'El quinto sabor - sabroso, carnoso, encontrado en quesos añejos, champiñones, salsa de soja',
    category: 'cuisine',
    difficulty: 'beginner'
  },
  {
    id: 'mirepoix',
    term: 'Mirepoix',
    termSpanish: 'Mirepoix',
    pronunciation: 'meer-PWAH',
    definition: 'Aromatic base of 2 parts onion, 1 part carrot, 1 part celery',
    definitionSpanish: 'Base aromática de 2 partes de cebolla, 1 parte de zanahoria, 1 parte de apio',
    category: 'cuisine',
    difficulty: 'beginner'
  },
  {
    id: 'trinity',
    term: 'Trinity',
    termSpanish: 'Trinidad cajún',
    pronunciation: 'TRIN-ih-tee',
    definition: 'Cajun/Creole base of onion, celery, and bell pepper',
    definitionSpanish: 'Base Cajún/Criolla de cebolla, apio y pimiento',
    category: 'cuisine',
    difficulty: 'intermediate'
  },
  {
    id: 'sofrito',
    term: 'Sofrito',
    termSpanish: 'Sofrito',
    pronunciation: 'soh-FREE-toh',
    definition: 'Latin base of sautéed onion, garlic, peppers, and tomatoes',
    definitionSpanish: 'Base latina de cebolla, ajo, pimientos y tomates salteados',
    category: 'cuisine',
    difficulty: 'intermediate'
  },
  // Kitchen/Restaurant Terms - Beginner
  {
    id: 'eighty-six',
    term: '86\'d',
    termSpanish: 'Agotado / Cancelado',
    pronunciation: 'AY-tee-SIX',
    definition: 'To be out of a menu item or to remove/cancel an order',
    definitionSpanish: 'Estar sin un artículo del menú o eliminar/cancelar un pedido',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'in-the-weeds',
    term: 'In the Weeds',
    termSpanish: 'En las malezas',
    pronunciation: 'in-thuh-WEEDZ',
    definition: 'Overwhelmed with orders or tasks, falling behind during service',
    definitionSpanish: 'Abrumado con pedidos o tareas, quedándose atrás durante el servicio',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'on-the-fly',
    term: 'On the Fly',
    termSpanish: 'Al instante',
    pronunciation: 'on-thuh-FLY',
    definition: 'A rush order that needs to be prepared immediately',
    definitionSpanish: 'Un pedido urgente que necesita ser preparado inmediatamente',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'all-day',
    term: 'All Day',
    termSpanish: 'En total',
    pronunciation: 'AWL-DAY',
    definition: 'The total count of a particular item needed across all current orders',
    definitionSpanish: 'La cantidad total de un artículo particular necesario en todos los pedidos actuales',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'fire',
    term: 'Fire',
    termSpanish: 'Fuego / Arranca',
    pronunciation: 'FY-er',
    definition: 'Command to begin cooking a course or specific dish',
    definitionSpanish: 'Comando para comenzar a cocinar un plato o curso específico',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'heard',
    term: 'Heard',
    termSpanish: 'Escuchado',
    pronunciation: 'HERD',
    definition: 'Acknowledgment that an order or instruction has been received and understood',
    definitionSpanish: 'Reconocimiento de que un pedido o instrucción ha sido recibido y entendido',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'behind',
    term: 'Behind',
    termSpanish: 'Atrás',
    pronunciation: 'bee-HYND',
    definition: 'Announcement when walking behind someone in the kitchen for safety',
    definitionSpanish: 'Anuncio al caminar detrás de alguien en la cocina por seguridad',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'corner',
    term: 'Corner',
    termSpanish: 'Esquina',
    pronunciation: 'KOR-ner',
    definition: 'Announcement when approaching a blind corner to prevent collisions',
    definitionSpanish: 'Anuncio al acercarse a una esquina ciega para prevenir colisiones',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'comps',
    term: 'Comps',
    termSpanish: 'Cortesía',
    pronunciation: 'KOMPS',
    definition: 'Complimentary items given to guests at no charge',
    definitionSpanish: 'Artículos de cortesía dados a los huéspedes sin cargo',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'fifo',
    term: 'FIFO',
    termSpanish: 'PEPS (Primero en Entrar, Primero en Salir)',
    pronunciation: 'FY-foh',
    definition: 'First In, First Out — stock rotation method using oldest products first',
    definitionSpanish: 'Primero en Entrar, Primero en Salir — método de rotación usando los productos más antiguos primero',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'two-top',
    term: 'Two-Top',
    termSpanish: 'Mesa para dos',
    pronunciation: 'TOO-top',
    definition: 'A table set for two guests; similarly, a four-top seats four',
    definitionSpanish: 'Una mesa para dos comensales; de manera similar, una mesa para cuatro sienta a cuatro',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'pos',
    term: 'POS',
    termSpanish: 'Punto de Venta',
    pronunciation: 'P-O-S',
    definition: 'Point of Sale system used to enter orders and process payments',
    definitionSpanish: 'Sistema de Punto de Venta usado para ingresar pedidos y procesar pagos',
    category: 'term',
    difficulty: 'beginner'
  },
  {
    id: 'window',
    term: 'Window',
    termSpanish: 'Ventana / Pasaplatos',
    pronunciation: 'WIN-doh',
    definition: 'The shelf or counter where finished dishes wait for servers to pick up',
    definitionSpanish: 'El estante o mostrador donde los platos terminados esperan a que los meseros los recojan',
    category: 'term',
    difficulty: 'beginner'
  },
  // Kitchen/Restaurant Terms - Intermediate
  {
    id: 'expo',
    term: 'Expo',
    termSpanish: 'Expedidor',
    pronunciation: 'EX-poh',
    definition: 'The expeditor who organizes, garnishes, and quality-checks finished dishes before service',
    definitionSpanish: 'El expedidor que organiza, decora y verifica la calidad de los platos terminados antes del servicio',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'dupes',
    term: 'Dupes',
    termSpanish: 'Duplicados / Comandas',
    pronunciation: 'DOOPS',
    definition: 'Duplicate order tickets sent from the POS to the kitchen',
    definitionSpanish: 'Tickets de pedido duplicados enviados del punto de venta a la cocina',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'turn-tables',
    term: 'Turn Tables',
    termSpanish: 'Rotación de mesas',
    pronunciation: 'TERN TAY-bulz',
    definition: 'How quickly tables are cleared, cleaned, and reseated with new guests',
    definitionSpanish: 'Qué tan rápido se limpian y se vuelven a sentar las mesas con nuevos comensales',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'covers',
    term: 'Covers',
    termSpanish: 'Cubiertos / Comensales',
    pronunciation: 'KUH-verz',
    definition: 'The number of diners served during a service period',
    definitionSpanish: 'El número de comensales atendidos durante un período de servicio',
    category: 'term',
    difficulty: 'intermediate'
  },
  {
    id: 'drop-food',
    term: 'Drop Food',
    termSpanish: 'Sirve la comida',
    pronunciation: 'DROP FOOD',
    definition: 'Command to begin plating or delivering food to the table now',
    definitionSpanish: 'Comando para comenzar a emplatar o entregar la comida a la mesa ahora',
    category: 'term',
    difficulty: 'intermediate'
  },
  // Temperature Terms
  {
    id: 'danger-zone',
    term: 'Danger Zone',
    termSpanish: 'Zona de Peligro',
    pronunciation: 'DAYN-jer ZOHN',
    definition: 'The 41\u00B0F\u2013135\u00B0F (5\u00B0C\u201357\u00B0C) temperature range where bacteria multiply rapidly in food',
    definitionSpanish: 'El rango de temperatura de 5\u00B0C\u201357\u00B0C donde las bacterias se multiplican r\u00E1pidamente en los alimentos',
    category: 'temperature',
    difficulty: 'beginner'
  },
  {
    id: 'temp-poultry',
    term: 'Poultry Safe Temp',
    termSpanish: 'Temperatura Segura para Aves',
    pronunciation: 'POHL-tree SAYF TEMP',
    definition: '165\u00B0F (74\u00B0C) minimum internal temperature required for all poultry',
    definitionSpanish: '74\u00B0C temperatura interna m\u00EDnima requerida para todas las aves',
    category: 'temperature',
    difficulty: 'beginner'
  },
  {
    id: 'temp-beef',
    term: 'Beef/Pork Safe Temp',
    termSpanish: 'Temperatura Segura para Res/Cerdo',
    pronunciation: 'BEEF PORK SAYF TEMP',
    definition: '145\u00B0F (63\u00B0C) minimum internal temperature for whole cuts of beef, pork, veal, and lamb',
    definitionSpanish: '63\u00B0C temperatura interna m\u00EDnima para cortes enteros de res, cerdo, ternera y cordero',
    category: 'temperature',
    difficulty: 'beginner'
  },
  {
    id: 'temp-ground',
    term: 'Ground Meat Safe Temp',
    termSpanish: 'Temperatura Segura para Carne Molida',
    pronunciation: 'GROWND MEET SAYF TEMP',
    definition: '155\u00B0F (68\u00B0C) minimum internal temperature for ground meats',
    definitionSpanish: '68\u00B0C temperatura interna m\u00EDnima para carnes molidas',
    category: 'temperature',
    difficulty: 'beginner'
  },
  {
    id: 'temp-holding',
    term: 'Hot Holding',
    termSpanish: 'Mantenimiento en Caliente',
    pronunciation: 'HOT HOLD-ing',
    definition: 'Hot food must be maintained at 135\u00B0F (57\u00B0C) or above during service',
    definitionSpanish: 'La comida caliente debe mantenerse a 57\u00B0C o m\u00E1s durante el servicio',
    category: 'temperature',
    difficulty: 'intermediate'
  },
  {
    id: 'temp-cold-hold',
    term: 'Cold Holding',
    termSpanish: 'Mantenimiento en Fr\u00EDo',
    pronunciation: 'KOHLD HOLD-ing',
    definition: 'Cold food must be maintained at 41\u00B0F (5\u00B0C) or below during service',
    definitionSpanish: 'La comida fr\u00EDa debe mantenerse a 5\u00B0C o menos durante el servicio',
    category: 'temperature',
    difficulty: 'intermediate'
  },
  {
    id: 'two-stage-cooling',
    term: 'Two-Stage Cooling',
    termSpanish: 'Enfriamiento en Dos Etapas',
    pronunciation: 'TOO-stayj KOOL-ing',
    definition: 'Cool food from 135\u00B0F to 70\u00B0F within 2 hours, then from 70\u00B0F to 41\u00B0F within 4 more hours',
    definitionSpanish: 'Enfriar alimentos de 57\u00B0C a 21\u00B0C en 2 horas, luego de 21\u00B0C a 5\u00B0C en 4 horas m\u00E1s',
    category: 'temperature',
    difficulty: 'advanced'
  }
];

export const knifeCuts: KnifeCut[] = [
  {
    id: 'brunoise',
    name: 'Brunoise',
    nameSpanish: 'Brunoise',
    pronunciation: 'broon-WAHZ',
    description: 'Very fine dice, 1/8 inch (3mm) cubes',
    descriptionSpanish: 'Dados muy finos, cubos de 3mm',
    size: '1/8" (3mm)',
    usedFor: ['garnishes', 'soups', 'sauces']
  },
  {
    id: 'small-dice',
    name: 'Small Dice',
    nameSpanish: 'Dados Pequeños',
    pronunciation: 'SMAWL DYCE',
    description: 'Small cubes, 1/4 inch (6mm)',
    descriptionSpanish: 'Cubos pequeños de 6mm',
    size: '1/4" (6mm)',
    usedFor: ['salsas', 'relishes', 'stuffings']
  },
  {
    id: 'medium-dice',
    name: 'Medium Dice',
    nameSpanish: 'Dados Medianos',
    pronunciation: 'MEE-dee-um DYCE',
    description: 'Standard cubes, 1/2 inch (12mm)',
    descriptionSpanish: 'Cubos estándar de 12mm',
    size: '1/2" (12mm)',
    usedFor: ['stews', 'soups', 'roasted vegetables']
  },
  {
    id: 'large-dice',
    name: 'Large Dice',
    nameSpanish: 'Dados Grandes',
    pronunciation: 'LARJ DYCE',
    description: 'Large cubes, 3/4 inch (2cm)',
    descriptionSpanish: 'Cubos grandes de 2cm',
    size: '3/4" (2cm)',
    usedFor: ['stocks', 'hearty stews', 'roasting']
  },
  {
    id: 'julienne',
    name: 'Julienne',
    nameSpanish: 'Juliana',
    pronunciation: 'joo-lee-EN',
    description: 'Thin matchstick strips, 1/8 x 1/8 x 2 inches',
    descriptionSpanish: 'Tiras finas como cerillas, 3mm x 3mm x 5cm',
    size: '1/8" x 1/8" x 2"',
    usedFor: ['stir-fry', 'salads', 'garnishes']
  },
  {
    id: 'chiffonade',
    name: 'Chiffonade',
    nameSpanish: 'Chiffonade',
    pronunciation: 'shif-oh-NAHD',
    description: 'Thin ribbons of leafy herbs or greens',
    descriptionSpanish: 'Cintas finas de hierbas o verduras de hoja',
    size: 'Thin ribbons',
    usedFor: ['basil', 'lettuce', 'spinach garnish']
  },
  {
    id: 'batonnet',
    name: 'Bâtonnet',
    nameSpanish: 'Bastones',
    pronunciation: 'bah-toh-NAY',
    description: 'Stick cut, 1/4 x 1/4 x 2-3 inches',
    descriptionSpanish: 'Corte en bastones, 6mm x 6mm x 5-7cm',
    size: '1/4" x 1/4" x 2-3"',
    usedFor: ['french fries', 'crudités', 'vegetable sides']
  },
  {
    id: 'mince',
    name: 'Mince',
    nameSpanish: 'Picar finamente',
    pronunciation: 'MINS',
    description: 'Very finely chopped, smaller than brunoise',
    descriptionSpanish: 'Picado muy finamente, más pequeño que brunoise',
    size: '<1/8" (2mm)',
    usedFor: ['garlic', 'ginger', 'shallots']
  },
  {
    id: 'paysanne',
    name: 'Paysanne',
    nameSpanish: 'Campesina',
    pronunciation: 'pay-ee-ZAHN',
    description: 'Thin flat pieces, 1/2 x 1/2 x 1/8 inch',
    descriptionSpanish: 'Piezas planas y finas, 12mm x 12mm x 3mm',
    size: '1/2" x 1/2" x 1/8"',
    usedFor: ['soups', 'rustic dishes']
  },
  {
    id: 'tourner',
    name: 'Tournée',
    nameSpanish: 'Torneado',
    pronunciation: 'toor-NAY',
    description: 'Football-shaped cut with 7 sides, 2 inches long',
    descriptionSpanish: 'Corte en forma de balón con 7 lados, 5cm de largo',
    size: '2" (5cm) long',
    usedFor: ['potatoes', 'carrots', 'fine dining presentation']
  }
];

export const foodSafetyQuestions: FoodSafetyQuestion[] = [
  // Temperature
  {
    id: 'temp-danger-zone',
    question: 'What is the "Temperature Danger Zone" where bacteria grow rapidly?',
    questionSpanish: '¿Cuál es la "Zona de Peligro de Temperatura" donde las bacterias crecen rápidamente?',
    correctAnswer: '41°F - 135°F (5°C - 57°C)',
    options: ['32°F - 100°F', '41°F - 135°F (5°C - 57°C)', '50°F - 150°F', '35°F - 140°F'],
    optionsSpanish: ['0°C - 38°C', '5°C - 57°C', '10°C - 66°C', '2°C - 60°C'],
    explanation: 'Bacteria multiply rapidly between 41°F and 135°F. Food should not stay in this zone for more than 4 hours total.',
    explanationSpanish: 'Las bacterias se multiplican rápidamente entre 5°C y 57°C. La comida no debe permanecer en esta zona por más de 4 horas en total.',
    category: 'temperature'
  },
  {
    id: 'temp-poultry',
    question: 'What is the minimum internal temperature for cooked poultry?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para aves cocidas?',
    correctAnswer: '165°F (74°C)',
    options: ['145°F (63°C)', '155°F (68°C)', '165°F (74°C)', '180°F (82°C)'],
    optionsSpanish: ['63°C', '68°C', '74°C', '82°C'],
    explanation: 'All poultry must reach 165°F (74°C) for 15 seconds to be safe.',
    explanationSpanish: 'Todas las aves deben alcanzar 74°C durante 15 segundos para ser seguras.',
    category: 'temperature'
  },
  {
    id: 'temp-ground-beef',
    question: 'What is the minimum internal temperature for ground beef?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para carne molida?',
    correctAnswer: '155°F (68°C)',
    options: ['145°F (63°C)', '155°F (68°C)', '165°F (74°C)', '135°F (57°C)'],
    optionsSpanish: ['63°C', '68°C', '74°C', '57°C'],
    explanation: 'Ground beef must reach 155°F (68°C) for 15 seconds per FDA Food Code. Note: some training programs reference 160°F — follow your employer\'s standard.',
    explanationSpanish: 'La carne molida debe alcanzar 68°C durante 15 segundos según el Código Alimentario de la FDA. Nota: algunos programas usan 71°C — siga el estándar de su empleador.',
    category: 'temperature'
  },
  {
    id: 'temp-fish',
    question: 'What is the minimum internal temperature for fish?',
    questionSpanish: '¿Cuál es la temperatura interna mínima para el pescado?',
    correctAnswer: '145°F (63°C)',
    options: ['135°F (57°C)', '145°F (63°C)', '155°F (68°C)', '165°F (74°C)'],
    optionsSpanish: ['57°C', '63°C', '68°C', '74°C'],
    explanation: 'Fish and seafood must reach 145°F (63°C) for 15 seconds.',
    explanationSpanish: 'El pescado y los mariscos deben alcanzar 63°C durante 15 segundos.',
    category: 'temperature'
  },
  {
    id: 'temp-holding-hot',
    question: 'What is the minimum holding temperature for hot food on a buffet?',
    questionSpanish: '¿Cuál es la temperatura mínima de mantenimiento para comida caliente en un buffet?',
    correctAnswer: '135°F (57°C)',
    options: ['120°F (49°C)', '135°F (57°C)', '145°F (63°C)', '150°F (66°C)'],
    optionsSpanish: ['49°C', '57°C', '63°C', '66°C'],
    explanation: 'Hot food must be held at 135°F (57°C) or above to prevent bacterial growth.',
    explanationSpanish: 'La comida caliente debe mantenerse a 57°C o más para prevenir el crecimiento bacteriano.',
    category: 'temperature'
  },
  // Storage
  {
    id: 'storage-order',
    question: 'In a refrigerator, which item should be stored on the lowest shelf?',
    questionSpanish: 'En un refrigerador, ¿qué artículo debe almacenarse en el estante más bajo?',
    correctAnswer: 'Raw chicken',
    options: ['Ready-to-eat salads', 'Dairy products', 'Raw chicken', 'Cooked foods'],
    optionsSpanish: ['Ensaladas listas para comer', 'Productos lácteos', 'Pollo crudo', 'Alimentos cocidos'],
    explanation: 'Raw poultry goes on the bottom to prevent drips from contaminating other foods. Order from top to bottom: ready-to-eat, seafood, whole cuts of beef/pork, ground meat, poultry.',
    explanationSpanish: 'Las aves crudas van en la parte inferior para evitar que los goteos contaminen otros alimentos.',
    category: 'storage'
  },
  {
    id: 'storage-cooling',
    question: 'How quickly must hot food be cooled from 135°F to 70°F?',
    questionSpanish: '¿Qué tan rápido se debe enfriar la comida caliente de 57°C a 21°C?',
    correctAnswer: '2 hours',
    options: ['1 hour', '2 hours', '4 hours', '6 hours'],
    optionsSpanish: ['1 hora', '2 horas', '4 horas', '6 horas'],
    explanation: 'The two-stage cooling method: 135°F to 70°F within 2 hours, then 70°F to 41°F within 4 more hours (6 hours total).',
    explanationSpanish: 'Método de enfriamiento de dos etapas: de 57°C a 21°C en 2 horas, luego de 21°C a 5°C en 4 horas más.',
    category: 'storage'
  },
  {
    id: 'storage-thawing',
    question: 'Which is NOT an approved method for thawing frozen food?',
    questionSpanish: '¿Cuál NO es un método aprobado para descongelar alimentos congelados?',
    correctAnswer: 'On the counter at room temperature',
    options: ['Under cold running water', 'In the refrigerator', 'On the counter at room temperature', 'In the microwave (cook immediately)'],
    optionsSpanish: ['Bajo agua fría corriente', 'En el refrigerador', 'En el mostrador a temperatura ambiente', 'En el microondas (cocinar inmediatamente)'],
    explanation: 'Never thaw at room temperature. Approved methods: refrigerator, cold running water, microwave (cook immediately), or as part of cooking.',
    explanationSpanish: 'Nunca descongele a temperatura ambiente. Métodos aprobados: refrigerador, agua fría corriente, microondas (cocinar inmediatamente), o como parte de la cocción.',
    category: 'storage'
  },
  // Contamination
  {
    id: 'contam-allergens',
    question: 'Which is one of the "Big 8" major food allergens?',
    questionSpanish: '¿Cuál es uno de los "8 Grandes" alérgenos alimentarios principales?',
    correctAnswer: 'All of these',
    options: ['Peanuts', 'Shellfish', 'Wheat', 'All of these'],
    optionsSpanish: ['Cacahuates', 'Mariscos', 'Trigo', 'Todos estos'],
    explanation: 'The Big 8 allergens: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, and soybeans. (Now 9 with sesame)',
    explanationSpanish: 'Los 8 grandes alérgenos: leche, huevos, pescado, mariscos, nueces de árbol, cacahuates, trigo y soja.',
    category: 'contamination'
  },
  {
    id: 'contam-cross',
    question: 'What color cutting board should be used for raw poultry?',
    questionSpanish: '¿De qué color debe ser la tabla de cortar para aves crudas?',
    correctAnswer: 'Yellow',
    options: ['Red', 'Yellow', 'Green', 'White'],
    optionsSpanish: ['Rojo', 'Amarillo', 'Verde', 'Blanco'],
    explanation: 'Common color-coded cutting boards: Yellow=poultry, Red=raw meat, Green=vegetables, White=dairy/bread, Blue=fish, Brown=cooked meat. Note: your employer\'s color system may differ.',
    explanationSpanish: 'Código de colores común: Amarillo=aves, Rojo=carne cruda, Verde=vegetales, Blanco=lácteos/pan, Azul=pescado. Nota: el sistema de colores de su empleador puede ser diferente.',
    category: 'contamination'
  },
  {
    id: 'contam-physical',
    question: 'Which is an example of physical contamination?',
    questionSpanish: '¿Cuál es un ejemplo de contaminación física?',
    correctAnswer: 'A piece of glass in food',
    options: ['Bacteria on hands', 'Cleaning chemicals', 'A piece of glass in food', 'Mold on bread'],
    optionsSpanish: ['Bacterias en las manos', 'Productos químicos de limpieza', 'Un pedazo de vidrio en la comida', 'Moho en el pan'],
    explanation: 'Physical contamination: foreign objects like glass, metal, hair, bandages. Biological: bacteria, viruses. Chemical: cleaning products, pesticides.',
    explanationSpanish: 'Contaminación física: objetos extraños como vidrio, metal, cabello, vendajes.',
    category: 'contamination'
  },
  // Hygiene
  {
    id: 'hygiene-handwash',
    question: 'How long should you wash your hands?',
    questionSpanish: '¿Cuánto tiempo debe lavarse las manos?',
    correctAnswer: 'At least 20 seconds',
    options: ['5 seconds', '10 seconds', 'At least 20 seconds', '1 minute'],
    optionsSpanish: ['5 segundos', '10 segundos', 'Al menos 20 segundos', '1 minuto'],
    explanation: 'Wash hands for at least 20 seconds with soap and warm water (100°F/38°C). Sing "Happy Birthday" twice.',
    explanationSpanish: 'Lávese las manos durante al menos 20 segundos con jabón y agua tibia (38°C).',
    category: 'hygiene'
  },
  {
    id: 'hygiene-when-wash',
    question: 'When must food handlers wash their hands?',
    questionSpanish: '¿Cuándo deben lavarse las manos los manipuladores de alimentos?',
    correctAnswer: 'All of these',
    options: ['Before starting work', 'After touching raw meat', 'After using the restroom', 'All of these'],
    optionsSpanish: ['Antes de comenzar a trabajar', 'Después de tocar carne cruda', 'Después de usar el baño', 'Todos estos'],
    explanation: 'Wash hands: before work, after restroom, after handling raw meat, after touching face/hair, after sneezing, after taking out trash, when switching tasks.',
    explanationSpanish: 'Lavarse las manos: antes de trabajar, después del baño, después de manipular carne cruda, después de tocar cara/cabello.',
    category: 'hygiene'
  },
  {
    id: 'hygiene-gloves',
    question: 'When must you change gloves?',
    questionSpanish: '¿Cuándo debe cambiar los guantes?',
    correctAnswer: 'All of these',
    options: ['After handling raw meat before touching ready-to-eat food', 'Every 4 hours during continuous use', 'After touching your face', 'All of these'],
    optionsSpanish: ['Después de manipular carne cruda antes de tocar alimentos listos', 'Cada 4 horas de uso continuo', 'Después de tocarse la cara', 'Todos estos'],
    explanation: 'Change gloves: when switching tasks, after touching raw proteins, every 4 hours, when torn/dirty, after touching non-food surfaces.',
    explanationSpanish: 'Cambiar guantes: al cambiar de tarea, después de tocar proteínas crudas, cada 4 horas, cuando estén rotos/sucios.',
    category: 'hygiene'
  },
  {
    id: 'hygiene-illness',
    question: 'A food handler with which symptom must NOT work with food?',
    questionSpanish: '¿Un manipulador de alimentos con cuál síntoma NO debe trabajar con comida?',
    correctAnswer: 'Vomiting or diarrhea',
    options: ['Headache', 'Sore throat only', 'Vomiting or diarrhea', 'Minor cut on finger (bandaged)'],
    optionsSpanish: ['Dolor de cabeza', 'Solo dolor de garganta', 'Vómitos o diarrea', 'Corte menor en el dedo (vendado)'],
    explanation: 'Food handlers with vomiting, diarrhea, jaundice, or diagnosed with certain illnesses (Norovirus, Salmonella, Hepatitis A, E. coli, Shigella) must be excluded from work.',
    explanationSpanish: 'Los manipuladores de alimentos con vómitos, diarrea, ictericia o diagnosticados con ciertas enfermedades deben ser excluidos del trabajo.',
    category: 'hygiene'
  },
  // Contamination - Allergen Cross-Contact
  {
    id: 'contam-cross-contact',
    question: 'What is the best way to prevent allergen cross-contact in a kitchen?',
    questionSpanish: '¿Cuál es la mejor manera de prevenir el contacto cruzado de alérgenos en una cocina?',
    correctAnswer: 'Use separate, cleaned utensils and prep areas for allergen-free orders',
    options: ['Simply wipe the cutting board with a towel', 'Use separate, cleaned utensils and prep areas for allergen-free orders', 'Cook allergens at higher temperatures to neutralize them', 'Only worry about allergens if the customer mentions them'],
    optionsSpanish: ['Simplemente limpiar la tabla con un trapo', 'Usar utensilios y áreas de preparación separados y limpios para pedidos sin alérgenos', 'Cocinar los alérgenos a temperaturas más altas para neutralizarlos', 'Solo preocuparse por los alérgenos si el cliente los menciona'],
    explanation: 'Cross-contact occurs when allergens transfer to allergen-free food. Prevent it by using separate, cleaned and sanitized equipment, utensils, and prep surfaces. Cooking does NOT destroy most allergens.',
    explanationSpanish: 'El contacto cruzado ocurre cuando los alérgenos se transfieren a alimentos sin alérgenos. Prevenga usando equipo, utensilios y superficies separados, limpios y desinfectados. Cocinar NO destruye la mayoría de los alérgenos.',
    category: 'contamination'
  },
  // Storage - Date Marking
  {
    id: 'storage-date-marking',
    question: 'How long can ready-to-eat TCS food be stored in a refrigerator at 41°F (5°C)?',
    questionSpanish: '¿Cuánto tiempo se puede almacenar la comida TCS lista para comer en un refrigerador a 5°C?',
    correctAnswer: '7 days, including the day it was prepared',
    options: ['3 days', '5 days', '7 days, including the day it was prepared', '10 days if properly sealed'],
    optionsSpanish: ['3 días', '5 días', '7 días, incluyendo el día en que se preparó', '10 días si está correctamente sellada'],
    explanation: 'Per the FDA Food Code, ready-to-eat TCS food held at 41°F (5°C) or below must be discarded after 7 days. Day 1 is the day the food was prepared or opened.',
    explanationSpanish: 'Según el Código Alimentario de la FDA, la comida TCS lista para comer mantenida a 5°C o menos debe descartarse después de 7 días. El día 1 es el día en que se preparó o abrió.',
    category: 'storage'
  },
  // Temperature - Reheating
  {
    id: 'temp-reheating',
    question: 'To what temperature must previously cooked TCS food be reheated for hot holding?',
    questionSpanish: '¿A qué temperatura se debe recalentar la comida TCS previamente cocida para mantenimiento en caliente?',
    correctAnswer: '165°F (74°C) within 2 hours',
    options: ['135°F (57°C) within 1 hour', '145°F (63°C) within 2 hours', '165°F (74°C) within 2 hours', '155°F (68°C) within 30 minutes'],
    optionsSpanish: ['57°C en 1 hora', '63°C en 2 horas', '74°C en 2 horas', '68°C en 30 minutos'],
    explanation: 'Food being reheated for hot holding must reach 165°F (74°C) for 15 seconds within 2 hours. If it does not reach this temperature in time, it must be discarded.',
    explanationSpanish: 'La comida que se recalienta para mantenimiento en caliente debe alcanzar 74°C durante 15 segundos en un plazo de 2 horas. Si no alcanza esta temperatura a tiempo, debe descartarse.',
    category: 'temperature'
  },
  // Storage - Two-Stage Cooling Total
  {
    id: 'storage-cooling-total',
    question: 'What is the total time allowed for the two-stage cooling process from 135°F to 41°F?',
    questionSpanish: '¿Cuál es el tiempo total permitido para el proceso de enfriamiento de dos etapas de 57°C a 5°C?',
    correctAnswer: '6 hours total',
    options: ['2 hours total', '4 hours total', '6 hours total', '8 hours total'],
    optionsSpanish: ['2 horas en total', '4 horas en total', '6 horas en total', '8 horas en total'],
    explanation: 'Two-stage cooling: Stage 1 is 135°F to 70°F within 2 hours. Stage 2 is 70°F to 41°F within 4 more hours. Total time must not exceed 6 hours. If Stage 1 fails, discard the food.',
    explanationSpanish: 'Enfriamiento de dos etapas: Etapa 1 de 57°C a 21°C en 2 horas. Etapa 2 de 21°C a 5°C en 4 horas más. El tiempo total no debe exceder 6 horas. Si la Etapa 1 falla, descarte la comida.',
    category: 'storage'
  },
  // Contamination - Chemical Storage
  {
    id: 'storage-chemicals',
    question: 'Where should cleaning chemicals be stored in a food establishment?',
    questionSpanish: '¿Dónde deben almacenarse los productos químicos de limpieza en un establecimiento de alimentos?',
    correctAnswer: 'In a separate area, below and away from food, in labeled containers',
    options: ['On the same shelf as dry goods if labeled', 'In a separate area, below and away from food, in labeled containers', 'Anywhere convenient as long as they are sealed', 'Above food items to prevent spills on the floor'],
    optionsSpanish: ['En el mismo estante que los productos secos si están etiquetados', 'En un área separada, debajo y lejos de la comida, en envases etiquetados', 'En cualquier lugar conveniente siempre que estén sellados', 'Encima de los alimentos para prevenir derrames en el piso'],
    explanation: 'Chemicals must be stored separately from food, below food items (never above), in properly labeled original or approved containers. This prevents chemical contamination.',
    explanationSpanish: 'Los productos químicos deben almacenarse separados de los alimentos, debajo de los artículos de comida (nunca arriba), en envases originales o aprobados correctamente etiquetados.',
    category: 'contamination'
  },
  // Contamination - Pest Indicators
  {
    id: 'contam-pests',
    question: 'Which of the following is a sign of a pest infestation in a food establishment?',
    questionSpanish: '¿Cuál de los siguientes es un signo de infestación de plagas en un establecimiento de alimentos?',
    correctAnswer: 'All of these',
    options: ['Droppings or urine stains', 'Gnaw marks on food packaging', 'Nesting materials in dark corners', 'All of these'],
    optionsSpanish: ['Excrementos o manchas de orina', 'Marcas de mordeduras en empaques de alimentos', 'Materiales de anidación en esquinas oscuras', 'Todos estos'],
    explanation: 'Signs of pests include droppings, gnaw marks, nesting materials, grease marks along walls, damaged food packages, and unusual odors. Report signs immediately to management.',
    explanationSpanish: 'Los signos de plagas incluyen excrementos, marcas de mordeduras, materiales de anidación, marcas de grasa en las paredes, paquetes de alimentos dañados y olores inusuales. Reporte los signos inmediatamente a la gerencia.',
    category: 'contamination'
  },
  // Storage - Receiving Shipments
  {
    id: 'storage-receiving',
    question: 'When receiving a delivery, at what temperature should you reject cold TCS food?',
    questionSpanish: '¿Al recibir una entrega, a qué temperatura debe rechazar la comida TCS fría?',
    correctAnswer: 'Above 41°F (5°C)',
    options: ['Above 32°F (0°C)', 'Above 38°F (3°C)', 'Above 41°F (5°C)', 'Above 45°F (7°C)'],
    optionsSpanish: ['Arriba de 0°C', 'Arriba de 3°C', 'Arriba de 5°C', 'Arriba de 7°C'],
    explanation: 'Reject cold TCS food received above 41°F (5°C). Also reject food with damaged packaging, unusual odors or colors, or signs of pest contamination. Always use a calibrated thermometer.',
    explanationSpanish: 'Rechace la comida TCS fría recibida por encima de 5°C. También rechace alimentos con empaques dañados, olores o colores inusuales, o signos de contaminación por plagas.',
    category: 'storage'
  },
  // Hygiene - Handwashing Procedure
  {
    id: 'hygiene-handwash-steps',
    question: 'What is the correct order for the handwashing procedure?',
    questionSpanish: '¿Cuál es el orden correcto para el procedimiento de lavado de manos?',
    correctAnswer: 'Wet hands, apply soap, scrub 20 seconds, rinse, dry with single-use towel',
    options: ['Apply soap, wet hands, scrub 10 seconds, rinse, air dry', 'Wet hands, apply soap, scrub 20 seconds, rinse, dry with single-use towel', 'Wet hands, scrub 20 seconds, apply soap, rinse, dry with cloth towel', 'Apply hand sanitizer, rinse with water, dry with apron'],
    optionsSpanish: ['Aplicar jabón, mojar manos, frotar 10 segundos, enjuagar, secar al aire', 'Mojar manos, aplicar jabón, frotar 20 segundos, enjuagar, secar con toalla desechable', 'Mojar manos, frotar 20 segundos, aplicar jabón, enjuagar, secar con trapo', 'Aplicar desinfectante de manos, enjuagar con agua, secar con delantal'],
    explanation: 'Proper handwashing: wet hands with warm water (at least 100°F/38°C), apply soap, scrub hands and arms for at least 20 seconds, rinse thoroughly, and dry with a single-use paper towel or air dryer.',
    explanationSpanish: 'Lavado correcto de manos: mojar con agua tibia (al menos 38°C), aplicar jabón, frotar manos y brazos por al menos 20 segundos, enjuagar bien, y secar con toalla de papel desechable o secador de aire.',
    category: 'hygiene'
  },
  // Hygiene - Gloves and Handwashing
  {
    id: 'hygiene-gloves-replace',
    question: 'Do disposable gloves replace the need for handwashing?',
    questionSpanish: '¿Los guantes desechables reemplazan la necesidad de lavarse las manos?',
    correctAnswer: 'No — you must wash hands before putting on gloves and when changing them',
    options: ['Yes, gloves eliminate the need for handwashing', 'No — you must wash hands before putting on gloves and when changing them', 'Only if the gloves are latex-free', 'Yes, as long as you change gloves every hour'],
    optionsSpanish: ['Sí, los guantes eliminan la necesidad de lavarse las manos', 'No — debe lavarse las manos antes de ponerse guantes y al cambiarlos', 'Solo si los guantes son libres de látex', 'Sí, siempre que cambie los guantes cada hora'],
    explanation: 'Gloves are not a substitute for handwashing. Hands must be washed before putting on gloves and each time gloves are changed. Bacteria can transfer through small tears in gloves.',
    explanationSpanish: 'Los guantes no sustituyen el lavado de manos. Las manos deben lavarse antes de ponerse guantes y cada vez que se cambien. Las bacterias pueden transferirse a través de pequeñas roturas en los guantes.',
    category: 'hygiene'
  },
  // Hygiene - Big 6 Foodborne Illnesses
  {
    id: 'hygiene-big-six',
    question: 'Which of the following is one of the "Big 6" foodborne illnesses that must be reported to management?',
    questionSpanish: '¿Cuál de las siguientes es una de las "6 Grandes" enfermedades transmitidas por alimentos que deben reportarse a la gerencia?',
    correctAnswer: 'All of these',
    options: ['Norovirus', 'Salmonella Typhi', 'Hepatitis A', 'All of these'],
    optionsSpanish: ['Norovirus', 'Salmonella Typhi', 'Hepatitis A', 'Todos estos'],
    explanation: 'The Big 6 foodborne illnesses per the FDA Food Code: Norovirus, Hepatitis A, Salmonella Typhi, Shigella, E. coli O157:H7, and non-typhoidal Salmonella. Food handlers diagnosed with these must be excluded or restricted from work.',
    explanationSpanish: 'Las 6 Grandes enfermedades transmitidas por alimentos según el Código Alimentario de la FDA: Norovirus, Hepatitis A, Salmonella Typhi, Shigella, E. coli O157:H7 y Salmonella no tifoidea. Los manipuladores diagnosticados deben ser excluidos o restringidos del trabajo.',
    category: 'hygiene'
  }
];

export const categoryLabels: Record<string, { en: string; es: string }> = {
  technique: { en: 'Cooking Techniques', es: 'Técnicas de Cocina' },
  cut: { en: 'Knife Cuts', es: 'Cortes de Cuchillo' },
  term: { en: 'Culinary Terms', es: 'Términos Culinarios' },
  temperature: { en: 'Temperature', es: 'Temperatura' },
  cuisine: { en: 'Cuisine Basics', es: 'Bases de Cocina' }
};

export const difficultyLabels: Record<string, { en: string; es: string }> = {
  beginner: { en: 'Beginner', es: 'Principiante' },
  intermediate: { en: 'Intermediate', es: 'Intermedio' },
  advanced: { en: 'Advanced', es: 'Avanzado' }
};

export const safetyCategoryLabels: Record<string, { en: string; es: string }> = {
  temperature: { en: 'Temperature Safety', es: 'Seguridad de Temperatura' },
  storage: { en: 'Food Storage', es: 'Almacenamiento de Alimentos' },
  contamination: { en: 'Contamination Prevention', es: 'Prevención de Contaminación' },
  hygiene: { en: 'Personal Hygiene', es: 'Higiene Personal' }
};
