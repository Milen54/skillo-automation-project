import { HomePage } from "../pages/HomePage.js";
import { NewPostPage } from "../pages/NewPostPage.js";
import { ProfilePage } from "../pages/ProfilePage.js";
import { test, expect } from "./fixtures/auth.js";
import path from "node:path";

test.describe("New Post functionality", () => {
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
    await expect(page).toHaveURL("/posts/create");

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

    //await expect(postPage.postCreatedMessage).toBeVisible();
    //await expect(postPage.postCreatedMessage).toHaveText("Post created!");
    await postPage.waitForToast();
    await expect(postPage.toastMessage).toHaveText("Post created!");

    await expect(profilePage.latestPostImage).toBeVisible();
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC8: User can create a new private post", async ({}) => {
    await postPage.createPrivatePost({
      filePath: [filePath],
      captionPrefix: "Private Post TC8",
    });
    // await expect(postPage.postCreateMessage).toBeVisible();
    // await expect(postPage.postCreateMessage).toHaveText("Post created!");
    await postPage.waitForToast();
    await expect(postPage.toastMessage).toHaveText("Post created!");

    await expect(profilePage.latestPostImage).toBeVisible();
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC9: User cannot create a post without uploading an image", async ({}) => {
    const caption = await postPage.generatePostCaption("No Image Post TC9");
    await postPage.fillCaption(caption);

    await postPage.createPostButton.click();
    await expect(postPage.toastMessage).toBeVisible();
    await expect(postPage.toastMessage).toHaveText("Please upload an image!");
    // await postPage.waitForToast();
    // await expect(postPage.toastMessage).toHaveText(
    //   "Please upload an image!"
    // );
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC10: User cannot create a post without entering a caption", async ({}) => {
    await postPage.uploadFile([filePath]);
    await postPage.createPostButton.click();
    await expect(postPage.toastMessage).toBeVisible();
    await expect(postPage.toastMessage).toHaveText("Please enter caption!");
    // await postPage.waitForToast();
    // await expect(postPage.toastMessage).toHaveText(
    //   "Please enter caption!"
    // );
  });

  // eslint-disable-next-line no-empty-pattern
  test("TC11: User can successfully delete their post", async ({}) => {
    await postPage.createPublicPost({
      filePath: [filePath],
      captionPrefix: "Delete Post TC10",
    });
    // await expect(postPage.toastMessage).toBeVisible();
    // await expect(postPage.toastMessage).toHaveText("Post created!");
    await postPage.waitForToast();
    await expect(postPage.toastMessage).toHaveText("Post created!");

    await expect(profilePage.latestPostImage).toBeVisible();

    await profilePage.deleteLatestPost();
    // await expect(profilePage.toastMessage).toHaveText("Post Deleted!");
    await profilePage.waitForToast();
    await expect(profilePage.toastMessage).toHaveText("Post Deleted!");

    await expect(profilePage.latestPostImage).toHaveCount(0);
  });

  test("TC12: User cannot create an empty post", async ({ page }) => {
    await postPage.createPostButton.click();
    //await expect(postPage.toastMessage).toBeVisible();
    await expect(postPage.toastMessage).toHaveText("Please upload an image!");

    await expect(page).toHaveURL("/posts/create");
  });
});
