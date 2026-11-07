// Auth return-to stub
export function currentUrl() {
  if (typeof window !== "undefined") return window.location.href;
  return "/";
}
export function setReturnTo(url) {}
export function getReturnTo() { return "/"; }
