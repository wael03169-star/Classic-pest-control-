import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Language, PageId } from '../types';
import { COMPANY_CONFIG, getPhoneCallUrl, getWhatsAppUrl } from '../data/config';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle,
  Globe, 
  ChevronDown, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Sparkles,
  Facebook,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageId;
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  currentPage,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = lang === 'ar';

  const navLinks: { id: PageId; labelAr: string; labelEn: string }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'about', labelAr: 'من نحن', labelEn: 'About Us' },
    { id: 'services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { id: 'sectors', labelAr: 'القطاعات', labelEn: 'Sectors' },
    { id: 'why-classic', labelAr: 'لماذا كلاسيك؟', labelEn: 'Why Classic' },
    { id: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ' },
    { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-100 py-3.5'
      }`}
    >
      {/* Top Notice Bar / Corporate Direct Contacts */}
      <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {lang === 'ar' ? 'مكافحة آفات الصحة العامة للأفراد والمنشآت' : 'Public Health Pest Management'}
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {lang === 'ar' ? `مواعيد العمل: ${COMPANY_CONFIG.workingHoursAr}` : `Hours: ${COMPANY_CONFIG.workingHoursEn}`}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              id="header-top-phone"
              href={getPhoneCallUrl()}
              className="flex items-center gap-1.5 text-[#0A192F] font-black hover:text-[#D4AF37] transition-colors"
              title={lang === 'ar' ? 'اتصل الآن' : 'Call Now'}
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span dir="ltr" className="font-mono text-xs">{COMPANY_CONFIG.phone}</span>
            </a>
            <span className="text-slate-300">|</span>
            <a
              id="header-top-whatsapp"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: <span dir="ltr" className="font-mono">{COMPANY_CONFIG.whatsapp}</span></span>
            </a>
            <span className="text-slate-300">|</span>
            <a
              id="header-top-facebook"
              href={COMPANY_CONFIG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#1877F2] font-bold hover:text-[#0A192F] transition-colors"
              title="صفحتنا على Facebook"
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              <span>Facebook</span>
            </a>
            <span className="text-slate-300">|</span>
            {/* Language Switcher Button */}
            <button
              id="lang-toggle-desktop"
              onClick={() => onLanguageChange(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 hover:border-[#D4AF37] hover:text-[#0A192F] transition-all bg-slate-50 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <span className="text-slate-300">|</span>
            {/* Admin Dashboard Quick Link */}
            <button
              id="header-admin-btn"
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#0A192F] text-[#D4AF37] hover:bg-[#132a4a] border border-[#D4AF37]/40 transition-all cursor-pointer shadow-2xs"
              title="لوحة تحكم وتتبع الزيارات والطلبات"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة التحكم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="focus:outline-none text-start group cursor-pointer"
          aria-label="Classic Pest Control Home"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#0A192F] bg-[#D4AF37]/15 font-bold shadow-xs'
                    : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-100'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct Call Now Button */}
          <a
            id="call-now-cta-header"
            href={getPhoneCallUrl()}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#0A192F] hover:bg-[#132a4a] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#0A192F]"
            title={`اتصل الآن: ${COMPANY_CONFIG.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
            <span dir="ltr" className="font-mono text-[11px] text-[#D4AF37] font-extrabold hidden md:inline">
              ({COMPANY_CONFIG.phone})
            </span>
          </a>

          {/* Quote Button */}
          <button
            id="quote-cta-header"
            onClick={onOpenQuoteModal}
            className="px-3 py-2 rounded-lg text-xs font-bold border border-[#D4AF37] text-[#0A192F] bg-white hover:bg-[#D4AF37]/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'طلب عرض سعر' : 'Get Quote'}</span>
          </button>

          {/* Primary CTA */}
          <button
            id="service-cta-header"
            onClick={() => handleNavClick('contact')}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#0A192F] bg-[#D4AF37] hover:bg-[#c5a869] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'اطلب الخدمة' : 'Request Service'}</span>
            {isRtl ? (
              <ArrowLeft className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Mobile menu and Direct Call button */}
        <div className="flex items-center gap-2 xl:hidden">
          {/* Quick Click-To-Call Button for Mobile */}
          <a
            id="mobile-header-call-btn"
            href={getPhoneCallUrl()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A192F] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
            aria-label={`اتصل الآن: ${COMPANY_CONFIG.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span dir="ltr" className="font-mono font-bold text-[11px]">{COMPANY_CONFIG.phone}</span>
          </a>

          <button
            onClick={() => onLanguageChange(lang === 'ar' ? 'en' : 'ar')}
            className="p-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:text-[#0A192F] flex items-center gap-1"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-2xl p-6 transition-all duration-300 z-50 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold transition-all text-start cursor-pointer ${
                    isActive
                      ? 'bg-[#0A192F] text-[#D4AF37]'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4 opacity-70" />
                  ) : (
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-xl border-2 border-[#D4AF37] text-[#0A192F] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'احصل على عرض سعر' : 'Get a Price Quote'}</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 px-4 rounded-xl bg-[#0A192F] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#132a4a] shadow-md"
            >
              <span>{lang === 'ar' ? 'اطلب الخدمة الآن' : 'Request Service Now'}</span>
            </button>

            {/* Direct Call & WhatsApp Buttons in Mobile Drawer */}
            <a
              id="mobile-drawer-call-btn"
              href={getPhoneCallUrl()}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-[#132a4a] shadow-md border-2 border-[#D4AF37]"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'ar' ? 'اتصل الآن:' : 'Call Now:'}</span>
              <span dir="ltr" className="font-mono text-[#D4AF37] tracking-wider font-extrabold">{COMPANY_CONFIG.phone}</span>
            </a>

            <a
              id="mobile-drawer-whatsapp-btn"
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-[#20bd5a] shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'ar' ? 'محادثة WhatsApp مباشرة' : 'Direct WhatsApp Chat'}</span>
              <span dir="ltr" className="font-mono text-xs font-bold opacity-90">({COMPANY_CONFIG.whatsapp})</span>
            </a>

            <a
              id="mobile-drawer-facebook-btn"
              href={COMPANY_CONFIG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#1877F2] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#166fe5] shadow-md transition-all"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>{lang === 'ar' ? 'صفحتنا على Facebook' : 'Our Facebook Page'}</span>
            </a>

            <button
              id="mobile-drawer-admin-btn"
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0A192F] text-[#D4AF37] font-bold text-xs flex items-center justify-center gap-2 border border-[#D4AF37]/50 shadow-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'لوحة تحكم وتتبع الزيارات' : 'Admin & Analytics Dashboard'}</span>
            </button>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                {lang === 'ar' ? 'رقم الاتصال المباشر:' : 'Direct Phone:'}
              </span>
              <a
                href={getPhoneCallUrl()}
                className="font-bold text-[#0A192F] flex items-center gap-1 font-mono text-sm underline hover:text-[#D4AF37]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span dir="ltr">{COMPANY_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
