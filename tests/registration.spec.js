import {
  generateUsername,
  generateEmail,
  generateRandomBirthDate,
  generatePassword,
  confirmPassword,
  generatePublicInfo,
} from "../helpers/dataGenerator.js";
import { test, expect } from "@playwright/test";
import testData from "../test-data/users.json" assert { type: "json" };
import { RegisterPage } from "../pages/RegisterPage.js";
import { HomePage } from "../pages/HomePage.js";

test.describe("Registration page", () => {
  let registerPage;
  const { invalidEmails } = testData;
  const { shortInvalidUsernames } = testData;

  const username = generateUsername();
  const email = generateEmail();
  const password = generatePassword();
  const confirmPassword = password;
  const birthDate = generateRandomBirthDate();
  const publicInfo = generatePublicInfo();

  invalidEmails.forEach((email) => {
    test(`DD-TC3: User cannot register with invalid email: ${email}`, async ({
      page,
    }) => {
      registerPage = new RegisterPage(page);
      await registerPage.navigate();
      await expect(registerPage.signUpHeader).toHaveText("Sign up");

      await registerPage.fillRegistrationForm({
        username,
        email,
        birthDate,
        password,
        confirmPassword,
        publicInfo,
      });

      await expect(registerPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL("/users/register");
    });
  });

  shortInvalidUsernames.forEach((username) => {
    test(`DD-TC4: User cannot register with username shorter than 4 characters: ${username}`, async ({
      page,
    }) => {
      registerPage = new RegisterPage(page);
      await registerPage.navigate();
      await expect(registerPage.signUpHeader).toHaveText("Sign up");

      await registerPage.fillRegistrationForm({
        username,
        email,
        birthDate,
        password,
        confirmPassword,
        publicInfo,
      });
      await expect(registerPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL("/users/register");
    });
  });

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting Registration Test Suite ===");
  });

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await expect(registerPage.signUpHeader).toHaveText("Sign up");
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished Registration Test Suite ===");
  });

  test("TC13: User can successfully register with valid data", async ({ page })=> {
    await registerPage.register({
        username,
        email,
        birthDate,
        password,
        confirmPassword,
        publicInfo,
    });

    await registerPage.waitForToast();
    await expect(registerPage.toastMessage).toContainText("Successful register!");

    const homePage = new HomePage(page);
    await expect(page).toHaveURL("/posts/all", { timeout: 10000 });
    await expect(homePage.homeButton).toBeVisible();
  });

});
