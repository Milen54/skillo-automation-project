import {
  generateUsername,
  generateEmail,
  generateRandomBirthDate,
  generatePassword,
  confirmPassword,
  generatePublicInfo,
} from "../helpers/dataGenerator.js";
import { test, expect } from "./fixtures/registerPage.js";
import testData from "../test-data/users.json" assert { type: "json" };
import { HomePage } from "../pages/HomePage.js";

test.describe("Registration page", () => {
  const { invalidEmails } = testData;
  const { shortInvalidUsernames } = testData;
  const { weakPasswords } = testData;

  const username = generateUsername();
  const email = generateEmail();
  const password = generatePassword();
  const confirmPassword = password;
  const birthDate = generateRandomBirthDate();
  const publicInfo = generatePublicInfo();

  invalidEmails.forEach((email) => {
    test(`DD-TC3: User cannot register with invalid email: ${email}`, async ({
      registrationPage,
      page,
    }) => {
      await expect(registrationPage.signUpHeader).toHaveText("Sign up");

      await registrationPage.fillRegistrationForm({
        username,
        email,
        birthDate,
        password,
        confirmPassword,
        publicInfo,
      });

      await expect(registrationPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL("/users/register");
    });
  });

  shortInvalidUsernames.forEach((username) => {
    test(`DD-TC4: User cannot register with username shorter than 4 characters: ${username}`, async ({
      registrationPage,
      page,
    }) => {
      await expect(registrationPage.signUpHeader).toHaveText("Sign up");

      await registrationPage.fillRegistrationForm({
        username,
        email,
        birthDate,
        password,
        confirmPassword,
        publicInfo,
      });
      await expect(registrationPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL("/users/register");
    });
  });

  Object.entries(weakPasswords).forEach(([caseName, weakPasswords]) => {
    test(`DD-TC5: User cannot register with invalid password: ${caseName}`, async ({
      registrationPage,
      page,
    }) => {
      await expect(registrationPage.signUpHeader).toHaveText("Sign up");

      await registrationPage.fillRegistrationForm({
        username,
        email,
        birthDate,
        password: weakPasswords,
        confirmPassword: weakPasswords,
        publicInfo,
      });
      await expect(registrationPage.signInButton).toBeDisabled();
      await expect(page).toHaveURL("/users/register");
    });
  });

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting Registration Test Suite ===");
  });

  test.beforeEach(async ({ registrationPage }) => {
    await expect(registrationPage.signUpHeader).toHaveText("Sign up");
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished Registration Test Suite ===");
  });

  test("TC11: User can successfully register with valid data", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.register({
      username,
      email,
      birthDate,
      password,
      confirmPassword,
      publicInfo,
    });

    await registrationPage.waitForToast();
    await expect(registrationPage.toastMessage).toContainText(
      "Successful register!"
    );

    const homePage = new HomePage(page);
    await expect(page).toHaveURL("/posts/all", { timeout: 10000 });
    await expect(homePage.homeButton).toBeVisible();
  });

  test("TC12: User can register with date in the future", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      username: username + "Future",
      email: "qa" + email,
      birthDate: "2027-12-20",
      password,
      confirmPassword,
      publicInfo,
    });
    await registrationPage.clickSignInButton();

    await registrationPage.waitForToast();
    await expect(registrationPage.toastMessage).toContainText(
      "Successful register!"
    );

    const homePage = new HomePage(page);
    await expect(page).toHaveURL("/posts/all", { timeout: 10000 });
    await expect(homePage.homeButton).toBeVisible();
  });

  test("TC13: User cannot register without entering public info", async ({
    registrationPage,
    page,
  }) => {
    await registrationPage.fillRegistrationForm({
      username,
      email,
      birthDate,
      password,
      confirmPassword,
      publicInfo: "",
    });
    await expect(registrationPage.signInButton).toBeDisabled();
    await expect(page).toHaveURL("/users/register");
  });
});
