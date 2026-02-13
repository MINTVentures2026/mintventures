import { useLang } from "@/contexts/LanguageContext";
import { Brain, Rocket, Wrench, Bug } from "lucide-react";

const GainsSection = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: Brain,
      title: t("Strukturiertes Denken", "Structured thinking"),
      desc: t(
        "Logik, Muster erkennen, Schritt-für-Schritt planen.",
        "Logic, patterns, step-by-step planning."
      ),
    },
    {
      icon: Rocket,
      title: t("Selbstvertrauen durch Machen", "Confidence through building"),
      desc: t(
        "Eigene Ideen umsetzen – nicht nur Anleitungen nachbauen.",
        "Turning ideas into working projects — not just following instructions."
      ),
    },
    {
      icon: Wrench,
      title: t("Hands-on Engineering", "Hands-on engineering"),
      desc: t(
        "Mit Motoren, Sensoren und Modulen bauen sie Roboter, Fahrzeuge oder Kreaturen.",
        "Building robots, vehicles, and creatures with motors, sensors, and modules."
      ),
    },
    {
      icon: Bug,
      title: t("Fehlerkultur & Debugging", "Debugging mindset"),
      desc: t(
        'Nicht „richtig/falsch", sondern testen, verbessern, iterieren.',
        'Testing, improving, iterating — instead of "right vs wrong".'
      ),
    },
  ];

  return (
    <section id="kurse" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Was gewinnen Kinder konkret?", "What will your child gain?")}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GainsSection;
