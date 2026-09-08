"use client";

import { useEffect } from "react";

/** Every element is visible before JS and after cancellation. */
export default function ScrollReveals() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === "undefined" ||
      !Element.prototype.animate
    )
      return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const animations = new Map<HTMLElement, Set<Animation>>();
    const settle = (target: HTMLElement) => {
      animations.get(target)?.forEach((animation) => animation.cancel());
      animations.delete(target);
    };
    const play = (
      owner: HTMLElement,
      element: Element | null,
      frames: Keyframe[],
      delay = 0,
      duration = 600,
    ) => {
      if (!element) return;
      const animation = element.animate(frames, {
        duration,
        delay,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "backwards",
      });
      const active = animations.get(owner) ?? new Set<Animation>();
      animations.set(owner, active);
      active.add(animation);
      const release = () => {
        active.delete(animation);
        if (!active.size) animations.delete(owner);
      };
      animation.onfinish = release;
      animation.oncancel = release;
    };
    const rise = [
      { opacity: 0, translate: "0 20px" },
      { opacity: 1, translate: "0 0" },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          observer.unobserve(target);
          if (target.dataset.revealDone) continue;
          target.dataset.revealDone = "true";
          if (motion.matches || target.contains(document.activeElement))
            continue;
          const delay = Number(target.dataset.revealDelay || 0);
          switch (target.dataset.reveal) {
            case "heading":
              target
                .querySelectorAll("[data-reveal-line]")
                .forEach((line, index) => {
                  play(
                    target,
                    line,
                    [
                      { transform: "translateY(110%) rotate(2deg)" },
                      { transform: "translateY(0) rotate(0deg)" },
                    ],
                    index * 100,
                    680,
                  );
                });
              break;
            case "project":
              play(
                target,
                target.querySelector("[data-reveal-visual]"),
                [
                  { clipPath: "inset(0 0 100% 0)", translate: "0 20px" },
                  { clipPath: "inset(0 0 0% 0)", translate: "0 0" },
                ],
                delay,
                720,
              );
              target
                .querySelectorAll("[data-reveal-copy]")
                .forEach((copy, index) =>
                  play(target, copy, rise, delay + 130 + index * 55),
                );
              break;
            case "circles":
              target.querySelectorAll("button").forEach((circle, index) =>
                play(
                  target,
                  circle,
                  [
                    {
                      opacity: 0,
                      translate: (index ? "24px" : "-24px") + " 0",
                    },
                    { opacity: 1, translate: "0 0" },
                  ],
                  index * 80,
                  650,
                ),
              );
              break;
            case "row":
              play(
                target,
                target.querySelector("[data-reveal-rule]"),
                [
                  { transform: "scaleX(0)", transformOrigin: "left" },
                  { transform: "scaleX(1)", transformOrigin: "left" },
                ],
                0,
                550,
              );
              play(target, target.querySelector("summary"), rise, 100, 550);
              break;
            default:
              play(target, target, rise, delay);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    const sync = () => {
      observer.disconnect();
      [...animations.keys()].forEach(settle);
      if (!motion.matches)
        targets.forEach((target) => {
          if (!target.dataset.revealDone) observer.observe(target);
        });
    };
    const onFocus = (event: FocusEvent) => {
      const target = (event.target as Element).closest<HTMLElement>(
        "[data-reveal]",
      );
      if (!target) return;
      target.dataset.revealDone = "true";
      observer.unobserve(target);
      settle(target);
    };
    // Filters settle child entrances before cards move or leave the DOM.
    const onSettle = (event: Event) => {
      const scope = event.target;
      if (!(scope instanceof Element)) return;
      targets.forEach((target) => {
        if (!scope.contains(target)) return;
        target.dataset.revealDone = "true";
        observer.unobserve(target);
        settle(target);
      });
    };
    sync();
    motion.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("reveal:settle", onSettle);
    return () => {
      observer.disconnect();
      [...animations.keys()].forEach(settle);
      motion.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("reveal:settle", onSettle);
    };
  }, []);
  return null;
}
