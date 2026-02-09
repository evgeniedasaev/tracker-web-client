import type { ComponentType, SVGProps } from 'react';
import {
  TrophyIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
  BoltIcon,
} from '@heroicons/react/20/solid';

export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  accentClassName?: string;
};

export type NavigationSections = NavigationItem[];

export type NavigationSectionsMap = Record<'auth' | 'public', NavigationSections>;

export const navigationSections: NavigationSectionsMap = {
  auth: [
    {
      key: 'workouts',
      label: 'Workouts',
      href: '/workouts',
      icon: TrophyIcon,
      accentClassName:
        'bg-gradient-to-br from-primary/20 via-primary/10 to-base-100 text-primary shadow-[0_8px_24px_-14px_rgba(99,102,241,0.6)]',
    },
    {
      key: 'profile',
      label: 'Profile',
      href: '/me',
      icon: UserCircleIcon,
    },
    {
      key: 'logout',
      label: 'Logout',
      href: '/logout',
      icon: ArrowRightEndOnRectangleIcon,
    },
  ],
  public: [
    {
      key: 'login',
      label: 'Login',
      href: '/login',
      icon: BoltIcon,
    },
    {
      key: 'signup',
      label: 'Start for free',
      href: '/signup',
    },
  ],
};

export const getNavigationSections = (authenticated: boolean): NavigationSections =>
  authenticated ? navigationSections.auth : navigationSections.public;
