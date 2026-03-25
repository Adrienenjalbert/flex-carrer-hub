export interface SafetyScenario {
  id: string;
  industry: 'warehouse' | 'hospitality' | 'retail' | 'general';
  scenario: string;
  scenarioSpanish: string;
  question: string;
  questionSpanish: string;
  options: {
    text: string;
    textSpanish: string;
    correct: boolean;
    explanation: string;
    explanationSpanish: string;
  }[];
  category: 'hazard' | 'ppe' | 'emergency' | 'procedure';
  oshaReference?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PPEItem {
  id: string;
  name: string;
  nameSpanish: string;
  description: string;
  descriptionSpanish: string;
  industries: ('warehouse' | 'hospitality' | 'retail' | 'general')[];
  hazards: string[];
  hazardsSpanish: string[];
  icon: string;
}

export const ppeItems: PPEItem[] = [
  {
    id: 'safety-glasses',
    name: 'Safety Glasses',
    nameSpanish: 'Gafas de Seguridad',
    description: 'Protect eyes from flying debris, chemicals, and dust',
    descriptionSpanish: 'Protegen los ojos de escombros, químicos y polvo',
    industries: ['warehouse', 'hospitality', 'general'],
    hazards: ['Flying particles', 'Chemical splashes', 'Dust'],
    hazardsSpanish: ['Partículas volantes', 'Salpicaduras químicas', 'Polvo'],
    icon: '🥽'
  },
  {
    id: 'hard-hat',
    name: 'Hard Hat',
    nameSpanish: 'Casco de Seguridad',
    description: 'Protects head from falling objects and impact hazards',
    descriptionSpanish: 'Protege la cabeza de objetos que caen e impactos',
    industries: ['warehouse', 'general'],
    hazards: ['Falling objects', 'Low clearance', 'Overhead work'],
    hazardsSpanish: ['Objetos que caen', 'Espacios bajos', 'Trabajo aéreo'],
    icon: '⛑️'
  },
  {
    id: 'steel-toe-boots',
    name: 'Steel Toe Boots',
    nameSpanish: 'Botas con Punta de Acero',
    description: 'Protect feet from heavy objects and compression',
    descriptionSpanish: 'Protegen los pies de objetos pesados y compresión',
    industries: ['warehouse', 'general'],
    hazards: ['Heavy objects', 'Crushing hazards', 'Punctures'],
    hazardsSpanish: ['Objetos pesados', 'Riesgo de aplastamiento', 'Perforaciones'],
    icon: '👢'
  },
  {
    id: 'high-vis-vest',
    name: 'High-Visibility Vest',
    nameSpanish: 'Chaleco de Alta Visibilidad',
    description: 'Makes workers visible in low-light or busy areas',
    descriptionSpanish: 'Hace visible a los trabajadores en áreas oscuras o transitadas',
    industries: ['warehouse', 'general'],
    hazards: ['Vehicle traffic', 'Low visibility', 'Forklift areas'],
    hazardsSpanish: ['Tráfico vehicular', 'Baja visibilidad', 'Áreas de montacargas'],
    icon: '🦺'
  },
  {
    id: 'gloves-cut',
    name: 'Cut-Resistant Gloves',
    nameSpanish: 'Guantes Resistentes a Cortes',
    description: 'Protect hands from sharp edges and blades',
    descriptionSpanish: 'Protegen las manos de bordes afilados y cuchillas',
    industries: ['warehouse', 'hospitality', 'retail', 'general'],
    hazards: ['Sharp edges', 'Box cutters', 'Knives'],
    hazardsSpanish: ['Bordes afilados', 'Cortadores', 'Cuchillos'],
    icon: '🧤'
  },
  {
    id: 'gloves-heat',
    name: 'Heat-Resistant Gloves',
    nameSpanish: 'Guantes Resistentes al Calor',
    description: 'Protect hands from hot surfaces and liquids',
    descriptionSpanish: 'Protegen las manos de superficies y líquidos calientes',
    industries: ['hospitality'],
    hazards: ['Hot pans', 'Ovens', 'Steam', 'Hot liquids'],
    hazardsSpanish: ['Sartenes calientes', 'Hornos', 'Vapor', 'Líquidos calientes'],
    icon: '🧤'
  },
  {
    id: 'non-slip-shoes',
    name: 'Non-Slip Shoes',
    nameSpanish: 'Zapatos Antideslizantes',
    description: 'Prevent slips on wet or greasy floors',
    descriptionSpanish: 'Previenen resbalones en pisos mojados o grasosos',
    industries: ['hospitality', 'retail', 'general'],
    hazards: ['Wet floors', 'Grease', 'Spills'],
    hazardsSpanish: ['Pisos mojados', 'Grasa', 'Derrames'],
    icon: '👟'
  },
  {
    id: 'ear-protection',
    name: 'Ear Protection',
    nameSpanish: 'Protección Auditiva',
    description: 'Protects hearing from loud machinery and noise',
    descriptionSpanish: 'Protege la audición de maquinaria ruidosa',
    industries: ['warehouse', 'general'],
    hazards: ['Loud machinery', 'Continuous noise', 'Equipment sounds'],
    hazardsSpanish: ['Maquinaria ruidosa', 'Ruido continuo', 'Sonidos de equipo'],
    icon: '🎧'
  },
  {
    id: 'apron',
    name: 'Kitchen Apron',
    nameSpanish: 'Delantal de Cocina',
    description: 'Protects clothing and skin from spills and heat',
    descriptionSpanish: 'Protege la ropa y piel de derrames y calor',
    industries: ['hospitality'],
    hazards: ['Hot liquids', 'Grease splatter', 'Chemical cleaners'],
    hazardsSpanish: ['Líquidos calientes', 'Salpicaduras de grasa', 'Limpiadores químicos'],
    icon: '🧑‍🍳'
  },
  {
    id: 'back-brace',
    name: 'Back Support Belt',
    nameSpanish: 'Cinturón de Soporte Lumbar',
    description: 'Supports lower back during heavy lifting',
    descriptionSpanish: 'Apoya la espalda baja durante levantamiento pesado',
    industries: ['warehouse', 'retail', 'general'],
    hazards: ['Heavy lifting', 'Repetitive motion', 'Strain'],
    hazardsSpanish: ['Levantamiento pesado', 'Movimiento repetitivo', 'Tensión'],
    icon: '🏋️'
  }
];

export const safetyScenarios: SafetyScenario[] = [
  // WAREHOUSE - HAZARD IDENTIFICATION
  {
    id: 'wh-hazard-1',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You notice a liquid spill in the main aisle where forklifts operate.',
    scenarioSpanish: 'Notas un derrame de líquido en el pasillo principal donde operan los montacargas.',
    question: 'What should you do FIRST?',
    questionSpanish: '¿Qué debes hacer PRIMERO?',
    options: [
      {
        text: 'Continue working and let someone else handle it',
        textSpanish: 'Continuar trabajando y dejar que otro lo maneje',
        correct: false,
        explanation: 'Ignoring hazards puts everyone at risk. You have a responsibility to act.',
        explanationSpanish: 'Ignorar peligros pone a todos en riesgo. Tienes la responsabilidad de actuar.'
      },
      {
        text: 'Block the area and report it immediately',
        textSpanish: 'Bloquear el área y reportarlo inmediatamente',
        correct: true,
        explanation: 'Correct! Block the hazard to prevent accidents, then report so it can be cleaned properly.',
        explanationSpanish: '¡Correcto! Bloquea el peligro para prevenir accidentes, luego reporta para que se limpie apropiadamente.'
      },
      {
        text: 'Clean it up yourself without telling anyone',
        textSpanish: 'Limpiarlo tú mismo sin decirle a nadie',
        correct: false,
        explanation: 'You should report all spills. You may not know if it\'s a hazardous substance.',
        explanationSpanish: 'Debes reportar todos los derrames. Puede que no sepas si es una sustancia peligrosa.'
      },
      {
        text: 'Walk around it and keep working',
        textSpanish: 'Caminar alrededor y seguir trabajando',
        correct: false,
        explanation: 'This leaves the hazard for others. Someone could slip or a forklift could lose control.',
        explanationSpanish: 'Esto deja el peligro para otros. Alguien podría resbalarse o un montacargas perder control.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  {
    id: 'wh-hazard-2',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'You see a coworker stacking boxes higher than 6 feet without securing them.',
    scenarioSpanish: 'Ves a un compañero apilando cajas más alto de 6 pies sin asegurarlas.',
    question: 'What is the main hazard here?',
    questionSpanish: '¿Cuál es el peligro principal aquí?',
    options: [
      {
        text: 'The boxes might get dirty',
        textSpanish: 'Las cajas podrían ensuciarse',
        correct: false,
        explanation: 'Product damage isn\'t the safety concern here.',
        explanationSpanish: 'El daño al producto no es la preocupación de seguridad aquí.'
      },
      {
        text: 'Unstable stacks can fall and injure workers',
        textSpanish: 'Las pilas inestables pueden caer y lesionar trabajadores',
        correct: true,
        explanation: 'Correct! Falling objects are a leading cause of warehouse injuries. Stacks must be stable and secured.',
        explanationSpanish: '¡Correcto! Los objetos que caen son una causa principal de lesiones en almacenes. Las pilas deben ser estables y aseguradas.'
      },
      {
        text: 'It takes longer to stack high',
        textSpanish: 'Toma más tiempo apilar alto',
        correct: false,
        explanation: 'Efficiency isn\'t the safety issue being addressed.',
        explanationSpanish: 'La eficiencia no es el problema de seguridad que se aborda.'
      },
      {
        text: 'The forklift can\'t reach that high',
        textSpanish: 'El montacargas no puede alcanzar tan alto',
        correct: false,
        explanation: 'The concern is about stability, not equipment reach.',
        explanationSpanish: 'La preocupación es sobre estabilidad, no el alcance del equipo.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.176'
  },
  {
    id: 'wh-hazard-3',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'A forklift is approaching while you\'re walking in the warehouse.',
    scenarioSpanish: 'Un montacargas se acerca mientras caminas en el almacén.',
    question: 'What is the safest action?',
    questionSpanish: '¿Cuál es la acción más segura?',
    options: [
      {
        text: 'Make eye contact with the driver and wait for them to stop',
        textSpanish: 'Hacer contacto visual con el conductor y esperar a que se detenga',
        correct: true,
        explanation: 'Correct! Eye contact confirms the driver sees you. Always yield to forklifts and stay in designated walkways.',
        explanationSpanish: '¡Correcto! El contacto visual confirma que el conductor te ve. Siempre cede el paso a montacargas y permanece en pasillos designados.'
      },
      {
        text: 'Run across the aisle before it gets closer',
        textSpanish: 'Correr a través del pasillo antes de que se acerque',
        correct: false,
        explanation: 'Running creates unpredictable movement. The driver may not anticipate your action.',
        explanationSpanish: 'Correr crea movimiento impredecible. El conductor puede no anticipar tu acción.'
      },
      {
        text: 'Assume the driver will stop for you',
        textSpanish: 'Asumir que el conductor se detendrá por ti',
        correct: false,
        explanation: 'Never assume! Forklifts have limited visibility and long stopping distances.',
        explanationSpanish: '¡Nunca asumas! Los montacargas tienen visibilidad limitada y largas distancias de frenado.'
      },
      {
        text: 'Keep walking because you have the right of way',
        textSpanish: 'Seguir caminando porque tienes el derecho de paso',
        correct: false,
        explanation: 'Pedestrians should always yield to forklifts regardless of right-of-way.',
        explanationSpanish: 'Los peatones siempre deben ceder el paso a los montacargas sin importar el derecho de paso.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.178'
  },
  // WAREHOUSE - PPE
  {
    id: 'wh-ppe-1',
    industry: 'warehouse',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You\'re assigned to unload heavy boxes from a truck.',
    scenarioSpanish: 'Te asignan descargar cajas pesadas de un camión.',
    question: 'What PPE is required for this task?',
    questionSpanish: '¿Qué equipo de protección se requiere para esta tarea?',
    options: [
      {
        text: 'Safety glasses only',
        textSpanish: 'Solo gafas de seguridad',
        correct: false,
        explanation: 'Safety glasses are important but not sufficient for handling heavy loads.',
        explanationSpanish: 'Las gafas de seguridad son importantes pero no suficientes para manejar cargas pesadas.'
      },
      {
        text: 'Steel-toe boots, gloves, and high-vis vest',
        textSpanish: 'Botas con punta de acero, guantes y chaleco de alta visibilidad',
        correct: true,
        explanation: 'Correct! Steel-toe boots protect from dropped boxes, gloves from cuts, and high-vis keeps you visible to forklift operators.',
        explanationSpanish: '¡Correcto! Las botas protegen de cajas caídas, guantes de cortes, y el chaleco te mantiene visible a operadores de montacargas.'
      },
      {
        text: 'Hard hat and ear protection',
        textSpanish: 'Casco y protección auditiva',
        correct: false,
        explanation: 'These may be needed in some areas but aren\'t the primary PPE for unloading.',
        explanationSpanish: 'Estos pueden necesitarse en algunas áreas pero no son el PPE principal para descargar.'
      },
      {
        text: 'No PPE needed for simple unloading',
        textSpanish: 'No se necesita PPE para descarga simple',
        correct: false,
        explanation: 'PPE is always required when handling materials. Heavy boxes pose multiple hazards.',
        explanationSpanish: 'El PPE siempre se requiere al manejar materiales. Las cajas pesadas presentan múltiples peligros.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  {
    id: 'wh-ppe-2',
    industry: 'warehouse',
    category: 'ppe',
    difficulty: 'intermediate',
    scenario: 'You\'re entering an area with machinery noise above 85 decibels.',
    scenarioSpanish: 'Entras a un área con ruido de maquinaria arriba de 85 decibeles.',
    question: 'What protection is required?',
    questionSpanish: '¿Qué protección se requiere?',
    options: [
      {
        text: 'Ear protection (earplugs or earmuffs)',
        textSpanish: 'Protección auditiva (tapones o orejeras)',
        correct: true,
        explanation: 'Correct! OSHA requires hearing protection when noise exceeds 85 dB over an 8-hour period. Hearing loss is permanent.',
        explanationSpanish: '¡Correcto! OSHA requiere protección auditiva cuando el ruido excede 85 dB durante un período de 8 horas. La pérdida auditiva es permanente.'
      },
      {
        text: 'No protection needed for short exposure',
        textSpanish: 'No se necesita protección para exposición corta',
        correct: false,
        explanation: 'Even brief exposure to high noise levels can cause damage. Always wear protection.',
        explanationSpanish: 'Incluso la exposición breve a altos niveles de ruido puede causar daño. Siempre usa protección.'
      },
      {
        text: 'Safety glasses',
        textSpanish: 'Gafas de seguridad',
        correct: false,
        explanation: 'Safety glasses protect eyes, not ears. Different hazards require different PPE.',
        explanationSpanish: 'Las gafas protegen los ojos, no los oídos. Diferentes peligros requieren diferente PPE.'
      },
      {
        text: 'Hard hat',
        textSpanish: 'Casco de seguridad',
        correct: false,
        explanation: 'Hard hats protect from falling objects, not noise exposure.',
        explanationSpanish: 'Los cascos protegen de objetos que caen, no de exposición al ruido.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.95'
  },
  // WAREHOUSE - EMERGENCY
  {
    id: 'wh-emergency-1',
    industry: 'warehouse',
    category: 'emergency',
    difficulty: 'beginner',
    scenario: 'The fire alarm sounds while you\'re working in the back of the warehouse.',
    scenarioSpanish: 'La alarma de incendio suena mientras trabajas en la parte trasera del almacén.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Finish your current task first',
        textSpanish: 'Terminar tu tarea actual primero',
        correct: false,
        explanation: 'Never delay evacuation. Every second counts in an emergency.',
        explanationSpanish: 'Nunca demores la evacuación. Cada segundo cuenta en una emergencia.'
      },
      {
        text: 'Stop work and evacuate using the nearest exit',
        textSpanish: 'Detener el trabajo y evacuar usando la salida más cercana',
        correct: true,
        explanation: 'Correct! Leave immediately via the nearest safe exit and meet at the designated assembly point.',
        explanationSpanish: '¡Correcto! Sal inmediatamente por la salida segura más cercana y reúnete en el punto de reunión designado.'
      },
      {
        text: 'Go check if there\'s really a fire',
        textSpanish: 'Ir a verificar si realmente hay fuego',
        correct: false,
        explanation: 'Never investigate! Treat every alarm as real and evacuate immediately.',
        explanationSpanish: '¡Nunca investigues! Trata cada alarma como real y evacua inmediatamente.'
      },
      {
        text: 'Call 911 from your work station',
        textSpanish: 'Llamar al 911 desde tu estación de trabajo',
        correct: false,
        explanation: 'Evacuate first. Call emergency services from outside if needed.',
        explanationSpanish: 'Evacua primero. Llama a servicios de emergencia desde afuera si es necesario.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.38'
  },
  // WAREHOUSE - PROCEDURE
  {
    id: 'wh-procedure-1',
    industry: 'warehouse',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'You need to lift a 40-pound box from the floor to a shelf at waist height.',
    scenarioSpanish: 'Necesitas levantar una caja de 40 libras del piso a un estante a la altura de la cintura.',
    question: 'What is the correct lifting technique?',
    questionSpanish: '¿Cuál es la técnica correcta de levantamiento?',
    options: [
      {
        text: 'Bend at the waist and lift with your back',
        textSpanish: 'Doblarse por la cintura y levantar con la espalda',
        correct: false,
        explanation: 'This puts extreme strain on your back and can cause serious injury.',
        explanationSpanish: 'Esto pone tensión extrema en tu espalda y puede causar lesiones graves.'
      },
      {
        text: 'Bend knees, keep back straight, lift with legs',
        textSpanish: 'Doblar las rodillas, mantener la espalda recta, levantar con las piernas',
        correct: true,
        explanation: 'Correct! Use your leg muscles, keep the load close to your body, and avoid twisting while lifting.',
        explanationSpanish: '¡Correcto! Usa los músculos de las piernas, mantén la carga cerca de tu cuerpo y evita girar mientras levantas.'
      },
      {
        text: 'Lift quickly to get it over with',
        textSpanish: 'Levantar rápidamente para terminar pronto',
        correct: false,
        explanation: 'Quick jerky movements increase injury risk. Lift slowly and smoothly.',
        explanationSpanish: 'Los movimientos rápidos y bruscos aumentan el riesgo de lesión. Levanta lenta y suavemente.'
      },
      {
        text: 'Twist your body to reach the shelf',
        textSpanish: 'Girar tu cuerpo para alcanzar el estante',
        correct: false,
        explanation: 'Twisting while holding weight is a major cause of back injuries. Move your feet instead.',
        explanationSpanish: 'Girar mientras sostienes peso es una causa principal de lesiones de espalda. Mueve tus pies en su lugar.'
      }
    ],
    oshaReference: 'OSHA Guidelines for Safe Lifting'
  },
  // HOSPITALITY - HAZARD
  {
    id: 'hosp-hazard-1',
    industry: 'hospitality',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You see water on the kitchen floor near the dishwashing station.',
    scenarioSpanish: 'Ves agua en el piso de la cocina cerca de la estación de lavado.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Step over it carefully',
        textSpanish: 'Pasarla cuidadosamente',
        correct: false,
        explanation: 'This leaves the hazard for others and yourself later.',
        explanationSpanish: 'Esto deja el peligro para otros y para ti después.'
      },
      {
        text: 'Wipe it up immediately or place a wet floor sign',
        textSpanish: 'Limpiarla inmediatamente o colocar un letrero de piso mojado',
        correct: true,
        explanation: 'Correct! Slips and falls are the #1 cause of restaurant injuries. Act immediately.',
        explanationSpanish: '¡Correcto! Los resbalones y caídas son la causa #1 de lesiones en restaurantes. Actúa inmediatamente.'
      },
      {
        text: 'Tell a coworker to clean it later',
        textSpanish: 'Decirle a un compañero que lo limpie después',
        correct: false,
        explanation: 'Later could mean an injury. Handle hazards immediately.',
        explanationSpanish: 'Después podría significar una lesión. Maneja los peligros inmediatamente.'
      },
      {
        text: 'Only worry about it if someone slips',
        textSpanish: 'Solo preocuparse si alguien se resbala',
        correct: false,
        explanation: 'Prevention is key. Don\'t wait for an accident to happen.',
        explanationSpanish: 'La prevención es clave. No esperes a que ocurra un accidente.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  {
    id: 'hosp-hazard-2',
    industry: 'hospitality',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'A knife is left on the counter with the blade facing outward toward the walkway.',
    scenarioSpanish: 'Un cuchillo está en el mostrador con la hoja hacia afuera, hacia el pasillo.',
    question: 'Why is this dangerous?',
    questionSpanish: '¿Por qué es esto peligroso?',
    options: [
      {
        text: 'Someone walking by could cut themselves',
        textSpanish: 'Alguien caminando podría cortarse',
        correct: true,
        explanation: 'Correct! Knives should always be placed with blades facing away from walkways or stored properly. A passing worker could suffer a serious cut.',
        explanationSpanish: '¡Correcto! Los cuchillos siempre deben colocarse con las hojas alejadas de pasillos o guardarse apropiadamente. Un trabajador pasando podría sufrir un corte serio.'
      },
      {
        text: 'The knife might get dirty',
        textSpanish: 'El cuchillo podría ensuciarse',
        correct: false,
        explanation: 'Sanitation is important but the immediate hazard is injury risk.',
        explanationSpanish: 'La sanidad es importante pero el peligro inmediato es el riesgo de lesión.'
      },
      {
        text: 'It\'s only dangerous if someone touches it',
        textSpanish: 'Solo es peligroso si alguien lo toca',
        correct: false,
        explanation: 'Accidental contact happens in busy kitchens. Prevention is essential.',
        explanationSpanish: 'El contacto accidental ocurre en cocinas ocupadas. La prevención es esencial.'
      },
      {
        text: 'The knife might fall',
        textSpanish: 'El cuchillo podría caerse',
        correct: false,
        explanation: 'While falling is also a risk, the outward-facing blade is the primary hazard here.',
        explanationSpanish: 'Aunque caerse también es un riesgo, la hoja hacia afuera es el peligro principal aquí.'
      }
    ],
    oshaReference: 'OSHA General Duty Clause, Section 5(a)(1)'
  },
  // HOSPITALITY - PPE
  {
    id: 'hosp-ppe-1',
    industry: 'hospitality',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You\'re assigned to work the grill and fryer station.',
    scenarioSpanish: 'Te asignan trabajar en la estación de parrilla y freidora.',
    question: 'What footwear should you wear?',
    questionSpanish: '¿Qué calzado debes usar?',
    options: [
      {
        text: 'Regular sneakers',
        textSpanish: 'Tenis regulares',
        correct: false,
        explanation: 'Regular sneakers don\'t provide slip resistance or heat protection needed in kitchens.',
        explanationSpanish: 'Los tenis regulares no proporcionan resistencia al deslizamiento ni protección contra el calor necesaria en cocinas.'
      },
      {
        text: 'Non-slip, closed-toe shoes',
        textSpanish: 'Zapatos cerrados antideslizantes',
        correct: true,
        explanation: 'Correct! Non-slip soles prevent falls on greasy floors, and closed toes protect from hot spills and dropped items.',
        explanationSpanish: '¡Correcto! Las suelas antideslizantes previenen caídas en pisos grasosos, y la punta cerrada protege de derrames calientes y objetos caídos.'
      },
      {
        text: 'Sandals are fine in hot kitchens',
        textSpanish: 'Las sandalias están bien en cocinas calientes',
        correct: false,
        explanation: 'Open-toe shoes expose feet to burns, cuts, and crushing injuries.',
        explanationSpanish: 'Los zapatos abiertos exponen los pies a quemaduras, cortes y lesiones por aplastamiento.'
      },
      {
        text: 'Any comfortable shoes',
        textSpanish: 'Cualquier zapato cómodo',
        correct: false,
        explanation: 'Comfort matters but safety features are essential in kitchen environments.',
        explanationSpanish: 'La comodidad importa pero las características de seguridad son esenciales en ambientes de cocina.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  {
    id: 'hosp-ppe-2',
    industry: 'hospitality',
    category: 'ppe',
    difficulty: 'intermediate',
    scenario: 'You need to remove a hot pan from a 400°F oven.',
    scenarioSpanish: 'Necesitas sacar una sartén caliente de un horno a 400°F.',
    question: 'What should you use?',
    questionSpanish: '¿Qué debes usar?',
    options: [
      {
        text: 'Dry oven mitts or heat-resistant gloves',
        textSpanish: 'Guantes de horno secos o guantes resistentes al calor',
        correct: true,
        explanation: 'Correct! Dry oven mitts provide the best heat protection. NEVER use wet towels - water conducts heat and causes steam burns.',
        explanationSpanish: '¡Correcto! Los guantes de horno secos proporcionan la mejor protección contra el calor. NUNCA uses toallas mojadas - el agua conduce calor y causa quemaduras de vapor.'
      },
      {
        text: 'A damp towel - it won\'t burn',
        textSpanish: 'Una toalla húmeda - no se quemará',
        correct: false,
        explanation: 'DANGEROUS! Wet fabric conducts heat rapidly and can cause severe steam burns.',
        explanationSpanish: '¡PELIGROSO! La tela mojada conduce calor rápidamente y puede causar quemaduras severas de vapor.'
      },
      {
        text: 'Bare hands if you\'re quick',
        textSpanish: 'Manos desnudas si eres rápido',
        correct: false,
        explanation: 'Never touch hot items with bare hands. Even brief contact causes burns.',
        explanationSpanish: 'Nunca toques objetos calientes con las manos desnudas. Incluso el contacto breve causa quemaduras.'
      },
      {
        text: 'Any towel nearby',
        textSpanish: 'Cualquier toalla cercana',
        correct: false,
        explanation: 'Not all towels provide adequate protection. Use proper oven mitts.',
        explanationSpanish: 'No todas las toallas proporcionan protección adecuada. Usa guantes de horno apropiados.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  // HOSPITALITY - EMERGENCY
  {
    id: 'hosp-emergency-1',
    industry: 'hospitality',
    category: 'emergency',
    difficulty: 'intermediate',
    scenario: 'A grease fire starts in a pan on the stove.',
    scenarioSpanish: 'Un fuego de grasa comienza en una sartén en la estufa.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Throw water on it',
        textSpanish: 'Echarle agua',
        correct: false,
        explanation: 'NEVER use water on a grease fire! It causes the fire to explode and spread.',
        explanationSpanish: '¡NUNCA uses agua en un fuego de grasa! Causa que el fuego explote y se esparza.'
      },
      {
        text: 'Turn off heat, cover with a lid or use Class K fire extinguisher',
        textSpanish: 'Apagar el calor, cubrir con una tapa o usar extintor Clase K',
        correct: true,
        explanation: 'Correct! Turn off the heat source, smother with a metal lid, or use a Class K (kitchen) fire extinguisher. Never use water.',
        explanationSpanish: '¡Correcto! Apaga la fuente de calor, sofoca con una tapa de metal, o usa un extintor Clase K (cocina). Nunca uses agua.'
      },
      {
        text: 'Carry the pan to the sink',
        textSpanish: 'Llevar la sartén al fregadero',
        correct: false,
        explanation: 'Moving a burning pan can spread the fire and cause burns. Leave it in place.',
        explanationSpanish: 'Mover una sartén en llamas puede esparcir el fuego y causar quemaduras. Déjala en su lugar.'
      },
      {
        text: 'Fan the flames to put them out',
        textSpanish: 'Abanicar las llamas para apagarlas',
        correct: false,
        explanation: 'Fanning adds oxygen and makes the fire worse.',
        explanationSpanish: 'Abanicar añade oxígeno y empeora el fuego.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.157'
  },
  // HOSPITALITY - PROCEDURE
  {
    id: 'hosp-procedure-1',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'You\'re carrying a sharp knife through the kitchen.',
    scenarioSpanish: 'Estás cargando un cuchillo afilado a través de la cocina.',
    question: 'What is the safe way to carry it?',
    questionSpanish: '¿Cuál es la forma segura de cargarlo?',
    options: [
      {
        text: 'Hold it out in front of you',
        textSpanish: 'Sostenerlo frente a ti',
        correct: false,
        explanation: 'This puts others at risk and increases your chance of falling on it.',
        explanationSpanish: 'Esto pone a otros en riesgo y aumenta tu probabilidad de caer sobre él.'
      },
      {
        text: 'Hold at your side with blade pointing down, announce "knife" or "behind"',
        textSpanish: 'Sostener a tu lado con la hoja hacia abajo, anunciar "cuchillo" o "atrás"',
        correct: true,
        explanation: 'Correct! Keep the blade down at your side and verbally alert others. This is standard kitchen safety protocol.',
        explanationSpanish: '¡Correcto! Mantén la hoja hacia abajo a tu lado y alerta verbalmente a otros. Este es el protocolo estándar de seguridad en cocina.'
      },
      {
        text: 'Tuck it under your arm',
        textSpanish: 'Meterlo bajo tu brazo',
        correct: false,
        explanation: 'This is extremely dangerous and can cause serious injury.',
        explanationSpanish: 'Esto es extremadamente peligroso y puede causar lesiones graves.'
      },
      {
        text: 'Walk quickly so you\'re done faster',
        textSpanish: 'Caminar rápido para terminar más pronto',
        correct: false,
        explanation: 'Moving quickly with sharp objects increases accident risk.',
        explanationSpanish: 'Moverse rápido con objetos afilados aumenta el riesgo de accidentes.'
      }
    ],
    oshaReference: 'OSHA General Duty Clause, Section 5(a)(1)'
  },
  {
    id: 'hosp-procedure-2',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'Raw chicken juice spilled on the cutting board where you need to cut vegetables.',
    scenarioSpanish: 'Jugo de pollo crudo se derramó en la tabla de cortar donde necesitas cortar vegetales.',
    question: 'What must you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Wipe it with a paper towel and continue',
        textSpanish: 'Limpiarla con una toalla de papel y continuar',
        correct: false,
        explanation: 'Wiping doesn\'t eliminate bacteria. Proper sanitization is required.',
        explanationSpanish: 'Limpiar no elimina las bacterias. Se requiere sanitización apropiada.'
      },
      {
        text: 'Wash, rinse, and sanitize the board before cutting vegetables',
        textSpanish: 'Lavar, enjuagar y sanitizar la tabla antes de cortar vegetales',
        correct: true,
        explanation: 'Correct! Raw poultry can contain Salmonella. You must wash, rinse, and sanitize any surface it touches before preparing other foods.',
        explanationSpanish: '¡Correcto! El pollo crudo puede contener Salmonella. Debes lavar, enjuagar y sanitizar cualquier superficie que toque antes de preparar otros alimentos.'
      },
      {
        text: 'Flip the board over and use the other side',
        textSpanish: 'Voltear la tabla y usar el otro lado',
        correct: false,
        explanation: 'Contamination can spread. Both sides need proper cleaning.',
        explanationSpanish: 'La contaminación puede esparcirse. Ambos lados necesitan limpieza apropiada.'
      },
      {
        text: 'It\'s fine if you cut quickly',
        textSpanish: 'Está bien si cortas rápido',
        correct: false,
        explanation: 'Speed doesn\'t prevent cross-contamination. This can cause foodborne illness.',
        explanationSpanish: 'La velocidad no previene la contaminación cruzada. Esto puede causar enfermedades transmitidas por alimentos.'
      }
    ],
    oshaReference: 'FDA Food Code'
  },
  // GENERAL - EMERGENCY
  {
    id: 'gen-emergency-1',
    industry: 'general',
    category: 'emergency',
    difficulty: 'beginner',
    scenario: 'A coworker is injured and bleeding from a cut on their arm.',
    scenarioSpanish: 'Un compañero está herido y sangrando por un corte en su brazo.',
    question: 'What is your first step?',
    questionSpanish: '¿Cuál es tu primer paso?',
    options: [
      {
        text: 'Apply direct pressure with a clean cloth and call for help',
        textSpanish: 'Aplicar presión directa con un trapo limpio y pedir ayuda',
        correct: true,
        explanation: 'Correct! Apply direct pressure to stop bleeding and alert a supervisor or call for medical help. Use gloves if available.',
        explanationSpanish: '¡Correcto! Aplica presión directa para detener el sangrado y alerta a un supervisor o pide ayuda médica. Usa guantes si están disponibles.'
      },
      {
        text: 'Leave them alone and get a manager',
        textSpanish: 'Dejarlos solos e ir por un gerente',
        correct: false,
        explanation: 'Don\'t leave an injured person alone if you can safely provide first aid.',
        explanationSpanish: 'No dejes a una persona herida sola si puedes proporcionar primeros auxilios de manera segura.'
      },
      {
        text: 'Tell them to go to the bathroom to clean it',
        textSpanish: 'Decirles que vayan al baño a limpiarlo',
        correct: false,
        explanation: 'Walking with an injury can worsen it. Provide immediate first aid.',
        explanationSpanish: 'Caminar con una lesión puede empeorarla. Proporciona primeros auxilios inmediatos.'
      },
      {
        text: 'Put a bandage on without cleaning',
        textSpanish: 'Poner una vendita sin limpiar',
        correct: false,
        explanation: 'Stop the bleeding first, then clean and properly bandage the wound.',
        explanationSpanish: 'Detén el sangrado primero, luego limpia y venda la herida apropiadamente.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.151'
  },
  // GENERAL - PROCEDURE
  {
    id: 'gen-procedure-1',
    industry: 'general',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'You notice a coworker not wearing required safety gear in a hazardous area.',
    scenarioSpanish: 'Notas que un compañero no usa el equipo de seguridad requerido en un área peligrosa.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Mind your own business',
        textSpanish: 'No meterse',
        correct: false,
        explanation: 'Safety is everyone\'s responsibility. Speaking up can prevent injuries.',
        explanationSpanish: 'La seguridad es responsabilidad de todos. Hablar puede prevenir lesiones.'
      },
      {
        text: 'Politely remind them or report to a supervisor',
        textSpanish: 'Recordarles amablemente o reportar a un supervisor',
        correct: true,
        explanation: 'Correct! Either approach helps. A friendly reminder first is often effective. If the behavior continues, report it.',
        explanationSpanish: '¡Correcto! Cualquier enfoque ayuda. Un recordatorio amigable primero suele ser efectivo. Si el comportamiento continúa, repórtalo.'
      },
      {
        text: 'Yell at them for being unsafe',
        textSpanish: 'Gritarles por ser inseguros',
        correct: false,
        explanation: 'Aggressive confrontation creates conflict. A respectful approach is more effective.',
        explanationSpanish: 'La confrontación agresiva crea conflicto. Un enfoque respetuoso es más efectivo.'
      },
      {
        text: 'Wait to see if they get hurt',
        textSpanish: 'Esperar a ver si se lastiman',
        correct: false,
        explanation: 'Prevention is always better than reaction. Speak up before an injury occurs.',
        explanationSpanish: 'La prevención siempre es mejor que la reacción. Habla antes de que ocurra una lesión.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  {
    id: 'gen-procedure-2',
    industry: 'general',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'Your employer asks you to do a task you haven\'t been trained for that could be dangerous.',
    scenarioSpanish: 'Tu empleador te pide hacer una tarea para la que no has sido entrenado y que podría ser peligrosa.',
    question: 'What is your right?',
    questionSpanish: '¿Cuál es tu derecho?',
    options: [
      {
        text: 'You must do whatever your employer says',
        textSpanish: 'Debes hacer lo que tu empleador diga',
        correct: false,
        explanation: 'OSHA gives workers the right to refuse dangerous work without proper training.',
        explanationSpanish: 'OSHA da a los trabajadores el derecho de rechazar trabajo peligroso sin entrenamiento apropiado.'
      },
      {
        text: 'You can refuse until you receive proper training',
        textSpanish: 'Puedes rechazar hasta recibir entrenamiento apropiado',
        correct: true,
        explanation: 'Correct! Under OSHA, you have the right to proper training before performing hazardous tasks. You can refuse unsafe work.',
        explanationSpanish: '¡Correcto! Bajo OSHA, tienes el derecho a entrenamiento apropiado antes de realizar tareas peligrosas. Puedes rechazar trabajo inseguro.'
      },
      {
        text: 'Try it and hope for the best',
        textSpanish: 'Intentarlo y esperar lo mejor',
        correct: false,
        explanation: 'This puts you and others at risk. Training exists for a reason.',
        explanationSpanish: 'Esto te pone a ti y a otros en riesgo. El entrenamiento existe por una razón.'
      },
      {
        text: 'Only supervisors can refuse work',
        textSpanish: 'Solo los supervisores pueden rechazar trabajo',
        correct: false,
        explanation: 'All workers have the right to a safe workplace and proper training.',
        explanationSpanish: 'Todos los trabajadores tienen derecho a un lugar de trabajo seguro y entrenamiento apropiado.'
      }
    ],
    oshaReference: 'OSHA Act Section 11(c)'
  },
  // RETAIL - HAZARD IDENTIFICATION
  {
    id: 'ret-hazard-1',
    industry: 'retail',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You need to open a case of merchandise using a box cutter.',
    scenarioSpanish: 'Necesitas abrir una caja de mercancía usando un cortador.',
    question: 'What is the safest way to use the box cutter?',
    questionSpanish: '¿Cuál es la forma más segura de usar el cortador?',
    options: [
      {
        text: 'Cut toward your body for better control',
        textSpanish: 'Cortar hacia tu cuerpo para mejor control',
        correct: false,
        explanation: 'Never cut toward yourself. Always cut away from your body to prevent injury.',
        explanationSpanish: 'Nunca cortes hacia ti. Siempre corta alejándote de tu cuerpo para prevenir lesiones.'
      },
      {
        text: 'Cut away from your body and retract the blade when not in use',
        textSpanish: 'Cortar alejándote de tu cuerpo y retraer la hoja cuando no esté en uso',
        correct: true,
        explanation: 'Correct! Always cut away from your body, use only enough blade to cut the material, and retract or sheathe the blade immediately after each use.',
        explanationSpanish: '¡Correcto! Siempre corta alejándote de tu cuerpo, usa solo suficiente hoja para cortar el material, y retrae o enfunda la hoja inmediatamente después de cada uso.'
      },
      {
        text: 'Leave the blade extended to save time between cuts',
        textSpanish: 'Dejar la hoja extendida para ahorrar tiempo entre cortes',
        correct: false,
        explanation: 'An exposed blade is a serious hazard. Retract it between every cut.',
        explanationSpanish: 'Una hoja expuesta es un peligro serio. Retráela entre cada corte.'
      },
      {
        text: 'Use scissors instead — box cutters are too dangerous',
        textSpanish: 'Usar tijeras en su lugar — los cortadores son muy peligrosos',
        correct: false,
        explanation: 'Box cutters are safe when used correctly. Proper technique is the key.',
        explanationSpanish: 'Los cortadores son seguros cuando se usan correctamente. La técnica apropiada es la clave.'
      }
    ],
    oshaReference: 'OSHA General Duty Clause, Section 5(a)(1)'
  },
  {
    id: 'ret-hazard-2',
    industry: 'retail',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'A customer drops a bottle of liquid on the sales floor, creating a spill.',
    scenarioSpanish: 'Un cliente deja caer una botella de líquido en el piso de ventas, creando un derrame.',
    question: 'What should you do FIRST?',
    questionSpanish: '¿Qué debes hacer PRIMERO?',
    options: [
      {
        text: 'Go find a mop and leave the area unattended',
        textSpanish: 'Ir a buscar un trapeador y dejar el área desatendida',
        correct: false,
        explanation: 'Leaving the spill unmarked while getting supplies puts customers at risk of slipping.',
        explanationSpanish: 'Dejar el derrame sin marcar mientras buscas suministros pone a los clientes en riesgo de resbalar.'
      },
      {
        text: 'Place a wet floor sign and guard the area, then clean or call for cleanup',
        textSpanish: 'Colocar un letrero de piso mojado y vigilar el área, luego limpiar o llamar para limpieza',
        correct: true,
        explanation: 'Correct! Immediately mark the hazard to warn others, then clean up or request assistance. Protecting people from the hazard comes first.',
        explanationSpanish: '¡Correcto! Marca el peligro inmediatamente para advertir a otros, luego limpia o solicita asistencia. Proteger a las personas del peligro es lo primero.'
      },
      {
        text: 'Ask the customer to clean it up',
        textSpanish: 'Pedirle al cliente que lo limpie',
        correct: false,
        explanation: 'Store employees are responsible for maintaining a safe environment for customers.',
        explanationSpanish: 'Los empleados de la tienda son responsables de mantener un ambiente seguro para los clientes.'
      },
      {
        text: 'Put a box or merchandise over the spill as a temporary fix',
        textSpanish: 'Poner una caja o mercancía sobre el derrame como solución temporal',
        correct: false,
        explanation: 'Covering a spill with merchandise creates a new tripping hazard and does not clean the floor.',
        explanationSpanish: 'Cubrir un derrame con mercancía crea un nuevo peligro de tropiezo y no limpia el piso.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  {
    id: 'ret-hazard-3',
    industry: 'retail',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You notice extension cords running across a walkway and a loose floor mat curled up at the corner in the sales area.',
    scenarioSpanish: 'Notas cables de extensión cruzando un pasillo y un tapete suelto enrollado en la esquina del área de ventas.',
    question: 'What hazard does this create?',
    questionSpanish: '¿Qué peligro crea esto?',
    options: [
      {
        text: 'It looks untidy but is not dangerous',
        textSpanish: 'Se ve desordenado pero no es peligroso',
        correct: false,
        explanation: 'Trip hazards are one of the most common causes of workplace injuries.',
        explanationSpanish: 'Los peligros de tropiezo son una de las causas más comunes de lesiones en el trabajo.'
      },
      {
        text: 'Tripping hazard — cords should be covered or rerouted, and mats secured flat',
        textSpanish: 'Peligro de tropiezo — los cables deben cubrirse o redirigirse, y los tapetes asegurarse planos',
        correct: true,
        explanation: 'Correct! Loose cords and curled mats are serious trip hazards. Use cord covers or tape, reroute cables away from walkways, and replace or secure mats so edges lie flat.',
        explanationSpanish: '¡Correcto! Los cables sueltos y tapetes enrollados son peligros serios de tropiezo. Usa cubrecables o cinta, redirige cables lejos de pasillos, y reemplaza o asegura tapetes para que los bordes estén planos.'
      },
      {
        text: 'Only a hazard after hours when the lights are dim',
        textSpanish: 'Solo es un peligro después de horas cuando las luces están tenues',
        correct: false,
        explanation: 'Trip hazards are dangerous at all times, especially in busy retail environments.',
        explanationSpanish: 'Los peligros de tropiezo son peligrosos en todo momento, especialmente en ambientes de comercio ocupados.'
      },
      {
        text: 'Customers should watch where they walk',
        textSpanish: 'Los clientes deberían ver por dónde caminan',
        correct: false,
        explanation: 'Employers are responsible for maintaining a hazard-free environment for workers and the public.',
        explanationSpanish: 'Los empleadores son responsables de mantener un ambiente libre de peligros para trabajadores y el público.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.22'
  },
  // RETAIL - PPE
  {
    id: 'ret-ppe-1',
    industry: 'retail',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You work an 8-hour shift at the checkout register standing on a hard tile floor.',
    scenarioSpanish: 'Trabajas un turno de 8 horas en la caja registradora parado en un piso de azulejo duro.',
    question: 'What should you use to reduce fatigue and injury?',
    questionSpanish: '¿Qué debes usar para reducir la fatiga y lesiones?',
    options: [
      {
        text: 'Lean against the counter when tired',
        textSpanish: 'Recargarte en el mostrador cuando estés cansado',
        correct: false,
        explanation: 'Leaning creates poor posture and does not address the root cause of fatigue.',
        explanationSpanish: 'Recargarte crea mala postura y no aborda la causa raíz de la fatiga.'
      },
      {
        text: 'Use an anti-fatigue standing mat and maintain good posture',
        textSpanish: 'Usar un tapete anti-fatiga y mantener buena postura',
        correct: true,
        explanation: 'Correct! Anti-fatigue mats reduce strain on legs and back. Combine with supportive shoes, neutral posture, and periodic stretching to prevent musculoskeletal injuries.',
        explanationSpanish: '¡Correcto! Los tapetes anti-fatiga reducen la tensión en piernas y espalda. Combina con zapatos de soporte, postura neutral, y estiramiento periódico para prevenir lesiones musculoesqueléticas.'
      },
      {
        text: 'Wear high heels for better posture',
        textSpanish: 'Usar tacones altos para mejor postura',
        correct: false,
        explanation: 'High heels increase fatigue and injury risk during long standing shifts.',
        explanationSpanish: 'Los tacones altos aumentan la fatiga y el riesgo de lesiones durante turnos largos de pie.'
      },
      {
        text: 'Standing all day is normal and no equipment is needed',
        textSpanish: 'Estar de pie todo el día es normal y no se necesita equipo',
        correct: false,
        explanation: 'Prolonged standing without support contributes to back pain, varicose veins, and joint problems.',
        explanationSpanish: 'Estar de pie prolongadamente sin soporte contribuye a dolor de espalda, venas varicosas, y problemas articulares.'
      }
    ],
    oshaReference: 'OSHA Ergonomics Guidelines'
  },
  // RETAIL - EMERGENCY
  {
    id: 'ret-emergency-1',
    industry: 'retail',
    category: 'emergency',
    difficulty: 'advanced',
    scenario: 'An armed person approaches your register and demands you hand over the cash.',
    scenarioSpanish: 'Una persona armada se acerca a tu caja y exige que le entregues el dinero.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Refuse to hand over the money to protect the store',
        textSpanish: 'Negarse a entregar el dinero para proteger la tienda',
        correct: false,
        explanation: 'Resisting a robbery dramatically increases the risk of injury or death. No amount of money is worth your life.',
        explanationSpanish: 'Resistir un robo aumenta dramáticamente el riesgo de lesión o muerte. Ninguna cantidad de dinero vale tu vida.'
      },
      {
        text: 'Comply calmly, do not resist, and activate the silent alarm if safe to do so',
        textSpanish: 'Obedecer con calma, no resistir, y activar la alarma silenciosa si es seguro hacerlo',
        correct: true,
        explanation: 'Correct! Stay calm, hand over the money, avoid sudden movements, and try to remember details about the person. Call 911 after they leave. Use the drop safe during shifts to minimize available cash.',
        explanationSpanish: '¡Correcto! Mantén la calma, entrega el dinero, evita movimientos repentinos, e intenta recordar detalles sobre la persona. Llama al 911 después de que se vayan. Usa la caja fuerte durante turnos para minimizar el efectivo disponible.'
      },
      {
        text: 'Try to physically stop them',
        textSpanish: 'Intentar detenerlos físicamente',
        correct: false,
        explanation: 'Physical resistance against an armed individual puts you and others in extreme danger.',
        explanationSpanish: 'La resistencia física contra una persona armada te pone a ti y a otros en peligro extremo.'
      },
      {
        text: 'Chase them out of the store after they take the money',
        textSpanish: 'Perseguirlos fuera de la tienda después de que tomen el dinero',
        correct: false,
        explanation: 'Never chase a robber. Secure the scene, call 911, and wait for law enforcement.',
        explanationSpanish: 'Nunca persigas a un ladrón. Asegura la escena, llama al 911, y espera a las autoridades.'
      }
    ],
    oshaReference: 'OSHA Recommendations for Workplace Violence Prevention in Late-Night Retail'
  },
  {
    id: 'ret-emergency-2',
    industry: 'retail',
    category: 'emergency',
    difficulty: 'intermediate',
    scenario: 'It\'s Black Friday and the store is at maximum capacity. You notice a fire exit is blocked by a merchandise display.',
    scenarioSpanish: 'Es Black Friday y la tienda está a máxima capacidad. Notas que una salida de emergencia está bloqueada por un exhibidor de mercancía.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Leave it — moving the display would look bad during the sale',
        textSpanish: 'Dejarlo — mover el exhibidor se vería mal durante la venta',
        correct: false,
        explanation: 'A blocked fire exit is a life-safety violation regardless of sales priorities.',
        explanationSpanish: 'Una salida de emergencia bloqueada es una violación de seguridad sin importar las prioridades de ventas.'
      },
      {
        text: 'Immediately clear the exit and report it to management',
        textSpanish: 'Despejar la salida inmediatamente y reportarlo a gerencia',
        correct: true,
        explanation: 'Correct! Fire exits must remain clear and accessible at all times. In crowded conditions, blocked exits can lead to crushes and fatalities. Report to management to prevent it from happening again.',
        explanationSpanish: '¡Correcto! Las salidas de emergencia deben permanecer despejadas y accesibles en todo momento. En condiciones de multitud, las salidas bloqueadas pueden causar aplastamientos y fatalidades. Reporta a gerencia para prevenir que vuelva a ocurrir.'
      },
      {
        text: 'Wait until the crowd thins out, then move it',
        textSpanish: 'Esperar hasta que la multitud disminuya, luego moverlo',
        correct: false,
        explanation: 'Emergencies don\'t wait for convenient timing. The exit must be clear now.',
        explanationSpanish: 'Las emergencias no esperan un momento conveniente. La salida debe estar despejada ahora.'
      },
      {
        text: 'Post a sign saying "use other exit"',
        textSpanish: 'Poner un letrero que diga "use otra salida"',
        correct: false,
        explanation: 'In a panic, people will head for the nearest visible exit. A sign is not a substitute for a clear exit.',
        explanationSpanish: 'En un pánico, las personas irán a la salida visible más cercana. Un letrero no sustituye una salida despejada.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.36'
  },
  // RETAIL - PROCEDURE
  {
    id: 'ret-procedure-1',
    industry: 'retail',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'You need to retrieve a product from a high shelf in the stockroom using a ladder.',
    scenarioSpanish: 'Necesitas recuperar un producto de un estante alto en la bodega usando una escalera.',
    question: 'What is the correct ladder safety practice?',
    questionSpanish: '¿Cuál es la práctica correcta de seguridad con escaleras?',
    options: [
      {
        text: 'Climb quickly and reach as far as you can',
        textSpanish: 'Subir rápido y alcanzar lo más lejos posible',
        correct: false,
        explanation: 'Overreaching shifts your center of gravity and can cause falls.',
        explanationSpanish: 'Estirarse demasiado desplaza tu centro de gravedad y puede causar caídas.'
      },
      {
        text: 'Maintain three points of contact and never exceed the weight limit',
        textSpanish: 'Mantener tres puntos de contacto y nunca exceder el límite de peso',
        correct: true,
        explanation: 'Correct! Always keep two hands and one foot, or two feet and one hand, on the ladder. Check the weight rating and never stand on the top two rungs.',
        explanationSpanish: '¡Correcto! Siempre mantén dos manos y un pie, o dos pies y una mano, en la escalera. Verifica la capacidad de peso y nunca te pares en los dos peldaños superiores.'
      },
      {
        text: 'Have a coworker hold the ladder so you can lean freely',
        textSpanish: 'Que un compañero sostenga la escalera para que puedas inclinarte libremente',
        correct: false,
        explanation: 'A spotter helps but does not replace proper climbing technique.',
        explanationSpanish: 'Un asistente ayuda pero no reemplaza la técnica correcta de escalada.'
      },
      {
        text: 'Use a chair or stack of boxes if no ladder is available',
        textSpanish: 'Usar una silla o pila de cajas si no hay escalera disponible',
        correct: false,
        explanation: 'Makeshift platforms are unstable and a leading cause of falls. Always use a proper ladder.',
        explanationSpanish: 'Las plataformas improvisadas son inestables y una causa principal de caídas. Siempre usa una escalera apropiada.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.23'
  },
  {
    id: 'ret-procedure-2',
    industry: 'retail',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'You see a customer concealing merchandise inside their bag.',
    scenarioSpanish: 'Ves a un cliente ocultando mercancía dentro de su bolsa.',
    question: 'What is the safest response?',
    questionSpanish: '¿Cuál es la respuesta más segura?',
    options: [
      {
        text: 'Confront the customer and demand they return the item',
        textSpanish: 'Confrontar al cliente y exigir que devuelva el artículo',
        correct: false,
        explanation: 'Direct confrontation can escalate to verbal or physical violence. This is never safe.',
        explanationSpanish: 'La confrontación directa puede escalar a violencia verbal o física. Esto nunca es seguro.'
      },
      {
        text: 'Do not confront — notify your manager or loss prevention immediately',
        textSpanish: 'No confrontar — notificar a tu gerente o prevención de pérdidas inmediatamente',
        correct: true,
        explanation: 'Correct! Your safety is more important than any merchandise. Report the incident to a manager or loss prevention and let trained personnel handle it.',
        explanationSpanish: '¡Correcto! Tu seguridad es más importante que cualquier mercancía. Reporta el incidente a un gerente o prevención de pérdidas y deja que personal capacitado lo maneje.'
      },
      {
        text: 'Block the exit so they cannot leave',
        textSpanish: 'Bloquear la salida para que no puedan salir',
        correct: false,
        explanation: 'Blocking a person\'s path can provoke a dangerous situation and may have legal consequences for you.',
        explanationSpanish: 'Bloquear el camino de una persona puede provocar una situación peligrosa y puede tener consecuencias legales para ti.'
      },
      {
        text: 'Ignore it — it\'s not your responsibility',
        textSpanish: 'Ignorarlo — no es tu responsabilidad',
        correct: false,
        explanation: 'You should still report what you observed. Just avoid confronting the person directly.',
        explanationSpanish: 'Aún debes reportar lo que observaste. Solo evita confrontar a la persona directamente.'
      }
    ],
    oshaReference: 'OSHA Guidelines on Workplace Violence Prevention'
  },
  // WAREHOUSE - NEW SCENARIOS
  {
    id: 'wh-procedure-2',
    industry: 'warehouse',
    category: 'procedure',
    difficulty: 'advanced',
    scenario: 'A conveyor belt has jammed and you need to clear the blockage. The machine is still powered on.',
    scenarioSpanish: 'Una banda transportadora se ha atascado y necesitas despejar el bloqueo. La máquina todavía está encendida.',
    question: 'What must happen before you reach into the machine?',
    questionSpanish: '¿Qué debe ocurrir antes de que metas la mano en la máquina?',
    options: [
      {
        text: 'Ask a coworker to watch the power switch while you work',
        textSpanish: 'Pedirle a un compañero que vigile el interruptor mientras trabajas',
        correct: false,
        explanation: 'Verbal agreements are not a substitute for lockout/tagout. The machine could restart accidentally.',
        explanationSpanish: 'Los acuerdos verbales no sustituyen el bloqueo/etiquetado. La máquina podría reiniciarse accidentalmente.'
      },
      {
        text: 'Perform lockout/tagout: de-energize, lock, tag, and verify zero energy',
        textSpanish: 'Realizar bloqueo/etiquetado: desenergizar, bloquear, etiquetar, y verificar energía cero',
        correct: true,
        explanation: 'Correct! Lockout/tagout (LOTO) requires isolating all energy sources, applying your personal lock and tag, and verifying the machine cannot restart before any maintenance work.',
        explanationSpanish: '¡Correcto! El bloqueo/etiquetado (LOTO) requiere aislar todas las fuentes de energía, aplicar tu candado y etiqueta personal, y verificar que la máquina no pueda reiniciarse antes de cualquier trabajo de mantenimiento.'
      },
      {
        text: 'Just press the stop button — that\'s enough',
        textSpanish: 'Solo presionar el botón de parada — eso es suficiente',
        correct: false,
        explanation: 'Stop buttons can be accidentally pressed again. Only lockout/tagout guarantees the machine stays off.',
        explanationSpanish: 'Los botones de parada pueden presionarse accidentalmente de nuevo. Solo el bloqueo/etiquetado garantiza que la máquina permanezca apagada.'
      },
      {
        text: 'Work quickly so the machine doesn\'t have time to restart',
        textSpanish: 'Trabajar rápidamente para que la máquina no tenga tiempo de reiniciarse',
        correct: false,
        explanation: 'Speed does not prevent machine activation. This approach has caused fatalities.',
        explanationSpanish: 'La velocidad no previene la activación de la máquina. Este enfoque ha causado fatalidades.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.147'
  },
  {
    id: 'wh-procedure-3',
    industry: 'warehouse',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'Your shift involves 8 hours of repetitive lifting, bending, and carrying.',
    scenarioSpanish: 'Tu turno implica 8 horas de levantamiento, agachamiento y carga repetitivos.',
    question: 'What should you do at the start of your shift to reduce injury risk?',
    questionSpanish: '¿Qué debes hacer al inicio de tu turno para reducir el riesgo de lesión?',
    options: [
      {
        text: 'Start working immediately to build up momentum',
        textSpanish: 'Comenzar a trabajar inmediatamente para ganar impulso',
        correct: false,
        explanation: 'Cold muscles are more prone to strains and tears.',
        explanationSpanish: 'Los músculos fríos son más propensos a distensiones y desgarros.'
      },
      {
        text: 'Perform warm-up stretches targeting your back, legs, and shoulders',
        textSpanish: 'Realizar estiramientos de calentamiento enfocados en espalda, piernas y hombros',
        correct: true,
        explanation: 'Correct! Pre-shift stretching warms up muscles, increases flexibility, and significantly reduces the risk of musculoskeletal injuries during physical work.',
        explanationSpanish: '¡Correcto! El estiramiento previo al turno calienta los músculos, aumenta la flexibilidad, y reduce significativamente el riesgo de lesiones musculoesqueléticas durante el trabajo físico.'
      },
      {
        text: 'Stretching is only for athletes, not warehouse workers',
        textSpanish: 'El estiramiento es solo para atletas, no para trabajadores de almacén',
        correct: false,
        explanation: 'Warehouse work is physically demanding. Stretching is essential for anyone doing repetitive physical tasks.',
        explanationSpanish: 'El trabajo de almacén es físicamente exigente. El estiramiento es esencial para cualquiera que realice tareas físicas repetitivas.'
      },
      {
        text: 'Take a pain reliever before work instead',
        textSpanish: 'Tomar un analgésico antes del trabajo en su lugar',
        correct: false,
        explanation: 'Medication masks pain signals that warn you of injury. Prevention through stretching is always better.',
        explanationSpanish: 'Los medicamentos enmascaran señales de dolor que te advierten de lesiones. La prevención a través del estiramiento siempre es mejor.'
      }
    ],
    oshaReference: 'OSHA Ergonomics Guidelines'
  },
  {
    id: 'wh-hazard-4',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'You\'re assigned to charge forklift batteries in the designated charging area.',
    scenarioSpanish: 'Te asignan cargar baterías de montacargas en el área designada de carga.',
    question: 'What is the main hidden hazard in battery charging areas?',
    questionSpanish: '¿Cuál es el principal peligro oculto en las áreas de carga de baterías?',
    options: [
      {
        text: 'The batteries might overheat and melt',
        textSpanish: 'Las baterías podrían sobrecalentarse y derretirse',
        correct: false,
        explanation: 'While overheating can occur, it\'s not the primary hidden hazard.',
        explanationSpanish: 'Aunque el sobrecalentamiento puede ocurrir, no es el principal peligro oculto.'
      },
      {
        text: 'Charging produces hydrogen gas, which is explosive in poorly ventilated areas',
        textSpanish: 'La carga produce gas hidrógeno, que es explosivo en áreas mal ventiladas',
        correct: true,
        explanation: 'Correct! Lead-acid batteries release hydrogen gas during charging. Without proper ventilation, hydrogen can accumulate to explosive levels. No smoking, sparks, or open flames are allowed in charging areas.',
        explanationSpanish: '¡Correcto! Las baterías de plomo-ácido liberan gas hidrógeno durante la carga. Sin ventilación adecuada, el hidrógeno puede acumularse a niveles explosivos. No se permite fumar, chispas, ni llamas abiertas en áreas de carga.'
      },
      {
        text: 'The cables could trip someone',
        textSpanish: 'Los cables podrían hacer tropezar a alguien',
        correct: false,
        explanation: 'Cable management is important but the primary hazard is the explosive gas.',
        explanationSpanish: 'El manejo de cables es importante pero el peligro principal es el gas explosivo.'
      },
      {
        text: 'There are no special hazards — just plug in and charge',
        textSpanish: 'No hay peligros especiales — solo conectar y cargar',
        correct: false,
        explanation: 'Battery charging areas have specific hazards requiring ventilation, PPE, and no-ignition-source rules.',
        explanationSpanish: 'Las áreas de carga de baterías tienen peligros específicos que requieren ventilación, EPP, y reglas de no fuentes de ignición.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.178(g)'
  },
  {
    id: 'wh-procedure-4',
    industry: 'warehouse',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'A container of cleaning chemical arrives at the warehouse with a GHS label showing a skull-and-crossbones pictogram.',
    scenarioSpanish: 'Un contenedor de químico de limpieza llega al almacén con una etiqueta GHS que muestra un pictograma de calavera con huesos cruzados.',
    question: 'What should you do before handling this chemical?',
    questionSpanish: '¿Qué debes hacer antes de manejar este químico?',
    options: [
      {
        text: 'Wear gloves and handle it normally',
        textSpanish: 'Usar guantes y manejarlo normalmente',
        correct: false,
        explanation: 'The skull-and-crossbones indicates acute toxicity. Gloves alone may not be enough.',
        explanationSpanish: 'La calavera con huesos cruzados indica toxicidad aguda. Los guantes solos pueden no ser suficientes.'
      },
      {
        text: 'Read the Safety Data Sheet (SDS) to learn required PPE and handling procedures',
        textSpanish: 'Leer la Hoja de Datos de Seguridad (HDS) para conocer el EPP requerido y procedimientos de manejo',
        correct: true,
        explanation: 'Correct! The SDS provides 16 sections of safety information including required PPE, first aid measures, and safe handling. Employers must keep SDS accessible for every hazardous chemical on-site.',
        explanationSpanish: '¡Correcto! La HDS proporciona 16 secciones de información de seguridad incluyendo EPP requerido, medidas de primeros auxilios, y manejo seguro. Los empleadores deben mantener las HDS accesibles para cada químico peligroso en el sitio.'
      },
      {
        text: 'If it\'s sealed, it\'s safe to handle without precautions',
        textSpanish: 'Si está sellado, es seguro manejarlo sin precauciones',
        correct: false,
        explanation: 'Sealed containers can leak or break. You must know the hazards before handling.',
        explanationSpanish: 'Los contenedores sellados pueden tener fugas o romperse. Debes conocer los peligros antes de manejar.'
      },
      {
        text: 'Ask a coworker what to do',
        textSpanish: 'Preguntar a un compañero qué hacer',
        correct: false,
        explanation: 'Coworkers may not have accurate information. The SDS is the authoritative source.',
        explanationSpanish: 'Los compañeros pueden no tener información precisa. La HDS es la fuente autorizada.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.1200'
  },
  {
    id: 'wh-hazard-5',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'You notice a power cord with exposed wires plugged into an outlet near your workstation.',
    scenarioSpanish: 'Notas un cable de corriente con cables expuestos conectado a un enchufe cerca de tu estación de trabajo.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Wrap it with regular tape and keep using it',
        textSpanish: 'Envolverlo con cinta regular y seguir usándolo',
        correct: false,
        explanation: 'Regular tape is not rated for electrical insulation and can catch fire.',
        explanationSpanish: 'La cinta regular no está clasificada para aislamiento eléctrico y puede incendiarse.'
      },
      {
        text: 'Do not touch it — unplug safely using the plug (not the cord), tag it out of service, and report it',
        textSpanish: 'No tocarlo — desenchufar de forma segura usando el enchufe (no el cable), etiquetarlo fuera de servicio, y reportarlo',
        correct: true,
        explanation: 'Correct! Damaged cords can cause electrocution or fire. Unplug by gripping the plug, never yank the cord. Remove the equipment from use and report immediately.',
        explanationSpanish: '¡Correcto! Los cables dañados pueden causar electrocución o incendio. Desenchufa sujetando el enchufe, nunca jales el cable. Retira el equipo del uso y reporta inmediatamente.'
      },
      {
        text: 'It\'s fine as long as you don\'t touch the exposed part',
        textSpanish: 'Está bien mientras no toques la parte expuesta',
        correct: false,
        explanation: 'Exposed wires can arc, spark, or cause fire even without direct contact.',
        explanationSpanish: 'Los cables expuestos pueden generar arcos, chispas, o causar incendios incluso sin contacto directo.'
      },
      {
        text: 'Unplug it by pulling the cord',
        textSpanish: 'Desenchufarlo jalando el cable',
        correct: false,
        explanation: 'Pulling the cord can further damage the wiring or cause a shock. Always grip the plug itself.',
        explanationSpanish: 'Jalar el cable puede dañar más el cableado o causar una descarga. Siempre sujeta el enchufe.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.303'
  },
  {
    id: 'wh-hazard-6',
    industry: 'warehouse',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You\'re storing pallets on warehouse racking. A coworker says to stack them above the rack\'s marked load capacity to save space.',
    scenarioSpanish: 'Estás almacenando tarimas en estanterías del almacén. Un compañero dice que las apiles por encima de la capacidad de carga marcada para ahorrar espacio.',
    question: 'What should you do?',
    questionSpanish: '¿Qué debes hacer?',
    options: [
      {
        text: 'Follow the coworker\'s advice if they have more experience',
        textSpanish: 'Seguir el consejo del compañero si tiene más experiencia',
        correct: false,
        explanation: 'Experience does not override rated weight limits. Overloading can cause rack collapse.',
        explanationSpanish: 'La experiencia no anula los límites de peso clasificados. La sobrecarga puede causar el colapso de la estantería.'
      },
      {
        text: 'Never exceed the rack\'s posted load capacity — report the space issue to a supervisor',
        textSpanish: 'Nunca exceder la capacidad de carga publicada de la estantería — reportar el problema de espacio a un supervisor',
        correct: true,
        explanation: 'Correct! Rack load limits exist to prevent catastrophic collapse. Overloading is a leading cause of warehouse fatalities. If space is tight, a supervisor can find a safe solution.',
        explanationSpanish: '¡Correcto! Los límites de carga de estanterías existen para prevenir colapsos catastróficos. La sobrecarga es una causa principal de fatalidades en almacenes. Si el espacio es limitado, un supervisor puede encontrar una solución segura.'
      },
      {
        text: 'Go ahead if the pallets look stable',
        textSpanish: 'Continuar si las tarimas se ven estables',
        correct: false,
        explanation: 'Visual stability does not mean the rack can handle the load. Structural failure can be sudden.',
        explanationSpanish: 'La estabilidad visual no significa que la estantería pueda soportar la carga. La falla estructural puede ser repentina.'
      },
      {
        text: 'Stack them on the floor next to the rack instead',
        textSpanish: 'Apilarlas en el piso junto a la estantería en su lugar',
        correct: false,
        explanation: 'Floor stacking can block aisles and create additional hazards. Consult your supervisor for proper storage.',
        explanationSpanish: 'Apilar en el piso puede bloquear pasillos y crear peligros adicionales. Consulta a tu supervisor para almacenamiento apropiado.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.176'
  },
  // HOSPITALITY - NEW SCENARIOS
  {
    id: 'hosp-procedure-3',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'You need to use a cleaning chemical in the kitchen. The bottle has a GHS label with a corrosion pictogram.',
    scenarioSpanish: 'Necesitas usar un químico de limpieza en la cocina. La botella tiene una etiqueta GHS con un pictograma de corrosión.',
    question: 'What does this pictogram tell you?',
    questionSpanish: '¿Qué te indica este pictograma?',
    options: [
      {
        text: 'The chemical is flammable',
        textSpanish: 'El químico es inflamable',
        correct: false,
        explanation: 'The corrosion pictogram indicates tissue or metal damage, not flammability.',
        explanationSpanish: 'El pictograma de corrosión indica daño a tejidos o metales, no inflamabilidad.'
      },
      {
        text: 'The chemical can cause severe burns to skin or eyes — wear gloves and eye protection',
        textSpanish: 'El químico puede causar quemaduras severas en piel u ojos — usar guantes y protección ocular',
        correct: true,
        explanation: 'Correct! The corrosion pictogram means the chemical can destroy living tissue on contact. Always wear chemical-resistant gloves and eye protection. Store corrosives separately from other chemicals.',
        explanationSpanish: '¡Correcto! El pictograma de corrosión significa que el químico puede destruir tejido vivo al contacto. Siempre usa guantes resistentes a químicos y protección ocular. Almacena los corrosivos separados de otros químicos.'
      },
      {
        text: 'It\'s a mild cleaner safe for bare hands',
        textSpanish: 'Es un limpiador suave seguro para manos desnudas',
        correct: false,
        explanation: 'Any chemical with a GHS hazard pictogram requires PPE. The corrosion symbol is especially serious.',
        explanationSpanish: 'Cualquier químico con un pictograma de peligro GHS requiere EPP. El símbolo de corrosión es especialmente serio.'
      },
      {
        text: 'Pictograms are just for shipping and don\'t apply to end users',
        textSpanish: 'Los pictogramas son solo para envío y no aplican a usuarios finales',
        correct: false,
        explanation: 'GHS pictograms apply to everyone who handles the chemical, not just shippers.',
        explanationSpanish: 'Los pictogramas GHS aplican a todos los que manejan el químico, no solo a los transportistas.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.1200'
  },
  {
    id: 'hosp-procedure-4',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'A customer informs the server they have a severe peanut allergy. The order reaches the kitchen.',
    scenarioSpanish: 'Un cliente informa al mesero que tiene una alergia severa a los cacahuetes. La orden llega a la cocina.',
    question: 'How should the kitchen handle this order?',
    questionSpanish: '¿Cómo debe la cocina manejar esta orden?',
    options: [
      {
        text: 'Just avoid adding peanuts to the dish',
        textSpanish: 'Solo evitar agregar cacahuetes al platillo',
        correct: false,
        explanation: 'Cross-contact from shared utensils, surfaces, or oils can trigger a life-threatening reaction.',
        explanationSpanish: 'El contacto cruzado de utensilios, superficies, o aceites compartidos puede desencadenar una reacción potencialmente mortal.'
      },
      {
        text: 'Use clean utensils, sanitized surfaces, and verify all ingredients are peanut-free',
        textSpanish: 'Usar utensilios limpios, superficies sanitizadas, y verificar que todos los ingredientes estén libres de cacahuetes',
        correct: true,
        explanation: 'Correct! Allergen cross-contact prevention requires clean equipment, sanitized prep areas, ingredient verification (including sauces and oils), and clear communication between all staff handling the order.',
        explanationSpanish: '¡Correcto! La prevención de contacto cruzado de alérgenos requiere equipo limpio, áreas de preparación sanitizadas, verificación de ingredientes (incluyendo salsas y aceites), y comunicación clara entre todo el personal que maneje la orden.'
      },
      {
        text: 'The server should have recommended a different restaurant',
        textSpanish: 'El mesero debió haber recomendado un restaurante diferente',
        correct: false,
        explanation: 'Restaurants must be able to accommodate allergen requests safely. Turning away a customer is not the answer.',
        explanationSpanish: 'Los restaurantes deben poder acomodar solicitudes de alérgenos de forma segura. Rechazar a un cliente no es la respuesta.'
      },
      {
        text: 'Cook the food at a higher temperature to neutralize the allergen',
        textSpanish: 'Cocinar la comida a mayor temperatura para neutralizar el alérgeno',
        correct: false,
        explanation: 'Cooking does NOT destroy most food allergens. Peanut proteins remain allergenic even after high heat.',
        explanationSpanish: 'Cocinar NO destruye la mayoría de los alérgenos alimentarios. Las proteínas de cacahuete permanecen alergénicas incluso después del calor alto.'
      }
    ],
    oshaReference: 'FDA Food Code & Food Allergen Labeling (FALCPA)'
  },
  {
    id: 'hosp-emergency-2',
    industry: 'hospitality',
    category: 'emergency',
    difficulty: 'beginner',
    scenario: 'A coworker accidentally spills hot oil on their forearm, causing a red, blistering burn about 3 inches wide.',
    scenarioSpanish: 'Un compañero accidentalmente derrama aceite caliente en su antebrazo, causando una quemadura roja con ampollas de unas 3 pulgadas de ancho.',
    question: 'What is the correct first aid?',
    questionSpanish: '¿Cuál es el primer auxilio correcto?',
    options: [
      {
        text: 'Apply ice directly to the burn',
        textSpanish: 'Aplicar hielo directamente a la quemadura',
        correct: false,
        explanation: 'Ice can cause frostbite on burned skin and worsen the injury. Never apply ice to burns.',
        explanationSpanish: 'El hielo puede causar congelamiento en piel quemada y empeorar la lesión. Nunca apliques hielo a quemaduras.'
      },
      {
        text: 'Run cool (not cold) water over the burn for 10-20 minutes, then seek medical attention',
        textSpanish: 'Pasar agua fresca (no fría) sobre la quemadura por 10-20 minutos, luego buscar atención médica',
        correct: true,
        explanation: 'Correct! Cool running water reduces pain and limits tissue damage. Do not use ice, butter, or ointments. A burn this size with blisters (second-degree) requires medical evaluation. Call 911 for burns larger than 3 inches or on the face, hands, or joints.',
        explanationSpanish: '¡Correcto! El agua fresca corriente reduce el dolor y limita el daño al tejido. No uses hielo, mantequilla, ni pomadas. Una quemadura de este tamaño con ampollas (segundo grado) requiere evaluación médica. Llama al 911 para quemaduras mayores de 3 pulgadas o en cara, manos, o articulaciones.'
      },
      {
        text: 'Apply butter or petroleum jelly to soothe the burn',
        textSpanish: 'Aplicar mantequilla o vaselina para aliviar la quemadura',
        correct: false,
        explanation: 'Butter and grease trap heat in the skin and increase infection risk. Only use cool water.',
        explanationSpanish: 'La mantequilla y grasa atrapan el calor en la piel y aumentan el riesgo de infección. Solo usa agua fresca.'
      },
      {
        text: 'Pop the blisters to relieve pressure',
        textSpanish: 'Reventar las ampollas para aliviar presión',
        correct: false,
        explanation: 'Blisters protect the skin underneath. Breaking them increases infection risk significantly.',
        explanationSpanish: 'Las ampollas protegen la piel debajo. Romperlas aumenta significativamente el riesgo de infección.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.151'
  },
  {
    id: 'hosp-procedure-5',
    industry: 'hospitality',
    category: 'procedure',
    difficulty: 'intermediate',
    scenario: 'A food delivery truck arrives with a shipment of frozen chicken and fresh produce.',
    scenarioSpanish: 'Un camión de entrega de alimentos llega con un envío de pollo congelado y productos frescos.',
    question: 'What must you check before accepting the delivery?',
    questionSpanish: '¿Qué debes verificar antes de aceptar la entrega?',
    options: [
      {
        text: 'Just count the boxes and sign the receipt',
        textSpanish: 'Solo contar las cajas y firmar el recibo',
        correct: false,
        explanation: 'Quantity checks alone don\'t ensure food safety. Temperature and quality matter.',
        explanationSpanish: 'Las verificaciones de cantidad solas no aseguran la seguridad alimentaria. La temperatura y calidad importan.'
      },
      {
        text: 'Check temperatures (frozen \u2264 0\u00B0F, refrigerated \u2264 41\u00B0F), inspect for damage, and reject items that fail',
        textSpanish: 'Verificar temperaturas (congelado \u2264 0\u00B0F, refrigerado \u2264 41\u00B0F), inspeccionar por da\u00F1os, y rechazar art\u00EDculos que fallen',
        correct: true,
        explanation: 'Correct! Frozen items must arrive at 0\u00B0F or below, and refrigerated items at 41\u00B0F or below. Reject items with torn packaging, off odors, signs of thawing and refreezing, or pest contamination.',
        explanationSpanish: '\u00A1Correcto! Los art\u00EDculos congelados deben llegar a 0\u00B0F o menos, y los refrigerados a 41\u00B0F o menos. Rechaza art\u00EDculos con empaques rotos, olores extra\u00F1os, signos de descongelamiento y recongelamiento, o contaminaci\u00F3n por plagas.'
      },
      {
        text: 'Accept everything and sort out problems later in the walk-in cooler',
        textSpanish: 'Aceptar todo y resolver problemas despu\u00E9s en el refrigerador',
        correct: false,
        explanation: 'Once you accept a delivery, returning items becomes difficult. Inspect before signing.',
        explanationSpanish: 'Una vez que aceptas una entrega, devolver art\u00EDculos se vuelve dif\u00EDcil. Inspecciona antes de firmar.'
      },
      {
        text: 'Only check the items on the top of the stack',
        textSpanish: 'Solo verificar los art\u00EDculos en la parte superior de la pila',
        correct: false,
        explanation: 'Items deeper in the shipment may have been exposed to temperature abuse during transport.',
        explanationSpanish: 'Los art\u00EDculos m\u00E1s profundos en el env\u00EDo pueden haber estado expuestos a abuso de temperatura durante el transporte.'
      }
    ],
    oshaReference: 'FDA Food Code 3-202.11'
  },
  {
    id: 'hosp-hazard-3',
    industry: 'hospitality',
    category: 'hazard',
    difficulty: 'intermediate',
    scenario: 'You\'re about to lower a basket of frozen french fries into a deep fryer filled with 350\u00B0F oil.',
    scenarioSpanish: 'Est\u00E1s a punto de bajar una canasta de papas fritas congeladas a una freidora llena de aceite a 350\u00B0F.',
    question: 'What precaution is most important?',
    questionSpanish: '\u00BFQu\u00E9 precauci\u00F3n es m\u00E1s importante?',
    options: [
      {
        text: 'Drop them in quickly so it doesn\'t splash',
        textSpanish: 'Dejarlas caer r\u00E1pidamente para que no salpique',
        correct: false,
        explanation: 'Dropping food quickly into hot oil causes dangerous splashing and burns.',
        explanationSpanish: 'Dejar caer comida r\u00E1pidamente en aceite caliente causa salpicaduras peligrosas y quemaduras.'
      },
      {
        text: 'Lower the basket slowly, stand back, and wear long sleeves and heat-resistant gloves',
        textSpanish: 'Bajar la canasta lentamente, mantenerte alejado, y usar mangas largas y guantes resistentes al calor',
        correct: true,
        explanation: 'Correct! Frozen food causes oil to bubble violently. Lower the basket slowly to minimize splashing, keep your face and arms away, and wear PPE. Never fill the fryer above the fill line.',
        explanationSpanish: '\u00A1Correcto! La comida congelada causa que el aceite burbujee violentamente. Baja la canasta lentamente para minimizar salpicaduras, mant\u00E9n tu cara y brazos alejados, y usa EPP. Nunca llenes la freidora por encima de la l\u00EDnea de llenado.'
      },
      {
        text: 'Shake off the ice crystals and toss them in by hand',
        textSpanish: 'Sacudir los cristales de hielo y echarlas con la mano',
        correct: false,
        explanation: 'Tossing food by hand near a fryer is extremely dangerous. Always use the basket.',
        explanationSpanish: 'Lanzar comida con la mano cerca de una freidora es extremadamente peligroso. Siempre usa la canasta.'
      },
      {
        text: 'Overfill the fryer to cook more at once',
        textSpanish: 'Sobrecargar la freidora para cocinar m\u00E1s a la vez',
        correct: false,
        explanation: 'Overfilling causes oil to overflow and can ignite on the burner.',
        explanationSpanish: 'Sobrecargar causa que el aceite se desborde y puede encenderse en el quemador.'
      }
    ],
    oshaReference: 'OSHA General Duty Clause, Section 5(a)(1)'
  },
  {
    id: 'hosp-ppe-3',
    industry: 'hospitality',
    category: 'ppe',
    difficulty: 'beginner',
    scenario: 'You\'re asked to slice vegetables using a mandoline slicer.',
    scenarioSpanish: 'Te piden rebanar vegetales usando una mandolina.',
    question: 'What PPE is essential for this task?',
    questionSpanish: '\u00BFQu\u00E9 EPP es esencial para esta tarea?',
    options: [
      {
        text: 'No PPE needed if you use the hand guard',
        textSpanish: 'No se necesita EPP si usas el protector de mano',
        correct: false,
        explanation: 'Hand guards can slip. A cut-resistant glove adds a critical layer of protection.',
        explanationSpanish: 'Los protectores de mano pueden resbalarse. Un guante resistente a cortes agrega una capa cr\u00EDtica de protecci\u00F3n.'
      },
      {
        text: 'A cut-resistant glove on the hand holding the food',
        textSpanish: 'Un guante resistente a cortes en la mano que sostiene la comida',
        correct: true,
        explanation: 'Correct! Always wear a cut-resistant glove on the hand feeding food into the mandoline. Mandoline injuries are among the most common serious kitchen cuts.',
        explanationSpanish: '\u00A1Correcto! Siempre usa un guante resistente a cortes en la mano que alimenta la comida en la mandolina. Las lesiones con mandolina est\u00E1n entre los cortes de cocina graves m\u00E1s comunes.'
      },
      {
        text: 'Latex gloves for hygiene',
        textSpanish: 'Guantes de l\u00E1tex para higiene',
        correct: false,
        explanation: 'Latex gloves provide no cut protection. You need a cut-resistant glove for blade safety.',
        explanationSpanish: 'Los guantes de l\u00E1tex no proporcionan protecci\u00F3n contra cortes. Necesitas un guante resistente a cortes para seguridad con hojas.'
      },
      {
        text: 'Heat-resistant gloves',
        textSpanish: 'Guantes resistentes al calor',
        correct: false,
        explanation: 'Heat-resistant gloves protect from burns, not cuts. Use the right PPE for the hazard.',
        explanationSpanish: 'Los guantes resistentes al calor protegen de quemaduras, no de cortes. Usa el EPP correcto para el peligro.'
      }
    ],
    oshaReference: 'OSHA 29 CFR 1910.132'
  },
  // GENERAL - NEW SCENARIOS
  {
    id: 'gen-emergency-2',
    industry: 'general',
    category: 'emergency',
    difficulty: 'intermediate',
    scenario: 'You hear gunshots inside your workplace.',
    scenarioSpanish: 'Escuchas disparos dentro de tu lugar de trabajo.',
    question: 'What is the recommended response protocol?',
    questionSpanish: '\u00BFCu\u00E1l es el protocolo de respuesta recomendado?',
    options: [
      {
        text: 'Freeze and wait for instructions over the intercom',
        textSpanish: 'Quedarse quieto y esperar instrucciones por el altavoz',
        correct: false,
        explanation: 'Waiting makes you a stationary target. Immediate action improves survival chances.',
        explanationSpanish: 'Esperar te hace un blanco estacionario. La acci\u00F3n inmediata mejora las probabilidades de supervivencia.'
      },
      {
        text: 'Run-Hide-Fight: evacuate if possible, hide if you can\'t run, fight only as a last resort',
        textSpanish: 'Correr-Esconderse-Pelear: evacuar si es posible, esconderse si no puedes correr, pelear solo como \u00FAltimo recurso',
        correct: true,
        explanation: 'Correct! RUN: escape if a safe path exists, leave belongings behind. HIDE: if you can\'t run, lock and barricade doors, silence your phone. FIGHT: only as a last resort, use any available object to defend yourself.',
        explanationSpanish: '\u00A1Correcto! CORRER: escapa si existe un camino seguro, deja tus pertenencias. ESCONDERSE: si no puedes correr, cierra con llave y barrica puertas, silencia tu tel\u00E9fono. PELEAR: solo como \u00FAltimo recurso, usa cualquier objeto disponible para defenderte.'
      },
      {
        text: 'Call 911 before doing anything else',
        textSpanish: 'Llamar al 911 antes de hacer cualquier otra cosa',
        correct: false,
        explanation: 'Your first priority is getting to safety. Call 911 once you are safe, not while in danger.',
        explanationSpanish: 'Tu primera prioridad es ponerte a salvo. Llama al 911 una vez que est\u00E9s seguro, no mientras est\u00E9s en peligro.'
      },
      {
        text: 'Go toward the sound to help others',
        textSpanish: 'Ir hacia el sonido para ayudar a otros',
        correct: false,
        explanation: 'Moving toward the threat puts you in extreme danger. Help others evacuate in the opposite direction.',
        explanationSpanish: 'Moverte hacia la amenaza te pone en peligro extremo. Ayuda a otros a evacuar en la direcci\u00F3n opuesta.'
      }
    ],
    oshaReference: 'DHS Active Shooter Preparedness & OSHA Workplace Violence Guidelines'
  },
  {
    id: 'gen-hazard-1',
    industry: 'general',
    category: 'hazard',
    difficulty: 'beginner',
    scenario: 'You\'re working during a heat wave. A coworker starts to feel dizzy, stops sweating, and has hot, dry skin.',
    scenarioSpanish: 'Est\u00E1s trabajando durante una ola de calor. Un compa\u00F1ero comienza a sentirse mareado, deja de sudar, y tiene piel caliente y seca.',
    question: 'What is happening and what should you do?',
    questionSpanish: '\u00BFQu\u00E9 est\u00E1 pasando y qu\u00E9 debes hacer?',
    options: [
      {
        text: 'They\'re just tired \u2014 let them rest for a few minutes',
        textSpanish: 'Solo est\u00E1n cansados \u2014 dejarlos descansar unos minutos',
        correct: false,
        explanation: 'These symptoms indicate heat stroke, not simple fatigue. Delayed action can be fatal.',
        explanationSpanish: 'Estos s\u00EDntomas indican golpe de calor, no simple fatiga. La acci\u00F3n retrasada puede ser fatal.'
      },
      {
        text: 'This is heat stroke \u2014 call 911 immediately and move them to a cool area',
        textSpanish: 'Esto es golpe de calor \u2014 llamar al 911 inmediatamente y moverlos a un \u00E1rea fresca',
        correct: true,
        explanation: 'Correct! Hot dry skin and confusion are signs of heat stroke, a life-threatening emergency. Call 911, move the person to shade or AC, cool them with water or wet cloths, and do not give fluids if they\'re confused or unconscious. Prevention: hydrate, take breaks, and watch for early symptoms.',
        explanationSpanish: '\u00A1Correcto! Piel caliente y seca y confusi\u00F3n son se\u00F1ales de golpe de calor, una emergencia potencialmente mortal. Llama al 911, mueve a la persona a la sombra o AC, enfr\u00EDalos con agua o pa\u00F1os h\u00FAmedos, y no des l\u00EDquidos si est\u00E1n confundidos o inconscientes. Prevenci\u00F3n: hidratarse, tomar descansos, y vigilar s\u00EDntomas tempranos.'
      },
      {
        text: 'Give them a cold energy drink',
        textSpanish: 'Darles una bebida energ\u00E9tica fr\u00EDa',
        correct: false,
        explanation: 'Caffeine and sugar can worsen dehydration. If conscious, offer small sips of plain water only.',
        explanationSpanish: 'La cafe\u00EDna y el az\u00FAcar pueden empeorar la deshidrataci\u00F3n. Si est\u00E1n conscientes, ofrece solo peque\u00F1os sorbos de agua simple.'
      },
      {
        text: 'Have them keep working in the shade',
        textSpanish: 'Que sigan trabajando en la sombra',
        correct: false,
        explanation: 'Heat stroke requires emergency medical treatment, not reduced activity.',
        explanationSpanish: 'El golpe de calor requiere tratamiento m\u00E9dico de emergencia, no actividad reducida.'
      }
    ],
    oshaReference: 'OSHA Heat Illness Prevention Campaign (Water, Rest, Shade)'
  },
  {
    id: 'gen-procedure-3',
    industry: 'general',
    category: 'procedure',
    difficulty: 'beginner',
    scenario: 'A coworker has been making repeated offensive comments about your race during shifts.',
    scenarioSpanish: 'Un compa\u00F1ero ha hecho comentarios ofensivos repetidos sobre tu raza durante los turnos.',
    question: 'What is the correct way to handle this?',
    questionSpanish: '\u00BFCu\u00E1l es la forma correcta de manejar esto?',
    options: [
      {
        text: 'Ignore it \u2014 they\'re probably just joking',
        textSpanish: 'Ignorarlo \u2014 probablemente solo est\u00E1n bromeando',
        correct: false,
        explanation: 'Repeated offensive comments create a hostile work environment, regardless of intent.',
        explanationSpanish: 'Los comentarios ofensivos repetidos crean un ambiente laboral hostil, sin importar la intenci\u00F3n.'
      },
      {
        text: 'Document what happened and report it to HR, a manager, or the EEOC',
        textSpanish: 'Documentar lo que pas\u00F3 y reportarlo a Recursos Humanos, un gerente, o la EEOC',
        correct: true,
        explanation: 'Correct! Write down dates, times, witnesses, and exact words used. Report to your employer\'s HR or management. If the employer does not act, you can file a complaint with the EEOC. You are protected from retaliation by law.',
        explanationSpanish: '\u00A1Correcto! Anota fechas, horas, testigos, y las palabras exactas usadas. Reporta a Recursos Humanos o gerencia de tu empleador. Si el empleador no act\u00FAa, puedes presentar una queja ante la EEOC. Est\u00E1s protegido contra represalias por ley.'
      },
      {
        text: 'Confront the coworker aggressively to make them stop',
        textSpanish: 'Confrontar al compa\u00F1ero agresivamente para hacer que se detengan',
        correct: false,
        explanation: 'Aggressive confrontation can escalate the situation and may put your own employment at risk.',
        explanationSpanish: 'La confrontaci\u00F3n agresiva puede escalar la situaci\u00F3n y puede poner en riesgo tu propio empleo.'
      },
      {
        text: 'Just quit \u2014 there\'s nothing you can do',
        textSpanish: 'Solo renunciar \u2014 no hay nada que puedas hacer',
        correct: false,
        explanation: 'You have legal protections. Federal and state laws prohibit workplace discrimination and harassment.',
        explanationSpanish: 'Tienes protecciones legales. Las leyes federales y estatales proh\u00EDben la discriminaci\u00F3n y acoso en el lugar de trabajo.'
      }
    ],
    oshaReference: 'Title VII of the Civil Rights Act & EEOC Guidelines'
  }
];

export const categoryLabels: Record<string, { en: string; es: string; icon: string; color: string }> = {
  hazard: { 
    en: 'Hazard Identification', 
    es: 'Identificación de Peligros',
    icon: '⚠️',
    color: 'bg-amber-500'
  },
  ppe: { 
    en: 'PPE Requirements', 
    es: 'Requisitos de EPP',
    icon: '🦺',
    color: 'bg-blue-500'
  },
  emergency: { 
    en: 'Emergency Response', 
    es: 'Respuesta de Emergencia',
    icon: '🚨',
    color: 'bg-red-500'
  },
  procedure: { 
    en: 'Safe Procedures', 
    es: 'Procedimientos Seguros',
    icon: '📋',
    color: 'bg-green-500'
  }
};

export const industryLabels: Record<string, { en: string; es: string; icon: string }> = {
  warehouse: { en: 'Warehouse', es: 'Almacén', icon: '📦' },
  hospitality: { en: 'Hospitality', es: 'Hospitalidad', icon: '🍽️' },
  retail: { en: 'Retail', es: 'Comercio', icon: '🛒' },
  general: { en: 'General', es: 'General', icon: '🏢' }
};
