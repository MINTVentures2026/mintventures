import { useLang } from "@/contexts/LanguageContext";
import { Target, HelpCircle, Award, AlertCircle } from "lucide-react";

const principleColors = [
  { bg: "bg-vibrant-orange/10", text: "text-vibrant-orange" },
  { bg: "bg-tech-blue/10", text: "text-tech-blue" },
  { bg: "bg-soft-purple/10", text: "text-soft-purple" },
  { bg: "bg-primary/10", text: "text-primary" },
];

const AboutSection = () => {
  const { t } = useLang();

  const principles = [
    { icon: Target, text: t("Klare Ziele – Freiheit im Lösungsweg", "Clear goals — freedom in how to solve") },
    { icon: HelpCircle, text: t("Lernen durch Fragen statt durch Vormachen", "Learning through questions, not demonstrations") },
    { icon: Award, text: t("Motivation durch sichtbare eigene Erfolge", "Motivation through visible personal achievements") },
    { icon: AlertCircle, text: t("Fehler sind Teil des Lernprozesses.", "Mistakes are part of the learning process.") },
  ];

  return (
    <section id="ueber" className="section-padding bg-tint-cream deco-gear">
      <div className="container-narrow max-w-3xl relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Wer wir sind", "About")}
        </h2>

        <p className="mt-3 text-lg font-semibold text-foreground">
          {t(
            "MINT Ventures – kleine, persönliche Robotik- & Coding-Initiative in Bonn",
            "MINT Ventures — small, personal robotics & coding initiative in Bonn"
          )}
        </p>

        <p className="mt-2.5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(
            "Wir bringen langjährige Erfahrung in Technologie, Ingenieurwesen und Bildung zusammen – und setzen sie um in echte, greifbare Projekte mit LEGO® SPIKE™ Prime.",
            "We combine years of experience in technology, engineering, and education — and turn it into real, tangible projects with LEGO® SPIKE™ Prime."
          )}
        </p>

        <div className="mt-5">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-primary">
            {t("Unsere pädagogischen Leitprinzipien:", "Our pedagogical guiding principles:")}
          </p>
          <div className="space-y-2 stagger-children">
            {principles.map((s, i) => {
              const color = principleColors[i];
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm card-colorful hover:border-primary/20">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color.bg} ${color.text}`}>
                    <s.icon size={16} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{s.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
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
