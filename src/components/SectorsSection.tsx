import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { SECTORS_DATA } from '../data/content';
import { 
  Home, 
  Building2, 
  Utensils, 
  Hotel, 
  GraduationCap, 
  Hospital, 
  Factory, 
  Boxes, 
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SectorsSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({
  lang,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const isRtl = lang === 'ar';
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTORS_DATA[0].id);

  const getSectorIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Home':
        return <Home className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Hotel':
        return <Hotel className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Hospital':
        return <Hospital className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  const currentSector =
    SECTORS_DATA.find((s) => s.id === activeSectorId) || SECTORS_DATA[0];

  return (
    <section id="sectors-section" className="py-16 md:py-24 bg-slate-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'تغطية شاملة للمنشآت' : 'Broad Sector Coverage'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'نخدم مختلف القطاعات' : 'Serving Diverse Sectors'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'حلول مصممة لتلائم المتطلبات الصحية والتشغيلية لكل قطاع، من المنازل السكنية إلى المنشآت الحيوية الكبرى.'
              : 'Customized solutions catering to the specific operational and hygiene requirements across residential and corporate domains.'}
          </p>
        </div>

        {/* 9 Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS_DATA.map((sector) => {
            const isSelected = sector.id === activeSectorId;
            return (
              <div
                key={sector.id}
                id={`sector-card-${sector.id}`}
                onClick={() => setActiveSectorId(sector.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 text-start cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/20'
                    : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#0A192F] text-[#D4AF37]'
                          : 'bg-slate-100 text-[#0A192F]'
                      }`}
                    >
                      {getSectorIcon(sector.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A192F]">
                        {lang === 'ar' ? sector.name : sector.nameEn}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#D4AF37]">
                        {lang === 'ar' ? 'برامج مخصصة' : 'Tailored Program'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {lang === 'ar' ? sector.description : sector.descriptionEn}
                  </p>

                  {/* Examples Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {(lang === 'ar' ? sector.examples : sector.examplesEn).map((ex, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-[10px] font-medium text-slate-600"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuoteModal();
                    }}
                    className="text-xs font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'ar' ? 'طلب عرض سعر للقطاع' : 'Request Sector Quote'}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>

                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-300'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sector Inquiries Banner */}
        <div className="mt-12 bg-[#0A192F] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-start space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'ar'
                ? 'هل تدير منشأة ذات اشتراطات خاصة أو تفتيش دوري؟'
                : 'Managing a facility with special audits or inspection standards?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              {lang === 'ar'
                ? 'فريق كلاسيك يقدم استشارات وحلولاً تتناسب مع طبيعة نشاطك وتضمن الحفاظ على بيئة صحية وآمنة.'
                : 'Classic Pest Control provides custom consultation aligning with your operational workflows.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0A192F] font-bold text-sm hover:bg-[#c5a869] transition-all shadow-md cursor-pointer"
          >
            {lang === 'ar' ? 'تواصل مع مستشار القطاعات' : 'Contact Sector Specialist'}
          </button>
        </div>

      </div>
    </section>
  );
};
