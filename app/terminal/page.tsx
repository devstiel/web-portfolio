import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import RetroTerminal from '@/components/RetroTerminal/RetroTerminal';
import styles from './terminal.module.css';

export const metadata: Metadata = {
  title: 'Terminal | Devy Relliani',
  description: 'Dedicated interactive portfolio CLI terminal.',
};

export default function TerminalPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.sessionBar}>
          <span>[ ENDPOINT: /terminal ]</span>
          <Link href="/#dashboard" className={styles.backLink}>
            Back to dashboard
          </Link>
        </div>

        <RetroTerminal standalone className={styles.terminal} />
      </main>
      <Footer />
    </>
  );
}
