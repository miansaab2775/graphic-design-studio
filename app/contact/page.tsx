import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, MessageCircle, MapPin, Instagram, Linkedin, Dribbble } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Lunora Atelier',
  description: 'Connect with the studio for design projects, collaborations, or brand support.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">Let’s build something memorable</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
            <a href="mailto:hello@lunoraatelier.com" className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500">
              <Mail className="h-4 w-4" /> hello@lunoraatelier.com
            </a>
            <a href="https://wa.me/14155552048" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500">
              <MessageCircle className="h-4 w-4" /> WhatsApp chat
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <MapPin className="h-4 w-4" /> Remote worldwide
            </div>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"><Instagram className="h-4 w-4" /></a>
              <a href="https://behance.net" target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"><Dribbble className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </aside>

        <ContactForm />
      </div>
    </main>
  );
}
