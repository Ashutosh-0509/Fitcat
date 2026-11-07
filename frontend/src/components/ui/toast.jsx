import * as React from "react";
import { cn } from "@/lib/utils";

// Toast types
const ToastProvider = ({ children }) => <>{children}</>;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)} {...props} />
));
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => (
  <li ref={ref} className={cn("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all bg-background text-foreground border-border", className)} {...props} />
));
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm font-semibold [&+div]:text-xs", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100", className)} toast-close="" {...props}>
    <span className="sr-only">Close</span>×
  </button>
));
ToastClose.displayName = "ToastClose";

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props} />
));
ToastAction.displayName = "ToastAction";

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
