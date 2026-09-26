import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a New Password — YojnaSetu" },
      { name: "description", content: "Choose a new password for your YojnaSetu account." },
      { property: "og:title", content: "Set a New Password — YojnaSetu" },
      { property: "og:description", content: "Choose a new password for your YojnaSetu account." },
      { property: "og:url", content: "/reset-password" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/reset-password" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery");
    supabase.auth.getSession().then(({ data }) => {
      setReady(isRecovery || Boolean(data.session));
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Your new password must be at least 8 characters.");
    if (password !== confirm) return setError("Both passwords must match.");
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) return setError(updateError.message);
    toast.success("Your password has been updated.");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="bg-surface py-14">
      <div className="container-page max-w-md">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9">
          <h1 className="text-2xl font-extrabold text-navy">Set a new password</h1>
          {!ready ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This page works only from the reset link in your email. Request a new link from the{" "}
              <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
                forgot password
              </Link>{" "}
              page if yours has expired.
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            {error ? (
              <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input
                id="confirm"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
