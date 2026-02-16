import { useLang } from "@/contexts/LanguageContext";
import { Users, Blocks, Brain } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Users, text: t("Kleine Gruppen mit intensiver Betreuung", "Small groups with intensive support"), accent: "bg-vibrant-orange/12 text-vibrant-orange" },
    { icon: Blocks, text: t("Echte Projekte statt Schritt-für-Schritt-Anleitungen", "Real projects instead of step-by-step instructions"), accent: "bg-tech-blue/12 text-tech-blue" },
    { icon: Brain, text: t('Fokus auf strukturiertes Denken, Kreativität und eine „Try & Improve"-Mentalität', 'Focus on structured thinking, creativity, and a "Try & Improve" mentality'), accent: "bg-soft-purple/12 text-soft-purple" },
  ];

  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-br from-primary/6 via-sky-blue/4 to-background deco-blob">
      {/* Extra decorative gradient orb */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

      <div className="section-padding container-narrow relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            {/* Benefit badges */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { label: t("Kleine Gruppen", "Small Groups"), cls: "border-primary/25 bg-primary/8 text-primary" },
                { label: t("Projektbasiert", "Project-based"), cls: "border-vibrant-orange/25 bg-vibrant-orange/8 text-vibrant-orange" },
                { label: "LEGO SPIKE Prime", cls: "border-tech-blue/25 bg-tech-blue/8 text-tech-blue" },
              ].map((b, i) => (
                <span key={i} className={`inline-block rounded-full border px-3.5 py-1 text-xs font-bold ${b.cls}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              <span className="bg-gradient-to-r from-primary to-sky-blue bg-clip-text text-transparent">{t("Coding & Robotik", "Coding & Robotics")}</span>{" "}
              {t("für Kinder in Bonn", "for Kids in Bonn")}
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t(
                "In kleinen Gruppen bauen und programmieren Kinder mit LEGO® SPIKE™ Prime echte Roboter – spielerisch, projektbasiert und mit viel Raum für eigene Ideen.",
                "In small groups, kids build and program real robots with LEGO® SPIKE™ Prime — playful, project-based, and with plenty of room for their own ideas."
              )}
            </p>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground/70">
              {t(
                "Unsere Kurse finden in Bonn statt. Auch für Familien aus Köln und der Umgebung gut erreichbar.",
                "Classes take place in Bonn. Easily accessible for families from Cologne and the surrounding area."
              )}
            </p>

            <ul className="mt-6 space-y-3 stagger-children">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.accent}`}>
                    <b.icon size={18} />
                  </span>
                  <span className="text-[0.95rem] font-semibold text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="btn-vibrant rounded-full bg-gradient-to-r from-vibrant-orange to-warm-yellow px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-vibrant-orange/20"
              >
                {t("Probestunde anfragen", "Request a trial session")}
              </a>
              <a
                href="#lernstufen"
                className="btn-vibrant rounded-full border-2 border-primary/20 bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:border-primary/40 hover:bg-primary/5"
              >
                {t("Lernstufen entdecken", "Discover levels")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:150ms]">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/15 via-tech-blue/10 to-soft-purple/10 blur-xl" />
              <img
                src={heroImage}
                alt={t("Kinder bauen Roboter und programmieren", "Kids building robots and coding")}
                className="relative w-full rounded-3xl shadow-xl shadow-primary/10"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
