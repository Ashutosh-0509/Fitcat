import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Play, Pause, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";
import { cn } from "@/lib/utils";

const DISHES = [
  {
    id: "chutney-cheese-sandwich",
    name: "Chutney Cheese Sandwich",
    price: 99,
    description: "Flavourful snack made by layering green chutney and cheese between slices of bread.",
    image: "/images/dishes/chutney_sandwich.jpg",
    thumb: "/images/dishes/chutney_sandwich.jpg",
  },
  {
    id: "chia-pudding",
    name: "Chia Pudding",
    price: 99,
    description: "A creamy, naturally sweetened pudding with the goodness of chia seeds.",
    image: "/images/dishes/chia_pudding.jpg",
    thumb: "/images/dishes/chia_pudding.jpg",
  },
  {
    id: "assorted-fruits",
    name: "Assorted Fruits",
    price: 99,
    description: "Pre selected fresh fruits served together as a variety blend.",
    image: "/images/dishes/assorted_fruits.jpg",
    thumb: "/images/dishes/assorted_fruits.jpg",
  },
  {
    id: "gupta-fruit-juice",
    name: "Gupta Fruit & Juice",
    price: 149,
    description: "Refreshing seasonal fruits blended to perfection.",
    image: "/images/dishes/gupta_juice.jpg",
    thumb: "/images/dishes/gupta_juice.jpg",
  },
];

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prevIdx, setPrevIdx] = useState(null);
  const [textAnim, setTextAnim] = useState("enter");
  const [nextPreviewPop, setNextPreviewPop] = useState(true);

  const heroRef = useRef(null);

  const { add } = useCart();
  const currentDish = DISHES[currentIdx];
  const nextDish = DISHES[(currentIdx + 1) % DISHES.length];

  const changeSlide = useCallback(
    (nextIndex) => {
      if (animating || nextIndex === currentIdx) return;
      setAnimating(true);
      setPrevIdx(currentIdx);
      setTextAnim("exit");
      setNextPreviewPop(false);

      // Phase 1: Text exits (350ms)
      setTimeout(() => {
        setCurrentIdx(nextIndex);
        setTextAnim("enter");
      }, 350);

      // Phase 2: Next preview pops back in
      setTimeout(() => {
        setNextPreviewPop(true);
      }, 500);

      // Phase 3: Transition finishes after 1100ms
      setTimeout(() => {
        setPrevIdx(null);
        setAnimating(false);
      }, 1100);
    },
    [animating, currentIdx]
  );

  const handleNext = useCallback(() => {
    const nextIndex = (currentIdx + 1) % DISHES.length;
    changeSlide(nextIndex);
  }, [currentIdx, changeSlide]);

  const handlePrev = useCallback(() => {
    const nextIndex = (currentIdx - 1 + DISHES.length) % DISHES.length;
    changeSlide(nextIndex);
  }, [currentIdx, changeSlide]);

  // Auto-play interval every 5.2s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const scrollToMenuDish = (dishId) => {
    const el = document.getElementById(dishId) || document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-[#3d2314]", "rounded-2xl");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-[#3d2314]");
      }, 2000);
    }
  };

  return (
    <section
      id="mood-hero"
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#f8f5ef] px-5 pb-8 pt-20 text-[#3d2314] select-none sm:px-8 lg:px-16 lg:pt-24"
    >
      {/* Floating decorative elements with gentle 7s bobbing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Coffee Bean 1 */}
        <div className="animate-float-1 absolute left-[8%] top-[24%] h-5 w-7 rotate-12 rounded-full bg-[#4a2e1b] opacity-40 shadow-sm" />
        {/* Coffee Bean 2 */}
        <div className="animate-float-2 absolute left-[4%] bottom-[28%] h-4 w-6 -rotate-45 rounded-full bg-[#4a2e1b] opacity-35 shadow-sm" />
        {/* Coffee Bean 3 */}
        <div className="animate-float-3 absolute right-[5%] top-[28%] h-5 w-7 rotate-45 rounded-full bg-[#4a2e1b] opacity-40 shadow-sm" />
        {/* Mint Leaf */}
        <div className="animate-float-2 absolute right-[8%] bottom-[32%] text-2xl opacity-60">🌿</div>
        {/* Orange Slice */}
        <div className="animate-float-1 absolute -left-2 top-[32%] text-3xl opacity-75">🍊</div>
      </div>

      {/* Main Two-Column Content */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-6xl items-center gap-10 py-6 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Heading, Description, Price & Actions */}
        <div className="order-2 flex flex-col items-start lg:order-1 lg:col-span-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8c6b53]">
            Chef's Fresh Picks
          </span>

          {/* Heading in handwritten style */}
          <h1 className="mt-3 font-serif text-[10vw] font-bold leading-[1.05] tracking-tight text-[#2d180c] sm:text-[52px] lg:text-[62px]">
            What are you in the mood for?
          </h1>

          {/* Animated Description & Price */}
          <div
            className={cn(
              "mt-4 min-h-[90px] transition-all duration-500",
              textAnim === "exit"
                ? "-translate-x-6 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            <p className="max-w-md text-[16px] leading-relaxed text-[#5c3e28] sm:text-[18px]">
              {currentDish.description}
            </p>
            <p className="mt-2 text-[26px] font-bold text-[#2d180c] sm:text-[30px]">
              ₹{currentDish.price}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToMenuDish(currentDish.id)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#3d2314] px-7 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#28150a] hover:shadow-lg active:scale-95"
            >
              See the Menu
            </button>
            <button
              type="button"
              onClick={() => add(currentDish.id)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#d6c7b8] bg-white px-6 text-[15px] font-semibold text-[#3d2314] shadow-sm transition-all hover:bg-[#f8f5f0] active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Add
            </button>
            <a
              href="#gathering"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-transparent px-5 text-[15px] font-medium text-[#5c3e28] hover:text-[#2d180c]"
            >
              Find Us
            </a>
          </div>

          {/* Meta Row */}
          <div className="mt-8 flex items-center gap-2 text-[12px] font-medium text-[#7a5940]">
            <span className="flex items-center gap-1 text-[#e07a2e]">
              <Star className="h-3.5 w-3.5 fill-current" />
              Bestseller
            </span>
            <span>·</span>
            <span>Freshly made</span>
            <span>·</span>
            <span className="text-[#2b6e4f]">● Open now</span>
          </div>
        </div>

        {/* Right Column: LARGE Round Dish Image with Diagonal Slide Animation */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
          <div className="relative aspect-square w-[280px] sm:w-[380px] lg:w-[440px]">
            {/* Old Dish sliding to BOTTOM-LEFT */}
            {prevIdx !== null && (
              <div
                className="absolute inset-0 z-0 h-full w-full rounded-full border-[3px] border-white/80 shadow-[0_24px_50px_-12px_rgba(61,35,20,0.35)] transition-all"
                style={{
                  animation: "slideBottomLeft 1100ms cubic-bezier(.7,0,.2,1) forwards",
                }}
              >
                <img
                  src={DISHES[prevIdx].image}
                  alt={DISHES[prevIdx].name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            )}

            {/* Current Active Dish entering from TOP-RIGHT */}
            <div
              key={currentIdx}
              onClick={() => scrollToMenuDish(currentDish.id)}
              className={cn(
                "absolute inset-0 z-10 h-full w-full cursor-pointer rounded-full border-[3px] border-white/90 shadow-[0_24px_50px_-12px_rgba(61,35,20,0.35)] transition-transform hover:scale-[1.02]",
                animating && "pointer-events-none"
              )}
              style={{
                animation: animating
                  ? "slideFromTopRight 1100ms cubic-bezier(.7,0,.2,1) forwards"
                  : "none",
              }}
            >
              <img
                src={currentDish.image}
                alt={currentDish.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            {/* Next Dish Preview Bubble on Top-Right */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next dish: ${nextDish.name}`}
              className={cn(
                "group absolute -right-3 top-2 z-20 flex items-center gap-2 rounded-full border-2 border-white bg-white/95 p-1 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-105 sm:-right-4 sm:top-4",
                nextPreviewPop
                  ? "scale-100 opacity-100"
                  : "scale-[0.2] opacity-0"
              )}
            >
              <div className="aspect-square h-12 w-12 overflow-hidden rounded-full border border-black/10 sm:h-16 sm:w-16">
                <img
                  src={nextDish.image}
                  alt={nextDish.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="rounded-full bg-[#3d2314] px-2.5 py-1 text-[10px] font-bold text-white transition-colors group-hover:bg-[#28150a]">
                Next
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Controls (Center) and Thumbnails (Right) */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 border-t border-[#dfd4c7] pt-5 sm:flex-row">
        {/* Left spacer for balance */}
        <div className="hidden sm:block sm:w-28" />

        {/* Center: 3 Round Outlined Controls (Prev, Pause/Play, Next) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous dish"
            disabled={animating}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#8c6b53] text-[#3d2314] transition-colors hover:bg-[#3d2314] hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Play slide show" : "Pause slide show"}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#8c6b53] text-[#3d2314] transition-colors hover:bg-[#3d2314] hover:text-white"
          >
            {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next dish"
            disabled={animating}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#8c6b53] text-[#3d2314] transition-colors hover:bg-[#3d2314] hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Right: 4 Small Round Thumbnails */}
        <div className="flex items-center gap-3">
          {DISHES.map((dish, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={dish.id}
                type="button"
                onClick={() => changeSlide(idx)}
                aria-label={`Select ${dish.name}`}
                className={cn(
                  "relative aspect-square h-11 w-11 overflow-hidden rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12",
                  isActive
                    ? "scale-[1.14] border-[#3d2314] shadow-md ring-2 ring-[#3d2314]/30"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={dish.thumb}
                  alt={dish.name}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Keyframe Animations */}
      <style>{`
        @keyframes slideBottomLeft {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            filter: blur(0px);
            opacity: 1;
          }
          100% {
            transform: translate(-62%, 58%) scale(0.45) rotate(-70deg);
            filter: blur(8px);
            opacity: 0;
          }
        }

        @keyframes slideFromTopRight {
          0% {
            transform: translate(58%, -62%) scale(0.32) rotate(70deg);
            filter: blur(8px);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            filter: blur(0px);
            opacity: 1;
          }
        }

        @keyframes floatGentle1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }

        @keyframes floatGentle2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-8deg); }
        }

        @keyframes floatGentle3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(5deg); }
        }

        .animate-float-1 { animation: floatGentle1 7s ease-in-out infinite; }
        .animate-float-2 { animation: floatGentle2 7s ease-in-out infinite; }
        .animate-float-3 { animation: floatGentle3 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

