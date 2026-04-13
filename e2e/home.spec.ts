import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Homepage smoke", () => {
  test("homepage loads", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
  });

  test("main desktop navigation is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Principal" }),
    ).toBeVisible();
  });

  test("hero headline is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /Salud y bienestar.*24 horas.*Venezuela/i,
      }),
    ).toBeVisible();
  });

  test("contact section is reachable on the same page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Contáctanos" }),
    ).toBeVisible();
  });

  test("navigates to Nosotros from main navigation", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Principal" })
      .getByRole("link", { name: "Nosotros" })
      .click();
    await expect(page).toHaveURL(/\/nosotros/);
    await expect(
      page.getByRole("heading", { name: /Sobre nosotros/i }),
    ).toBeVisible();
  });
});

/**
 * Accessibility strategy: axe-core runs against the rendered DOM.
 * This project fails only on *critical* impact so minor color-contrast
 * debt in marketing placeholders does not block CI; expand rules as fixes land.
 */
test.describe("Accessibility (axe)", () => {
  test("homepage has no critical axe violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const critical = results.violations.filter((v) => v.impact === "critical");
    expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
  });
});
