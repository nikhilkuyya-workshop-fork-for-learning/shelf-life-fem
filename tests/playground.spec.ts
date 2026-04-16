import { expect, test } from '@playwright/test';

test.describe("playground page", async () => {

    test.describe("role basics", async () => {
        test("add to shelf button", async ({ page }) => {
            await page.goto('/playground');
            await expect(page.getByRole('button', { name: 'Add to shelf' })).toBeVisible();
        });
        test("remove from shelf button", async ({ page }) => {
            await page.goto('/playground');
            await expect(page.getByRole('button', { name: 'Remove from shelf' })).toBeVisible();
        });
        test("cancel button", async ({ page }) => {
            await page.goto('/playground');
            await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        });
        test("out of stock button disabled button", async ({ page }) => {
            await page.goto('/playground');
            await expect(page.getByRole('button', { name: 'Out of stock', disabled: true })).toBeVisible();
        });

        test("first delete button", async ({ page }) => {
            await page.goto('/playground');
            await expect(page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
        });
    });

    test.describe("disambiguation", async () => {
        test("find the third remove button from the reading list", async ({ page }) => {
            await page.goto('/playground');
            const readingList = page.getByRole("list", { name: "Reading list" });
            const thirdRemoveButton = readingList.getByRole('button', { name: 'Remove' }).nth(2);
            await expect(thirdRemoveButton).toBeVisible();
        });

        test("find the rate this button from the article", async ({ page }) => {
            await page.goto('/playground');
            const article = page.getByRole("article", { name: "Piranesi by Susanna Clarke" });
            const rateThisButton = article.getByRole('button', { name: 'Rate this book' });
            await expect(rateThisButton).toBeVisible();
        });

        test("can find the hint for input author field", async ({ page }) => {
            await page.goto('/playground');
            const authorHint = page.getByText("Last name, first name");
            await expect(authorHint).toBeVisible();
        });

    });

    test.describe("text and content", async () => {

        test("find the paragraph which has 42 days", async ({ page }) => {
            await page.goto("/playground");
            const paragraph = page.getByText(new RegExp("42 days"));
            await expect(paragraph).toBeVisible();
        });

        test("find the paragraph which has 3 of 12 books finished content", async ({ page }) => {
            await page.goto("/playground");
            const paragraph = page.getByText(new RegExp("3 of 12 books finished"));
            await expect.soft(paragraph).toBeVisible()
        });
    })

    test.describe("Tables and list", async () => {

        test("Count the data rows in the Book ratings table", async ({ page }) => {
            await page.goto("/playground");
            const bookRatingsTable = page.getByRole("table", { name: "Book ratings" });
            const bookRows = await bookRatingsTable.getByRole("row").filter({
                hasNot: page.getByRole("columnheader")
            });
            await expect.soft(bookRows).toHaveCount(3);
        })

        test("find the reading list ", async ({ page }) => {
            await page.goto("/playground");
            const readingList = page.getByRole("list", { name: "Reading list" });
            await expect(readingList.getByRole("listitem")).toHaveCount(4);
        });

    });

    test.describe("dynamic content", async () => {
        test("show details should show the dynamic content", async ({ page }) => {
            await page.goto('/playground');
            const showDetailsButton = await page.getByRole('button', { name: 'Show details' });
            await showDetailsButton.click();
            await expect(page.getByText("Station Eleven")).toBeDefined();
        });
    });

    test.describe("dialogs", async () => {
        test("rate this book dialog should be visible", async ({ page }) => {
            await page.goto('/playground');
            const rateThisBookButton = await page.getByRole('button', { name: 'Rate this book' });
            await rateThisBookButton.nth(1).click();
            await expect(page.getByRole("dialog")).toBeVisible();
        });

        test("action to save the rating", async ({ page }) => {
            await page.goto("/playground");
            await page.getByRole("button", { name: "Rate this book" }).last().click();
            const dialog = page.getByRole("dialog");
            await dialog.getByLabel("4 stars").check();
            await dialog.getByRole("button", { name: "Save rating" }).click();
            await expect.soft(dialog).not.toBeVisible()
        });

        test("toogle the dialog and cancel the dialog", async ({ page }) => {
            await page.goto("/playground");
            await page.getByRole("button", { name: "Rate this book" }).nth(1).click();
            const dialog = page.getByRole("dialog");
            const cancelButton = dialog.getByRole("button", { name: "Cancel" });
            await expect(dialog).toBeVisible();
            await cancelButton.click();
            await expect(dialog).not.toBeVisible()
        })
    });
});