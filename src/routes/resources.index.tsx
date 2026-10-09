import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { InfoPage, pageHead } from "@/components/InfoPage";

export const Route = createFileRoute("/resources/")({
  head: () => pageHead("/resources", "Resources — Guides to Government Schemes | YojnaSetu", "Simple guides to help you understand and apply for Indian government schemes."),
  component: () => (
    <InfoPage title="Resources" intro="Simple guides to help you understand and apply for government schemes.">
      <Link
        to="/resources/how-to-apply-for-government-schemes"
        className="block rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
      >
        <h2>How to Apply for Government Schemes</h2>
        <p>A step-by-step guide from finding a scheme to submitting your application.</p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-primary">
          Read guide <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      </Link>
    </InfoPage>
  ),
});
