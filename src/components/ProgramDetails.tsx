import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, MapPin, CalendarClock } from "lucide-react";

const ProgramDetails = () => {
  const { t } = useLang();

  const details = [
    { icon: Calendar, label: t("Alter", "Age"), value: t("6–12 Jahre (stufenabhängig)", "6–12 (level-based)") },
    { icon: Clock, label: t("Dauer", "Duration"), value: t("2 Stunden", "2 hours") },
    { icon: Users, label: t("Gruppengröße", "Group size"), value: t("max. 6–8 Kinder (2 Coaches)", "max. 6–8 kids (2 coaches)") },
    { icon: MapPin, label: t("Ort", "Location"), value: t("Bad Godesberg, Bonn", "Bad Godesberg, Bonn") },
    { icon: CalendarClock, label: t("Zeit", "Time"), value: t("Samstags 14:00–16:00 Uhr", "Saturdays 2:00–4:00 PM") },
  ];

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("Kursdetails", "Program details")}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {details.map((d, i) => (
            <div key={i} className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center">
              <d.icon size={22} className="text-primary" />
              <span className="mt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{d.label}</span>
              <span className="mt-1 text-sm font-semibold text-card-foreground">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
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
