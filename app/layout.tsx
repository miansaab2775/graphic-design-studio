import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brain Test Challenge',
  description: 'Play a colorful, local brain-training game with logic puzzles, memory tests, riddles, and timed challenges.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
