import React from 'react';
import { Language, PageId } from '../types';
import { getWhatsAppUrl, getPhoneCallUrl, COMPANY_CONFIG } from '../data/config';
import { MessageCircle, Phone, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onNavigate }) => {
  const isRtl = lang === 'ar';

  return (
    <section id="cta-banner" className="py-16 md:py-20 bg-[#0A192F] relative overflow-hidden text-white">
      {/* Gold & Navy ambient effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#163056]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Emblem Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37]">
          <Shield className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'استشارة ومعاينة سريعة' : 'Prompt Professional Consultation'}</span>
        </div>

        {/* Big Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          {lang === 'ar' ? 'هل تواجه مشكلة مع الآفات؟' : 'Facing an Active Pest Problem?'}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {lang === 'ar'
            ? 'تواصل معنا الآن ودع فريق كلاسيك يساعدك في تحديد الخدمة المناسبة لاحتياجاتك.'
            : 'Reach out right away and let the Classic Pest Control team determine the most effective intervention for your property.'}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Direct Call Button */}
          <a
            id="cta-banner-call-btn"
            href={getPhoneCallUrl()}
            className="px-6 py-3.5 rounded-xl bg-white text-[#0A192F] font-black text-sm sm:text-base hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer border-2 border-[#D4AF37]"
            title={`اتصل الآن: ${COMPANY_CONFIG.phone}`}
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'اتصل الآن:' : 'Call Now:'}</span>
            <span dir="ltr" className="font-mono text-[#0A192F] font-extrabold">{COMPANY_CONFIG.phone}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            id="cta-banner-whatsapp-btn"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{lang === 'ar' ? 'تواصل عبر WhatsApp' : 'Contact via WhatsApp'}</span>
          </a>

          {/* Order Service */}
          <button
            id="cta-banner-order-btn"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#0A192F] font-black text-sm sm:text-base hover:bg-[#c5a869] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'اطلب الخدمة الآن' : 'Request Service Now'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </section>
  );
};
