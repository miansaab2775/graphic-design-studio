import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3, Sparkles } from 'lucide-react';
import { getServiceBySlug } from '@/lib/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return { title: 'Service not found' };
  }

  return {
    title: `${service.name} | Lunora Atelier`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/services" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to services
      </Link>

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
          {service.badge}
        </div>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{service.name}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Starting at</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">${service.priceFrom}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Delivery</div>
            <div className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white"><Clock3 className="h-4 w-4" />{service.deliveryDays} days</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Revisions</div>
            <div className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white"><Sparkles className="h-4 w-4" /> {service.revisions}</div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What you receive</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>• Strategic creative direction grounded in your business goals</li>
            <li>• Polished visuals tailored for your audience and channel</li>
            <li>• Practical revision rounds for clarity and refinement</li>
            <li>• Ready-to-use files optimized for digital or print workflows</li>
          </ul>
        </div>

        <Link href={`/order?service=${encodeURIComponent(service.name)}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
          Order this service <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
