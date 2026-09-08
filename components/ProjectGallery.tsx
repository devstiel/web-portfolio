import Image from "next/image";
import { projectMedia } from "@/data/portfolioMedia";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({ slug }: { slug: string }) {
  const media = projectMedia[slug];
  if (!media) return null;
  return (
    <section className={styles.gallery} aria-labelledby="gallery-title">
      <div data-reveal>
        <p className="eyebrow">A closer look</p>
        <h2 id="gallery-title">From the work itself.</h2>
        <p className={styles.intro}>{media.introduction}</p>
      </div>
      <div
        className={`${styles.grid} ${slug === "pln-business-analysis" ? styles.reports : ""}`}
      >
        {media.gallery.map((asset) => (
          <figure key={asset.src} data-reveal="project">
            <a
              href={asset.src}
              target="_blank"
              rel="noreferrer"
              data-reveal-visual
              aria-label={`Open full image: ${asset.alt} (opens in a new tab)`}
            >
              <Image
                src={asset.src}
                width={asset.width}
                height={asset.height}
                alt={asset.alt}
                sizes={
                  slug === "pln-business-analysis"
                    ? "(max-width: 540px) 90vw, (max-width: 1500px) 45vw, 640px"
                    : "(max-width: 540px) 90vw, (max-width: 900px) 43vw, (max-width: 1500px) 30vw, 400px"
                }
              />
              <span className={styles.open} aria-hidden="true">
                View image ↗
              </span>
            </a>
            <figcaption data-reveal-copy>{asset.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
