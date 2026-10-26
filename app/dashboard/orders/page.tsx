export default function DashboardOrdersPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Orders</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Place order status management here. Pending, In Progress, Completed, and Cancelled states can be driven from a Supabase table.</p>
    </main>
  );
}
