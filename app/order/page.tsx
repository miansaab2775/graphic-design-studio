import type { Metadata } from 'next';
import { useState } from 'react';
import { OrderForm } from '@/components/OrderForm';

export const metadata: Metadata = {
  title: 'Order | Lunora Atelier',
  description: 'Request a custom design package and share your requirements with the studio.',
};

export default function OrderPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Project inquiry</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">Tell me about your design project</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Share your goals, timeline, and vision. I’ll review your request and confirm next steps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What happens next?</h2>
          <div className="mt-5 space-y-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <p>1. I review your brief and service needs.</p>
            <p>2. I send a recommendation on scope and timing.</p>
            <p>3. We confirm the creative direction and begin design.</p>
          </div>
        </aside>

        <OrderForm />
      </div>
    </main>
  );
}
