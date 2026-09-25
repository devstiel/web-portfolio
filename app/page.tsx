import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WorkGrid from "@/components/WorkGrid";
import StarSculpture from "@/components/StarSculpture";
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
          <div className={styles.heroCopy}>
            <p className={styles.hello}>Hello, I’m</p>
            <h1 id="intro-title" className={styles.name}>
              Devy Relliani<span>.</span>
            </h1>
            <ul className={styles.disciplines} aria-label="Areas of work">
              {profile.disciplines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.intro}>{profile.introduction}</p>
            <a href="#work" className="text-link">
              View selected work{" "}
              <span className="arrow" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
          <div className={styles.heroAccent}>
            <StarSculpture />
          </div>
        </section>

        <section
          id="work"
          className={`shell ${styles.work}`}
          aria-labelledby="work-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className="eyebrow">01 / Portfolio</p>
              <h2 id="work-title">Selected work</h2>
            </div>
            <p className={styles.sectionIntro}>
              Product testing, business reporting, creative leadership, and
              illustration.
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
            <div>
              <p className="eyebrow">02 / Background</p>
              <h2 id="about-title">About</h2>
              <figure className={styles.portrait}>
                <Image
                  src="/work/devy-portrait.webp"
                  alt="Devy wearing her ITS Social Media team shirt and giving a peace sign."
                  width={1287}
                  height={855}
                  sizes="(max-width: 760px) 80vw, 320px"
                />
              </figure>
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
                More on LinkedIn{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className={`shell ${styles.capabilities}`}>
            {capabilities.map((group) => (
              <div key={group.title}>
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
              <p className="eyebrow">03 / Career</p>
              <h2 id="experience-title">Experience</h2>
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
            {experiences.map((experience) => (
              <article
                key={experience.company}
                className={styles.experienceRow}
              >
                <p className={styles.period}>{experience.period}</p>
                <div className={styles.job}>
                  <h3>{experience.company}</h3>
                  <p className={styles.role}>{experience.role}</p>
                  <p>{experience.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.education}>
            <div>
              <h3>Education</h3>
              <p>
                <strong>{education.institution}</strong>
                <br />
                {education.degree}
                <br />
                {education.period} · GPA {education.gpa}
              </p>
            </div>
            <div>
              <h3>Scholarships</h3>
              <ul>
                {education.scholarships.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Continued learning</h3>
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
