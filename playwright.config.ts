import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (astro preview), on a phone and a desktop viewport.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:4173" },
  projects: [
    { name: "mobile", use: { ...devices["iPhone 13"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // --ignore-lock keeps astro preview in the foreground (Astro backgrounds it when it detects an agent).
    command: "npm run build && npm run preview -- --ignore-lock",
    url: "http://localhost:4173",
    // Enquiries are printed instead of mailed; the time trap is off so tests can submit immediately.
    env: { MAIL_TRANSPORT: "log", FORM_SECRET: "e2e-secret", FORM_MIN_SECONDS: "0" },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
