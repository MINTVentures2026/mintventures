import { useLang } from "@/contexts/LanguageContext";
import img1 from "@/assets/gallery-zdi-team.jpg.asset.json";
import img2 from "@/assets/gallery-digital-school-workshop.jpg.asset.json";
import img3 from "@/assets/gallery-robotics-teamwork.jpg.asset.json";
import img4 from "@/assets/gallery-spike-coding.jpg.asset.json";
import img5 from "@/assets/gallery-digital-school-event.jpg.asset.json";

const ProjectGallery = () => {
  const { t } = useLang();

  const items = [
    {
      src: img1.url,
      caption: t(
        "zdi Roboterwettbewerb NRW Bonn – Team Explorers mit 2. Platz",
        "zdi Robotics Competition NRW Bonn – Team Explorers, 2nd place"
      ),
    },
    {
      src: img2.url,
      caption: t(
        "DIGITAL@School Campus – Workshop und Austausch mit Lehrkräften",
        "DIGITAL@School Campus – workshop and exchange with teachers"
      ),
    },
    {
      src: img3.url,
      caption: t(
        "Kinder arbeiten gemeinsam an Robotikprojekten",
        "Kids working together on robotics projects"
      ),
    },
    {
      src: img4.url,
      caption: t(
        "Programmierung und Problemlösung mit LEGO SPIKE Prime",
        "Programming and problem solving with LEGO SPIKE Prime"
      ),
    },
    {
      src: img5.url,
      caption: t(
        "DIGITAL@School Campus Bonn – Veranstaltungsatmosphäre",
        "DIGITAL@School Campus Bonn – event atmosphere"
      ),
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-primary/4">
      <div className="container-narrow">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {t("Einblicke in unsere Projekte", "Insights into our projects")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg leading-relaxed">
            {t(
              "Lernen durch echte Projekte, Teamarbeit und kreative Problemlösung.",
              "Learning through real projects, teamwork and creative problem solving."
            )}
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <figure
              key={i}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/25"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 text-sm font-medium text-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
