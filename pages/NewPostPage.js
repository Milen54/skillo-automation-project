export class NewPostPage {
    constructor(page) {
        this.page = page;
        this.url = "/posts/create";

        // Create locators
        this.logoutButton = this.page.locator("i.fa-sign-out-alt");
        this.browsePostsButton = this.page.locator("#choose-file");
    }

    
}