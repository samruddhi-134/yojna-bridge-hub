import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, BookmarkCheck, Building2, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabel } from "@/lib/site";
import type { Scheme } from "@/lib/schemes.functions";

export function SchemeCard({
  scheme,
  reasons,
  saved,
  onToggleSave,
  savePending,
}: {
  scheme: Scheme;
  reasons?: string[];
  saved?: boolean;
  onToggleSave?: () => void;
  savePending?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="soft">{categoryLabel(scheme.category)}</Badge>
        <Badge variant="outline">
          <Building2 aria-hidden="true" className="size-3" />
          {scheme.government_level}
        </Badge>
        {scheme.state ? (
          <Badge variant="outline">
            <MapPin aria-hidden="true" className="size-3" />
            {scheme.state}
          </Badge>
        ) : null}
        {scheme.verification_status === "demo" ? <Badge variant="demo">Demo data</Badge> : null}
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-navy">
        <Link to="/scheme/$slug" params={{ slug: scheme.slug }} className="hover:text-primary">
          {scheme.scheme_name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scheme.description}</p>

      {scheme.benefits?.length ? (
        <ul className="mt-4 space-y-1.5">
          {scheme.benefits.slice(0, 2).map((b) => (
            <li key={b} className="flex gap-2 text-sm text-secondary-foreground">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}

      {reasons?.length ? (
        <div className="mt-4 rounded-xl border border-primary/15 bg-primary/5 p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles aria-hidden="true" className="size-3.5" /> Why this may match you
          </p>
          <ul className="mt-2 space-y-1">
            {reasons.map((r) => (
              <li key={r} className="text-xs leading-relaxed text-secondary-foreground">
                {r}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2 pt-0">
        <Button asChild className="flex-1" variant="default">
          <Link to="/scheme/$slug" params={{ slug: scheme.slug }}>
            View Details <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        {onToggleSave ? (
          <Button
            variant="outline"
            onClick={onToggleSave}
            disabled={savePending}
            aria-pressed={Boolean(saved)}
          >
            {saved ? <BookmarkCheck aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
            {saved ? "Saved" : "Save Scheme"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
