'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  message: string;
  type?: ToastType;
};

type ToastContextValue = {
  notify: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutIds = useRef<Set<number>>(new Set());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      const timeoutId = window.setTimeout(() => {
        removeToast(id);
      }, 3500);
      timeoutIds.current.add(timeoutId);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
      timeoutIds.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`alert shadow-lg ${
              type === 'error' ? 'alert-error' : type === 'success' ? 'alert-success' : 'alert-info'
            }`}
          >
            <span>{message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
