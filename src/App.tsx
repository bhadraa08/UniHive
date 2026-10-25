import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UniHiveProvider, useUniHive } from './context/UniHiveContext';
import { IntroAnimation } from './components/intro/IntroAnimation';
import { AuthPage } from './components/auth/AuthPage';
import { AppLayout } from './components/layout/AppLayout';
import { DiscoverPage } from './components/pages/DiscoverPage';
import { AskHelpPage } from './components/pages/AskHelpPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { TeammatesPage } from './components/pages/TeammatesPage';
import { LostFoundPage } from './components/pages/LostFoundPage';
import { MyActivityPage } from './components/pages/MyActivityPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { PageTransition } from './components/common/PageTransition';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { PostDetailModal } from './components/modals/PostDetailModal';

const AppContent: React.FC = () => {
  const {
    introSeen,
    completeIntro,
    isAuthenticated,
    loginDemoUser,
    registerDemoUser,
    replayIntro,
    activeTab
  } = useUniHive();

  // Enforce instant scroll to top on any stage or page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [introSeen, isAuthenticated, activeTab]);

  // Stage 1: Dedicated Animated Brand Introduction
  if (!introSeen) {
    return <IntroAnimation onComplete={completeIntro} />;
  }

  // Stage 2: Intentional Split Authentication Experience (Login / Register)
  if (!isAuthenticated) {
    return (
      <AuthPage
        onLoginSuccess={loginDemoUser}
        onRegisterSuccess={registerDemoUser}
        onReplayIntro={replayIntro}
      />
    );
  }

  // Stage 3: Fully Navigable Discover Dashboard & Application Pages
  const renderActivePage = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverPage />;
      case 'ask':
        return <AskHelpPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'teams':
        return <TeammatesPage />;
      case 'lost-found':
        return <LostFoundPage />;
      case 'activity':
        return <MyActivityPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <AppLayout>
      <PageTransition activeTab={activeTab}>
        {renderActivePage()}
      </PageTransition>
      <CreatePostModal />
      <PostDetailModal />
    </AppLayout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UniHiveProvider>
        <AppContent />
      </UniHiveProvider>
    </ThemeProvider>
  );
}
