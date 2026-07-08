type AnalyticsEvent =
  | "cta_hero_click"
  | "cta_final_click"
  | "cta_nav_click"
  | "demo_play"
  | "waitlist_open"
  | "scroll_depth_50";

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("accura_analytics", { detail: event }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[Analytics]", event);
  }
}
