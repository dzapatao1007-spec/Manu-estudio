import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { EditAboutModal } from './EditAboutModal';
import { useAdmin } from '../context/AdminContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  MessageCircle, 
  Crown,
  Star,
  ArrowRight,
  Gem,
  Award,
  Smile,
  Coffee,
  Sparkle,
  Wand2,
  CheckCircle2,
  Edit,
  Camera,
  Save
} from 'lucide-react';

interface AboutViewProps {
  onOpenBooking: () => void;
  onNavigateToServices: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenBooking,
  onNavigateToServices
}) => {
  const { about, studioInfo, updateAbout, isAdminLoggedIn } = useAdmin();
  const [activeMood, setActiveMood] = useState<'relax' | 'glow' | 'princess'>('princess');
  const [heartsCount, setHeartsCount] = useState<number>(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Manu! Estuve leyendo tu historia en tu página "Sobre mí" y me encantaría agendar una cita contigo ✨');
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSendHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setFloatingHearts((prev) => [...prev.slice(-10), newHeart]);
    setHeartsCount((prev) => prev + 1);
  };

  const experiencePillars = [
    {
      icon: <Heart className="w-5 h-5 text-[#E61E78]" />,
      title: 'Amor & Dedicación',
      desc: 'Detrás de cada servicio hay tiempo, técnica rigurosa y verdadera devoción por consentirte.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C5A059]" />,
      title: 'Visagismo Anatómico',
      desc: 'Diseños que respetan la armonía de tus facciones y reflejan tu personalidad con elegancia.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#34C759]" />,
      title: 'Bioseguridad Grado Médico',
      desc: 'Insumos estériles certificados y adhesivos hipoalergénicos para el cuidado total de tus ojos.'
    },
    {
      icon: <Crown className="w-5 h-5 text-[#E61E78]" />,
      title: 'Espacio de Desconexión',
      desc: 'Un santuario íntimo, cálido y sin prisas para disfrutar de tu momento y consentirte como reina.'
    }
  ];

  const currentLogo = studioInfo.logo || '/src/assets/images/manu_studio_official_logo_1787618363052.jpg';

  const interactivePrincessPerks = [
    {
      id: 'princess',
      title: 'Tratamiento Real VIP 👑',
      tag: 'Princesa Total',
      desc: 'Música ambiental suave, aromaterapia relajante, camilla ergonómica con almohada memory foam y mantita térmica para que duermas plácidamente.',
      color: 'from-[#FFF0F5] to-[#FCE8EE]'
    },
    {
      id: 'glow',
      title: 'Diseño Exclusivo Glow ✨',
      tag: '100% Personalizado',
      desc: 'No hacemos moldes genéricos. Escuchamos tus deseos y analizamos tu tipo de rostro y ojos para que tu mirada luzca exactamente como la soñaste.',
      color: 'from-[#FFF8F0] to-[#FFF0F5]'
    },
    {
      id: 'relax',
      title: 'Tu Momento Sagrado ☕',
      tag: 'Cero Estrés',
      desc: 'Ven a consentirte sin prisa. Sin interrupciones ni ruidos. Es tu tiempo para desconectarte del mundo y salir renovada.',
      color: 'from-[#F4FAF6] to-[#FFF0F5]'
    }
  ];

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F6] text-[#1D1D1F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* Admin Quick Action Banner for Sobre Mí */}
        {isAdminLoggedIn && (
          <div className="p-4 rounded-3xl bg-gradient-to-r from-[#FFF0F5] via-white to-[#FFF0F5] border-2 border-[#E6C894] shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-9 h-9 rounded-2xl bg-[#E61E78] text-white flex items-center justify-center shadow-xs shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#1D1D1F] block text-sm">
                  Edición de Sección "Sobre Mí"
                </span>
                <span className="text-[#7E5F6D] text-xs">
                  Puedes editar la foto de perfil y todos los textos con guardado directo en Firebase Firestore.
                </span>
              </div>
            </div>

            <button
              id="admin-edit-about-full-modal-btn"
              onClick={() => setIsEditModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer shrink-0"
            >
              <Edit className="w-4 h-4" />
              <span>👑 Editar Toda la Sección & Foto</span>
            </button>
          </div>
        )}

        {/* Section 1: Editorial Presentation & Founder Portrait with Floating Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Portrait of Manuela with Liquid Glass Framing & Interactive Floating Animation */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            
            {/* Ambient Background Glow in Soft Rose Pink */}
            <motion.div 
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 bg-gradient-to-tr from-[#F4A6B8]/40 via-[#FCE8EE]/50 to-[#C5A059]/30 rounded-[3rem] blur-2xl -z-10" 
            />

            <div className="relative w-full max-w-sm">
              
              {/* Main Portrait Card with Apple-tier Liquid Glass Shadow */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] bg-white border-2 border-white/90 shadow-[0_20px_50px_rgba(244,166,184,0.25),0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <EditableImage
                  src={about.portraitImage || '/src/assets/images/manu_founder_portrait_1787431485341.jpg'}
                  alt={about.name || 'Manuela - Fundadora'}
                  label="Foto de Manuela"
                  onSave={(newUrl) => updateAbout({ portraitImage: newUrl })}
                  className="w-full h-full object-cover object-top"
                  containerClassName="w-full h-full"
                />
                
                {/* Subtle dark vignette overlay for typography legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                {/* Bottom Portrait Text Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <div className="flex items-center gap-1.5 text-[#ECC277] text-[11px] font-bold uppercase tracking-widest mb-1">
                    <Crown className="w-3.5 h-3.5 text-[#E61E78]" />
                    <span>Lash & Brow Master Artist</span>
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl font-bold block leading-tight text-white tracking-tight">
                    {about.name || 'Manuela'}
                  </span>
                  <span className="text-xs text-[#FFF0F5] font-medium block mt-0.5">
                    Fundadora de MANU STUDIO ♡
                  </span>
                </div>
              </motion.div>

              {/* Floating Quality Badge - Interactive Love Button */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-4 -right-3 sm:-right-4 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#F4A6B8]/40 shadow-[0_12px_32px_rgba(230,30,120,0.15)] text-center relative"
              >
                <button
                  id="about-interactive-love-btn"
                  onClick={handleSendHeart}
                  className="flex items-center gap-2 text-xs font-bold text-[#E61E78] hover:scale-105 active:scale-90 transition-transform cursor-pointer"
                  title="¡Haz clic para enviar amor a Manu!"
                >
                  <Heart className="w-4 h-4 fill-[#E61E78] text-[#E61E78] animate-bounce" />
                  <span>Dar Amor {heartsCount > 0 && `(${heartsCount})`}</span>
                </button>

                {/* Floating Heart Particles */}
                {floatingHearts.map((h) => (
                  <motion.div
                    key={h.id}
                    initial={{ y: 0, opacity: 1, scale: 0.8 }}
                    animate={{ y: -60, opacity: 0, scale: 1.4 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-[#E61E78]"
                    style={{ left: h.x, top: h.y }}
                  >
                    💖
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>

          {/* Founder Story & Letter */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/40 text-[#D81B60] text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E61E78]" />
              <span>Historia, Pasión & Esencia</span>
            </div>

            {/* Greeting Heading */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1D1D1F] font-bold leading-tight tracking-tight">
                <EditableText
                  value={about.greeting || 'Hola, soy Manuela'}
                  onSave={(val) => updateAbout({ greeting: val })}
                  className="inline"
                />{' '}
                <span className="font-script text-3xl sm:text-4xl text-[#E61E78] font-normal">♡</span>
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-[#E61E78] via-[#F4A6B8] to-[#C5A059] rounded-full" />
            </div>

            {/* Letter Cards */}
            <div className="space-y-4 text-sm sm:text-base text-[#48484A] leading-relaxed font-normal">
              
              <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-[#F4A6B8]/30 shadow-[0_4px_24px_rgba(244,166,184,0.1)] text-[#1D1D1F] font-medium leading-relaxed">
                <p>
                  "<EditableText
                    value={about.tagline || 'Quiero darte la bienvenida a Manu Studio, un espacio creado con muchísimo amor, dedicación y un sueño que poco a poco se ha convertido en realidad.'}
                    onSave={(val) => updateAbout({ tagline: val })}
                    multiline={true}
                    className="inline"
                  />"
                </p>
              </div>

              <div className="space-y-3">
                <EditableText
                  value={about.bio1 || 'Me apasiona el mundo de la estética, porque creo que los pequeños detalles pueden transformar por completo y hacernos sentir mucho más seguras de nosotras mismas.'}
                  onSave={(val) => updateAbout({ bio1: val })}
                  multiline={true}
                  className="block"
                />

                <EditableText
                  value={about.bio2 || 'Para mí, trabajar con cada una de mis clientas es mucho más que realizar un servicio. Me gusta que desde el momento en que llegues te sientas cómoda, tranquila, consentida y en confianza. Quiero que este sea un espacio donde puedas desconectarte un poquito de la rutina, disfrutar de tu momento y regalarte tiempo para ti.'}
                  onSave={(val) => updateAbout({ bio2: val })}
                  multiline={true}
                  className="block"
                />

                <EditableText
                  value={about.bio3 || 'Me encanta escuchar lo que quieres, conocer tus gustos y ayudarte a encontrar un diseño que resalte tu belleza natural y vaya de acuerdo con tu personalidad.'}
                  onSave={(val) => updateAbout({ bio3: val })}
                  multiline={true}
                  className="block"
                />

                <EditableText
                  value={about.bio4 || 'Mi mayor satisfacción es ver tu reacción cuando terminas y saber que te vas sintiéndote linda, feliz y segura de ti misma.'}
                  onSave={(val) => updateAbout({ bio4: val })}
                  multiline={true}
                  className="block font-semibold text-[#1D1D1F]"
                />
              </div>

              {/* Signature Footer Card */}
              <div className="pt-4 border-t border-[#F4A6B8]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#86868B] block">Gracias por confiar en mí,</span>
                  <span className="font-script text-2xl sm:text-3xl text-[#E61E78] block mt-0.5">
                    Manuela ♡
                  </span>
                </div>
                <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs border border-[#F4A6B8]/30">
                  <img
                    src={currentLogo}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="about-whatsapp-direct-btn"
                onClick={openWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] shadow-[0_8px_24px_rgba(230,30,120,0.3)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Hablar con Manu por WhatsApp</span>
              </button>
              
              <button
                id="about-view-all-services-btn"
                onClick={onNavigateToServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-[#1D1D1F] bg-white hover:bg-[#FFF0F5] border border-[#F4A6B8]/40 shadow-2xs transition-all cursor-pointer"
              >
                <span>Ver Servicios & Precios</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E61E78]" />
              </button>
            </div>

          </div>

        </div>

        {/* Section 2: Interactive "Princess Experience" Interactive Tab Selector */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-[#F4A6B8]/30 p-6 sm:p-10 shadow-[0_16px_48px_rgba(244,166,184,0.12)] space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#D81B60] text-[11px] font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5 text-[#E61E78]" />
              <span>Experiencia Real & Confort Total</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              ¿Qué se siente ser atendida en Manu Studio? ♡
            </h2>
            <p className="text-xs sm:text-sm text-[#86868B]">
              Toca cada botón para descubrir por qué nuestras clientas se sienten como princesas consentidas:
            </p>
          </div>

          {/* Interactive Selector Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {interactivePrincessPerks.map((perk) => (
              <button
                key={perk.id}
                onClick={() => setActiveMood(perk.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  activeMood === perk.id
                    ? 'bg-gradient-to-r from-[#E61E78] to-[#F0789E] text-white shadow-[0_4px_16px_rgba(230,30,120,0.3)] scale-105'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-[#F4A6B8]/25 hover:bg-[#FFF0F5]'
                }`}
              >
                <span>{perk.title}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Interactive Card Content with Smooth Fade Transitions */}
          <AnimatePresence mode="wait">
            {interactivePrincessPerks.map((perk) => {
              if (perk.id !== activeMood) return null;
              return (
                <motion.div
                  key={perk.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${perk.color} border border-[#F4A6B8]/40 shadow-sm space-y-3 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-[#F4A6B8]/30 flex items-center justify-center shrink-0 text-2xl">
                    {perk.id === 'princess' ? '👑' : perk.id === 'glow' ? '✨' : '💖'}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#E61E78] block">
                      {perk.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1D1D1F]">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {experiencePillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#F4A6B8]/20 hover:border-[#E61E78]/40 shadow-[0_4px_20px_rgba(244,166,184,0.06)] hover:shadow-[0_8px_30px_rgba(230,30,120,0.12)] transition-all duration-300 space-y-3 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FFF0F5] border border-[#F4A6B8]/30 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-[#1D1D1F] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Luxury Princess Call to Action */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#2A1720] via-[#3D1E2D] to-[#1D1D1F] text-white p-8 sm:p-14 border border-[#F4A6B8]/20 shadow-[0_24px_64px_rgba(230,30,120,0.2)] text-center space-y-6">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#E61E78]/25 via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFF0F5] text-[11px] font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5 text-[#ECC277]" />
              <span>Agenda Tu Cita Especial</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
              ¿Lista para transformar tu mirada y consentirte como una princesa? ♡
            </h2>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Agenda tu cita en línea o escribe directamente al WhatsApp de Manu para recibir asesoría personalizada.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="about-cta-book-appointment-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] hover:shadow-[0_8px_24px_rgba(230,30,120,0.45)] font-bold text-xs uppercase tracking-wider text-white transition-all cursor-pointer active:scale-98"
              >
                ✨ Agendar Mi Cita en Línea
              </button>

              <button
                id="about-cta-whatsapp-chat-btn"
                onClick={openWhatsApp}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {studioInfo.whatsappDisplay}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Full Edit About Modal */}
      <EditAboutModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};
