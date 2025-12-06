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

  test.beforeEach(async ({ authenticatedNewPostPage }) => {
    homePage = new HomePage(authenticatedNewPostPage);

    await expect(authenticatedNewPostPage).toHaveURL("/posts/all");
    await homePage.navigateToNewPost();

    postPage = new NewPostPage(authenticatedNewPostPage);
    profilePage = new ProfilePage(authenticatedNewPostPage);
  });

  test.afterEach(async () => {
    await profilePage.deletePostIfExists();
  });

  test.afterAll(async () => {
    console.log("=== 🔴 Finished New Post Test Suite ===");
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC5: User can create a new public post", async ({}) => {
    await postPage.createPublicPost({
      filePath: [filePath],
      captionPrefix: "Public Post TC7",
    });

    await expect(profilePage.noPostsHeader).not.toBeVisible();
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC6: User can create and delete a new private post", async ({}) => {
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

  test("TC7: User cannot create a post without uploading an image", async ({
    authenticatedNewPostPage,
  }) => {
    const caption = await postPage.generatePostCaption("No Image Post TC9");
    await postPage.fillCaption(caption);

    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText(
      "Please upload an image!"
    );
    await expect(authenticatedNewPostPage).toHaveURL("/posts/create");
  });

  test("TC8: User cannot create a post without entering a caption", async ({
    authenticatedNewPostPage,
  }) => {
    await postPage.uploadFile([filePath]);
    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText("Please enter caption!");
    await expect(authenticatedNewPostPage).toHaveURL("/posts/create");
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC9: User can successfully delete their post", async ({}) => {
    await postPage.createPublicPost({
      filePath: [filePath],
      captionPrefix: "Delete Post TC10",
    });

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toHaveText("Post created!");

    await expect(profilePage.noPostsHeader).not.toBeVisible();

    await profilePage.deleteLatestPost();

    // await profilePage.waitForToast();
    // await expect(profilePage.toastMessage).toContainText("Post Deleted!");
    await expect(profilePage.latestPostImage).not.toBeVisible();
  });

  test("TC10: User cannot create an empty post", async ({
    authenticatedNewPostPage,
  }) => {
    await postPage.createPostButton.click();

    await postPage.waitForToast();
    await expect(postPage.toastMessage).toContainText(
      "Please upload an image!"
    );
    await expect(authenticatedNewPostPage).toHaveURL("/posts/create");
  });
});
