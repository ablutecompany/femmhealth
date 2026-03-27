/**
 * ablute_ Bridge — Her Sanctuary
 *
 * Works in three contexts:
 *  1. Native WebView – context injected via `injectedJavaScriptBeforeContentLoaded`
 *  2. Browser iframe  – ablute_ shell sends context via window.postMessage
 *  3. Standalone dev  – stub with mock data for local development
 */

interface AbluteUser {
  id?: string;
  name?: string;
  email?: string;
  dateOfBirth?: string;
  [key: string]: unknown;
}

interface AbluteHealth {
  cycleDay?: number;
  cycleLength?: number;
  lastPeriodDate?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    __ablute_user__?: AbluteUser;
    __ablute_health__?: AbluteHealth;
    ablute?: {
      getUser: () => AbluteUser;
      getHealth: () => AbluteHealth;
      getPackStatus: () => 'fresh' | 'stale' | 'missing';
      emit: (event: string, payload: unknown) => void;
    };
    ReactNativeWebView?: { postMessage: (msg: string) => void };
  }
}

function getPackFreshness(health: AbluteHealth): 'fresh' | 'stale' | 'missing' {
  if (!health || Object.keys(health).length === 0) return 'missing';
  if (!health.updatedAt) return 'fresh'; // has data but no timestamp — assume fresh
  const days = (Date.now() - new Date(health.updatedAt as string).getTime()) / 86400000;
  return days < 7 ? 'fresh' : 'stale';
}

function applyAbluteContext(user: AbluteUser, health: AbluteHealth) {
  window.__ablute_user__   = user;
  window.__ablute_health__ = health;

  window.ablute = {
    getUser:       () => window.__ablute_user__   ?? {},
    getHealth:     () => window.__ablute_health__ ?? {},
    getPackStatus: () => getPackFreshness(window.__ablute_health__ ?? {}),

    emit: (event: string, payload: unknown) => {
      const message = JSON.stringify({ event, payload });
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(message);
        return;
      }
      try {
        window.parent.postMessage(message, '*');
      } catch { /* cross-origin */ }
      console.log('[ablute bridge]', event, payload);
    },
  };

  window.dispatchEvent(new CustomEvent('ablute:ready', { detail: { user, health } }));
}

// 1. Native WebView: context already injected before page load
if (window.__ablute_user__ || window.__ablute_health__) {
  applyAbluteContext(window.__ablute_user__ ?? {}, window.__ablute_health__ ?? {});
}

// 2. Iframe: listen for postMessage from ablute_ shell
window.addEventListener('message', (event) => {
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (data && data.type === 'ABLUTE_CONTEXT') {
      applyAbluteContext(data.user ?? {}, data.health ?? {});
    }
  } catch { /* ignore parse errors */ }
});

// 3. Standalone dev stub — provides a realistic mock context
if (!window.ablute) {
  applyAbluteContext(
    {
      id:          'dev-user',
      name:        '',       // intentionally empty to trigger profile setup
      dateOfBirth: '',
    },
    {
      // Empty health = "missing pack" state in standalone dev
      // To simulate a fresh pack, uncomment:
      // cycleDay: 12,
      // cycleLength: 28,
      // lastPeriodDate: '2026-03-16',
      // updatedAt: new Date().toISOString(),
    }
  );
}
