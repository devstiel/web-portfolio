'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroDashboard.module.css';
import { personalInfo, stats } from '@/data/portfolioData';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import WindowFrame from '@/components/WindowFrame/WindowFrame';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import RetroTerminal from '@/components/RetroTerminal/RetroTerminal';
import RetroSound from '@/utils/sound';

const EASTER_EGGS = [
  "It works on my machine! 🖥️",
  "QA: 'I broke it.' Dev: 'How?' QA: 'I just clicked it.' 🐛",
  "There's no place like 127.0.0.1 🏠",
  "99 little bugs in the code... compile, patch... 127 bugs! 🎤",
  "Matching coffee intake to compiler warnings... ☕",
  "Leveling up cloud infrastructure! ☁️",
  "Have you tried turning it off and on again? 🔌",
  "QA Specialist at your service, ready to squash bugs! 🧪",
];

export default function HeroDashboard() {
  const [bubbleText, setBubbleText] = useState('');
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
    };
  }, []);

  const triggerAvatarEasterEgg = () => {
    // Play laser sound
    RetroSound.playEasterEgg();

    // Select random joke
    const randomIndex = Math.floor(Math.random() * EASTER_EGGS.length);
    setBubbleText(EASTER_EGGS[randomIndex]);
    setIsBubbleVisible(true);
    setClickCount((prev) => prev + 1);

    // Hide after 3.5 seconds
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }

    bubbleTimeoutRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 3500);
  };

  return (
    <section id="dashboard" className={styles.heroWrapper} aria-label="Dashboard">
      <div className={styles.heroIntro}>
        <div className={styles.introSplitGrid}>
          {/* Left Column — Bio & Title Info */}
          <div className={styles.introContent}>
            <span className={styles.introGreeting}>
              <span className={styles.greenDot} /> [QUEST_START] 👾 HELLO, WORLD!
            </span>

            <h1 className={styles.heroTitle}>
              I&apos;m <span className={styles.highlightName}>{personalInfo.name}</span>,<br />
              a <strong className={styles.highlightRole}>{personalInfo.role}</strong>.
            </h1>

            <p className={styles.heroSubtitle}>
              Crafting highly reliable web applications and automating test pipelines, one quest at a time.
            </p>

            <div className={styles.introCtaButtons}>
              <a
                href="#character-hud"
                className={styles.scrollDownBtn}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('character-hud')?.scrollIntoView({ behavior: 'smooth' });
                  RetroSound.playClick();
                }}
              >
                [ EXPLORE HUD ▼ ]
              </a>

              <a
                href="/terminal"
                className={styles.dedicatedConsoleLink}
                onClick={() => RetroSound.playClick()}
              >
                [ DEDICATED CONSOLE ↗ ]
              </a>
            </div>
          </div>

          {/* Right Column — Retro Interactive Terminal */}
          <div className={styles.terminalContainer}>
            <RetroTerminal landing className={styles.heroTerminal} />
          </div>
        </div>
      </div>

      {/* Spaced out Console & Stats grid section */}
      <div id="character-hud" className={styles.gridSection}>
        <div className={styles.grid}>
          {/* Left — Character HUD Profile Console */}
          <ScrollReveal direction="left" delay={100}>
            <WindowFrame title="~/character_hud.exe" variant="default" className={styles.profileFrame}>
              <div className={styles.introCard}>
                {/* Avatar + HUD Info */}
                <div className={styles.avatarRow}>
                  <div className={styles.avatarContainer}>
                    <div
                      className={styles.avatar}
                      onClick={triggerAvatarEasterEgg}
                      role="button"
                      aria-label="Click me for a surprise"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          triggerAvatarEasterEgg();
                        }
                      }}
                    >
                      <div className={styles.avatarPixel} aria-label="Avatar">{'👾'}</div>
                    </div>
                    {isBubbleVisible && (
                      <div className={styles.speechBubble}>
                        {bubbleText}
                        {clickCount > 5 && <div className={styles.clickBonus}>XP multiplier active! ⚡</div>}
                        <div className={styles.bubbleTail} />
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.nameGroup}>
                    <h2 className={styles.hudName}>{personalInfo.name}</h2>
                    <div className={styles.statusBadge}>
                      <span className={`${styles.statusDot} ${styles[personalInfo.statusType]}`} />
                      <span className={styles.statusText}>{personalInfo.status}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Learning Row */}
                <div className={styles.statusRow}>
                  <div className={styles.statusCard}>
                    <div>
                      <div className={styles.statusLabel}>Active Guild</div>
                      <div className={styles.statusValue}>NovaTech Engineering</div>
                    </div>
                  </div>
                  <div className={styles.statusCard}>
                    <div>
                      <div className={styles.statusLabel}>Equipped Tools</div>
                      <div className={styles.statusValue}>React, TS, Cypress</div>
                    </div>
                  </div>
                </div>

                {/* XP Bar */}
                <div className={styles.xpSection}>
                  <div className={styles.xpHeader}>
                    <span className={styles.xpLevel}>Level {personalInfo.level} (QA Advocate)</span>
                    <span className={styles.xpText}>
                      {(personalInfo.xp + (clickCount * 10)).toLocaleString()} / {personalInfo.maxXp.toLocaleString()} XP
                    </span>
                  </div>
                  <ProgressBar
                    value={personalInfo.xp + (clickCount * 10)}
                    maxValue={personalInfo.maxXp}
                    color="yellow"
                    size="md"
                    animated
                  />
                </div>

                {/* CTA Buttons */}
                <div className={styles.ctaRow}>
                  <a
                    href="#projects"
                    className={styles.ctaPrimary}
                    onClick={() => RetroSound.playClick()}
                  >
                    {'▸'} View Projects
                  </a>
                  <a
                    href="#contact"
                    className={styles.ctaSecondary}
                    onClick={() => RetroSound.playClick()}
                  >
                    {'✉'} Contact Me
                  </a>
                </div>
              </div>
            </WindowFrame>
          </ScrollReveal>

          {/* Right — Stats + Mission */}
          <div className={styles.statsPanel}>
            <ScrollReveal direction="right" delay={150}>
              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <div key={stat.label} className={styles.statCard}>
                    <span className={styles.statIcon}>{stat.icon}</span>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className={styles.missionCard}>
                <span className={styles.missionLabel}>🎯 Main Quest</span>
                <p className={styles.missionText}>{personalInfo.currentMission}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={250}>
              <div className={styles.missionCard}>
                <span className={styles.missionLabel}>📖 Currently Learning</span>
                <p className={styles.missionText}>{personalInfo.currentlyLearning}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
