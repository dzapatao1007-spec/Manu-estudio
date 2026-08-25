import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Sparkles, Gift, Tag, X, ChevronRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenBooking?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenBooking }) => {
  const { studioInfo } = useAdmin();
  const [dismissed, setDismissed] = useState(false);

  if (!studioInfo.promoActive || dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#2A1720] via-[#E61E78] to-[#2A1720] text-white py-2 px-4 shadow-md overflow-hidden z-40 border-b border-[#E6C894]/40">
      {/* Subtle glowing animated sparkle effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          {studioInfo.promoBadge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#E61E78] font-black text-[10px] tracking-wider uppercase shadow-xs">
              <Gift className="w-3 h-3 text-[#E61E78]" />
              {studioInfo.promoBadge}
            </span>
          )}

          <p className="font-medium tracking-wide text-white/95 text-xs sm:text-sm">
            {studioInfo.promoText}
          </p>

          {studioInfo.promoCode && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#2A1720]/70 border border-[#E6C894] text-[#ECC277] font-mono font-bold text-[11px] uppercase tracking-wider">
              <Tag className="w-2.5 h-2.5" />
              CÓDIGO: {studioInfo.promoCode}
            </span>
          )}

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1 underline font-bold hover:text-[#ECC277] transition-colors cursor-pointer text-xs"
            >
              <span>Reservar Ahora</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0"
          title="Cerrar aviso promocional"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
