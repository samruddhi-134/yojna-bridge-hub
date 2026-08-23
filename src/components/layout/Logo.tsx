import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, showTagline = true }: { className?: string; showTagline?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="YojnaSetu home">
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-xl bg-navy text-navy-foreground shadow-soft transition-transform group-hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M2 18h20" strokeLinecap="round" />
          <path d="M4 18c0-6 4-9 8-9s8 3 8 9" />
          <path d="M12 3v6M8 12v6M16 12v6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-navy">YojnaSetu</span>
        {showTagline ? (
          <span className="mt-0.5 hidden text-[10px] font-medium text-muted-foreground sm:block">
            Connecting People with Opportunities.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
