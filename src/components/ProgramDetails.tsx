import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, MapPin, CalendarClock } from "lucide-react";

const ProgramDetails = () => {
  const { t } = useLang();

  const details = [
    { icon: Calendar, label: t("Alter", "Age"), value: t("8–14 Jahre (stufenabhängig)", "8–14 years (level-based)"), accent: "bg-primary/8 text-primary" },
    { icon: Clock, label: t("Dauer", "Duration"), value: t("90 Minuten projektbasiertes Lernen", "90 minutes of project-based learning"), accent: "bg-warm-yellow/10 text-amber-600" },
    { icon: Users, label: t("Gruppengröße", "Group size"), value: t("Kleine Gruppen (6–10 Kinder)", "Small groups (6–10 kids)"), accent: "bg-soft-coral/10 text-orange-600" },
    { icon: MapPin, label: t("Ort", "Location"), value: t("Bad Godesberg, Bonn (genaue Adresse auf Anfrage)", "Bad Godesberg, Bonn (exact address upon request)"), accent: "bg-sky-blue/10 text-sky-600" },
    { icon: CalendarClock, label: t("Termine", "Dates"), value: t("Ab September 2026 – Wochenendkurse auf Anfrage", "From September 2026 – weekend courses on request"), accent: "bg-primary/8 text-primary" },
  ];

  return (
    <section className="section-padding bg-tint-mint">
      <div className="container-narrow">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Kursdetails", "Program details")}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {details.map((d, i) => (
            <div key={i} className="card-lift flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${d.accent}`}>
                <d.icon size={20} />
              </span>
              <span className="mt-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">{d.label}</span>
              <span className="mt-0.5 text-sm font-semibold text-card-foreground">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {t("Eltern dürfen am Anfang gerne kurz zuschauen.", "Parents are welcome to briefly observe at the beginning.")}
        </p>
      </div>
    </section>
  );
};

export default ProgramDetails;
