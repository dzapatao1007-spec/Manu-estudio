import React from 'react';

interface RoyalPrincessEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showBanner?: boolean;
  bannerText?: string;
  className?: string;
  variant?: 'frame1_crown_bow' | 'frame2_wreath_butterfly' | 'frame3_royal_crest' | 'frame4_oval_mirror' | 'frame5_scalloped';
}

export const RoyalPrincessEmblem: React.FC<RoyalPrincessEmblemProps> = ({
  size = 'md',
  showBanner = true,
  bannerText = 'NUESTROS SERVICIOS',
  className = '',
  variant = 'frame1_crown_bow'
}) => {
  const sizeConfig = {
    sm: {
      outer: 'w-24 h-24',
      mLetter: 'text-3xl',
      manu: 'text-xl -mt-4',
      studio: 'text-[8px] tracking-[0.25em]',
      crown: 'w-8 h-6 -top-4',
      bow: 'w-10 h-7 -bottom-3.5',
      bannerWrap: 'mt-2 scale-75'
    },
    md: {
      outer: 'w-40 h-40',
      mLetter: 'text-5xl',
      manu: 'text-3xl -mt-6',
      studio: 'text-[10px] tracking-[0.3em]',
      crown: 'w-12 h-9 -top-6',
      bow: 'w-14 h-10 -bottom-5',
      bannerWrap: 'mt-3 scale-90'
    },
    lg: {
      outer: 'w-56 h-56',
      mLetter: 'text-7xl',
      manu: 'text-5xl -mt-9',
      studio: 'text-xs tracking-[0.35em]',
      crown: 'w-16 h-12 -top-8',
      bow: 'w-20 h-14 -bottom-7',
      bannerWrap: 'mt-4 scale-100'
    },
    xl: {
      outer: 'w-72 h-72',
      mLetter: 'text-8xl',
      manu: 'text-6xl -mt-12',
      studio: 'text-sm tracking-[0.4em]',
      crown: 'w-20 h-16 -top-10',
      bow: 'w-24 h-16 -bottom-8',
      bannerWrap: 'mt-5 scale-110'
    },
    hero: {
      outer: 'w-80 sm:w-96 h-80 sm:h-96',
      mLetter: 'text-8xl sm:text-9xl',
      manu: 'text-6xl sm:text-7xl -mt-12 sm:-mt-14',
      studio: 'text-xs sm:text-sm tracking-[0.45em]',
      crown: 'w-24 h-18 -top-12',
      bow: 'w-28 h-18 -bottom-9',
      bannerWrap: 'mt-6 scale-110 sm:scale-125'
    }
  };

  const current = sizeConfig[size];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Princess Frame Container */}
      <div className={`relative flex items-center justify-center ${current.outer}`}>
        
        {/* Glow & Sparkle Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FCE8EE] via-[#FCE1D4] to-[#FFF0E8] opacity-70 blur-xl animate-pulse" />

        {/* Ornate Golden Baroque Ring Border */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#E6C894] shadow-[0_0_25px_rgba(230,200,148,0.45),inset_0_0_15px_rgba(252,232,238,0.8)] bg-gradient-to-b from-[#FFFDFE] via-[#FCF8F9] to-[#FDF4F6]">
          {/* Inner Pearl Beaded Ring */}
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#DCAE9E]/60 pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-[#F9BDD0]/40 pointer-events-none" />
        </div>

        {/* Royal Golden Princess Crown (Top) */}
        <div className={`absolute ${current.crown} z-20 flex items-center justify-center drop-shadow-md`}>
          <svg viewBox="0 0 100 70" className="w-full h-full">
            <defs>
              <linearGradient id="goldGradCrown" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D0" />
                <stop offset="30%" stopColor="#ECC277" />
                <stop offset="70%" stopColor="#C9983E" />
                <stop offset="100%" stopColor="#8F6317" />
              </linearGradient>
              <linearGradient id="pinkGemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9EC2" />
                <stop offset="50%" stopColor="#E61E78" />
                <stop offset="100%" stopColor="#A30E4E" />
              </linearGradient>
            </defs>
            {/* Crown Base */}
            <path
              d="M15,55 Q50,62 85,55 L88,50 Q50,56 12,50 Z"
              fill="url(#goldGradCrown)"
              stroke="#B38029"
              strokeWidth="1.5"
            />
            {/* Crown Spikes & Filigree */}
            <path
              d="M15,50 L20,30 Q28,42 35,38 L50,14 L65,38 Q72,42 80,30 L85,50 Q50,58 15,50 Z"
              fill="url(#goldGradCrown)"
              stroke="#B38029"
              strokeWidth="1.5"
            />
            {/* Center Heart Ruby Gem */}
            <path
              d="M50,28 C47,23 42,24 42,28 C42,33 50,39 50,39 C50,39 58,33 58,28 C58,24 53,23 50,28 Z"
              fill="url(#pinkGemGrad)"
              stroke="#FFF"
              strokeWidth="1"
            />
            {/* Side Pearls */}
            <circle cx="20" cy="28" r="3.5" fill="#FFF8F0" stroke="#C9983E" strokeWidth="1" />
            <circle cx="50" cy="12" r="4.5" fill="#FFF8F0" stroke="#ECC277" strokeWidth="1" />
            <circle cx="80" cy="28" r="3.5" fill="#FFF8F0" stroke="#C9983E" strokeWidth="1" />
          </svg>
        </div>

        {/* Brand Monogram Center */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Stylized Pink Seraphic M */}
          <span
            className={`font-serif font-bold text-[#F8CAD8] select-none leading-none ${current.mLetter}`}
            style={{
              textShadow: '0 4px 18px rgba(248, 202, 216, 0.7), 0 1px 2px rgba(255,255,255,0.9)'
            }}
          >
            M
          </span>

          {/* Golden Elegant Cursive Script "Manu" */}
          <span
            className={`absolute font-script font-normal ${current.manu} z-10`}
            style={{
              background: 'linear-gradient(135deg, #A87928 0%, #D4AF37 35%, #FBF0B9 55%, #C59B27 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(168, 121, 40, 0.35))',
              transform: 'rotate(-4deg)'
            }}
          >
            Manu
          </span>

          {/* Spaced Serif STUDIO with Golden Flanking Rules */}
          <div className="flex items-center justify-center gap-1.5 mt-1 z-10">
            <div className="h-[1px] w-3 sm:w-5 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
            <span
              className={`font-serif uppercase font-semibold text-[#B88938] ${current.studio}`}
              style={{ letterSpacing: '0.35em' }}
            >
              STUDIO
            </span>
            <div className="h-[1px] w-3 sm:w-5 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
          </div>

          {/* Delicate Gold Heart ♡ */}
          <div className="mt-0.5 flex items-center justify-center">
            <span className="text-[#C5A059] text-xs sm:text-sm font-serif">♡</span>
          </div>
        </div>

        {/* Pink Satin Ribbon Bow (Bottom of Frame) */}
        <div className={`absolute ${current.bow} z-20 flex items-center justify-center drop-shadow-md`}>
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <defs>
              <linearGradient id="pinkRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="35%" stopColor="#F9BDD0" />
                <stop offset="70%" stopColor="#F0789E" />
                <stop offset="100%" stopColor="#D85A82" />
              </linearGradient>
              <linearGradient id="bowGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCE0A6" />
                <stop offset="100%" stopColor="#B38029" />
              </linearGradient>
            </defs>
            {/* Left Bow Loop */}
            <path
              d="M45,26 C30,12 10,18 12,32 C14,44 32,36 45,30 Z"
              fill="url(#pinkRibbonGrad)"
              stroke="url(#bowGoldBorder)"
              strokeWidth="1.2"
            />
            {/* Right Bow Loop */}
            <path
              d="M55,26 C70,12 90,18 88,32 C86,44 68,36 55,30 Z"
              fill="url(#pinkRibbonGrad)"
              stroke="url(#bowGoldBorder)"
              strokeWidth="1.2"
            />
            {/* Left Ribbon Tail */}
            <path
              d="M44,32 Q32,48 24,56 L34,54 Q42,46 47,34 Z"
              fill="url(#pinkRibbonGrad)"
              stroke="url(#bowGoldBorder)"
              strokeWidth="1"
            />
            {/* Right Ribbon Tail */}
            <path
              d="M56,32 Q68,48 76,56 L66,54 Q58,46 53,34 Z"
              fill="url(#pinkRibbonGrad)"
              stroke="url(#bowGoldBorder)"
              strokeWidth="1"
            />
            {/* Center Knot with Pearl Heart */}
            <circle cx="50" cy="28" r="6" fill="#FFFFFF" stroke="#ECC277" strokeWidth="1.5" />
            <circle cx="50" cy="28" r="3.5" fill="#F0789E" />
          </svg>
        </div>

      </div>

      {/* Ribbon Scroll Banner (e.g. "NUESTROS SERVICIOS") */}
      {showBanner && (
        <div className={`relative ${current.bannerWrap} z-30 flex flex-col items-center`}>
          <div className="relative inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-[#FCE8EE] via-[#FAD5E0] to-[#FCE8EE] border border-[#E6C894] shadow-[0_4px_16px_rgba(230,200,148,0.35)]">
            {/* Banner Left Notch Trim */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#DCAE9E] rounded-l-xs border-y border-l border-[#B38029]/50" />
            {/* Banner Right Notch Trim */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#DCAE9E] rounded-r-xs border-y border-r border-[#B38029]/50" />
            
            {/* Banner Text */}
            <span className="font-serif uppercase text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#8F6317]">
              {bannerText}
            </span>
          </div>

          {/* Heart Accent Below Banner */}
          <div className="mt-1 text-[#C5A059] text-xs font-serif">♡</div>
        </div>
      )}

    </div>
  );
};
