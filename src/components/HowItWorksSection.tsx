import React from 'react';
import { Language, PageId } from '../types';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import { 
  PhoneCall, 
  ClipboardCheck, 
  ShieldCheck, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface HowItWorksSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang, onNavigate }) => {
  const isRtl = lang === 'ar';

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01':
        return <PhoneCall className="w-6 h-6 text-[#D4AF37]" />;
      case '02':
        return <ClipboardCheck className="w-6 h-6 text-[#D4AF37]" />;
      case '03':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case '04':
        return <CheckCircle className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <CheckCircle className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="how-it-works-section" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A192F]/5 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'منهجية العمل' : 'Our Workflow'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'كيف نعمل؟' : 'How It Works'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'أربع خطوات واضحة ومدروسة تبدأ من اتصالك الأول وحتى الاطمئنان التام على منشأتك.'
              : 'Four transparent steps from your first consultation to rigorous application and post-service follow-up.'}
          </p>
        </div>

        {/* 4 Steps Visual Timeline */}
        <div className="relative">
          {/* Connecting Line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-200 -translate-y-8 -z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              return (
                <div
                  key={step.number}
                  id={`step-card-${step.number}`}
                  className="group bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:bg-white hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-start"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#0A192F] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        {getStepIcon(step.number)}
                      </div>
                      <span className="text-3xl font-black text-slate-200 group-hover:text-[#D4AF37] transition-colors">
                        {step.number}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-[#0A192F] mb-2 leading-snug">
                      {lang === 'ar' ? step.title : step.titleEn}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {lang === 'ar' ? step.description : step.descriptionEn}
                    </p>
                  </div>

                  {/* Indicator footer */}
                  <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {lang === 'ar' ? `المرحلة 0${index + 1}` : `Stage 0${index + 1}`}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Start Now CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0A192F] text-white font-bold text-sm hover:bg-[#132a4a] transition-all shadow-md cursor-pointer"
          >
            <span>{lang === 'ar' ? 'ابدأ الخطوة الأولى وتواصل معنا' : 'Begin Step 1: Contact Us Today'}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
