import { useLang } from "@/contexts/LanguageContext";
import { BookOpen, Hammer, RefreshCw, Presentation } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLang();

  const steps = [
    { icon: BookOpen, title: t("Mini-Input", "Short input"), subtitle: t("kurz & verständlich", "brief & clear") },
    { icon: Hammer, title: t("Bauen & Programmieren", "Build & code"), subtitle: t("Projektphase", "Project phase") },
    { icon: RefreshCw, title: t("Testen & Debuggen", "Test & debug"), subtitle: t("Iteration", "Iteration") },
    { icon: Presentation, title: "Show & Tell", subtitle: t("Ergebnisse teilen", "Share results") },
  ];

  return (
    <section id="konzept" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("So läuft der Kurs ab", "How it works")}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                {i + 1}
              </span>
              <s.icon size={22} className="mt-4 text-primary" />
              <h3 className="mt-3 font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          {t(
            "Neue Kinder können jederzeit einsteigen. Fortgeschrittene Kinder entwickeln ihre Projekte weiter – jeder lernt im eigenen Tempo.",
            "New kids can join anytime. Advanced kids keep upgrading their projects — everyone progresses at their own pace."
          )}
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
