export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.url = "/users/profile";

        // Create locators
        this.logoutButton = this.page.locator("i.fa-sign-out-alt");
        this.profileHeader = this.page.locator("h2");
    }

}