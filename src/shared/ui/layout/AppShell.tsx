import Link from 'next/link';
import { Bars3Icon, XCircleIcon, SparklesIcon } from '@heroicons/react/20/solid';
import { Navigation } from '@/shared/ui/layout/Navigation';
import type { NavigationSections } from '@/app/navigation.config';

type AppShellProps = {
  children: React.ReactNode;
  navigationSections: NavigationSections;
};

export function AppShell({ children, navigationSections }: AppShellProps) {
  return (
    <div className="drawer min-h-screen bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex min-h-screen flex-col">
        <div className="navbar bg-base-100/90 backdrop-blur-xl border-b border-base-200/60 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <Bars3Icon className="inline-block h-6 w-6 stroke-current" />
            </label>
          </div>
          <div className="flex-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-2xl px-3 py-2 text-xl transition hover:bg-base-200/80 hover:shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-sm">
                <SparklesIcon className="h-5 w-5" />
              </span>
              <span className="font-semibold text-base-content">Forge</span>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <Navigation className="menu menu-horizontal" sections={navigationSections} />
          </div>
        </div>
        <div className="relative flex-1 min-h-screen">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
          </div>
          <div className="relative min-h-full">{children}</div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
          <XCircleIcon className="inline-block h-6 w-6 stroke-current" />
        </label>
        <div className="min-h-full w-80 bg-base-100/90 backdrop-blur-xl border-r border-base-200/60 p-4">
          <div className="mb-6 flex items-center gap-2 px-2 text-sm text-base-content/60">
            <span className="font-semibold text-base-content">Navigation</span>
          </div>
          <Navigation className="menu" sections={navigationSections} />
        </div>
      </div>
    </div>
  );
}
