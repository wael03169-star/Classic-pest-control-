import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { FAQ_DATA } from '../data/content';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/config';

interface FaqSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleQuestion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A192F]/5 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{lang === 'ar' ? 'إجابات وتوضيحات' : 'Common Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'إجابات واضحة ومختصرة حول خدماتنا وطرق الحجز والاستفسار.'
              : 'Clear answers and guidance regarding our services, inspection booking, and tailored plans.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            const question = lang === 'ar' ? item.question : item.questionEn;
            const answer = lang === 'ar' ? item.answer : item.answerEn;

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden text-start ${
                  isOpen
                    ? 'bg-white border-[#D4AF37]/70 shadow-md ring-1 ring-[#D4AF37]/20'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleQuestion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-start cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0A192F] leading-snug">
                      {question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#0A192F] text-[#D4AF37] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <h4 className="text-base font-bold text-[#0A192F]">
              {lang === 'ar' ? 'لديك سؤال آخر لم تجد إجابته هنا؟' : 'Have a question not covered above?'}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar'
                ? 'فريق الدعم الفني وخدمة العملاء يسعد بالرد على كافة استفساراتكم مباشرة.'
                : 'Our customer support team is available to answer your specific questions directly.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-bold hover:bg-[#132a4a] transition-all cursor-pointer"
            >
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
