import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNavigation } from './MobileNavigation';
import { NotificationsDrawer } from './NotificationsDrawer';
import { ToastFeedback } from '../common/ToastFeedback';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { useTheme } from '../../context/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col md:flex-row antialiased selection:bg-lavender selection:text-plum transition-colors duration-200 ${
      isDark ? 'bg-[#191420] text-[#F8F0E8]' : 'bg-[#F7F1E8] text-[#302631]'
    }`}>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-10">
        {/* Mobile Header + Bottom Navigation */}
        <MobileNavigation onToggleNotifications={() => setNotificationsOpen(true)} />

        {/* Desktop TopBar */}
        <div className="hidden md:block">
          <TopBar onToggleNotifications={() => setNotificationsOpen(true)} />
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-7xl w-full mx-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Campus Notifications Slide-Over Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Floating System Toasts */}
      <ToastFeedback />
    </div>
  );
};
