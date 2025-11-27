import { HomePage } from "../pages/HomePage.js";
import { NewPostPage } from "../pages/NewPostPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { test, expect } from "./fixtures/authNewPost.js";
import path from "node:path";

/**
 * This test suite is executed in **serial mode** because all tests in the
 * "New Post functionality" scope are **destructive** and operate on the same
 * shared user state.
 *
 * ❗ Why serial?
 * - Each test creates or deletes real posts in the backend.
 * - Running these tests in parallel workers causes **race conditions** */

test.describe("New Post functionality", { mode: "serial" }, () => {
  let homePage;
  let postPage;
  let profilePage;

  const filePath = path.resolve("test-data/test-image.jpg");

  test.beforeAll(async () => {
    console.log("=== 🔵 Starting New Post Test Suite ===");
  });

  test.beforeEach(async ({ authenticatedPage, page }) => {
    homePage = new HomePage(authenticatedPage);

    await expect(authenticatedPage).toHaveURL("/posts/all");
    await homePage.navigateToNewPost();

    postPage = new NewPostPage(page);
    profilePage = new ProfilePage(page);
  });

  test.afterEach(async () => {
    await profilePage.deletePostIfExists();
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished New Post Test Suite ===");
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC7: User can create a new public post", async ({}) => {
    await postPage.createPublicPost({
      filePath: [filePath],
      captionPrefix: "Public Post TC7",
    });

    await expect(profilePage.noPostsHeader).not.toBeVisible();
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC8: User can create and delete a new private post", async ({}) => {
    await postPage.createPrivatePost({
      filePath: [filePath],
      captionPrefix: "Private Post TC8",
    });

    await profilePage.navigateToPrivatePosts();
    await expect(profilePage.latestPostImage).toBeVisible();

    await profilePage.deleteLatestPost();

    await profilePage.waitForToast();
    await expect(profilePage.toastMessage).toContainText("Post Deleted!");
  });

  test("TC9: User cannot create a post without uploading an image", async ({
    page,
  }) => {
    const caption = await postPage.generatePostCaption("No Image Post TC9");
    await postPage.fillCaption(caption);

    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText(
      "Please upload an image!"
    );
    await expect(page).toHaveURL("/posts/create");
  });

  test("TC10: User cannot create a post without entering a caption", async ({
    page,
  }) => {
    await postPage.uploadFile([filePath]);
    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText("Please enter caption!");
    await expect(page).toHaveURL("/posts/create");
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC11: User can successfully delete their post", async ({}) => {
    await postPage.createPublicPost({
      filePath: [filePath],
      captionPrefix: "Delete Post TC10",
    });

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toHaveText("Post created!");

    await expect(profilePage.noPostsHeader).not.toBeVisible();

    await profilePage.deleteLatestPost();

    await profilePage.waitForToast();
    await expect(profilePage.toastMessage).toContainText("Post Deleted!");
  });

  test("TC12: User cannot create an empty post", async ({ page }) => {
    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText(
      "Please upload an image!"
    );
    await expect(page).toHaveURL("/posts/create");
  });
});
