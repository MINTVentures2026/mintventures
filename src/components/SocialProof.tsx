import { useLang } from "@/contexts/LanguageContext";
import { ImageIcon, MessageSquareQuote } from "lucide-react";

const SocialProof = () => {
  const { t } = useLang();

  return (
    <section className="section-padding bg-gradient-to-b from-pink-50/40 via-rose-50/30 to-orange-50/20">
      <div className="container-narrow">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("Projekte & Eindrücke", "Projects & Impressions")} <span className="text-fun-pink">📸</span>
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="card-bounce flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-fun-pink/30 bg-card/60 backdrop-blur-sm p-12 text-center shadow-sm">
            <ImageIcon size={44} className="text-fun-pink/40" />
            <p className="mt-3 text-base text-muted-foreground">
              {t("Fotos & Projektbilder folgen", "Photos & project images coming soon")}
            </p>
          </div>
          <div className="card-bounce flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-fun-purple/30 bg-card/60 backdrop-blur-sm p-12 text-center shadow-sm">
            <MessageSquareQuote size={44} className="text-fun-purple/40" />
            <p className="mt-3 text-base text-muted-foreground">
              {t("Elternstimmen folgen", "Parent testimonials coming soon")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
