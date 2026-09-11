export type Language = 'ar' | 'en';

export type PageId = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-details'
  | 'sectors'
  | 'why-classic'
  | 'faq'
  | 'contact'
  | 'admin';

export interface VisitItem {
  id: string;
  timestamp: string;
  ip?: string;
  referrer: string;
  referrerSource: 'Facebook' | 'Google' | 'WhatsApp' | 'Direct' | 'Other';
  path: string;
  pageTitle: string;
  device: 'Mobile' | 'Tablet' | 'Desktop';
  browser: string;
  os: string;
  country: string;
  city: string;
  sessionId: string;
}

export interface LeadItem {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  placeType?: string;
  location?: string;
  problemType?: string;
  serviceRequested?: string;
  preferredTime?: string;
  notes?: string;
  source: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  todayLeads: number;
  totalLeads: number;
  newLeads: number;
  completedLeads: number;
  referrers: Record<string, number>;
  devices: Record<string, number>;
  eventCounts: Record<string, number>;
  pagesCount: Record<string, number>;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  fullDesc: string;
  fullDescEn: string;
  iconName: string;
  problems: string[];
  problemsEn: string[];
  places: string[];
  placesEn: string[];
  features: string[];
  featuresEn: string[];
  steps: string[];
  stepsEn: string[];
  image: string;
}

export interface SectorItem {
  id: string;
  icon: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  examples: string[];
  examplesEn: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
}

export interface StepItem {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  clientType: string;
  serviceRequested: string;
  cityArea: string;
  message: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  facilityType: string;
  city: string;
  serviceType: string;
  problemDescription: string;
  preferredTime: string;
}
