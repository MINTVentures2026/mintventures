import { expect, test } from "@playwright/test";

// Phase 4: every route exists, internal links work, and unconfirmed content stays hidden.

test.describe("site-wide", () => {
  test.skip(({ isMobile }) => isMobile, "crawl once, on desktop");

  test("every internal link resolves (crawl from /)", async ({ page, request }) => {
    const seen = new Set<string>(["/"]);
    const queue = ["/"];
    const broken: string[] = [];
    while (queue.length) {
      const path = queue.shift()!;
      await page.goto(path);
      const hrefs = await page
        .locator("a[href^='/']")
        .evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
      for (const href of hrefs) {
        const target = href.split("#")[0] || "/";
        if (seen.has(target)) continue;
        seen.add(target);
        const status = (await request.get(target)).status();
        if (status !== 200) broken.push(`${target} (${status}, linked from ${path})`);
        else if (!target.includes("?")) queue.push(target);
      }
    }
    expect(broken).toEqual([]);
    expect(seen.size).toBeGreaterThan(14);
  });

  test("no page embeds third-party content (iframes)", async ({ page }) => {
    for (const path of ["/", "/kontakt", "/aktuelles", "/kooperationen", "/ueber-uns"]) {
      await page.goto(path);
      await expect(page.locator("iframe")).toHaveCount(0);
    }
  });
});

test.describe("legal pages while drafts", () => {
  for (const path of ["/impressum", "/datenschutz", "/teilnahmebedingungen"]) {
    test(`${path} says it is a draft and is not indexed`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("note")).toContainText("Entwurf – noch nicht rechtlich geprüft.");
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    });
  }

  test("Teilnahmebedingungen take the trial terms from the course run", async ({ page }) => {
    await page.goto("/teilnahmebedingungen");
    await expect(page.getByRole("main")).toContainText("Die Probestunde kostet 25 €.");
  });
});

test("So lernen Kinder keeps the plan's order and leaves out competence domains", async ({ page }) => {
  await page.goto("/so-lernen-kinder");
  await expect(page.locator("main h2")).toHaveText([
    "Ein aufbauender Lernweg in zwei Stufen",
    "Unser Lernweg: Build · Think · Control · Automate · Innovate",
    "So läuft eine Unterrichtseinheit ab",
    "Individuelle Herausforderungen",
    "Unsere pädagogischen Leitprinzipien",
    "Womit wir arbeiten",
  ]);
  await expect(page.getByRole("main")).not.toContainText("Kompetenzbereiche");
});

test("Kooperationen shows only confirmed offers and relationships", async ({ page }) => {
  await page.goto("/kooperationen");
  const main = page.getByRole("main");
  await expect(main).not.toContainText("Ferienprogramme");
  await expect(main).not.toContainText("Maker Space");
  await expect(main).not.toContainText("DFRobot");
  await expect(main).toContainText("KI & intelligente Systeme(Aufbauinhalte)");
  await expect(main.getByRole("link", { name: "Kooperation anfragen" })).toHaveAttribute(
    "href",
    "/kontakt?anliegen=kooperation",
  );
});

test("Über uns has no association section and no unconfirmed advisers", async ({ page }) => {
  await page.goto("/ueber-uns");
  const main = page.getByRole("main");
  await expect(main).not.toContainText("Der Verein");
  await expect(main).not.toContainText("Fachliche Begleitung");
});

test("Wettbewerbsteams is marked as planned with an interest button", async ({ page }) => {
  await page.goto("/kurse/wettbewerbsteams");
  await expect(page.getByRole("main")).toContainText("In Planung – Frühjahr 2027");
  await expect(page.getByRole("main").getByRole("link", { name: "Interesse vormerken" })).toHaveAttribute(
    "href",
    /^\/kontakt\?anliegen=/,
  );
});

test("event pages use a plain map link and a status label", async ({ page }) => {
  await page.goto("/aktuelles");
  const links = await page
    .locator("main a[href^='/aktuelles/']")
    .evaluateAll((a) => a.map((l) => l.getAttribute("href")!));
  test.skip(links.length === 0, "no visible events on this build date");
  for (const href of links) {
    await page.goto(href);
    await expect(page.getByText(/^(Demnächst|Rückblick)$/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Karte öffnen" })).toHaveAttribute("href", /^https:\/\//);
    await expect(page.locator("iframe")).toHaveCount(0);
  }
});
