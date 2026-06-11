/**
 * Tiny dependency-free fuzzy matcher for the command palette.
 *
 * Performs a case-insensitive subsequence match: every character of `query`
 * must appear in `text` in order (not necessarily contiguously). This lets
 * "ovf" match "Open Vault Fragments". Returns the matched character indices so
 * the UI can highlight them, plus a small score for ranking.
 */

export interface FuzzyResult {
  matched: boolean;
  indices: number[];
  score: number;
}

export function fuzzyMatch(text: string, query: string): FuzzyResult {
  const trimmed = query.trim();
  if (trimmed === "") {
    return { matched: true, indices: [], score: 0 };
  }

  const haystack = text.toLowerCase();
  const needle = trimmed.toLowerCase();
  const indices: number[] = [];

  let h = 0;
  let n = 0;
  let score = 0;
  let lastMatch = -2;

  while (h < haystack.length && n < needle.length) {
    if (haystack[h] === needle[n]) {
      indices.push(h);
      // Reward consecutive matches and matches at word boundaries.
      if (h === lastMatch + 1) score += 3;
      else score += 1;
      if (h === 0 || /[\s\-_/]/.test(haystack[h - 1])) score += 2;
      lastMatch = h;
      n += 1;
    }
    h += 1;
  }

  const matched = n === needle.length;
  return { matched, indices: matched ? indices : [], score: matched ? score : 0 };
}

/**
 * Splits `text` into highlighted / plain segments based on matched indices.
 * Consumers can render highlighted segments with emphasis.
 */
export function highlightSegments(
  text: string,
  indices: number[],
): { value: string; highlight: boolean }[] {
  if (indices.length === 0) return [{ value: text, highlight: false }];

  const set = new Set(indices);
  const segments: { value: string; highlight: boolean }[] = [];
  let current = "";
  let currentHighlight = set.has(0);

  for (let i = 0; i < text.length; i += 1) {
    const isHit = set.has(i);
    if (isHit === currentHighlight) {
      current += text[i];
    } else {
      if (current) segments.push({ value: current, highlight: currentHighlight });
      current = text[i];
      currentHighlight = isHit;
    }
  }
  if (current) segments.push({ value: current, highlight: currentHighlight });
  return segments;
}
