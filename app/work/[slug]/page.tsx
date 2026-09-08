import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCover from "@/components/ProjectCover";
import ProjectGallery from "@/components/ProjectGallery";
import ScrollReveals from "@/components/ScrollReveals";
import { works } from "@/data/portfolioData";
import styles from "./work.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);
  if (!work) return {};
  const title = `${work.company} — ${work.category}`;
  const images = (await parent).openGraph?.images;
  return {
    title,
    description: work.summary,
    alternates: { canonical: `/work/${work.slug}` },
    openGraph: {
      title: `${title} — Devy Relliani`,
      description: work.summary,
      url: `/work/${work.slug}`,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Devy Relliani`,
      description: work.summary,
      images,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = works.findIndex((work) => work.slug === slug);
  if (index < 0) notFound();
  const work = works[index];
  const next = works[(index + 1) % works.length];
  return (
    <>
      <SiteHeader />
      <ScrollReveals key={slug} />
      <main id="main" className={`shell ${styles.main}`}>
        <Link href="/#work" className={styles.back}>
          <span aria-hidden="true">←</span> All selected work
        </Link>
        <div className={styles.heading}>
          <p className="eyebrow">
            {work.number} / {work.company} / {work.category}
          </p>
          <h1>{work.title}</h1>
          <p className={styles.summary}>{work.summary}</p>
        </div>
        <dl className={styles.metadata}>
          <div>
            <dt>My role</dt>
            <dd>{work.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{work.period}</dd>
          </div>
          <div>
            <dt>In the mix</dt>
            <dd>{work.tools.join(" · ")}</dd>
          </div>
        </dl>
        <figure>
          <ProjectCover work={work} large />
          <figcaption className={styles.coverCaption}>{work.note}</figcaption>
        </figure>
        <dl className={styles.facts} aria-label="Project at a glance">
          {work.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.story}>
          {work.sections.map((section, sectionIndex) => (
            <section
              data-reveal
              key={section.title}
              className={styles.storySection}
              aria-labelledby={`story-${sectionIndex}`}
            >
              <div className={styles.storyLabel}>
                <span className="eyebrow">0{sectionIndex + 1}</span>
                <h2 id={`story-${sectionIndex}`}>{section.title}</h2>
              </div>
              <div className={styles.paragraphs}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <ProjectGallery slug={work.slug} />
        <Link href={`/work/${next.slug}`} className={styles.next}>
          <div>
            <span className="eyebrow">Next up / {next.company}</span>
            <h2>{next.title}</h2>
          </div>
          <span aria-hidden="true">↗</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
