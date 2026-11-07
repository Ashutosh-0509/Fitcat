import { cn } from "@/lib/utils";

export default function Logo({ className, dark = false }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={dark ? "/images/logo-dark.png" : "/images/logo.png"}
        alt="FitCat Healthy Kitchen"
        className="h-9 sm:h-10 w-auto object-contain transition-transform hover:scale-105"
      />
    </span>
  );
}
