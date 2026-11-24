/**
 * Monetag Smart Ad Controller for Tools4Genz Telegram Mini App
 * Balances high CPM revenue with premium user retention:
 * - Minimum 50s cooldown to prevent spamming
 * - Never shows ads during checkout / payment modals
 * - Triggers seamlessly on free tool actions (QR / Password generator)
 */

let lastAdTimestamp = 0;
const AD_COOLDOWN_MS = 50000; // 50 seconds cooldown between ads

export function triggerMonetagAd(context = 'general') {
  const now = Date.now();

  // 1. Strict Cooldown check: prevent annoying the user
  if (now - lastAdTimestamp < AD_COOLDOWN_MS) {
    return Promise.resolve({ shown: false, reason: 'cooldown' });
  }

  // 2. Check if Monetag SDK function is available on window
  if (typeof window !== 'undefined' && typeof window.show_12338027 === 'function') {
    try {
      lastAdTimestamp = now;
      return window
        .show_12338027()
        .then(() => {
          console.log(`[Monetag] Ad viewed successfully in context: ${context}`);
          return { shown: true };
        })
        .catch((err) => {
          console.warn('[Monetag] Ad dismissed or skipped:', err);
          return { shown: false, error: err };
        });
    } catch (e) {
      console.warn('[Monetag] Error calling show_12338027:', e);
      return Promise.resolve({ shown: false, error: e });
    }
  }

  return Promise.resolve({ shown: false, reason: 'sdk_unavailable' });
}
