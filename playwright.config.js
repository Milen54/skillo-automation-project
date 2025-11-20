// Root Playwright configuration for the course repo (ESM)
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  workers: 1,
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    baseURL: "http://training.skillo-bg.com:4300",
  },
  reporter: [["html"]],
  // Enable additional browsers later if desired
  // projects: [
  //   { name: "chromium", use: { browserName: "chromium" } },
  //   { name: "firefox", use: { browserName: "firefox" } },
  //   { name: "webkit", use: { browserName: "webkit" } },
  // ],
});
