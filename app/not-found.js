import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="py-16 text-center">
        <div className="text-5xl">🌾</div>
        <h1 className="mt-4 text-3xl font-extrabold text-soil-900">
          This field is fallow
        </h1>
        <p className="mx-auto mt-2 max-w-md text-soil-600">
          We couldn&apos;t find the page you were looking for. It may have been
          harvested or never planted.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/feed" className="btn-ghost">Go to the Field</Link>
        </div>
      </div>
    </PageShell>
  );
}
