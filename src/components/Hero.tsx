import { useLang } from "@/contexts/LanguageContext";
import { Users, Blocks, Brain } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Users, text: t("Kleine Gruppen, viel Betreuung", "Small groups, high attention") },
    { icon: Blocks, text: t("Lernen durch echte Projekte (LEGO/Robotik)", "Learn through real projects (LEGO/robotics)") },
    { icon: Brain, text: t("Fokus: Denken, Debuggen, Dranbleiben", "Focus: thinking, debugging, persistence") },
  ];

  return (
    <section className="relative overflow-hidden pt-20">
      <div className="section-padding container-narrow">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t(
                "Coding & Robotik für Kinder in Bonn",
                "Coding & Robotics for Kids in Bonn"
              )}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t(
                "Projektbasiertes Lernen in kleinen Gruppen – Kinder bauen, programmieren und lernen, Probleme selbstständig zu lösen.",
                "Project-based learning in small groups — children build, code, and learn to solve problems independently."
              )}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <b.icon size={18} />
                  </span>
                  <span className="text-sm font-medium md:text-base">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-mint-600 hover:shadow-xl hover:shadow-primary/30"
              >
                {t("Probestunde anfragen", "Request a trial session")}
              </a>
              <a
                href="#kurse"
                className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {t("So läuft der Kurs ab", "How the course works")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:200ms]">
            <img
              src={heroImage}
              alt={t("Kinder bauen Roboter und programmieren", "Kids building robots and coding")}
              className="w-full rounded-2xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
