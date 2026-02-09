import Link from 'next/link';

export function NotFoundPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-4">Page not found. Check the URL or return to home.</p>
          <Link className="btn btn-neutral" href="/">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
