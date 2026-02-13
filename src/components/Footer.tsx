import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="border-t border-border bg-secondary/30 px-5 py-8 md:px-8">
      <div className="container-narrow flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Mint Ventures</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">Impressum</a>
          <a href="#" className="hover:text-foreground">{t("Datenschutz", "Privacy Policy")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
