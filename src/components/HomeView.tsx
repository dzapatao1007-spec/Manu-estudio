import React, { useState } from 'react';
import { Hero } from './Hero';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { EditServiceModal } from './EditServiceModal';
import { ReviewsSection } from './ReviewsSection';
import { StudioPoliciesSection } from './StudioPoliciesSection';
import { VisagismQuiz } from './VisagismQuiz';
import { InstagramFeedSection } from './InstagramFeedSection';
import { useAdmin } from '../context/AdminContext';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MessageCircle, 
  Star, 
  Crown, 
  Heart, 
  Check, 
  Edit2
} from 'lucide-react';
import { ServiceItem } from '../types';

interface HomeViewProps {
  onNavigateToServices: () => void;
  onNavigateToAbout: () => void;
  onNavigateToGallery: () => void;
  onNavigateToFAQ: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToServices,
  onNavigateToAbout,
  onNavigateToGallery,
  onNavigateToFAQ,
  onOpenBooking
}) => {
  const {
    services,
    studioInfo,
    about,
    manifesto,
    updateManifesto,
    updateService,
    isAdminLoggedIn
  } = useAdmin();

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const popularServices = services.filter((s) => s.popular).slice(0, 4);

  const bookDirectWhatsApp = (service: ServiceItem) => {
    const message = encodeURIComponent(
      `¡Hola Manu! Me interesa agendar el servicio de *${service.name}* ($${service.price} USD / aprox ${service.duration}) en MANU STUDIO. ¿Qué fechas y horarios tienes disponibles? ✨`
    );
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#FAF7F6] text-[#1D1D1F]">
      {/* Hero Banner with Apple Aesthetic */}
      <Hero
        onNavigateToServices={onNavigateToServices}
        onNavigateToAbout={onNavigateToAbout}
        onOpenBooking={() => onOpenBooking()}
      />

      {/* Apple-styled Liquid Glass Welcome Manifesto */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 text-center bg-white/80 backdrop-blur-2xl border border-[#F4A6B8]/30 shadow-[0_12px_40px_rgba(244,166,184,0.12)] space-y-5">
          
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/30 text-[#D81B60] text-[11px] font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#E61E78]" />
            <span>Manifiesto de Belleza & Realeza</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1D1D1F] font-bold tracking-tight">
              <EditableText
                value={manifesto.title}
                onSave={(val) => updateManifesto({ title: val })}
                className="inline"
              />
            </h2>

            <div className="text-sm sm:text-base text-[#6E6E73] leading-relaxed font-normal">
              <EditableText
                value={manifesto.body}
                onSave={(val) => updateManifesto({ body: val })}
                multiline={true}
                className="block"
              />
            </div>

            <div className="pt-2 text-xs sm:text-sm text-[#D81B60] font-serif italic flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-[#F4A6B8]/40" />
              <span>Diseñado para hacerte brillar como la princesa que eres ♡</span>
              <Heart className="w-3.5 h-3.5 fill-[#F4A6B8]/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#D81B60]">
              <Crown className="w-3.5 h-3.5" />
              <span>Tratamientos Insignia</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Nuestros Servicios Más Solicitados
            </h2>
          </div>

          <button
            id="home-view-all-services-btn"
            onClick={onNavigateToServices}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-[#1D1D1F] bg-white hover:bg-[#FFF0F5] border border-[#F4A6B8]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E61E78]" />
          </button>
        </div>

        {/* Popular Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl bg-white/85 backdrop-blur-xl border border-[#F4A6B8]/20 hover:border-[#E61E78]/40 overflow-hidden shadow-[0_4px_24px_rgba(244,166,184,0.08)] hover:shadow-[0_16px_40px_rgba(230,30,120,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5F8]">
                  <EditableImage
                    src={service.image}
                    alt={service.name}
                    label={`Foto de ${service.name}`}
                    onSave={async (newUrl) => {
                      await updateService({ ...service, image: newUrl });
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />

                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#D81B60] text-[10px] font-bold tracking-wide shadow-xs pointer-events-none border border-[#F4A6B8]/30">
                    <Sparkles className="w-3 h-3 text-[#E61E78]" />
                    <span>Favorito</span>
                  </div>

                  {isAdminLoggedIn && (
                    <button
                      onClick={() => setEditingService(service)}
                      title="Editar datos del servicio"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#1D1D1F] hover:bg-white shadow-xs cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#E61E78]" />
                    </button>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D81B60]">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#86868B]">
                      <Clock className="w-3 h-3 text-[#E61E78]" />
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1D1D1F] leading-snug">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#6E6E73] line-clamp-2 leading-relaxed">
                    {service.shortDescription || service.fullDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#F4A6B8]/15 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#86868B] block font-medium">Inversión</span>
                  <span className="font-serif text-lg font-bold text-[#1D1D1F]">
                    ${service.price} <span className="text-xs font-normal text-[#86868B]">USD</span>
                  </span>
                </div>

                <button
                  onClick={() => bookDirectWhatsApp(service)}
                  title="Agendar este servicio"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#1D1D1F] to-[#2D2529] hover:from-[#E61E78] hover:to-[#F0789E] text-white text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature C: Interactive Visagism Quiz */}
      <VisagismQuiz onOpenBooking={onOpenBooking} />

      {/* Feature B: Studio Etiquette & Booking Policies */}
      <StudioPoliciesSection onOpenBooking={onOpenBooking} />

      {/* Feature D: Instagram Feed Showcase */}
      <InstagramFeedSection />

      {/* Interactive Reviews Section */}
      <ReviewsSection />

      {/* Luxury Call-to-Action Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#2A1720] via-[#3D1E2D] to-[#1D1D1F] text-white p-8 sm:p-14 border border-[#F4A6B8]/20 shadow-[0_24px_64px_rgba(230,30,120,0.18)] text-center space-y-6">
          <div className="relative max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFF0F5] text-[11px] font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5 text-[#ECC277]" />
              <span>Experiencia de Princesa</span>
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Vive la experiencia de consentirte en Manu Studio ♡
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Reserva tu cita hoy mismo o comunícate por WhatsApp para recibir asesoría personalizada.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] hover:shadow-[0_8px_24px_rgba(230,30,120,0.45)] font-bold text-xs uppercase tracking-wider text-white transition-all cursor-pointer active:scale-98"
              >
                ✨ Agendar Mi Cita en Línea
              </button>

              <button
                onClick={() => {
                  const text = encodeURIComponent('¡Hola Manu! Deseo agendar una cita en MANU STUDIO ✨');
                  window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {studioInfo.whatsappDisplay}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Service Modal if Admin triggers it */}
      {editingService && (
        <EditServiceModal
          isOpen={true}
          service={editingService}
          onClose={() => setEditingService(null)}
        />
      )}
    </div>
  );
};
