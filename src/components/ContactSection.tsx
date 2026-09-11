import React, { useState } from 'react';
import { Language, ContactFormData } from '../types';
import { COMPANY_CONFIG, getPhoneCallUrl, getWhatsAppUrl, getMailtoUrl } from '../data/config';
import { SERVICES_DATA, SECTORS_DATA } from '../data/content';
import { submitLead } from '../utils/analytics';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Facebook
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    clientType: 'منازل وفيلات',
    serviceRequested: SERVICES_DATA[0].title,
    cityArea: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = lang === 'ar' ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name';
    }

    if (!formData.phone.trim()) {
      errs.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter your phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = lang === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number format';
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = lang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address';
    }

    if (!formData.cityArea.trim()) {
      errs.cityArea = lang === 'ar' ? 'يرجى تحديد المدينة أو المنطقة' : 'Please specify city or district';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Send lead to Admin Dashboard
    submitLead({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      placeType: formData.clientType,
      location: formData.cityArea,
      serviceRequested: formData.serviceRequested,
      notes: formData.message,
      source: 'نموذج تواصل الموقع',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        clientType: 'منازل وفيلات',
        serviceRequested: SERVICES_DATA[0].title,
        cityArea: '',
        message: '',
      });
    }, 600);
  };

  const contactCards = [
    {
      icon: Phone,
      titleAr: 'الهاتف المباشر',
      titleEn: 'Direct Phone',
      value: COMPANY_CONFIG.phone,
      action: getPhoneCallUrl(),
      actionLabelAr: 'اتصل الآن',
      actionLabelEn: 'Call Now',
    },
    {
      icon: MessageCircle,
      titleAr: 'محادثة WhatsApp',
      titleEn: 'WhatsApp Chat',
      value: COMPANY_CONFIG.whatsapp,
      action: getWhatsAppUrl(),
      actionLabelAr: 'فتح المحادثة',
      actionLabelEn: 'Open WhatsApp',
    },
    {
      icon: Mail,
      titleAr: 'البريد الإلكتروني',
      titleEn: 'Email Address',
      value: COMPANY_CONFIG.email,
      action: getMailtoUrl(),
      actionLabelAr: 'إرسال بريد',
      actionLabelEn: 'Send Email',
    },
    {
      icon: MapPin,
      titleAr: 'العنوان',
      titleEn: 'Address Location',
      value: COMPANY_CONFIG.addressAr,
      action: '#map-frame',
      actionLabelAr: 'عرض الخريطة',
      actionLabelEn: 'View Map',
    },
    {
      icon: Clock,
      titleAr: 'مواعيد العمل',
      titleEn: 'Working Hours',
      value: COMPANY_CONFIG.workingHoursAr,
      action: null,
      actionLabelAr: 'متاح للحجز',
      actionLabelEn: 'Open for Bookings',
    },
  ];

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A192F]/5 text-[#0A192F] text-xs font-bold uppercase tracking-wider">
            {lang === 'ar' ? 'قنوات الاتصال المباشرة' : 'Direct Channels'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tight">
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {lang === 'ar'
              ? 'يسعدنا استقبال استفساراتكم وحجز مواعيد المعاينة وتقديم عروض الأسعار.'
              : 'We are delighted to receive your inquiries, inspection requests, and custom quotes.'}
          </p>
        </div>

        {/* 5 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {contactCards.map((card, idx) => {
            const IconComp = card.icon;
            const isPhoneCard = idx === 0;
            const isWhatsAppCard = idx === 1;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl transition-all text-start flex flex-col justify-between ${
                  isPhoneCard
                    ? 'bg-[#0A192F] text-white border-2 border-[#D4AF37] shadow-lg scale-[1.02]'
                    : isWhatsAppCard
                    ? 'bg-emerald-50/70 border-2 border-emerald-500/80 shadow-md'
                    : 'bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] hover:bg-white hover:shadow-md'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-xs ${
                      isPhoneCard
                        ? 'bg-[#D4AF37] text-[#0A192F]'
                        : isWhatsAppCard
                        ? 'bg-[#25D366] text-white'
                        : 'bg-[#0A192F] text-[#D4AF37]'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      isPhoneCard ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {lang === 'ar' ? card.titleAr : card.titleEn}
                  </h3>

                  {card.action ? (
                    <a
                      href={card.action}
                      target={card.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`text-base font-black font-mono tracking-wider block hover:underline ${
                        isPhoneCard
                          ? 'text-[#D4AF37]'
                          : isWhatsAppCard
                          ? 'text-emerald-700'
                          : 'text-[#0A192F]'
                      }`}
                      dir="ltr"
                      title={lang === 'ar' ? 'اضغط للاتصال أو الفتح' : 'Click to connect'}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm font-black text-[#0A192F] font-mono break-all">
                      {card.value}
                    </p>
                  )}
                </div>

                {card.action ? (
                  <a
                    href={card.action}
                    target={card.action.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={`mt-4 text-xs font-bold py-2 px-3 rounded-lg transition-all inline-flex items-center justify-center gap-1.5 shadow-xs ${
                      isPhoneCard
                        ? 'bg-[#D4AF37] text-[#0A192F] hover:bg-white'
                        : isWhatsAppCard
                        ? 'bg-[#25D366] text-white hover:bg-[#20bd5a]'
                        : 'text-[#D4AF37] hover:text-[#997524] bg-white border border-slate-200'
                    }`}
                  >
                    <span>{lang === 'ar' ? card.actionLabelAr : card.actionLabelEn}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="mt-4 text-[11px] font-semibold text-emerald-600">
                    {lang === 'ar' ? card.actionLabelAr : card.actionLabelEn}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Grid: Contact Form + Map Placeholder Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs text-start">
            <h3 className="text-xl font-bold text-[#0A192F] mb-2">
              {lang === 'ar' ? 'طلب خدمة أو استفسار' : 'Submit Service Request or Inquiry'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 font-normal">
              {lang === 'ar'
                ? 'يرجى ملء النموذج أدناه وسيتم التواصل معكم في أقرب وقت لتأكيد التفاصيل.'
                : 'Please fill in the form below; our team will follow up promptly.'}
            </p>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold">
                  {lang === 'ar' ? 'تم استلام طلبكم بنجاح!' : 'Your Request Has Been Received!'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  {lang === 'ar'
                    ? 'شكرًا لتواصلكم مع CLASSIC PEST CONTROL. سيقوم فريقنا بمراجعة التفاصيل والتواصل معكم سريعًا.'
                    : 'Thank you for reaching out to CLASSIC PEST CONTROL. Our team will contact you shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-3 px-5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  {lang === 'ar' ? 'إرسال طلب إضافي' : 'Submit Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={lang === 'ar' ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Client Type & Service Requested */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'نوع العميل / المنشأة *' : 'Client / Facility Type *'}
                    </label>
                    <select
                      value={formData.clientType}
                      onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:border-[#D4AF37] focus:outline-none"
                    >
                      {SECTORS_DATA.map((sec) => (
                        <option key={sec.id} value={sec.name}>
                          {lang === 'ar' ? sec.name : sec.nameEn}
                        </option>
                      ))}
                      <option value="أخرى">{lang === 'ar' ? 'قطاع آخر' : 'Other Sector'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الخدمة المطلوبة *' : 'Requested Service *'}
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:border-[#D4AF37] focus:outline-none"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {lang === 'ar' ? srv.title : srv.titleEn}
                        </option>
                      ))}
                      <option value="معاينة شاملة">
                        {lang === 'ar' ? 'معاينة شاملة واستشارة' : 'Comprehensive Inspection'}
                      </option>
                    </select>
                  </div>
                </div>

                {/* City / Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المدينة / المنطقة *' : 'City / Area *'}
                  </label>
                  <input
                    type="text"
                    value={formData.cityArea}
                    onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                    placeholder={lang === 'ar' ? 'مثال: القاهرة الجديدة، المعادي، الشيخ زايد...' : 'e.g. New Cairo, District 5'}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm focus:outline-none transition-all ${
                      errors.cityArea
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
                    }`}
                  />
                  {errors.cityArea && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.cityArea}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'الرسالة أو تفاصيل المشكلة' : 'Message or Problem Details'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'ar'
                        ? 'وضح أي تفاصيل حول المساحة أو المشاهدات الملحوظة...'
                        : 'Add any specific notes on facility area or observed pest activity...'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0A192F] text-white font-bold text-sm hover:bg-[#132a4a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>{lang === 'ar' ? 'جاري إرسال الطلب...' : 'Sending Request...'}</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      <span>{lang === 'ar' ? 'إرسال الطلب' : 'Submit Request'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map Side (Using exactly [GOOGLE_MAPS_LOCATION] without fake coordinates) */}
          <div id="map-frame" className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-md text-start space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A192F] flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0A192F]">
                    {lang === 'ar' ? 'موقع الشركة على الخريطة' : 'Headquarters & Map Location'}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {COMPANY_CONFIG.googleMapsLocation}
                  </p>
                </div>
              </div>

              {/* Responsive Map Frame Container */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-64 sm:h-80 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-70"></div>
                
                <div className="relative z-10 max-w-sm space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#0A192F] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md animate-bounce">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h5 className="text-sm font-bold text-[#0A192F]">
                    CLASSIC PEST CONTROL
                  </h5>
                  <p className="text-xs text-slate-600 bg-white/90 py-1.5 px-3 rounded-lg border border-slate-200 font-mono">
                    {COMPANY_CONFIG.googleMapsLocation}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'سيتم تفعيل إحداثيات ورابط Google Maps المباشر بمجرد تزويدنا بالعنوان الفعلي.'
                      : 'Google Maps embed will render directly once live coordinates are supplied.'}
                  </p>
                </div>
              </div>

              {/* Service Areas Note */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-[#0A192F]">
                  {lang === 'ar' ? 'نطاق الخدمة والتغطية:' : 'Service Coverage Scope:'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'تغطي فرق عمل كلاسيك كافة المناطق السكنية والتجارية والصناعية بفرق فنية مجهزة.'
                    : 'Classic teams provide on-site mobile response for residential and corporate premises.'}
                </p>
              </div>

              {/* Official Facebook Page Banner */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Facebook className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0A192F]">
                      {lang === 'ar' ? 'صفحتنا الرسمية على Facebook' : 'Official Facebook Page'}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {lang === 'ar' ? 'تابع أحدث الأعمال والتقارير والنصائح' : 'Follow our latest updates & pest control tips'}
                    </p>
                  </div>
                </div>
                <a
                  id="contact-facebook-link"
                  href={COMPANY_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                >
                  <span>{lang === 'ar' ? 'زيارة الصفحة' : 'Visit Page'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
