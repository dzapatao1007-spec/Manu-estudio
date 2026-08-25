import React from 'react';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { MessageCircle, Sparkles, CheckCircle2, ShieldCheck, Heart, Star, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface HeroProps {
  onNavigateToServices: () => void;
  onNavigateToAbout: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateToServices,
  onNavigateToAbout,
  onOpenBooking
}) => {
  const { hero, studioInfo, updateHero } = useAdmin();

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Manu! Vengo de tu sitio web y deseo consultar disponibilidad para agendar una cita en MANU STUDIO ✨');
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 sm:pt-12 sm:pb-24">
      {/* Liquid Glass Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#FFF0F3]/80 via-[#FFF8F0]/60 to-[#FCE8EE]/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Apple-inspired Editorial Presentation */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Minimalist Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <EditableText
                value={hero.tagline}
                onSave={(val) => updateHero({ tagline: val })}
                className="text-xs font-semibold tracking-wider text-[#1D1D1F] uppercase"
              />
              <span className="text-xs text-[#C5A059] font-medium">• Haute Couture</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1D1D1F] font-bold tracking-tight leading-[1.12]">
                <EditableText
                  value={hero.title}
                  onSave={(val) => updateHero({ title: val })}
                  className="inline"
                />
              </h1>
              <div className="text-base sm:text-lg text-[#6E6E73] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                <EditableText
                  value={hero.subtitle}
                  onSave={(val) => updateHero({ subtitle: val })}
                  multiline={true}
                  className="block"
                />
              </div>
            </div>

            {/* Apple-styled Quality Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8F0] border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#1D1D1F] text-left">Visagismo a tu Medida</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="w-8 h-8 rounded-xl bg-[#F4FAF6] border border-[#34C759]/20 flex items-center justify-center text-[#34C759] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#1D1D1F] text-left">Insumos Certificados</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#F4A6B8]/40 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#1D1D1F] text-left">Cuidado de Pelo Natural</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              {/* WhatsApp Direct CTA */}
              <button
                id="hero-whatsapp-cta-btn"
                onClick={openWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs font-bold text-white bg-[#1D1D1F] hover:bg-black shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Agendar por WhatsApp ({studioInfo.whatsappDisplay})</span>
              </button>

              {/* View Services & Pricing */}
              <button
                id="hero-view-services-btn"
                onClick={onNavigateToServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-semibold text-[#1D1D1F] bg-white/80 hover:bg-white border border-black/[0.08] hover:border-black/[0.15] shadow-2xs hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <span>Ver Catálogo & Precios</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-black/[0.06]">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Clienta"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80"
                  alt="Clienta"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Clienta"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                  <span className="text-xs font-bold text-[#1D1D1F] ml-1">5.0</span>
                </div>
                <span className="text-[11px] text-[#86868B] block">
                  Experiencia VIP comprobada por más de 500 clientas felices
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Studio Presentation with EditableImage */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-md">
              {/* Soft Glass Glow Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C5A059]/20 via-[#F4A6B8]/20 to-[#C5A059]/20 rounded-[3rem] blur-2xl -z-10" />

              {/* Main Feature Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-white border border-white/80 shadow-[0_24px_64px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.04)]">
                <EditableImage
                  src={hero.image || '/src/assets/images/hero_beauty_studio_1787346116993.jpg'}
                  alt="Manu Studio Cabina VIP"
                  label="Foto de Portada"
                  onSave={(newUrl) => updateHero({ image: newUrl })}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />

                {/* Bottom Frosted Glass Overlay Pill */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block">
                        Cabina Boutique
                      </span>
                      <span className="font-serif text-sm font-bold text-[#1D1D1F] block">
                        {studioInfo.name}
                      </span>
                    </div>
                    <button
                      onClick={onNavigateToAbout}
                      className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      Conócenos
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
