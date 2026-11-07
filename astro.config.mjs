// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.mintventures.de",
  output: "static",
  // "/kurse" is served from kurse.html (vercel.json cleanUrls); no trailing-slash duplicates.
  trailingSlash: "never",
  build: { format: "file" },
  vite: {
    plugins: [tailwindcss()],
    // Never inline scripts: the CSP in vercel.json only allows script-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
});
