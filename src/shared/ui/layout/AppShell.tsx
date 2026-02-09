import Link from 'next/link';
import {
  Bars3Icon,
  XCircleIcon,
  BoltIcon,
} from '@heroicons/react/20/solid';
import { Navigation } from '@/shared/ui/layout/Navigation';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full">
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
            <Link href="/" className="btn btn-ghost btn-warning text-xl">
              <BoltIcon className="w-6 h-6" />
              Tracker
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <Navigation className="menu menu-horizontal" />
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
          <XCircleIcon className="inline-block h-6 w-6 stroke-current" />
        </label>
        <Navigation className="menu bg-base-200 min-h-full w-80 p-4" />
      </div>
    </div>
  );
}
