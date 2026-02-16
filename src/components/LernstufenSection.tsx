import { useLang } from "@/contexts/LanguageContext";

const LernstufenSection = () => {
  const { t } = useLang();

  const levels = [
    {
      bar: "from-primary to-sky-blue",
      borderHover: "hover:border-primary/30",
      title: t("Entdecker-Stufe", "Explorer Level"),
      age: t("ca. 8–9 Jahre (oder absolute Anfänger)", "approx. 8–9 years (or complete beginners)"),
      bullets: [
        t("SPIKE Prime kennenlernen: Motoren, Sensoren, erste Bauteile", "Get to know SPIKE Prime: motors, sensors, first components"),
        t("Einfache Fahrgestelle & Bewegungen (Scratch-Blöcke)", "Simple chassis & movements (Scratch blocks)"),
        t("Erste Sensor-Abenteuer: Farbe erkennen, Hindernisse vermeiden", "First sensor adventures: color detection, obstacle avoidance"),
        t('Schnelle Erfolge: „Mein Roboter fährt!" in den ersten Stunden', 'Quick wins: "My robot drives!" in the first sessions'),
      ],
      goal: t("Begeisterung wecken & Selbstvertrauen aufbauen", "Spark enthusiasm & build confidence"),
    },
    {
      bar: "from-vibrant-orange to-warm-yellow",
      borderHover: "hover:border-vibrant-orange/30",
      title: t("Erfinder-Stufe", "Inventor Level"),
      age: t("ca. 9–12 Jahre (oder nach Entdecker-Stufe)", "approx. 9–12 years (or after Explorer level)"),
      bullets: [
        t("Komplexere Mechanik: Greifarme, Hebel, Mehrfachmotoren", "Complex mechanics: gripper arms, levers, multiple motors"),
        t("Übergang zu Python (neben Scratch)", "Transition to Python (alongside Scratch)"),
        t("Multi-Sensor-Projekte & erste Datenlogik", "Multi-sensor projects & first data logic"),
        t('Iteratives Verbessern: „Wie wird es schneller / genauer / cooler?"', 'Iterative improvement: "How to make it faster / more precise / cooler?"'),
      ],
      goal: t('Von „Es geht" zu „Ich habe eine clevere Lösung erfunden"', 'From "It works" to "I invented a clever solution"'),
    },
    {
      bar: "from-tech-blue to-soft-purple",
      borderHover: "hover:border-tech-blue/30",
      title: t("Challenge-Stufe", "Challenge Level"),
      age: t("ca. 9–12 Jahre (fortgeschritten)", "approx. 9–12 years (advanced)"),
      bullets: [
        t("FLL-Vorbereitung: Präzisionsroboter, Mecanum-Antriebe, Missionen", "FLL preparation: precision robots, Mecanum drives, missions"),
        t("High-Level-Optimierung: Fehlerkompensation, 2,5-Min-Run-Strategie", "High-level optimization: error compensation, 2.5-min run strategy"),
        t("Eigene Innovationsprojekte (echte Probleme lösen mit SPIKE)", "Own innovation projects (solving real problems with SPIKE)"),
        t("Team-Strategie, Pitch-Training & Wettbewerbssimulation", "Team strategy, pitch training & competition simulation"),
      ],
      goal: t("Bereit für FIRST LEGO League Challenge – mit Stolz & Kreativität", "Ready for FIRST LEGO League Challenge — with pride & creativity"),
    },
  ];

  return (
    <section id="lernstufen" className="section-padding bg-tint-sky">
      <div className="container-narrow">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Unsere Lernstufen – passgenau für jedes Kind", "Our learning levels — tailored for every child")}
        </h2>
        <p className="mt-2 text-base font-medium text-muted-foreground md:text-lg">
          {t(
            "Von ersten Bewegungen bis zur Wettbewerbsbühne – in drei motivierenden Stufen",
            "From first movements to the competition stage — in three motivating levels"
          )}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(
            "Kinder steigen flexibel ein – je nach Alter, Vorerfahrung und Tempo. In jeder Stunde entsteht etwas Eigenes, das sie mit nach Hause nehmen und weiter verbessern können.",
            "Kids join flexibly — based on age, experience, and pace. Every session produces something unique they can take home and keep improving."
          )}
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3 stagger-children">
          {levels.map((lev, i) => (
            <div key={i} className={`card-colorful flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${lev.borderHover}`}>
              <div className={`h-2 w-full bg-gradient-to-r ${lev.bar}`} />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-card-foreground">{lev.title}</h3>
                <span className="mt-0.5 text-sm italic text-muted-foreground">{lev.age}</span>
                <ul className="mt-3 flex-1 space-y-2.5">
                  {lev.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${lev.bar}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 rounded-xl bg-muted/50 px-3 py-2 text-sm text-card-foreground">
                  <span className="font-bold text-primary">{t("Ziel:", "Goal:")}</span> {lev.goal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LernstufenSection;
