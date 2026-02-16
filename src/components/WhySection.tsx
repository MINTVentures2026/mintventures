import { useLang } from "@/contexts/LanguageContext";
import { ShieldCheck, Brain, Sparkles } from "lucide-react";

const WhySection = () => {
  const { t } = useLang();

  const outcomes = [
    { icon: ShieldCheck, text: t("tiefes Selbstvertrauen", "Deep self-confidence"), accent: "bg-warm-yellow/12 text-amber-600" },
    { icon: Brain, text: t("strukturiertes Denken", "Structured thinking"), accent: "bg-sky-blue/12 text-sky-600" },
    { icon: Sparkles, text: t("echte Problemlösekompetenz", "Real problem-solving skills"), accent: "bg-soft-coral/12 text-orange-600" },
  ];

  return (
    <section className="section-padding bg-tint-cream">
      <div className="container-narrow">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Warum MINT Ventures?", "Why MINT Ventures?")}
        </h2>

        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p className="font-semibold text-foreground leading-snug">
            {t(
              "Robotik und Coding gehören bei uns untrennbar zusammen. Kein reines Bildschirm-Programmieren. Kein reines Nachbauen.",
              "With us, robotics and coding go hand in hand. No screen-only programming. No just following instructions."
            )}
          </p>
          <p>
            {t(
              "Echtes Lernen entsteht, wenn Kinder Roboter bauen – und selbst zum Leben erwecken.",
              "Real learning happens when kids build robots — and bring them to life themselves."
            )}
          </p>
          <p>
            {t(
              'Kinder entwickeln eigene Ideen, testen sie mutig, scheitern – und verbessern Schritt für Schritt. So entsteht nicht nur ein funktionierender Roboter, sondern vor allem das starke Gefühl: „Das habe ich selbst verstanden, gebaut und zum Laufen gebracht."',
              'Kids develop their own ideas, test them boldly, fail — and improve step by step. The result isn\'t just a working robot, but above all the powerful feeling: "I understood it, built it, and made it work myself."'
            )}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            {t("Das schafft", "This creates")}
          </p>
          <div className="flex flex-wrap gap-3">
            {outcomes.map((item, i) => (
              <div key={i} className="card-lift flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.accent}`}>
                  <item.icon size={18} />
                </span>
                <p className="text-sm font-semibold text-foreground md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
