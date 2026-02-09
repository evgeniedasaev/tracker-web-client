import {
  TrophyIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';

export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
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
