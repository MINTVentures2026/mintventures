import { useLang } from "@/contexts/LanguageContext";

const LocalIntroSection = () => {
  const { t } = useLang();

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t(
            "Robotik- und Programmierkurse für Kinder in Bonn",
            "Robotics and programming courses for kids in Bonn"
          )}
        </h2>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            {t(
              "MINT Ventures bietet Robotik- und Programmierkurse für Kinder in Bonn.",
              "MINT Ventures offers robotics and programming courses for kids in Bonn."
            )}
          </p>
          <p>
            {t(
              "Kinder lernen bei uns Robotik, Programmierung, Engineering und kreatives Problemlösen mit LEGO SPIKE Prime.",
              "Kids learn robotics, programming, engineering and creative problem-solving with LEGO SPIKE Prime."
            )}
          </p>
          <p>
            {t(
              "Unsere Kurse richten sich an Kinder zwischen 6 und 14 Jahren und verbinden Technik, Kreativität und eigenständiges Denken.",
              "Our courses are designed for kids aged 6 to 14 and combine technology, creativity and independent thinking."
            )}
          </p>
          <p>
            {t(
              "In kleinen Gruppen bauen Kinder Roboter, programmieren eigene Lösungen und entwickeln wichtige Zukunftskompetenzen.",
              "In small groups, kids build robots, program their own solutions and develop important future skills."
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocalIntroSection;
