import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 section-padding">
        <div className="container-narrow max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("Datenschutzerklärung", "Privacy Policy")}
          </h1>

          <section className="mt-8 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("1. Datenschutz auf einen Blick", "1. Privacy at a Glance")}
            </h2>
            <h3 className="mt-3 font-medium text-foreground">
              {t("Allgemeine Hinweise", "General Information")}
            </h3>
            <p>
              {t(
                "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
                "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you."
              )}
            </p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("2. Verantwortliche Stelle", "2. Data Controller")}
            </h2>
            <p>Mint Ventures</p>
            <p>[Vor- und Nachname / Full Name]</p>
            <p>[Straße und Hausnummer / Street Address]</p>
            <p>[PLZ und Ort / Postal Code and City]</p>
            <p>E-Mail: info@mintventures.de</p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("3. Datenerfassung auf dieser Website", "3. Data Collection on This Website")}
            </h2>
            <h3 className="mt-3 font-medium text-foreground">
              {t("Kontaktformular", "Contact Form")}
            </h3>
            <p>
              {t(
                "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
                "When you send us inquiries via the contact form, your details from the form, including the contact data you provide, are stored by us for the purpose of processing your inquiry and for follow-up questions. We do not share this data without your consent."
              )}
            </p>
            <p>
              {t(
                "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse (Art. 6 Abs. 1 lit. f DSGVO).",
                "The processing of this data is based on Art. 6(1)(b) GDPR if your inquiry is related to the fulfillment of a contract or necessary for pre-contractual measures. In all other cases, processing is based on our legitimate interest (Art. 6(1)(f) GDPR)."
              )}
            </p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("4. Hosting", "4. Hosting")}
            </h2>
            <p>
              {t(
                "Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
                "This website is hosted externally. The personal data collected on this website is stored on the host's servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access, and other data generated via a website."
              )}
            </p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("5. Ihre Rechte", "5. Your Rights")}
            </h2>
            <p>
              {t(
                "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.",
                "You have the right to obtain free information about the origin, recipients, and purpose of your stored personal data at any time. You also have the right to request the correction or deletion of this data. You can contact us at any time regarding this and other questions about data protection."
              )}
            </p>
          </section>

          <section className="mt-6 space-y-2 text-sm text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              {t("6. Cookies", "6. Cookies")}
            </h2>
            <p>
              {t(
                "Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken. Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind.",
                "This website does not use cookies for tracking or analytics purposes. Only technically necessary cookies required for the operation of the website are used."
              )}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
