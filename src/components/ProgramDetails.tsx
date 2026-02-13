import { useLang } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, MapPin, Euro } from "lucide-react";

const ProgramDetails = () => {
  const { t } = useLang();

  const details = [
    { icon: Calendar, label: t("Alter", "Age"), value: t("6–12 Jahre", "6–12") },
    { icon: Clock, label: "Format", value: t("2 Stunden / Termin", "2 hours per session") },
    { icon: Users, label: t("Gruppe", "Group size"), value: t("4–8 Kinder", "4–8 kids") },
    { icon: MapPin, label: t("Ort", "Location"), value: t("Bonn / Nähe Köln", "Bonn / near Cologne") },
    { icon: Euro, label: t("Preis", "Price"), value: t("ab 50 € / Termin", "from €50 / session") },
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
            "Eltern können am Anfang kurz zusehen, um das Lernformat kennenzulernen.",
            "Parents can briefly observe at the beginning to get to know the learning format."
          )}
        </p>
      </div>
    </section>
  );
};

export default ProgramDetails;
