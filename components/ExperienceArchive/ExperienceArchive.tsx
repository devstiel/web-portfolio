import styles from './ExperienceArchive.module.css';
import { experiences } from '@/data/portfolioData';
import WindowFrame from '@/components/WindowFrame/WindowFrame';
import PixelBadge from '@/components/PixelBadge/PixelBadge';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';

const typeBadgeVariant = {
  work: 'accent' as const,
  internship: 'purple' as const,
  freelance: 'success' as const,
  organization: 'warning' as const,
};

export default function ExperienceArchive() {
  return (
    <section id="experience" className={styles.section} aria-label="Experience">
      <SectionHeader
        icon="◧"
        title="experience_log/"
        subtitle="work history & organizations"
      />

      <div className={styles.timeline}>
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.id} delay={i * 100}>
            <div className={`${styles.entry} ${styles[exp.type]}`}>
              <WindowFrame
                title={`${exp.company.toLowerCase().replace(/\s+/g, '_')}.log`}
                variant="folder"
              >
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardLeft}>
                      <span className={styles.companyName}>{exp.company}</span>
                      <span className={styles.roleTitle}>{exp.role}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <PixelBadge
                        text={exp.type}
                        variant={typeBadgeVariant[exp.type]}
                        className={styles.typeBadge}
                      />
                      <span className={styles.period}>{exp.period}</span>
                    </div>
                  </div>

                  <p className={styles.description}>{exp.description}</p>

                  <div className={styles.achievements}>
                    {exp.achievements.map((achievement, j) => (
                      <span key={j} className={styles.achievement}>{achievement}</span>
                    ))}
                  </div>

                  <div className={styles.tools}>
                    {exp.tools.map((tool) => (
                      <PixelBadge key={tool} text={tool} variant="default" />
                    ))}
                  </div>
                </div>
              </WindowFrame>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
