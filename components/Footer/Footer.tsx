import styles from './Footer.module.css';
import { personalInfo } from '@/data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.line}>
          {'◉'} Built with <span className={styles.accent}>♥</span> by {personalInfo.name}
        </p>
        <p className={styles.subline}>
          © {year} — Made with Next.js & CSS Modules. No UI libraries harmed.
        </p>
      </div>
    </footer>
  );
}
