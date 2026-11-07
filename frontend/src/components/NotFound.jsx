import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-forest-deep px-5 text-center">
      <p className="fc-label text-[10px] text-primary">404</p>
      <h1 className="fc-display text-[14vw] text-linen sm:text-[64px]">PAGE NOT FOUND</h1>
      <p className="max-w-sm text-[16px] leading-relaxed text-linen/60">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
