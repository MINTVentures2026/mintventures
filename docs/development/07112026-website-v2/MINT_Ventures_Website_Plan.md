# MINT Ventures Website 2.0: Implementation Plan

> Handoff for Claude Code. Source: "MINT Ventures Website 2.0 – IT Brief v2.0" (17 Oct 2026, owner Yiwen Zhu, info@mintventures.de). This file replaces the brief for implementation purposes.
>
> **How to work through this plan**
> - Do the phases in order. Stop at the end of each phase, summarise what changed, and wait for review.
> - Anything marked `VERIFY` or `DECIDE` is not confirmed. Build it so it can be switched on later, but **do not render it** until it is confirmed. Never guess. Ask.
> - All website copy is German (parents addressed with "Sie"). Instructions in this file are English. German copy is in the [Content appendix](#content-appendix-german-copy); use it as written.

---

## 1. Project summary

| | |
|---|---|
| Goal | Replace the current single-page JS site (built with Lovable) with a mobile-first, multi-page, crawlable site the owner can edit without code |
| Domain | www.mintventures.de (keep it, keep the Search Console property, 301-redirect any changed URLs) |
| Primary audience | Parents of children aged 8–14, mostly on phones, arriving via flyer QR codes or WhatsApp |
| Secondary audience | Schools, companies, event organisers, education partners |
| Primary conversion | Enquiry for a course place or the paid trial lesson |
| Secondary conversion | School/partnership enquiry |
| Out of scope | Shop, payments, user accounts, "Coming soon" pages, English pages (until full translations exist) |

### Hard rules (apply everywhere)

1. **Truthfulness.** Only publish what is offered now or has actually happened. Planned items carry the label "In Planung". No inflated partnerships, endorsements, credentials, testimonials or claims ("gemeinnützig", "e.V.", "Beirat", "strategischer Partner", background checks) until documented.
2. **Product names.** Use only these names (see §4.1). Banned on German pages: "Robotik & Programmieren – Grundlagenkurs", "Weekend Academy", "Wochenendakademie", "Robotics & Coding Foundations", and the old stage names Entdecker / Erfinder / Tüftler / Challenge-Stufe.
3. **Banned content from the old site:** "kostenlose Probestunde" (the trial costs 25 €), Bad Godesberg as the course venue (it is only an event venue), "Kursstart ab November – Probestunden & Anmeldung auf Anfrage".
4. **Brand spelling:** "MINT Ventures". LEGO® Education SPIKE™ Prime with ® and ™ on first mention per page; never the LEGO logo.
5. **Privacy by default:** no third-party request before consent (no Google Fonts, Maps, reCAPTCHA, YouTube or social embeds, no WhatsApp widget). Self-host everything.
6. **Photos:** only authentic photos with documented consent. No stock or AI images of children, no children's full names, strip EXIF/GPS on upload.
7. Status is conveyed by text, date and button, not by colour alone.

---

## 2. Decisions to make before Phase 1

The brief leaves the tech choice open. Acceptance criteria: content is in the HTML response with JS disabled, and the owner can edit content without code.

| Decision | Default (use unless told otherwise) |
|---|---|
| Framework | Astro (static output) with TypeScript and content collections |
| Owner editing | Git-based CMS with preview (Keystatic or Decap CMS); admin protected with 2FA |
| Hosting | EU-region host with a data processing agreement (AVV) |
| Enquiry form delivery | Serverless function → e-mail to info@mintventures.de via an EU e-mail provider with AVV. Fallback: `mailto:` links with a prefilled subject per Anliegen |
| Analytics | None at launch (avoids a cookie banner). Add later only after reviewing the data flows |
| Nav item "Kooperationen" vs page "Für Schulen" | The brief contradicts itself (see §10). Default: nav label **Kooperationen**, route **/kooperationen**, content from the "Für Schulen" section broadened to schools, companies and event organisers |

---

## 3. Site structure

### 3.1 Routes

| Page | Route | Built from |
|---|---|---|
| Startseite | `/` | fixed sections + automatic modules |
| Kurse (overview) | `/kurse` | fixed + CourseRuns |
| Robotik-Wochenendkurs | `/kurse/robotik-wochenendkurs` | CourseProduct + CourseRun(s); Stufe 2 is a module on this page |
| Wettbewerbsteams | `/kurse/wettbewerbsteams` | CourseProduct (In Planung) |
| Workshops & Feriencamps | `/kurse/workshops-feriencamps` | CourseProduct + linked Events |
| So lernen Kinder | `/so-lernen-kinder` | fixed |
| Aktuelles | `/aktuelles` | Event list ("Demnächst" + "Rückblicke & Projekte") |
| Event page | `/aktuelles/[slug]` | Event |
| Kooperationen | `/kooperationen` | fixed + OrganizationRelationships |
| Über uns | `/ueber-uns` | fixed + Persons + OrganizationRelationships |
| Kontakt | `/kontakt` | form |
| Legal | `/impressum`, `/datenschutz`, `/teilnahmebedingungen` | fixed |
| Kinderschutz | `/kinderschutz` | **do not build until the policy exists** |
| English | `/en/...` | **not now**; keep the routing able to add it later |

Do not create a separate Stufe 2 page, a shop area or any "Coming soon" page.

### 3.2 Header
Logo (→ `/`) · nav: Kurse (dropdown to the 3 product pages), So lernen Kinder, Aktuelles, Kooperationen, Über uns, Kontakt · fixed primary button **"Probestunde anfragen"** (→ `/kontakt?anliegen=probestunde`). No DE | EN switch until English exists.

### 3.3 Mobile action bar (< 768 px, every page)
- Fixed bottom bar, two buttons side by side: "Probestunde anfragen" (primary, → `/kontakt?anliegen=probestunde`) and "WhatsApp" (→ `https://wa.me/4915157596494`, `VERIFY` number).
- Add bottom padding so it never covers content or a cookie banner. Tap targets ≥ 44×44 px, visible focus state, screen-reader labels.

### 3.4 Footer (every page)
- Logo, claim "Kinder gestalten Technologie. Nicht nur konsumieren.", tagline "Coding · Robotik · Zukunftskompetenzen"
- info@mintventures.de · WhatsApp 015157596494 · Kursort: H-BRS Campus Sankt Augustin
- Links: Kurse · Aktuelles · Kooperationen · Über uns · Kontakt
- Legal: Impressum · Datenschutz · Teilnahmebedingungen (Kinderschutz only once it exists; Cookie-Einstellungen only if consent is ever needed)
- © 2026 MINT Ventures · [legal operator from Impressum, `DECIDE`]

---

## 4. Product model and confirmed facts

### 4.1 Product families (binding names)

| Family | URL | Names | State |
|---|---|---|---|
| Robotik-Wochenendkurs | `/kurse/robotik-wochenendkurs` | Stufe 1: **Grundlagen der Robotik und Programmierung** · Stufe 2: **Aufbau: Robotik & Smart Engineering** | Stufe 1 confirmed (cohort 2026/27). Stufe 2 In Planung, no date, module only |
| Wettbewerbsteams | `/kurse/wettbewerbsteams` | Wettbewerbsteam (Wettbewerbs-Intensivkurs) | In Planung, Frühjahr 2027 |
| Workshops & Feriencamps | `/kurse/workshops-feriencamps` | Workshops (2–3 Std.) · Feriencamps (z. B. 5 Tage × 3 Std.) | Workshops per confirmed event · Camps In Planung |

Age groups are teaching groups, not course levels. Do not label Kurs 1/Kurs 2 as "Junior"/"Teens" or as age groups (`DECIDE`).

### 4.2 Current cohort: source of truth (seed data for the CourseRun)

| Field | Value |
|---|---|
| Course | Grundlagen der Robotik und Programmierung (Stufe 1) |
| Platform | LEGO® Education SPIKE™ Prime |
| Age | 8–14 Jahre; Einteilung nach Alter und Vorkenntnissen |
| Duration | 12 Termine à 90 Minuten (insgesamt **18 Stunden**; never write "18 Unterrichtsstunden") |
| Period | 07.11.2026 – 06.02.2027 |
| Saturday slots | Kurs 1: 14:00–15:30 · Kurs 2: 15:45–17:15 |
| Venue | Hochschule Bonn-Rhein-Sieg (H-BRS), Campus Sankt Augustin |
| Group size | max. 10 Kinder pro Kurs |
| Supervision | eine Kursleitung + eine zusätzliche Betreuungsperson |
| Fee | 349 € gesamter Kurs (Einführungspreis) |
| Equipment | Roboter, Laptops, Material vollständig gestellt |
| Trial lesson | 07.11.2026, 25 €, credited in full on enrolment → 324 € remaining. **Not refunded** if the family does not enrol |
| Status | `VERIFY` (Anmeldung offen / Wenige Plätze) |

**Dates (store as explicit dates, Europe/Berlin; do not generate from "every Saturday"):**
2026-11-07, 11-14, 11-21, 11-28, 12-05, 12-12, 12-19 · (Weihnachtsferien: kein Unterricht) · 2027-01-09, 01-16, 01-23, 01-30, 02-06. Total 12.

---

## 5. Content model

| Entity | Fields | Rules |
|---|---|---|
| **CourseProduct** | slug, name, stages[], ageRange, format, modules[], image, faqRefs[], status, seo{title, description, h1} | Stable URL, no year in slug |
| **CourseRun** | productId, title, dates[] (explicit), weekday, timeSlots[], venue, fee, feeNote, trialTerms{date, price, credited}, capacity, status (manual override), cta | Rendered as a module on the product page, never its own page. Disappears from homepage when finished |
| **Event** | slug, title, start, end?, venue{name, address, mapLink}, ageRange, fee (0 allowed), registration{method, url/email}, externalLink, organiserRole, partners[], recapText, outcome, gallery[]{image, alt, consentDocumented: bool}, seo | One URL before and after. Switches to recap automatically after the date |
| **Person** | name, publicTitle, role, bio, photo, photoConsent: bool, group (Team / Fachliche Begleitung), order, published | Only confirmed public identities |
| **OrganizationRelationship** | name, category, relationshipLine (DE, factual), evidence, logoLicence: bool, link, published | Never call supporters "offizielle Partner". Logos only with written permission |
| **Achievement** | title, date, resultLine, eventRef?, verified: bool | Single source for homepage "Erfolge" and Aktuelles, so nothing shows twice |
| **FAQ** | question, answer, category (Eltern / Schulen), pages[] | Rendered on course pages and Kontakt |

Every entity gets `published` / `verified` flags. Unverified items are not rendered. The CMS must offer a preview before publishing.

### 5.1 Status logic

| Status | Shown text | Button |
|---|---|---|
| Anmeldung offen | "Anmeldung offen" | "Kursplatz anfragen" / "Probestunde anfragen" |
| Wenige Plätze (manual) | "Nur noch wenige Plätze" | same as above |
| Ausgebucht | "Ausgebucht" | "Auf die Warteliste" |
| In Planung | "In Planung" + expected period | "Interesse vormerken" |
| Läuft | "Kurs läuft" | no enrolment button; link to the next run |
| Abgeschlossen | hidden from homepage and product page | – |
| Event: Demnächst | listed under "Demnächst" | "Jetzt anmelden" |
| Event: Rückblick | listed under "Rückblicke & Projekte" | none |

Derive date-based states at build time (Läuft after first date, Abgeschlossen after last date, Event → Rückblick after its date, expired registration buttons removed). Schedule a daily rebuild so this happens without manual action. Manual statuses (Wenige Plätze, Ausgebucht) override.

---

## 6. Phases

### Phase 0: Audit the current site
- Crawl www.mintventures.de: list all existing URLs (including `/en`, Impressum, Datenschutz) → `docs/url-inventory.md` with a redirect map to the new routes.
- Find Lovable-specific asset routes (e.g. `/__l5e/assets-v1`) and list every real asset to move into the repo.
- List all occurrences of banned content (§1 rules 2–3).
- **Human task (flag, don't do):** confirm where the flyer/roll-up QR codes point; those targets must keep working.

**Done when:** inventory + redirect map + asset list are committed.

### Phase 1: Foundation
- Scaffold the project (per §2), linting, formatting, CI build.
- Design tokens:
  - Brand green `#346D57` (`VERIFY` against logo files): logo, headings, header/footer, primary surfaces; white text on it.
  - Brand yellow `#FBB72A` (`VERIFY`): accents and the **primary CTA background with dark text only** (white on yellow fails contrast).
  - Text `#1F1F1F` · light green surface `#EAF4EF` (cards, info boxes).
  - Step accents green / blue / orange / red / violet: **only** for the five-step learning visual.
  - Do not drift towards grey/gold. The current site's light-grey CTA looks disabled; the new one must look clickable.
- Typography: geometric sans-serif close to the logo, self-hosted.
- Base layout, header with dropdown, accessible mobile menu, footer, mobile action bar.
- Style: clean education-tech, friendly, not kindergarten. Scannable cards, no carousels.

**Done when:** an empty page with header, footer and action bar passes keyboard navigation and contrast checks on mobile and desktop.

### Phase 2: Content model and seed data
- Implement the collections and schemas from §5, the status logic from §5.1, and Europe/Berlin date handling.
- Seed: the 3 CourseProducts, the CourseRun from §4.2, FAQs, OrganizationRelationships, Achievements and Events from the [Content appendix](#content-appendix-german-copy), each with the correct `verified` flag.
- Unit-test the status logic against fixed dates (before the course, during, after; event before/after).

**Done when:** tests pass and the seed data validates.

### Phase 3: Launch-critical pages
Build in this order. Use the copy from the appendix.

1. **`/kurse/robotik-wochenendkurs`**, sections in order: A Header + fact box (on mobile, the fact box sits directly under the header, before any teaching text) · B Termine (from the CourseRun) · C Altersgerechte Gruppen · D Das lernen die Kinder · E So läuft eine Einheit ab · F Wie geht es weiter (path graphic: Grundlagen → Aufbau → optional Wettbewerbsteam, planned items labelled "In Planung") · G Probestunde & Anmeldung · H FAQ.
2. **`/kontakt`** with the enquiry form:

   | Field | Required | Notes |
   |---|---|---|
   | Anliegen | yes | Probestunde · Kursplatz · Frage zum Kurs · Kooperation (Schule/Institution) · Sonstiges. Preselect via `?anliegen=` (never personal data in URLs) |
   | Name (Elternteil / Ansprechperson) | yes | |
   | E-Mail | yes | |
   | Telefon | no | for a call-back |
   | Vorname des Kindes | no | only shown for Probestunde / Kursplatz |
   | Alter und Klasse des Kindes | yes for Probestunde / Kursplatz | |
   | Vorerfahrung | no | keine · etwas · viel |
   | Bevorzugte Kurszeit | no | options from the current CourseRun + "egal" |
   | Schule / Einrichtung | yes for Kooperation | only shown for Kooperation |
   | Nachricht | no | |
   | Datenschutzhinweis | – | short notice + link to /datenschutz; **no pre-ticked checkbox** |

   No child surname, date of birth, school (for parents) or health data. Spam protection: honeypot + time trap (no reCAPTCHA). Confirmation page saying when to expect a reply. Truthful error messages. The form must also work without JS (plain POST).
3. **`/`** homepage, sections: 01 Hero · 02 Aktuelle Kurse (automatic: featured CourseRun + 2 smaller product cards) · 03 So lernen Kinder (five-step visual, one line each, link) · 04 Aktuelles (max. 3 cards: next 1–2 events + latest recap) · 05 Erfolge & Einblicke (verified Achievements only, no logo wall) · 06 Kooperationen · 07 Probestunde & Kontakt. No full syllabus, long FAQ, full team list or SEO filler here.

**Done when:** a parent on a phone can find in ≤ 30 s the fee (349 €), the trial (25 €, credited), the 12 dates, the Sankt Augustin venue, both Saturday times and how to enquire.

### Phase 4: Remaining pages
- `/kurse`, `/kurse/wettbewerbsteams`, `/kurse/workshops-feriencamps` (upcoming workshops pulled from Events automatically).
- `/so-lernen-kinder`, in this order: approach → two stages → five-step learning path → lesson flow → individual challenges → principles → tools. The five steps describe how skills grow; they are not five course levels. Do not repeat the competence domains here.
- `/aktuelles` + event template (announcement and recap views from the same entry). Venue as a plain map link, no embed.
- `/kooperationen`: services → how a collaboration works → competence domains (AI marked as Aufbauinhalte) → Zusammenarbeit (verified relationships only) → enquiry button (→ `/kontakt?anliegen=kooperation`).
- `/ueber-uns`: mission, story, team (real people with consent only; no stock photos), Fachliche Begleitung only for confirmed advisers, link to Kooperationen. No "Der Verein" section.
- Legal pages as templates with clear placeholders: Impressum (§ 5 DDG), Datenschutz (matched to the services actually configured), Teilnahmebedingungen. **Their content needs owner input and legal review; do not write legal text as if final.**

**Done when:** every route in §3.1 (except Kinderschutz and /en) renders with real content and no unverified item is visible.

### Phase 5: SEO
- Static HTML for all public content; check with JS disabled.
- Per URL: unique title + meta description + one H1 (values in the [SEO table](#seo-fields)), canonical, real 200/404, Open Graph tags with a real preview image (parents share links on WhatsApp).
- On the homepage the big claim is the visual headline; the semantic H1 is the location line, which may be styled smaller.
- XML sitemap (canonical public URLs, rebuilt each build), robots.txt pointing to it.
- 301 redirects from the Phase 0 map.
- Images: WebP/AVIF, responsive sizes, lazy loading, descriptive German alt text (e.g. "Zwei Kinder programmieren einen LEGO-SPIKE-Roboter").
- JSON-LD only for real entities: `EducationalOrganization` (all pages), `Course` + `CourseInstance` with Offer 349 EUR (Wochenendkurs), `Event` incl. 0 € offers and eventStatus (event pages), `BreadcrumbList` (subpages). FAQ markup optional, low priority.
- Internal links: Startseite → product pages → Kontakt; event pages → matching course.
- Use place names naturally (Bonn, Sankt Augustin, Siegburg, Rhein-Sieg-Kreis, Köln). No keyword stuffing.

**Done when:** Rich Results Test passes on course and event pages; Lighthouse mobile performance ≥ 90.

### Phase 6: Owner editing (CMS)
- Wire the CMS to the collections. The owner must be able, unaided and with preview, to: create a CourseRun, create an Event, and turn an Event into a recap (add text, outcome, photos with a consent flag).
- Photo upload strips EXIF/GPS. Images without `consentDocumented` cannot be published.
- Restricted admin, 2FA, backups, rollback via git.
- Write `docs/owner-guide.md` in simple German: how to add a course run, add an event, write a recap, change a status.

**Done when:** a non-technical test run of those three tasks works.

### Phase 7: QA and launch prep
- **Privacy:** inventory all cookies, local storage and third-party requests (should be zero before consent). No Google Fonts/Maps/reCAPTCHA. WhatsApp is a plain link. Security headers set. Dependencies up to date.
- **Accessibility (WCAG 2.1 AA):** contrast ≥ 4.5:1, keyboard focus, form labels and error texts, semantic headings, reduced-motion support, accessible menu and action bar.
- **Content:** grep the build output for banned terms (§1). No broken images, no unverified items rendered, no "kostenlose Probestunde".
- **Behaviour:** deep links work on refresh; action bar works on iPhone and Android; WhatsApp opens the right number; status transitions behave at the date boundaries.
- **Launch checklist:**
  - A parent can tell which offers are bookable and which are planned, and understands that age grouping is flexible.
  - A school representative finds the services and the cooperation enquiry without going through "Probestunde".
  - An outsider can answer: Who teaches? What real results exist? Who supports MINT Ventures?
- Write `docs/launch-checklist.md` listing the human-only items below with checkboxes.

### Human-only tasks (not for Claude Code)
- Search Console access, sitemap submission, URL inspection after launch.
- Data processing agreements (AVV) with host, CMS, form and e-mail providers.
- Legal/data-protection review of Impressum, Datenschutz, Teilnahmebedingungen (incl. whether a Widerrufsbelehrung is needed for remotely concluded course contracts) and whether the BFSG accessibility law applies.
- Written parental consent for every photo of a child.
- Child-safety policy (before any Kinderschutz page or claim).
- Google Business Profile eligibility (no virtual office).
- QR code targets on printed material.

---

## 7. Open owner decisions

Hide the affected element until each one is answered.

| # | Topic | Effect if unresolved |
|---|---|---|
| 1 | Course status: Anmeldung offen / Wenige Plätze, and **whether late entry into the running cohort is possible** (see §10) | Status shows "Kurs läuft"; CTA points to "Interesse vormerken" for the next run |
| 2 | Payment and cancellation terms | FAQ answer just links to Teilnahmebedingungen |
| 3 | Legal operator for Impressum (current; changes after e.V./GmbH formation) | Impressum cannot go live; blocks launch |
| 4 | Teilnahmebedingungen content | Blocks launch |
| 5 | Kurs 1/Kurs 2 as age groups ("Junior"/"Teens")? | Show only times |
| 6 | Module name "Denken wie Programmierer:innen" vs flyer's "Denken wie ein Programmierer" | Use the gender-neutral version |
| 7 | Brand colours and font against logo/print files | Use the sampled values |
| 8 | WhatsApp number 015157596494 | Confirm before launch |
| 9 | Code Week workshop end time | Show start time only |
| 10 | Team Explorers zdi result: event name, year, photo consent | Hide |
| 11 | Roboternacht H-BRS: wording, date, team, source | Hide |
| 12 | Code Week Auftakt 10.10.2026: did it happen, photos? | Hide |
| 13 | Maker Space and DFRobot: actual relationship | Hide |
| 14 | Ferienprogramme for schools/OGS: offered now? | Hide that line |
| 15 | Workshop robotics systems: name them? | Say "andere Robotiksysteme" |
| 16 | Advisers for "Fachliche Begleitung" (with permission for name, title, photo) | Hide the section |
| 17 | Next Grundlagenkurs date ("voraussichtlich Februar/März 2027") | Show as "In Planung" |
| 18 | Kooperationen vs Für Schulen naming and route | Use the §2 default |
| 19 | Google Business Profile | Not set up |

---

## 8. Issues found in the brief

- **The dates are already past or happening now.** The brief is dated 17 Oct 2026. The Code Week workshop (25.10.2026) and Code Week Auftakt (10.10.2026) are over, and the course and trial lesson start 07.11.2026. By launch the course will be "Läuft" and the event will be a recap. The status logic handles this, but the homepage and course page need a sensible primary CTA once the trial date has passed (decision #1 and #17).
- **Kooperationen vs Für Schulen.** The nav table says "Kooperationen" at `/Kooperationen` (capital K, broader audience), while the sitemap, footer, section heading and SEO fields say "Für Schulen" at `/fuer-schulen`. Default in §2.
- **The homepage "Erfolge" copy lists the Code Week Auftakt as fact**, while the seed content marks it `VERIFY`. Treat it as unverified.
- **Section 17 (open decisions)** is listed in the contents but missing from the document. §7 above is compiled from all the markers in the brief.
- **The header language switch** is listed, but English is out of scope until translated. Leave it out for now.
- Small German typos in the draft copy were fixed in the appendix (marked *edited*).

---

## Content appendix: German copy

Copy as written by the owner, lightly edited where marked. `[...]` = placeholder or instruction, not copy.

### Startseite

**01 Hero**
- Eyebrow: Kleine Gruppen · Projektbasiert · LEGO® Education SPIKE™ Prime
- Visual headline (not H1): Kinder gestalten Technologie. Nicht nur konsumieren.
- H1: Robotik- und Programmierkurse für Kinder von 8 bis 14 Jahren in Bonn und Sankt Augustin
- Intro: Bei MINT Ventures bauen und programmieren Kinder eigene Roboter, testen Ideen und lösen technische Herausforderungen – in kleinen Gruppen und mit viel Freude am Ausprobieren.
- Buttons: Probestunde anfragen · Aktuelle Kurse ansehen
- Image: real MINT Ventures photo (e.g. Team Explorers at the zdi competition; consent `VERIFY`)

**02 Unsere Kurse** (automatic from data)
- Nächster Kursstart: Samstag, 7. November 2026
- Grundlagen der Robotik und Programmierung · 8–14 Jahre · 12 Termine à 90 Minuten · Hochschule Bonn-Rhein-Sieg, Campus Sankt Augustin · 349 € (Einführungspreis) · Probestunde 25 € (wird angerechnet) · [Status] · [Zum Kurs]
- Wettbewerbsteams – In Planung, Frühjahr 2027 · [Interesse vormerken]
- Workshops & Feriencamps – [next workshop from Events] · [Mehr erfahren]

**03 Lernen durch Ausprobieren**
Build · Think · Control · Automate · Innovate – Kinder bauen, programmieren, nutzen Sensoren, automatisieren Abläufe und entwickeln eigene Lösungen. Aufgaben mit unterschiedlichem Schwierigkeitsgrad lassen Raum für eigene Lösungswege. · [Link] So lernen Kinder bei uns

**04 Aktuelles & Projekte**
Einblicke in Workshops, Robotik-Wettbewerbe und Bildungsprojekte in der Region Bonn/Rhein-Sieg. · [max. 3 cards] · [Link] Alle Neuigkeiten

**05 MINT Ventures in Aktion** (Achievements, *edited*)
- zdi-Roboterwettbewerb NRW, Bonn – 2. Platz in der Kategorie Grundschule (Mai 2026) `VERIFY`
- Roboternacht an der Hochschule Bonn-Rhein-Sieg – 3. Platz mit einem Grundschulteam (Juni 2026) `VERIFY`
- DIGITAL@School Campus Bonn 2026 – Robotik-Workshops für Kinder und eigener Ausstellungsstand (Juni 2026)
- Code Week Bonn-Rhein-Sieg 2026 – Auftaktveranstaltung am 10.10.2026 `VERIFY`; Mitmach-Workshop für Kinder am 25.10.2026

**06 Für Schulen, Unternehmen & Veranstalter** (*edited*)
Robotik und Coding für Bildungsprojekte und Events: Ob Schul-AG, Projekttag, Family Day oder MINT-Veranstaltung – wir gestalten praxisnahe Robotik- und Programmierangebote für Kinder und Jugendliche.
Gemeinsam entwickeln wir ein passendes Format für Ihre Zielgruppe und Veranstaltung. Die technische Ausstattung können wir nach Absprache bereitstellen.
[Kooperation anfragen] · [WhatsApp] · info@mintventures.de

**07 Robotik selbst ausprobieren?**
Lernen Sie uns in einer Probestunde kennen (25 €, wird bei Anmeldung vollständig auf die Kursgebühr angerechnet). Wir beantworten Ihre Fragen persönlich und finden gemeinsam die passende Gruppe für Ihr Kind.
[Probestunde anfragen] · [WhatsApp] · info@mintventures.de

### /kurse

**H1:** Unsere Kurse und Programme
Ob regelmäßiger Wochenendkurs, Wettbewerbsvorbereitung oder ein Workshop zum Ausprobieren – bei uns finden Kinder von 8 bis 14 Jahren den passenden Einstieg in Robotik und Programmierung.

- **Robotik-Wochenendkurs** – Regelmäßiger Kurs am Samstag · 12 Termine à 90 Minuten · 8–14 Jahre · aufbauender Lernweg in zwei Stufen. [Status from CourseRun] · [Zum Kurs]
- **Wettbewerbsteams** – Intensive Vorbereitung auf Robotikwettbewerbe im Team – für Kinder mit Grundlagenkenntnissen und Lust auf Herausforderungen. [In Planung – Frühjahr 2027] · [Interesse vormerken]
- **Workshops & Feriencamps** – Robotik in 2–3 Stunden ausprobieren oder in den Ferien mehrere Tage tief eintauchen. [next workshop from Events] · [Mehr erfahren]

**Gruppeneinteilung (disclosure, use on course pages):** Wir berücksichtigen Alter, Vorkenntnisse und Lerntempo. Bei ausreichender Nachfrage bieten wir altersnahe Lerngruppen an. Die konkrete Einteilung erfolgt in Abstimmung mit den Familien.

### /kurse/robotik-wochenendkurs

**A · H1:** Robotik-Wochenendkurs
12 praxisorientierte Termine mit LEGO® Education SPIKE™ Prime – für Kinder von 8 bis 14 Jahren.
Kinder bauen und programmieren Roboter, erkunden Motoren und Sensoren und lernen, technische Aufgaben selbstständig zu lösen.
Wir verbinden systematische Grundlagen mit Freude am Entdecken und Experimentieren.
Aktueller Kurs: Grundlagen der Robotik und Programmierung
[Fact box with all fields from §4.2] · [Kursplatz anfragen] · [Probestunde am 07.11. anfragen – only while the trial date is in the future]

**B · Termine:** table from the CourseRun (grouped by month, with "Weihnachtsferien – kein Unterricht").

**C · Zwei Kurszeiten – passend zu Alter und Erfahrung**
Kinder zwischen 8 und 14 Jahren lernen unterschiedlich schnell. Deshalb berücksichtigen wir Alter und Vorkenntnisse bei der Gruppeneinteilung. Innerhalb der Gruppe arbeiten die Kinder in altersgleichen Zweierteams an Aufgaben auf drei Niveaus (Basis · Plus · Profi). Eine getrennte Einteilung jüngerer und älterer Kinder ist abhängig von den Anmeldungen.
Die passende Gruppe besprechen wir gerne in der Probestunde.

**D · Das lernen die Kinder**
- Robotik & Technik – Roboter konstruieren und verstehen, wie Motoren, Sensoren und Mechanik funktionieren.
- Programmierung & Logik – Abläufe, Schleifen und Bedingungen kennenlernen und gezielt einsetzen.
- Technisches Problemlösen – testen, Fehler systematisch analysieren und Lösungen schrittweise verbessern.
- Eigene Projekte – Wissen in kleinen Robotikprojekten anwenden und Ergebnisse präsentieren.

Wir legen besonderen Wert auf nachhaltigen Wissensaufbau, selbstständiges Denken und nachvollziehbare Lernfortschritte.

Die vier Bausteine der Stufe 1: Lerne deinen Roboter kennen · Denken wie Programmierer:innen · Technik in Aktion · Junge Erfinder

**E · So läuft eine Einheit ab** (*edited*)
1. Kurzer Input – Projekt vorstellen bzw. Aufgabe erklären
2. Bauen & Programmieren – eigene Projekte umsetzen
3. Testen & Verbessern – Fehler finden, iterieren
4. Ergebnisse vorstellen – Show & Tell mit Feedback

Eltern dürfen am Anfang und zum Ende gerne kurz zuschauen.

**F · Nach dem Grundlagenkurs**
- Stufe 2 · Aufbau – [In Planung] komplexere Konstruktionen, Robotik-Challenges, smarte Systeme und ein eigenes Innovationsprojekt. 12 Einheiten à 90 Minuten. Kinder mit Vorerfahrung können nach Absprache direkt einsteigen.
- Wettbewerbsteam – [In Planung, Frühjahr 2027] freiwilliger Wettbewerbs-Intensivkurs. [Link]
- Nächster Grundlagenkurs – voraussichtlich Februar/März 2027. [Interesse vormerken]

**G · Probestunde am 7. November**
Die Probestunde kostet 25 €. Bei anschließender Anmeldung wird der Betrag vollständig auf die Kursgebühr angerechnet. Teilnahme nur nach vorheriger Bestätigung und bei verfügbaren Plätzen.

**Anmeldung**
Schreiben Sie uns über das Kontaktformular, per E-Mail an info@mintventures.de oder per WhatsApp. Nennen Sie bitte das Alter Ihres Kindes, vorhandene Robotik- oder Programmiererfahrung und die bevorzugte Kurszeit (14:00 oder 15:45 Uhr). Wir melden uns persönlich zurück. Da die Gruppen auf zehn Kinder begrenzt sind, empfehlen wir eine frühzeitige Anmeldung.
[Kursplatz anfragen] · [WhatsApp]

**H · Häufige Fragen**

| Frage | Antwort |
|---|---|
| Braucht mein Kind Vorkenntnisse? | Nein. Der Grundlagenkurs ist für Einsteiger gedacht. Kinder mit Erfahrung bekommen anspruchsvollere Aufgaben. |
| Für welches Alter ist der Kurs? | Für Kinder von 8 bis 14 Jahren. Wir berücksichtigen Alter und Vorkenntnisse bei der Gruppeneinteilung. |
| Welche Kurszeit soll ich wählen? | Nennen Sie uns Ihre Wunschzeit. Die passende Gruppe besprechen wir gerne in der Probestunde. |
| Muss mein Kind etwas mitbringen? | Nein. Roboter, Laptops und Material stellen wir zur Verfügung. |
| Was ist LEGO® Education SPIKE™ Prime? | Ein Robotik-Lernsystem mit Motoren, Sensoren und LEGO-Bauteilen. Programmiert wird blockbasiert; später ist auch Python möglich. |
| Gibt es eine Probestunde? | Ja, am 07.11.2026 für 25 €. Bei Anmeldung wird der Betrag vollständig auf die Kursgebühr angerechnet. |
| Was passiert, wenn mein Kind einen Termin verpasst? | Sollte Ihr Kind einmal nicht teilnehmen können, bitten wir um eine kurze Mitteilung. Ein Anspruch auf einen Ersatztermin besteht nicht. Sofern am selben Tag in der anderen Kursgruppe ein Platz frei ist und der Unterrichtsinhalt passt, versuchen wir gerne, eine Teilnahme zu ermöglichen. Ein Nachholen können wir jedoch nicht garantieren. |
| Wie läuft die Bezahlung, und kann ich stornieren? | `DECIDE` – until then: "Details finden Sie in unseren Teilnahmebedingungen." |
| Ist der Kurs auch für Familien aus Bonn, Köln oder Siegburg erreichbar? | Ja. Der Campus Sankt Augustin ist mit Bus und Bahn sowie mit dem Auto gut erreichbar. |
| Ist der Kurs auch für Mädchen? | Selbstverständlich. Technik ist kein Jungs-Thema, sondern eine Frage von Neugier, Mut und Ausdauer. |

### Curriculum (two stages)

| Stufe 1 · Grundlagen (12 × 90 min) – bestätigt | Stufe 2 · Aufbau (12 × 90 min) – in Planung |
|---|---|
| Lerne deinen Roboter kennen – Bewegung, Motoren, Sensoren | Kreatives Konstruieren – Design, Mechanik, Bau |
| Denken wie Programmierer:innen – Logik, Schleifen, Fehlersuche | Robotik-Challenges – Präzision, Navigation, Algorithmen |
| Technik in Aktion – Mechanik, Prototypen, Steuerung | KI & smarte Systeme – Daten, ggf. KI-Vision, Automatisierung |
| Junge Erfinder – Integration, Kreativität, Präsentation | Integriertes Innovationsprojekt – Planung, Integration, Präsentation |

"KI-Vision" is a Stufe 2 aspiration, not a promise to beginners. Stufe 2 is not open for enrolment.

### /kurse/wettbewerbsteams

**H1:** Wettbewerbsteams · [In Planung – Frühjahr 2027]
Für Kinder, die mehr wollen: Im Wettbewerbs-Intensivkurs vertiefen sie ihre Kenntnisse, lösen anspruchsvollere Robotikaufgaben und bereiten sich im Team gezielt auf Robotikwettbewerbe vor.
- Format: 150–180 Minuten pro Einheit, Training im Team
- Ziel: Vorbereitung auf offizielle Robotikwettbewerbe, z. B. WRO oder zdi-Roboterwettbewerb
- Voraussetzung: Grundlagenkurs oder vergleichbare Erfahrung; Teilnahme nach Absprache
- Alter: 8–14 Jahre

Die Teilnahme ist freiwillig. Ein Startplatz bei einem bestimmten Wettbewerb kann nicht garantiert werden.
[Interesse vormerken]

### /kurse/workshops-feriencamps

**H1:** Workshops & Feriencamps

**Workshops – Robotik ausprobieren**
2–3 Stunden voller Bauen und Programmieren. Ideal als erster Einstieg – für Familien, Schulen, Events und Partner, eigenständig oder in Kooperation.
[automatic: upcoming workshops from Events]

**Feriencamps – tief eintauchen**
Mehrere Tage thematische Projekte mit Zeit zum Bauen, Testen und Gestalten, z. B. 5 Tage à 3 Stunden. Mögliche Themen: Kreatives Konstruieren, KI & smarte Systeme, Robotik-Challenges.
[In Planung] · [Interesse vormerken]

### /so-lernen-kinder

**H1:** So lernen Kinder bei MINT Ventures
Nicht nur Anleitungen nachbauen: Kinder setzen eigene Ideen um, testen Roboter unter realen Bedingungen und lernen aus Fehlern. Wir verbinden klare Lernziele mit Freiraum für kreative Lösungen.

**Ein aufbauender Lernweg in zwei Stufen**
Stufe 1 · Grundlagen – einfache Roboter bauen und programmieren, erste Aufgaben selbstständig lösen. Stufe 2 · Aufbau (in Planung) – Wissen in komplexeren Technik-, Robotik- und KI-Projekten anwenden. [Link zum Kurs]

**Unser Lernweg: Build · Think · Control · Automate · Innovate**
- Build · Mechanik – bauen, erleben, ausprobieren; von der Idee zum funktionierenden Modell.
- Think · Coding – logisch denken, programmieren, Probleme lösen.
- Control · Sensorik – Sensoren nutzen, Umwelt verstehen, Roboter steuern.
- Automate · Robotik – Abläufe automatisieren, komplexere Projekte realisieren.
- Innovate · KI & Zukunftstechnologien – eigene Ideen entwickeln und Lösungen für reale Herausforderungen gestalten.

Diese Schritte beschreiben, wie Kompetenzen wachsen – sie sind keine starre Reihenfolge. In einem Projekt bauen, programmieren und testen Kinder oft gleichzeitig.

**So läuft eine Unterrichtseinheit ab**
Kurzer Input → Bauen & Programmieren → Testen & Verbessern → Ergebnisse vorstellen

**Individuelle Herausforderungen**
Innerhalb eines Projekts bearbeiten Kinder Aufgaben auf Basis-, Plus- oder Profi-Niveau. Gruppeneinteilung und Tempo orientieren sich an Alter, Interesse und Vorerfahrung.

**Unsere pädagogischen Leitprinzipien**
- Klare Ziele – Freiheit im Lösungsweg
- Lernen durch Fragen statt durch Vormachen
- Motivation durch sichtbare eigene Erfolge
- Fehler sind Teil des Lernprozesses

Mädchen und Jungen sind bei uns gleichermaßen willkommen. Technik ist kein Jungs-Thema – sondern eine Frage von Neugier, Mut und Ausdauer.

**Womit wir arbeiten**
Im Wochenendkurs arbeiten wir mit LEGO® Education SPIKE™ Prime. In Workshops kommen teilweise andere Robotiksysteme zum Einsatz.

### /aktuelles

**H1:** Aktuelles · two areas: "Demnächst" and "Rückblicke & Projekte".

Event template. Before the event: title, date, time, venue (plain map link), age, fee (incl. "kostenlos"), 3–5 sentence description, registration path + button, organiser/partner with factual role.
After the event: title and date unchanged, status "Rückblick", what the children did (3–5 sentences), outcome, 2–5 photos with documented consent, specific thanks (e.g. "Danke an … für die Räume"), registration button removed.

**Seed events**

| Slug | Facts |
|---|---|
| `code-week-mission-smart-city-2026` | So 25.10.2026, ab 14:00 (end `VERIFY`); Ort der Begegnung, Am Fronhof 10, Bonn-Bad Godesberg; 9–12 Jahre; kostenlos; Anmeldung per E-Mail; other robotics systems than SPIKE Prime. External link: https://www.codeweek.de/regio-hubs/bonn-rhein-sieg/event/30ebc378-78f6-4e98-8bca-f56bd5d8bf28_2387/mission-smart-city-programmiere-deinen-ersten-roboter. **Date has passed → recap; needs recap text and photos from the owner, hide until then** |
| `kursstart-robotik-wochenendkurs-2026` | 07.11.2026, H-BRS Campus Sankt Augustin; Probestunde 25 € (angerechnet); links to the course page |
| Team Explorers – zdi-Roboterwettbewerb | Past: 2. Platz, Kategorie Grundschule. `VERIFY` event name, year, photo consent |
| DIGITAL@School Campus Bonn 2026 | Past: Robotik-Workshops für Kinder und eigener Stand. **Do not claim keynote or teacher training** |
| Roboternacht H-BRS | Past: 3. Platz mit einem Grundschulteam. `VERIFY` wording, date, team, source |
| Code Week Auftakt H-BRS, 10.10.2026 | `VERIFY` whether it happened; publish only if confirmed |

**Code Week announcement copy** (kept for the record; used as the opening of the recap)
*Mission Smart City – Programmiere deinen ersten Roboter.* Am Sonntag, 25. Oktober 2026, lädt MINT Ventures Kinder von 9 bis 12 Jahren zu einem kostenlosen Robotik-Workshop im Ort der Begegnung (Am Fronhof 10, Bonn-Bad Godesberg) ein. Beginn: 14:00 Uhr. Die Plätze sind begrenzt; eine separate Anmeldung per E-Mail an info@mintventures.de ist erforderlich. Der Workshop findet im Rahmen der Code Week Bonn-Rhein-Sieg statt, nutzt andere Robotiksysteme und ist unabhängig von unserem regelmäßigen SPIKE-Prime-Kurs.

### /kooperationen

**H1:** Robotik & Coding für Schulen und Bildungspartner
MINT Ventures entwickelt praxisnahe Angebote rund um Robotik, Programmierung und technisches Problemlösen. Gemeinsam mit Schulen und Bildungseinrichtungen gestalten wir altersgerechte Workshops, Projekttage und AG-Formate – mit Robotern, Laptops und Unterrichtsmaterial.

**Unsere Angebote**
- Robotik-AGs – regelmäßig über ein Halbjahr oder Schuljahr (nach Vereinbarung)
- Projekttage & Workshops – 2–3 Stunden oder ein ganzer Projekttag
- Mobile Robotik-Events – Mitmachstationen für Schulfeste, Tage der offenen Tür und Veranstaltungen
- Ferienprogramme – mehrtägige Projekte, z. B. für OGS oder Jugendeinrichtungen `VERIFY`

Für jedes Angebot nennen wir Alter, Gruppengröße, Dauer, Ausstattung und Ort; Preise auf Anfrage.

**So läuft eine Zusammenarbeit ab:** Anfrage → Kennenlerngespräch → Konzept und Angebot → Durchführung → gemeinsamer Rückblick
[Schulprojekt oder Workshop anfragen]

**Kompetenzbereiche** (institutional audience only; KI = Aufbauinhalte, not part of every entry course)

| Kompetenzbereich | Inhalte |
|---|---|
| Mechanik & Konstruktion | Mechanische Systeme, Kraftübertragung, Zahnräder und Getriebe, Hebel- und Gelenkmechanismen, Strukturdesign, Schwerpunkt und Balance |
| Computational Thinking & Coding | Algorithmisches Denken, Sequenzen, Bedingungen und Schleifen, Variablen, Fehlersuche, ereignisgesteuerte Systeme |
| Robotik & Automatisierung | Sensoren und Datenerfassung, Aktoren und Steuerung, Regelkreise, autonome Navigation, Entscheidungslogik, Systemintegration |
| KI & intelligente Systeme | Computer Vision, Mustererkennung, Trainingsdaten, maschinelles Lernen, KI-gestützte Entscheidungen, Mensch-KI-Interaktion |

**Zusammenarbeit & Unterstützung** (OrganizationRelationship seed)

| Organisation | Beziehung | verified |
|---|---|---|
| Hochschule Bonn-Rhein-Sieg (H-BRS) | Kursort unserer Wochenendkurse (Campus Sankt Augustin) | yes (do not imply endorsement) |
| Code Week Bonn-Rhein-Sieg / Dr. Hans Riegel-Stiftung | Workshops im Rahmen der Code Week 2026 | yes |
| DIGITAL@School Campus Bonn – Deutsche Telekom | Workshops für Kinder und Ausstellungsstand 2026 | yes |
| Maker Space | [relationship] | no |
| DFRobot | [relationship] | no |

### /ueber-uns

**H1:** Über MINT Ventures
MINT Ventures möchte Kindern früh die Möglichkeit geben, Technologie aktiv zu gestalten. Unser Ansatz verbindet Robotik, Programmierung und Engineering mit kleinen Lerngruppen, eigenen Projekten und einer konstruktiven Fehlerkultur.

**Unsere Geschichte** (*edited*)
Seit Anfang 2026 bieten wir Robotik-Workshops und Pilotkurse in der Region Bonn und Umgebung an. Von uns begleitete Kinderteams waren bei Robotikwettbewerben erfolgreich, und wir waren mit Workshops bei DIGITAL@School und der Code Week 2026 vertreten.
Ab November 2026 finden unsere regelmäßigen Wochenendkurse an der Hochschule Bonn-Rhein-Sieg in Sankt Augustin statt.

**Unser Team**
Hinter MINT Ventures steht ein interdisziplinäres Team, das technische Kompetenz mit praktischer Bildungsarbeit verbindet. Gemeinsam entwickeln wir Lernangebote, in denen Kinder Roboter selbst bauen, programmieren und technische Zusammenhänge verstehen.
Unser Kernteam kommt aus der Praxis: Wir bringen mehr als zehn Jahre Erfahrung aus der IT-, Cloud- und KI-Branche mit – von Business Design und Vertrieb über IT-Delivery bis hin zu AI Engineering.
Diese Erfahrung fließt direkt in unsere Kurse ein: Kinder lernen, wie aus einer Idee eine funktionierende technische Lösung wird – durch Ausprobieren, Problemlösen und eigenständiges Entwickeln.
[Person cards: names and roles to be supplied by the owner]

**Fachliche Begleitung:** [hidden until confirmed advisers with permission]
**Projekte & Zusammenarbeit:** short summary + link to /kooperationen

### /kontakt

**H1:** Fragen zu unseren Kursen oder Interesse an einer Probestunde?
Schreiben Sie uns kurz, wie alt Ihr Kind ist, ob bereits Erfahrungen mit Robotik oder Programmierung vorliegen und welche Kurszeit passt. Wir melden uns persönlich zurück.
- E-Mail: info@mintventures.de
- WhatsApp: 015157596494
- Kursort: Hochschule Bonn-Rhein-Sieg, Campus Sankt Augustin
- Schulen & Institutionen: wählen Sie im Formular „Kooperation“.

### SEO fields

| URL | Title | Meta description | H1 |
|---|---|---|---|
| `/` | Robotik- & Programmierkurse für Kinder in Bonn \| MINT Ventures | Robotik und Programmieren für Kinder von 8–14 Jahren in Bonn und Sankt Augustin. Kleine Gruppen, LEGO SPIKE Prime, Wettbewerbe. Jetzt Probestunde anfragen. | Robotik- und Programmierkurse für Kinder von 8 bis 14 Jahren in Bonn und Sankt Augustin |
| `/kurse` | Kurse: Robotik, Programmieren & Workshops für Kinder \| MINT Ventures | Wochenendkurse, Wettbewerbsteams, Workshops und Feriencamps: Robotik und Programmieren für Kinder von 8–14 Jahren in Bonn und Sankt Augustin. | Unsere Kurse und Programme |
| `/kurse/robotik-wochenendkurs` | Robotik-Wochenendkurs für Kinder (8–14) in Sankt Augustin bei Bonn \| MINT Ventures | 12 Termine à 90 Min. mit LEGO SPIKE Prime an der H-BRS in Sankt Augustin. Max. 10 Kinder pro Gruppe. Start 07.11.2026, 349 € Einführungspreis. | Robotik-Wochenendkurs |
| `/kurse/wettbewerbsteams` | Robotik-Wettbewerbsteam für Kinder \| WRO-Vorbereitung Bonn \| MINT Ventures | Wettbewerbs-Intensivkurs für Kinder mit Robotik-Grundlagen: Training im Team und Vorbereitung auf Robotikwettbewerbe. Jetzt Interesse vormerken. | Wettbewerbsteams |
| `/kurse/workshops-feriencamps` | Robotik-Workshops & Feriencamps für Kinder in Bonn \| MINT Ventures | Robotik und Programmieren ausprobieren: Workshops (2–3 Std.) und Feriencamps für Kinder in Bonn und Umgebung. Aktuelle Termine und Anmeldung. | Workshops & Feriencamps |
| `/so-lernen-kinder` | So lernen Kinder Robotik & Programmieren \| Lernkonzept \| MINT Ventures | Unser Lernkonzept: zwei aufbauende Stufen, fünf Lernschritte von Mechanik bis KI und projektbasiertes Lernen in kleinen Gruppen in Bonn/Rhein-Sieg. | So lernen Kinder bei MINT Ventures |
| `/aktuelles` | Aktuelles: Robotik-Events & Workshops für Kinder \| MINT Ventures | Kommende Robotik-Workshops, Kursstarts und Rückblicke auf Wettbewerbe und Projekte von MINT Ventures in Bonn und Umgebung. | Aktuelles |
| `/aktuelles/[slug]` | [event title] \| MINT Ventures | [event-specific] | [event title] |
| `/kooperationen` | Robotik-AG & Projekttage für Schulen in Bonn \| MINT Ventures | Robotik-AGs, Projekttage, Workshops und Mitmachstationen für Schulen in Bonn und Rhein-Sieg. Wir bringen Roboter, Laptops und Material mit. | Robotik & Coding für Schulen und Bildungspartner |
| `/ueber-uns` | Über uns: Team & Mission \| MINT Ventures Bonn | Wer hinter MINT Ventures steht: Mission, Team und Projekte für Robotik- und Programmierbildung in Bonn/Rhein-Sieg. | Über MINT Ventures |
| `/kontakt` | Kontakt & Probestunde \| MINT Ventures Bonn | Probestunde anfragen, Kursplatz reservieren oder Kooperation besprechen – per Formular, E-Mail oder WhatsApp. | Fragen zu unseren Kursen oder Interesse an einer Probestunde? |

Once the course is running, update the Wochenendkurs meta description so it no longer advertises the 07.11.2026 start (generate it from the CourseRun).
