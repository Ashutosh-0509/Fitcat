import { useState } from "react";
import { menu, formatPrice } from "@/config/fitcat";
import { useCart } from "./cart-context";
import { Star, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Cold Drinks", "Snacks", "Fresh Bowls"];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { qtyOf, add, setQty } = useCart();

  const filteredItems =
    activeCategory === "All"
      ? menu
      : menu.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="scroll-mt-14 bg-[#f8f5ef] px-5 py-20 text-[#142820] sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8c6b53]">
            What We Serve
          </p>
          <h2 className="mt-3 font-serif text-[9vw] font-bold tracking-tight text-[#2d180c] sm:text-[48px] lg:text-[56px]">
            Explore What's on Our Menu
          </h2>
          <p className="mt-3 text-[15px] text-[#5c3e28] sm:text-[17px]">
            From handcrafted espresso drinks to freshly baked pastries, every item is made with care.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#3d2314] text-white shadow-sm"
                    : "border border-[#e2d7cb] bg-[#ede3d8] text-[#5c3e28] hover:bg-[#e4d8cc]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4-column responsive grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((product) => {
            const qty = qtyOf(product.id);

            return (
              <div
                key={product.id}
                id={product.id}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-[#e5ded0] bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#f0e9df]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Bestseller Badge */}
                  {product.bestseller && (
                    <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#d93829] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      <Star className="h-3 w-3 fill-current" />
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mt-3.5 flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-bold text-[#142820]">
                      {product.name}
                    </h3>
                    <span className="text-[15px] font-bold text-[#142820]">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5c3e28]/75">
                    {product.description}
                  </p>

                  {/* ADD / Stepper */}
                  <div className="mt-4 pt-2">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => add(product.id)}
                        className="flex h-9 w-full items-center justify-center rounded-lg bg-[#3d2314] text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-all hover:bg-[#28150a] active:scale-95"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex h-9 w-full items-center justify-between rounded-lg border border-[#3d2314]/30 bg-[#f8f5ef] px-2">
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="grid h-7 w-7 place-items-center rounded text-[#3d2314] hover:bg-[#3d2314]/10 active:scale-90"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono text-[13px] font-bold text-[#142820]">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(product.id, qty + 1)}
                          className="grid h-7 w-7 place-items-center rounded text-[#3d2314] hover:bg-[#3d2314]/10 active:scale-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
