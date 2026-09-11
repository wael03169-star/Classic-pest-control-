import React from 'react';
import { Language, PageId, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/content';
import { getWhatsAppUrl } from '../data/config';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  AlertCircle, 
  ListOrdered, 
  ShieldCheck, 
  MessageCircle, 
  PhoneCall, 
  Sparkles
} from 'lucide-react';

interface ServiceDetailsViewProps {
  lang: Language;
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const ServiceDetailsView: React.FC<ServiceDetailsViewProps> = ({
  lang,
  selectedServiceId,
  onSelectService,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const isRtl = lang === 'ar';

  const currentService: ServiceItem =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const title = lang === 'ar' ? currentService.title : currentService.titleEn;
  const fullDesc = lang === 'ar' ? currentService.fullDesc : currentService.fullDescEn;
  const problems = lang === 'ar' ? currentService.problems : currentService.problemsEn;
  const places = lang === 'ar' ? currentService.places : currentService.placesEn;
  const features = lang === 'ar' ? currentService.features : currentService.featuresEn;
  const steps = lang === 'ar' ? currentService.steps : currentService.stepsEn;

  const whatsappMessage = lang === 'ar'
    ? `مرحبًا، أرغب في الاستفسار وطلب خدمة: ${currentService.title} من شركة CLASSIC PEST CONTROL.`
    : `Hello, I would like to inquire about the service: ${currentService.titleEn} from CLASSIC PEST CONTROL.`;

  return (
    <div id="service-details-view" className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0A192F] font-semibold cursor-pointer"
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#0A192F] font-semibold cursor-pointer"
            >
              {lang === 'ar' ? 'خدماتنا' : 'Services'}
            </button>
            <span>/</span>
            <span className="text-[#0A192F] font-bold">{title}</span>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0A192F] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#D4AF37] transition-all cursor-pointer shadow-2xs"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'العودة لجميع الخدمات' : 'Back to All Services'}</span>
          </button>
        </div>

        {/* Main Service Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Block with Hero Image */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
                <img
                  src={currentService.image}
                  alt={title}
                  className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-6 inset-x-6 sm:bottom-8 sm:inset-x-8 text-white text-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37] text-[#0A192F] text-xs font-black uppercase mb-3">
                    {lang === 'ar' ? 'تفاصيل الخدمة والبروتوكول' : 'Service Specifications'}
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    {title}
                  </h1>
                </div>
              </div>

              {/* Overview text */}
              <div className="p-6 sm:p-8 text-start space-y-4">
                <h2 className="text-lg font-bold text-[#0A192F]">
                  {lang === 'ar' ? 'نظرة عامة عن الخدمة' : 'Service Overview'}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  {fullDesc}
                </p>
              </div>
            </div>

            {/* Problems Solved (المشكلات التي تساعد الخدمة في التعامل معها) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-start">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {lang === 'ar'
                    ? 'المشكلات التي تساعد الخدمة في التعامل معها'
                    : 'Key Problems This Service Addresses'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {problems.map((prob, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {prob}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Places Served (أماكن تقديم الخدمة) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-start">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {lang === 'ar' ? 'أماكن وتطبيقات تقديم الخدمة' : 'Applicable Environments'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {places.map((place, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{place}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features (مميزات الخدمة) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-start">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#0A192F] flex items-center justify-center text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {lang === 'ar' ? 'مميزات ومعايير الخدمة' : 'Service Advantages & Standards'}
                </h3>
              </div>

              <div className="space-y-3">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span className="text-sm font-bold text-slate-800 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* General Steps (خطوات الخدمة بشكل عام) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs text-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                  <ListOrdered className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">
                  {lang === 'ar' ? 'خطوات تنفيذ الخدمة' : 'Standard Execution Workflow'}
                </h3>
              </div>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#0A192F] text-[#D4AF37] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Primary Booking Card */}
            <div className="sticky top-28 bg-white rounded-2xl p-6 border-2 border-[#D4AF37]/40 shadow-xl text-start space-y-5">
              
              <div>
                <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">
                  {lang === 'ar' ? 'طلب فوري ومباشر' : 'Immediate Booking'}
                </span>
                <h3 className="text-xl font-black text-[#0A192F] mt-1">
                  {lang === 'ar' ? 'جاهز لحماية منشأتك؟' : 'Ready to Protect Your Property?'}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {lang === 'ar'
                    ? 'تواصل معنا لتحديد الموعد الأنسب وبدء معاينة وتنفيذ الخدمة.'
                    : 'Contact our team to schedule the most convenient appointment.'}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Request This Service Button */}
                <button
                  id="service-details-request-btn"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] text-white font-bold text-sm hover:bg-[#132a4a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'اطلب هذه الخدمة' : 'Request This Service'}</span>
                </button>

                {/* WhatsApp Button */}
                <a
                  id="service-details-whatsapp-btn"
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20bd5a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تواصل عبر WhatsApp' : 'Contact via WhatsApp'}</span>
                </a>

                {/* Price Quote Button */}
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs hover:border-[#D4AF37] hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'طلب عرض سعر مخصص' : 'Request Custom Quote'}</span>
                </button>
              </div>

              {/* Quick Other Services Switcher */}
              <div className="pt-5 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 block mb-3">
                  {lang === 'ar' ? 'خدمات أخرى ذات صلة:' : 'Explore Other Services:'}
                </span>
                <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
                  {SERVICES_DATA.map((srv) => {
                    const isSelected = srv.id === currentService.id;
                    return (
                      <button
                        key={srv.id}
                        onClick={() => onSelectService(srv.id)}
                        className={`text-start px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A192F] text-[#D4AF37]'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">
                          {lang === 'ar' ? srv.title : srv.titleEn}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
