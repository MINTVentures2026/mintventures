import { useLang } from "@/contexts/LanguageContext";
import { BookOpen, Hammer, RefreshCw, Presentation } from "lucide-react";

const HowItWorks = () => {
  const { t } = useLang();

  const steps = [
    { icon: BookOpen, title: t("Kurzer Input", "Short input"), subtitle: t("Neues Konzept oder Technik erklären", "Explain new concept or technique"), color: "from-fun-yellow/20 to-fun-orange/10", iconColor: "bg-fun-yellow/20 text-amber-600", num: "bg-gradient-to-br from-fun-yellow to-fun-orange" },
    { icon: Hammer, title: t("Bauen & Programmieren", "Build & code"), subtitle: t("Projektphase: Eigene Projekte umsetzen", "Project phase: implement own projects"), color: "from-fun-pink/15 to-fun-purple/10", iconColor: "bg-fun-pink/20 text-pink-600", num: "bg-gradient-to-br from-fun-pink to-fun-purple" },
    { icon: RefreshCw, title: t("Testen & Debuggen", "Test & debug"), subtitle: t("Ausprobieren, Fehler finden, verbessern", "Try out, find errors, improve"), color: "from-fun-sky/15 to-fun-green/10", iconColor: "bg-fun-sky/20 text-sky-600", num: "bg-gradient-to-br from-fun-sky to-fun-green" },
    { icon: Presentation, title: "Show & Tell", subtitle: t("Ergebnisse präsentieren & Feedback geben", "Present results & give feedback"), color: "from-primary/10 to-fun-purple/10", iconColor: "bg-primary/15 text-primary", num: "bg-gradient-to-br from-primary to-fun-purple" },
  ];

  return (
    <section id="konzept" className="section-padding bg-gradient-to-b from-amber-50/50 via-yellow-50/30 to-orange-50/40 deco-stars">
      <div className="container-narrow relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("So läuft ein Termin ab", "How a session works")} <span className="text-fun-orange">⚙️</span>
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={i} className={`card-bounce flex flex-col items-center rounded-3xl border border-border bg-gradient-to-br ${s.color} p-6 text-center shadow-md hover:shadow-xl`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full ${s.num} text-white text-lg font-extrabold shadow-md`}>
                {i + 1}
              </span>
              <span className={`mt-4 flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconColor}`}>
                <s.icon size={24} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.subtitle}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground">
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
