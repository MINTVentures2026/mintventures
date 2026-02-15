import { useState, FormEvent } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { Mail, Phone, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const parent_name = (formData.get("parent_name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const child_age = (formData.get("child_age") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const message = (formData.get("message") as string)?.trim() || null;

    const { error: insertError } = await supabase
      .from("contact_requests")
      .insert({ parent_name, email, child_age, location, message });

    if (insertError) {
      setLoading(false);
      setError(t("Etwas ist schiefgelaufen. Bitte versuche es erneut.", "Something went wrong. Please try again."));
      return;
    }

    supabase.functions.invoke("send-contact-notification", {
      body: { parent_name, email, child_age, location, message },
    }).catch((err) => console.error("Email notification failed:", err));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="section-padding relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/80 to-yellow-50/60">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-fun-orange/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-fun-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-narrow max-w-2xl relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Interesse? Lasst uns sprechen!", "Interested? Let's talk!")} <span className="text-fun-orange">🚀</span>
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {t(
            "Sag mir Alter, Vorerfahrung und Wohnort – ich schlage dir den nächsten passenden Termin vor.",
            "Tell me the child's age, experience, and location — I'll suggest the next suitable session."
          )}
        </p>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fun-orange/20 bg-fun-orange/10 px-4 py-2 text-sm font-semibold text-amber-800">
            <Clock size={14} />
            {t("Antwort innerhalb von 24h", "Response within 24h")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fun-green/20 bg-fun-green/10 px-4 py-2 text-sm font-semibold text-emerald-800">
            <ShieldCheck size={14} />
            {t("Unverbindlich & kostenlos", "No commitment & free")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fun-purple/20 bg-fun-purple/10 px-4 py-2 text-sm font-semibold text-purple-800">
            <Sparkles size={14} />
            {t("Probestunde möglich", "Trial session available")}
          </span>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/5 to-fun-purple/5 p-8 text-center">
            <p className="text-xl font-bold text-foreground">
              🎉 {t("Vielen Dank! Ich melde mich bald.", "Thank you! I'll be in touch soon.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">
                  {t("Name (Elternteil)", "Name (parent)")}
                </label>
                <input
                  type="text"
                  name="parent_name"
                  required
                  maxLength={100}
                  className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none ring-ring transition-all focus:ring-2 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={255}
                  className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none ring-ring transition-all focus:ring-2 focus:border-primary"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">
                  {t("Kind Alter", "Child's age")}
                </label>
                <input
                  type="text"
                  name="child_age"
                  required
                  maxLength={20}
                  className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none ring-ring transition-all focus:ring-2 focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-foreground">
                  {t("Wohnort", "Location")}
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  maxLength={100}
                  placeholder="Bonn / Köln / …"
                  className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none ring-ring transition-all focus:ring-2 focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-foreground">
                {t("Nachricht", "Message")}
              </label>
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none ring-ring transition-all focus:ring-2 focus:border-primary"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-fun-orange to-fun-yellow px-8 py-4 text-base font-bold text-white shadow-lg shadow-fun-orange/30 transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-105 disabled:opacity-50 sm:w-auto"
            >
              {loading
                ? t("Wird gesendet… ⏳", "Sending… ⏳")
                : t("Anfrage senden ✨", "Send request ✨")}
            </button>
          </form>
        )}

        <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="mailto:info@mintventures.de" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Mail size={16} /> info@mintventures.de
          </a>
          <a href="https://wa.me/4915123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Phone size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
