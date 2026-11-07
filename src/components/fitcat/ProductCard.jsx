import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/config/fitcat";
import { useCart } from "./cart-context";
import QuantityControl from "./QuantityControl";
import PlaceholderPhoto from "./PlaceholderPhoto";

const PLACEHOLDER_LABEL = ["Photo pending", "Photo pending", "Photo pending", "Photo pending"];

export default function ProductCard({ product, index = 0, className }) {
  const { qtyOf, add, setQty } = useCart();
  const qty = qtyOf(product.id);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-forest-soft/50 ring-1 ring-inset ring-linen/5",
        className
      )}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fittingType="fill"
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <PlaceholderPhoto
          label={PLACEHOLDER_LABEL[index % PLACEHOLDER_LABEL.length]}
          tone={index}
          className="aspect-[4/3] w-full"
        />
      )}

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="text-[16px] font-medium leading-snug text-linen">{product.name}</h3>
          {product.description ? (
            <p className="mt-1.5 text-[13px] leading-relaxed text-moss">{product.description}</p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-mono text-[15px] tabular-nums text-linen">
            {formatPrice(product.price)}
          </span>

          {!product.available ? (
            <span className="fc-label text-[9px]">Unavailable</span>
          ) : qty === 0 ? (
            <button
              type="button"
              onClick={() => add(product.id)}
              className="inline-flex h-11 min-w-[84px] items-center justify-center rounded-full bg-primary px-5 text-[14px] font-semibold text-primary-foreground transition-transform duration-200 active:scale-95"
            >
              Add
            </button>
          ) : (
            <QuantityControl qty={qty} onChange={(next) => setQty(product.id, next)} />
          )}
        </div>
      </div>
    </article>
  );
}