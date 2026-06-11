import { test, expect } from "@playwright/test";

/**
 * Keyboard + ARIA behavior smoke tests for the Phase 3 / Phase 4 behavior layer.
 * These are a safety net, not exhaustive coverage. All run against `/lab`.
 */

test.beforeEach(async ({ page }) => {
  await page.goto("/lab");
});

test("dialog opens by keyboard and closes with Escape, returning focus", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Confirm action" });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: /Register this work/i });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("native drawer opens and closes", async ({ page }) => {
  await page.getByRole("button", { name: "Player queue", exact: true }).click();
  const drawer = page.getByRole("dialog");
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText("Up next", { exact: false })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("tabs can be navigated with the keyboard", async ({ page }) => {
  const overview = page.getByRole("tab", { name: "Overview" }).first();
  await overview.focus();
  await expect(overview).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("ArrowRight");
  const metadata = page.getByRole("tab", { name: "Metadata" }).first();
  await expect(metadata).toBeFocused();
});

test("command palette opens with Ctrl+K and Meta+K", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await expect(palette).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(palette).toBeHidden();

  await page.keyboard.press("Meta+k");
  await expect(palette).toBeVisible();
  await page.keyboard.press("Escape");
});

test("command palette fuzzy search returns expected matches", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const search = page.getByRole("searchbox", { name: "Command search" });
  await search.fill("ovf");
  await expect(page.getByRole("menuitem", { name: /Open Vault Fragments/i })).toBeVisible();
  // A clearly non-matching command should be filtered out.
  await expect(page.getByRole("menuitem", { name: /Creator campaign template/i })).toHaveCount(0);
});

test("command palette shows a keyboard-accessible recent commands section", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await expect(palette.getByText("Recent Commands", { exact: true })).toBeVisible();
  // The recent items render as keyboard-reachable menu items, and arrowing from
  // the search field sets an active descendant (React Aria virtual focus).
  const search = page.getByRole("searchbox", { name: "Command search" });
  await expect(search).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(search).toHaveAttribute("aria-activedescendant", /.+/);
});

test("multi-select combobox receives focus and selects an option", async ({ page }) => {
  // Registry label picker starts with no selection, so any chip that appears is
  // newly added by this interaction.
  const combo = page.getByRole("combobox", { name: "Registry label picker" });
  await combo.scrollIntoViewIfNeeded();
  await combo.click();
  await expect(combo).toBeFocused();

  // No "Registered" chip exists until we add one.
  const registeredChip = page.locator('button[aria-label="Remove Registered"]');
  await expect(registeredChip).toHaveCount(0);

  const option = page.getByRole("option", { name: /Registered/ }).first();
  await expect(option).toBeVisible();
  await option.click();

  await expect(registeredChip).toBeVisible();
});

test("focus-visible styles are wired on interactive controls", async ({ page }) => {
  // The shared focusRing utility adds a focus-visible ring; assert a focused
  // trigger exposes the class so the visual focus state is testable.
  const trigger = page.getByRole("button", { name: "Open command palette" });
  await trigger.focus();
  await expect(trigger).toBeFocused();
  const cls = await trigger.getAttribute("class");
  expect(cls).toContain("focus-visible:ring-2");
});
