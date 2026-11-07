// Data access for pages: reads the collections and applies the visibility rules.
// Every page gets content only through these functions, so nothing unverified leaks out.

import { getCollection } from "astro:content";
import type { faqPages } from "@/content/schemas";
import { eventPhase, isEventVisible, isFaqVisible, isPublic, isRunListed } from "@/lib/status";

export async function getProducts() {
  const products = await getCollection("products", (p) => isPublic(p.data));
  return products.sort((a, b) => a.data.order - b.data.order);
}

export async function getProduct(id: string) {
  const product = (await getProducts()).find((p) => p.id === id);
  if (!product) throw new Error(`Product "${id}" is missing or not public`);
  return product;
}

/** The run to show for a product: featured first, then the earliest start. Finished runs are gone. */
export async function getCurrentRun(productId: string, today: string) {
  const runs = await getCollection("runs", (r) => r.data.product === productId && isRunListed(r.data, today));
  return runs.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.dates[0].localeCompare(b.data.dates[0]),
  )[0];
}

export async function getListedRuns(today: string) {
  return getCollection("runs", (r) => isRunListed(r.data, today));
}

export async function getFaqs(page: (typeof faqPages)[number], today: string) {
  const faqs = await getCollection("faqs", (f) => f.data.pages.includes(page) && isFaqVisible(f.data, today));
  return faqs.sort((a, b) => a.data.order - b.data.order);
}

export async function getVisibleEvents(today: string) {
  return getCollection("events", (e) => isEventVisible(e.data, today));
}

export async function getUpcomingEvents(today: string, kind?: string) {
  const events = await getVisibleEvents(today);
  return events
    .filter((e) => eventPhase(e.data, today) === "demnaechst" && (!kind || e.data.kind === kind))
    .sort((a, b) => a.data.start.localeCompare(b.data.start));
}

export async function getRecaps(today: string) {
  const events = await getVisibleEvents(today);
  return events
    .filter((e) => eventPhase(e.data, today) === "rueckblick")
    .sort((a, b) => b.data.start.localeCompare(a.data.start));
}

export async function getAchievements() {
  const achievements = await getCollection("achievements", (a) => isPublic(a.data));
  return achievements.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export async function getOrganizations() {
  return getCollection("organizations", (o) => isPublic(o.data));
}

/** Confirmed public identities only (plan §5: Person). */
export async function getPeople(group: "team" | "fachliche-begleitung") {
  const people = await getCollection("people", (p) => p.data.group === group && isPublic(p.data));
  return people.sort((a, b) => a.data.order - b.data.order);
}
