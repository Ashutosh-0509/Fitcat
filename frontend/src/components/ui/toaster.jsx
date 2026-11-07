import * as React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description, action, ...props }) => (
        <div key={id} className={cn("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all bg-background text-foreground border-border")}>
          <div className="grid gap-1">
            {title && <p className="text-sm font-semibold">{title}</p>}
            {description && <p className="text-sm opacity-90">{description}</p>}
          </div>
          {action}
        </div>
      ))}
    </div>
  );
}
