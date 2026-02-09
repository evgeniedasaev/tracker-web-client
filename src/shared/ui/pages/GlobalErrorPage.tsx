'use client';

type GlobalErrorPageProps = {
  onReset: () => void;
};

export function GlobalErrorPage({ onReset }: GlobalErrorPageProps) {
  return (
    <html>
      <body>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold">Something went wrong</h1>
              <p className="py-4">We could not load this page. Please try again.</p>
              <button
                className="btn btn-neutral"
                onClick={() => {
                  onReset();
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
