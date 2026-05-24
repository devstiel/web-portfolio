import styles from './WindowFrame.module.css';

interface WindowFrameProps {
  title: string;
  variant?: 'default' | 'notepad' | 'terminal' | 'folder' | 'compact';
  className?: string;
  children: React.ReactNode;
}

export default function WindowFrame({
  title,
  variant = 'default',
  className = '',
  children,
}: WindowFrameProps) {
  const variantClass = variant !== 'default' ? styles[variant] : '';

  return (
    <div className={`${styles.frame} ${variantClass} ${className}`}>
      <div className={styles.titleBar}>
        {/* Left Mac OS Dot buttons (Default in Dark Mode) */}
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.dotClose}`} />
          <span className={`${styles.dot} ${styles.dotMin}`} />
          <span className={`${styles.dot} ${styles.dotMax}`} />
        </div>

        {/* Mac OS System 7 horizontal parallel lines (active in Light Mode) */}
        <div className={styles.titleLines} />
        
        <span className={styles.titleBadge}>
          <span className={styles.title}>{title}</span>
        </span>

        <div className={styles.titleLines} />

        {/* Right Windows-style Bezel Rectangles (active in Light Mode) */}
        <div className={styles.windowControls}>
          <span className={styles.controlBtn} aria-hidden="true">—</span>
          <span className={styles.controlBtn} aria-hidden="true">□</span>
          <span className={styles.controlBtn} aria-hidden="true">×</span>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
