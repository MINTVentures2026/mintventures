import { useState, FormEvent } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder — show success
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Interesse? Lasst uns sprechen!", "Interested? Let's talk!")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t(
            "Sag mir Alter, Vorerfahrung und Wohnort – ich schlage dir den nächsten passenden Termin vor.",
            "Tell me the child's age, experience, and location — I'll suggest the next suitable session."
          )}
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              {t("Vielen Dank! Ich melde mich bald.", "Thank you! I'll be in touch soon.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  {t("Name (Elternteil)", "Name (parent)")}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">E-Mail</label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  {t("Kind Alter", "Child's age")}
                </label>
                <input
                  type="text"
                  required
                  maxLength={20}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  {t("Wohnort", "Location")}
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Bonn / Köln / …"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {t("Nachricht", "Message")}
              </label>
              <textarea
                rows={4}
                maxLength={1000}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-mint-600 hover:shadow-xl sm:w-auto"
            >
              {t("Anfrage senden", "Send request")}
            </button>
          </form>
        )}

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="mailto:info@mintventures.de" className="flex items-center gap-2 hover:text-foreground">
            <Mail size={16} /> info@mintventures.de
          </a>
          <a
            href="https://wa.me/4915123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground"
          >
            <Phone size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
