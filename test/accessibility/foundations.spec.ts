import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility + keyboard smoke tests for the Phase 6 Foundation Diagnostics
 * area (`/foundations`). Mirrors the lab a11y suite: fail only on critical axe
 * violations, log serious ones. Also exercises the new form + scroll primitives
 * through the keyboard so the foundation layer stays accessible.
 */
function axe(page: Page) {
  return new AxeBuilder({ page }).disableRules(["scrollable-region-focusable"]);
}

test.describe("foundation diagnostics", () => {
  test("/foundations loads with its tablist", async ({ page }) => {
    await page.goto("/foundations");
    await expect(page.getByRole("heading", { name: "Foundation Diagnostics" })).toBeVisible();
    await expect(page.getByRole("tablist", { name: "Foundation systems" })).toBeVisible();
  });

  test("tabs switch the visible system", async ({ page }) => {
    await page.goto("/foundations");
    await page.getByRole("tab", { name: "Forms" }).click();
    // The Forms section renders labelled fields.
    await expect(page.getByText("Release type", { exact: false })).toBeVisible();
  });

  test("no critical axe violations across the default (Tokens) view", async ({ page }) => {
    await page.goto("/foundations");
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    const serious = results.violations.filter((v) => v.impact === "serious");
    if (serious.length) {
      console.warn("axe serious (non-blocking):", serious.map((v) => v.id).join(", "));
    }
    expect(
      critical,
      JSON.stringify(
        critical.map((v) => v.id),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("no critical axe violations in the Forms view", async ({ page }) => {
    await page.goto("/foundations");
    await page.getByRole("tab", { name: "Forms" }).click();
    const results = await axe(page).analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(
      critical,
      JSON.stringify(
        critical.map((v) => v.id),
        null,
        2,
      ),
    ).toEqual([]);
  });

  test("form primitives are keyboard operable", async ({ page }) => {
    await page.goto("/foundations");
    await page.getByRole("tab", { name: "Forms" }).click();

    const firstSwitch = page.getByRole("switch").first();
    await firstSwitch.focus();
    const before = await firstSwitch.getAttribute("aria-checked");
    await page.keyboard.press("Space");
    await expect(firstSwitch).not.toHaveAttribute("aria-checked", before ?? "false");

    const checkbox = page.getByRole("checkbox", { name: "Explicit" });
    await checkbox.focus();
    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();
  });

  test("scroll area is keyboard-focusable", async ({ page }) => {
    await page.goto("/foundations");
    await page.getByRole("tab", { name: "Scroll" }).click();
    const region = page.getByRole("region", { name: "Fragment list" });
    await expect(region).toBeVisible();
    await region.focus();
    await expect(region).toBeFocused();
  });
});
