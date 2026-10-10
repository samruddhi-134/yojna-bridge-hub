import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Bookmark, CalendarDays, ClipboardCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSavedSchemes, useToggleSave } from "@/hooks/use-saved-schemes";
import { listSchemes, type Scheme } from "@/lib/schemes.functions";
import { loadAnswers, matchSchemes } from "@/lib/eligibility";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { SchemeCard } from "@/components/SchemeCard";
import { EmptyState, LoadingState } from "@/components/states";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — YojnaSetu" },
      { name: "description", content: "Your scheme matches, saved schemes and upcoming deadlines." },
      { property: "og:title", content: "Your Dashboard — YojnaSetu" },
      { property: "og:description", content: "Your scheme matches, saved schemes and upcoming deadlines." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, loading, firstName } = useAuth();
  const navigate = useNavigate();
  const schemesQ = useQuery({ queryKey: ["schemes"], queryFn: () => listSchemes() });
  const savedQ = useSavedSchemes(user?.id);
  const toggle = useToggleSave(user?.id);
  const [answers, setAnswers] = useState<ReturnType<typeof loadAnswers>>(null);

  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  useEffect(() => {
    setAnswers(loadAnswers());
    setRecentSlugs(getRecentlyViewed());
  }, []);
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const matches = useMemo(
    () => (answers && schemesQ.data ? matchSchemes(schemesQ.data, answers) : []),
    [answers, schemesQ.data],
  );
  const saved = (savedQ.data ?? []).map((s) => s.schemes as Scheme | null).filter(Boolean) as Scheme[];
  const recent = recentSlugs.map((slug) => schemesQ.data?.find((s) => s.slug === slug)).filter(Boolean) as Scheme[];
  const savedIds = new Set(saved.map((s) => s.id));
  const today = new Date().toISOString().slice(0, 10);
  const deadlines = saved.filter((s) => s.deadline && s.deadline >= today).sort((a, b) => a.deadline!.localeCompare(b.deadline!));

  if (loading || !user) return <LoadingState label="Loading your dashboard…" className="py-24" />;

  const stats = [
    { icon: Sparkles, label: "Eligible Schemes", value: matches.length },
    { icon: Bookmark, label: "Saved Schemes", value: saved.length },
    { icon: CalendarDays, label: "Upcoming Deadlines", value: deadlines.length },
    { icon: ClipboardCheck, label: "Document Checklists", value: saved.length },
  ];

  const card = (s: Scheme) => (
    <SchemeCard
      key={s.id}
      scheme={s}
      saved={savedIds.has(s.id)}
      savePending={toggle.isPending}
      onToggleSave={() => toggle.mutate({ schemeId: s.id, saved: savedIds.has(s.id) })}
    />
  );

  return (
    <div className="container-page space-y-12 py-12">
      <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Welcome Back, {firstName || "there"} 👋</h1>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <li key={label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Icon aria-hidden="true" className="size-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-extrabold text-navy">{value}</p>
          </li>
        ))}
      </ul>

      <section>
        <h2 className="mb-5 text-xl font-bold text-navy">Recommended for You</h2>
        {matches.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{matches.slice(0, 6).map((m) => card(m.scheme))}</div>
        ) : (
          <EmptyState
            title="No recommendations yet"
            description="Take the 2-minute eligibility check to see schemes that may match your profile."
            action={<Button asChild variant="hero"><Link to="/eligibility-checker">Check My Eligibility</Link></Button>}
          />
        )}
      </section>

      <section>
        <h2 className="mb-5 text-xl font-bold text-navy">Recently Viewed</h2>
        {recent.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{recent.map(card)}</div>
        ) : (
        <EmptyState title="Nothing viewed yet" description="Schemes you open will appear here." action={<Button asChild variant="outline"><Link to="/schemes">Explore Schemes</Link></Button>} />
        )}
      </section>

      <section id="saved">
        <h2 className="mb-5 text-xl font-bold text-navy">Saved Schemes</h2>
        {saved.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{saved.map(card)}</div>
        ) : (
          <EmptyState title="No saved schemes" description="Bookmark schemes to find them here anytime." />
        )}
      </section>

      <section>
        <h2 className="mb-5 text-xl font-bold text-navy">Upcoming Deadlines</h2>
        {deadlines.length ? (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {deadlines.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 p-4">
                <Link to="/scheme/$slug" params={{ slug: s.slug }} className="font-semibold text-navy hover:text-primary">{s.scheme_name}</Link>
                <span className="text-sm text-muted-foreground">{new Date(s.deadline!).toLocaleDateString("en-IN")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No upcoming deadlines" description="Deadlines from your saved schemes will show here." />
        )}
      </section>
    </div>
  );
}
