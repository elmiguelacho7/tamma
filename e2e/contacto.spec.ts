import { test, expect } from "@playwright/test";

test.describe("Contacto page", () => {
  test("contacto loads and shows form", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.getByRole("heading", { name: /Contáctanos/i })).toBeVisible();
    const formSection = page.locator("#formulario");
    await expect(formSection).toBeVisible();
    await expect(formSection.getByLabel(/Nombre completo/i)).toBeVisible();
    await expect(formSection.getByLabel(/Correo electrónico/i)).toBeVisible();
  });
});

