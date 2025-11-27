export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.url = "/users/register";

        // Create locators
        this.usernameInput = this.page.locator("[formcontrolname='username']");
        this.emailInput = this.page.locator("[formcontrolname='email']");
        this.birthDateInput = this.page.locator("[formcontrolname='birthDate']");
        this.passwordInput = this.page.locator("#defaultRegisterFormPassword");
        this.confirmPasswordInput = this.page.locator("#defaultRegisterPhonePassword");
        this.publicInfoInput = this.page.locator("[formcontrolname='publicInfo']");
        this.signInButton = this.page.locator("#sign-in-button");

        this.signUpHeader = this.page.locator("h4");
        this.toastMessage = this.page.locator("#toast-container");
    }

    async navigate() {
        await this.page.goto(this.url);
    };

    async waitForToast(timeout = 10000) {
    await this.toastMessage.waitFor({ state: "visible", timeout }
    );
  }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    };

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillBirthDate(birthDate) {
        await this.birthDateInput.fill(birthDate);
    };

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    };

    async fillConfirmPassword(confirmPassword) {
        await this.confirmPasswordInput.fill(confirmPassword);
    };

    async fillPublicInfo(publicInfo) {
        await this.publicInfoInput.fill(publicInfo);
    };

    async clickSignInButton() {
        await this.signInButton.click();
    };

    async fillRegistrationForm(userData) {
        await this.fillUsername(userData.username);
        await this.fillEmail(userData.email);
        await this.fillBirthDate(userData.birthDate);
        await this.fillPassword(userData.password);
        await this.fillConfirmPassword(userData.confirmPassword);
        await this.fillPublicInfo(userData.publicInfo);
    };
    
    async register(userData) {
        await this.fillUsername(userData.username);
        await this.fillEmail(userData.email);
        await this.fillBirthDate(userData.birthDate);
        await this.fillPassword(userData.password);
        await this.fillConfirmPassword(userData.confirmPassword);
        await this.fillPublicInfo(userData.publicInfo);
        await this.clickSignInButton();
    }
}