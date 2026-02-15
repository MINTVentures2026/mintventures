import { useLang } from "@/contexts/LanguageContext";
import { BookOpen, Hammer, RefreshCw, Presentation } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLang();

  const steps = [
    { icon: BookOpen, title: t("Kurzer Input", "Short input"), subtitle: t("Neues Konzept oder Technik erklären", "Explain new concept or technique"), accent: "bg-sunshine/20 text-amber-600" },
    { icon: Hammer, title: t("Bauen & Programmieren", "Build & code"), subtitle: t("Projektphase: Eigene Projekte umsetzen", "Project phase: implement own projects"), accent: "bg-coral/20 text-orange-600" },
    { icon: RefreshCw, title: t("Testen & Debuggen", "Test & debug"), subtitle: t("Ausprobieren, Fehler finden, verbessern", "Try out, find errors, improve"), accent: "bg-sky/20 text-sky-600" },
    { icon: Presentation, title: "Show & Tell", subtitle: t("Ergebnisse präsentieren & Feedback geben", "Present results & give feedback"), accent: "bg-primary/15 text-primary" },
  ];

  return (
    <section id="konzept" className="section-padding bg-section-warm decorative-shapes">
      <div className="container-narrow relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("So läuft ein typischer Unterrichtstermin ab", "How a typical session works")}
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                {i + 1}
              </span>
              <span className={`mt-4 flex h-10 w-10 items-center justify-center rounded-xl ${s.accent}`}>
                <s.icon size={20} />
              </span>
              <h3 className="mt-3 font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          {t(
            "Neue Kinder starten sofort – Fortgeschrittene bauen weiter aus.",
            "New kids start right away — advanced kids keep building on their projects."
          )}
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
