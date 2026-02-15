import { useLang } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border/60 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-pink-50/30 px-5 py-8 md:px-8">
      <div className="container-narrow flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <span className="font-semibold">© {new Date().getFullYear()} Mint Ventures</span>
        <div className="flex gap-4">
          <Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-primary transition-colors">{t("Datenschutz", "Privacy Policy")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
