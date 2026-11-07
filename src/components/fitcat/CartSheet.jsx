import { X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, menu } from "@/config/fitcat";
import { useCart } from "./cart-context";
import { buildWhatsAppUrl } from "@/config/fitcat";
import QuantityControl from "./QuantityControl";

export default function CartSheet({ open, onClose }) {
  const { items, subtotal, clear } = useCart();

  const lines = items.map(
    (item) => `${item.qty} × ${item.name} — ${formatPrice(item.price * item.qty)}`
  );
  const whatsappUrl = buildWhatsAppUrl(lines, subtotal);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-forest-deep shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-linen/10 px-5 py-4">
          <h2 className="fc-label text-[11px] text-linen">Your Order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-linen/15 text-linen transition-colors hover:border-linen/35"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-[15px] text-linen/50">Your basket is empty.</p>
              <p className="text-[13px] text-linen/30">Add items from the menu below.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-linen/10 px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] text-linen/60">Subtotal</span>
              <span className="font-mono text-[16px] font-semibold tabular-nums text-linen">
                {formatPrice(subtotal)}
              </span>
            </div>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Send Order via WhatsApp
              </a>
            ) : (
              <p className="text-center text-[12px] leading-relaxed text-linen/40">
                WhatsApp ordering coming soon. Visit us at the shop.
              </p>
            )}

            <button
              type="button"
              onClick={clear}
              className="mt-3 flex w-full items-center justify-center gap-1.5 py-2 text-[12px] text-linen/40 transition-colors hover:text-linen/70"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear basket
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItem({ item }) {
  const { setQty } = useCart();
  const product = menu.find((p) => p.id === item.id);
  if (!product) return null;

  return (
    <li className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium leading-snug text-linen">{product.name}</p>
        <p className="mt-0.5 font-mono text-[13px] tabular-nums text-linen/50">
          {formatPrice(product.price)} each
        </p>
      </div>
      <QuantityControl
        qty={item.qty}
        onChange={(qty) => setQty(item.id, qty)}
      />
    </li>
  );
}
