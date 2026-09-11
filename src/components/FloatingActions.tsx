import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { COMPANY_CONFIG, getWhatsAppUrl, getPhoneCallUrl } from '../data/config';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  lang: Language;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ lang }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRtl = lang === 'ar';

  return (
    <div
      id="floating-actions-container"
      className={`fixed bottom-5 z-40 flex flex-col gap-3 items-center ${
        isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      }`}
    >
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white text-[#0A192F] border border-slate-200 shadow-lg hover:bg-slate-50 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-[#0A192F]" />
        </button>
      )}

      {/* Floating Call Button for Mobile */}
      <a
        id="floating-phone-call-btn"
        href={getPhoneCallUrl()}
        className="md:hidden w-12 h-12 rounded-full bg-[#0A192F] text-[#D4AF37] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Call Classic Pest Control"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ring-4 ring-[#25D366]/20"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Tooltip on desktop */}
        <span
          className={`hidden md:group-hover:inline-block absolute top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#0A192F] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md border border-[#D4AF37]/50 pointer-events-none transition-all ${
            isRtl ? 'left-full ml-3' : 'right-full mr-3'
          }`}
        >
          {lang === 'ar' ? 'تحدث معنا عبر WhatsApp' : 'Chat with us on WhatsApp'}
        </span>
      </a>
    </div>
  );
};
