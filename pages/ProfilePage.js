export class ProfilePage {
    constructor(page) {
        this.page = page;

        // Create locators
        this.logoutButton = this.page.locator("i.fa-sign-out-alt");
        this.profileHeader = this.page.locator("h2");
    }

    async logout() {
        await this.logoutButton.click();
    };
}