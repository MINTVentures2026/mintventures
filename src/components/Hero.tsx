import { useLang } from "@/contexts/LanguageContext";
import { Users, Blocks, Brain } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Users, text: t("Kleine Gruppen mit intensiver Betreuung", "Small groups with intensive support"), accent: "bg-warm-yellow/15 text-amber-700" },
    { icon: Blocks, text: t("Echte Projekte statt Schritt-für-Schritt-Anleitungen", "Real projects instead of step-by-step instructions"), accent: "bg-soft-coral/15 text-orange-700" },
    { icon: Brain, text: t('Fokus auf strukturiertes Denken, Kreativität und eine „Try & Improve"-Mentalität', 'Focus on structured thinking, creativity, and a "Try & Improve" mentality'), accent: "bg-sky-blue/15 text-sky-700" },
  ];

  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-br from-emerald-50/50 via-background to-amber-50/30 deco-blob">
      <div className="section-padding container-narrow relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            {/* Benefit badges */}
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { label: t("Kleine Gruppen", "Small Groups"), cls: "border-primary/20 bg-primary/8 text-primary" },
                { label: t("Projektbasiert", "Project-based"), cls: "border-warm-yellow/30 bg-warm-yellow/10 text-amber-700" },
                { label: "LEGO SPIKE Prime", cls: "border-sky-blue/25 bg-sky-blue/10 text-sky-700" },
              ].map((b, i) => (
                <span key={i} className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${b.cls}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              <span className="text-primary">{t("Coding & Robotik", "Coding & Robotics")}</span>{" "}
              {t("für Kinder in Bonn", "for Kids in Bonn")}
            </h1>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t(
                "In kleinen Gruppen bauen und programmieren Kinder mit LEGO® SPIKE™ Prime echte Roboter – spielerisch, projektbasiert und mit viel Raum für eigene Ideen.",
                "In small groups, kids build and program real robots with LEGO® SPIKE™ Prime — playful, project-based, and with plenty of room for their own ideas."
              )}
            </p>

            <ul className="mt-5 space-y-2.5">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.accent}`}>
                    <b.icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-foreground md:text-[0.95rem]">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-2xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t("Probestunde anfragen", "Request a trial session")}
              </a>
              <a
                href="#lernstufen"
                className="rounded-2xl border-2 border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
              >
                {t("Lernstufen entdecken", "Discover levels")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:150ms]">
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
