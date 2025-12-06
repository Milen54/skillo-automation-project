import { HomePage } from "../pages/HomePage.js";
import { test, expect, validUser } from "./fixtures/loginPage.js";
import testData from "../test-data/users.json" assert { type: "json" };

test.describe("Login page", () => {
  // Convert users.json object to array of [key, value] pairs for iteration
  const entries = Object.entries(testData);

  // Filter to get only valid users (validUser1, validUser2, validUser3, etc.)
  const validUserArray = entries.filter(([key]) => key.startsWith("validUser"));

  // Filter to get only invalid users (invalidUser1, invalidUser2, invalidUser3, etc.)
  const invalidUserArray = entries.filter(([key]) =>
    key.startsWith("invalidUser")
  );

  // Data-driven test: Iterates through ALL valid users from users.json
  validUserArray.forEach(([userKey, userData]) => {
    test(`DD-TC: Login with valid user: ${userKey}`, async ({
      loginPage,
      page,
    }) => {
      await expect(loginPage.headerSignIn).toHaveText("Sign in");

      await loginPage.login(userData.username, userData.password);

      await loginPage.waitForToast();
      await expect(loginPage.toastMessage).toBeVisible();

      const homePage = new HomePage(page);
      await expect(page).toHaveURL("/posts/all");
      await expect(homePage.homeButton).toBeVisible();
    });
  });

  // Data-driven test: Iterates through ALL invalid users from users.json
  invalidUserArray.forEach(([userKey, userData]) => {
    test(`DD-TC1: Login with invalid user: ${userKey}`, async ({
      loginPage,
      page,
    }) => {
      await expect(loginPage.headerSignIn).toHaveText("Sign in");

      await loginPage.login(userData.username, userData.password);

      await expect(page).toHaveURL("/users/login");
    });
  });

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting Login Test Suite ===");
  });

  test.beforeEach(async ({ loginPage }) => {
    await expect(loginPage.headerSignIn).toHaveText("Sign in");
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished Login Test Suite ===");
  });

  // TC1: Non-data-driven test that uses the imported validUser constant (validUser2)
  test("TC1: Login button is disabled when any field is empty", async ({
    loginPage,
  }) => {
    // Case 1: username empty, password filled
    await loginPage.username.fill("");
    await loginPage.password.fill(validUser.password);
    await expect(loginPage.loginButton).toBeDisabled();

    // Case 2: username filled, password empty
    await loginPage.username.fill(validUser.username);
    await loginPage.password.fill("");
    await expect(loginPage.loginButton).toBeDisabled();
  });
});
