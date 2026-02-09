'use client';

import { GlobalErrorPage } from '@/shared/ui/pages';

export default function GlobalError({ reset }: { reset: () => void }) {
  return <GlobalErrorPage onReset={reset} />;
}
