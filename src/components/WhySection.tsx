import { useLang } from "@/contexts/LanguageContext";
import { Lightbulb, Trophy, RefreshCw, Users } from "lucide-react";

const WhySection = () => {
  const { t } = useLang();

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Warum Mint Ventures?", "Why Mint Ventures?")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(
            "Programmieren und Robotik sind bei uns kein Selbstzweck – sie sind mächtige Werkzeuge, mit denen Kinder lernen, Probleme systematisch zu zerlegen, Lösungen kreativ zu testen und aus Rückschlägen schneller besser zu werden.",
            "Coding and robotics are not ends in themselves — they are powerful tools that teach kids to break down problems systematically, test solutions creatively, and bounce back faster from setbacks."
          )}
        </p>
        <div className="mt-8 space-y-5">
          {[
            {
              icon: Lightbulb,
              text: t(
                "Strukturiertes Denken & logisches Problemlösen – Kompetenzen für Schule und Leben",
                "Structured thinking & logical problem-solving — skills for school and life"
              ),
            },
            {
              icon: Trophy,
              text: t(
                'Selbstvertrauen durch sichtbare Erfolge: „Das habe ICH gebaut und programmiert!"',
                '"I built and coded that!" — confidence through visible achievements'
              ),
            },
            {
              icon: RefreshCw,
              text: t(
                "Try-&-Improve-Kultur statt Angst vor Fehlern",
                "Try-&-improve culture instead of fear of mistakes"
              ),
            },
            {
              icon: Users,
              text: t(
                "Teamfähigkeit und Präsentation – wie in echten Ingenieursteams",
                "Teamwork and presentation skills — just like in real engineering teams"
              ),
            },
          ].map((item, i) => (
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
