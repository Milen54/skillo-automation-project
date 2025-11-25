/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

// Expose a plain object for tests/fixtures that need direct access
export const validUser = {
  username: "milen0922",
  password: "User123456",
};

export const test = base.extend({
  // Provides a ready-to-use LoginPage page object

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  validUser: async ({}, use) => {
    const testUser = {
      username: "testuser21",
      password: "Test123456",
    };
    await use(testUser);
  },

  invalidUser: async ({}, use) => {
    const invalidUser = {
      username: "wronguser",
      password: "wrongpass",
    };
    await use(invalidUser);
  },
});

export { expect } from "@playwright/test";
