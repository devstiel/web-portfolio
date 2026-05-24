'use client';

import styles from './SocialContact.module.css';
import { socialLinks } from '@/data/portfolioData';
import WindowFrame from '@/components/WindowFrame/WindowFrame';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import RetroSound from '@/utils/sound';

export default function SocialContact() {
  const emailLink = socialLinks.find((link) => link.platform === 'Email');

  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <SectionHeader
        icon="✉"
        title="contact/"
        subtitle="let&apos;s connect"
      />

      <div className={styles.content}>
        {/* Retro CRT Standby Monitor Launch Box */}
        <ScrollReveal direction="left">
          <a
            href="#dashboard"
            className={styles.monitorLaunchWrapper}
            onClick={() => RetroSound.playClick()}
            aria-label="Jump to the interactive homepage CLI console"
          >
            <WindowFrame title="terminal_standby.exe" variant="terminal" className={styles.compactFrame}>
              <div className={styles.standbyContent}>
                {/* Curved scanline screen overlay effect */}
                <div className={styles.scanlineOverlay} />
                
                <div className={styles.standbyScreen}>
                  <div className={styles.offlineHeader}>
                    <span className={styles.redDot} /> CORE_SYS: STANDBY
                  </div>
                  
                  <div className={styles.standbyTitle}>devy_relliani.sh</div>
                  
                  <p className={styles.standbyText}>
                    The live portfolio shell boots on the homepage. Jump back to run project indexes, QA skill metrics, contact commands, and system controls.
                  </p>
                  
                  <div className={styles.commandLine}>
                    <span className={styles.prompt}>$ </span>
                    <span className={styles.typingCmd}>cd /#dashboard</span>
                    <span className={styles.blinkingCaret}>█</span>
                  </div>

                  <div className={styles.launchBtnBox}>
                    <span className={styles.launchBtn}>
                      [ ▸ LAUNCH INTERACTIVE CONSOLE ]
                    </span>
                  </div>
                </div>
              </div>
            </WindowFrame>
          </a>
        </ScrollReveal>

        {/* Social links grid — Chunky solid-color brand tiles matching "Get In Touch" Reference */}
        <ScrollReveal direction="right">
          <div className={styles.socialGrid}>
            {socialLinks.map((link) => {
              // Convert brand names to match CSS modules: GitHub -> github, LinkedIn -> linkedin, etc.
              const platformClass = styles[link.platform.toLowerCase().replace('/', '').replace(' ', '')] || '';
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  className={`${styles.socialCard} ${platformClass}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${link.platform}: ${link.handle}`}
                  onClick={() => RetroSound.playClick()}
                >
                  <div className={styles.socialCardInner}>
                    <div className={styles.socialIconLarge}>{link.icon}</div>
                    <div className={styles.socialCardBottom}>
                      <span className={styles.socialPlatformLabel}>{link.platform}</span>
                      <span className={styles.socialPlatformHandle}>{link.handle}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <span className={styles.ctaText}>Interested in working together?</span>
          <a
            href={emailLink?.url ?? 'mailto:hello@example.com'}
            className={styles.ctaButton}
            onClick={() => RetroSound.playClick()}
          >
            ✉ Send a Message
          </a>
          <button
            type="button"
            className={styles.resumeButton}
            onClick={() => {
              RetroSound.playClick();
            }}
            aria-disabled="true"
            title="Resume file is not configured yet"
          >
            📄 Resume Soon
          </button>
        </div>
      </div>
    </section>
  );
}
