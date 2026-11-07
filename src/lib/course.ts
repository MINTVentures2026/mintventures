// View helpers for course runs: turn the CourseRun data into the strings the pages show.

import type { Run } from "@/content/schemas";
import { formatDate } from "@/lib/dates";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export const formatEuro = (amount: number) => euro.format(amount);

export const totalHours = (run: Pick<Run, "dates" | "sessionMinutes">) => (run.dates.length * run.sessionMinutes) / 60;

export const formatPeriod = (run: Pick<Run, "dates">) =>
  `${formatDate(run.dates[0])} – ${formatDate(run.dates.at(-1)!)}`;

export const formatSlot = (slot: Run["timeSlots"][number]) => `${slot.label}: ${slot.start}–${slot.end} Uhr`;

/** Fee left to pay after a credited trial lesson; null when the trial is not credited. */
export const remainingAfterTrial = (run: Pick<Run, "fee" | "trial">) =>
  run.trial?.credited ? run.fee.amount - run.trial.price : null;

export type DateRow = { kind: "date"; date: string; label: string } | { kind: "break"; label: string };

/** Course dates grouped by month, with holiday breaks as their own rows (plan: "Termine" table). */
export function datesByMonth(run: Pick<Run, "dates" | "breaks">): { month: string; rows: DateRow[] }[] {
  const groups: { month: string; rows: DateRow[] }[] = [];
  for (const date of run.dates) {
    const month = formatDate(date.slice(0, 7), "month");
    if (groups.at(-1)?.month !== month) groups.push({ month, rows: [] });
    const rows = groups.at(-1)!.rows;
    rows.push({ kind: "date", date, label: formatDate(date, "weekday") });
    for (const b of run.breaks.filter((b) => b.after === date)) rows.push({ kind: "break", label: b.label });
  }
  return groups;
}
