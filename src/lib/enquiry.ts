// Enquiry form (plan Phase 3): validation, data minimisation, spam checks and the mail text.
// Pure functions; the /kontakt page wires them to the request and the mailer.

import { createHmac, timingSafeEqual } from "node:crypto";
import { enquiryIntents, type EnquiryIntent } from "@/config/enquiry";

/** Intents that ask for information about the child (only these keep child fields). */
export const childIntents: readonly EnquiryIntent[] = ["probestunde", "kursplatz"];
export const needsChild = (intent: string | undefined) => childIntents.includes(intent as EnquiryIntent);

export const experienceOptions = ["keine", "etwas", "viel"] as const;
export const ANY_TIME = "egal";

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  childFirstName: 50,
  childAgeClass: 60,
  school: 150,
  message: 3000,
} as const;

/** Form field names. The honeypot is named like a field bots love to fill. */
export const FIELDS = {
  intent: "anliegen",
  name: "name",
  email: "email",
  phone: "telefon",
  childFirstName: "kind_vorname",
  childAgeClass: "kind_alter_klasse",
  experience: "vorerfahrung",
  preferredTime: "kurszeit",
  school: "einrichtung",
  message: "nachricht",
  honeypot: "website",
  token: "formular_token",
} as const;

type Field = keyof typeof FIELDS;
export type FormValues = Partial<Record<Field, string>>;

export interface Enquiry {
  intent: EnquiryIntent;
  name: string;
  email: string;
  phone?: string;
  childFirstName?: string;
  childAgeClass?: string;
  experience?: (typeof experienceOptions)[number];
  preferredTime?: string;
  school?: string;
  message?: string;
}

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;
export type ValidationResult = { ok: true; enquiry: Enquiry } | { ok: false; errors: FieldErrors };

// Control characters except tab/newline (kept for the message).
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
const clean = (value: string | undefined) => (value ?? "").replace(CONTROL, "").trim();
const oneLine = (value: string | undefined) => clean(value).replace(/\s+/g, " ");

export function readForm(form: FormData): FormValues {
  const values: FormValues = {};
  for (const [key, name] of Object.entries(FIELDS) as [Field, string][]) {
    const value = form.get(name);
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+()/\s-]{5,}$/;

export function validateEnquiry(values: FormValues, timeOptions: readonly string[]): ValidationResult {
  const errors: FieldErrors = {};
  const intent = clean(values.intent);
  const name = oneLine(values.name);
  const email = clean(values.email);
  const phone = oneLine(values.phone);
  const message = clean(values.message);

  if (!(intent in enquiryIntents)) errors.intent = "Bitte wählen Sie Ihr Anliegen.";
  if (!name) errors.name = "Bitte geben Sie Ihren Namen an.";
  else if (name.length > LIMITS.name) errors.name = `Bitte höchstens ${LIMITS.name} Zeichen.`;
  if (!EMAIL.test(email) || email.length > LIMITS.email)
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an, damit wir antworten können.";
  if (phone && (!PHONE.test(phone) || phone.length > LIMITS.phone))
    errors.phone = "Bitte geben Sie eine gültige Telefonnummer an oder lassen Sie das Feld leer.";
  if (message.length > LIMITS.message) errors.message = `Bitte höchstens ${LIMITS.message} Zeichen.`;

  const enquiry: Enquiry = {
    intent: intent as EnquiryIntent,
    name,
    email,
    ...(phone && { phone }),
    ...(message && { message }),
  };

  // Data minimisation: child details only for course enquiries, school only for cooperation.
  if (needsChild(intent)) {
    const childFirstName = oneLine(values.childFirstName);
    const childAgeClass = oneLine(values.childAgeClass);
    const experience = clean(values.experience);
    const preferredTime = clean(values.preferredTime);

    if (childFirstName.length > LIMITS.childFirstName)
      errors.childFirstName = `Bitte höchstens ${LIMITS.childFirstName} Zeichen.`;
    if (!childAgeClass) errors.childAgeClass = "Bitte nennen Sie Alter und Klasse Ihres Kindes.";
    else if (childAgeClass.length > LIMITS.childAgeClass)
      errors.childAgeClass = `Bitte höchstens ${LIMITS.childAgeClass} Zeichen.`;
    if (experience && !(experienceOptions as readonly string[]).includes(experience))
      errors.experience = "Bitte wählen Sie eine der Angaben.";
    if (preferredTime && preferredTime !== ANY_TIME && !timeOptions.includes(preferredTime))
      errors.preferredTime = "Bitte wählen Sie eine der angebotenen Kurszeiten.";

    Object.assign(enquiry, {
      ...(childFirstName && { childFirstName }),
      childAgeClass,
      ...(experience && { experience }),
      ...(preferredTime && { preferredTime }),
    });
  }

  if (intent === "kooperation") {
    const school = oneLine(values.school);
    if (!school) errors.school = "Bitte nennen Sie Ihre Schule oder Einrichtung.";
    else if (school.length > LIMITS.school) errors.school = `Bitte höchstens ${LIMITS.school} Zeichen.`;
    enquiry.school = school;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, enquiry };
}

// --- Spam protection: honeypot + signed time trap (no reCAPTCHA, plan Phase 3) -----------

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

const sign = (issuedAt: number, secret: string) =>
  createHmac("sha256", secret).update(String(issuedAt)).digest("base64url");

export const issueToken = (now: number, secret: string) => `${now}.${sign(now, secret)}`;

export type SpamCheck = "ok" | "honeypot" | "too-fast" | "expired" | "invalid-token";

export function checkSpam(
  values: Pick<FormValues, "honeypot" | "token">,
  now: number,
  secret: string,
  minSeconds: number,
): SpamCheck {
  if (values.honeypot) return "honeypot";

  const [issued, signature = ""] = (values.token ?? "").split(".");
  const issuedAt = Number(issued);
  const expected = Number.isInteger(issuedAt) ? sign(issuedAt, secret) : "";
  const valid =
    expected.length > 0 &&
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!valid) return "invalid-token";
  if (now - issuedAt < minSeconds * 1000) return "too-fast";
  if (now - issuedAt > MAX_AGE_MS) return "expired";
  return "ok";
}

// --- Mail ------------------------------------------------------------------------------

const experienceLabels: Record<(typeof experienceOptions)[number], string> = {
  keine: "keine",
  etwas: "etwas",
  viel: "viel",
};

/** Plain-text mail. User input never goes into a header except the validated Reply-To. */
export function formatMail(e: Enquiry): { subject: string; text: string } {
  const lines: [string, string | undefined][] = [
    ["Anliegen", enquiryIntents[e.intent]],
    ["Name", e.name],
    ["E-Mail", e.email],
    ["Telefon", e.phone],
    ["Vorname des Kindes", e.childFirstName],
    ["Alter und Klasse", e.childAgeClass],
    ["Vorerfahrung", e.experience && experienceLabels[e.experience]],
    ["Bevorzugte Kurszeit", e.preferredTime],
    ["Schule / Einrichtung", e.school],
  ];
  const body = lines
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    subject: `Website-Anfrage: ${enquiryIntents[e.intent]}`,
    text: `${body}\n\nNachricht:\n${e.message ?? "(keine)"}\n\n-- \nGesendet über das Kontaktformular auf mintventures.de`,
  };
}
