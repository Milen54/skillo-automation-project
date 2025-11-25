import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { test, expect } from "./fixtures/loginPage.js";
import testData from "../test-data/users.json" assert { type: "json" };


test.describe("Login page", () => {
  let loginPage;
  const entries = Object.entries(testData);

  const validUserArray = entries.filter(([key]) => key.startsWith("validUser"));

  const invalidUserArray = entries.filter(([key]) =>
    key.startsWith("invalidUser")
  );

  validUserArray.forEach(([userKey, userData]) => {
    test(`DD-TC: Login with valid user: ${userKey}`, async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.navigate();
      await expect(loginPage.headerSignIn).toHaveText("Sign in");

      await loginPage.login(userData.username, userData.password);

      await loginPage.waitForToast();
      await expect(loginPage.toastMessage).toBeVisible();
      // await expect(loginPage.errorMessage).toBeVisible();
      // await expect(loginPage.successMessage).toHaveText("Successful login!");

      const homePage = new HomePage(page);
      await expect(page).toHaveURL("/posts/all");
      await expect(homePage.homeButton).toBeVisible();
    });
  });

  invalidUserArray.forEach(([userKey, userData]) => {
    test(`DD-TC1: Login with invalid user: ${userKey}`, async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.navigate();
      await expect(loginPage.headerSignIn).toHaveText("Sign in");

      await loginPage.login(userData.username, userData.password);

      await expect(page).toHaveURL("/users/login");
    });
  });

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting Login Test Suite ===");
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.headerSignIn).toHaveText("Sign in");
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished Login Test Suite ===");
  });

  test("TC1: Login with valid credentials", async ({ validUser, page }) => {
    await loginPage.login(validUser.username, validUser.password);

    //00 await expect(loginPage.successMessage).toHaveText("Successful login!");
    // await loginPage.waitForToast();
    // await expect(loginPage.toastMessage).toBeVisible();

    const homePage = new HomePage(page);
    await expect(page).toHaveURL("/posts/all");
    await expect(homePage.homeButton).toBeVisible();
  });

  test("TC2: Login button is disabled when any field is empty", async ({
    validUser,
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

  test("TC3: Login fails with wrong username and password", async ({
    invalidUser,
    page,
  }) => {

    await loginPage.login(invalidUser.username, invalidUser.password);

    // await expect(loginPage.errorMessage).toHaveText(
    //   "Wrong username or password!"
    // );
    await loginPage.waitForToast();
    await expect(loginPage.toastMessage).toHaveText("Wrong username or password!");
    
    await expect(page).toHaveURL("/users/login");
  });
});
