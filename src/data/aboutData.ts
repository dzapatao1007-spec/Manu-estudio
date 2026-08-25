export interface Certification {
  title: string;
  institution: string;
  year: string;
  specialty: string;
}

export const ABOUT_MANU = {
  name: 'Manuela "Manu" Ospina',
  role: 'Lash & Brow Artist Certificada | Fundadora de MANU STUDIO',
  bio1: '¡Hola! Soy Manu, apasionada por el visagismo y la belleza de la mirada. Desde hace más de 5 años me dedico a estudiar las facciones del rostro femenino, entendiendo que cada mujer tiene una anatomía única y que no existen fórmulas genéricas.',
  bio2: 'Fundé MANU STUDIO con una visión clara: crear un espacio íntimo, cálido, minimalista y libre de prisas, donde cada cita sea una experiencia de autocuidado, relajación y confianza. Para mí, la perfección no es sobrecargar, sino realzar la belleza natural con precisión milimétrica.',
  bio3: 'En mi cabina sólo trabajo con insumos certificados internacionalmente, protocolos estrictos de esterilización de grado clínico y técnicas que protegen al 100% la salud de tu pestaña y ceja natural.',
  portraitImage: '/src/assets/images/manu_portrait_1787346154541.jpg',
  studioImage: '/src/assets/images/hero_beauty_studio_1787346116993.jpg',
  values: [
    {
      title: 'Visagismo Anatómico Personalizado',
      description: 'Nunca repetimos un diseño. Analizamos la forma de tus ojos, el arco superciliar y tu estilo de vida para crear un resultado armónico.',
      icon: 'sparkles'
    },
    {
      title: 'Higiene y Esterilización Grado Clínico',
      description: 'Herramientas de acero quirúrgico esterilizadas en autoclave, material descartable y toallas individuales para tu absoluta tranquilidad.',
      icon: 'shield-check'
    },
    {
      title: 'Insumos Premium Hipoalergénicos',
      description: 'Adhesivos libres de formaldehído, tintes con keratina europea y fibras de seda ultra ligeras que no dañan el folículo.',
      icon: 'award'
    },
    {
      title: 'Experiencia Spa & Confort',
      description: 'Camilla ergonómica con almohadas viscoelásticas, mantas suaves, aromaterapia relajante y música chill-out durante tu sesión.',
      icon: 'heart'
    }
  ],
  certifications: [
    {
      title: 'Master Lash Artist & Russian Volume 3D-6D',
      institution: 'Lash Academy International',
      year: '2023',
      specialty: 'Abanicos artesanales y salud capilar'
    },
    {
      title: 'Especialista en Visagismo y Brow Lamination Pro',
      institution: 'Beauty Masters Academy',
      year: '2022',
      specialty: 'Mapeo facial y alisado orgánico de cejas'
    },
    {
      title: 'Certificación en Lash Lifting & Keratin Botox Therapy',
      institution: 'InLei / Elleebana Certified',
      year: '2021',
      specialty: 'Nutrición molecular de pestañas naturales'
    },
    {
      title: 'Bioseguridad y Control de Infecciones Estéticas',
      institution: 'Secretaría de Salud & Certificación Sanitaria',
      year: '2024',
      specialty: 'Protocolos de esterilización y asepsia'
    }
  ],
  stats: [
    { number: '+1,500', label: 'Miradas Transformadas' },
    { number: '5+ Años', label: 'De Experiencia Profesional' },
    { number: '100%', label: 'Insumos Certificados' },
    { number: '5.0 ★', label: 'Satisfacción de Clientas' }
  ]
};
