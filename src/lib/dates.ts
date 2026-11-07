// Calendar dates for course runs and events, always in Europe/Berlin.
//
// Dates are stored as strings, never as Date objects, so a build server in another
// time zone cannot shift them:
//   "2026-06"           month precision (past events where only the month is known)
//   "2026-11-07"        day precision
//   "2026-11-07T14:00"  day + local start time
// ISO strings of the same shape compare correctly with < and >.

export const TIME_ZONE = "Europe/Berlin";

const PATTERN = /^(\d{4})-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}))?)?$/;

export type Precision = "month" | "day" | "time";

export interface LocalDateTime {
  year: number;
  month: number;
  day?: number;
  time?: string;
  precision: Precision;
}

export function parseLocal(value: string): LocalDateTime {
  const m = PATTERN.exec(value);
  if (!m) throw new Error(`Invalid date "${value}": expected YYYY-MM, YYYY-MM-DD or YYYY-MM-DDTHH:mm`);
  const [, y, mo, d, hh, mm] = m;
  const year = Number(y);
  const month = Number(mo);
  if (month < 1 || month > 12) throw new Error(`Invalid month in "${value}"`);
  if (d === undefined) return { year, month, precision: "month" };

  const day = Number(d);
  if (day < 1 || day > daysInMonth(year, month)) throw new Error(`Invalid day in "${value}"`);
  if (hh === undefined) return { year, month, day, precision: "day" };

  if (Number(hh) > 23 || Number(mm) > 59) throw new Error(`Invalid time in "${value}"`);
  return { year, month, day, time: `${hh}:${mm}`, precision: "time" };
}

export function isValidLocal(value: string): boolean {
  try {
    parseLocal(value);
    return true;
  } catch {
    return false;
  }
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

const pad = (n: number) => String(n).padStart(2, "0");

/** First calendar day covered by the value, as YYYY-MM-DD. */
export function firstDay(value: string): string {
  const { year, month, day } = parseLocal(value);
  return `${year}-${pad(month)}-${pad(day ?? 1)}`;
}

/** Last calendar day covered by the value, as YYYY-MM-DD ("2026-06" → "2026-06-30"). */
export function lastDay(value: string): string {
  const { year, month, day } = parseLocal(value);
  return `${year}-${pad(month)}-${pad(day ?? daysInMonth(year, month))}`;
}

/** Today's date in Berlin as YYYY-MM-DD. */
export function berlinToday(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
}

/** ISO weekday of a YYYY-MM-DD date: 1 = Monday … 7 = Sunday. */
export function isoWeekday(date: string): number {
  const { year, month, day } = parseLocal(date);
  return new Date(Date.UTC(year, month - 1, day ?? 1)).getUTCDay() || 7;
}

// Formatting runs on UTC so the calendar date never shifts with the server's time zone.
const asUtc = ({ year, month, day }: LocalDateTime) => new Date(Date.UTC(year, month - 1, day ?? 1));
const de = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("de-DE", { ...options, timeZone: "UTC" });

const formatters = {
  month: de({ month: "long", year: "numeric" }), // "Juni 2026"
  short: de({ day: "2-digit", month: "2-digit", year: "numeric" }), // "07.11.2026"
  long: de({ weekday: "long", day: "numeric", month: "long", year: "numeric" }), // "Samstag, 7. November 2026"
  weekday: de({ weekday: "short", day: "2-digit", month: "2-digit" }), // "Sa., 07.11."
};

/** Human German date that never claims more precision than the data has. */
export function formatDate(value: string, style: keyof typeof formatters = "short"): string {
  const parsed = parseLocal(value);
  if (parsed.precision === "month") return formatters.month.format(asUtc(parsed));
  const formatted = formatters[style].format(asUtc(parsed));
  return parsed.time && style === "long" ? `${formatted}, ${parsed.time} Uhr` : formatted;
}
