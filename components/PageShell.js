import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ title, subtitle, updated, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          {title && (
            <header className="mb-8 border-b border-soil-100 pb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-soil-900">
                {title}
              </h1>
              {subtitle && <p className="mt-2 text-soil-600">{subtitle}</p>}
              {updated && (
                <p className="mt-2 text-xs text-soil-400">Last updated: {updated}</p>
              )}
            </header>
          )}
          <div className="legal">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
