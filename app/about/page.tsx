import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Lunora Atelier',
  description: 'Learn about the design process, values, and experience behind the studio.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Design studio portrait" className="h-full w-full object-cover" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">About</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">Thoughtful design with commercial impact.</h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            I’m a multidisciplinary graphic designer helping brands look sharper, clearer, and more premium—without losing warmth or personality.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            My work blends strategic thinking and strong visual execution so marketing materials, identities, and digital content feel consistent and compelling across every touchpoint.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          'Brand strategy and visual direction',
          'High-converting social content and campaigns',
          'Print and digital assets designed for real business growth',
        ].map((item) => (
          <div key={item} className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">{item}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
