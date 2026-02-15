import { useLang } from "@/contexts/LanguageContext";
import { Brain, Rocket, Wrench, Bug } from "lucide-react";

const GainsSection = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: Brain,
      title: t("Strukturiertes Denken", "Structured thinking"),
      desc: t(
        "Probleme erkennen, zerlegen und systematisch lösen.",
        "Recognize problems, break them down, and solve them systematically."
      ),
      accent: "bg-sunshine/15 text-amber-600",
    },
    {
      icon: Rocket,
      title: t("Selbstwirksamkeit & Stolz", "Self-efficacy & pride"),
      desc: t(
        'Eigene Ideen zum Leben erwecken – und sehen: „Das habe ich geschafft."',
        'Bringing their own ideas to life — and seeing: "I did it."'
      ),
      accent: "bg-coral/15 text-orange-600",
    },
    {
      icon: Wrench,
      title: t("Hands-on Ingenieurskunst", "Hands-on engineering"),
      desc: t(
        "Mit Motoren, Sensoren und Code funktionierende Roboter bauen.",
        "Building working robots with motors, sensors, and code."
      ),
      accent: "bg-sky/15 text-sky-600",
    },
    {
      icon: Bug,
      title: t("Debugging-Mindset", "Debugging mindset"),
      desc: t(
        "Testen, scheitern, verbessern, iterieren – bis es wirklich funktioniert.",
        "Test, fail, improve, iterate — until it really works."
      ),
      accent: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section id="kurse" className="section-padding decorative-gears">
      <div className="container-narrow relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Was Ihr Kind konkret mitnimmt", "What your child will gain")}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.accent}`}>
                <c.icon size={22} />
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
