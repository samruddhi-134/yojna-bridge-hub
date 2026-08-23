import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/layout/Logo";
import { FOOTER_DISCLAIMER, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/schemes", label: "Explore Schemes" },
  { to: "/eligibility-checker", label: "Eligibility Checker" },
  { to: "/categories", label: "Categories" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
] as const;

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo showTagline={false} />
          <p className="mt-4 text-sm font-semibold text-navy">{SITE_TAGLINE}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-sm font-bold text-foreground">Quick Links</h2>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-bold text-foreground">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-4 py-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{FOOTER_DISCLAIMER}</p>
          <p className="shrink-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} YojnaSetu
          </p>
        </div>
      </div>
    </footer>
  );
}
