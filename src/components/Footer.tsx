import React from 'react';
import { Language, PageId } from '../types';
import { Logo } from './Logo';
import { COMPANY_CONFIG, getWhatsAppUrl, getPhoneCallUrl, getMailtoUrl } from '../data/config';
import { SERVICES_DATA } from '../data/content';
import { 
  Phone, 
  MessageCircle,
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Facebook
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenQuoteModal }) => {
  const quickLinks: { id: PageId; labelAr: string; labelEn: string }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'about', labelAr: 'من نحن', labelEn: 'About Us' },
    { id: 'services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { id: 'sectors', labelAr: 'القطاعات', labelEn: 'Sectors' },
    { id: 'why-classic', labelAr: 'لماذا كلاسيك؟', labelEn: 'Why Classic' },
    { id: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ' },
    { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us' },
  ];

  return (
    <footer id="main-footer" className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" size="md" />

            <div className="pt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              <p className="font-bold text-white mb-1">
                {COMPANY_CONFIG.nameEn}
              </p>
              <p>
                {lang === 'ar'
                  ? 'حلول احترافية لمكافحة آفات الصحة العامة للأفراد والمنشآت.'
                  : 'Professional public health pest management solutions for residential and commercial premises.'}
              </p>
            </div>

            {/* Social Links with Facebook */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                {lang === 'ar' ? 'تابعنا وتواصل معنا:' : 'Connect with Us:'}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Facebook Official Page */}
                <a
                  id="footer-facebook-link"
                  href={COMPANY_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-xs"
                  title="تابع صفحتنا على Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                  <span>Facebook</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Phone Call */}
                <a
                  href={getPhoneCallUrl()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c5a869] text-[#0A192F] text-xs font-bold transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'روابط الموقع' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-slate-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? item.labelAr : item.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {SERVICES_DATA.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onNavigate('service-details', srv.id)}
                    className="hover:text-[#D4AF37] transition-colors cursor-pointer truncate max-w-full text-start"
                  >
                    • {lang === 'ar' ? srv.title : srv.titleEn}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-[#D4AF37] font-bold text-xs hover:underline pt-1"
                >
                  {lang === 'ar' ? 'عرض كافة الخدمات التسع ←' : 'View all 9 services →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operating info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-white">
                    {lang === 'ar' ? 'الهاتف والاتصال المباشر:' : 'Direct Phone & Call:'}
                  </span>
                  <a
                    href={getPhoneCallUrl()}
                    className="text-[#D4AF37] hover:underline font-mono text-sm font-black tracking-wider block mt-0.5"
                    dir="ltr"
                    title={lang === 'ar' ? 'اضغط للاتصال المباشر' : 'Click to call'}
                  >
                    {COMPANY_CONFIG.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-white">
                    {lang === 'ar' ? 'محادثة WhatsApp:' : 'WhatsApp Chat:'}
                  </span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-mono text-sm font-bold tracking-wider block mt-0.5"
                    dir="ltr"
                    title={lang === 'ar' ? 'فتح محادثة واتساب' : 'Open WhatsApp'}
                  >
                    {COMPANY_CONFIG.whatsapp}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] shrink-0 mt-0.5">
                  <Facebook className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="block font-semibold text-white">
                    {lang === 'ar' ? 'صفحة Facebook الرسمية:' : 'Official Facebook Page:'}
                  </span>
                  <a
                    href={COMPANY_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-xs font-bold block mt-0.5 flex items-center gap-1"
                    title="زيارة صفحتنا على فيسبوك"
                  >
                    <span>CLASSIC PEST CONTROL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>

              {/* Direct Quick Call Button in Footer */}
              <li className="pt-1">
                <a
                  href={getPhoneCallUrl()}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D4AF37] text-[#0A192F] font-black text-xs flex items-center justify-center gap-2 hover:bg-[#c5a869] transition-all shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اتصل الآن: ' : 'Call Now: '}</span>
                  <span dir="ltr" className="font-mono">{COMPANY_CONFIG.phone}</span>
                </a>
              </li>

              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white">
                    {lang === 'ar' ? 'العنوان:' : 'Address:'}
                  </span>
                  <span className="font-mono">{COMPANY_CONFIG.addressAr}</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <span className="block font-semibold text-white">
                    {lang === 'ar' ? 'ساعات العمل:' : 'Hours:'}
                  </span>
                  <span>
                    {lang === 'ar' ? COMPANY_CONFIG.workingHoursAr : COMPANY_CONFIG.workingHoursEn}
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {COMPANY_CONFIG.copyrightYear} {COMPANY_CONFIG.nameEn} - {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="text-[#D4AF37] hover:underline font-bold"
            >
              {lang === 'ar' ? 'طلب عرض سعر' : 'Request a Quote'}
            </button>
            <span>•</span>
            <span className="text-slate-400">
              {lang === 'ar' ? 'مكافحة آفات الصحة العامة' : 'Public Health Pest Management'}
            </span>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-[#D4AF37] flex items-center gap-1 transition-colors cursor-pointer"
              title="لوحة تحكم وتتبع الزيارات"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'لوحة التحكم' : 'Admin'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
