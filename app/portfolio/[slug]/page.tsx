import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjectBySlug } from '@/lib/data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: `${project.title} | Lunora Atelier`,
    description: project.description,
  };
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to portfolio
      </Link>

      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="relative h-[420px] w-full">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-violet-600">{project.category}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">{project.title}</h1>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={`${project.id}-${index}`} className="relative h-52 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  <Image src={image} alt={`${project.title} gallery ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Project overview</h2>
            <ul className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-200">
              <li><span className="font-semibold text-slate-900 dark:text-white">Client:</span> {project.client}</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Focus:</span> {project.category}</li>
              <li><span className="font-semibold text-slate-900 dark:text-white">Outcome:</span> {project.results}</li>
            </ul>

            <Link href="/order?service=Brand%20Identity" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
              Request similar work <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
