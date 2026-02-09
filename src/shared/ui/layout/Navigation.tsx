import Link from 'next/link';
import {
  TrophyIcon,
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';

type NavigationProps = {
  className: string;
};

export function Navigation({ className }: NavigationProps) {
  return (
    <ul className={className}>
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
