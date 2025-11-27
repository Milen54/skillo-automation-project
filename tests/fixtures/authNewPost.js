import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import testData from "../../test-data/users.json" assert { type: "json" };

const { validUser1 } = testData;

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page and perform a login using validUser1 (dedicated for newPost tests)
    await loginPage.navigate();
    await loginPage.login(validUser1.username, validUser1.password);

    await page.waitForURL("**/posts/all");

    await use(page);
  },
});

export { expect } from "@playwright/test";
