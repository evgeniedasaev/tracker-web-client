'use client';

import { useEffect } from 'react';
import { useToast } from '@/shared/ui/toast/useToast';

type ToastNotifierProps = {
  message?: string | null;
  type?: 'success' | 'error' | 'info';
};

export function ToastNotifier({ message, type }: ToastNotifierProps) {
  const { notify } = useToast();

  useEffect(() => {
    if (message) notify(message, type);
  }, [message, notify, type]);

  return null;
}
