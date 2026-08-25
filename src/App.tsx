import React, { useState } from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { AboutView } from './components/AboutView';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { FAQView } from './components/FAQView';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'about' | 'gallery' | 'faq'>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialServiceId, setBookingInitialServiceId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setBookingInitialServiceId(serviceId);
    setBookingModalOpen(true);
  };

  const handleSelectTab = (tab: 'home' | 'services' | 'about' | 'gallery' | 'faq') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F6] text-[#2D2529] font-sans antialiased selection:bg-[#E61E78] selection:text-white">
      {/* Top Admin Bar (visible only when logged in as Manu) */}
      <AdminBar />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigateToServices={() => handleSelectTab('services')}
            onNavigateToAbout={() => handleSelectTab('about')}
            onNavigateToGallery={() => handleSelectTab('gallery')}
            onNavigateToFAQ={() => handleSelectTab('faq')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView onOpenBooking={handleOpenBooking} />
        )}

        {activeTab === 'about' && (
          <AboutView
            onOpenBooking={() => handleOpenBooking()}
            onNavigateToServices={() => handleSelectTab('services')}
          />
        )}

        {activeTab === 'gallery' && (
          <BeforeAfterGallery onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'faq' && (
          <FAQView onOpenBooking={() => handleOpenBooking()} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Direct WhatsApp Button */}
      <WhatsAppFloatingButton onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceId={bookingInitialServiceId}
      />

      {/* Admin Login Modal (Triggered from Top Bar, Nav or Footer) */}
      <AdminLoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <MainAppContent />
    </AdminProvider>
  );
}
