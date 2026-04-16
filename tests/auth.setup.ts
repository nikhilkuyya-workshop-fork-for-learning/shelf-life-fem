import { expect, test } from '@playwright/test';
import { storageStatePath } from './data/constant';

test.describe("login page", async () => {

    test.skip("should create a account", async ({page}) => {
        await page.getByRole('link', { name: 'Sign in' }).click();
        await page.getByRole('button', { name: 'Need an account? Create one' }).click();
        await page.getByRole('textbox', { name: 'Email Use the email address' }).click();
        await page.getByRole('textbox', { name: 'Email Use the email address' }).fill('test@mail.com');
        await page.getByRole('textbox', { name: 'Email Use the email address' }).press('Tab');
        await page.getByRole('textbox', { name: 'Password' }).fill('test');
        await page.getByRole('textbox', { name: 'Password' }).press('Tab');
        await page.getByRole('textbox', { name: 'Display name This is what' }).fill('Test');
        await page.getByRole('button', { name: 'Create account' }).click();
        await page.getByRole('button', { name: 'Sign out' }).click();
    })

    test("should be able to the login page", async ({ page }) => {
        await page.goto('/login');

        await page.getByRole('textbox', { name: 'Email Use the email address' }).click();
        await page.getByRole('textbox', { name: 'Email Use the email address' }).fill('test@mail.com');
        await page.getByRole('textbox', { name: 'Email Use the email address' }).press('Tab');
        await page.getByRole('textbox', { name: 'Password' }).fill('test');
        await page.getByRole('button', { name: 'Sign in' }).click();        
        await expect(page).toHaveURL('/shelf');
        await page.context().storageState({ path: storageStatePath });
    });
});