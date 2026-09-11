import React, { useState, useEffect } from 'react';
import { Language, PageId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailsView } from './components/ServiceDetailsView';
import { WhyClassicSection } from './components/WhyClassicSection';
import { SectorsSection } from './components/SectorsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { CtaBanner } from './components/CtaBanner';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { FloatingActions } from './components/FloatingActions';
import { ChatWidget } from './components/ChatWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { SERVICES_DATA } from './data/content';
import { trackPageView } from './utils/analytics';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Synchronize document dir, lang, and title with active language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (currentPage === 'admin') {
      document.title = 'لوحة التحكم وإدارة الزيارات | CLASSIC PEST CONTROL';
    } else {
      document.title =
        lang === 'ar'
          ? 'كلاسيك لمكافحة الحشرات | CLASSIC PEST CONTROL - مكافحة آفات الصحة العامة'
          : 'CLASSIC PEST CONTROL | Public Health Pest Management Solutions';
    }
  }, [lang, currentPage]);

  // Track page views and listen to hashchange & secret keyboard shortcut
  useEffect(() => {
    trackPageView(currentPage);

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret shortcut: Ctrl + Shift + A or Cmd + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A' || e.key === 'ش')) {
        e.preventDefault();
        setCurrentPage(prev => {
          if (prev === 'admin') {
            window.location.hash = '';
            return 'home';
          } else {
            window.location.hash = 'admin';
            return 'admin';
          }
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  // Navigate handler
  const handleNavigate = (page: PageId, serviceId?: string) => {
    if (page === 'admin') {
      window.location.hash = 'admin';
      setCurrentPage('admin');
    } else {
      if (window.location.hash === '#admin') {
        window.location.hash = '';
      }
      if (serviceId) {
        setSelectedServiceId(serviceId);
        setCurrentPage('service-details');
      } else {
        setCurrentPage(page);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('service-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-[#D4AF37]/20 selection:text-[#0A192F]">
      {/* Sticky Header */}
      {currentPage !== 'admin' && (
        <Header
          lang={lang}
          onLanguageChange={setLang}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              lang={lang}
              onNavigate={handleNavigate}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
            <ServicesSection
              lang={lang}
              onSelectService={handleSelectService}
              onNavigate={handleNavigate}
            />
            <WhyClassicSection lang={lang} />
            <SectorsSection
              lang={lang}
              onNavigate={handleNavigate}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
            <HowItWorksSection lang={lang} onNavigate={handleNavigate} />
            <AboutSection lang={lang} onNavigate={handleNavigate} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
            <FaqSection lang={lang} onNavigate={handleNavigate} />
            <ContactSection lang={lang} />
          </>
        )}

        {currentPage === 'about' && (
          <div className="py-8">
            <AboutSection lang={lang} onNavigate={handleNavigate} />
            <WhyClassicSection lang={lang} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'services' && (
          <div className="py-6">
            <ServicesSection
              lang={lang}
              onSelectService={handleSelectService}
              onNavigate={handleNavigate}
            />
            <HowItWorksSection lang={lang} onNavigate={handleNavigate} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'service-details' && (
          <ServiceDetailsView
            lang={lang}
            selectedServiceId={selectedServiceId}
            onSelectService={handleSelectService}
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {currentPage === 'sectors' && (
          <div className="py-6">
            <SectorsSection
              lang={lang}
              onNavigate={handleNavigate}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
            <WhyClassicSection lang={lang} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'why-classic' && (
          <div className="py-6">
            <WhyClassicSection lang={lang} />
            <HowItWorksSection lang={lang} onNavigate={handleNavigate} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'faq' && (
          <div className="py-6">
            <FaqSection lang={lang} onNavigate={handleNavigate} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="py-6">
            <ContactSection lang={lang} />
            <FaqSection lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            lang={lang}
            onBackToSite={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <Footer
          lang={lang}
          onNavigate={handleNavigate}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        lang={lang}
      />

      {/* Floating Action Buttons (WhatsApp & Call) */}
      {currentPage !== 'admin' && <FloatingActions lang={lang} />}

      {/* AI Customer Service Assistant ("مساعد كلاسيك") */}
      {currentPage !== 'admin' && <ChatWidget lang={lang} />}
    </div>
  );
}
