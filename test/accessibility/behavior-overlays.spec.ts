import { test, expect } from "@playwright/test";

/**
 * Opened-overlay behavior tests for the Phase 2 hardened behavior layer.
 * Covers popover positioning + dismissal, tooltip trigger accessibility,
 * single-select combobox selection, dialog outside-click + focus return, and
 * command-palette keyboard selection. All run against `/lab/raw`.
 */

test.beforeEach(async ({ page }) => {
  await page.goto("/lab/raw");
});

test("popover opens, stays on-screen, and dismisses via Escape and outside click", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Metadata info" });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const title = page.getByText("Quick actions", { exact: true });
  await expect(title).toBeVisible();

  // Positioning: the anchored panel must stay within the viewport (collision
  // avoidance) and sit below its bottom-aligned trigger.
  const viewport = page.viewportSize();
  const triggerBox = await trigger.boundingBox();
  const panelBox = await title.boundingBox();
  expect(viewport && triggerBox && panelBox).toBeTruthy();
  if (viewport && triggerBox && panelBox) {
    expect(panelBox.x).toBeGreaterThanOrEqual(0);
    expect(panelBox.y).toBeGreaterThanOrEqual(0);
    expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(panelBox.y).toBeGreaterThanOrEqual(triggerBox.y);
  }

  // Escape closes and returns focus to the trigger.
  await page.keyboard.press("Escape");
  await expect(title).toBeHidden();
  await expect(trigger).toBeFocused();

  // Reopen, then dismiss by clicking outside.
  await trigger.click();
  await expect(page.getByText("Quick actions", { exact: true })).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(page.getByText("Quick actions", { exact: true })).toBeHidden();
});

test("tooltip is read-only, linked to its trigger, and not focusable", async ({ page }) => {
  // The trigger is a real <button>, not a custom focusable element.
  const trigger = page.getByRole("button", { name: "About this metric" });
  await trigger.scrollIntoViewIfNeeded();

  // Tooltip is closed (not rendered) until the trigger is hovered.
  const tooltip = page.getByTestId("metric-tooltip");
  await expect(tooltip).toBeHidden();

  // Hover reveals the tooltip after the shared open delay, and the trigger
  // reflects the linked open state.
  await trigger.hover();
  await expect(tooltip).toBeVisible();
  await expect(trigger).toHaveAttribute("data-popup-open", "");

  // Tooltip content is read-only: never a positive/zero tab stop.
  const tabIndex = await tooltip.getAttribute("tabindex");
  expect(tabIndex === null || tabIndex === "-1").toBeTruthy();

  // Moving away hides it.
  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();
});

test("single-select combobox highlights options and selects with the keyboard", async ({
  page,
}) => {
  const combo = page.getByRole("combobox", { name: "Search artists" });
  await combo.scrollIntoViewIfNeeded();
  await combo.click();

  // Listbox opens on focus; arrowing sets a virtual-focus active descendant.
  await page.keyboard.press("ArrowDown");
  await expect(combo).toHaveAttribute("aria-activedescendant", /.+/);

  const firstOption = page.getByRole("option").first();
  const optionLabel = (await firstOption.textContent())?.trim() ?? "";
  expect(optionLabel.length).toBeGreaterThan(0);

  // Enter selects the highlighted option and fills the input.
  await page.keyboard.press("Enter");
  await expect(combo).toHaveValue(new RegExp(optionLabel.slice(0, 4), "i"));

  // Escape collapses the listbox.
  await page.keyboard.press("Escape");
  await expect(page.getByRole("option")).toHaveCount(0);
});

test("dialog closes on outside click and returns focus to the trigger", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Confirm action" });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: /Register this work/i });
  await expect(dialog).toBeVisible();

  // Click the backdrop (top-left corner is outside the centered popup).
  await page.mouse.click(5, 5);
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("command palette selects a command with the keyboard and closes", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await expect(palette).toBeVisible();

  const search = page.getByRole("searchbox", { name: "Command search" });
  await search.fill("ovf");
  await expect(page.getByRole("menuitem", { name: /Open Vault Fragments/i })).toBeVisible();

  await page.keyboard.press("ArrowDown");
  await expect(search).toHaveAttribute("aria-activedescendant", /.+/);

  // Enter runs the highlighted command and closes the modal.
  await page.keyboard.press("Enter");
  await expect(palette).toBeHidden();
});
