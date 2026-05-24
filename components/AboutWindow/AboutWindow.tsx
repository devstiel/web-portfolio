'use client';

import { useState } from 'react';
import styles from './AboutWindow.module.css';
import { aboutData } from '@/data/portfolioData';
import WindowFrame from '@/components/WindowFrame/WindowFrame';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import PixelBadge from '@/components/PixelBadge/PixelBadge';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import RetroSound from '@/utils/sound';
import { useToast } from '@/components/Toast/ToastProvider';

interface Quest {
  text: string;
  completed: boolean;
}

export default function AboutWindow() {
  const { toast } = useToast();
  
  // Parse static quests into interactive state
  const [quests, setQuests] = useState<Quest[]>(() =>
    aboutData.sideQuests.map((q) => ({
      text: q.substring(2),
      completed: q.startsWith('☑'),
    }))
  );

  const toggleQuest = (index: number) => {
    const targetQuest = quests[index];
    if (!targetQuest) return;

    const nextState = !targetQuest.completed;

    // Trigger side-effects safely inside the event handler (outside setState calculation)
    if (nextState) {
      RetroSound.playQuestComplete();
      toast('Quest Complete!', `+500 XP: ${targetQuest.text}`, 'achievement');
    } else {
      RetroSound.playClick();
    }

    setQuests((prev) =>
      prev.map((q, i) => (i === index ? { ...q, completed: nextState } : q))
    );
  };

  return (
    <section id="about" className={styles.section} aria-label="About Me">
      <SectionHeader icon="◫" title="about_me.txt" subtitle="who am I?" />

      <div className={styles.content}>
        {/* Left — Notepad window */}
        <ScrollReveal direction="left">
          <WindowFrame title="about_me.txt" variant="notepad">
            <div className={styles.fileContent}>
              {/* Dynamic CSS Counter container */}
              <div className={styles.notepadContainer}>
                <div className={styles.bioText}>
                  {aboutData.bio.map((paragraph, i) => (
                    <p key={i} className={styles.bioPara}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Personality tags */}
              <div className={styles.tags}>
                {aboutData.personalityTags.map((tag) => (
                  <PixelBadge key={tag} text={tag} variant="accent" />
                ))}
              </div>
            </div>
          </WindowFrame>
        </ScrollReveal>

        {/* Right — Sidebar cards */}
        <div className={styles.sidebar}>
          <ScrollReveal direction="right" delay={100}>
            <div className={styles.sideCard}>
              <span className={styles.sideLabel}>🎯 Current Mission</span>
              <p className={styles.sideText}>{aboutData.currentMission}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div className={styles.sideCard}>
              <span className={styles.sideLabel}>⚔️ Side Quests</span>
              <div className={styles.questList}>
                {quests.map((quest, i) => (
                  <button
                    key={i}
                    className={`${styles.questItem} ${quest.completed ? styles.completed : ''}`}
                    onClick={() => toggleQuest(i)}
                    aria-label={`Toggle quest: ${quest.text}`}
                  >
                    <span className={styles.checkboxIcon} aria-hidden="true">
                      {quest.completed ? '☑' : '☐'}
                    </span>
                    <span className={styles.questText}>{quest.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={300}>
            <div className={styles.sideCard}>
              <span className={styles.sideLabel}>✨ Fun Facts</span>
              <div className={styles.factsList}>
                {aboutData.funFacts.map((fact, i) => (
                  <button
                    type="button"
                    key={i}
                    className={styles.factItem}
                    onClick={() => RetroSound.playClick()}
                  >
                    {fact}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
