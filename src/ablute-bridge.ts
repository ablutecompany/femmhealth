/**
 * ablute_ Bridge
 *
 * Works in two contexts:
 *  1. Native WebView – context is injected via `injectedJavaScriptBeforeContentLoaded`
 *  2. Browser iframe – ablute_ shell sends context via window.postMessage
 */

function applyAbluteContext(user, health) {
  window.__ablute_user__ = user;
  window.__ablute_health__ = health;

  window.ablute = {
    getUser: () => window.__ablute_user__ ?? {},
    getHealth: () => window.__ablute_health__ ?? {},
    emit: (event, payload) => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event, payload }));
        return;
      }
      try { window.parent.postMessage(JSON.stringify({ event, payload }), '*'); } catch {}
      console.log('[ablute bridge]', event, payload);
    },
  };

  window.dispatchEvent(new CustomEvent('ablute:ready', { detail: { user, health } }));
}

// 1. Native WebView: context already injected
if (window.__ablute_user__ || window.__ablute_health__) {
  applyAbluteContext(window.__ablute_user__ ?? {}, window.__ablute_health__ ?? {});
}

// 2. Iframe: listen for postMessage from parent ablute_ shell
window.addEventListener('message', (event) => {
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (data && data.type === 'ABLUTE_CONTEXT') {
      applyAbluteContext(data.user ?? {}, data.health ?? {});
    }
  } catch {}
});

// Stub for standalone dev
if (!window.ablute) {
  applyAbluteContext({}, {});
}
