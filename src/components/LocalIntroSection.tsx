import { useLang } from "@/contexts/LanguageContext";

const LocalIntroSection = () => {
  const { t } = useLang();

  return (
    <section className="bg-background px-5 pb-2 pt-8 md:px-8 md:pb-3 md:pt-10">
      <div className="container-narrow">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {t(
            "Robotik- und Programmierkurse für Kinder in Bonn",
            "Robotics and programming courses for kids in Bonn"
          )}
        </h2>

        <div className="mt-3 space-y-2.5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            {t(
              "MINT Ventures bietet Robotik- und Programmierkurse für Kinder von 8 bis 14 Jahren in Bonn – mit LEGO SPIKE Prime lernen sie Programmierung, Engineering und kreatives Problemlösen.",
              "MINT Ventures offers robotics and programming courses for kids aged 8 to 14 in Bonn — using LEGO SPIKE Prime, they learn programming, engineering and creative problem-solving."
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
