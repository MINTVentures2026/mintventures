import { useLang } from "@/contexts/LanguageContext";
import { Brain, Rocket, Wrench, Bug } from "lucide-react";

const GainsSection = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: Brain,
      title: t("Strukturiertes Denken", "Structured thinking"),
      desc: t("Probleme erkennen, zerlegen und systematisch lösen.", "Recognize problems, break them down, and solve them systematically."),
      gradient: "from-fun-purple/10 to-primary/5",
      iconBg: "bg-fun-purple/15 text-fun-purple",
    },
    {
      icon: Rocket,
      title: t("Selbstwirksamkeit & Stolz", "Self-efficacy & pride"),
      desc: t('Eigene Ideen zum Leben erwecken – und sehen: „Das habe ich geschafft."', 'Bringing their own ideas to life — and seeing: "I did it."'),
      gradient: "from-fun-orange/10 to-fun-yellow/5",
      iconBg: "bg-fun-orange/15 text-fun-orange",
    },
    {
      icon: Wrench,
      title: t("Hands-on Ingenieurskunst", "Hands-on engineering"),
      desc: t("Mit Motoren, Sensoren und Code funktionierende Roboter bauen.", "Building working robots with motors, sensors, and code."),
      gradient: "from-fun-sky/10 to-fun-green/5",
      iconBg: "bg-fun-sky/15 text-fun-sky",
    },
    {
      icon: Bug,
      title: t("Debugging-Mindset", "Debugging mindset"),
      desc: t("Testen, scheitern, verbessern, iterieren – bis es wirklich funktioniert.", "Test, fail, improve, iterate — until it really works."),
      gradient: "from-fun-pink/10 to-fun-purple/5",
      iconBg: "bg-fun-pink/15 text-fun-pink",
    },
  ];

  return (
    <section id="kurse" className="section-padding bg-gradient-to-b from-emerald-50/50 via-white to-green-50/30 deco-dots bg-pattern">
      <div className="container-narrow relative z-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Was Ihr Kind konkret mitnimmt", "What your child will gain")} <span className="text-fun-orange">🎯</span>
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`card-bounce rounded-3xl border border-border bg-gradient-to-br ${c.gradient} p-7 shadow-md hover:shadow-xl`}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.iconBg}`}>
                <c.icon size={26} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-card-foreground">{c.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GainsSection;
