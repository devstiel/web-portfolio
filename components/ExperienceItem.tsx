"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

/** Keeps native details semantics and a working no-JavaScript fallback. */
export default function ExperienceItem({
  children,
  className,
  initiallyOpen = false,
}: {
  children: ReactNode;
  className: string;
  initiallyOpen?: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const expanded = useRef(initiallyOpen);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      animation.current?.cancel();
      animation.current = null;
      if (ref.current) {
        ref.current.open = expanded.current;
        ref.current.style.overflow = "";
      }
    };
    motion.addEventListener("change", settle);
    window.addEventListener("resize", settle);
    return () => {
      settle();
      motion.removeEventListener("change", settle);
      window.removeEventListener("resize", settle);
    };
  }, []);

  const toggle = (event: MouseEvent<HTMLDetailsElement>) => {
    const details = ref.current;
    if (!details || !(event.target as Element).closest("summary")) return;
    const next = !expanded.current;
    expanded.current = next;
    if (
      !details.animate ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    event.preventDefault();
    const start = details.getBoundingClientRect().height;
    animation.current?.cancel();
    details.open = true;
    const summary = details.querySelector("summary")!;
    const css = getComputedStyle(details);
    const end = next
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height +
        parseFloat(css.borderTopWidth) +
        parseFloat(css.borderBottomWidth);
    details.style.overflow = "hidden";
    const running = details.animate(
      { height: [`${start}px`, `${end}px`] },
      { duration: 300, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
    );
    animation.current = running;
    running.onfinish = () => {
      if (animation.current !== running) return;
      details.open = next;
      details.style.overflow = "";
      animation.current = null;
    };
  };

  return (
    <details
      ref={ref}
      className={className}
      open={initiallyOpen}
      onClick={toggle}
      onToggle={() => {
        if (!animation.current && ref.current) {
          expanded.current = ref.current.open;
        }
      }}
    >
      {children}
    </details>
  );
}
