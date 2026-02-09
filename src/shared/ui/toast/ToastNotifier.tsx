'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/shared/ui/toast/useToast';

type ToastNotifierProps = {
  message?: string | null;
  type?: 'success' | 'error' | 'info';
};

export function ToastNotifier({ message, type }: ToastNotifierProps) {
  const { notify } = useToast();
  const handledRef = useRef(false);

  useEffect(() => {
    if (!message || handledRef.current) return;
    handledRef.current = true;
    notify(message, type);
  }, [message, notify, type]);

  return null;
}
