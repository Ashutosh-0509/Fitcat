import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared −/+ stepper for menu cards and the basket. */
export default function QuantityControl({ qty, onChange, className }) {
  const button =
    "grid h-8 w-8 place-items-center rounded-full text-linen transition-colors duration-200 hover:bg-linen/10 active:bg-linen/15";
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center gap-0.5 rounded-full border border-linen/15 bg-forest/50 p-1",
        className
      )}
    >
      <button type="button" aria-label="Decrease quantity" className={button} onClick={() => onChange(qty - 1)}>
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span className="w-5 text-center font-mono text-[13px] tabular-nums text-linen">{qty}</span>
      <button type="button" aria-label="Increase quantity" className={button} onClick={() => onChange(qty + 1)}>
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}