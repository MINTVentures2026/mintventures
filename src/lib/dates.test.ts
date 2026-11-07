import { describe, expect, it } from "vitest";
import { berlinToday, firstDay, formatDate, isoWeekday, lastDay, parseLocal } from "@/lib/dates";

describe("parseLocal", () => {
  it("detects month precision", () => {
    expect(parseLocal("2026-06").precision).toBe("month");
  });

  it("detects day precision", () => {
    expect(parseLocal("2026-11-07").precision).toBe("day");
  });

  it("keeps the local start time", () => {
    expect(parseLocal("2026-10-25T14:00").time).toBe("14:00");
  });

  it.each(["2026-13", "2026-02-30", "2026-11-07T25:00", "07.11.2026", "2026-11-7"])("rejects %s", (value) => {
    expect(() => parseLocal(value)).toThrow(/Invalid/);
  });
});

describe("day ranges", () => {
  it("a month covers its whole month", () => {
    expect([firstDay("2026-06"), lastDay("2026-06")]).toEqual(["2026-06-01", "2026-06-30"]);
  });

  it("a timed value covers its own day", () => {
    expect(lastDay("2026-10-25T14:00")).toBe("2026-10-25");
  });

  it("handles leap years", () => {
    expect(lastDay("2028-02")).toBe("2028-02-29");
  });
});

describe("berlinToday", () => {
  it("is already the next day in Berlin at 23:30 UTC", () => {
    expect(berlinToday(new Date("2026-11-06T23:30:00Z"))).toBe("2026-11-07");
  });

  it("respects summer time (UTC+2)", () => {
    expect(berlinToday(new Date("2026-06-30T22:30:00Z"))).toBe("2026-07-01");
  });

  it("is still the same day in Berlin at 22:30 UTC in winter (UTC+1)", () => {
    expect(berlinToday(new Date("2026-12-31T22:30:00Z"))).toBe("2026-12-31");
  });
});

describe("isoWeekday", () => {
  it("returns 6 for Saturday 07.11.2026", () => {
    expect(isoWeekday("2026-11-07")).toBe(6);
  });

  it("returns 7 for Sunday 25.10.2026", () => {
    expect(isoWeekday("2026-10-25")).toBe(7);
  });
});

describe("formatDate", () => {
  it("formats short German dates", () => {
    expect(formatDate("2026-11-07")).toBe("07.11.2026");
  });

  it("formats long German dates with weekday", () => {
    expect(formatDate("2026-11-07", "long")).toBe("Samstag, 7. November 2026");
  });

  it("never invents a day for month-only dates", () => {
    expect(formatDate("2026-06", "long")).toBe("Juni 2026");
  });
});
