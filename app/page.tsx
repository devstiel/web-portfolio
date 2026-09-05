import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkGrid from "@/components/WorkGrid";
import Star from "@/components/Star";
import {
  capabilities,
  certifications,
  education,
  experiences,
  profile,
} from "@/data/portfolioData";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section
          className={`shell ${styles.hero}`}
          aria-labelledby="intro-title"
        >
          <div className={styles.heroTop}>
            <span className="eyebrow">Devy Relliani Saffiyah</span>
            <span className="eyebrow">Personal portfolio / 2026</span>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.nameBlock}>
              <p className={styles.hello}>Hello there, I’m</p>
              <h1 id="intro-title" className={styles.name}>
                DEVY
                <br />
                RELLIANI<span>.</span>
              </h1>
            </div>
            <div className={styles.heroAside}>
              <div className={styles.curiosityMark}>
                <Star />
                <span>
                  A curious mind.
                  <br />
                  <em>A creative streak.</em>
                </span>
              </div>
              <p className={styles.intro}>{profile.introduction}</p>
              <a href="#work" className="text-link">
                Take a look at my work{" "}
                <span className="arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
          <div className={styles.heroBottom}>
            <div>
              {profile.disciplines.map((item, index) => (
                <span key={item}>
                  {index > 0 && <i aria-hidden="true">/</i>}
                  {item}
                </span>
              ))}
            </div>
            <span className={styles.scrollNote}>
              A few things I’ve been part of <span aria-hidden="true">↙</span>
            </span>
          </div>
        </section>

        <section
          id="work"
          className={`shell ${styles.work}`}
          aria-labelledby="work-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className="section-label eyebrow">
                <span>01</span> Selected work
              </p>
              <h2 id="work-title">
                Different hats.
                <br />
                <em>Same curiosity.</em>
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              A selection of work across products,
              <br className={styles.desktopBreak} /> numbers, people, and a
              little illustration.
            </p>
          </div>
          <WorkGrid />
        </section>

        <section
          id="about"
          className={styles.about}
          aria-labelledby="about-title"
        >
          <div className={`shell ${styles.aboutGrid}`}>
            <div className={styles.aboutLeft}>
              <p className="section-label eyebrow">
                <span>02</span> A little about me
              </p>
              <h2 id="about-title">
                A bit of
                <br />
                <em>both worlds.</em>
              </h2>
              <div className={styles.aboutMark}>
                <span>LOGIC</span>
                <div className={styles.venn}>
                  <span />
                  <span />
                  <Star />
                </div>
                <span>IMAGINATION</span>
              </div>
            </div>
            <div className={styles.aboutCopy}>
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <a
                href={profile.socials[0].url}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                More about me on LinkedIn{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className={`shell ${styles.capabilities}`}>
            {capabilities.map((group, index) => (
              <div key={group.title}>
                <span className="eyebrow">
                  0{index + 1} / Things I work with
                </span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className={`shell ${styles.experience}`}
          aria-labelledby="experience-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className="section-label eyebrow">
                <span>03</span> The path so far
              </p>
              <h2 id="experience-title">
                Good work.
                <br />
                <em>Good company.</em>
              </h2>
            </div>
            <a className="pill-link" href={profile.resume} download>
              Download my CV{" "}
              <span className="arrow" aria-hidden="true">
                ↓
              </span>
              <span className="sr-only"> (PDF)</span>
            </a>
          </div>
          <div className={styles.timeline}>
            {experiences.map((experience, index) => (
              <details
                key={experience.company}
                className={styles.experienceRow}
                open={index === 0}
              >
                <summary>
                  <span className={styles.period}>{experience.period}</span>
                  <span className={styles.job}>
                    <strong>{experience.company}</strong>
                    <span>{experience.role}</span>
                  </span>
                  <span className={styles.expand} aria-hidden="true" />
                </summary>
                <div className={styles.experienceDetail}>
                  <p>{experience.detail}</p>
                </div>
              </details>
            ))}
          </div>
          <div className={styles.education}>
            <div>
              <p className="eyebrow">Education</p>
              <h3>{education.institution}</h3>
              <p>
                {education.degree}
                <br />
                {education.period} · GPA {education.gpa}
              </p>
            </div>
            <div>
              <p className="eyebrow">Scholarships</p>
              <ul>
                {education.scholarships.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Continued learning</p>
              <ul>
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
