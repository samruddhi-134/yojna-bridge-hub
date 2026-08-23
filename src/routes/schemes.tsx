import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SchemeCard } from "@/components/SchemeCard";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/states";
import { AuthModal } from "@/components/AuthModal";
import { listSchemes } from "@/lib/schemes.functions";
import { CATEGORIES, INDIAN_STATES } from "@/lib/site";
import { useAuth } from "@/hooks/use-auth";
import { useSavedSchemes, useToggleSave } from "@/hooks/use-saved-schemes";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Explore Government Schemes — Search, Filter & Compare | YojnaSetu" },
      {
        name: "description",
        content:
          "Browse government schemes by category, state, government level and target group. Search benefits, eligibility, documents and official links in one place.",
      },
      { property: "og:title", content: "Explore Government Schemes — YojnaSetu" },
      {
        property: "og:description",
        content: "Search and filter government schemes by category, state and government level.",
      },
      { property: "og:url", content: "/schemes" },
    ],
    links: [{ rel: "canonical", href: "/schemes" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["schemes"], queryFn: () => listSchemes() }),
  component: SchemesPage,
});

const TARGET_USERS = [
  "Students",
  "Women",
  "Farmers",
  "Unemployed",
  "Self-employed",
  "Business Owners",
  "Senior Citizens",
  "General Public",
];

function SchemesPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");
  const [level, setLevel] = useState("all");
  const [target, setTarget] = useState("all");
  const [sort, setSort] = useState("name");
  const [authOpen, setAuthOpen] = useState(false);

  const { user } = useAuth();
  const { data: savedRows } = useSavedSchemes(user?.id);
  const toggleSave = useToggleSave(user?.id);
  const savedIds = new Set((savedRows ?? []).map((r) => r.scheme_id));

  const { data: schemes, isLoading, isError, refetch } = useQuery({
    queryKey: ["schemes"],
    queryFn: () => listSchemes(),
  });

  const results = useMemo(() => {
    let list = [...(schemes ?? [])];
    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter(
        (s) =>
          s.scheme_name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          s.benefits.some((b) => b.toLowerCase().includes(term)),
      );
    }
    if (category !== "all") list = list.filter((s) => s.category === category);
    if (state !== "all") list = list.filter((s) => s.state === state || s.government_level === "Central");
    if (level !== "all") list = list.filter((s) => s.government_level === level);
    if (target !== "all") list = list.filter((s) => s.target_users?.includes(target));
    list.sort((a, b) =>
      sort === "name"
        ? a.scheme_name.localeCompare(b.scheme_name)
        : sort === "recent"
          ? (b.last_updated ?? "").localeCompare(a.last_updated ?? "")
          : (a.deadline ?? "9999").localeCompare(b.deadline ?? "9999"),
    );
    return list;
  }, [schemes, q, category, state, level, target, sort]);

  function handleSave(id: string) {
    if (!user) return setAuthOpen(true);
    toggleSave.mutate({ schemeId: id, saved: savedIds.has(id) });
  }

  const filters = (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="filter-category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="filter-category" className="h-11 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.key} value={c.key}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-state">State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger id="filter-state" className="h-11 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {INDIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-level">Government level</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger id="filter-level" className="h-11 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Central & State</SelectItem>
            <SelectItem value="Central">Central Government</SelectItem>
            <SelectItem value="State">State Government</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-target">Target group</Label>
        <Select value={target} onValueChange={setTarget}>
          <SelectTrigger id="filter-target" className="h-11 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Everyone</SelectItem>
            {TARGET_USERS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="filter-sort">Sort by</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger id="filter-sort" className="h-11 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A–Z)</SelectItem>
            <SelectItem value="recent">Recently updated</SelectItem>
            <SelectItem value="deadline">Closing soonest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => {
          setCategory("all");
          setState("all");
          setLevel("all");
          setTarget("all");
          setSort("name");
          setQ("");
        }}
      >
        Reset filters
      </Button>
    </div>
  );

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Explore Government Schemes</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Search and filter schemes by category, state, government level and target group. Scheme
            records shown here are clearly labelled demo data until verified government data is connected.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search schemes, benefits or keywords"
                aria-label="Search schemes"
                className="h-12 rounded-xl pl-11"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="lg:hidden">
                  <SlidersHorizontal aria-hidden="true" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl p-6">
                <SheetHeader className="mb-4 p-0">
                  <SheetTitle>Filter schemes</SheetTitle>
                </SheetHeader>
                {filters}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="mb-5 text-sm font-bold text-navy">Filters</h2>
            {filters}
          </div>
        </aside>

        <div>
          <p className="mb-5 text-sm font-medium text-muted-foreground" aria-live="polite">
            {isLoading ? "Loading schemes…" : `${results.length} scheme${results.length === 1 ? "" : "s"} found`}
          </p>
          {isLoading ? <CardSkeletonGrid /> : null}
          {isError ? <ErrorState onRetry={() => refetch()} /> : null}
          {!isLoading && !isError && results.length === 0 ? (
            <EmptyState
              title="No schemes match your filters"
              description="Try removing a filter or searching with a different keyword."
            />
          ) : null}
          {!isLoading && !isError && results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((s) => (
                <SchemeCard
                  key={s.id}
                  scheme={s}
                  saved={savedIds.has(s.id)}
                  savePending={toggleSave.isPending}
                  onToggleSave={() => handleSave(s.id)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
