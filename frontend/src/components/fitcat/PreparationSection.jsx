import { assets } from "@/config/fitcat";

export default function PreparationSection() {
  return (
    <section
      id="about"
      className="bg-forest-soft px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <p className="fc-label text-[10px] text-primary">03 / PREPARATION</p>
          <h2 className="fc-display mt-4 text-[13vw] text-linen sm:text-[56px] lg:text-[72px]">
            MADE FRESH. EVERY DAY.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-linen/70">
            Every item is prepared by hand on the day you order it — no pre-made
            batches, no shortcuts. Fresh ingredients sourced locally in Mumbai.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Prepared on the same day",
              "Real fruit, real ingredients",
              "No preservatives added",
            ].map((point) => (
              <li key={point} className="flex items-center gap-3 text-[14px] text-linen/70">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Video still */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-linen/10 bg-forest-deep lg:aspect-[5/4]">
          <video
            src={assets.preparationVideo}
            poster={assets.preparationPoster || undefined}
            muted
            playsInline
            loop
            autoPlay
            className="h-full w-full object-cover scale-[1.08] origin-center"
            aria-label="FitCat kitchen preparation footage"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/40 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
