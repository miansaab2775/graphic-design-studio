export const metadata = {
  title: 'Home | Lunora Atelier',
  description: 'Premium graphic design studio for modern branding, marketing, and content design.',
};

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass, Palette, Sparkles } from 'lucide-react';
import { featuredProjects, projects, services, testimonials } from '@/lib/data';

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-mesh">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">
              Premium creative studio
            </span>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Design that makes your brand impossible to ignore.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              From standout branding to polished marketing visuals, I help ambitious businesses turn attention into action.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
                View portfolio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/order" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                Start a project
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-semibold text-slate-900 dark:text-white">150+</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">projects</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900 dark:text-white">8 yrs</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">experience</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-slate-900 dark:text-white">96%</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">retention</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[32px] border border-slate-200 bg-white p-3 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <div className="aspect-[4/5] overflow-hidden rounded-[26px] bg-slate-200">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Creative agency workspace" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 max-w-[220px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
              <p className="text-[10px] uppercase tracking-[0.2em] text-violet-600">Featured work</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Solace Studio</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Brand identity + launch art</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Featured work</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Selected projects</h2>
          </div>
          <Link href="/portfolio" className="hidden items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white md:inline-flex">
            Explore all portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-64 overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-violet-600">{project.category}</div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
                <Link href={`/portfolio/${project.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100">
                  View project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Services</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Creative services built around growth</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 inline-flex rounded-full bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200"><Palette className="h-5 w-5" /></div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{service.name}</h3>
                <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>From</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${service.priceFrom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Why choose me</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Strategy first, visuals that convert.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Brand clarity', icon: Compass, text: 'I translate business goals into visual systems that feel premium, memorable, and market-ready.' },
            { title: 'Fast delivery', icon: Sparkles, text: 'Clear milestones, thoughtful revisions, and efficient workflow help your launches stay on time.' },
            { title: 'Conversion focus', icon: CheckCircle2, text: 'Every design decision is optimized to attract the right audience and help your brand convert attention.' },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 inline-flex rounded-full bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><item.icon className="h-5 w-5" /></div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Clients trust the process</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-base leading-7 text-slate-700 dark:text-slate-200">“{testimonial.quote}”</p>
                <footer className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role} · {testimonial.company}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
