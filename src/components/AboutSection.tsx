import { useLang } from "@/contexts/LanguageContext";
import { Target, HelpCircle, Award, AlertCircle } from "lucide-react";

const AboutSection = () => {
  const { t } = useLang();

  const principles = [
    { icon: Target, text: t("Klare Ziele – Freiheit im Lösungsweg", "Clear goals — freedom in how to solve") },
    { icon: HelpCircle, text: t("Lernen durch Fragen statt durch Vormachen", "Learning through questions, not demonstrations") },
    { icon: Award, text: t("Motivation durch sichtbare eigene Erfolge", "Motivation through visible personal achievements") },
    { icon: AlertCircle, text: t("Fehler sind Teil des Lernprozesses.", "Mistakes are part of the learning process.") },
  ];

  return (
    <section id="ueber" className="section-padding bg-secondary/50">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Wer wir sind", "About")}
        </h2>

        <p className="mt-4 text-lg font-medium text-foreground">
          {t(
            "MINT Ventures – kleine, persönliche Robotik- & Coding-Initiative in Bonn",
            "MINT Ventures — small, personal robotics & coding initiative in Bonn"
          )}
        </p>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(
            "Wir bringen langjährige Erfahrung in Technologie, Ingenieurwesen und Bildung zusammen – und setzen sie um in echte, greifbare Projekte mit LEGO® SPIKE™ Prime.",
            "We combine years of experience in technology, engineering, and education — and turn it into real, tangible projects with LEGO® SPIKE™ Prime."
          )}
        </p>

        <div className="mt-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("Unsere pädagogischen Leitprinzipien:", "Our pedagogical guiding principles:")}
          </p>
          <div className="space-y-4">
            {principles.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <s.icon size={18} className="shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground md:text-base">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
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
