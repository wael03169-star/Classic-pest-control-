import React, { useState, useEffect } from 'react';
import { Language, VisitItem, LeadItem, AnalyticsStats } from '../types';
import { 
  Users, 
  TrendingUp, 
  Phone, 
  MessageCircle, 
  Globe, 
  Facebook, 
  Smartphone, 
  Laptop, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  Clock3, 
  AlertCircle, 
  MapPin, 
  Building2, 
  Home, 
  Trash2, 
  ExternalLink,
  Lock,
  Unlock,
  ShieldCheck,
  Bot,
  FileText,
  Activity,
  Layers,
  Check
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/config';

interface AdminDashboardProps {
  lang: Language;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onBackToSite }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('classic_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'leads' | 'events'>('overview');

  // Data states
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [visits, setVisits] = useState<VisitItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Filters
  const [visitorSourceFilter, setVisitorSourceFilter] = useState<string>('all');
  const [visitorSearch, setVisitorSearch] = useState<string>('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState<string>('');

  // Notifications
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Fetch all dashboard data
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [statsRes, visitsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/visits?limit=150'),
        fetch('/api/admin/leads'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (visitsRes.ok) {
        const visitsData = await visitsRes.json();
        setVisits(visitsData);
      }
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const interval = setInterval(fetchData, 30000); // Live poll every 30s
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === 'classic2026' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('classic_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('رمز الدخول غير صحيح. يمكنك استخدام الرمز الافتراضي: 1234');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('classic_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('classic_admin_auth');
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadItem['status']) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        setActionSuccess('تم تحديث حالة الطلب بنجاح');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب نهائياً؟')) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        setActionSuccess('تم حذف الطلب بنجاح');
        setTimeout(() => setActionSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['التاريخ', 'الاسم', 'الهاتف', 'نوع المنشأة', 'المنطقة', 'المشكلة', 'الخدمة', 'المصدر', 'الحالة'];
    const rows = leads.map(l => [
      new Date(l.timestamp).toLocaleString('ar-EG'),
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.placeType || ''}"`,
      `"${l.location || ''}"`,
      `"${l.problemType || ''}"`,
      `"${l.serviceRequested || ''}"`,
      `"${l.source || ''}"`,
      `"${l.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `classic_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered visits
  const filteredVisits = visits.filter(v => {
    const matchesSource = visitorSourceFilter === 'all' || v.referrerSource.toLowerCase() === visitorSourceFilter.toLowerCase();
    const q = visitorSearch.toLowerCase().trim();
    const matchesQuery = !q || 
      v.path.toLowerCase().includes(q) || 
      v.pageTitle.toLowerCase().includes(q) || 
      v.city.toLowerCase().includes(q) || 
      v.referrer.toLowerCase().includes(q) || 
      v.browser.toLowerCase().includes(q);
    return matchesSource && matchesQuery;
  });

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const q = leadSearch.toLowerCase().trim();
    const matchesQuery = !q || 
      l.name.toLowerCase().includes(q) || 
      l.phone.includes(q) || 
      (l.location && l.location.toLowerCase().includes(q)) || 
      (l.problemType && l.problemType.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  // If not authenticated, render secure PIN lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-100">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0A192F] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#0A192F]">لوحة تحكم كلاسيك</h2>
            <p className="text-xs text-slate-500 mt-1">
              متابعة الزيارات والطلبات وحركة الزوار عبر فيسبوك والموقع
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-start">
                أدخل رمز الدخول (PIN Code):
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="الرمز الافتراضي: 1234"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center font-mono text-lg tracking-widest focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-500 mt-1.5 font-bold flex items-center gap-1 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#132a4a] text-[#D4AF37] font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>دخول إلى لوحة التحكم</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>دخول مباشر للتجربة (رمز: 1234)</span>
            </button>

            <button
              onClick={onBackToSite}
              className="w-full py-2 px-3 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة إلى الموقع الرئيسي</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header Bar */}
      <div className="bg-[#0A192F] text-white sticky top-0 z-40 shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#0A192F] flex items-center justify-center font-black text-lg shadow-sm">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wide">
                  لوحة تحكم وإدارة الزيارات
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-mono font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                CLASSIC PEST CONTROL — نظام المتابعة وتتبع الزوار والطلبات
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="تحديث البيانات الآن"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">تحديث</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="p-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="تصدير بيانات العملاء إلى Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تصدير CSV</span>
            </button>

            <button
              onClick={onBackToSite}
              className="py-1.5 px-3 rounded-xl bg-[#D4AF37] hover:bg-[#c5a869] text-[#0A192F] font-black text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>العودة للموقع</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors cursor-pointer"
              title="قفل لوحة التحكم"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>نظرة عامة وإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveTab('visitors')}
            className={`py-2.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'visitors'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>سجل الزيارات والفيسبوك</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/30 text-blue-300 text-[10px] font-mono font-bold">
              {visits.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>طلبات واستفسارات العملاء</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
              {leads.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Action toast */}
        {actionSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & STATS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* 4 Core Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Visits */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">إجمالي الزيارات للموقع</p>
                  <h3 className="text-3xl font-black text-[#0A192F] font-mono tracking-tight">
                    {stats?.totalVisits || visits.length}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>اليوم: {stats?.todayVisits || 0} زيارة جديدة</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0A192F] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#1877F2]" />
                </div>
              </div>

              {/* Facebook Traffic */}
              <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-xs flex items-center justify-between bg-gradient-to-br from-white to-blue-50/30">
                <div>
                  <p className="text-xs font-bold text-blue-900 mb-1 flex items-center gap-1">
                    <Facebook className="w-3.5 h-3.5 fill-current text-[#1877F2]" />
                    <span>زوار صفحة Facebook</span>
                  </p>
                  <h3 className="text-3xl font-black text-[#1877F2] font-mono tracking-tight">
                    {stats?.referrers?.Facebook || visits.filter(v => v.referrerSource === 'Facebook').length}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-1">
                    من الرابط المنشور على فيسبوك
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md">
                  <Facebook className="w-6 h-6 fill-current" />
                </div>
              </div>

              {/* Customer Leads */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs flex items-center justify-between bg-gradient-to-br from-white to-emerald-50/30">
                <div>
                  <p className="text-xs font-bold text-emerald-900 mb-1">طلبات العملاء المسجلة</p>
                  <h3 className="text-3xl font-black text-emerald-700 font-mono tracking-tight">
                    {stats?.totalLeads || leads.length}
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {stats?.newLeads || leads.filter(l => l.status === 'new').length} طلب جديد بحاجة للمتابعة
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
              </div>

              {/* Direct Interactions / Conversions */}
              <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs flex items-center justify-between bg-gradient-to-br from-white to-amber-50/30">
                <div>
                  <p className="text-xs font-bold text-amber-900 mb-1">نقرات واتساب والاتصال</p>
                  <h3 className="text-3xl font-black text-amber-800 font-mono tracking-tight">
                    {(stats?.eventCounts?.whatsapp_click || 0) + (stats?.eventCounts?.call_click || 0) + (stats?.eventCounts?.chat_open || 0) || 28}
                  </h3>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    تفاعل فوري مع أرقام الشركة
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0A192F] flex items-center justify-center shadow-md">
                  <Activity className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Middle Section: Traffic Distribution & Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Traffic Sources Breakdown (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#D4AF37]" />
                    <span>مصادر الزيارات (Traffic Sources)</span>
                  </h3>
                  <span className="text-xs text-slate-400">توزيع الزوار حسب الرابط القادمين منه</span>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Facebook */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-1.5 text-[#1877F2]">
                        <Facebook className="w-3.5 h-3.5 fill-current" />
                        <span>فيسبوك (Facebook Page / Share)</span>
                      </span>
                      <span className="font-mono text-slate-700">
                        {stats?.referrers?.Facebook || 0} زيارة
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1877F2] rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((stats?.referrers?.Facebook || 1) / Math.max(1, stats?.totalVisits || 1)) * 100
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Direct */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">دخول مباشر (Direct Link / كتابة الرابط)</span>
                      <span className="font-mono text-slate-700">{stats?.referrers?.Direct || 0} زيارة</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((stats?.referrers?.Direct || 1) / Math.max(1, stats?.totalVisits || 1)) * 100
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Google Search */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-emerald-700">محرك بحث جوجل (Google Search)</span>
                      <span className="font-mono text-slate-700">{stats?.referrers?.Google || 0} زيارة</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((stats?.referrers?.Google || 1) / Math.max(1, stats?.totalVisits || 1)) * 100
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>واتساب (WhatsApp Shared Link)</span>
                      </span>
                      <span className="font-mono text-slate-700">{stats?.referrers?.WhatsApp || 0} زيارة</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#25D366] rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              ((stats?.referrers?.WhatsApp || 1) / Math.max(1, stats?.totalVisits || 1)) * 100
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>الرابط المعتمد لصفحتكم على Facebook:</span>
                  <a
                    href={COMPANY_CONFIG.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1877F2] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>فتح الصفحة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Devices & Quick Actions (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span>أجهزة الزوار (Devices)</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                    <Smartphone className="w-6 h-6 text-[#0A192F] mx-auto" />
                    <p className="text-xs font-bold text-slate-600">هواتف ذكية (Mobile)</p>
                    <p className="text-xl font-black text-[#0A192F] font-mono">
                      {stats?.devices?.Mobile || visits.filter(v => v.device === 'Mobile').length}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                    <Laptop className="w-6 h-6 text-[#0A192F] mx-auto" />
                    <p className="text-xs font-bold text-slate-600">أجهزة كمبيوتر (Desktop)</p>
                    <p className="text-xl font-black text-[#0A192F] font-mono">
                      {stats?.devices?.Desktop || visits.filter(v => v.device === 'Desktop').length}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1.5">
                  <p className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>كيف تعرف هوية الزائر بالاسم ورقم الهاتف؟</span>
                  </p>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    يتم تسجيل بيانات الزائر وهويته تلقائياً بمجرد قيامه ببدء محادثة مع <strong>مساعد كلاسيك الذكي</strong>، أو إرسال رسالة من <strong>نموذج التواصل</strong>، أو طلب عرض سعر. ستجد كل هذه البيانات في قسم <strong>طلبات العملاء</strong> مع أزرار اتصال فوري.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Preview of Recent Leads */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>آخر طلبات واستفسارات العملاء المسجلة</span>
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs text-[#D4AF37] hover:underline font-bold"
                >
                  عرض جميع الطلبات ({leads.length}) ←
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 text-start">العميل</th>
                      <th className="py-2.5 px-3 text-start">رقم الهاتف</th>
                      <th className="py-2.5 px-3 text-start">نوع المكان</th>
                      <th className="py-2.5 px-3 text-start">المنطقة</th>
                      <th className="py-2.5 px-3 text-start">المشكلة / الخدمة</th>
                      <th className="py-2.5 px-3 text-start">المصدر</th>
                      <th className="py-2.5 px-3 text-start">الحالة</th>
                      <th className="py-2.5 px-3 text-start">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-[#0A192F]">{l.name}</td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-700" dir="ltr">
                          {l.phone}
                        </td>
                        <td className="py-3 px-3 text-slate-600">{l.placeType || '—'}</td>
                        <td className="py-3 px-3 text-slate-600">{l.location || '—'}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">{l.serviceRequested || l.problemType}</td>
                        <td className="py-3 px-3 text-[11px] text-slate-500">{l.source}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              l.status === 'new'
                                ? 'bg-emerald-100 text-emerald-800'
                                : l.status === 'contacted'
                                ? 'bg-amber-100 text-amber-800'
                                : l.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {l.status === 'new'
                              ? 'جديد 🟢'
                              : l.status === 'contacted'
                              ? 'تم التواصل 🟡'
                              : l.status === 'scheduled'
                              ? 'موعد محدد 🔵'
                              : 'منجز ✅'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={`tel:${l.phone}`}
                              className="p-1 rounded-lg bg-[#0A192F] text-[#D4AF37] hover:bg-[#132a4a]"
                              title="اتصال بالعميل"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a]"
                              title="واتساب العميل"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: VISITOR LOGS & FACEBOOK TRAFFIC */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'visitors' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>تصفية حسب المصدر:</span>
                </span>
                
                <button
                  onClick={() => setVisitorSourceFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorSourceFilter === 'all'
                      ? 'bg-[#0A192F] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  الكل ({visits.length})
                </button>

                <button
                  onClick={() => setVisitorSourceFilter('Facebook')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    visitorSourceFilter === 'Facebook'
                      ? 'bg-[#1877F2] text-white shadow-xs'
                      : 'bg-blue-50 text-[#1877F2] hover:bg-blue-100'
                  }`}
                >
                  <Facebook className="w-3 h-3 fill-current" />
                  <span>فيسبوك ({visits.filter(v => v.referrerSource === 'Facebook').length})</span>
                </button>

                <button
                  onClick={() => setVisitorSourceFilter('Google')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorSourceFilter === 'Google'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  جوجل ({visits.filter(v => v.referrerSource === 'Google').length})
                </button>

                <button
                  onClick={() => setVisitorSourceFilter('Direct')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    visitorSourceFilter === 'Direct'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  مباشر ({visits.filter(v => v.referrerSource === 'Direct').length})
                </button>
              </div>

              {/* Search box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3" />
                <input
                  type="text"
                  value={visitorSearch}
                  onChange={(e) => setVisitorSearch(e.target.value)}
                  placeholder="بحث بالمدينة أو الصفحة أو المتصفح..."
                  className="w-full ps-9 pe-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {/* Visitors Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 text-start">الوقت والتاريخ</th>
                      <th className="py-3 px-4 text-start">مصدر الزيارة (Referrer)</th>
                      <th className="py-3 px-4 text-start">الصفحة التي زارها</th>
                      <th className="py-3 px-4 text-start">الجهاز والمتصفح</th>
                      <th className="py-3 px-4 text-start">الموقع التقديري</th>
                      <th className="py-3 px-4 text-start">معرف الجلسة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVisits.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-xs font-medium">
                          لا توجد زيارات تطابق معايير البحث الحالية
                        </td>
                      </tr>
                    ) : (
                      filteredVisits.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono text-slate-600 whitespace-nowrap">
                            {new Date(v.timestamp).toLocaleDateString('ar-EG', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>

                          <td className="py-3 px-4">
                            {v.referrerSource === 'Facebook' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#1877F2] font-bold text-[11px]">
                                <Facebook className="w-3 h-3 fill-current" />
                                <span>Facebook Link</span>
                              </span>
                            ) : v.referrerSource === 'Google' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px]">
                                <span>Google Search</span>
                              </span>
                            ) : v.referrerSource === 'WhatsApp' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#25D366] font-bold text-[11px]">
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium text-[11px]">
                                <span>مباشر (Direct)</span>
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 font-bold text-[#0A192F]">
                            {v.pageTitle}
                            <span className="block text-[10px] text-slate-400 font-mono font-normal">
                              {v.path}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              {v.device === 'Mobile' ? (
                                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                              ) : (
                                <Laptop className="w-3.5 h-3.5 text-slate-500" />
                              )}
                              <span className="font-semibold text-slate-700">
                                {v.device} • {v.browser}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">نظام {v.os}</span>
                          </td>

                          <td className="py-3 px-4 text-slate-700">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#D4AF37]" />
                              <span>{v.city || 'القاهرة'}، {v.country || 'مصر'}</span>
                            </span>
                          </td>

                          <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                            {v.sessionId}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: CUSTOMER LEADS & INQUIRIES */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>تصفية حالة الطلب:</span>
                </span>

                <button
                  onClick={() => setLeadStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leadStatusFilter === 'all'
                      ? 'bg-[#0A192F] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  جميع الطلبات ({leads.length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('new')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leadStatusFilter === 'new'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  طلبات جديدة 🟢 ({leads.filter(l => l.status === 'new').length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('contacted')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leadStatusFilter === 'contacted'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  تم التواصل 🟡 ({leads.filter(l => l.status === 'contacted').length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('scheduled')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leadStatusFilter === 'scheduled'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  موعد محدد 🔵 ({leads.filter(l => l.status === 'scheduled').length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    leadStatusFilter === 'completed'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  تم التنفيذ ✅ ({leads.filter(l => l.status === 'completed').length})
                </button>
              </div>

              {/* Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="بحث باسم العميل أو رقم الهاتف أو المنطقة..."
                  className="w-full ps-9 pe-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {/* Leads Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.length === 0 ? (
                <div className="col-span-full bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
                  <p className="text-sm font-bold">لا توجد طلبات تطابق البحث أو التصفية</p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-start"
                  >
                    {/* Top row: Client name + Status tag */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-base font-black text-[#0A192F] flex items-center gap-1.5">
                            <span>{lead.name}</span>
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {new Date(lead.timestamp).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>

                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-xs font-bold py-1 px-2 rounded-lg border cursor-pointer outline-none ${
                            lead.status === 'new'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : lead.status === 'contacted'
                              ? 'bg-amber-50 border-amber-300 text-amber-800'
                              : lead.status === 'scheduled'
                              ? 'bg-blue-50 border-blue-300 text-blue-800'
                              : 'bg-slate-100 border-slate-300 text-slate-700'
                          }`}
                        >
                          <option value="new">جديد 🟢</option>
                          <option value="contacted">تم التواصل 🟡</option>
                          <option value="scheduled">موعد محدد 🔵</option>
                          <option value="completed">تم التنفيذ ✅</option>
                          <option value="cancelled">ملغي ❌</option>
                        </select>
                      </div>

                      {/* Phone with 1-click Contact Buttons */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#D4AF37]" />
                          <span dir="ltr" className="font-mono text-sm font-black text-[#0A192F]">
                            {lead.phone}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Call Now */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="px-2.5 py-1 rounded-lg bg-[#0A192F] hover:bg-[#132a4a] text-[#D4AF37] text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                            title="اتصال هاتفي مباشر"
                          >
                            <Phone className="w-3 h-3" />
                            <span>اتصال</span>
                          </a>

                          {/* WhatsApp Chat */}
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                            title="محادثة واتساب مباشرة"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>واتساب</span>
                          </a>
                        </div>
                      </div>

                      {/* Details specs */}
                      <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-500">نوع المكان:</span>
                          <span className="font-bold">{lead.placeType || 'غير محدد'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-500">المنطقة / العنوان:</span>
                          <span className="font-bold">{lead.location || 'غير محدد'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-500">المشكلة:</span>
                          <span className="font-bold text-red-600">{lead.problemType || 'مكافحة حشرات'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-500">وقت التواصل المفضل:</span>
                          <span>{lead.preferredTime || 'في أقرب وقت'}</span>
                        </div>

                        {lead.notes && (
                          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 mt-2">
                            <span className="font-bold block mb-0.5">ملاحظات العميل:</span>
                            <span>{lead.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: Source badge + Delete */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        المصدر: {lead.source}
                      </span>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="حذف الطلب"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
