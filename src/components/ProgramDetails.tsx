import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, MapPin, CalendarClock } from "lucide-react";

const ProgramDetails = () => {
  const { t } = useLang();

  const details = [
    { icon: Calendar, label: t("Alter", "Age"), value: t("8–12 Jahre (stufenabhängig)", "8–12 (level-based)"), color: "bg-fun-sky/15 text-fun-sky" },
    { icon: Clock, label: t("Dauer", "Duration"), value: t("2 Stunden pro Termin", "2 hours per session"), color: "bg-fun-orange/15 text-fun-orange" },
    { icon: Users, label: t("Gruppengröße", "Group size"), value: t("max. 6–8 Kinder", "max. 6–8 kids"), color: "bg-fun-pink/15 text-fun-pink" },
    { icon: MapPin, label: t("Ort", "Location"), value: t("Bad Godesberg, Bonn (genaue Adresse nach Anfrage)", "Bad Godesberg, Bonn (exact address upon request)"), color: "bg-fun-green/15 text-fun-green" },
    { icon: CalendarClock, label: t("Zeit", "Time"), value: t("Samstags 14:00–16:00 Uhr (flexible Einstiege möglich)", "Saturdays 2:00–4:00 PM (flexible entry possible)"), color: "bg-fun-purple/15 text-fun-purple" },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-sky-50/40 via-white to-blue-50/30 bg-pattern">
      <div className="container-narrow">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Kursdetails", "Program details")} <span className="text-fun-sky">📋</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {details.map((d, i) => (
            <div key={i} className="card-bounce flex flex-col items-center rounded-3xl border border-border bg-card p-5 text-center shadow-md hover:shadow-xl">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${d.color}`}>
                <d.icon size={24} />
              </span>
              <span className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{d.label}</span>
              <span className="mt-1 text-sm font-semibold text-card-foreground">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-base text-muted-foreground">
          {t(
            "Eltern dürfen am Anfang gerne kurz zuschauen.",
            "Parents are welcome to briefly observe at the beginning."
          )}
        </p>
      </div>
    </section>
  );
};

export default ProgramDetails;
