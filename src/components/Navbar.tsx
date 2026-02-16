import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { anchor: "kurse", label: t("Kurse", "Courses") },
    { anchor: "konzept", label: t("Konzept", "Method") },
    { anchor: "ueber", label: t("Über uns", "About") },
    { anchor: "faq", label: "FAQ" },
    { anchor: "kontakt", label: t("Kontakt", "Contact") },
  ];

  const handleNav = useCallback(
    (anchor: string) => {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/#" + anchor);
      } else {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate],
  );

  const handleLogoClick = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl">
      <div className="container-narrow flex items-center justify-between px-5 py-3 md:px-8">
        <button onClick={handleLogoClick} className="flex items-center">
          <img src={logo} alt="MINT Ventures – Build. Code. Inspire." className="h-10" />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <button key={l.anchor} onClick={() => handleNav(l.anchor)} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </button>
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

          <button onClick={() => handleNav("kontakt")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/10 transition-all hover:brightness-105 hover:-translate-y-0.5">
            {t("Probestunde anfragen", "Request a trial session")}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <button key={l.anchor} onClick={() => handleNav(l.anchor)} className="text-left text-sm font-semibold text-muted-foreground">{l.label}</button>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => setLang("de")} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "de" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>DE</button>
              <button onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${lang === "en" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>EN</button>
            </div>
            <button onClick={() => handleNav("kontakt")} className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">
              {t("Probestunde anfragen", "Request a trial session")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
