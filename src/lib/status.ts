// Status logic (plan §5.1). Pure functions of the data and "today" (YYYY-MM-DD, Berlin),
// so the build derives the same state a parent would expect on that day.
// A daily rebuild (.github/workflows/daily-rebuild.yml) moves states forward without manual action.

import type { EnquiryIntent } from "@/config/enquiry";
import type { Event, Faq, RegistrationStatus, Run } from "@/content/schemas";
import { lastDay } from "@/lib/dates";

interface Flags {
  published: boolean;
  verified: boolean;
}

/** Only published and verified entries are ever rendered (plan §5). */
export const isPublic = (entry: Flags) => entry.published && entry.verified;

// --- Course runs ---------------------------------------------------------------------

/** "unbestaetigt": the owner has not confirmed the registration status yet (decision #1). */
export type RunStatus = RegistrationStatus | "laeuft" | "abgeschlossen" | "unbestaetigt";

type RunState = Pick<Run, "dates" | "registration" | "lateEntry">;

export function runStatus(run: RunState, today: string): RunStatus {
  if (today > run.dates.at(-1)!) return "abgeschlossen";
  if (run.registration === "ausgebucht") return "ausgebucht";
  // From the first course day on, enrolment closes unless late entry is confirmed.
  if (today >= run.dates[0] && run.lateEntry !== true) return "laeuft";
  return run.registration ?? "unbestaetigt";
}

/** Finished runs disappear from the homepage and the product page. */
export const isRunListed = (run: RunState & Flags, today: string) =>
  isPublic(run) && runStatus(run, today) !== "abgeschlossen";

/** The trial-lesson button is shown only while the trial date is still in the future. */
export const isTrialBookable = (run: Pick<Run, "trial">, today: string) => !!run.trial && today < run.trial.date;

export interface StatusDisplay {
  /** Status text; status is never conveyed by colour alone (plan §1 rule 7). null = no badge. */
  label: string | null;
  cta: { label: string; intent: EnquiryIntent } | null;
}

const enquire = { label: "Kursplatz anfragen", intent: "kursplatz" } as const;

export const runStatusDisplay: Record<RunStatus, StatusDisplay> = {
  "anmeldung-offen": { label: "Anmeldung offen", cta: enquire },
  "wenige-plaetze": { label: "Nur noch wenige Plätze", cta: enquire },
  ausgebucht: { label: "Ausgebucht", cta: { label: "Auf die Warteliste", intent: "kursplatz" } },
  // No enrolment button; the page links to the next run instead.
  laeuft: { label: "Kurs läuft", cta: null },
  abgeschlossen: { label: null, cta: null },
  // Unconfirmed status: no claim about availability, but enquiring is always fine.
  unbestaetigt: { label: null, cta: enquire },
};

/** Products or runs that are planned but not bookable. */
export const plannedDisplay = (expectedPeriod?: string): StatusDisplay => ({
  label: expectedPeriod ? `In Planung – ${expectedPeriod}` : "In Planung",
  cta: { label: "Interesse vormerken", intent: "kursplatz" },
});

// --- Events -------------------------------------------------------------------------

export type EventPhase = "demnaechst" | "rueckblick";

type EventDates = Pick<Event, "start" | "end">;

/** An event stays "Demnächst" through its last day and becomes a recap the day after. */
export const eventPhase = (event: EventDates, today: string): EventPhase =>
  today > lastDay(event.end ?? event.start) ? "rueckblick" : "demnaechst";

/** The registration button disappears with the event date or the deadline, whichever is first. */
export function isRegistrationOpen(event: EventDates & Pick<Event, "registration">, today: string): boolean {
  if (!event.registration || eventPhase(event, today) === "rueckblick") return false;
  return !event.registration.deadline || today <= event.registration.deadline;
}

/** Past events are shown only once a recap has been written (plan: hide until the owner supplies it). */
export const isEventVisible = (event: EventDates & Flags & Pick<Event, "recap">, today: string) =>
  isPublic(event) && (eventPhase(event, today) === "demnaechst" || !!event.recap);

/** Photos without documented consent are never published (plan §1 rule 6). */
export const publicGallery = (event: Pick<Event, "gallery">) => event.gallery.filter((p) => p.consentDocumented);

// --- FAQ ----------------------------------------------------------------------------

export const isFaqVisible = (faq: Pick<Faq, "validUntil"> & Flags, today: string) =>
  isPublic(faq) && (!faq.validUntil || today <= faq.validUntil);
