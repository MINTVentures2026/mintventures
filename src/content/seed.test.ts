import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseDocument } from "yaml";
import { achievement, event, faq, organization, person, product, run } from "@/content/schemas";
import { firstDay } from "@/lib/dates";
import { runStatus } from "@/lib/status";

// Validates the committed seed data with the same schemas the build uses, plus the
// cross-references and the confirmed facts from plan §4.2.

const root = new URL(".", import.meta.url).pathname;

// Same options as Astro's YAML loader (@astrojs/internal-helpers/yaml).
const parseYaml = (source: string) =>
  parseDocument(source, { customTags: ["timestamp"], merge: true, schema: "core" }).toJS();

function load<T>(dir: string, schema: { parse: (v: unknown) => T }): Record<string, T> {
  const files = readdirSync(join(root, dir)).filter((f) => f.endsWith(".yaml"));
  return Object.fromEntries(
    files.map((f) => {
      const raw = readFileSync(join(root, dir, f), "utf8");
      try {
        return [basename(f, ".yaml"), schema.parse(parseYaml(raw))];
      } catch (error) {
        throw new Error(`${dir}/${f}: ${error}`, { cause: error });
      }
    }),
  );
}

const products = load("products", product);
const runs = load("runs", run);
const events = load("events", event);
const people = load("people", person);
const organizations = load("organizations", organization);
const achievements = load("achievements", achievement);
const faqs = load("faqs", faq);

const allRawText = ["products", "runs", "events", "people", "organizations", "achievements", "faqs"]
  .flatMap((dir) =>
    readdirSync(join(root, dir))
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => readFileSync(join(root, dir, f), "utf8")),
  )
  .join("\n");

describe("seed data validates", () => {
  it("has the three product families", () => {
    expect(Object.keys(products).sort()).toEqual([
      "robotik-wochenendkurs",
      "wettbewerbsteams",
      "workshops-feriencamps",
    ]);
  });

  it("has no people until the owner confirms public identities", () => {
    expect(Object.keys(people)).toEqual([]);
  });

  it("has ten parent FAQs", () => {
    expect(Object.values(faqs).filter((f) => f.category === "eltern")).toHaveLength(10);
  });
});

describe("cross-references", () => {
  it("every run points to an existing product", () => {
    expect(
      Object.values(runs)
        .map((r) => r.product)
        .filter((id) => !products[id]),
    ).toEqual([]);
  });

  it("every event product link exists", () => {
    const ids = Object.values(events).flatMap((e) => (e.product ? [e.product] : []));
    expect(ids.filter((id) => !products[id])).toEqual([]);
  });

  it("every event partner is an organization", () => {
    const ids = Object.values(events).flatMap((e) => e.partners);
    expect(ids.filter((id) => !organizations[id])).toEqual([]);
  });

  it("every achievement event exists", () => {
    const ids = Object.values(achievements).flatMap((a) => (a.event ? [a.event] : []));
    expect(ids.filter((id) => !events[id])).toEqual([]);
  });

  it("a verified achievement never points to an unverified event", () => {
    const broken = Object.entries(achievements).filter(([, a]) => a.verified && a.event && !events[a.event].verified);
    expect(broken.map(([id]) => id)).toEqual([]);
  });
});

describe("current cohort matches plan §4.2", () => {
  const cohort = runs["grundlagen-2026-27"];

  it("is Stufe 1 of the Robotik-Wochenendkurs", () => {
    expect([cohort.product, cohort.title]).toEqual([
      "robotik-wochenendkurs",
      "Grundlagen der Robotik und Programmierung",
    ]);
  });

  it("has exactly the 12 explicit dates", () => {
    expect(cohort.dates).toEqual([
      "2026-11-07",
      "2026-11-14",
      "2026-11-21",
      "2026-11-28",
      "2026-12-05",
      "2026-12-12",
      "2026-12-19",
      "2027-01-09",
      "2027-01-16",
      "2027-01-23",
      "2027-01-30",
      "2027-02-06",
    ]);
  });

  it("adds up to 18 hours", () => {
    expect((cohort.dates.length * cohort.sessionMinutes) / 60).toBe(18);
  });

  it("marks the Christmas break after 19.12.", () => {
    expect(cohort.breaks).toEqual([{ after: "2026-12-19", label: "Weihnachtsferien – kein Unterricht" }]);
  });

  it("has both Saturday slots", () => {
    expect(cohort.timeSlots.map((s) => `${s.start}–${s.end}`)).toEqual(["14:00–15:30", "15:45–17:15"]);
  });

  it("costs 349 € (Einführungspreis)", () => {
    expect(cohort.fee).toEqual({ amount: 349, note: "Einführungspreis" });
  });

  it("has a 25 € trial on 07.11.2026, credited and not refunded", () => {
    expect(cohort.trial).toEqual({ date: "2026-11-07", price: 25, credited: true, refundable: false });
  });

  it("takes at most 10 children per group", () => {
    expect(cohort.capacityPerGroup).toBe(10);
  });

  it("is held in Sankt Augustin, not Bad Godesberg", () => {
    expect(cohort.venue.name).toMatch(/Sankt Augustin/);
  });

  it("has no unconfirmed status (open decision #1)", () => {
    expect([cohort.registration, cohort.lateEntry]).toEqual([null, null]);
  });

  it("is 'laeuft' on the day this seed was written", () => {
    expect(runStatus(cohort, "2026-11-07")).toBe("laeuft");
  });
});

describe("unconfirmed items stay hidden (plan §7)", () => {
  it.each([
    ["events", "zdi-roboterwettbewerb-team-explorers", events],
    ["events", "roboternacht-h-brs-2026", events],
    ["events", "code-week-auftakt-h-brs-2026", events],
    ["achievements", "zdi-roboterwettbewerb-2026", achievements],
    ["achievements", "roboternacht-h-brs-2026", achievements],
    ["achievements", "code-week-auftakt-2026", achievements],
    ["organizations", "maker-space", organizations],
    ["organizations", "dfrobot", organizations],
  ] as const)("%s/%s is not verified", (_, id, collection) => {
    expect((collection as Record<string, { verified: boolean }>)[id].verified).toBe(false);
  });

  it("the Code Week workshop has no end time (open decision #9)", () => {
    expect(events["code-week-mission-smart-city-2026"].end).toBeUndefined();
  });

  it("planned products carry an expected period", () => {
    expect(products.wettbewerbsteams).toMatchObject({ status: "in-planung", expectedPeriod: "Frühjahr 2027" });
  });

  it("past events without a confirmed day keep month precision", () => {
    expect(firstDay(events["digital-at-school-campus-bonn-2026"].start)).toBe("2026-06-01");
  });
});

describe("banned content (plan §1 rules 2–3)", () => {
  it.each([
    "Robotik & Programmieren – Grundlagenkurs",
    "Weekend Academy",
    "Wochenendakademie",
    "Robotics & Coding Foundations",
    "Entdecker",
    "Erfinder-Stufe",
    "Tüftler",
    "Challenge-Stufe",
    "kostenlose Probestunde",
    "Kursstart ab November",
    "18 Unterrichtsstunden",
    "gemeinnützig",
    "e.V.",
    "Beirat",
    "strategischer Partner",
  ])("seed data never says %s", (term) => {
    expect(allRawText.toLowerCase()).not.toContain(term.toLowerCase());
  });
});

describe("schemas reject bad data", () => {
  const validRun = runs["grundlagen-2026-27"];

  it("rejects a date that is not on the run's weekday", () => {
    expect(run.safeParse({ ...validRun, dates: ["2026-11-07", "2026-11-15"] }).success).toBe(false);
  });

  it("rejects dates out of order", () => {
    expect(run.safeParse({ ...validRun, dates: ["2026-11-14", "2026-11-07"] }).success).toBe(false);
  });

  it("rejects a break after the last date", () => {
    expect(run.safeParse({ ...validRun, breaks: [{ after: "2027-02-06", label: "x" }] }).success).toBe(false);
  });

  it("rejects 'offizieller Partner' in a relationship line", () => {
    const org = { name: "X", category: "sonstiges", relationshipLine: "Offizieller Partner von MINT Ventures" };
    expect(organization.safeParse(org).success).toBe(false);
  });

  it("defaults new entries to unverified", () => {
    expect(achievement.parse({ title: "X", date: "2027-01", resultLine: "Y" }).verified).toBe(false);
  });

  it("accepts unquoted YAML dates", () => {
    expect(achievement.parse(parseYaml("title: X\ndate: 2026-10-25\nresultLine: Y")).date).toBe("2026-10-25");
  });

  it("rejects a planned product without an expected period", () => {
    expect(product.safeParse({ ...products.wettbewerbsteams, expectedPeriod: undefined }).success).toBe(false);
  });
});
