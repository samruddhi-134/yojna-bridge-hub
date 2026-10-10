const KEY = "yojnasetu:recently-viewed";

export function getRecentlyViewed(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function trackRecentlyViewed(slug: string) {
  try {
    const next = [slug, ...getRecentlyViewed().filter((s) => s !== slug)].slice(0, 6);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}
