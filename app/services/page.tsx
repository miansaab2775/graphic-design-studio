import type { Metadata } from 'next';
import { services } from '@/lib/data';
import { ServiceGrid } from '@/components/ServiceGrid';

export const metadata: Metadata = {
  title: 'Services | Lunora Atelier',
  description: 'Premium brand, social, and marketing design services with clear pricing and delivery timelines.',
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Services</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">Design support for every stage of growth</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Each package is tailored to help your brand communicate clearly, look premium, and convert attention into action.
        </p>
      </div>

      <ServiceGrid />
    </main>
  );
}
