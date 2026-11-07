// Site-wide facts and navigation. Content that the owner edits (courses, events, people)
// does not belong here; it moves into content collections in Phase 2.

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export const site = {
  name: "MINT Ventures",
  url: "https://www.mintventures.de",
  claim: "Kinder gestalten Technologie. Nicht nur konsumieren.",
  tagline: "Coding · Robotik · Zukunftskompetenzen",
  email: "info@mintventures.de",
  whatsapp: {
    display: "015157596494",
    link: "https://wa.me/4915157596494",
    // Open owner decision #8: confirm the number before launch.
    verified: false,
  },
  venue: "H-BRS Campus Sankt Augustin",
  // Open owner decision #3: legal operator from the Impressum. Not rendered while null.
  legalOperator: null as string | null,
} as const;

export const trialHref = "/kontakt?anliegen=probestunde";

export const mainNav: NavItem[] = [
  {
    label: "Kurse",
    href: "/kurse",
    children: [
      { label: "Robotik-Wochenendkurs", href: "/kurse/robotik-wochenendkurs" },
      { label: "Wettbewerbsteams", href: "/kurse/wettbewerbsteams" },
      { label: "Workshops & Feriencamps", href: "/kurse/workshops-feriencamps" },
    ],
  },
  { label: "So lernen Kinder", href: "/so-lernen-kinder" },
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Kooperationen", href: "/kooperationen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav: NavLink[] = [
  { label: "Kurse", href: "/kurse" },
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Kooperationen", href: "/kooperationen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

// Kinderschutz and Cookie-Einstellungen are added only once they exist (plan §3.4).
export const legalNav: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Teilnahmebedingungen", href: "/teilnahmebedingungen" },
];
