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
    },
    {
      icon: Rocket,
      title: t("Selbstwirksamkeit & Stolz", "Self-efficacy & pride"),
      desc: t(
        'Eigene Ideen zum Leben erwecken – und sehen: „Das habe ich geschafft."',
        'Bringing their own ideas to life — and seeing: "I did it."'
      ),
    },
    {
      icon: Wrench,
      title: t("Hands-on Ingenieurskunst", "Hands-on engineering"),
      desc: t(
        "Mit Motoren, Sensoren und Code funktionierende Roboter bauen.",
        "Building working robots with motors, sensors, and code."
      ),
    },
    {
      icon: Bug,
      title: t("Debugging-Mindset", "Debugging mindset"),
      desc: t(
        "Testen, scheitern, verbessern, iterieren – bis es wirklich funktioniert.",
        "Test, fail, improve, iterate — until it really works."
      ),
    },
  ];

  return (
    <section id="kurse" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Was Ihr Kind konkret mitnimmt", "What your child will gain")}
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
