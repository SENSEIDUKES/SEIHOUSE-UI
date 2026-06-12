import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for SEIHOUSE-UI accessibility + keyboard tests.
 *
 * Tests boot the Next dev server on port 3100 (reused locally if already
 * running). Run `npx playwright install` once to download browser binaries.
 */
const PORT = Number(process.env.PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Use a production build so routes are pre-compiled (no lazy dev-compile
    // flakiness on the first request). Reused locally if a server is already up.
    command: `pnpm --dir apps/workbench build && pnpm --dir apps/workbench start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
