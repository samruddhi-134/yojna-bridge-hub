import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/GoogleButton";

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Save Your Personalized Results</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Create a free account to access your scheme matches anytime, bookmark opportunities, and
            track important deadlines.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-3">
          <GoogleButton label="Continue with Google" />
          <Button asChild variant="hero" size="lg">
            <Link to="/signup">Sign Up with Email</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
