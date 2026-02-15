import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
      <div className="container-narrow flex items-center justify-between px-5 py-3 md:px-8">
        <a href="#" className="flex items-center">
          <img src={logo} alt="MINT Ventures – Build. Code. Inspire." className="h-10" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </a>
          ))}

          <div className="flex items-center gap-0.5 rounded-full border border-border px-1 py-0.5 text-sm">
            <button
              onClick={() => setLang("de")}
              className={`rounded-full px-2.5 py-1 font-semibold transition-all ${lang === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >DE</button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 font-semibold transition-all ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >EN</button>
          </div>

          <a href="#kontakt" className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/15 transition-all hover:brightness-110 hover:-translate-y-0.5">
            {t("Probestunde anfragen", "Request a trial session")}
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">{l.label}</a>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => setLang("de")} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "de" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>DE</button>
              <button onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "en" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>EN</button>
            </div>
            <a href="#kontakt" onClick={() => setOpen(false)} className="mt-2 rounded-2xl bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">
              {t("Probestunde anfragen", "Request a trial session")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
