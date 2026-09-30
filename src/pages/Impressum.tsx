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
              {t("Angaben gemäß § 5 DDG", "Information pursuant to § 5 DDG")}
            </h2>
            <p>MINT Ventures</p>
            <p>{t("Inhaber:", "Owner:")}</p>
            <p>Dr. Weihong Zhao</p>
            <p>Elsa-Brandström-Straße 13</p>
            <p>53757, Sankt Augustin</p>
            <p>{t("Deutschland", "Germany")}</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Kontakt", "Contact")}
            </h2>
            <p>{t("E-Mail", "Email")}: info@mintventures.de</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", "Responsible for content pursuant to § 18 (2) MStV")}
            </h2>
            <p>Inhaber: Dr. Weihong Zhao</p>
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
                "Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Inhalte Dritter sind als solche gekennzeichnet.",
                "The content and works published on this website are subject to German copyright law. Third-party content is marked as such."
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
