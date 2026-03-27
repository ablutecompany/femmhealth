import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const defaultProfile = {
  name: '',
  dateOfBirth: null,
  lifeStage: 'general',     // cycle | trying-to-conceive | pregnant | postpartum | perimenopause | menopause | general
  priorities: [],            // max 3 from PRIORITIES keys
  personalizationLevel: 'balanced',  // minimal | balanced | maximum
  useAbluteData: true,
  shareWithMealPlanner: false,
  shareWithEcosystem: false,
  favoriteTopics: [],
  onboardingCompleted: false,
  onboardingSkipped: false,
  logs: [],
};

const SanctuaryContext = createContext(null);

/** Derive cycle phase from day of cycle */
function getCyclePhase(day, cycleLength = 28) {
  if (!day || day < 1) return 'unknown';
  if (day <= 5) return 'menstrual';
  if (day <= Math.round(cycleLength * 0.46)) return 'follicular';
  if (day <= Math.round(cycleLength * 0.57)) return 'ovulation';
  return 'luteal';
}

/** Determine pack freshness from ablute health data */
function computePackStatus(health) {
  if (!health || Object.keys(health).length === 0) return 'missing';
  if (!health.updatedAt) return 'fresh';
  const daysDiff = (Date.now() - new Date(health.updatedAt).getTime()) / 86400000;
  return daysDiff < 7 ? 'fresh' : 'stale';
}

export const SanctuaryProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sanctuary_profile');
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [abluteUser,   setAbluteUser]   = useState({});
  const [abluteHealth, setAbluteHealth] = useState({});
  const [ablutePackStatus, setAblutePackStatus] = useState('checking'); // checking | fresh | stale | missing

  // ── Listen for ablute context ─────────────────────────────
  useEffect(() => {
    const handleReady = (e) => {
      const { user, health } = e.detail || {};
      const u = user   || {};
      const h = health || {};
      setAbluteUser(u);
      setAbluteHealth(h);
      setAblutePackStatus(computePackStatus(h));

      // Pre-fill name from ablute if profile is empty
      if (u.name && !profile.name) {
        setProfile(prev => ({ ...prev, name: u.name }));
      }
    };

    window.addEventListener('ablute:ready', handleReady);

    // If ablute is already initialised by the time we mount
    if (window.ablute) {
      const u = window.ablute.getUser();
      const h = window.ablute.getHealth();
      handleReady({ detail: { user: u, health: h } });
    }

    // Fallback: after 2.5s still checking → mark missing
    const timeout = setTimeout(() => {
      setAblutePackStatus(prev => (prev === 'checking' ? 'missing' : prev));
    }, 2500);

    return () => {
      window.removeEventListener('ablute:ready', handleReady);
      clearTimeout(timeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Profile helpers ───────────────────────────────────────
  const updateProfile = useCallback((updates) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      try { localStorage.setItem('sanctuary_profile', JSON.stringify(next)); } catch {}
      return next;
    });
    // Emit to ecosystem
    if (window.ablute?.emit) {
      window.ablute.emit('sanctuary:profile-updated', updates);
    }
  }, []);

  const addLog = useCallback((log) => {
    setProfile(prev => {
      const next = {
        ...prev,
        logs: [...(prev.logs || []).slice(-49), { ...log, timestamp: Date.now() }],
      };
      try { localStorage.setItem('sanctuary_profile', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const completeOnboarding = useCallback((data) => {
    updateProfile({ ...data, onboardingCompleted: true, onboardingSkipped: false });
  }, [updateProfile]);

  const skipOnboarding = useCallback(() => {
    updateProfile({ onboardingSkipped: true });
  }, [updateProfile]);

  const triggerMealPlannerHandoff = useCallback(() => {
    if (window.ablute?.emit) {
      window.ablute.emit('sanctuary:share-nutrition-context', {
        lifeStage:  profile.lifeStage,
        priorities: profile.priorities,
        health:     abluteHealth,
      });
    }
    updateProfile({ shareWithMealPlanner: true });
  }, [profile.lifeStage, profile.priorities, abluteHealth, updateProfile]);

  // ── Derived values ────────────────────────────────────────
  const lifeStage  = profile.lifeStage || 'general';
  const cycleDay   = profile.useAbluteData ? (abluteHealth?.cycleDay || null) : null;
  const cycleLength = abluteHealth?.cycleLength || 28;
  const cyclePhase = getCyclePhase(cycleDay, cycleLength);

  // Show onboarding if never completed and never skipped
  const showOnboarding = !profile.onboardingCompleted && !profile.onboardingSkipped;

  return (
    <SanctuaryContext.Provider
      value={{
        // Profile
        profile,
        updateProfile,
        addLog,
        completeOnboarding,
        skipOnboarding,
        triggerMealPlannerHandoff,
        showOnboarding,

        // Life stage & cycle
        lifeStage,
        cycleDay,
        cyclePhase,

        // Ablute ecosystem
        abluteUser,
        abluteHealth,
        ablutePackStatus,
      }}
    >
      {children}
    </SanctuaryContext.Provider>
  );
};

export const useSanctuary = () => {
  const ctx = useContext(SanctuaryContext);
  if (!ctx) throw new Error('useSanctuary must be used inside <SanctuaryProvider>');
  return ctx;
};
