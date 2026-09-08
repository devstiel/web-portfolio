import type { Work } from "@/data/portfolioData";
import Image from "next/image";
import { projectMedia } from "@/data/portfolioMedia";
import Star from "./Star";
import styles from "./ProjectCover.module.css";

/** Supplied work imagery where available, with typographic introductions as fallback. */
export default function ProjectCover({
  work,
  large = false,
}: {
  work: Work;
  large?: boolean;
}) {
  const media = projectMedia[work.slug];
  if (media)
    return (
      <div
        className={`${styles.cover} ${styles.photoCover} ${media.cover.length > 1 ? styles.artCover : styles.reportCover} ${large ? styles.large : ""}`}
      >
        <div className={styles.top}>
          <span>{work.company}</span>
          <span>{work.year}</span>
        </div>
        <div className={styles.originals}>
          {media.cover.map((asset) => (
            <Image
              key={asset.src}
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              sizes={
                media.cover.length > 1
                  ? large
                    ? "(max-width: 700px) 26vw, (max-width: 1500px) 30vw, 410px"
                    : "(max-width: 700px) 28vw, (max-width: 1500px) 15vw, 210px"
                  : large
                    ? "(max-width: 1500px) 90vw, 1200px"
                    : "(max-width: 700px) 90vw, (max-width: 1500px) 45vw, 620px"
              }
            />
          ))}
        </div>
        <div className={styles.bottom}>
          <span>
            {work.number} / {work.category}
          </span>
          <span>Selected work</span>
        </div>
      </div>
    );
  return (
    <div
      className={`${styles.cover} ${styles[work.theme]} ${large ? styles.large : ""}`}
      aria-hidden="true"
    >
      <div className={styles.top}>
        <span>{work.company}</span>
        <span>{work.year}</span>
      </div>
      {work.theme === "qa" && (
        <div className={styles.qaArt}>
          <span className={styles.qaAnnotation}>A question worth asking.</span>
          <div className={styles.qaTitle}>
            What
            <br />
            happens
            <br />
            <em>if…?</em>
          </div>
          <span className={styles.qaCircle}>?</span>
          <div className={styles.qaFooter}>
            AYO KASIR <span>×</span> MYAYO
          </div>
        </div>
      )}
      {work.theme === "analytics" && (
        <div className={styles.report}>
          <div className={styles.reportRule}>
            EV CHARGING NETWORK <span>↗</span>
          </div>
          <div className={styles.reportNumber}>
            39,349<span>transactions. One clearer picture.</span>
          </div>
          <div className={styles.reportBottom}>
            <div>
              <strong>27</strong>
              <span>charging units</span>
            </div>
            <div>
              <strong>12</strong>
              <span>locations</span>
            </div>
            <Star className={styles.reportStar} />
          </div>
        </div>
      )}
      {work.theme === "creative" && (
        <div className={styles.creativeArt}>
          <Star className={styles.creativeStar} />
          <div className={styles.creativeTitle}>
            MANY
            <br />
            VOICES.
            <br />
            <em>one direction.</em>
          </div>
          <div className={styles.creativeStamp}>
            21 PEOPLE
            <br />5 PLATFORMS
          </div>
        </div>
      )}
      {work.theme === "illustration" && (
        <div className={styles.illustrationArt}>
          <Star className={styles.holidayStar} />
          <span className={styles.holidaySmallStar}>✧</span>
          <div className={styles.holidayTitle}>
            A little
            <br />
            <em>holiday</em>
            <br />
            spirit.
          </div>
          <span className={styles.holidayCaption}>
            A COMMISSION FOR
            <br />
            THE LEAGUE OF LEGENDS TEAM
          </span>
        </div>
      )}
      <div className={styles.bottom}>
        <span>
          {work.number} / {work.category}
        </span>
        <span>Project overview</span>
      </div>
    </div>
  );
}
