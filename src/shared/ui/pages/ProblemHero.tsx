import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

type ProblemHeroProps = {
  header: string;
  description: string;
  link: { url: string; text: string };
};

export function ProblemHero({ header, description, link: { url, text } }: ProblemHeroProps) {
  return (
    <section className="relative min-h-screen bg-base-200">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-error/20 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-warning/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm text-base-content/70 shadow-sm">
          <ExclamationTriangleIcon className="h-4 w-4 text-warning" />
          Something went off track
        </div>
        <h1 className="text-5xl font-semibold text-base-content sm:text-6xl">{header}</h1>
        <p className="mt-4 max-w-xl text-base text-base-content/70 sm:text-lg">
          {description}
        </p>
        <Link className="btn btn-primary mt-8" href={url}>
          {text}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
