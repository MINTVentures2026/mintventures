import { useLang } from "@/contexts/LanguageContext";
import { Bot, Lightbulb, Puzzle, Users, Rocket, Trophy } from "lucide-react";
const heroAsset = { url: "/images/hero-zdi-roboterwettbewerb.jpg" };


const Hero = () => {
  const { t } = useLang();

  const bullets = [
    { icon: Bot, text: t("Roboter bauen & programmieren", "Build & program robots"), accent: "bg-primary/10 text-primary" },
    { icon: Lightbulb, text: t("Eigene Ideen umsetzen", "Bring own ideas to life"), accent: "bg-warm-yellow/15 text-amber-700" },
    { icon: Puzzle, text: t("Herausforderungen lösen", "Solve real challenges"), accent: "bg-soft-coral/12 text-orange-700" },
    { icon: Users, text: t("Teamarbeit & Kreativität", "Teamwork & creativity"), accent: "bg-sky-blue/12 text-sky-700" },
    { icon: Rocket, text: t("Zukunftskompetenzen entwickeln", "Develop future skills"), accent: "bg-primary/10 text-primary" },
  ];

  return (
    <section className="relative overflow-hidden pt-20 bg-gradient-to-br from-primary/4 via-background to-warm-yellow/6 deco-blob">
      <div className="section-padding container-narrow relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            {/* Benefit badges */}
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { label: t("Kleine Gruppen", "Small Groups"), cls: "border-primary/20 bg-primary/6 text-primary" },
                { label: t("Projektbasiert", "Project-based"), cls: "border-warm-yellow/25 bg-warm-yellow/8 text-amber-700" },
                { label: "LEGO SPIKE Prime", cls: "border-sky-blue/20 bg-sky-blue/8 text-sky-700" },
              ].map((b, i) => (
                <span key={i} className={`inline-block rounded-full border px-3.5 py-1 text-xs font-bold ${b.cls}`}>
                  {b.label}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              <span className="text-primary">{t("Kinder gestalten Technologie.", "Kids shape technology.")}</span>
              <span className="mt-2 block text-foreground">{t("Nicht nur konsumieren.", "Not just consume it.")}</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t(
                "Projektbasiertes Lernen mit Robotik, Coding und Engineering. Kinder bauen, programmieren und entwickeln eigene Lösungen für echte Herausforderungen.",
                "Project-based learning with robotics, coding and engineering. Kids build, program and develop their own solutions to real challenges."
              )}
            </p>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground/70">
              {t(
                "Unsere Kurse finden in Bonn statt. Auch für Familien aus Köln und der Umgebung gut erreichbar.",
                "Classes take place in Bonn. Easily accessible for families from Cologne and the surrounding area."
              )}
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.accent}`}>
                    <b.icon size={18} />
                  </span>
                  <span className="text-[0.95rem] font-medium text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all hover:brightness-105 hover:-translate-y-0.5"
              >
                {t("Probestunde anfragen", "Request a trial session")}
              </a>
              <a
                href="#lernstufen"
                className="rounded-full border-2 border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-all hover:border-primary/25 hover:bg-primary/4"
              >
                {t("Lernstufen entdecken", "Discover levels")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up [animation-delay:150ms] relative">
            <img
              src={heroAsset.url}
              alt={t(
                "Zwei Kinder bauen gemeinsam an einem LEGO SPIKE Prime Roboter beim zdi-Roboterwettbewerb NRW",
                "Two kids collaborating on a LEGO SPIKE Prime robot at the zdi Robotics Competition NRW"
              )}
              className="w-full rounded-3xl shadow-lg shadow-foreground/10 object-cover"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto sm:max-w-[85%]">
              <div className="inline-flex items-center gap-2 rounded-full bg-card/95 px-4 py-2 shadow-md ring-1 ring-border backdrop-blur">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warm-yellow/25 text-amber-700">
                  <Trophy size={15} />
                </span>
                <span className="text-xs font-bold text-foreground sm:text-sm">
                  {t("Teilnehmer beim zdi-Roboterwettbewerb NRW", "Participants at the zdi Robotics Competition NRW")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
