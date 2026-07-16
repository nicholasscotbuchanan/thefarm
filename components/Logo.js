import Link from "next/link";

export default function Logo({ className = "", withText = true }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-sprout-600 text-lg shadow-sm"
      >
        🌱
      </span>
      {withText && (
        <span className="text-xl font-extrabold tracking-tight text-soil-900">
          TheFarm<span className="text-sprout-600">.com</span>
        </span>
      )}
    </Link>
  );
}
