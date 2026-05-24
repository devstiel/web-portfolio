'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import styles from './Navbar.module.css';
import { navItems, personalInfo } from '@/data/portfolioData';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import RetroSound from '@/utils/sound';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMuted = useSyncExternalStore(
    RetroSound.subscribe,
    RetroSound.getMuted,
    RetroSound.getServerMuted
  );

  /* Scroll-spy: track which section is in view */
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));

    const handleScroll = () => {
      const scrollY = window.scrollY + 100;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      window.location.href = `/${href}`;
    },
    []
  );

  const toggleMute = () => {
    const muted = RetroSound.toggleMute();
    if (!muted) {
      // Play a quick test click to confirm audio is active
      setTimeout(() => {
        RetroSound.playClick();
      }, 50);
    }
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.inner}>
        {/* Brand */}
        <a
          href="#dashboard"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault();
            RetroSound.playClick();
            handleNavClick('#dashboard');
          }}
        >
          <span className={styles.brandIcon}>◉</span>
          <span className={styles.brandName}>
            {personalInfo.name.toLowerCase().replace(' ', '_')}.exe
          </span>
          <span className={styles.cursor} aria-hidden="true" />
        </a>

        {/* Desktop menu */}
        <ul className={styles.menu} role="list">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.menuLink} ${activeSection === sectionId ? styles.active : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    RetroSound.playClick();
                    handleNavClick(item.href);
                  }}
                >
                  <span className={styles.menuIcon} aria-hidden="true">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions: speaker + theme toggle + hamburger */}
        <div className={styles.actions}>
          <button
            className={`${styles.muteBtn} ${isMuted ? styles.muted : ''}`}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute retro sounds' : 'Mute retro sounds'}
            title={isMuted ? 'Unmute retro sounds' : 'Mute retro sounds'}
          >
            <span className={styles.speakerIcon}>{isMuted ? '🔇' : '🔊'}</span>
            <span className={styles.muteLabel}>SFX</span>
          </button>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => {
              RetroSound.playClick();
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`} role="menu">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.mobileLink} ${activeSection === sectionId ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  RetroSound.playClick();
                  handleNavClick(item.href);
                }}
                role="menuitem"
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
