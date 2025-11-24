export class NewPostPage {
  constructor(page) {
    this.page = page;
    this.url = "/posts/create";

    // Create locators
    this.logoutButton = this.page.locator("i.fa-sign-out-alt");
    this.browsePostsButton = this.page.locator("#choose-file");

    this.postPictureHeader = this.page.locator("h3");

    this.fileInputContainer = this.page.locator('input[formcontrolname="coverUrl"]').first();
    this.captionInputField = this.page.locator("[name='caption']")

    this.postStatusCheckbox = this.page.locator('#customSwitch2');

    this.createPostButton = this.page.locator("#create-post");

    this.toastMessage = this.page.locator("#toast-container");
  }

  async waitForToast() {
    await this.toastMessage.waitFor({ state: "visible" });
}


  async uploadFile(filePath) {
    await this.fileInputContainer.setInputFiles(filePath);
  }

  async generatePostCaption(prefix = "New post") {
    const now = new Date();
    return `${prefix} ${now.toISOString().replace("T", " ").slice(0, 19)}`; // e.g. "New post 2025-11-23 14:30:45"
  };

  async fillCaption(caption) {
    await this.captionInputField.fill(caption);
  }

  async postToBePrivate() {
    await this.postStatusCheckbox.check();
  };

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

        await this.createPostButton.click();
    }
}