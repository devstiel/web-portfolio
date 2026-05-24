import styles from './PixelBadge.module.css';

interface PixelBadgeProps {
  text: string;
  variant?: 'default' | 'accent' | 'purple' | 'success' | 'warning' | 'legendary' | 'blue';
  className?: string;
}

export default function PixelBadge({
  text,
  variant = 'default',
  className = '',
}: PixelBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {text}
    </span>
  );
}
