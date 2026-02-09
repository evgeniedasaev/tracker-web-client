import { ShieldCheckIcon, SparklesIcon, BoltIcon } from '@heroicons/react/20/solid';

type AuthSidePanelProps = {
  title?: string;
  description?: string;
};

export function AuthSidePanel({
  title = 'Forge your momentum',
  description = 'Save your progress, keep your streak, and stay consistent week after week.',
}: AuthSidePanelProps) {
  return (
    <div className="space-y-5 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-xs text-base-content/60 shadow-sm">
        <ShieldCheckIcon className="h-4 w-4 text-primary" />
        Secure access
      </div>
      <h1 className="text-4xl font-semibold text-base-content sm:text-5xl">{title}</h1>
      <p className="text-base text-base-content/70">{description}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-base-100/80 p-4 shadow-sm">
          <div className="text-xs text-base-content/60">Confidence</div>
          <div className="mt-1 text-lg font-semibold text-base-content">Private by default</div>
        </div>
        <div className="rounded-2xl bg-base-100/80 p-4 shadow-sm">
          <div className="text-xs text-base-content/60">Progress</div>
          <div className="mt-1 text-lg font-semibold text-base-content">Always on track</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-base-content/60">
        <span className="flex items-center gap-2">
          <SparklesIcon className="h-4 w-4" />
          Clarity every session
        </span>
        <span className="flex items-center gap-2">
          <BoltIcon className="h-4 w-4" />
          Momentum that sticks
        </span>
      </div>
    </div>
  );
}
