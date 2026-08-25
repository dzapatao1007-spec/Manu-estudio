import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'image';
  className?: string;
  showHeart?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showHeart = true
}) => {
  const sizeMap = {
    sm: {
      container: 'h-10',
      mLetter: 'text-2xl',
      manuText: 'text-lg -mt-3.5',
      studioText: 'text-[9px] tracking-[0.3em]',
      imgSize: 'w-10 h-10',
      heartSize: 'w-2.5 h-2.5'
    },
    md: {
      container: 'h-14',
      mLetter: 'text-4xl',
      manuText: 'text-2xl -mt-5',
      studioText: 'text-[11px] tracking-[0.35em]',
      imgSize: 'w-14 h-14',
      heartSize: 'w-3 h-3'
    },
    lg: {
      container: 'h-24',
      mLetter: 'text-6xl',
      manuText: 'text-4xl -mt-8',
      studioText: 'text-xs tracking-[0.4em]',
      imgSize: 'w-24 h-24',
      heartSize: 'w-4 h-4'
    },
    xl: {
      container: 'h-36',
      mLetter: 'text-8xl',
      manuText: 'text-6xl -mt-12',
      studioText: 'text-sm tracking-[0.5em]',
      imgSize: 'w-36 h-36',
      heartSize: 'w-5 h-5'
    }
  };

  const currentSize = sizeMap[size];

  if (variant === 'image') {
    return (
      <div className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-xs border border-[#F2D7DE]/60 ${className}`}>
        <img
          src="/src/assets/images/manu_studio_logo_1787346105356.jpg"
          alt="MANU STUDIO Logo"
          className={`${currentSize.imgSize} object-contain rounded-2xl`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none text-center ${currentSize.container} ${className}`}>
      {/* Background soft pink letter M */}
      <div className="relative flex items-center justify-center">
        <span
          className={`font-serif font-bold text-[#F3CAD4] leading-none ${currentSize.mLetter} tracking-tight opacity-90 transition-transform duration-300 group-hover:scale-105`}
          style={{ textShadow: '0 2px 10px rgba(243, 202, 212, 0.4)' }}
        >
          M
        </span>
        {/* Overlay cursive gold script "Manu" */}
        <span
          className={`absolute font-script gold-gradient-text font-normal ${currentSize.manuText} z-10 drop-shadow-xs`}
          style={{ transform: 'rotate(-4deg)' }}
        >
          Manu
        </span>
      </div>

      {/* STUDIO text with flanking gold lines */}
      <div className="flex items-center justify-center gap-2 mt-0.5 z-10 w-full">
        <div className="h-[1px] w-4 sm:w-6 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/80" />
        <span className={`font-serif uppercase font-medium text-[#C5A059] ${currentSize.studioText}`}>
          STUDIO
        </span>
        <div className="h-[1px] w-4 sm:w-6 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/80" />
      </div>

      {/* Delicate Golden Heart */}
      {showHeart && (
        <div className="mt-1 flex items-center justify-center">
          <svg
            className={`${currentSize.heartSize} text-[#C5A059] fill-none stroke-current stroke-[1.5] transition-transform duration-300 group-hover:scale-110`}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      )}
    </div>
  );
};
