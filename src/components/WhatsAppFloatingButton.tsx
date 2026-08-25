import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface WhatsAppFloatingButtonProps {
  onOpenBooking: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenBooking }) => {
  const { studioInfo, about } = useAdmin();
  const [showTooltip, setShowTooltip] = useState(true);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const openWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText || '¡Hola Manu! Vengo de tu sitio web y deseo agendar una cita o consultar disponibilidad ✨'
    );
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
    setShowQuickMenu(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      
      {/* Quick Menu Popover */}
      {showQuickMenu && (
        <div className="w-72 bg-gradient-to-b from-white to-[#FFFDFE] rounded-3xl border-2 border-[#E6C894] shadow-2xl p-4 space-y-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-[#F2D7DE] pb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#E6C894] p-0.5 bg-white">
                <img
                  src={about.portraitImage || "/src/assets/images/manu_portrait_1787346154541.jpg"}
                  alt="Manu"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2A1720]">Manu Studio Direct</p>
                <span className="text-[10px] text-[#128C7E] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  En línea para atenderte
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowQuickMenu(false)}
              className="text-[#7E5F6D] hover:text-[#E61E78] text-xs p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#543743]">
            ¡Hola princesa! 🌸 ¿En qué podemos consentirte hoy?
          </p>

          <div className="space-y-1.5">
            <button
              id="wa-quick-disponibilidad"
              onClick={() => openWhatsApp('¡Hola Manu! Deseo consultar disponibilidad para esta semana ✨')}
              className="w-full text-left p-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EE] text-xs font-bold text-[#8F6317] border border-[#F2D7DE] transition-colors flex items-center justify-between"
            >
              <span>📅 Consultar disponibilidad</span>
              <span className="text-[10px] text-[#E61E78]">›</span>
            </button>
            <button
              id="wa-quick-lifting"
              onClick={() => openWhatsApp('¡Hola Manu! Me interesa agendar el Lifting de Pestañas + Laminado de Cejas ✨')}
              className="w-full text-left p-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EE] text-xs font-bold text-[#8F6317] border border-[#F2D7DE] transition-colors flex items-center justify-between"
            >
              <span>👑 Combo Lifting + Laminado VIP</span>
              <span className="text-[10px] text-[#E61E78]">›</span>
            </button>
            <button
              id="wa-quick-pestanas"
              onClick={() => openWhatsApp('¡Hola Manu! Quisiera cotizar extensiones de pestañas pelo a pelo ✨')}
              className="w-full text-left p-2.5 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EE] text-xs font-bold text-[#8F6317] border border-[#F2D7DE] transition-colors flex items-center justify-between"
            >
              <span>👁️ Pestañas pelo a pelo Haute</span>
              <span className="text-[10px] text-[#E61E78]">›</span>
            </button>
          </div>

          <button
            onClick={() => {
              setShowQuickMenu(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#E61E78] to-[#F0789E] text-white text-xs font-bold uppercase tracking-wider text-center block hover:opacity-95 shadow-md"
          >
            Abrir Formulario de Cita
          </button>
        </div>
      )}

      {/* Persistent Animated Floating WhatsApp Button */}
      <div className="relative group flex items-center">
        
        {/* Helper Tooltip */}
        {showTooltip && !showQuickMenu && (
          <div className="hidden sm:flex items-center gap-2 mr-3 px-4 py-2.5 rounded-full bg-white border-2 border-[#E6C894] shadow-xl text-xs text-[#2A1720] font-bold backdrop-blur-md animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>¿Agendamos tu cita con Manu?</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-[#7E5F6D] hover:text-[#E61E78] ml-1 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        <button
          id="floating-whatsapp-main-btn"
          onClick={() => setShowQuickMenu(!showQuickMenu)}
          aria-label="Abrir WhatsApp directo con Manu Studio"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10" />
          
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white/20" />

          {/* Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E61E78] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            1
          </span>
        </button>
      </div>

    </div>
  );
};
