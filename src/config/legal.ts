// Legal page data. Taken over from the previous website's Impressum (live until Nov 2026).
// Open owner decision #3: the operator changes after the e.V./GmbH formation.
// While `confirmed` is false, the legal pages show a draft notice and are not indexed.

export const legal = {
  confirmed: false,
  operator: {
    name: "MINT Ventures",
    owner: "Dr. Weihong Zhao",
    street: "Elsa-Brandström-Straße 13",
    city: "53757 Sankt Augustin",
    country: "Deutschland",
  },
  // Lead supervisory authority for a business in NRW.
  authority: {
    name: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)",
    link: "https://www.ldi.nrw.de",
  },
} as const;
