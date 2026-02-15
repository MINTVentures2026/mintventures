import { useLang } from "@/contexts/LanguageContext";

const LernstufenSection = () => {
  const { t } = useLang();

  const levels = [
    {
      gradient: "from-emerald-400 to-green-500",
      bgTint: "from-emerald-50/60 to-green-50/40",
      emoji: "🌱",
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
      gradient: "from-amber-400 to-orange-400",
      bgTint: "from-amber-50/60 to-orange-50/40",
      emoji: "⚡",
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
      gradient: "from-sky-400 to-blue-500",
      bgTint: "from-sky-50/60 to-blue-50/40",
      emoji: "🏆",
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
    <section id="lernstufen" className="section-padding bg-gradient-to-br from-purple-50/70 via-violet-50/40 to-fuchsia-50/50 deco-dots">
      <div className="container-narrow relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Unsere Lernstufen", "Our learning levels")} <span className="text-fun-purple">🎮</span>
        </h2>
        <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
          {t(
            "Von ersten Bewegungen bis zur Wettbewerbsbühne – in drei motivierenden Stufen",
            "From first movements to the competition stage — in three motivating levels"
          )}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {t(
            "Kinder steigen flexibel ein – je nach Alter, Vorerfahrung und Tempo. In jeder Stunde entsteht etwas Eigenes, das sie mit nach Hause nehmen und weiter verbessern können.",
            "Kids join flexibly — based on age, experience, and pace. Every session produces something unique they can take home and keep improving."
          )}
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {levels.map((level, i) => (
            <div key={i} className={`card-bounce flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${level.bgTint} shadow-md hover:shadow-xl`}>
              <div className={`h-2 w-full bg-gradient-to-r ${level.gradient}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{level.emoji}</span>
                  <h3 className="text-xl font-bold text-card-foreground">{level.title}</h3>
                </div>
                <span className="mt-1 text-sm italic text-muted-foreground">{level.age}</span>
                <ul className="mt-4 flex-1 space-y-3">
                  {level.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${level.gradient}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-white/60 p-3">
                  <p className="text-sm text-card-foreground">
                    <span className="font-bold text-primary">{t("Ziel:", "Goal:")}</span> {level.goal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LernstufenSection;
