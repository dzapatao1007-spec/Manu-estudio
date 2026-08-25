import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { MessageCircle, Instagram, Mail, Heart, Sparkles, ShieldCheck, Lock, Check, Crown } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'services' | 'about' | 'gallery' | 'faq') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenBooking }) => {
  const { studioInfo, setShowLoginModal, isAdminLoggedIn, logout } = useAdmin();

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola Manu! Vengo de tu sitio web y deseo agendar una cita en MANU STUDIO ✨');
    window.open(`https://wa.me/${studioInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  const currentLogo = studioInfo.logo || '/src/assets/images/manu_studio_official_logo_1787618363052.jpg';

  return (
    <footer className="bg-white/90 backdrop-blur-xl border-t border-[#F4A6B8]/30 pt-14 pb-10 text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-[#F4A6B8]/20">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(244,166,184,0.35)] border border-[#F4A6B8]/40 bg-[#FFF0F5]">
                <img
                  src={currentLogo}
                  alt="Manu Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#1D1D1F] tracking-tight block">
                  {studioInfo.name}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#E61E78] uppercase block font-bold">
                  Haute Couture ♡
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed max-w-md">
              Estudio boutique dedicado al visagismo anatómico, diseño de cejas y extensiones de pestañas pelo a pelo. Realzamos tu belleza natural con sutileza, confort y ese toque especial de princesa que te hace brillar.
            </p>

            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={`https://wa.me/${studioInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Manu Studio"
                className="w-9 h-9 rounded-xl bg-[#FAF8F7] hover:bg-[#F4FAF6] border border-black/[0.06] hover:border-[#25D366]/40 flex items-center justify-center text-[#25D366] transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Manu Studio"
                className="w-9 h-9 rounded-xl bg-[#FFF0F5] hover:bg-[#FCE8EE] border border-[#F4A6B8]/30 hover:border-[#E61E78]/50 flex items-center justify-center text-[#E61E78] transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${studioInfo.email}`}
                aria-label="Email Manu Studio"
                className="w-9 h-9 rounded-xl bg-[#FAF8F7] hover:bg-[#FFF8F0] border border-black/[0.06] hover:border-[#C5A059]/40 flex items-center justify-center text-[#1D1D1F] transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] block">
              Navegación
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#6E6E73] hover:text-[#E61E78] transition-colors cursor-pointer"
                >
                  • Sobre Mí (Historia de Manuela)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#6E6E73] hover:text-[#E61E78] transition-colors cursor-pointer"
                >
                  • Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#6E6E73] hover:text-[#E61E78] transition-colors cursor-pointer"
                >
                  • Servicios & Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#6E6E73] hover:text-[#E61E78] transition-colors cursor-pointer"
                >
                  • Antes & Después (Galería)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#6E6E73] hover:text-[#E61E78] transition-colors cursor-pointer"
                >
                  • Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Services List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F] block">
              Tratamientos Destacados
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6E6E73]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Diseño de Cejas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Laminado de Cejas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Lifting de Pestañas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Pestañas Pelo a Pelo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Powder Brows</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E78]" />
                <span>Latín Brows</span>
              </li>
            </ul>

            <div className="pt-3">
              <button
                id="footer-whatsapp-cta-btn"
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#E61E78] to-[#F0789E] hover:from-[#D81B60] hover:to-[#E61E78] shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Escribir directamente a Manu por WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Distinct Admin Access */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
          <p>
            © {new Date().getFullYear()} <strong className="text-[#1D1D1F]">MANU STUDIO</strong>. Todos los derechos reservados.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 text-[#34C759] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bioseguridad Certificada
            </span>
            
            <span>•</span>

            {/* Admin Access Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[#34C759] font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Modo Admin Activo
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[11px] transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                id="footer-admin-login-btn"
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-[#FCE8EE] border border-[#F4A6B8]/40 text-[#E61E78] font-bold text-xs shadow-2xs hover:scale-105 transition-all cursor-pointer"
                title="Acceso de Administración"
              >
                <Crown className="w-3.5 h-3.5 text-[#E61E78]" />
                <span>👑 Acceso Admin</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
