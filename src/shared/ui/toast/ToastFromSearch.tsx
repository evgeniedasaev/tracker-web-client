'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/shared/ui/toast/useToast';
import { toastMap, type ToastKey } from '@/shared/ui/toast/toast.config';

export function ToastFromSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { notify } = useToast();
  const handledRef = useRef(false);

  useEffect(() => {
    const toastKey = searchParams.get('toast');
    if (!toastKey || handledRef.current) return;
    handledRef.current = true;

    const toastConfig =
      toastKey in toastMap ? toastMap[toastKey as ToastKey] : undefined;
    if (toastConfig) {
      notify(toastConfig.message, toastConfig.type);
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('toast');
    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [notify, pathname, router, searchParams]);

  return null;
}
