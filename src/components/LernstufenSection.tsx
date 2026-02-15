import { useLang } from "@/contexts/LanguageContext";
import { Compass, Lightbulb, Trophy } from "lucide-react";

const LernstufenSection = () => {
  const { t } = useLang();

  const levels = [
    {
      icon: Compass,
      barColor: "bg-emerald-400",
      title: t("Entdecker-Stufe", "Explorer Level"),
      age: t("ca. 7 Jahre (oder Anfänger jeden Alters)", "approx. 7 years (or beginners of any age)"),
      focus: t("Spaß am Bauen & Bewegen, erste Logik, schnelle Erfolge", "Fun with building & movement, first logic, quick wins"),
      bullets: [
        t("SPIKE Prime kennenlernen", "Get to know SPIKE Prime"),
        t("Einfache Fahrgestelle, Scratch-Blöcke", "Simple chassis, Scratch blocks"),
        t("Sensoren entdecken", "Discover sensors"),
        t('„Mein Roboter folgt der Linie!"', '"My robot follows the line!"'),
      ],
      goal: t(
        '„Ich kann das!"-Gefühl in den ersten 2–4 Stunden',
        '"I can do it!" feeling in the first 2–4 sessions'
      ),
    },
    {
      icon: Lightbulb,
      barColor: "bg-amber-400",
      title: t("Erfinder-Stufe", "Inventor Level"),
      age: t("ca. 9–12 Jahre (oder nach Entdecker-Stufe)", "approx. 9–12 years (or after Explorer level)"),
      focus: t("Komplexere Mechanik, Python-Einstieg, kreative Problemlösung", "More complex mechanics, Python intro, creative problem-solving"),
      bullets: [
        t("Mehr Motoren & Getriebe, Greifarme", "More motors & gears, gripper arms"),
        t("Daten von mehreren Sensoren", "Data from multiple sensors"),
        t("Erste Python-Skripte", "First Python scripts"),
        t("Iteratives Verbessern", "Iterative improvement"),
      ],
      goal: t(
        'Vom „Es geht" zum „Ich habe eine richtig clevere Lösung gefunden"',
        'From "It works" to "I found a really clever solution"'
      ),
    },
    {
      icon: Trophy,
      barColor: "bg-sky-500",
      title: t("Challenge-Stufe", "Challenge & Mastery Level"),
      age: t("ca. 9–12 Jahre (fortgeschritten / mit Vorerfahrung)", "approx. 9–12 years (advanced / with experience)"),
      focus: t("Präzision, Strategie, Teamwork, echte Wettbewerbsatmosphäre", "Precision, strategy, teamwork, real competition atmosphere"),
      bullets: [
        t("Modulare Wettbewerbsroboter, Mecanum-Antrieb", "Modular competition robots, Mecanum drive"),
        t("Fehlerkompensation, 2,5-Min-Runs planen", "Error compensation, planning 2.5-min runs"),
        t("FLL-Missionen üben", "Practice FLL missions"),
        t("Eigenes Innovationsprojekt & Pitch-Training", "Own innovation project & pitch training"),
      ],
      goal: t(
        "Bereit für FIRST LEGO League – und vor allem: stolz auf die eigene Kreativität & Ausdauer",
        "Ready for FIRST LEGO League — and above all: proud of their own creativity & perseverance"
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
        <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
          {t(
            "Von ersten Bewegungen bis zur Wettbewerbsbühne – in drei motivierenden Stufen",
            "From first movements to the competition stage — in three motivating levels"
          )}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {levels.map((level, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`h-1 w-full ${level.barColor}`} />
              <div className="flex flex-1 flex-col p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <level.icon size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">{level.title}</h3>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {level.age}
              </span>
              <p className="mt-2 text-sm italic text-muted-foreground">{level.focus}</p>
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
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          {t(
            "Kinder können jederzeit in die passende Stufe einsteigen – je nach Alter, Vorerfahrung und Tempo. In kleinen Gruppen (max. 6–8 Kinder) mit zwei Betreuern arbeiten wir projektbasiert: Jede Stunde entsteht etwas Eigenes, das man nach Hause zeigen und verbessern kann.",
            "Kids can join the right level at any time — based on age, experience, and pace. In small groups (max. 6–8 kids) with two coaches, we work project-based: every session produces something unique they can show at home and keep improving."
          )}
        </p>
      </div>
    </section>
  );
};

export default LernstufenSection;
