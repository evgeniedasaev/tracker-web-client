import {
  CalendarDaysIcon,
  BoltIcon,
  FireIcon,
  ArrowRightIcon,
} from '@heroicons/react/20/solid';

type HomeHeroPrivateProps = {
  name?: string;
};

export function HomeHeroPrivate({ name = 'Athlete' }: HomeHeroPrivateProps) {
  return (
    <section className="relative min-h-screen bg-base-200">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-xs text-base-content/60 shadow-sm">
              <CalendarDaysIcon className="h-4 w-4 text-primary" />
              Weekly summary
            </div>
            <h1 className="text-4xl font-semibold text-base-content sm:text-5xl">
              Welcome back, {name}
            </h1>
            <p className="text-base text-base-content/70">
              You are on track this week. Keep your momentum going.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-base-100/80 p-4 shadow-sm">
                <div className="text-xs text-base-content/60">Workouts</div>
                <div className="mt-2 text-2xl font-semibold text-base-content">4</div>
              </div>
              <div className="rounded-2xl bg-base-100/80 p-4 shadow-sm">
                <div className="text-xs text-base-content/60">Total volume</div>
                <div className="mt-2 text-2xl font-semibold text-base-content">48,200</div>
              </div>
              <div className="rounded-2xl bg-base-100/80 p-4 shadow-sm">
                <div className="text-xs text-base-content/60">Avg intensity</div>
                <div className="mt-2 text-2xl font-semibold text-base-content">Medium</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-base-100/70 bg-base-100/80 p-6 shadow-xl backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/60">Next up</span>
                <span className="badge badge-primary badge-outline">Tomorrow</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-base-content">Lower strength</h2>
                <p className="text-sm text-base-content/60">
                  Focus on tempo squats and controlled volume.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-base-content/60">
                <span className="badge badge-ghost">
                  <BoltIcon className="mr-1 h-3.5 w-3.5" />
                  62 min
                </span>
                <span className="badge badge-ghost">
                  <FireIcon className="mr-1 h-3.5 w-3.5" />
                  Medium
                </span>
              </div>
              <button className="btn btn-primary w-full">
                View workout
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
