import { useLang } from "@/contexts/LanguageContext";
import { Brain, Rocket, Wrench, Bug } from "lucide-react";

const GainsSection = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: Brain,
      title: t("Strukturiertes Denken", "Structured thinking"),
      desc: t(
        "Logik, Muster erkennen, Aufgaben in kleine Schritte zerlegen – die Basis für jedes Problemlösen.",
        "Logic, pattern recognition, breaking tasks into small steps — the foundation for all problem-solving."
      ),
    },
    {
      icon: Rocket,
      title: t("Selbstwirksamkeit & Stolz", "Self-efficacy & pride"),
      desc: t(
        "Eigene Ideen zum Leben erwecken – und dabei erleben, dass man wirklich etwas bewirken kann.",
        "Bringing their own ideas to life — and experiencing that they can truly make a difference."
      ),
    },
    {
      icon: Wrench,
      title: t("Hands-on Ingenieurskunst", "Hands-on engineering"),
      desc: t(
        "Mit Zahnrädern, Sensoren und Motoren bauen Kinder Roboter, Fahrzeuge und kreative Maschinen.",
        "With gears, sensors, and motors, kids build robots, vehicles, and creative machines."
      ),
    },
    {
      icon: Bug,
      title: t("Debugging-Mindset", "Debugging mindset"),
      desc: t(
        "Testen, scheitern, verbessern, iterieren – Fehler sind kein Problem, sondern der Weg zur Lösung.",
        "Test, fail, improve, iterate — mistakes aren't problems, they're the path to the solution."
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
