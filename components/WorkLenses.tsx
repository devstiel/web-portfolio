"use client";

import Link from "next/link";
import { useState } from "react";
import { works } from "@/data/portfolioData";
import Star from "./Star";
import styles from "./WorkLenses.module.css";

const lenses = [
  {
    key: "logic",
    label: "Logic",
    note: "From product requirements to useful reports.",
    themes: ["qa", "analytics"],
  },
  {
    key: "imagination",
    label: "Imagination",
    note: "From leading creative teams to making illustrations.",
    themes: ["creative", "illustration"],
  },
] as const;

export default function WorkLenses() {
  const [active, setActive] = useState<string>("logic");
  return (
    <div className={styles.explorer}>
      <p className={styles.hint}>Two ways into my work. Pick a side.</p>
      <div
        className={styles.diagram}
        role="group"
        aria-label="Explore my work"
        data-reveal="circles"
      >
        {lenses.map((lens) => (
          <button
            key={lens.key}
            type="button"
            aria-pressed={active === lens.key}
            aria-controls={`lens-${lens.key}`}
            onClick={() => setActive(lens.key)}
          >
            {lens.label}
          </button>
        ))}
        <Star
          className={`${styles.star} ${active === "imagination" ? styles.turned : ""}`}
        />
      </div>
      <div className={styles.panels} aria-live="polite">
        {lenses.map((lens) => (
          <div
            key={lens.key}
            id={`lens-${lens.key}`}
            className={styles.panel}
            aria-hidden={active !== lens.key}
            inert={active !== lens.key}
          >
            <p className={styles.note}>{lens.note}</p>
            {works
              .filter((work) =>
                (lens.themes as readonly string[]).includes(work.theme),
              )
              .map((work) => (
                <Link
                  key={work.slug}
                  href={`/work/${work.slug}`}
                  className={styles.project}
                >
                  <span className={styles.projectHeading}>
                    <span>{work.company}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className={styles.description}>{work.summary}</span>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
