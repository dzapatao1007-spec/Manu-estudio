import {
  HeroContent,
  ManifestoContent,
  StudioInfo,
  ServiceItem,
  BeforeAfterItem,
  LookbookItem,
  FAQItem,
  ReviewItem
} from '../types';

export const DEFAULT_HERO: HeroContent = {
  pillTag: 'Estudio Boutique de Alta Costura',
  titleLine1: 'La arquitectura de tu mirada,',
  titleHighlight: 'en su versión más chic y de ensueño',
  subtitle: 'En Manu Studio somos un estudio boutique especializado en el visagismo anatómico, diseño de cejas de autor y extensiones de pestañas de lujo. Diseñamos miradas impecables, sofisticadas y con ese toque de princesa chic que te hace brillar.',
  heroImage: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
  floatingBadgeTitle: 'Manu Studio Haute Couture',
  floatingBadgeSub: 'Atención 1:1 Personalizada',
  metric1Val: '+1,500',
  metric1Lbl: 'Miradas Transformadas',
  metric2Val: '100%',
  metric2Lbl: 'Insumos Certificados',
  metric3Val: '5.0 ★',
  metric3Lbl: 'Satisfacción Total'
};

export const DEFAULT_MANIFESTO: ManifestoContent = {
  pillTag: 'Filosofía Manu Studio',
  title: 'El arte de esculpir tu belleza con precisión y realeza',
  body: 'Creemos que cada mujer merece una experiencia única, donde el cuidado minucioso, la calidez y el lujo se fusionan para revelar la mejor versión de su mirada.',
  pilar1Title: 'Visagismo de Autor',
  pilar1Desc: 'Estudio morfológico personalizado para diseñar la curva y densidad perfecta según tu estructura facial.',
  pilar2Title: 'Bioseguridad & Asepsia',
  pilar2Desc: 'Protocolos de grado clínico con instrumental estéril y adhesivos hipoalergénicos de máxima pureza.',
  pilar3Title: 'Experiencia Princess & Chic',
  pilar3Desc: 'Ambiente privado, confortable y relajante para desconectarte mientras cuidamos cada detalle de tu mirada.'
};

export const DEFAULT_STUDIO_INFO: StudioInfo = {
  name: 'MANU STUDIO',
  slogan: 'El arte de realzar tu mirada natural con elegancia, confort y exclusividad',
  tagline: 'Lash & Brow Haute Couture | Cejas & Pestañas de Lujo',
  logo: '/src/assets/images/manu_studio_official_logo_1787618363052.jpg',
  whatsappNumber: '573136743859',
  whatsappDisplay: '313 674 3859',
  instagram: '@manustudio.lashes',
  instagramUrl: 'https://instagram.com/manustudio.lashes',
  address: 'Calle de las Rosas 14-22, Suite 302, Studio Boutique',
  city: 'Medellín / Ciudad Boutique',
  schedule: 'Lunes a Sábado: 8:00 AM – 7:00 PM (Citas programadas)',
  email: 'contacto@manustudio.com',
  promoActive: true,
  promoText: '✨ PROMOCIÓN VIP: 15% OFF en Dúo Lifting + Laminado agendando esta semana ✨',
  promoBadge: 'Descuento Exclusivo',
  promoCode: 'MANUGLOW'
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  // --- CEJAS (CEJAS PERFECTAS) ---
  {
    id: 'diseno-de-ceja',
    name: 'Diseño de Ceja & Epilación con Henna Guide',
    category: 'brows',
    shortDescription: 'Medidas morfológicas de precisión para armonizar tu rostro, epilación con cera, corrección iluminadora y toque de henna para tu maquillaje diario.',
    fullDescription: 'Realizamos un estudio y mapeo milimétrico de tus facciones para diseñar la forma ideal que equilibra tu rostro. Continuamos con una epilación delicada y limpia con cera especial de baja temperatura. Finalizamos corrigiendo con corrector profesional para un look ultra nítido y aplicamos un toque de henna que crea el molde perfecto para que aprendas a maquillar tus cejas en casa.',
    duration: '45m',
    price: 160,
    popular: true,
    tag: 'Básico Imprescindible',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    included: [
      'Estudio de visagismo y medidas para armonizar el rostro',
      'Epilación de máxima precisión con cera suave',
      'Corrección con corrector especial para un aspecto limpio e iluminado',
      'Toque de henna guía como molde para tu maquillaje diario'
    ],
    idealFor: 'Quienes desean definir, armonizar y aprender a lucir sus cejas siempre limpias y en armonía con su rostro.',
    retouchTime: 'Cada 15 a 20 días'
  },
  {
    id: 'laminado-de-cejas',
    name: 'Laminado de Cejas (Brow Lamination con Keratina)',
    category: 'brows',
    shortDescription: 'Direccionamiento y fijación del vello a base de keratina para lograr una ceja visualmente más gruesa, peinada y tupida con epilación con cera.',
    fullDescription: 'Técnica vanguardista donde alineamos y disciplinamos el vello rebelde mediante una infusión reconstructora de keratina. Simula una ceja visiblemente más abundante, esponjosa y elegante (efecto soap brows). Incluye epilación con cera y diseño para un acabado impecable que dura hasta 30 días.',
    duration: '1h 00m',
    price: 250,
    popular: true,
    tag: 'Tendencia Top',
    image: '/src/assets/images/brow_lamination_1787346140737.jpg',
    included: [
      'Direccionamiento y alineación capilar con keratina',
      'Efecto ceja más gruesa, peinada y tupida',
      'Epilación con cera y perfilado milimétrico',
      'Nutrición y sellado para una duración de hasta 30 días'
    ],
    idealFor: 'Cejas con vellos rebeldes, delgadas, rizadas o con zonas que necesitan mayor sensación de grosor y orden.',
    retouchTime: 'Dura hasta 30 días'
  },
  {
    id: 'henna-brows-gold',
    name: 'Henna Brows Gold (Laminado + Epilación + Sombreado Henna)',
    category: 'brows',
    shortDescription: 'La experiencia de cejas más completa: visagismo y medidas, laminado con keratina, epilación con cera y sombreado con henna premium para una definición de impacto.',
    fullDescription: 'El tratamiento integral de lujo para tus cejas. Iniciamos con mediciones morfológicas para dar la forma perfecta a tu estructura facial, aplicamos el laminado para disciplinar y aportar volumen, realizamos la epilación con cera de alta tolerancia y finalizamos con corrección iluminadora y sombreado con henna gold de alta pigmentación vegetal.',
    duration: '1h 15m',
    price: 350,
    popular: true,
    tag: 'Experiencia Gold VIP',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    included: [
      'Medidas y visagismo para esculpir la forma adecuada',
      'Laminado con keratina para máxima textura y peinado',
      'Epilación limpia con cera tibia',
      'Sombreado degradé con Henna Gold y corrector iluminador'
    ],
    idealFor: 'Quienes buscan la máxima definición, volumen y color sin necesidad de maquillarse durante semanas.',
    retouchTime: 'Cada 20 a 25 días'
  },

  // --- PESTAÑAS (MIRADA DE ENSUEÑO) ---
  {
    id: 'pestanas-clasicas',
    name: 'Pestañas Pelo a Pelo Clásicas (Efecto Natural & Rímel)',
    category: 'lashes',
    shortDescription: 'Aplicación 1 a 1 de extensiones de seda ultra ligeras para una mirada iluminada, sutil y naturalmente sofisticada.',
    fullDescription: 'Técnica de aislamiento meticuloso donde colocamos una extensión de fibra de seda sobre cada una de tus pestañas naturales saludables. Brinda un efecto máscara de pestañas impecable, ligero y cómodo para tu día a día.',
    duration: '1h 45m',
    price: 160,
    popular: true,
    tag: 'Efecto Natural',
    image: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    included: [
      'Visagismo y diseño de mirada según anatomía ocular',
      'Limpieza profunda y desintoxicación de párpados',
      'Extensiones hipoalergénicas de seda ultra ligera',
      'Sellador protector y cepillo luxury de regalo'
    ],
    idealFor: 'Quienes desean despertar todos los días sintiéndose lindas y arregladas con absoluta naturalidad.',
    retouchTime: 'Cada 15 a 21 días'
  },
  {
    id: 'pestanas-hibridas-volumen',
    name: 'Pestañas Híbridas & Volumen Ruso (Efecto Wispy & Glam)',
    category: 'lashes',
    shortDescription: 'Fusión de abanicos artesanales ultrafinos y fibras individuales para lograr mayor densidad, textura vaporosa y glamour irresistible.',
    fullDescription: 'Combinación artesanal de abanicos hechos a mano al momento con fibras individuales. Otorga una textura suave y aireada que resalta los ojos con profundidad sin maltratar tus pestañas naturales.',
    duration: '2h 00m',
    price: 350,
    popular: true,
    tag: 'Más Solicitado',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
    included: [
      'Mapeo de estilo personalizado (Cat Eye, Open Eye o Wispy)',
      'Abanicos multidimensionales ultrafinos hechos a mano',
      'Brumización con nano mister para máxima durabilidad',
      'Kit de cepillado y recomendaciones de cuidado'
    ],
    idealFor: 'Miradas que buscan volumen, textura y un look glamuroso pero liviano y cómodo.',
    retouchTime: 'Cada 18 a 22 días'
  },
  {
    id: 'lifting-pestanas-botox',
    name: 'Lash Lifting + Keratin Botox & Tinte Azabache',
    category: 'lashes',
    shortDescription: 'Curvatura, elevación desde la raíz y nutrición profunda para tus propias pestañas con efecto rímel permanente.',
    fullDescription: 'Tratamiento que eleva y curva tus pestañas naturales mediante almohadillas ergonómicas. Incluye baño reconstructor de keratina y tinte negro intenso que engrosa la pestaña hasta un 24% y dura hasta 2 meses.',
    duration: '1h 15m',
    price: 220,
    popular: false,
    tag: '100% Pestaña Natural',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
    included: [
      'Elevación y curvatura personalizada desde la base',
      'Tinte negro azabache de larga fijación',
      'Baño de Botox de keratina nutritiva reconstructora',
      'Peinado y cepillo aplicador'
    ],
    idealFor: 'Pestañas rectas o caídas que quieren olvidarse del rizador manteniendo su pestaña 100% natural.',
    retouchTime: 'Dura de 6 a 8 semanas'
  },

  // --- MICROPIGMENTACIÓN DE AUTOR ---
  {
    id: 'powder-brows',
    name: 'POWDER BROWS (Cejas Efecto Polvo Semi-Permanente)',
    category: 'micropigmentation',
    shortDescription: '¡La técnica ideal para quienes se maquillan a diario! Hermoso efecto polvo degradé y aterciopelado que luce impecable 24/7.',
    fullDescription: 'Técnica avanzada de micropigmentación que deposita micropartículas de pigmento mineral en la capa superficial de la piel, creando un degradé suave desde el inicio hasta una cola definida. Brinda un aspecto de maquillaje suave con acabado aterciopelado.\n\n• Candidatas ideales: Personas que se maquillan sus cejas todos los días, pieles grasas o mixtas, y cejas con trabajos anteriores (tatuajes o microblading desvanecido) que requieren corrección y armonización.\n• Duración: 12 a 18 meses de duración impecable.',
    duration: '2h 30m',
    price: 1500,
    popular: true,
    tag: 'Efecto Polvo 24/7',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    included: [
      'Visagismo facial y diseño personalizado previo con aprobación de la clienta',
      'Pigmentos minerales estériles biocompatibles que no cambian de color',
      'Anestésico tópico premium para una sesión 100% confortable',
      'Kit post-cuidado con bálsamo cicatrizante e instrucciones detalladas',
      'Durabilidad de 12 a 18 meses'
    ],
    idealFor: 'Quienes se maquillan a diario, piel grasa/mixta, o con trabajos anteriores de micropigmentación/microblading.',
    retouchTime: 'Retoque anual sugerido (12-18 meses)'
  },
  {
    id: 'latin-brows',
    name: 'LATÍN BROWS (Fusión: Microblading + Powder Brows)',
    category: 'micropigmentation',
    shortDescription: 'La obra maestra de Manu Studio: trazos pelo a pelo en el inicio combinados con suave efecto polvo en cuerpo y cola para una ceja hiperrealista y sofisticada.',
    fullDescription: 'Fusión artística de dos grandes técnicas: microblading hiperrealista en el inicio de la ceja para simular vellos naturales, fusionado con un sombreado degradé Powder Brows en el cuerpo y cola. El resultado es una ceja natural, tupida y con hermosa dimensión estética.\n\n• Candidatas ideales: Apto para todo tipo de piel, con o sin trabajos anteriores. La opción más completa y solicitada para un cambio armonioso y elegante.\n• Duración: 12 a 18 meses.',
    duration: '2h 45m',
    price: 1650,
    popular: true,
    tag: 'Fusión de Alta Costura',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    included: [
      'Diseño y visagismo áureo aprobado antes de pigmentar',
      'Trazos pelo a pelo hiperrealistas en el inicio',
      'Sombreado gradual Powder Brows en cuerpo y final de la ceja',
      'Anestesia tópica de confort durante todo el procedimiento',
      'Kit completo de regeneración y cuidados en casa',
      'Durabilidad de 12 a 18 meses'
    ],
    idealFor: 'Todo tipo de piel, con o sin trabajos previos, que busca el equilibrio perfecto entre realismo y definición.',
    retouchTime: 'Retoque anual sugerido (12-18 meses)'
  }
];

export const DEFAULT_GALLERY: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: 'Lifting de Pestañas + Keratin Botox',
    service: 'Lifting & Tinte',
    description: 'Transformación de pestañas rectas a curvatura abierta con efecto rímel permanente y nutrición profunda.',
    beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    afterImage: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    tag: 'Pestañas Naturales'
  },
  {
    id: 'ba-2',
    title: 'Laminado de Cejas & Visagismo',
    service: 'Brow Lamination + Tinte',
    description: 'Cejas rebeldes y finas transformadas en una estructura amplia, peinada y con diseño anatómico perfecto.',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImage: '/src/assets/images/brow_lamination_1787346140737.jpg',
    tag: 'Cejas Orgánicas'
  },
  {
    id: 'ba-3',
    title: 'Extensiones Híbridas Efecto Wispy',
    service: 'Pestañas Híbridas',
    description: 'Apertura de la mirada con volumen suave y textura aireada manteniendo ligereza y confort absoluto.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
    tag: 'Efecto Textura'
  }
];

export const DEFAULT_LOOKBOOK: LookbookItem[] = [
  {
    id: 'lb-1',
    url: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    title: 'Extensiones Clásicas 1:1',
    category: 'Pestañas'
  },
  {
    id: 'lb-2',
    url: '/src/assets/images/brow_lamination_1787346140737.jpg',
    title: 'Laminado de Cejas Fluffy',
    category: 'Cejas'
  },
  {
    id: 'lb-3',
    url: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
    title: 'Cabina Boutique & Confort',
    category: 'Estudio'
  },
  {
    id: 'lb-4',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    title: 'Lash Lifting con Botox',
    category: 'Pestañas'
  },
  {
    id: 'lb-5',
    url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    title: 'Visagismo y Mapeo Dorado',
    category: 'Cejas'
  },
  {
    id: 'lb-6',
    url: '/src/assets/images/manu_portrait_1787346154541.jpg',
    title: 'Atención Personalizada Manu',
    category: 'Experiencia'
  }
];

export const DEFAULT_ABOUT = {
  name: 'Manuela',
  title: 'Lash & Brow Master Artist | Fundadora',
  role: 'Lash & Brow Artist Certificada | Fundadora de MANU STUDIO',
  greeting: 'Hola, soy Manuela',
  tagline: 'Quiero darte la bienvenida a Manu Studio, un espacio creado con muchísimo amor, dedicación y un sueño que poco a poco se ha convertido en realidad.',
  bio1: 'Me apasiona el mundo de la estética, porque creo que los pequeños detalles pueden transformar por completo y hacernos sentir mucho más seguras de nosotras mismas.',
  bio2: 'Para mí, trabajar con cada una de mis clientas es mucho más que realizar un servicio. Me gusta que desde el momento en que llegues te sientas cómoda, tranquila, consentida y en confianza. Quiero que este sea un espacio donde puedas desconectarte un poquito de la rutina, disfrutar de tu momento y regalarte tiempo para ti.',
  bio3: 'Me encanta escuchar lo que quieres, conocer tus gustos y ayudarte a encontrar un diseño que resalte tu belleza natural y vaya de acuerdo con tu personalidad.',
  bio4: 'Mi mayor satisfacción es ver tu reacción cuando terminas y saber que te vas sintiéndote linda, feliz y segura de ti misma. Porque detrás de cada servicio hay tiempo, dedicación y mucho amor por lo que hago.',
  bio5: 'Gracias por confiar en mí y permitirme ser parte de esos pequeños momentos en los que decides consentirte.',
  portraitImage: '/src/assets/images/manu_founder_portrait_1787431485341.jpg',
  studioImage: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
  stats: [
    { number: '+1,500', label: 'Miradas Transformadas' },
    { number: '5+ Años', label: 'Experiencia Especializada' },
    { number: '100%', label: 'Insumos Certificados' },
    { number: '5.0 ★', label: 'Satisfacción VIP' }
  ],
  values: [
    { title: 'Trato Cercano y Con Amor', description: 'Atención 1 a 1 personalizada donde eres escuchada y consentida de inicio a fin.' },
    { title: 'Visagismo Anatómico', description: 'Estudio de tu fisionomía para diseñar curvas y densidades que armonicen con tu personalidad.' },
    { title: 'Bioseguridad Grado Médico', description: 'Instrumental esterilizado y adhesivos hipoalergénicos certificados para cuidar tus ojos.' },
    { title: 'Momento de Desconexión', description: 'Un santuario íntimo y relajante para desconectarte de la rutina y regalarte tiempo para ti.' }
  ],
  certifications: [
    { title: 'Master en Extensiones Pelo a Pelo & Volumen Ruso', institution: 'International Lash Academy', year: '2021', specialty: 'Técnicas de Aislamiento y Visagismo' },
    { title: 'Especialista en Laminado y Diseño de Cejas', institution: 'Brow Art Institute', year: '2022', specialty: 'Mapeo Morfológico y Colorimetría' },
    { title: 'Certificación en Lash Lifting & Botox Terapéutico', institution: 'Lash Botox Europe', year: '2023', specialty: 'Nutrición Capilar y Reconstrucción' },
    { title: 'Acreditación en Bioseguridad y Asepsia', institution: 'Secretaría de Salud', year: '2024', specialty: 'Higiene Ocular y Control de Calidad' }
  ]
};

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Las extensiones de pestañas dañan mis pestañas naturales?',
    answer: 'No, cuando se aplican con la técnica adecuada y se respeta el peso y longitud que tu pestaña puede soportar. En Manu Studio trabajamos con visagismo anatómico y fibras ultra livianas.',
    category: 'lashes'
  },
  {
    id: 'faq-2',
    question: '¿Cuánto tiempo dura el laminado de cejas?',
    answer: 'El laminado de cejas tiene una duración promedio de 5 a 7 semanas, dependiendo del ciclo de renovación de tus vellos naturales y los cuidados posteriores.',
    category: 'brows'
  },
  {
    id: 'faq-3',
    question: '¿Qué cuidados debo tener las primeras 24 horas?',
    answer: 'Evita mojar la zona, el vapor de duchas calientes, saunas o aplicar cremas oleosas en ojos y cejas durante las primeras 24 horas para garantizar la polimerización del producto.',
    category: 'general'
  },
  {
    id: 'faq-4',
    question: '¿Cómo puedo agendar mi cita?',
    answer: 'Puedes agendar directamente haciendo clic en el botón de WhatsApp (313 674 3859) o a través de nuestro formulario interactivo en el sitio.',
    category: 'general'
  }
];

export const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Valentina Restrepo',
    service: 'Pestañas Híbridas',
    rating: 5,
    comment: '¡La mejor experiencia de mi vida! Manu es súper delicada, las pestañas me duraron más de 3 semanas impecables y se sienten livianitas.',
    date: 'Hace 3 días',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Camila Morales',
    service: 'Laminado de Cejas + Lifting',
    rating: 5,
    comment: 'El combo perfecto. Salí sintiéndome hermosa y renovada. La cabina es un sueño, súper limpia y relajante.',
    date: 'Hace 1 semana',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Mariana Gómez',
    service: 'Lifting de Pestañas con Botox',
    rating: 5,
    comment: 'Mis pestañas son súper tiesas y Manu logró una curvatura perfecta y natural. 1000% recomendada.',
    date: 'Hace 2 semanas',
    verified: true
  }
];
