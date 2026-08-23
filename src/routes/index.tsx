import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileQuestion,
  FileText,
  IndianRupee,
  Layers,
  Link2,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YojnaSetu — Find Government Schemes You Are Eligible For in 2 Minutes" },
      {
        name: "description",
        content:
          "Answer a few simple questions and discover Indian government schemes that may match your profile, needs, and eligibility. Free, simple and personalized.",
      },
      { property: "og:title", content: "Find Government Schemes You Are Eligible For — in Just 2 Minutes" },
      {
        property: "og:description",
        content:
          "YojnaSetu helps you discover and understand government schemes with a simple 2-minute eligibility check.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is YojnaSetu a government website?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. YojnaSetu is an independent information and discovery platform. Always verify details on the official government source before applying.",
              },
            },
            {
              "@type": "Question",
              name: "How long does the eligibility check take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The eligibility check takes approximately two minutes and is free to use.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need an account to see my matches?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. You can see your matches without an account. A free account lets you save schemes and track deadlines.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const TRUST = ["Free to Use", "Simple & Easy", "Personalized Discovery", "Official Sources"];

const MATCH_PREVIEW = [
  { label: "Education & Scholarships", sub: "4 Schemes", count: 4, tone: "bg-primary/10 text-primary" },
  { label: "Women Empowerment", sub: "3 Schemes", count: 3, tone: "bg-saffron/20 text-saffron-foreground" },
  { label: "Employment & Skills", sub: "3 Schemes", count: 3, tone: "bg-navy/10 text-navy" },
  { label: "Social Welfare", sub: "2 Schemes", count: 2, tone: "bg-success/12 text-success" },
];

const PROBLEMS = [
  {
    icon: Layers,
    title: "Too Much Information",
    text: "Important information is spread across different websites and portals.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: FileQuestion,
    title: "Confusing Eligibility",
    text: "People often don't know whether they actually qualify.",
    tone: "bg-saffron/20 text-saffron-foreground",
  },
  {
    icon: FileText,
    title: "Unclear Documents",
    text: "Users may not know which documents they need before applying.",
    tone: "bg-success/12 text-success",
  },
  {
    icon: Clock,
    title: "Missed Deadlines",
    text: "Important opportunities can be missed because users discover them too late.",
    tone: "bg-destructive/10 text-destructive",
  },
];

const DISCOVERY_STEPS = [
  { icon: UserRound, title: "Tell us about yourself", text: "Share basic information to help us understand your profile." },
  { icon: ClipboardList, title: "Answer a few questions", text: "Answer a short set of questions about your needs and background." },
  { icon: Target, title: "Discover schemes", text: "We'll show schemes that may match your profile and needs." },
];

const HOW_STEPS = [
  { n: "01", title: "Build Your Profile", text: "Share only the information needed to understand your needs and eligibility." },
  { n: "02", title: "Answer Simple Questions", text: "Complete a short questionnaire designed to take approximately two minutes." },
  { n: "03", title: "Discover Your Matches", text: "See government schemes that may match your profile." },
  { n: "04", title: "Take the Next Step", text: "View benefits, eligibility, documents, deadlines, and official application links." },
];

const WHY = [
  { icon: Target, title: "Understand Eligibility", text: "Quickly understand who may qualify." },
  { icon: IndianRupee, title: "Explore Benefits", text: "See the financial or other support provided." },
  { icon: FileText, title: "Know Required Documents", text: "Prepare before beginning your application." },
  { icon: CalendarDays, title: "Track Important Dates", text: "Stay aware of deadlines and important updates." },
  { icon: Link2, title: "Visit Official Sources", text: "Access official information and application portals." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-primary/5 blur-3xl"
        />
        <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge variant="soft" className="mb-6">
              <span aria-hidden="true">🇮🇳</span> Making Government Benefits Easier to Access
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-navy sm:text-5xl lg:text-[3.4rem]">
              Find Government Schemes You Are{" "}
              <span className="text-primary">Eligible For</span> — in Just{" "}
              <span className="text-primary">2 Minutes.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary-foreground">
              Government schemes can provide valuable support, but finding the right one can be
              confusing. Answer a few simple questions and discover schemes that may match your
              profile, needs, and eligibility.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <Link to="/eligibility-checker">
                  Check My Eligibility — It's Free <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/schemes">Explore All Schemes</Link>
              </Button>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium text-secondary-foreground">
                  <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Sample matches visual */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-float sm:p-7">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-success text-success-foreground">
                  <CheckCircle2 className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your Scheme Matches</p>
                  <p className="text-2xl font-extrabold text-navy">12 Potential Matches</p>
                </div>
              </div>
              <ul className="mt-6 divide-y divide-border border-t border-border">
                {MATCH_PREVIEW.map((m) => (
                  <li key={m.label} className="flex items-center gap-4 py-4">
                    <span aria-hidden="true" className={`flex size-10 items-center justify-center rounded-xl ${m.tone}`}>
                      <Layers className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.sub}</p>
                    </div>
                    <span className="text-lg font-bold text-navy">{m.count}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-primary/5 p-3 text-xs leading-relaxed text-secondary-foreground">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                Sample preview. Answer a few questions to see your own personalized results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-page">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold text-navy sm:text-4xl">
            Government Schemes Are Helpful.{" "}
            <span className="block text-primary">Finding the Right One Isn't Always Easy.</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map(({ icon: Icon, title, text, tone }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
                <span aria-hidden="true" className={`mx-auto flex size-12 items-center justify-center rounded-full ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-medium text-secondary-foreground">
            {SITE_NAME} helps bridge the gap between people and the opportunities created to support them.
          </p>
        </div>
      </section>

      {/* ELIGIBILITY PROMO */}
      <section className="py-16 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr_auto] lg:items-center">
          <div>
            <Badge variant="secondary" className="uppercase tracking-wider">Personalized Discovery</Badge>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-navy">
              Not Sure Which Schemes Are Right for You?
            </h2>
            <p className="mt-3 text-lg font-semibold text-primary">Let YojnaSetu Help You Find Them.</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Answer a few simple questions about yourself, and we'll help identify government schemes
              that may match your profile.
            </p>
          </div>

          <ol className="grid gap-6 sm:grid-cols-3">
            {DISCOVERY_STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="text-center">
                <span className="mx-auto flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span aria-hidden="true" className="mx-auto mt-4 flex size-14 items-center justify-center rounded-2xl bg-surface-strong text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl bg-navy p-7 text-center text-navy-foreground shadow-float lg:w-64">
            <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy-foreground/10">
              <ShieldCheck className="size-6" />
            </span>
            <p className="mt-4 text-lg font-bold leading-snug">Find My Eligible Schemes</p>
            <Button asChild variant="saffron" className="mt-5 w-full">
              <Link to="/eligibility-checker">
                Start Now <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <p className="mt-4 text-xs text-navy-foreground/70">
              Takes approximately 2 mins • Free to use
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-extrabold text-navy sm:text-4xl">
            Finding Relevant Schemes Is Simple.
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="text-2xl font-extrabold text-primary/25">{s.n}</span>
                <h3 className="mt-2 text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/eligibility-checker">
                Start My Free Eligibility Check <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-20">
        <div className="container-page">
          <h2 className="text-center text-3xl font-extrabold text-navy sm:text-4xl">
            Find Support Based on Your Needs.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                to="/categories/$category"
                params={{ category: c.key }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
              >
                <span aria-hidden="true" className="text-3xl">{c.emoji}</span>
                <h3 className="mt-4 text-base font-bold text-navy">{c.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Explore <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="pb-20">
        <div className="container-page">
          <div className="rounded-3xl bg-navy px-6 py-12 text-navy-foreground sm:px-10">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
              Everything You Need to Understand a Scheme — in One Place.
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {WHY.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-navy-foreground/10">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-foreground/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
