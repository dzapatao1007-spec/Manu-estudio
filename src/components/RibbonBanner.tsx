import React from 'react';

interface RibbonBannerProps {
  text: string;
  subtitle?: string;
  className?: string;
  showCrown?: boolean;
  showHeart?: boolean;
}

export const RibbonBanner: React.FC<RibbonBannerProps> = ({
  text,
  subtitle,
  className = '',
  showCrown = false,
  showHeart = true
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center my-6 select-none ${className}`}>
      {/* Optional Top Crown */}
      {showCrown && (
        <div className="w-10 h-7 mb-2 text-[#C59B27] flex items-center justify-center drop-shadow-xs">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            <path
              d="M15,50 L20,30 Q28,42 35,38 L50,14 L65,38 Q72,42 80,30 L85,50 Q50,58 15,50 Z"
              fill="url(#goldGradRibbon)"
              stroke="#B38029"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="goldGradRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D0" />
                <stop offset="50%" stopColor="#ECC277" />
                <stop offset="100%" stopColor="#C9983E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Main Luxury Folded Satin Ribbon */}
      <div className="relative inline-flex items-center justify-center">
        {/* Left Ribbon Tail */}
        <div className="hidden sm:block absolute -left-8 top-1/2 -translate-y-1/2 w-9 h-10 bg-gradient-to-r from-[#F7CAD8] to-[#F2B5C8] border-y border-l border-[#D4AF37] transform -skew-y-6 shadow-xs -z-10 rounded-l-md" />
        
        {/* Center Ribbon Body */}
        <div className="relative z-10 px-8 py-3 rounded-lg bg-gradient-to-r from-[#FFF0F5] via-[#FCE8EE] to-[#FFF0F5] border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(212,175,55,0.22)]">
          <span className="font-serif uppercase text-sm sm:text-base md:text-lg font-bold tracking-[0.28em] text-[#845E1B] drop-shadow-xs">
            {text}
          </span>
        </div>

        {/* Right Ribbon Tail */}
        <div className="hidden sm:block absolute -right-8 top-1/2 -translate-y-1/2 w-9 h-10 bg-gradient-to-l from-[#F7CAD8] to-[#F2B5C8] border-y border-r border-[#D4AF37] transform skew-y-6 shadow-xs -z-10 rounded-r-md" />
      </div>

      {/* Optional Heart Detail */}
      {showHeart && (
        <div className="mt-1.5 text-[#C5A059] text-sm font-serif">♡</div>
      )}

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm font-medium text-[#7E5F6D] max-w-md">
          {subtitle}
        </p>
      )}
    </div>
  );
};
