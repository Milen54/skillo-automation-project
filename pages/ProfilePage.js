export class ProfilePage {
    constructor(page) {
        this.page = page;

        // Create locators
        this.logoutButton = this.page.locator("i.fa-sign-out-alt");
        this.profileHeader = this.page.locator("h2");

        this.latestPostImage = this.page.locator(".gallery-item").first();

        this.deletePostBtn = this.page.locator('.delete-ask');
        this.confirmDeleteButton = this.page.getByRole("button", { name: "Yes" });
        
        this.toastMessage = this.page.locator("#toast-container");
    }

    async waitForToast() {
    await this.toastMessage.waitFor({ state: 'visible' });
};


    async logout() {
        await this.logoutButton.click();
    };

    async deletePostIfExists() {
        const canDelete = await this.latestPostImage.isVisible().catch(() => false);
        if(!canDelete) {
            return;
        }
        await this.latestPostImage.click();
        await this.deletePostBtn.click();
        await this.confirmDeleteButton.click();
    }

    async deleteLatestPost() {
        await this.latestPostImage.click();
        await this.deletePostBtn.click();
        await this.confirmDeleteButton.click(); 
    };
}