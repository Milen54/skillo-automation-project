import { HomePage } from "../pages/HomePage.js";
import { NewPostPage } from "../pages/NewPostPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { test, expect } from "./fixtures/auth.js";
import { validUser } from "./fixtures/loginPage.js";

test.describe("Logout functionality", () => {
  let homePage;

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting Logout Test Suite ===");
  });

  test.beforeEach(async ({ authenticatedPage }) => {
    homePage = new HomePage(authenticatedPage);
    await expect(authenticatedPage).toHaveURL("/posts/all");
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished Logout Test Suite ===");
  });

  test("TC4: User can log out successfully from Hope Page", async ({
    page,
  }) => {
    await homePage.logout();
    await expect(page).toHaveURL("/users/login");
  });

  test("TC5: User can log out successfully from Profile Page", async ({
    page,
  }) => {
    const profilePage = new ProfilePage(page);
    await homePage.navigateToProfile();

    await expect(profilePage.profileHeader).toHaveText(validUser.username);

    await profilePage.logout();
    await expect(page).toHaveURL("/users/login");
  });

  test("TC6: User can log out successfully from New Post Page", async ({
    page,
  }) => {
    const newPostPage = new NewPostPage(page);
    await homePage.navigateToNewPost();

    await expect(newPostPage.browsePostsButton).toBeVisible();

    await newPostPage.logoutButton.click();
    await expect(page).toHaveURL("/users/login");
  });
});