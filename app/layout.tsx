import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteMetadata } from '@/lib/metadata';

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.15),transparent_20%)]">
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
