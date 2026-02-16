import { useLang } from "@/contexts/LanguageContext";
import { Brain, Rocket, Wrench, Bug } from "lucide-react";

const colorAccents = [
  { bg: "bg-tech-blue/10", text: "text-tech-blue", border: "hover:border-tech-blue/30" },
  { bg: "bg-vibrant-orange/10", text: "text-vibrant-orange", border: "hover:border-vibrant-orange/30" },
  { bg: "bg-soft-purple/10", text: "text-soft-purple", border: "hover:border-soft-purple/30" },
  { bg: "bg-primary/10", text: "text-primary", border: "hover:border-primary/30" },
];

const GainsSection = () => {
  const { t } = useLang();

  const cards = [
    { icon: Brain, title: t("Strukturiertes Denken", "Structured thinking"), desc: t("Probleme erkennen, zerlegen und systematisch lösen.", "Recognize problems, break them down, and solve them systematically.") },
    { icon: Rocket, title: t("Selbstwirksamkeit & Stolz", "Self-efficacy & pride"), desc: t('Eigene Ideen zum Leben erwecken – und sehen: „Das habe ich geschafft."', 'Bringing their own ideas to life — and seeing: "I did it."') },
    { icon: Wrench, title: t("Hands-on Ingenieurskunst", "Hands-on engineering"), desc: t("Mit Motoren, Sensoren und Code funktionierende Roboter bauen.", "Building working robots with motors, sensors, and code.") },
    { icon: Bug, title: t("Debugging-Mindset", "Debugging mindset"), desc: t("Testen, scheitern, verbessern, iterieren – bis es wirklich funktioniert.", "Test, fail, improve, iterate — until it really works.") },
  ];

  return (
    <section id="kurse" className="section-padding bg-tint-mint deco-gear">
      <div className="container-narrow relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t("Was Ihr Kind konkret mitnimmt", "What your child will gain")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 stagger-children">
          {cards.map((c, i) => {
            const color = colorAccents[i];
            return (
              <div
                key={i}
                className={`card-colorful rounded-2xl border border-border bg-card p-6 shadow-sm ${color.border}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color.bg} ${color.text}`}>
                  <c.icon size={22} />
                </span>
                <h3 className="mt-3 text-lg font-bold text-card-foreground">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GainsSection;
