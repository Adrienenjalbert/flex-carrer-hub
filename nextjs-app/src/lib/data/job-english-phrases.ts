export interface JobPhrase {
  id: string;
  english: string;
  spanish: string;
  phonetic: string;
  category: 'safety' | 'tasks' | 'questions' | 'breaks' | 'equipment' | 'greetings' | 'numbers';
  context: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface IndustryVocabulary {
  id: string;
  name: string;
  nameSpanish: string;
  icon: string;
  description: string;
  descriptionSpanish: string;
  phrases: JobPhrase[];
}

export const industries: IndustryVocabulary[] = [
  {
    id: 'warehouse',
    name: 'Warehouse',
    nameSpanish: 'Almacén',
    icon: '📦',
    description: 'Essential phrases for warehouse and logistics work',
    descriptionSpanish: 'Frases esenciales para trabajo en almacén y logística',
    phrases: [
      // Safety - Critical First
      { id: 'w1', english: 'Watch out!', spanish: '¡Cuidado!', phonetic: 'wach aut', category: 'safety', context: 'Warning someone of danger', difficulty: 'beginner' },
      { id: 'w2', english: 'Stop the machine', spanish: 'Detén la máquina', phonetic: 'stop de mah-sheen', category: 'safety', context: 'Emergency stop command', difficulty: 'beginner' },
      { id: 'w3', english: 'Wear your safety vest', spanish: 'Ponte el chaleco de seguridad', phonetic: 'wer yor sef-ti vest', category: 'safety', context: 'Safety equipment reminder', difficulty: 'beginner' },
      { id: 'w4', english: 'Put on your hard hat', spanish: 'Ponte el casco', phonetic: 'put on yor hard hat', category: 'safety', context: 'Head protection required', difficulty: 'beginner' },
      { id: 'w5', english: 'Forklift coming through', spanish: 'Montacargas pasando', phonetic: 'fork-lift kom-ing thru', category: 'safety', context: 'Warning of forklift movement', difficulty: 'intermediate' },
      { id: 'w6', english: 'This area is restricted', spanish: 'Esta área está restringida', phonetic: 'dis eh-ree-ah iz ree-strikt-ed', category: 'safety', context: 'No entry zone', difficulty: 'intermediate' },
      
      // Tasks
      { id: 'w7', english: 'Stack the boxes here', spanish: 'Apila las cajas aquí', phonetic: 'stak de boks-es hir', category: 'tasks', context: 'Instruction for organizing', difficulty: 'beginner' },
      { id: 'w8', english: 'Take this to aisle five', spanish: 'Lleva esto al pasillo cinco', phonetic: 'teik dis tu ail faiv', category: 'tasks', context: 'Moving items', difficulty: 'beginner' },
      { id: 'w9', english: 'Scan the barcode', spanish: 'Escanea el código de barras', phonetic: 'skan de bar-kohd', category: 'tasks', context: 'Inventory tracking', difficulty: 'beginner' },
      { id: 'w10', english: 'Load the truck', spanish: 'Carga el camión', phonetic: 'lohd de trok', category: 'tasks', context: 'Shipping preparation', difficulty: 'beginner' },
      { id: 'w11', english: 'Unload the pallet', spanish: 'Descarga la tarima', phonetic: 'un-lohd de pal-et', category: 'tasks', context: 'Receiving goods', difficulty: 'beginner' },
      { id: 'w12', english: 'Check the inventory', spanish: 'Revisa el inventario', phonetic: 'chek de in-ven-tor-ee', category: 'tasks', context: 'Stock counting', difficulty: 'intermediate' },
      { id: 'w13', english: 'Wrap the pallet', spanish: 'Envuelve la tarima', phonetic: 'rap de pal-et', category: 'tasks', context: 'Securing shipments', difficulty: 'intermediate' },
      
      // Questions
      { id: 'w14', english: 'Where is the bathroom?', spanish: '¿Dónde está el baño?', phonetic: 'wer iz de bath-room', category: 'questions', context: 'Finding facilities', difficulty: 'beginner' },
      { id: 'w15', english: 'What time is break?', spanish: '¿A qué hora es el descanso?', phonetic: 'wat taim iz breik', category: 'questions', context: 'Schedule inquiry', difficulty: 'beginner' },
      { id: 'w16', english: 'Can you help me?', spanish: '¿Puedes ayudarme?', phonetic: 'kan yu help mi', category: 'questions', context: 'Asking for assistance', difficulty: 'beginner' },
      { id: 'w17', english: 'Where does this go?', spanish: '¿Dónde va esto?', phonetic: 'wer doz dis goh', category: 'questions', context: 'Asking about placement', difficulty: 'beginner' },
      { id: 'w18', english: 'How many do you need?', spanish: '¿Cuántos necesitas?', phonetic: 'hau men-ee du yu nid', category: 'questions', context: 'Quantity confirmation', difficulty: 'intermediate' },
      
      // Breaks
      { id: 'w19', english: "I'm going on break", spanish: 'Voy a tomar un descanso', phonetic: 'aim goh-ing on breik', category: 'breaks', context: 'Informing supervisor', difficulty: 'beginner' },
      { id: 'w20', english: "Break time is over", spanish: 'Se acabó el descanso', phonetic: 'breik taim iz oh-ver', category: 'breaks', context: 'Return to work signal', difficulty: 'beginner' },
      { id: 'w21', english: 'Lunch is at noon', spanish: 'El almuerzo es al mediodía', phonetic: 'lonch iz at noon', category: 'breaks', context: 'Schedule information', difficulty: 'beginner' },
      
      // Equipment
      { id: 'w22', english: 'The scanner is broken', spanish: 'El escáner está roto', phonetic: 'de skan-er iz broh-ken', category: 'equipment', context: 'Reporting equipment issues', difficulty: 'intermediate' },
      { id: 'w23', english: 'I need a pallet jack', spanish: 'Necesito un patín', phonetic: 'ai nid ah pal-et jak', category: 'equipment', context: 'Requesting equipment', difficulty: 'intermediate' },
      { id: 'w24', english: 'The conveyor belt stopped', spanish: 'La banda transportadora se detuvo', phonetic: 'de kon-vey-or belt stopt', category: 'equipment', context: 'Reporting malfunction', difficulty: 'advanced' },

      // Greetings
      { id: 'w25', english: 'Good morning', spanish: 'Buenos días', phonetic: 'gud morn-ing', category: 'greetings', context: 'Start-of-shift greeting', difficulty: 'beginner' },
      { id: 'w26', english: 'See you tomorrow', spanish: 'Nos vemos mañana', phonetic: 'si yu tuh-mah-roh', category: 'greetings', context: 'End-of-shift farewell', difficulty: 'beginner' },
      { id: 'w27', english: 'Nice to meet you', spanish: 'Mucho gusto', phonetic: 'nais tu mit yu', category: 'greetings', context: 'Meeting a new coworker', difficulty: 'beginner' },
      { id: 'w28', english: 'Have a good weekend', spanish: 'Que tengas un buen fin de semana', phonetic: 'hav ah gud wik-end', category: 'greetings', context: 'Friday farewell', difficulty: 'beginner' },
      { id: 'w29', english: 'My name is...', spanish: 'Mi nombre es...', phonetic: 'mai neim iz', category: 'greetings', context: 'Introducing yourself', difficulty: 'beginner' },
      { id: 'w30', english: 'How are you?', spanish: '¿Cómo estás?', phonetic: 'hau ar yu', category: 'greetings', context: 'Casual team greeting', difficulty: 'beginner' },

      // More Breaks
      { id: 'w31', english: 'When is lunch?', spanish: '¿Cuándo es el almuerzo?', phonetic: 'wen iz lonch', category: 'breaks', context: 'Asking about meal break', difficulty: 'beginner' },
      { id: 'w32', english: 'I need water', spanish: 'Necesito agua', phonetic: 'ai nid wah-ter', category: 'breaks', context: 'Hydration request', difficulty: 'beginner' },
      { id: 'w33', english: 'Where is the break room?', spanish: '¿Dónde está el cuarto de descanso?', phonetic: 'wer iz de breik rum', category: 'breaks', context: 'Finding rest area', difficulty: 'beginner' },
      { id: 'w34', english: 'Can I take a quick break?', spanish: '¿Puedo tomar un descanso rápido?', phonetic: 'kan ai teik ah kwik breik', category: 'breaks', context: 'Requesting short break', difficulty: 'intermediate' },

      // Numbers
      { id: 'w35', english: 'How many boxes?', spanish: '¿Cuántas cajas?', phonetic: 'hau men-ee boks-es', category: 'numbers', context: 'Quantity question', difficulty: 'beginner' },
      { id: 'w36', english: 'Pallet number five', spanish: 'Tarima número cinco', phonetic: 'pal-et nom-ber faiv', category: 'numbers', context: 'Identifying pallets', difficulty: 'beginner' },
      { id: 'w37', english: 'Row three, shelf two', spanish: 'Fila tres, estante dos', phonetic: 'roh thri, shelf tu', category: 'numbers', context: 'Location in warehouse', difficulty: 'intermediate' },
      { id: 'w38', english: 'Count the items', spanish: 'Cuenta los artículos', phonetic: 'kaunt de ai-tems', category: 'numbers', context: 'Inventory counting', difficulty: 'beginner' },
      { id: 'w39', english: 'We need ten more', spanish: 'Necesitamos diez más', phonetic: 'wi nid ten mor', category: 'numbers', context: 'Requesting additional quantity', difficulty: 'beginner' },
      { id: 'w40', english: 'Dock door number four', spanish: 'Puerta del muelle número cuatro', phonetic: 'dok dor nom-ber for', category: 'numbers', context: 'Loading dock reference', difficulty: 'intermediate' },

      // HR Escalation
      { id: 'w41', english: 'I was injured', spanish: 'Me lastimé', phonetic: 'ai woz in-jurd', category: 'safety', context: 'Reporting personal injury', difficulty: 'beginner' },
      { id: 'w42', english: 'I need to report an incident', spanish: 'Necesito reportar un incidente', phonetic: 'ai nid tu ree-port an in-si-dent', category: 'safety', context: 'Incident reporting', difficulty: 'intermediate' },
      { id: 'w43', english: 'I need an interpreter', spanish: 'Necesito un intérprete', phonetic: 'ai nid an in-ter-preh-ter', category: 'questions', context: 'Requesting language help', difficulty: 'intermediate' },
      { id: 'w44', english: 'Where is the first aid kit?', spanish: '¿Dónde está el botiquín?', phonetic: 'wer iz de ferst eid kit', category: 'safety', context: 'Finding medical supplies', difficulty: 'beginner' },
      { id: 'w45', english: "I don't understand", spanish: 'No entiendo', phonetic: 'ai dohnt on-der-stand', category: 'questions', context: 'Asking for clarification', difficulty: 'beginner' },
      { id: 'w46', english: 'Can you say that again?', spanish: '¿Puedes repetir eso?', phonetic: 'kan yu sei dat ah-gen', category: 'questions', context: 'Requesting repetition', difficulty: 'beginner' },
      { id: 'w47', english: 'I need to speak to HR', spanish: 'Necesito hablar con recursos humanos', phonetic: 'ai nid tu spik tu eich-ar', category: 'questions', context: 'HR escalation', difficulty: 'intermediate' },

      // Scheduling
      { id: 'w48', english: 'Can I swap shifts?', spanish: '¿Puedo cambiar de turno?', phonetic: 'kan ai swap shifts', category: 'questions', context: 'Schedule change request', difficulty: 'intermediate' },
      { id: 'w49', english: 'What time do we finish?', spanish: '¿A qué hora terminamos?', phonetic: 'wat taim du wi fin-ish', category: 'questions', context: 'End-of-shift inquiry', difficulty: 'beginner' },
      { id: 'w50', english: 'Am I working tomorrow?', spanish: '¿Trabajo mañana?', phonetic: 'am ai werk-ing tuh-mah-roh', category: 'questions', context: 'Schedule confirmation', difficulty: 'beginner' },
      { id: 'w51', english: 'I need to leave early', spanish: 'Necesito salir temprano', phonetic: 'ai nid tu liv er-li', category: 'questions', context: 'Early departure request', difficulty: 'intermediate' },
      { id: 'w52', english: 'What time does my shift start?', spanish: '¿A qué hora empieza mi turno?', phonetic: 'wat taim doz mai shift start', category: 'questions', context: 'Shift start inquiry', difficulty: 'beginner' },
      { id: 'w53', english: "I'm running late", spanish: 'Voy a llegar tarde', phonetic: 'aim ron-ing leit', category: 'questions', context: 'Notifying tardiness', difficulty: 'beginner' },
      { id: 'w54', english: 'I need to call in sick', spanish: 'Necesito reportarme enfermo', phonetic: 'ai nid tu kol in sik', category: 'questions', context: 'Sick day notification', difficulty: 'intermediate' },
      { id: 'w55', english: 'Where do I clock in?', spanish: '¿Dónde marco mi entrada?', phonetic: 'wer du ai klok in', category: 'questions', context: 'Finding time clock', difficulty: 'beginner' },
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    nameSpanish: 'Hospitalidad',
    icon: '🍽️',
    description: 'Phrases for kitchen, service, and event work',
    descriptionSpanish: 'Frases para cocina, servicio y eventos',
    phrases: [
      // Safety
      { id: 'h1', english: 'Hot plate, be careful!', spanish: '¡Plato caliente, cuidado!', phonetic: 'hot pleit, bi ker-ful', category: 'safety', context: 'Warning about hot items', difficulty: 'beginner' },
      { id: 'h2', english: 'Wet floor, watch your step', spanish: 'Piso mojado, cuidado al caminar', phonetic: 'wet flor, wach yor step', category: 'safety', context: 'Slip hazard warning', difficulty: 'beginner' },
      { id: 'h3', english: 'Wash your hands', spanish: 'Lávate las manos', phonetic: 'wash yor hands', category: 'safety', context: 'Hygiene reminder', difficulty: 'beginner' },
      { id: 'h4', english: 'Sharp knife, be careful', spanish: 'Cuchillo afilado, ten cuidado', phonetic: 'sharp naif, bi ker-ful', category: 'safety', context: 'Kitchen safety', difficulty: 'beginner' },
      
      // Tasks
      { id: 'h5', english: 'Clear table twelve', spanish: 'Limpia la mesa doce', phonetic: 'klir tei-bul twelv', category: 'tasks', context: 'Service instruction', difficulty: 'beginner' },
      { id: 'h6', english: 'Take this to the customer', spanish: 'Lleva esto al cliente', phonetic: 'teik dis tu de kos-to-mer', category: 'tasks', context: 'Serving order', difficulty: 'beginner' },
      { id: 'h7', english: 'Refill the water glasses', spanish: 'Rellena los vasos de agua', phonetic: 're-fil de wah-ter glas-es', category: 'tasks', context: 'Table service', difficulty: 'beginner' },
      { id: 'h8', english: 'Set up the tables', spanish: 'Prepara las mesas', phonetic: 'set op de tei-buls', category: 'tasks', context: 'Opening preparation', difficulty: 'beginner' },
      { id: 'h9', english: 'Chop the vegetables', spanish: 'Corta las verduras', phonetic: 'chop de vej-ta-buls', category: 'tasks', context: 'Kitchen prep', difficulty: 'beginner' },
      { id: 'h10', english: 'Season the meat', spanish: 'Sazona la carne', phonetic: 'si-zon de mit', category: 'tasks', context: 'Cooking instruction', difficulty: 'intermediate' },
      { id: 'h11', english: 'Plate the food nicely', spanish: 'Emplata bien la comida', phonetic: 'pleit de fud nais-li', category: 'tasks', context: 'Presentation', difficulty: 'intermediate' },
      
      // Questions
      { id: 'h12', english: 'Is this order ready?', spanish: '¿Está listo este pedido?', phonetic: 'iz dis or-der red-i', category: 'questions', context: 'Kitchen to server', difficulty: 'beginner' },
      { id: 'h13', english: 'What table is this for?', spanish: '¿Para qué mesa es esto?', phonetic: 'wat tei-bul iz dis for', category: 'questions', context: 'Order clarification', difficulty: 'beginner' },
      { id: 'h14', english: 'Do you need anything else?', spanish: '¿Necesita algo más?', phonetic: 'du yu nid eni-thing els', category: 'questions', context: 'Customer service', difficulty: 'intermediate' },
      { id: 'h15', english: 'How would you like it cooked?', spanish: '¿A qué término lo quiere?', phonetic: 'hau wud yu laik it kukt', category: 'questions', context: 'Taking orders', difficulty: 'intermediate' },
      
      // Greetings
      { id: 'h16', english: 'Welcome, how many guests?', spanish: 'Bienvenido, ¿cuántas personas?', phonetic: 'wel-kom, hau men-i guests', category: 'greetings', context: 'Host greeting', difficulty: 'beginner' },
      { id: 'h17', english: 'Your table is ready', spanish: 'Su mesa está lista', phonetic: 'yor tei-bul iz red-i', category: 'greetings', context: 'Seating guests', difficulty: 'beginner' },
      { id: 'h18', english: 'Have a nice day', spanish: 'Que tenga un buen día', phonetic: 'hav ah nais dei', category: 'greetings', context: 'Farewell', difficulty: 'beginner' },
      
      // Equipment
      { id: 'h19', english: 'The oven is not working', spanish: 'El horno no funciona', phonetic: 'de ov-en iz not werk-ing', category: 'equipment', context: 'Reporting issues', difficulty: 'intermediate' },
      { id: 'h20', english: 'I need a tray', spanish: 'Necesito una bandeja', phonetic: 'ai nid ah trei', category: 'equipment', context: 'Requesting supplies', difficulty: 'beginner' },

      // Kitchen Callouts
      { id: 'h21', english: 'Behind!', spanish: '¡Atrás!', phonetic: 'bee-haind', category: 'safety', context: 'Warning when walking behind someone', difficulty: 'beginner' },
      { id: 'h22', english: 'Corner!', spanish: '¡Esquina!', phonetic: 'kor-ner', category: 'safety', context: 'Warning at blind corners', difficulty: 'beginner' },
      { id: 'h23', english: 'Hot behind!', spanish: '¡Caliente atrás!', phonetic: 'hot bee-haind', category: 'safety', context: 'Carrying hot items behind someone', difficulty: 'beginner' },
      { id: 'h24', english: 'Heard!', spanish: '¡Escuchado!', phonetic: 'herd', category: 'tasks', context: 'Acknowledging an order or instruction', difficulty: 'beginner' },
      { id: 'h25', english: 'Fire table six', spanish: 'Dispara la mesa seis', phonetic: 'fair tei-bul siks', category: 'tasks', context: 'Start cooking for a specific table', difficulty: 'intermediate' },
      { id: 'h26', english: 'All day we have five burgers', spanish: 'En total llevamos cinco hamburguesas', phonetic: 'ol dei wi hav faiv ber-gers', category: 'tasks', context: 'Running total of pending orders', difficulty: 'advanced' },
      { id: 'h27', english: 'Order up!', spanish: '¡Pedido listo!', phonetic: 'or-der op', category: 'tasks', context: 'Food ready at the pass', difficulty: 'beginner' },
      { id: 'h28', english: 'Eighty-six the soup', spanish: 'Se acabó la sopa', phonetic: 'ei-ti siks de sup', category: 'tasks', context: 'Item no longer available', difficulty: 'intermediate' },

      // Breaks
      { id: 'h29', english: "I'm going on break", spanish: 'Voy a tomar mi descanso', phonetic: 'aim goh-ing on breik', category: 'breaks', context: 'Informing team of break', difficulty: 'beginner' },
      { id: 'h30', english: "Who's covering my section?", spanish: '¿Quién cubre mi sección?', phonetic: 'huz kov-er-ing mai sek-shun', category: 'breaks', context: 'Arranging break coverage', difficulty: 'intermediate' },
      { id: 'h31', english: 'When is my break?', spanish: '¿Cuándo es mi descanso?', phonetic: 'wen iz mai breik', category: 'breaks', context: 'Asking about break schedule', difficulty: 'beginner' },
      { id: 'h32', english: 'I need five minutes', spanish: 'Necesito cinco minutos', phonetic: 'ai nid faiv min-its', category: 'breaks', context: 'Quick break request', difficulty: 'beginner' },
      { id: 'h33', english: "Break time, who's up next?", spanish: 'Hora de descanso, ¿quién sigue?', phonetic: 'breik taim, huz op nekst', category: 'breaks', context: 'Rotating break schedule', difficulty: 'intermediate' },

      // Numbers
      { id: 'h34', english: 'Table for two', spanish: 'Mesa para dos', phonetic: 'tei-bul for tu', category: 'numbers', context: 'Seating party size', difficulty: 'beginner' },
      { id: 'h35', english: 'Check for table five', spanish: 'Cuenta de la mesa cinco', phonetic: 'chek for tei-bul faiv', category: 'numbers', context: 'Requesting a bill', difficulty: 'beginner' },
      { id: 'h36', english: 'Party of eight', spanish: 'Grupo de ocho', phonetic: 'par-ti of eit', category: 'numbers', context: 'Large party seating', difficulty: 'beginner' },
      { id: 'h37', english: 'Reservation for seven o\'clock', spanish: 'Reservación para las siete', phonetic: 're-zer-vei-shun for sev-en oh-klok', category: 'numbers', context: 'Booking time reference', difficulty: 'intermediate' },
      { id: 'h38', english: 'The wait is thirty minutes', spanish: 'La espera es de treinta minutos', phonetic: 'de weit iz ther-ti min-its', category: 'numbers', context: 'Wait time estimate', difficulty: 'intermediate' },
      { id: 'h39', english: 'Table three needs the bill', spanish: 'La mesa tres necesita la cuenta', phonetic: 'tei-bul thri nids de bil', category: 'numbers', context: 'Payment request for table', difficulty: 'intermediate' },

      // HR / Conflict
      { id: 'h40', english: 'I need to speak to a manager', spanish: 'Necesito hablar con un gerente', phonetic: 'ai nid tu spik tu ah man-ah-jer', category: 'questions', context: 'Escalating an issue', difficulty: 'intermediate' },
      { id: 'h41', english: 'I cut myself', spanish: 'Me corté', phonetic: 'ai kot mai-self', category: 'safety', context: 'Reporting a kitchen injury', difficulty: 'beginner' },
      { id: 'h42', english: 'I burned my hand', spanish: 'Me quemé la mano', phonetic: 'ai bernd mai hand', category: 'safety', context: 'Reporting a burn', difficulty: 'beginner' },
      { id: 'h43', english: 'A customer is complaining', spanish: 'Un cliente se está quejando', phonetic: 'ah kos-to-mer iz kom-plein-ing', category: 'questions', context: 'Alerting management', difficulty: 'intermediate' },
      { id: 'h44', english: 'I need the first aid kit', spanish: 'Necesito el botiquín', phonetic: 'ai nid de ferst eid kit', category: 'safety', context: 'Requesting medical supplies', difficulty: 'beginner' },

      // More Equipment
      { id: 'h45', english: 'The dishwasher is broken', spanish: 'El lavavajillas está roto', phonetic: 'de dish-wash-er iz broh-ken', category: 'equipment', context: 'Reporting equipment failure', difficulty: 'intermediate' },
      { id: 'h46', english: "We're out of clean plates", spanish: 'No tenemos platos limpios', phonetic: 'wir aut of klin pleits', category: 'equipment', context: 'Supply shortage', difficulty: 'intermediate' },
      { id: 'h47', english: 'The freezer is too warm', spanish: 'El congelador está muy caliente', phonetic: 'de free-zer iz tu warm', category: 'equipment', context: 'Temperature issue', difficulty: 'intermediate' },
      { id: 'h48', english: 'I need a clean apron', spanish: 'Necesito un delantal limpio', phonetic: 'ai nid ah klin ei-pron', category: 'equipment', context: 'Requesting clean uniform', difficulty: 'beginner' },
      { id: 'h49', english: 'The blender is not working', spanish: 'La licuadora no funciona', phonetic: 'de blen-der iz not werk-ing', category: 'equipment', context: 'Equipment malfunction', difficulty: 'intermediate' },
      { id: 'h50', english: 'We need more ice', spanish: 'Necesitamos más hielo', phonetic: 'wi nid mor ais', category: 'equipment', context: 'Supply request', difficulty: 'beginner' },

      // More Tasks
      { id: 'h51', english: 'Roll the silverware', spanish: 'Enrolla los cubiertos', phonetic: 'rohl de sil-ver-wer', category: 'tasks', context: 'Side work duty', difficulty: 'beginner' },
      { id: 'h52', english: 'Polish the glasses', spanish: 'Pule los vasos', phonetic: 'pol-ish de gla-ses', category: 'tasks', context: 'Glassware preparation', difficulty: 'beginner' },
      { id: 'h53', english: 'Restock the napkins', spanish: 'Repón las servilletas', phonetic: 'ri-stok de nap-kins', category: 'tasks', context: 'Supply restocking', difficulty: 'beginner' },
      { id: 'h54', english: 'Deep clean the fryer', spanish: 'Limpia a fondo la freidora', phonetic: 'dip klin de frai-er', category: 'tasks', context: 'End-of-day cleaning', difficulty: 'intermediate' },
      { id: 'h55', english: 'Take out the trash', spanish: 'Saca la basura', phonetic: 'teik aut de trash', category: 'tasks', context: 'Waste disposal duty', difficulty: 'beginner' },
    ]
  },
  {
    id: 'retail',
    name: 'Retail',
    nameSpanish: 'Tienda',
    icon: '🛒',
    description: 'Customer service and store operations',
    descriptionSpanish: 'Servicio al cliente y operaciones de tienda',
    phrases: [
      // Greetings
      { id: 'r1', english: 'Hi, can I help you find something?', spanish: 'Hola, ¿puedo ayudarle a encontrar algo?', phonetic: 'hai, kan ai help yu faind som-thing', category: 'greetings', context: 'Approaching customers', difficulty: 'beginner' },
      { id: 'r2', english: 'Welcome to the store', spanish: 'Bienvenido a la tienda', phonetic: 'wel-kom tu de stor', category: 'greetings', context: 'Store entrance', difficulty: 'beginner' },
      { id: 'r3', english: 'Thank you for shopping with us', spanish: 'Gracias por comprar con nosotros', phonetic: 'thank yu for shop-ing with os', category: 'greetings', context: 'Checkout farewell', difficulty: 'beginner' },
      
      // Tasks
      { id: 'r4', english: 'Stock the shelves', spanish: 'Llena los estantes', phonetic: 'stok de shelvs', category: 'tasks', context: 'Inventory work', difficulty: 'beginner' },
      { id: 'r5', english: 'Price these items', spanish: 'Pon precio a estos artículos', phonetic: 'prais diz ai-tems', category: 'tasks', context: 'Tagging products', difficulty: 'beginner' },
      { id: 'r6', english: 'Clean up aisle three', spanish: 'Limpia el pasillo tres', phonetic: 'klin op ail thri', category: 'tasks', context: 'Store maintenance', difficulty: 'beginner' },
      { id: 'r7', english: 'Face the products', spanish: 'Acomoda los productos al frente', phonetic: 'feis de prod-ukts', category: 'tasks', context: 'Shelf organization', difficulty: 'intermediate' },
      { id: 'r8', english: 'Process the return', spanish: 'Procesa la devolución', phonetic: 'pro-ses de re-tern', category: 'tasks', context: 'Customer returns', difficulty: 'intermediate' },
      
      // Questions
      { id: 'r9', english: "It's in aisle four", spanish: 'Está en el pasillo cuatro', phonetic: 'its in ail for', category: 'tasks', context: 'Directing customers', difficulty: 'beginner' },
      { id: 'r10', english: "We're out of stock", spanish: 'No tenemos en existencia', phonetic: 'wir aut of stok', category: 'questions', context: 'Product availability', difficulty: 'intermediate' },
      { id: 'r11', english: 'Let me check in the back', spanish: 'Déjame revisar en el almacén', phonetic: 'let mi chek in de bak', category: 'questions', context: 'Inventory check', difficulty: 'intermediate' },
      { id: 'r12', english: 'Would you like a bag?', spanish: '¿Quiere una bolsa?', phonetic: 'wud yu laik ah bag', category: 'questions', context: 'Checkout service', difficulty: 'beginner' },
      
      // Numbers (for checkout)
      { id: 'r13', english: 'Your total is twenty dollars', spanish: 'Su total es veinte dólares', phonetic: 'yor toh-tal iz twen-ti dol-ars', category: 'numbers', context: 'Payment total', difficulty: 'beginner' },
      { id: 'r14', english: 'Cash or card?', spanish: '¿Efectivo o tarjeta?', phonetic: 'kash or kard', category: 'numbers', context: 'Payment method', difficulty: 'beginner' },
      { id: 'r15', english: "Here's your change", spanish: 'Aquí está su cambio', phonetic: 'hirs yor cheinj', category: 'numbers', context: 'Giving change', difficulty: 'beginner' },
      
      // Safety
      { id: 'r16', english: 'Spill in aisle two', spanish: 'Derrame en el pasillo dos', phonetic: 'spil in ail tu', category: 'safety', context: 'Reporting hazards', difficulty: 'intermediate' },

      // Equipment
      { id: 'r17', english: 'The register is frozen', spanish: 'La caja registradora se congeló', phonetic: 'de rej-is-ter iz froh-zen', category: 'equipment', context: 'POS system issue', difficulty: 'intermediate' },
      { id: 'r18', english: "The scanner won't work", spanish: 'El escáner no funciona', phonetic: 'de skan-er wohnt werk', category: 'equipment', context: 'Checkout equipment issue', difficulty: 'intermediate' },
      { id: 'r19', english: 'I need a price check', spanish: 'Necesito verificar un precio', phonetic: 'ai nid ah prais chek', category: 'equipment', context: 'Verifying item price', difficulty: 'beginner' },
      { id: 'r20', english: 'The card reader is down', spanish: 'El lector de tarjetas no funciona', phonetic: 'de kard ri-der iz daun', category: 'equipment', context: 'Payment system failure', difficulty: 'intermediate' },
      { id: 'r21', english: 'I need a new receipt roll', spanish: 'Necesito un rollo de recibos nuevo', phonetic: 'ai nid ah nu reh-sit rohl', category: 'equipment', context: 'Register supply', difficulty: 'intermediate' },
      { id: 'r22', english: 'The fitting room is locked', spanish: 'El probador está cerrado', phonetic: 'de fit-ing rum iz lokt', category: 'equipment', context: 'Fitting room access', difficulty: 'beginner' },
      { id: 'r23', english: 'I need keys for the display case', spanish: 'Necesito las llaves de la vitrina', phonetic: 'ai nid kis for de dis-plei keis', category: 'equipment', context: 'Accessing locked merchandise', difficulty: 'intermediate' },

      // Breaks
      { id: 'r24', english: "I'm going on my fifteen", spanish: 'Voy a tomar mis quince minutos', phonetic: 'aim goh-ing on mai fif-tin', category: 'breaks', context: 'Taking short break', difficulty: 'beginner' },
      { id: 'r25', english: 'Can someone cover the register?', spanish: '¿Alguien puede cubrir la caja?', phonetic: 'kan som-won kov-er de rej-is-ter', category: 'breaks', context: 'Requesting break coverage', difficulty: 'intermediate' },
      { id: 'r26', english: "I'll be right back from break", spanish: 'Ya regreso de mi descanso', phonetic: 'ail bi rait bak from breik', category: 'breaks', context: 'Returning from break', difficulty: 'beginner' },
      { id: 'r27', english: 'When is my lunch break?', spanish: '¿Cuándo es mi hora de almuerzo?', phonetic: 'wen iz mai lonch breik', category: 'breaks', context: 'Meal break inquiry', difficulty: 'beginner' },
      { id: 'r28', english: "I haven't taken my break yet", spanish: 'Todavía no he tomado mi descanso', phonetic: 'ai hav-ent tei-ken mai breik yet', category: 'breaks', context: 'Break reminder', difficulty: 'intermediate' },

      // More Safety
      { id: 'r29', english: 'Wet floor, be careful', spanish: 'Piso mojado, tenga cuidado', phonetic: 'wet flor, bi ker-ful', category: 'safety', context: 'Slip hazard warning', difficulty: 'beginner' },
      { id: 'r30', english: 'Customer needs medical help', spanish: 'Un cliente necesita ayuda médica', phonetic: 'kos-to-mer nids med-i-kal help', category: 'safety', context: 'Medical emergency', difficulty: 'intermediate' },
      { id: 'r31', english: 'There is broken glass in aisle five', spanish: 'Hay vidrio roto en el pasillo cinco', phonetic: 'der iz broh-ken glas in ail faiv', category: 'safety', context: 'Hazard alert', difficulty: 'intermediate' },
      { id: 'r32', english: 'I see a shoplifter', spanish: 'Veo a alguien robando', phonetic: 'ai si ah shop-lif-ter', category: 'safety', context: 'Theft alert', difficulty: 'intermediate' },
      { id: 'r33', english: 'Call security', spanish: 'Llama a seguridad', phonetic: 'kol se-kyur-i-ti', category: 'safety', context: 'Security request', difficulty: 'beginner' },
      { id: 'r34', english: 'The fire exit is blocked', spanish: 'La salida de emergencia está bloqueada', phonetic: 'de fair ek-sit iz blokt', category: 'safety', context: 'Fire safety issue', difficulty: 'intermediate' },

      // Scheduling / HR
      { id: 'r35', english: 'When does my shift end?', spanish: '¿A qué hora termina mi turno?', phonetic: 'wen doz mai shift end', category: 'questions', context: 'Shift end inquiry', difficulty: 'beginner' },
      { id: 'r36', english: 'I need to call in sick', spanish: 'Necesito reportarme enfermo', phonetic: 'ai nid tu kol in sik', category: 'questions', context: 'Sick day notification', difficulty: 'intermediate' },
      { id: 'r37', english: 'Can I leave early today?', spanish: '¿Puedo salir temprano hoy?', phonetic: 'kan ai liv er-li tuh-dei', category: 'questions', context: 'Early departure request', difficulty: 'intermediate' },
      { id: 'r38', english: 'Who is the manager on duty?', spanish: '¿Quién es el gerente de turno?', phonetic: 'hu iz de man-ah-jer on du-ti', category: 'questions', context: 'Finding shift manager', difficulty: 'intermediate' },
      { id: 'r39', english: 'I need to switch shifts', spanish: 'Necesito cambiar de turno', phonetic: 'ai nid tu switch shifts', category: 'questions', context: 'Schedule swap request', difficulty: 'intermediate' },
      { id: 'r40', english: 'Where do I clock in?', spanish: '¿Dónde marco mi entrada?', phonetic: 'wer du ai klok in', category: 'questions', context: 'Finding time clock', difficulty: 'beginner' },

      // More Questions
      { id: 'r41', english: 'Do we have this in a different size?', spanish: '¿Tenemos esto en otra talla?', phonetic: 'du wi hav dis in ah dif-rent saiz', category: 'questions', context: 'Checking alternate sizes', difficulty: 'intermediate' },
      { id: 'r42', english: 'Where is the sale section?', spanish: '¿Dónde está la sección de ofertas?', phonetic: 'wer iz de seil sek-shun', category: 'questions', context: 'Directing to sales area', difficulty: 'beginner' },
      { id: 'r43', english: 'Is this item on sale?', spanish: '¿Este artículo está en oferta?', phonetic: 'iz dis ai-tem on seil', category: 'questions', context: 'Price inquiry', difficulty: 'beginner' },
      { id: 'r44', english: 'Can I put this on hold for you?', spanish: '¿Se lo aparto?', phonetic: 'kan ai put dis on hohld for yu', category: 'questions', context: 'Holding merchandise', difficulty: 'intermediate' },
      { id: 'r45', english: 'Would you like to sign up for our rewards?', spanish: '¿Desea inscribirse en nuestro programa de recompensas?', phonetic: 'wud yu laik tu sain op for aur ree-words', category: 'questions', context: 'Loyalty program pitch', difficulty: 'advanced' },

      // More Greetings
      { id: 'r46', english: 'Good morning, welcome in!', spanish: '¡Buenos días, bienvenido!', phonetic: 'gud morn-ing, wel-kom in', category: 'greetings', context: 'Morning store greeting', difficulty: 'beginner' },
      { id: 'r47', english: 'Have a great day!', spanish: '¡Que tenga un excelente día!', phonetic: 'hav ah greit dei', category: 'greetings', context: 'Customer farewell', difficulty: 'beginner' },
      { id: 'r48', english: 'We open at nine', spanish: 'Abrimos a las nueve', phonetic: 'wi oh-pen at nain', category: 'greetings', context: 'Store hours info', difficulty: 'beginner' },

      // More Tasks
      { id: 'r49', english: 'Fold the clothes on the table', spanish: 'Dobla la ropa de la mesa', phonetic: 'fohld de klohs on de tei-bul', category: 'tasks', context: 'Display maintenance', difficulty: 'beginner' },
      { id: 'r50', english: 'Put up the sale signs', spanish: 'Pon los letreros de oferta', phonetic: 'put op de seil sains', category: 'tasks', context: 'Promotional setup', difficulty: 'beginner' },
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    nameSpanish: 'Limpieza',
    icon: '🧹',
    description: 'Facilities and custodial work vocabulary',
    descriptionSpanish: 'Vocabulario para mantenimiento e instalaciones',
    phrases: [
      // Safety
      { id: 'c1', english: 'Caution, wet floor', spanish: 'Precaución, piso mojado', phonetic: 'kaw-shun, wet flor', category: 'safety', context: 'Warning sign language', difficulty: 'beginner' },
      { id: 'c2', english: "Don't mix the chemicals", spanish: 'No mezcles los químicos', phonetic: 'dohnt miks de kem-i-kals', category: 'safety', context: 'Chemical safety', difficulty: 'intermediate' },
      { id: 'c3', english: 'Wear gloves', spanish: 'Usa guantes', phonetic: 'wer glovs', category: 'safety', context: 'Protection reminder', difficulty: 'beginner' },
      
      // Tasks
      { id: 'c4', english: 'Mop the floor', spanish: 'Trapea el piso', phonetic: 'mop de flor', category: 'tasks', context: 'Floor cleaning', difficulty: 'beginner' },
      { id: 'c5', english: 'Empty the trash', spanish: 'Vacía la basura', phonetic: 'emp-ti de trash', category: 'tasks', context: 'Waste disposal', difficulty: 'beginner' },
      { id: 'c6', english: 'Clean the bathrooms', spanish: 'Limpia los baños', phonetic: 'klin de bath-rooms', category: 'tasks', context: 'Restroom duty', difficulty: 'beginner' },
      { id: 'c7', english: 'Wipe down the surfaces', spanish: 'Limpia las superficies', phonetic: 'waip daun de ser-fa-ses', category: 'tasks', context: 'Surface cleaning', difficulty: 'beginner' },
      { id: 'c8', english: 'Vacuum the carpet', spanish: 'Aspira la alfombra', phonetic: 'vak-yum de kar-pet', category: 'tasks', context: 'Floor care', difficulty: 'beginner' },
      { id: 'c9', english: 'Restock the paper towels', spanish: 'Repón las toallas de papel', phonetic: 're-stok de pei-per tau-els', category: 'tasks', context: 'Supply restocking', difficulty: 'intermediate' },
      { id: 'c10', english: 'Dust the furniture', spanish: 'Quita el polvo a los muebles', phonetic: 'dost de fer-ni-cher', category: 'tasks', context: 'Dusting', difficulty: 'beginner' },
      
      // Equipment
      { id: 'c11', english: 'Where is the supply closet?', spanish: '¿Dónde está el armario de suministros?', phonetic: 'wer iz de suh-plai klo-zet', category: 'equipment', context: 'Finding supplies', difficulty: 'intermediate' },
      { id: 'c12', english: 'I need more cleaning solution', spanish: 'Necesito más solución limpiadora', phonetic: 'ai nid mor klin-ing soh-lu-shun', category: 'equipment', context: 'Requesting supplies', difficulty: 'intermediate' },
      { id: 'c13', english: 'The vacuum is not working', spanish: 'La aspiradora no funciona', phonetic: 'de vak-yum iz not werk-ing', category: 'equipment', context: 'Equipment issues', difficulty: 'intermediate' },
      
      // Questions
      { id: 'c14', english: 'Which area should I clean first?', spanish: '¿Qué área debo limpiar primero?', phonetic: 'wich eh-ree-ah shud ai klin ferst', category: 'questions', context: 'Task prioritization', difficulty: 'intermediate' },
      { id: 'c15', english: "I'm finished with this floor", spanish: 'Terminé con este piso', phonetic: 'aim fin-isht with dis flor', category: 'questions', context: 'Progress update', difficulty: 'beginner' },

      // Greetings
      { id: 'c16', english: 'Good morning', spanish: 'Buenos días', phonetic: 'gud morn-ing', category: 'greetings', context: 'Start-of-shift greeting', difficulty: 'beginner' },
      { id: 'c17', english: 'Have a nice day', spanish: 'Que tenga un buen día', phonetic: 'hav ah nais dei', category: 'greetings', context: 'Farewell to building occupants', difficulty: 'beginner' },
      { id: 'c18', english: 'Excuse me, I need to clean here', spanish: 'Disculpe, necesito limpiar aquí', phonetic: 'eks-kyuz mi, ai nid tu klin hir', category: 'greetings', context: 'Politely entering occupied space', difficulty: 'beginner' },
      { id: 'c19', english: 'Hello, housekeeping', spanish: 'Hola, servicio de limpieza', phonetic: 'heh-loh, haus-kip-ing', category: 'greetings', context: 'Announcing entry to a room', difficulty: 'beginner' },
      { id: 'c20', english: 'Sorry for the interruption', spanish: 'Disculpe la interrupción', phonetic: 'sor-i for de in-teh-rop-shun', category: 'greetings', context: 'Entering occupied office', difficulty: 'beginner' },

      // Breaks
      { id: 'c21', english: 'Where is the break room?', spanish: '¿Dónde está el cuarto de descanso?', phonetic: 'wer iz de breik rum', category: 'breaks', context: 'Finding rest area', difficulty: 'beginner' },
      { id: 'c22', english: "I'm going on my break", spanish: 'Voy a tomar mi descanso', phonetic: 'aim goh-ing on mai breik', category: 'breaks', context: 'Informing supervisor', difficulty: 'beginner' },
      { id: 'c23', english: 'When is lunch?', spanish: '¿Cuándo es el almuerzo?', phonetic: 'wen iz lonch', category: 'breaks', context: 'Meal break inquiry', difficulty: 'beginner' },
      { id: 'c24', english: "I'll finish this room after break", spanish: 'Terminaré este cuarto después del descanso', phonetic: 'ail fin-ish dis rum af-ter breik', category: 'breaks', context: 'Setting expectations', difficulty: 'intermediate' },
      { id: 'c25', english: 'I need a water break', spanish: 'Necesito un descanso para tomar agua', phonetic: 'ai nid ah wah-ter breik', category: 'breaks', context: 'Hydration request', difficulty: 'beginner' },

      // Numbers
      { id: 'c26', english: 'Floor two is done', spanish: 'El piso dos está listo', phonetic: 'flor tu iz don', category: 'numbers', context: 'Progress report by floor', difficulty: 'beginner' },
      { id: 'c27', english: 'Room three-oh-five', spanish: 'Habitación trescientos cinco', phonetic: 'rum thri-oh-faiv', category: 'numbers', context: 'Room number reference', difficulty: 'beginner' },
      { id: 'c28', english: 'I have ten rooms left', spanish: 'Me faltan diez habitaciones', phonetic: 'ai hav ten rums left', category: 'numbers', context: 'Workload update', difficulty: 'intermediate' },
      { id: 'c29', english: 'Building B, third floor', spanish: 'Edificio B, tercer piso', phonetic: 'bil-ding bi, therd flor', category: 'numbers', context: 'Location reference', difficulty: 'intermediate' },
      { id: 'c30', english: 'Bathroom on the second floor', spanish: 'Baño en el segundo piso', phonetic: 'bath-rum on de sek-ond flor', category: 'numbers', context: 'Directing to restroom', difficulty: 'beginner' },
      { id: 'c31', english: 'Zone four is my assignment', spanish: 'La zona cuatro es mi asignación', phonetic: 'zohn for iz mai ah-sain-ment', category: 'numbers', context: 'Zone assignment', difficulty: 'intermediate' },

      // More Safety
      { id: 'c32', english: 'Do not enter, floor is wet', spanish: 'No entre, el piso está mojado', phonetic: 'du not en-ter, flor iz wet', category: 'safety', context: 'Blocking entry to wet area', difficulty: 'beginner' },
      { id: 'c33', english: 'Open the window for ventilation', spanish: 'Abre la ventana para ventilación', phonetic: 'oh-pen de win-doh for ven-ti-lei-shun', category: 'safety', context: 'Chemical fume safety', difficulty: 'intermediate' },
      { id: 'c34', english: 'Never mix bleach with ammonia', spanish: 'Nunca mezcles cloro con amoníaco', phonetic: 'nev-er miks blich with ah-moh-nyah', category: 'safety', context: 'Chemical mixing danger', difficulty: 'intermediate' },
      { id: 'c35', english: 'Read the chemical label first', spanish: 'Lee la etiqueta del químico primero', phonetic: 'rid de kem-i-kal lei-bul ferst', category: 'safety', context: 'Safe chemical handling', difficulty: 'intermediate' },
      { id: 'c36', english: 'I slipped on the wet floor', spanish: 'Me resbalé en el piso mojado', phonetic: 'ai slipt on de wet flor', category: 'safety', context: 'Reporting a slip incident', difficulty: 'beginner' },
      { id: 'c37', english: 'Put up the wet floor sign', spanish: 'Pon el letrero de piso mojado', phonetic: 'put op de wet flor sain', category: 'safety', context: 'Hazard marking', difficulty: 'beginner' },
      { id: 'c38', english: 'This product irritates the skin', spanish: 'Este producto irrita la piel', phonetic: 'dis prod-ukt ir-i-teits de skin', category: 'safety', context: 'Chemical safety warning', difficulty: 'intermediate' },

      // HR / Questions
      { id: 'c39', english: 'I need more supplies', spanish: 'Necesito más suministros', phonetic: 'ai nid mor suh-plais', category: 'questions', context: 'Requesting materials', difficulty: 'beginner' },
      { id: 'c40', english: 'This room is occupied', spanish: 'Esta habitación está ocupada', phonetic: 'dis rum iz ok-yu-paid', category: 'questions', context: 'Room status update', difficulty: 'beginner' },
      { id: 'c41', english: 'Do not disturb sign is up', spanish: 'El letrero de no molestar está puesto', phonetic: 'du not dis-terb sain iz op', category: 'questions', context: 'Room entry restriction', difficulty: 'intermediate' },
      { id: 'c42', english: 'I need a replacement mop head', spanish: 'Necesito un repuesto para el trapeador', phonetic: 'ai nid ah ree-pleis-ment mop hed', category: 'equipment', context: 'Equipment replacement', difficulty: 'intermediate' },
      { id: 'c43', english: 'The trash bags ran out', spanish: 'Se acabaron las bolsas de basura', phonetic: 'de trash bags ran aut', category: 'equipment', context: 'Supply shortage', difficulty: 'beginner' },
      { id: 'c44', english: 'Where do I get more soap?', spanish: '¿Dónde consigo más jabón?', phonetic: 'wer du ai get mor sohp', category: 'questions', context: 'Finding supplies', difficulty: 'beginner' },
      { id: 'c45', english: 'I finished my area early', spanish: 'Terminé mi área temprano', phonetic: 'ai fin-isht mai eh-ree-ah er-li', category: 'questions', context: 'Reporting early completion', difficulty: 'beginner' },

      // More Equipment
      { id: 'c46', english: 'The mop bucket has a hole', spanish: 'La cubeta del trapeador tiene un hoyo', phonetic: 'de mop bok-et haz ah hohl', category: 'equipment', context: 'Damaged equipment report', difficulty: 'intermediate' },
      { id: 'c47', english: 'I need new sponges', spanish: 'Necesito esponjas nuevas', phonetic: 'ai nid nu spon-jes', category: 'equipment', context: 'Supply request', difficulty: 'beginner' },
      { id: 'c48', english: 'The floor buffer is jammed', spanish: 'La pulidora de pisos se atascó', phonetic: 'de flor buf-er iz jamd', category: 'equipment', context: 'Machine malfunction', difficulty: 'intermediate' },

      // More Tasks
      { id: 'c49', english: 'Disinfect the door handles', spanish: 'Desinfecta las manijas de las puertas', phonetic: 'dis-in-fekt de dor han-duls', category: 'tasks', context: 'Sanitizing high-touch surfaces', difficulty: 'intermediate' },
      { id: 'c50', english: 'Polish the elevator doors', spanish: 'Pule las puertas del elevador', phonetic: 'pol-ish de el-eh-vei-tor dors', category: 'tasks', context: 'Metal surface cleaning', difficulty: 'intermediate' },
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial',
    nameSpanish: 'Industrial',
    icon: '🏭',
    description: 'Factory and manufacturing terminology',
    descriptionSpanish: 'Terminología de fábrica y manufactura',
    phrases: [
      // Safety - Critical
      { id: 'i1', english: 'Emergency stop!', spanish: '¡Parada de emergencia!', phonetic: 'ee-mer-jen-si stop', category: 'safety', context: 'Critical safety action', difficulty: 'beginner' },
      { id: 'i2', english: 'Lockout the machine', spanish: 'Bloquea la máquina', phonetic: 'lok-aut de mah-sheen', category: 'safety', context: 'Safety procedure', difficulty: 'intermediate' },
      { id: 'i3', english: 'Wear safety glasses', spanish: 'Usa lentes de seguridad', phonetic: 'wer sef-ti gla-ses', category: 'safety', context: 'Eye protection', difficulty: 'beginner' },
      { id: 'i4', english: 'Wear ear protection', spanish: 'Usa protección para los oídos', phonetic: 'wer ir proh-tek-shun', category: 'safety', context: 'Hearing protection', difficulty: 'beginner' },
      { id: 'i5', english: 'Report the accident', spanish: 'Reporta el accidente', phonetic: 'ree-port de ak-si-dent', category: 'safety', context: 'Incident reporting', difficulty: 'intermediate' },
      { id: 'i6', english: 'Keep hands away from machine', spanish: 'Mantén las manos lejos de la máquina', phonetic: 'kip hands ah-wei from mah-sheen', category: 'safety', context: 'Machine safety', difficulty: 'intermediate' },
      
      // Tasks
      { id: 'i7', english: 'Start the production line', spanish: 'Inicia la línea de producción', phonetic: 'start de proh-dok-shun lain', category: 'tasks', context: 'Beginning work', difficulty: 'intermediate' },
      { id: 'i8', english: 'Check the quality', spanish: 'Revisa la calidad', phonetic: 'chek de kwol-i-ti', category: 'tasks', context: 'Quality control', difficulty: 'beginner' },
      { id: 'i9', english: 'This part is defective', spanish: 'Esta pieza está defectuosa', phonetic: 'dis part iz dee-fek-tiv', category: 'tasks', context: 'Quality issue', difficulty: 'intermediate' },
      { id: 'i10', english: 'Assemble the components', spanish: 'Ensambla los componentes', phonetic: 'ah-sem-bul de kom-poh-nents', category: 'tasks', context: 'Assembly work', difficulty: 'intermediate' },
      { id: 'i11', english: 'Package the product', spanish: 'Empaca el producto', phonetic: 'pak-ij de prod-ukt', category: 'tasks', context: 'Packaging duty', difficulty: 'beginner' },
      { id: 'i12', english: 'Label the box', spanish: 'Etiqueta la caja', phonetic: 'lei-bul de boks', category: 'tasks', context: 'Labeling task', difficulty: 'beginner' },
      
      // Equipment
      { id: 'i13', english: 'The machine needs maintenance', spanish: 'La máquina necesita mantenimiento', phonetic: 'de mah-sheen nids mein-ten-ans', category: 'equipment', context: 'Maintenance request', difficulty: 'advanced' },
      { id: 'i14', english: 'Replace the parts', spanish: 'Reemplaza las piezas', phonetic: 'ree-pleis de parts', category: 'equipment', context: 'Repair instruction', difficulty: 'intermediate' },
      { id: 'i15', english: 'Calibrate the equipment', spanish: 'Calibra el equipo', phonetic: 'kal-i-breit de ee-kwip-ment', category: 'equipment', context: 'Equipment setup', difficulty: 'advanced' },
      
      // Questions
      { id: 'i16', english: 'What is the production target?', spanish: '¿Cuál es la meta de producción?', phonetic: 'wat iz de proh-dok-shun tar-get', category: 'questions', context: 'Goal inquiry', difficulty: 'intermediate' },
      { id: 'i17', english: 'How do I operate this machine?', spanish: '¿Cómo opero esta máquina?', phonetic: 'hau du ai op-er-eit dis mah-sheen', category: 'questions', context: 'Training question', difficulty: 'intermediate' },

      // Greetings
      { id: 'i18', english: 'Good morning', spanish: 'Buenos días', phonetic: 'gud morn-ing', category: 'greetings', context: 'Start-of-shift greeting', difficulty: 'beginner' },
      { id: 'i19', english: 'Who is the supervisor today?', spanish: '¿Quién es el supervisor hoy?', phonetic: 'hu iz de su-per-vai-zor tuh-dei', category: 'greetings', context: 'Identifying shift lead', difficulty: 'beginner' },
      { id: 'i20', english: 'Nice to meet you', spanish: 'Mucho gusto', phonetic: 'nais tu mit yu', category: 'greetings', context: 'Meeting a new coworker', difficulty: 'beginner' },
      { id: 'i21', english: 'See you tomorrow', spanish: 'Nos vemos mañana', phonetic: 'si yu tuh-mah-roh', category: 'greetings', context: 'End-of-shift farewell', difficulty: 'beginner' },
      { id: 'i22', english: 'Have a good shift', spanish: 'Que tengas un buen turno', phonetic: 'hav ah gud shift', category: 'greetings', context: 'Shift greeting', difficulty: 'beginner' },
      { id: 'i23', english: 'My name is...', spanish: 'Mi nombre es...', phonetic: 'mai neim iz', category: 'greetings', context: 'Introducing yourself', difficulty: 'beginner' },

      // Breaks
      { id: 'i24', english: 'Break in ten minutes', spanish: 'Descanso en diez minutos', phonetic: 'breik in ten min-its', category: 'breaks', context: 'Announcing upcoming break', difficulty: 'beginner' },
      { id: 'i25', english: 'Where do I clock out?', spanish: '¿Dónde marco mi salida?', phonetic: 'wer du ai klok aut', category: 'breaks', context: 'Finding time clock', difficulty: 'beginner' },
      { id: 'i26', english: "I'm going on break", spanish: 'Voy a tomar mi descanso', phonetic: 'aim goh-ing on breik', category: 'breaks', context: 'Informing supervisor', difficulty: 'beginner' },
      { id: 'i27', english: 'When is lunch?', spanish: '¿Cuándo es el almuerzo?', phonetic: 'wen iz lonch', category: 'breaks', context: 'Meal break inquiry', difficulty: 'beginner' },
      { id: 'i28', english: 'I need water', spanish: 'Necesito agua', phonetic: 'ai nid wah-ter', category: 'breaks', context: 'Hydration request', difficulty: 'beginner' },
      { id: 'i29', english: 'Can I take a quick break?', spanish: '¿Puedo tomar un descanso rápido?', phonetic: 'kan ai teik ah kwik breik', category: 'breaks', context: 'Requesting short break', difficulty: 'beginner' },

      // Numbers
      { id: 'i30', english: 'Set to three hundred fifty degrees', spanish: 'Ponlo a trescientos cincuenta grados', phonetic: 'set tu thri hon-dred fif-ti dee-griz', category: 'numbers', context: 'Temperature setting', difficulty: 'intermediate' },
      { id: 'i31', english: 'Run speed is forty', spanish: 'La velocidad es cuarenta', phonetic: 'ron spid iz for-ti', category: 'numbers', context: 'Machine speed reference', difficulty: 'intermediate' },
      { id: 'i32', english: 'Line number three', spanish: 'Línea número tres', phonetic: 'lain nom-ber thri', category: 'numbers', context: 'Production line reference', difficulty: 'beginner' },
      { id: 'i33', english: 'We made five hundred units today', spanish: 'Hicimos quinientas unidades hoy', phonetic: 'wi meid faiv hon-dred yu-nits tuh-dei', category: 'numbers', context: 'Production count', difficulty: 'intermediate' },
      { id: 'i34', english: 'Batch number twelve', spanish: 'Lote número doce', phonetic: 'bach nom-ber twelv', category: 'numbers', context: 'Batch identification', difficulty: 'beginner' },
      { id: 'i35', english: 'Station number seven', spanish: 'Estación número siete', phonetic: 'stei-shun nom-ber sev-en', category: 'numbers', context: 'Workstation reference', difficulty: 'beginner' },
      { id: 'i36', english: 'The count says two hundred', spanish: 'El conteo dice doscientos', phonetic: 'de kaunt sez tu hon-dred', category: 'numbers', context: 'Inventory count reading', difficulty: 'intermediate' },

      // More Equipment
      { id: 'i37', english: 'The machine is jammed', spanish: 'La máquina se atascó', phonetic: 'de mah-sheen iz jamd', category: 'equipment', context: 'Reporting a jam', difficulty: 'beginner' },
      { id: 'i38', english: 'I need a replacement part', spanish: 'Necesito una pieza de repuesto', phonetic: 'ai nid ah ree-pleis-ment part', category: 'equipment', context: 'Requesting spare part', difficulty: 'intermediate' },
      { id: 'i39', english: 'The belt is loose', spanish: 'La banda está floja', phonetic: 'de belt iz lus', category: 'equipment', context: 'Reporting wear issue', difficulty: 'intermediate' },
      { id: 'i40', english: 'The sensor is not reading', spanish: 'El sensor no está leyendo', phonetic: 'de sen-sor iz not rid-ing', category: 'equipment', context: 'Sensor malfunction', difficulty: 'intermediate' },
      { id: 'i41', english: 'Oil the machine', spanish: 'Lubrica la máquina', phonetic: 'oil de mah-sheen', category: 'equipment', context: 'Lubrication task', difficulty: 'beginner' },
      { id: 'i42', english: 'The motor is overheating', spanish: 'El motor se está sobrecalentando', phonetic: 'de moh-tor iz oh-ver-hit-ing', category: 'equipment', context: 'Temperature warning', difficulty: 'intermediate' },
      { id: 'i43', english: 'I need a wrench', spanish: 'Necesito una llave', phonetic: 'ai nid ah rench', category: 'equipment', context: 'Requesting a tool', difficulty: 'beginner' },

      // More Safety
      { id: 'i44', english: 'Do not remove the safety guard', spanish: 'No quites la guarda de seguridad', phonetic: 'du not ree-muv de sef-ti gard', category: 'safety', context: 'Machine guard warning', difficulty: 'intermediate' },
      { id: 'i45', english: 'I need safety training', spanish: 'Necesito capacitación de seguridad', phonetic: 'ai nid sef-ti trein-ing', category: 'safety', context: 'Requesting training', difficulty: 'intermediate' },
      { id: 'i46', english: 'I need to report an injury', spanish: 'Necesito reportar una lesión', phonetic: 'ai nid tu ree-port an in-jur-i', category: 'safety', context: 'Injury reporting', difficulty: 'intermediate' },

      // HR / Scheduling
      { id: 'i47', english: 'When is my next shift?', spanish: '¿Cuándo es mi próximo turno?', phonetic: 'wen iz mai nekst shift', category: 'questions', context: 'Schedule inquiry', difficulty: 'beginner' },
      { id: 'i48', english: 'Can I swap shifts?', spanish: '¿Puedo cambiar de turno?', phonetic: 'kan ai swap shifts', category: 'questions', context: 'Schedule change request', difficulty: 'intermediate' },
      { id: 'i49', english: "I don't understand the instructions", spanish: 'No entiendo las instrucciones', phonetic: 'ai dohnt on-der-stand de in-strok-shuns', category: 'questions', context: 'Asking for clarification', difficulty: 'beginner' },
      { id: 'i50', english: 'Who do I talk to about overtime?', spanish: '¿Con quién hablo sobre las horas extra?', phonetic: 'hu du ai tok tu ah-baut oh-ver-taim', category: 'questions', context: 'Overtime inquiry', difficulty: 'intermediate' },
    ]
  }
];

export const categoryInfo: Record<JobPhrase['category'], { name: string; nameSpanish: string; icon: string; color: string }> = {
  safety: { name: 'Safety', nameSpanish: 'Seguridad', icon: '🔴', color: 'text-red-600 bg-red-50 border-red-200' },
  tasks: { name: 'Tasks', nameSpanish: 'Tareas', icon: '📋', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  questions: { name: 'Questions', nameSpanish: 'Preguntas', icon: '❓', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  breaks: { name: 'Breaks', nameSpanish: 'Descansos', icon: '☕', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  equipment: { name: 'Equipment', nameSpanish: 'Equipo', icon: '🔧', color: 'text-slate-600 bg-slate-50 border-slate-200' },
  greetings: { name: 'Greetings', nameSpanish: 'Saludos', icon: '👋', color: 'text-green-600 bg-green-50 border-green-200' },
  numbers: { name: 'Numbers', nameSpanish: 'Números', icon: '🔢', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
};

export const getAllPhrases = (): JobPhrase[] => {
  return industries.flatMap(industry => industry.phrases);
};

export const getPhrasesByIndustry = (industryId: string): JobPhrase[] => {
  const industry = industries.find(i => i.id === industryId);
  return industry?.phrases || [];
};

export const getPhrasesByCategory = (industryId: string, category: JobPhrase['category']): JobPhrase[] => {
  return getPhrasesByIndustry(industryId).filter(p => p.category === category);
};
