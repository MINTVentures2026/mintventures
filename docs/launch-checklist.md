# Launch checklist: your to-dos

Everything here needs a person (the owner, you, or a lawyer); Claude Code can't do it. The list is kept up to date while the phases are built. Plan references: §7 = open owner decisions, §6 = human-only tasks.

**Legend:** 🔴 blocks launch · 🟡 needed for a feature to show/work · ⚪ nice to have

Last updated: 2026-11-07 16:11 (after Phase 4)

## 1. Setup and accounts (you)

- [ ] 🔴 **SMTP sender for the contact form.** Create a mailbox at All-Inkl (e.g. `formular@mintventures.de`). In Vercel → Project → Settings → Environment Variables, set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (and `SMTP_PORT` if not 465). Details: README → Contact form.
- [ ] 🔴 **`FORM_SECRET`** in Vercel: 32+ random characters (e.g. `openssl rand -base64 32`). Without it the spam time trap is off.
- [ ] 🟡 **Nightly rebuild.** Vercel → Settings → Git → Deploy Hooks → create one for `main`; add its URL as GitHub secret `VERCEL_DEPLOY_HOOK_URL`. Without it, "Kurs läuft", recaps and expired buttons only update on the next push.
- [ ] 🔴 **Preview deployment check** (push `revamp-website`): security headers present, `/kontakt` form sends a real mail, `/kurse/robotik-wochenendkurs` loads without `.html`, unknown paths give 404.
- [ ] ⚪ Apex domain `mintventures.de` → `www`: change Vercel's redirect from 307 to 308 (permanent).
- [ ] 🔴 **QR codes** on flyers/roll-ups: confirm where they point (they must keep working; see `docs/url-inventory.md`).
- [ ] ⚪ Unpublish any old `*.lovable.app` copy of the site (duplicate content).

## 2. Owner decisions (plan §7 + new)

Until answered, the affected element stays hidden or uses the safe default shown.

| #   | Decision                                                                                   | Current default on the site                      | Blocks      |
| --- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ | ----------- |
| 1   | Course status (Anmeldung offen / Wenige Plätze) and **late entry** into the running cohort | "Kurs läuft", button "Interesse vormerken"       | 🟡          |
| 2   | Payment and cancellation terms                                                             | FAQ answer links to Teilnahmebedingungen         | 🔴 (via #4) |
| 3   | **Legal operator** for the Impressum (still "Inhaber: Dr. Weihong Zhao", Sankt Augustin?)  | Old Impressum data, marked "zu bestätigen"       | 🔴          |
| 4   | **Teilnahmebedingungen** content                                                           | Template with placeholders                       | 🔴          |
| 5   | Kurs 1 / Kurs 2 as age groups ("Junior"/"Teens")?                                          | Times only                                       | ⚪          |
| 6   | Module name "Denken wie Programmierer:innen" vs flyer "Denken wie ein Programmierer"       | Gender-neutral form                              | ⚪          |
| 7   | Brand colours and font vs logo/print files; a **transparent or SVG logo**                  | Green `#346D57`, yellow `#FBB72A`, Montserrat    | ⚪          |
| 8   | **WhatsApp number** 015157596494                                                           | Shown                                            | 🔴          |
| 9   | Code Week workshop end time                                                                | Start time only                                  | ⚪          |
| 10  | Team Explorers zdi result: event name, year, photo consent                                 | Hidden                                           | 🟡          |
| 11  | Roboternacht H-BRS: wording, date, team, source                                            | Hidden                                           | 🟡          |
| 12  | Code Week Auftakt 10.10.2026: did it happen?                                               | Hidden                                           | 🟡          |
| 13  | Maker Space and DFRobot: actual relationship                                               | Hidden                                           | 🟡          |
| 14  | Ferienprogramme for schools/OGS offered now?                                               | Line hidden on Kooperationen                     | 🟡          |
| 15  | Name the workshop robotics systems?                                                        | "andere Robotiksysteme"                          | ⚪          |
| 16  | Advisers for "Fachliche Begleitung" (name, title, photo permission)                        | Section hidden                                   | 🟡          |
| 17  | Next Grundlagenkurs date                                                                   | "voraussichtlich Februar/März 2027 – In Planung" | 🟡          |
| 18  | "Kooperationen" vs "Für Schulen"                                                           | Nav "Kooperationen", route `/kooperationen`      | ⚪          |
| 19  | Google Business Profile                                                                    | Not set up                                       | ⚪          |
| 20  | **Reply time** for the form confirmation ("innerhalb von … Werktagen")                     | "Wir melden uns persönlich per E-Mail"           | 🟡          |
| 21  | Module "Junge Erfinder" vs the banned old stage name "Erfinder"                            | Kept; only "Erfinder-Stufe" is blocked           | ⚪          |

## 3. Content the owner needs to supply

- [ ] 🟡 **Recap for the Code Week workshop (25.10.2026):** 3–5 sentences on what the children did, outcome, thanks, 2–5 photos with documented consent. Until then the event is hidden.
- [ ] 🟡 **Recap for the Kursstart (07.11.2026)**, if it should appear under "Rückblicke".
- [ ] 🟡 **Team:** names, public titles, roles, short bios, photos with consent. Until then "Über uns" shows the team text without person cards.
- [ ] 🟡 **Photo consent** for the 6 existing photos in `public/images/` (hero + gallery). None is shown until confirmed.
- [ ] ⚪ Exact days of past events (zdi, DIGITAL@School, Roboternacht); only the month is shown.
- [ ] ⚪ H-BRS street address for the venue (for event pages and structured data).

## 4. Legal and compliance (plan §6)

- [ ] 🔴 **Legal review** of Impressum, Datenschutz and Teilnahmebedingungen, including whether a Widerrufsbelehrung is needed for remotely concluded course contracts, and whether the BFSG accessibility law applies.
- [ ] 🔴 **Datenschutz** draft on `/datenschutz` describes what is actually used (Vercel hosting + function in Frankfurt, enquiry mail via All-Inkl SMTP, no cookies/analytics, self-hosted fonts, WhatsApp/OpenStreetMap only as links). Fill the yellow **[Offen: …]** markers: Vercel provider data, AVV and US-transfer basis, log retention; All-Inkl company data and AVV; retention of enquiries in the mailbox.
- [ ] 🔴 **Impressum** draft on `/impressum` uses the old site's data (Inhaber Dr. Weihong Zhao, Elsa-Brandström-Straße 13, 53757 Sankt Augustin). Confirm operator and legal form (decision #3) and add a second contact route (e.g. phone) if the lawyer says it's required.
- [ ] 🔴 **Teilnahmebedingungen** template on `/teilnahmebedingungen`: fill scope, contract formation, payment, cancellation/Widerruf, cancellation by MINT Ventures, supervision/liability, photo consent process. Probestunde terms and fee are already filled from the course data.
- [ ] 🔴 When all three are final: set `confirmed: true` in `src/config/legal.ts` (removes the draft notice and the `noindex`; Claude Code can do this once you confirm).
- [ ] 🔴 **Data processing agreements (AVV)** with Vercel and All-Inkl (and any CMS provider in Phase 6).
- [ ] 🔴 **Written parental consent** for every photo of a child that is published.
- [ ] 🟡 **Child-safety policy** before any Kinderschutz page or claim.
- [ ] ⚪ Google Business Profile eligibility (no virtual office).

## 5. After launch (plan §6)

- [ ] Search Console: keep the property (verification tag is in the new site), submit the new sitemap, inspect key URLs.
