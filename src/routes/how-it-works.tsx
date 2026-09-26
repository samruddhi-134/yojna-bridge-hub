import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GLOBAL_DISCLAIMER } from "@/lib/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How YojnaSetu Works — Four Steps to Your Scheme Matches" },
      {
        name: "description",
        content:
          "Build a short profile, answer simple questions, discover schemes that may match you, and take the next step with documents, deadlines and official links.",
      },
      { property: "og:title", content: "How YojnaSetu Works" },
      { property: "og:description", content: "Four simple steps from questions to government scheme matches." },
      { property: "og:url", content: "/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  { n: "01", title: "Build Your Profile", text: "Share only the information needed to understand your needs and eligibility." },
  { n: "02", title: "Answer Simple Questions", text: "Complete a short questionnaire designed to take approximately two minutes." },
  { n: "03", title: "Discover Your Matches", text: "See government schemes that may match your profile." },
  { n: "04", title: "Take the Next Step", text: "View benefits, eligibility, documents, deadlines, and official application links." },
];

function HowItWorksPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-border bg-surface py-14">
        <div className="container-page max-w-3xl text-center">
          <Badge variant="soft">Approximately 2 minutes • Free to use</Badge>
          <h1 className="mt-5 text-3xl font-extrabold text-navy sm:text-4xl">
            Finding Relevant Schemes Is Simple.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            YojnaSetu turns scattered scheme information into a short, guided experience so you can
            focus on what you may be eligible for.
          </p>
        </div>
      </section>

      <div className="container-page max-w-4xl py-14">
        <ol className="space-y-5">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-2xl font-extrabold text-primary/25">{s.n}</span>
              <div>
                <h2 className="text-base font-bold text-navy">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
            <Lock aria-hidden="true" className="size-4 text-primary" /> What we never ask for
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We never ask for Aadhaar numbers, bank account details or passwords. You only share broad
            details such as age, state, education, occupation and an income range.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{GLOBAL_DISCLAIMER}</p>
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/eligibility-checker">
              Start My Free Eligibility Check <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
