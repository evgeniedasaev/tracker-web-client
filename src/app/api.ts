const base = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(path: string, init?: RequestInit): Promise<T> | undefined {
  const res = await fetch(`${base}${path}`, {
    ...init,
    // cache: 'no-store', // для строгого SSR без кэша
    // next: { revalidate: 60 }, // или переиспользуй ISR
  });
  if (!res.ok) {
    const text = await res.text();
    console.log(`API ${res.status}: ${text}`);
    return;
  }
  return res.json() as Promise<T>;
}
