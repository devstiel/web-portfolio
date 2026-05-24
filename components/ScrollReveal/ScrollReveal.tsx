'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = direction !== 'up' ? styles[direction] : '';

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${dirClass} ${isVisible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
