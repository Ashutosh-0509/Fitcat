import { Star, Minus, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatPrice } from "@/config/fitcat";
import { useCart } from "./cart-context";
import PlaceholderPhoto from "./PlaceholderPhoto";

/**
 * One row of the Discover FitCat list: name, price and description on the left,
 * square photo with ADD (or the −/+ stepper) on the right. Light surface, large
 * type — readable on a phone in sunlight.
 */
export default function DiscoverRow({ product, index = 0 }) {
  const { qtyOf, add, setQty } = useCart();
  const qty = qtyOf(product.id);

  return (
    <li className="flex items-start gap-4 py-6 sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            aria-hidden="true"
            className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border-[1.5px] border-forest"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-forest" />
          </span>
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 rounded-[5px] bg-destructive px-1.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.06em] text-destructive-foreground">
              <Star className="h-[10px] w-[10px] fill-current" aria-hidden="true" />
              Bestseller
            </span>
          )}
          {!product.available && (
            <span className="fc-label text-[10px] text-forest/50">Unavailable</span>
          )}
        </div>

        <h3 className="mt-2 text-[17px] font-semibold leading-snug text-forest sm:text-[19px]">
          {product.name}
        </h3>

        <p className="mt-1 text-[16px] font-semibold tabular-nums text-forest">
          {formatPrice(product.price)}
        </p>

        {product.description ? (
          <p className="mt-1.5 text-[14px] leading-relaxed text-forest/65">
            {product.description}
          </p>
        ) : null}
      </div>

      <div className="w-[96px] shrink-0 sm:w-[116px]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fittingType="fill"
            className="aspect-square w-full rounded-xl object-cover"
          />
        ) : (
          <PlaceholderPhoto
            label="Photo pending"
            tone={index}
            className="aspect-square w-full rounded-xl"
          />
        )}

        {product.available || qty > 0 ? (
          qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product.id)}
              className="mt-2 h-9 w-full rounded-lg border border-forest/30 bg-linen text-[12px] font-bold uppercase tracking-[0.12em] text-forest transition-colors hover:border-forest/60 active:bg-forest/5"
            >
              Add
            </button>
          ) : (
            <div className="mt-2 flex h-9 w-full items-center justify-between rounded-lg border border-forest/30 bg-linen px-1">
              <button
                type="button"
                aria-label={`Remove one ${product.name}`}
                onClick={() => setQty(product.id, qty - 1)}
                className="grid h-7 w-7 place-items-center rounded-md text-forest active:bg-forest/10"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="font-mono text-[13px] tabular-nums text-forest">{qty}</span>
              <button
                type="button"
                aria-label={`Add one ${product.name}`}
                onClick={() => setQty(product.id, qty + 1)}
                className="grid h-7 w-7 place-items-center rounded-md text-forest active:bg-forest/10"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )
        ) : null}
      </div>
    </li>
  );
}