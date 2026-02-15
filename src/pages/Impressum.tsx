import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Impressum = () => {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 section-padding">
        <div className="container-narrow max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("Impressum", "Legal Notice")}
          </h1>

          <section className="mt-8 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Angaben gemäß § 5 TMG", "Information pursuant to § 5 TMG")}
            </h2>
            <p>Mint Ventures</p>
            <p>[Vor- und Nachname / Full Name]</p>
            <p>[Straße und Hausnummer / Street Address]</p>
            <p>[PLZ und Ort / Postal Code and City]</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Kontakt", "Contact")}
            </h2>
            <p>E-Mail: info@mintventures.de</p>
            <p>{t("Telefon: [Telefonnummer]", "Phone: [Phone number]")}</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", "Responsible for content pursuant to § 18 (2) MStV")}
            </h2>
            <p>[Vor- und Nachname / Full Name]</p>
            <p>[Adresse / Address]</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Haftungsausschluss", "Disclaimer")}
            </h2>
            <h3 className="mt-3 font-medium text-foreground">
              {t("Haftung für Inhalte", "Liability for Content")}
            </h3>
            <p>
              {t(
                "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
                "The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content."
              )}
            </p>
            <h3 className="mt-3 font-medium text-foreground">
              {t("Haftung für Links", "Liability for Links")}
            </h3>
            <p>
              {t(
                "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.",
                "Our website contains links to external third-party websites over whose content we have no influence. The respective provider is always responsible for the content of the linked pages."
              )}
            </p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Urheberrecht", "Copyright")}
            </h2>
            <p>
              {t(
                "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.",
                "The content and works created by the site operators on these pages are subject to German copyright law. Third-party contributions are marked as such."
              )}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
