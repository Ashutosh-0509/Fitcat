import { Instagram, Phone, ShieldCheck, MapPin, Clock } from "lucide-react";
import { business } from "@/config/fitcat";
import Logo from "./Logo";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    "Hi FitCat! I would like to inquire about healthy meal delivery."
  )}`;

  return (
    <footer className="bg-[#091e17] text-white/80 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-white/10">
          {/* Brand & Slogan Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <Logo className="h-10 sm:h-11" />
            </div>
            
            <p className="mt-4 text-[16px] font-semibold text-white">
              Eat clean, feel great.
            </p>
            <p className="mt-1 text-[13px] text-white/60 max-w-xs leading-relaxed">
              Every meal prepared fresh daily using whole ingredients in Vikhroli East, Mumbai.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitCat Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-all hover:border-[#ff632b] hover:text-[#ff632b] hover:scale-105"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitCat WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-all hover:border-[#25D366] hover:text-[#25D366] hover:scale-105"
              >
                <Phone className="h-4 w-4" />
              </a>

              <span
                title="100% Food Grade Certified"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/80"
              >
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff632b]">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <a href="#top" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#mood-hero" className="transition-colors hover:text-white">
                  Specials
                </a>
              </li>
              <li>
                <a href="#menu" className="transition-colors hover:text-white">
                  Menu
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-white">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#gathering" className="transition-colors hover:text-white">
                  Gathering
                </a>
              </li>
            </ul>
          </div>

          {/* Order Online Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff632b]">
              Order Online
            </h4>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                <a
                  href={business.swiggyUrl || "https://swiggy.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white flex items-center gap-1.5"
                >
                  <span>Order on Swiggy</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={business.toingUrl || "https://zomato.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white flex items-center gap-1.5"
                >
                  <span>Order on Toing / Zomato</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.zeptonow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white flex items-center gap-1.5"
                >
                  <span>Order on Zepto</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff632b]">
              Contact
            </h4>
            <div className="mt-4 space-y-3.5 text-[13px] text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#ff632b] mt-0.5" />
                <span className="leading-snug">
                  Shop No. 9, Ground floor, Amrapali CHSL, Pragathi Nagar, near railway station, Vikhroli East, Mumbai - 83
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#ff632b]" />
                <span>7:00 AM – 11:00 PM Everyday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/40">
          <p>© {new Date().getFullYear()} FitCat Healthy Kitchen. All rights reserved.</p>
          <p>Handcrafted fresh for healthy living in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}
