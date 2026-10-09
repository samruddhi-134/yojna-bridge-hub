import type { ReactNode } from "react";

export function InfoPage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-14">
        <div className="container-page max-w-3xl">
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">{title}</h1>
          {intro ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
        </div>
      </section>
      <div className="container-page max-w-3xl space-y-8 py-12 text-sm leading-relaxed text-secondary-foreground [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy [&_p]:mt-2">
        {children}
      </div>
    </div>
  );
}

export function pageHead(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
