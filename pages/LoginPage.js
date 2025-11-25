export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = "/users/login";

    // Create locators
    this.username = this.page.locator("#defaultLoginFormUsername");
    this.password = this.page.locator("#defaultLoginFormPassword");
    this.loginButton = this.page.locator("#sign-in-button");
    this.toastMessage = this.page.locator("#toast-container");
    //this.errorMessage = this.page.locator("#toast-container");

    this.headerSignIn = this.page.locator(".h4");
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async waitForToast(timeout = 10000) {
    await this.toastMessage.waitFor({ state: "visible", timeout }
    );
  }

  async fillUsername(username) {
    await this.username.fill(username);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
