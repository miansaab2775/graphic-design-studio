export const metadata = {
  title: 'Not Found | Lunora Atelier',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-300">The page you were looking for does not exist or may have moved.</p>
    </main>
  );
}
