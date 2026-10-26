import type { Metadata } from 'next';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { projects, projectCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Portfolio | Lunora Atelier',
  description: 'Browse a selection of premium brand identity, social, print, and digital design work.',
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Portfolio</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">Creative work designed to stand out</h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((category) => (
          <div key={category} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{category}</div>
        ))}
      </div>

      <PortfolioGrid projects={projects} activeCategory="All" onCategoryChange={() => undefined} />
    </main>
  );
}
