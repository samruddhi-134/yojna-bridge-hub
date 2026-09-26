import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/site";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Scheme Categories — Education, Women, Farmers & More | YojnaSetu" },
      {
        name: "description",
        content:
          "Browse government schemes by category: education and scholarships, women empowerment, agriculture, employment and skills, startup and business, and social welfare.",
      },
      { property: "og:title", content: "Government Scheme Categories — YojnaSetu" },
      { property: "og:description", content: "Find support based on your needs across six scheme categories." },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Find Support Based on Your Needs.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every category collects schemes around one kind of support, so you can start from what
            you actually need rather than from a department name.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            to="/categories/$category"
            params={{ category: c.key }}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
          >
            <span aria-hidden="true" className="text-3xl">{c.emoji}</span>
            <h2 className="mt-4 text-base font-bold text-navy">{c.label}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Explore <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
