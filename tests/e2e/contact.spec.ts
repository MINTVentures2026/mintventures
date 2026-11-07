import { expect, test, type Page } from "@playwright/test";

// The enquiry form (plan Phase 3). The test server prints mails instead of sending them.

const fillParent = async (page: Page) => {
  await page.getByLabel(/Ihr Name/).fill("Eva Muster");
  await page.getByLabel(/^E-Mail/).fill("eva@example.org");
};

test("?anliegen= preselects the Anliegen", async ({ page }) => {
  await page.goto("/kontakt?anliegen=probestunde");
  await expect(page.getByRole("radio", { name: "Probestunde" })).toBeChecked();
});

test("child fields appear only for Probestunde and Kursplatz", async ({ page }) => {
  await page.goto("/kontakt");
  const age = page.getByLabel(/Alter und Klasse/);
  const school = page.getByLabel(/Schule \/ Einrichtung/);
  await expect(age).toBeHidden();
  await page.getByText("Kursplatz", { exact: true }).click();
  await expect(age).toBeVisible();
  await expect(school).toBeHidden();
  await page.getByText("Kooperation (Schule/Institution)").click();
  await expect(age).toBeHidden();
  await expect(school).toBeVisible();
});

test("course times come from the current run", async ({ page }) => {
  await page.goto("/kontakt?anliegen=kursplatz");
  await expect(page.getByLabel(/Bevorzugte Kurszeit/).locator("option")).toHaveText([
    "Bitte wählen",
    "Kurs 1 (14:00–15:30 Uhr)",
    "Kurs 2 (15:45–17:15 Uhr)",
    "egal",
  ]);
});

test("a complete enquiry leads to the confirmation page", async ({ page }) => {
  await page.goto("/kontakt?anliegen=probestunde");
  await fillParent(page);
  await page.getByLabel(/Alter und Klasse/).fill("9 Jahre, 4. Klasse");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page).toHaveURL(/\/kontakt\/danke$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ihre Anfrage ist bei uns angekommen");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the form still submits (plain POST)", async ({ page }) => {
    await page.goto("/kontakt?anliegen=kooperation");
    await fillParent(page);
    await page.getByLabel(/Schule \/ Einrichtung/).fill("GGS Beispiel");
    await page.getByRole("button", { name: "Anfrage senden" }).click();
    await expect(page).toHaveURL(/\/kontakt\/danke$/);
  });

  test("server-side errors are listed and the input is kept", async ({ page }) => {
    await page.goto("/kontakt?anliegen=kursplatz");
    await fillParent(page);
    // Age/class is required only for course enquiries, so only the server can enforce it.
    await page.getByRole("button", { name: "Anfrage senden" }).click();
    const alert = page.getByRole("alert");
    await expect(alert).toContainText("Bitte nennen Sie Alter und Klasse Ihres Kindes.");
    await expect(page.getByLabel(/Ihr Name/)).toHaveValue("Eva Muster");
    await expect(page.getByLabel(/Alter und Klasse/)).toHaveAttribute("aria-invalid", "true");
  });
});

test("the confirmation page is not indexed", async ({ page }) => {
  await page.goto("/kontakt/danke");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
});
