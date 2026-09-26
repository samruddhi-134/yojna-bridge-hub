import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your YojnaSetu Password" },
      { name: "description", content: "Enter your email address and we'll send you a link to reset your YojnaSetu password." },
      { property: "og:title", content: "Forgot Password — YojnaSetu" },
      { property: "og:description", content: "Send yourself a secure password reset link." },
      { property: "og:url", content: "/forgot-password" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Please enter a valid email address.");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) return setError(resetError.message);
    setSent(true);
  }

  return (
    <div className="bg-surface py-14">
      <div className="container-page max-w-md">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-success" />
              <h1 className="mt-5 text-xl font-extrabold text-navy">Check your email</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              </p>
              <Button asChild variant="outline" className="mt-7 w-full">
                <Link to="/login">Back to Log In</Link>
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-navy">Forgot your password?</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enter your email and we'll send you a secure link to set a new password.
              </p>
              <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                {error ? (
                  <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                    {error}
                  </p>
                ) : null}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
                  Send Reset Link
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Back to Log In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
