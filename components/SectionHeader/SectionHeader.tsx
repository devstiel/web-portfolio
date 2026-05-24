import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeader({ icon, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className={styles.header} id={id}>
      <div className={styles.titleRow}>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.divider} />
    </div>
  );
}
