export class NewPostPage {
  constructor(page) {
    this.page = page;
    this.url = "/posts/create";

    // Create locators
    this.logoutButton = this.page.locator("i.fa-sign-out-alt");
    this.browsePostsButton = this.page.locator("#choose-file");

    this.postPictureHeader = this.page.locator("h3");

    this.fileInputContainer = this.page
      .locator('input[formcontrolname="coverUrl"]')
      .first();
    this.captionInputField = this.page.locator("[name='caption']");

    this.postStatusCheckbox = this.page.locator('label[for="customSwitch2"]');

    this.createPostButton = this.page.locator("#create-post");

    this.toastMessage = this.page.locator("#toast-container");
  }

  async waitForToast(timeout = 10000) {
    await this.toastMessage.waitFor({ state: "visible", timeout }
    );
  }

  async uploadFile(filePath) {
    await this.fileInputContainer.setInputFiles(filePath);
  }

  // Generate a unique caption using the current date and time
  async generatePostCaption(prefix = "New post") {
    const now = new Date();
    return `${prefix} ${now.toISOString().replace("T", " ").slice(0, 19)}`; // e.g. "New post 2025-11-23 14:30:45"
  }

  async fillCaption(caption) {
    await this.captionInputField.fill(caption);
  }

  // Make the post private by checking the checkbox
  async postToBePrivate() {
    await this.postStatusCheckbox.click();
  }

  async createPublicPost(data) {
    await this.uploadFile(data.filePath);

    const caption = await this.generatePostCaption(data.captionPrefix);
    await this.fillCaption(caption);

    await this.createPostButton.click();
  }

  async createPrivatePost(data) {
    await this.uploadFile(data.filePath);

    const caption = await this.generatePostCaption(data.captionPrefix);
    await this.fillCaption(caption);

    await this.postToBePrivate();
    //await this.postStatusCheckbox.isChecked();

    await this.createPostButton.click();
  }
}
