import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./cart-context";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#mood-hero", label: "Specials" },
  { href: "#menu", label: "Menu" },
  { href: "#gathering", label: "Gathering" },
  { href: "#how-it-works", label: "Delivery" },
];

export default function Header({ onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-16 sm:h-20 items-center justify-between px-5 sm:px-8 lg:px-14 transition-all duration-300 ${
        scrolled
          ? "bg-[#f8f5ef]/95 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      }`}
    >
      {/* Updated Brand Logo */}
      <a href="#top" className="flex items-center gap-2 group">
        <Logo dark={scrolled} className="h-9 sm:h-10" />
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-[14px] font-semibold transition-colors ${
              scrolled
                ? "text-[#3d2314] hover:text-[#ff632b]"
                : "text-white/85 hover:text-[#ff632b]"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Cart Button */}
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Open cart, ${count} items`}
          className={`relative grid h-10 w-10 place-items-center rounded-full transition-all hover:scale-105 active:scale-95 ${
            scrolled
              ? "border border-[#dfd4c7] bg-white text-[#3d2314] shadow-sm hover:bg-[#ede5dc]"
              : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff632b] font-mono text-[10px] font-bold text-white shadow-md">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>

        {/* Order Now Pill Button */}
        <a
          href="#menu"
          className={`hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-bold shadow-md transition-all active:scale-95 ${
            scrolled
              ? "bg-[#3d2314] text-white hover:bg-[#ff632b]"
              : "bg-white text-[#091d17] hover:bg-[#ff632b] hover:text-white"
          }`}
        >
          Order Now
        </a>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
            scrolled
              ? "border border-[#dfd4c7] bg-white text-[#3d2314]"
              : "border border-white/20 bg-white/10 text-white"
          }`}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav
          className="absolute inset-x-0 top-16 sm:top-20 bg-[#f8f5ef] px-6 py-6 shadow-xl backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-[17px] font-semibold text-[#3d2314] hover:text-[#ff632b]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#menu"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-full bg-[#ff632b] px-6 py-3 text-center text-[15px] font-bold text-white shadow-lg"
              >
                Order Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
