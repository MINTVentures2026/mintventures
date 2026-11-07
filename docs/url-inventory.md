# URL inventory and redirect map (Website 1.0 → 2.0)

Audited 2026-11-07 against https://www.mintventures.de (Vite/React SPA on Vercel, build `index-DXVFBal5.js`).

## 1. Existing URLs

| URL                           | Status today                         | Notes                                                                             |
| ----------------------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| `https://mintventures.de/*`   | 307 → `https://www.mintventures.de/` | Vercel domain redirect. Should be permanent (308) — dashboard setting, human task |
| `/`                           | 200                                  | The whole site. All content is client-rendered (empty HTML without JS)            |
| `/impressum`                  | 200                                  | Client route (rewrite in `vercel.json`)                                           |
| `/datenschutz`                | 200                                  | Client route (rewrite in `vercel.json`)                                           |
| `/index.html`                 | 200                                  | Duplicate of `/`                                                                  |
| `/sitemap.xml`, `/robots.txt` | 200                                  | Sitemap lists `/`, `/impressum`, `/datenschutz` only                              |
| `/en`, `/en/`                 | 404                                  | English was a client-side toggle only; never had its own URL                      |
| `/__l5e/assets-v1/*`          | 404                                  | No Lovable asset routes are in use; every asset is already in the repo            |
| `/og-image.png`               | 404                                  | No dedicated OG image; OG uses the hero photo                                     |

Section anchors on `/` (navigation used `/#id`): `#kurse`, `#konzept`, `#lernstufen`, `#ueber`, `#faq`, `#kontakt`.

## 2. Redirect map

| Old                         | New                                | Type                                        |
| --------------------------- | ---------------------------------- | ------------------------------------------- |
| `/`                         | `/`                                | unchanged                                   |
| `/impressum`                | `/impressum`                       | unchanged                                   |
| `/datenschutz`              | `/datenschutz`                     | unchanged                                   |
| `/index.html`               | `/`                                | 301                                         |
| `/en`, `/en/*`              | –                                  | stays 404 (no English pages yet)            |
| `/#kurse`                   | `/kurse`                           | client-side (hashes never reach the server) |
| `/#konzept`, `/#lernstufen` | `/so-lernen-kinder`                | client-side                                 |
| `/#ueber`                   | `/ueber-uns`                       | client-side                                 |
| `/#faq`                     | `/kurse/robotik-wochenendkurs#faq` | client-side                                 |
| `/#kontakt`                 | `/kontakt`                         | client-side                                 |

Hash redirects can only be done by a small same-origin script on `/` (CSP allows `script-src 'self'`). They are low value: only old in-page links use them. Decide in Phase 5 whether to ship it.

## 3. Assets to carry over

All live in the repo already; nothing has to be downloaded from Lovable.

| File                                                                                                  | Size   | Pixels    | Used for       | Consent                                                 |
| ----------------------------------------------------------------------------------------------------- | ------ | --------- | -------------- | ------------------------------------------------------- |
| `src/assets/logo.png`                                                                                 | 70 kB  | 1284×243  | Header logo    | –                                                       |
| `public/images/hero-zdi-roboterwettbewerb.jpg`                                                        | 364 kB | 971×1018  | Hero, OG image | `VERIFY` (children visible)                             |
| `public/images/gallery-zdi-team.jpg`                                                                  | 527 kB | 1000×731  | Gallery        | `VERIFY`                                                |
| `public/images/gallery-digital-school-event.jpg`                                                      | 977 kB | 1824×1368 | Gallery        | `VERIFY`                                                |
| `public/images/gallery-digital-school-workshop.jpg`                                                   | 150 kB | 1920×1279 | Gallery        | `VERIFY`                                                |
| `public/images/gallery-robotics-teamwork.jpg`                                                         | 457 kB | 1352×925  | Gallery        | `VERIFY`; has EXIF (DateTimeOriginal, Software) → strip |
| `public/images/gallery-spike-coding.jpg`                                                              | 38 kB  | 317×195   | Gallery        | `VERIFY`; too small for anything but a thumbnail        |
| `public/favicon.ico`, `favicon.png`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` |        |           | Icons          | –                                                       |

No GPS data found in any image. `public/placeholder.svg` is unused.

## 4. Banned content on the current site (§1 rules 2–3)

| Where                                    | Text                                                                                                                   |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `index.html` meta/OG/Twitter description | "…für Kinder in Bonn **Bad Godesberg**…"                                                                               |
| `ProgramDetails.tsx:11`                  | Ort: "**Bad Godesberg**, Bonn (genaue Adresse auf Anfrage)"                                                            |
| `ProgramDetails.tsx:12`                  | "**Kursstart ab November 2026 – Probestunden & Anmeldung auf Anfrage**"                                                |
| `ContactSection.tsx:30`                  | "**Kostenlose Probestunde** vereinbaren"                                                                               |
| `ContactSection.tsx:42`                  | "Unverbindlich & **kostenlos**"                                                                                        |
| `FAQSection.tsx:23`                      | participants "aus Bonn, **Bad Godesberg**, …" (not a venue claim, but drop with the rewrite)                           |
| `LernstufenSection.tsx:9,22,24,35,37`    | old stage names **Entdecker-Stufe**, **Erfinder-Stufe**, **Challenge-Stufe**, "junge **Tüftler**"                      |
| `SocialProofBadges.tsx:16`               | badge titled "**Partner**" (check against verified relationships)                                                      |
| `Datenschutz.tsx:46-50`                  | describes a **Kontaktformular** that does not exist yet (becomes true once the v2 form ships; text needs legal review) |

## 5. Human task (not done by Claude Code)

- [ ] Confirm where the flyer / roll-up QR codes point. If they target `/`, `/#kurse` or any path above, they keep working via this map. Any other target must be added here.
- [ ] Check whether a Lovable publish URL (`*.lovable.app`) is still live and indexed; unpublish it to avoid duplicate content.
- [ ] Switch the apex-domain redirect in Vercel from 307 to 308 (permanent).
