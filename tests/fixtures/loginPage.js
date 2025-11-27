/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import testData from "../../test-data/users.json" assert { type: "json" };

const { validUser2, invalidUser1, invalidUser2, invalidUser3 } = testData;
export const validUser = validUser2;
export const invalidUser = invalidUser1;

export const test = base.extend({
  // Provides a ready-to-use LoginPage page object

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },

  validUser: async ({}, use) => {
    await use(validUser2);
  },

  invalidUser: async ({}, use) => {
    await use(invalidUser1);
  },
});

export { expect } from "@playwright/test";
