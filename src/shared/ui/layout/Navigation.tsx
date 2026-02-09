import Link from 'next/link';
import type { NavigationSections } from '@/app/navigation.config';

type NavigationProps = {
  className: string;
  sections: NavigationSections;
};

export function Navigation({ className, sections }: NavigationProps) {
  return (
    <ul className={className}>
      {sections.map(({ key, href, label, icon: Icon, accentClassName }) => (
        <li key={key}>
          <Link
            href={href}
            className="group relative flex items-center gap-3 rounded-2xl h-10 px-3 py-2.5 transition-all hover:bg-base-200/80 hover:shadow-sm"
          >
            <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-primary/40 opacity-0 transition group-hover:opacity-100" />
            {Icon && (
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition group-hover:bg-base-200 ${
                  accentClassName ?? 'bg-base-200/80 text-primary'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span className="text-sm font-semibold text-base-content">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
