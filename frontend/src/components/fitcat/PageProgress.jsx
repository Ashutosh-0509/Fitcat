import * as React from "react";
import { cn } from "@/lib/utils";

export default function PageProgress({ sections = [], active = 0 }) {
  return (
    <nav
      aria-label="Page progress"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
    >
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-300",
            i === active ? "bg-primary scale-150" : "bg-linen/30 hover:bg-linen/60"
          )}
        />
      ))}
    </nav>
  );
}
