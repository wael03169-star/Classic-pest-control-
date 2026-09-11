import fs from "fs";
import path from "path";

export interface VisitRecord {
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

export interface EventRecord {
  id: string;
  timestamp: string;
  eventType: 'whatsapp_click' | 'call_click' | 'facebook_click' | 'chat_open' | 'quote_open' | 'other';
  label: string;
  path?: string;
  sessionId?: string;
}

export interface LeadRecord {
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
  source: 'مساعد كلاسيك الذكي (AI Chat)' | 'نموذج تواصل الموقع' | 'طلب معاينة وعرض سعر' | 'محادثة واتساب';
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
}

interface StoreData {
  visits: VisitRecord[];
  events: EventRecord[];
  leads: LeadRecord[];
}

const DATA_FILE = path.join(process.cwd(), "data-storage.json");

// Helper to determine referrer source
export function categorizeReferrer(ref?: string): 'Facebook' | 'Google' | 'WhatsApp' | 'Direct' | 'Other' {
  if (!ref || ref === 'direct' || ref === '' || ref === 'none') return 'Direct';
  const lower = ref.toLowerCase();
  if (lower.includes('facebook') || lower.includes('fb.com') || lower.includes('fbclid') || lower.includes('l.facebook.com')) {
    return 'Facebook';
  }
  if (lower.includes('google') || lower.includes('googlesyndication')) {
    return 'Google';
  }
  if (lower.includes('whatsapp') || lower.includes('wa.me')) {
    return 'WhatsApp';
  }
  return 'Other';
}

// Initial seed data with recent Egyptian visits & Facebook campaign clicks
function getInitialSeedData(): StoreData {
  const now = Date.now();
  const oneHour = 3600 * 1000;
  const oneDay = 24 * oneHour;

  const sampleVisits: VisitRecord[] = [
    {
      id: "v_101",
      timestamp: new Date(now - 12 * 60 * 1000).toISOString(),
      referrer: "https://www.facebook.com/share/1J9Bb5w3Zp/",
      referrerSource: "Facebook",
      path: "/",
      pageTitle: "الرئيسية",
      device: "Mobile",
      browser: "Chrome Mobile",
      os: "Android",
      country: "مصر",
      city: "القاهرة",
      sessionId: "s_fb_01",
    },
    {
      id: "v_102",
      timestamp: new Date(now - 35 * 60 * 1000).toISOString(),
      referrer: "https://m.facebook.com/",
      referrerSource: "Facebook",
      path: "/services",
      pageTitle: "خدمات مكافحة الحشرات",
      device: "Mobile",
      browser: "Safari Mobile",
      os: "iOS",
      country: "مصر",
      city: "الجيزة",
      sessionId: "s_fb_02",
    },
    {
      id: "v_103",
      timestamp: new Date(now - 75 * 60 * 1000).toISOString(),
      referrer: "https://www.google.com.eg/",
      referrerSource: "Google",
      path: "/contact",
      pageTitle: "تواصل معنا",
      device: "Desktop",
      browser: "Chrome",
      os: "Windows",
      country: "مصر",
      city: "القاهرة الجديدة",
      sessionId: "s_gg_01",
    },
    {
      id: "v_104",
      timestamp: new Date(now - 2 * oneHour).toISOString(),
      referrer: "https://www.facebook.com/share/1J9Bb5w3Zp/",
      referrerSource: "Facebook",
      path: "/",
      pageTitle: "الرئيسية",
      device: "Mobile",
      browser: "Chrome Mobile",
      os: "Android",
      country: "مصر",
      city: "الشيخ زايد",
      sessionId: "s_fb_03",
    },
    {
      id: "v_105",
      timestamp: new Date(now - 3 * oneHour).toISOString(),
      referrer: "direct",
      referrerSource: "Direct",
      path: "/sectors",
      pageTitle: "القطاعات والمنشآت",
      device: "Desktop",
      browser: "Chrome",
      os: "Windows",
      country: "مصر",
      city: "المعادي",
      sessionId: "s_dir_01",
    },
    {
      id: "v_106",
      timestamp: new Date(now - 5 * oneHour).toISOString(),
      referrer: "https://web.whatsapp.com/",
      referrerSource: "WhatsApp",
      path: "/why-classic",
      pageTitle: "لماذا كلاسيك",
      device: "Mobile",
      browser: "Chrome Mobile",
      os: "Android",
      country: "مصر",
      city: "مدينة نصر",
      sessionId: "s_wa_01",
    },
    {
      id: "v_107",
      timestamp: new Date(now - 1 * oneDay).toISOString(),
      referrer: "https://www.facebook.com/share/1J9Bb5w3Zp/",
      referrerSource: "Facebook",
      path: "/services",
      pageTitle: "مكافحة الصراصير والبق",
      device: "Mobile",
      browser: "Safari Mobile",
      os: "iOS",
      country: "مصر",
      city: "الإسكندرية",
      sessionId: "s_fb_04",
    },
    {
      id: "v_108",
      timestamp: new Date(now - 1 * oneDay - 4 * oneHour).toISOString(),
      referrer: "https://www.google.com/",
      referrerSource: "Google",
      path: "/",
      pageTitle: "الرئيسية",
      device: "Desktop",
      browser: "Firefox",
      os: "Windows",
      country: "مصر",
      city: "6 أكتوبر",
      sessionId: "s_gg_02",
    },
  ];

  const sampleEvents: EventRecord[] = [
    {
      id: "e_1",
      timestamp: new Date(now - 10 * 60 * 1000).toISOString(),
      eventType: "whatsapp_click",
      label: "نقر على زر WhatsApp المباشر",
      path: "/",
      sessionId: "s_fb_01",
    },
    {
      id: "e_2",
      timestamp: new Date(now - 28 * 60 * 1000).toISOString(),
      eventType: "chat_open",
      label: "فتح مساعد كلاسيك الذكي",
      path: "/services",
      sessionId: "s_fb_02",
    },
    {
      id: "e_3",
      timestamp: new Date(now - 70 * 60 * 1000).toISOString(),
      eventType: "call_click",
      label: "اتصال هاتفي مباشر 01157970073",
      path: "/contact",
      sessionId: "s_gg_01",
    },
    {
      id: "e_4",
      timestamp: new Date(now - 2 * oneHour).toISOString(),
      eventType: "facebook_click",
      label: "انتقال إلى صفحة الفيسبوك الرسمية",
      path: "/",
      sessionId: "s_fb_03",
    },
  ];

  const sampleLeads: LeadRecord[] = [
    {
      id: "lead_01",
      timestamp: new Date(now - 45 * 60 * 1000).toISOString(),
      name: "م/ أحمد عبد الرحمن",
      phone: "01004589214",
      placeType: "فيلا",
      location: "التجمع الخامس - القاهرة الجديدة",
      problemType: "صراصير ونمل أبيض بالحديقة والمطبخ",
      serviceRequested: "مكافحة الصراصير والنمل ورش الحديقة",
      preferredTime: "مساءً بعد 6",
      notes: "يرغب في معاينة وتحديد التكلفة قبل البدء",
      source: "مساعد كلاسيك الذكي (AI Chat)",
      status: "new",
    },
    {
      id: "lead_02",
      timestamp: new Date(now - 3 * oneHour).toISOString(),
      name: "أ/ محمود يسري (مدير مطعم)",
      phone: "01228491033",
      placeType: "مطعم / كافيه",
      location: "المهندسين - الجيزة",
      problemType: "صراصير ألمانية في المطبخ والمخزن",
      serviceRequested: "عقد مكافحة دوري وتطهير صحي للمطاعم",
      preferredTime: "صباحاً قبل الافتتاح",
      notes: "يحتاج شهادة مكافحة دورية وتقارير متابعة",
      source: "طلب معاينة وعرض سعر",
      status: "contacted",
    },
    {
      id: "lead_03",
      timestamp: new Date(now - 1 * oneDay).toISOString(),
      name: "د/ شيرين سامي",
      phone: "01149201588",
      placeType: "منزل / شقة",
      location: "مدينة نصر - القاهرة",
      problemType: "بق الفراش في غرف النوم",
      serviceRequested: "إبادة بق الفراش بالتبخير والمبيدات الحرارية",
      preferredTime: "طوال اليوم متاح",
      notes: "تم الاتفاق على موعد الرش غداً الساعة 11 صباحاً",
      source: "نموذج تواصل الموقع",
      status: "scheduled",
    },
    {
      id: "lead_04",
      timestamp: new Date(now - 2 * oneDay).toISOString(),
      name: "شركة النور للمقاولات والمخازن",
      phone: "01095847321",
      placeType: "مخزن / مستودع",
      location: "المنطقة الصناعية - العاشر من رمضان",
      problemType: "قوارض وفئران",
      serviceRequested: "مكافحة القوارض وتركيب المحطات الآمنة",
      preferredTime: "ساعات العمل الرسمية",
      notes: "تم تنفيذ الرش وتركيب الطعوم وحصل العميل على الضمان بنجاح",
      source: "محادثة واتساب",
      status: "completed",
    },
  ];

  return {
    visits: sampleVisits,
    events: sampleEvents,
    leads: sampleLeads,
  };
}

class AnalyticsStore {
  private data: StoreData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StoreData {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (parsed && Array.isArray(parsed.visits) && Array.isArray(parsed.leads)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read storage file, initializing seed data:", e);
    }
    const seed = getInitialSeedData();
    this.saveData(seed);
    return seed;
  }

  private saveData(dataToSave: StoreData) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), "utf-8");
    } catch (e) {
      console.warn("Failed to write storage file:", e);
    }
  }

  public recordVisit(visit: Omit<VisitRecord, "id" | "timestamp" | "referrerSource">): VisitRecord {
    const newRecord: VisitRecord = {
      ...visit,
      id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      referrerSource: categorizeReferrer(visit.referrer),
      country: visit.country || "مصر",
      city: visit.city || "القاهرة",
    };

    // Prepend to show latest first
    this.data.visits.unshift(newRecord);
    // Keep max 2000 visits in memory
    if (this.data.visits.length > 2000) {
      this.data.visits = this.data.visits.slice(0, 2000);
    }
    this.saveData(this.data);
    return newRecord;
  }

  public recordEvent(event: Omit<EventRecord, "id" | "timestamp">): EventRecord {
    const newRecord: EventRecord = {
      ...event,
      id: `e_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    this.data.events.unshift(newRecord);
    if (this.data.events.length > 2000) {
      this.data.events = this.data.events.slice(0, 2000);
    }
    this.saveData(this.data);
    return newRecord;
  }

  public addLead(lead: Omit<LeadRecord, "id" | "timestamp" | "status"> & { status?: LeadRecord["status"] }): LeadRecord {
    const newLead: LeadRecord = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: lead.status || "new",
    };
    this.data.leads.unshift(newLead);
    this.saveData(this.data);
    return newLead;
  }

  public updateLead(id: string, updates: Partial<LeadRecord>): LeadRecord | null {
    const lead = this.data.leads.find((l) => l.id === id);
    if (!lead) return null;
    Object.assign(lead, updates);
    this.saveData(this.data);
    return lead;
  }

  public deleteLead(id: string): boolean {
    const initLen = this.data.leads.length;
    this.data.leads = this.data.leads.filter((l) => l.id !== id);
    if (this.data.leads.length !== initLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public getStats() {
    const totalVisits = this.data.visits.length;
    const uniqueSessions = new Set(this.data.visits.map((v) => v.sessionId)).size;
    
    // Today's visits
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayVisits = this.data.visits.filter((v) => v.timestamp.startsWith(todayStr)).length;
    const todayLeads = this.data.leads.filter((l) => l.timestamp.startsWith(todayStr)).length;

    // Referrers breakdown
    const referrers: Record<string, number> = {
      Facebook: 0,
      Google: 0,
      WhatsApp: 0,
      Direct: 0,
      Other: 0,
    };
    this.data.visits.forEach((v) => {
      referrers[v.referrerSource] = (referrers[v.referrerSource] || 0) + 1;
    });

    // Devices breakdown
    const devices: Record<string, number> = { Mobile: 0, Desktop: 0, Tablet: 0 };
    this.data.visits.forEach((v) => {
      devices[v.device] = (devices[v.device] || 0) + 1;
    });

    // Events summary
    const eventCounts: Record<string, number> = {
      whatsapp_click: 0,
      call_click: 0,
      facebook_click: 0,
      chat_open: 0,
      quote_open: 0,
    };
    this.data.events.forEach((e) => {
      eventCounts[e.eventType] = (eventCounts[e.eventType] || 0) + 1;
    });

    // Leads summary
    const totalLeads = this.data.leads.length;
    const newLeads = this.data.leads.filter((l) => l.status === "new").length;
    const completedLeads = this.data.leads.filter((l) => l.status === "completed").length;

    // Top Pages
    const pagesCount: Record<string, number> = {};
    this.data.visits.forEach((v) => {
      const p = v.path || "/";
      pagesCount[p] = (pagesCount[p] || 0) + 1;
    });

    return {
      totalVisits,
      uniqueVisitors: uniqueSessions,
      todayVisits,
      todayLeads,
      totalLeads,
      newLeads,
      completedLeads,
      referrers,
      devices,
      eventCounts,
      pagesCount,
    };
  }

  public getVisits(limit = 100, referrerFilter?: string) {
    let filtered = this.data.visits;
    if (referrerFilter && referrerFilter !== 'all') {
      filtered = filtered.filter((v) => v.referrerSource.toLowerCase() === referrerFilter.toLowerCase());
    }
    return filtered.slice(0, limit);
  }

  public getLeads(statusFilter?: string, searchQuery?: string) {
    let filtered = this.data.leads;
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          (l.location && l.location.toLowerCase().includes(q)) ||
          (l.problemType && l.problemType.toLowerCase().includes(q))
      );
    }
    return filtered;
  }
}

export const analyticsStore = new AnalyticsStore();
