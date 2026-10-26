'use client';

import Link from 'next/link';
import { ArrowRight, Clock3, Sparkles } from 'lucide-react';
import { services } from '@/lib/data';

export function ServiceGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {services.map((service) => (
        <article key={service.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
              {service.badge}
            </span>
            <Sparkles className="h-4 w-4 text-violet-500" />
          </div>

          <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white">{service.name}</h3>
          <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>

          <div className="mb-6 space-y-3 border-y border-slate-200 py-4 dark:border-slate-800">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Starting at</span>
              <span className="font-semibold text-slate-900 dark:text-white">${service.priceFrom}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Delivery</span>
              <span className="inline-flex items-center gap-2 font-medium text-slate-900 dark:text-white"><Clock3 className="h-4 w-4" /> {service.deliveryDays} days</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>Revisions</span>
              <span className="font-medium text-slate-900 dark:text-white">{service.revisions}</span>
            </div>
          </div>

          <Link href={`/order?service=${encodeURIComponent(service.name)}`} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900">
            Order now <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}
