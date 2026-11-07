import { describe, expect, it } from "vitest";
import {
  eventPhase,
  isEventVisible,
  isFaqVisible,
  isPublic,
  isRegistrationOpen,
  isRunListed,
  isTrialBookable,
  plannedDisplay,
  publicGallery,
  runStatus,
  runStatusDisplay,
} from "@/lib/status";

// The real cohort: 07.11.2026 – 06.02.2027 (plan §4.2), trimmed to first/middle/last.
const run = {
  dates: ["2026-11-07", "2026-12-19", "2027-01-09", "2027-02-06"],
  registration: "anmeldung-offen" as const,
  lateEntry: null,
  trial: { date: "2026-11-07", price: 25, credited: true, refundable: false },
  published: true,
  verified: true,
};

const BEFORE = "2026-11-01";
const FIRST_DAY = "2026-11-07";
const DURING = "2026-12-24";
const LAST_DAY = "2027-02-06";
const AFTER = "2027-02-07";

describe("runStatus: date-derived", () => {
  it("is the manual status before the course starts", () => {
    expect(runStatus(run, BEFORE)).toBe("anmeldung-offen");
  });

  it("is 'laeuft' from the first course day", () => {
    expect(runStatus(run, FIRST_DAY)).toBe("laeuft");
  });

  it("is 'laeuft' during the holiday break", () => {
    expect(runStatus(run, DURING)).toBe("laeuft");
  });

  it("is still 'laeuft' on the last course day", () => {
    expect(runStatus(run, LAST_DAY)).toBe("laeuft");
  });

  it("is 'abgeschlossen' the day after the last date", () => {
    expect(runStatus(run, AFTER)).toBe("abgeschlossen");
  });
});

describe("runStatus: manual overrides", () => {
  it("shows 'wenige-plaetze' before the start", () => {
    expect(runStatus({ ...run, registration: "wenige-plaetze" }, BEFORE)).toBe("wenige-plaetze");
  });

  it("'ausgebucht' overrides 'laeuft'", () => {
    expect(runStatus({ ...run, registration: "ausgebucht" }, DURING)).toBe("ausgebucht");
  });

  it("'ausgebucht' does not override 'abgeschlossen'", () => {
    expect(runStatus({ ...run, registration: "ausgebucht" }, AFTER)).toBe("abgeschlossen");
  });

  it("confirmed late entry keeps the manual status while the course runs", () => {
    expect(runStatus({ ...run, lateEntry: true }, DURING)).toBe("anmeldung-offen");
  });

  it("unconfirmed late entry (null) is treated as no late entry", () => {
    expect(runStatus({ ...run, lateEntry: null }, DURING)).toBe("laeuft");
  });

  it("is 'unbestaetigt' before the start when the owner has not set a status", () => {
    expect(runStatus({ ...run, registration: null }, BEFORE)).toBe("unbestaetigt");
  });
});

describe("runStatusDisplay (plan §5.1)", () => {
  it("'laeuft' has no enrolment button", () => {
    expect(runStatusDisplay.laeuft).toEqual({ label: "Kurs läuft", cta: null });
  });

  it("'ausgebucht' offers the waiting list", () => {
    expect(runStatusDisplay.ausgebucht.cta?.label).toBe("Auf die Warteliste");
  });

  it("'unbestaetigt' makes no availability claim", () => {
    expect(runStatusDisplay.unbestaetigt.label).toBeNull();
  });

  it("every status that shows a button also shows text, except 'unbestaetigt'", () => {
    const silent = Object.entries(runStatusDisplay).filter(([, d]) => d.cta && !d.label);
    expect(silent.map(([status]) => status)).toEqual(["unbestaetigt"]);
  });

  it("planned items say 'In Planung' with the expected period", () => {
    expect(plannedDisplay("Frühjahr 2027")).toEqual({
      label: "In Planung – Frühjahr 2027",
      cta: { label: "Interesse vormerken", intent: "kursplatz" },
    });
  });
});

describe("isRunListed", () => {
  it("lists a running course", () => {
    expect(isRunListed(run, DURING)).toBe(true);
  });

  it("hides a finished course", () => {
    expect(isRunListed(run, AFTER)).toBe(false);
  });

  it("hides an unverified course", () => {
    expect(isRunListed({ ...run, verified: false }, BEFORE)).toBe(false);
  });
});

describe("isTrialBookable", () => {
  it("is bookable the day before the trial", () => {
    expect(isTrialBookable(run, "2026-11-06")).toBe(true);
  });

  it("is not bookable on the trial day itself", () => {
    expect(isTrialBookable(run, "2026-11-07")).toBe(false);
  });

  it("is not bookable without a trial", () => {
    expect(isTrialBookable({ trial: undefined }, BEFORE)).toBe(false);
  });
});

const event = {
  start: "2026-10-25T14:00",
  registration: { method: "email" as const, email: "info@mintventures.de" },
  recap: undefined as { text: string } | undefined,
  published: true,
  verified: true,
};

describe("eventPhase", () => {
  it("is 'demnaechst' before the event", () => {
    expect(eventPhase(event, "2026-10-24")).toBe("demnaechst");
  });

  it("is still 'demnaechst' on the event day", () => {
    expect(eventPhase(event, "2026-10-25")).toBe("demnaechst");
  });

  it("is 'rueckblick' the day after", () => {
    expect(eventPhase(event, "2026-10-26")).toBe("rueckblick");
  });

  it("uses the end date for multi-day events", () => {
    expect(eventPhase({ start: "2027-04-06", end: "2027-04-10" }, "2027-04-08")).toBe("demnaechst");
  });

  it("treats a month-only date as lasting the whole month", () => {
    expect(eventPhase({ start: "2026-06" }, "2026-06-30")).toBe("demnaechst");
  });
});

describe("isRegistrationOpen", () => {
  it("is open before the event", () => {
    expect(isRegistrationOpen(event, "2026-10-20")).toBe(true);
  });

  it("closes after the event", () => {
    expect(isRegistrationOpen(event, "2026-10-26")).toBe(false);
  });

  it("closes after the deadline", () => {
    const withDeadline = { ...event, registration: { ...event.registration, deadline: "2026-10-20" } };
    expect(isRegistrationOpen(withDeadline, "2026-10-21")).toBe(false);
  });

  it("is never open without a registration path", () => {
    expect(isRegistrationOpen({ ...event, registration: undefined }, "2026-10-20")).toBe(false);
  });
});

describe("isEventVisible", () => {
  it("shows an upcoming event", () => {
    expect(isEventVisible(event, "2026-10-20")).toBe(true);
  });

  it("hides a past event until a recap is written", () => {
    expect(isEventVisible(event, "2026-11-07")).toBe(false);
  });

  it("shows a past event with a recap", () => {
    expect(isEventVisible({ ...event, recap: { text: "Die Kinder haben …" } }, "2026-11-07")).toBe(true);
  });

  it("hides an unverified event", () => {
    expect(isEventVisible({ ...event, verified: false }, "2026-10-20")).toBe(false);
  });
});

describe("publicGallery", () => {
  it("drops photos without documented consent", () => {
    const gallery = [
      { src: "a.jpg", alt: "A", consentDocumented: true },
      { src: "b.jpg", alt: "B", consentDocumented: false },
    ];
    expect(publicGallery({ gallery }).map((p) => p.src)).toEqual(["a.jpg"]);
  });
});

describe("isPublic / isFaqVisible", () => {
  it("requires both published and verified", () => {
    expect([
      isPublic({ published: true, verified: true }),
      isPublic({ published: true, verified: false }),
      isPublic({ published: false, verified: true }),
    ]).toEqual([true, false, false]);
  });

  it("shows a dated FAQ through its last valid day", () => {
    expect(isFaqVisible({ validUntil: "2026-11-06", published: true, verified: true }, "2026-11-06")).toBe(true);
  });

  it("hides a dated FAQ afterwards", () => {
    expect(isFaqVisible({ validUntil: "2026-11-06", published: true, verified: true }, "2026-11-07")).toBe(false);
  });
});
