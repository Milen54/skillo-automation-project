import { test as base } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage.js";

export const test = base.extend({

    registrationPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await use(registerPage);
    },
})