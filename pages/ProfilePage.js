export class ProfilePage {
    constructor(page) {
        this.page = page;

        // Create locators
        this.logoutButton = this.page.locator("i.fa-sign-out-alt");
        this.profileHeader = this.page.locator("h2");

        this.latestPostImage = this.page.locator(".gallery-item").first();
         //this.latestPostImage = this.page.locator(".post-img").first();
        //this.latestPostImage = this.page.locator('.gallery-item img').first()

        this.deletePostBtn = this.page.locator('.delete-ask');
        this.confirmDeleteButton = this.page.getByRole("button", { name: "Yes" });
        
        this.toastMessage = this.page.locator("#toast-container");

        // Locator for navigation buttons
        this.allPostsButton = this.page.locator('.btn-all');
        this.privatePostsButton = this.page.locator('.btn-private');
       
        this.noPostsHeader = this.page.locator("h3").filter({ hasText: "No posts here" });
    }

    async waitForToast(timeout = 10000) {
    await this.toastMessage.waitFor({ state: 'visible' });
};

    async logout() {
        await this.logoutButton.click();
    };

    async navigateToAllPosts() {
        await this.allPostsButton.check();
    }

    async navigateToPrivatePosts() {
        await this.privatePostsButton.check();
    }

    async deletePostIfExists() {
       // await this.allPostsButton.check();
        const canDelete = await this.latestPostImage.isVisible().catch(() => false);
        if(!canDelete) {
            return;
        }
        await this.latestPostImage.waitFor({ state: 'visible' });
        await this.latestPostImage.click();
        await this.deletePostBtn.click();
        await this.confirmDeleteButton.click();
    }

    async deleteLatestPost() {
        await this.latestPostImage.first().waitFor({ state: 'visible' });
        await this.latestPostImage.click();
        await this.deletePostBtn.click();
        await this.confirmDeleteButton.click(); 
    };

    async deleteAllPosts() {
        while (await this.latestPostImage.isVisible().catch(() => false)) {
            await this.deletePostIfExists();
        }
    };
}