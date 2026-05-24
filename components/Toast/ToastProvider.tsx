'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import styles from './Toast.module.css';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'default' | 'achievement' | 'error';
}

interface ToastContextType {
  toast: (title: string, description: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((title: string, description: string, type: ToastMessage['type'] = 'default') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={styles.container} role="live" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.toast} ${t.type ? styles[t.type] : ''}`}
            onClick={() => removeToast(t.id)}
          >
            <div className={styles.closeBtn}>×</div>
            <div className={styles.title}>{t.title}</div>
            <div className={styles.description}>{t.description}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
