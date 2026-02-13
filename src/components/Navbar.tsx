import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#kurse", label: t("Kurse", "Courses") },
    { href: "#konzept", label: t("Konzept", "Method") },
    { href: "#ueber", label: t("Über uns", "About") },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: t("Kontakt", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between px-5 py-3 md:px-8">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          <span className="text-primary">Mint</span> Ventures
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="flex items-center gap-1 rounded-md border border-border px-1 text-sm">
            <button
              onClick={() => setLang("de")}
              className={`rounded px-2 py-1 font-medium transition-colors ${lang === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              DE
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded px-2 py-1 font-medium transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
          </div>

          <a
            href="#kontakt"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-mint-600"
          >
            {t("Probestunde anfragen", "Request a trial session")}
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setLang("de")}
                className={`rounded px-3 py-1 text-sm font-medium ${lang === "de" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}
              >
                DE
              </button>
              <button
                onClick={() => setLang("en")}
                className={`rounded px-3 py-1 text-sm font-medium ${lang === "en" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}
              >
                EN
              </button>
            </div>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              {t("Probestunde anfragen", "Request a trial session")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
