// Anliegen options of the enquiry form (plan Phase 3). The key is used in ?anliegen=…
// (never personal data in URLs) and by status CTAs.

export const enquiryIntents = {
  probestunde: "Probestunde",
  kursplatz: "Kursplatz",
  frage: "Frage zum Kurs",
  kooperation: "Kooperation (Schule/Institution)",
  sonstiges: "Sonstiges",
} as const;

export type EnquiryIntent = keyof typeof enquiryIntents;

export const enquiryHref = (intent: EnquiryIntent) => `/kontakt?anliegen=${intent}`;
