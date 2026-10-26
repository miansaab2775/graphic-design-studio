import Link from 'next/link';
import { ArrowRight, Lock, ShieldCheck, LayoutDashboard, PencilLine, FolderKanban } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">Overview</h1>
        </div>
        <Link href="/dashboard/login" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
          Go to admin login <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Portfolio items', value: '24', icon: FolderKanban },
          { title: 'Open orders', value: '08', icon: LayoutDashboard },
          { title: 'Services', value: '06', icon: PencilLine },
          { title: 'Security', value: 'Protected', icon: ShieldCheck },
        ].map((item) => (
          <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 inline-flex rounded-full bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200"><item.icon className="h-5 w-5" /></div>
            <div className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[30px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white"><Lock className="h-5 w-5 text-violet-600" /> Protected admin access</div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Dashboard routes should be protected with Supabase auth and role checks. This app includes the structure and placeholders for the secure admin experience, but live auth requires valid environment variables and a configured Supabase project.
        </p>
      </div>
    </main>
  );
}
