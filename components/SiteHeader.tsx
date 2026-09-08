"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolioData";
import Star from "./Star";
import styles from "./SiteHeader.module.css";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const readingLine = Math.max(110, window.innerHeight * 0.25);
      let current = pathname.startsWith("/work/") ? "/#work" : "";
      for (const link of links) {
        const section = document.getElementById(link.href.slice(2));
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = link.href;
        }
      }
      // A short footer cannot always reach the reading line on tall screens.
      const contact = document.getElementById("contact");
      if (
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2 &&
        contact &&
        contact.getBoundingClientRect().top < window.innerHeight
      ) {
        current = "/#contact";
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: Event) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const closeOnResize = () => {
      if (breakpoint.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    breakpoint.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      breakpoint.removeEventListener("change", closeOnResize);
    };
  }, [open]);

  return (
    <header className={styles.header} ref={header}>
      <div className={`shell ${styles.inner}`}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setOpen(false)}
          aria-label="Devy Relliani, home"
        >
          devy
          <Star className={styles.brandStar} size={25} />
        </Link>
        <span className={`eyebrow ${styles.edition}`}>
          A personal portfolio.
        </span>
        <nav className={styles.desktop} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={
                activeSection === link.href ? "location" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          className={styles.resume}
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
        >
          My CV <span aria-hidden="true">↗</span>
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
        <button
          className={styles.menuButton}
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className={styles.mobile}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={activeSection === link.href ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
