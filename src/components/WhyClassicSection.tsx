import React from 'react';
import { Language } from '../types';
import { WHY_CLASSIC_ITEMS } from '../data/content';
import { 
  Settings, 
  Shield, 
  Users, 
  Layers, 
  CheckCircle2, 
  CalendarCheck, 
  MessageSquare, 
  HeartHandshake 
} from 'lucide-react';

interface WhyClassicSectionProps {
  lang: Language;
}

export const WhyClassicSection: React.FC<WhyClassicSectionProps> = ({ lang }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return <Settings className="w-6 h-6 text-[#D4AF37]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#D4AF37]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#D4AF37]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#D4AF37]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#D4AF37]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="why-classic-section" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A192F]/5 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'معايير العمل والالتزام' : 'Our Commitments'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'لماذا تختار CLASSIC؟' : 'Why Choose CLASSIC?'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'نهج مهني يقوم على دراسة الاحتياج الفعلي وتقديم حلول متوازنة تجمع بين الفعالية والسلامة.'
              : 'A dedicated professional framework grounded in assessing actual facility needs with balanced solutions.'}
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CLASSIC_ITEMS.map((item, index) => {
            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className="group p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:bg-white hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 text-start flex flex-col justify-between"
              >
                <div>
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-[#0A192F] flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#0A192F] mb-2 leading-snug">
                    {lang === 'ar' ? item.title : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {lang === 'ar' ? item.description : item.descriptionEn}
                  </p>
                </div>

                {/* Bottom Index */}
                <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-[#D4AF37]">
                    0{index + 1}
                  </span>
                  <div className="w-6 h-0.5 bg-slate-200 group-hover:w-10 group-hover:bg-[#D4AF37] transition-all"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
