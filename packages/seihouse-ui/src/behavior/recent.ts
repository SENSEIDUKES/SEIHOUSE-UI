/**
 * Pure helpers for "recent items" lists (e.g. the command palette's recent
 * commands). Kept dependency-free and side-effect-free so the behavior is easy
 * to unit test; persistence (localStorage) stays in the component layer.
 */

/**
 * Returns a new list with `id` moved to the front, de-duplicated, and capped to
 * `cap` entries. The most recently used id is always first.
 */
export function pushRecent(ids: readonly string[], id: string, cap = 6): string[] {
  const next = [id, ...ids.filter((existing) => existing !== id)];
  return cap > 0 ? next.slice(0, cap) : next;
}
