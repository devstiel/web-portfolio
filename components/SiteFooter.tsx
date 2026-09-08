import Link from "next/link";
import { profile } from "@/data/portfolioData";
import Star from "./Star";
import CopyEmail from "./CopyEmail";
import RevealHeading from "./RevealHeading";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="shell">
        <div className={styles.heading}>
          <p className="eyebrow">Have something in mind?</p>
          <Star />
        </div>
        <div className={styles.contactGrid}>
          <RevealHeading first="LET’S" second="TALK." />
          <div className={styles.contactCopy} data-reveal>
            <p>
              A role, a project, or a good conversation.
              <br />
              I’d love to hear from you.
            </p>
            <a href={`mailto:${profile.email}`} className={styles.email}>
              {profile.email}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <CopyEmail />
            <div className={styles.socials}>
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}{" "}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {profile.shortName}
          </span>
          <Link href="/terminal">
            A little experiment <span aria-hidden="true">↗</span>
          </Link>
          <a href="#main">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
