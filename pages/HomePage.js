export class HomePage {
  constructor(page) {
    this.page = page;
    this.url = "/posts/all";

    // Create locators
    this.homeButton = this.page.locator("#nav-link-home");
  }
}
