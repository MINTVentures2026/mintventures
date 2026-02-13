import { useLang } from "@/contexts/LanguageContext";
import { Compass, Lightbulb, Trophy } from "lucide-react";

const LernstufenSection = () => {
  const { t } = useLang();

  const levels = [
    {
      icon: Compass,
      title: t("Entdecker-Stufe", "Explorer level"),
      age: t("ca. 6–9 Jahre / Anfänger", "approx. 6–9 years / beginners"),
      bullets: [
        t("SPIKE Prime kennenlernen", "Get to know SPIKE Prime"),
        t("Einfache Fahrgestelle", "Simple chassis builds"),
        t("Erste Sensor-Abenteuer", "First sensor adventures"),
        t('Schnelle Erfolge: „Mein Roboter fährt!"', 'Quick wins: "My robot moves!"'),
      ],
      goal: t(
        "Ziel: Begeisterung wecken & Selbstvertrauen aufbauen",
        "Goal: Spark enthusiasm & build confidence"
      ),
    },
    {
      icon: Lightbulb,
      title: t("Erfinder-Stufe", "Inventor level"),
      age: t("ca. 9–12 Jahre", "approx. 9–12 years"),
      bullets: [
        t("Komplexere Mechanik", "More complex mechanics"),
        t("Übergang zu Python", "Transition to Python"),
        t("Multi-Sensor-Projekte", "Multi-sensor projects"),
        t("Iteratives Verbessern", "Iterative improvement"),
      ],
      goal: t(
        'Ziel: Von „Es geht" zu „Ich habe eine clevere Lösung erfunden"',
        'Goal: From "It works" to "I invented a clever solution"'
      ),
    },
    {
      icon: Trophy,
      title: t("Challenge-Stufe", "Challenge level"),
      age: t("ca. 9–12 Jahre fortgeschritten", "approx. 9–12 years advanced"),
      bullets: [
        t("FLL-Vorbereitung", "FLL preparation"),
        t("Präzisionsroboter", "Precision robots"),
        t("Eigene Innovationsprojekte", "Own innovation projects"),
        t("Team-Strategie & Pitch-Training", "Team strategy & pitch training"),
      ],
      goal: t(
        "Ziel: Bereit für FIRST LEGO League Challenge – mit Stolz & Kreativität",
        "Goal: Ready for FIRST LEGO League Challenge — with pride & creativity"
      ),
    },
  ];

  return (
    <section id="lernstufen" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t(
            "Unsere Lernstufen – passgenau für jedes Kind",
            "Our learning levels — tailored for every child"
          )}
        </h2>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {t(
            "Kinder steigen flexibel ein – je nach Alter, Vorerfahrung und Tempo.",
            "Kids join flexibly — based on age, experience, and pace."
          )}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {levels.map((level, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <level.icon size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">{level.title}</h3>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {level.age}
              </span>
              <ul className="mt-4 flex-1 space-y-2">
                {level.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-3 text-sm font-medium text-primary">
                {level.goal}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LernstufenSection;
