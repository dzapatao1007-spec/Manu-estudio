import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Menu, X, Crown, Heart, Lock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { EditableImage } from './EditableImage';

interface NavbarProps {
  activeTab: 'home' | 'services' | 'about' | 'gallery' | 'faq';
  onSelectTab: (tab: 'home' | 'services' | 'about' | 'gallery' | 'faq') => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenBooking
}) => {
  const { studioInfo, updateStudioInfo, isAdminLoggedIn, setShowLoginModal } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'home', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'gallery', label: 'Antes & Después' },
    { id: 'faq', label: 'Preguntas' }
  ] as const;

  const handleNavClick = (tab: 'home' | 'services' | 'about' | 'gallery' | 'faq') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLogo = studioInfo.logo || '/src/assets/images/manu_studio_official_logo_1787618363052.jpg';

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 pt-3 transition-all duration-300">
      {/* Liquid Glass Navigation Bar with Soft Pink Touches */}
      <nav
        className={`max-w-7xl mx-auto rounded-3xl transition-all duration-400 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-2xl border border-[#F4A6B8]/30 shadow-[0_12px_40px_rgba(244,166,184,0.15),0_1px_2px_rgba(0,0,0,0.04)] py-2.5 px-4 sm:px-6'
            : 'bg-white/75 backdrop-blur-xl border border-[#F4A6B8]/20 shadow-[0_4px_24px_rgba(244,166,184,0.08)] py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              id="navbar-brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left transition-transform active:scale-98 cursor-pointer"
            >
              {/* Official Brand Logo */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(244,166,184,0.4)] border border-[#F4A6B8]/40 shrink-0 bg-[#FFF0F5]">
                <img
                  src={currentLogo}
                  alt="Manu Studio Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#1D1D1F] leading-none">
                    {studioInfo.name || 'MANU STUDIO'}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#E61E78] fill-[#E61E78]/30" />
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#E61E78] uppercase block font-bold mt-0.5">
                  Haute Couture ♡
                </span>
              </div>
            </button>

            {/* If Admin is logged in, show logo changer directly */}
            {isAdminLoggedIn && (
              <div className="hidden xl:block ml-1">
                <EditableImage
                  src={currentLogo}
                  alt="Logo Manu Studio"
                  label="Logo Oficial"
                  onSave={async (newUrl) => {
                    await updateStudioInfo({ logo: newUrl });
                  }}
                  className="hidden"
                  containerClassName="inline-block"
                />
              </div>
            )}
          </div>

          {/* Segmented Nav Pill (Center) */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-[#FFF0F5] backdrop-blur-md border border-[#F4A6B8]/30 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-[#E61E78] bg-white shadow-[0_2px_12px_rgba(230,30,120,0.15)] font-extrabold scale-100'
                      : 'text-[#6E6E73] hover:text-[#E61E78] hover:bg-white/40'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs (Right) - Clean & Singular CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Admin Access Button if not logged in */}
            {!isAdminLoggedIn && (
              <button
                id="navbar-admin-login-top-btn"
                onClick={() => setShowLoginModal(true)}
                title="Acceso Administradora"
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold text-[#86868B] hover:text-[#E61E78] bg-black/[0.03] hover:bg-[#FFF0F5] border border-transparent hover:border-[#F4A6B8]/40 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#E61E78]" />
                <span className="hidden xl:inline">Admin</span>
              </button>
            )}

            {/* Single Unified Action CTA: Book Appointment */}
            <button
              id="navbar-book-appointment-btn"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#E61E78] via-[#F0789E] to-[#E61E78] hover:shadow-[0_6px_20px_rgba(230,30,120,0.35)] transition-all duration-300 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFF0F5]" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {!isAdminLoggedIn && (
              <button
                onClick={() => setShowLoginModal(true)}
                title="Admin"
                className="p-2.5 rounded-2xl bg-[#FFF0F5] border border-[#F4A6B8]/40 text-[#E61E78] shadow-xs active:scale-95"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
            <button
              id="navbar-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white/80 border border-[#F4A6B8]/30 text-[#1D1D1F] hover:bg-white shadow-xs active:scale-95 transition-colors"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E61E78]" /> : <Menu className="w-5 h-5 text-[#E61E78]" />}
            </button>
          </div>
        </div>

        {/* Mobile Liquid Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#F4A6B8]/20 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#FFF0F5]">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                      isActive
                        ? 'bg-white text-[#E61E78] shadow-xs'
                        : 'text-[#6E6E73] hover:text-[#E61E78]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                id="mobile-book-cta-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#E61E78] to-[#F0789E] active:scale-98 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Agendar Mi Cita</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
