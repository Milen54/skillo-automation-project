// Root Playwright configuration for the course repo (ESM)
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [["html"]],
  // Enable additional browsers later if desired
  // projects: [
  //   { name: "chromium", use: { browserName: "chromium" } },
  //   { name: "firefox", use: { browserName: "firefox" } },
  //   { name: "webkit", use: { browserName: "webkit" } },
  // ],
});