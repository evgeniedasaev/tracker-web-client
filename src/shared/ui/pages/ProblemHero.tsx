import Link from 'next/link';

type ProblemHeroProps = {
  header: string;
  description: string;
  link: { url: string; text: string };
};
export function ProblemHero({ header, description, link: { url, text } }: ProblemHeroProps) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{header}</h1>
          <p className="py-4">{description}</p>
          <Link className="btn btn-neutral" href={url}>
            {text}
          </Link>
        </div>
      </div>
    </div>
  );
}
