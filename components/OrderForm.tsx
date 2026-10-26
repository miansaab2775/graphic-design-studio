'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, UploadCloud } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const initialForm = {
  name: '',
  email: '',
  whatsapp: '',
  service: '',
  projectDescription: '',
  budget: '',
  deadline: '',
  additionalRequirements: '',
};

export function OrderForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const service = searchParams.get('service');
    if (service) {
      setForm((current) => ({ ...current, service }));
    }
  }, [searchParams]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = 'Your name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.whatsapp.trim()) nextErrors.whatsapp = 'WhatsApp number is required.';
    if (!form.service.trim()) nextErrors.service = 'Please choose a design service.';
    if (!form.projectDescription.trim() || form.projectDescription.trim().length < 20) nextErrors.projectDescription = 'Please describe your project in at least 20 characters.';
    if (!form.budget.trim()) nextErrors.budget = 'Budget is required.';
    if (!form.deadline.trim()) nextErrors.deadline = 'Deadline is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || 'Unable to submit your order right now.');
      }

      setStatus({ type: 'success', message: payload?.message || 'Your order has been submitted successfully.' });
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong while sending your order.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
          <input value={form.name} onChange={(e) => updateField('name', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Your full name" />
          {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email address</label>
          <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="you@example.com" />
          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">WhatsApp number</label>
          <input value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="+1 415 555 2048" />
          {errors.whatsapp && <p className="mt-2 text-sm text-red-500">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Design service</label>
          <select value={form.service} onChange={(e) => updateField('service', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950">
            <option value="">Select a service</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Social Media Content">Social Media Content</option>
            <option value="YouTube Thumbnails">YouTube Thumbnails</option>
            <option value="Flyers & Posters">Flyers & Posters</option>
            <option value="Business Cards & Print">Business Cards & Print</option>
          </select>
          {errors.service && <p className="mt-2 text-sm text-red-500">{errors.service}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Project description</label>
          <textarea value={form.projectDescription} onChange={(e) => updateField('projectDescription', e.target.value)} rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Tell us about your business, goals, and creative direction." />
          {errors.projectDescription && <p className="mt-2 text-sm text-red-500">{errors.projectDescription}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Budget</label>
          <input value={form.budget} onChange={(e) => updateField('budget', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="$300 - $1500" />
          {errors.budget && <p className="mt-2 text-sm text-red-500">{errors.budget}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Deadline</label>
          <input type="date" value={form.deadline} onChange={(e) => updateField('deadline', e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" />
          {errors.deadline && <p className="mt-2 text-sm text-red-500">{errors.deadline}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Reference image or file</label>
          <div className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center dark:border-slate-700 dark:bg-slate-950">
            <div>
              <UploadCloud className="mx-auto mb-3 h-8 w-8 text-violet-500" />
              <p className="text-sm text-slate-600 dark:text-slate-300">Upload a brief, mood board, or reference file</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Configured storage can be added through Supabase Storage.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Additional requirements</label>
          <textarea value={form.additionalRequirements} onChange={(e) => updateField('additionalRequirements', e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950" placeholder="Anything else we should know?" />
        </div>
      </div>

      {status && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-white dark:text-slate-950">
        {isSubmitting ? 'Submitting...' : 'Submit order'} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
