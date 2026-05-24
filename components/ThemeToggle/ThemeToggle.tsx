'use client';

import { useSyncExternalStore } from 'react';
import styles from './ThemeToggle.module.css';
import RetroSound from '@/utils/sound';

type Theme = 'dark' | 'light';

const DEFAULT_THEME: Theme = 'dark';

const readTheme = (): Theme => {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME;
  }

  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

const subscribeToTheme = (listener: () => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== 'portfolio-theme') return;

    if (event.newValue === 'light' || event.newValue === 'dark') {
      document.documentElement.setAttribute('data-theme', event.newValue);
    }
    listener();
  };

  window.addEventListener('theme-changed', listener);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('theme-changed', listener);
    window.removeEventListener('storage', handleStorage);
  };
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => DEFAULT_THEME);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // Play retro synth sound
    RetroSound.playToggle();

    // Add lock class to documentElement for smooth transition, then remove it
    const doc = document.documentElement;
    doc.classList.add('theme-toggling');
    doc.setAttribute('data-theme', newTheme);

    setTimeout(() => {
      doc.classList.remove('theme-toggling');
    }, 350);

    /* Persist to localStorage */
    try {
      localStorage.setItem('portfolio-theme', newTheme);
    } catch {
      /* localStorage might be unavailable */
    }

    window.dispatchEvent(new CustomEvent<Theme>('theme-changed', { detail: newTheme }));
  };

  return (
    <button
      className={`${styles.toggle} ${styles[theme]}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={styles.iconWrapper}>
        <span className={`${styles.icon} ${styles.sunIcon}`} aria-hidden="true">☀</span>
        <span className={`${styles.icon} ${styles.moonIcon}`} aria-hidden="true">☾</span>
      </div>
      <span className={styles.label}>MODE</span>
    </button>
  );
}
