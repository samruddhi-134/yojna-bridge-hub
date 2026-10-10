import { useEffect, useState } from "react";
import { trackRecentlyViewed } from "@/lib/recently-viewed";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarDays,
  ExternalLink,
  FileText,
  Info,
  ListChecks,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { EmptyState } from "@/components/states";
import { getSchemeBySlug } from "@/lib/schemes.functions";
import { GLOBAL_DISCLAIMER, categoryLabel } from "@/lib/site";
import { useAuth } from "@/hooks/use-auth";
import { useSavedSchemes, useToggleSave } from "@/hooks/use-saved-schemes";

export const Route = createFileRoute("/scheme/$slug")({
  loader: async ({ params }) => {
    const scheme = await getSchemeBySlug({ data: { slug: params.slug } });
    if (!scheme) throw notFound();
    return { scheme };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Scheme unavailable — YojnaSetu" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.scheme;
    const description = s.description.slice(0, 155);
    return {
      meta: [
        { title: `${s.scheme_name} — Benefits, Eligibility & Documents | YojnaSetu` },
        { name: "description", content: description },
        { property: "og:title", content: `${s.scheme_name} — YojnaSetu` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/scheme/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/scheme/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Explore Schemes", item: "/schemes" },
              { "@type": "ListItem", position: 3, name: s.scheme_name, item: `/scheme/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page max-w-2xl py-20">
      <EmptyState
        title="Scheme not found"
        description="This scheme may have been moved or is no longer listed."
        action={
          <Button asChild variant="hero">
            <Link to="/schemes">Explore all schemes</Link>
          </Button>
        }
      />
    </div>
  ),
  errorComponent: () => (
    <div className="container-page max-w-2xl py-20">
      <EmptyState
        title="We couldn't load this scheme"
        description="Please refresh the page or return to the scheme list."
        action={
          <Button asChild variant="outline">
            <Link to="/schemes">Back to schemes</Link>
          </Button>
        }
      />
    </div>
  ),
  component: SchemeDetail,
});

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "eligibility", label: "Eligibility Criteria" },
  { id: "documents", label: "Required Documents" },
  { id: "process", label: "Application Process" },
  { id: "dates", label: "Important Dates" },
  { id: "official", label: "Official Source" },
];

function List({ items, icon: Icon }: { items: string[]; icon: typeof ListChecks }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-secondary-foreground">
          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SchemeDetail() {
  const { scheme } = Route.useLoaderData();
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();
  const { data: savedRows } = useSavedSchemes(user?.id);
  const toggleSave = useToggleSave(user?.id);
  const saved = (savedRows ?? []).some((r) => r.scheme_id === scheme.id);
  useEffect(() => trackRecentlyViewed(scheme.slug), [scheme.slug]);

  function handleSave() {
    if (!user) return setAuthOpen(true);
    toggleSave.mutate({ schemeId: scheme.id, saved });
  }

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-12">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <Link to="/schemes" className="hover:text-primary">Explore Schemes</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span className="text-foreground">{scheme.scheme_name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="soft">{categoryLabel(scheme.category)}</Badge>
            <Badge variant="outline">
              <Building2 aria-hidden="true" className="size-3" /> {scheme.government_level} Government
            </Badge>
            {scheme.state ? (
              <Badge variant="outline">
                <MapPin aria-hidden="true" className="size-3" /> {scheme.state}
              </Badge>
            ) : null}
            {scheme.verification_status === "demo" ? (
              <Badge variant="demo">Demo data — not official information</Badge>
            ) : null}
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-navy sm:text-4xl">
            {scheme.scheme_name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-secondary-foreground">
            {scheme.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="hero" onClick={handleSave} disabled={toggleSave.isPending} aria-pressed={saved}>
              {saved ? <BookmarkCheck aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
              {saved ? "Saved to your account" : "Save Scheme"}
            </Button>
            {scheme.application_url ? (
              <Button asChild variant="outline">
                <a href={scheme.application_url} target="_blank" rel="noopener noreferrer">
                  Official Application Link <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
        <article className="max-w-3xl space-y-12">
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary-foreground">{scheme.description}</p>
          </section>

          <section id="benefits" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Benefits</h2>
            <List items={scheme.benefits} icon={Sparkles} />
          </section>

          <section id="eligibility" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Eligibility Criteria</h2>
            <List items={scheme.eligibility_criteria} icon={ListChecks} />
          </section>

          <section id="documents" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Required Documents</h2>
            <List items={scheme.required_documents} icon={FileText} />
          </section>

          <section id="process" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Application Process</h2>
            <ol className="mt-4 space-y-3">
              {scheme.application_process.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-secondary-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section id="dates" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Important Dates</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                Deadline: <strong>{scheme.deadline ?? "Open / not specified"}</strong>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                <Info aria-hidden="true" className="size-4 text-primary" />
                Last updated: <strong>{scheme.last_updated}</strong>
              </span>
            </div>
          </section>

          <section id="official" className="scroll-mt-28">
            <h2 className="text-xl font-bold text-navy">Official Source</h2>
            <p className="mt-4 text-sm text-secondary-foreground">
              Always confirm the latest details on the official government source before applying.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {scheme.official_url ? (
                <Button asChild variant="outline">
                  <a href={scheme.official_url} target="_blank" rel="noopener noreferrer">
                    Visit official source <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {scheme.application_url ? (
                <Button asChild variant="navy">
                  <a href={scheme.application_url} target="_blank" rel="noopener noreferrer">
                    Apply on official portal <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>
          </section>

          <aside className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-sm font-bold text-navy">Disclaimer</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{GLOBAL_DISCLAIMER}</p>
          </aside>
        </article>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-sm font-bold text-navy">On this page</h2>
            <ul className="mt-4 space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
