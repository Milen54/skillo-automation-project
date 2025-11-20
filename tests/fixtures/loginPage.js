/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

export const test = base.extend({
  // Provides a ready-to-use LoginPage page object
  //eslint-disable-next-line no-empty-pattern

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  validUser: async ({}, use) => {
    const testUser = {
      username: "milen0922",
      password: "User123456",
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
