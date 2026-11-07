import { describe, expect, it } from "vitest";
import { checkSpam, formatMail, issueToken, LIMITS, readForm, validateEnquiry, type FormValues } from "@/lib/enquiry";
import { createMailer } from "@/lib/mailer";

const TIMES = ["Kurs 1 (14:00–15:30 Uhr)", "Kurs 2 (15:45–17:15 Uhr)"];

const trial: FormValues = {
  intent: "probestunde",
  name: "Eva Muster",
  email: "eva@example.org",
  childFirstName: "Mia",
  childAgeClass: "9 Jahre, 4. Klasse",
  experience: "etwas",
  preferredTime: TIMES[0],
};

const errorsOf = (values: FormValues) => {
  const result = validateEnquiry(values, TIMES);
  return result.ok ? {} : result.errors;
};

describe("validateEnquiry", () => {
  it("accepts a complete trial enquiry", () => {
    expect(validateEnquiry(trial, TIMES).ok).toBe(true);
  });

  it("requires an Anliegen from the list", () => {
    expect(errorsOf({ ...trial, intent: "werbung" })).toHaveProperty("intent");
  });

  it("requires a name", () => {
    expect(errorsOf({ ...trial, name: "   " })).toHaveProperty("name");
  });

  it("requires a valid e-mail address", () => {
    expect(errorsOf({ ...trial, email: "eva@" })).toHaveProperty("email");
  });

  it("requires age and class for a trial enquiry", () => {
    expect(errorsOf({ ...trial, childAgeClass: "" })).toHaveProperty("childAgeClass");
  });

  it("requires a school for a cooperation enquiry", () => {
    expect(errorsOf({ intent: "kooperation", name: "A", email: "a@b.de" })).toHaveProperty("school");
  });

  it("rejects a course time that is not offered", () => {
    expect(errorsOf({ ...trial, preferredTime: "Kurs 3 (09:00 Uhr)" })).toHaveProperty("preferredTime");
  });

  it("accepts 'egal' as course time", () => {
    expect(validateEnquiry({ ...trial, preferredTime: "egal" }, TIMES).ok).toBe(true);
  });

  it("limits the message length", () => {
    expect(errorsOf({ ...trial, message: "x".repeat(LIMITS.message + 1) })).toHaveProperty("message");
  });

  it("rejects letters in the phone number", () => {
    expect(errorsOf({ ...trial, phone: "call me" })).toHaveProperty("phone");
  });

  it("drops child details for a cooperation enquiry (data minimisation)", () => {
    const result = validateEnquiry({ ...trial, intent: "kooperation", school: "GGS Beispiel" }, TIMES);
    expect(result.ok && [result.enquiry.childFirstName, result.enquiry.childAgeClass]).toEqual([undefined, undefined]);
  });

  it("drops the school for a trial enquiry", () => {
    const result = validateEnquiry({ ...trial, school: "GGS Beispiel" }, TIMES);
    expect(result.ok && result.enquiry.school).toBeUndefined();
  });

  it("strips control characters and collapses whitespace in single-line fields", () => {
    const result = validateEnquiry({ ...trial, name: " Eva\u0007  \n Muster " }, TIMES);
    expect(result.ok && result.enquiry.name).toBe("Eva Muster");
  });
});

describe("readForm", () => {
  it("maps German field names and ignores unknown fields", () => {
    const form = new FormData();
    form.set("anliegen", "frage");
    form.set("nachricht", "Hallo");
    form.set("admin", "1");
    expect(readForm(form)).toEqual({ intent: "frage", message: "Hallo" });
  });
});

describe("checkSpam", () => {
  const SECRET = "test-secret";
  const t0 = Date.UTC(2026, 10, 7, 12);
  const token = issueToken(t0, SECRET);

  it("passes a human-paced submission", () => {
    expect(checkSpam({ token }, t0 + 20_000, SECRET, 3)).toBe("ok");
  });

  it("catches a filled honeypot", () => {
    expect(checkSpam({ token, honeypot: "https://spam.example" }, t0 + 20_000, SECRET, 3)).toBe("honeypot");
  });

  it("catches a submission faster than the minimum", () => {
    expect(checkSpam({ token }, t0 + 1_000, SECRET, 3)).toBe("too-fast");
  });

  it("expires a form left open for more than a day", () => {
    expect(checkSpam({ token }, t0 + 25 * 3600_000, SECRET, 3)).toBe("expired");
  });

  it("rejects a forged timestamp", () => {
    const forged = token.replace(String(t0), String(t0 - 60_000));
    expect(checkSpam({ token: forged }, t0 + 20_000, SECRET, 3)).toBe("invalid-token");
  });

  it("rejects a token signed with another secret", () => {
    expect(checkSpam({ token: issueToken(t0, "other") }, t0 + 20_000, SECRET, 3)).toBe("invalid-token");
  });

  it("rejects a missing token", () => {
    expect(checkSpam({}, t0 + 20_000, SECRET, 3)).toBe("invalid-token");
  });
});

describe("formatMail", () => {
  const result = validateEnquiry({ ...trial, message: "Sie freut sich!" }, TIMES);
  const mail = result.ok ? formatMail(result.enquiry) : null;

  it("puts only the Anliegen in the subject, no user input", () => {
    expect(mail?.subject).toBe("Website-Anfrage: Probestunde");
  });

  it("lists the filled fields", () => {
    expect(mail?.text).toContain("Alter und Klasse: 9 Jahre, 4. Klasse\nVorerfahrung: etwas");
  });

  it("leaves out empty fields", () => {
    expect(mail?.text).not.toContain("Telefon");
  });
});

describe("createMailer", () => {
  const base = { to: "info@mintventures.de", port: 465, allowLog: true } as const;

  it("refuses the log transport in production", () => {
    expect(() => createMailer({ ...base, transport: "log", allowLog: false })).toThrow(/not allowed in production/);
  });

  it("fails fast when SMTP is not configured", () => {
    expect(() => createMailer({ ...base, transport: "smtp" })).toThrow(/SMTP is not configured/);
  });
});
