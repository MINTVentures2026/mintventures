import { useLang } from "@/contexts/LanguageContext";
import { Target, HelpCircle, Award, AlertCircle } from "lucide-react";

const AboutSection = () => {
  const { t } = useLang();

  const principles = [
    { icon: Target, text: t("Klare Ziele – Freiheit im Lösungsweg", "Clear goals — freedom in how to solve"), color: "bg-fun-orange/15 text-fun-orange" },
    { icon: HelpCircle, text: t("Lernen durch Fragen statt durch Vormachen", "Learning through questions, not demonstrations"), color: "bg-fun-sky/15 text-fun-sky" },
    { icon: Award, text: t("Motivation durch sichtbare eigene Erfolge", "Motivation through visible personal achievements"), color: "bg-fun-yellow/15 text-amber-600" },
    { icon: AlertCircle, text: t("Fehler sind Teil des Lernprozesses.", "Mistakes are part of the learning process."), color: "bg-fun-pink/15 text-fun-pink" },
  ];

  return (
    <section id="ueber" className="section-padding bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-green-50/50 deco-stars">
      <div className="container-narrow max-w-3xl relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Wer wir sind", "About")} <span className="text-fun-green">🤝</span>
        </h2>

        <p className="mt-3 text-xl font-semibold text-foreground">
          {t(
            "MINT Ventures – kleine, persönliche Robotik- & Coding-Initiative in Bonn",
            "MINT Ventures — small, personal robotics & coding initiative in Bonn"
          )}
        </p>

        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {t(
            "Wir bringen langjährige Erfahrung in Technologie, Ingenieurwesen und Bildung zusammen – und setzen sie um in echte, greifbare Projekte mit LEGO® SPIKE™ Prime.",
            "We combine years of experience in technology, engineering, and education — and turn it into real, tangible projects with LEGO® SPIKE™ Prime."
          )}
        </p>

        <div className="mt-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
            {t("Unsere pädagogischen Leitprinzipien:", "Our pedagogical guiding principles:")}
          </p>
          <div className="space-y-3">
            {principles.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 backdrop-blur-sm px-4 py-3 shadow-sm card-bounce">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon size={20} />
                </span>
                <span className="text-base font-medium text-foreground">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t(
            "Mädchen und Jungen sind bei uns gleichermaßen willkommen. Technik ist kein Jungs-Thema – sondern eine Frage von Neugier, Mut und Ausdauer.",
            "Boys and girls are equally welcome. Technology is not a boys' topic — it's about curiosity, courage, and perseverance."
          )}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
