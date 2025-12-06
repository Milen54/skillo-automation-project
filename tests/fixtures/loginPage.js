import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import testData from "../../test-data/users.json" assert { type: "json" };

// Destructure specific users from test data for easier access
const { validUser2, invalidUser1, invalidUser2, invalidUser3 } = testData;

// Export constants for use in other test files (e.g., auth.js, logout.spec.js)
// These provide a single source of truth for which users are used in non-data-driven tests
export const validUser = validUser2; // Used for logout tests and TC1
export const invalidUser = invalidUser1; // Reserved for future invalid login tests

export const test = base.extend({
  // Provides a ready-to-use LoginPage page object

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
