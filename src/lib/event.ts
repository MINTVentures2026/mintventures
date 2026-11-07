// View helpers for event pages.

import { enquiryHref } from "@/config/enquiry";
import type { Event } from "@/content/schemas";

/** Plain map link (plan: no embed). Uses the stored link, else an OpenStreetMap search. */
export function mapLink(venue: Event["venue"]): string {
  if (venue.mapLink) return venue.mapLink;
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(venue.address ?? venue.name)}`;
}

/** Where the "Jetzt anmelden" button points; null if the event has no registration path. */
export function registrationHref(event: Pick<Event, "registration" | "title">): string | null {
  const reg = event.registration;
  if (!reg) return null;
  if (reg.method === "email" && reg.email)
    return `mailto:${reg.email}?subject=${encodeURIComponent(`Anmeldung: ${event.title}`)}`;
  if (reg.method === "url" && reg.url) return reg.url;
  if (reg.method === "formular") return enquiryHref("kursplatz");
  return null;
}

export const formatFee = (fee: number | undefined) => (fee === undefined ? null : fee === 0 ? "kostenlos" : `${fee} €`);
