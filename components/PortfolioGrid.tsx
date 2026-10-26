'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

export function PortfolioGrid({ projects, activeCategory, onCategoryChange }: {
  projects: Project[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {['All', 'Logo Design', 'Brand Identity', 'Social Media', 'YouTube Thumbnails', 'Flyers & Posters', 'Business Cards', 'Banners & Ads', 'Other'].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900 backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <Sparkles className="h-4 w-4 text-violet-500" />
              </div>
              <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
              <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100">
                View project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
