import { Smartphone, Bike, Heart, ExternalLink, ArrowRight } from "lucide-react";
import { business } from "@/config/fitcat";

const STEPS = [
  {
    num: "01",
    title: "PICK YOUR ORDER",
    desc: "Choose from our healthy menu and place your order easily.",
    image: "/images/steps/step1.jpg",
    icon: Smartphone,
  },
  {
    num: "02",
    title: "WE PREPARE & DELIVER",
    desc: "Our team prepares your meal fresh and delivers it hot at your doorstep.",
    image: "/images/steps/step2.jpg",
    icon: Bike,
  },
  {
    num: "03",
    title: "PICK, EAT & ENJOY",
    desc: "Open, dig in and enjoy your fresh, wholesome meal!",
    image: "/images/steps/step3.jpg",
    icon: Heart,
  },
];

export default function HowItWorksSection() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappGreeting || "Hi FitCat! I'd like to place an order:"
  )}`;

  return (
    <section id="how-it-works" className="relative bg-[#f8f5ef] py-20 px-5 sm:px-8 lg:px-14 text-[#142820]">
      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff632b]">
            // HOW IT WORKS
          </p>
          <h2 className="mt-2 font-display text-[32px] sm:text-[44px] lg:text-[48px] font-extrabold uppercase tracking-tight text-[#142820] leading-none">
            Simple Steps, Fast Delivery.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[#2c5240]/80 max-w-xl mx-auto">
            From farm-fresh kitchen prep straight to your table in Mumbai.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-[#e5ded0] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Step Image with Number Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-black/5">
                  <span className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff632b] font-mono text-[11px] font-bold text-white shadow-md">
                    {step.num}
                  </span>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Step Info */}
                <div className="pt-5 pb-2 px-1">
                  <div className="flex items-center gap-2.5 text-[#ff632b]">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-display text-[16px] sm:text-[17px] font-bold tracking-wide uppercase text-[#142820]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#2c5240]/75">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Banner: Healthy Meals, Delivered To You */}
        <div className="mt-14 overflow-hidden rounded-[28px] border border-[#e5ded0] bg-gradient-to-br from-[#12382c] via-[#0d2a21] to-[#091e17] p-6 sm:p-10 shadow-xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Bag & Bowl image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-lg max-w-[340px] w-full">
                <img
                  src="/images/steps/delivery_food.jpg"
                  alt="FitCat fresh food packaging"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Banner Call-to-Action with Swiggy, Toing/Zomato, WhatsApp */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-[#ff632b]">
                <Bike className="h-4 w-4" />
                <span>Healthy Meals, Delivered To You</span>
              </div>

              <h3 className="mt-3 font-display text-[28px] sm:text-[38px] font-bold leading-tight text-white">
                Good Food. Delivered Fast.
              </h3>

              <p className="mt-3 max-w-lg text-[15px] sm:text-[17px] leading-relaxed text-white/80">
                Order now and enjoy fresh, healthy meals delivered right to your door across Vikhroli and surrounding Mumbai neighborhoods.
              </p>

              {/* Order Buttons: WhatsApp, Swiggy, Toing/Zomato */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 active:scale-95"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {/* Swiggy */}
                <a
                  href={business.swiggyUrl || "https://www.swiggy.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#FC8019] px-5 text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:bg-[#e06f12] hover:scale-105 active:scale-95"
                >
                  <span>Swiggy</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {/* Toing / Zomato */}
                <a
                  href={business.toingUrl || "https://www.zomato.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#E23744] px-5 text-[14px] font-bold text-white shadow-md transition-all duration-300 hover:bg-[#c92f3b] hover:scale-105 active:scale-95"
                >
                  <span>Toing / Zomato</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {/* Browse Menu */}
                <a
                  href="#menu"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 text-[14px] font-semibold text-white transition-all hover:bg-white/20"
                >
                  <span>Menu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
