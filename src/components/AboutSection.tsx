import React from 'react';
import { Language, PageId } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Target,
  Award
} from 'lucide-react';
import facilityImage from '../assets/images/clean_facility_hygiene_1789141390104.jpg';

interface AboutSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onNavigate }) => {
  const isRtl = lang === 'ar';

  return (
    <section id="about-section" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src={facilityImage}
                alt={
                  lang === 'ar'
                    ? 'كلاسيك لمكافحة الحشرات - معايير النظافة والصحة العامة في المنشآت'
                    : 'Classic Pest Control - Commercial facility hygiene and public health excellence'
                }
                className="w-full h-[360px] sm:h-[440px] object-cover object-center transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>

              {/* Official Brand Seal */}
              <div className="absolute top-4 end-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-[#D4AF37]/50 flex items-center gap-2.5 z-10">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 ring-1 ring-[#D4AF37]/30">
                  <img
                    src="/classic-logo.jpg"
                    alt="Classic Pest Control Seal"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pe-1 text-start">
                  <span className="block text-[11px] font-black text-[#0A192F]">كلاسيك</span>
                  <span className="block text-[9px] font-bold text-[#D4AF37] tracking-wider">CLASSIC</span>
                </div>
              </div>

              {/* Inset Badge */}
              <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#0A192F] flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <p className="text-xs font-bold text-[#0A192F]">
                    {lang === 'ar' ? 'معايير صحية صارمة' : 'Stringent Hygiene Standards'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar' ? 'نهج وقائي يحمي الأفراد والأعمال' : 'Preventive approach for families & businesses'}
                  </p>
                </div>
              </div>
            </div>

            {/* Accent Gold framing */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl -z-10 hidden sm:block"></div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-7 flex flex-col text-start space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A192F]/5 text-[#0A192F] text-xs font-bold uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'نبذة عن الشركة' : 'Company Overview'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
              {lang === 'ar' ? 'عن كلاسيك' : 'About Classic'}
            </h2>

            {/* Exactly formatted text requested by user */}
            <div className="space-y-4 text-base text-slate-700 leading-relaxed font-normal">
              <p>
                {lang === 'ar'
                  ? 'كلاسيك لمكافحة الحشرات هي شركة متخصصة في حلول مكافحة آفات الصحة العامة، وتقدم خدماتها للأفراد والمنشآت بمختلف أنواعها.'
                  : 'CLASSIC PEST CONTROL specializes in integrated public health pest management solutions, delivering reliable services for households and commercial facilities.'}
              </p>

              <p>
                {lang === 'ar'
                  ? 'نركز على تقديم حلول مناسبة لطبيعة كل مكان، مع الاهتمام بجودة الخدمة والمتابعة وتجربة العميل.'
                  : 'We focus on customizing interventions suitable for each specific environment, upholding service excellence, diligent follow-up, and an exceptional customer experience.'}
              </p>

              <p className="font-semibold text-slate-900 bg-slate-50 p-4 rounded-xl border-s-4 border-[#D4AF37]">
                {lang === 'ar'
                  ? 'هدفنا هو المساعدة في توفير بيئة أكثر نظافة وأمانًا من خلال برامج مكافحة مناسبة واحترافية.'
                  : 'Our objective is to foster cleaner, safer environments through targeted, highly professional pest management programs.'}
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'تخطيط مخصص لكل منشأة' : 'Bespoke site-specific planning'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'معاملات آمنة للمنازل والمطابخ' : 'Safe for domestic & culinary zones'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'مرونة عالية في المواعيد' : 'Flexible operational schedules'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'تقارير دورية وإرشادات وقائية' : 'Inspection logs & preventive advice'}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                id="about-cta-btn"
                onClick={() => onNavigate('why-classic')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A192F] text-white font-bold text-sm hover:bg-[#132a4a] transition-all shadow-md cursor-pointer"
              >
                <span>{lang === 'ar' ? 'اعرف المزيد عنا' : 'Learn More About Us'}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
