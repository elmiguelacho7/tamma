import { chromium } from "playwright";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3010";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

page.on("console", (msg) => {
  if (msg.type() === "error") {
    // Keep output compact but high-signal.
    console.log("CONSOLE error:", msg.text());
  }
});
page.on("pageerror", (err) => {
  console.log("PAGEERROR:", err?.stack ?? String(err));
});

console.log("goto", baseURL);
await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 60_000 });

// Mobile nav doesn't include an explicit "Inicio" link; hitting representative
// inner-route navigations is sufficient for detecting hangs.
const paths = ["/nosotros", "/servicios", "/contacto"];
for (const path of paths) {
  console.log("nav to", path);
  await page.getByRole("button", { name: /Abrir menú/i }).click({ timeout: 20_000 });

  const link = page.locator(
    `nav[aria-label="Principal móvil"] a[href="${path}"]`,
  );
  await link.first().click({ timeout: 20_000 });

  const target = path === "/" ? new RegExp(`${baseURL}/?$`) : new RegExp(`${baseURL}${path}/?$`);
  await page.waitForURL(target, { timeout: 45_000 });
  await page.waitForLoadState("domcontentloaded", { timeout: 60_000 });
}

console.log("done");
await browser.close();

