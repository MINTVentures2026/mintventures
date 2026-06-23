import { useLang } from "@/contexts/LanguageContext";
import { Trophy, Handshake, MapPin } from "lucide-react";

const SocialProofBadges = () => {
  const { t } = useLang();

  const badges = [
    {
      icon: Trophy,
      title: t("Team Explorers", "Team Explorers"),
      text: t("2. Platz beim zdi-Roboterwettbewerb NRW Bonn", "2nd place at zdi Robotics Competition NRW Bonn"),
      accent: "bg-warm-yellow/20 text-amber-700",
    },
    {
      icon: Handshake,
      title: t("Partner", "Partner"),
      text: t("DIGITAL@School Campus Bonn", "DIGITAL@School Campus Bonn"),
      accent: "bg-primary/10 text-primary",
    },
    {
      icon: MapPin,
      title: t("Standort Bonn", "Based in Bonn"),
      text: t("Außerschulische Robotik- & Coding-Projekte", "Extracurricular robotics & coding projects"),
      accent: "bg-sky-blue/15 text-sky-700",
    },
  ];

  return (
    <section className="bg-background py-8 md:py-10">
      <div className="container-narrow px-5 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {badges.map((b, i) => (
            <div
              key={i}
              className="card-lift flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm md:p-4"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${b.accent}`}>
                <b.icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground md:text-sm">{b.title}</p>
                <p className="text-xs leading-snug text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBadges;
