import { buildWhatsAppUrl, formatPrice } from "@/config/fitcat";
import { ExternalLink, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** The WhatsApp "Send Order" button. Only renders when whatsappNumber is configured. */
export default function OrderHandoff({ lines, subtotal, className }) {
  const url = buildWhatsAppUrl(lines, subtotal);
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-90",
        className
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      Send Order via WhatsApp
      <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
    </a>
  );
}

/** Shown when WhatsApp is not yet configured. */
export function OrderNotConnected({ className }) {
  return (
    <p className={cn("text-[13px] leading-relaxed text-linen/50", className)}>
      WhatsApp ordering is coming soon. For now, visit us at the shop or call ahead.
    </p>
  );
}
