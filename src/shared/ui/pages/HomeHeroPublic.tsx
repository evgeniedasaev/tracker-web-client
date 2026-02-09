import Link from 'next/link';
import { BoltIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/20/solid';

type HomeHeroPublicProps = {
  title?: string;
  description?: string;
};

export function HomeHeroPublic({
  title = 'Welcome to Forge',
  description = 'Plan, log, and improve every session with clarity and momentum.',
}: HomeHeroPublicProps) {
  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-1 text-sm text-base-content/70 shadow-sm">
              <SparklesIcon className="h-4 w-4 text-primary" />
              New training insights every week
            </div>
            <h1 className="text-4xl font-semibold text-base-content sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-base text-base-content/70 sm:text-lg">
              {description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn btn-primary">
                <BoltIcon className="h-5 w-5" />
                Log in
              </Link>
              <Link href="/signup" className="btn btn-outline">
                Start for free
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4" />
                Secure by design
              </span>
              <span className="flex items-center gap-2">
                <SparklesIcon className="h-4 w-4" />
                Built for progress
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-base-100/70 bg-base-100/80 p-6 shadow-xl backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/60">This week</span>
                <span className="badge badge-primary badge-outline">On track</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-semibold text-base-content">4 workouts</div>
                <p className="text-sm text-base-content/60">
                  2 strength, 1 conditioning, 1 mobility
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-base-200/60 p-4">
                  <div className="text-xs text-base-content/60">Total volume</div>
                  <div className="mt-1 text-lg font-semibold text-base-content">48,200</div>
                </div>
                <div className="rounded-2xl bg-base-200/60 p-4">
                  <div className="text-xs text-base-content/60">Avg intensity</div>
                  <div className="mt-1 text-lg font-semibold text-base-content">Medium</div>
                </div>
              </div>
              <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                <div className="text-xs text-base-content/60">Next up</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-base-content">Lower strength</span>
                  <span className="text-xs text-base-content/50">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
