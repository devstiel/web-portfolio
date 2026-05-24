'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  label?: string;
  showLevel?: boolean;
  color?: 'pink' | 'purple' | 'green' | 'yellow' | 'blue' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressBar({
  value,
  maxValue = 100,
  label,
  showLevel = false,
  color = 'pink',
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const percentage = Math.min((value / maxValue) * 100, 100);
  const isVisible = !animated || isInView;

  useEffect(() => {
    if (!animated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  const sizeClass = size === 'sm' ? styles.trackSm : size === 'lg' ? styles.trackLg : '';

  return (
    <div className={styles.wrapper} ref={ref}>
      {(label || showLevel) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showLevel && (
            <span className={styles.levelText}>
              Lv. {value}/{maxValue}
            </span>
          )}
        </div>
      )}
      <div className={`${styles.track} ${sizeClass}`}>
        <div
          className={`${styles.fill} ${styles[color]} ${animated ? styles.animated : ''}`}
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={label || 'Progress'}
        />
      </div>
    </div>
  );
}
