import React, { useState } from 'react';
import { Language, QuoteFormData } from '../types';
import { SERVICES_DATA, SECTORS_DATA } from '../data/content';
import { X, Send, Sparkles, CheckCircle2, Phone, Building, MapPin, Clock } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    facilityType: 'منازل وفيلات',
    city: '',
    serviceType: SERVICES_DATA[0].title,
    problemDescription: '',
    preferredTime: 'صباحًا (9:00 ص - 1:00 م)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = lang === 'ar' ? 'يرجى إدخال الاسم' : 'Please enter your name';
    }
    if (!formData.phone.trim()) {
      errs.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter your phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = lang === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = lang === 'ar' ? 'يرجى تحديد المدينة' : 'Please enter your city';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A192F]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        id="quote-request-modal"
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-start transition-all my-8"
      >
        {/* Modal Header */}
        <div className="bg-[#0A192F] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#0A192F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {lang === 'ar' ? 'طلب عرض سعر مخصص' : 'Request a Custom Price Quote'}
              </h3>
              <p className="text-xs text-[#D4AF37]">
                CLASSIC PEST CONTROL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-100px)] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#0A192F]">
                {lang === 'ar' ? 'تم استلام طلب عرض السعر!' : 'Quote Request Received!'}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {lang === 'ar'
                  ? 'يقوم فريق كلاسيك بدراسة متطلبات منشأتكم وتجهيز عرض السعر الأنسب، وسنتواصل معكم في الموعد المفضل.'
                  : 'Our commercial team is reviewing your property specifications to prepare an optimal quote. We will follow up during your preferred time.'}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A192F] text-white text-xs font-bold hover:bg-[#132a4a] transition-all"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'الاسم *' : 'Name *'}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm focus:bg-white focus:outline-none transition-all ${
                    errors.fullName ? 'border-red-400' : 'border-slate-300 focus:border-[#D4AF37]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
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
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm focus:bg-white focus:outline-none transition-all ${
                    errors.phone ? 'border-red-400' : 'border-slate-300 focus:border-[#D4AF37]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Facility Type & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'نوع المنشأة *' : 'Facility Type *'}
                  </label>
                  <select
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    {SECTORS_DATA.map((sec) => (
                      <option key={sec.id} value={sec.name}>
                        {lang === 'ar' ? sec.name : sec.nameEn}
                      </option>
                    ))}
                    <option value="أخرى">{lang === 'ar' ? 'منشأة أخرى' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'المدينة *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={lang === 'ar' ? 'المدينة أو المنطقة' : 'City / District'}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm focus:bg-white focus:outline-none transition-all ${
                      errors.city ? 'border-red-400' : 'border-slate-300 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'نوع الخدمة *' : 'Service Type *'}
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:border-[#D4AF37] focus:outline-none"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {lang === 'ar' ? srv.title : srv.titleEn}
                    </option>
                  ))}
                  <option value="برنامج متكامل">
                    {lang === 'ar' ? 'برنامج وقائي دوري متكامل' : 'Comprehensive Periodic Program'}
                  </option>
                </select>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'وصف المشكلة أو الاحتياج' : 'Problem Description or Scope'}
                </label>
                <textarea
                  rows={2}
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  placeholder={
                    lang === 'ar'
                      ? 'نوع الحشرات الملاحظة، المساحة التقريبية للمكان...'
                      : 'Observed pest activity, approximate square footage...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:border-[#D4AF37] focus:outline-none"
                ></textarea>
              </div>

              {/* Preferred Time to Contact */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ar' ? 'أفضل وقت للتواصل' : 'Best Time to Contact'}
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="صباحًا (9:00 ص - 1:00 م)">
                    {lang === 'ar' ? 'صباحًا (9:00 ص - 1:00 م)' : 'Morning (9:00 AM - 1:00 PM)'}
                  </option>
                  <option value="بعد الظهر (1:00 م - 5:00 م)">
                    {lang === 'ar' ? 'بعد الظهر (1:00 م - 5:00 م)' : 'Afternoon (1:00 PM - 5:00 PM)'}
                  </option>
                  <option value="مساءً (5:00 م - 9:00 م)">
                    {lang === 'ar' ? 'مساءً (5:00 م - 9:00 م)' : 'Evening (5:00 PM - 9:00 PM)'}
                  </option>
                  <option value="في أي وقت">{lang === 'ar' ? 'في أي وقت متاح' : 'Anytime'}</option>
                </select>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0A192F] text-white font-bold text-sm hover:bg-[#132a4a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>{lang === 'ar' ? 'جاري إرسال الطلب...' : 'Processing...'}</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      <span>{lang === 'ar' ? 'إرسال الطلب' : 'Submit Request'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
