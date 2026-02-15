import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, MapPin, CalendarClock } from "lucide-react";

const ProgramDetails = () => {
  const { t } = useLang();

  const details = [
    { icon: Calendar, label: t("Alter", "Age"), value: t("8–12 Jahre (stufenabhängig)", "8–12 (level-based)"), accent: "bg-primary/10 text-primary" },
    { icon: Clock, label: t("Dauer", "Duration"), value: t("2 Stunden pro Termin", "2 hours per session"), accent: "bg-warm-yellow/12 text-amber-600" },
    { icon: Users, label: t("Gruppengröße", "Group size"), value: t("max. 6–8 Kinder", "max. 6–8 kids"), accent: "bg-soft-coral/12 text-orange-600" },
    { icon: MapPin, label: t("Ort", "Location"), value: t("Bad Godesberg, Bonn (genaue Adresse nach Anfrage)", "Bad Godesberg, Bonn (exact address upon request)"), accent: "bg-sky-blue/12 text-sky-600" },
    { icon: CalendarClock, label: t("Zeit", "Time"), value: t("Samstags 14:00–16:00 Uhr (flexible Einstiege möglich)", "Saturdays 2:00–4:00 PM (flexible entry possible)"), accent: "bg-primary/10 text-primary" },
  ];

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Kursdetails", "Program details")}
        </h2>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {details.map((d, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-200 hover:shadow-md">
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
