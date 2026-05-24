'use client';

import { useState } from 'react';
import styles from './SkillsInventory.module.css';
import { skills, skillCategories } from '@/data/portfolioData';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import PixelBadge from '@/components/PixelBadge/PixelBadge';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';

const rarityVariant = {
  common: 'default' as const,
  uncommon: 'success' as const,
  rare: 'blue' as const,
  epic: 'purple' as const,
  legendary: 'legendary' as const,
};

const rarityColor = {
  common: 'green' as const,
  uncommon: 'green' as const,
  rare: 'blue' as const,
  epic: 'purple' as const,
  legendary: 'orange' as const,
};

export default function SkillsInventory() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className={styles.section} aria-label="Skills">
      <SectionHeader
        icon="◈"
        title="skills_inventory/"
        subtitle="character stats & abilities"
      />

      {/* Category tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Skill categories">
        {skillCategories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.tab} ${activeCategory === cat.key ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.key)}
            role="tab"
            aria-selected={activeCategory === cat.key}
            aria-controls={`panel-${cat.key}`}
          >
            <span className={styles.tabIcon} aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div
        className={styles.grid}
        role="tabpanel"
        id={`panel-${activeCategory}`}
        aria-label={`${activeCategory} skills`}
      >
        {filteredSkills.map((skill, i) => (
          <ScrollReveal key={skill.name} delay={i * 50}>
            <div className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={styles.skillInfo}>
                  <span className={styles.skillIcon} aria-hidden="true">{skill.icon}</span>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
                <PixelBadge
                  text={skill.rarity}
                  variant={rarityVariant[skill.rarity]}
                  className={styles.rarityBadge}
                />
              </div>
              <ProgressBar
                value={skill.level}
                maxValue={skill.maxLevel}
                showLevel
                color={rarityColor[skill.rarity]}
                size="sm"
                animated
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
