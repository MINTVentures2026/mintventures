import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Phase 3 pages: accessibility, privacy and content rules on every page.

const PAGES = [
  "/",
  "/kurse/robotik-wochenendkurs",
  "/kontakt",
  "/kontakt?anliegen=kooperation",
  "/kontakt/danke",
  "/gibt-es-nicht",
];

// Plan §1 rules 2–3. "Erfinder-Stufe" rather than "Erfinder": "Junge Erfinder" is a current module name.
const BANNED = [
  "Robotik & Programmieren – Grundlagenkurs",
  "Weekend Academy",
  "Wochenendakademie",
  "Robotics & Coding Foundations",
  "Entdecker",
  "Erfinder-Stufe",
  "Tüftler",
  "Challenge-Stufe",
  "kostenlose Probestunde",
  "Kursstart ab November",
  "18 Unterrichtsstunden",
  "Bad Godesberg",
  "gemeinnützig",
  "e.V.",
  "Beirat",
  "offizieller Partner",
];

for (const path of PAGES) {
  test.describe(path, () => {
    test("has no WCAG 2.1 AA violations", async ({ page }) => {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    });

    test("makes no third-party requests", async ({ page }) => {
      const foreign: string[] = [];
      page.on("request", (r) => {
        if (new URL(r.url()).origin !== "http://localhost:4173") foreign.push(r.url());
      });
      await page.goto(path, { waitUntil: "networkidle" });
      expect(foreign).toEqual([]);
    });

    test("has exactly one H1", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    test("contains no banned content", async ({ page }) => {
      await page.goto(path);
      const text = (await page.locator("body").textContent()) ?? "";
      expect(BANNED.filter((term) => text.includes(term))).toEqual([]);
    });
  });
}

test("unknown paths return a real 404", async ({ request }) => {
  expect((await request.get("/gibt-es-nicht")).status()).toBe(404);
});

test.describe("course page: a parent finds the essentials (Phase 3 done criterion)", () => {
  test("fact box has fee, trial, venue, both times and 12 dates", async ({ page }) => {
    await page.goto("/kurse/robotik-wochenendkurs");
    const facts = page.getByRole("region", { name: "Alle Fakten auf einen Blick" });
    await expect(facts).toContainText("349 € gesamter Kurs (Einführungspreis)");
    await expect(facts).toContainText("25 €");
    await expect(facts).toContainText("vollständig angerechnet");
    await expect(facts).toContainText("Campus Sankt Augustin");
    await expect(facts).toContainText("14:00–15:30 Uhr");
    await expect(facts).toContainText("15:45–17:15 Uhr");
    await expect(facts).toContainText("12 Termine à 90 Minuten (insgesamt 18 Stunden)");
  });

  test("lists all 12 dates with the Christmas break", async ({ page }) => {
    await page.goto("/kurse/robotik-wochenendkurs");
    const dates = page.getByRole("region", { name: "Termine" });
    await expect(dates.getByText(/^Sa\., \d{2}\.\d{2}\.$/)).toHaveCount(12);
    await expect(dates).toContainText("Weihnachtsferien – kein Unterricht");
  });

  test("the fact box comes before the teaching text on a phone", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile layout");
    await page.goto("/kurse/robotik-wochenendkurs");
    const factsTop = (await page.getByRole("region", { name: "Alle Fakten auf einen Blick" }).boundingBox())!.y;
    const teachingTop = (await page.getByText("Kinder bauen und programmieren Roboter").boundingBox())!.y;
    expect(factsTop).toBeLessThan(teachingTop);
  });

  test("offers a way to enquire", async ({ page }) => {
    await page.goto("/kurse/robotik-wochenendkurs");
    const enquire = page
      .getByRole("main")
      .getByRole("link", { name: /anfragen|vormerken|Warteliste/ })
      .first();
    await expect(enquire).toHaveAttribute("href", /^\/kontakt\?anliegen=/);
  });
});

test("homepage links the featured course and the course overview", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Zum Kurs" })).toHaveAttribute("href", "/kurse/robotik-wochenendkurs");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Robotik- und Programmierkurse für Kinder von 8 bis 14 Jahren in Bonn und Sankt Augustin",
  );
});

test("homepage shows no unverified achievements", async ({ page }) => {
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).not.toContainText("zdi-Roboterwettbewerb");
  await expect(body).not.toContainText("Roboternacht");
  await expect(body).not.toContainText("Auftaktveranstaltung");
});
