import { useLang } from "@/contexts/LanguageContext";
import { Users, Blocks, Brain, Star, Cog, Puzzle } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Users, text: t("Kleine Gruppen mit intensiver Betreuung", "Small groups with intensive support") },
    { icon: Blocks, text: t("Echte Projekte statt Schritt-für-Schritt-Anleitungen", "Real projects instead of step-by-step instructions") },
    { icon: Brain, text: t('Fokus auf strukturiertes Denken, Kreativität und eine „Try & Improve"-Mentalität', 'Focus on structured thinking, creativity, and a "Try & Improve" mentality') },
  ];

  const badges = [
    { label: t("Kleine Gruppen", "Small Groups"), color: "bg-sunshine/15 text-amber-700" },
    { label: t("Projektbasiert", "Project-based"), color: "bg-coral/15 text-orange-700" },
    { label: "LEGO SPIKE Prime", color: "bg-sky/15 text-sky-700" },
  ];

  return (
    <section className="relative overflow-hidden pt-20 decorative-shapes">
      <div className="section-padding container-narrow relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            {/* Badge chips */}
            <div className="mb-5 flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span key={i} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.75rem] xl:text-7xl">
              <span className="text-primary">{t("Coding & Robotik", "Coding & Robotics")}</span>{" "}
              {t("für Kinder in Bonn", "for Kids in Bonn")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t(
                "In kleinen Gruppen bauen und programmieren Kinder mit LEGO® SPIKE™ Prime echte Roboter – spielerisch, projektbasiert und mit viel Raum für eigene Ideen.",
                "In small groups, kids build and program real robots with LEGO® SPIKE™ Prime — playful, project-based, and with plenty of room for their own ideas."
              )}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <b.icon size={18} />
                  </span>
                  <span className="text-sm font-medium md:text-base">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-2xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-mint-600 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {t("Probestunde anfragen", "Request a trial session")}
              </a>
              <a
                href="#lernstufen"
                className="rounded-2xl border-2 border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-secondary hover:border-primary/30"
              >
                {t("Unsere Lernstufen entdecken", "Discover our learning levels")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:200ms]">
            <img
              src={heroImage}
              alt={t("Kinder bauen Roboter und programmieren", "Kids building robots and coding")}
              className="w-full rounded-3xl shadow-xl shadow-primary/10"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
