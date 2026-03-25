/**
 * ablute_ Bridge
 *
 * Works in two contexts:
 *  1. Native WebView – context is injected via `injectedJavaScriptBeforeContentLoaded`.
 *     → window.ablute is already set; ablute:ready CustomEvent is dispatched.
 *  2. Browser iframe – ablute_ shell sends context via window.postMessage.
 *     → We listen here and populate window.ablute on receipt.
 */

declare global {
  interface Window {
    ablute?: {
      getUser: () => Record<string, unknown>;
      getHealth: () => Record<string, unknown>;
      emit: (event: string, payload?: unknown) => void;
    };
    __ablute_user__?: Record<string, unknown>;
    __ablute_health__?: Record<string, unknown>;
    ReactNativeWebView?: { postMessage: (message: string) => void };
  }
}

function applyContext(user: Record<string, unknown>, health: Record<string, unknown>) {
  window.__ablute_user__   = user;
  window.__ablute_health__ = health;

  window.ablute = {
    getUser:   () => window.__ablute_user__   ?? {},
    getHealth: () => window.__ablute_health__ ?? {},
    emit: (event: string, payload?: unknown) => {
      // Native WebView path
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event, payload }));
        return;
      }
      // Iframe path — send to parent window
      try {
        window.parent.postMessage(JSON.stringify({ event, payload }), '*');
      } catch {}
      console.log('[ablute bridge]', event, payload);
    },
  };

  // Notify the app that context is ready
  window.dispatchEvent(
    new CustomEvent('ablute:ready', { detail: { user, health } })
  );
}

// ── 1. Native WebView: already injected → trigger ready if context exists ──
if (window.__ablute_user__ || window.__ablute_health__) {
  applyContext(window.__ablute_user__ ?? {}, window.__ablute_health__ ?? {});
}

// ── 2. Iframe: listen for postMessage from parent ──────────────────────────
window.addEventListener('message', (event: MessageEvent) => {
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (data?.type === 'ABLUTE_CONTEXT') {
      applyContext(data.user ?? {}, data.health ?? {});
    }
  } catch {}
});

// ── Stub for standalone dev (no parent, no injection) ─────────────────────
if (!window.ablute) {
  applyContext({}, {});
}

export {};
