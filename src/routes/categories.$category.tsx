import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SchemeCard } from "@/components/SchemeCard";
import { AuthModal } from "@/components/AuthModal";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/states";
import { listSchemes } from "@/lib/schemes.functions";
import { CATEGORIES } from "@/lib/site";
import { useAuth } from "@/hooks/use-auth";
import { useSavedSchemes, useToggleSave } from "@/hooks/use-saved-schemes";

export const Route = createFileRoute("/categories/$category")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.key === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — YojnaSetu" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.label} Schemes — Benefits & Eligibility | YojnaSetu` },
        { name: "description", content: `${c.description} Browse schemes in the ${c.label} category on YojnaSetu.` },
        { property: "og:title", content: `${c.label} Schemes — YojnaSetu` },
        { property: "og:description", content: c.description },
        { property: "og:url", content: `/categories/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.category}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Categories", item: "/categories" },
              { "@type": "ListItem", position: 3, name: c.label, item: `/categories/${params.category}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page max-w-2xl py-20">
      <EmptyState
        title="Category not found"
        description="This category doesn't exist. Browse all categories instead."
        action={
          <Button asChild variant="hero">
            <Link to="/categories">View all categories</Link>
          </Button>
        }
      />
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();
  const { data: savedRows } = useSavedSchemes(user?.id);
  const toggleSave = useToggleSave(user?.id);
  const savedIds = new Set((savedRows ?? []).map((r) => r.scheme_id));

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["schemes"],
    queryFn: () => listSchemes(),
  });

  const schemes = (data ?? []).filter((s) => s.category === category.key);

  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-12">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <Link to="/categories" className="hover:text-primary">Categories</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span className="text-foreground">{category.label}</span>
          </nav>
          <span aria-hidden="true" className="text-3xl">{category.emoji}</span>
          <h1 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{category.label}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
        </div>
      </section>

      <div className="container-page py-12">
        {isLoading ? <CardSkeletonGrid /> : null}
        {isError ? <ErrorState onRetry={() => refetch()} /> : null}
        {!isLoading && !isError && schemes.length === 0 ? (
          <EmptyState
            title="No schemes listed here yet"
            description="Verified schemes for this category are being added. In the meantime, try the eligibility check."
            action={
              <Button asChild variant="hero">
                <Link to="/eligibility-checker">Check My Eligibility</Link>
              </Button>
            }
          />
        ) : null}
        {!isLoading && !isError && schemes.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schemes.map((s) => (
              <SchemeCard
                key={s.id}
                scheme={s}
                saved={savedIds.has(s.id)}
                savePending={toggleSave.isPending}
                onToggleSave={() =>
                  user ? toggleSave.mutate({ schemeId: s.id, saved: savedIds.has(s.id) }) : setAuthOpen(true)
                }
              />
            ))}
          </div>
        ) : null}
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
