export class HomePage {
  constructor(page) {
    this.page = page;
    this.url = "/posts/all";

    // Create locators
    this.homeButton = this.page.locator("#nav-link-home");
    this.profileButton = this.page.locator("#nav-link-profile");
    this.newPostButton = this.page.locator("#nav-link-new-post");
    this.logoutButton = this.page.locator("i.fa-sign-out-alt");
  }

  async logout() {
    await this.logoutButton.click();
  }

   async navigateToProfile() {
        await this.profileButton.click();
    };

    async navigateToNewPost() {
        await this.newPostButton.click();
    };
}
