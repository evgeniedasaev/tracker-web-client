import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastProvider } from '@/shared/ui/toast';
import { AppShell } from '@/shared/ui/layout';
import { isAuthenticatedQuery } from '@/features/auth';
import { getNavigationSections } from '@/app/navigation.config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Forge',
    template: '%s | Forge',
  },
  description: 'Forge helps you organize your muscle-building journey.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const authenticated = await isAuthenticatedQuery();
  const navigationSections = getNavigationSections(authenticated);

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-200`}
      >
        <ToastProvider>
          <AppShell navigationSections={navigationSections}>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
