import { useLang } from "@/contexts/LanguageContext";
import { ShieldCheck, Brain, Sparkles } from "lucide-react";

const WhySection = () => {
  const { t } = useLang();

  const outcomes = [
    { icon: ShieldCheck, text: t("tiefes Selbstvertrauen", "Deep self-confidence"), color: "bg-fun-orange/15 text-fun-orange" },
    { icon: Brain, text: t("strukturiertes Denken", "Structured thinking"), color: "bg-fun-purple/15 text-fun-purple" },
    { icon: Sparkles, text: t("echte Problemlösekompetenz", "Real problem-solving skills"), color: "bg-fun-pink/15 text-fun-pink" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-sky-50/80 via-blue-50/50 to-indigo-50/60 deco-stars">
      <div className="container-narrow relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Warum MINT Ventures?", "Why MINT Ventures?")} <span className="text-primary">💡</span>
        </h2>

        <div className="mt-5 space-y-3 text-lg leading-relaxed text-muted-foreground">
          <p className="text-xl font-semibold text-foreground">
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
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
            {t("Das schafft", "This creates")}
          </p>
          <div className="flex flex-wrap gap-4">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-5 py-3 shadow-sm card-bounce">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon size={22} />
                </span>
                <p className="text-lg font-semibold text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
