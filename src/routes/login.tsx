import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleButton } from "@/components/GoogleButton";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In to Your YojnaSetu Account" },
      {
        name: "description",
        content: "Log in to YojnaSetu to view your scheme matches, saved schemes and upcoming deadlines.",
      },
      { property: "og:title", content: "Log In — YojnaSetu" },
      { property: "og:description", content: "Continue your journey to discover opportunities that matter to you." },
      { property: "og:url", content: "/login" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes("invalid")
          ? "That email and password combination doesn't match an account."
          : signInError.message,
      );
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="bg-surface py-14">
      <div className="container-page max-w-md">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9">
          <h1 className="text-2xl font-extrabold text-navy">Welcome Back 👋</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Continue your journey to discover opportunities that matter to you.
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
                  autoComplete="current-password"
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
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-secondary-foreground">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} aria-label="Remember me" />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Log In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <GoogleButton label="Continue with Google" />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to YojnaSetu?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
