// Content model (plan §5). Shared by content.config.ts (build) and the seed tests.
//
// Fail-safe defaults: every entity is `verified: false` unless the data says otherwise,
// and unverified entries are never rendered (see isPublic in lib/status.ts).

import { z } from "astro/zod";
import { isoWeekday, isValidLocal, parseLocal } from "@/lib/dates";

// YAML turns unquoted 2026-11-07 into a Date (UTC midnight). Normalise back to a string.
const fromYamlDate = (value: unknown) => {
  if (!(value instanceof Date)) return value;
  const iso = value.toISOString();
  return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso.slice(0, 16);
};

/** "YYYY-MM", "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm", Europe/Berlin local time. */
export const localDate = z.preprocess(
  fromYamlDate,
  z.string().refine(isValidLocal, "Use YYYY-MM, YYYY-MM-DD or YYYY-MM-DDTHH:mm"),
);

/** Exactly one calendar day: "YYYY-MM-DD". */
export const day = z.preprocess(
  fromYamlDate,
  z.string().refine((v) => isValidLocal(v) && parseLocal(v).precision === "day", "Use YYYY-MM-DD"),
);

const clock = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:mm");

const flags = {
  published: z.boolean().default(true),
  verified: z.boolean().default(false),
};

const ageRange = z
  .object({ min: z.number().int().positive(), max: z.number().int().positive() })
  .refine((r) => r.min <= r.max, "min must not exceed max");

const seo = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  h1: z.string().min(1),
});

/** Pages that render FAQs (plan §5: FAQ.pages). */
export const faqPages = [
  "robotik-wochenendkurs",
  "wettbewerbsteams",
  "workshops-feriencamps",
  "kooperationen",
  "kontakt",
] as const;

// --- CourseProduct ---------------------------------------------------------------

const stage = z.object({
  label: z.string(), // "Stufe 1 · Grundlagen"
  name: z.string(), // binding product name, plan §4.1
  status: z.enum(["bestaetigt", "in-planung"]),
  expectedPeriod: z.string().optional(),
  format: z.string().optional(),
  modules: z.array(z.object({ title: z.string(), topics: z.string() })).default([]),
});

export const product = z
  .object({
    name: z.string(),
    summary: z.string(),
    ageRange: ageRange.optional(),
    format: z.string(),
    platform: z.string().optional(),
    stages: z.array(stage).min(1),
    status: z.enum(["angeboten", "in-planung"]),
    expectedPeriod: z.string().optional(),
    // Next run that is not yet scheduled (open decision #17): shown as "In Planung".
    nextRun: z.object({ period: z.string() }).optional(),
    image: z.string().optional(),
    order: z.number().int(),
    seo,
    ...flags,
  })
  .refine((p) => p.status !== "in-planung" || p.expectedPeriod, {
    message: "A planned product needs expectedPeriod",
    path: ["expectedPeriod"],
  });

// --- CourseRun ---------------------------------------------------------------------

export const registrationStatus = z.enum(["anmeldung-offen", "wenige-plaetze", "ausgebucht"]);

export const run = z
  .object({
    product: z.string(), // CourseProduct id (file name)
    title: z.string(),
    // Explicit dates only; never generated from "every Saturday" (plan §4.2).
    dates: z.array(day).min(1),
    breaks: z.array(z.object({ after: day, label: z.string() })).default([]),
    weekday: z.number().int().min(1).max(7),
    timeSlots: z.array(z.object({ label: z.string(), start: clock, end: clock })).min(1),
    sessionMinutes: z.number().int().positive(),
    venue: z.object({ name: z.string(), short: z.string(), address: z.string().optional() }),
    fee: z.object({ amount: z.number().nonnegative(), note: z.string().optional() }),
    trial: z
      .object({
        date: day,
        price: z.number().nonnegative(),
        credited: z.boolean(),
        refundable: z.boolean(),
      })
      .optional(),
    ageRange,
    grouping: z.string(),
    capacityPerGroup: z.number().int().positive(),
    supervision: z.string(),
    equipment: z.string(),
    // Manual status. null = not confirmed by the owner (open decision #1).
    registration: registrationStatus.nullable().default(null),
    // Late entry into the running cohort (open decision #1). null = unknown → treated as no.
    lateEntry: z.boolean().nullable().default(null),
    featured: z.boolean().default(false),
    ...flags,
  })
  .superRefine((r, ctx) => {
    r.dates.forEach((d, i) => {
      if (i > 0 && d <= r.dates[i - 1]) {
        ctx.addIssue({ code: "custom", path: ["dates", i], message: `${d} is not after ${r.dates[i - 1]}` });
      }
      if (isoWeekday(d) !== r.weekday) {
        ctx.addIssue({ code: "custom", path: ["dates", i], message: `${d} is not on weekday ${r.weekday}` });
      }
    });
    r.breaks.forEach((b, i) => {
      if (!r.dates.includes(b.after) || b.after === r.dates.at(-1)) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", i, "after"],
          message: "Must be a course date other than the last",
        });
      }
    });
    if (r.trial && r.trial.date > r.dates.at(-1)!) {
      ctx.addIssue({ code: "custom", path: ["trial", "date"], message: "Trial lesson after the last course date" });
    }
  });

// --- Event -------------------------------------------------------------------------

export const event = z
  .object({
    title: z.string(),
    kind: z.enum(["workshop", "kursstart", "wettbewerb", "veranstaltung"]),
    start: localDate,
    end: localDate.optional(), // omit while unconfirmed (e.g. open decision #9)
    venue: z.object({ name: z.string(), address: z.string().optional(), mapLink: z.url().optional() }),
    ageRange: ageRange.optional(),
    fee: z.number().nonnegative().optional(), // 0 = kostenlos
    registration: z
      .object({
        method: z.enum(["email", "url", "formular"]),
        email: z.email().optional(),
        url: z.url().optional(),
        deadline: day.optional(),
      })
      .optional(),
    externalLink: z.url().optional(),
    organiserRole: z.string().optional(),
    partners: z.array(z.string()).default([]), // OrganizationRelationship ids
    product: z.string().optional(), // CourseProduct id, for "event → matching course" links
    summary: z.string(), // announcement text, also the opening of the recap
    recap: z.object({ text: z.string(), outcome: z.string().optional(), thanks: z.string().optional() }).optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string().min(1), consentDocumented: z.boolean().default(false) }))
      .default([]),
    seo: z.object({ title: z.string().optional(), description: z.string().optional() }).default({}),
    ...flags,
  })
  .refine((e) => !e.end || e.end >= e.start, { message: "end before start", path: ["end"] });

// --- Person, OrganizationRelationship, Achievement, FAQ --------------------------------

export const person = z.object({
  name: z.string(),
  publicTitle: z.string().optional(),
  role: z.string(),
  bio: z.string().optional(),
  photo: z.string().optional(),
  photoConsent: z.boolean().default(false),
  group: z.enum(["team", "fachliche-begleitung"]),
  order: z.number().int(),
  ...flags,
});

export const organization = z.object({
  name: z.string(),
  category: z.enum(["kursort", "programm", "veranstaltung", "sonstiges"]),
  // Factual, German. Never "offizieller Partner" (plan §5).
  relationshipLine: z.string().refine((s) => !/offizielle[rn]? Partner/i.test(s), "No 'offizieller Partner' claims"),
  evidence: z.string().optional(),
  logoLicence: z.boolean().default(false),
  link: z.url().optional(),
  ...flags,
});

export const achievement = z.object({
  title: z.string(),
  date: localDate,
  resultLine: z.string(),
  event: z.string().optional(), // Event id
  ...flags,
});

export const faq = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.enum(["eltern", "schulen"]),
  pages: z.array(z.enum(faqPages)).min(1),
  order: z.number().int(),
  // Last day the answer is true (e.g. a dated trial lesson). Hidden afterwards.
  validUntil: day.optional(),
  ...flags,
});

export type Product = z.infer<typeof product>;
export type Run = z.infer<typeof run>;
export type Event = z.infer<typeof event>;
export type Person = z.infer<typeof person>;
export type Organization = z.infer<typeof organization>;
export type Achievement = z.infer<typeof achievement>;
export type Faq = z.infer<typeof faq>;
export type RegistrationStatus = z.infer<typeof registrationStatus>;
