import { useLang } from "@/contexts/LanguageContext";
import { Users, Blocks, Brain, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Users, text: t("Kleine Gruppen mit intensiver Betreuung", "Small groups with intensive support"), color: "bg-fun-orange/15 text-fun-orange" },
    { icon: Blocks, text: t("Echte Projekte statt Schritt-für-Schritt-Anleitungen", "Real projects instead of step-by-step instructions"), color: "bg-fun-pink/15 text-fun-pink" },
    { icon: Brain, text: t('Fokus auf strukturiertes Denken, Kreativität und eine „Try & Improve"-Mentalität', 'Focus on structured thinking, creativity, and a "Try & Improve" mentality'), color: "bg-fun-sky/15 text-fun-sky" },
  ];

  const badges = [
    { label: t("Kleine Gruppen", "Small Groups"), bg: "bg-fun-yellow/20 text-amber-700 border-fun-yellow/30" },
    { label: t("Projektbasiert", "Project-based"), bg: "bg-fun-pink/15 text-pink-700 border-fun-pink/25" },
    { label: "LEGO SPIKE Prime", bg: "bg-fun-sky/15 text-sky-700 border-fun-sky/25" },
  ];

  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-br from-indigo-50 via-purple-50/60 to-pink-50/40">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-fun-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fun-sky/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding container-narrow relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            {/* Badge chips */}
            <div className="mb-5 flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold ${b.bg}`}>
                  <Sparkles size={12} />
                  {b.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-primary via-fun-purple to-fun-pink bg-clip-text text-transparent">{t("Coding & Robotik", "Coding & Robotics")}</span>{" "}
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
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${b.color}`}>
                    <b.icon size={20} />
                  </span>
                  <span className="text-base font-medium">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="group rounded-full bg-gradient-to-r from-primary to-fun-purple px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105"
              >
                {t("Probestunde anfragen ✨", "Request a trial session ✨")}
              </a>
              <a
                href="#lernstufen"
                className="rounded-full border-2 border-primary/25 bg-white/70 backdrop-blur-sm px-8 py-4 text-base font-bold text-primary transition-all hover:bg-primary/5 hover:border-primary/50 hover:-translate-y-0.5"
              >
                {t("Lernstufen entdecken 🚀", "Discover levels 🚀")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:200ms]">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-fun-pink/20 to-fun-yellow/20 blur-xl" />
              <img
                src={heroImage}
                alt={t("Kinder bauen Roboter und programmieren", "Kids building robots and coding")}
                className="relative w-full rounded-3xl shadow-2xl shadow-primary/15"
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
