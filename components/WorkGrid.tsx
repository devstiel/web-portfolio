"use client";

import Link from "next/link";
import { useState } from "react";
import { works } from "@/data/portfolioData";
import ProjectCover from "./ProjectCover";
import styles from "./WorkGrid.module.css";

const filters = [
  { key: "all", label: "All work", count: "04" },
  { key: "product", label: "Product & data", count: "02" },
  { key: "creative", label: "Creative", count: "02" },
] as const;
type Filter = (typeof filters)[number]["key"];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const selected = works.filter(
    (work) =>
      filter === "all" ||
      (filter === "product"
        ? ["qa", "analytics"].includes(work.theme)
        : ["creative", "illustration"].includes(work.theme)),
  );
  return (
    <>
      <div className={styles.filterRow}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter selected work"
        >
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={filter === item.key}
              aria-controls="work-grid"
              onClick={() => setFilter(item.key)}
              className={filter === item.key ? styles.active : ""}
            >
              {item.label}
              <sup>{item.count}</sup>
            </button>
          ))}
        </div>
        <span className={styles.indexLabel}>SELECTED / 2021–2026</span>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {selected.length}{" "}
        {filter === "all"
          ? ""
          : filter === "product"
            ? "product and data "
            : "creative "}
        projects.
      </p>
      <div id="work-grid" className={styles.grid}>
        {selected.map((work) => (
          <article key={work.slug} className={styles.card}>
            <Link href={`/work/${work.slug}`} className={styles.link}>
              <div className={styles.visual}>
                <ProjectCover work={work} />
                <span className={styles.openArrow} aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className={styles.meta}>
                <span>{work.company}</span>
                <span>{work.year}</span>
              </div>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
              <span className={styles.read}>
                Read the overview <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
