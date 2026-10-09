import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, pageHead } from "@/components/InfoPage";
import { FOOTER_DISCLAIMER } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About YojnaSetu — Connecting People with Opportunities",
      "YojnaSetu helps people discover and understand Indian government schemes through simplified information and personalized discovery.",
    ),
  component: () => (
    <InfoPage
      title="About YojnaSetu"
      intro="YojnaSetu helps people discover and understand government schemes through simplified information and personalized scheme discovery."
    >
      <section>
        <h2>Our mission</h2>
        <p>Government schemes can provide valuable support, but information is often scattered and hard to understand. We bring it together in one simple, modern place.</p>
      </section>
      <section>
        <h2>Independent platform</h2>
        <p>{FOOTER_DISCLAIMER}</p>
      </section>
    </InfoPage>
  ),
});
