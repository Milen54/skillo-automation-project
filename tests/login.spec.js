import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { test, expect } from "./fixtures/loginPage.js";

test.describe("Login page", () => {
  let loginPage;
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

    await expect(loginPage.successMessage).toHaveText("Successful login!");

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
    await expect(loginPage.errorMessage).toHaveText(
      "Wrong username or password!"
    );
    await expect(page).toHaveURL("/users/login");
  });
});
