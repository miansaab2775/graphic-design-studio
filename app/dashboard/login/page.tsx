'use client';

import { useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';

export default function DashboardLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (missing) {
      setMessage('Admin authentication is not configured yet. Add your Supabase credentials to .env.local to enable secure login.');
      return;
    }

    setMessage('Authentication is ready when your Supabase project is configured and the admin account has been created.');
  };

  return (
    <main className="mx-auto flex max-w-md items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
          <div className="rounded-full bg-violet-100 p-3 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200"><LockKeyhole className="h-5 w-5" /></div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-violet-600">Admin</div>
            <h1 className="text-2xl font-semibold">Sign in</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="admin@example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" placeholder="••••••••" />
          </div>

          {message && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">{message}</div>}

          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
            Sign in <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
