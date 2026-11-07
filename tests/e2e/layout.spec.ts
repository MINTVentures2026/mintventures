import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Phase 1 acceptance: header, footer and action bar pass keyboard and contrast checks
// on mobile and desktop.

const isMobile = (projectName: string) => projectName === "mobile";

test("has no WCAG 2.1 AA violations (axe, incl. colour contrast)", async ({ page }) => {
  await page.goto("/");
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
});

test("has no WCAG violations with the mobile menu open", async ({ page }, info) => {
  test.skip(!isMobile(info.project.name), "mobile menu only");
  await page.goto("/");
  await page.getByText("Menü").click();
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("makes no third-party requests", async ({ page }) => {
  const foreign: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://localhost:4173") foreign.push(request.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(foreign).toEqual([]);
});

test("first Tab reaches a visible skip link to the main content", async ({ page, browserName }) => {
  await page.goto("/");
  // Safari/WebKit only moves focus to links with Option+Tab by default.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Zum Inhalt springen" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#inhalt$/);
});

test.describe("desktop", () => {
  test.skip(({ isMobile: mobile }) => mobile, "desktop only");

  test("Kurse dropdown opens with the keyboard and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Hauptnavigation" });
    const kurse = nav.locator("summary", { hasText: "Kurse" });
    await kurse.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: "Alle Kurse im Überblick" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(nav.getByRole("link", { name: "Robotik-Wochenendkurs" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(nav.getByRole("link", { name: "Robotik-Wochenendkurs" })).toBeHidden();
    await expect(kurse).toBeFocused();
  });

  test("header shows the primary CTA and hides the action bar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner").getByRole("link", { name: "Probestunde anfragen" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Schnellkontakt" })).toBeHidden();
  });
});

test.describe("mobile", () => {
  test.skip(({ isMobile: mobile }) => !mobile, "mobile only");

  test("action bar shows both buttons with tap targets of at least 44x44 px", async ({ page }) => {
    await page.goto("/");
    const bar = page.getByRole("navigation", { name: "Schnellkontakt" });
    for (const name of ["Probestunde anfragen", /WhatsApp/]) {
      const box = await bar.getByRole("link", { name }).boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
    await expect(bar.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "https://wa.me/4915157596494");
  });

  test("action bar never covers the end of the page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const bar = await page.getByRole("navigation", { name: "Schnellkontakt" }).boundingBox();
    const lastLink = await page.getByRole("navigation", { name: "Rechtliches" }).boundingBox();
    expect(lastLink!.y + lastLink!.height).toBeLessThanOrEqual(bar!.y);
  });

  test("menu opens, lists every page and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("summary", { hasText: "Menü" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Hauptnavigation" });
    for (const name of [
      "Robotik-Wochenendkurs",
      "So lernen Kinder",
      "Aktuelles",
      "Kooperationen",
      "Über uns",
      "Kontakt",
    ]) {
      await expect(menu.getByRole("link", { name, exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("content and navigation still work", async ({ page, isMobile: mobile }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    if (mobile) await page.locator("summary", { hasText: "Menü" }).click();
    await expect(
      page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Kontakt" }),
    ).toBeVisible();
  });
});
