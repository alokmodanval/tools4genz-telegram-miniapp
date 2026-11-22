import { useEffect, useState, useMemo } from 'react';

export function useTelegram() {
  const tg = useMemo(() => {
    return typeof window !== 'undefined' && window.Telegram?.WebApp
      ? window.Telegram.WebApp
      : null;
  }, []);

  const [user, setUser] = useState(null);
  const [colorScheme, setColorScheme] = useState('dark');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (tg) {
      try {
        tg.ready();
        tg.expand();
        setIsExpanded(true);
        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        }
        if (tg.colorScheme) {
          setColorScheme(tg.colorScheme);
        }
      } catch (err) {
        console.warn('Telegram WebApp init warning:', err);
      }
    }
  }, [tg]);

  // Haptic Feedback wrapper
  const triggerHaptic = (type = 'light') => {
    if (!tg?.HapticFeedback) return;
    try {
      if (type === 'light' || type === 'medium' || type === 'heavy') {
        tg.HapticFeedback.impactOccurred(type);
      } else if (type === 'success' || type === 'warning' || type === 'error') {
        tg.HapticFeedback.notificationOccurred(type);
      } else if (type === 'selection') {
        tg.HapticFeedback.selectionChanged();
      }
    } catch (e) {
      console.warn('Haptics error:', e);
    }
  };

  // Open Telegram links safely
  const openTelegramLink = (url) => {
    triggerHaptic('light');
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Open external links
  const openExternalLink = (url) => {
    triggerHaptic('light');
    if (tg?.openLink) {
      tg.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Show Telegram native popup or fallback alert
  const showAlert = (message, callback) => {
    triggerHaptic('medium');
    if (tg?.showAlert) {
      tg.showAlert(message, callback);
    } else {
      alert(message);
      if (callback) callback();
    }
  };

  // Show Telegram confirmation popup
  const showConfirm = (message, callback) => {
    triggerHaptic('medium');
    if (tg?.showConfirm) {
      tg.showConfirm(message, callback);
    } else {
      const res = confirm(message);
      if (callback) callback(res);
    }
  };

  return {
    tg,
    user: user || {
      first_name: 'Gen-Z Creator',
      username: 'creator',
      id: '12345678',
      photo_url: null,
    },
    isTelegram: Boolean(tg && tg.initData),
    colorScheme,
    isExpanded,
    triggerHaptic,
    openTelegramLink,
    openExternalLink,
    showAlert,
    showConfirm,
  };
}
