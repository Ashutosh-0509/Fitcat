import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { business } from "@/config/fitcat";

export default function GatheringSection() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber || "919876543210"}?text=${encodeURIComponent(
    "Hi FitCat! I would like to inquire about fresh fruit boxes and event catering."
  )}`;

  return (
    <section id="gathering" className="scroll-mt-14 bg-[#f8f5ef] px-5 py-20 text-[#1a3328] sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#2c5240]/80">
            Fresh Food, Made For You
          </p>
          <h2 className="mt-3 font-serif text-[8vw] font-bold tracking-tight text-[#142820] sm:text-[44px] lg:text-[54px]">
            Make Every Gathering a Little Fresher
          </h2>
          <p className="mt-3 text-[15px] text-[#2c5240]/80 sm:text-[17px]">
            Fresh fruit boxes and feel-good bites for everyday moments and special plans.
          </p>
        </div>

        {/* Top 2 Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Card 1 */}
          <div className="overflow-hidden rounded-[24px] border border-[#e5ded0] bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px]">
              <img
                src="/images/gathering/fruit_boxes.jpg"
                alt="Fresh Fruit Boxes"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-[20px] font-bold text-[#142820]">Fresh Fruit Boxes</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#2c5240]/75">
                Seasonal fruits, freshly cut and perfectly portioned for a naturally sweet and nourishing experience.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden rounded-[24px] border border-[#e5ded0] bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px]">
              <img
                src="/images/gathering/snack_spreads.jpg"
                alt="Healthy Snack Spreads"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-[20px] font-bold text-[#142820]">Healthy Snack Spreads</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#2c5240]/75">
                Wholesome sandwiches, fruit cups, chia puddings and more to keep your guests happy and energised.
              </p>
            </div>
          </div>
        </div>

        {/* Wide Banner Card: Made for Your Plans */}
        <div className="mt-6 grid items-center overflow-hidden rounded-[28px] border border-[#e5ded0] bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h3 className="text-[24px] font-bold text-[#142820] sm:text-[30px]">Made for Your Plans</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#2c5240]/80">
              Custom menus and curated boxes for birthdays, office meets, celebrations and everything in between.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b3d2f] px-7 py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#142e23] hover:shadow"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 aspect-[16/10] overflow-hidden rounded-[20px] lg:col-span-7 lg:mt-0">
            <img
              src="/images/gathering/custom_box.jpg"
              alt="Curated FitCat fruit box"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-6 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-[#e5ded0] bg-white p-6 shadow-sm sm:flex-row sm:px-10 sm:py-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#2c5240]/70">Let's Talk</p>
            <h4 className="mt-1 text-[20px] font-bold text-[#142820] sm:text-[24px]">
              Let's make something fresh happen.
            </h4>
          </div>

          <div className="flex items-center gap-6 sm:gap-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1b3d2f] text-white shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-[#142820]">WhatsApp</span>
            </a>

            <a
              href="mailto:hello@fitcatkitchen.com"
              className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
              aria-label="Email"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1b3d2f] text-white shadow-sm">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-[#142820]">Email</span>
            </a>

            <a
              href="tel:+919876543210"
              className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
              aria-label="Call"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1b3d2f] text-white shadow-sm">
                <Phone className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-[#142820]">Call</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

