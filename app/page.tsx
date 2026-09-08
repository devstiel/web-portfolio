import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkGrid from "@/components/WorkGrid";
import StarSculpture from "@/components/StarSculpture";
import ScrollReveals from "@/components/ScrollReveals";
import WorkLenses from "@/components/WorkLenses";
import ExperienceItem from "@/components/ExperienceItem";
import RevealHeading from "@/components/RevealHeading";
import Image from "next/image";
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
      <ScrollReveals />
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
                <span className={styles.nameLine}>DEVY</span>
                <br />
                <span className={styles.nameLine}>
                  RELLIANI<span className={styles.periodMark}>.</span>
                </span>
              </h1>
            </div>
            <div className={styles.heroAside}>
              <div className={styles.curiosityMark}>
                <StarSculpture />
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
              <RevealHeading
                id="work-title"
                first="Different hats."
                second="Same curiosity."
              />
            </div>
            <p className={styles.sectionIntro} data-reveal>
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
              <div>
                <p className="section-label eyebrow">
                  <span>02</span> A little about me
                </p>
                <RevealHeading
                  id="about-title"
                  first="A bit of"
                  second="both worlds."
                />
              </div>
              <WorkLenses />
            </div>
            <div className={styles.aboutCopy}>
              <figure className={styles.portrait} data-reveal>
                <Image
                  src="/work/devy-portrait.webp"
                  alt="Devy wearing her ITS Social Media team shirt and giving a peace sign."
                  width={1287}
                  height={855}
                  sizes="(max-width: 540px) 70vw, 260px"
                />
                <figcaption>
                  Me, somewhere between the brief and the next idea.
                </figcaption>
              </figure>
              {profile.about.map((paragraph) => (
                <p key={paragraph} data-reveal>
                  {paragraph}
                </p>
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
              <div key={group.title} data-reveal data-reveal-delay={index * 70}>
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
              <RevealHeading
                id="experience-title"
                first="Good work."
                second="Good company."
              />
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
              <div key={experience.company} data-reveal="row">
                <span
                  className={styles.revealRule}
                  data-reveal-rule
                  aria-hidden="true"
                />
                <ExperienceItem
                  className={styles.experienceRow}
                  initiallyOpen={index === 0}
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
                </ExperienceItem>
              </div>
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
