import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSanctuary } from './context/SanctuaryContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import Nutrition from './pages/Nutrition';
import Library from './pages/Library';
import Profile from './pages/Profile';
import LogSymptoms from './pages/LogSymptoms';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Community from './pages/Community';
import Onboarding from './pages/Onboarding';

const AppHeader = () => {
  const { ablutePackStatus } = useSanctuary();

  return (
    <header className="fixed top-0 w-full z-50">
      <div
        className="px-6 py-4 max-w-4xl mx-auto flex justify-between items-center"
        style={{ background: 'rgba(250, 247, 244, 0.82)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(154, 104, 96, 0.14)' }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <span
            className="text-on-surface font-display font-light text-xl tracking-wide"
            style={{ letterSpacing: '0.05em' }}
          >
            Her Sanctuary
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Pack status indicator */}
          {(ablutePackStatus === 'missing' || ablutePackStatus === 'stale') && (
            <div
              className="w-2 h-2 rounded-full mr-2"
              title={ablutePackStatus === 'missing' ? 'Pack ablute_ ausente' : 'Pack ablute_ desatualizado'}
              style={{ background: ablutePackStatus === 'missing' ? '#9a6860' : '#b09470' }}
            />
          )}
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const { showOnboarding, skipOnboarding, completeOnboarding } = useSanctuary();

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} onSkip={skipOnboarding} />;
  }

  return (
    <div className="min-h-screen pb-32 gradient-warm">
      <AppHeader />

      <Routes>
        <Route path="/"             element={<Dashboard />} />
        <Route path="/journey"      element={<Journey />} />
        <Route path="/nutrition"    element={<Nutrition />} />
        <Route path="/library"      element={<Library />} />
        <Route path="/profile"      element={<Profile />} />
        <Route path="/log-symptoms" element={<LogSymptoms />} />
        <Route path="/news"         element={<News />} />
        <Route path="/news/:id"     element={<ArticleDetail />} />
        <Route path="/community"    element={<Community />} />
        {/* Legacy redirect */}
        <Route path="/pregnancy"    element={<Journey />} />
      </Routes>

      <Navigation />
    </div>
  );
};

export default App;
