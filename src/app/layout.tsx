import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { ToastProvider } from '@/shared/ui/ToastProvider';
import {
  TrophyIcon,
  Bars3Icon,
  XCircleIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
  BoltIcon,
} from '@heroicons/react/16/solid';

export const metadata: Metadata = {
  title: {
    default: 'Tracker',
    template: '%s | Tracker',
  },
  description: 'Tracker helps you organize your muscle-building journey.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type NavigationProps = {
  className: string;
};

function Navigation({ className }: NavigationProps) {
  return (
    <ul className={className}>
      {/* Sidebar content here */}
      <li>
        <Link href="/workouts">
          <TrophyIcon className="h-5 w-5 text-warning" />
          Workouts
        </Link>
      </li>
      <li>
        <Link href="/me">
          <UserCircleIcon className="h-5 w-5 text-warning" />
          Profile
        </Link>
      </li>
      <li>
        <Link href="/logout">
          <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-warning" />
          Logout
        </Link>
      </li>
    </ul>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <div className="drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
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
              {/* Page content here */}
              {children}
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
                <XCircleIcon className="inline-block h-6 w-6 stroke-current" />
              </label>
              <Navigation className="menu bg-base-200 min-h-full w-80 p-4" />
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
