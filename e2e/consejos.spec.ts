import { test, expect } from "@playwright/test";

test.describe("Consejos page", () => {
  test("consejos index loads", async ({ page }) => {
    await page.goto("/consejos");
    await expect(
      page.getByRole("heading", { name: /Consejos y bienestar/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Explorar artículos/i })).toBeVisible();
  });

  test("consejo detail loads", async ({ page }) => {
    await page.goto("/consejos/rutina-preventiva-para-tu-familia", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { name: /rutina preventiva simple/i }),
    ).toBeVisible({ timeout: 15000 });
    await expect(page.locator('a[href="/consejos"]').first()).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Lecturas relacionadas/i }),
    ).toBeVisible();
  });
});

