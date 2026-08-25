import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'pestanas-clasicas',
    name: 'Pestañas Pelo a Pelo Clásicas',
    category: 'lashes',
    shortDescription: 'Efecto rímel natural y elegante, aplicando una extensión ultra ligera sobre cada pestaña natural.',
    fullDescription: 'Técnica japonesa 1 a 1 donde se adhiere una extensión de fibra de seda de máxima calidad sobre cada una de tus pestañas naturales saludables. Ideal para resaltar tu mirada de forma sutil, sofisticada y cómoda para el día a día sin necesidad de maquillaje.',
    duration: '1h 45m',
    price: 38,
    popular: true,
    tag: 'Efecto Natural',
    image: '/src/assets/images/eyelash_extensions_1787346129559.jpg',
    included: [
      'Visagismo y diseño de mirada según tipo de ojo',
      'Limpieza profunda y desintoxicación de párpados con foam cleanser',
      'Parches hidratantes de colágeno para ojeras',
      'Extensiones de fibra de seda hipoalergénicas',
      'Sellador protector y cepillito de regalo'
    ],
    idealFor: 'Quienes buscan realzar su mirada sin perder naturalidad, ideal para el trabajo o uso diario.',
    retouchTime: 'Cada 15 a 21 días'
  },
  {
    id: 'pestanas-hibridas',
    name: 'Pestañas Híbridas (Wispy / Mixtas)',
    category: 'lashes',
    shortDescription: 'La combinación perfecta entre la naturalidad de las clásicas y la densidad sutil del volumen.',
    fullDescription: 'Combinación artística de extensiones clásicas individuales y abanicos livianos hechos a mano (2D/3D). Brinda una textura vaporosa, ligeramente tupida pero aireada, con acabado estilo Kim K o Wispy.',
    duration: '2h 00m',
    price: 45,
    popular: true,
    tag: 'Más Solicitado',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80',
    included: [
      'Mapeo y diseño de ojos (Cat Eye, Open Eye o Ardilla)',
      'Limpieza y preparación con primer especial libre de aceites',
      'Colocación de abanicos artesanales ligeros y fibras individuales',
      'Nano mister brumizador para polimerización instantánea',
      'Cepillo luxury y tarjeta de cuidados'
    ],
    idealFor: 'Miradas que desean mayor definición, volumen controlado y efecto textura con glamour equilibrado.',
    retouchTime: 'Cada 18 a 21 días'
  },
  {
    id: 'pestanas-volumen-ruso',
    name: 'Pestañas Volumen Ruso & Efecto Glam',
    category: 'lashes',
    shortDescription: 'Abanicos multidimensionales ultrafinos para una mirada intensa, tupida y llena de impacto.',
    fullDescription: 'Técnica avanzada donde se arman abanicos artesanales de 3 a 6 extensiones ultra ligeras (0.05mm - 0.07mm) que envuelven la pestaña sin sobrecargar su peso natural. Logra un efecto aterciopelado, profundo y radiante.',
    duration: '2h 15m',
    price: 55,
    popular: false,
    tag: 'Look Glamour',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
    included: [
      'Diagnóstico de salud de la pestaña natural y diseño morfológico',
      'Protocolo higiénico de cabina con shampoo estéril',
      'Abanicos hechos 100% a mano al momento',
      'Tratamiento de sellado térmico y anti-humedad',
      'Kit de cepillado y apósito calmante'
    ],
    idealFor: 'Eventos especiales, sesiones de fotos o amantes de una mirada tupida, elegante y protagonista.',
    retouchTime: 'Cada 20 a 25 días'
  },
  {
    id: 'lifting-pestanas-botox',
    name: 'Lifting de Pestañas + Keratina & Tinte',
    category: 'lashes',
    shortDescription: 'Curvatura, elevación y nutrición profunda para tus propias pestañas naturales.',
    fullDescription: 'Tratamiento no invasivo que eleva y curva tus pestañas naturales desde la raíz mediante moldes de silicona ergonómicos. Incluye tinte negro azabache para aportar efecto rímel y baño de Botox / Keratina reconstructora que engrosa la fibra capilar hasta un 24%.',
    duration: '1h 15m',
    price: 32,
    popular: true,
    tag: '100% Natural',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    included: [
      'Elección de molde según longitud y curvatura deseada (J, C, D)',
      'Permanente y neutralización con productos orgánicos europeos',
      'Tinte semipermanente de alta cobertura',
      'Tratamiento regenerador con complejo de ácido hialurónico y botox',
      'Peinado y cepillo aplicador'
    ],
    idealFor: 'Pestañas rectas, caídas o para quienes prefieren olvidarse del rizador manteniendo sus pestañas naturales.',
    retouchTime: 'Dura de 6 a 8 semanas'
  },
  {
    id: 'laminado-cejas',
    name: 'Laminado de Cejas (Brow Lamination)',
    category: 'brows',
    shortDescription: 'Alisado, redirección y fijación de los vellos para cejas peinadas, ordenadas y con mayor volumen.',
    fullDescription: 'Procedimiento de última tendencia que suaviza y alinea la dirección de los pelitos rebeldes de la ceja. Aporta un efecto orgánico, tupido y perfectamente definido (estilo "soap brows" duradero), rellenando zonas despobladas visualmente.',
    duration: '1h 00m',
    price: 28,
    popular: true,
    tag: 'Tendencia Top',
    image: '/src/assets/images/brow_lamination_1787346140737.jpg',
    included: [
      'Mapeo facial previo con hilo milimétrico',
      'Laminado y nutrición con aceite de argán y queratina',
      'Depilación y perfilado con pinza y cera hipoalergénica',
      'Fijador nutritivo final'
    ],
    idealFor: 'Cejas rebeldes, rizadas, finas o que crecen en direcciones irregulares.',
    retouchTime: 'Dura de 5 a 7 semanas'
  },
  {
    id: 'diseno-visagismo-cejas',
    name: 'Diseño & Visagismo con Depilación Personalizada',
    category: 'brows',
    shortDescription: 'Medición anatómica de tus facciones para esculpir la forma perfecta de tus cejas.',
    fullDescription: 'Estudio morfológico del rostro para determinar el inicio, arco y cola idóneos de tus cejas. Realizamos una depilación precisa con pinza de titanio y cera elástica de baja temperatura para pieles sensibles.',
    duration: '40m',
    price: 15,
    popular: false,
    tag: 'Básico Esencial',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    included: [
      'Marcación con compás áureo y visagismo personalizado',
      'Depilación de alta precisión con pinza estéril y cera tibia',
      'Recorte de vellos largos y peinado',
      'Gel descongestivo con aloe vera y manzanilla'
    ],
    idealFor: 'Cualquier persona que desee limpiar y armonizar la forma natural de sus cejas.',
    retouchTime: 'Cada 15 a 20 días'
  },
  {
    id: 'cejas-henna-tinte',
    name: 'Diseño de Cejas + Henna / Tinte Híbrido',
    category: 'brows',
    shortDescription: 'Perfilado profesional con sombreado semipermanente en piel y vello para un acabado definido.',
    fullDescription: 'Combina el diseño anatómico con la aplicación de tinte híbrido o henna botánica libre de amoníaco. Crea un suave efecto sombreado en la piel (duración 6-10 días) y pigmenta el vello (duración hasta 4 semanas), rellenando huecos de forma natural.',
    duration: '50m',
    price: 22,
    popular: false,
    tag: 'Efecto Sombreado',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    included: [
      'Visagismo y calibración de tono (desde rubio ceniza hasta castaño intenso)',
      'Depilación y pulido de contorno',
      'Aplicación degradé de tinte / henna vegetal',
      'Sellador de color e hidratación'
    ],
    idealFor: 'Cejas claras, con pequeños espacios o que desean lucir arregladas sin maquillaje diario.',
    retouchTime: 'Cada 20 a 30 días'
  },
  {
    id: 'combo-sublime-duo',
    name: 'Combo Dúo Sublime: Lifting + Laminado',
    category: 'combos',
    shortDescription: 'El paquete estrella de Manu Studio: eleva tu mirada completa con pestañas y cejas perfectas.',
    fullDescription: 'La combinación más solicitada por nuestras clientas. Realizamos simultáneamente el Lifting de Pestañas con Tinte y Botox + el Laminado de Cejas con Perfilado y Nutrición. Transforma y armoniza tu rostro en una sola sesión relajante.',
    duration: '1h 50m',
    price: 52,
    popular: true,
    tag: 'Favorito del Estudio',
    image: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
    included: [
      'Lifting completo de pestañas + tinte + botox de keratina',
      'Laminado de cejas + diseño visagismo + depilación',
      'Mascarilla de colágeno para labios de cortesía',
      'Bebida de bienvenida (infusión relajante o café)',
      'Kit completo de aftercare Manu Studio'
    ],
    idealFor: 'Quienes quieren una transformación completa, natural y duradera en una sola visita.',
    retouchTime: 'Dura de 6 a 8 semanas'
  },
  {
    id: 'combo-goddess-eyes',
    name: 'Combo Goddess Eyes: Extensiones + Brow Glow',
    category: 'combos',
    shortDescription: 'Extensiones de pestañas (clásicas o híbridas) + Diseño y Tinte de Cejas.',
    fullDescription: 'Un servicio integral de máxima definición. Diseñamos la mirada con pestañas pelo a pelo adaptadas a tu estructura ocular, complementado con el perfilado y tinte de cejas para un marco facial impecable.',
    duration: '2h 20m',
    price: 59,
    popular: false,
    tag: 'Look Completo',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    included: [
      'Set completo de Extensiones Clásicas o Híbridas a elección',
      'Diseño y perfilado de cejas con visagismo',
      'Tinte / sombreado suave de cejas',
      'Brumizado sellador y asesoría post-cuidado'
    ],
    idealFor: 'Amantes del glamour y de lucir listas en cualquier momento del día.',
    retouchTime: 'Retoque de pestañas en 2 a 3 semanas'
  },
  {
    id: 'retiro-limpieza-profunda',
    name: 'Retiro Seguro de Extensiones & Spa Ocular',
    category: 'care',
    shortDescription: 'Desprendimiento suave con crema removedora especial sin dañar ni una sola pestaña natural.',
    fullDescription: 'Retiro profesional utilizando removedores en crema hipoalergénicos de grado cosmético que disuelven el adhesivo sin tirones ni irritaciones. Incluye baño desintoxicante y suero fortalecedor con péptidos y biotina.',
    duration: '35m',
    price: 12,
    popular: false,
    tag: 'Cuidado & Salud',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    included: [
      'Aplicación de crema removedora premium sin escurrimiento',
      'Limpieza profunda de residuos con shampoo neutro',
      'Tratamiento fortalecedor con biotina y aceite de ricino puro',
      'Cepillado de revitalización'
    ],
    idealFor: 'Quienes deseen descansar de las extensiones o retirarse un set de otro estudio de forma 100% segura.',
    retouchTime: 'Según necesidad'
  }
];

export const STUDIO_INFO = {
  name: 'MANU STUDIO',
  slogan: 'El arte de realzar tu mirada natural con elegancia y armonía',
  tagline: 'Cejas & Pestañas | Visagismo & Estética Femenina',
  whatsappNumber: '573001234567', // Colombian / LatAm standard format placeholder
  whatsappDisplay: '+57 300 123 4567',
  instagram: '@manustudio.lashes',
  address: 'Calle de las Rosas 14-22, Suite 302, Studio Boutique',
  city: 'Ciudad de Belleza',
  schedule: 'Lunes a Sábado: 8:00 AM – 7:00 PM (Citas programadas)',
  email: 'contacto@manustudio.com'
};
