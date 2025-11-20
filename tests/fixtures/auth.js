import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { validUser } from "./loginPage.js";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page and perform a login using known demo credentials
    await loginPage.navigate();
    await loginPage.login(validUser.username, validUser.password);

    await page.waitForURL("**/posts/all");

    await use(page);
  },
});

export { expect } from "@playwright/test";
