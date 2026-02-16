import { useLang } from "@/contexts/LanguageContext";
import { Mail, MessageCircle, Heart, MapPin } from "lucide-react";

const ContactSection = () => {
  const { t } = useLang();

  return (
    <section id="kontakt" className="relative section-padding overflow-hidden bg-gradient-to-br from-primary/8 via-tech-blue/4 to-soft-purple/6">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/6 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-vibrant-orange/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-narrow max-w-2xl relative z-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Interesse? Lass uns persönlich sprechen.", "Interested? Let's talk personally.")}
        </h2>
        <p className="mt-3 text-base text-muted-foreground md:text-lg leading-relaxed">
          {t(
            "Du hast Fragen zu unseren Kursen oder möchtest herausfinden, ob MINT Ventures zu deinem Kind passt? Schreib uns gerne direkt – wir antworten persönlich und zeitnah.",
            "Have questions about our courses or want to find out if MINT Ventures is right for your child? Write to us directly — we respond personally and promptly."
          )}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            { icon: MessageCircle, text: t("Persönliche Rückmeldung (keine automatischen Antworten)", "Personal response (no automated replies)") },
            { icon: Heart, text: t("Unverbindlich & kostenlos", "No commitment & free") },
            { icon: MapPin, text: t("Erfahrung mit Kindern in Bonn & Umgebung", "Experience with kids in Bonn & surroundings") },
          ].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-xs font-bold text-primary">
              <item.icon size={13} /> {item.text}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="mailto:info@mintventures.de"
            className="btn-vibrant inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vibrant-orange to-warm-yellow px-8 py-4 text-base font-bold text-white shadow-lg shadow-vibrant-orange/20"
          >
            <Mail size={18} />
            {t("Jetzt per E-Mail anfragen", "Send us an email")}
          </a>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          info@mintventures.de
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
