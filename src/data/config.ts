/**
 * CLASSIC PEST CONTROL - Configuration & Contact Placeholders
 * 
 * You can easily update all company contact details, phone numbers,
 * social links, and Google Maps location here in one place.
 */

export const COMPANY_CONFIG = {
  nameAr: "كلاسيك لمكافحة الحشرات",
  nameEn: "CLASSIC PEST CONTROL",
  taglineAr: "مكافحة آفات الصحة العامة وحلول وقائية متكاملة",
  taglineEn: "Public Health Pest Management & Integrated Preventive Solutions",

  // Primary Contact
  phone: "01157970073",
  whatsapp: "01157970073",
  email: "[EMAIL]",
  addressAr: "[ADDRESS]",
  addressEn: "[ADDRESS]",
  workingHoursAr: "على مدار الساعة 24/7 طوال أيام الأسبوع",
  workingHoursEn: "24/7 Everyday",
  
  // Location & Maps Placeholder
  googleMapsLocation: "[GOOGLE_MAPS_LOCATION]",

  // Social Media Placeholders
  facebook: "[FACEBOOK]",
  instagram: "[INSTAGRAM]",
  websiteUrl: "[WEBSITE URL]",

  // Copyright Year
  copyrightYear: "2026",
};

/**
 * Helper to construct a safe WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const phoneVal = COMPANY_CONFIG.whatsapp.trim();
  const defaultMsg = "مرحبًا، أرغب في الاستفسار عن خدمات CLASSIC PEST CONTROL.";
  const msg = encodeURIComponent(customMessage || defaultMsg);

  // If placeholder is still active, provide a safe fallback or direct standard link
  if (phoneVal === "[WHATSAPP]" || !phoneVal) {
    return `https://wa.me/?text=${msg}`;
  }
  
  // Sanitize digits if real phone is entered
  let cleanPhone = phoneVal.replace(/[^0-9]/g, "");
  // If Egyptian local number starting with 01 (11 digits), format to international 201...
  if (cleanPhone.startsWith("01") && cleanPhone.length === 11) {
    cleanPhone = "2" + cleanPhone;
  }
  return `https://wa.me/${cleanPhone}?text=${msg}`;
}

/**
 * Helper to construct a safe Tel click-to-call link
 */
export function getPhoneCallUrl(): string {
  const phoneVal = COMPANY_CONFIG.phone.trim();
  if (phoneVal === "[PHONE]" || !phoneVal) {
    return "#contact";
  }
  return `tel:${phoneVal.replace(/\s+/g, "")}`;
}

/**
 * Helper to construct a safe Mailto link
 */
export function getMailtoUrl(): string {
  const emailVal = COMPANY_CONFIG.email.trim();
  if (emailVal === "[EMAIL]" || !emailVal) {
    return "#contact";
  }
  return `mailto:${emailVal}`;
}
