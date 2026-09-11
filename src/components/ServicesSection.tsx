import React from 'react';
import { Language, PageId } from '../types';
import { SERVICES_DATA } from '../data/content';
import { 
  ShieldAlert, 
  Wind, 
  AlertTriangle, 
  Zap, 
  Activity, 
  Compass, 
  Package, 
  ShieldCheck, 
  Clock,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (serviceId: string) => void;
  onNavigate: (page: PageId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService,
  onNavigate,
}) => {
  const isRtl = lang === 'ar';

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#D4AF37]" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-[#D4AF37]" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-[#D4AF37]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#D4AF37]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#D4AF37]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'Package':
        return <Package className="w-6 h-6 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'مجالات العمل والتخصص' : 'Core Capabilities'}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'حلول متخصصة لمكافحة آفات الصحة العامة للأفراد والمنشآت بمختلف أنواعها.'
              : 'Specialized public health pest control solutions for private residences and corporate facilities.'}
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service, index) => {
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon and Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-xl bg-[#0A192F] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-[#D4AF37] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-[#0A192F] transition-colors text-start">
                    {lang === 'ar' ? service.title : service.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed text-start mb-6 font-normal">
                    {lang === 'ar' ? service.shortDesc : service.shortDescEn}
                  </p>
                </div>

                {/* Card Footer: Details CTA Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors cursor-pointer group-hover:underline"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>{lang === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4 text-[#D4AF37] transform group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>

                  <span className="text-[11px] font-semibold text-slate-400">
                    {lang === 'ar' ? 'حلول مخصصة' : 'Tailored Plan'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Notice / Quick Action */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-sm text-slate-700 font-medium">
              {lang === 'ar'
                ? 'هل تبحث عن برنامج مخصص أو خدمة لمنشأة غير مذكورة؟'
                : 'Need a customized schedule or specialized commercial plan?'}
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-lg bg-[#0A192F] text-white text-xs font-bold hover:bg-[#132a4a] transition-all cursor-pointer"
            >
              {lang === 'ar' ? 'استشر فريق كلاسيك الآن' : 'Consult Our Team'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
