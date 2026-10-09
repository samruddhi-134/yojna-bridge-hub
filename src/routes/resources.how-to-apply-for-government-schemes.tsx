import { createFileRoute, Link } from "@tanstack/react-router";
import { InfoPage, pageHead } from "@/components/InfoPage";
import { Button } from "@/components/ui/button";

const PATH = "/resources/how-to-apply-for-government-schemes";

export const Route = createFileRoute("/resources/how-to-apply-for-government-schemes")({
  head: () => {
    const h = pageHead(PATH, "How to Apply for Government Schemes — Step-by-Step Guide | YojnaSetu", "Learn how to find, check eligibility for, and apply to Indian government schemes safely.");
    return {
      ...h,
      meta: h.meta.map((m) => ("property" in m && m.property === "og:type" ? { ...m, content: "article" } : m)),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Resources", item: "/resources" },
              { "@type": "ListItem", position: 3, name: "How to Apply", item: PATH },
            ],
          }),
        },
      ],
    };
  },
  component: () => (
    <InfoPage title="How to Apply for Government Schemes" intro="A simple step-by-step guide.">
      <section>
        <h2>1. Find schemes that may match you</h2>
        <p>Use the eligibility checker to discover schemes based on your profile.</p>
      </section>
      <section>
        <h2>2. Read the eligibility criteria</h2>
        <p>Check age, income, state and other conditions on the scheme page and the official source.</p>
      </section>
      <section>
        <h2>3. Prepare your documents</h2>
        <p>Gather the required documents listed for the scheme before you start.</p>
      </section>
      <section>
        <h2>4. Apply on the official portal</h2>
        <p>Only apply through official government websites. Never pay agents or share passwords.</p>
      </section>
      <section>
        <h2>5. Track your application</h2>
        <p>Note deadlines and keep your acknowledgement number safe.</p>
      </section>
      <Button asChild variant="hero" size="lg">
        <Link to="/eligibility-checker">Check My Eligibility — It's Free</Link>
      </Button>
    </InfoPage>
  ),
});
