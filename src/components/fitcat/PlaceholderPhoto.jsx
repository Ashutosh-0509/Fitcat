import { cn } from "@/lib/utils";

const TONES = [
  "from-[hsl(155_36%_17%)] to-[hsl(160_55%_8%)]",
  "from-[hsl(28_40%_19%)] to-[hsl(160_55%_8%)]",
  "from-[hsl(88_24%_17%)] to-[hsl(160_55%_8%)]",
  "from-[hsl(12_36%_19%)] to-[hsl(160_55%_8%)]",
];

/**
 * Shown wherever a real FitCat photograph has not been supplied yet.
 * Deliberately abstract (brand-toned arcs, never a fake dish) and labelled.
 */
export default function PlaceholderPhoto({ label = "Photo pending", tone = 0, className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        TONES[Math.abs(tone) % TONES.length],
        className
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
        <svg viewBox="0 0 200 200" className="h-[76%] w-auto opacity-80">
          <circle cx="100" cy="100" r="82" fill="none" stroke="hsl(var(--linen))" strokeOpacity="0.12" />
          <circle cx="100" cy="100" r="56" fill="none" stroke="hsl(var(--linen))" strokeOpacity="0.16" />
          <circle cx="100" cy="100" r="32" fill="hsl(var(--primary))" fillOpacity="0.16" />
          <path
            d="M100 18A82 82 0 0 1 182 100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-3 pb-2.5 pt-8">
        <span className="fc-label text-[8px] leading-none text-linen/85">{label}</span>
      </div>
    </div>
  );
}