import { test, expect } from "@playwright/test";

test.describe("Not found", () => {
  test("bad route shows branded not-found", async ({ page }) => {
    await page.goto("/pagina-que-no-existe", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /página no encontrada/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Volver con claridad/i })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: /Volver al inicio/i })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: /Contacto/ }).first()).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: /Inicio/ }).first()).toBeVisible();
  });
});

