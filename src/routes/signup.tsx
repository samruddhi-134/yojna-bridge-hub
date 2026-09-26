import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleButton } from "@/components/GoogleButton";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Your Free YojnaSetu Account" },
      {
        name: "description",
        content:
          "Create a free YojnaSetu account to save your scheme matches, bookmark opportunities and track important deadlines.",
      },
      { property: "og:title", content: "Find Opportunities Made for You — YojnaSetu" },
      { property: "og:description", content: "Create a free account to save scheme matches and track deadlines." },
      { property: "og:url", content: "/signup" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
  component: SignupPage,
});

const RULES = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Za-z]/.test(p), label: "Contains a letter" },
  { test: (p: string) => /\d/.test(p), label: "Contains a number" },
];

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (fullName.trim().length < 2) return setError("Please enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Please enter a valid email address.");
    if (!RULES.every((r) => r.test(password)))
      return setError("Your password must meet all the requirements listed below.");
    if (password !== confirm) return setError("Both passwords must match.");
    if (!terms) return setError("Please accept the Terms of Use and Privacy Policy.");

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName.trim() },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message.toLowerCase().includes("already")
          ? "An account with this email already exists. Try logging in instead."
          : signUpError.message,
      );
      return;
    }
    if (!data.session) {
      setSent(true);
      return;
    }
    toast.success("Your account is ready.");
    navigate({ to: "/dashboard" });
  }

  if (sent) {
    return (
      <div className="bg-surface py-20">
        <div className="container-page max-w-md text-center">
          <div className="rounded-2xl border border-border bg-card p-9 shadow-card">
            <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-success" />
            <h1 className="mt-5 text-xl font-extrabold text-navy">Check your email to confirm</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We've sent a confirmation link to <strong>{email}</strong>. Open it to activate your
              free account, then log in.
            </p>
            <Button asChild variant="outline" className="mt-7 w-full">
              <Link to="/login">Go to Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface py-14">
      <div className="container-page max-w-md">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9">
          <h1 className="text-2xl font-extrabold text-navy">Find Opportunities Made for You.</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Create a free account to save your matches and track important deadlines.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            {error ? (
              <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={100}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="you@example.com"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {RULES.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li key={r.label} className={`flex items-center gap-2 text-xs ${ok ? "text-success" : "text-muted-foreground"}`}>
                      <CheckCircle2 aria-hidden="true" className="size-3.5" />
                      {r.label} {ok ? "(met)" : ""}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-secondary-foreground">
              <Checkbox
                checked={terms}
                onCheckedChange={(v) => setTerms(Boolean(v))}
                aria-label="Accept terms and privacy policy"
                className="mt-0.5"
              />
              <span>
                I agree to the <Link to="/terms" className="font-semibold text-primary hover:underline">Terms of Use</Link> and{" "}
                <Link to="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Create My Free Account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <GoogleButton label="Continue with Google" />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
