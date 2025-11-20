import { HomePage } from "../pages/HomePage.js";
import { test, expect } from "./fixtures/auth.js";

test("TC4: User can log out successfully", async ({ authenticatedPage, page }) => {
  const homePage = new HomePage(authenticatedPage);

  await homePage.logout();
  await expect(page).toHaveURL("/users/login");
});