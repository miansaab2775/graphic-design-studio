'use client';

import Link from 'next/link';
import { ArrowRight, Instagram, Mail, Linkedin, Dribbble } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 text-lg font-semibold tracking-[0.22em] text-slate-900 dark:text-white">LUNORA</div>
          <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
            Premium design systems for brands that want to look memorable, credible, and beautifully positioned.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">Explore</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">Services</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>Logo Design</li>
            <li>Brand Identity</li>
            <li>Social Media</li>
            <li>Print Design</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">Say hello</h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <a href="mailto:hello@lunoraatelier.com" className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white"><Mail className="h-4 w-4" /> hello@lunoraatelier.com</a>
            <a href="https://wa.me/14155552048" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white"><ArrowRight className="h-4 w-4" /> WhatsApp</a>
          </div>
          <div className="mt-5 flex gap-3 text-slate-600 dark:text-slate-300">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"><Instagram className="h-4 w-4" /></a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" aria-label="Behance" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"><Dribbble className="h-4 w-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-slate-200 p-2 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs uppercase tracking-[0.2em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 Lunora Atelier — Crafted for meaningful brands.
      </div>
    </footer>
  );
}
