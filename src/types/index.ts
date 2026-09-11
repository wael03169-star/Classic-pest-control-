export type Language = 'ar' | 'en';

export type PageId = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-details'
  | 'sectors'
  | 'why-classic'
  | 'faq'
  | 'contact';

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
