import React from 'react';
import { Language, PageId } from '../types';
import { COMPANY_CONFIG, getPhoneCallUrl, getWhatsAppUrl } from '../data/config';
import { 
  ShieldCheck, 
  CalendarRange, 
  FileCheck, 
  Sliders, 
  Phone,
  PhoneCall, 
  MessageCircle,
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import heroImage from '../assets/images/hero_sanitation_management_1789141376117.jpg';

interface HeroProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate, onOpenQuoteModal }) => {
  const isRtl = lang === 'ar';

  const trustPoints = [
    {
      icon: UsersIcon,
      textAr: 'خدمة للأفراد والمنشآت',
      textEn: 'Serving Homes & Commercial Entities',
    },
    {
      icon: CalendarRange,
      textAr: 'برامج دورية ووقائية',
      textEn: 'Routine & Preventive Programs',
    },
    {
      icon: FileCheck,
      textAr: 'متابعة مستمرة',
      textEn: 'Continuous Follow-up',
    },
    {
      icon: Sliders,
      textAr: 'حلول مخصصة',
      textEn: 'Tailored Solutions',
    },
  ];

  function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return <ShieldCheck {...props} />;
  }

  return (
    <section id="hero-section" className="relative overflow-hidden bg-white pt-8 pb-14 md:pt-14 md:pb-20">
      {/* Subtle luxury geometric backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0A192F]/5 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col text-start space-y-6">
            
            {/* Corporate Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A192F]/5 border border-[#D4AF37]/30 text-xs font-bold text-[#0A192F] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span>
                {lang === 'ar'
                  ? 'كلاسيك لمكافحة الحشرات • حلول بيئية وصحية معتمدة'
                  : 'CLASSIC PEST CONTROL • Certified Public Health Solutions'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A192F] tracking-tight leading-[1.25] sm:leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  حماية متكاملة من <br className="hidden sm:inline" />
                  <span className="text-[#0A192F] relative inline-block">
                    آفات الصحة العامة
                    <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#D4AF37]/20 -z-10 rounded"></span>
                  </span>
                </>
              ) : (
                <>
                  Integrated Public Health <br className="hidden sm:inline" />
                  <span className="text-[#0A192F] relative inline-block">
                    Pest Management
                    <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#D4AF37]/20 -z-10 rounded"></span>
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {lang === 'ar'
                ? 'حلول احترافية لمكافحة الآفات وحماية المنازل والمنشآت، من خلال برامج مدروسة وخدمات مخصصة تناسب احتياجات كل عميل.'
                : 'Professional pest management solutions protecting homes and facilities through structured programs and tailored services adapted to each client.'}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Direct Call Now Button */}
              <a
                id="hero-call-now-btn"
                href={getPhoneCallUrl()}
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#0A192F] text-white font-bold text-sm sm:text-base hover:bg-[#132a4a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border-2 border-[#D4AF37]"
                title={`اتصل الآن: ${COMPANY_CONFIG.phone}`}
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'ar' ? 'اتصل الآن:' : 'Call Now:'}</span>
                <span dir="ltr" className="font-mono text-[#D4AF37] tracking-wider font-extrabold">{COMPANY_CONFIG.phone}</span>
              </a>

              {/* Direct WhatsApp Button */}
              <a
                id="hero-whatsapp-btn"
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                title={`واتساب: ${COMPANY_CONFIG.whatsapp}`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'محادثة WhatsApp' : 'WhatsApp Chat'}</span>
              </a>

              {/* Quote CTA */}
              <button
                id="hero-cta-quote"
                onClick={onOpenQuoteModal}
                className="px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#D4AF37] text-[#0A192F] bg-white hover:bg-[#D4AF37]/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'ar' ? 'طلب عرض سعر سريع' : 'Quick Price Quote'}</span>
              </button>

              {/* Primary Service Button */}
              <button
                id="hero-cta-order"
                onClick={() => onNavigate('contact')}
                className="px-4 py-3.5 rounded-xl bg-slate-100 text-[#0A192F] font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'اطلب الخدمة' : 'Request Service'}</span>
                {isRtl ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Subtle Key Highlights */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'بروتوكولات صحية مدروسة' : 'Certified Health Protocols'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{lang === 'ar' ? 'سرعة الاستجابة والمتابعة' : 'Prompt & Reliable Response'}</span>
              </div>
            </div>

          </div>

          {/* Clean Corporate Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src={heroImage}
                alt={
                  lang === 'ar'
                    ? 'كلاسيك لمكافحة الحشرات - خدمات احترافية لمعاينة وإدارة آفات الصحة العامة'
                    : 'Classic Pest Control - Professional facility inspection and public health pest management'
                }
                className="w-full h-[340px] sm:h-[400px] lg:h-[460px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>

              {/* Official Company Seal Badge */}
              <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-xl border border-[#D4AF37]/50 flex items-center gap-3 z-10 transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white p-0.5 ring-1 ring-[#D4AF37]/40">
                  <img
                    src="/classic-logo.jpg"
                    alt="Official CLASSIC PEST CONTROL Crest"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pe-2 text-start">
                  <span className="block text-[11px] font-black tracking-wider text-[#0A192F]">
                    CLASSIC
                  </span>
                  <span className="block text-[10px] font-bold text-[#D4AF37]">
                    كلاسيك لمكافحة الحشرات
                  </span>
                </div>
              </div>

              {/* Floating Quality Assurance Card */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#0A192F] flex items-center justify-center shrink-0 text-[#D4AF37]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-start">
                  <p className="text-xs font-black text-[#0A192F] uppercase tracking-wider">
                    {lang === 'ar' ? 'إدارة الآفات المتكاملة (IPM)' : 'Integrated Pest Management'}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {lang === 'ar'
                      ? 'مكافحة دقيقة ووقائية تحافظ على بيئة العمل والمنزل'
                      : 'Scientific prevention tailored for spotless hygiene'}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Corner */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-xl pointer-events-none hidden sm:block"></div>
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-xl pointer-events-none hidden sm:block"></div>
          </div>

        </div>

        {/* 4 Trust Points Bar Below Hero */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustPoints.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:border-[#D4AF37]/50 hover:bg-white transition-all shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0A192F]/5 group-hover:bg-[#0A192F] text-[#0A192F] group-hover:text-[#D4AF37] flex items-center justify-center shrink-0 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug text-start">
                    {lang === 'ar' ? item.textAr : item.textEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
