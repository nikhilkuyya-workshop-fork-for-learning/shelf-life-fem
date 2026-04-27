import { test } from "@playwright/test";

test.describe("shelf page", async () => {

    test("should be able to navigate to the shelf page", async ({ page }) => {
        await page.route("**openlibrary.org/**", (route) => {
            return route.fulfill({
                body: JSON.stringify([])
            })
        });

        await page.goto("/search");
        const query = page.getByRole("textbox", { name: "query" });
        await query.fill("The Great Gatsby");
    });
});