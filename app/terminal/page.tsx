import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PortfolioTerminal from "@/components/PortfolioTerminal";
import styles from "./terminal.module.css";

export const metadata: Metadata = {
  title: "A little experiment",
  description:
    "Explore Devy’s work and experience through a small keyboard-friendly portfolio index.",
};

export default function TerminalPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={`shell ${styles.main}`}>
        <Link href="/" className="text-link">
          ← Back to the portfolio
        </Link>
        <div className={styles.intro}>
          <p className="eyebrow">A little experiment / 01</p>
          <h1>
            For the
            <br />
            <em>keyboard inclined.</em>
          </h1>
          <p>
            A small alternate way to explore my portfolio.
            <br />
            Same person. Same work. A few more keystrokes.
          </p>
        </div>
        <PortfolioTerminal />
      </main>
      <SiteFooter />
    </>
  );
}
