import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PartyPopper, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SchemeCard } from "@/components/SchemeCard";
import { AuthModal } from "@/components/AuthModal";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/states";
import { listSchemes } from "@/lib/schemes.functions";
import { loadAnswers, matchSchemes, type EligibilityAnswers } from "@/lib/eligibility";
import { GLOBAL_DISCLAIMER } from "@/lib/site";
import { useAuth } from "@/hooks/use-auth";
import { useSavedSchemes, useToggleSave } from "@/hooks/use-saved-schemes";

export const Route = createFileRoute("/eligibility-results")({
  head: () => ({
    meta: [
      { title: "Your Scheme Matches — YojnaSetu" },
      {
        name: "description",
        content:
          "See government schemes that may match your profile, with benefits, eligibility and why each one could be relevant to you.",
      },
      { property: "og:title", content: "Your Personalized Scheme Matches — YojnaSetu" },
      { property: "og:description", content: "Government schemes that may match your profile, needs and eligibility." },
      { property: "og:url", content: "/eligibility-results" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/eligibility-results" }],
  }),
  component: ResultsPage,
});

const FILTERS = [
  { key: "all", label: "All" },
  { key: "education", label: "Education" },
  { key: "employment", label: "Employment" },
  { key: "women", label: "Women" },
  { key: "agriculture", label: "Agriculture" },
  { key: "welfare", label: "Welfare" },
];

function ResultsPage() {
  const [answers, setAnswers] = useState<EligibilityAnswers | null>(null);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();
  const { data: savedRows } = useSavedSchemes(user?.id);
  const toggleSave = useToggleSave(user?.id);

  useEffect(() => {
    setAnswers(loadAnswers());
    setReady(true);
  }, []);

  const { data: schemes, isLoading, isError, refetch } = useQuery({
    queryKey: ["schemes"],
    queryFn: () => listSchemes(),
  });

  const matches = useMemo(
    () => (schemes && answers ? matchSchemes(schemes, answers) : []),
    [schemes, answers],
  );

  const visible = filter === "all" ? matches : matches.filter((m) => m.scheme.category === filter);
  const savedIds = new Set((savedRows ?? []).map((r) => r.scheme_id));

  function handleSave(schemeId: string) {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    toggleSave.mutate({ schemeId, saved: savedIds.has(schemeId) });
  }

  if (ready && !answers) {
    return (
      <div className="container-page max-w-3xl py-20">
        <EmptyState
          icon={<Search className="size-5" />}
          title="We don't have your answers yet"
          description="Complete the short eligibility check first and we'll show schemes that may match your profile."
          action={
            <Button asChild variant="hero" size="lg">
              <Link to="/eligibility-checker">Start My Eligibility Check</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-surface pb-20">
      <section className="border-b border-border bg-background py-12">
        <div className="container-page">
          <Badge variant="success">
            <PartyPopper aria-hidden="true" className="size-3.5" /> Results ready
          </Badge>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-navy sm:text-4xl">
            Great News! We Found Schemes That May Match Your Profile.
          </h1>
          <p className="mt-4 text-lg font-bold text-primary">
            {matches.length} Potential {matches.length === 1 ? "Match" : "Matches"}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These results use clearly labelled demo scheme records while verified government scheme
            data is being connected. {GLOBAL_DISCLAIMER}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="hero" onClick={() => (user ? undefined : setAuthOpen(true))} asChild={Boolean(user)}>
              {user ? (
                <Link to="/dashboard">
                  <Star aria-hidden="true" /> Go to My Dashboard
                </Link>
              ) : (
                <>
                  <Star aria-hidden="true" /> Save My Results
                </>
              )}
            </Button>
            <Button asChild variant="outline">
              <Link to="/eligibility-checker">Update My Answers</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter results by category">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-secondary-foreground hover:border-primary/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {isLoading ? <CardSkeletonGrid /> : null}
          {isError ? <ErrorState onRetry={() => refetch()} /> : null}
          {!isLoading && !isError && visible.length === 0 ? (
            <EmptyState
              title="No matches in this category"
              description="Try another category, or update your answers to broaden the types of support you're looking for."
              action={
                <Button asChild variant="outline">
                  <Link to="/eligibility-checker">Update My Answers</Link>
                </Button>
              }
            />
          ) : null}
          {!isLoading && !isError && visible.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((m) => (
                <SchemeCard
                  key={m.scheme.id}
                  scheme={m.scheme}
                  reasons={m.reasons}
                  saved={savedIds.has(m.scheme.id)}
                  savePending={toggleSave.isPending}
                  onToggleSave={() => handleSave(m.scheme.id)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
