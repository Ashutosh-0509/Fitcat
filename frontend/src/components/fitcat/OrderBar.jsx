import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/config/fitcat";
import { useCart } from "./cart-context";

/** Bottom-docked basket bar; appears only when something is in the basket. */
export default function OrderBar({ onOpenCart }) {
  const { count, subtotal } = useCart();
  const visible = count > 0;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      )}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={onOpenCart}
        tabIndex={visible ? 0 : -1}
        className="mx-auto flex w-full max-w-md items-center gap-3 rounded-full bg-primary py-3 pl-5 pr-4 text-primary-foreground shadow-[0_20px_50px_-16px_rgba(0,0,0,0.85)] transition-transform duration-200 active:scale-[0.99]"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-75">
          {count} {count === 1 ? "item" : "items"}
        </span>
        <span className="flex-1 text-left text-[15px] font-semibold">
          View order · {formatPrice(subtotal)}
        </span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}