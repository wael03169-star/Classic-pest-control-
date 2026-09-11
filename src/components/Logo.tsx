import React, { useState } from 'react';
import officialLogoImg from '../assets/images/classic_official_logo_1789142832261.jpg';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  badgeOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
  badgeOnly = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimensions for the emblem/crest
  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const titleSizes = {
    sm: 'text-base font-extrabold tracking-wider',
    md: 'text-lg sm:text-xl font-black tracking-wider',
    lg: 'text-2xl sm:text-3xl font-black tracking-wider',
    xl: 'text-3xl sm:text-4xl font-black tracking-wider',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[10px] sm:text-[11px] tracking-widest',
    lg: 'text-xs tracking-[0.2em]',
    xl: 'text-sm tracking-[0.2em]',
  };

  const arabicSizes = {
    sm: 'text-[11px]',
    md: 'text-xs sm:text-sm font-bold',
    lg: 'text-base font-bold',
    xl: 'text-lg font-bold',
  };

  const isLight = variant === 'light';

  // If badgeOnly is requested, return the official emblem standalone
  if (badgeOnly) {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className={`relative rounded-2xl overflow-hidden p-1 ${isLight ? 'bg-white/10 ring-2 ring-[#D4AF37]/50' : 'bg-white shadow-md ring-1 ring-slate-200'} ${emblemSizes[size]}`}>
          <img
            src={officialLogoImg}
            alt="CLASSIC PEST CONTROL - كلاسيك لمكافحة الحشرات"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      {/* Official Emblem Badge */}
      <div className={`relative flex items-center justify-center shrink-0 ${emblemSizes[size]}`}>
        <div
          className={`w-full h-full rounded-2xl overflow-hidden p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
            isLight
              ? 'bg-white ring-2 ring-[#D4AF37] shadow-lg'
              : 'bg-white ring-2 ring-[#D4AF37]/80 shadow-md'
          }`}
        >
          {!imageError ? (
            <img
              src={officialLogoImg}
              alt="CLASSIC PEST CONTROL - شعار كلاسيك لمكافحة الحشرات"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback SVG Emblem in case image load fails */
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M50 4L15 18V48C15 70 30 89 50 96C70 89 85 70 85 48V18L50 4Z"
                fill="#0A192F"
                stroke="#D4AF37"
                strokeWidth="4"
              />
              <path
                d="M50 26C50 26 44 33 44 37C44 40.3 46.7 43 50 43C53.3 43 56 40.3 56 37C56 33 50 26 50 26Z"
                fill="#D4AF37"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-start justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-serif tracking-wider font-black ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-[#0A192F]'
            }`}
          >
            CLASSIC
          </span>
          <span className="text-[#D4AF37] font-black">•</span>
          <span
            className={`tracking-wide ${arabicSizes[size]} ${
              isLight ? 'text-[#D4AF37]' : 'text-[#0A192F]'
            }`}
          >
            كلاسيك
          </span>
        </div>

        {showSubtitle && (
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
            <span
              className={`font-sans font-extrabold uppercase ${subSizes[size]} ${
                isLight ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
              }`}
            >
              PEST CONTROL
            </span>
            <span className={`text-[10px] sm:text-[11px] font-medium ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
              | مكافحة آفات الصحة العامة
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

