'use client';

import { useState } from 'react';
import styles from './ProjectsGallery.module.css';
import { projects, projectCategories } from '@/data/portfolioData';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import PixelBadge from '@/components/PixelBadge/PixelBadge';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';

const statusClass: Record<string, string> = {
  completed: styles.completed,
  'in-progress': styles.inProgress,
  archived: styles.archived,
};

function getDifficultyStars(difficulty: number): string {
  return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
}

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className={styles.section} aria-label="Projects">
      <SectionHeader
        icon="◩"
        title="projects/"
        subtitle="shipped quests & ongoing missions"
      />

      {/* Filter buttons */}
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {projectCategories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.active : ''}`}
            onClick={() => setActiveFilter(cat.key)}
            aria-pressed={activeFilter === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className={styles.grid}>
        {filteredProjects.length === 0 && (
          <div className={styles.empty}>No projects found in this category.</div>
        )}

        {filteredProjects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 80}>
            <article className={styles.projectCard}>
              {/* Title bar */}
              <div className={styles.cardTitleBar}>
                <div className={styles.cardTitleLeft}>
                  <span className={styles.folderIcon} aria-hidden="true">📂</span>
                  <span className={styles.cardTitle}>{project.title}</span>
                </div>
                <span
                  className={`${styles.statusIndicator} ${statusClass[project.status] || ''}`}
                  title={project.status}
                  aria-label={`Status: ${project.status}`}
                />
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <PixelBadge text={project.category} variant="accent" className={styles.category} />
                  <span className={styles.difficulty} aria-label={`Difficulty: ${project.difficulty} out of 5`}>
                    {getDifficultyStars(project.difficulty)}
                  </span>
                </div>

                <p className={styles.cardDescription}>{project.description}</p>

                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <PixelBadge key={tech} text={tech} variant="default" />
                  ))}
                </div>
              </div>

              {/* Action links (expand on hover) */}
              <div className={styles.cardActions}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    className={styles.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ⌂ GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    className={styles.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ▸ Live Demo
                  </a>
                )}
                {project.links.caseStudy && (
                  <a
                    href={project.links.caseStudy}
                    className={styles.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Case Study
                  </a>
                )}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
