import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastProvider } from '@/shared/ui/toast';
import { AppShell } from '@/shared/ui/layout';
import { navigationSections } from '@/app/navigation.config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Tracker',
    template: '%s | Tracker',
  },
  description: 'Tracker helps you organize your muscle-building journey.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <AppShell navigationSections={navigationSections}>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
