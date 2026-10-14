import { test, expect } from "@playwright/test";

test("catalogue, language and honest finder results", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  const interest = page.locator("#planner select").last();
  await interest.selectOption("food");
  await expect(page.locator(".planner-results")).toContainText("No reviewed places");
  await expect(page.locator(".planner-results a")).toHaveCount(0);
  await interest.selectOption("nature");
  await expect(page.locator(".planner-results a")).toHaveText(/Ahwar/);
  await page.getByRole("button", { name: "التبديل إلى العربية" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.locator(".planner-query input").fill("عائلة من ٥ أشخاص نريد آثار");
  await page.getByRole("button", { name: "فسّر الطلب" }).click();
  await expect(page.locator('input[type="number"]')).toHaveValue("5");
  expect(errors).toEqual([]);
});

test("catalogue remains usable when map provider fails", async ({ page }) => {
  await page.route("https://tiles.openfreemap.org/**", route => route.abort());
  await page.goto("/");
  await page.locator("#map").scrollIntoViewIfNeeded();
  const governorate = page.locator(".map-panel select");
  await governorate.selectOption("Babylon");
  await expect(page.locator(".map-result")).toHaveCount(1);
  await expect(page.locator(".map-result")).toContainText("Babylon");
  await governorate.selectOption("");
  await expect(page.locator(".map-result")).toHaveCount(6);
  await page.getByRole("button", { name: "Food", exact: true }).click();
  await expect(page.locator(".empty-copy")).toBeVisible();
});

test("mobile reflow in both languages", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  for (const arabic of [false, true]) {
    if (arabic) await page.getByRole("button", { name: "التبديل إلى العربية" }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator(".business-grid")).toHaveCSS("grid-template-columns", /280px/);
  }
});

test("health, security headers and missing route", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(await response.json()).toEqual({ status: "ok" });
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect((await request.get("/does-not-exist")).status()).toBe(404);
});

test("blocked storage does not trap introduction", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } }));
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".language-switch")).toBeEnabled();
});
