import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border/40 bg-muted/30 px-5 py-7 md:px-8">
      <div className="container-narrow flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Mint Ventures</span>
        <div className="flex gap-4">
          <Link to="/impressum" className="transition-colors hover:text-foreground">Impressum</Link>
          <Link to="/datenschutz" className="transition-colors hover:text-foreground">{t("Datenschutz", "Privacy Policy")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
