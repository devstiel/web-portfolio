"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolioData";
import styles from "./SiteFooter.module.css";

export default function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied!");
    } catch {
      setStatus("Select the email address above to copy it.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4000);
  }
  return (
    <div className={styles.copyRow}>
      <button type="button" onClick={copy} className={styles.copyButton}>
        Copy email <span aria-hidden="true">⧉</span>
      </button>
      <span role="status" className={styles.copyStatus}>
        {status}
      </span>
    </div>
  );
}
