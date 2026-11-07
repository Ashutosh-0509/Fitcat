import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { assets, business, formatPrice } from "@/config/fitcat";
import { useCart } from "./cart-context";
import OrderHandoff, { OrderNotConnected } from "./OrderHandoff";

/** A calm still taken from the supplied FitCat footage (no separate asset needed). */
function SuppliedStill({ at = 7 }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const seek = () => {
      try {
        video.currentTime = at;
      } catch {
        /* poster/first frame stays */
      }
    };
    if (video.readyState >= 1) seek();
    video.addEventListener("loadedmetadata", seek);
    return () => video.removeEventListener("loadedmetadata", seek);
  }, [at]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-linen/10 bg-forest-soft lg:aspect-[5/4]">
      {!ready && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,hsl(155_32%_19%),hsl(160_58%_7%)_72%)]" />
      )}
      <video
        ref={videoRef}
        src={assets.sequenceVideo}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onSeeked={() => setReady(true)}
        className={cn(
          "h-full w-full object-cover scale-[1.08] origin-center transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}

/** Section 05 — final order call. */
export default function OrderSection() {
  const { items, subtotal } = useCart();
  const lines = items.map(
    (item) => `${item.qty} × ${item.name} — ${formatPrice(item.price * item.qty)}`
  );
  const marketplaces = [
    { url: business.swiggyUrl, label: "Order on Swiggy" },
    { url: business.toingUrl, label: "Order on Toing" },
  ].filter((entry) => Boolean(entry.url));

  return (
    <section
      id="order"
      className="scroll-mt-14 bg-forest-deep px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="fc-label text-[10px] text-primary">04 / ORDER</p>
          <h2 className="fc-display mt-4 text-[13vw] text-linen sm:text-[56px] lg:text-[72px]">
            READY WHEN YOU ARE.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-linen/70">
            Send your basket straight to the FitCat kitchen in {business.locality}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {business.whatsappNumber ? (
              <OrderHandoff lines={lines} subtotal={subtotal} />
            ) : null}
            <a
              href="#menu"
              className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-linen/25 px-7 text-[15px] font-medium text-linen transition-colors duration-300 hover:border-linen/60 hover:bg-linen/5"
            >
              View Menu
            </a>
            {marketplaces.map((entry) => (
              <a
                key={entry.label}
                href={entry.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-linen/25 px-7 text-[15px] font-medium text-linen transition-colors duration-300 hover:border-linen/60 hover:bg-linen/5"
              >
                {entry.label}
              </a>
            ))}
          </div>

          {!business.whatsappNumber && <OrderNotConnected className="mt-6 max-w-md" />}
        </div>

        <SuppliedStill />
      </div>
    </section>
  );
}