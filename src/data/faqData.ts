import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'lashes',
    question: '¿Las extensiones de pestañas dañan mis pestañas naturales?',
    answer: 'No, siempre que sean aplicadas por un profesional certificado. En Manu Studio aislamos meticulosamente cada pestaña natural y calculamos el grosor, longitud y peso adecuado que tu pestaña puede soportar sin debilitar su ciclo natural de crecimiento.'
  },
  {
    id: '2',
    category: 'lashes',
    question: '¿Cuánto tiempo duran las extensiones y cada cuánto debo hacer retoque?',
    answer: 'Las extensiones se caen de forma natural junto con el ciclo de regeneración de tu pestaña (perdemos entre 2 a 5 pestañas naturales al día). Para mantenerlas siempre tupidas y perfectas, recomendamos realizar tu retoque cada 15 a 21 días.'
  },
  {
    id: '3',
    category: 'lashes',
    question: '¿Cuál es la diferencia entre Lifting y Extensiones de Pestañas?',
    answer: 'El Lifting trabaja sobre tus propias pestañas naturales curvándolas y nutriéndolas con keratina y tinte (dura de 6 a 8 semanas sin mantenimiento). Las extensiones agregan fibras sintéticas sobre tus pestañas para aportar mayor longitud, curvatura y volumen visual según la técnica elegida.'
  },
  {
    id: '4',
    category: 'brows',
    question: '¿En qué consiste el Laminado de Cejas y cuánto dura?',
    answer: 'Es un tratamiento no invasivo que reorganiza y fija la estructura del vello de la ceja en una dirección ascendente y armónica. Ayuda a que se vean más pobladas, peinadas y estilizadas. Su duración promedio es de 5 a 7 semanas.'
  },
  {
    id: '5',
    category: 'brows',
    question: '¿El tinte o la henna manchan la piel de forma permanente?',
    answer: 'No. El efecto de sombreado suave sobre la piel dura entre 5 y 10 días (según tu tipo de piel), mientras que la coloración sobre el vello de la ceja dura de 3 a 4 semanas.'
  },
  {
    id: '6',
    category: 'general',
    question: '¿Cómo debo asistir a mi cita en Manu Studio?',
    answer: 'Por favor asiste con el área de ojos y cejas totalmente libre de maquillaje (sin rímel, sombras ni delineador) y sin cremas o aceites en el contorno. Si usas lentes de contacto, te recomendamos retirarlos antes del procedimiento.'
  },
  {
    id: '7',
    category: 'general',
    question: '¿Cómo se confirman las citas y cuál es la política de cancelación?',
    answer: 'Las citas se agendan a través de nuestro botón directo de WhatsApp. Para reservar tu espacio requerimos un abono previo del 30% que se descuenta del valor total del servicio el día de tu cita. Puedes reprogramar con al menos 24 horas de anticipación sin penalidad.'
  }
];

export const AFTERCARE_TIPS = {
  lashes: [
    { title: 'Primeras 24 horas', desc: 'Evita mojar tus pestañas, exponerlas al vapor caliente, sauna o lágrimas para permitir que el adhesivo cure por completo.' },
    { title: 'Productos libres de aceite', desc: 'No uses desmaquillantes bifásicos, aceites esenciales ni bálsamos oleosos en el contorno ocular.' },
    { title: 'Cepillado suave', desc: 'Cepilla tus pestañas con el spoolie que te obsequiamos solo cuando estén secas, desde la mitad hacia las puntas.' },
    { title: 'Al dormir', desc: 'Intenta dormir boca arriba o de lado con almohada de seda o satén para evitar fricción directa.' }
  ],
  brows: [
    { title: 'Primeras 24 horas', desc: 'No mojes ni apliques cremas, maquillaje ni sueros sobre las cejas tras el laminado o tinte.' },
    { title: 'Hidratación diaria', desc: 'A partir del día 2, peina tus cejas y aplica unas gotas de aceite nutritivo de argán o ricino por las noches.' },
    { title: 'Peinado diario', desc: 'Péinalas en dirección ascendente con un gel fijador suave para mantener la forma impecable todo el día.' }
  ]
};
