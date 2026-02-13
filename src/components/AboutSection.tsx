import { useLang } from "@/contexts/LanguageContext";
import { Target, HelpCircle, Award } from "lucide-react";

const AboutSection = () => {
  const { t } = useLang();

  const style = [
    { icon: Target, text: t("Klare Ziele, viel Freiheit im Lösungsweg", "Clear goals, freedom in how to solve") },
    { icon: HelpCircle, text: t("Fragen statt Vorgeben", "Asking questions instead of giving answers") },
    { icon: Award, text: t("Motivation durch sichtbare Ergebnisse", "Motivation through visible results") },
  ];

  return (
    <section id="ueber" className="section-padding bg-secondary/50">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Wer wir sind", "About")}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(
            "Ich bin Yiwen, arbeite seit Jahren an der Schnittstelle von Technologie, Bildung und Praxis. Mint Ventures ist aus dem Wunsch entstanden, Kindern in Deutschland frühe Problemlösekompetenz durch Coding & Robotik zu geben – spielerisch, aber strukturiert.",
            "I'm Yiwen. Mint Ventures started from a simple goal: give kids in Germany a strong problem-solving foundation through coding and robotics — playful, structured, and project-driven."
          )}
        </p>
        <div className="mt-8 space-y-4">
          {style.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <s.icon size={18} className="shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground md:text-base">{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
