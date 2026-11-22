import React, { useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ServicesTab } from './components/ServicesTab';
import { ToolsTab } from './components/ToolsTab';
import { ProjectsTab } from './components/ProjectsTab';
import { ProfileTab } from './components/ProfileTab';
import { PortfolioModal } from './components/PortfolioModal';
import { CustomOrderModal } from './components/CustomOrderModal';

export default function App() {
  const {
    user,
    triggerHaptic,
    openTelegramLink,
    openExternalLink,
    showAlert,
  } = useTelegram();

  const [activeTab, setActiveTab] = useState('services');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const handleShare = () => {
    triggerHaptic('light');
    const shareUrl = 'https://t.me/Tools4GenzBot/app';
    const text = 'Tools4Genz - Custom Websites @ ₹499 (with Cloudflare Deployment & SEO), ₹19 Instant Portfolios, aur Developer Utilities:';
    openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
  };

  const handleContact = () => {
    triggerHaptic('light');
    openTelegramLink('https://t.me/alokmodanval');
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-800 flex flex-col font-sans relative selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-72 bg-gradient-to-b from-blue-100/40 via-cyan-50/20 to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Top Header with Original Tools4Genz Logo */}
      <Header
        user={user}
        onShare={handleShare}
        onContact={handleContact}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-3.5 pb-8">
        {activeTab === 'services' && (
          <ServicesTab
            onOpenPortfolioModal={() => setIsPortfolioModalOpen(true)}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
            onHaptic={triggerHaptic}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsTab
            onHaptic={triggerHaptic}
            showAlert={showAlert}
            openExternalLink={openExternalLink}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab
            onHaptic={triggerHaptic}
            openExternalLink={openExternalLink}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            user={user}
            onHaptic={triggerHaptic}
            showAlert={showAlert}
            openExternalLink={openExternalLink}
            openTelegramLink={openTelegramLink}
          />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabClick={() => triggerHaptic('selection')}
      />

      {/* ₹19 Portfolio Order Modal */}
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        user={user}
        onHaptic={triggerHaptic}
        showAlert={showAlert}
      />

      {/* ₹499 Custom Website Order Modal */}
      <CustomOrderModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        user={user}
        onHaptic={triggerHaptic}
        showAlert={showAlert}
      />
    </div>
  );
}
