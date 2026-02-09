'use client';

import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid';

type GlobalErrorPageProps = {
  onReset: () => void;
};

export function GlobalErrorPage({ onReset }: GlobalErrorPageProps) {
  return (
    <section className="relative min-h-screen bg-base-200">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-20 right-20 h-72 w-72 rounded-full bg-error/20 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm text-base-content/70 shadow-sm">
          <ExclamationCircleIcon className="h-4 w-4 text-error" />
          Unexpected error
        </div>
        <h1 className="text-4xl font-semibold text-base-content sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-xl text-base text-base-content/70 sm:text-lg">
          We could not load this page. Please try again.
        </p>
        <button className="btn btn-primary mt-8" onClick={onReset}>
          <ArrowPathIcon className="h-4 w-4" />
          Try again
        </button>
      </div>
    </section>
  );
}
