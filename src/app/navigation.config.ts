import type { ComponentType, SVGProps } from 'react';
import {
  TrophyIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';

export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accentClassName?: string;
};

export type NavigationSection = {
  key: string;
  title?: string;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    key: 'main',
    items: [
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
  },
];
