import { useLang } from "@/contexts/LanguageContext";
import { BookOpen, Hammer, RefreshCw, Presentation } from "lucide-react";

const stepColors = [
  { bg: "bg-vibrant-orange/12", text: "text-vibrant-orange", num: "bg-vibrant-orange/15 text-vibrant-orange" },
  { bg: "bg-tech-blue/12", text: "text-tech-blue", num: "bg-tech-blue/15 text-tech-blue" },
  { bg: "bg-soft-purple/12", text: "text-soft-purple", num: "bg-soft-purple/15 text-soft-purple" },
  { bg: "bg-primary/10", text: "text-primary", num: "bg-primary/15 text-primary" },
];

const HowItWorks = () => {
  const { t } = useLang();

  const steps = [
    { icon: BookOpen, title: t("Kurzer Input", "Short input"), subtitle: t("Neues Konzept oder Technik erklären", "Explain new concept or technique") },
    { icon: Hammer, title: t("Bauen & Programmieren", "Build & code"), subtitle: t("Projektphase: Eigene Projekte umsetzen", "Project phase: implement own projects") },
    { icon: RefreshCw, title: t("Testen & Debuggen", "Test & debug"), subtitle: t("Ausprobieren, Fehler finden, verbessern", "Try out, find errors, improve") },
    { icon: Presentation, title: "Show & Tell", subtitle: t("Ergebnisse präsentieren & Feedback geben", "Present results & give feedback") },
  ];

  return (
    <section id="konzept" className="section-padding bg-tint-cream deco-blob">
      <div className="container-narrow relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("So läuft ein typischer Unterrichtstermin ab", "How a typical session works")}
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {steps.map((s, i) => {
            const color = stepColors[i];
            return (
              <div key={i} className="card-colorful flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm hover:border-primary/20">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${color.num} text-base font-bold`}>
                  {i + 1}
                </span>
                <span className={`mt-3 flex h-10 w-10 items-center justify-center rounded-xl ${color.bg} ${color.text}`}>
                  <s.icon size={20} />
                </span>
                <h3 className="mt-2.5 font-bold text-card-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
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
