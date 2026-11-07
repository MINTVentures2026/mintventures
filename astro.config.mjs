// @ts-check
import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Every page is prerendered except /kontakt, which handles the enquiry form POST.
// Vercel builds with its adapter (VERCEL=1 is set there); locally the Node adapter lets
// `astro preview` and the Playwright tests run the exact same page code.
const adapter = process.env.VERCEL ? vercel() : node({ mode: "standalone" });

export default defineConfig({
  site: "https://www.mintventures.de",
  output: "static",
  adapter,
  // URLs without trailing slash. Directory format (kurse/index.html) because /kurse also has
  // sub-pages, and it is what the Vercel adapter emits anyway.
  trailingSlash: "never",
  build: { format: "directory" },
  env: {
    schema: {
      // SMTP account that sends enquiries (plan §2: EU provider with AVV; All-Inkl hosts the mailbox).
      SMTP_HOST: envField.string({ context: "server", access: "secret", optional: true }),
      SMTP_PORT: envField.number({ context: "server", access: "secret", default: 465 }),
      SMTP_USER: envField.string({ context: "server", access: "secret", optional: true }),
      SMTP_PASS: envField.string({ context: "server", access: "secret", optional: true }),
      MAIL_TO: envField.string({ context: "server", access: "secret", default: "info@mintventures.de" }),
      // "log" prints enquiries instead of sending them. Local development and tests only.
      MAIL_TRANSPORT: envField.enum({ context: "server", access: "secret", values: ["smtp", "log"], default: "smtp" }),
      // Signs the time-trap token of the form.
      FORM_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      FORM_MIN_SECONDS: envField.number({ context: "server", access: "secret", default: 3 }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Never inline scripts: the CSP in vercel.json only allows script-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
});
