import Link from 'next/link';
import type { NavigationSection } from '@/app/navigation.config';

type NavigationProps = {
  className: string;
  sections: NavigationSection[];
};

export function Navigation({ className, sections }: NavigationProps) {
  return (
    <ul className={className}>
      {sections.map((section) =>
        section.items.map(({ key, href, label, icon: Icon }) => (
          <li key={key}>
            <Link href={href}>
              <Icon className="h-5 w-5 text-warning" />
              {label}
            </Link>
          </li>
        )),
      )}
    </ul>
  );
}
