import { useLang } from "@/contexts/LanguageContext";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

const WhySection = () => {
  const { t } = useLang();

  const items = [
    {
      icon: Lightbulb,
      text: t(
        "Programmieren ist nicht das Ziel, sondern ein Werkzeug: Kinder entwickeln strukturiertes Denken und Kreativität.",
        "Coding is not the goal — it's a tool to build structured thinking and creativity."
      ),
    },
    {
      icon: Target,
      text: t(
        "Sie lernen, Probleme zu analysieren, Lösungen zu testen und aus Fehlern zu lernen.",
        "Kids learn to analyze problems, test solutions, and learn from mistakes."
      ),
    },
    {
      icon: TrendingUp,
      text: t(
        "Durch kontinuierliches Lernen wachsen Selbstständigkeit, Teamfähigkeit und Ausdauer – Fähigkeiten, die ein Leben lang tragen.",
        "With consistent practice, they develop independence, teamwork, and resilience — skills that last a lifetime."
      ),
    },
  ];

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Warum Mint Ventures?", "Why Mint Ventures?")}
        </h2>
        <div className="mt-10 space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon size={20} />
              </span>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
