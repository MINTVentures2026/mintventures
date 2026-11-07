import { describe, expect, it } from "vitest";
import { formatFee, mapLink, registrationHref } from "@/lib/event";

describe("mapLink", () => {
  it("prefers the stored link", () => {
    expect(mapLink({ name: "X", mapLink: "https://example.org/map" })).toBe("https://example.org/map");
  });

  it("searches OpenStreetMap for the address", () => {
    expect(mapLink({ name: "Ort der Begegnung", address: "Am Fronhof 10, Bonn" })).toBe(
      "https://www.openstreetmap.org/search?query=Am%20Fronhof%2010%2C%20Bonn",
    );
  });

  it("falls back to the venue name", () => {
    expect(mapLink({ name: "Hochschule Bonn-Rhein-Sieg" })).toContain("Hochschule%20Bonn-Rhein-Sieg");
  });
});

describe("registrationHref", () => {
  it("builds a mailto link with the event title as subject", () => {
    const href = registrationHref({
      title: "Mission Smart City",
      registration: { method: "email", email: "info@mintventures.de" },
    });
    expect(href).toBe("mailto:info@mintventures.de?subject=Anmeldung%3A%20Mission%20Smart%20City");
  });

  it("uses the contact form for 'formular'", () => {
    expect(registrationHref({ title: "X", registration: { method: "formular" } })).toBe("/kontakt?anliegen=kursplatz");
  });

  it("returns null without a registration path", () => {
    expect(registrationHref({ title: "X" })).toBeNull();
  });

  it("returns null for an e-mail registration without an address", () => {
    expect(registrationHref({ title: "X", registration: { method: "email" } })).toBeNull();
  });
});

describe("formatFee", () => {
  it.each([
    [0, "kostenlos"],
    [25, "25 €"],
    [undefined, null],
  ])("%s → %s", (fee, expected) => {
    expect(formatFee(fee)).toBe(expected);
  });
});
