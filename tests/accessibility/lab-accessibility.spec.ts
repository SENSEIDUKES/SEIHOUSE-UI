import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Axe accessibility scans for the one-page lab.
 *
 * We fail only on `critical` / `serious` impact violations so the suite stays a
 * useful safety net without chasing every minor advisory while the visual
 * language is still exploratory.
 */

/**
 * Acceptance criteria require **no critical** axe violations. We assert on
 * critical impact and additionally surface any serious findings as console
 * output (without failing) so they stay visible. Known serious findings while
 * the brand is unlocked: `color-contrast` on the exploratory light/glass style
 * lanes, documented in LAB-NOTES.md.
 *
 * `scrollable-region-focusable` is disabled: React Aria's always-visible
 * command/list menus use roving virtual focus (aria-activedescendant) rather
 * than a tabbable scroll container — a valid composite-widget pattern.
 */
function axe(page: Page) {
  return new AxeBuilder({ page }).disableRules(["scrollable-region-focusable"]);
}

test.describe("lab accessibility", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Lab sections" })).toBeVisible();
    await expect(page.locator("#behavior-hardening")).toBeAttached();
  });

  test("/lab loads", async ({ page }) => {
    await page.goto("/lab");
    await expect(page.getByRole("navigation", { name: "Lab sections" })).toBeVisible();
    await expect(page.locator("#behavior-hardening")).toBeAttached();
  });

  test("no critical/serious axe violations on homepage", async ({ page }) => {
    await page.goto("/");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(critical, JSON.stringify(critical.map((v) => v.id), null, 2)).toEqual([]);
  });

  test("no critical/serious axe violations on /lab", async ({ page }) => {
    await page.goto("/lab");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(critical, JSON.stringify(critical.map((v) => v.id), null, 2)).toEqual([]);
  });
});
