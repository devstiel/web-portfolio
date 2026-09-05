"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolioData";
import styles from "./SiteHeader.module.css";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const closeOnResize = () => {
      if (breakpoint.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    breakpoint.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
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
          devy<span aria-hidden="true">✳</span>
        </Link>
        <span className={`eyebrow ${styles.edition}`}>
          A personal portfolio.
        </span>
        <nav className={styles.desktop} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
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
