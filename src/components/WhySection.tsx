import { useLang } from "@/contexts/LanguageContext";
import { ShieldCheck, Brain, Sparkles } from "lucide-react";

const WhySection = () => {
  const { t } = useLang();

  const outcomes = [
    { icon: ShieldCheck, text: t("tiefes Selbstvertrauen", "Deep self-confidence"), color: "bg-sunshine/15 text-amber-600" },
    { icon: Brain, text: t("strukturiertes Denken", "Structured thinking"), color: "bg-sky/15 text-sky-600" },
    { icon: Sparkles, text: t("echte Problemlösekompetenz", "Real problem-solving skills"), color: "bg-coral/15 text-orange-600" },
  ];

  return (
    <section className="section-padding bg-section-tint">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Warum MINT Ventures?", "Why MINT Ventures?")}
        </h2>

        <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p className="font-medium text-foreground">
            {t(
              "Echtes Lernen entsteht, wenn Kinder Roboter bauen – und selbst zum Leben erwecken.",
              "Real learning happens when kids build robots — and bring them to life themselves."
            )}
          </p>
          <p>
            {t(
              "Bei uns gehören Robotik und Coding untrennbar zusammen. Kein reines Bildschirm-Programmieren. Kein reines Nachbauen.",
              "With us, robotics and coding go hand in hand. No screen-only programming. No just following instructions."
            )}
          </p>
          <p>
            {t(
              'Kinder entwickeln eigene Ideen, testen sie mutig, scheitern – und verbessern Schritt für Schritt. So entsteht nicht nur ein funktionierender Roboter, sondern vor allem das starke Gefühl: „Das habe ich selbst verstanden, gebaut und zum Laufen gebracht."',
              'Kids develop their own ideas, test them boldly, fail — and improve step by step. The result isn\'t just a working robot, but above all the powerful feeling: "I understood it, built it, and made it work myself."'
            )}
          </p>
        </div>

        <div className="mt-7">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("Das schafft", "This creates")}
          </p>
          <div className="space-y-3">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon size={20} />
                </span>
                <p className="text-base font-medium text-foreground md:text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
