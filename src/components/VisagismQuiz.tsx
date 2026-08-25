import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Sparkles, 
  Eye, 
  Crown, 
  Clock, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Heart,
  MessageCircle,
  Wand2
} from 'lucide-react';

interface VisagismQuizProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const VisagismQuiz: React.FC<VisagismQuizProps> = ({ onOpenBooking }) => {
  const { services, studioInfo } = useAdmin();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [goal, setGoal] = useState<'brows' | 'lashes' | 'both'>('lashes');
  const [featureShape, setFeatureShape] = useState<string>('rectas');
  const [lifestyle, setLifestyle] = useState<string>('rapido');

  const handleReset = () => {
    setStep(1);
    setGoal('lashes');
    setFeatureShape('rectas');
    setLifestyle('rapido');
  };

  // Recommendation logic
  const getRecommendation = () => {
    if (goal === 'brows') {
      if (lifestyle === 'rapido' || featureShape === 'rebeldes') {
        const found = services.find((s) => s.name.toLowerCase().includes('laminado')) || services[0];
        return {
          service: found,
          title: 'Laminado Orgánico de Cejas + Visagismo',
          reason: 'Ideal para ordenar tus cejas, darles un efecto óptico de mayor densidad y olvidarte de peinarlas cada mañana.',
          vibe: 'Cejas peinadas, definidas y orgánicas'
        };
      } else {
        const found = services.find((s) => s.category === 'micropigmentation' || s.name.toLowerCase().includes('diseño') || s.name.toLowerCase().includes('henna')) || services[0];
        return {
          service: found,
          title: 'Diseño Personalizado con Tinte & Visagismo',
          reason: 'Enmarca tu rostro con armonía matemática resaltando tus facciones naturales de manera sofisticada.',
          vibe: 'Definición impecable de larga duración'
        };
      }
    } else if (goal === 'lashes') {
      if (lifestyle === 'rapido' || featureShape === 'natural') {
        const found = services.find((s) => s.name.toLowerCase().includes('lifting')) || services[0];
        return {
          service: found,
          title: 'Lifting de Pestañas con Queratina & Tinte',
          reason: 'Eleva tus pestañas naturales desde la raíz creando un efecto rímel curvado y radiante sin mantenimiento complejo.',
          vibe: 'Mirada despierta, abierta y 100% natural'
        };
      } else {
        const found = services.find((s) => s.name.toLowerCase().includes('volumen') || s.name.toLowerCase().includes('extensiones')) || services[0];
        return {
          service: found,
          title: 'Extensiones de Pestañas Efecto Seda',
          reason: 'Volumen y longitud diseñados pelo a pelo para una mirada de impacto y glamour sin necesidad de máscara.',
          vibe: 'Glamour, densidad y sofisticación continua'
        };
      }
    } else {
      // Both
      const found = services.find((s) => s.popular) || services[0];
      return {
        service: found,
        title: 'Combo Integral: Mirada de Princesa (Cejas + Pestañas)',
        reason: 'La combinación perfecta para transformar tu mirada por completo con armonía total en un solo día.',
        vibe: 'Transformación total & máxima armonía'
      };
    }
  };

  const rec = getRecommendation();

  const handleWhatsAppRecommendation = () => {
    const message = encodeURIComponent(
      `¡Hola Manu! Hice el test de visagismo en tu web y me recomendó el servicio de *${rec.service.name}* ($${rec.service.price} USD). ¿Cuándo tienes espacio disponible para atenderte? ✨`
    );
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-b from-white via-[#FFFDFE] to-[#FFF8F0] border-2 border-[#E6C894] p-6 sm:p-10 shadow-[0_16px_48px_rgba(230,30,120,0.12)] space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF0F5] border border-[#F4A6B8]/40 text-[#E61E78] text-[11px] font-bold tracking-wide">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Asistente de Visagismo & Estilo</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            Descubre Tu Diseño Ideal en 3 Pasos
          </h2>

          <p className="text-xs sm:text-sm text-[#6E6E73] max-w-lg mx-auto">
            Responde estas preguntas rápidas y te recomendaremos el procedimiento perfecto según tus facciones y rutina.
          </p>

          {/* Step Progress Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-10 bg-[#E61E78]'
                    : step > s
                    ? 'w-6 bg-[#34C759]'
                    : 'w-4 bg-black/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-lg font-bold text-center text-[#1D1D1F]">
              1. ¿Qué zona de tu mirada deseas potenciar?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'lashes', label: 'Pestañas de Ensueño', desc: 'Curvatura, volumen y longitud', icon: Eye },
                { id: 'brows', label: 'Cejas Definidas & Armónicas', desc: 'Visagismo, orden y densidad', icon: Sparkles },
                { id: 'both', label: 'Mirada Completa (Ambas)', desc: 'Transformación integral de princesa', icon: Crown }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = goal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id as any)}
                    className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-[#FFF0F5] border-[#E61E78] shadow-md scale-102'
                        : 'bg-white border-[#F4A6B8]/30 hover:border-[#E6C894] hover:bg-[#FAF7F6]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#F4A6B8]/40 text-[#E61E78] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#1D1D1F] block">{opt.label}</span>
                      <span className="text-xs text-[#86868B]">{opt.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl bg-[#E61E78] hover:bg-[#D81B60] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Feature Characteristic */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-lg font-bold text-center text-[#1D1D1F]">
              2. ¿Cómo describirías tu característica principal?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'rectas', label: 'Rectas / Rebeldes', desc: 'Cuestan mantener peinadas o con curva hacia arriba' },
                { id: 'finas', label: 'Finas o con Espacios', desc: 'Busco mayor sensación de volumen o relleno óptico' },
                { id: 'natural', label: 'Normales / Busco Realce', desc: 'Deseo destacar lo natural sin sobrecargar' }
              ].map((opt) => {
                const isSelected = featureShape === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFeatureShape(opt.id)}
                    className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#FFF0F5] border-[#E61E78] shadow-md scale-102'
                        : 'bg-white border-[#F4A6B8]/30 hover:border-[#E6C894] hover:bg-[#FAF7F6]'
                    }`}
                  >
                    <span className="font-bold text-sm text-[#1D1D1F] block">{opt.label}</span>
                    <span className="text-xs text-[#86868B] block">{opt.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                ← Volver
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl bg-[#E61E78] hover:bg-[#D81B60] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Lifestyle & Routine */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-lg font-bold text-center text-[#1D1D1F]">
              3. ¿Cuál es tu rutina matutina ideal?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'rapido', label: 'Efecto "Despertar Lista"', desc: 'Ahorrar tiempo por las mañanas y lucir arreglada al instante' },
                { id: 'glam', label: 'Impacto & Glamour', desc: 'Me encanta el volumen notable y la mirada llamativa' },
                { id: 'no-makeup', label: 'Sutil "No-Makeup"', desc: 'Realce limpio, pulido e imperceptible' }
              ].map((opt) => {
                const isSelected = lifestyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLifestyle(opt.id)}
                    className={`p-5 rounded-2xl text-left border-2 transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#FFF0F5] border-[#E61E78] shadow-md scale-102'
                        : 'bg-white border-[#F4A6B8]/30 hover:border-[#E6C894] hover:bg-[#FAF7F6]'
                    }`}
                  >
                    <span className="font-bold text-sm text-[#1D1D1F] block">{opt.label}</span>
                    <span className="text-xs text-[#86868B] block">{opt.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-black/10 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                ← Volver
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] text-white font-bold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Mi Resultado Personalizado</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result & Match Card */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E6C894] shadow-lg space-y-5">
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-[#FAF7F6] border border-[#F4A6B8]/40 shrink-0 shadow-sm">
                  <img
                    src={rec.service.image}
                    alt={rec.service.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] text-[#E61E78] text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tu Match Perfecto</span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1D1D1F]">
                    {rec.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                    {rec.reason}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-[#1D1D1F]">
                      <Clock className="w-3.5 h-3.5 text-[#E61E78]" />
                      {rec.service.duration} aprox.
                    </span>
                    <span className="font-serif font-bold text-base text-[#1D1D1F]">
                      ${rec.service.price} <span className="text-xs font-normal text-[#86868B]">USD</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#F4A6B8]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir Asistente</span>
                </button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(rec.service.id)}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-[#1D1D1F] hover:bg-black text-white font-bold text-xs shadow-sm hover:scale-102 transition-all cursor-pointer"
                  >
                    Agendar Cita en Línea
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppRecommendation}
                    className="p-3 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white transition-colors cursor-pointer shadow-sm"
                    title="Agendar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
