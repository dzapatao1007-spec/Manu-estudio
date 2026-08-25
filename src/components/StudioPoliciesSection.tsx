import React from 'react';
import { Clock, Sparkles, ShieldCheck, Heart, CalendarCheck, Ban, CheckCircle2, Crown } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface StudioPoliciesSectionProps {
  onOpenBooking?: () => void;
}

export const StudioPoliciesSection: React.FC<StudioPoliciesSectionProps> = ({ onOpenBooking }) => {
  const { studioInfo } = useAdmin();

  const policies = [
    {
      icon: Clock,
      title: 'Puntualidad & Tolerancia',
      desc: 'Contamos con una tolerancia máxima de 10 a 15 minutos. Llegar a tiempo garantiza que podamos realizar tu visagismo con la calma, precisión y perfección que mereces.',
      highlight: '10–15 min de tolerancia'
    },
    {
      icon: Ban,
      title: 'Preparación de Ojos & Cejas',
      desc: 'Te recomendamos asistir con tus ojos y cejas 100% limpios, sin maquillaje, sin máscara de pestañas (rímel) y sin restos de aceites para una adhesión óptima y duradera.',
      highlight: 'Sin maquillaje en la zona'
    },
    {
      icon: CalendarCheck,
      title: 'Reserva & Abono de Cita',
      desc: 'Para reservar tu espacio exclusivo y asegurar tu fecha en agenda, se requiere un anticipo/abono previo que se descuenta del valor total de tu servicio el día de tu cita.',
      highlight: 'Abono aplicable al total'
    },
    {
      icon: ShieldCheck,
      title: 'Higiene e Insumos Certificados',
      desc: 'Trabajamos con insumos médicos hipoalergénicos de la más alta gama, materiales desechables por clienta y rigurosos protocolos de desinfección en cada procedimiento.',
      highlight: '100% esterilizado e inocuo'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border-2 border-[#F4A6B8]/30 p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(244,166,184,0.12)] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F4A6B8]/20 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/40 text-[#E61E78] text-[11px] font-bold tracking-wide">
              <Crown className="w-3.5 h-3.5" />
              <span>Experiencia & Etiqueta de Citas</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Políticas de Reserva & Asistencia
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6E73] max-w-xl">
              Diseñamos cada espacio con dedicación exclusiva. Conoce nuestras pautas para una experiencia impecable.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#E61E78] bg-[#FFF0F5] px-4 py-2 rounded-2xl border border-[#F4A6B8]/30 shrink-0">
            <Heart className="w-4 h-4 fill-[#E61E78]/30" />
            <span>Garantía de Satisfacción 48h</span>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF7F6] border border-[#F4A6B8]/30 space-y-3 hover:bg-white hover:border-[#E61E78]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#F4A6B8]/40 text-[#E61E78] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1D1D1F]">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F4A6B8]/20 flex items-center gap-1.5 text-[11px] font-bold text-[#D81B60]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
                  <span>{p.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F5] via-white to-[#FFF0F5] border border-[#F4A6B8]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#7E5F6D]">
            <Sparkles className="w-4 h-4 text-[#E61E78] shrink-0" />
            <span>
              ¿Tienes alguna duda médica o consulta de visagismo antes de agendar? Escríbenos directamente.
            </span>
          </div>

          <a
            href={`https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent('¡Hola Manu! Tengo una consulta sobre las políticas de reserva ✨')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#E61E78] hover:underline whitespace-nowrap"
          >
            Consultar por WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
