import { useMemo } from "react";
import ScrollSequence from "./ScrollSequence";
import { assets } from "@/config/fitcat";

const CHAPTERS = [
  {
    kind: "label",
    text: "01 / FRESHNESS",
  },
  {
    kind: "title",
    text: "GOOD FOOD. FRESH START.",
  },
  {
    kind: "body",
    text: "Freshly cut seasonal fruits, wholesome ingredients, made fresh daily in Mumbai.",
  },
  {
    kind: "label",
    text: "02 / WHOLE FOODS",
  },
  {
    kind: "title",
    text: "PREPARED CLEAN & DELICIOUS.",
  },
  {
    kind: "body",
    text: "Nutrient-packed chia puddings, toasted snacks, and pure antioxidant fruit blends.",
  },
  {
    kind: "label",
    text: "03 / READY FOR YOU",
  },
  {
    kind: "title",
    text: "EXPLORE WHAT'S ON OUR MENU.",
  },
  {
    kind: "body",
    text: "Scroll down to choose your favorite healthy cravings and order in seconds.",
  },
];

export default function FreshnessSection() {
  const frames = useMemo(() => {
    const { basePath, count, fileName } = assets.frames || {};
    if (!count || !basePath || !fileName) return [];
    return Array.from({ length: count }, (_, i) => `${basePath}${fileName(i)}`);
  }, []);

  return (
    <section id="top" aria-label="Freshness" className="relative bg-[#0a1f18]">
      <ScrollSequence
        videoSrc={assets.sequenceVideo}
        poster={assets.sequencePoster}
        frames={frames}
        chapters={CHAPTERS}
      />
    </section>
  );
}
