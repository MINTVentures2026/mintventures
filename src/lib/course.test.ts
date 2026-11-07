import { describe, expect, it } from "vitest";
import { datesByMonth, formatEuro, formatPeriod, formatSlot, remainingAfterTrial, totalHours } from "@/lib/course";

const run = {
  dates: ["2026-11-07", "2026-11-14", "2026-12-19", "2027-01-09"],
  breaks: [{ after: "2026-12-19", label: "Weihnachtsferien – kein Unterricht" }],
  sessionMinutes: 90,
  fee: { amount: 349, note: "Einführungspreis" },
  trial: { date: "2026-11-07", price: 25, credited: true, refundable: false },
};

describe("course view helpers", () => {
  it("formats euros the German way", () => {
    expect(formatEuro(349)).toBe("349 €");
  });

  it("computes total hours from dates and session length", () => {
    expect(totalHours({ dates: Array(12).fill("2026-11-07"), sessionMinutes: 90 })).toBe(18);
  });

  it("formats the period from first to last date", () => {
    expect(formatPeriod(run)).toBe("07.11.2026 – 09.01.2027");
  });

  it("formats a time slot", () => {
    expect(formatSlot({ label: "Kurs 1", start: "14:00", end: "15:30" })).toBe("Kurs 1: 14:00–15:30 Uhr");
  });

  it("subtracts a credited trial from the fee", () => {
    expect(remainingAfterTrial(run)).toBe(324);
  });

  it("returns null when the trial is not credited", () => {
    expect(remainingAfterTrial({ ...run, trial: { ...run.trial, credited: false } })).toBeNull();
  });
});

describe("datesByMonth", () => {
  const groups = datesByMonth(run);

  it("groups by month in order", () => {
    expect(groups.map((g) => g.month)).toEqual(["November 2026", "Dezember 2026", "Januar 2027"]);
  });

  it("puts the holiday break after its date", () => {
    expect(groups[1].rows).toEqual([
      { kind: "date", date: "2026-12-19", label: "Sa., 19.12." },
      { kind: "break", label: "Weihnachtsferien – kein Unterricht" },
    ]);
  });

  it("keeps every date exactly once", () => {
    const dates = groups.flatMap((g) => g.rows.flatMap((r) => (r.kind === "date" ? [r.date] : [])));
    expect(dates).toEqual(run.dates);
  });
});
