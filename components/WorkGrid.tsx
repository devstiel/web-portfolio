"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const grid = useRef<HTMLDivElement>(null);
  const previous = useRef<{
    height: number;
    cards: Map<string, DOMRect>;
  } | null>(null);
  const animations = useRef<Animation[]>([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
    };
    motion.addEventListener("change", settle);
    window.addEventListener("resize", settle);
    return () => {
      settle();
      motion.removeEventListener("change", settle);
      window.removeEventListener("resize", settle);
    };
  }, []);

  const changeFilter = (next: Filter) => {
    if (next === filter || !grid.current) return;
    grid.current.dispatchEvent(new Event("reveal:settle", { bubbles: true }));
    const cards = new Map<string, DOMRect>();
    grid.current
      .querySelectorAll<HTMLElement>("[data-work]")
      .forEach((card) => {
        cards.set(card.dataset.work!, card.getBoundingClientRect());
        card.dataset.revealDone = "true";
        // Finish any entrance reveal before applying the layout transition.
        card.getAnimations?.().forEach((animation) => animation.cancel());
      });
    previous.current = {
      height: grid.current.getBoundingClientRect().height,
      cards,
    };
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    setFilter(next);
  };

  useLayoutEffect(() => {
    const before = previous.current;
    previous.current = null;
    if (
      !before ||
      !grid.current ||
      !grid.current.animate ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timing = { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" };
    const height = grid.current.getBoundingClientRect().height;
    grid.current
      .querySelectorAll<HTMLElement>("[data-work]")
      .forEach((card) => {
        const old = before.cards.get(card.dataset.work!);
        const current = card.getBoundingClientRect();
        animations.current.push(
          card.animate(
            [
              {
                transform: old
                  ? `translate(${old.left - current.left}px, ${old.top - current.top}px)`
                  : "translateY(18px)",
                opacity: old ? 1 : 0.3,
              },
              { transform: "translate(0, 0)", opacity: 1 },
            ],
            timing,
          ),
        );
      });
    if (Math.abs(before.height - height) > 1) {
      animations.current.push(
        grid.current.animate(
          { height: [`${before.height}px`, `${height}px`] },
          timing,
        ),
      );
    }
  }, [filter]);
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
              onClick={() => changeFilter(item.key)}
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
      <div id="work-grid" ref={grid} className={styles.grid}>
        {selected.map((work, index) => (
          <article
            key={work.slug}
            className={styles.card}
            data-work={work.slug}
            data-reveal="project"
            data-reveal-delay={(index % 2) * 90}
          >
            <Link href={`/work/${work.slug}`} className={styles.link}>
              <div className={styles.visual} data-reveal-visual>
                <ProjectCover work={work} />
                <span className={styles.openArrow} aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className={styles.meta} data-reveal-copy>
                <span>{work.company}</span>
                <span>{work.year}</span>
              </div>
              <h3 data-reveal-copy>{work.title}</h3>
              <p data-reveal-copy>{work.summary}</p>
              <span className={styles.read} data-reveal-copy>
                Read the overview <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
